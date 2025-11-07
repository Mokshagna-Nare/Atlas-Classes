import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/landing/LandingPage';
import InstituteLogin from './pages/auth/InstituteLogin';
import StudentLogin from './pages/auth/StudentLogin';
import InstituteDashboard from './pages/dashboards/institute/InstituteDashboard';
import StudentDashboard from './pages/dashboards/student/StudentDashboard';
import InstituteSignup from './pages/auth/InstituteSignup';
import StudentSignup from './pages/auth/StudentSignup';
import { User } from './types';

// Wrapper to protect routes
const ProtectedRoute: React.FC<{ role: 'institute' | 'student' }> = ({ role }) => {
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
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the correct role
  return <Outlet />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/institute" element={<InstituteLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/signup/institute" element={<InstituteSignup />} />
          <Route path="/signup/student" element={<StudentSignup />} />
          
          <Route element={<ProtectedRoute role="institute" />}>
            <Route path="/dashboard/institute" element={<InstituteDashboard />} />
          </Route>
          
          <Route element={<ProtectedRoute role="student" />}>
            <Route path="/dashboard/student" element={<StudentDashboard />} />
          </Route>
          
          {/* Redirect any other path to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
