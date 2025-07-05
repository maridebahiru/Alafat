
const SERVER_URL = 'http://localhost:3001';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

export interface CheckoutData {
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  cart_items: CartItem[];
  total_amount: number;
}

export const initializeCheckout = async (checkoutData: CheckoutData) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/payment/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: checkoutData.total_amount,
        currency: 'ETB',
        email: checkoutData.email,
        first_name: checkoutData.first_name,
        last_name: checkoutData.last_name,
        phone_number: checkoutData.phone_number,
        cart_items: checkoutData.cart_items,
      }),
    });

    const data = await response.json();
    
    if (data.success) {
      return {
        success: true,
        checkout_url: data.data.checkout_url,
        tx_ref: data.data.tx_ref,
      };
    } else {
      throw new Error(data.message || 'Payment initialization failed');
    }
  } catch (error) {
    console.error('Checkout initialization error:', error);
    throw error;
  }
};

export const verifyPayment = async (tx_ref: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/payment/verify/${tx_ref}`);
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'Payment verification failed');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    throw error;
  }
};
