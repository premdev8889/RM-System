'use client';

import Link from 'next/link';
import { Search, ShoppingCart, FileText } from 'lucide-react';

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

          {/* Navigation Icons + Profile avatar on far right */}
          <div className="flex items-center space-x-8">
            
            {/* Profile avatar */}
            <Link href="/profile" className="ml-2">
              <img
                src="https://i.pravatar.cc/80?img=15"
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-white shadow ring-2 ring-red-100"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}