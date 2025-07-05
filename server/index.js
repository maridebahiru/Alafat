
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Chapa configuration
const CHAPA_SECRET_KEY = process.env.CHAPA_SECRET_KEY;
const CHAPA_ENCRYPTION_KEY = process.env.CHAPA_ENCRYPTION_KEY;
const CHAPA_BASE_URL = 'https://api.chapa.co/v1';

// Utility function to generate transaction reference
const generateTxRef = () => {
  return `TX-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
};

// Utility function to encrypt sensitive data
const encryptData = (data) => {
  const cipher = crypto.createCipher('aes-256-cbc', CHAPA_ENCRYPTION_KEY);
  let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

// Route to initialize payment
app.post('/api/payment/initialize', async (req, res) => {
  try {
    const {
      amount,
      currency = 'ETB',
      email,
      first_name,
      last_name,
      phone_number,
      cart_items,
      return_url,
      callback_url
    } = req.body;

    // Validate required fields
    if (!amount || !email || !first_name || !last_name) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, email, first_name, last_name'
      });
    }

    const tx_ref = generateTxRef();

    // Prepare payment data
    const paymentData = {
      amount: parseFloat(amount),
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      tx_ref,
      callback_url: callback_url || `${process.env.CLIENT_URL}/payment/callback`,
      return_url: return_url || `${process.env.CLIENT_URL}/payment/success`,
      customization: {
        title: 'Alafat Cart Checkout',
        description: `Payment for ${cart_items?.length || 0} items`
      },
      meta: {
        cart_items: encryptData(cart_items || [])
      }
    };

    console.log('Initializing payment with Chapa:', { tx_ref, amount, email });

    // Make request to Chapa API
    const response = await axios.post(`${CHAPA_BASE_URL}/transaction/initialize`, paymentData, {
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.status === 'success') {
      res.json({
        success: true,
        data: {
          checkout_url: response.data.data.checkout_url,
          tx_ref: tx_ref
        },
        message: 'Payment initialized successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: response.data.message || 'Payment initialization failed'
      });
    }

  } catch (error) {
    console.error('Payment initialization error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.response?.data || error.message
    });
  }
});

// Route to verify payment
app.get('/api/payment/verify/:tx_ref', async (req, res) => {
  try {
    const { tx_ref } = req.params;

    console.log('Verifying payment:', tx_ref);

    const response = await axios.get(`${CHAPA_BASE_URL}/transaction/verify/${tx_ref}`, {
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`
      }
    });

    if (response.data.status === 'success') {
      const paymentData = response.data.data;
      
      res.json({
        success: true,
        data: {
          status: paymentData.status,
          amount: paymentData.amount,
          currency: paymentData.currency,
          tx_ref: paymentData.tx_ref,
          reference: paymentData.reference,
          created_at: paymentData.created_at
        },
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: response.data.message || 'Payment verification failed'
      });
    }

  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.response?.data || error.message
    });
  }
});

// Webhook endpoint for Chapa callbacks
app.post('/api/payment/webhook', (req, res) => {
  try {
    const event = req.body;
    
    console.log('Chapa webhook received:', event);

    // Process the webhook event
    switch (event.event) {
      case 'charge.success':
        console.log('Payment successful:', event.data);
        // Update order status in database
        break;
      case 'charge.failed':
        console.log('Payment failed:', event.data);
        // Update order status in database
        break;
      default:
        console.log('Unhandled webhook event:', event.event);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Alafat Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Alafat Server running on port ${PORT}`);
  console.log(`💳 Chapa payment integration ready`);
});
