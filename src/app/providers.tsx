'use client';

import React from 'react';
import { CartProvider } from '../components/CartContext';
import { OrderProvider } from '../components/OrderContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OrderProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </OrderProvider>
  );
}