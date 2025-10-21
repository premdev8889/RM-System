'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QRScanner } from '@/components';

export default function TablePage() {
  const router = useRouter();

  const handleScanSuccess = (tableNumber: string) => {
    // Store table number in localStorage or state management
    localStorage.setItem('tableNumber', tableNumber);
    // Redirect to menu page
    router.push('/menu');
  };

  return (
    <QRScanner onScanSuccess={handleScanSuccess} />
  );
}