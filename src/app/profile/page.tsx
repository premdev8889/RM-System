'use client';

import Profile from '../../components/Profile';
import BottomNavigation from '../../components/BottomNavigation';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Profile />
      <BottomNavigation />
    </div>
  );
}