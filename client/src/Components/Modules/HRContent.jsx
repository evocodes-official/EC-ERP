import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import api from '../api';
import {
  CheckCircle2,
  Clock,
  Star,
  ChevronDown,
  Download,
  UserPlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  UserCheck,
  Plane,
  Search,
  Filter,
  X,
  Camera,
  Mail,
  Building2,
  Briefcase,
  CalendarCheck,
  User,
  Save,
  Plus,
  ArrowUpDown,
  CalendarDays,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80';

// Demo fallback used until the API responds (or if the API is unreachable)
const DEMO_EMPLOYEES = [
  {
    id: 1,
    name: 'Elena Rodriguez',
    email: 'elena.r@evo-erp.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    dept: 'Engineering',
    deptStyle: 'bg-blue-50 text-blue-600',
    role: 'Sr. Full-stack Lead',
    attendance: 'On-site',
    attendanceDot: 'bg-emerald-500',
    performance: 92,
    perfColor: 'bg-emerald-500',
    joinedDate: '2024-03-15',
  },
    {
      id: 2,
      name: 'James Chen',
      email: 'james.c@evo-erp.com',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
      dept: 'Design',
      deptStyle: 'bg-cyan-50 text-cyan-600',
      role: 'UX Architect',
      attendance: 'Remote',
      attendanceDot: 'bg-blue-600',
      performance: 88,
      perfColor: 'bg-blue-600',
      joinedDate: '2023-11-08',
    },
    {
      id: 3,
      name: 'Sasha Williams',
      email: 'sasha.w@evo-erp.com',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      dept: 'Sales',
      deptStyle: 'bg-purple-50 text-purple-600',
      role: 'Growth Director',
      attendance: 'O.O.O',
      attendanceDot: 'bg-amber-500',
      performance: 95,
      perfColor: 'bg-indigo-600',
      joinedDate: '2024-06-01',
    },
    {
      id: 4,
      name: 'Kenji Sato',
      email: 'kenji.s@evo-erp.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      dept: 'Engineering',
      deptStyle: 'bg-blue-50 text-blue-600',
      role: 'DevOps Engineer',
      attendance: 'On-site',
      attendanceDot: 'bg-emerald-500',
      performance: 78,
      perfColor: 'bg-emerald-500',
      joinedDate: '2025-01-20',
    },
];

const HRContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [attendanceFilter, setAttendanceFilter] = useState('All Attendance');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showAttendanceDropdown, setShowAttendanceDropdown] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Selection States
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDept, setFormDept] = useState('Engineering');
  const [formRole, setFormRole] = useState('');
  const [formAttendance, setFormAttendance] = useState('On-site');
  const [formPerformance, setFormPerformance] = useState(85);
  const [formAvatar, setFormAvatar] = useState(null);
  const [formAvatarPreview, setFormAvatarPreview] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef(null);

  // API States
  const [employees, setEmployees] = useState(DEMO_EMPLOYEES);
  const [isLoadingEmployees, setIsLoadingEmployees] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formError, setFormError] = useState('');
  const [fetchError, setFetchError] = useState('');

  // Map a backend employee document to the shape the UI expects (backend `_id` -> `id`)
  const mapEmployee = (emp) => ({
    ...emp,
    id: emp._id || emp.id,
    avatar: emp.avatar || DEFAULT_AVATAR,
    deptStyle: emp.deptStyle || getDeptStyle(emp.dept),
    attendanceDot: emp.attendanceDot || getAttendanceDot(emp.attendance),
    performance: emp.performance ?? 0,
    perfColor:
      emp.perfColor ||
      ((emp.performance ?? 0) >= 90
        ? 'bg-emerald-500'
        : (emp.performance ?? 0) >= 75
        ? 'bg-blue-600'
        : 'bg-slate-400'),
  });

  // Fetch employees from the HR backend (GET /api/employees)
  useEffect(() => {
    let isMounted = true;

    const fetchEmployees = async () => {
      try {
        const res = await api.get('/employees');
        if (isMounted && res.data?.success && Array.isArray(res.data.data)) {
          setEmployees(res.data.data.map(mapEmployee));
          setFetchError('');
        }
      } catch (err) {
        // Keep demo data visible when the API is unavailable
        if (isMounted) {
          setFetchError('Live data unavailable — showing sample employees.');
          console.error('Failed to load employees:', err?.response?.data || err.message);
        }
      } finally {
        if (isMounted) setIsLoadingEmployees(false);
      }
    };

    fetchEmployees();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Department style mapping
  const getDeptStyle = (dept) => {
    switch (dept) {
      case 'Engineering': return 'bg-blue-50 text-blue-600';
      case 'Design': return 'bg-cyan-50 text-cyan-600';
      case 'Sales': return 'bg-purple-50 text-purple-600';
      case 'Marketing': return 'bg-pink-50 text-pink-600';
      case 'HR': return 'bg-emerald-50 text-emerald-600';
      case 'Finance': return 'bg-amber-50 text-amber-600';
      default: return 'bg-slate-50 text-slate-600';
    }
  };

  // Attendance dot style mapping
  const getAttendanceDot = (attendance) => {
    switch (attendance) {
      case 'On-site': return 'bg-emerald-500';
      case 'Remote': return 'bg-blue-600';
      case 'O.O.O': return 'bg-amber-500';
      case 'Hybrid': return 'bg-indigo-500';
      default: return 'bg-slate-400';
    }
  };

  // Unique departments for filter
  const departments = ['All Departments', ...new Set(employees.map(e => e.dept))];
  const attendanceOptions = ['All Attendance', 'On-site', 'Remote', 'O.O.O', 'Hybrid'];

  // Filtered employees based on search + filters
  const filteredEmployees = employees.filter((emp) => {
    const searchMatch = 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase());

    const deptMatch = deptFilter === 'All Departments' || emp.dept === deptFilter;
    const attendanceMatch = attendanceFilter === 'All Attendance' || emp.attendance === attendanceFilter;

    return searchMatch && deptMatch && attendanceMatch;
  });

  // Sort employees by joined date
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const dateA = new Date(a.joinedDate || '2000-01-01');
    const dateB = new Date(b.joinedDate || '2000-01-01');
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage) || 1;
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Bulk Selection Handlers
  const isAllSelected = paginatedEmployees.length > 0 && paginatedEmployees.every(emp => selectedEmployeeIds.includes(emp.id));

  const handleSelectAllToggle = (e) => {
    if (e.target.checked) {
      const pageIds = paginatedEmployees.map(emp => emp.id);
      setSelectedEmployeeIds(prev => [...new Set([...prev, ...pageIds])]);
    } else {
      const pageIds = paginatedEmployees.map(emp => emp.id);
      setSelectedEmployeeIds(prev => prev.filter(id => !pageIds.includes(id)));
    }
  };

  const handleRowSelect = (empId, e) => {
    e.stopPropagation();
    setSelectedEmployeeIds(prev =>
      prev.includes(empId) ? prev.filter(id => id !== empId) : [...prev, empId]
    );
  };

  // Format joined date for display
  const formatJoinedDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Export to Excel
  const handleExport = () => {
    const exportData = sortedEmployees.map((emp) => ({
      'Employee Name': emp.name,
      'Email': emp.email,
      'Department': emp.dept,
      'Role': emp.role,
      'Attendance': emp.attendance,
      'Performance (%)': emp.performance,
      'Joined Date': formatJoinedDate(emp.joinedDate),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, 'HR_Employee_Directory.xlsx');
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setEditingEmployeeId(null);
    setFormName('');
    setFormEmail('');
    setFormDept('Engineering');
    setFormRole('');
    setFormAttendance('On-site');
    setFormPerformance(85);
    setFormAvatar(null);
    setFormAvatarPreview('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleColumnAdd = (field) => {
    handleOpenCreateModal();
    if (field === 'dept') {
      setFormDept('Engineering');
    } else if (field === 'attendance') {
      setFormAttendance('On-site');
    }
  };

  // Open Edit Modal with prefilled data
  const handleOpenEditModal = (emp, e) => {
    if (e) e.stopPropagation();
    setIsEditMode(true);
    setEditingEmployeeId(emp.id);
    setFormName(emp.name);
    setFormEmail(emp.email);
    setFormDept(emp.dept);
    setFormRole(emp.role);
    setFormAttendance(emp.attendance);
    setFormPerformance(emp.performance ?? 0);
    setFormAvatar(null);
    setFormAvatarPreview(emp.avatar || '');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open Details Modal
  const handleOpenDetailsModal = (emp) => {
    setSelectedEmployee(emp);
    setIsDetailsModalOpen(true);
  };

  // Handle avatar file upload — uploads the file to the server (POST /api/upload)
  // and stores the returned URL, instead of embedding base64 in the JSON payload
  // (which causes 413 "Payload Too Large" errors)
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormAvatar(file);
    setIsUploadingAvatar(true);
    setFormError('');

    const formData = new FormData();
    formData.append('image', file);

    api
      .post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        if (res.data?.url) {
          setFormAvatarPreview(res.data.url);
        } else {
          setFormError('Image upload failed. Please try again.');
        }
      })
      .catch((err) => {
        console.error('Failed to upload avatar:', err?.response?.data || err.message);
        setFormError(err?.response?.data?.message || 'Image upload failed. Please try again.');
      })
      .finally(() => setIsUploadingAvatar(false));
  };

  // Save employee (create or edit) — persisted to the backend
  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formRole.trim()) return;

    setIsSaving(true);
    setFormError('');

    const payload = {
      name: formName.trim(),
      email: formEmail.trim(),
      dept: formDept,
      role: formRole.trim(),
      attendance: formAttendance,
      performance: Number(formPerformance) || 0,
      avatar: formAvatarPreview || '',
    };

    try {
      if (isEditMode && editingEmployeeId) {
        const res = await api.put(`/employees/${editingEmployeeId}`, payload);
        if (res.data?.success && res.data?.data) {
          const updated = mapEmployee(res.data.data);
          setEmployees(prev => prev.map(emp => (emp.id === editingEmployeeId ? updated : emp)));
          setSelectedEmployee(prev => (prev && prev.id === editingEmployeeId ? updated : prev));
        }
      } else {
        const res = await api.post('/employees', payload);
        if (res.data?.success && res.data?.data) {
          setEmployees(prev => [...prev, mapEmployee(res.data.data)]);
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (isEditMode ? 'Failed to update employee.' : 'Failed to create employee.');
      setFormError(message);
      console.error('Failed to save employee:', err?.response?.data || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete employee — persisted to the backend
  const handleDeleteEmployee = async (empId, e) => {
    if (e) e.stopPropagation();

    setIsDeleting(true);
    try {
      const res = await api.delete(`/employees/${empId}`);
      if (res.data?.success) {
        setEmployees(prev => prev.filter(emp => emp.id !== empId));
        setSelectedEmployeeIds(prev => prev.filter(id => id !== empId));
        setSelectedEmployee(prev => (prev && prev.id === empId ? null : prev));
      }
    } catch (err) {
      console.error('Failed to delete employee:', err?.response?.data || err.message);
      alert(err?.response?.data?.message || 'Failed to delete employee. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk delete selected employees — persisted to the backend
  const handleBulkDelete = async () => {
    if (selectedEmployeeIds.length === 0) return;

    setIsDeleting(true);
    try {
      await Promise.all(selectedEmployeeIds.map(id => api.delete(`/employees/${id}`)));
      setEmployees(prev => prev.filter(emp => !selectedEmployeeIds.includes(emp.id)));
      setSelectedEmployeeIds([]);
    } catch (err) {
      console.error('Failed to delete employees:', err?.response?.data || err.message);
      alert(err?.response?.data?.message || 'Failed to delete selected employees. Please try again.');
      // Re-sync with the server so the UI reflects what actually got deleted
      try {
        const res = await api.get('/employees');
        if (res.data?.success && Array.isArray(res.data.data)) {
          setEmployees(res.data.data.map(mapEmployee));
        }
      } catch (fetchErr) {
        console.error('Failed to re-sync employees:', fetchErr);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`space-y-6 w-full px-4 sm:px-6 py-6 transition-opacity duration-300 ${isLoadingEmployees ? 'opacity-60' : 'opacity-100'}`}>
      {/* Live data error banner */}
      {fetchError && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2.5 rounded-lg">
          <AlertTriangle size={14} />
          <span>{fetchError}</span>
        </div>
      )}

      {/* 1. TOP STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Headcount</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{employees.length}</h3>
          <p className="text-xs font-semibold text-emerald-600 mt-2.5 flex items-center gap-1">
            <span>📈</span> +{employees.length} this month
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Attendance Rate</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">96.8%</h3>
          <p className="text-xs font-semibold text-emerald-600 mt-2.5 flex items-center gap-1">
            <CheckCircle2 size={14} className="text-emerald-500" /> Above target (95%)
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Open Positions</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">24</h3>
          <p className="text-xs font-semibold text-amber-600 mt-2.5 flex items-center gap-1">
            <Clock size={14} className="text-amber-500" /> 8 in final interview
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Retention Score</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">92/100</h3>
          <p className="text-xs font-semibold text-blue-600 mt-2.5 flex items-center gap-1">
            <Star size={14} className="text-blue-500" /> Top decile performance
          </p>
        </div>
      </div>

      {/* 2. EMPLOYEE DIRECTORY SECTION */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Title & Main Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Employee Directory</h2>
            <p className="text-xs text-gray-500 mt-0.5">Manage, filter, and review all personnel across departments.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Department Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowDeptDropdown(!showDeptDropdown); setShowAttendanceDropdown(false); setShowSortDropdown(false); }}
                className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
              >
                <Filter size={14} className="text-gray-400" />
                <span>{deptFilter}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {showDeptDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => { setDeptFilter(dept); setCurrentPage(1); setShowDeptDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer ${deptFilter === dept ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Attendance Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setShowAttendanceDropdown(!showAttendanceDropdown); setShowDeptDropdown(false); setShowSortDropdown(false); }}
                className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
              >
                <CalendarCheck size={14} className="text-gray-400" />
                <span>{attendanceFilter}</span>
                <ChevronDown size={14} className="text-gray-400" />
              </button>
              {showAttendanceDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                  {attendanceOptions.map((att) => (
                    <button
                      key={att}
                      onClick={() => { setAttendanceFilter(att); setCurrentPage(1); setShowAttendanceDropdown(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors cursor-pointer ${attendanceFilter === att ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                    >
                      {att}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export Button */}
            <button 
              onClick={handleExport}
              className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
            >
              <Download size={14} className="text-gray-500" />
              <span>Export</span>
            </button>

            {/* Add Employee Button */}
            <button 
              onClick={handleOpenCreateModal}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <UserPlus size={15} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Sort */}
        <div className="px-6 py-3.5 bg-gray-50/50 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="relative max-w-md flex-1 min-w-[250px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, department, or role..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full bg-white border border-gray-200 pl-10 pr-4 py-2 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => { setShowSortDropdown(!showSortDropdown); setShowDeptDropdown(false); setShowAttendanceDropdown(false); }}
              className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer"
            >
              <ArrowUpDown size={14} className="text-gray-400" />
              <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 sm:left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-1">
                <button
                  onClick={() => { setSortOrder('newest'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer ${sortOrder === 'newest' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                >
                  <CalendarDays size={13} />
                  Newest First
                  {sortOrder === 'newest' && <span className="ml-auto text-blue-600">✓</span>}
                </button>
                <button
                  onClick={() => { setSortOrder('oldest'); setShowSortDropdown(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer ${sortOrder === 'oldest' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                >
                  <CalendarDays size={13} />
                  Oldest First
                  {sortOrder === 'oldest' && <span className="ml-auto text-blue-600">✓</span>}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Bulk Action Bar */}
        <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAllToggle}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300 cursor-pointer"
              />
              <span className="font-semibold text-gray-700">Select All</span>
            </label>

            <button 
              onClick={handleBulkDelete}
              disabled={selectedEmployeeIds.length === 0}
              className={`flex items-center space-x-1.5 transition-colors ${selectedEmployeeIds.length > 0 ? 'text-red-600 hover:text-red-700 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
            >
              <Trash2 size={14} />
              <span>Bulk Delete ({selectedEmployeeIds.length})</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <span>Showing {paginatedEmployees.length} of {sortedEmployees.length} entries</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/30">
                <th className="py-3 px-6 w-12"></th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    Employee Name
                    <button 
                      onClick={() => handleColumnAdd('name')}
                      className="p-0.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                      title="Add employee"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    Department
                    <button 
                      onClick={() => handleColumnAdd('dept')}
                      className="p-0.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                      title="Add employee to department"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    Attendance
                    <button 
                      onClick={() => handleColumnAdd('attendance')}
                      className="p-0.5 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                      title="Add employee with attendance"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </th>
                <th className="py-3.5 px-4">Joined</th>
                <th className="py-3.5 px-4">Performance</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {paginatedEmployees.map((emp) => (
                <tr 
                  key={emp.id} 
                  className="hover:bg-blue-50/30 transition-colors group cursor-pointer"
                  onClick={() => handleOpenDetailsModal(emp)}
                  title="Click to view details"
                >
                  <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedEmployeeIds.includes(emp.id)}
                      onChange={(e) => handleRowSelect(emp.id, e)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300 cursor-pointer"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={emp.avatar || DEFAULT_AVATAR} alt={emp.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)} />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{emp.name}</p>
                        <p className="text-[11px] text-gray-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${emp.deptStyle}`}>
                      {emp.dept}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 font-normal">{emp.role}</td>
                  <td className="py-4 px-4">
                    <span className="flex items-center space-x-1.5 font-semibold text-gray-700">
                      <span className={`w-2 h-2 rounded-full ${emp.attendanceDot}`}></span>
                      <span>{emp.attendance}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1.5 text-gray-500">
                      <CalendarDays size={12} className="text-gray-400" />
                      {formatJoinedDate(emp.joinedDate)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3 w-36">
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${emp.perfColor}`} style={{ width: `${emp.performance}%` }}></div>
                      </div>
                      <span className="font-bold text-gray-800 text-xs">{emp.performance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end space-x-2 text-gray-400">
                      <button 
                        onClick={(e) => handleOpenEditModal(emp, e)}
                        className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Employee"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button 
                        onClick={() => handleOpenDetailsModal(emp)}
                        className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        onClick={(e) => handleDeleteEmployee(emp.id, e)}
                        className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Employee"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedEmployees.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search size={24} className="text-gray-300" />
                      <p className="text-sm font-semibold text-gray-500">No employees found</p>
                      <p className="text-xs text-gray-400">Try adjusting your search or filter criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-gray-500 font-medium">Page {currentPage} of {totalPages}</span>
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 border border-gray-200 rounded-lg font-medium cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1.5 font-bold rounded-lg cursor-pointer ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 border border-gray-200 rounded-lg font-medium cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: RECENT ACTIVITY & STAFF DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-base">Recent HR Activity</h3>
            <button className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer">View All Logs</button>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-100">
            <div className="relative flex items-start space-x-4">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full z-10">
                <UserPlus size={14} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">New onboarding started</p>
                <p className="text-xs text-gray-500 mt-0.5">Marcus Aurelius joined Engineering team as Senior Architect.</p>
                <span className="text-[10px] font-bold uppercase text-gray-400 mt-1 block tracking-wider">2 hours ago</span>
              </div>
            </div>

            <div className="relative flex items-start space-x-4">
              <div className="p-1.5 bg-cyan-100 text-cyan-600 rounded-full z-10">
                <UserCheck size={14} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">Performance review completed</p>
                <p className="text-xs text-gray-500 mt-0.5">Review for Elena Rodriguez marked as "Outstanding Performance".</p>
                <span className="text-[10px] font-bold uppercase text-gray-400 mt-1 block tracking-wider">5 hours ago</span>
              </div>
            </div>

            <div className="relative flex items-start space-x-4">
              <div className="p-1.5 bg-purple-100 text-purple-600 rounded-full z-10">
                <Plane size={14} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-xs">Leave request approved</p>
                <p className="text-xs text-gray-500 mt-0.5">Sasha Williams: Annual leave approved for Nov 12 - Nov 20.</p>
                <span className="text-[10px] font-bold uppercase text-gray-400 mt-1 block tracking-wider">Yesterday</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-4">Staff Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Engineering</span>
                  <span className="text-gray-400">42% (540)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Design</span>
                  <span className="text-gray-400">18% (231)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Sales & Marketing</span>
                  <span className="text-gray-400">25% (321)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-700">Others</span>
                  <span className="text-gray-400">15% (192)</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-slate-400 h-full rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <span>Predictive Insight</span>
            </p>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Based on current churn trends, we recommend hiring 2 additional Engineering Leads in Q1.
            </p>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT EMPLOYEE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {isEditMode ? 'Edit Employee' : 'Add New Employee'}
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              {isEditMode ? 'Modify existing employee details below.' : 'Fill in the details to add a new employee to the directory.'}
            </p>

            <form onSubmit={handleSaveEmployee} className="space-y-4">
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 bg-gray-100 flex items-center justify-center">
                    {formAvatarPreview ? (
                      <img src={formAvatarPreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={40} className="text-gray-300" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingAvatar}
                    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                    title="Upload Profile Picture"
                  >
                    {isUploadingAvatar ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-2 font-medium">
                  {isUploadingAvatar ? 'Uploading image...' : 'Click camera to upload profile picture'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="Enter employee name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    required
                    placeholder="employee@evo-erp.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Department</label>
                <div className="relative">
                  <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
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
                <label className="block text-xs font-semibold text-gray-700 mb-1">Role / Position</label>
                <div className="relative">
                  <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Frontend Developer"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Attendance Status</label>
                <div className="relative">
                  <CalendarCheck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select 
                    value={formAttendance}
                    onChange={(e) => setFormAttendance(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="O.O.O">O.O.O</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Performance Score (%)</label>
                <div className="relative">
                  <Star size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="e.g. 85"
                    value={formPerformance}
                    onChange={(e) => setFormPerformance(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {formError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs font-medium px-3 py-2 rounded-lg">
                  <AlertTriangle size={14} />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSaving || isUploadingAvatar}
                  className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2 cursor-pointer ${isSaving || isUploadingAvatar ? 'opacity-70 cursor-wait' : ''}`}
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {isSaving ? 'Saving...' : isUploadingAvatar ? 'Uploading image...' : isEditMode ? 'Save Changes' : 'Add Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMPLOYEE DETAILS MODAL */}
      {isDetailsModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-auto">
            <button 
              onClick={() => setIsDetailsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <img 
                src={selectedEmployee.avatar || DEFAULT_AVATAR} 
                alt={selectedEmployee.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-md"
                onError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h3>
                <p className="text-sm text-gray-500">{selectedEmployee.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${selectedEmployee.deptStyle}`}>
                    {selectedEmployee.dept}
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-600">
                    <span className={`w-2 h-2 rounded-full ${selectedEmployee.attendanceDot}`}></span>
                    {selectedEmployee.attendance}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Employee ID</p>
                <p className="text-sm font-bold text-gray-900">EMP-{String(selectedEmployee.id).padStart(4, '0')}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Role</p>
                <p className="text-sm font-bold text-gray-900">{selectedEmployee.role}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Department</p>
                <p className="text-sm font-bold text-gray-900">{selectedEmployee.dept}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Attendance</p>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${selectedEmployee.attendanceDot}`}></span>
                  {selectedEmployee.attendance}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Email</p>
                <p className="text-sm font-bold text-gray-900 break-all">{selectedEmployee.email}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Joined Date</p>
                <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <CalendarDays size={14} className="text-gray-400" />
                  {formatJoinedDate(selectedEmployee.joinedDate)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 sm:col-span-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Performance Score</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${selectedEmployee.perfColor}`} style={{ width: `${selectedEmployee.performance}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{selectedEmployee.performance}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => { setIsDetailsModalOpen(false); handleOpenEditModal(selectedEmployee); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <Edit2 size={14} />
                Edit
              </button>
              <button 
                onClick={() => { handleDeleteEmployee(selectedEmployee.id); setIsDetailsModalOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <button 
                onClick={() => setIsDetailsModalOpen(false)}
                className="bg-gray-900 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRContent;