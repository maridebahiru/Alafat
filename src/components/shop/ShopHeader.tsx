
import { ShoppingCart } from 'lucide-react';

interface ShopHeaderProps {
  title: string;
  description: string;
  totalItems: number;
  onCartClick?: () => void;
}

const ShopHeader = ({ title, description, totalItems, onCartClick }: ShopHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="relative">
        <button
          onClick={onCartClick}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ShoppingCart className="w-8 h-8 text-primary" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary-dark text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShopHeader;
