// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <MeetingProvider>
          <Router>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Routes>
          </Router>
        </MeetingProvider>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;