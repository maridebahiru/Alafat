
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
const CHAPA_API_URL = 'https://api.chapa.co/v1/transaction/initialize';

export const initializeChapaPayment = async (paymentData: ChapaPaymentData): Promise<string> => {
  try {
    console.log('Initializing Chapa payment with data:', paymentData);
    
    // Due to CORS restrictions, we'll use the fallback donation link directly
    // In production, this should be handled by a backend service
    console.log('Using fallback payment link due to CORS restrictions');
    
    // Create a custom checkout URL with the payment data as query parameters
    const checkoutUrl = `https://chapa.link/donation/view/DN-0o9OTSRq98uP?amount=${paymentData.amount}&email=${encodeURIComponent(paymentData.email)}&name=${encodeURIComponent(paymentData.first_name + ' ' + paymentData.last_name)}`;
    
    return checkoutUrl;
  } catch (error) {
    console.error('Chapa payment initialization error:', error);
    // Fallback to the provided donation link
    return 'https://chapa.link/donation/view/DN-0o9OTSRq98uP';
  }
};

export const generateTransactionReference = (prefix: string = 'TX'): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
};
