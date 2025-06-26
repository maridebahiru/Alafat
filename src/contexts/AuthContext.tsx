
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { getUserProfile, createUserProfile, UserProfile } from '../services/firebaseService';

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
  resendVerification: () => Promise<void>;
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
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Send verification email
    await sendEmailVerification(user);
    
    // Create initial user profile
    await createUserProfile({
      uid: user.uid,
      fullName,
      email: user.email || '',
      phoneNumber: '',
      location: 'AA',
      baptizedName: '',
      emailVerified: false,
      profileCompleted: false
    });
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    if (!user.emailVerified) {
      await signOut(auth);
      throw new Error('Please verify your email before signing in. Check your inbox for the verification link.');
    }
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
    
    const updates = { 
      ...profileData, 
      profileCompleted: true 
    };
    
    await createUserProfile({
      uid: currentUser.uid,
      fullName: profileData.fullName || userProfile?.fullName || '',
      email: currentUser.email || '',
      phoneNumber: profileData.phoneNumber || '',
      location: profileData.location || 'AA',
      baptizedName: profileData.baptizedName || '',
      emailVerified: currentUser.emailVerified,
      profileCompleted: true
    });
    
    const updatedProfile = await getUserProfile(currentUser.uid);
    setUserProfile(updatedProfile);
    setNeedsProfileCompletion(false);
  };

  const resendVerification = async () => {
    if (currentUser) {
      await sendEmailVerification(currentUser);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Get user profile
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        
        // Check if profile needs completion
        if (user.emailVerified && profile && !profile.profileCompleted) {
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
    completeProfile,
    resendVerification
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
