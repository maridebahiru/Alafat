
interface CartSummaryProps {
  totalItems: number;
  totalAmount: number;
  onCheckout: () => void;
  cartSummaryText: string;
  itemsText: string;
  checkoutText: string;
}

const CartSummary = ({ totalItems, totalAmount, onCheckout, cartSummaryText, itemsText, checkoutText }: CartSummaryProps) => {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 z-30">
      <h3 className="font-semibold text-primary mb-2">{cartSummaryText}</h3>
      <p className="text-sm text-gray-600 mb-3">
        {totalItems} {itemsText} - {totalAmount} ETB
      </p>
      <button 
        onClick={onCheckout}
        className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
      >
        {checkoutText}
      </button>
    </div>
  );
};

export default CartSummary;
