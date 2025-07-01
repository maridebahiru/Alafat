
import { useState } from 'react';
import Layout from '../components/Layout';
import { Heart, CreditCard, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createDonation } from '../services/firebaseService';
import { initializeChapaPayment, generateTransactionReference } from '../services/chapaPaymentService';

const DonatePage = () => {
  const { currentUser, userProfile } = useAuth();
  const [donationAmount, setDonationAmount] = useState<number | string>('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [donorInfo, setDonorInfo] = useState({
    message: ''
  });
  const [loading, setLoading] = useState(false);

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
      // Generate transaction reference
      const txRef = generateTransactionReference('DON');
      console.log('Generated transaction reference:', txRef);
      
      // Create donation record in Firebase
      const donationId = await createDonation({
        userId: currentUser?.uid,
        amount: Number(donationAmount),
        currency: 'ETB',
        donationType,
        donorName: userProfile?.fullName || '',
        donorEmail: userProfile?.email || '',
        message: donorInfo.message,
        status: 'pending',
        chapaReference: txRef,
        location: userProfile?.location || 'AA'
      });

      console.log('Donation created with ID:', donationId);
      
      // Prepare payment data
      const paymentData = {
        amount: Number(donationAmount),
        currency: 'ETB',
        email: userProfile.email,
        first_name: userProfile?.fullName?.split(' ')[0] || 'Anonymous',
        last_name: userProfile?.fullName?.split(' ').slice(1).join(' ') || 'Donor',
        phone_number: userProfile?.phoneNumber || undefined,
        tx_ref: txRef,
        callback_url: `${window.location.origin}/donation-callback`,
        return_url: `${window.location.origin}/donation-success`,
        customization: {
          title: 'Alafat Registration Donation',
          description: donorInfo.message || 'Supporting Alafat Registration'
        }
      };

      console.log('Payment data prepared:', paymentData);
      
      // Initialize Chapa payment
      const checkoutUrl = await initializeChapaPayment(paymentData);
      console.log('Chapa checkout URL:', checkoutUrl);

      // Redirect to Chapa checkout
      window.location.href = checkoutUrl;
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
          <h1 className="text-3xl font-bold text-primary mb-4">Make a Donation</h1>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      donationType === 'one-time'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    One-time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      donationType === 'monthly'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 text-gray-700 hover:border-primary'
                    }`}
                  >
                    Monthly Giving
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Donation Amount (ETB)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="Enter amount in Ethiopian Birr"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={donorInfo.message}
                  onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                  placeholder="Share why you're supporting us..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!donationAmount || loading}
                className="w-full bg-gradient-to-r from-primary to-secondary-dark hover:from-primary/90 hover:to-secondary-dark/90 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>
                  {loading ? 'Processing...' : 'Donate with Chapa'}
                </span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                🔒 Secure payment processing through CHAPA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;
