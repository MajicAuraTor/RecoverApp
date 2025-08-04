import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ContentManagement from './components/admin/ContentManagement';
import UserDashboard from './components/user/UserDashboard';

// Simple Login Component
const Login: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Demo login
    if (email === 'admin@demo.com' && password === 'demo123') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', 'admin');
      window.location.href = '/admin/dashboard';
    } else if (email === 'user@demo.com' && password === 'demo123') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', 'user');
      window.location.href = '/user/dashboard';
    } else {
      alert('Use demo credentials: admin@demo.com/demo123 or user@demo.com/demo123');
    }
  };

  return <AdminLogin onLogin={handleLogin} />;
};

// Simple Content Page
const ContentPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Content Management</h1>
      <ContentManagement onPreview={() => alert('Preview clicked')} />
    </div>
  );
};

// Admin Dashboard Page
const AdminDashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <AdminDashboard onNavigateToContent={() => window.location.href = '/content'} />
    </div>
  );
};

// User Dashboard Page
const UserDashboardPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <UserDashboard onNavigate={(page) => window.location.href = `/${page}`} />
    </div>
  );
};

// Settings Page
const SettingsPage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p className="mb-4">Application settings</p>
      <button 
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

// Check if user is logged in
const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/user/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/content" 
            element={
              <ProtectedRoute>
                <ContentPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Legacy routes for backward compatibility */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;