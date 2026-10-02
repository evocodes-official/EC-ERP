import React, { useState, useEffect, useRef } from 'react';
import {
  Camera,
  Mail,
  MapPin,
  Building2,
  CalendarDays,
  ShieldCheck,
  KeyRound,
  Smartphone,
  BadgeCheck,
  Award,
  Clock,
  Languages,
  Pencil,
  Save,
  X,
  CheckCircle2,
  Sparkles,
  Fingerprint,
  History,
  Share2,
  Bell,
  Crown,
  Star,
  BriefcaseBusiness,
  MessageSquare,
  Users,
  LogOut,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import api from './api';

// Fallback profile used when the API is unreachable or returns no data
const DEFAULT_PROFILE = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@evocodes.com',
  picture:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  role: 'Operations Director',
  department: 'Enterprise Suite',
  location: 'Chennai, Tamil Nadu, India',
  phone: '+91 98765 43210',
  company: 'EvoCodes Pvt. Ltd.',
  joined: 'January 2022',
  bio: 'Product-minded operations leader who loves turning complex workflows into simple, elegant systems. Focused on scaling enterprise teams with data-driven decisions.',
  skills: [
    { name: 'ERP Strategy', level: 92, color: 'bg-blue-600' },
    { name: 'Process Automation', level: 84, color: 'bg-emerald-500' },
    { name: 'Data Analytics', level: 90, color: 'bg-violet-500' },
    { name: 'Team Leadership', level: 88, color: 'bg-amber-500' },
    { name: 'Vendor Management', level: 76, color: 'bg-cyan-500' },
  ],
  languages: ['English (Fluent)', 'Tamil (Native)', 'Hindi (Conversational)'],
};

// API Endpoints — replace empty strings with actual endpoints when provided
  const API_ENDPOINTS = {
    profile: '',        // e.g., '/profile' or '/api/user/profile'
    password: '/auth/change-password',       // Backend endpoint for password change
    avatar: '',         // e.g., '/profile/avatar' or '/api/user/avatar'
  };

const ProfileContent = () => {
  // Load the signed-in user (stored on login) or fall back to a demo profile
  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem('ec_erp_user');
      if (raw) {
        const u = JSON.parse(raw);
        if (u.name || u.email) return u;
      }
    } catch {
      // ignore malformed storage
    }
    return null;
  };

  const stored = getStoredUser();

  const [user, setUser] = useState({
    name: stored?.name || DEFAULT_PROFILE.name,
    email: stored?.email || DEFAULT_PROFILE.email,
    picture: stored?.picture || DEFAULT_PROFILE.picture,
    role: DEFAULT_PROFILE.role,
    department: DEFAULT_PROFILE.department,
    location: DEFAULT_PROFILE.location,
    phone: DEFAULT_PROFILE.phone,
    company: DEFAULT_PROFILE.company,
    joined: DEFAULT_PROFILE.joined,
    bio: DEFAULT_PROFILE.bio,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarError, setAvatarError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const fileInputRef = useRef(null);

  const [skills, setSkills] = useState(DEFAULT_PROFILE.skills);
  const [languages, setLanguages] = useState(DEFAULT_PROFILE.languages);

  // Fetch the profile from the API (GET /api/profile?email=...)
  // Falls back to the server's default profile when no email is known.
  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      try {
        const config = stored?.email ? { params: { email: stored.email } } : {};
        const endpoint = API_ENDPOINTS.profile || '/profile';
        const res = await api.get(endpoint, config);
        const data = res.data?.data;

        if (isMounted && data) {
          const { skills: fetchedSkills, languages: fetchedLanguages, ...profileFields } = data;
          setUser((prev) => ({ ...prev, ...profileFields }));
          if (Array.isArray(fetchedSkills) && fetchedSkills.length) setSkills(fetchedSkills);
          if (Array.isArray(fetchedLanguages) && fetchedLanguages.length) setLanguages(fetchedLanguages);
        }
      } catch (err) {
        // Keep local fallback data when the API is unavailable
        console.error('Failed to load profile:', err?.response?.data || err.message);
      }
    };

    fetchProfile();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Security / notification toggles
  const [toggles, setToggles] = useState({
    twoFactor: true,
    emailNotifs: true,
    weeklyDigest: false,
    securityAlerts: true,
  });

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setAvatarPreview(dataUrl);
      setAvatarError(false);
      setForm((f) => ({ ...f, picture: dataUrl }));
      setUser((prev) => ({ ...prev, picture: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const startEdit = () => {
    setForm({ ...user });
    setAvatarPreview('');
    setAvatarError(false);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setForm({ ...user });
    setAvatarPreview('');
    setAvatarError(false);
    setIsEditing(false);
  };

  const handleSave = async () => {
    const updated = { ...form, picture: avatarPreview || form.picture };

    if (!updated.email) {
      setSaveError('Email is required to save your profile');
      setTimeout(() => setSaveError(''), 3000);
      return;
    }

    setSaving(true);
    try {
      const payload = {
        email: updated.email,
        name: updated.name,
        picture: updated.picture,
        role: updated.role,
        department: updated.department,
        location: updated.location,
        phone: updated.phone,
        company: updated.company,
        joined: updated.joined,
        bio: updated.bio,
        skills,
        languages,
      };

      const endpoint = API_ENDPOINTS.profile || '/profile';
      const res = await api.put(endpoint, payload);
      const data = res.data?.data;

      // Sync UI with the saved document from the server
      const { skills: savedSkills, languages: savedLanguages, ...profileFields } = data || payload;
      setUser((prev) => ({ ...prev, ...profileFields }));
      if (Array.isArray(savedSkills) && savedSkills.length) setSkills(savedSkills);
      if (Array.isArray(savedLanguages) && savedLanguages.length) setLanguages(savedLanguages);

      // Keep the stored session user (name/email/picture) in sync
      try {
        const raw = localStorage.getItem('ec_erp_user');
        const storedUser = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          'ec_erp_user',
          JSON.stringify({ ...storedUser, name: profileFields.name, email: profileFields.email, picture: profileFields.picture })
        );
      } catch {
        // ignore malformed storage
      }

      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setSaveError(err?.response?.data?.message || 'Failed to save profile');
      setTimeout(() => setSaveError(''), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields');
      setTimeout(() => setPasswordError(''), 3000);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      setTimeout(() => setPasswordError(''), 3000);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirm password do not match');
      setTimeout(() => setPasswordError(''), 3000);
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('New password must be different from current password');
      setTimeout(() => setPasswordError(''), 3000);
      return;
    }

    setUpdatingPassword(true);
    setPasswordError('');
    setPasswordSuccess(false);

    try {
      const endpoint = API_ENDPOINTS.password || '/auth/change-password';
      await api.post(endpoint, {
        email: user.email,
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordSuccess(true);
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err?.response?.data?.message || 'Failed to update password');
      setTimeout(() => setPasswordError(''), 3000);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const fieldClass =
    'w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all';
  const labelClass = 'block text-[11px] font-semibold text-gray-600 mb-1.5 uppercase tracking-wider';

  const stats = [
    { icon: BriefcaseBusiness, color: 'text-blue-600 bg-blue-50', label: 'Projects Completed', value: '42' },
    { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', label: 'Tasks Completed', value: '128' },
    { icon: Award, color: 'text-amber-600 bg-amber-50', label: 'Years Experience', value: '6' },
    { icon: Star, color: 'text-purple-600 bg-purple-50', label: 'Performance Rating', value: '4.9' },
  ];

  const achievements = [
    { icon: Award, label: 'Top Performer 2025', color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { icon: Clock, label: '6 Years Club', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { icon: BadgeCheck, label: 'Cloud Certified', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { icon: Users, label: 'Team Builder', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  ];

  const activity = [
    { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', title: 'Completed weekly operations review', time: '2 hours ago' },
    { icon: BriefcaseBusiness, color: 'text-blue-600 bg-blue-50', title: 'Closed deal #CR-2041 worth <span>48,000</span>', time: '5 hours ago' },
    { icon: Users, color: 'text-cyan-600 bg-cyan-50', title: 'Added 3 employees to Engineering', time: 'Yesterday' },
    { icon: Award, color: 'text-amber-600 bg-amber-50', title: 'Updated Q3 financial forecast', time: '2 days ago' },
    { icon: MessageSquare, color: 'text-purple-600 bg-purple-50', title: 'Resolved support ticket #SUP-118', time: '3 days ago' },
  ];

  const sessions = [
    { device: 'This laptop', detail: 'Windows 11 · Chrome · Chennai, IN', current: true },
    { device: 'iPhone 15 Pro', detail: 'iOS 18 · Safari · Last active 3h ago', current: false },
  ];

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your personal information, security, and account preferences.
          </p>
        </div>
        <button
          onClick={() => user.email && navigator.clipboard?.writeText(user.email)}
          className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-sm w-fit transition-colors"
          title="Share profile"
        >
          <Share2 size={14} />
          <span>Share Profile</span>
        </button>
      </div>

      {/* COVER / HERO */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 shadow-sm bg-white">
        <div className="relative h-44 sm:h-52 md:h-60 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.7) 0, transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.6) 0, transparent 35%)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -bottom-20 -right-12 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -top-16 -left-10 w-48 h-48 rounded-full bg-indigo-500/15 blur-3xl" />
          <div className="absolute -bottom-8 left-1/3 w-40 h-40 rounded-full bg-violet-500/10 blur-2xl" />

          <button className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-3.5 py-1.5 rounded-full shadow-sm transition-all cursor-pointer">
            <Crown size={13} className="text-amber-300" />
            <span>Enterprise Member</span>
          </button>
        </div>

        {/* Profile header body */}
        <div className="px-6 sm:px-8 pb-6 -mt-16 sm:-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            {/* Avatar */}
            <div className="relative shrink-0 -mt-4 sm:-mt-0">
              <div className="w-30 h-30 sm:w-34 sm:h-34 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gray-100 ring-2 ring-blue-100">
                {!avatarError && avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : avatarPreview ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Users size={48} />
                  </div>
                ) : user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Users size={48} />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow-md shadow-blue-500/30 transition-all cursor-pointer"
                title="Change profile picture"
              >
                <Camera size={15} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Online" />
            </div>

            {/* Employee Details */}
            <div className="flex-1 min-w-0 pt-28 sm:pt-0 mt-28">
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                <BadgeCheck size={20} className="text-blue-600 shrink-0" />
              </div>

              {/* Role badge */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-violet-600/10 border border-blue-200 px-3 py-1.5 rounded-full mb-3">
                <Crown size={12} className="text-blue-600" />
                <span className="text-xs font-bold text-blue-700">{user.role}</span>
                <span className="text-gray-300">·</span>
                <span className="text-xs font-semibold text-gray-600">{user.department}</span>
              </div>

              {/* Status badge */}
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 border ml-5 border-emerald-200 px-3 py-1 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse" />
                Active now
              </span>

              {/* Bio */}
              <div className="mt-3 p-4 bg-gradient-to-r from-gray-50/80 to-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">{user.bio}</p>
              </div>

              {/* Contact info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <MapPin size={13} className="text-gray-400 shrink-0" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Building2 size={13} className="text-gray-400 shrink-0" />
                  <span>{user.company}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <CalendarDays size={13} className="text-gray-400 shrink-0" />
                  <span>Joined {user.joined}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Mail size={13} className="text-gray-400 shrink-0" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            {/* Edit / Save actions */}
            <div className="shrink-0">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className={`flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/30 transition-all ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
                  >
                    <Save size={14} />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <X size={14} />
                    <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={startEdit}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <Pencil size={14} />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className={`p-2.5 rounded-xl ${s.color} shrink-0`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-800 leading-none">{s.value}</p>
                <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <BadgeCheck size={16} />
                </div>
                <h3 className="text-base font-bold text-gray-900">Personal Information</h3>
              </div>
              <p className="text-xs text-gray-400 ml-9 mt-1.5">Your basic information and contact details.</p>
            </div>
            <div className="p-6">
              {isEditing ? (
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Full Name</label>
                    <input
                      className={fieldClass}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      className={fieldClass}
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="you@evo-erp.com"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      className={fieldClass}
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      className={fieldClass}
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input
                      className={fieldClass}
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                      placeholder="e.g. Operations Director"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Department</label>
                    <input
                      className={fieldClass}
                      value={form.department}
                      onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                      placeholder="e.g. Enterprise Suite"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      className={fieldClass}
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Member Since</label>
                    <input
                      className={fieldClass}
                      value={form.joined}
                      onChange={(e) => setForm((f) => ({ ...f, joined: e.target.value }))}
                      placeholder="e.g. January 2022"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>About</label>
                    <textarea
                      className={`${fieldClass} resize-none`}
                      rows="3"
                      value={form.bio}
                      onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Full Name</p>
                    <p className="text-sm font-semibold text-gray-800 mt-1">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Phone</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.location}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Job Title</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.role}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Department</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.department}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Member Since</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.joined}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Company</p>
                    <p className="text-sm font-medium text-gray-800 mt-1">{user.company}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">About</p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{user.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills &amp; Proficiency */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <Award size={16} />
                </div>
                <h3 className="text-base font-bold text-gray-900">Skills &amp; Proficiency</h3>
              </div>
              <p className="text-xs text-gray-400 ml-9 mt-1.5">Core competencies and tools.</p>
            </div>
            <div className="p-6 space-y-5">
              {isEditing ? (
                <>
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <input
                          className={fieldClass}
                          value={skill.name}
                          placeholder="Skill name"
                          onChange={(e) =>
                            setSkills(
                              skills.map((s, j) =>
                                j === i ? { ...s, name: e.target.value } : s
                              )
                            )
                          }
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-16 text-right text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl px-3 py-2 ml-3"
                          value={skill.level}
                          onChange={(e) =>
                            setSkills(
                              skills.map((s, j) =>
                                j === i ? { ...s, level: parseInt(e.target.value) || 0 } : s
                              )
                            )
                          }
                        />
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${skill.color}`} style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}

                  <div className="pt-5 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Languages size={14} className="text-gray-400" /> Languages
                    </h4>
                    <input
                      className={fieldClass}
                      value={languages.join(', ')}
                      placeholder="Enter languages separated by commas"
                      onChange={(e) =>
                        setLanguages(
                          e.target.value
                            .split(',')
                            .map((l) => l.trim())
                            .filter((l) => l)
                        )
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-700">{skill.name}</span>
                        <span className="text-[11px] font-bold text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${skill.color}`} style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}

                  <div className="pt-5 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Languages size={14} className="text-gray-400" /> Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0">
                    <History size={16} />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
                </div>
                <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                  View all <ChevronRight size={13} />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1.5">Your latest account actions.</p>
            </div>
            <div className="p-2">
              {activity.map((act, i) => {
                const Icon = act.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 px-4 border-b border-gray-50 last:border-0"
                  >
                    <span className={`p-2 rounded-lg shrink-0 ${act.color}`}>
                      <Icon size={15} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{act.title}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{act.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* ACCOUNT SECURITY */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-rose-50 text-rose-600 shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <h3 className="text-base font-bold text-gray-900">Account Security</h3>
              </div>
              <p className="text-xs text-gray-400 ml-9 mt-1.5">
                Manage your password, devices, and security preferences.
              </p>
            </div>
            <div className="p-6 space-y-6">
              {/* Two-Factor Auth Toggle */}
              {/* <div className="flex items-center justify-between py-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 mt-0.5">
                    <Fingerprint size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Two-Factor Authentication</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Add an extra security step at sign-in.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('twoFactor')}
                  className={`relative inline-flex h-5 w-10 items-center rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer ${
                    toggles.twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  title={toggles.twoFactor ? 'Turn off 2FA' : 'Turn on 2FA'}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                      toggles.twoFactor ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div> */}

              {/* Change Password */}
              <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <KeyRound size={14} className="text-gray-400" /> Change Password
                </h4>
                <div className="space-y-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Current password"
                    className={`${fieldClass} ${passwordError && passwordError.includes('Current') ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password"
                    className={`${fieldClass} ${passwordError && passwordError.includes('New') ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    className={`${fieldClass} ${passwordError && passwordError.includes('match') ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''}`}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  />
                  {passwordError && (
                    <p className="text-[11px] text-rose-600 flex items-center gap-1">
                      <X size={12} />
                      {passwordError}
                    </p>
                  )}
                  {passwordSuccess && (
                    <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      Password updated successfully!
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      <span>{showPassword ? 'Hide' : 'Show'} password</span>
                    </button>
                    <button
                      onClick={handlePasswordUpdate}
                      disabled={updatingPassword || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                      className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer ${
                        updatingPassword || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword
                          ? 'opacity-60 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {updatingPassword ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              {/* <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Smartphone size={14} className="text-gray-400" /> Active Sessions
                </h4>
                <div className="space-y-3">
                  {sessions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`p-1.5 rounded-lg ${
                            s.current
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-500 border border-gray-200'
                          }`}
                        >
                          <Smartphone size={15} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{s.device}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{s.detail}</p>
                        </div>
                      </div>
                      {s.current ? (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      ) : (
                        <button className="text-[10px] font-semibold text-rose-600 hover:underline cursor-pointer">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer">
                  <LogOut size={14} />
                  Sign out all sessions
                </button>
              </div> */}
            </div>
          </div>

          {/* NOTIFICATIONS */}
          {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Bell size={16} />
                </div>
                <h3 className="text-base font-bold text-gray-900">Notifications</h3>
              </div>
              <p className="text-xs text-gray-400 ml-9 mt-1.5">Choose what updates you receive.</p>
            </div>
            <div className="p-6 space-y-1">
              {[
                { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Security prompts for new devices and logins', icon: Fingerprint, iconColor: 'text-blue-600 bg-blue-50' },
                { key: 'emailNotifs', label: 'Email Notifications', desc: 'Product updates and weekly summaries', icon: Mail, iconColor: 'text-emerald-600 bg-emerald-50' },
                { key: 'securityAlerts', label: 'Security Alerts', desc: 'Critical events like new sign-in attempts', icon: ShieldCheck, iconColor: 'text-rose-600 bg-rose-50' },
                { key: 'weeklyDigest', label: 'Weekly Executive Digest', desc: 'Monday summary of revenue, headcount, and deals', icon: Sparkles, iconColor: 'text-amber-600 bg-amber-50' },
              ].map((n) => {
                const Icon = n.icon;
                return (
                  <div
                    key={n.key}
                    className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${n.iconColor}`}>
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{n.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(n.key)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer ${
                        toggles[n.key] ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                      title={toggles[n.key] ? 'Turn off' : 'Turn on'}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                          toggles[n.key] ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div> */}

          {/* ACHIEVEMENTS */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0">
                  <Crown size={16} />
                </div>
                <h3 className="text-base font-bold text-gray-900">Achievements &amp; Badges</h3>
              </div>
              <p className="text-xs text-gray-400 ml-9 mt-1.5">Milestones you have unlocked.</p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-3">
              {achievements.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${a.color} flex flex-col items-center text-center gap-2 transition-all hover:scale-105`}
                  >
                    <Icon size={22} />
                    <span className="text-[10px] font-bold">{a.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save toast */}
        {saved && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg shadow-emerald-600/30">
            <CheckCircle2 size={16} />
            <span>Profile updated successfully!</span>
          </div>
        )}

        {/* Save error toast */}
        {saveError && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-rose-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg shadow-rose-600/30">
            <X size={16} />
            <span>{saveError}</span>
          </div>
        )}
      </div>

      {/* Action Bar (shown only in edit mode) */}
      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg shadow-gray-900/5 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Pencil size={14} />
              <span>Editing profile — changes will be saved to your account</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={cancelEdit}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <X size={14} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/30 transition-all ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <Save size={14} />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
