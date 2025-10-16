
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification
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
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  sendEmailVerificationCode: (email: string) => Promise<void>;
  verifyEmailCode: (email: string, code: string) => Promise<boolean>;
  loading: boolean;
  needsProfileCompletion: boolean;
  needsEmailVerification: boolean;
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
  const [needsEmailVerification, setNeedsEmailVerification] = useState(false);

  // Helper function to format Firebase errors into friendly messages
  const formatAuthError = (error: any): string => {
    const errorCode = error?.code || '';
    
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered. Please log in or use a different email.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method is not enabled. Please contact support.';
      case 'auth/weak-password':
        return 'Password is too weak. Please use at least 6 characters.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again or reset your password.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/popup-closed-by-user':
        return 'Sign-in was cancelled. Please try again.';
      case 'auth/account-exists-with-different-credential':
        return 'An account with this email already exists using a different sign-in method.';
      default:
        return error?.message || 'An error occurred. Please try again.';
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Send email verification
      await sendEmailVerification(user, {
        url: window.location.origin,
        handleCodeInApp: false,
      });
      
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
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Check email verification
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
      }
      
      // Force token refresh for security
      if (userCredential.user) {
        await userCredential.user.getIdToken(true);
      }
    } catch (error: any) {
      if (error.message && error.message.includes('verify your email')) {
        throw error;
      }
      throw new Error(formatAuthError(error));
    }
  };

  const loginWithGoogle = async () => {
    try {
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
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    setNeedsProfileCompletion(false);
    setNeedsEmailVerification(false);
  };

  const resetPassword = async (email: string) => {
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/`,
        handleCodeInApp: false,
      };
      
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  };

  const sendEmailVerificationCode = async (email: string) => {
    try {
      // Generate a 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store in Firestore with expiration (10 minutes)
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10);
      
      await setDoc(doc(db, 'verification_codes', email), {
        code,
        email,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString()
      });

      // In a production app, you would send this code via email using an edge function
      // For now, we'll log it (in production, remove this and implement email sending)
      console.log('Verification code for', email, ':', code);
      
      // For demo purposes, show the code in an alert (remove in production)
      alert(`Your verification code is: ${code}\n\nIn production, this would be sent to your email.`);
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  };

  const verifyEmailCode = async (email: string, code: string): Promise<boolean> => {
    try {
      const { doc, getDoc, deleteDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      
      const docRef = doc(db, 'verification_codes', email);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Verification code not found or expired');
      }
      
      const data = docSnap.data();
      const expiresAt = new Date(data.expiresAt);
      
      // Check if expired
      if (new Date() > expiresAt) {
        await deleteDoc(docRef);
        throw new Error('Verification code has expired');
      }
      
      // Check if code matches
      if (data.code !== code) {
        throw new Error('Invalid verification code');
      }
      
      // Delete the code after successful verification
      await deleteDoc(docRef);
      
      return true;
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  };

  const resendVerificationEmail = async () => {
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    
    try {
      await sendEmailVerification(currentUser, {
        url: window.location.origin,
        handleCodeInApp: false,
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
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
        // Refresh token on auth state change for security
        await user.getIdToken(true);
        
        // Get user profile
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
        
        // Check email verification status
        if (!user.emailVerified) {
          setNeedsEmailVerification(true);
        } else {
          setNeedsEmailVerification(false);
        }
        
        // Check if profile needs completion
        if (profile && !profile.profileCompleted) {
          setNeedsProfileCompletion(true);
        } else {
          setNeedsProfileCompletion(false);
        }
      } else {
        setUserProfile(null);
        setNeedsProfileCompletion(false);
        setNeedsEmailVerification(false);
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
    resetPassword,
    resendVerificationEmail,
    sendEmailVerificationCode,
    verifyEmailCode,
    loading,
    needsProfileCompletion,
    needsEmailVerification,
    completeProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
