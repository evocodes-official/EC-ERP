import React from 'react';
import {
  DollarSign,
  Share2,
  TrendingUp,
  MoveRight,
  MoreVertical,
  Clock,
  MessageSquare,
  AlertTriangle,
  Mail,
  FileText,
  Plus,
  Gavel,
} from 'lucide-react';

const CRMContent = () => {
  return (
    <div className="space-y-6 relative min-h-[calc(100vh-120px)] pb-12">
      {/* 1. TOP KPI METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Deal Value Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Total Deal Value
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">
              $4,280,000
            </h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp size={13} />
              <span>+12.5% from last month</span>
            </p>
          </div>
          <div className="p-2 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
            <DollarSign size={20} />
          </div>
        </div>

        {/* Active Leads Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Active Leads
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">142</h3>
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp size={13} />
              <span>8 new today</span>
            </p>
          </div>
          <div className="p-2 bg-teal-50 text-teal-600 rounded-full border border-teal-100">
            <Share2 size={18} />
          </div>
        </div>

        {/* Win Rate Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Win Rate
            </p>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">64%</h3>
            <p className="text-xs font-semibold text-amber-500 mt-2 flex items-center gap-1">
              <MoveRight size={13} />
              <span>Stable performance</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. KANBAN DEAL PIPELINE STAGES */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-x-auto pb-4 items-start">
        {/* COLUMN 1: LEADS */}
        <div className="space-y-3 min-w-[260px]">
          {/* Stage Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>
              <h4 className="font-bold text-gray-900 text-sm">Leads</h4>
              <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
                12
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Deal Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-gray-800 text-xs">Starlight Analytics</h5>
                <p className="text-blue-600 font-bold text-sm mt-1">$12,000</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <Clock size={12} /> 2d ago
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare size={12} /> 4
              </span>
            </div>
          </div>

          {/* Deal Card 2 */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-gray-800 text-xs">Nexus Logic Inc.</h5>
                <p className="text-blue-600 font-bold text-sm mt-1">$45,500</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <Clock size={12} /> 5h ago
              </span>
              <span className="flex items-center gap-1 text-amber-600 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
                <AlertTriangle size={11} /> Priority
              </span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: QUALIFICATION */}
        <div className="space-y-3 min-w-[260px]">
          {/* Stage Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h4 className="font-bold text-gray-900 text-sm">Qualification</h4>
              <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
                8
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Deal Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-gray-800 text-xs">Global Trade Partners</h5>
                <p className="text-blue-600 font-bold text-sm mt-1">$128,000</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <Mail size={12} /> Follow up
              </span>
              <span className="font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
                85% Fit
              </span>
            </div>
          </div>
        </div>

        {/* COLUMN 3: PROPOSAL */}
        <div className="space-y-3 min-w-[260px]">
          {/* Stage Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h4 className="font-bold text-gray-900 text-sm">Proposal</h4>
              <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
                5
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Deal Card 1 (HOT) */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-gray-800 text-xs">Aura Cloud Systems</h5>
                  <span className="text-[9px] font-black uppercase text-rose-600 bg-rose-50 px-1 py-0.2 rounded">
                    HOT
                  </span>
                </div>
                <p className="text-blue-600 font-bold text-sm mt-1">$340,000</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <FileText size={12} /> proposal_v3.pdf
              </span>
            </div>
          </div>

          {/* Deal Card 2 */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-gray-800 text-xs">Vertex Industries</h5>
                <p className="text-blue-600 font-bold text-sm mt-1">$92,000</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1">
                <Clock size={12} /> 1w ago
              </span>
            </div>
          </div>
        </div>

        {/* COLUMN 4: NEGOTIATION */}
        <div className="space-y-3 min-w-[260px]">
          {/* Stage Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
              <h4 className="font-bold text-gray-900 text-sm">Negotiation</h4>
              <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
                3
              </span>
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <MoreVertical size={16} />
            </button>
          </div>

          {/* Deal Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-gray-100 border-l-4 border-l-indigo-600 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-gray-800 text-xs truncate max-w-[150px]">
                  Zenith Holdings
                </h5>
                <p className="text-blue-600 font-bold text-sm mt-1">$2,100,000</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
                alt="Owner"
                className="w-6 h-6 rounded-full object-cover border border-gray-200"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-50">
              <span className="flex items-center gap-1 truncate max-w-[180px]">
                <Gavel size={12} /> Finalizing contract
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FLOATING ACTION BUTTON (BOTTOM RIGHT +) */}
      <button className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-20">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default CRMContent;