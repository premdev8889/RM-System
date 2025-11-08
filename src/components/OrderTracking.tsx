'use client';

import { useOrder, OrderStatus } from './OrderContext';
import BackButton from './BackButton';
import BottomNavigation from './BottomNavigation';

interface OrderTrackingProps {
  onBackClick?: () => void;
}

export default function OrderTracking({ onBackClick }: OrderTrackingProps) {
  const { orders, currentOrder } = useOrder();

  const getStatusIcon = (status: OrderStatus, isActive: boolean) => {
    const baseClasses = `w-8 h-8 rounded-full flex items-center justify-center ${
      isActive ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-400'
    }`;

    switch (status) {
      case 'confirmed':
        return (
          <div className={baseClasses}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'preparing':
        return (
          <div className={baseClasses}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'ready':
        return (
          <div className={baseClasses}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'completed':
        return (
          <div className={baseClasses}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={baseClasses}>
            <div className="w-2 h-2 bg-current rounded-full"></div>
          </div>
        );
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return 'Order Confirmed';
      case 'preparing': return 'Preparing Your Order';
      case 'ready': return 'Order Ready';
      case 'completed': return 'Order Completed';
      default: return 'Processing';
    }
  };

  const getStatusDescription = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed': return 'Your order has been confirmed and sent to the kitchen';
      case 'preparing': return 'Our chefs are preparing your delicious meal';
      case 'ready': return 'Your order is ready for pickup!';
      case 'completed': return 'Thank you for your order! We hope you enjoyed your meal';
      default: return 'Processing your order';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEstimatedReadyTime = (orderTime: Date, estimatedMinutes: number) => {
    const readyTime = new Date(orderTime.getTime() + estimatedMinutes * 60000);
    return formatTime(readyTime);
  };

  if (!currentOrder && orders.length === 0) {
    return (
      <div className="min-h-[100%] bg-gray-50 ">
        <BackButton onClick={onBackClick} />
        
        <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] px-4">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Orders Yet</h3>
          <p className="text-gray-500 text-center">Place your first order to track its progress here!</p>
        </div>

        <BottomNavigation />
      </div>
    );
  }

  const displayOrder = currentOrder || orders[orders.length - 1];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <BackButton onClick={onBackClick} />
      
      <div className="p-4 space-y-6">
        {/* Order Info */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Order #{displayOrder.id}</h3>
              <p className="text-sm text-gray-500">Placed at {formatTime(displayOrder.orderTime)}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-red-600">₹{displayOrder.totalAmount + 40 + Math.round(displayOrder.totalAmount * 0.18)}</p>
              <p className="text-sm text-gray-500">{displayOrder.items.length} items</p>
            </div>
          </div>

          {displayOrder.estimatedTime && displayOrder.status !== 'completed' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Estimated Ready Time: {getEstimatedReadyTime(displayOrder.orderTime, displayOrder.estimatedTime)}
                  </p>
                  <p className="text-xs text-red-600">
                    Approximately {displayOrder.estimatedTime} minutes from order time
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Order Progress</h4>
          
          <div className="space-y-4">
            {['confirmed', 'preparing', 'ready', 'completed'].map((status, index) => {
              const isActive = ['confirmed', 'preparing', 'ready', 'completed'].indexOf(displayOrder.status) >= index;
              const isCurrent = displayOrder.status === status;
              
              return (
                <div key={status} className="flex items-center">
                  {getStatusIcon(status as OrderStatus, isActive)}
                  <div className="ml-4 flex-1">
                    <p className={`font-medium ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                      {getStatusText(status as OrderStatus)}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-gray-600 mt-1">
                        {getStatusDescription(status as OrderStatus)}
                      </p>
                    )}
                  </div>
                  {isCurrent && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Order Items</h4>
          <div className="space-y-3">
            {displayOrder.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Info */}
        {(displayOrder.customerName || displayOrder.tableNumber || displayOrder.specialInstructions) && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Order Details</h4>
            <div className="space-y-2">
              {displayOrder.customerName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="text-gray-800">{displayOrder.customerName}</span>
                </div>
              )}
              {displayOrder.tableNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Table:</span>
                  <span className="text-gray-800">{displayOrder.tableNumber}</span>
                </div>
              )}
              {displayOrder.specialInstructions && (
                <div>
                  <span className="text-gray-600">Special Instructions:</span>
                  <p className="text-gray-800 mt-1">{displayOrder.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}