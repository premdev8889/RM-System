'use client';

import React from 'react';
import { Receipt, Clock, MapPin, Utensils } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  isVeg: boolean;
}

interface PaymentInvoiceProps {
  orderId: string;
  items: OrderItem[];
  tableNumber: string;
  orderTime: string;
  restaurantName?: string;
}

export const PaymentInvoice: React.FC<PaymentInvoiceProps> = ({
  orderId,
  items,
  tableNumber,
  orderTime,
  restaurantName = "FoodieExpress"
}) => {
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const serviceCharge = 20; // Fixed service charge
  const total = subtotal + gst + serviceCharge;

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center border-b pb-4 mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Receipt className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-800">Payment Invoice</h2>
        </div>
        <h3 className="text-lg font-semibold text-red-600">{restaurantName}</h3>
        <p className="text-sm text-gray-600">Thank you for dining with us!</p>
      </div>

      {/* Order Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Receipt className="w-4 h-4" />
          <span>Order ID: <span className="font-mono font-semibold">{orderId}</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>Table Number: <span className="font-semibold">{tableNumber}</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Order Time: <span className="font-semibold">{formatTime(orderTime)}</span></span>
        </div>
      </div>

      {/* Items List */}
      <div className="border-t border-b py-4 mb-4">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Utensils className="w-4 h-4" />
          Order Items
        </h4>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </div>
                <div className="text-xs text-gray-600">
                  ₹{item.price} × {item.quantity}
                </div>
              </div>
              <div className="text-sm font-semibold text-gray-800">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Calculation */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-800">₹{subtotal}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">GST (5%)</span>
          <span className="text-gray-800">₹{gst}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Service Charge</span>
          <span className="text-gray-800">₹{serviceCharge}</span>
        </div>
        
        <div className="border-t pt-2">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-800">Total Amount</span>
            <span className="text-red-600">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t pt-4">
        <p>Please scan the QR code below to complete payment</p>
        <p className="mt-1">GST No: 07AABCU9603R1ZX</p>
      </div>
    </div>
  );
};