import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Bell,
  Grid,
  X,
  Users,
  Briefcase,
  Wallet,
  FolderKanban,
  ArrowLeft,
  UserPlus,
  Plus,
  FileText,
  CheckSquare,
  Building2,
  Mail,
  Calendar,
  User,
  Menu,
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  BellRing,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

const Navbar = ({ setActiveTab, onMenuClick }) => {
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [formData, setFormData] = useState({});
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isGridTrayOpen, setIsGridTrayOpen] = useState(false);
  const notificationRef = useRef(null);
  const gridTrayRef = useRef(null);

  const modules = [
    {
      id: 'hr', name: 'HR', description: 'Add a new employee', icon: Users,
      color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', hoverBg: 'hover:bg-blue-50',
    },
    {
      id: 'crm', name: 'CRM', description: 'Add a new deal', icon: Briefcase,
      color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200', hoverBg: 'hover:bg-amber-50',
    },
    {
      id: 'finance', name: 'Finance', description: 'Create a new invoice', icon: Wallet,
      color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-200', hoverBg: 'hover:bg-emerald-50',
    },
    {
      id: 'projects', name: 'Projects', description: 'Create a new task', icon: FolderKanban,
      color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200', hoverBg: 'hover:bg-purple-50',
    },
  ];

  const openModuleModal = () => {
    setIsModuleModalOpen(true);
    setSelectedModule(null);
    setFormData({});
  };

  const closeAllModals = () => {
    setIsModuleModalOpen(false);
    setSelectedModule(null);
    setFormData({});
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    if (module.id === 'hr') {
      setFormData({ name: '', email: '', dept: 'Engineering', role: '', attendance: 'On-site' });
    } else if (module.id === 'crm') {
      setFormData({ title: '', value: '', details: '' });
    } else if (module.id === 'finance') {
      setFormData({ client: '', amount: '', date: '', status: 'PENDING' });
    } else if (module.id === 'projects') {
      setFormData({ title: '', category: 'Backend', dueDate: '', assignee: 'AL' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveTab(selectedModule.id);
    closeAllModals();
  };

  const notifications = [
    { id: 1, type: 'info', title: 'New employee onboarded', message: 'Sarah Johnson joined Engineering', time: '2 min ago', icon: Info, iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 2, type: 'success', title: 'Invoice paid', message: 'Invoice #INV-2024-001 from Acme Corp', time: '15 min ago', icon: CheckCircle2, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { id: 3, type: 'warning', title: 'Task deadline approaching', message: 'Project Alpha due in 2 days', time: '1 hour ago', icon: AlertTriangle, iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
    { id: 4, type: 'info', title: 'New lead captured', message: 'Potential client from LinkedIn campaign', time: '3 hours ago', icon: BellRing, iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  ];

  const gridNavItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'hr', name: 'HR', icon: Users },
    { id: 'crm', name: 'CRM', icon: Briefcase },
    { id: 'finance', name: 'Finance', icon: Wallet },
    { id: 'projects', name: 'Projects', icon: FolderKanban },
    { id: 'inventories', name: 'Inventories', icon: Package },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (gridTrayRef.current && !gridTrayRef.current.contains(event.target)) {
        setIsGridTrayOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderModuleForm = () => {
    if (!selectedModule) return null;

    const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
    const labelClass = "block text-xs font-semibold text-gray-700 mb-1";

    switch (selectedModule.id) {
      case 'hr':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Enter employee name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" required placeholder="employee@evo-erp.com" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Department</label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select value={formData.dept || 'Engineering'} onChange={(e) => setFormData({ ...formData, dept: e.target.value })} className={inputClass}>
                    <option value="Engineering">Engineering</option>
                    <option value="Design">Design</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>Role</label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" required placeholder="e.g. Developer" value={formData.role || ''} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className={inputClass} />
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Attendance</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select value={formData.attendance || 'On-site'} onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className={inputClass}>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="O.O.O">O.O.O</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
              <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                <UserPlus size={14} /> Add Employee
              </button>
            </div>
          </form>
        );

      case 'crm':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Deal Title</label>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Enter deal name" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Deal Value ($)</label>
              <div className="relative">
                <Wallet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="number" required placeholder="Enter deal value" value={formData.value || ''} onChange={(e) => setFormData({ ...formData, value: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Details / Notes</label>
              <textarea placeholder="Add details about this deal..." value={formData.details || ''} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20" rows={3} />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
              <button type="submit" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                <Plus size={14} /> Add Deal
              </button>
            </div>
          </form>
        );

      case 'finance':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Client Name</label>
              <div className="relative">
                <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Enter client name" value={formData.client || ''} onChange={(e) => setFormData({ ...formData, client: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Amount ($)</label>
                <div className="relative">
                  <Wallet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="number" required placeholder="0.00" value={formData.amount || ''} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="date" required value={formData.date || ''} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputClass} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
              <button type="submit" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                <FileText size={14} /> Create Invoice
              </button>
            </div>
          </form>
        );

      case 'projects':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Task Title</label>
              <div className="relative">
                <CheckSquare size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" required placeholder="Enter task summary..." value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Category</label>
                <select value={formData.category || 'Backend'} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Designing">Designing</option>
                  <option value="RND">RND</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <input type="date" required value={formData.dueDate || ''} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Assignee</label>
              <select value={formData.assignee || 'AL'} onChange={(e) => setFormData({ ...formData, assignee: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
                <option value="AL">AL (Alex Morgan)</option>
                <option value="AG">AG (Aiden Green)</option>
                <option value="JD">JD (Jane Doe)</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
              <button type="submit" className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
                <Plus size={14} /> Create Task
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-10 shrink-0 gap-2">
      
      {/* RESPONSIVE LEFT SIDE (Hamburger + Search) */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* RESPONSIVE RIGHT SIDE (Actions) */}
      <div className="flex items-center space-x-1 sm:space-x-3 shrink-0">
        
        {/* Full button on Desktop/Tablet */}
        <button
          onClick={openModuleModal}
          className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-semibold transition-colors items-center gap-1.5"
        >
          Create New
        </button>

        {/* Icon-only button on Mobile */}
        <button
          onClick={openModuleModal}
          className="sm:hidden flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-md transition-colors"
        >
          <Plus size={16} />
        </button>

        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="relative text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* NOTIFICATION TRAY */}
        {isNotificationOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)}>
            <div 
              ref={notificationRef}
              className="absolute right-4 top-14 w-80 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                <span className="text-xs text-gray-500 font-medium">{notifications.length} new</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <div key={notification.id} className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0">
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-lg ${notification.bgColor} ${notification.iconColor} shrink-0`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => { setIsGridTrayOpen(!isGridTrayOpen); setIsNotificationOpen(false); }}
          className="hidden min-[350px]:block text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
        >
          <Grid size={18} />
        </button>

        {/* GRID / APPS TRAY */}
        {isGridTrayOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setIsGridTrayOpen(false)}>
            <div 
              ref={gridTrayRef}
              className="absolute right-4 top-14 w-72 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-sm">Quick Access</h3>
                <p className="text-xs text-gray-500 mt-0.5">Navigate to any module</p>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-2 gap-2">
                  {gridNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = false;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setIsGridTrayOpen(false); }}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          isActive
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-600'}`}>
                          <Icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="pl-1 sm:pl-2 border-l border-gray-200 flex items-center">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Profile"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 object-cover cursor-pointer"
          />
        </div>
      </div>

      {/* MODULE SELECTION MODAL */}
      {isModuleModalOpen && !selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAllModals}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Create New</h3>
                <p className="text-xs text-gray-500 mt-0.5">Select a module to create a new entry.</p>
              </div>
              <button onClick={closeAllModals} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button key={module.id} onClick={() => handleModuleSelect(module)} className={`w-full flex items-center gap-4 p-4 rounded-xl border ${module.borderColor} ${module.bgColor} ${module.hoverBg} transition-all group text-left`}>
                    <div className={`p-3 rounded-xl ${module.bgColor} ${module.color} border ${module.borderColor}`}>
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">{module.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{module.description}</p>
                    </div>
                    <ArrowLeft size={16} className="text-gray-300 group-hover:text-gray-500 rotate-180 transition-colors" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODULE-SPECIFIC CREATE FORM MODAL */}
      {isModuleModalOpen && selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAllModals}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedModule(null)} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all" title="Back to modules">
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedModule.id === 'hr' && 'Add New Employee'}
                    {selectedModule.id === 'crm' && 'Add New Deal'}
                    {selectedModule.id === 'finance' && 'Create New Invoice'}
                    {selectedModule.id === 'projects' && 'Create New Task'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedModule.id === 'hr' && 'Fill in the details to add a new employee.'}
                    {selectedModule.id === 'crm' && 'Enter the deal information below.'}
                    {selectedModule.id === 'finance' && 'Create a new invoice for a client.'}
                    {selectedModule.id === 'projects' && 'New tasks are added to the To Do column.'}
                  </p>
                </div>
              </div>
              <button onClick={closeAllModals} className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                <X size={18} />
              </button>
            </div>
            {renderModuleForm()}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;