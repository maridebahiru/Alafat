
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
