import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
}

interface UserContextType {
  userData: UserData;
  updateUser: (newData: Partial<UserData>) => void;
  getFullName: () => string;
}

const defaultUserData: UserData = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@company.com',
  phone: '+1 (555) 123-4567',
  bio: 'Experienced administrator with expertise in team management and system optimization.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
  role: 'Administrator',
  department: 'IT Management',
  joinDate: '2020-01-15'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(defaultUserData);

  const updateUser = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const getFullName = () => {
    return `${userData.firstName} ${userData.lastName}`;
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, getFullName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
