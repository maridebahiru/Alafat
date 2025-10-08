import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './ui/gaming-login';
import { toast } from '../hooks/use-toast';

interface RouteGuardProps {
  children: ReactNode;
}

const RouteGuard = ({ children }: RouteGuardProps) => {
  const { currentUser, login, loginWithGoogle } = useAuth();

  const handleLogin = async (email: string, password: string, remember: boolean) => {
    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast({
        title: "Welcome!",
        description: "You've successfully logged in with Google.",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Could not login with Google",
        variant: "destructive",
      });
    }
  };

  // If user is not authenticated, show the gaming login page
  if (!currentUser) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12">
        <LoginPage.VideoBackground videoUrl="https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" />

        <div className="relative z-20 w-full max-w-md animate-fadeIn">
          <LoginPage.LoginForm 
            onSubmit={handleLogin}
            onGoogleLogin={handleGoogleLogin}
          />
        </div>

        <footer className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20">
          © 2025 NexusGate. All rights reserved.
        </footer>
      </div>
    );
  }

  // If user is authenticated, show the main content
  return <>{children}</>;
};

export default RouteGuard;
