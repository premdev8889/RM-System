import React from 'react';
import {
  Header,
  FoodMenu,
  Footer
} from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <FoodMenu />
      <Footer />
    </div>
  );
}
