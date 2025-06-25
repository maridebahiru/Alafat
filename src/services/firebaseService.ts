import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  imageUrl: string;
  duration: string;
  lyrics: string;
  audioUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

export interface Advert {
  id: string;
  image: string;
  isActive: boolean;
  isExternal: boolean;
  link?: string;
  order?: number;
}

// Songs functions
export const getSongs = async (): Promise<Song[]> => {
  try {
    const songsCollection = collection(db, 'songs');
    const songSnapshot = await getDocs(songsCollection);
    return songSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Song));
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};

export const getSong = async (id: string): Promise<Song | null> => {
  try {
    const songDoc = doc(db, 'songs', id);
    const songSnapshot = await getDoc(songDoc);
    
    if (songSnapshot.exists()) {
      return {
        id: songSnapshot.id,
        ...songSnapshot.data()
      } as Song;
    }
    return null;
  } catch (error) {
    console.error('Error fetching song:', error);
    return null;
  }
};

export const addSong = async (song: Omit<Song, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'songs'), song);
    return docRef.id;
  } catch (error) {
    console.error('Error adding song:', error);
    return null;
  }
};

// Products functions
export const getProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, 'products');
    const productSnapshot = await getDocs(productsCollection);
    return productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const productDoc = doc(db, 'products', id);
    const productSnapshot = await getDoc(productDoc);
    
    if (productSnapshot.exists()) {
      return {
        id: productSnapshot.id,
        ...productSnapshot.data()
      } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<string | null> => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Adverts functions
export const getAdverts = async (): Promise<Advert[]> => {
  try {
    const advertsCollection = collection(db, 'adverts');
    const advertSnapshot = await getDocs(advertsCollection);
    const adverts = advertSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Advert));
    
    // Sort by order if available
    return adverts.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error('Error fetching adverts:', error);
    return [];
  }
};

export const getInternalAdverts = async (): Promise<Advert[]> => {
  try {
    const adverts = await getAdverts();
    return adverts.filter(ad => ad.isActive && !ad.isExternal);
  } catch (error) {
    console.error('Error fetching internal adverts:', error);
    return [];
  }
};

export const getExternalAdverts = async (): Promise<Advert[]> => {
  try {
    const adverts = await getAdverts();
    return adverts.filter(ad => ad.isActive && ad.isExternal);
  } catch (error) {
    console.error('Error fetching external adverts:', error);
    return [];
  }
};
