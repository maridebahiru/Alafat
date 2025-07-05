
import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { getProducts } from '../services/productService';
import { Product } from '../services/types';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturedProducts = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts.slice(0, 3)); // Get first 3 products as featured
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
          <ShoppingBag className="w-6 h-6 mr-2" />
          Featured Products
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
        <ShoppingBag className="w-6 h-6 mr-2" />
        Featured Products
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className="h-32 bg-cover bg-center bg-gray-200"
              style={{ backgroundImage: product.image ? `url(${product.image})` : undefined }}
            />
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{product.price} ETB</span>
                <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded text-sm transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <a
          href="/shop"
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
        >
          View All Products →
        </a>
      </div>
    </div>
  );
};

export default FeaturedProducts;
