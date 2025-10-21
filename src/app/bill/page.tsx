'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { BillDisplay } from '@/components/BillDisplay';
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

export default function BillPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      const order = JSON.parse(storedOrder);
      // Only show bill if order is delivered
      if (order.status === 'delivered') {
        setOrderData(order);
      } else {
        // Redirect back to order page if not delivered yet
        router.push('/order');
      }
    } else {
      // Redirect to menu if no order found
      router.push('/menu');
    }
  }, [router]);

  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
    // Clear order data after payment
    setTimeout(() => {
      localStorage.removeItem('currentOrder');
      router.push('/');
    }, 3000);
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bill...</p>
        </div>
      </div>
    );
  }

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for dining with us. Your payment has been processed successfully.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to home page in a few seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/order" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Order</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Bill & Payment</h1>
            </div>
            
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bill Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Order Delivered Successfully</span>
          </div>
          <h2 className="text-xl text-gray-600">
            Your delicious meal has been delivered to Table {orderData.tableNumber}
          </h2>
          <p className="text-gray-500 mt-2">
            Please proceed with the payment using the QR code below
          </p>
        </div>

        {/* Bill Display Component */}
        <div className="flex justify-center">
          <BillDisplay orderData={orderData} />
        </div>

        {/* Payment Actions */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-800 mb-4">Payment Options</h3>
            <div className="space-y-3">
              <Button
                onClick={handlePaymentComplete}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
              >
                Mark as Paid
              </Button>
              <p className="text-sm text-gray-500">
                Click above after completing the payment via UPI
              </p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="font-medium text-blue-800 mb-2">Need Help with Payment?</h4>
            <p className="text-blue-600 text-sm mb-3">
              Our staff is here to assist you with any payment issues.
            </p>
            <p className="text-blue-700 font-medium">Call: +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}