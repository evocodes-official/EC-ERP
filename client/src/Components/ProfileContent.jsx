import React, { useState, useRef } from 'react';
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
  GraduationCap,
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
} from 'lucide-react';

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
    name: stored?.name || 'Arjun Mehta',
    email: stored?.email || 'arjun.mehta@evocodes.com',
    picture:
      stored?.picture ||
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    role: 'Operations Director',
    department: 'Enterprise Suite',
    location: 'Chennai, Tamil Nadu, India',
    phone: '+91 98765 43210',
    company: 'EvoCodes Pvt. Ltd.',
    joined: 'January 2022',
    bio: 'Product-minded operations leader who loves turning complex workflows into simple, elegant systems. Focused on scaling enterprise teams with data-driven decisions.',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...user });
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const fileInputRef = useRef(null);

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
      setAvatarPreview(reader.result);
      setForm((f) => ({ ...f, picture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const startEdit = () => {
    setForm({ ...user });
    setAvatarPreview('');
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setForm({ ...user });
    setAvatarPreview('');
    setIsEditing(false);
  };

  const handleSave = () => {
    setUser({ ...form, picture: avatarPreview || form.picture });
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fieldClass =
    'w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all';
  const labelClass = 'block text-xs font-semibold text-gray-700 mb-1';

  const stats = [
    { icon: BriefcaseBusiness, color: 'text-blue-600 bg-blue-50', label: 'Projects Completed', value: '42' },
    { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', label: 'Tasks Completed', value: '128' },
    { icon: Award, color: 'text-amber-600 bg-amber-50', label: 'Years Experience', value: '6' },
    { icon: Star, color: 'text-purple-600 bg-purple-50', label: 'Performance Rating', value: '4.9' },
  ];

    const [skills, setSkills] = useState([
    { name: 'ERP Strategy', level: 92, color: 'bg-blue-600' },
    { name: 'Process Automation', level: 84, color: 'bg-emerald-500' },
    { name: 'Data Analytics', level: 90, color: 'bg-violet-500' },
    { name: 'Team Leadership', level: 88, color: 'bg-amber-500' },
    { name: 'Vendor Management', level: 76, color: 'bg-cyan-500' },
  ]);

  const achievements = [
    { icon: Award, label: 'Top Performer 2025', color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { icon: Clock, label: '6 Years Club', color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { icon: BadgeCheck, label: 'Cloud Certified', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { icon: Users, label: 'Team Builder', color: 'bg-purple-50 text-purple-600 border-purple-100' },
  ];

  const activity = [
    { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', title: 'Completed weekly operations review', time: '2 hours ago' },
    { icon: BriefcaseBusiness, color: 'text-blue-600 bg-blue-50', title: 'Closed deal #CR-2041 worth ₹48,000', time: '5 hours ago' },
    { icon: Users, color: 'text-cyan-600 bg-cyan-50', title: 'Added 3 employees to Engineering', time: 'Yesterday' },
    { icon: Award, color: 'text-amber-600 bg-amber-50', title: 'Updated Q3 financial forecast', time: '2 days ago' },
    { icon: MessageSquare, color: 'text-purple-600 bg-purple-50', title: 'Resolved support ticket #SUP-118', time: '3 days ago' },
  ];

  const sessions = [
    { device: 'This laptop', detail: 'Windows 11 · Chrome · Chennai, IN', current: true },
    { device: 'iPhone 15 Pro', detail: 'iOS 18 · Safari · Last active 3h ago', current: false },
  ];

    const [languages, setLanguages] = useState(['English (Fluent)', 'Tamil (Native)', 'Hindi (Conversational)']);
return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-16">
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
          className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 shadow-sm w-fit"
          title="Share profile"
        >
          <Share2 size={14} />
          <span>Share Profile</span>
        </button>
      </div>

      {/* COVER */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
        <div className="relative h-40 sm:h-48 md:h-56 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.6) 0, transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 0, transparent 35%)',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute -bottom-16 -right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -top-12 -left-8 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <button className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm hover:bg-white/25 transition-colors cursor-pointer">
            <Crown size={13} className="text-amber-300" />
            <span>Enterprise Member</span>
          </button>
        </div>

        {/* Profile header body */}
        <div className="px-5 sm:px-8 pb-6 -mt-14 sm:-mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gray-100">
                <img
                  src={avatarPreview || user.picture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                {!avatarPreview && !user.picture && (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Users size={48} />
                  </div>
                )}
              </div>
              {/* Camera edit button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl shadow-md shadow-blue-500/30 transition-colors cursor-pointer"
                title="Change profile picture"
              >
                <Camera size={15} />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              <span className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" title="Online" />
            </div>

            <div className="flex-1 min-w-0 pt-2 sm:pt-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                <BadgeCheck size={18} className="text-blue-600" />
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-600 mt-0.5">
                {user.role} · {user.department}
              </p>
              <p className="text-xs text-gray-500 mt-2 max-w-2xl leading-relaxed">{user.bio}</p>

              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gray-400" /> {user.location}</span>
                <span className="flex items-center gap-1.5"><Building2 size={13} className="text-gray-400" /> {user.company}</span>
                <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-gray-400" /> Joined {user.joined}</span>
              </div>
            </div>

            {/* Edit / Save actions */}
            <div className="shrink-0 pt-2 sm:pt-0">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-md shadow-blue-500/30 transition-all cursor-pointer"
                  >
                    <Save size={14} /> <span>Save</span>
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center space-x-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <X size={14} /> <span>Cancel</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={startEdit}
                  className="flex items-center space-x-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                >
                  <Pencil size={14} /> <span>Edit Profile</span>
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
            <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${s.color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xl font-black text-gray-800 leading-none">{s.value}</p>
                <p className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wide">{s.label}</p>
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Personal Information</h3>
              <p className="text-xs text-gray-400">Your basic information and contact details.</p>
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
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      className={fieldClass}
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      className={fieldClass}
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input
                      className={fieldClass}
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Job Title</label>
                    <input
                      className={fieldClass}
                      value={form.role}
                      onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Department</label>
                    <input
                      className={fieldClass}
                      value={form.department}
                      onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      className={fieldClass}
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Bio</label>
                    <textarea
                      className={`${fieldClass} resize-none`}
                      rows="3"
                      value={form.bio}
                      onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
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
          {/* Skills */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Skills & Proficiency</h3>
              <p className="text-xs text-gray-400">Core competencies and tools.</p>
            </div>
            <div className="p-6 space-y-5">
              {isEditing ? (
                <>
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <input
                          className={fieldClass}
                          value={skill.name}
                          placeholder="Skill name"
                          onChange={(e) => setSkills(skills.map((s, j) => j === i ? { ...s, name: e.target.value } : s))}
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="w-16 text-right text-sm font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1"
                          value={skill.level}
                          onChange={(e) => setSkills(skills.map((s, j) => j === i ? { ...s, level: parseInt(e.target.value) || 0 } : s))}
                        />
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Languages size={14} className="text-gray-400" /> Languages
                    </h4>
                    <input
                      className={fieldClass}
                      value={languages.join(', ')}
                      placeholder="Enter languages separated by commas"
                      onChange={(e) => setLanguages(e.target.value.split(',').map(l => l.trim()).filter(l => l))}
                    />
                  </div>
                </>
              ) : (
                <>
                  {skills.map((skill, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-semibold text-gray-700">{skill.name}</span>
                        <span className="text-[11px] font-bold text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${skill.color}`} style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Languages size={14} className="text-gray-400" /> Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((lang, i) => (
                        <span key={i} className="text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
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
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <History size={16} className="text-gray-400" /> Recent Activity
                </h3>
                <p className="text-xs text-gray-400">Your latest account actions.</p>
              </div>
              <button className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                View all <ChevronRight size={13} />
              </button>
            </div>
            <div className="p-6 space-y-1">
              {activity.map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-3 py-2.5 border-b border-gray-50 last:border-0">
                    <span className={`p-2 rounded-lg ${act.color}`}>
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
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* ACCOUNT SECURITY */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Account Security</h3>
              <p className="text-xs text-gray-400">Manage your password, devices, and security preferences.</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <KeyRound size={14} className="text-gray-400" /> Change Password
                </h4>
                <div className="space-y-3">
                  <input type="password" placeholder="Current password" className={fieldClass} />
                  <input type="password" placeholder="New password" className={fieldClass} />
                  <input type="password" placeholder="Confirm new password" className={fieldClass} />
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl shadow-md shadow-blue-500/20 transition-all cursor-pointer">
                    Update Password
                  </button>
                </div>
              </div>

              {/* ACTIVE SESSIONS (commented out) */}
              {/* <div>
                <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <Smartphone size={14} className="text-gray-400" /> Active Sessions
                </h4>
                <div className="space-y-2.5">
                  {sessions.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-1.5 rounded-lg ${s.current ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 border border-gray-200'}`}>
                          <Smartphone size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-800">{s.device}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{s.detail}</p>
                        </div>
                      </div>
                      {s.current && (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer">
                  <LogOut size={14} /> Sign out
                </button>
              </div> */}
            </div>
          </div>

          {/* NOTIFICATIONS (commented out) */}
          {/*
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <Bell size={16} className="text-gray-400" /> Notifications
                </h3>
              <p className="text-xs text-gray-400">Choose what updates you receive.</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Require an extra security step at sign-in', icon: Fingerprint },
                { key: 'emailNotifs', label: 'Email Notifications', desc: 'Product updates and weekly summaries', icon: Mail },
                { key: 'securityAlerts', label: 'Security Alerts', desc: 'Critical events like new sign-in attempts', icon: ShieldCheck },
                { key: 'marketing', label: 'Product Updates & Tips', desc: 'Occasional announcements for new features', icon: Sparkles },
              ].map((n) => {
                const Icon = n.icon;
                return (
                  <div key={n.key} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-50 text-gray-600">
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{n.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{n.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggle(n.key)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                        toggles[n.key] ? 'bg-blue-600 justify-end' : 'bg-gray-200 justify-start'
                      }`}
                      title={toggles[n.key] ? 'Turn off' : 'Turn on'}
                    >
                      <span className="w-4 h-4 bg-white rounded-full shadow-sm transition-all" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          */}
{/* ACHIEVEMENTS */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="px-6 py-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <GraduationCap size={16} className="text-gray-400" /> Achievements & Badges
              </h3>
              <p className="text-xs text-gray-400">Milestones you've unlocked.</p>
            </div>
            <div className="p-6 grid grid-cols-2 gap-3">
              {achievements.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className={`p-3 rounded-xl border ${a.color} flex flex-col items-center text-center gap-1.5`}>
                    <Icon size={20} />
                    <span className="text-[10px] font-bold">{a.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Save toast */}
        {saved && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg shadow-emerald-600/30">
            <CheckCircle2 size={15} />
            <span>Profile updated successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
