import React from 'react';
import { Bell, Search, User, Mail, Settings } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { userData, getFullName } = useUser();
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page Title and Breadcrumb */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <span>Super Admin</span>
            <span>/</span>
            <span className="text-blue-600">{title}</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          {/* Messages */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
              <Mail size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <Settings size={20} className="text-gray-600" />
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-800">{getFullName()}</p>
              <p className="text-xs text-gray-500">{userData?.role || "Guest"}</p>
            </div>
            <div className="relative">
              {userData?.avatar ? (
                <img
                  src={userData.avatar}
                  alt={getFullName()}
                  className="w-8 h-8 rounded-full object-cover hover:shadow-lg transition-shadow duration-200"
                />
              ) : (
                <button className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow duration-200">
                  <User size={16} className="text-white" />
                </button>
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
