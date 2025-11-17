import React, { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import ReportBuilder from './components/builder/ReportBuilder';
import Header from './components/ui/Header';
import LoginSignup from './components/auth/LoginSignup';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    // Save to localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    return <LoginSignup onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'builder' && <ReportBuilder />}
      </main>
    </div>
  );
}

export default App;