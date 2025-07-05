import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import { useState } from 'react';

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { currentUser } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(!currentUser);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  // If user is not authenticated, show the auth modal
  if (!currentUser) {
    return (
      <>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onSwitchMode={switchAuthMode}
        />
      </>
    );
  }

  // If user is authenticated, show the main content
  return <>{children}</>;
};

export default RouteGuard;
