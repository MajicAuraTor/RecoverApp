import React from 'react';
import { 
  FileText, 
  Upload, 
  CheckSquare, 
  FileIcon, 
  Bell, 
  User, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Users,
  Clock,
  TrendingUp
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateToContent: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateToContent }) => {
  const stats = [
    {
      label: 'Total Content Items',
      value: '47',
      change: '+3 this week',
      icon: FileText,
      color: 'blue' as const,
    },
    {
      label: 'Active Users',
      value: '1,284',
      change: '+12% this month',
      icon: Users,
      color: 'green' as const,
    },
    {
      label: 'Pending Reviews',
      value: '8',
      change: '2 urgent',
      icon: Clock,
      color: 'orange' as const,
    },
    {
      label: 'Engagement Rate',
      value: '94%',
      change: '+2.1% vs last month',
      icon: TrendingUp,
      color: 'purple' as const,
    },
  ];

  const recentUploads = [
    { title: 'Medication Instructions Print Out', type: 'document' },
    { title: 'How to get out of bed Safely', type: 'guide' }
  ];

  const documentsUploaded = [
    { title: 'Symptom Tracker (Printout)', type: 'tracker' },
    { title: 'Medication instructions (printout)', type: 'instructions' }
  ];

  const procedureContent = [
    { title: 'Hip Replacement Surgery', status: 'Published' },
    { title: 'Knee Replacement Surgery', status: 'Published' },
    { title: 'Shoulder Replacement Surgery', status: 'Draft' },
    { title: 'Spinal Fusion', status: 'Published' }
  ];

  const supplyLists = [
    'Hip Replacement Surgery',
    'Knee Replacement Surgery',
    'Shoulder Replacement Surgery',
    'Spinal Fusion'
  ];

  const getStatusColor = (status: string) => {
    return status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">R</span>
              </div>
              <span className="font-bold text-lg">RECOVER</span>
            </div>
            <span className="text-blue-100">Admin Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
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
            <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
              <User size={16} />
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
              <p className="text-blue-100 text-sm">GOOD MORNING, IAN WALTERS</p>
              <p className="text-blue-200 text-xs">ADMIN DASHBOARD</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors bg-blue-600">
              <FileText size={18} />
              <span className="text-sm">Content Library</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <Upload size={18} />
              <span className="text-sm">Upload Content</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <CheckSquare size={18} />
              <span className="text-sm">Daily Checklist</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <FileIcon size={18} />
              <span className="text-sm">Documents</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <Bell size={18} />
              <span className="text-sm">Notifications</span>
            </a>

            <hr className="border-blue-600 my-4" />

            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <User size={18} />
              <span className="text-sm">Account</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <BarChart3 size={18} />
              <span className="text-sm">Analytics</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <Settings size={18} />
              <span className="text-sm">Settings</span>
            </a>

            <hr className="border-blue-600 my-4" />

            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <HelpCircle size={18} />
              <span className="text-sm">Help</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded hover:bg-blue-600 transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Log Out</span>
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Stats Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${getStatColor(stat.color)}`}>
                        <IconComponent size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <button 
                onClick={onNavigateToContent}
                className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FileText size={20} />
                <span>Manage Content</span>
              </button>
              <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                <Upload size={20} />
                <span>Upload Files</span>
              </button>
              <button className="bg-orange-600 text-white p-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2">
                <Users size={20} />
                <span>Manage Users</span>
              </button>
              <button className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
                <BarChart3 size={20} />
                <span>View Analytics</span>
              </button>
            </div>

            {/* Dashboard Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* You Recently Uploaded */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                  <h2 className="font-semibold">You Recently Uploaded:</h2>
                </div>
                <div className="p-4 space-y-3">
                  {recentUploads.map((item, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Procedure Content */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="bg-blue-700 text-white p-4 rounded-t-lg flex justify-between items-center">
                  <h2 className="font-semibold">Procedure Content:</h2>
                  <span className="font-semibold">Status:</span>
                </div>
                <div className="p-4 space-y-3">
                  {procedureContent.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-900 font-medium">{item.title}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Uploaded */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="bg-blue-600 text-white p-4 rounded-t-lg">
                  <h2 className="font-semibold">Documents uploaded:</h2>
                </div>
                <div className="p-4 space-y-3">
                  {documentsUploaded.map((item, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supply Lists Uploaded */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="bg-blue-700 text-white p-4 rounded-t-lg">
                  <h2 className="font-semibold">Supply Lists Uploaded</h2>
                </div>
                <div className="p-4 space-y-2">
                  {supplyLists.map((item, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                      <a href="#" className="text-blue-600 hover:text-blue-800 underline font-medium">
                        {item}
                      </a>
                    </div>
                  ))}
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