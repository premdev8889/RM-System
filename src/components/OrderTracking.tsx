'use client';

import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Utensils, Truck, MapPin, Phone } from 'lucide-react';

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

interface OrderTrackingProps {
  orderData: OrderData;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ orderData }) => {
  const [currentStatus, setCurrentStatus] = useState(orderData.status);
  const [timeRemaining, setTimeRemaining] = useState(orderData.estimatedTime);

  useEffect(() => {
    // Simulate order progress
    const statusProgression = ['confirmed', 'preparing', 'ready', 'delivered'];
    const currentIndex = statusProgression.indexOf(currentStatus);
    
    if (currentIndex < statusProgression.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = statusProgression[currentIndex + 1] as OrderData['status'];
        setCurrentStatus(nextStatus);
        
        // Update localStorage with new status
        const updatedOrder = { ...orderData, status: nextStatus };
        localStorage.setItem('currentOrder', JSON.stringify(updatedOrder));
      }, 30000); // Change status every 30 seconds for demo

      return () => clearTimeout(timer);
    }
  }, [currentStatus, orderData]);

  useEffect(() => {
    // Countdown timer
    if (timeRemaining > 0 && currentStatus !== 'delivered') {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 60000); // Decrease by 1 minute every minute

      return () => clearTimeout(timer);
    }
  }, [timeRemaining, currentStatus]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: CheckCircle,
          title: 'Order Confirmed',
          description: 'Your order has been received and confirmed',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      case 'preparing':
        return {
          icon: Utensils,
          title: 'Preparing Your Food',
          description: 'Our chefs are preparing your delicious meal',
          color: 'text-orange-600',
          bgColor: 'bg-orange-100'
        };
      case 'ready':
        return {
          icon: Truck,
          title: 'Ready for Delivery',
          description: 'Your order is ready and being delivered to your table',
          color: 'text-blue-600',
          bgColor: 'bg-blue-100'
        };
      case 'delivered':
        return {
          icon: CheckCircle,
          title: 'Delivered',
          description: 'Your order has been delivered to your table. Enjoy!',
          color: 'text-green-600',
          bgColor: 'bg-green-100'
        };
      default:
        return {
          icon: Clock,
          title: 'Processing',
          description: 'Processing your order',
          color: 'text-gray-600',
          bgColor: 'bg-gray-100'
        };
    }
  };

  const statusSteps = [
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'preparing', label: 'Preparing' },
    { key: 'ready', label: 'Ready' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex(step => step.key === currentStatus);
  };

  const currentStatusInfo = getStatusInfo(currentStatus);
  const StatusIcon = currentStatusInfo.icon;

  const getTotalAmount = () => {
    const subtotal = orderData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const gst = Math.round(subtotal * 0.05);
    const serviceCharge = 20;
    return subtotal + gst + serviceCharge;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order #{orderData.orderId}</h1>
              <p className="text-gray-600">
                Placed on {new Date(orderData.orderTime).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-red-600 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Table {orderData.tableNumber}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">₹{getTotalAmount()}</p>
            </div>
          </div>

          {/* Current Status */}
          <div className={`${currentStatusInfo.bgColor} rounded-lg p-4 flex items-center gap-4`}>
            <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center`}>
              <StatusIcon className={`w-6 h-6 ${currentStatusInfo.color}`} />
            </div>
            <div className="flex-1">
              <h3 className={`text-lg font-semibold ${currentStatusInfo.color}`}>
                {currentStatusInfo.title}
              </h3>
              <p className="text-gray-700">{currentStatusInfo.description}</p>
            </div>
            {currentStatus !== 'delivered' && timeRemaining > 0 && (
              <div className="text-right">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Est. {timeRemaining} min</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Progress</h2>
          <div className="relative">
            <div className="flex justify-between items-center">
              {statusSteps.map((step, index) => {
                const isCompleted = index <= getCurrentStepIndex();
                const isCurrent = index === getCurrentStepIndex();
                
                return (
                  <div key={step.key} className="flex flex-col items-center relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isCompleted 
                        ? 'bg-red-600 border-red-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${
                      isCurrent ? 'text-red-600' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                    
                    {index < statusSteps.length - 1 && (
                      <div className={`absolute top-5 left-10 w-full h-0.5 ${
                        index < getCurrentStepIndex() ? 'bg-red-600' : 'bg-gray-300'
                      }`} style={{ width: 'calc(100vw / 4 - 2.5rem)' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Items</h2>
          <div className="space-y-3">
            {orderData.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    item.isVeg ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'
                  }`}>
                    <div className={`w-2 h-2 rounded-full m-0.5 ${
                      item.isVeg ? 'bg-green-600' : 'bg-red-600'
                    }`}></div>
                  </div>
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-gray-500">x{item.quantity}</span>
                </div>
                <span className="font-semibold text-gray-800">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-gray-600">Call us at +91 98765 43210 for any assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};