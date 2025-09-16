import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Bell, Clock, Users, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  duration?: number;
  timestamp: Date;
  meetingId?: string;
  icon?: React.ReactNode;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  scheduleMeetingNotifications: (meetingId: string, meetingTitle: string, meetingTime: Date) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      duration: notification.duration || 5000,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, newNotification.duration);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const scheduleMeetingNotifications = (meetingId: string, meetingTitle: string, meetingTime: Date) => {
    const now = new Date();
    const timeDiff = meetingTime.getTime() - now.getTime();
    
    // Schedule notifications at 5, 4, 3, 2, 1 minutes before meeting
    const notificationTimes = [5, 4, 3, 2, 1];
    
    notificationTimes.forEach((minutes) => {
      const notificationTime = timeDiff - (minutes * 60 * 1000);
      
      if (notificationTime > 0) {
        setTimeout(() => {
          addNotification({
            type: minutes <= 2 ? 'warning' : 'info',
            title: `Meeting Reminder`,
            message: `"${meetingTitle}" starts in ${minutes} minute${minutes > 1 ? 's' : ''}`,
            meetingId,
            icon: minutes <= 2 ? <AlertCircle size={20} /> : <Clock size={20} />,
            duration: 8000,
          });
        }, notificationTime);
      }
    });

    // Final notification when meeting starts
    if (timeDiff > 0) {
      setTimeout(() => {
        addNotification({
          type: 'success',
          title: `Meeting Started`,
          message: `"${meetingTitle}" is starting now!`,
          meetingId,
          icon: <Users size={20} />,
          duration: 10000,
        });
      }, timeDiff);
    }
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAllNotifications,
      scheduleMeetingNotifications,
    }}>
      {children}
      <NotificationToaster />
    </NotificationContext.Provider>
  );
};

const NotificationToaster: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-600" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-600" />;
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.slice(0, 5).map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-xl border shadow-lg backdrop-blur-sm animate-in slide-in-from-right-5 duration-300 ${getTypeStyles(notification.type)}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {notification.icon || getTypeIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm">{notification.title}</h4>
              <p className="text-sm mt-1 opacity-90">{notification.message}</p>
              <p className="text-xs mt-2 opacity-60">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
