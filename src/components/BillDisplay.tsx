'use client';

import React from 'react';
import { Receipt, QrCode, Clock, MapPin, Phone } from 'lucide-react';

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

interface BillDisplayProps {
  orderData: OrderData;
}

export const BillDisplay: React.FC<BillDisplayProps> = ({ orderData }) => {
  const subtotal = orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const gst = Math.round(subtotal * 0.05);
  const serviceCharge = 20;
  const totalAmount = subtotal + gst + serviceCharge;

  // Generate UPI payment string
  const upiString = `upi://pay?pa=restaurant@paytm&pn=Delicious%20Restaurant&am=${totalAmount}&cu=INR&tn=Order%20${orderData.orderId}`;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Receipt className="w-8 h-8" />
          <div>
            <h2 className="text-xl font-bold">Bill & Payment</h2>
            <p className="text-red-100">Order #{orderData.orderId}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Table {orderData.tableNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{new Date(orderData.orderTime).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Bill Details */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
        
        {/* Items */}
        <div className="space-y-3 mb-6">
          {orderData.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full border ${
                  item.isVeg ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full m-0.75 ${
                    item.isVeg ? 'bg-green-600' : 'bg-red-600'
                  }`}></div>
                </div>
                <span className="text-gray-800">{item.name}</span>
                <span className="text-gray-500 text-sm">x{item.quantity}</span>
              </div>
              <span className="font-medium">₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Bill Breakdown */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Charge</span>
            <span>₹{serviceCharge}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-red-600">₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment QR Code */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="w-5 h-5 text-gray-600" />
            <h4 className="font-semibold text-gray-800">Scan to Pay</h4>
          </div>
          
          {/* QR Code Container */}
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              {/* QR Code Placeholder - In real app, use a QR code library */}
              <div className="grid grid-cols-8 gap-1 w-40 h-40">
                {Array.from({ length: 64 }, (_, i) => {
                  // Create deterministic pattern based on order ID and position
                  const seed = orderData.orderId.charCodeAt(i % orderData.orderId.length) + i;
                  const isBlack = seed % 2 === 0;
                  return (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        isBlack ? 'bg-black' : 'bg-white'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* UPI ID */}
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">UPI ID</p>
            <p className="font-mono text-blue-700 font-medium">restaurant@paytm</p>
          </div>

          {/* Payment Instructions */}
          <div className="text-left bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-2">Payment Instructions:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Scan QR code with any UPI app</li>
              <li>• Or use UPI ID: restaurant@paytm</li>
              <li>• Amount: ₹{totalAmount}</li>
              <li>• Reference: Order #{orderData.orderId}</li>
            </ul>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 rounded-lg">
          <Phone className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm font-medium text-red-800">Need Help?</p>
            <p className="text-sm text-red-600">Call: +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
};