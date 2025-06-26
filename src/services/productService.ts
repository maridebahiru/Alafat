
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from './types';

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
      const data = doc.data() as Record<string, any>;
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
