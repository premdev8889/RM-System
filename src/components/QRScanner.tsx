'use client';

import React, { useState } from 'react';
import { QrCode, Camera, Smartphone, MapPin } from 'lucide-react';
import { Button } from './Button';

interface QRScannerProps {
  onScanSuccess: (tableNumber: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualTableNumber, setManualTableNumber] = useState('');

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      // Use a deterministic table number for demo purposes
      const tableNumber = 5; // Fixed table number for demo
      onScanSuccess(tableNumber.toString());
      setIsScanning(false);
    }, 2000);
  };

  const handleManualEntry = () => {
    if (manualTableNumber.trim()) {
      onScanSuccess(manualTableNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Our Restaurant</h1>
          <p className="text-gray-600">Scan the QR code on your table to get started</p>
        </div>

        {!isScanning ? (
          <div className="space-y-6">
            {/* QR Scanner Button */}
            <Button
              onClick={handleStartScan}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-medium"
            >
              <Camera className="w-6 h-6" />
              Scan QR Code
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Manual Table Number Entry */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Enter Table Number Manually
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Table #"
                  value={manualTableNumber}
                  onChange={(e) => setManualTableNumber(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <Button
                  onClick={handleManualEntry}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                >
                  Go
                </Button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-gray-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-red-600" />
                How it works:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Scan the QR code on your table</li>
                <li>• Browse our digital menu</li>
                <li>• Place your order directly</li>
                <li>• Pay securely through the app</li>
              </ul>
            </div>

            {/* Restaurant Info */}
            <div className="text-center pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Delicious Restaurant</span>
              </div>
              <p className="text-xs text-gray-500">
                123 Food Street, Taste City
              </p>
            </div>
          </div>
        ) : (
          /* Scanning Animation */
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-48 h-48 mx-auto border-4 border-red-200 rounded-2xl flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-red-600 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-200 to-transparent animate-pulse"></div>
                  <QrCode className="w-20 h-20 text-red-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-1 bg-red-600 animate-pulse"></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Scanning QR Code...</h3>
              <p className="text-gray-600">Please hold your camera steady</p>
            </div>

            <Button
              onClick={() => setIsScanning(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};