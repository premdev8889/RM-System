'use client';

import QRScanner from '../../components/QRScanner';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';
import { useRouter } from 'next/navigation';

export default function ScannerPage() {
  const router = useRouter();

  const handleTabClick = (tab: string) => {
    switch (tab) {
      case 'home':
        router.push('/dashboard');
        break;
      case 'search':
        router.push('/search');
        break;
      case 'cart':
        router.push('/cart');
        break;
      case 'orders':
        router.push('/orders');
        break;
      case 'profile':
        router.push('/profile');
        break;
    }
  };

  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <QRScanner />
          <BottomNavigation onTabClick={handleTabClick} />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}