'use client';

import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';

interface QRScannerProps {
  onScanSuccess?: () => void;
  onBackClick?: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onBackClick }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Start camera when component is mounted
  useEffect(() => {
    if (mounted) {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, [mounted]);

  const startCamera = async () => {
    if (!mounted) return;
    
    try {
      setError(null);
      
      // Check if getUserMedia is supported
      if (typeof window === 'undefined' || !navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Camera access is not supported in this browser');
      }

      // Request camera permission
      const permission = await navigator.permissions.query({ name: 'camera' as PermissionName });
      if (permission.state === 'denied') {
        throw new Error('Camera permission denied');
      }

      // Stop any existing camera stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      // Add a small delay to ensure camera is released
      await new Promise(resolve => setTimeout(resolve, 500));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        
        // Simulate QR detection after 3 seconds
        setTimeout(() => {
          if (onScanSuccess) {
            onScanSuccess();
          }
        }, 3000);
      }
    } catch (err: any) {
      console.error('Camera error:', err);
      let errorMessage = 'कैमरा एक्सेस नहीं मिल सका';
      
      if (err.name === 'NotReadableError') {
        errorMessage = 'कैमरा दूसरी app में इस्तेमाल हो रहा है। कृपया दूसरी apps बंद करें।';
      } else if (err.name === 'NotAllowedError') {
        errorMessage = 'कैमरा की permission दें। Browser settings में जाकर camera allow करें।';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'कोई कैमरा नहीं मिला। कृपया device में camera check करें।';
      }
      
      setError(errorMessage);
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsScanning(false);
  };

  const handleRetry = () => {
    startCamera();
  };

  return (
    <div className="min-h-screen bg-black relative" suppressHydrationWarning={true}>
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <Header 
          title="QR Scanner" 
          showBack={true} 
          onBackClick={onBackClick}
        />
      </div>

      {/* Loading State */}
      {!mounted && (
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading Camera...</p>
          </div>
        </div>
      )}

      {/* Camera View */}
      {mounted && isScanning && !error && (
        <div className="relative w-full h-screen">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Scanner Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Scanner Frame */}
              <div className="w-64 h-64 border-2 border-white rounded-2xl relative">
                {/* Corner Indicators */}
                <div className="absolute -top-1 -left-1 w-8 h-8 border-l-4 border-t-4 border-red-500 rounded-tl-lg"></div>
                <div className="absolute -top-1 -right-1 w-8 h-8 border-r-4 border-t-4 border-red-500 rounded-tr-lg"></div>
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-4 border-b-4 border-red-500 rounded-bl-lg"></div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-4 border-b-4 border-red-500 rounded-br-lg"></div>
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="w-full h-1 bg-red-500 animate-pulse absolute top-1/2 transform -translate-y-1/2"></div>
                </div>
              </div>
              
              {/* Instructions */}
              <p className="text-white text-center mt-6 text-lg font-medium">
                QR Code को frame के अंदर रखें
              </p>
              <p className="text-white/70 text-center mt-2 text-sm">
                Scanning automatically...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {mounted && error && (
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Camera Error</h3>
            <p className="text-gray-600 text-sm mb-6">{error}</p>
            <button
              onClick={handleRetry}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
            <p className="text-xs text-gray-500 mt-3">
              अगर problem बनी रहे तो दूसरी camera apps बंद करें और page refresh करें
            </p>
          </div>
        </div>
      )}

      {/* Bottom Controls */}
      {mounted && !error && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20 px-4">
          <button
            onClick={() => {
              // Simulate QR detection for testing
              setTimeout(() => {
                onScanSuccess();
              }, 500);
            }}
            className="bg-green-600/80 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold border border-green-400/30 hover:bg-green-600 transition-all duration-200 shadow-lg"
          >
            🔍 Test Scan
          </button>
          <button
            onClick={onBackClick}
            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg"
          >
            📱 Go to Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default QRScanner;