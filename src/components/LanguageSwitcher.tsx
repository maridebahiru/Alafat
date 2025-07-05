
import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'am')}
        className="text-sm border-none bg-transparent focus:outline-none text-gray-700"
      >
        <option value="en">EN</option>
        <option value="am">አማ</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
