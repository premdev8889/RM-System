'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { OrderTracking } from '@/components/OrderTracking';
import { Button } from '@/components/Button';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  isVeg: boolean;
}

interface OrderData {
  orderId: string;
  items: OrderItem[];
  tableNumber: string;
  orderTime: string;
  status: 'confirmed' | 'preparing' | 'ready' | 'delivered';
  estimatedTime: number;
}

export default function OrderPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      setOrderData({
        ...order,
        estimatedTime: 25 // Default estimated time in minutes
      });
    } else {
      // Redirect to menu if no order found
      router.push('/menu');
    }
  }, [router]);

  const handlePayNow = () => {
    setShowPayment(true);
    // Simulate payment process
    setTimeout(() => {
      router.push('/payment');
    }, 1000);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  const getTotalAmount = () => {
    const subtotal = orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const serviceCharge = 20;
    return subtotal + gst + serviceCharge;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/menu" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Menu</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Order Status</h1>
            </div>
            
            {orderData.status === 'delivered' && (
              <Link href="/bill">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  View Bill & Pay ₹{getTotalAmount()}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Order Tracking Content */}
      <OrderTracking orderData={orderData} />

      {/* Payment Reminder */}
      {orderData.status === 'delivered' && !showPayment && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-green-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-800">Ready for Payment</h3>
                <p className="text-green-700 text-sm">Your order has been delivered. Please proceed to payment.</p>
              </div>
              <Link href="/bill">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  View Bill
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}