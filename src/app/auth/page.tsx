'use client';

import React, { useState } from 'react';
import { User, Store, ArrowLeft } from 'lucide-react';
import { Button } from '@/components';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

type AuthMode = 'selection' | 'user-login' | 'shop-login' | 'user-register' | 'shop-register';

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>('selection');

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';

  const handleLogin = (type: 'user' | 'shop') => {
    try {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', type);
      const pending = localStorage.getItem('pendingOrder');
      if (pending) {
        localStorage.setItem('currentOrder', pending);
        localStorage.removeItem('pendingOrder');
      }
      router.push(returnUrl);
    } catch (e) {
      console.error('Login error:', e);
      router.push(returnUrl);
    }
  };

  const renderSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FoodieHub</h1>
          <p className="text-gray-600">Choose your login type to continue</p>
        </div>

        <div className="space-y-4">
          <div 
            onClick={() => setAuthMode('user-login')}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-red-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 rounded-full p-3">
                <User className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User Login</h3>
                <p className="text-gray-600 text-sm">Order food from your favorite restaurants</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setAuthMode('shop-login')}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-red-200"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 rounded-full p-3">
                <Store className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Restaurant Login</h3>
                <p className="text-gray-600 text-sm">Manage your restaurant and orders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => setAuthMode('user-register')}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign up as User
            </button>
            {' '}or{' '}
            <button 
              onClick={() => setAuthMode('shop-register')}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Register Restaurant
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderUserLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <button 
            onClick={() => setAuthMode('selection')}
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">User Login</h2>
          <p className="text-gray-600">Sign in to order delicious food</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-red-600 hover:text-red-700">
              Forgot password?
            </a>
          </div>

          <Button className="w-full" size="lg" onClick={() => handleLogin('user')}>
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button 
              onClick={() => setAuthMode('user-register')}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderShopLogin = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <button 
            onClick={() => setAuthMode('selection')}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Login</h2>
          <p className="text-gray-600">Access your restaurant dashboard</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter restaurant email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant ID (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter restaurant ID"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
              Forgot password?
            </a>
          </div>

          <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg" onClick={() => handleLogin('shop')}>
            Sign In to Dashboard
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have a restaurant account?{' '}
            <button 
              onClick={() => setAuthMode('shop-register')}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Register Restaurant
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderUserRegister = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <button 
            onClick={() => setAuthMode('selection')}
            className="inline-flex items-center text-red-600 hover:text-red-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="bg-red-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create User Account</h2>
          <p className="text-gray-600">Join FoodieHub to order amazing food</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              placeholder="Create password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
              placeholder="Confirm password"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <a href="#" className="text-red-600 hover:text-red-700">Terms of Service</a> and <a href="#" className="text-red-600 hover:text-red-700">Privacy Policy</a>
            </span>
          </div>

          <Button className="w-full" size="lg">
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => setAuthMode('user-login')}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderShopRegister = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <button 
            onClick={() => setAuthMode('selection')}
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div className="bg-orange-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Restaurant</h2>
          <p className="text-gray-600">Join our platform and grow your business</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter restaurant name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Owner Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter owner name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter business email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Address
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              rows={3}
              placeholder="Enter complete address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine Type
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors">
              <option value="">Select cuisine type</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="italian">Italian</option>
              <option value="mexican">Mexican</option>
              <option value="american">American</option>
              <option value="thai">Thai</option>
              <option value="japanese">Japanese</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Create password"
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the <a href="#" className="text-orange-600 hover:text-orange-700">Terms of Service</a> and <a href="#" className="text-orange-600 hover:text-orange-700">Privacy Policy</a>
            </span>
          </div>

          <Button className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
            Register Restaurant
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have a restaurant account?{' '}
            <button 
              onClick={() => setAuthMode('shop-login')}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  switch (authMode) {
    case 'user-login':
      return renderUserLogin();
    case 'shop-login':
      return renderShopLogin();
    case 'user-register':
      return renderUserRegister();
    case 'shop-register':
      return renderShopRegister();
    default:
      return renderSelection();
  }
}