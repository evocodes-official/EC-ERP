import React, { useState } from 'react';
import {
  Users,
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
  Sparkles,
} from 'lucide-react';

const HRContent = () => {
  const [selectedAll, setSelectedAll] = useState(false);

  const employees = [
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
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. TOP STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Headcount */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Headcount</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">1,284</h3>
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <span>📈</span> +12 this month
          </p>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Attendance Rate</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">96.8%</h3>
          <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
            <CheckCircle2 size={14} className="text-emerald-500" /> Above target (95%)
          </p>
        </div>

        {/* Open Positions */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Open Positions</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">24</h3>
          <p className="text-xs font-semibold text-amber-600 mt-2 flex items-center gap-1">
            <Clock size={14} className="text-amber-500" /> 8 in final interview
          </p>
        </div>

        {/* Retention Score */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Retention Score</p>
          <h3 className="text-3xl font-extrabold text-gray-900 mt-2">92/100</h3>
          <p className="text-xs font-semibold text-blue-600 mt-2 flex items-center gap-1">
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

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              <span>All Departments</span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            <button className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
              <Download size={14} className="text-gray-500" />
              <span>Export</span>
            </button>

            <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-colors">
              <UserPlus size={15} />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Table Bulk Action Bar */}
        <div className="px-6 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedAll}
                onChange={(e) => setSelectedAll(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
              />
              <span className="font-semibold text-gray-700">Select All</span>
            </label>

            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-red-600 transition-colors">
              <Trash2 size={14} />
              <span>Bulk Delete</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <span>Showing 1-10 of 1,284</span>
            <div className="flex items-center space-x-1">
              <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600"><ChevronLeft size={16} /></button>
              <button className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50/30">
                <th className="py-3 px-6 w-12"></th>
                <th className="py-3 px-4">Employee Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Performance</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-medium text-gray-700">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <input
                      type="checkbox"
                      checked={selectedAll}
                      onChange={() => {}}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-gray-300"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={emp.avatar} alt={emp.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
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
                    <div className="flex items-center space-x-3 w-36">
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${emp.perfColor}`} style={{ width: `${emp.performance}%` }}></div>
                      </div>
                      <span className="font-bold text-gray-800 text-xs">{emp.performance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2 text-gray-400">
                      <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-gray-500 font-medium">Page 1 of 129</span>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Previous</button>
            <button className="px-3 py-1.5 bg-blue-600 text-white font-bold rounded-lg">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">129</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Next</button>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: RECENT ACTIVITY & STAFF DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent HR Activity */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-base">Recent HR Activity</h3>
            <button className="text-xs font-semibold text-blue-600 hover:underline">View All Logs</button>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-100">
            {/* Log item 1 */}
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

            {/* Log item 2 */}
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

            {/* Log item 3 */}
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

        {/* Staff Distribution & AI Insight */}
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

          {/* Predictive Insight Box */}
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
    </div>
  );
};

export default HRContent;