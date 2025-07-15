
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://yealafatzemare.netlify.app',
    'https://yealafatzemare.netlify.app/',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey', 'Accept']
}));

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-client-info, apikey, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use(express.json());

// Chapa API configuration
const CHAPA_BASE_URL = 'https://api.chapa.co/v1';
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;

// Helper function to generate transaction reference
const generateTxRef = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `TX-${timestamp}-${random}`;
};

// Route: Initialize Chapa Payment
app.post('/api/chapa/initialize', async (req, res) => {
  try {
    const {
      amount,
      currency = 'ETB',
      email,
      first_name,
      last_name,
      phone_number,
      return_url,
      callback_url,
      customization
    } = req.body;

    // Validate required fields
    if (!amount || !email || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, email, first_name, last_name'
      });
    }

    const tx_ref = generateTxRef();

    const paymentData = {
      amount: parseFloat(amount),
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      return_url: return_url || `${process.env.FRONTEND_URL}/payment/success`,
      callback_url: callback_url || `${process.env.BACKEND_URL}/api/chapa/webhook`,
      customization: {
        title: customization?.title || 'Alafat Payment',
        description: customization?.description || 'Payment for Alafat services',
        logo: customization?.logo
      }
    };

    console.log('Initializing Chapa payment:', { tx_ref, amount, email });

    const response = await axios.post(
      `${CHAPA_BASE_URL}/transaction/initialize`,
      paymentData,
      {
        headers: {
          'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.status === 'success') {
      res.json({
        success: true,
        data: {
          checkout_url: response.data.data.checkout_url,
          tx_ref: tx_ref
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: response.data.message || 'Payment initialization failed'
      });
    }

  } catch (error) {
    console.error('Chapa initialization error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error during payment initialization',
      error: error.response?.data || error.message
    });
  }
});

// Route: Verify Chapa Payment
app.get('/api/chapa/verify/:tx_ref', async (req, res) => {
  try {
    const { tx_ref } = req.params;

    console.log('Verifying Chapa payment:', tx_ref);

    const response = await axios.get(
      `${CHAPA_BASE_URL}/transaction/verify/${tx_ref}`,
      {
        headers: {
          'Authorization': `Bearer ${CHAPA_SECRET_KEY}`
        }
      }
    );

    if (response.data.status === 'success') {
      res.json({
        success: true,
        data: response.data.data
      });
    } else {
      res.status(400).json({
        success: false,
        message: response.data.message || 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Chapa verification error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error during payment verification',
      error: error.response?.data || error.message
    });
  }
});

// Route: Handle Chapa Webhook
app.post('/api/chapa/webhook', (req, res) => {
  try {
    const webhookData = req.body;
    
    console.log('Chapa webhook received:', webhookData);

    // Process the webhook data here
    // You can update order status, send notifications, etc.
    
    // Respond to Chapa that webhook was received successfully
    res.status(200).json({ message: 'Webhook received successfully' });

  } catch (error) {
    console.error('Chapa webhook error:', error);
    res.status(500).json({ message: 'Webhook processing failed' });
  }
});

// Route: Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Alafat Server is running',
    timestamp: new Date().toISOString()
  });
});

// Route: Get Chapa public key (for frontend use)
app.get('/api/chapa/public-key', (req, res) => {
  res.json({
    success: true,
    public_key: process.env.CHAPA_PUBLIC_KEY
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Alafat Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
});
