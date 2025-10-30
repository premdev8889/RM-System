'use client';

import { useState } from 'react';
import QRScanner from './QRScanner';
import RestaurantMenu from './RestaurantMenu';
import FoodDetail from './FoodDetail';
import Cart from './Cart';
import ClientOnly from './ClientOnly';
import { CartProvider } from './CartContext';

type ViewType = 'scanner' | 'menu' | 'foodDetail' | 'cart';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('scanner');
  const [selectedFoodItem, setSelectedFoodItem] = useState<any>(null);

  const handleQRDetected = () => {
    setCurrentView('menu');
  };

  const handleGoToMenu = () => {
    setCurrentView('menu');
  };

  const handleBackToScanner = () => {
    setCurrentView('scanner');
  };

  const handleFoodItemClick = (foodItem: any) => {
    setSelectedFoodItem(foodItem);
    setCurrentView('foodDetail');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
  };

  const handleTabClick = (tab: string) => {
    if (tab === 'scanner') {
      setCurrentView('scanner');
    } else if (tab === 'home') {
      setCurrentView('menu');
    } else if (tab === 'cart') {
      setCurrentView('cart');
    }
    // Add more tab handling as needed
  };

  return (
    <CartProvider>
      <div className="min-h-screen">
        {currentView === 'scanner' ? (
          <ClientOnly fallback={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Loading Camera...</p>
              </div>
            </div>
          }>
            <QRScanner 
              onScanSuccess={handleQRDetected}
              onBackClick={handleGoToMenu}
            />
          </ClientOnly>
        ) : currentView === 'menu' ? (
          <ClientOnly fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-gray-600 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p>Loading Menu...</p>
              </div>
            </div>
          }>
            <RestaurantMenu 
              onBackClick={handleBackToScanner}
              onTabClick={handleTabClick}
              onFoodItemClick={handleFoodItemClick}
            />
          </ClientOnly>
        ) : currentView === 'foodDetail' && selectedFoodItem ? (
          <FoodDetail 
            foodItem={selectedFoodItem}
            onBackClick={handleBackToMenu}
          />
        ) : currentView === 'cart' ? (
          <Cart 
            onBackClick={() => setCurrentView('menu')}
            onTabClick={handleTabClick}
          />
        ) : null}
      </div>
    </CartProvider>
  );
}