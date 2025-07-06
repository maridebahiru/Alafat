
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuth } from '../contexts/AuthContext';
import { initializePayment } from '../services/checkoutService';
import { Product } from '../services/types';

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
}

const CheckoutModal = ({ isOpen, onClose, cartItems, totalAmount }: CheckoutModalProps) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: userProfile?.fullName?.split(' ')[0] || '',
    last_name: userProfile?.fullName?.split(' ').slice(1).join(' ') || '',
    email: userProfile?.email || '',
    phone_number: userProfile?.phoneNumber || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckout = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      const checkoutData = {
        amount: totalAmount,
        currency: 'ETB',
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        return_url: `${window.location.origin}/payment/success`,
        callback_url: `${window.location.origin}/payment/callback`,
        customization: {
          title: 'Alafat Shop Purchase',
          description: `Payment for ${cartItems.length} items`
        }
      };

      console.log('Initializing payment:', checkoutData);
      
      const response = await initializePayment(checkoutData);
      
      if (response.success && response.data?.checkout_url) {
        // Redirect to Chapa payment page
        window.location.href = response.data.checkout_url;
      } else {
        alert(response.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-1">
                <span>{item.name} x{item.quantity}</span>
                <span>{item.price * item.quantity} ETB</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-semibold">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>{totalAmount} ETB</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="+251911234567"
              />
            </div>
          </div>

          {/* Checkout Button */}
          <div className="flex gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCheckout}
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay ${totalAmount} ETB`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
