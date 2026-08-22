import React from 'react';
import { Crown, Check, Zap, Shield, Star, Rocket, Building } from 'lucide-react';

export default function Premium() {
  return (
    <div className="p-4 sm:p-6 md:p-10 bg-slate-50 min-h-screen text-slate-800 font-sans flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
          <Crown size={14} /> Upgrade to EVO ERP Premium
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          Unlock the Full Power of Your Enterprise
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
          Get advanced reporting, unlimited inventory tracking, dedicated CRM tools, and priority support to scale your business faster.
        </p>
      </div>

      {/* Pricing Cards Grid (1 col mobile, 2 col tablet, 4 col laptop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[90rem] w-full items-stretch">
        
        {/* 1. Free / Basic Plan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Basic</h3>
            <p className="text-slate-500 text-xs mt-1 mb-4 h-8">Perfect for individuals or small teams getting started.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900">Free</span>
              <span className="text-slate-500 text-sm"> /mo</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-emerald-500 shrink-0" /> Up to 5 Users</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-emerald-500 shrink-0" /> Basic Inventory</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-emerald-500 shrink-0" /> Standard Dashboards</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-emerald-500 shrink-0" /> Community Support</li>
          </ul>
          
          <button className="w-full bg-slate-100 text-slate-400 font-semibold py-2.5 rounded-xl text-sm cursor-not-allowed mt-auto">
            Current Plan
          </button>
        </div>

        {/* 2. Starter Plan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2"><Rocket size={18}/> Starter</h3>
            <p className="text-slate-500 text-xs mt-1 mb-4 h-8">Essential tools for growing businesses.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900">$19</span>
              <span className="text-slate-500 text-sm"> /mo</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-blue-500 shrink-0" /> Up to 20 Users</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-blue-500 shrink-0" /> Advanced CRM Tracking</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-blue-500 shrink-0" /> Financial Reports</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-blue-500 shrink-0" /> Priority Email Support</li>
          </ul>
          
          <button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold py-2.5 rounded-xl text-sm transition-colors mt-auto">
            Upgrade to Starter
          </button>
        </div>

        {/* 3. Premium Plan (Highlighted) */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-amber-500/30 shadow-xl shadow-amber-500/10 flex flex-col h-full relative overflow-hidden transform md:-translate-y-2">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold py-1 text-center uppercase tracking-widest">
            Most Popular
          </div>

          <div className="mt-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2"><Crown size={18} className="text-amber-400"/> Premium</h3>
            <p className="text-slate-400 text-xs mt-1 mb-4 h-8">Full control for scaling enterprises.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-white">$49</span>
              <span className="text-slate-400 text-sm"> /mo</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start gap-2 text-slate-300 text-xs font-medium"><Zap size={16} className="text-amber-400 shrink-0" /> Unlimited Users</li>
            <li className="flex items-start gap-2 text-slate-300 text-xs font-medium"><Shield size={16} className="text-amber-400 shrink-0" /> Multi-Warehouse Inventory</li>
            <li className="flex items-start gap-2 text-slate-300 text-xs font-medium"><Star size={16} className="text-amber-400 shrink-0" /> Custom Analytics</li>
            <li className="flex items-start gap-2 text-slate-300 text-xs font-medium"><Check size={16} className="text-amber-400 shrink-0" /> 24/7 Phone Support</li>
          </ul>
          
          <button className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-2.5 rounded-xl text-sm shadow-lg shadow-orange-500/25 transition-all mt-auto">
            Get Premium
          </button>
        </div>

        {/* 4. Enterprise Plan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><Building size={18} className="text-slate-700"/> Enterprise</h3>
            <p className="text-slate-500 text-xs mt-1 mb-4 h-8">Custom solutions for large corporations.</p>
            <div className="mb-6">
              <span className="text-3xl font-black text-slate-900">$99</span>
              <span className="text-slate-500 text-sm"> /mo</span>
            </div>
          </div>
          
          <ul className="space-y-3 mb-6 flex-1">
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-slate-900 shrink-0" /> Dedicated Cloud Server</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-slate-900 shrink-0" /> Custom API Integrations</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-slate-900 shrink-0" /> White-label Branding</li>
            <li className="flex items-start gap-2 text-slate-600 text-xs font-medium"><Check size={16} className="text-slate-900 shrink-0" /> Dedicated Account Manager</li>
          </ul>
          
          <button className="w-full bg-white border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold py-2 rounded-xl text-sm transition-colors mt-auto">
            Contact Sales
          </button>
        </div>

      </div>
    </div>
  );
}