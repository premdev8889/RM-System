'use client';

import QRScanner from '../../components/QRScanner';
import BottomNavigation from '../../components/BottomNavigation';
import { CartProvider } from '../../components/CartContext';
import { OrderProvider } from '../../components/OrderContext';

export default function ScannerPage() {
  return (
    <OrderProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <QRScanner />
          <BottomNavigation />
        </div>
      </CartProvider>
    </OrderProvider>
  );
}