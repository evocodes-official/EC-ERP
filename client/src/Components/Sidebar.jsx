import React from 'react';
import {
  Grid,
  Plus,
  LayoutDashboard,
  Users,
  Briefcase,
  Wallet,
  FolderKanban,
  BarChart3,
  Settings,
  User,
  HelpCircle,
  LogOut,
  Package, // Added for Inventories
  Crown,   // Added for Premium
  X        // Added for Mobile Close
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, setIsSidebarOpen }) {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'hr', name: 'HR', icon: Users },
    { id: 'crm', name: 'CRM', icon: Briefcase },
    { id: 'finance', name: 'Finance', icon: Wallet },
    { id: 'projects', name: 'Projects', icon: FolderKanban },
    { id: 'inventories', name: 'Inventories', icon: Package }, 
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    // Replaced sticky top-0 h-screen with h-full so the wrapper controls it
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      <div>
        {/* Logo Section */}
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <Grid className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight text-lg whitespace-nowrap">EVO ERP</h1>
              <p className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">Enterprise Suite</p>
            </div>
          </div>

          {/* Mobile Close Button */}
          {setIsSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* New Entry Button */}
        <div className="px-3 mb-3">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all text-sm">
            <Plus className="w-4 h-4" />
            New Entry
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {/* Go Premium Button Section */}
        <div className="px-4 py-4 mt-2">
          <button
            onClick={() => setActiveTab('premium')}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-md ${
              activeTab === 'premium'
                ? 'bg-amber-100 text-amber-800 shadow-amber-200/50 ring-2 ring-amber-400'
                : 'bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:from-amber-500 hover:to-orange-600 shadow-orange-500/30'
            }`}
          >
            <Crown className="w-4 h-4" /> Go Premium
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <User className="w-4 h-4" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'help'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" /> Help
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}