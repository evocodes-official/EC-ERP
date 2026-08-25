import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Building2,
  Bell,
  ShieldCheck,
  Key,
  Globe,
  Save,
  Upload,
  Lock,
  Smartphone,
  Mail,
  CheckCircle2,
  Copy,
  ExternalLink,
  Layers,
  Database,
} from 'lucide-react';

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [copied, setCopied] = useState(false);

  // Form & Settings State
  const [settings, setSettings] = useState({
    organizationName: 'EVO Global Solutions Inc.',
    enterpriseDomain: 'evo-erp.com',
    supportEmail: 'support@evo-erp.com',
    timezone: '(UTC-05:00) Eastern Time (US & Canada)',
    defaultCurrency: 'USD ($) - US Dollar',
    fiscalYearStart: 'January 1st',
    apiKey: 'evo_live_89f92a41b7e0982c44',
  });

  // Toggle states
  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotifs: true,
    auditAlerts: true,
    weeklyReport: false,
    apiAccess: true,
  });

  // Password change state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
  });

  // Fetch initial settings from backend on load
  useEffect(() => {
    axios.get('http://localhost:8000/api/settings')
      .then((res) => {
        if (res.data) {
          setSettings({
            organizationName: res.data.organizationName || '',
            enterpriseDomain: res.data.enterpriseDomain || '',
            supportEmail: res.data.supportEmail || '',
            timezone: res.data.timezone || '',
            defaultCurrency: res.data.defaultCurrency || '',
            fiscalYearStart: res.data.fiscalYearStart || '',
            apiKey: res.data.apiKey || '',
          });
          setToggles({
            twoFactor: res.data.twoFactorEnforced ?? true,
            emailNotifs: res.data.emailNotifs ?? true,
            auditAlerts: res.data.forcePasswordChange ?? true,
            weeklyReport: res.data.weeklyReport ?? false,
            apiAccess: true,
          });
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Save General & Security settings
  const handleSaveAll = async () => {
    try {
      const payload = {
        ...settings,
        twoFactorEnforced: toggles.twoFactor,
        emailNotifs: toggles.emailNotifs,
        forcePasswordChange: toggles.auditAlerts,
        weeklyReport: toggles.weeklyReport,
      };

      await axios.put('http://localhost:8000/api/settings', payload);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    }
  };

  // Handle Password Update request separately
  const handlePasswordSubmit = async () => {
    try {
      if (!passwords.currentPassword || !passwords.newPassword) {
        alert('Please fill out both password fields.');
        return;
      }
      await axios.post('http://localhost:8000/api/settings/password', passwords);
      alert('Admin master password updated successfully!');
      setPasswords({ currentPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password.');
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 w-full px-4 sm:px-6 py-6">
      {/* Title & Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System & Portal Settings</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your organization profile, security policies, and enterprise integrations.
          </p>
        </div>
        <button 
          onClick={handleSaveAll}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors w-fit cursor-pointer"
        >
          <Save size={15} />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 overflow-x-auto pb-1 text-xs font-semibold">
        {[
          { id: 'general', label: 'General & Organization', icon: Building2 },
          { id: 'security', label: 'Security & Access', icon: ShieldCheck },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'integrations', label: 'Integrations & API', icon: Key },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-white text-blue-600 border-t-2 border-blue-600 font-bold shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100/60'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GENERAL & ORGANIZATION */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Branding Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">Enterprise Profile</h3>
              <p className="text-xs text-gray-400">Update your company brand, domain, and contact details.</p>
            </div>

            {/* Logo Upload */}
            <div className="flex items-center space-x-4 pt-2">
              <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white font-black text-xl flex items-center justify-center border-2 border-blue-100 shadow-sm">
                EVO
              </div>
              <div>
                <button className="flex items-center space-x-2 bg-white border border-gray-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 shadow-sm cursor-pointer">
                  <Upload size={14} />
                  <span>Upload New Logo</span>
                </button>
                <p className="text-[10px] text-gray-400 mt-1">Recommended: SVG or PNG, at least 400x400px</p>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Organization Name</label>
                <input
                  type="text"
                  name="organizationName"
                  value={settings.organizationName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Enterprise Domain</label>
                <input
                  type="text"
                  name="enterpriseDomain"
                  value={settings.enterpriseDomain}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Support Email</label>
                <input
                  type="email"
                  name="supportEmail"
                  value={settings.supportEmail}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700">Primary Timezone</label>
                <select 
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                >
                  <option>(UTC-05:00) Eastern Time (US & Canada)</option>
                  <option>(UTC+00:00) London, GMT</option>
                  <option>(UTC+05:30) New Delhi, IST</option>
                </select>
              </div>
            </div>
          </div>

          {/* Regional Settings Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Regional & Financial</h3>
              <p className="text-xs text-gray-400">System currency and date formatting.</p>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">Default Currency</label>
                <select 
                  name="defaultCurrency"
                  value={settings.defaultCurrency}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs text-gray-800 cursor-pointer"
                >
                  <option>USD ($) - US Dollar</option>
                  <option>EUR (€) - Euro</option>
                  <option>GBP (£) - British Pound</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">Fiscal Year Start</label>
                <select 
                  name="fiscalYearStart"
                  value={settings.fiscalYearStart}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs text-gray-800 cursor-pointer"
                >
                  <option>January 1st</option>
                  <option>April 1st</option>
                  <option>October 1st</option>
                </select>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  System Plan
                </p>
                <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-900">Enterprise Scale</span>
                    <p className="text-[10px] text-blue-600">Unlimited users • 2TB Storage</p>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-md shadow-xs">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & ACCESS */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">Authentication & Security Policies</h3>
              <p className="text-xs text-gray-400">Enforce multi-factor auth and session rules across your team.</p>
            </div>

            <div className="space-y-4 divide-y divide-gray-100 text-xs">
              {/* 2FA Toggle */}
              <div className="pt-3 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg mt-0.5">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Enforce Two-Factor Authentication (2FA)</p>
                    <p className="text-gray-400 text-[11px]">Require all employees to authenticate via OTP app.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('twoFactor')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    toggles.twoFactor ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                </button>
              </div>

              {/* Password Expiration */}
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg mt-0.5">
                    <Lock size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Force Password Change Every 90 Days</p>
                    <p className="text-gray-400 text-[11px]">Prompt team members to cycle login credentials periodically.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('auditAlerts')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                    toggles.auditAlerts ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
                </button>
              </div>
            </div>

            {/* Password Update Form */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="font-bold text-gray-900 text-xs">Change Admin Master Password</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChangeInput}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs"
                />
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChangeInput}
                  className="w-full bg-gray-50 border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs"
                />
              </div>
              <button 
                onClick={handlePasswordSubmit}
                className="bg-gray-900 hover:bg-gray-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">Active Admin Sessions</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">Chrome on macOS</p>
                  <p className="text-[10px] text-gray-400">192.168.1.45 • New York, USA</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  CURRENT
                </span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800">EVO Mobile App (iOS)</p>
                  <p className="text-[10px] text-gray-400">2 hours ago</p>
                </div>
                <button className="text-[10px] font-semibold text-rose-600 hover:underline cursor-pointer">Revoke</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6 max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-gray-900">Notification Preferences</h3>
            <p className="text-xs text-gray-400">Control automated alerts delivered to your email and portal dashboard.</p>
          </div>

          <div className="space-y-4 divide-y divide-gray-100 text-xs">
            <div className="pt-3 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Security & Audit Alerts</p>
                <p className="text-gray-400 text-[11px]">Receive immediate emails when new logins or export events occur.</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifs')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  toggles.emailNotifs ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
              </button>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Weekly Executive Digest</p>
                <p className="text-gray-400 text-[11px]">A Monday summary of revenue forecasts, headcount, and pending deals.</p>
              </div>
              <button
                onClick={() => handleToggle('weeklyReport')}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  toggles.weeklyReport ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-md"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTEGRATIONS & API */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Keys Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5 lg:col-span-2">
            <div>
              <h3 className="text-base font-bold text-gray-900">Developer API Keys</h3>
              <p className="text-xs text-gray-400">Access ERP webhooks, REST endpoints, and custom integrations.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <label className="text-xs font-bold text-gray-700">Production Secret Token</label>
              <div className="flex items-center space-x-2">
                <input
                  type="password"
                  readOnly
                  value={settings.apiKey}
                  className="w-full bg-white border border-gray-200 px-3.5 py-2.5 rounded-xl text-xs font-mono text-gray-700 shadow-2xs"
                />
                <button
                  onClick={copyApiKey}
                  className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-colors cursor-pointer"
                >
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            {/* Connected Apps Grid */}
            <div className="pt-2 space-y-3">
              <h4 className="font-bold text-gray-900 text-xs">Connected External Tools</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-3.5 bg-white border border-gray-100 rounded-2xl shadow-2xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                      <Database size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-xs">QuickBooks Sync</p>
                      <p className="text-[10px] text-gray-400">Financial Syncing</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Connected
                  </span>
                </div>

                <div className="p-3.5 bg-white border border-gray-100 rounded-2xl shadow-2xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                      <Layers size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-xs">Salesforce Hub</p>
                      <p className="text-[10px] text-gray-400">CRM Pipeline</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer">
                    Connect <ExternalLink size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900">API Health & Quota</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Monthly Request Limit</span>
                <span className="font-bold text-gray-800">850,000 / 1M</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">API Gateway Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Operational
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-500">Webhooks Configured</span>
                <span className="font-bold text-gray-800">4 Active</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsContent;