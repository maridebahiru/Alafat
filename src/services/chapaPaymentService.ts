
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
    const response = await fetch(CHAPA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ChapaResponse = await response.json();
    
    if (result.status === 'success') {
      return result.data.checkout_url;
    } else {
      throw new Error(result.message || 'Failed to initialize payment');
    }
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
