import React, { useState } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import ReportBuilder from './components/builder/ReportBuilder';
import Header from './components/ui/Header';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-4 py-6">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'builder' && <ReportBuilder />}
      </main>
    </div>
  );
}

export default App;