import React, { useState } from 'react';
import { Calendar, Clock, Users, Download, Filter, Search, TrendingUp, TrendingDown } from 'lucide-react';

const Attendance: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const attendanceStats = [
    {
      title: 'Present Today',
      value: '142',
      total: '156',
      percentage: '91.0%',
      trend: 'up',
      change: '+2.3%'
    },
    {
      title: 'Late Arrivals',
      value: '8',
      total: '142',
      percentage: '5.6%',
      trend: 'down',
      change: '-1.2%'
    },
    {
      title: 'Early Departures',
      value: '3',
      total: '142',
      percentage: '2.1%',
      trend: 'down',
      change: '-0.8%'
    },
    {
      title: 'Absent',
      value: '14',
      total: '156',
      percentage: '9.0%',
      trend: 'down',
      change: '-1.5%'
    }
  ];

  const attendanceRecords = [
    {
      id: 1,
      name: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      checkIn: '09:00 AM',
      checkOut: '06:00 PM',
      workHours: '8h 30m',
      status: 'present',
      department: 'Engineering'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      checkIn: '09:15 AM',
      checkOut: '05:45 PM',
      workHours: '8h 00m',
      status: 'late',
      department: 'Marketing'
    },
    {
      id: 3,
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      checkIn: '08:45 AM',
      checkOut: '06:15 PM',
      workHours: '9h 00m',
      status: 'present',
      department: 'Engineering'
    },
    {
      id: 4,
      name: 'Anna Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      checkIn: '-',
      checkOut: '-',
      workHours: '-',
      status: 'absent',
      department: 'Design'
    },
    {
      id: 5,
      name: 'David Brown',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      checkIn: '09:30 AM',
      checkOut: '04:30 PM',
      workHours: '6h 30m',
      status: 'early_departure',
      department: 'Engineering'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-600';
      case 'late':
        return 'bg-yellow-100 text-yellow-600';
      case 'absent':
        return 'bg-red-100 text-red-600';
      case 'early_departure':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'Present';
      case 'late':
        return 'Late';
      case 'absent':
        return 'Absent';
      case 'early_departure':
        return 'Early Departure';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
          <p className="text-gray-600">Track and manage employee attendance</p>
        </div>
        <div className="flex items-center space-x-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
            <Download size={20} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {attendanceStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
              <div className="flex items-center space-x-1">
                {stat.trend === 'up' ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-green-500" />
                )}
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{stat.value}</span>
                <span className="text-sm text-gray-500">/ {stat.total}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: stat.percentage }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{stat.percentage} attendance rate</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Mark Attendance</h3>
                <p className="text-sm text-gray-500">Manual check-in/out</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Bulk Actions</h3>
                <p className="text-sm text-gray-500">Multiple user operations</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors duration-200 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Schedule Report</h3>
                <p className="text-sm text-gray-500">Automated reporting</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Status</option>
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
              <option>Early Departure</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Design</option>
              <option>Sales</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Records */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Today's Attendance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 font-medium text-gray-700">Employee</th>
                <th className="text-left p-4 font-medium text-gray-700">Department</th>
                <th className="text-left p-4 font-medium text-gray-700">Check In</th>
                <th className="text-left p-4 font-medium text-gray-700">Check Out</th>
                <th className="text-left p-4 font-medium text-gray-700">Work Hours</th>
                <th className="text-left p-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={record.avatar}
                        alt={record.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{record.name}</p>
                        <p className="text-sm text-gray-500">ID: {record.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{record.department}</td>
                  <td className="p-4 text-gray-600">{record.checkIn}</td>
                  <td className="p-4 text-gray-600">{record.checkOut}</td>
                  <td className="p-4 text-gray-600">{record.workHours}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(record.status)}`}>
                      {getStatusText(record.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
