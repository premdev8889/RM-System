'use client';

import { useCart } from './CartContext';
import { useRouter, usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home', route: '/menu' },
    { id: 'search', icon: 'search', label: 'Search', route: '/search' },
    { id: 'cart', icon: 'cart', label: 'Cart', route: '/cart' },
    { id: 'orders', icon: 'orders', label: 'Orders', route: '/orders' },
    { id: 'profile', icon: 'profile', label: 'Profile', route: '/profile' }
  ];

  // Determine active tab based on current pathname
  const getCurrentActiveTab = () => {
    if (pathname === '/dashboard' || pathname === '/') return 'home';
    if (pathname === '/search' || pathname === '/search/') return 'search';
    if (pathname === '/cart' || pathname === '/cart/') return 'cart';
    if (pathname === '/orders' || pathname === '/orders/') return 'orders';
    if (pathname === '/profile' || pathname === '/profile/') return 'profile';
    if (pathname === '/menu' || pathname === '/menu/') return 'home'; // Menu page should highlight home
    if (pathname === '/scanner' || pathname === '/scanner/') return 'home'; // Scanner page should highlight home
    return 'home'; // Default to home
  };

  const currentActiveTab = getCurrentActiveTab();

  const handleTabClick = (route: string) => {
    router.push(route);
  };

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
      case 'orders':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
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
          onClick={() => handleTabClick(tab.route)}
          className="flex flex-col items-center p-2 min-w-0 flex-1 relative"
        >
          {getIcon(tab.icon, currentActiveTab === tab.id)}
          {tab.id === 'cart' && cartItemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </div>
          )}
          <span className={`text-xs mt-1 ${currentActiveTab === tab.id ? 'text-red-600' : 'text-gray-500'}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}