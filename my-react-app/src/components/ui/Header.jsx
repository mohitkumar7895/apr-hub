import React from 'react';
import { BarChart3, LayoutDashboard, Settings, LogOut } from 'lucide-react';

const Header = ({ currentView, onViewChange, user, onLogout }) => {
  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-base sm:text-xl font-bold text-gray-900 truncate">APR Hub Analytics</span>
          </div>

          {/* Navigation - Hidden on mobile, shown on tablet+ */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => onViewChange('builder')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'builder'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Report Builder</span>
            </button>
          </nav>

          {/* Mobile Navigation - Icons only */}
          <nav className="flex md:hidden items-center space-x-1">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              title="Dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>

            <button
              onClick={() => onViewChange('builder')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'builder'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              title="Report Builder"
            >
              <Settings className="w-5 h-5" />
            </button>
          </nav>

          {/* User Info */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {user && (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* User details - Hidden on mobile */}
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</p>
                </div>
                {/* Avatar */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm flex-shrink-0">
                  {getUserInitials(user.name)}
                </div>
                {/* Logout button */}
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;