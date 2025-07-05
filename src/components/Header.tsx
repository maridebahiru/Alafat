
import { Menu, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/c5c1c99b-6655-46d3-8dfa-8100276eb20e.png" 
              alt="Alafat Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl font-bold text-primary">Alafat</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-primary transition-colors">{t('nav.home')}</a>
              <a href="/about" className="text-gray-700 hover:text-primary transition-colors">{t('nav.about')}</a>
              <a href="/songs" className="text-gray-700 hover:text-primary transition-colors">{t('nav.songs')}</a>
              <a href="/shop" className="text-gray-700 hover:text-primary transition-colors">{t('nav.shop')}</a>
              <a href="/donate" className="text-gray-700 hover:text-primary transition-colors">{t('nav.donate')}</a>
            </nav>
            <LanguageSwitcher />
          </div>

          <div className="flex items-center space-x-4">
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <a href="/profile" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
