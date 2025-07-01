
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <div className="flex bg-gray-100 rounded-md p-1">
        <button
          onClick={() => setLanguage('en')}
          className={`px-2 py-1 text-xs rounded ${
            language === 'en'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('am')}
          className={`px-2 py-1 text-xs rounded ${
            language === 'am'
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          አማ
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
