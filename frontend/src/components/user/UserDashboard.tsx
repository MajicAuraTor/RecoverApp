import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Home,
  ShoppingCart,
  Heart,
  TrendingUp,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Eye,
  EyeOff
} from 'lucide-react';
import recoverLogo from '../../Branding/Recover.png';

const surgeries = [
  "Hip Surgery on August 25th, 2025 @ 6am",
  "Knee Replacement on September 10th, 2025 @ 9am",
  "Shoulder Surgery on October 5th, 2025 @ 11am",
];

const reminders = [
  "Take medication at 8:00 AM",
  "Pre-op fasting starts at 10:00 PM",
  "Call your care coordinator",
];

const UserDashboard: React.FC = () => {
  const [selectedSurgery, setSelectedSurgery] = useState(surgeries[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisibilityHigh, setIsVisibilityHigh] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleVisibility = () => {
    setIsVisibilityHigh(!isVisibilityHigh);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isDarkMode 
          ? '#001122' 
          : isVisibilityHigh 
            ? '#fff9e6' 
            : '#f8fafc'
      }}
    >
      {/* Top Navigation Bar */}
      <nav 
        className="text-white p-4 transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode 
            ? '#0052CC' 
            : isVisibilityHigh 
              ? '#0052CC' 
              : '#0052CC'
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/user/dashboard')}
              className="flex items-center space-x-2 hover:bg-blue-500 rounded p-2 transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded overflow-hidden">
                <img 
                  src={recoverLogo} 
                  alt="Recover Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-bold text-lg">RECOVER</span>
            </button>
            <span className="text-blue-100">User Dashboard</span>
            <button 
              onClick={() => navigate('/user/dashboard')}
              className="flex items-center space-x-1 text-blue-200 hover:text-white transition-colors"
            >
              <Home size={16} />
              <span className="text-sm">Home</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search Recover here" 
                className="px-3 py-1 rounded bg-blue-500 text-white placeholder-blue-200 text-sm w-64"
              />
              <Search size={16} className="absolute right-2 top-1.5 text-blue-200" />
            </div>
            
            {/* Visibility Toggle */}
            <button 
              onClick={toggleVisibility}
              className="p-2 hover:bg-blue-500 rounded transition-colors"
              title={isVisibilityHigh ? "Normal Vision Mode" : "High Visibility Mode"}
            >
              {isVisibilityHigh ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className="p-2 hover:bg-blue-500 rounded transition-colors"
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button className="p-2 hover:bg-blue-500 rounded">
              <Bell size={18} />
            </button>
            <button className="p-2 hover:bg-blue-500 rounded">
              <Settings size={18} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-blue-100 text-sm">Felicia</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div 
          className="w-64 text-white min-h-screen transition-colors duration-300"
          style={{
            backgroundColor: isDarkMode 
              ? '#0052CC' 
              : isVisibilityHigh 
                ? '#0066FF' 
                : '#0066FF'
          }}
        >
          {/* User Info */}
          <div 
            className="p-4 transition-colors duration-300"
            style={{
              backgroundColor: isDarkMode 
                ? '#003d7a' 
                : isVisibilityHigh 
                  ? '#0052CC' 
                  : '#0052CC'
            }}
          >
            <div>
              <p 
                className="text-sm transition-colors duration-300"
                style={{
                  color: isDarkMode 
                    ? '#cce7ff' 
                    : isVisibilityHigh 
                      ? '#ffff99' 
                      : '#b3d9ff'
                }}
              >WELCOME BACK, FELICIA</p>
              <p 
                className="text-xs transition-colors duration-300"
                style={{
                  color: isDarkMode 
                    ? '#99ccff' 
                    : isVisibilityHigh 
                      ? '#ffffcc' 
                      : '#cce7ff'
                }}
              >One Step Closer To Recovery</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => navigate('/user/dashboard')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors"
              style={{
                backgroundColor: isDarkMode 
                  ? '#003d7a' 
                  : isVisibilityHigh 
                    ? '#0052CC' 
                    : '#0052CC'
              }}
            >
              <Home size={18} />
              <span className="text-sm">Patient Dashboard</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/shop')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <ShoppingCart size={18} />
              <span className="text-sm">Shop for Products</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/care-hub')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Heart size={18} />
              <span className="text-sm">Your Care Hub</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/progress')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <TrendingUp size={18} />
              <span className="text-sm">My Progress</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/reminders')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Bell size={18} />
              <span className="text-sm">Reminders</span>
            </button>

            <hr 
              className="my-4"
              style={{
                borderColor: isDarkMode ? '#0066FF' : '#0052CC'
              }}
            />
            
            <button 
              onClick={() => handleNavigation('/user/notifications')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Bell size={18} />
              <span className="text-sm">Notifications</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/account')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <User size={18} />
              <span className="text-sm">Account</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/cards')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <CreditCard size={18} />
              <span className="text-sm">My Cards</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/settings')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </button>

            <hr 
              className="my-4"
              style={{
                borderColor: isDarkMode ? '#0066FF' : '#0052CC'
              }}
            />
            
            <button 
              onClick={() => handleNavigation('/user/support')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <HelpCircle size={18} />
              <span className="text-sm">Customer Support</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/user/help')}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <HelpCircle size={18} />
              <span className="text-sm">Help</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded transition-colors hover:opacity-80"
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : '#0052CC'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <LogOut size={18} />
              <span className="text-sm">Log Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div 
          className="flex-1 p-8 transition-colors duration-300"
          style={{
            backgroundColor: isDarkMode 
              ? '#001f3f' 
              : isVisibilityHigh 
                ? '#e6f3ff' 
                : '#f0f8ff'
          }}
        >
        {/* Header */}
        <div className="mb-6">
          <div>
            <h1 
              className="text-3xl font-bold px-4 py-2 rounded transition-colors duration-300"
              style={{
                color: isDarkMode 
                  ? 'white' 
                  : isVisibilityHigh 
                    ? 'black' 
                    : 'white',
                backgroundColor: isDarkMode 
                  ? '#0052CC' 
                  : isVisibilityHigh 
                    ? '#ffff99' 
                    : '#0066FF',
                border: isVisibilityHigh ? '2px solid black' : 'none'
              }}
            >
              Welcome back, Felicia
            </h1>
            <p 
              className="font-semibold mt-1 transition-colors duration-300"
              style={{
                color: isDarkMode 
                  ? '#cce7ff' 
                  : isVisibilityHigh 
                    ? 'black' 
                    : '#0052CC',
                fontSize: isVisibilityHigh ? '1.125rem' : undefined
              }}
            >
              One Step Closer To Recovery
            </p>
          </div>
        </div>
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Upcoming Surgery Dropdown */}
            <div 
              className="rounded-xl p-4 transition-colors duration-300"
              style={{
                backgroundColor: isDarkMode 
                  ? '#0052CC' 
                  : isVisibilityHigh 
                    ? '#ffff99' 
                    : '#e6f3ff',
                color: isDarkMode ? 'white' : 'black',
                border: isVisibilityHigh ? '2px solid black' : 'none'
              }}
            >
              <label 
                className="block font-semibold mb-2 transition-colors duration-300"
                style={{
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0052CC',
                  fontSize: isVisibilityHigh ? '1.125rem' : undefined
                }}
              >
                Upcoming Surgery:
              </label>
              <select
                value={selectedSurgery}
                onChange={(e) => setSelectedSurgery(e.target.value)}
                className="w-full p-2 rounded border transition-colors duration-300"
                style={{
                  backgroundColor: isDarkMode 
                    ? '#0066FF' 
                    : isVisibilityHigh 
                      ? 'white' 
                      : 'white',
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0052CC',
                  borderColor: isDarkMode 
                    ? '#0066FF' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0066FF',
                  borderWidth: isVisibilityHigh ? '2px' : '1px',
                  fontSize: isVisibilityHigh ? '1.125rem' : undefined,
                  fontWeight: isVisibilityHigh ? 'bold' : undefined
                }}
              >
                {surgeries.map((surgery) => (
                  <option key={surgery} value={surgery}>
                    {surgery}
                  </option>
                ))}
              </select>
              <button 
                className="mt-3 w-full rounded py-2 font-semibold transition-colors duration-300"
                style={{
                  backgroundColor: isDarkMode 
                    ? '#003d7a' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#b3b3b3',
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? '#ffff99' 
                      : 'white',
                  border: isVisibilityHigh ? '2px solid black' : 'none',
                  fontSize: isVisibilityHigh ? '1.125rem' : undefined
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#002952' : isVisibilityHigh ? '#333' : '#999';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : isVisibilityHigh ? 'black' : '#b3b3b3';
                }}
              >
                View full surgery details
              </button>
            </div>
            {/* Days till surgery */}
            <div 
              className="rounded-xl p-4 flex items-center justify-between transition-colors duration-300"
              style={{
                backgroundColor: isDarkMode 
                  ? '#0052CC' 
                  : isVisibilityHigh 
                    ? '#ffff99' 
                    : '#e6f3ff',
                color: isDarkMode ? 'white' : 'black',
                border: isVisibilityHigh ? '2px solid black' : 'none'
              }}
            >
              <div className="flex items-center space-x-2">
                <span 
                  className="text-2xl font-bold px-3 py-1 rounded transition-colors duration-300"
                  style={{
                    backgroundColor: isDarkMode 
                      ? '#003d7a' 
                      : isVisibilityHigh 
                        ? 'black' 
                        : '#0066FF',
                    color: isDarkMode 
                      ? 'white' 
                      : isVisibilityHigh 
                        ? '#ffff99' 
                        : 'white',
                    border: isVisibilityHigh ? '2px solid #ffff99' : 'none'
                  }}
                >
                  2
                </span>
                <span 
                  className="text-2xl font-bold px-3 py-1 rounded transition-colors duration-300"
                  style={{
                    backgroundColor: isDarkMode 
                      ? '#003d7a' 
                      : isVisibilityHigh 
                        ? 'black' 
                        : '#0066FF',
                    color: isDarkMode 
                      ? 'white' 
                      : isVisibilityHigh 
                        ? '#ffff99' 
                        : 'white',
                    border: isVisibilityHigh ? '2px solid #ffff99' : 'none'
                  }}
                >
                  4
                </span>
              </div>
              <span 
                className="font-semibold transition-colors duration-300"
                style={{
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0052CC',
                  fontSize: isVisibilityHigh ? '1.125rem' : undefined
                }}
              >Days till surgery</span>
            </div>
            {/* Reminders Card */}
            <div 
              className="rounded-xl p-4 transition-colors duration-300"
              style={{
                backgroundColor: isDarkMode 
                  ? '#0052CC' 
                  : isVisibilityHigh 
                    ? '#ffff99' 
                    : '#e6f3ff',
                color: isDarkMode ? 'white' : 'black',
                border: isVisibilityHigh ? '2px solid black' : 'none'
              }}
            >
              <h3 
                className="font-semibold mb-2"
                style={{
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0052CC',
                  fontSize: isVisibilityHigh ? '1.125rem' : undefined
                }}
              >Reminders</h3>
              <ul className="list-disc list-inside space-y-1">
                {reminders.map((reminder, idx) => (
                  <li key={idx}>{reminder}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Middle Column */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="bg-gray-200 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Felicia’s Progress:</span>
                <span className="text-2xl font-bold text-blue-700">33%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-4 mb-2">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: "33%" }}
                ></div>
              </div>
              <p>You are 33% prepared for your surgery!</p>
              <button 
                className="mt-3 w-full rounded py-2 font-semibold transition-colors"
                style={{
                  backgroundColor: isDarkMode 
                    ? '#003d7a' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#b3b3b3',
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? '#ffff99' 
                      : 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#002952' : isVisibilityHigh ? '#333' : '#999';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#003d7a' : isVisibilityHigh ? 'black' : '#b3b3b3';
                }}
              >
                View more progress here
              </button>
            </div>
          </div>
          {/* Right Column */}
          <div>
            {/* Recovery Picks */}
            <div 
              className="rounded-xl p-4 transition-colors duration-300"
              style={{
                backgroundColor: isDarkMode 
                  ? '#0052CC' 
                  : isVisibilityHigh 
                    ? '#ffff99' 
                    : '#e6f3ff',
                color: isDarkMode ? 'white' : 'black',
                border: isVisibilityHigh ? '2px solid black' : 'none'
              }}
            >
              <h3 
                className="font-semibold mb-2"
                style={{
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0052CC',
                  fontSize: isVisibilityHigh ? '1.125rem' : undefined
                }}
              >
                Recovery Picks to help you be prepared
              </h3>
              <div className="flex space-x-4 overflow-x-auto">
                <div className="flex flex-col items-center">
                  <img
                    src="https://images.pexels.com/photos/3845128/pexels-photo-3845128.jpeg?auto=compress&w=80"
                    alt="Walker"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span className="text-xs mt-1 text-center">
                    Folding Paddle Walker
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://images.pexels.com/photos/3952236/pexels-photo-3952236.jpeg?auto=compress&w=80"
                    alt="Pads"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span className="text-xs mt-1 text-center">
                    Sterile Abdominal Pads
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src="https://images.pexels.com/photos/3845129/pexels-photo-3845129.jpeg?auto=compress&w=80"
                    alt="Commode"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <span className="text-xs mt-1 text-center">
                    DMI Drop-Arm Steel Commodes
                  </span>
                </div>
              </div>
              <button 
                className="mt-3 w-full rounded-lg py-2 font-semibold transition-colors"
                style={{
                  backgroundColor: isDarkMode 
                    ? '#0066FF' 
                    : isVisibilityHigh 
                      ? 'black' 
                      : '#0066FF',
                  color: isDarkMode 
                    ? 'white' 
                    : isVisibilityHigh 
                      ? '#ffff99' 
                      : 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#0052CC' : isVisibilityHigh ? '#333' : '#0052CC';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#0066FF' : isVisibilityHigh ? 'black' : '#0066FF';
                }}
              >
                Shop for more products here
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;