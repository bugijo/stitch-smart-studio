
import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MobileNavigation from '@/components/layout/MobileNavigation';

interface LayoutProps {
  children: ReactNode;
  showMobileNav?: boolean;
}

export default function Layout({ children, showMobileNav = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>
      {showMobileNav && <MobileNavigation />}
    </div>
  );
}
