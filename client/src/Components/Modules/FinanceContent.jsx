import React, { useState } from 'react';
import {
  TrendingUp,
  Receipt,
  PiggyBank,
  Scale,
  Plus,
  Filter,
  Download,
  MoreVertical
} from 'lucide-react';

export default function FinanceContent() {
  const [activeTab, setActiveTab] = useState('INVOICES');

  const stats = [
    {
      title: 'REVENUE',
      amount: '$428,950.00',
      change: '+12.4%',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      icon: TrendingUp
    },
    {
      title: 'EXPENSES',
      amount: '$182,340.50',
      change: '-3.2%',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      icon: Receipt
    },
    {
      title: 'NET PROFIT',
      amount: '$246,609.50',
      change: '57.5% MARGIN',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: PiggyBank
    },
    {
      title: 'TAXES',
      amount: '$64,300.00',
      change: 'DUE IN 14D',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      icon: Scale
    }
  ];

  const invoices = [
    {
      id: 'INV-2024-001',
      client: 'Nexus Systems Corp',
      date: 'Mar 12, 2024',
      amount: '$12,450.00',
      status: 'PAID'
    },
    {
      id: 'INV-2024-002',
      client: 'Global Analytics Ltd',
      date: 'Mar 14, 2024',
      amount: '$8,200.00',
      status: 'PENDING'
    },
    {
      id: 'INV-2024-003',
      client: 'Skyline Ventures',
      date: 'Feb 28, 2024',
      amount: '$15,780.00',
      status: 'OVERDUE'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PAID':
        return 'bg-emerald-100 text-emerald-700 font-bold';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700 font-bold';
      case 'OVERDUE':
        return 'bg-rose-100 text-rose-700 font-bold';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="w-full p-8 space-y-6 bg-slate-50 min-h-screen font-sans">
      {/* Title Header & Primary CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Ledger oversight and invoicing status.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all">
          <Plus className="w-5 h-5" />
          Create Invoice
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    {stat.title}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.amount}</div>
                <span className={`text-xs font-semibold mt-1 inline-block ${stat.color}`}>
                  {stat.change}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor} opacity-80`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Data Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Navigation Tabs and Controls */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex gap-6">
            {['INVOICES', 'EXPENSES', 'PAYMENTS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold tracking-wider pb-2 border-b-2 transition-all ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Invoice List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-6">Invoice #</th>
                <th className="py-3.5 px-6">Client</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-blue-600 cursor-pointer hover:underline">
                    {inv.id}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-800">{inv.client}</td>
                  <td className="py-4 px-6 text-slate-500">{inv.date}</td>
                  <td className="py-4 px-6 font-semibold text-slate-900">{inv.amount}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[10px] tracking-wider ${getStatusBadge(
                        inv.status
                      )}`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}