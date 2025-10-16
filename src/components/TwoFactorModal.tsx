import { useState } from 'react';
import { Shield, X, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const TwoFactorModal = ({ isOpen, onClose, onSuccess }: TwoFactorModalProps) => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { sendEmailVerificationCode, verifyEmailCode } = useAuth();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await sendEmailVerificationCode(email);
      setSuccess('Verification code sent to your email!');
      setStep('code');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const isValid = await verifyEmailCode(email, verificationCode);
      if (isValid) {
        setSuccess('Email verified successfully!');
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('email');
    setEmail('');
    setVerificationCode('');
    setError('');
    setSuccess('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg w-full max-w-md shadow-xl border border-border">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Two-Factor Authentication</h3>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    required
                    disabled={loading}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  We'll send a 6-digit verification code to this email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                <span>{loading ? 'Sending...' : 'Send Code'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Verification Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                  disabled={loading}
                />
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  Enter the code sent to {email}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setVerificationCode('');
                    setError('');
                    setSuccess('');
                  }}
                  className="flex-1 py-3 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-all"
                  disabled={loading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || verificationCode.length !== 6}
                  className="flex-1 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>{loading ? 'Verifying...' : 'Verify'}</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Why enable 2FA?</p>
                <p>Two-factor authentication adds an extra layer of security by requiring both your password and a verification code sent to your email.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
