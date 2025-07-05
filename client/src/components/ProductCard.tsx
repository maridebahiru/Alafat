import { ShoppingCart, MapPin } from 'lucide-react';
import { Product } from '../services/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getLocationDisplay = (location: string) => {
    switch (location) {
      case 'DD':
        return 'Dire Dawa';
      case 'AA':
        return 'Addis Ababa';
      case 'both':
        return 'All Locations';
      default:
        return location;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 flex-1">{product.name}</h3>
          <div className="flex items-center text-xs text-gray-500 ml-2">
            <MapPin size={12} className="mr-1" />
            <span>{getLocationDisplay(product.location)}</span>
          </div>
        </div>
        <p className="text-secondary-dark font-bold text-xl mb-3">
          {product.price} Ethiopian Birr
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors"
        >
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
