
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: 'AA' | 'DD';
  baptizedName: string;
  emailVerified: boolean;
  profileCompleted: boolean;
  createdAt: any;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  location: 'AA' | 'DD' | 'both';
}

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
  chapaReference: string;
  location: 'AA' | 'DD' | 'both';
  createdAt: any;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audioUrl?: string;
  imageUrl?: string;
  lyrics: string;
  location: 'AA' | 'DD' | 'both';
}

export interface Advert {
  id: string;
  title: string;
  image: string;
  link?: string;
  type: 'internal' | 'external';
  location: 'AA' | 'DD' | 'both';
  active: boolean;
}

// User Profile Operations
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

// Product Operations
export const getProducts = async (location?: 'AA' | 'DD'): Promise<Product[]> => {
  try {
    let q;
    if (location) {
      q = query(
        collection(db, 'products'), 
        where('location', 'in', [location, 'both']),
        orderBy('name')
      );
    } else {
      q = query(collection(db, 'products'), orderBy('name'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data?.name || '',
        price: data?.price || 0,
        image: data?.image || '',
        category: data?.category || '',
        location: data?.location || 'both'
      } as Product;
    });
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Song Operations
export const getSongs = async (location?: 'AA' | 'DD'): Promise<Song[]> => {
  try {
    let q;
    if (location) {
      q = query(
        collection(db, 'songs'), 
        where('location', 'in', [location, 'both']),
        orderBy('title')
      );
    } else {
      q = query(collection(db, 'songs'), orderBy('title'));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data?.title || '',
        artist: data?.artist || '',
        duration: data?.duration || '',
        audioUrl: data?.audioUrl,
        imageUrl: data?.imageUrl,
        lyrics: data?.lyrics || '',
        location: data?.location || 'both'
      } as Song;
    });
  } catch (error) {
    console.error('Error getting songs:', error);
    return [];
  }
};

// Advertisement Operations
export const getInternalAdverts = async (location?: 'AA' | 'DD'): Promise<Advert[]> => {
  try {
    let q;
    if (location) {
      q = query(
        collection(db, 'adverts'), 
        where('type', '==', 'internal'),
        where('active', '==', true),
        where('location', 'in', [location, 'both'])
      );
    } else {
      q = query(
        collection(db, 'adverts'), 
        where('type', '==', 'internal'),
        where('active', '==', true)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data?.title || '',
        image: data?.image || '',
        link: data?.link,
        type: 'internal',
        location: data?.location || 'both',
        active: data?.active !== false
      } as Advert;
    });
  } catch (error) {
    console.error('Error getting internal adverts:', error);
    return [];
  }
};

export const getExternalAdverts = async (location?: 'AA' | 'DD'): Promise<Advert[]> => {
  try {
    let q;
    if (location) {
      q = query(
        collection(db, 'adverts'), 
        where('type', '==', 'external'),
        where('active', '==', true),
        where('location', 'in', [location, 'both'])
      );
    } else {
      q = query(
        collection(db, 'adverts'), 
        where('type', '==', 'external'),
        where('active', '==', true)
      );
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data?.title || '',
        image: data?.image || '',
        link: data?.link,
        type: 'external',
        location: data?.location || 'both',
        active: data?.active !== false
      } as Advert;
    });
  } catch (error) {
    console.error('Error getting external adverts:', error);
    return [];
  }
};

// Donation Operations
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
  // This would return donation options filtered by location
  // For now, returning basic structure
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
