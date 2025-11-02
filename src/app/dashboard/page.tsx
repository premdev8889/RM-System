'use client';

import Dashboard from '../../components/Dashboard';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';

export default function DashboardPage() {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Dashboard />
          <BottomNavigation />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}