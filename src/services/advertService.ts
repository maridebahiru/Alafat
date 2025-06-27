
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Advert } from './types';

export const getInternalAdverts = async (location?: 'AA' | 'DD'): Promise<Advert[]> => {
  try {
    const q = query(
      collection(db, 'adverts'), 
      where('isActive', '==', true),
      where('isExternal', '==', false),
      orderBy('order', 'asc')
    );
    
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
        active: data?.isActive !== false,
        order: data?.order || 0
      } as Advert;
    });
  } catch (error) {
    console.error('Error getting internal adverts:', error);
    return [];
  }
};

export const getExternalAdverts = async (location?: 'AA' | 'DD'): Promise<Advert[]> => {
  try {
    const q = query(
      collection(db, 'adverts'), 
      where('isActive', '==', true),
      where('isExternal', '==', true),
      orderBy('order', 'asc')
    );
    
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
        active: data?.isActive !== false,
        order: data?.order || 0
      } as Advert;
    });
  } catch (error) {
    console.error('Error getting external adverts:', error);
    return [];
  }
};
