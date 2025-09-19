import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Users,
  Calendar,
  Clock,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: Home,
    color: 'text-blue-500'
  },
  {
    name: 'Users',
    path: '/users',
    icon: Users,
    color: 'text-green-500'
  },
  {
    name: 'Meetings',
    path: '/meetings',
    icon: Calendar,
    color: 'text-purple-500'
  },
  // { 
  //   name: 'Attendance', 
  //   path: '/attendance', 
  //   icon: Clock,
  //   color: 'text-orange-500'
  // },
  // { 
  //   name: 'Tasks', 
  //   path: '/tasks', 
  //   icon: CheckSquare,
  //   color: 'text-red-500'
  // },
  // { 
  //   name: 'Analytics', 
  //   path: '/analytics', 
  //   icon: BarChart3,
  //   color: 'text-indigo-500'
  // },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {

  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  }

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-64'
      } bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col h-full`}>

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* <span className="text-white font-bold text-sm">SA</span> */}
              <img src="/logo (1).svg" alt="" className='' />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Super Admin</h1>
              {/* <p className="text-xs text-gray-500">Dashboard v2.0</p> */}
            </div>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          {isCollapsed ? (
            <ChevronRight size={16} className="text-gray-600" />
          ) : (
            <ChevronLeft size={16} className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-r-4 border-blue-500 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <IconComponent
                    size={20}
                    className={`${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'
                      } transition-colors duration-200`}
                  />
                  {!isCollapsed && (
                    <span className="font-medium">{item.name}</span>
                  )}
                  {isCollapsed && (
                    <div className="absolute left-16 bg-gray-800 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Settings Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
              ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-r-4 border-blue-500 text-blue-700'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            }`
          }
        >
          <Settings size={20} className="text-gray-400 group-hover:text-gray-600" />
          {!isCollapsed && <span className="font-medium">Settings</span>}
        </NavLink>

        <button onClick={handleLogout} className="flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-gray-600 hover:bg-red-50 hover:text-red-600 w-full">
          <LogOut size={20} className="text-gray-400 group-hover:text-red-500" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
