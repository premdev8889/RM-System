'use client';

import RestaurantMenu from '../../components/RestaurantMenu';
import BottomNavigation from '../../components/BottomNavigation';

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-white">
      <RestaurantMenu />
      <BottomNavigation />
    </div>
  );
}