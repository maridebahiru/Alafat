
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Donation } from './types';

export const createDonation = async (donationData: Omit<Donation, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'donations'), {
      ...donationData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

export const getDonationOptions = async (location?: 'AA' | 'DD') => {
  const baseOptions = [
    { id: 1, title: 'General Fund', description: 'Support our general mission', location: 'both' },
    { id: 2, title: 'Education Fund', description: 'Support religious education', location: 'AA' },
    { id: 3, title: 'Community Support', description: 'Help local community', location: 'DD' }
  ];

  if (location) {
    return baseOptions.filter(option => option.location === location || option.location === 'both');
  }
  
  return baseOptions;
};
