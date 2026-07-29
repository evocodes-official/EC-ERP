import React from 'react';
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

const DashboardContent = () => {
  return (
    <div className="space-y-6">
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Users size={20} />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="mr-1" /> 12%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Total Employees</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">1,284</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-teal-50 rounded-lg text-teal-600">
              <Briefcase size={20} />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="mr-1" /> 4
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Active Projects</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">42</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <DollarSign size={20} />
            </div>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="mr-1" /> 8.2%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Monthly Revenue</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">$2.4M</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <CheckSquare size={20} />
            </div>
            <span className="flex items-center text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="mr-1 rotate-180" /> 15%
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold uppercase text-gray-400 tracking-wider">Pending Tasks</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">156</p>
          </div>
        </div>
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
            {[
              { month: 'Jan', rev: 45 },
              { month: 'Feb', rev: 60 },
              { month: 'Mar', rev: 48 },
              { month: 'Apr', rev: 65 },
              { month: 'May', rev: 80 },
              { month: 'Jun', rev: 72 },
              { month: 'Jul', rev: 90 },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="w-full max-w-[36px] flex items-end gap-1 h-full">
                  <div style={{ height: `${bar.rev}%` }} className="w-full bg-blue-500 rounded-t-sm transition-all group-hover:bg-blue-600"></div>
                </div>
                <span className="text-xs text-gray-400 mt-2">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Recent Activity</h2>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-4 text-sm flex-1">
            <div className="flex gap-3">
              <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-full h-fit mt-0.5">
                <CheckCircle2 size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs">Project "Delta" Completed</p>
                <p className="text-xs text-gray-500 mt-0.5">Operations team finalized the logistics module.</p>
                <span className="text-[10px] text-gray-400">2 hours ago</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-1.5 bg-blue-100 text-blue-600 rounded-full h-fit mt-0.5">
                <UserPlus size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs">New Hire: Sarah Miller</p>
                <p className="text-xs text-gray-500 mt-0.5">Joined as Senior UI/UX Designer in Dev Unit.</p>
                <span className="text-[10px] text-gray-400">4 hours ago</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full h-fit mt-0.5">
                <AlertTriangle size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs">Critical Invoice Overdue</p>
                <p className="text-xs text-gray-500 mt-0.5">Acme Corp has a payment pending for 15 days.</p>
                <span className="text-[10px] text-gray-400">Yesterday</span>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="p-1.5 bg-purple-100 text-purple-600 rounded-full h-fit mt-0.5">
                <ShieldCheck size={14} />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-xs">System Audit Completed</p>
                <p className="text-xs text-gray-500 mt-0.5">Monthly security & data integrity check passed.</p>
                <span className="text-[10px] text-gray-400">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Department Sales & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Sales by Department</h2>
          <div className="space-y-4">
            {[
              { dept: 'Technology', val: '$450k', pct: '85%' },
              { dept: 'Marketing', val: '$280k', pct: '55%' },
              { dept: 'Operations', val: '$320k', pct: '65%' },
              { dept: 'Sales', val: '$190k', pct: '35%' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-600">{item.dept}</span>
                  <span className="text-gray-800">{item.val}</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: item.pct }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <UserPlus size={20} className="mb-2" />
              <span className="text-xs font-semibold">New Employee</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <FileText size={20} className="mb-2" />
              <span className="text-xs font-semibold">New Invoice</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
              <CheckSquare size={20} className="mb-2" />
              <span className="text-xs font-semibold">Assign Task</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 text-gray-700">
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
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" alt="Elena" className="w-10 h-10 rounded-full object-cover border border-emerald-500" />
            <div>
              <p className="text-xs font-bold text-gray-800">Elena Rodriguez</p>
              <p className="text-[11px] text-gray-500">Chief Operations Officer</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80" alt="Marcus" className="w-10 h-10 rounded-full object-cover border border-emerald-500" />
            <div>
              <p className="text-xs font-bold text-gray-800">Marcus Thorne</p>
              <p className="text-[11px] text-gray-500">VP of Engineering</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100 opacity-75">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80" alt="Sianna" className="w-10 h-10 rounded-full object-cover border border-gray-300" />
            <div>
              <p className="text-xs font-bold text-gray-800">Sianna Brooks</p>
              <p className="text-[11px] text-gray-500">HR Director (Away)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;