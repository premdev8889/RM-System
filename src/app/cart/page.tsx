'use client';

import Cart from '../../components/Cart';
import BottomNavigation from '../../components/BottomNavigation';

export default function CartPage() {
  return (
    <div className=" bg-white">
      <Cart />
      <BottomNavigation />
    </div>
  );
}