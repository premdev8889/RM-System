'use client';

import { useRouter } from 'next/navigation';
import BackButton from '../../components/BackButton';
import ScanAnimation from '../../components/ScanAnimation';

export default function LoginPage() {
  const router = useRouter();

  const handleScanNow = () => router.push('/scanner');
  const handleLogin = () => router.push('/menu');

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Scan Card */}
        <div className="relative  rounded-3xl p-6  ">
          <h1 className="text-center text-2xl font-bold">Scan QR</h1>
          <div className="mt-6 bg-white rounded-2xl p-6 shadow">
            <ScanAnimation imageSrc="/qr-scan.svg" />
            <button
              onClick={handleScanNow}
              className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-full shadow"
            >
              SCAN NOW
            </button>
          </div>
          <p className="text-center mt-4 text-sm">Scan table QR to browse menu & order</p>
        </div>

        
      </div>
    </div>
  );
}