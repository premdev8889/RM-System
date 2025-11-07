'use client';

import Dashboard from '../../components/Dashboard';
import BottomNavigation from '../../components/BottomNavigation';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Dashboard />
      <BottomNavigation />
    </div>
  );
}