import { useState, useEffect } from 'react';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ContentManagement from './components/admin/ContentManagement';
import PreviewAsUser from './components/admin/PreviewAsUser';
import ConfirmationModal from './components/admin/ConfirmationModal';
import UserDashboard from './components/user/UserDashboard';
import RemindersSetup from './components/user/RemindersSetup';
import TutorialsPage from './components/user/TutorialsPage';
import LogMilestone from './components/user/LogMilestone';
import DailySummary from './components/user/DailySummary';
import Header from './components/shared/Header';
import Sidebar from './components/shared/Sidebar';

type UserRole = 'admin' | 'user' | null;
type AdminView = 'dashboard' | 'content' | 'preview' | 'settings';
type UserView = 'dashboard' | 'reminders' | 'tutorials' | 'milestone' | 'summary';

function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [adminView, setAdminView] = useState<AdminView>('dashboard');
  const [userView, setUserView] = useState<UserView>('dashboard');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setUserRole(userData.role === 'admin' ? 'admin' : 'user');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const adminUser = {
    name: 'Ian Brooks',
    email: 'ian.brooks@healthcare.com',
    role: 'Administrator',
  };

  const regularUser = {
    name: 'Robert Harris',
    email: 'robert.harris@user.com',
    role: 'User',
  };

  const handleAdminLogin = (_email: string, _password: string) => {
    setUserRole('admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserRole(null);
  };

  const handlePublish = () => {
    setShowConfirmationModal(false);
    alert('Content published successfully!');
  };

  // Login screen - no demo mode
  if (!userRole) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Admin interface
  if (userRole === 'admin') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeTab={adminView} onTabChange={(tab) => setAdminView(tab as AdminView)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={adminUser} />
          <main className="flex-1 overflow-y-auto">
            {adminView === 'dashboard' && (
              <AdminDashboard onNavigateToContent={() => setAdminView('content')} />
            )}
            {adminView === 'content' && (
              <ContentManagement onPreview={() => setAdminView('preview')} />
            )}
            {adminView === 'preview' && (
              <PreviewAsUser
                onBack={() => setAdminView('content')}
                onPublish={() => setShowConfirmationModal(true)}
              />
            )}
            {adminView === 'settings' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Settings panel coming soon...</p>
                <button 
                  onClick={handleLogout}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            )}
          </main>
        </div>
        
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handlePublish}
          title="Confirm Publication"
          message="Are you sure you want to publish the updated knee replacement protocol? This will make the changes visible to all users immediately."
        />
      </div>
    );
  }

  // User interface
  if (userRole === 'user') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={regularUser} />
        <main>
          {userView === 'dashboard' && (
            <UserDashboard onNavigate={(page) => setUserView(page as UserView)} />
          )}
          {userView === 'reminders' && (
            <RemindersSetup onBack={() => setUserView('dashboard')} />
          )}
          {userView === 'tutorials' && (
            <TutorialsPage onBack={() => setUserView('dashboard')} />
          )}
          {userView === 'milestone' && (
            <LogMilestone onBack={() => setUserView('dashboard')} />
          )}
          {userView === 'summary' && (
            <DailySummary onBack={() => setUserView('dashboard')} />
          )}
        </main>
        <div className="p-4">
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;