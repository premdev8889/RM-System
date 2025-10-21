'use client';

import React, { useState, useEffect } from 'react';
import { QrCode, CreditCard, Smartphone, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Button } from './Button';

interface PaymentScannerProps {
  amount: number;
  orderId: string;
  onPaymentSuccess: () => void;
  onPaymentFailed: (error: string) => void;
}

type PaymentMethod = 'upi' | 'card' | 'cash';
type PaymentStatus = 'idle' | 'scanning' | 'processing' | 'success' | 'failed';

export const PaymentScanner: React.FC<PaymentScannerProps> = ({
  amount,
  orderId,
  onPaymentSuccess,
  onPaymentFailed
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [countdown, setCountdown] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Simulate payment processing
  const processPayment = () => {
    setPaymentStatus('processing');
    setCountdown(5);
    
    // Generate success/failure deterministically based on orderId to avoid hydration issues
    const orderHash = orderId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const willSucceed = (orderHash % 10) !== 0; // 90% success rate based on orderId
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (willSucceed) {
            setPaymentStatus('success');
            setTimeout(() => {
              onPaymentSuccess();
            }, 2000);
          } else {
            setPaymentStatus('failed');
            setErrorMessage('Payment failed. Please try again.');
            onPaymentFailed('Payment processing failed');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePayNow = () => {
    setPaymentStatus('scanning');
    setErrorMessage('');
    
    // Simulate QR code scanning
    setTimeout(() => {
      processPayment();
    }, 2000);
  };

  const handleRetry = () => {
    setPaymentStatus('idle');
    setErrorMessage('');
    setCountdown(0);
  };

  const getQRCodeData = () => {
    // Generate UPI payment URL
    const upiId = 'foodieexpress@paytm';
    const merchantName = 'FoodieExpress';
    const transactionNote = `Order ${orderId}`;
    
    return `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=${transactionNote}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">Payment</h2>
        </div>
        <p className="text-2xl font-bold text-blue-600">₹{amount}</p>
        <p className="text-sm text-gray-600">Order ID: {orderId}</p>
      </div>

      {/* Payment Method Selection */}
      {paymentStatus === 'idle' && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Payment Method</h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSelectedMethod('upi')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedMethod === 'upi'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Smartphone className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <span className="text-xs font-medium">UPI</span>
            </button>
            
            <button
              onClick={() => setSelectedMethod('card')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <span className="text-xs font-medium">Card</span>
            </button>
            
            <button
              onClick={() => setSelectedMethod('cash')}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedMethod === 'cash'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-6 h-6 mx-auto mb-1 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">₹</span>
              </div>
              <span className="text-xs font-medium">Cash</span>
            </button>
          </div>
        </div>
      )}

      {/* QR Code Display */}
      {(paymentStatus === 'scanning' || paymentStatus === 'processing') && selectedMethod === 'upi' && (
        <div className="text-center mb-6">
          <div className="bg-gray-100 p-6 rounded-lg mb-4">
            <QrCode className="w-32 h-32 mx-auto text-gray-400" />
            <div className="mt-2 text-xs text-gray-600">
              Scan with any UPI app
            </div>
          </div>
          
          {paymentStatus === 'processing' && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing payment... {countdown}s</span>
            </div>
          )}
          
          {paymentStatus === 'scanning' && (
            <p className="text-sm text-gray-600">
              Waiting for payment confirmation...
            </p>
          )}
        </div>
      )}

      {/* Card Payment Simulation */}
      {(paymentStatus === 'scanning' || paymentStatus === 'processing') && selectedMethod === 'card' && (
        <div className="text-center mb-6">
          <div className="bg-gray-100 p-6 rounded-lg mb-4">
            <CreditCard className="w-32 h-32 mx-auto text-gray-400" />
            <div className="mt-2 text-xs text-gray-600">
              Insert or tap your card
            </div>
          </div>
          
          {paymentStatus === 'processing' && (
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processing payment... {countdown}s</span>
            </div>
          )}
        </div>
      )}

      {/* Cash Payment */}
      {selectedMethod === 'cash' && paymentStatus === 'idle' && (
        <div className="text-center mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">₹</span>
            </div>
            <p className="text-green-800 font-semibold">Cash Payment</p>
            <p className="text-green-700 text-sm mt-1">
              Please pay ₹{amount} to the waiter
            </p>
          </div>
        </div>
      )}

      {/* Success State */}
      {paymentStatus === 'success' && (
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-3" />
          <h3 className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</h3>
          <p className="text-sm text-gray-600">
            Thank you for your payment. You will be redirected shortly.
          </p>
        </div>
      )}

      {/* Failed State */}
      {paymentStatus === 'failed' && (
        <div className="text-center mb-6">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-red-600 mb-2">Payment Failed</h3>
          <p className="text-sm text-gray-600 mb-4">{errorMessage}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {paymentStatus === 'idle' && (
          <Button
            onClick={handlePayNow}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {selectedMethod === 'cash' ? 'Confirm Cash Payment' : 'Pay Now'}
          </Button>
        )}

        {paymentStatus === 'failed' && (
          <Button
            onClick={handleRetry}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Try Again
          </Button>
        )}

        {paymentStatus === 'scanning' && selectedMethod !== 'cash' && (
          <Button
            onClick={handleRetry}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </Button>
        )}
      </div>

      {/* Payment Info */}
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Secure payment powered by FoodieExpress</p>
        <p className="mt-1">Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
};