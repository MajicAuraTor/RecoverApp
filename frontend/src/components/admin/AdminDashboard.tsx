import React from 'react';
import { FileText, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react';

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

  const recentActivity = [
    { action: 'Updated knee replacement protocol', time: '2 hours ago', type: 'update' },
    { action: 'Published new eye-drop tutorial', time: '4 hours ago', type: 'publish' },
    { action: 'Reviewed user feedback', time: '1 day ago', type: 'review' },
    { action: 'Added exercise video content', time: '2 days ago', type: 'add' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">Monitor your healthcare content management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-500 text-blue-600 bg-blue-50',
            green: 'bg-green-500 text-green-600 bg-green-50',
            orange: 'bg-orange-500 text-orange-600 bg-orange-50',
            purple: 'bg-purple-500 text-purple-600 bg-purple-50',
          };

          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color].split(' ')[2]}`}>
                  <Icon size={20} className={colorClasses[stat.color].split(' ')[1]} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={onNavigateToContent}
              className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-blue-600" />
                <span className="font-medium text-gray-900">Manage Content</span>
              </div>
              <ArrowRight size={16} className="text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3">
                <Users size={20} className="text-green-600" />
                <span className="font-medium text-gray-900">View User Reports</span>
              </div>
              <ArrowRight size={16} className="text-green-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'update' ? 'bg-blue-500' :
                  activity.type === 'publish' ? 'bg-green-500' :
                  activity.type === 'review' ? 'bg-orange-500' :
                  'bg-purple-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last Update Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">System Status</h3>
            <p className="text-gray-600">Last content update: March 15, 2024 at 2:30 PM</p>
            <p className="text-sm text-blue-600 mt-2">All systems operational</p>
          </div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;