const API_BASE_URL = import.meta.env.PROD 
  ? 'https://alafat-chants-shop.onrender.com/api'
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

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};

export const initializePayment = async (checkoutData: CheckoutData): Promise<CheckoutResponse> => {
  try {
    console.log('Attempting to connect to server at:', API_BASE_URL);
    console.log('Current environment:', import.meta.env.PROD ? 'production' : 'development');
    
    // Check server health first
    const isServerHealthy = await checkServerHealth();
    if (!isServerHealthy) {
      console.warn('Server health check failed, but proceeding with payment initialization');
    }
    
    const response = await fetch(`${API_BASE_URL}/chapa/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Checkout error:', error);
    
    // Check if it's a CORS or connection error
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      return {
        success: false,
        message: 'Unable to connect to payment server. Please make sure the server is running at https://alafat-chants-shop.onrender.com and properly configured for CORS.'
      };
    }
    
    return {
      success: false,
      message: `Payment initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};

export const verifyPayment = async (tx_ref: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chapa/verify/${tx_ref}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
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
