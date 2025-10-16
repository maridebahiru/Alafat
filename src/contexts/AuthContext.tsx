
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  linkWithCredential
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
  sendPhoneVerification: (phoneNumber: string) => Promise<void>;
  verifyPhoneCode: (code: string) => Promise<void>;
  loading: boolean;
  needsProfileCompletion: boolean;
  needsEmailVerification: boolean;
  needs2FA: boolean;
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
  const [needs2FA, setNeeds2FA] = useState(false);
  const [verificationId, setVerificationId] = useState<string>('');

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

  const sendPhoneVerification = async (phoneNumber: string) => {
    try {
      if (!currentUser) {
        throw new Error('Please log in first before adding 2FA');
      }

      // Initialize reCAPTCHA
      const recaptchaContainer = document.getElementById('recaptcha-container');
      if (!recaptchaContainer) {
        throw new Error('reCAPTCHA container not found');
      }

      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      setNeeds2FA(true);
    } catch (error) {
      throw new Error(formatAuthError(error));
    }
  };

  const verifyPhoneCode = async (code: string) => {
    try {
      if (!currentUser || !verificationId) {
        throw new Error('Verification session expired. Please try again.');
      }

      const credential = PhoneAuthProvider.credential(verificationId, code);
      await linkWithCredential(currentUser, credential);
      
      setNeeds2FA(false);
      setVerificationId('');
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
    sendPhoneVerification,
    verifyPhoneCode,
    loading,
    needsProfileCompletion,
    needsEmailVerification,
    needs2FA,
    completeProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
