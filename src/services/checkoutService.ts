
const API_BASE_URL = 'http://localhost:3001/api';

export interface CheckoutData {
  amount: number;
  currency: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  return_url?: string;
  callback_url?: string;
  customization?: {
    title: string;
    description: string;
  };
}

export interface CheckoutResponse {
  success: boolean;
  data?: {
    checkout_url: string;
    tx_ref: string;
  };
  message?: string;
}

export const initializePayment = async (checkoutData: CheckoutData): Promise<CheckoutResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapa/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    return await response.json();
  } catch (error) {
    console.error('Checkout error:', error);
    return {
      success: false,
      message: 'Failed to initialize payment'
    };
  }
};

export const verifyPayment = async (tx_ref: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapa/verify/${tx_ref}`);
    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      success: false,
      message: 'Failed to verify payment'
    };
  }
};
