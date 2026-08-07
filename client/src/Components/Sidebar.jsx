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
  LogOut
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'hr', name: 'HR', icon: Users },
    { id: 'crm', name: 'CRM', icon: Briefcase },
    { id: 'finance', name: 'Finance', icon: Wallet },
    { id: 'projects', name: 'Projects', icon: FolderKanban },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      <div>
        {/* Logo Section */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Grid className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight text-lg">EVO ERP</h1>
            <p className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">Enterprise Suite</p>
          </div>
        </div>

        {/* New Entry Button - Above Dashboard */}
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

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50">
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
        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium rounded-lg hover:bg-slate-50">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}