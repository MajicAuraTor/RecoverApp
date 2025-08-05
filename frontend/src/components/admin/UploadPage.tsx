import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileIcon, 
  AlertCircle, 
  CheckCircle,
  Moon,
  Sun,
  EyeOff,
  Eye,
  Search,
  Bell,
  Settings,
  User,
  Home,
  FileText,
  Users,
  HelpCircle,
  LogOut,
  BarChart3,
  BookOpen,
  CheckSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { uploadAPI } from '../../services/api';

interface UploadItem {
  id: string;
  filename: string;
  originalName: string;
  uploadedAt: string;
  fileSize: number;
  fileType: string;
}

const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVisibilityHigh, setIsVisibilityHigh] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<UploadItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  useEffect(() => {
    loadUploadHistory();
  }, []);

  const loadUploadHistory = async () => {
    try {
      const data = await uploadAPI.getUploadHistory();
      setUploadHistory(data);
    } catch (error) {
      console.error('Failed to load upload history:', error);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadAPI.uploadFile(formData);
      setMessage({ type: 'success', text: 'File uploaded successfully!' });
      loadUploadHistory(); // Refresh the list
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to upload file. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-900' 
          : isVisibilityHigh 
            ? 'bg-yellow-50' 
            : 'bg-gray-50'
      }`}
    >
      {/* Top Navigation Bar */}
      <nav 
        className={`text-white p-4 transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-blue-700' 
            : isVisibilityHigh 
              ? 'bg-blue-600 border-b-2 border-black' 
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
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'bg-blue-800 text-white placeholder-blue-300 border-blue-600' 
                    : 'bg-blue-500 text-white placeholder-blue-200 border-blue-400'
                } border`}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-blue-200" />
            </div>

            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-blue-600' 
                : 'hover:bg-blue-500'
            }`}>
              <Bell className="h-5 w-5" />
            </button>

            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-500'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button 
              onClick={toggleVisibility}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'hover:bg-blue-600' 
                  : 'hover:bg-blue-500'
              }`}
            >
              {isVisibilityHigh ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>

            <button className={`p-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'hover:bg-blue-600' 
                : 'hover:bg-blue-500'
            }`}>
              <Settings className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isDarkMode 
                  ? 'bg-blue-800' 
                  : 'bg-blue-500'
              }`}>
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium">Admin</span>
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
                ? 'bg-blue-700 border-r-2 border-black' 
                : 'bg-blue-700'
          }`}
        >
          {/* User Info */}
          <div 
            className={`p-4 transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-800' 
                : isVisibilityHigh 
                  ? 'bg-blue-800 border-b-2 border-black' 
                  : 'bg-blue-800'
            }`}
          >
            <div>
              <p className="text-sm opacity-75">Welcome back</p>
              <p className="font-semibold">Admin User</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="mt-4">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Home
            </button>
            
            <button 
              onClick={() => navigate('/admin/content')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Content Management
            </button>
            
            <button 
              onClick={() => navigate('/admin/upload')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <Upload className="mr-3 h-5 w-5" />
              Upload Materials
            </button>
            
            <button 
              onClick={() => navigate('/admin/review')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <CheckSquare className="mr-3 h-5 w-5" />
              Review Queue
            </button>
            
            <button 
              onClick={() => navigate('/admin/documents')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Document Library
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              User Management
            </button>
            
            <button 
              onClick={() => navigate('/admin/analytics')}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Analytics
            </button>
            
            <button 
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-blue-600 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </button>
            
            <button 
              onClick={handleLogout}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-red-600 mt-4 ${
                isVisibilityHigh ? 'border-b border-black' : ''
              }`}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className={`text-3xl font-bold mb-6 transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Upload Materials
            </h1>

            {/* Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 mb-8 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : isDarkMode 
                    ? 'border-gray-600 bg-gray-800' 
                    : 'border-gray-300 bg-white'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className={`mx-auto h-12 w-12 mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <h3 className={`text-lg font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Upload Files
              </h3>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Drag and drop files here, or click to select files
              </p>
              <input
                type="file"
                multiple
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Select Files
              </label>
            </div>

            {/* Upload Status */}
            {uploading && (
              <div className={`p-4 rounded-lg mb-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
              }`}>
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
                  <p className={isDarkMode ? 'text-white' : 'text-blue-700'}>
                    Uploading file...
                  </p>
                </div>
              </div>
            )}

            {/* Success/Error Messages */}
            {message && (
              <div className={`p-4 rounded-lg mb-6 flex items-center ${
                message.type === 'success' 
                  ? isDarkMode 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-green-50 text-green-700'
                  : isDarkMode 
                    ? 'bg-red-900 text-red-200' 
                    : 'bg-red-50 text-red-700'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-3" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-3" />
                )}
                <p>{message.text}</p>
              </div>
            )}

            {/* Upload History */}
            {uploadHistory.length > 0 && (
              <div className={`rounded-lg overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } shadow`}>
                <div className={`px-6 py-4 border-b ${
                  isDarkMode ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
                }`}>
                  <h3 className={`text-lg font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Recent Uploads
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          File Name
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Size
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Type
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          Uploaded
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${
                      isDarkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'
                    }`}>
                      {uploadHistory.map((item) => (
                        <tr key={item.id}>
                          <td className={`px-6 py-4 whitespace-nowrap ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            <div className="flex items-center">
                              <FileIcon className="h-5 w-5 mr-3 text-gray-400" />
                              {item.originalName}
                            </div>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {formatFileSize(item.fileSize)}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {item.fileType}
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {new Date(item.uploadedAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
