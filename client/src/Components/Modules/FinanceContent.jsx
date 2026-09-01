import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TrendingUp,
  Receipt,
  PiggyBank,
  IndianRupee,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  X,
  RefreshCw,
  AlertCircle,
  Loader2
} from 'lucide-react';
import * as XLSX from 'xlsx';
import api from '../api';

// ==========================================
// Helpers
// ==========================================
const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Payment.invoice can be a populated document or a raw ObjectId string
const getId = (doc) => (typeof doc === 'string' ? doc : doc?._id);

const toDateInput = (value) => {
  if (!value) return '';
  const d = new Date(value);
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};

// ==========================================
// Constants
// ==========================================
const INVOICE_STATUSES = ['PENDING', 'PAID', 'OVERDUE'];
const EXPENSE_STATUSES = ['PENDING', 'PAID'];
const EXPENSE_CATEGORIES = [
  'RENT',
  'SALARIES',
  'UTILITIES',
  'MARKETING',
  'SOFTWARE',
  'TRAVEL',
  'OFFICE_SUPPLIES',
  'TAXES',
  'OTHER',
];
const PAYMENT_STATUSES = ['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'];
const PAYMENT_METHODS = ['BANK_TRANSFER', 'CASH', 'CREDIT_CARD', 'PAYPAL', 'OTHER'];

const ENDPOINTS = {
  invoice: '/invoices',
  expense: '/expenses',
  payment: '/payments',
};

// Demo fallback used until the API responds (or if the API is unreachable)
const DEMO_STATS = {
  revenue: 428950,
  expenses: 182340.5,
  netProfit: 246609.5,
  netProfitMargin: '57.5%',
  outstanding: 23980,
  paymentsReceived: 152340,
  invoicesByStatus: { PAID: { count: 3, total: 428950 } },
};

const DEMO_INVOICES = [
  { _id: 'demo-inv-1', invoiceNumber: 'INV-2024-001', client: 'Nexus Systems Corp', amount: 12450, amountPaid: 12450, status: 'PAID', date: '2024-03-12', dueDate: '2024-04-11' },
  { _id: 'demo-inv-2', invoiceNumber: 'INV-2024-002', client: 'Global Analytics Ltd', amount: 8200, amountPaid: 0, status: 'PENDING', date: '2024-03-14', dueDate: '2024-04-13' },
  { _id: 'demo-inv-3', invoiceNumber: 'INV-2024-003', client: 'Skyline Ventures', amount: 15780, amountPaid: 0, status: 'OVERDUE', date: '2024-02-28', dueDate: '2024-03-29' },
];

const DEMO_EXPENSES = [
  { _id: 'demo-exp-1', title: 'Office Rent — March', category: 'RENT', amount: 8500, date: '2024-03-01', status: 'PAID' },
  { _id: 'demo-exp-2', title: 'Q1 Corporate Taxes', category: 'TAXES', amount: 64300, date: '2024-03-15', status: 'PENDING' },
  { _id: 'demo-exp-3', title: 'Cloud Infrastructure', category: 'SOFTWARE', amount: 2140.5, date: '2024-03-10', status: 'PAID' },
];

const DEMO_PAYMENTS = [
  { _id: 'demo-pay-1', invoice: { _id: 'demo-inv-1', invoiceNumber: 'INV-2024-001', client: 'Nexus Systems Corp', status: 'PAID' }, amount: 12450, method: 'BANK_TRANSFER', paymentDate: '2024-03-12', status: 'COMPLETED' },
  { _id: 'demo-pay-2', invoice: { _id: 'demo-inv-2', invoiceNumber: 'INV-2024-002', client: 'Global Analytics Ltd', status: 'PENDING' }, amount: 4000, method: 'CREDIT_CARD', paymentDate: '2024-03-15', status: 'PENDING' },
];

const getStatusBadge = (status) => {
  switch (status) {
    case 'PAID':
    case 'COMPLETED':
      return 'bg-emerald-100 text-emerald-700 font-bold';
    case 'PENDING':
      return 'bg-amber-100 text-amber-700 font-bold';
    case 'OVERDUE':
    case 'FAILED':
      return 'bg-rose-100 text-rose-700 font-bold';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

// ==========================================
// Empty form factories
// ==========================================
const emptyInvoiceForm = () => ({ invoiceNumber: '', client: '', amount: '', status: 'PENDING', dueDate: '' });
const emptyExpenseForm = () => ({ title: '', category: 'OTHER', amount: '', date: '', status: 'PENDING' });
const emptyPaymentForm = () => ({ invoice: '', amount: '', method: 'BANK_TRANSFER', status: 'COMPLETED', paymentDate: '' });

export default function FinanceContent() {
  const [activeTab, setActiveTab] = useState('INVOICES');

  // Live data from the backend
  const [stats, setStats] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [actionError, setActionError] = useState('');

  // UI state
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [modal, setModal] = useState(null); // { type: 'invoice' | 'expense' | 'payment', editing: doc | null }
  const [form, setForm] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch all finance data (stats + invoices + expenses + payments)
  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setActionError('');
    try {
      const [statsRes, invRes, expRes, payRes] = await Promise.all([
        api.get('/finance/stats'),
        api.get('/invoices'),
        api.get('/expenses'),
        api.get('/payments'),
      ]);
      setStats(statsRes.data?.data || null);
      setInvoices(invRes.data?.data || []);
      setExpenses(expRes.data?.data || []);
      setPayments(payRes.data?.data || []);
      setFetchError('');
    } catch (err) {
      // Keep demo data visible when the API is unavailable (same pattern as DashboardContent)
      setStats(null);
      setInvoices(DEMO_INVOICES);
      setExpenses(DEMO_EXPENSES);
      setPayments(DEMO_PAYMENTS);
      setFetchError('Live data unavailable — showing sample data.');
      console.error('Failed to load finance data:', err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);


  // ------------------------------------------
  // Derived / filtered rows
  // ------------------------------------------
  const filteredInvoices = useMemo(
    () => (statusFilter === 'ALL' ? invoices : invoices.filter((i) => i.status === statusFilter)),
    [invoices, statusFilter]
  );
  const filteredExpenses = useMemo(
    () => (statusFilter === 'ALL' ? expenses : expenses.filter((e) => e.status === statusFilter)),
    [expenses, statusFilter]
  );
  const filteredPayments = useMemo(
    () => (statusFilter === 'ALL' ? payments : payments.filter((p) => p.status === statusFilter)),
    [payments, statusFilter]
  );

  const rows =
    activeTab === 'INVOICES' ? filteredInvoices : activeTab === 'EXPENSES' ? filteredExpenses : filteredPayments;

  // ------------------------------------------
  // Modal helpers
  // ------------------------------------------
  const closeModal = () => {
    setModal(null);
    setForm(null);
    setFormError('');
  };

  const openCreateModal = () => {
    setActionError('');
    setFormError('');
    const type = activeTab === 'INVOICES' ? 'invoice' : activeTab === 'EXPENSES' ? 'expense' : 'payment';
    setForm(type === 'invoice' ? emptyInvoiceForm() : type === 'expense' ? emptyExpenseForm() : emptyPaymentForm());
    setModal({ type, editing: null });
  };

  const openEditModal = (type, doc) => {
    setActionError('');
    setFormError('');
    setMenuOpenId(null);
    if (type === 'invoice') {
      setForm({
        invoiceNumber: doc.invoiceNumber || '',
        client: doc.client || '',
        amount: doc.amount ?? '',
        status: doc.status || 'PENDING',
        dueDate: toDateInput(doc.dueDate),
      });
    } else if (type === 'expense') {
      setForm({
        title: doc.title || '',
        category: doc.category || 'OTHER',
        amount: doc.amount ?? '',
        date: toDateInput(doc.date),
        status: doc.status || 'PENDING',
      });
    } else {
      setForm({
        invoice: getId(doc.invoice) || '',
        amount: doc.amount ?? '',
        method: doc.method || 'BANK_TRANSFER',
        status: doc.status || 'COMPLETED',
        paymentDate: toDateInput(doc.paymentDate),
      });
    }
    setModal({ type, editing: doc });
  };


  // ------------------------------------------
  // CRUD handlers
  // ------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!modal || !form) return;
    setIsSaving(true);
    setFormError('');
    try {
      const payload = { ...form };
      if (payload.amount !== undefined && payload.amount !== '') {
        payload.amount = Number(payload.amount);
      }
      // invoiceNumber is auto-generated by the backend when omitted
      if (modal.type === 'invoice' && !payload.invoiceNumber) delete payload.invoiceNumber;
      if (modal.type === 'payment' && !payload.invoice) delete payload.invoice;

      if (modal.editing) {
        await api.put(`${ENDPOINTS[modal.type]}/${modal.editing._id}`, payload);
      } else {
        await api.post(ENDPOINTS[modal.type], payload);
      }
      closeModal();
      await fetchAll();
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          `Failed to ${modal.editing ? 'update' : 'create'} ${modal.type}. Please check the fields and try again.`
      );
      console.error(`Failed to save ${modal.type}:`, err?.response?.data || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (type, doc) => {
    setMenuOpenId(null);
    if (!doc?._id) return;
    if (!window.confirm('Are you sure you want to delete this record? This action cannot be undone.')) return;
    setActionError('');
    try {
      await api.delete(`${ENDPOINTS[type]}/${doc._id}`);
      await fetchAll();
    } catch (err) {
      setActionError(err?.response?.data?.message || `Failed to delete ${type}.`);
      console.error(`Failed to delete ${type}:`, err?.response?.data || err.message);
    }
  };

  // ------------------------------------------
  // Export current tab to Excel (xlsx)
  // ------------------------------------------
  const handleExport = () => {
    const data = rows.map((r) => {
      if (activeTab === 'INVOICES') {
        return {
          'Invoice #': r.invoiceNumber,
          Client: r.client,
          Amount: r.amount,
          'Amount Paid': r.amountPaid ?? 0,
          Status: r.status,
          'Due Date': formatDate(r.dueDate),
          Created: formatDate(r.createdAt),
        };
      }
      if (activeTab === 'EXPENSES') {
        return {
          Title: r.title,
          Category: r.category,
          Amount: r.amount,
          Date: formatDate(r.date),
          Status: r.status,
        };
      }
      return {
        'Invoice #': r.invoice?.invoiceNumber || getId(r.invoice) || '—',
        Amount: r.amount,
        Method: r.method || '—',
        'Payment Date': formatDate(r.paymentDate),
        Status: r.status,
      };
    });
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    const sheetName = activeTab.charAt(0) + activeTab.slice(1).toLowerCase();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${activeTab.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };


  // ------------------------------------------
  // Stat cards (live when available, demo otherwise)
  // ------------------------------------------
  const paidInvoiceCount = stats?.invoicesByStatus?.PAID?.count ?? DEMO_STATS.invoicesByStatus.PAID.count;

  // Payments-derived summary — computed from the same payments list shown in the
  // PAYMENTS tab, so the stat card always reflects the tab's data.
  const paymentsSummary = useMemo(() => {
    const completed = payments.filter((p) => (p.status || '').toUpperCase() === 'COMPLETED');
    const received = completed.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    return { received, completedCount: completed.length, totalCount: payments.length };
  }, [payments]);

  const paymentsReceivedAmount =
    paymentsSummary.totalCount > 0
      ? paymentsSummary.received
      : stats?.paymentsReceived ?? DEMO_STATS.paymentsReceived;

  const paymentsReceivedChange = paymentsSummary.totalCount > 0
    ? `${paymentsSummary.completedCount} OF ${paymentsSummary.totalCount} COMPLETED`
    : stats
      ? 'COMPLETED PAYMENTS'
      : 'SAMPLE DATA';

  const statCards = [
    {
      title: 'REVENUE',
      amount: formatCurrency(stats?.revenue ?? DEMO_STATS.revenue),
      change: stats ? `${paidInvoiceCount} PAID INVOICES` : '+12.4%',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      icon: TrendingUp
    },
    {
      title: 'EXPENSES',
      amount: formatCurrency(stats?.expenses ?? DEMO_STATS.expenses),
      change: stats ? 'PAID EXPENSES' : '-3.2%',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      icon: Receipt
    },
    {
      title: 'NET PROFIT',
      amount: formatCurrency(stats?.netProfit ?? DEMO_STATS.netProfit),
      change: stats ? `${stats.netProfitMargin || '0%'} MARGIN` : '57.5% MARGIN',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: PiggyBank
    },
    {
      title: 'PAYMENTS RECEIVED',
      amount: formatCurrency(paymentsReceivedAmount),
      change: paymentsReceivedChange,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      icon: IndianRupee
    }
  ];

  // Status options for the filter dropdown of the active tab
  const filterOptions =
    activeTab === 'INVOICES' ? INVOICE_STATUSES : activeTab === 'EXPENSES' ? EXPENSE_STATUSES : PAYMENT_STATUSES;

  return (
    <div className="w-full p-8 space-y-6 bg-slate-50 min-h-screen font-sans">
      {/* Title Header & Primary CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Finance Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Ledger oversight and invoicing status.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchAll}
            disabled={isLoading}
            title="Refresh data"
            className="bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            {activeTab === 'INVOICES' ? 'Create Invoice' : activeTab === 'EXPENSES' ? 'Add Expense' : 'Record Payment'}
          </button>
        </div>
      </div>

      {/* Error banners */}
      {fetchError && (
        <div className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {fetchError}
        </div>
      )}
      {actionError && (
        <div className="flex items-center justify-between text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {actionError}
          </span>
          <button onClick={() => setActionError('')} className="hover:text-rose-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
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
                onClick={() => {
                  setActiveTab(tab);
                  setStatusFilter('ALL');
                }}
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
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 bg-white">
              <Filter className="w-3.5 h-3.5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-xs font-medium text-slate-600"
              >
                <option value="ALL">All</option>
                {filterOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleExport}
              disabled={rows.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {activeTab === 'INVOICES' && (
                  <>
                    <th className="py-3.5 px-6">Invoice #</th>
                    <th className="py-3.5 px-6">Client</th>
                    <th className="py-3.5 px-6">Due Date</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Status</th>
                  </>
                )}
                {activeTab === 'EXPENSES' && (
                  <>
                    <th className="py-3.5 px-6">Description</th>
                    <th className="py-3.5 px-6">Category</th>
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Status</th>
                  </>
                )}
                {activeTab === 'PAYMENTS' && (
                  <>
                    <th className="py-3.5 px-6">Invoice #</th>
                    <th className="py-3.5 px-6">Method</th>
                    <th className="py-3.5 px-6">Payment Date</th>
                    <th className="py-3.5 px-6">Amount</th>
                    <th className="py-3.5 px-6">Status</th>
                  </>
                )}
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 px-6 text-center text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </td>
                </tr>
              )}

              {!isLoading && rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 px-6 text-center text-sm text-slate-400">
                    No {activeTab.toLowerCase()} found. Create one to get started.
                  </td>
                </tr>
              )}

              {/* Invoice rows */}
              {activeTab === 'INVOICES' &&
                filteredInvoices.map((inv) => (
                  <tr key={inv._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-blue-600 cursor-pointer hover:underline">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-800">{inv.client || '—'}</td>
                    <td className="py-4 px-6 text-slate-500">{formatDate(inv.dueDate || inv.date || inv.createdAt)}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{formatCurrency(inv.amount)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] tracking-wider ${getStatusBadge(inv.status)}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === inv._id ? null : inv._id)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpenId === inv._id && (
                        <div className="absolute right-6 top-9 z-20 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 w-32 text-left">
                          <button
                            onClick={() => openEditModal('invoice', inv)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete('invoice', inv)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

              {/* Expense rows */}
              {activeTab === 'EXPENSES' &&
                filteredExpenses.map((exp) => (
                  <tr key={exp._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-800">{exp.title || '—'}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[10px] tracking-wider bg-slate-100 text-slate-600 font-medium">
                        {(exp.category || 'OTHER').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{formatDate(exp.date || exp.createdAt)}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{formatCurrency(exp.amount)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] tracking-wider ${getStatusBadge(exp.status)}`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === exp._id ? null : exp._id)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpenId === exp._id && (
                        <div className="absolute right-6 top-9 z-20 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 w-32 text-left">
                          <button
                            onClick={() => openEditModal('expense', exp)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete('expense', exp)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}

              {/* Payment rows */}
              {activeTab === 'PAYMENTS' &&
                filteredPayments.map((pay) => (
                  <tr key={pay._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-blue-600 cursor-pointer hover:underline">
                      {pay.invoice?.invoiceNumber || (pay.invoice ? 'INV' : '—')}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-[10px] tracking-wider bg-slate-100 text-slate-600 font-medium">
                        {(pay.method || 'OTHER').replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">{formatDate(pay.paymentDate || pay.createdAt)}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{formatCurrency(pay.amount)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] tracking-wider ${getStatusBadge(pay.status)}`}>
                        {pay.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right relative">
                      <button
                        onClick={() => setMenuOpenId(menuOpenId === pay._id ? null : pay._id)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpenId === pay._id && (
                        <div className="absolute right-6 top-9 z-20 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 w-32 text-left">
                          <button
                            onClick={() => openEditModal('payment', pay)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                          >
                            <Edit className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete('payment', pay)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {modal && form && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                {modal.editing ? 'Edit' : 'Create'}{' '}
                {modal.type === 'invoice' ? 'Invoice' : modal.type === 'expense' ? 'Expense' : 'Payment'}
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="flex items-center gap-2 text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {formError}
                </div>
              )}

              {modal.type === 'invoice' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Invoice Number (auto-generated if empty)
                    </label>
                    <input
                      type="text"
                      value={form.invoiceNumber}
                      onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                      placeholder="INV-2026-001"
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Client *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.client}
                      onChange={(e) => setForm({ ...form, client: e.target.value })}
                      placeholder="Nexus Systems Corp"
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Amount *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="0.00"
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      >
                        {INVOICE_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                </>
              )}

              {modal.type === 'expense' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Description *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Office Rent — March"
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    >
                      {EXPENSE_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Amount *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="0.00"
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      >
                        {EXPENSE_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    />
                  </div>
                </>
              )}

              {modal.type === 'payment' && (
                <>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Linked Invoice
                    </label>
                    <select
                      value={form.invoice}
                      onChange={(e) => {
                        const selected = invoices.find((i) => i._id === e.target.value);
                        const remaining = selected ? Math.max((selected.amount || 0) - (selected.amountPaid || 0), 0) : '';
                        setForm({ ...form, invoice: e.target.value, amount: remaining === '' ? form.amount : remaining });
                      }}
                      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                    >
                      <option value="">No invoice (unlinked)</option>
                      {invoices.map((i) => (
                        <option key={i._id} value={i._id}>
                          {i.invoiceNumber} — {i.client || 'No client'} ({formatCurrency(i.amount)})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Amount *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="0.00"
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      >
                        {PAYMENT_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Method
                      </label>
                      <select
                        value={form.method}
                        onChange={(e) => setForm({ ...form, method: e.target.value })}
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      >
                        {PAYMENT_METHODS.map((m) => (
                          <option key={m} value={m}>
                            {m.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Payment Date
                      </label>
                      <input
                        type="date"
                        value={form.paymentDate}
                        onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
                        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all disabled:opacity-60"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {modal.editing ? 'Save Changes' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}