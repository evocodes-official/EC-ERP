import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

// Importing each field module as individual components
import DashboardContent from './Components/DashboardContent';
import HRContent from './Components/modules/HRContent';
import CRMContent from './Components/modules/CRMContent';
import FinanceContent from './Components/modules/FinanceContent';
import ProjectsContent from './Components/modules/ProjectContent';
import ReportsContent from './Components/ReportsContent';
import SettingsContent from './Components/SettingsContent';
import HelpContent from './Components/HelpContent';

export default function ERP() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'hr':
        return <HRContent />;
      case 'crm':
        return <CRMContent />;
      case 'finance':
        return <FinanceContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'reports':
        return <ReportsContent />;
      case 'settings':
        return <SettingsContent />;
      case 'help':
        return <HelpContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans antialiased text-gray-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar setActiveTab={setActiveTab} />
        <main className="p-6 overflow-y-auto flex-1">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}