
import { Home, Music, ShoppingBag, Heart, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/songs', icon: Music, label: 'Songs' },
    { path: '/shop', icon: ShoppingBag, label: 'Shop' },
    { path: '/donate', icon: Heart, label: 'Donate' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <a
            key={path}
            href={path}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === path
                ? 'text-primary bg-primary/10'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
