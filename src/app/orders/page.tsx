'use client';

import OrderTracking from '../../components/OrderTracking';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';

export default function OrdersPage() {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <OrderTracking />
          <BottomNavigation />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}