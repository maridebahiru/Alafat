
import { ReactNode } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-16 md:pb-0">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};

export default Layout;
