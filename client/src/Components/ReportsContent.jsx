import React, { useState, useEffect } from 'react';
import api from './api';
import * as XLSX from 'xlsx';
import { Share, Download, ChevronDown, TrendingUp } from 'lucide-react';

const ReportsContent = () => {
  // State for date range and parameters
  const [dateRange, setDateRange] = useState('Jul 01 - Sep 30, 2024');
  const [parameter, setParameter] = useState('Cost vs Performance');
  
  // State for fetched report data
  const [reportData, setReportData] = useState({
    revenueGrowthRate: 12.4,
    globalPerformanceScore: 84,
    monthlyData: [],
    departmentBreakdown: [
      { name: 'Sales', color: 'bg-blue-600', percentage: '45%' },
      { name: 'Marketing', color: 'bg-emerald-500', percentage: '25%' },
      { name: 'R&D', color: 'bg-blue-900', percentage: '20%' },
      { name: 'Ops', color: 'bg-gray-400', percentage: '10%' },
    ]
  });

  // Fetch report metrics from backend on load or when filters apply
  const fetchReports = async () => {
    try {
      const response = await api.get('/reports', {
        params: { dateRange, parameter }
      });
      const report = response.data?.data || response.data;
      if (report) {
        setReportData((prev) => ({ ...prev, ...report }));
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [dateRange, parameter]);

  // Handle Excel Export (Export All)
  const handleExportExcel = () => {
    try {
      // 1. Prepare worksheet data from departments
      const deptSheetData = reportData.departmentBreakdown.map(dept => ({
        Department: dept.name,
        PerformanceShare: dept.percentage
      }));

      // 2. Prepare worksheet data from monthly metrics if available
      const monthlySheetData = (reportData.monthlyData || []).map(m => ({
        Month: m.month,
        Revenue: m.revenue
      }));

      // Create a new workbook and add sheets
      const wb = XLSX.utils.book_new();
      
      const wsDepts = XLSX.utils.json_to_sheet(deptSheetData);
      XLSX.utils.book_append_sheet(wb, wsDepts, "Department Performance");

      if (monthlySheetData.length > 0) {
        const wsMonthly = XLSX.utils.json_to_sheet(monthlySheetData);
        XLSX.utils.book_append_sheet(wb, wsMonthly, "Monthly Revenue");
      }

      // Trigger file download
      XLSX.writeFile(wb, `EVO_ERP_Report_${dateRange.replace(/ /g, '_')}.xlsx`);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export data.');
    }
  };

  return (
    <div className="w-full bg-gray-50 text-gray-900 font-sans">
      
      {/* --- Main Content Section --- */}
      <main className="p-4 sm:p-6">
        
        {/* Section Header: Title and Top-level Actions */}
        <section className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Reports & Insights</h2>
            <p className="text-gray-600 mt-0.5 text-sm">Data visualization and automated reporting.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2.5 px-5 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-full font-semibold text-sm transition shadow-sm cursor-pointer">
              <Share className="w-4 h-4 text-gray-600" />
              Share
            </button>
            <button 
              onClick={handleExportExcel}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-sm transition shadow-lg shadow-blue-500/30 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </section>

        {/* --- Filters Area --- */}
        <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-end justify-between">
          <div className="flex gap-6">
            
            {/* Filter: Date Range */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">DATE RANGE</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="flex items-center justify-between gap-4 px-4 py-2.5 border border-gray-300 rounded-full text-sm font-semibold w-60 bg-white cursor-pointer"
              >
                <option value="Jul 01 - Sep 30, 2024">Jul 01 - Sep 30, 2024</option>
                <option value="Oct 01 - Dec 31, 2024">Oct 01 - Dec 31, 2024</option>
                <option value="Jan 01 - Mar 31, 2025">Jan 01 - Mar 31, 2025</option>
              </select>
            </div>

            {/* Filter: Parameter */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">PARAMETER</label>
              <select 
                value={parameter}
                onChange={(e) => setParameter(e.target.value)}
                className="flex items-center justify-between gap-4 px-4 py-2.5 border border-gray-300 rounded-full text-sm font-semibold w-60 bg-white cursor-pointer"
              >
                <option value="Cost vs Performance">Cost vs Performance</option>
                <option value="Revenue Optimization">Revenue Optimization</option>
                <option value="Resource Allocation">Resource Allocation</option>
              </select>
            </div>
          </div>

          {/* Apply / Clear Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setDateRange('Jul 01 - Sep 30, 2024'); setParameter('Cost vs Performance'); }}
              className="text-sm font-semibold text-blue-700 hover:text-blue-900 px-3 py-2 cursor-pointer"
            >
              Clear Filters
            </button>
            <button 
              onClick={fetchReports}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-sm transition shadow shadow-blue-500/20 cursor-pointer"
            >
              Apply Analytics
            </button>
          </div>
        </section>

        {/* --- Chart Area (Grid Layout) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Monthly Revenue Growth */}
          <article className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <header className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Monthly Revenue Growth</h3>
              {/* Badge for growth */}
              <div className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                +{reportData.revenueGrowthRate}%
              </div>
            </header>

            {/* Placeholder for Line Chart */}
            <div className="h-72 relative w-full border-l border-b border-gray-100 flex flex-col justify-end">
              
              {/* Canvas/Component Area */}
              <div className="absolute inset-0 pt-12 pb-6 px-4">
                <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,250 C100,240 200,250 300,220 C400,190 500,180 600,150 S800,130 1000,100" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Faux Y-Axis Grid Lines */}
              <div className="absolute inset-x-0 top-12 h-px bg-gray-100"></div>
              <div className="absolute inset-x-0 top-32 h-px bg-gray-100"></div>
              <div className="absolute inset-x-0 top-52 h-px bg-gray-100"></div>

              {/* Faux X-Axis Labels */}
              <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-widest pt-2 px-1 relative -bottom-5">
                {['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP'].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </article>

          {/* Card 2: Dept Performance */}
          <article className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-4">Dept Performance</h3>
            
            {/* Donut Chart and Value */}
            <div className="relative aspect-square max-w-[220px] mx-auto flex items-center justify-center my-2">
              
              
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <path className="text-gray-100" fill="none" strokeWidth="3" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                {/* Progress circle (blue part) */}
                <path className="text-blue-600" fill="none" strokeWidth="3" strokeDasharray="84, 100" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                {/* Secondary data part (emerald part) */}
                <path className="text-emerald-500" fill="none" strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-84" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
              </svg>

              {/* Central Value */}
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-extrabold text-blue-900">{reportData.globalPerformanceScore}%</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">GLOBAL</span>
              </div>
            </div>

            {/* Department Legend */}
            <footer className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-gray-100">
              {reportData.departmentBreakdown.map(dept => (
                <div key={dept.name} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${dept.color || 'bg-blue-600'}`}></div>
                  <span className="text-xs font-medium text-gray-700">{dept.name} ({dept.percentage})</span>
                </div>
              ))}
            </footer>
          </article>
          
        </section>

      </main>
    </div>
  );
};

export default ReportsContent;