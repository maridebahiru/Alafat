
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Advert } from './types';

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
      const data = doc.data() as Record<string, any>;
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
      const data = doc.data() as Record<string, any>;
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
