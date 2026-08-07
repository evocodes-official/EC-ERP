import React, { useState } from 'react';
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
} from 'lucide-react';

const Navbar = ({ setActiveTab }) => {
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [formData, setFormData] = useState({});

  const modules = [
    {
      id: 'hr',
      name: 'HR',
      description: 'Add a new employee',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-50',
    },
    {
      id: 'crm',
      name: 'CRM',
      description: 'Add a new deal',
      icon: Briefcase,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      hoverBg: 'hover:bg-amber-50',
    },
    {
      id: 'finance',
      name: 'Finance',
      description: 'Create a new invoice',
      icon: Wallet,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBg: 'hover:bg-emerald-50',
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Create a new task',
      icon: FolderKanban,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      hoverBg: 'hover:bg-purple-50',
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
    // Initialize form data based on module
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
    // Navigate to the module page
    setActiveTab(selectedModule.id);
    closeAllModals();
  };

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
                <input
                  type="text"
                  required
                  placeholder="Enter employee name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="employee@evo-erp.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Department</label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.dept || 'Engineering'}
                    onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
                    className={inputClass}
                  >
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
                  <input
                    type="text"
                    required
                    placeholder="e.g. Developer"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>Attendance</label>
              <div className="relative">
                <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  value={formData.attendance || 'On-site'}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className={inputClass}
                >
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="O.O.O">O.O.O</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
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
                <input
                  type="text"
                  required
                  placeholder="Enter deal name"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Deal Value ($)</label>
              <div className="relative">
                <Wallet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  required
                  placeholder="Enter deal value"
                  value={formData.value || ''}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Details / Notes</label>
              <textarea
                placeholder="Add details about this deal..."
                value={formData.details || ''}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
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
                <input
                  type="text"
                  required
                  placeholder="Enter client name"
                  value={formData.client || ''}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Amount ($)</label>
                <div className="relative">
                  <Wallet size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={formData.amount || ''}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
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
                <input
                  type="text"
                  required
                  placeholder="Enter task summary..."
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={formData.category || 'Backend'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Designing">Designing</option>
                  <option value="RND">RND</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Due Date</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate || ''}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Assignee</label>
              <select
                value={formData.assignee || 'AL'}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="AL">AL (Alex Morgan)</option>
                <option value="AG">AG (Aiden Green)</option>
                <option value="JD">JD (Jane Doe)</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" onClick={closeAllModals} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Cancel
              </button>
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
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-64">
        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search modules..."
          className="w-full bg-gray-50 pl-9 pr-4 py-1.5 rounded-lg text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={openModuleModal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md font-semibold transition-colors"
        >
          Create New
        </button>

        <button className="relative text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
          <Grid size={18} />
        </button>

        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
          alt="Profile"
          className="w-8 h-8 rounded-full border border-gray-200 object-cover cursor-pointer"
        />
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
              <button
                onClick={closeAllModals}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSelect(module)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border ${module.borderColor} ${module.bgColor} ${module.hoverBg} transition-all group text-left`}
                  >
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
                <button
                  onClick={() => setSelectedModule(null)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                  title="Back to modules"
                >
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
              <button
                onClick={closeAllModals}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              >
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