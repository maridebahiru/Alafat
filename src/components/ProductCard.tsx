
import { ShoppingCart } from 'lucide-react';
import { Product } from '../services/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div 
        className="h-48 bg-cover bg-center bg-gray-200"
        style={{ backgroundImage: product.image ? `url(${product.image})` : undefined }}
      />
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-primary">{product.price} ETB</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
