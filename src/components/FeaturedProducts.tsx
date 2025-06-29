
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { getProducts } from '../services/productService';
import { Product } from '../services/types';
import { useAuth } from '../contexts/AuthContext';

interface FeaturedProductsProps {
  onAddToCart?: (product: Product) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  const { userProfile } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await getProducts(userProfile?.location);
        setProducts(fetchedProducts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [userProfile?.location]);

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    console.log('Product added to cart:', product);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Featured Products</h3>
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">Featured Products</h3>
        <p className="text-gray-600">No products available for your location.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Featured Products</h3>
        <button className="text-secondary-dark hover:text-primary text-sm font-medium">
          Shop All
        </button>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex space-x-4 w-max">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-64 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h4>
                <p className="text-secondary-dark font-bold text-lg mb-3">
                  {product.price} Ethiopian Birr
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-3 rounded-md flex items-center justify-center space-x-2 transition-colors text-sm"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
