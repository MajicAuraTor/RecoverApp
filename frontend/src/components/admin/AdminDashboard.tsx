import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Users,
  Clock,
  TrendingUp,
  Eye,
  Edit3,
  AlertCircle,
  Moon,
  Sun,
  EyeOff,
  Search,
  Bell,
  Settings,
  User,
  Home,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisibilityHigh, setIsVisibilityHigh] = useState(false);
  const [stats, setStats] = useState([
    {
      label: 'Total Procedures',
      value: '48',
      change: '+12 this week',
      icon: FileText,
      color: 'blue' as const,
    },
    {
      label: 'Active Users',
      value: '284',
      change: '+8 new this month',
      icon: Users,
      color: 'green' as const,
    },
    {
      label: 'Pending Reviews',
      value: '3',
      change: '1 urgent',
      icon: Clock,
      color: 'orange' as const,
    },
    {
      label: 'Content Updates',
      value: '98%',
      change: 'Up to date',
      icon: TrendingUp,
      color: 'purple' as const,
    },
  ]);

  useEffect(() => {
    loadDashboardData();
    
    // Listen for content updates to refresh dashboard stats
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'savedContent' || e.key === 'uploadedContent') {
        loadDashboardData();
      }
    };
    
    // Listen for custom events from content management
    const handleContentUpdate = () => {
      loadDashboardData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('contentUpdated', handleContentUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, []);

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

  const loadDashboardData = async () => {
    try {
      const data = await dashboardAPI.getDashboardStats();
      if (data) {
        setStats(prev => prev.map((stat, index) => {
          switch (index) {
            case 0: return { ...stat, value: data.totalContent || stat.value };
            case 1: return { ...stat, value: data.totalUsers || stat.value };
            case 2: return { ...stat, value: data.pendingReviews || stat.value };
            case 3: return { ...stat, value: data.engagementRate || stat.value };
            default: return stat;
          }
        }));
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  // Focus on knee replacement content as per user story
  const kneeReplacementContent = [
    { 
      title: 'Post-Op Knee Replacement Protocol', 
      status: 'Draft',
      lastUpdated: '2024-07-28',
      version: 'v2.1',
      priority: 'high'
    },
    { 
      title: 'Knee Surgery Exercise Recommendations', 
      status: 'Draft',
      lastUpdated: '2024-08-01',
      version: 'v1.3',
      priority: 'medium'
    },
    { 
      title: 'Medication Schedule - Knee Recovery', 
      status: 'Published',
      lastUpdated: '2024-08-02',
      version: 'v1.8',
      priority: 'high'
    },
    { 
      title: 'Knee Replacement Tutorial Videos', 
      status: 'Published',
      lastUpdated: '2024-07-25',
      version: 'v1.0',
      priority: 'low'
    }
  ];

  const recentActivities = [
    { 
      action: 'Updated',
      content: 'Post-Op Care Instructions - Knee Replacement',
      timestamp: '2 hours ago',
      user: 'Ian Brooks'
    },
    { 
      action: 'Uploaded',
      content: 'New Exercise Video - Week 2 Recovery',
      timestamp: '1 day ago',
      user: 'Ian Brooks'
    },
    { 
      action: 'Published',
      content: 'Updated Medication Timeline - Emergency Dosage',
      timestamp: '3 days ago',
      user: 'Ian Brooks'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: isDarkMode 
        ? 'bg-blue-700 text-white' 
        : 'bg-blue-600 text-white',
      green: isDarkMode 
        ? 'bg-blue-800 text-white' 
        : 'bg-blue-700 text-white',
      orange: isDarkMode 
        ? 'bg-orange-700 text-white' 
        : 'bg-orange-100 text-orange-600',
      purple: isDarkMode 
        ? 'bg-blue-900 text-white' 
        : 'bg-blue-800 text-white',
    };
    return colors[color as keyof typeof colors] || colors.blue;
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
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-500'
              }`}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm p-1">
                <img 
                  src="/Branding/Recover.png" 
                  alt="RECOVER Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-wide text-white">RECOVER</span>
                <span className="text-xs text-blue-100 -mt-1">Healthcare Platform</span>
              </div>
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
                isDarkMode 
                  ? 'bg-blue-600 hover:bg-blue-500' 
                  : isVisibilityHigh 
                    ? 'bg-blue-500 hover:bg-blue-400 border-2 border-blue-800' 
                    : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              <Home size={18} />
              <span className="text-sm">Home</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/content')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-600'
              }`}
            >
              <FileText size={18} />
              <span className="text-sm">Content Management</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/upload')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-600'
              }`}
            >
              <Upload size={18} />
              <span className="text-sm">Upload Materials</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-600'
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

        {/* Main Content Area */}
        <div className="flex-1">
          <div 
            className={`p-6 min-h-screen transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-900' 
                : isVisibilityHigh 
                  ? 'bg-blue-50' 
                  : 'bg-gray-100'
            }`}
          >
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white' 
                  : isVisibilityHigh 
                    ? 'text-blue-900 text-4xl' 
                    : 'text-gray-900'
              }`}>Welcome back, Ian!</h1>
              <p className={`mt-2 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-gray-300' 
                  : isVisibilityHigh 
                    ? 'text-blue-800 text-lg font-medium' 
                    : 'text-gray-600'
              }`}>Manage surgical content and keep patient education current</p>
            </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={index} 
                className={`rounded-lg shadow-sm border p-6 transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : isVisibilityHigh 
                      ? 'bg-blue-100 border-blue-800 border-2' 
                      : 'bg-gray-200 border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-300' 
                        : isVisibilityHigh 
                          ? 'text-blue-900 text-base font-bold' 
                          : 'text-gray-600'
                    }`}>{stat.label}</p>
                    <p className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-white' 
                        : isVisibilityHigh 
                          ? 'text-blue-900 text-3xl' 
                          : 'text-gray-900'
                    }`}>{stat.value}</p>
                    <p className={`text-sm mt-1 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-400' 
                        : isVisibilityHigh 
                          ? 'text-blue-700 font-medium' 
                          : 'text-gray-500'
                    }`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                    <IconComponent size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions - Focused on Content Management */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => navigate('/admin/content')}
            className={`text-white p-6 rounded-lg transition-colors flex items-center justify-center space-x-3 ${
              isDarkMode 
                ? 'bg-blue-700 hover:bg-blue-600' 
                : isVisibilityHigh 
                  ? 'bg-blue-500 hover:bg-blue-600 border-2 border-blue-800' 
                  : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <FileText size={24} />
            <div className="text-left">
              <div className="font-semibold">Manage Content</div>
              <div className={`text-sm ${
                isDarkMode 
                  ? 'text-blue-200' 
                  : isVisibilityHigh 
                    ? 'text-blue-100 font-medium' 
                    : 'text-blue-100'
              }`}>Edit knee replacement protocols</div>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/upload')}
            className={`text-white p-6 rounded-lg transition-colors flex items-center justify-center space-x-3 ${
              isDarkMode 
                ? 'bg-blue-700 hover:bg-blue-600' 
                : isVisibilityHigh 
                  ? 'bg-blue-500 hover:bg-blue-600 border-2 border-blue-800' 
                  : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Upload size={24} />
            <div className="text-left">
              <div className="font-semibold">Upload Materials</div>
              <div className={`text-sm ${
                isDarkMode 
                  ? 'text-blue-200' 
                  : isVisibilityHigh 
                    ? 'text-blue-100 font-medium' 
                    : 'text-blue-100'
              }`}>Add new educational content</div>
            </div>
          </button>
          
          <button 
            onClick={() => alert('Preview feature coming soon!')}
            className={`text-white p-6 rounded-lg transition-colors flex items-center justify-center space-x-3 ${
              isDarkMode 
                ? 'bg-blue-700 hover:bg-blue-600' 
                : isVisibilityHigh 
                  ? 'bg-blue-500 hover:bg-blue-600 border-2 border-blue-800' 
                  : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <Eye size={24} />
            <div className="text-left">
              <div className="font-semibold">Preview as Patient</div>
              <div className={`text-sm ${
                isDarkMode 
                  ? 'text-blue-200' 
                  : isVisibilityHigh 
                    ? 'text-blue-100 font-medium' 
                    : 'text-blue-100'
              }`}>See patient view</div>
            </div>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Knee Replacement Content - Main Focus */}
          <div className={`rounded-lg shadow-sm border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : isVisibilityHigh 
                ? 'bg-blue-100 border-blue-800 border-2' 
                : 'bg-gray-200 border-gray-300'
          }`}>
            <div className={`text-white p-4 rounded-t-lg flex justify-between items-center transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-700' 
                : isVisibilityHigh 
                  ? 'bg-blue-500 border-b-2 border-blue-800' 
                  : 'bg-blue-600'
            }`}>
              <h2 className="font-semibold text-lg">Knee Replacement Content</h2>
              <button 
                onClick={() => navigate('/admin/content')}
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-blue-200 hover:text-white' 
                    : 'text-blue-100 hover:text-white'
                }`}
              >
                <Edit3 size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {kneeReplacementContent.map((item, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 hover:bg-gray-700' 
                      : isVisibilityHigh 
                        ? 'border-blue-800 border-2 hover:bg-blue-200' 
                        : 'border-gray-400 hover:bg-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-medium flex-1 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-white' 
                        : isVisibilityHigh 
                          ? 'text-blue-900 font-bold' 
                          : 'text-gray-900'
                    }`}>{item.title}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className={`flex justify-between items-center text-sm transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-gray-400' 
                      : isVisibilityHigh 
                        ? 'text-blue-700 font-medium' 
                        : 'text-gray-500'
                  }`}>
                    <span>Version {item.version}</span>
                    <span>Updated {item.lastUpdated}</span>
                  </div>
                  {item.status === 'Under Review' && (
                    <div className={`mt-2 flex items-center text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-orange-400' 
                        : 'text-orange-600'
                    }`}>
                      <AlertCircle size={14} className="mr-1" />
                      Pending medical board approval
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className={`rounded-lg shadow-sm border transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-700' 
              : isVisibilityHigh 
                ? 'bg-blue-100 border-blue-800 border-2' 
                : 'bg-gray-200 border-gray-300'
          }`}>
            <div className={`text-white p-4 rounded-t-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-700' 
                : isVisibilityHigh 
                  ? 'bg-blue-600 border-b-2 border-blue-900' 
                  : 'bg-blue-700'
            }`}>
              <h2 className="font-semibold text-lg">Recent Content Activity</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`border-l-4 pl-4 py-2 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'border-blue-400' 
                      : isVisibilityHigh 
                        ? 'border-blue-600 border-l-8' 
                        : 'border-blue-400'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-medium transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-white' 
                          : isVisibilityHigh 
                            ? 'text-black font-bold' 
                            : 'text-gray-900'
                      }`}>
                        <span className={`transition-colors duration-300 ${
                          isDarkMode 
                            ? 'text-blue-300' 
                            : isVisibilityHigh 
                              ? 'text-blue-700 font-bold' 
                              : 'text-blue-600'
                        }`}>{activity.action}</span> {activity.content}
                      </p>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-gray-400' 
                          : isVisibilityHigh 
                            ? 'text-black font-medium' 
                            : 'text-gray-500'
                      }`}>by {activity.user}</p>
                    </div>
                    <span className={`text-sm transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-gray-500' 
                        : isVisibilityHigh 
                          ? 'text-black font-medium' 
                          : 'text-gray-400'
                    }`}>{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Update Notice */}
        <div className={`mt-6 rounded-lg p-4 border transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-blue-900 border-blue-700' 
            : isVisibilityHigh 
              ? 'bg-blue-100 border-blue-600 border-2' 
              : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center">
            <AlertCircle className={`h-5 w-5 mr-2 transition-colors duration-300 ${
              isDarkMode 
                ? 'text-blue-300' 
                : isVisibilityHigh 
                  ? 'text-blue-700' 
                  : 'text-blue-600'
            }`} />
            <div>
              <p className={`font-medium transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-blue-100' 
                  : isVisibilityHigh 
                    ? 'text-blue-900 font-bold' 
                    : 'text-blue-800'
              }`}>Content Management System</p>
              <p className={`text-sm mt-1 transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-blue-200' 
                  : isVisibilityHigh 
                    ? 'text-blue-800 font-medium' 
                    : 'text-blue-700'
              }`}>
                You can publish urgent updates immediately. All content is reviewed monthly for compliance. 
                <button 
                  onClick={() => navigate('/admin/content')}
                  className={`font-medium underline ml-1 transition-colors ${
                    isDarkMode 
                      ? 'hover:text-blue-100' 
                      : isVisibilityHigh 
                        ? 'hover:text-blue-700 font-bold' 
                        : 'hover:text-blue-900'
                  }`}
                >
                  Manage content now
                </button>
              </p>
            </div>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;