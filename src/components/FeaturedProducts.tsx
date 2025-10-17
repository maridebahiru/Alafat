
import { useState, useEffect } from 'react';
import { ShoppingCart, MapPin } from 'lucide-react';
import { getProducts } from '../services/productService';
import { Product } from '../services/types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturedProductsProps {
  onAddToCart?: (product: Product) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  const { userProfile } = useAuth();
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Only fetch products for user's location or 'both'
        const fetchedProducts = await getProducts(userProfile?.location);
        setProducts(fetchedProducts.slice(0, 3));
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

  const getLocationDisplay = (location: string) => {
    switch (location) {
      case 'DD':
        return t('location.dd');
      case 'AA':
        return t('location.aa');
      case 'both':
        return t('location.both');
      default:
        return location;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">{t('featured.products')}</h3>
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary">{t('featured.products')}</h3>
        <p className="text-gray-600">{t('featured.noProducts')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">{t('featured.products')}</h3>
        <button className="text-secondary-dark hover:text-primary text-sm font-medium">
          {t('featured.shopAll')}
        </button>
      </div>
      
      <div className="flex overflow-x-auto gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible scrollbar-hide snap-x snap-mandatory">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-[280px] md:w-auto snap-start">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 truncate flex-1">{product.name}</h4>
                <div className="flex items-center text-xs text-gray-500 ml-2">
                  <MapPin size={12} className="mr-1" />
                  <span>{getLocationDisplay(product.location)}</span>
                </div>
              </div>
              <p className="text-secondary-dark font-bold text-lg mb-3">
                {product.price} Ethiopian Birr
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-3 rounded-md flex items-center justify-center space-x-2 transition-colors text-sm"
              >
                <ShoppingCart size={16} />
                <span>{t('common.addToCart')}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
