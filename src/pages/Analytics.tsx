import React from 'react';
import { TrendingUp, TrendingDown, Users, Calendar, Clock, Target, BarChart3, PieChart } from 'lucide-react';

const Analytics: React.FC = () => {
  const analyticsData = [
    {
      title: 'Total Revenue',
      value: '$124,583',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Users',
      value: '8,549',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      trend: 'down',
      icon: Target,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg. Session',
      value: '4m 32s',
      change: '+15.3%',
      trend: 'up',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const chartData = [
    { month: 'Jan', users: 4000, revenue: 2400 },
    { month: 'Feb', users: 3000, revenue: 1398 },
    { month: 'Mar', users: 2000, revenue: 9800 },
    { month: 'Apr', users: 2780, revenue: 3908 },
    { month: 'May', users: 1890, revenue: 4800 },
    { month: 'Jun', users: 2390, revenue: 3800 }
  ];

  const topPages = [
    { page: '/dashboard', views: 12847, bounce: '32%' },
    { page: '/products', views: 8392, bounce: '28%' },
    { page: '/about', views: 6428, bounce: '45%' },
    { page: '/contact', views: 4829, bounce: '52%' },
    { page: '/pricing', views: 3847, bounce: '38%' }
  ];

  const userGrowth = [
    { period: 'This Week', value: '+234', percentage: '+12.3%' },
    { period: 'This Month', value: '+1,847', percentage: '+8.7%' },
    { period: 'This Quarter', value: '+4,523', percentage: '+15.2%' },
    { period: 'This Year', value: '+18,392', percentage: '+23.8%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Monitor your business performance and growth</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                  <IconComponent size={24} className={`bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`} />
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp size={16} className="text-green-500" />
                  ) : (
                    <TrendingDown size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Monthly revenue and user growth</p>
            </div>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="h-64 flex items-end space-x-2">
            {chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full bg-gray-200 rounded-t relative" style={{ height: '180px' }}>
                  <div
                    className="w-1/2 bg-blue-500 rounded-t absolute bottom-0 left-0"
                    style={{ height: `${(data.users / 4000) * 100}%` }}
                  ></div>
                  <div
                    className="w-1/2 bg-green-500 rounded-t absolute bottom-0 right-0"
                    style={{ height: `${(data.revenue / 10000) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Revenue</span>
            </div>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">User Growth</h2>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <div className="space-y-4">
            {userGrowth.map((growth, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">{growth.period}</p>
                  <p className="text-lg font-bold text-gray-800">{growth.value}</p>
                </div>
                <span className="text-sm font-medium text-green-600">{growth.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Top Pages</h2>
            <PieChart size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{page.page}</p>
                  <p className="text-sm text-gray-500">{page.views.toLocaleString()} views</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{page.bounce}</p>
                  <p className="text-xs text-gray-500">Bounce Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Traffic Sources</h2>
            <BarChart3 size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Organic Search</span>
                <span className="text-sm font-medium text-gray-800">45.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45.2%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Direct</span>
                <span className="text-sm font-medium text-gray-800">32.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '32.8%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Social Media</span>
                <span className="text-sm font-medium text-gray-800">15.4%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15.4%' }}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm font-medium text-gray-800">6.6%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: '6.6%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
