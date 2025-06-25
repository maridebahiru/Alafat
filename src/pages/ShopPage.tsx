import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, Filter } from 'lucide-react';
import { getProducts, Product } from '../services/firebaseService';
import { initializeChapaPayment, generateTransactionReference } from '../services/chapaPaymentService';
import { createOrder } from '../services/chapaService';

interface CartItem extends Product {
  quantity: number;
}

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      // Generate transaction reference
      const txRef = generateTransactionReference('ORD');
      
      // Calculate total
      const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      // Create order record in Firebase
      const orderId = await createOrder({
        items: cart.map(item => ({
          productId: item.id || '',
          productName: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount,
        currency: 'ETB',
        status: 'pending',
        chapaReference: txRef
      });

      console.log('Order created:', orderId);
      
      // Initialize Chapa payment
      const checkoutUrl = await initializeChapaPayment({
        amount: totalAmount,
        currency: 'ETB',
        email: 'customer@example.com', // You might want to get this from user
        first_name: 'Customer',
        last_name: 'Name',
        tx_ref: txRef,
        callback_url: `${window.location.origin}/order-callback`,
        return_url: `${window.location.origin}/order-success`,
        customization: {
          title: 'Alafat Registration Shop',
          description: `Order of ${cart.length} items`
        }
      });

      // Redirect to Chapa checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('Error processing checkout. Please try again.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Shop</h1>
            <p className="text-gray-600">Authentic Ethiopian Orthodox Christian items</p>
          </div>
          <div className="relative">
            <ShoppingCart className="w-8 h-8 text-primary" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary-dark text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="fixed bottom-20 md:bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 z-30">
            <h3 className="font-semibold text-primary mb-2">Cart Summary</h3>
            <p className="text-sm text-gray-600 mb-3">
              {getTotalItems()} items - $
              {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
            </p>
            <button 
              onClick={handleCheckout}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
            >
              Checkout with CHAPA
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShopPage;
