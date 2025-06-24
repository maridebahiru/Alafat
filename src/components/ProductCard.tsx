
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{product.name}</h3>
        <p className="text-secondary-dark font-bold text-xl mb-3">
          ${product.price.toFixed(2)}
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
