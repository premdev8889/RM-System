'use client';

import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  tableNumber?: string;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  tableNumber
}) => {
  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveItem(id);
    } else {
      onUpdateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
        <p className="text-gray-600">Add some delicious items to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cart Header */}
      <div className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Your Order
          </h2>
          {tableNumber && (
            <span className="bg-red-700 px-3 py-1 rounded-full text-sm">
              Table {tableNumber}
            </span>
          )}
        </div>
        <p className="text-red-100 mt-1">{getTotalItems()} items</p>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="p-4 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-4">
              {/* Item Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />

              {/* Item Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800 flex items-center gap-2">
                      {item.name}
                      <div className={`w-3 h-3 rounded-full border ${
                        item.isVeg ? 'border-green-600 bg-green-100' : 'border-red-600 bg-red-100'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full m-0.5 ${
                          item.isVeg ? 'bg-green-600' : 'bg-red-600'
                        }`}></div>
                      </div>
                    </h4>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Quantity Controls and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="font-medium text-gray-800 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({getTotalItems()} items)</span>
            <span>₹{getTotalPrice()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (5%)</span>
            <span>₹{Math.round(getTotalPrice() * 0.05)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Service Charge</span>
            <span>₹20</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between text-lg font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{getTotalPrice() + Math.round(getTotalPrice() * 0.05) + 20}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-medium"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};