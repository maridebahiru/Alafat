
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UserProfile } from './types';

export const createUserProfile = async (profileData: Omit<UserProfile, 'createdAt'>) => {
  try {
    await setDoc(doc(db, 'users', profileData.uid), {
      ...profileData,
      createdAt: serverTimestamp()
    });
    return profileData.uid;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { uid: docSnap.id, ...data } as UserProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
