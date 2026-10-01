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

// --- NEW COMPONENTS INTEGRATION ---
import Inventories from './Components/modules/Inventories'; 
import Premium from './Components/Premium'; 
import ProfileContent from './Components/ProfileContent'; 

export default function ERP() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Wrapper function to close sidebar on mobile/tablet when a tab link is clicked
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); 
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent onNavigate={handleTabChange} />;
      case 'hr': return <HRContent />;
      case 'crm': return <CRMContent />;
      case 'finance': return <FinanceContent />;
      case 'projects': return <ProjectsContent />;
      case 'inventories': return <Inventories />;
      case 'reports': return <ReportsContent />;
      case 'settings': return <SettingsContent />;
      case 'premium': return <Premium />;
      case 'profile': return <ProfileContent />;
      case 'help': return <HelpContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="flex bg-slate-50 h-screen w-full font-sans antialiased text-gray-900 overflow-hidden relative">
      
      {/* TABLET & MOBILE BACKDROP OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 xl:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* RESPONSIVE DRAWER WRAPPER (Drawer for screens < 1280px, static for desktop xl) */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl xl:shadow-none
          xl:relative xl:translate-x-0 h-full
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen} 
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar 
          setActiveTab={handleTabChange} 
          onMenuClick={() => setIsSidebarOpen((prev) => !prev)} 
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-0">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}