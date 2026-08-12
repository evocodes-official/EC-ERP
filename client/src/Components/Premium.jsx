import React from 'react';
import { Crown, Check, Zap, Shield, Star } from 'lucide-react';

export default function Premium() {
  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen text-slate-800 font-sans flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Crown size={14} /> Upgrade to EVO ERP Premium
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Unlock the Full Power of Your Enterprise
        </h1>
        <p className="text-lg text-slate-500">
          Get advanced reporting, unlimited inventory tracking, dedicated CRM tools, and 24/7 priority support to scale your business faster.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        {/* Current Plan */}
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative">
          <h3 className="text-xl font-bold text-slate-900">Basic Tier</h3>
          <p className="text-slate-500 text-sm mt-2 mb-6">Perfect for small teams getting started.</p>
          <div className="mb-8">
            <span className="text-4xl font-black text-slate-900">Free</span>
            <span className="text-slate-500"> / forever</span>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-600 text-sm"><Check size={18} className="text-emerald-500" /> Up to 5 Users</li>
            <li className="flex items-center gap-3 text-slate-600 text-sm"><Check size={18} className="text-emerald-500" /> Basic Inventory Tracking</li>
            <li className="flex items-center gap-3 text-slate-600 text-sm"><Check size={18} className="text-emerald-500" /> Standard Dashboards</li>
            <li className="flex items-center gap-3 text-slate-600 text-sm"><Check size={18} className="text-emerald-500" /> Community Support</li>
          </ul>
          
          <button className="w-full bg-slate-100 text-slate-400 font-semibold py-3 rounded-xl cursor-not-allowed">
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 flex flex-col relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full"></div>
          
          <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>

          <h3 className="text-xl font-bold text-white">Premium Tier</h3>
          <p className="text-slate-400 text-sm mt-2 mb-6">For scaling enterprises needing full control.</p>
          <div className="mb-8">
            <span className="text-4xl font-black text-white">$49</span>
            <span className="text-slate-400"> / user per month</span>
          </div>
          
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-slate-300 text-sm"><Zap size={18} className="text-amber-400" /> Unlimited Users & Projects</li>
            <li className="flex items-center gap-3 text-slate-300 text-sm"><Shield size={18} className="text-amber-400" /> Advanced Multi-Warehouse Inventory</li>
            <li className="flex items-center gap-3 text-slate-300 text-sm"><Star size={18} className="text-amber-400" /> Custom Analytics & Reports</li>
            <li className="flex items-center gap-3 text-slate-300 text-sm"><Check size={18} className="text-amber-400" /> 24/7 Priority Phone Support</li>
          </ul>
          
          <button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:scale-[1.02]">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}