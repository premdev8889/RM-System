'use client';

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export default function Header({ 
  title, 
  onBackClick, 
  showBack = false, 
  showMenu = false, 
  onMenuClick 
}: HeaderProps) {
  return (
    <div className="bg-red-600 text-white p-4 rounded-b-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        {showBack ? (
          <button onClick={onBackClick} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-10 h-10"></div>
        )}
        
        <div className="text-center">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        {showMenu ? (
          <button onClick={onMenuClick} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        ) : (
          <div className="w-10 h-10"></div>
        )}
      </div>
    </div>
  );
}