import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Calendar, BarChart2, X, CheckSquare, 
  Clock, Paperclip, MessageSquare, Grid, User, Trash2, Edit3, 
  MoreHorizontal, ChevronDown, Share2, Eye, Layout, FileText, Code, 
  Check, AlertCircle
} from 'lucide-react';

// Initial Tasks matching the style of the screenshot (light theme layout)
const initialTasks = [
  {
    id: 'DT-10',
    title: 'Natfoo Feedback Form integration with Google Spread Sheets',
    category: 'Backend',
    categoryColor: 'bg-purple-100 text-purple-700 border border-purple-200',
    status: 'todo',
    dueDate: 'Jul 31, 2026',
    assigneeInitials: 'AL',
    assigneeBg: 'bg-blue-600',
    hasCheck: true,
  },
  {
    id: 'DT-53',
    title: 'Analysis on Dashboard Data analyzer site convo',
    category: 'Designing',
    categoryColor: 'bg-blue-100 text-blue-700 border border-blue-200',
    status: 'todo',
    dueDate: 'Jul 21, 2026',
    assigneeInitials: 'AL',
    assigneeBg: 'bg-blue-600',
    hasCheck: true,
    isOverdue: true
  },
  {
    id: 'DT-75',
    title: 'Innovation Grant event CIT Research',
    category: 'RND',
    categoryColor: 'bg-amber-100 text-amber-700 border border-amber-200',
    status: 'todo',
    dueDate: 'Aug 05, 2026',
    assigneeInitials: 'AG',
    assigneeBg: 'bg-amber-600',
    hasCheck: true,
  },
  {
    id: 'DT-15',
    title: 'Natfoo feedback forms question based rating UI development',
    category: 'Frontend',
    categoryColor: 'bg-teal-100 text-teal-700 border border-teal-200',
    status: 'in-progress',
    dueDate: 'Jul 13, 2026',
    assigneeInitials: 'AG',
    assigneeBg: 'bg-amber-600',
    hasCheck: true,
    isOverdue: true
  },
  {
    id: 'DT-12',
    title: 'Aksharas Academy Founder image privacy building.',
    category: 'Frontend',
    categoryColor: 'bg-teal-100 text-teal-700 border border-teal-200',
    status: 'in-progress',
    dueDate: 'Jul 2, 2026',
    assigneeInitials: 'AL',
    assigneeBg: 'bg-blue-600',
    hasCheck: true,
    isOverdue: true
  },
  {
    id: 'DT-81',
    title: 'About page EC stats API integration',
    category: 'Backend',
    categoryColor: 'bg-purple-100 text-purple-700 border border-purple-200',
    status: 'done',
    dueDate: 'Jul 10, 2026',
    assigneeInitials: 'AG',
    assigneeBg: 'bg-amber-600',
    hasCheck: true,
  },
  {
    id: 'DT-82',
    title: 'GET, PUT, DELTE method of ECA Contact Request',
    category: 'Backend',
    categoryColor: 'bg-purple-100 text-purple-700 border border-purple-200',
    status: 'done',
    dueDate: 'Jul 11, 2026',
    assigneeInitials: 'AG',
    assigneeBg: 'bg-amber-600',
    hasCheck: true,
  },
  {
    id: 'DT-63',
    title: 'Admins panel in ECA',
    category: 'Frontend',
    categoryColor: 'bg-teal-100 text-teal-700 border border-teal-200',
    status: 'done',
    dueDate: 'Jul 22, 2026',
    assigneeInitials: 'AG',
    assigneeBg: 'bg-amber-600',
    hasCheck: true,
  }
];

const columnsConfig = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-400' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-amber-500' },
  { id: 'review', title: 'In Review', color: 'bg-indigo-600' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];

export default function ProjectContent() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [activeTab, setActiveTab] = useState('Board');

  // Modal State for Creation / Editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Backend');
  const [formDueDate, setFormDueDate] = useState('');
  const [formAssignee, setFormAssignee] = useState('AL');

  // Drag & Drop Handlers
  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTaskId ? { ...task, status: targetStatus } : task
      )
    );
    setDraggedTaskId(null);
  };

  // Task Creation & Editing Handlers
  const handleOpenCreateModal = () => {
    setEditingTaskId(null);
    setFormTitle('');
    setFormCategory('Backend');
    setFormDueDate(new Date().toISOString().split('T')[0]);
    setFormAssignee('AL');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task, e) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setFormTitle(task.title);
    setFormCategory(task.category);
    setFormDueDate(task.dueDate);
    setFormAssignee(task.assigneeInitials || 'AL');
    setIsModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    let catColor = 'bg-purple-100 text-purple-700 border border-purple-200';
    if (formCategory === 'Frontend') catColor = 'bg-teal-100 text-teal-700 border border-teal-200';
    if (formCategory === 'RND' || formCategory === 'Designing') catColor = 'bg-blue-100 text-blue-700 border border-blue-200';

    if (editingTaskId) {
      setTasks(prev => prev.map(t => {
        if (t.id === editingTaskId) {
          return {
            ...t,
            title: formTitle,
            category: formCategory,
            categoryColor: catColor,
            dueDate: formDueDate,
            assigneeInitials: formAssignee,
          };
        }
        return t;
      }));
    } else {
      // Always adds to 'todo' by default per instructions
      const newTask = {
        id: `DT-${Math.floor(100 + Math.random() * 900)}`,
        title: formTitle,
        category: formCategory,
        categoryColor: catColor,
        status: 'todo',
        dueDate: formDueDate,
        assigneeInitials: formAssignee,
        assigneeBg: formAssignee === 'AG' ? 'bg-amber-600' : 'bg-blue-600',
        hasCheck: true,
      };
      setTasks(prev => [newTask, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId, e) => {
    e.stopPropagation();
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Analytics Computations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const reviewTasks = tasks.filter((t) => t.status === 'review').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Filter tasks based on search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen bg-white text-slate-800 font-sans overflow-hidden">
      
      {/* TOP HEADER SECTION (Replicating ClickUp Space/Team Header Style in Light Theme) */}
      <header className="border-b border-slate-200 bg-white px-6 py-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Spaces</span>
            <span className="text-slate-300">/</span>
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 text-white p-1 rounded font-bold text-xs flex items-center justify-center shadow-sm">
                Dev
              </div>
              <h1 className="font-bold text-slate-900 text-base">Dev Team</h1>
              <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-2">
                <User size={12} /> 4
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAnalytics(true)}
              className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-purple-200 transition-colors shadow-sm"
            >
              <BarChart2 size={14} />
              <span>Analytics</span>
            </button>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Share">
              <Share2 size={16} />
            </button>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="More options">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-6 text-sm overflow-x-auto border-b border-transparent">
          {[
            { name: 'Summary', icon: FileText },
            { name: 'List', icon: CheckSquare },
            { name: 'Board', icon: Grid },
            { name: 'Code', icon: Code },
            { name: 'Forms', icon: Layout },
            { name: 'Timeline', icon: Calendar },
            { name: 'Docs', icon: FileText },
            { name: 'Reports', icon: BarChart2 }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center gap-2 pb-2.5 font-medium transition-colors relative whitespace-nowrap ${
                  isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <IconComponent size={15} />
                <span>{tab.name}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* SEARCH AND FILTER TOOLBAR */}
      <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search board..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 pl-9 pr-4 py-1.5 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 shadow-sm">
            <Filter size={13} />
            <span>Filter</span>
          </div>

          <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 shadow-sm">
            <Grid size={13} />
            <span>Group</span>
          </div>
        </div>

        {/* SINGLE CREATE TASK BUTTON (As requested: no individual column plus buttons) */}
        <button 
          onClick={handleOpenCreateModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm transition-all"
        >
          <Plus size={16} /> Create Task
        </button>
      </div>

      {/* MAIN KANBAN BOARD CONTAINER WITH INDIVIDUAL COLUMN SCROLLBARS */}
      <main className="flex-1 overflow-x-auto p-6 bg-slate-100/60">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start h-full min-w-[1100px]">
          {columnsConfig.map((column) => {
            const columnTasks = filteredTasks.filter((t) => t.status === column.id);

            return (
              <div 
                key={column.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
                className="bg-white p-3 rounded-2xl flex flex-col border border-slate-200/80 shadow-sm max-h-[calc(100vh-220px)]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${column.color}`}></span>
                    <h3 className="font-bold text-slate-800 text-sm">{column.title}</h3>
                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded">
                      <Plus size={14} onClick={handleOpenCreateModal} />
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>

                {/* Column Task List with Individual Scrollbar Enabled */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative flex flex-col gap-2.5"
                    >
                      {/* Hover Actions (Edit & Delete) */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded shadow-sm border border-slate-100 z-10">
                        <button 
                          onClick={(e) => handleOpenEditModal(task, e)}
                          className="text-slate-400 hover:text-blue-600 p-1 rounded"
                          title="Edit Task"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          onClick={(e) => handleDeleteTask(task.id, e)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded"
                          title="Delete Task"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      {/* Title */}
                      <h4 className="font-semibold text-slate-800 text-sm leading-snug pr-8">
                        {task.title}
                      </h4>

                      {/* Category Tag & Task ID row */}
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold tracking-wide ${task.categoryColor}`}>
                          {task.category}
                        </span>
                      </div>

                      {/* Footer Row: ID, Due Date, and Assignee Badge */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1 text-blue-600">
                            <CheckSquare size={13} /> {task.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {task.dueDate && (
                            <div className={`flex items-center gap-1 text-[11px] ${task.isOverdue ? 'text-red-500 font-semibold' : 'text-slate-400'}`}>
                              {task.isOverdue && <AlertCircle size={12} />}
                              <span>{task.dueDate}</span>
                            </div>
                          )}

                          {/* Assignee Avatar Initials */}
                          <div className={`w-6 h-6 rounded-full ${task.assigneeBg || 'bg-blue-600'} text-white text-[10px] font-bold flex items-center justify-center shadow-sm`}>
                            {task.assigneeInitials || 'AL'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium">
                      No tasks in this column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* CREATE / EDIT TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-1">
              {editingTaskId ? 'Edit Task' : 'Create New Task'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {editingTaskId ? 'Modify existing task parameters.' : 'New tasks are automatically added to the "To Do" column by default.'}
            </p>

            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Task Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter task summary..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category / Label</label>
                <select 
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Designing">Designing</option>
                  <option value="RND">RND</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
                <input 
                  type="date" 
                  required
                  value={formDueDate}
                  onChange={(e) => setFormDueDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Assignee</label>
                <select 
                  value={formAssignee}
                  onChange={(e) => setFormAssignee(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="AL">AL (Alex Morgan)</option>
                  <option value="AG">AG (Aiden Green)</option>
                  <option value="JD">JD (Jane Doe)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
                >
                  {editingTaskId ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ANALYTICS MODAL */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setShowAnalytics(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-1">Project Dashboard Analytics</h3>
            <p className="text-xs text-slate-500 mb-6">Real-time metrics calculated from your interactive Kanban board.</p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                <p className="text-xs font-medium text-blue-600 mb-1">Total Tasks</p>
                <p className="text-2xl font-bold text-blue-900">{totalTasks}</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                <p className="text-xs font-medium text-emerald-600 mb-1">Completion Rate</p>
                <p className="text-2xl font-bold text-emerald-900">{completionRate}%</p>
              </div>

              <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                <p className="text-xs font-medium text-purple-600 mb-1">Done Tasks</p>
                <p className="text-2xl font-bold text-purple-900">{completedTasks}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-100 pt-4">
              <h4 className="text-sm font-semibold text-slate-700">Column Task Breakdown</h4>
              
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">To Do ({todoTasks})</span>
                  <span className="text-slate-400">{Math.round((todoTasks / totalTasks) * 100 || 0)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full" style={{ width: `${(todoTasks / totalTasks) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">In Progress ({inProgressTasks})</span>
                  <span className="text-slate-400">{Math.round((inProgressTasks / totalTasks) * 100 || 0)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: `${(inProgressTasks / totalTasks) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">In Review ({reviewTasks})</span>
                  <span className="text-slate-400">{Math.round((reviewTasks / totalTasks) * 100 || 0)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full" style={{ width: `${(reviewTasks / totalTasks) * 100}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600">Done ({completedTasks})</span>
                  <span className="text-slate-400">{Math.round((completedTasks / totalTasks) * 100 || 0)}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${(completedTasks / totalTasks) * 100}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button 
                onClick={() => setShowAnalytics(false)}
                className="bg-slate-900 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors"
              >
                Close Metrics
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}