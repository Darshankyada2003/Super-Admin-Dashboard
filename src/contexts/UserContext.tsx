import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from "react";


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
  username: string;
}

interface UserContextType {
  userData: UserData | null;
  isLoggedIn: boolean;
  login: (token: string, user: UserData) => void;
  logout: () => void;
  updateUser: (newData: Partial<UserData>) => void;
  getFullName: () => string;
}

// const defaultUserData: UserData = {
//   id: 1,
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john.doe@company.com',
//   phone: '+1 (555) 123-4567',
//   bio: 'Experienced administrator with expertise in team management and system optimization.',
//   avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
//   role: 'Administrator',
//   department: 'IT Management',
//   joinDate: '2020-01-15'
// };

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(user));
    }
  }, []);

  const login = (token: string, user: UserData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setUserData(user);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserData(null);
  };

  const updateUser = (newData: Partial<UserData>) => {
    if (!userData) return;
    const updatedUser = { ...userData, ...newData };
    setUserData(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const getFullName = () => {
    return userData ? `${userData.firstName || userData.username} ${userData.lastName || ""}` : "";
  };

  return (
    <UserContext.Provider value={{ userData, isLoggedIn, login, logout, updateUser, getFullName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
