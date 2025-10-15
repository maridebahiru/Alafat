
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLoader } from '../components/PageLoader';

const DonatePage = () => {
  const { currentUser, userProfile } = useAuth();
  const { t } = useLanguage();
  const [donationAmount, setDonationAmount] = useState<number | string>('');
  const [donorInfo, setDonorInfo] = useState({
    message: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationAmount || Number(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    if (!userProfile?.email) {
      alert('Please complete your profile before donating');
      return;
    }

    setLoading(true);

    try {
      // For now, just show a success message
      alert('Thank you for your donation! Payment processing will be available soon.');
      
      // Reset form
      setDonationAmount('');
      setDonorInfo({ message: '' });
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">{t('donate.title')}</h1>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('donate.amount')} (Birr)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg font-semibold">
                    Birr
                  </span>
                  <input
                    type="number"
                    placeholder="Enter amount in Birr"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                    step="1"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('donate.message')}
                </label>
                <textarea
                  rows={3}
                  value={donorInfo.message}
                  onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                  placeholder={t('donate.messagePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!donationAmount || loading}
                className="w-full bg-gradient-to-r from-primary to-secondary-dark hover:from-primary/90 hover:to-secondary-dark/90 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('donate.processing') : t('donate.submit')}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                {t('donate.secure')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;
