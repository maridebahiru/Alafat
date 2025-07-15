
import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { login, signup, loginWithGoogle } = useAuth();

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/c5c1c99b-6655-46d3-8dfa-8100276eb20e.png" 
                alt="Aelafat Logo" 
                className="w-24 h-24 mx-auto mb-4"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#5d2e1a] mb-2">
              Melody of Myriads
            </h1>
            <p className="text-[#b8860b] text-lg font-medium">
              The Ethiopian Janderebaw Generation
            </p>
          </div>

          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t('auth.fullName')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5d2e1a] disabled:opacity-50"
                  required
                  disabled={loading}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder={t('auth.email')}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-4 py-4 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5d2e1a] disabled:opacity-50"
                required
                disabled={loading}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('auth.password')}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-12 py-4 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5d2e1a] disabled:opacity-50"
                required
                minLength={6}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {mode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('auth.confirmPassword')}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full pl-12 pr-12 py-4 bg-white border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5d2e1a] disabled:opacity-50"
                  required
                  minLength={6}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  disabled={loading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {mode === 'login' && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-gray-600 text-sm hover:text-[#5d2e1a] disabled:opacity-50"
                  disabled={loading}
                >
                  {t('auth.forgotPassword')}
                </button>
              </div>
            )}

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full bg-[#5d2e1a] hover:bg-[#4a2415] text-[#b8860b] py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>
                {loading ? t('auth.pleaseWait') : (mode === 'login' ? t('auth.login') : t('auth.signup'))}
              </span>
            </button>
          </form>

          <div className="mt-8">
            <div className="flex items-center justify-center mb-6">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading || googleLoading}
                className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {googleLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                <span>{googleLoading ? 'Signing in...' : 'Sign in with Google'}</span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-gray-600 text-sm">
                {mode === 'login' ? t('auth.noAccount') : t('auth.hasAccount')}
              </span>
              <button
                onClick={() => {
                  onSwitchMode();
                  resetForm();
                }}
                className="text-[#b8860b] hover:text-[#9d7309] text-sm font-medium ml-2 disabled:opacity-50"
                disabled={loading || googleLoading}
              >
                {mode === 'login' ? t('auth.signup') : t('auth.signIn')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
