import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ContentManagement from './components/admin/ContentManagement';
import UploadPage from './components/admin/UploadPage';
import UsersPage from './components/admin/UsersPage';
import AnalyticsPage from './components/admin/AnalyticsPage';
import ReviewQueue from './components/admin/ReviewQueue';
import DocumentLibrary from './components/admin/DocumentLibrary';
import UserDashboard from './components/user/UserDashboardClean';

// Simple Login Component
const Login: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    // Updated with your new demo credentials
    if (email === 'ian@example.com' && password === 'Hash_Pwd_456') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', 'admin');
      window.location.href = '/admin/dashboard';
    } else if (email === 'felicia@example.com' && password === 'Hash_Pwd_123') {
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem('userRole', 'user');
      window.location.href = '/user/dashboard';
    } else {
      // Invalid credentials - could show a proper error message in the UI
      console.log('Invalid credentials provided');
    }
  };

  return <AdminLogin onLogin={handleLogin} />;
};

// Admin Dashboard Page
const AdminDashboardPage: React.FC = () => {
  return <AdminDashboard />;
};

// Content Management Page
const ContentPage: React.FC = () => {
  return <ContentManagement />;
};

// Upload Page Component
const AdminUploadPage: React.FC = () => {
  return <UploadPage />;
};

// Users Management Page  
const AdminUsersPage: React.FC = () => {
  return <UsersPage />;
};

// Analytics Page
const AdminAnalyticsPage: React.FC = () => {
  return <AnalyticsPage />;
};

// Review Queue Page
const AdminReviewPage: React.FC = () => {
  return <ReviewQueue />;
};

// Document Library Page
const AdminDocumentsPage: React.FC = () => {
  return <DocumentLibrary />;
};

// User Dashboard Page
const UserDashboardPage: React.FC = () => {
  return <UserDashboard />;
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
        Log Out
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
            path="/user/shop" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Shop for Products</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/care-hub" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Your Care Hub</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/progress" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">My Progress</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/reminders" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Reminders</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/notifications" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Notifications</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/account" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Account</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/cards" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">My Cards</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/support" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Customer Support</h1>
                  <p>Coming soon...</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/user/help" 
            element={
              <ProtectedRoute>
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Help</h1>
                  <p>Coming soon...</p>
                </div>
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
            path="/admin/content" 
            element={
              <ProtectedRoute>
                <ContentPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/upload" 
            element={
              <ProtectedRoute>
                <AdminUploadPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute>
                <AdminUsersPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/analytics" 
            element={
              <ProtectedRoute>
                <AdminAnalyticsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/review" 
            element={
              <ProtectedRoute>
                <AdminReviewPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/admin/documents" 
            element={
              <ProtectedRoute>
                <AdminDocumentsPage />
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