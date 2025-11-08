'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { useOrder } from './OrderContext';
import BackButton from './BackButton';

interface CartProps {
  onBackClick?: () => void;
}

export default function Cart({ onBackClick }: CartProps) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const router = useRouter();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    specialInstructions: ''
  });

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePlaceOrder = () => {
    const orderItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      category: item.category || 'Main Course'
    }));

    const orderId = placeOrder(orderItems, customerInfo);
    clearCart();
    
    // Navigate to order tracking
    router.push('/orders');
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className=" bg-gray-50 mb-[80px]">
        <BackButton onClick={onBackClick} />
        
        <div className="flex flex-col items-center justify-center h-96">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 text-center">Add some delicious items from the menu to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 mb-[80px]">
      <BackButton onClick={onBackClick} />
      
      <div className="px-4 py-4 ">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-800">₹{item.price}</span>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white hover:bg-red-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              
              {/* Item Total */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Item Total:</span>
                  <span className="font-bold text-gray-800">₹{item.price * item.quantity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
              <span className="text-gray-800">₹{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-gray-800">₹40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Charges</span>
              <span className="text-gray-800">₹{Math.round(getTotalPrice() * 0.18)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800">Total</span>
                <span className="text-red-600">₹{getTotalPrice() + 40 + Math.round(getTotalPrice() * 0.18)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Checkout Button */}
        <button 
          onClick={handleCheckout}
          className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Order Details</h3>
              <button 
                onClick={() => setShowCheckout(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name (Optional)
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table Number (Optional)
                </label>
                <input
                  type="text"
                  value={customerInfo.tableNumber}
                  onChange={(e) => handleInputChange('tableNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter table number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={customerInfo.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows={3}
                  placeholder="Any special requests or dietary requirements"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total Amount:</span>
                  <span className="text-red-600">₹{getTotalPrice() + 40 + Math.round(getTotalPrice() * 0.18)}</span>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}