
import { useState } from 'react';
import Layout from '../components/Layout';
import { Heart, CreditCard, DollarSign } from 'lucide-react';

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState<number | string>('');
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const presetAmounts = [25, 50, 100, 250, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your payment processor
    console.log('Donation submitted:', {
      amount: donationAmount,
      type: donationType,
      donor: donorInfo
    });
    alert('Thank you for your generous donation! This would integrate with CHAPA payment gateway.');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">Support Alafat Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your generous donations help us continue our mission of faith, community service, 
            and preserving Ethiopian Orthodox Christian traditions for future generations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Impact Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">📚</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Education</h3>
              <p className="text-sm text-gray-600">Supporting religious education and cultural preservation</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">🤝</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Community</h3>
              <p className="text-sm text-gray-600">Building stronger communities through faith and service</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-primary font-bold text-xl">⛪</span>
              </div>
              <h3 className="font-semibold text-primary mb-2">Worship</h3>
              <p className="text-sm text-gray-600">Maintaining sacred spaces and worship traditions</p>
            </div>
          </div>

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
                  Donation Amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => setDonationAmount(amount)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        donationAmount === amount
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 text-gray-700 hover:border-primary'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="1"
                    step="0.01"
                  />
                </div>
              </div>

              {/* Donor Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Donor Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={donorInfo.name}
                    onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={donorInfo.email}
                    onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={donorInfo.message}
                    onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                    placeholder="Share why you're supporting Alafat Registration..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!donationAmount || !donorInfo.name || !donorInfo.email}
                className="w-full bg-gradient-to-r from-primary to-secondary-dark hover:from-primary/90 hover:to-secondary-dark/90 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>
                  Donate ${donationAmount} {donationType === 'monthly' ? '/month' : ''}
                </span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                🔒 Secure payment processing through CHAPA. Your donation is tax-deductible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;
