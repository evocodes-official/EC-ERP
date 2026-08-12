import React from 'react';
import { Package, Search, Filter, AlertCircle, TrendingUp, MoreHorizontal, Plus } from 'lucide-react';

export default function Inventories() {
  const inventoryData = [
    { id: 'INV-001', name: 'Wireless Headphones', sku: 'WH-X200', stock: 450, status: 'In Stock', price: '$89.99' },
    { id: 'INV-002', name: 'Mechanical Keyboard', sku: 'MK-K45', stock: 12, status: 'Low Stock', price: '$129.50' },
    { id: 'INV-003', name: 'USB-C Hub Adapters', sku: 'USBC-99', stock: 0, status: 'Out of Stock', price: '$24.99' },
    { id: 'INV-004', name: '4K Monitor 27"', sku: 'MN-4K27', stock: 85, status: 'In Stock', price: '$349.00' },
    { id: 'INV-005', name: 'Ergonomic Mouse', sku: 'EM-01', stock: 210, status: 'In Stock', price: '$45.00' },
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
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Total Items</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900">4,209</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Low Stock Alerts</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900">24</p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 sm:col-span-2 lg:col-span-1">
          <div className="w-12 h-12 shrink-0 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">Items Received</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900">185</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:max-w-xs md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products, SKUs..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all" 
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* Scrollable Table Wrapper */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Product Name</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">SKU</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Stock Level</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Status</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap">Price</th>
                <th className="py-3 px-4 border-b border-slate-200 whitespace-nowrap text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {inventoryData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-3 px-4 font-medium text-slate-900">{item.name}</td>
                  <td className="py-3 px-4 text-slate-500">{item.sku}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">{item.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide ${
                      item.status === 'In Stock' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{item.price}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-colors">
                      <MoreHorizontal size={18} />
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