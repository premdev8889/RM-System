'use client';

import Profile from '../../components/Profile';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';

export default function ProfilePage() {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Profile />
          <BottomNavigation />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}