'use client';

import RestaurantMenu from '../../components/RestaurantMenu';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
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
          <RestaurantMenu />
          <BottomNavigation onTabClick={handleTabClick} />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}