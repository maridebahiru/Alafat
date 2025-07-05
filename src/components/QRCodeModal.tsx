
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import QRCode from 'qrcode';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const QRCodeModal = ({ isOpen, onClose, data }: QRCodeModalProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && data) {
      const generateQR = async () => {
        try {
          const qrData = JSON.stringify(data);
          const url = await QRCode.toDataURL(qrData, {
            width: 256,
            margin: 2,
            color: {
              dark: '#3C1012',
              light: '#FFFFFF'
            }
          });
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
      <div className="bg-white rounded-lg w-full max-w-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Profile QR Code</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 text-center">
          {qrCodeUrl ? (
            <img src={qrCodeUrl} alt="Profile QR Code" className="mx-auto mb-4" />
          ) : (
            <div className="w-64 h-64 bg-gray-200 animate-pulse rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500">Generating QR Code...</span>
            </div>
          )}
          <p className="text-sm text-gray-600">
            Scan this QR code to access your profile information
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
