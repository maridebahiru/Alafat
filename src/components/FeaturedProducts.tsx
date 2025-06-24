
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface FeaturedProductsProps {
  onAddToCart?: (product: Product) => void;
}

const FeaturedProducts = ({ onAddToCart }: FeaturedProductsProps) => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Orthodox Cross Pendant',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b/400x400',
      category: 'Jewelry'
    },
    {
      id: 2,
      name: 'Prayer Book - Amharic',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475/400x400',
      category: 'Books'
    },
    {
      id: 3,
      name: 'Ethiopian Orthodox Icon',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d/400x400',
      category: 'Art'
    },
    {
      id: 4,
      name: 'Incense Burner',
      price: 65.00,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1/400x400',
      category: 'Accessories'
    },
    {
      id: 5,
      name: 'Traditional White Dress',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81/400x400',
      category: 'Clothing'
    }
  ];

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      onAddToCart(product);
    }
    console.log('Product added to cart:', product);
  };

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
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow w-64 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h4>
                <p className="text-secondary-dark font-bold text-lg mb-3">
                  ${product.price.toFixed(2)}
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
