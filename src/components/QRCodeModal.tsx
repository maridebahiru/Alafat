
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const QRCodeModal = ({ isOpen, onClose, data }: QRCodeModalProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (isOpen && data) {
      const generateQR = async () => {
        try {
          const url = await QRCode.toDataURL(JSON.stringify(data));
          setQrCodeUrl(url);
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      };
      generateQR();
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Your QR Code</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-center">
          {qrCodeUrl && (
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
          )}
          <p className="text-sm text-gray-600">
            Share this QR code to share your profile information
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
