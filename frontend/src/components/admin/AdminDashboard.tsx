import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckSquare, 
  Users,
  Clock,
  TrendingUp,
  Eye,
  Edit3,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardAPI } from '../../services/api';
import AdminLayout from '../shared/AdminLayout';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    {
      label: 'Published Procedures',
      value: '12',
      change: '+1 this week',
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
  }, []);

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
      status: 'Published',
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
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <AdminLayout currentPage="dashboard">
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Ian!</h1>
          <p className="text-gray-600 mt-2">Manage surgical content and keep patient education current</p>
        </div>

        {/* Stats Grid */}
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

        {/* Quick Actions - Focused on Content Management */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => navigate('/admin/content')}
            className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3"
          >
            <FileText size={24} />
            <div className="text-left">
              <div className="font-semibold">Manage Content</div>
              <div className="text-sm text-blue-100">Edit knee replacement protocols</div>
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/admin/upload')}
            className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-3"
          >
            <Upload size={24} />
            <div className="text-left">
              <div className="font-semibold">Upload Materials</div>
              <div className="text-sm text-green-100">Add new educational content</div>
            </div>
          </button>
          
          <button 
            onClick={() => alert('Preview feature coming soon!')}
            className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-3"
          >
            <Eye size={24} />
            <div className="text-left">
              <div className="font-semibold">Preview as Patient</div>
              <div className="text-sm text-purple-100">See patient view</div>
            </div>
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Knee Replacement Content - Main Focus */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="font-semibold text-lg">Knee Replacement Content</h2>
              <button 
                onClick={() => navigate('/admin/content')}
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Edit3 size={18} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {kneeReplacementContent.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 flex-1">{item.title}</h3>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Version {item.version}</span>
                    <span>Updated {item.lastUpdated}</span>
                  </div>
                  {item.status === 'Under Review' && (
                    <div className="mt-2 flex items-center text-sm text-orange-600">
                      <AlertCircle size={14} className="mr-1" />
                      Pending medical board approval
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="bg-blue-700 text-white p-4 rounded-t-lg">
              <h2 className="font-semibold text-lg">Recent Content Activity</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">
                        <span className="text-blue-600">{activity.action}</span> {activity.content}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">by {activity.user}</p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Update Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="font-medium text-blue-800">Content Management System</p>
              <p className="text-sm text-blue-700 mt-1">
                You can publish urgent updates immediately. All content is reviewed monthly for compliance. 
                <button 
                  onClick={() => navigate('/admin/content')}
                  className="font-medium underline ml-1 hover:text-blue-900"
                >
                  Manage content now
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;