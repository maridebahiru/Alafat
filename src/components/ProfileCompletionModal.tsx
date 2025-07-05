
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfileCompletionModal = () => {
  const { currentUser, userProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (currentUser && (!userProfile?.fullName || !userProfile?.location)) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [currentUser, userProfile]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>
        <p className="text-gray-600 mb-6">Please complete your profile to continue using the app.</p>
        <button
          onClick={() => setShowModal(false)}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Complete Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
