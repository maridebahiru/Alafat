
import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { useState } from 'react';

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { currentUser, userProfile } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  // Show auth modal if user is not authenticated or email not verified
  if (!currentUser || !currentUser.emailVerified || !userProfile?.profileCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">Welcome to Alafat Registration</h1>
          <p className="text-gray-600 mb-8">
            Please sign in or create an account to access our services and continue your spiritual journey with us.
          </p>
          
          {!currentUser && (
            <div className="space-y-4">
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuthModal(true);
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Create Account
              </button>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
            </div>
          )}

          {currentUser && !currentUser.emailVerified && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Email Verification Required</h3>
              <p className="text-sm text-yellow-700">
                Please check your email and click the verification link to continue.
              </p>
            </div>
          )}
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onSwitchMode={switchAuthMode}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
