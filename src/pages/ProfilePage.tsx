
import { useState } from 'react';
import { User, QrCode, Globe, LogOut, Trash2, Shield, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import QRCodeModal from '../components/QRCodeModal';

const ProfilePage = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showQRModal, setShowQRModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    console.log('Delete account requested');
    setShowDeleteConfirm(false);
  };

  const qrData = {
    uid: currentUser?.uid,
    name: userProfile?.fullName,
    email: userProfile?.email,
    phone: userProfile?.phoneNumber,
    location: userProfile?.location,
    baptizedName: userProfile?.baptizedName
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Profile Header */}
        <div 
          className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-r from-primary to-primary/80"
          style={{
            backgroundImage: `linear-gradient(rgba(60, 16, 18, 0.6), rgba(60, 16, 18, 0.6)), url('/lovable-uploads/ba20a4a5-84df-4981-acf0-cae01c447072.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute bottom-4 left-4 flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <div className="text-white">
              <h2 className="text-lg sm:text-xl font-bold">{userProfile?.fullName}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm sm:text-base">{currentUser?.email}</span>
                <button
                  onClick={() => setShowQRModal(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-1 rounded transition-colors"
                >
                  <QrCode size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Language Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-primary" />
                <span className="font-medium">{t('nav.profile')}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    language === 'en' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('am')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    language === 'am' 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  አማርኛ
                </button>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium text-lg mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary" />
              {t('auth.fullName')}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">{t('auth.fullName')}</label>
                <p className="font-medium">{userProfile?.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t('auth.email')}</label>
                <p className="font-medium">{userProfile?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Phone</label>
                <p className="font-medium">{userProfile?.phoneNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Location</label>
                <p className="font-medium">{userProfile?.location}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">Baptized Name</label>
                <p className="font-medium">{userProfile?.baptizedName}</p>
              </div>
            </div>
          </div>

          {/* Account Options */}
          <div className="bg-white rounded-lg shadow-md">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-gray-600" />
                <span>Logout</span>
              </div>
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-md">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span>About Service</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span>Privacy Policy</span>
              </div>
            </button>
          </div>
        </div>

        {/* QR Code Modal */}
        <QRCodeModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          data={qrData}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
