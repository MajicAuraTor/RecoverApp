import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Home,
  FileText, 
  Upload, 
  CheckSquare, 
  FileIcon, 
  Users,
  BarChart3, 
  HelpCircle, 
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage = 'dashboard' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 hover:bg-blue-500 rounded p-2 transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg">RECOVER</span>
            </button>
            <span className="text-blue-100">Admin Dashboard</span>
            <button 
              onClick={() => navigate('/admin/dashboard')}
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
                placeholder="Search content..." 
                className="px-3 py-1 rounded bg-blue-500 text-white placeholder-blue-200 text-sm w-64"
              />
              <Search size={16} className="absolute right-2 top-1.5 text-blue-200" />
            </div>
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
              <span className="text-blue-100 text-sm">Ian Brooks</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-blue-700 text-white min-h-screen">
          {/* User Info */}
          <div className="p-4 bg-blue-800">
            <div>
              <p className="text-blue-100 text-sm">GOOD MORNING, IAN BROOKS</p>
              <p className="text-blue-200 text-xs">CONTENT ADMINISTRATOR</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'dashboard' ? 'bg-blue-600' : ''
              }`}
            >
              <Home size={18} />
              <span className="text-sm">Dashboard</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/content')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'content' ? 'bg-blue-600' : ''
              }`}
            >
              <FileText size={18} />
              <span className="text-sm">Content Management</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/upload')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'upload' ? 'bg-blue-600' : ''
              }`}
            >
              <Upload size={18} />
              <span className="text-sm">Upload Materials</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/review')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'review' ? 'bg-blue-600' : ''
              }`}
            >
              <CheckSquare size={18} />
              <span className="text-sm">Review Queue</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/documents')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'documents' ? 'bg-blue-600' : ''
              }`}
            >
              <FileIcon size={18} />
              <span className="text-sm">Document Library</span>
            </button>

            <hr className="border-blue-600 my-4" />

            <button 
              onClick={() => navigate('/admin/users')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'users' ? 'bg-blue-600' : ''
              }`}
            >
              <Users size={18} />
              <span className="text-sm">User Management</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/analytics')}
              className={`w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors ${
                currentPage === 'analytics' ? 'bg-blue-600' : ''
              }`}
            >
              <BarChart3 size={18} />
              <span className="text-sm">Analytics</span>
            </button>

            <hr className="border-blue-600 my-4" />

            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <HelpCircle size={18} />
              <span className="text-sm">Help & Support</span>
            </a>
            
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors"
            >
              <LogOut size={18} />
              <span className="text-sm">Sign Out</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
