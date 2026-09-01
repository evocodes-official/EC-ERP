import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  DollarSign,
  Calendar,
  Download,
  TrendingUp,
  UserPlus,
  FileText,
  CheckSquare,
  BarChart2,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import api from './api';

// Map backend activity icon names to lucide components + badge colors
const ACTIVITY_ICONS = {
  'check-circle': { Icon: CheckCircle2, classes: 'bg-emerald-100 text-emerald-600' },
  'user-plus': { Icon: UserPlus, classes: 'bg-blue-100 text-blue-600' },
  'alert-triangle': { Icon: AlertTriangle, classes: 'bg-amber-100 text-amber-600' },
  briefcase: { Icon: Briefcase, classes: 'bg-purple-100 text-purple-600' },
};
const FALLBACK_ACTIVITY_ICON = { Icon: ShieldCheck, classes: 'bg-purple-100 text-purple-600' };

/** Compact currency formatting: 2400000 -> $2.4M, 450000 -> $450k */
const formatCompactCurrency = (value) => {
  const n = Number(value) || 0;
  if (Math.abs(n) >= 1000000) {
    return `$${(n / 1000000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (Math.abs(n) >= 1000) {
    return `$${Math.round(n / 1000)}k`;
  }
  return `$${n.toLocaleString()}`;
};

// Demo fallback used until the API responds (or if the API is unreachable)
const DEMO_DASHBOARD = {
  kpis: {
    totalEmployees: { value: 1284, trend: 12, trendDirection: 'up' },
    activeProjects: { value: 42, trend: 4, trendDirection: 'up' },
    monthlyRevenue: { value: 2400000, trend: 8.2, trendDirection: 'up' },
    pendingTasks: { value: 156, trend: -15, trendDirection: 'down' },
  },
  revenueVsExpenses: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    revenue: [45, 60, 48, 65, 80, 72, 90],
    expenses: [0, 0, 0, 0, 0, 0, 0],
  },
  salesByDepartment: [
    { dept: 'Technology', revenue: 450000, percentage: 85 },
    { dept: 'Operations', revenue: 320000, percentage: 65 },
    { dept: 'Marketing', revenue: 280000, percentage: 55 },
    { dept: 'Sales', revenue: 190000, percentage: 35 },
  ],
  managementHierarchy: [
    {
      name: 'Elena Rodriguez',
      role: 'Chief Operations Officer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      status: 'active',
    },
    {
      name: 'Marcus Thorne',
      role: 'VP of Engineering',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
      status: 'active',
    },
    {
      name: 'Sianna Brooks',
      role: 'HR Director',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      status: 'away',
    },
  ],
  recentActivity: [
    { icon: 'check-circle', title: 'Project "Delta" Completed', description: 'Operations team finalized the logistics module.', timeAgo: '2 hours ago' },
    { icon: 'user-plus', title: 'New Hire: Sarah Miller', description: 'Joined as Senior UI/UX Designer in Dev Unit.', timeAgo: '4 hours ago' },
    { icon: 'alert-triangle', title: 'Critical Invoice Overdue', description: 'Acme Corp has a payment pending for 15 days.', timeAgo: 'Yesterday' },
    { icon: 'briefcase', title: 'System Audit Completed', description: 'Monthly security & data integrity check passed.', timeAgo: 'Yesterday' },
  ],
};

const DashboardContent = ({ onNavigate }) => {
  const [data, setData] = useState(DEMO_DASHBOARD);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Fetch live dashboard data (GET /api/dashboard)
  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        if (isMounted && res.data?.success && res.data?.data) {
          setData((prev) => ({ ...prev, ...res.data.data }));
          setFetchError('');
        }
      } catch (err) {
        // Keep demo data visible when the API is unavailable
        if (isMounted) setFetchError('Live data unavailable — showing sample data.');
        console.error('Failed to load dashboard:', err?.response?.data || err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const { kpis, revenueVsExpenses, salesByDepartment, managementHierarchy, recentActivity } = data;

  const kpiCards = [
    {
      label: 'Total Employees',
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      kpi: kpis?.totalEmployees,
      format: (v) => (Number(v) || 0).toLocaleString(),
    },
    {
      label: 'Active Projects',
      icon: Briefcase,
      color: 'bg-teal-50 text-teal-600',
      kpi: kpis?.activeProjects,
      format: (v) => (Number(v) || 0).toLocaleString(),
    },
    {
      label: 'Monthly Revenue',
      icon: DollarSign,
      color: 'bg-indigo-50 text-indigo-600',
      kpi: kpis?.monthlyRevenue,
      format: formatCompactCurrency,
    },
    {
      label: 'Pending Tasks',
      icon: CheckSquare,
      color: 'bg-amber-50 text-amber-600',
      kpi: kpis?.pendingTasks,
      format: (v) => (Number(v) || 0).toLocaleString(),
    },
  ];

  // Scale chart bars against the largest value in the dataset
  const maxChartValue = Math.max(
    ...(revenueVsExpenses?.revenue || [0]),
    ...(revenueVsExpenses?.expenses || [0]),
    1
  );

  return (
    <div className={`space-y-6 w-full px-4 sm:px-6 py-6 transition-opacity duration-300 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
      {/* Title & Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back, here's what's happening across the enterprise today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Calendar size={16} />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Live data error banner */}
      {fetchError && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2.5 rounded-lg">
          <AlertTriangle size={14} />
          <span>{fetchError}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card) => {
          const Icon = card.icon;
          const isUp = card.kpi?.trendDirection !== 'down';
          return (
            <div key={card.label} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <Icon size={20} />
                </div>
                <span
                  className={`flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                  }`}
                >
                  <TrendingUp size={12} className={`mr-1 ${isUp ? '' : 'rotate-180'}`} />
                  {Math.abs(card.kpi?.trend ?? 0)}%
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">{card.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.format(card.kpi?.value)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Bar Chart & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h2 className="font-bold text-gray-800">Revenue vs Expenses</h2>
              <div className="flex items-center space-x-4 text-xs font-medium">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-blue-600 mr-1.5"></span>Revenue</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-indigo-400 mr-1.5"></span>Expenses</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-6">Comparison of operational costs against gross revenue</p>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2 border-b border-gray-100">
            {(revenueVsExpenses?.months || []).map((month, idx) => {
              const rev = revenueVsExpenses.revenue?.[idx] || 0;
              const exp = revenueVsExpenses.expenses?.[idx] || 0;
              return (
                <div key={`${month}-${idx}`} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full max-w-[36px] flex items-end gap-1 h-full">
                    <div
                      style={{ height: `${(rev / maxChartValue) * 100}%` }}
                      className="w-full bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600"
                      title={`Revenue: ${formatCompactCurrency(rev)}`}
                    ></div>
                    <div
                      style={{ height: `${(exp / maxChartValue) * 100}%` }}
                      className="w-full bg-indigo-400 rounded-t-sm transition-all group-hover:bg-indigo-500"
                      title={`Expenses: ${formatCompactCurrency(exp)}`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">{month}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Recent Activity</h2>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4 text-sm flex-1">
            {(recentActivity || []).map((activity, idx) => {
              const { Icon, classes } = ACTIVITY_ICONS[activity.icon] || FALLBACK_ACTIVITY_ICON;
              return (
                <div key={idx} className="flex gap-3">
                  <div className={`p-1.5 rounded-full h-fit mt-0.5 ${classes}`}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-xs">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                    <span className="text-[10px] text-gray-400">{activity.timeAgo}</span>
                  </div>
                </div>
              );
            })}
            {(!recentActivity || recentActivity.length === 0) && (
              <p className="text-xs text-gray-400">No recent activity to show.</p>
            )}
          </div>
        </div>
      </div>

      {/* Department Sales & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Sales by Department</h2>
          <div className="space-y-4">
            {(salesByDepartment || []).map((item, idx) => (
              <div key={`${item.dept}-${idx}`} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-600">{item.dept}</span>
                  <span className="text-gray-800">{formatCompactCurrency(item.revenue)}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.percentage || 0}%` }}></div>
                </div>
              </div>
            ))}
            {(!salesByDepartment || salesByDepartment.length === 0) && (
              <p className="text-xs text-gray-400">No sales data available yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('hr')} className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <UserPlus size={20} className="mb-2" />
              <span className="text-xs font-semibold">New Employee</span>
            </button>
            <button onClick={() => onNavigate('finance')} className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <FileText size={20} className="mb-2" />
              <span className="text-xs font-semibold">New Invoice</span>
            </button>
            <button onClick={() => onNavigate('projects')} className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <CheckSquare size={20} className="mb-2" />
              <span className="text-xs font-semibold">Assign Task</span>
            </button>
            <button onClick={() => onNavigate('reports')} className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <BarChart2 size={20} className="mb-2" />
              <span className="text-xs font-semibold">Run Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Management Hierarchy */}
      <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-800">Management Hierarchy</h2>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>Active</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-gray-300 mr-1"></span>On Leave</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(managementHierarchy || []).map((person, idx) => {
            const isAway = person.status && person.status !== 'active';
            return (
              <div
                key={`${person.name}-${idx}`}
                className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 ${isAway ? 'opacity-75' : ''}`}
              >
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className={`w-10 h-10 rounded-full object-cover border ${isAway ? 'border-gray-300' : 'border-emerald-500'}`}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ) : (
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white bg-blue-600 ${
                      isAway ? 'opacity-60' : ''
                    }`}
                  >
                    {(person.name || '?')
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-gray-800">{person.name}</p>
                  <p className="text-[11px] text-gray-500">
                    {person.role}
                    {isAway ? ' (Away)' : ''}
                  </p>
                </div>
              </div>
            );
          })}
          {(!managementHierarchy || managementHierarchy.length === 0) && (
            <p className="text-xs text-gray-400">No management data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;