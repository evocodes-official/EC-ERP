import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Package,
  Search,
  Filter,
  AlertCircle,
  Boxes,
  IndianRupee,
  MoreVertical,
  Plus,
  X,
  RefreshCw,
  Loader2,
  Edit,
  Trash2,
} from 'lucide-react';
import api from '../api';

// ==========================================
// Helpers
// ==========================================
const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatCompact = (value) => {
  const n = Number(value) || 0;
  if (Math.abs(n) >= 10000000) return `₹${(n / 10000000).toFixed(2).replace(/\.00$/, '')}Cr`;
  if (Math.abs(n) >= 100000) return `₹${(n / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  if (Math.abs(n) >= 1000) return `₹${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return `₹${n.toLocaleString('en-IN')}`;
};

const INVENTORY_ENDPOINT = '/inventory';

const STATUS_STYLES = {
  'In Stock': 'bg-emerald-100 text-emerald-700',
  'Low Stock': 'bg-amber-100 text-amber-700',
  'Out of Stock': 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock'];

// Status is derived from the stock level so it always stays consistent
const deriveStatus = (item) => {
  const stock = Number(item.stock) || 0;
  const threshold = Number(item.lowStockThreshold ?? 10) || 10;
  if (stock <= 0) return 'Out of Stock';
  if (stock <= threshold) return 'Low Stock';
  return 'In Stock';
};

const emptyItemForm = () => ({
  name: '',
  sku: '',
  category: '',
  stock: '',
  price: '',
  lowStockThreshold: 10,
});

// Demo fallback used until the API responds (or if the API is unreachable)
const DEMO_ITEMS = [
  { _id: 'demo-inv-1', name: 'Wireless Headphones', sku: 'WH-X200', category: 'Audio', stock: 450, price: 7499, lowStockThreshold: 10 },
  { _id: 'demo-inv-2', name: 'Mechanical Keyboard', sku: 'MK-K45', category: 'Accessories', stock: 12, price: 10749, lowStockThreshold: 15 },
  { _id: 'demo-inv-3', name: 'USB-C Hub Adapters', sku: 'USBC-99', category: 'Accessories', stock: 0, price: 2074, lowStockThreshold: 10 },
  { _id: 'demo-inv-4', name: '4K Monitor 27"', sku: 'MN-4K27', category: 'Displays', stock: 85, price: 29025, lowStockThreshold: 10 },
  { _id: 'demo-inv-5', name: 'Ergonomic Mouse', sku: 'EM-01', category: 'Accessories', stock: 210, price: 3735, lowStockThreshold: 10 },
];

export default function Inventories() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [menuOpenId, setMenuOpenId] = useState(null);
  const [modal, setModal] = useState(null); // { editing: item | null }
  const [form, setForm] = useState(null);
  const [formError, setFormError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  // ------------------------------------------
  // Fetch inventory items
  // ------------------------------------------
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await api.get(INVENTORY_ENDPOINT);
      setItems(res.data?.data || []);
      setFetchError('');
    } catch (err) {
      setItems(DEMO_ITEMS);
      setFetchError('Live data unavailable — showing sample data.');
      console.error('Failed to load inventory:', err?.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // ------------------------------------------
  // Stats — computed from the items state, so they
  // re-render instantly after any add / edit / delete
  // ------------------------------------------
  const stats = useMemo(() => {
    const withStatus = items.map((item) => ({ ...item, computedStatus: deriveStatus(item) }));
    const totalProducts = items.length;
    const totalUnits = items.reduce((sum, i) => sum + (Number(i.stock) || 0), 0);
    const lowStockCount = withStatus.filter(
      (i) => i.computedStatus === 'Low Stock' || i.computedStatus === 'Out of Stock'
    ).length;
    const inventoryValue = items.reduce(
      (sum, i) => sum + (Number(i.stock) || 0) * (Number(i.price) || 0),
      0
    );
    return { withStatus, totalProducts, totalUnits, lowStockCount, inventoryValue };
  }, [items]);

  // ------------------------------------------
  // Search + filter (client-side, instant)
  // ------------------------------------------
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return stats.withStatus.filter((item) => {
      const matchesSearch =
        !q ||
        (item.name || '').toLowerCase().includes(q) ||
        (item.sku || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'ALL' || item.computedStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [stats.withStatus, searchQuery, statusFilter]);

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
    setForm(emptyItemForm());
    setModal({ editing: null });
  };

  const openEditModal = (item) => {
    setActionError('');
    setFormError('');
    setMenuOpenId(null);
    setForm({
      name: item.name || '',
      sku: item.sku || '',
      category: item.category || '',
      stock: item.stock ?? '',
      price: item.price ?? '',
      lowStockThreshold: item.lowStockThreshold ?? 10,
    });
    setModal({ editing: item });
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
      const payload = {
        ...form,
        stock: Number(form.stock) || 0,
        price: Number(form.price) || 0,
        lowStockThreshold: Number(form.lowStockThreshold) || 10,
      };
      if (modal.editing) {
        await api.put(`${INVENTORY_ENDPOINT}/${modal.editing._id}`, payload);
      } else {
        await api.post(INVENTORY_ENDPOINT, payload);
      }
      closeModal();
      await fetchItems();
    } catch (err) {
      setFormError(
        err?.response?.data?.message ||
          `Failed to ${modal.editing ? 'update' : 'create'} product. Please check the fields and try again.`
      );
      console.error('Failed to save product:', err?.response?.data || err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item) => {
    setMenuOpenId(null);
    if (!item?._id || String(item._id).startsWith('demo-')) {
      setActionError('Sample data cannot be deleted. Connect the API to manage real records.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return;
    setActionError('');
    try {
      await api.delete(`${INVENTORY_ENDPOINT}/${item._id}`);
      await fetchItems();
    } catch (err) {
      setActionError(err?.response?.data?.message || 'Failed to delete product.');
      console.error('Failed to delete product:', err?.response?.data || err.message);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString('en-IN'),
      icon: Package,
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Units in Stock',
      value: stats.totalUnits.toLocaleString('en-IN'),
      icon: Boxes,
      iconBg: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Low Stock Alerts',
      value: stats.lowStockCount.toLocaleString('en-IN'),
      icon: AlertCircle,
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Inventory Value',
      value: formatCompact(stats.inventoryValue),
      icon: IndianRupee,
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Package className="text-blue-600 w-6 h-6 sm:w-7 sm:h-7" /> Inventory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">Track and manage your product stock levels across all warehouses.</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={fetchItems}
            disabled={isLoading}
            title="Refresh data"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={openCreateModal}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Error banners */}
      {fetchError && (
        <div className="flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-6">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {fetchError}
        </div>
      )}
      {actionError && (
        <div className="flex items-center justify-between text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-xl px-4 py-2.5 mb-6">
          <span className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {actionError}
          </span>
          <button onClick={() => setActionError('')} className="hover:text-rose-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Cards — re-render instantly from the items state */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
            >
              <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-slate-500">{card.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar — working search + filter */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:max-w-xs md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, SKUs, categories..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 bg-white w-full sm:w-auto">
            <Filter size={14} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-xs font-medium text-slate-600 w-full sm:w-auto"
            >
              <option value="ALL">All Statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Product Name</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">SKU</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Category</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Stock Level</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Status</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Price</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading && items.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </td>
                </tr>
              )}

              {!isLoading && filteredItems.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 px-4 text-center text-sm text-slate-400">
                    {items.length === 0
                      ? 'No products found. Add one to get started.'
                      : 'No products match your search or filter.'}
                  </td>
                </tr>
              )}

              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-3 px-4 font-medium text-slate-900">{item.name}</td>
                  <td className="py-3 px-4 text-slate-500">{item.sku}</td>
                  <td className="py-3 px-4 text-slate-500">{item.category || '—'}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">{Number(item.stock) || 0}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                        STATUS_STYLES[item.computedStatus] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.computedStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{formatCurrency(item.price)}</td>
                  <td className="py-3 px-4 text-right relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === item._id ? null : item._id)}
                      className="text-slate-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {menuOpenId === item._id && (
                      <div className="absolute right-4 top-10 z-20 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 w-32 text-left">
                        <button
                          onClick={() => openEditModal(item)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 size={14} /> Delete
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

      {/* Click-away layer to close row menus */}
      {menuOpenId && <div className="fixed inset-0 z-10" onClick={() => setMenuOpenId(null)} />}

      {/* Add / Edit Modal */}
      {modal && form && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {modal.editing ? 'Edit Product' : 'Add Product'}
              </h3>
              <button
                onClick={closeModal}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              {formError && (
                <div className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {formError}
                </div>
              )}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Wireless Headphones"
                  className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.sku}
                    onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    placeholder="e.g. WH-X200"
                    className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g. Audio"
                    className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Stock *
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="0"
                    className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="0.00"
                    className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Low Stock At
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.lowStockThreshold}
                    onChange={(e) => setForm({ ...form, lowStockThreshold: e.target.value })}
                    className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                  />
                </div>
              </div>
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
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {modal.editing ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}