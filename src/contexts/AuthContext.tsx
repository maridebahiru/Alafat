
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { getUserProfile, createUserProfile } from '../services/userService';
import { UserProfile } from '../services/types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  needsProfileCompletion: boolean;
  completeProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create initial user profile without email verification
      await createUserProfile({
        uid: user.uid,
        fullName,
        email: user.email || '',
        phoneNumber: '',
        location: 'AA',
        baptizedName: '',
        emailVerified: true, // Set to true since we're removing email verification
        profileCompleted: false
      });
    } catch (error) {
      console.error('Error during signup:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
    
    // Check if profile exists, if not create one
    const existingProfile = await getUserProfile(user.uid);
    if (!existingProfile) {
      await createUserProfile({
        uid: user.uid,
        fullName: user.displayName || '',
        email: user.email || '',
        phoneNumber: '',
        location: 'AA',
        baptizedName: '',
        emailVerified: true,
        profileCompleted: false
      });
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    setNeedsProfileCompletion(false);
  };

  const completeProfile = async (profileData: Partial<UserProfile>) => {
    if (!currentUser) return;
    
    await createUserProfile({
      uid: currentUser.uid,
      fullName: profileData.fullName || userProfile?.fullName || '',
      email: currentUser.email || '',
      phoneNumber: profileData.phoneNumber || '',
      location: profileData.location || 'AA',
      baptizedName: profileData.baptizedName || '',
      emailVerified: true,
      profileCompleted: true
    });
    
    const updatedProfile = await getUserProfile(currentUser.uid);
    setUserProfile(updatedProfile);
    setNeedsProfileCompletion(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Get user profile
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        
        // Check if profile needs completion
        if (profile && !profile.profileCompleted) {
          setNeedsProfileCompletion(true);
        }
      } else {
        setUserProfile(null);
        setNeedsProfileCompletion(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    login,
    signup,
    loginWithGoogle,
    logout,
    loading,
    needsProfileCompletion,
    completeProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
