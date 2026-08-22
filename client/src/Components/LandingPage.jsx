import React, { useState } from 'react';
import {
  Grid,
  Users,
  Briefcase,
  Wallet,
  FolderKanban,
  BarChart3,
  Package,
  ArrowRight,
  Check,
  Star,
  Shield,
  TrendingUp,
  Sparkles,
  Menu,
  X,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Send,
  Clock
} from 'lucide-react';
import AuthModal from './AuthModal';

const LandingPage = ({ onLogin, onNavigate }) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleLogin = () => {
    setIsAuthOpen(false);
    onLogin();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after showing success message
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 4000);
  };

  const features = [
    {
      icon: Users,
      title: 'HR Management',
      desc: 'Manage employees, attendance, roles, and departments with ease.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100'
    },
    {
      icon: Briefcase,
      title: 'CRM & Sales',
      desc: 'Track deals, manage leads, and close more business faster.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
      border: 'border-amber-100'
    },
    {
      icon: Wallet,
      title: 'Finance & Invoicing',
      desc: 'Create invoices, track payments, and manage your finances.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100'
    },
    {
      icon: FolderKanban,
      title: 'Project Management',
      desc: 'Organize tasks, track progress, and collaborate with your team.',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100'
    },
    {
      icon: Package,
      title: 'Inventory Control',
      desc: 'Track stock levels, manage products, and optimize supply chain.',
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100'
    },
    {
      icon: BarChart3,
      title: 'Reports & Analytics',
      desc: 'Gain insights with powerful dashboards and real-time reporting.',
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-100'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      desc: 'Perfect for small teams getting started',
      features: [
        'Up to 5 users',
        'Core modules (HR, CRM)',
        'Basic reporting',
        'Email support',
        '1GB storage'
      ],
      cta: 'Start Free',
      highlighted: false
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      desc: 'For growing businesses that need more power',
      features: [
        'Up to 25 users',
        'All modules included',
        'Advanced analytics',
        'Priority support',
        '50GB storage',
        'Custom integrations',
        'API access'
      ],
      cta: 'Get Started',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      desc: 'For large organizations with complex needs',
      features: [
        'Unlimited users',
        'Everything in Professional',
        'Dedicated account manager',
        '24/7 phone support',
        'Unlimited storage',
        'SSO & advanced security',
        'Custom SLA'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '500+', label: 'Companies' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'Rating' }
  ];

  const testimonials = [
    {
      name: 'Arun Kumar',
      role: 'CEO, Chennai Tech Solutions',
      quote: 'EVO ERP transformed how we manage our entire business. The HR and project modules alone saved us 20 hours per week.',
      initials: 'AK',
      color: 'bg-blue-600'
    },
    {
      name: 'Kavitha Ramesh',
      role: 'Operations Director, Coimbatore Industries',
      quote: 'The reporting and analytics are incredible. We finally have real-time visibility into every part of our operations.',
      initials: 'KR',
      color: 'bg-emerald-600'
    },
    {
      name: 'Senthil Murugan',
      role: 'Founder, Madurai Enterprises',
      quote: 'Setup was effortless and the interface is beautiful. Our team adopted it within days, not weeks.',
      initials: 'SM',
      color: 'bg-purple-600'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@evocodes.com',
      sub: 'We reply within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 98765 43210',
      sub: 'Mon-Fri, 9am to 6pm IST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Chennai, Tamil Nadu, India',
      sub: 'EvoCodes Headquarters'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      value: '24/7 Support',
      sub: 'Enterprise customers'
    }
  ];

  const navLinks = ['Features', 'Pricing', 'Testimonials', 'Contact'];

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900 overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Grid className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 leading-tight text-lg">EVO ERP</h1>
                <p className="text-[10px] tracking-wider text-slate-400 font-bold uppercase">Enterprise Suite</p>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => openAuth('login')}
                className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                Login
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Sign Up Free
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-medium text-gray-600 hover:text-blue-600 py-2 transition-colors"
              >
                {link}
              </a>
            ))}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <button
                onClick={() => openAuth('login')}
                className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                Login
              </button>
              <button
                onClick={() => openAuth('signup')}
                className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-40 -right-20 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-indigo-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <Sparkles size={14} className="text-blue-600" />
              <span className="text-xs font-semibold text-blue-700">New: AI-Powered Analytics</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Run Your Entire Business
              <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                From One Platform
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              EVO ERP brings together HR, CRM, Finance, Projects, Inventory, and Analytics in a single, beautiful, and powerful enterprise suite.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openAuth('signup')}
                className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Get Started Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => openAuth('login')}
                className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 font-semibold px-8 py-3.5 rounded-xl text-base transition-all"
              >
                <Shield size={18} className="text-blue-600" />
                Login to Dashboard
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" /> Free 14-day trial
              </span>
              <span className="flex items-center gap-1.5">
                <Check size={14} className="text-emerald-500" /> Cancel anytime
              </span>
            </div>
          </div>

          {/* Hero Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <div className="flex-1 mx-4 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400">
                  app.evo-erp.com/dashboard
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'Total Revenue', value: '$128,430', change: '+12.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Active Projects', value: '24', change: '+3', icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Team Members', value: '48', change: '+5', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Open Deals', value: '12', change: '+2', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' }
                  ].map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                      <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            <Icon size={18} />
                          </div>
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            {stat.change}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Chart area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-gray-900">Revenue Overview</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium">Monthly</span>
                        <span className="text-xs text-gray-400 px-2 py-1">Weekly</span>
                      </div>
                    </div>
                    {/* Simple bar chart */}
                    <div className="flex items-end gap-2 h-32">
                      {[40, 65, 45, 80, 55, 90, 70, 100, 60, 85, 75, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-md opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {[
                        { text: 'New employee added', time: '2 min ago', color: 'bg-blue-500' },
                        { text: 'Invoice #2341 paid', time: '15 min ago', color: 'bg-emerald-500' },
                        { text: 'Deal closed: $12,000', time: '1 hr ago', color: 'bg-amber-500' },
                        { text: 'Project milestone reached', time: '3 hrs ago', color: 'bg-purple-500' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-700 truncate">{item.text}</p>
                            <p className="text-[10px] text-gray-400">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Everything Your Business Needs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Six powerful modules that work together seamlessly to streamline your entire operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className={`group bg-white rounded-2xl border ${feature.border} p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className={`w-12 h-12 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                  <button
                    onClick={() => openAuth('signup')}
                    className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-2 transition-all"
                  >
                    Learn more <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-500/30 scale-105 hover:scale-110'
                    : 'bg-white border border-gray-200 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <h3 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-2 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>
                  {plan.desc}
                </p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-blue-200' : 'text-gray-400'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-cyan-300' : 'text-blue-600'}`}
                      />
                      <span className={`text-sm ${plan.highlighted ? 'text-blue-50' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openAuth('signup')}
                  className={`mt-8 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.highlighted
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Loved by Teams Worldwide
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of companies that trust EVO ERP to run their business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${testimonial.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Transform Your Business?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join 500+ companies already using EVO ERP to streamline their operations.
              </p>
              <button
                onClick={() => openAuth('signup')}
                className="mt-8 inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-xl text-base transition-all hover:bg-blue-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Your Free Trial
                <ArrowRight size={18} />
              </button>
              <p className="mt-4 text-sm text-blue-200">
                No credit card required · Free 14-day trial
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions about EVO ERP? Send us an enquiry and our team will get back to you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon;
                return (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start gap-4 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{info.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{info.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{info.sub}</p>
                    </div>
                  </div>
                );
              })}

              {/* Social/Additional Info */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Prefer a Demo?</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Book a free personalized demo with our team and see how EVO ERP can transform your business.
                </p>
                <button
                  onClick={() => openAuth('signup')}
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:bg-blue-50 shadow-lg"
                >
                  Book a Demo
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Send an Enquiry</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={28} className="text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-emerald-800 text-lg mb-1">Enquiry Sent!</h4>
                    <p className="text-sm text-emerald-600">
                      Thank you for reaching out. Our team will contact you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your name"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="you@company.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="demo">Request a Demo</option>
                        <option value="pricing">Pricing Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        placeholder="Tell us about your requirements..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
                    >
                      <Send size={16} />
                      Send Enquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Grid className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">EVO ERP</h3>
                  <p className="text-[10px] tracking-wider text-gray-500 font-bold uppercase">Enterprise Suite</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                The all-in-one enterprise resource planning solution for modern businesses.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Changelog</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2026 EvoCodes. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <button onClick={() => onNavigate('privacy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button>
              <button onClick={() => onNavigate('terms')} className="hover:text-blue-400 transition-colors">Terms & Conditions</button>
              <button onClick={() => onNavigate('copyright')} className="hover:text-blue-400 transition-colors">Copyright</button>
            </div>
          </div>
        </div>
      </footer>

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;