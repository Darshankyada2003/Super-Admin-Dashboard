import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckSquare, 
  TrendingUp, 
  TrendingDown,
  Eye,
  MoreVertical,
  Activity,
  DollarSign
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Dashboard: React.FC = () => {
  const { getFullName } = useUser();
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Meetings Today',
      value: '24',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Attendance Rate',
      value: '94.2%',
      change: '-2.1%',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Active Tasks',
      value: '186',
      change: '+15.3%',
      trend: 'up',
      icon: CheckSquare,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Revenue',
      value: '$89,432',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New user registered',
      user: 'Sarah Johnson',
      time: '2 minutes ago',
      type: 'user'
    },
    {
      id: 2,
      action: 'Meeting scheduled',
      user: 'Team Lead',
      time: '15 minutes ago',
      type: 'meeting'
    },
    {
      id: 3,
      action: 'Task completed',
      user: 'Mike Chen',
      time: '1 hour ago',
      type: 'task'
    },
    {
      id: 4,
      action: 'Leave request submitted',
      user: 'Anna Wilson',
      time: '2 hours ago',
      type: 'leave'
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Team Standup',
      time: '09:00 AM',
      attendees: 12,
      status: 'starting'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '02:00 PM',
      attendees: 8,
      status: 'scheduled'
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '04:30 PM',
      attendees: 15,
      status: 'scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {getFullName().split(' ')[0]}! 👋</h1>
            <p className="text-blue-100">Here's what's happening with your team today.</p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <Activity size={32} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <IconComponent size={24} className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical size={16} className="text-gray-400" />
                </button>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
                <div className="flex items-center">
                  {stat.trend === 'up' ? (
                    <TrendingUp size={14} className="text-green-500 mr-1" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              <Eye size={16} className="mr-1" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'meeting' ? 'bg-green-100' :
                  activity.type === 'task' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'user' && <Users size={16} className="text-blue-600" />}
                  {activity.type === 'meeting' && <Calendar size={16} className="text-green-600" />}
                  {activity.type === 'task' && <CheckSquare size={16} className="text-purple-600" />}
                  {activity.type === 'leave' && <Clock size={16} className="text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Meetings */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Meetings</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Add New
            </button>
          </div>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">{meeting.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    meeting.status === 'starting' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {meeting.status === 'starting' ? 'Starting Soon' : 'Scheduled'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{meeting.time}</p>
                <div className="flex items-center text-sm text-gray-400">
                  <Users size={14} className="mr-1" />
                  {meeting.attendees} attendees
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
