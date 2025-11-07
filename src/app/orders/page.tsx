'use client';

import OrderTracking from '../../components/OrderTracking';
import BottomNavigation from '../../components/BottomNavigation';

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-white">
      <OrderTracking />
      <BottomNavigation />
    </div>
  );
}