import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

const QRScanner = ({ isOpen, onClose, onScan }: QRScannerProps) => {
  const [error, setError] = useState<string>('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanning = useRef(false);

  useEffect(() => {
    if (isOpen && !isScanning.current) {
      startScanning();
    }

    return () => {
      stopScanning();
    };
  }, [isOpen]);

  const startScanning = async () => {
    try {
      setError('');
      
      // Check if already scanning
      if (isScanning.current) {
        return;
      }

      // Check for camera permissions first
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (permError) {
        setError('Camera permission denied. Please allow camera access in your browser settings.');
        return;
      }

      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;
      
      // Get available cameras
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length === 0) {
        setError('No cameras found on this device.');
        return;
      }

      isScanning.current = true;

      // Prefer back camera (environment facing)
      const backCamera = devices.find(device => 
        device.label.toLowerCase().includes('back') || 
        device.label.toLowerCase().includes('environment')
      );
      const cameraId = backCamera ? backCamera.id : devices[0].id;

      await scanner.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          disableFlip: false
        },
        (decodedText) => {
          // Successfully scanned
          onScan(decodedText);
          stopScanning();
          onClose();
        },
        (errorMessage) => {
          // Ignore continuous scanning errors - they're normal
        }
      );
    } catch (err: any) {
      let errorMsg = 'Failed to start camera. ';
      
      if (err.name === 'NotAllowedError') {
        errorMsg = 'Camera access denied. Please allow camera permissions in your browser.';
      } else if (err.name === 'NotFoundError') {
        errorMsg = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError') {
        errorMsg = 'Camera is already in use by another application.';
      } else {
        errorMsg += 'Please check your camera and permissions.';
      }
      
      setError(errorMsg);
      isScanning.current = false;
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error('Error stopping scanner:', err);
      }
      scannerRef.current = null;
      isScanning.current = false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-medium">Scan QR Code</h3>
          </div>
          <button
            onClick={() => {
              stopScanning();
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div id="qr-reader" className="w-full rounded-lg overflow-hidden bg-gray-100 min-h-[300px]"></div>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm text-gray-600 text-center font-medium">
              Position the QR code within the frame to scan
            </p>
            <p className="text-xs text-gray-500 text-center">
              Make sure the QR code is well-lit and centered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
