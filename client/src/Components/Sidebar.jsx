import React from 'react';
import {
  Grid,
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 h-full overflow-y-auto">
      {/* 
        Injecting custom CSS to guarantee the seamless fluid border and shine 
        work out-of-the-box without modifying tailwind.config.js 
      */}
      <style>
        {`
          @keyframes fluidBorder {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
          @keyframes glassShine {
            0% { transform: translateX(-150%) skewX(-20deg); }
            25% { transform: translateX(250%) skewX(-20deg); }
            100% { transform: translateX(250%) skewX(-20deg); }
          }
          .premium-fluid-border {
            background: linear-gradient(90deg, #4285f4, #9b72cb, #d96570, #fbbc04, #34a853, #4285f4, #9b72cb);
            background-size: 200% 100%;
            animation: fluidBorder 3s linear infinite;
          }
          .premium-shine-beam {
            position: absolute;
            top: 0;
            width: 50%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.8), rgba(255,255,255,0));
            animation: glassShine 4s infinite ease-in-out;
            pointer-events: none;
          }
        `}
      </style>

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

        {/* Navigation Links (New Entry removed) */}
        <nav className="px-3 space-y-1 mt-2">
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
            className="relative w-full rounded-xl p-[2px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 premium-fluid-border group"
          >
            {/* Inner Glass Center */}
            <div className={`relative w-full h-full rounded-[10px] flex items-center justify-center gap-2 px-3 py-2 overflow-hidden backdrop-blur-md transition-all duration-300 shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)] ${
              activeTab === 'premium'
                ? 'bg-white/50'
                : 'bg-white/80 group-hover:bg-white/60'
            }`}>
              
              {/* Sweeping Shine Animation inside the glass */}
              <div className="premium-shine-beam z-0" />

              <Crown className="w-4 h-4 relative z-10 text-black" />
              <span className="font-bold text-xs uppercase tracking-wide relative z-10 bg-clip-text text-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">
                Go Premium
              </span>
            </div>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-100 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'profile'
                ? 'text-blue-600 bg-blue-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
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