'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back"
      className={`fixed top-4 left-4 z-50 w-9 h-9 rounded-full bg-white/80 text-gray-800 border border-gray-200 shadow flex items-center justify-center hover:bg-white ${className}`}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
};

export default BackButton;