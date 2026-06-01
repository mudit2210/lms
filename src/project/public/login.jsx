import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [activeRole, setActiveRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSsoModal, setShowSsoModal] = useState(false);
  const [ssoStep, setSsoStep] = useState(1);
  const [ssoUsername, setSsoUsername] = useState('');
  const [ssoOtp, setSsoOtp] = useState('');
  const [isSsoLoading, setIsSsoLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const rolesList = [
    { value: 'student', label: 'Trainee / Learner', desc: 'Access classrooms & training programs', color: '#059669', bg: 'bg-emerald-500', light: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { value: 'faculty', label: 'Trainer / Faculty', desc: 'Manage classrooms & grade assessments', color: '#2563eb', bg: 'bg-blue-600', light: 'bg-blue-50 text-blue-700 border-blue-200' },
    { value: 'admin', label: 'Administrator', desc: 'System control, users & configurations', color: '#dc2626', bg: 'bg-red-600', light: 'bg-red-50 text-red-700 border-red-200' },
    { value: 'course-director', label: 'Course Director', desc: 'Approve nominations & publish courses', color: '#7c3aed', bg: 'bg-violet-600', light: 'bg-violet-50 text-violet-700 border-violet-200' },
    { value: 'course-coordinator', label: 'Course Coordinator', desc: 'Enroll trainees & review analytics', color: '#0891b2', bg: 'bg-cyan-600', light: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
    { value: 'warden', label: 'Warden', desc: 'Allocate hostels & manage leaves', color: '#d97706', bg: 'bg-amber-500', light: 'bg-amber-50 text-amber-700 border-amber-200' },
    { value: 'cms', label: 'Content Manager', desc: 'Manage announcements & website assets', color: '#9333ea', bg: 'bg-purple-600', light: 'bg-purple-50 text-purple-700 border-purple-200' },
  ];

  const activeRoleObj = rolesList.find(r => r.value === activeRole) || rolesList[2];

  const getIdLabel = () => {
    switch (activeRole) {
      case 'student': return { label: 'Enrollment No. / Email', placeholder: 'LMS/2026/041 or email@gov.in' };
      case 'faculty': return { label: 'Employee Code / Email', placeholder: 'FAC-2026-892 or email@gov.in' };
      case 'admin': return { label: 'Admin ID', placeholder: 'admin' };
      case 'course-director': return { label: 'Director ID / Email', placeholder: 'CDR-2026-551 or email@gov.in' };
      case 'course-coordinator': return { label: 'Coordinator ID / Email', placeholder: 'CCO-2026-340 or email@gov.in' };
      case 'warden': return { label: 'Warden ID / Email', placeholder: 'WRD-2026-102 or email@gov.in' };
      case 'cms': return { label: 'CMS Manager ID / Email', placeholder: 'CMS-2026-081 or email@gov.in' };
      default: return { label: 'Email / User ID', placeholder: 'your.id@gov.in' };
    }
  };

  const getRoleCleanName = (role) => rolesList.find(r => r.value === role)?.label || 'User';

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all required fields.'); return; }
    setError('');
    setIsLoading(true);
    if (activeRole === 'admin') {
      if (email.toLowerCase().trim() !== 'admin' || password !== '123') {
        setIsLoading(false);
        setError("Invalid credentials. Use ID: 'admin' and Password: '123'.");
        return;
      }
    }
    setTimeout(() => {
      setIsLoading(false);
      const userObj = { email, role: activeRole, name: getRoleCleanName(activeRole) + ' User' };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      if (activeRole === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    }, 1400);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirmPassword) { setError('Please fill in all fields.'); return; }
    if (regPassword !== regConfirmPassword) { setError('Passwords do not match.'); return; }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirmPassword('');
      setIsRegistering(false);
    }, 1500);
  };

  const handleSsoNext = (e) => {
    e.preventDefault();
    if (!ssoUsername) { alert('Please enter your government email or Parichay username.'); return; }
    setIsSsoLoading(true);
    setTimeout(() => { setIsSsoLoading(false); setSsoStep(2); }, 1000);
  };

  const handleSsoVerify = (e) => {
    e.preventDefault();
    if (!ssoOtp) { alert('Please enter the OTP verification code.'); return; }
    setIsSsoLoading(true);
    setTimeout(() => {
      setIsSsoLoading(false);
      const userObj = { email: ssoUsername.includes('@') ? ssoUsername : `${ssoUsername}@gov.in`, role: activeRole, name: `${getRoleCleanName(activeRole)} (SSO)` };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      setShowSsoModal(false);
      navigate('/');
    }, 1500);
  };

  const handleSocialLogin = (platform) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userObj = { email: `${activeRole}.${platform}@gmail.com`, role: activeRole, name: `${getRoleCleanName(activeRole)} (${platform})` };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      if (activeRole === 'admin') navigate('/admin/dashboard');
      else navigate('/');
    }, 1200);
  };

  const idInfo = getIdLabel();
  const roleColor = activeRoleObj.color;

  const RoleIcon = ({ role, size = 'w-4 h-4' }) => {
    const icons = {
      student: <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m0-7l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />,
      faculty: <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      admin: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
      'course-director': <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
      'course-coordinator': <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
      warden: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
      cms: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    };
    return <svg className={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{icons[role]}</svg>;
  };

  return (
    <div className="min-h-[calc(100vh-145px)] flex font-sans antialiased bg-slate-50 select-none">
      {/* ── LEFT PANEL: Branding ── */}
      <div
        className="hidden lg:flex lg:w-1/2 2xl:w-[45%] flex-col justify-between relative overflow-hidden shrink-0"
        style={{ background: 'linear-gradient(135deg, #042d25 0%, #063b31 40%, #031b16 100%)' }}
      >
        {/* Decorative mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${roleColor}, transparent 70%)`, transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${roleColor}, transparent 70%)`, transform: 'translate(-30%, 30%)' }} />
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="w-full max-w-lg xl:max-w-xl mx-auto flex flex-col justify-center gap-8 lg:gap-12 h-full relative z-10 py-6">
          {/* Top: Logo */}
          <div className="px-8 lg:px-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: roleColor }}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-black text-lg tracking-tight leading-none">ISS Academy</p>
                <p className="text-slate-400 text-[11px] font-semibold tracking-widest uppercase mt-0.5">MoSPI · LMS Portal</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase mb-3 border" style={{ color: roleColor, borderColor: roleColor + '40', background: roleColor + '15' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: roleColor }}></span>
                  Secure Government Platform
                </div>
                <h1 className="text-3xl xl:text-4xl font-black text-white leading-tight tracking-tight">
                  India's Premier<br />
                  <span style={{ color: roleColor }}>Statistical</span><br />
                  Training Hub
                </h1>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
                Unified learning management system for ISS officers, faculty, and administrative staff of the Ministry of Statistics & Programme Implementation.
              </p>
            </div>
          </div>

          {/* Middle: Stats */}
          <div className="px-8 lg:px-12">
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '2,400+', label: 'Officers Trained' },
                { val: '140+', label: 'Active Courses' },
                { val: '46th', label: 'ISS Batch' },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-xl font-black text-white">{s.val}</p>
                  <p className="text-slate-400 text-[9px] font-semibold mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Quote */}
          <div className="px-8 lg:px-12 pt-4 border-t border-white/5">
            <div className="flex items-center gap-3 mb-3">
              {/* National Flag bar */}
              <div className="flex h-5 overflow-hidden rounded" style={{ width: '36px' }}>
                <div className="flex-1" style={{ background: '#FF9933' }} />
                <div className="flex-1 bg-white" />
                <div className="flex-1" style={{ background: '#138808' }} />
              </div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Government of India</p>
            </div>
            <p className="text-slate-400 text-xs font-medium leading-relaxed italic">
              "Statistical excellence through continuous learning and professional development."
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Form ── */}
      <div className="flex-1 lg:w-1/2 flex flex-col items-center justify-center px-6 py-6 lg:py-8 overflow-y-auto">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2.5 mb-8">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: roleColor }}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z" />
            </svg>
          </div>
          <p className="text-slate-800 font-black text-lg">ISS Academy LMS</p>
        </div>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-5">
            <h2 className="text-2xl font-black text-[#08493d] tracking-tight">
              {isRegistering ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-emerald-700/80 text-sm font-medium mt-1.5">
              {isRegistering
                ? 'Register to access LMS learning services.'
                : 'Sign in to access your secure workspace.'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-xs font-semibold">
              <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* ── ROLE SELECTOR ── */}
          <div className="mb-4 relative">
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">Sign In As</label>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white border-2 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm"
              style={{ borderColor: isDropdownOpen ? roleColor : '#e2e8f0' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: roleColor }}>
                  <RoleIcon role={activeRole} size="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[#08493d] font-extrabold text-sm leading-none">{activeRoleObj.label}</p>
                  <p className="text-emerald-700/60 text-[10px] font-medium mt-0.5">{activeRoleObj.desc}</p>
                </div>
              </div>
              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-30 py-2 overflow-hidden animate-fadeIn">
                  <p className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-100 mb-1">Select Role</p>
                  {rolesList.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => { setActiveRole(r.value); setIsDropdownOpen(false); setError(''); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all cursor-pointer ${activeRole === r.value ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                    >
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: r.color }}>
                        <RoleIcon role={r.value} size="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#08493d] font-extrabold text-xs leading-none">{r.label}</p>
                        <p className="text-emerald-700/60 text-[10px] font-medium mt-0.5 truncate">{r.desc}</p>
                      </div>
                      {activeRole === r.value && (
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} style={{ color: r.color }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ── LOGIN FORM ── */}
          {!isRegistering && (
            <form onSubmit={handleLogin} className="space-y-3">
              {/* ID Field */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">{idInfo.label}</label>
                <div className="relative">
                  <input
                    type="text" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={idInfo.placeholder} autoComplete="username"
                    className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-900 transition-all"
                    style={{ '--focus-color': roleColor }}
                    onFocus={e => e.target.style.borderColor = roleColor}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-600">Password</label>
                  <a href="#forgot" className="text-xs font-bold hover:underline transition-colors" style={{ color: roleColor }}>Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password" autoComplete="current-password"
                    className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none transition-all"
                    onFocus={e => e.target.style.borderColor = roleColor}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors">
                    {showPassword ? (
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all cursor-pointer ${rememberMe ? 'border-transparent' : 'border-slate-300 bg-white'}`}
                    style={rememberMe ? { background: roleColor, borderColor: roleColor } : {}}
                  >
                    {rememberMe && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Keep me signed in</span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit" disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                style={{ background: isLoading ? '#94a3b8' : `linear-gradient(135deg, ${roleColor}, ${roleColor}dd)` }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In as {activeRoleObj.label}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-slate-200" />
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-widest whitespace-nowrap">Or sign in with</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              {/* Gov SSO Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Janparichay', badge: 'NIC', badgeColor: 'bg-slate-100 text-slate-600', action: () => { setShowSsoModal(true); setSsoStep(1); setSsoUsername(''); setSsoOtp(''); } },
                  { label: 'e-Pramaan', badge: 'GOV', badgeColor: 'bg-blue-50 text-blue-700', action: () => handleSocialLogin('epramaan') },
                  { label: 'Aadhaar OTP', badge: 'UIDAI', badgeColor: 'bg-emerald-50 text-emerald-700', action: () => { const u = prompt('Enter Aadhaar Number:'); if (u) { const o = prompt('Enter OTP:'); if (o) handleSocialLogin('aadhaar'); } } },
                  { label: 'DSC eSign', badge: 'CCA', badgeColor: 'bg-violet-50 text-violet-700', action: () => handleSocialLogin('dsc') },
                ].map(b => (
                  <button key={b.label} type="button" onClick={b.action}
                    className="flex items-center gap-2 px-3 py-2.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-sm hover:shadow">
                    <span className="flex-1 text-left truncate">{b.label}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${b.badgeColor}`}>{b.badge}</span>
                  </button>
                ))}
              </div>

              {/* Google + Apple */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                <button type="button" onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer shadow-sm hover:shadow">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" onClick={() => handleSocialLogin('apple')}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-900 hover:bg-black border border-slate-900 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-sm hover:shadow">
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.27-.58 2.98-1.42z" />
                  </svg>
                  <span>Apple</span>
                </button>
              </div>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {isRegistering && (
            <form onSubmit={handleRegister} className="space-y-3">
              {/* Role selector already shown above */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">Full Name</label>
                <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="e.g. Priya Mehta"
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = roleColor} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1.5">{idInfo.label}</label>
                <input type="text" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder={idInfo.placeholder}
                  className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none transition-all"
                  onFocus={e => e.target.style.borderColor = roleColor} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Password</label>
                  <div className="relative">
                    <input type={showRegPassword ? 'text' : 'password'} value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="Create password"
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none transition-all"
                      onFocus={e => e.target.style.borderColor = roleColor} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                    <button type="button" onClick={() => setShowRegPassword(!showRegPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1.5">Confirm</label>
                  <input type={showRegPassword ? 'text' : 'password'} value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} placeholder="Repeat password"
                    className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-800 placeholder-slate-300 focus:outline-none transition-all"
                    onFocus={e => e.target.style.borderColor = roleColor} onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              </div>
              <button type="submit" disabled={isLoading}
                className="w-full py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70"
                style={{ background: `linear-gradient(135deg, ${roleColor}, ${roleColor}cc)` }}>
                {isLoading ? (
                  <><svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Creating Account...</>
                ) : <>Create Account <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></>}
              </button>
            </form>
          )}

          {/* Toggle login/register */}
          <p className="text-center text-xs font-semibold text-slate-500 mt-5">
            {isRegistering ? (
              <>Already have an account?{' '}
                <button type="button" onClick={() => { setIsRegistering(false); setError(''); }} className="font-extrabold hover:underline" style={{ color: roleColor }}>Sign in</button>
              </>
            ) : (
              <>Don't have an account?{' '}
                <button type="button" onClick={() => { setIsRegistering(true); setError(''); }} className="font-extrabold hover:underline" style={{ color: roleColor }}>Register</button>
              </>
            )}
          </p>

          {/* Footer */}
          <p className="text-center text-[10px] text-slate-400 font-medium mt-6">
            Protected under NIC Secure Gov Infrastructure ·{' '}
            <a href="#support" className="hover:underline" style={{ color: roleColor }}>Need help?</a>
          </p>
        </div>
      </div>

      {/* ── JANPARICHAY SSO MODAL ── */}
      {showSsoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
            <div className="h-1 flex">
              <div className="flex-1 bg-[#FF9933]" /><div className="flex-1 bg-white border-y border-slate-100" /><div className="flex-1 bg-[#138808]" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-black text-slate-900 text-base">Janparichay SSO</h3>
                  <p className="text-slate-400 text-xs font-medium mt-0.5">NIC Government Identity Gateway</p>
                </div>
                <button onClick={() => setShowSsoModal(false)} className="text-slate-300 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              {ssoStep === 1 ? (
                <form onSubmit={handleSsoNext} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Government Email / Parichay ID</label>
                    <input type="text" value={ssoUsername} onChange={e => setSsoUsername(e.target.value)} placeholder="your.name@gov.in"
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-slate-900 transition-all" />
                  </div>
                  <button type="submit" disabled={isSsoLoading}
                    className="w-full py-3 bg-slate-900 hover:bg-black text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all">
                    {isSsoLoading ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Verifying...</> : 'Send OTP →'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSsoVerify} className="space-y-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-600">
                    OTP sent to mobile linked with <strong>{ssoUsername}</strong>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5">Enter 6-digit OTP</label>
                    <input type="text" value={ssoOtp} onChange={e => setSsoOtp(e.target.value)} placeholder="• • • • • •" maxLength={6}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-center tracking-widest focus:outline-none focus:border-slate-900 transition-all" />
                  </div>
                  <button type="submit" disabled={isSsoLoading}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 transition-all">
                    {isSsoLoading ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Verifying OTP...</> : '✓ Verify & Sign In'}
                  </button>
                  <button type="button" onClick={() => setSsoStep(1)} className="w-full text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors py-1">← Back</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS MODAL ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2">Registration Submitted!</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">Your registration has been submitted for admin review. You'll receive an email confirmation once approved.</p>
            <button onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-black text-white font-extrabold text-sm rounded-xl transition-all">
              Back to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}