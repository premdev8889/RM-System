'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { PaymentInvoice } from '@/components/PaymentInvoice';
import { PaymentScanner } from '@/components/PaymentScanner';
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
}

export default function PaymentPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    // Get order data from localStorage
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    } else {
      // Redirect to menu if no order found
      router.push('/menu');
    }
  }, [router]);

  const getTotalAmount = () => {
    if (!orderData) return 0;
    const subtotal = orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const serviceCharge = 20;
    return subtotal + gst + serviceCharge;
  };

  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    // Clear order data from localStorage
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('cartItems');
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const handlePaymentFailed = (error: string) => {
    console.error('Payment failed:', error);
    // You can show an error message or handle the failure
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (paymentCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <CheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for dining with us. Your payment has been processed successfully.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">Order ID: {orderData.orderId}</p>
            <p className="text-green-700">Amount Paid: ₹{getTotalAmount()}</p>
            <p className="text-green-700">Table: {orderData.tableNumber}</p>
          </div>
          <p className="text-sm text-gray-500">
            Redirecting to home page in a few seconds...
          </p>
          <div className="mt-4">
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/order" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Order</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Payment</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Invoice */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <PaymentInvoice
              orderId={orderData.orderId}
              items={orderData.items}
              tableNumber={orderData.tableNumber}
              orderTime={orderData.orderTime}
            />
          </div>

          {/* Payment Scanner */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Payment</h2>
            {!showScanner ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Ready to Pay?</h3>
                  <p className="text-gray-600 mb-4">
                    Total Amount: <span className="text-2xl font-bold text-red-600">₹{getTotalAmount()}</span>
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    Choose your preferred payment method and complete the transaction.
                  </p>
                </div>
                
                <Button
                  onClick={() => setShowScanner(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                  Proceed to Payment
                </Button>
              </div>
            ) : (
              <PaymentScanner
                amount={getTotalAmount()}
                orderId={orderData.orderId}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentFailed={handlePaymentFailed}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}