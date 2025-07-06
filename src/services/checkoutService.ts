
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-app-name.onrender.com/api' // Replace with your actual Render URL
  : 'http://localhost:3001/api';

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
    console.log('Attempting to connect to server at:', API_BASE_URL);
    
    const response = await fetch(`${API_BASE_URL}/chapa/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Check if it's a connection refused error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        success: false,
        message: 'Unable to connect to payment server. Please try again later.'
      };
    }
    
    return {
      success: false,
      message: 'Failed to initialize payment. Please try again.'
    };
  }
};

export const verifyPayment = async (tx_ref: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapa/verify/${tx_ref}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Payment verification error:', error);
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        success: false,
        message: 'Unable to connect to payment server for verification'
      };
    }
    
    return {
      success: false,
      message: 'Failed to verify payment'
    };
  }
};
