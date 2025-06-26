
import { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, userProfile, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/songs', label: 'Songs' },
    { path: '/shop', label: 'Shop' },
    { path: '/donate', label: 'Donate' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-primary">Alafat Registration</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* User Section */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4 text-primary" />
                  <div className="text-sm">
                    <div className="text-gray-700">{userProfile?.fullName}</div>
                    <div className="text-xs text-gray-500">({userProfile?.location})</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-primary ml-3"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile User Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-primary" />
                  <div className="text-sm">
                    <div className="text-gray-700">{userProfile?.fullName}</div>
                    <div className="text-xs text-gray-500">Location: {userProfile?.location}</div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
