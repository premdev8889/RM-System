'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    // Basic validation (demo only)
    if (!username || !password) {
      setError('Kripya username aur password bharen');
      return;
    }
    // TODO: Integrate real auth; for now redirect to menu
    router.push('/menu');
  };

  const handleScanNow = () => {
    router.push('/scanner');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

      <div className="px-4 pt-6 pb-24 max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Login</h2>
          <p className="text-sm text-gray-500 mb-4">Apne account se login karein ya seedha scan karein.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username / Mobile</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g. 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="********"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="space-y-3 mt-2">
              <button
                onClick={handleLogin}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow"
              >
                Login
              </button>

              <button
                onClick={handleScanNow}
                className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg shadow"
              >
                Scan Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}