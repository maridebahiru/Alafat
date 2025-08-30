
import { CheckCircle, Download, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface ThankYouPageProps {
  isVisible: boolean;
  onBackToShopping: () => void;
  onDownloadReceipt: () => void;
}

const ThankYouPage = ({ isVisible, onBackToShopping, onDownloadReceipt }: ThankYouPageProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been successfully processed. A receipt has been generated for your records.
        </p>
        
        <div className="space-y-4">
          <Button onClick={onDownloadReceipt} className="w-full" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          <Button onClick={onBackToShopping} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
