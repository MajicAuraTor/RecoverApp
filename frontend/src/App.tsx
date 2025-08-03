import { useState, useEffect } from 'react';
import Header from './components/shared/Header';
import Sidebar from './components/shared/Sidebar';
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

/**
 * 🧭 URL-BASED NAVIGATION SYSTEM DOCUMENTATION
 * =============================================
 * 
 * This app uses a custom URL-based navigation system that:
 * 
 * 1. 📍 SHOWS CURRENT LOCATION: Browser URL reflects current page
 *    - Admin dashboard: /admin
 *    - Content management: /admin/content-management  
 *    - User reminders: /user/my-reminders
 * 
 * 2. 🔄 SYNCS WITH BROWSER: Back/forward buttons work correctly
 *    - Uses window.history.pushState() to change URL without reload
 *    - Listens to 'popstate' events for browser navigation
 * 
 * 3. 🔗 ENABLES DIRECT ACCESS: Users can bookmark/share specific pages
 *    - Type localhost:5176/admin/content-management directly
 *    - Refresh page and stay on the same view
 * 
 * 4. ⚙️ CUSTOMIZABLE URLS: Easy to change URLs in URL_ROUTES config
 *    - Want /dashboard instead of /admin? Just change the config!
 *    - All navigation automatically uses your custom URLs
 * 
 * HOW TO CUSTOMIZE URLs:
 * - Edit the URL_ROUTES object below
 * - All navigation will automatically use your new URLs
 * - No need to change navigation calls throughout the app
 */

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

  // 🎯 URL NAVIGATION CONFIGURATION
  // This is where you define what URLs map to what views
  const URL_ROUTES = {
    // Admin URLs - customize these paths as needed
    admin: {
      dashboard: '/dashboard',
      content: '/content', 
      preview: '/preview',
      settings: '/settings'
    },
    // User URLs - customize these paths as needed  
    user: {
      dashboard: '/home',
      reminders: '/reminders',
      tutorials: '/learn',
      milestones: '/progress', 
      summary: '/reports'
    }
  };

  // Listen for URL changes and update views accordingly
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      
      if (userRole === 'admin') {
        // Map URLs to admin views using your custom routes
        if (path === URL_ROUTES.admin.content) {
          setAdminView('content');
        } else if (path === URL_ROUTES.admin.preview) {
          setAdminView('preview');
        } else if (path === URL_ROUTES.admin.settings) {
          setAdminView('settings');
        } else {
          setAdminView('dashboard');
        }
      } else if (userRole === 'user') {
        // Map URLs to user views using your custom routes
        if (path === URL_ROUTES.user.reminders) {
          setUserView('reminders');
        } else if (path === URL_ROUTES.user.tutorials) {
          setUserView('tutorials');
        } else if (path === URL_ROUTES.user.milestones) {
          setUserView('milestone');
        } else if (path === URL_ROUTES.user.summary) {
          setUserView('summary');
        } else {
          setUserView('dashboard');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [userRole]);

  // Update URL when views change - uses your custom URL routes
  useEffect(() => {
    if (userRole === 'admin') {
      let targetURL;
      switch (adminView) {
        case 'content':
          targetURL = URL_ROUTES.admin.content;
          break;
        case 'preview':
          targetURL = URL_ROUTES.admin.preview;
          break;
        case 'settings':
          targetURL = URL_ROUTES.admin.settings;
          break;
        default:
          targetURL = URL_ROUTES.admin.dashboard;
      }
      
      if (window.location.pathname !== targetURL) {
        window.history.pushState(null, '', targetURL);
      }
    }
  }, [adminView, userRole]);

  useEffect(() => {
    if (userRole === 'user') {
      let targetURL;
      switch (userView) {
        case 'reminders':
          targetURL = URL_ROUTES.user.reminders;
          break;
        case 'tutorials':
          targetURL = URL_ROUTES.user.tutorials;
          break;
        case 'milestone':
          targetURL = URL_ROUTES.user.milestones;
          break;
        case 'summary':
          targetURL = URL_ROUTES.user.summary;
          break;
        default:
          targetURL = URL_ROUTES.user.dashboard;
      }
      
      if (window.location.pathname !== targetURL) {
        window.history.pushState(null, '', targetURL);
      }
    }
  }, [userView, userRole]);

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
    // Navigate to admin dashboard using custom URL
    window.history.pushState(null, '', URL_ROUTES.admin.dashboard);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserRole(null);
    // Navigate to root/login page
    window.history.pushState(null, '', '/');
  };

  const handlePublish = () => {
    setShowConfirmationModal(false);
    alert('Content published successfully!');
  };

  // 🚀 NAVIGATION HELPER FUNCTIONS
  // These functions handle programmatic navigation with custom URLs
  const navigateToAdminView = (view: AdminView) => {
    setAdminView(view);
    // URL will be automatically updated by the useEffect above
  };

  const navigateToUserView = (view: UserView) => {
    setUserView(view);
    // URL will be automatically updated by the useEffect above
  };

  const handleAdminNavigation = (tab: string) => {
    navigateToAdminView(tab as AdminView);
  };

  const handleUserNavigation = (page: string) => {
    navigateToUserView(page as UserView);
  };

  // 📊 DATA FETCHING FUNCTIONS
  // These functions fetch data from your MySQL backend based on current URL/view
  const fetchDataForCurrentView = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      let endpoint = '';
      
      // Map current view to API endpoint
      if (userRole === 'admin') {
        switch (adminView) {
          case 'dashboard':
            endpoint = '/api/v1/data/dashboard';
            break;
          case 'content':
            endpoint = '/api/v1/data/content';
            break;
          default:
            return;
        }
      } else if (userRole === 'user') {
        switch (userView) {
          case 'reminders':
            endpoint = '/api/v1/data/reminders';
            break;
          case 'milestone':
            endpoint = '/api/v1/data/progress';
            break;
          case 'summary':
            endpoint = '/api/v1/data/reports';
            break;
          default:
            return;
        }
      }

      if (endpoint) {
        const response = await fetch(`http://localhost:5000${endpoint}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('📊 Data loaded for current view:', data);
          // Here you would update your component state with the fetched data
        }
      }
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  // Fetch data whenever the view changes
  useEffect(() => {
    if (userRole) {
      fetchDataForCurrentView();
    }
  }, [adminView, userView, userRole]);

  // Login screen - no demo mode
  if (!userRole) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Admin interface
  if (userRole === 'admin') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeTab={adminView} onTabChange={handleAdminNavigation} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={adminUser} />
          <main className="flex-1 overflow-y-auto">
            {adminView === 'dashboard' && (
              <AdminDashboard onNavigateToContent={() => navigateToAdminView('content')} />
            )}
            {adminView === 'content' && (
              <ContentManagement onPreview={() => navigateToAdminView('preview')} />
            )}
            {adminView === 'preview' && (
              <PreviewAsUser
                onBack={() => navigateToAdminView('content')}
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
            <UserDashboard onNavigate={handleUserNavigation} />
          )}
          {userView === 'reminders' && (
            <RemindersSetup onBack={() => navigateToUserView('dashboard')} />
          )}
          {userView === 'tutorials' && (
            <TutorialsPage onBack={() => navigateToUserView('dashboard')} />
          )}
          {userView === 'milestone' && (
            <LogMilestone onBack={() => navigateToUserView('dashboard')} />
          )}
          {userView === 'summary' && (
            <DailySummary onBack={() => navigateToUserView('dashboard')} />
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