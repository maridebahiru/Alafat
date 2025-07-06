
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CheckoutModal from '../components/CheckoutModal';
import ShopHeader from '../components/shop/ShopHeader';
import SearchBar from '../components/shop/SearchBar';
import CategoryFilter from '../components/shop/CategoryFilter';
import ProductGrid from '../components/shop/ProductGrid';
import Pagination from '../components/shop/Pagination';
import CartSummary from '../components/shop/CartSummary';
import { getProducts } from '../services/productService';
import { Product } from '../services/types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CartItem extends Product {
  quantity: number;
}

const ShopPage = () => {
  const { userProfile } = useAuth();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getProducts(userProfile?.location);
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setLoading(false);
    };

    if (userProfile?.location) {
      fetchProducts();
    }
  }, [userProfile?.location]);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchTerm]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
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

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalAmount = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setShowCheckoutModal(true);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <ShopHeader
          title={t('shop.title')}
          description={t('shop.description')}
          totalItems={getTotalItems()}
        />

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder={t('shop.searchPlaceholder')}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          filterLabel={t('shop.filterByCategory')}
        />

        <ProductGrid
          products={currentProducts}
          onAddToCart={addToCart}
          loading={loading}
          noProductsMessage={t('shop.noProducts')}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          previousText={t('common.previous')}
          nextText={t('common.next')}
        />

        <CartSummary
          totalItems={getTotalItems()}
          totalAmount={getTotalAmount()}
          onCheckout={handleCheckout}
          cartSummaryText={t('shop.cartSummary')}
          itemsText={t('shop.items')}
          checkoutText={t('common.checkout')}
        />

        <CheckoutModal
          isOpen={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          cartItems={cart}
          totalAmount={getTotalAmount()}
        />
      </div>
    </Layout>
  );
};

export default ShopPage;
