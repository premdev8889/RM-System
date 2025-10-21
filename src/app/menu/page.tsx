'use client';

import React, { useEffect, useState } from 'react';
import { FoodMenu } from '@/components';
import { ArrowLeft, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function MenuPage() {
  const [tableNumber, setTableNumber] = useState<string>('');

  useEffect(() => {
    // Get table number from localStorage
    const storedTableNumber = localStorage.getItem('tableNumber');
    if (storedTableNumber) {
      setTableNumber(storedTableNumber);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Table Info Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link 
              href="/table" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            
            {tableNumber && (
              <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Table {tableNumber}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <FoodMenu />
    </div>
  );
}