'use client';

import RestaurantMenu from '../../components/RestaurantMenu';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';

export default function MenuPage() {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <RestaurantMenu />
          <BottomNavigation />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}