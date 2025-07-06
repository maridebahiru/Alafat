
# Alafat Server Setup

## Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Make sure the `.env` file exists with your Chapa credentials

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### POST /api/chapa/initialize
Initialize a new payment with Chapa
```json
{
  "amount": 100,
  "currency": "ETB",
  "email": "customer@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+251911234567",
  "customization": {
    "title": "Order Payment",
    "description": "Payment for products"
  }
}
```

### GET /api/chapa/verify/:tx_ref
Verify payment status using transaction reference

### POST /api/chapa/webhook
Webhook endpoint for Chapa payment notifications

### GET /api/chapa/public-key
Get Chapa public key for frontend use

### GET /api/health
Health check endpoint

## Usage from Frontend

The frontend can make requests to these endpoints to process payments:

```javascript
// Initialize payment
const response = await fetch('http://localhost:3001/api/chapa/initialize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(paymentData)
});

// Verify payment
const verification = await fetch(`http://localhost:3001/api/chapa/verify/${tx_ref}`);
```
