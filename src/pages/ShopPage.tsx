
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ShopHeader from '../components/shop/ShopHeader';
import SearchBar from '../components/shop/SearchBar';
import CategoryFilter from '../components/shop/CategoryFilter';
import ProductGrid from '../components/shop/ProductGrid';
import Pagination from '../components/shop/Pagination';
import CartDrawer from '../components/CartDrawer';
import ThankYouPage from '../components/ThankYouPage';
import { getProducts } from '../services/productService';
import { generateReceiptNumber, downloadReceipt } from '../services/receiptService';
import { Product } from '../services/types';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { PageLoader } from '../components/PageLoader';

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
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [lastReceiptData, setLastReceiptData] = useState<any>(null);
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

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalAmount = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleProceed = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    const receiptData = {
      cartItems: cart,
      totalAmount: getTotalAmount(),
      customerName: userProfile?.fullName,
      date: new Date(),
      receiptNumber: generateReceiptNumber(),
    };

    setLastReceiptData(receiptData);
    
    // Generate and download PDF
    downloadReceipt(receiptData);
    
    // Clear cart and show thank you page
    setCart([]);
    setShowCartDrawer(false);
    setShowThankYou(true);
  };

  const handleBackToShopping = () => {
    setShowThankYou(false);
  };

  const handleDownloadReceipt = () => {
    if (lastReceiptData) {
      downloadReceipt(lastReceiptData);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <ShopHeader
          title={t('shop.title')}
          description={t('shop.description')}
          totalItems={getTotalItems()}
          onCartClick={() => setShowCartDrawer(true)}
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

        <CartDrawer
          isOpen={showCartDrawer}
          onClose={() => setShowCartDrawer(false)}
          cartItems={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onProceed={handleProceed}
        />

        <ThankYouPage
          isVisible={showThankYou}
          onBackToShopping={handleBackToShopping}
          onDownloadReceipt={handleDownloadReceipt}
        />
      </div>
    </Layout>
  );
};

export default ShopPage;
