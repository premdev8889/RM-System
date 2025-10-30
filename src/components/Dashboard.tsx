'use client';

import { useState } from 'react';
import QRScanner from './QRScanner';
import RestaurantMenu from './RestaurantMenu';
import ClientOnly from './ClientOnly';

type ViewType = 'scanner' | 'menu';

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('scanner');

  const handleQRDetected = () => {
    setCurrentView('menu');
  };

  const handleGoToMenu = () => {
    setCurrentView('menu');
  };

  const handleBackToScanner = () => {
    setCurrentView('scanner');
  };

  const handleTabClick = (tab: string) => {
    if (tab === 'scanner') {
      setCurrentView('scanner');
    } else if (tab === 'home') {
      setCurrentView('menu');
    }
    // Add more tab handling as needed
  };

  return (
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
      ) : (
        <RestaurantMenu 
          onBackClick={handleBackToScanner}
          onTabClick={handleTabClick}
        />
      )}
    </div>
  );
}