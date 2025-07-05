
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-8 hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/c5c1c99b-6655-46d3-8dfa-8100276eb20e.png" 
                alt="Alafat Logo" 
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-xl font-bold">Alafat</h3>
            </div>
            <p className="text-secondary text-sm">
              Preserving Ethiopian Orthodox traditions through music and community.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">{t('nav.home')}</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="/" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
              <li><a href="/songs" className="hover:text-white transition-colors">{t('nav.songs')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li><a href="/shop" className="hover:text-white transition-colors">{t('nav.shop')}</a></li>
              <li><a href="/donate" className="hover:text-white transition-colors">{t('nav.donate')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <p className="text-sm text-secondary">
              Email: info@alafat.com<br />
              Phone: +251 xxx xxxx
            </p>
          </div>
        </div>
        
        <div className="border-t border-primary/30 mt-6 pt-6 text-center text-sm text-secondary">
          <p>&copy; 2024 Alafat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
