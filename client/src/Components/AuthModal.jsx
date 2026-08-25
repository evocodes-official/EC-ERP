import React, { useState } from 'react';
import { X, Mail, Lock, User, Building2, Eye, EyeOff, ArrowRight } from 'lucide-react';

const AuthModal = ({ isOpen, onClose, onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store the signed-in user session and navigate to the ERP dashboard
    localStorage.setItem(
      'ec_erp_user',
      JSON.stringify({ name: formData.name || 'User', email: formData.email })
    );
    onLogin();
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setShowPassword(false);
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all";
  const labelClass = "block text-xs font-semibold text-gray-700 mb-1.5";

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Top gradient accent */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400"></div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {mode === 'login' 
                ? 'Sign in to access your EVO ERP workspace' 
                : 'Start your free trial with EVO ERP'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="px-6 mb-6">
          <div className="flex bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'login' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => switchMode('signup')}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                mode === 'signup' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            > 
              Sign Up
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Company Name</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    placeholder="Acme Corporation"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className={labelClass}>Email Address</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className={labelClass}>Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                Remember me
              </label>
              <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
            <ArrowRight size={16} />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social buttons */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Bottom switch text */}
          <p className="text-center text-xs text-gray-500 pt-2">
            {mode === 'login' ? (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => switchMode('signup')} className="font-semibold text-blue-600 hover:text-blue-700">
                  Sign up free
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button type="button" onClick={() => switchMode('login')} className="font-semibold text-blue-600 hover:text-blue-700">
                  Sign in
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;