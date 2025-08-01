import React from 'react';
import { 
  Grid3X3, 
  Upload,
  CheckSquare,
  FileText, 
  FileBarChart,
  Bell,
  User,
  BarChart3,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Content Library', icon: Grid3X3 },
    { id: 'content', label: 'Upload Content', icon: Upload },
    { id: 'preview', label: 'Daily Checklist', icon: CheckSquare },
    { id: 'settings', label: 'Documents', icon: FileText },
  ];

  const bottomNavigationItems = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'audit-logs', label: 'Audit Logs', icon: FileBarChart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-slate-800 to-slate-700 text-white flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-600/50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">+</span>
            </div>
          </div>
          <div>
            <h1 className="text-lg font-display font-bold">RECOVER</h1>
            <p className="text-xs text-slate-300">by: MEDLINE</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 text-left text-sm
                    ${isActive 
                      ? 'bg-white/20 text-white font-medium' 
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="my-6 border-t border-blue-500/30"></div>

        {/* Bottom Navigation */}
        <ul className="space-y-1">
          {bottomNavigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 text-left text-sm
                    ${isActive 
                      ? 'bg-white/20 text-white font-medium' 
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Another Divider */}
        <div className="my-6 border-t border-blue-500/30"></div>

        {/* Help Section */}
        <ul className="space-y-1">
          <li>
            <button
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                       transition-all duration-200 text-left text-sm
                       text-slate-200 hover:bg-white/10 hover:text-white"
            >
              <HelpCircle size={18} />
              <span>Help</span>
            </button>
          </li>
          <li>
            <button
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg
                       transition-all duration-200 text-left text-sm
                       text-slate-200 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;