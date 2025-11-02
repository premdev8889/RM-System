'use client';

import Cart from '../../components/Cart';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';

export default function CartPage() {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Cart />
          <BottomNavigation />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}