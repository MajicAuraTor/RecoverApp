import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Activity, 
  CheckSquare, 
  Upload, 
  Clock, 
  Download, 
  Star 
} from 'lucide-react';
import { dashboardAPI } from '../../services/api';

interface AnalyticsData {
  userStats: {
    totalUsers: number;
    activeUsers: number;
    newUsersThisMonth: number;
    userGrowthRate: number;
  };
  contentStats: {
    totalContent: number;
    publishedContent: number;
    draftContent: number;
    recentUploads: number;
  };
  engagementStats: {
    averageSessionTime: number;
    pageViews: number;
    downloadCount: number;
    feedbackScore: number;
  };
}

const AnalyticsPage: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      // Mock data for demonstration
      setAnalytics({
        userStats: {
          totalUsers: 1284,
          activeUsers: 892,
          newUsersThisMonth: 156,
          userGrowthRate: 12.5
        },
        contentStats: {
          totalContent: 47,
          publishedContent: 43,
          draftContent: 4,
          recentUploads: 8
        },
        engagementStats: {
          averageSessionTime: 8.5,
          pageViews: 12450,
          downloadCount: 3420,
          feedbackScore: 4.2
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    change?: string;
    icon: React.ElementType;
    color: string;
  }> = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Monitor your application performance and user engagement</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading analytics...</span>
          </div>
        ) : analytics ? (
          <>
            {/* User Statistics */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Users"
                  value={formatNumber(analytics.userStats.totalUsers)}
                  change={`+${analytics.userStats.userGrowthRate}% growth`}
                  icon={Users}
                  color="bg-blue-100 text-blue-600"
                />
                <StatCard
                  title="Active Users"
                  value={formatNumber(analytics.userStats.activeUsers)}
                  change="Currently online"
                  icon={Activity}
                  color="bg-green-100 text-green-600"
                />
                <StatCard
                  title="New Users"
                  value={analytics.userStats.newUsersThisMonth}
                  change="This month"
                  icon={TrendingUp}
                  color="bg-purple-100 text-purple-600"
                />
                <StatCard
                  title="Growth Rate"
                  value={`${analytics.userStats.userGrowthRate}%`}
                  change="Monthly growth"
                  icon={BarChart3}
                  color="bg-orange-100 text-orange-600"
                />
              </div>
            </div>

            {/* Content Statistics */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Content"
                  value={analytics.contentStats.totalContent}
                  change="All time"
                  icon={FileText}
                  color="bg-blue-100 text-blue-600"
                />
                <StatCard
                  title="Published"
                  value={analytics.contentStats.publishedContent}
                  change="Live content"
                  icon={CheckSquare}
                  color="bg-green-100 text-green-600"
                />
                <StatCard
                  title="Drafts"
                  value={analytics.contentStats.draftContent}
                  change="In progress"
                  icon={FileText}
                  color="bg-yellow-100 text-yellow-600"
                />
                <StatCard
                  title="Recent Uploads"
                  value={analytics.contentStats.recentUploads}
                  change="This week"
                  icon={Upload}
                  color="bg-purple-100 text-purple-600"
                />
              </div>
            </div>

            {/* Engagement Statistics */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Avg Session Time"
                  value={`${analytics.engagementStats.averageSessionTime}m`}
                  change="Per user session"
                  icon={Clock}
                  color="bg-blue-100 text-blue-600"
                />
                <StatCard
                  title="Page Views"
                  value={formatNumber(analytics.engagementStats.pageViews)}
                  change="Total views"
                  icon={BarChart3}
                  color="bg-green-100 text-green-600"
                />
                <StatCard
                  title="Downloads"
                  value={formatNumber(analytics.engagementStats.downloadCount)}
                  change="Content downloads"
                  icon={Download}
                  color="bg-orange-100 text-orange-600"
                />
                <StatCard
                  title="User Rating"
                  value={`${analytics.engagementStats.feedbackScore}/5`}
                  change="Average score"
                  icon={Star}
                  color="bg-purple-100 text-purple-600"
                />
              </div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth Trend</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Performance</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
                  <p className="text-gray-500">Chart visualization would go here</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600">Failed to load analytics data</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
