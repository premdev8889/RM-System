'use client';

import Link from 'next/link';
import { Search, ShoppingCart, FileText, User } from 'lucide-react';

export default function HeaderNavigation() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">Namaste</span>
          </Link>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/menu" 
              className="flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1">Search</span>
            </Link>

            <Link 
              href="/cart" 
              className="flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-xs mt-1">Cart</span>
            </Link>

            <Link 
              href="/orders" 
              className="flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <FileText className="w-6 h-6" />
              <span className="text-xs mt-1">Orders</span>
            </Link>

            <Link 
              href="/profile" 
              className="flex flex-col items-center text-gray-600 hover:text-red-500 transition-colors"
            >
              <User className="w-6 h-6" />
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}