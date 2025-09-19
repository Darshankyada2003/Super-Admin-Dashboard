// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { MeetingProvider } from './contexts/MeetingContext';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Meetings from './pages/Meetings';
import Attendance from './pages/Attendance';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/signUp';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
// import { useEffect, useState } from 'react';

function App() {

  // const [isuserLogin, setIsuserLogin] = useState(false)

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   setIsuserLogin(!!token);
  // });

  return (
    <UserProvider>
      <NotificationProvider>
        <MeetingProvider>
          <Router>
            <Routes>

              <Route element={<PublicRoute />}>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/meetings" element={<Meetings />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/signin" replace />} />

            </Routes>
          </Router>
        </MeetingProvider>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;