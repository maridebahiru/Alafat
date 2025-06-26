
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Song } from './types';

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
      const data = doc.data() as Record<string, any>;
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
