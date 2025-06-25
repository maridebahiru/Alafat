
import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Donation {
  id?: string;
  userId?: string;
  amount: number;
  currency: string;
  donationType: 'one-time' | 'monthly';
  donorName: string;
  donorEmail: string;
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  chapaReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id?: string;
  userId?: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  chapaReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createDonation = async (donation: Omit<Donation, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'donations'), {
      ...donation,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateDonationStatus = async (donationId: string, status: string, chapaReference?: string) => {
  try {
    const donationRef = doc(db, 'donations', donationId);
    await updateDoc(donationRef, {
      status,
      chapaReference,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating donation status:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: string, chapaReference?: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      chapaReference,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
