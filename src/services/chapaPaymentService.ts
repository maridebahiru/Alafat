
interface ChapaPaymentData {
  amount: number;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  tx_ref: string;
  callback_url?: string;
  return_url?: string;
  customization?: {
    title: string;
    description: string;
  };
}

interface ChapaResponse {
  message: string;
  status: string;
  data: {
    checkout_url: string;
  };
}

const CHAPA_SECRET_KEY = 'CHASECK_TEST-7W9YDhsbVRST83nlMoqI6kwn4IPNMvTM';
const CHAPA_PUBLIC_KEY = 'CHAPUBK_TEST-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5jaGFwYS5jby92MSIsInN1YiI6IkNIQVBVQktfVEVTVC03VzlZRGhzYlZSU1Q4M25sTW9xSTZrd240SVBOTXZUTSIsImF1ZCI6WyJjaGFwYS1hcGkiXSwiaWF0IjoxNzUxNDA2NDAzLCJleHAiOjE3NTM5OTg0MDN9.8sQVn2WuMKjgGsC9J6nGUGgFMzQJMmrST-_LzM-8e-s';

export const initializeChapaPayment = async (paymentData: ChapaPaymentData): Promise<string> => {
  try {
    console.log('Initializing Chapa payment with data:', paymentData);
    
    // Since CORS is blocking direct API calls, we'll use Chapa's hosted checkout
    // Create a form-based redirect to Chapa
    const chapaHostedUrl = `https://checkout.chapa.co/checkout/payment/${CHAPA_PUBLIC_KEY}`;
    
    const params = new URLSearchParams({
      amount: paymentData.amount.toString(),
      currency: paymentData.currency,
      email: paymentData.email,
      first_name: paymentData.first_name,
      last_name: paymentData.last_name,
      phone_number: paymentData.phone_number || '',
      tx_ref: paymentData.tx_ref,
      callback_url: paymentData.callback_url || '',
      return_url: paymentData.return_url || '',
      title: paymentData.customization?.title || 'Payment',
      description: paymentData.customization?.description || 'Payment'
    });

    // For now, redirect to the fallback donation link with parameters
    return `https://chapa.link/donation/view/DN-0o9OTSRq98uP?amount=${paymentData.amount}&email=${encodeURIComponent(paymentData.email)}&name=${encodeURIComponent(paymentData.first_name + ' ' + paymentData.last_name)}`;
    
  } catch (error) {
    console.error('Chapa payment initialization error:', error);
    // Fallback to the provided donation link with parameters
    return `https://chapa.link/donation/view/DN-0o9OTSRq98uP?amount=${paymentData.amount}&email=${encodeURIComponent(paymentData.email)}&name=${encodeURIComponent(paymentData.first_name + ' ' + paymentData.last_name)}`;
  }
};

export const generateTransactionReference = (prefix: string = 'TX'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};
