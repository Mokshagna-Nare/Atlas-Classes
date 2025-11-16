
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LandingPage from './pages/landing/LandingPage';
import InstituteLogin from './pages/auth/InstituteLogin';
import StudentLogin from './pages/auth/StudentLogin';
import InstituteDashboard from './pages/dashboards/institute/InstituteDashboard';
import StudentDashboard from './pages/dashboards/student/StudentDashboard';
import InstituteSignup from './pages/auth/InstituteSignup';
import StudentSignup from './pages/auth/StudentSignup';
import { User } from './types';
import TakeTestPage from './pages/dashboards/student/TakeTestPage';
import CareersPage from './pages/careers/CareersPage';
import AdminLogin from './pages/auth/AdminLogin';
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';

// Wrapper to protect routes
const ProtectedRoute: React.FC<{ role: 'institute' | 'student' | 'admin' }> = ({ role }) => {
  const auth = useAuth();
  const user = auth?.user as User | null;

  if (!user) {
    // Not logged in, redirect to the appropriate login page
    return <Navigate to={`/login/${role}`} replace />;
  }

  if (user.role !== role) {
    // Logged in but with the wrong role, redirect to their dashboard or landing
    if (user.role === 'institute') {
      return <Navigate to="/dashboard/institute" replace />;
    }
    if (user.role === 'student') {
        return <Navigate to="/dashboard/student" replace />;
    }
    if (user.role === 'admin') {
      return <Navigate to="/dashboard/admin" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the correct role
  return <Outlet />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/login/institute" element={<InstituteLogin />} />
            <Route path="/login/student" element={<StudentLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/signup/institute" element={<InstituteSignup />} />
            <Route path="/signup/student" element={<StudentSignup />} />
            
            <Route element={<ProtectedRoute role="institute" />}>
              <Route path="/dashboard/institute" element={<InstituteDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute role="student" />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/student/test/:testId" element={<TakeTestPage />} />
            </Route>

            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>
            
            {/* Redirect any other path to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;