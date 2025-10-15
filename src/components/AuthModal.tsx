import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2, Chrome, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '@/assets/Aelafat_Logo.png';
import QRScanner from './QRScanner';
import { getUserProfile } from '../services/userService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
  onSwitchMode: () => void;
}

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }: AuthModalProps) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showQRScanner, setShowQRScanner] = useState(false);
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Validation
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        if (!formData.fullName.trim()) {
          throw new Error('Full name is required');
        }

        await signup(formData.email, formData.password, formData.fullName);
        setSuccess('Account created successfully!');
        resetForm();
        onClose();
      } else {
        await login(formData.email, formData.password);
        onClose();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!resetEmail) {
        throw new Error('Please enter your email address');
      }
      await resetPassword(resetEmail);
      setSuccess('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetEmail('');
      }, 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQRScan = async (qrData: string) => {
    setError('');
    setLoading(true);

    try {
      const data = JSON.parse(qrData);
      
      // QR codes should contain uid for authentication
      if (!data.uid) {
        throw new Error('Invalid QR code');
      }

      // Verify this user exists in the database
      const profile = await getUserProfile(data.uid);
      
      if (!profile) {
        throw new Error('User not found. Please sign up first.');
      }

      // If user exists but hasn't completed profile, redirect to profile completion
      if (!profile.profileCompleted) {
        setError('Please complete your profile first');
        return;
      }

      // Auto-login using email from QR code (this is a simplified approach)
      // In production, you'd want a more secure token-based authentication
      setSuccess('QR code scanned! Please log in with your credentials.');
      setFormData({ ...formData, email: profile.email });
      
    } catch (error: any) {
      setError(error.message || 'Invalid QR code');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <iframe
          className="absolute inset-0 w-full h-full pointer-events-none"
          src="https://www.youtube.com/embed/W4r5Zo8HJwo?autoplay=1&mute=1&loop=1&playlist=W4r5Zo8HJwo&controls=0&showinfo=0&rel=0&modestbranding=1"
          allow="autoplay; encrypted-media"
          style={{ transform: 'scale(1.5)', objectFit: 'cover' }}
        />
      </div>

      <div className="relative z-20 backdrop-blur-sm bg-black/50 border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src={logo}
                alt="Aelafat Logo" 
                className="w-32 h-32 mx-auto mb-4 drop-shadow-lg"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2 relative group">
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 via-pink-500/30 to-blue-500/30 blur-xl opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse"></span>
              <span className="relative inline-block text-2xl font-bold text-white">
                Melody of Myriads
              </span>
            </h2>
          <p className="text-white/80 text-lg font-medium">
            The Ethiopian Janderebaw Generation
          </p>
        </div>

        {success && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-400/50 text-green-300 rounded-lg backdrop-blur-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('auth.fullName')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="email"
                placeholder={t('auth.email')}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                required
                disabled={loading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.password')}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white focus:outline-none transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {mode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('auth.confirmPassword')}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors disabled:opacity-50"
                  required
                  minLength={6}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white focus:outline-none transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}


            {error && (
              <div className="text-red-300 text-sm bg-red-500/20 p-3 rounded-lg border border-red-400/50 backdrop-blur-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>
                {loading ? t('auth.pleaseWait') : (mode === 'login' ? t('auth.login') : t('auth.signup'))}
              </span>
            </button>
          </form>

          {/* Forgot Password Section */}
          {mode === 'login' && (
            <div className="mt-6">
              {!showForgotPassword ? (
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="w-full text-white/80 text-sm hover:text-white transition-colors"
                >
                  {t('auth.forgotPassword')}
                </button>
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">Reset Password</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setResetEmail('');
                        setError('');
                        setSuccess('');
                      }}
                      className="text-white/60 hover:text-white text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </div>
                  <button
                    onClick={handlePasswordReset}
                    disabled={loading || !resetEmail}
                    className="w-full py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-white/10 absolute w-full"></div>
              <div className="bg-transparent px-4 relative text-white/60 text-sm">
                quick access via
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Chrome size={18} />
                )}
              </button>

              {mode === 'login' && (
                <button
                  onClick={() => setShowQRScanner(true)}
                  disabled={loading || googleLoading}
                  title="Scan QR Code to Login"
                  className="flex items-center justify-center p-2 bg-white/5 border border-white/10 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <QrCode size={18} />
                </button>
              )}
            </div>

            <div className="text-center mt-6">
              <span className="text-white/60 text-sm">
                {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
              </span>
              <button
                onClick={() => {
                  onSwitchMode();
                  resetForm();
                }}
                className="text-white hover:text-purple-300 text-sm font-medium ml-2 disabled:opacity-50 transition-colors"
                disabled={loading || googleLoading}
              >
                {mode === 'login' ? t('auth.signup') : t('auth.signIn')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      <QRScanner
        isOpen={showQRScanner}
        onClose={() => setShowQRScanner(false)}
        onScan={handleQRScan}
      />
    </div>
  );
};

export default AuthModal;
