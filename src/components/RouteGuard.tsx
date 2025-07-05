
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <AuthModal />;
  }

  return <>{children}</>;
};

export default RouteGuard;
