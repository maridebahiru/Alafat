
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'am';
  setLanguage: (lang: 'en' | 'am') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.songs': 'Songs',
    'nav.shop': 'Shop',
    'nav.donate': 'Donate',
    'nav.profile': 'Profile',
    
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.previous': 'Previous',
    'common.next': 'Next',
    'common.addToCart': 'Add to Cart',
    'common.checkout': 'Checkout',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    
    // Home Page
    'home.hero.title': 'Support Alafat Registration',
    'home.hero.description': 'Your donations help us continue our mission of faith, community, and service.',
    'home.hero.donateNow': 'Donate Now',
    'home.hero.learnMore': 'Learn More',
    
    // Shop Page
    'shop.title': 'Shop',
    'shop.description': 'Discover our collection of authentic items',
    'shop.searchPlaceholder': 'Search products...',
    'shop.filterByCategory': 'Filter by category:',
    'shop.noProducts': 'No products found for your search criteria.',
    'shop.cartSummary': 'Cart Summary',
    'shop.items': 'items',
    
    // Donate Page
    'donate.title': 'Make a Donation',
    'donate.donationType': 'Donation Type',
    'donate.oneTime': 'One-time Gift',
    'donate.monthly': 'Monthly Giving',
    'donate.amount': 'Donation Amount (ETB)',
    'donate.amountPlaceholder': 'Enter amount in Ethiopian Birr',
    'donate.message': 'Message (Optional)',
    'donate.messagePlaceholder': 'Share why you\'re supporting us...',
    'donate.submit': 'Donate',
    'donate.processing': 'Processing...',
    'donate.secure': '🔒 Secure payment processing.',
    
    // Songs Page
    'songs.title': 'Sacred Songs',
    'songs.description': 'Listen to our collection of Ethiopian Orthodox Christian music',
    'songs.searchPlaceholder': 'Search songs or artists...',
    'songs.noSongs': 'No songs found for your search criteria.',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign up',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.signIn': 'Sign in',
    'auth.pleaseWait': 'Please wait...',
    
    // Featured Products
    'featured.products': 'Featured Products',
    'featured.songs': 'Featured Songs',
    'featured.shopAll': 'Shop All',
    'featured.noProducts': 'No products available for your location.',
    
    // Location
    'location.dd': 'Dire Dawa',
    'location.aa': 'Addis Ababa',
    'location.both': 'All Locations',
  },
  am: {
    // Navigation
    'nav.home': 'መነሻ',
    'nav.about': 'ስለ እኛ',
    'nav.songs': 'መዝሙሮች',
    'nav.shop': 'ግዢ',
    'nav.donate': 'መዋጮ',
    'nav.profile': 'መገለጫ',
    
    // Common
    'common.loading': 'እየጠብቅ...',
    'common.search': 'ፈልግ...',
    'common.filter': 'ማጣሪያ',
    'common.previous': 'ቀደም',
    'common.next': 'ቀጣይ',
    'common.addToCart': 'ወደ ጋሪ አክል',
    'common.checkout': 'ክፈል',
    'common.cancel': 'ሰርዝ',
    'common.submit': 'ላክ',
    
    // Home Page
    'home.hero.title': 'አላፋት መዝገብን ይደግፉ',
    'home.hero.description': 'የእርስዎ መዋጮ የእምነት፣ የማህበረሰብ እና የአገልግሎት ተልእኮአችንን እንድንቀጥል ይረዳናል።',
    'home.hero.donateNow': 'አሁን ይለግሱ',
    'home.hero.learnMore': 'የበለጠ ያወቁ',
    
    // Shop Page
    'shop.title': 'ግዢ',
    'shop.description': 'የእኛን የመጠቀሚያ ዕቃዎች ስብስብ ያግኙ',
    'shop.searchPlaceholder': 'ምርቶችን ይፈልጉ...',
    'shop.filterByCategory': 'በምድብ ማጣሪያ:',
    'shop.noProducts': 'ለፍለጋዎ ምርት አልተገኘም።',
    'shop.cartSummary': 'የጋሪ ማጠቃለያ',
    'shop.items': 'ዕቃዎች',
    
    // Donate Page
    'donate.title': 'መዋጮ ያድርጉ',
    'donate.donationType': 'የመዋጮ አይነት',
    'donate.oneTime': 'አንድ ጊዜ ስጦታ',
    'donate.monthly': 'ወርሃዊ መስጠት',
    'donate.amount': 'የመዋጮ መጠን (ብር)',
    'donate.amountPlaceholder': 'መጠን በኢትዮጵያ ብር ያስገቡ',
    'donate.message': 'መልዕክት (አማራጭ)',
    'donate.messagePlaceholder': 'ለምን እንደሚደግፉን ያካፍሉ...',
    'donate.submit': 'መዋጮ',
    'donate.processing': 'እየተሰራ...',
    'donate.secure': '🔒 ደህንነቱ የተጠበቀ ክፍያ።',
    
    // Songs Page
    'songs.title': 'ቅዱስ መዝሙሮች',
    'songs.description': 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ሙዚቃ ስብስባችንን ያዳምጡ',
    'songs.searchPlaceholder': 'መዝሙሮችን ወይም አርቲስቶችን ይፈልጉ...',
    'songs.noSongs': 'ለፍለጋዎ መዝሙር አልተገኘም።',
    
    // Auth
    'auth.login': 'ግባ',
    'auth.signup': 'ተመዝገብ',
    'auth.email': 'የኢሜይል አድራሻ',
    'auth.password': 'የይለፍ ቃል',
    'auth.confirmPassword': 'የይለፍ ቃል አረጋግጥ',
    'auth.fullName': 'ሙሉ ስም',
    'auth.forgotPassword': 'የይለፍ ቃል ረሳህ?',
    'auth.noAccount': 'መለያ የለህም?',
    'auth.hasAccount': 'ቀደም ብሎ መለያ አለህ?',
    'auth.signIn': 'ግባ',
    'auth.pleaseWait': 'እባክህ ጠብቅ...',
    
    // Featured Products
    'featured.products': 'የተመረጡ ምርቶች',
    'featured.songs': 'የተመረጡ ዜማዎች',
    'featured.shopAll': 'ሁሉንም ይግዙ',
    'featured.noProducts': 'ለአካባቢዎ ምርት አልተገኘም።',
    
    // Location
    'location.dd': 'ድሬዳዋ',
    'location.aa': 'አዲስ አበባ',
    'location.both': 'ሁሉም አካባቢዎች',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'am'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
