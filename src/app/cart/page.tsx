'use client';

import Cart from '../../components/Cart';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
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
        // Already on cart
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
          <Cart />
          <BottomNavigation activeTab="cart" onTabClick={handleTabClick} />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}