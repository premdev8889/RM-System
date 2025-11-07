'use client';

import QRScanner from '../../components/QRScanner';
import { useRouter } from 'next/navigation';

export default function ScannerPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      <QRScanner onBackClick={() => router.push('/menu')} />
    </div>
  );
}