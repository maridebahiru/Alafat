
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
    
    const response = await fetch(CHAPA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    console.log('Chapa API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chapa API error response:', errorText);
      // If API fails, use fallback link
      return `https://chapa.link/donation/view/DN-0o9OTSRq98uP?amount=${paymentData.amount}&email=${encodeURIComponent(paymentData.email)}&name=${encodeURIComponent(paymentData.first_name + ' ' + paymentData.last_name)}`;
    }

    const result: ChapaResponse = await response.json();
    console.log('Chapa API result:', result);
    
    if (result.status === 'success' && result.data?.checkout_url) {
      return result.data.checkout_url;
    } else {
      console.error('Chapa payment failed:', result.message);
      // Fallback to the provided donation link with parameters
      return `https://chapa.link/donation/view/DN-0o9OTSRq98uP?amount=${paymentData.amount}&email=${encodeURIComponent(paymentData.email)}&name=${encodeURIComponent(paymentData.first_name + ' ' + paymentData.last_name)}`;
    }
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
