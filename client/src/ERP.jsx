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

export default function ERP() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // NEW: State to control the mobile sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Wrapper function to close sidebar on mobile when a link is clicked
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
      case 'help': return <HelpContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    // Set h-screen and overflow-hidden to prevent body scrolling weirdness on mobile
    <div className="flex bg-slate-50 h-screen w-full font-sans antialiased text-gray-900 overflow-hidden relative">
      
      {/* MOBILE DARK OVERLAY BACKDROP */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* RESPONSIVE SIDEBAR WRAPPER */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
          md:relative md:translate-x-0 h-full
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          setIsSidebarOpen={setIsSidebarOpen} 
        />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Pass the toggle function to the Navbar */}
        <Navbar 
          setActiveTab={handleTabChange} 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        
        {/* Content canvas - only this part scrolls! */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-0">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
}