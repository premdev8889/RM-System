'use client';

import { useCart } from './CartContext';

interface BottomNavigationProps {
  activeTab?: string;
  onTabClick?: (tab: string) => void;
}

export default function BottomNavigation({ activeTab = 'home', onTabClick }: BottomNavigationProps) {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'search', icon: 'search', label: 'Search' },
    { id: 'cart', icon: 'cart', label: 'Cart' },
    { id: 'scanner', icon: 'scanner', label: 'Scanner' },
    { id: 'profile', icon: 'profile', label: 'Profile' }
  ];

  const getIcon = (iconType: string, isActive: boolean) => {
    const className = `w-6 h-6 ${isActive ? 'text-red-600' : 'text-gray-500'}`;
    
    switch (iconType) {
      case 'home':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'search':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'cart':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'scanner':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        );
      case 'profile':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex justify-between items-center">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabClick?.(tab.id)}
          className="flex flex-col items-center p-2 min-w-0 flex-1 relative"
        >
          {getIcon(tab.icon, activeTab === tab.id)}
          {tab.id === 'cart' && cartItemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </div>
          )}
          <span className={`text-xs mt-1 ${activeTab === tab.id ? 'text-red-600' : 'text-gray-500'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}