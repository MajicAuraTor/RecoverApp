import React, { useState } from 'react';
import { Moon, Sun, Eye, EyeOff, Search } from 'lucide-react';
import RecoverLogo from '../../Branding/Recover.png';

interface UserNavbarProps {
  isDarkMode?: boolean;
  setIsDarkMode?: (value: boolean) => void;
  isVisibilityHigh?: boolean;
  setIsVisibilityHigh?: (value: boolean) => void;
}

export const UserNavbar: React.FC<UserNavbarProps> = ({
  isDarkMode = false,
  setIsDarkMode,
  isVisibilityHigh = false,
  setIsVisibilityHigh
}) => {
  const [localDarkMode, setLocalDarkMode] = useState(false);
  const [localVisibilityHigh, setLocalVisibilityHigh] = useState(false);

  // Use local state if props aren't provided
  const darkMode = isDarkMode || localDarkMode;
  const visibilityHigh = isVisibilityHigh || localVisibilityHigh;

  const toggleDarkMode = () => {
    if (setIsDarkMode) {
      setIsDarkMode(!darkMode);
    } else {
      setLocalDarkMode(!darkMode);
    }
  };

  const toggleVisibility = () => {
    if (setIsVisibilityHigh) {
      setIsVisibilityHigh(!visibilityHigh);
    } else {
      setLocalVisibilityHigh(!visibilityHigh);
    }
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 text-white p-4 transition-colors duration-300 z-50 ${
      darkMode 
        ? 'bg-blue-800' 
        : 'bg-blue-600'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className={`flex items-center space-x-2 rounded p-2 transition-colors ${
            darkMode 
              ? 'hover:bg-blue-700' 
              : 'hover:bg-blue-500'
          }`}>
            <img 
              src={RecoverLogo} 
              alt="Recover Logo" 
              className="w-8 h-8 rounded"
              onError={(e) => {
                // Fallback to text if logo doesn't load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-blue-600 font-bold text-sm">R</span>
            </div>
            <span className={`font-bold text-lg ${
              visibilityHigh ? 'text-blue-100 font-extrabold' : ''
            }`}>RECOVER</span>
          </button>
          <span className={`${
            darkMode 
              ? 'text-blue-200' 
              : visibilityHigh 
                ? 'text-blue-100 font-bold' 
                : 'text-blue-100'
          }`}>User Dashboard</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Recover" 
              className={`px-3 py-1 rounded text-white placeholder-blue-200 text-sm w-64 transition-colors ${
                darkMode 
                  ? 'bg-blue-700' 
                  : 'bg-blue-500'
              }`}
            />
            <Search size={16} className="absolute right-2 top-1.5 text-blue-200" />
          </div>
          
          {/* Visibility Toggle */}
          <button 
            onClick={toggleVisibility}
            className={`p-2 rounded transition-colors ${
              darkMode 
                ? 'hover:bg-blue-700' 
                : 'hover:bg-blue-500'
            }`}
            title={visibilityHigh ? "Normal Vision Mode" : "High Visibility Mode"}
          >
            {visibilityHigh ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded transition-colors ${
              darkMode 
                ? 'hover:bg-blue-700' 
                : 'hover:bg-blue-500'
            }`}
            title={darkMode ? "Light Mode" : "Dark Mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              darkMode 
                ? 'bg-blue-900' 
                : 'bg-blue-800'
            }`}>
              <span className="text-sm font-semibold">F</span>
            </div>
            <span className={`text-sm ${
              darkMode 
                ? 'text-blue-200' 
                : 'text-blue-100'
            }`}>Felicia Burbank</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
