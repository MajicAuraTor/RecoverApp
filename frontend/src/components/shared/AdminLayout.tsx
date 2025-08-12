import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Home,
  FileText, 
  Upload, 
  Users,
  HelpCircle, 
  LogOut,
  Moon,
  Sun,
  EyeOff,
  Eye
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisibilityHigh, setIsVisibilityHigh] = useState(false);

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
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900' 
          : isVisibilityHigh 
            ? 'bg-blue-50' 
            : 'bg-gray-50'
      }`}
    >
      {/* Top Navigation Bar */}
      <nav 
        className={`text-white p-4 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-blue-700' 
            : isVisibilityHigh 
              ? 'bg-blue-500 border-b-2 border-blue-800' 
              : 'bg-blue-600'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className={`flex items-center space-x-2 rounded p-2 transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-500'
              }`}
            >
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg">RECOVER</span>
            </button>
            <span className={`${
              isDarkMode 
                ? 'text-blue-200' 
                : isVisibilityHigh 
                  ? 'text-blue-100 font-bold' 
                  : 'text-blue-100'
            }`}>Admin Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search content..." 
                className={`px-3 py-1 rounded text-white placeholder-blue-200 text-sm w-64 transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-600' 
                    : 'bg-blue-500'
                }`}
              />
              <Search size={16} className="absolute right-2 top-1.5 text-blue-200" />
            </div>
            
            {/* Visibility Toggle */}
            <button 
              onClick={toggleVisibility}
              className={`p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-500'
              }`}
              title={isVisibilityHigh ? "Normal Vision Mode" : "High Visibility Mode"}
            >
              {isVisibilityHigh ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-500'
              }`}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button className={`p-2 rounded transition-colors ${
              isDarkMode 
                ? 'hover:bg-blue-600' 
                : 'hover:bg-blue-500'
            }`}>
              <Bell size={18} />
            </button>
            <button className={`p-2 rounded transition-colors ${
              isDarkMode 
                ? 'hover:bg-blue-600' 
                : 'hover:bg-blue-500'
            }`}>
              <Settings size={18} />
            </button>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode 
                  ? 'bg-blue-600' 
                  : 'bg-blue-800'
              }`}>
                <User size={16} />
              </div>
              <span className={`text-sm transition-colors ${
                isDarkMode 
                  ? 'text-blue-200' 
                  : isVisibilityHigh 
                    ? 'text-blue-100 font-bold' 
                    : 'text-blue-100'
              }`}>Ian Brooks</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div 
          className={`w-64 text-white min-h-screen transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-blue-700' 
              : isVisibilityHigh 
                ? 'bg-blue-600 border-r-2 border-blue-800' 
                : 'bg-blue-700'
          }`}
        >
          {/* User Info */}
          <div 
            className={`p-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-800' 
                : isVisibilityHigh 
                  ? 'bg-blue-700 border-b-2 border-blue-900' 
                  : 'bg-blue-800'
            }`}
          >
            <div>
              <p className={`text-sm transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-blue-200' 
                  : isVisibilityHigh 
                    ? 'text-blue-100 font-bold' 
                    : 'text-blue-100'
              }`}>IAN BROOKS</p>
              <p className={`text-xs transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-blue-300' 
                  : isVisibilityHigh 
                    ? 'text-blue-200 font-medium' 
                    : 'text-blue-200'
              }`}>CONTENT ADMINISTRATOR</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                currentPage === 'dashboard'
                  ? (isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : isVisibilityHigh 
                        ? 'bg-blue-500 hover:bg-blue-400 border-2 border-blue-800' 
                        : 'bg-blue-600 hover:bg-blue-500')
                  : (isDarkMode 
                      ? 'hover:bg-blue-600' 
                      : 'hover:bg-blue-600')
              }`}
            >
              <Home size={18} />
              <span className="text-sm">Home</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/content')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                currentPage === 'content'
                  ? (isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : isVisibilityHigh 
                        ? 'bg-blue-500 hover:bg-blue-400 border-2 border-blue-800' 
                        : 'bg-blue-600 hover:bg-blue-500')
                  : (isDarkMode 
                      ? 'hover:bg-blue-600' 
                      : 'hover:bg-blue-600')
              }`}
            >
              <FileText size={18} />
              <span className="text-sm">Content Management</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/upload')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                currentPage === 'upload'
                  ? (isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : isVisibilityHigh 
                        ? 'bg-blue-500 hover:bg-blue-400 border-2 border-blue-800' 
                        : 'bg-blue-600 hover:bg-blue-500')
                  : (isDarkMode 
                      ? 'hover:bg-blue-600' 
                      : 'hover:bg-blue-600')
              }`}
            >
              <Upload size={18} />
              <span className="text-sm">Upload Materials</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                currentPage === 'users'
                  ? (isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-500' 
                      : isVisibilityHigh 
                        ? 'bg-blue-500 hover:bg-blue-400 border-2 border-blue-800' 
                        : 'bg-blue-600 hover:bg-blue-500')
                  : (isDarkMode 
                      ? 'hover:bg-blue-600' 
                      : 'hover:bg-blue-600')
              }`}
            >
              <Users size={18} />
              <span className="text-sm">User Management</span>
            </button>

            <hr className={`my-4 ${
              isDarkMode 
                ? 'border-blue-500' 
                : isVisibilityHigh 
                  ? 'border-blue-300 border-2' 
                  : 'border-blue-600'
            }`} />
            
            <button 
              onClick={() => navigate('/admin/support')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-600'
              }`}
            >
              <HelpCircle size={18} />
              <span className="text-sm">Help & Support</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-600'
              }`}
            >
              <LogOut size={18} />
              <span className="text-sm">Log Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div 
            className={`transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-900' 
                : isVisibilityHigh 
                  ? 'bg-blue-50' 
                  : 'bg-gray-100'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
