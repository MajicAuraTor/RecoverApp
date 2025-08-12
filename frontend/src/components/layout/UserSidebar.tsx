import React from 'react';

interface UserSidebarProps {
  onLogout: () => void;
  onViewDetails: () => void;
}

export const UserSidebar: React.FC<UserSidebarProps> = ({ onLogout, onViewDetails }) => {
  const navigationItems = [
    { label: "Dashboard", type: "item", active: true },
    { label: "My Procedures", type: "item" },
    { label: "Products", type: "item" },
    { type: "separator" },
    { label: "Resources", type: "item" },
    { label: "Progress", type: "item" },
    { label: "Reminders", type: "item" },
    { label: "Notifications", type: "item" },
    { type: "separator" },
    { label: "Account", type: "item" },
    { label: "Payment", type: "item" },
    { label: "Settings", type: "item" },
    { type: "separator" },
    { label: "Customer Support", type: "item" },
    { label: "Help", type: "item" },
    { type: "separator" },
    { label: "Log Out", type: "item" }
  ];

  const handleItemClick = (label: string) => {
    if (label === "Log Out") {
      onLogout();
    } else if (label === "My Procedures") {
      onViewDetails();
    }
    // Add other navigation logic here if needed
  };

  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen transition-colors duration-300">
      {/* User Info */}
      <div className="p-4 bg-blue-800 transition-colors duration-300">
        <div>
          <p className="text-sm text-blue-100">FELICIA BURBANK</p>
          <p className="text-xs text-blue-200">USER</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((tab, index) => (
          tab.type === "separator" ? (
            <hr key={`separator-${index}`} className="my-4 border-blue-600" />
          ) : (
            <button
              key={tab.label}
              className={`w-full flex items-center space-x-3 p-2 rounded transition-colors text-sm ${
                tab.active 
                  ? 'bg-blue-600 hover:bg-blue-500' 
                  : 'hover:bg-blue-600'
              }`}
              onClick={() => tab.label && handleItemClick(tab.label)}
            >
              <span>{tab.label}</span>
            </button>
          )
        ))}
      </nav>
    </div>
  );
};
