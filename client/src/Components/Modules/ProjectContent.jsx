import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Calendar, BarChart2, X, CheckSquare, 
  Code, MessageSquare, Grid, User, Trash2, Edit3, 
  MoreHorizontal, Share2, Layout, FileText, 
  AlertCircle, ChevronLeft, Folder, Briefcase, Activity
} from 'lucide-react';

// --- INITIAL DATA ---
const initialTasks = [
  { id: 'DT-10', title: 'User Authentication API integration with OAuth2', category: 'Backend', categoryColor: 'bg-purple-100 text-purple-700 border border-purple-200', status: 'todo', dueDate: 'Jul 31, 2026', assigneeInitials: 'AL', assigneeBg: 'bg-blue-600', hasCheck: true },
  { id: 'DT-53', title: 'Analysis on Dashboard Data analyzer user flow', category: 'Designing', categoryColor: 'bg-blue-100 text-blue-700 border border-blue-200', status: 'todo', dueDate: 'Jul 21, 2026', assigneeInitials: 'AL', assigneeBg: 'bg-blue-600', hasCheck: true, isOverdue: true },
  { id: 'DT-75', title: 'Innovation framework and competitor market research', category: 'RND', categoryColor: 'bg-amber-100 text-amber-700 border border-amber-200', status: 'todo', dueDate: 'Aug 05, 2026', assigneeInitials: 'AG', assigneeBg: 'bg-amber-600', hasCheck: true },
  { id: 'DT-15', title: 'Customer feedback forms question based rating UI development', category: 'Frontend', categoryColor: 'bg-teal-100 text-teal-700 border border-teal-200', status: 'in-progress', dueDate: 'Jul 13, 2026', assigneeInitials: 'AG', assigneeBg: 'bg-amber-600', hasCheck: true, isOverdue: true },
  { id: 'DT-12', title: 'User profile image upload and privacy settings module', category: 'Frontend', categoryColor: 'bg-teal-100 text-teal-700 border border-teal-200', status: 'in-progress', dueDate: 'Jul 2, 2026', assigneeInitials: 'AL', assigneeBg: 'bg-blue-600', hasCheck: true, isOverdue: true },
  { id: 'DT-81', title: 'Landing page user statistics API integration', category: 'Backend', categoryColor: 'bg-purple-100 text-purple-700 border border-purple-200', status: 'done', dueDate: 'Jul 10, 2026', assigneeInitials: 'AG', assigneeBg: 'bg-amber-600', hasCheck: true },
  { id: 'DT-82', title: 'GET, PUT, DELETE method of Support Contact Request', category: 'Backend', categoryColor: 'bg-purple-100 text-purple-700 border border-purple-200', status: 'done', dueDate: 'Jul 11, 2026', assigneeInitials: 'AG', assigneeBg: 'bg-amber-600', hasCheck: true },
  { id: 'DT-63', title: 'Admins panel layout, routing, and access control', category: 'Frontend', categoryColor: 'bg-teal-100 text-teal-700 border border-teal-200', status: 'done', dueDate: 'Jul 22, 2026', assigneeInitials: 'AG', assigneeBg: 'bg-amber-600', hasCheck: true }
];

const columnsConfig = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-400' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-amber-500' },
  { id: 'review', title: 'In Review', color: 'bg-indigo-600' },
  { id: 'done', title: 'Done', color: 'bg-emerald-500' },
];

// --- 1. THE KANBAN BOARD COMPONENT ---
function ProjectContent({ project, onBack, updateTasks }) {
  const tasks = project.tasks || [];
  const setTasks = (updater) => updateTasks(project.id, updater);

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [activeTab, setActiveTab] = useState('Board');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Backend');
  const [formDueDate, setFormDueDate] = useState('');
  const [formAssignee, setFormAssignee] = useState('AL');

  const handleDragStart = (e, id) => {
    setDraggedTaskId(id);
    e.dataTransfer.setData('text/plain', id);
  };
  
  const handleDragOver = (e) => e.preventDefault();
  
  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTaskId) return;
    setTasks((prevTasks) => prevTasks.map((t) => t.id === draggedTaskId ? { ...t, status: targetStatus } : t));
    setDraggedTaskId(null);
  };

  const handleOpenCreateModal = () => {
    setEditingTaskId(null); setFormTitle(''); setFormCategory('Backend');
    setFormDueDate(new Date().toISOString().split('T')[0]); setFormAssignee('AL'); setIsModalOpen(true);
  };

  const handleOpenEditModal = (task, e) => {
    e.stopPropagation();
    setEditingTaskId(task.id); setFormTitle(task.title); setFormCategory(task.category);
    setFormDueDate(task.dueDate); setFormAssignee(task.assigneeInitials || 'AL'); setIsModalOpen(true);
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
          return { ...t, title: formTitle, category: formCategory, categoryColor: catColor, dueDate: formDueDate, assigneeInitials: formAssignee };
        }
        return t;
      }));
    } else {
      const newTask = {
        id: `DT-${Math.floor(100 + Math.random() * 900)}`,
        title: formTitle, category: formCategory, categoryColor: catColor, status: 'todo', dueDate: formDueDate,
        assigneeInitials: formAssignee, assigneeBg: formAssignee === 'AG' ? 'bg-amber-600' : 'bg-blue-600', hasCheck: true,
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId, e) => {
    e.stopPropagation();
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // --- ANALYTICS DATA ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const reviewTasks = tasks.filter((t) => t.status === 'review').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- RENDER VIEWS BASED ON TAB ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Board':
        return (
          // Responsive Kanban Layout: flex with horizontal scroll on small devices
          <div className="flex flex-nowrap gap-4 md:gap-6 items-start h-full pb-6 w-full">
            {columnsConfig.map((column) => {
              const columnTasks = filteredTasks.filter((t) => t.status === column.id);
              return (
                <div key={column.id} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, column.id)} 
                     className="bg-white p-3 rounded-2xl flex flex-col border border-slate-200/80 shadow-sm max-h-[calc(100vh-280px)] sm:max-h-[calc(100vh-260px)] md:max-h-[calc(100vh-220px)] min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] flex-shrink-0">
                  <div className="flex items-center justify-between mb-3 px-1 pb-2 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${column.color}`}></span>
                      <h3 className="font-bold text-slate-800 text-sm">{column.title}</h3>
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors"><Plus size={14} onClick={handleOpenCreateModal} /></button>
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-md hover:bg-slate-100 transition-colors"><MoreHorizontal size={14} /></button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar min-h-0">
                    {columnTasks.map((task) => (
                      <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)} className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing group relative flex flex-col gap-2.5">
                        <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-white/95 backdrop-blur-sm p-1 rounded shadow-sm border border-slate-100 z-10">
                          <button onClick={(e) => handleOpenEditModal(task, e)} className="text-slate-400 hover:text-blue-600 p-1.5 rounded" title="Edit Task"><Edit3 size={13} /></button>
                          <button onClick={(e) => handleDeleteTask(task.id, e)} className="text-slate-400 hover:text-red-600 p-1.5 rounded" title="Delete Task"><Trash2 size={13} /></button>
                        </div>
                        <h4 className="font-semibold text-slate-800 text-sm leading-snug pr-12">{task.title}</h4>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold tracking-wide ${task.categoryColor}`}>{task.category}</span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 mt-1">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1 text-blue-600"><CheckSquare size={13} /> {task.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {task.dueDate && (
                              <div className={`flex items-center gap-1 text-[11px] ${task.isOverdue ? 'text-red-500 font-semibold' : 'text-slate-400'}`}>
                                {task.isOverdue && <AlertCircle size={12} />}<span>{task.dueDate}</span>
                              </div>
                            )}
                            <div className={`w-6 h-6 rounded-full ${task.assigneeBg || 'bg-blue-600'} text-white text-[10px] font-bold flex items-center justify-center shadow-sm`}>
                              {task.assigneeInitials || 'AL'}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {columnTasks.length === 0 && <div className="h-24 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium">No tasks in this column</div>}
                  </div>
                </div>
              );
            })}
          </div>
        );

      case 'List':
        return (
          <div className="w-full max-w-[100vw]">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[700px] md:min-w-[800px]">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4 whitespace-nowrap">Task ID</th>
                    <th className="py-3 px-4 min-w-[200px]">Title</th>
                    <th className="py-3 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 whitespace-nowrap">Category</th>
                    <th className="py-3 px-4 whitespace-nowrap">Due Date</th>
                    <th className="py-3 px-4 whitespace-nowrap">Assignee</th>
                    <th className="py-3 px-4 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {filteredTasks.length === 0 ? (
                    <tr><td colSpan="7" className="py-8 text-center text-slate-400">No tasks found</td></tr>
                  ) : (
                    filteredTasks.map(task => (
                      <tr key={task.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-slate-600">{task.id}</td>
                        <td className="py-3 px-4 text-slate-900 font-medium">{task.title}</td>
                        <td className="py-3 px-4">
                          <span className="capitalize text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600">
                            {task.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wide whitespace-nowrap ${task.categoryColor}`}>
                            {task.category}
                          </span>
                        </td>
                        <td className={`py-3 px-4 whitespace-nowrap ${task.isOverdue ? 'text-red-500 font-semibold' : 'text-slate-500'}`}>
                          {task.dueDate}
                        </td>
                        <td className="py-3 px-4">
                          <div className={`w-7 h-7 rounded-full ${task.assigneeBg || 'bg-blue-600'} text-white text-[10px] font-bold flex items-center justify-center shadow-sm`}>
                            {task.assigneeInitials || 'AL'}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={(e) => handleOpenEditModal(task, e)} className="text-slate-400 hover:text-blue-600 p-1.5 hover:bg-blue-50 rounded-md transition-colors"><Edit3 size={15} /></button>
                            <button onClick={(e) => handleDeleteTask(task.id, e)} className="text-slate-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Timeline':
        const timelineTasks = [...filteredTasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        
        return (
          <div className="max-w-3xl mx-auto py-4 px-2 sm:px-0">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 sm:mb-8 flex items-center gap-2">
              <Calendar className="text-blue-600" /> Activity Timeline
            </h2>
            
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-6 sm:space-y-8 pb-10">
              {timelineTasks.length === 0 ? (
                <div className="text-center py-12 text-slate-400 pl-4">No events on timeline.</div>
              ) : (
                timelineTasks.map((task) => {
                  const statusConfig = columnsConfig.find(c => c.id === task.status);
                  const dotColor = statusConfig ? statusConfig.color.replace('bg-', 'border-').replace('500', '500') : 'border-slate-400';
                  
                  return (
                    <div key={task.id} className="relative pl-6 sm:pl-8">
                      <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-[3px] ${dotColor} ring-4 ring-slate-50 z-10`} />
                      
                      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{task.dueDate}</span>
                          <span className={`w-fit text-[10px] px-2 py-0.5 rounded font-bold ${task.categoryColor}`}>{task.category}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 text-sm sm:text-base mb-3 leading-snug">{task.title}</h4>
                        
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><CheckSquare size={14}/> {task.id}</span>
                          <span className="flex items-center gap-1">Status: <strong className="capitalize text-slate-700">{task.status.replace('-', ' ')}</strong></span>
                          <span className="flex items-center gap-1"><User size={14} /> Assignee: <strong className="text-slate-700">{task.assigneeInitials}</strong></span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );

      case 'Summary':
      case 'Reports':
        return (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 py-2 sm:py-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart2 className="text-blue-600" /> Project {activeTab}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-blue-50 border border-blue-100 p-5 sm:p-6 rounded-2xl shadow-sm">
                <p className="text-sm font-semibold text-blue-700 mb-1">Total Tasks</p>
                <p className="text-3xl sm:text-4xl font-black text-blue-900">{totalTasks}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-5 sm:p-6 rounded-2xl shadow-sm">
                <p className="text-sm font-semibold text-emerald-700 mb-1">Completion Rate</p>
                <p className="text-3xl sm:text-4xl font-black text-emerald-900">{completionRate}%</p>
              </div>
              <div className="bg-purple-50 border border-purple-100 p-5 sm:p-6 rounded-2xl shadow-sm">
                <p className="text-sm font-semibold text-purple-700 mb-1">Done Tasks</p>
                <p className="text-3xl sm:text-4xl font-black text-purple-900">{completedTasks}</p>
              </div>
            </div>
            
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm mt-4 sm:mt-6">
              <h4 className="text-sm font-semibold text-slate-800 mb-4">Task Distribution</h4>
              <div className="space-y-4">
                {[
                  { label: 'To Do', count: todoTasks, color: 'bg-slate-400' },
                  { label: 'In Progress', count: inProgressTasks, color: 'bg-amber-500' },
                  { label: 'In Review', count: reviewTasks, color: 'bg-indigo-500' },
                  { label: 'Done', count: completedTasks, color: 'bg-emerald-500' }
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs font-medium mb-1.5">
                      <span className="text-slate-600">{stat.label} ({stat.count})</span>
                      <span className="text-slate-400">{Math.round((stat.count / (totalTasks || 1)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className={`${stat.color} h-full transition-all duration-500`} style={{ width: `${(stat.count / (totalTasks || 1)) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Code':
      case 'Forms':
      case 'Docs':
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 pb-20 p-6 text-center">
            <Activity size={48} className="text-slate-200" />
            <h3 className="text-xl font-semibold text-slate-700">{activeTab} Integration</h3>
            <p className="text-sm">This module is connected but currently holds no data for this project.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen bg-white text-slate-800 font-sans overflow-hidden">
      {/* HEADER SECTION */}
      <header className="border-b border-slate-200 bg-white px-3 sm:px-4 md:px-6 py-3 flex flex-col gap-3 shrink-0">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <button onClick={onBack} className="p-1.5 mr-0 md:mr-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-200 shrink-0">
              <ChevronLeft size={18} />
            </button>
            <div className="hidden sm:flex items-center gap-2 mr-2 shrink-0">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Spaces</span>
              <span className="text-slate-300">/</span>
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className={`${project.color} text-white p-1 rounded font-bold text-xs flex items-center justify-center shadow-sm w-7 h-7 shrink-0`}>
                {project.name.substring(0, 1).toUpperCase()}
              </div>
              <h1 className="font-bold text-slate-900 text-sm md:text-base truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-xl">
                {project.name}
              </h1>
              <div className="hidden xs:flex items-center gap-1 text-[10px] md:text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full ml-1 md:ml-2 shrink-0">
                <User size={12} /> {project.members || 1}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button onClick={() => setShowAnalytics(true)} className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-2.5 md:px-3 py-1.5 rounded-lg text-[11px] md:text-xs font-semibold flex items-center gap-1.5 border border-purple-200 transition-colors shadow-sm">
              <BarChart2 size={14} /><span className="hidden md:inline">Analytics</span>
            </button>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block" title="Share"><Share2 size={16} /></button>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="More options"><MoreHorizontal size={16} /></button>
          </div>
        </div>

        {/* NAVIGATION TABS (Mobile scrollable, hidden scrollbar) */}
        <div className="flex items-center gap-5 md:gap-6 text-sm overflow-x-auto border-b border-transparent pb-1 custom-scrollbar-hide">
          <style>{`.custom-scrollbar-hide::-webkit-scrollbar { display: none; } .custom-scrollbar-hide { scrollbar-width: none; ms-overflow-style: none; }`}</style>
          
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
              <button key={tab.name} onClick={() => setActiveTab(tab.name)} className={`flex items-center gap-2 pb-2 font-medium transition-colors relative whitespace-nowrap ${isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}>
                <IconComponent size={15} /><span>{tab.name}</span>
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t" />}
              </button>
            );
          })}
        </div>
      </header>

      {/* SEARCH AND FILTER TOOLBAR */}
      {['Board', 'List', 'Timeline'].includes(activeTab) && (
        <div className="px-3 sm:px-4 md:px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 md:gap-3 flex-1 w-full">
            <div className="relative flex-1 min-w-[150px] w-full sm:w-auto sm:max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search tasks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white border border-slate-200 pl-9 pr-4 py-2 sm:py-1.5 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm transition-all" />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none items-center justify-center gap-1.5 bg-white border border-slate-200 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-colors flex">
                <Filter size={13} /><span>Filter</span>
              </button>
              <button className="flex-1 sm:flex-none items-center justify-center gap-1.5 bg-white border border-slate-200 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-colors flex">
                <Grid size={13} /><span>Group</span>
              </button>
            </div>
          </div>
          {activeTab !== 'Timeline' && ( 
            <button onClick={handleOpenCreateModal} className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 sm:py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-sm transition-all shrink-0">
              <Plus size={16} /> <span className="sm:hidden lg:inline">Create Task</span><span className="hidden sm:inline lg:hidden">Create</span>
            </button>
          )}
        </div>
      )}

      {/* DYNAMIC CONTENT AREA */}
      <main className="flex-1 overflow-x-auto overflow-y-auto p-3 sm:p-4 md:p-6 bg-slate-100/60 custom-scrollbar">
        {renderTabContent()}
      </main>

      {/* CREATE / EDIT TASK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150 custom-scrollbar">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-3 sm:top-4 right-3 sm:right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><X size={20} /></button>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 pr-8">{editingTaskId ? 'Edit Task' : 'Create New Task'}</h3>
            <p className="text-xs text-slate-500 mb-5 sm:mb-6">{editingTaskId ? 'Modify existing task parameters.' : 'New tasks are automatically added to the "To Do" column.'}</p>
            
            <form onSubmit={handleSaveTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Task Title</label>
                <input type="text" required placeholder="Enter task summary..." value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 sm:py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Category / Label</label>
                <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 sm:py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Designing">Designing</option>
                  <option value="RND">RND</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Due Date</label>
                <input type="date" required value={formDueDate} onChange={(e) => setFormDueDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 sm:py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Assignee</label>
                <select value={formAssignee} onChange={(e) => setFormAssignee(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 sm:py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                  <option value="AL">AL (Alex Morgan)</option><option value="AG">AG (Aiden Green)</option><option value="JD">JD (Jane Doe)</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 sm:py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto">Cancel</button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 sm:py-2 rounded-lg text-sm transition-colors shadow-sm w-full sm:w-auto">{editingTaskId ? 'Save Changes' : 'Create Task'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 2. THE MAIN DASHBOARD COMPONENT ---
export default function AppWorkspace() {
  const [activeProjectId, setActiveProjectId] = useState(null);
  
  const [projects, setProjects] = useState([
    { id: 1, name: 'Dev Team', description: 'Main development tasks, API integration, and UI improvements.', members: 4, tasks: initialTasks, color: 'bg-amber-500' },
    { id: 2, name: 'Marketing Campaign', description: 'Q3 social media rollout and ad creatives tracking.', members: 2, tasks: [], color: 'bg-purple-500' }
  ]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-indigo-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newProject = {
      id: Date.now(),
      name: newProjectName,
      description: newProjectDesc || 'A newly created workspace.',
      members: 1,
      tasks: [],
      color: randomColor
    };

    setProjects([...projects, newProject]);
    setIsProjectModalOpen(false);
    setNewProjectName('');
    setNewProjectDesc('');
  };

  const updateProjectTasks = (projectId, updater) => {
    setProjects(prevProjects => prevProjects.map(p => {
      if (p.id === projectId) {
        return { 
          ...p, 
          tasks: typeof updater === 'function' ? updater(p.tasks) : updater 
        };
      }
      return p;
    }));
  };

  const activeProject = projects.find(p => p.id === activeProjectId);

  if (activeProject) {
    return (
      <ProjectContent 
        project={activeProject} 
        onBack={() => setActiveProjectId(null)}
        updateTasks={updateProjectTasks}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase size={24} className="text-blue-600" /> My Workspaces
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage your active projects and team boards.</p>
        </div>
        <button 
          onClick={() => setIsProjectModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Plus size={18} /> Create New Project
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((proj) => (
          <div 
            key={proj.id}
            onClick={() => setActiveProjectId(proj.id)}
            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col min-h-[12rem] h-auto"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg ${proj.color} text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0`}>
                {proj.name.substring(0, 1).toUpperCase()}
              </div>
              <button className="text-slate-400 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity hover:text-slate-800 p-1">
                <MoreHorizontal size={18} />
              </button>
            </div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors truncate">
              {proj.name}
            </h3>
            <p className="text-sm text-slate-500 mt-1.5 line-clamp-2 flex-1">
              {proj.description}
            </p>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Folder size={14} /> {proj.tasks.length} Tasks
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                <User size={12} /> {proj.members} Members
              </div>
            </div>
          </div>
        ))}
      </div>

      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <button 
              onClick={() => setIsProjectModalOpen(false)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 pr-8">Create New Project</h3>
            <p className="text-xs text-slate-500 mb-5 sm:mb-6">Set up a new workspace board for your team.</p>
            
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Name</label>
                <input 
                  type="text" 
                  required
                  autoFocus
                  placeholder="e.g. Website Redesign"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 sm:py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Briefly describe the project goals..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 sm:py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none transition-all"
                />
              </div>
              <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
                <button 
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2 sm:py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 sm:py-2 rounded-lg text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}