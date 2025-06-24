
import { Link, useLocation } from 'react-router-dom';
import { Home, Play, ShoppingBag, Heart } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Songs', href: '/songs', icon: Play },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Donate', href: '/donate', icon: Heart },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
      <div className="grid grid-cols-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                active
                  ? 'text-primary bg-secondary bg-opacity-20'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              <Icon size={20} className="mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
