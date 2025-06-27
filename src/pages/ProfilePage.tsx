
import { useState } from 'react';
import { User, QrCode, Globe, LogOut, Trash2, Shield, FileText } from 'lucide-react';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import QRCodeModal from '../components/QRCodeModal';

const ProfilePage = () => {
  const { currentUser, userProfile, logout } = useAuth();
  const [showQRModal, setShowQRModal] = useState(false);
  const [language, setLanguage] = useState<'en' | 'am'>('en');
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

  const texts = {
    en: {
      profile: 'Profile',
      personalInfo: 'Personal Info',
      logout: 'Logout',
      deleteAccount: 'Delete Account',
      aboutService: 'About Service',
      privacyPolicy: 'Privacy Policy',
      language: 'Language',
      confirmDelete: 'Are you sure you want to delete your account? This action cannot be undone.',
      cancel: 'Cancel',
      delete: 'Delete',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone Number',
      location: 'Location',
      baptizedName: 'Baptized Name'
    },
    am: {
      profile: 'መገለጫ',
      personalInfo: 'የግል መረጃ',
      logout: 'ውጣ',
      deleteAccount: 'መለያ ማጥፋት',
      aboutService: 'ስለ አገልግሎት',
      privacyPolicy: 'የፍላጎት ፖሊሲ',
      language: 'ቋንቋ',
      confirmDelete: 'መለያዎን መሰረዝ እርግጠኛ ነዎት? ይህ ድርጊት መመለስ አይችልም።',
      cancel: 'ሰርዝ',
      delete: 'አጥፋ',
      fullName: 'ሙሉ ስም',
      email: 'ኢሜይል',
      phone: 'ስልክ ቁጥር',
      location: 'አካባቢ',
      baptizedName: 'የጥምቀት ስም'
    }
  };

  const t = texts[language];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Profile Header */}
        <div 
          className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-r from-primary to-primary/80"
          style={{
            backgroundImage: `linear-gradient(rgba(60, 16, 18, 0.8), rgba(60, 16, 18, 0.8)), url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop')`,
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
                <span className="font-medium">{t.language}</span>
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
              {t.personalInfo}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">{t.fullName}</label>
                <p className="font-medium">{userProfile?.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t.email}</label>
                <p className="font-medium">{userProfile?.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t.phone}</label>
                <p className="font-medium">{userProfile?.phoneNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t.location}</label>
                <p className="font-medium">{userProfile?.location}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600">{t.baptizedName}</label>
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
                <span>{t.logout}</span>
              </div>
            </button>
            
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
            >
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5" />
                <span>{t.deleteAccount}</span>
              </div>
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow-md">
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <span>{t.aboutService}</span>
              </div>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <span>{t.privacyPolicy}</span>
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
              <p className="text-gray-600 mb-6">{t.confirmDelete}</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  {t.delete}
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
