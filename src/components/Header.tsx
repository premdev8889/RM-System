import React from 'react';
import Link from 'next/link';
import { Button } from './Button';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-red-600">
              FoodieExpress
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600 transition-colors">
              Menu
            </Link>
            <Link href="/table" className="text-gray-700 hover:text-red-600 transition-colors">
              Scan QR
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-red-600 transition-colors">
              Cart
            </Link>
            <Link href="/auth" className="text-gray-700 hover:text-red-600 transition-colors">
              Sign In
            </Link>
          </nav>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};