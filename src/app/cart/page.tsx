'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Cart } from '@/components/Cart';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  quantity: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    // Mark as client-side to avoid hydration issues
    setIsClient(true);
    
    // Get cart items and table number from localStorage
    const storedCart = localStorage.getItem('cartItems');
    const storedTableNumber = localStorage.getItem('tableNumber');
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    }
    setIsLoggedIn(loginStatus);
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    if (isClient) {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    if (isClient) {
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    }
  };

  const handleCheckout = () => {
    if (!isClient) return; // Prevent execution during SSR
    
    // Generate order data with client-side only values
    const now = new Date();
    const orderData = {
      items: cartItems,
      tableNumber,
      orderTime: now.toISOString(),
      orderId: `ORD${now.getTime()}`,
      status: 'confirmed' as const
    };

    if (!isLoggedIn) {
      // Require login before confirming order
      localStorage.setItem('pendingOrder', JSON.stringify(orderData));
      router.push('/auth?returnUrl=/order');
      return;
    }
    
    localStorage.setItem('currentOrder', JSON.stringify(orderData));
    localStorage.removeItem('cartItems'); // Clear cart after order
    router.push('/order');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/menu" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Menu</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Cart
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
          tableNumber={tableNumber}
        />
      </div>
    </div>
  );
}