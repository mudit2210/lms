import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'faculty', 'admin', 'course-director', 'course-coordinator', 'warden', 'cms'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Custom Role Select State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Janparichay SSO Modal States
  const [showSsoModal, setShowSsoModal] = useState(false);
  const [ssoStep, setSsoStep] = useState(1); // 1: Username, 2: OTP/Password
  const [ssoUsername, setSsoUsername] = useState('');
  const [ssoOtp, setSsoOtp] = useState('');
  const [isSsoLoading, setIsSsoLoading] = useState(false);

  const navigate = useNavigate();

  const getRoleCleanName = (role) => {
    switch (role) {
      case 'student': return 'Trainee / Learner';
      case 'faculty': return 'Trainer / Faculty';
      case 'admin': return 'Admin';
      case 'course-director': return 'Course Director';
      case 'course-coordinator': return 'Course Coordinator';
      case 'warden': return 'Warden';
      case 'cms': return 'Content Manager (CMS)';
      default: return 'User';
    }
  };

  const rolesList = [
    { 
      value: 'student', 
      label: 'Trainee / Learner', 
      desc: 'Access training programs, lessons, and attempt quizzes', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
        </svg>
      )
    },
    { 
      value: 'faculty', 
      label: 'Trainer / Faculty', 
      desc: 'Manage classrooms, uploads, and grade trainee assessments', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      value: 'admin', 
      label: 'Admin', 
      desc: 'Configure systems, allocate rooms, and manage users', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      value: 'course-director', 
      label: 'Course Director', 
      desc: 'Approve trainee nominations and publish official courses', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      value: 'course-coordinator', 
      label: 'Course Coordinator', 
      desc: 'Enroll trainees, schedule venues, and review analytics', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    { 
      value: 'warden', 
      label: 'Warden', 
      desc: 'Allocate e-hostels and manage trainee leaves', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    { 
      value: 'cms', 
      label: 'Content Manager (CMS)', 
      desc: 'Manage academy announcements and website assets', 
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    // Validate admin credentials specifically
    if (activeRole === 'admin') {
      const normalizedEmail = email.toLowerCase().trim();
      if (normalizedEmail !== 'admin' || password !== '123') {
        setIsLoading(false);
        setError("Invalid Admin credentials. Use username 'admin' and password '123'.");
        return;
      }
    }
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      const userObj = {
        email: email,
        role: activeRole,
        name: getRoleCleanName(activeRole) + ' User'
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      console.log(`Log in as ${activeRole}:`, userObj);
      
      if (activeRole === 'admin') {
        navigate('/admin/e-hostel');
      } else {
        navigate('/');
      }
    }, 1500);
  };

  // Simulate Janparichay SSO Login flow
  const handleSsoNext = (e) => {
    e.preventDefault();
    if (!ssoUsername) {
      alert('Please enter your government email or Parichay username.');
      return;
    }
    setIsSsoLoading(true);
    setTimeout(() => {
      setIsSsoLoading(false);
      setSsoStep(2);
    }, 1000);
  };

  const handleSsoVerify = (e) => {
    e.preventDefault();
    if (!ssoOtp) {
      alert('Please enter the OTP verification code.');
      return;
    }
    setIsSsoLoading(true);
    setTimeout(() => {
      setIsSsoLoading(false);
      const userObj = {
        email: ssoUsername.includes('@') ? ssoUsername : `${ssoUsername}@gov.in`,
        role: activeRole,
        name: `${getRoleCleanName(activeRole)} (SSO)`
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      setShowSsoModal(false);
      alert(`Successfully logged in via Janparichay SSO as ${getRoleCleanName(activeRole)}!`);
      navigate('/');
    }, 1500);
  };

  const handleSocialLogin = (platform) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userObj = {
        email: `${activeRole}.${platform}@gmail.com`,
        role: activeRole,
        name: `${getRoleCleanName(activeRole)} (${platform === 'google' ? 'Google' : 'Apple'})`
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      alert(`Successfully signed in using secure ${platform === 'google' ? 'Google' : 'Apple'} SSO!`);
      if (activeRole === 'admin') navigate('/admin/e-hostel');
      else navigate('/');
    }, 1200);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    // Basic validation
    if (!regName || !regEmail || !regPassword || !regConfirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setIsLoading(true);
    // Simulate registration request
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccessModal(true);
      // Reset registration form
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
      setIsRegistering(false);
    }, 1500);
  };
  const getRolePlaceholder = () => {
    switch (activeRole) {
      case 'student':
        return {
          idLabel: 'Enrollment Number / Email',
          idPlaceholder: 'e.g. LMS/2026/041',
          bgAccent: 'from-emerald-600 to-teal-800',
          ringAccent: 'focus:ring-emerald-600',
          btnBg: 'bg-[#08493d] hover:bg-[#063b31]'
        };
      case 'faculty':
        return {
          idLabel: 'Employee Code / Email',
          idPlaceholder: 'e.g. FAC-2026-892',
          bgAccent: 'from-blue-600 to-indigo-800',
          ringAccent: 'focus:ring-blue-600',
          btnBg: 'bg-blue-800 hover:bg-blue-900'
        };
      case 'admin':
        return {
          idLabel: 'Admin ID / Email',
          idPlaceholder: 'e.g. ADM-992-SYS',
          bgAccent: 'from-rose-600 to-red-800',
          ringAccent: 'focus:ring-rose-600',
          btnBg: 'bg-rose-800 hover:bg-rose-900'
        };
      case 'course-director':
        return {
          idLabel: 'Director ID / Email',
          idPlaceholder: 'e.g. CDR-2026-551',
          bgAccent: 'from-indigo-650 to-violet-800',
          ringAccent: 'focus:ring-indigo-600',
          btnBg: 'bg-indigo-800 hover:bg-indigo-900'
        };
      case 'course-coordinator':
        return {
          idLabel: 'Coordinator ID / Email',
          idPlaceholder: 'e.g. CCO-2026-340',
          bgAccent: 'from-cyan-600 to-cyan-800',
          ringAccent: 'focus:ring-cyan-600',
          btnBg: 'bg-cyan-800 hover:bg-cyan-900'
        };
      case 'warden':
        return {
          idLabel: 'Warden ID / Email',
          idPlaceholder: 'e.g. WRD-2026-102',
          bgAccent: 'from-amber-600 to-amber-800',
          ringAccent: 'focus:ring-amber-600',
          btnBg: 'bg-amber-700 hover:bg-amber-850'
        };
      case 'cms':
        return {
          idLabel: 'CMS Manager ID / Email',
          idPlaceholder: 'e.g. CMS-2026-081',
          bgAccent: 'from-purple-650 to-purple-800',
          ringAccent: 'focus:ring-purple-600',
          btnBg: 'bg-purple-800 hover:bg-purple-900'
        };
      default:
        return {
          idLabel: 'Email Address',
          idPlaceholder: 'enter your email',
          bgAccent: 'from-emerald-600 to-teal-800',
          ringAccent: 'focus:ring-emerald-600',
          btnBg: 'bg-[#08493d] hover:bg-[#063b31]'
        };
    }
  };

  const roleDetails = getRolePlaceholder();

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#08493d]/10 rounded-full blur-3xl"></div>
      
      {/* Login Card */}
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-150 relative z-10 animate-fadeIn overflow-hidden">
        {/* National Tricolor Top Ribbon */}
        <div className="w-full h-1.5 flex absolute top-0 left-0 right-0">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>

        <div className="p-8 sm:p-10 space-y-6">
        
        {/* Card Header Branding */}
        <div className="text-center space-y-2">
         
          <h3 className="text-xl font-extrabold text-[#08493d] mt-4 font-sans tracking-tight">
            LMS Academy Portal
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to access your classroom, learning repository, or administrative tools.
          </p>
        </div>

        {/* User Role Selection - Premium Custom Dropdown Option */}
        <div className="space-y-1.5 text-left font-semibold relative">
          <label className="block text-xs font-bold text-slate-700">
            Sign In Role / User Type
          </label>
          
          {/* Custom Select Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full border-2 border-[#08493d] rounded-xl px-3.5 py-2.5 bg-slate-50 text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-emerald-700/20 focus:border-[#08493d] transition-all flex items-center justify-between cursor-pointer shadow-inner text-xs sm:text-sm active:scale-[0.99] duration-100"
          >
            <div className="flex items-center gap-3 select-none">
              <div className="text-[#08493d] bg-[#eff7f5] p-1.5 rounded-lg border border-emerald-100/50">
                {rolesList.find(r => r.value === activeRole)?.icon}
              </div>
              <span className="font-extrabold text-slate-800 text-[13px] sm:text-sm">
                {getRoleCleanName(activeRole)}
              </span>
            </div>
            <span className={`text-emerald-800 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              <svg className="w-4.5 h-4.5 animate-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>

          {/* Click-away overlay to close dropdown */}
          {isDropdownOpen && (
            <div className="fixed inset-0 z-20 cursor-default" onClick={() => setIsDropdownOpen(false)} />
          )}

          {/* Custom Dropdown Option Panel Overlay */}
          {isDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-[#08493d]/20 rounded-2xl shadow-2xl py-2.5 z-30 max-h-[300px] overflow-y-auto scrollbar-none animate-fadeIn border-t-2 border-t-[#08493d]">
              <div className="px-3.5 pb-1.5 mb-1.5 border-b border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <span>Select User Type</span>
                <span>{rolesList.length} options</span>
              </div>
              <div className="space-y-0.5 px-1.5">
                {rolesList.map((roleOption) => {
                  const isSelected = activeRole === roleOption.value;
                  return (
                    <button
                      key={roleOption.value}
                      type="button"
                      onClick={() => {
                        setActiveRole(roleOption.value);
                        setIsDropdownOpen(false);
                        setError('');
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-[#eff7f5]/80 text-[#08493d] border border-emerald-100/50'
                          : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-1.5 rounded-lg border ${
                          isSelected 
                            ? 'text-emerald-800 bg-emerald-100/50 border-emerald-250' 
                            : 'text-slate-450 bg-slate-100/70 border-slate-200/50'
                        }`}>
                          {roleOption.icon}
                        </div>
                        <div className="min-w-0">
                          <p className={`font-extrabold text-[12.5px] sm:text-xs leading-none ${isSelected ? 'text-[#08493d]' : 'text-slate-800'}`}>
                            {roleOption.label}
                          </p>
                          <p className="text-[10px] text-slate-450 font-medium truncate mt-1 max-w-[200px] sm:max-w-[250px]">
                            {roleOption.desc}
                          </p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <span className="text-emerald-850 shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
            <svg className="w-4.5 h-4.5 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              {roleDetails.idLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={roleDetails.idPlaceholder}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${roleDetails.ringAccent} focus:border-transparent transition-all font-medium`}
              />
              <span className="absolute right-3.5 top-2.5 text-slate-450">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <a href="#forgot" className="text-xs font-bold text-[#08493d] hover:text-emerald-700 transition-colors">
                Forgot Password/Username?
              </a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${roleDetails.ringAccent} focus:border-transparent transition-all font-medium`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-2.5 text-slate-450 hover:text-slate-650 transition-colors focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#08493d] focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-600">
              Keep me logged in on this device
            </label>
          </div>

           {/* Register New User Link */}
           <div className="text-center mt-2">
             <button type="button" onClick={() => setIsRegistering(true)} className="text-sm text-[#08493d] hover:underline">
               Register new user
             </button>
           </div>
           {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 px-4 ${roleDetails.btnBg} text-white font-bold text-xs rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              <span>Sign In as {getRoleCleanName(activeRole)}</span>
            )}
          </button>
        </form>

        {/* Separator / SSO indicator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-450 font-bold uppercase tracking-wider">Or Secure Sign In via</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Dynamic Multi-Option SSO Grid */}
        <div className="space-y-4">
        {isRegistering && (
          <div className="p-8 sm:p-10 space-y-6">
            {/* Registration Form */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-extrabold text-[#08493d] mt-4 font-sans tracking-tight">Create New Account</h3>
              <p className="text-xs text-slate-500 font-medium">Register to access LMS services.</p>
            </div>
            {/* Role Selection Reuse */}
            <div className="space-y-1.5 text-left font-semibold relative mb-4">
              <label className="block text-xs font-bold text-slate-700">Account Role</label>
              <button type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full border-2 border-[#08493d] rounded-xl px-3.5 py-2.5 bg-slate-50 text-slate-800 font-bold focus:outline-none focus:ring-4 focus:ring-emerald-700/20 focus:border-[#08493d] transition-all flex items-center justify-between cursor-pointer shadow-inner text-xs sm:text-sm active:scale-[0.99] duration-100">
                <div className="flex items-center gap-3 select-none">
                  <div className="text-[#08493d] bg-[#eff7f5] p-1.5 rounded-lg border border-emerald-100/50">
                    {rolesList.find(r => r.value === activeRole)?.icon}
                  </div>
                  <span className="font-extrabold text-slate-800 text-[13px] sm:text-sm">
                    {getRoleCleanName(activeRole)}
                  </span>
                </div>
                <span className={`text-emerald-800 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                  <svg className="w-4.5 h-4.5 animate-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </div>
            <form onSubmit={handleRegister} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Full Name</label>
                <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder="John Doe"
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${roleDetails.ringAccent} focus:border-transparent transition-all font-medium`} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">{roleDetails.idLabel}</label>
                <input type="text" value={regEmail} onChange={e => setRegEmail(e.target.value)} placeholder={roleDetails.idPlaceholder}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${roleDetails.ringAccent} focus:border-transparent transition-all font-medium`} />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder="••••••••"
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${roleDetails.ringAccent} focus:border-transparent transition-all font-medium`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-450 hover:text-slate-650 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7..." />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12a10 10 0 0115.95-6.53" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Confirm Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} value={regConfirmPassword} onChange={e => setRegConfirmPassword(e.target.value)} placeholder="••••••••"
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 ${roleDetails.ringAccent} focus:border-transparent transition-all font-medium`} />
                </div>
              </div>
                <button type="submit" disabled={isLoading}
                  className={`w-full py-2.5 px-4 ${roleDetails.btnBg} text-white font-bold text-xs rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 mt-3`}>Register</button>
            </form>
            {/* Link back to login */}
            <div className="text-center mt-4">
              <button type="button" onClick={() => setIsRegistering(false)} className="text-[#08493d] font-bold hover:underline text-xs">Back to Sign In</button>
            </div>
          </div>
        )}
          
          {/* Government SSO Gateways Section */}
          <div className="space-y-2">
            <span className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Official Government Portals</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              
              {/* 1. Janparichay SSO */}
              <button
                type="button"
                onClick={() => {
                  setShowSsoModal(true);
                  setSsoStep(1);
                  setSsoUsername('');
                  setSsoOtp('');
                }}
                className="py-2.5 px-3 bg-white border border-gray-200 hover:border-slate-350 rounded-xl text-slate-700 font-bold text-[11px] hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer shadow-3xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 flex items-center justify-center bg-[#08493d]/5 rounded shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#08493d]" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </span>
                  <span className="truncate">Janparichay SSO</span>
                </div>
                <span className="text-[8px] bg-slate-100 text-slate-500 font-extrabold px-1 rounded shrink-0">NIC</span>
              </button>

              {/* 2. e-Pramaan SSO */}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    const userObj = {
                      email: `epramaan.${activeRole}@gov.in`,
                      role: activeRole,
                      name: `${getRoleCleanName(activeRole)} (e-Pramaan)`
                    };
                    localStorage.setItem('user', JSON.stringify(userObj));
                    window.dispatchEvent(new Event('auth-change'));
                    alert(`Successfully logged in via e-Pramaan SSO as ${getRoleCleanName(activeRole)}!`);
                    if (activeRole === 'admin') navigate('/admin/e-hostel');
                    else navigate('/');
                  }, 1200);
                }}
                className="py-2.5 px-3 bg-white border border-gray-200 hover:border-slate-350 rounded-xl text-slate-700 font-bold text-[11px] hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer shadow-3xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 flex items-center justify-center bg-blue-50 rounded shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-800" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-9 5h.01M15 12H9m12 .354a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </span>
                  <span className="truncate">e-Pramaan SSO</span>
                </div>
                <span className="text-[8px] bg-blue-50 text-blue-800 font-extrabold px-1 rounded shrink-0">GOV</span>
              </button>

              {/* 3. Aadhaar OTP */}
              <button
                type="button"
                onClick={() => {
                  const uid = prompt("Enter your 12-digit Aadhaar Number:", "9820-4100-3492");
                  if (uid) {
                    const otp = prompt("Enter 6-digit OTP sent to Aadhaar-linked mobile ending in *8920:");
                    if (otp) {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        const userObj = {
                          email: `${activeRole}.aadhaar@mospi.gov.in`,
                          role: activeRole,
                          name: `${getRoleCleanName(activeRole)} (Aadhaar Verified)`
                        };
                        localStorage.setItem('user', JSON.stringify(userObj));
                        window.dispatchEvent(new Event('auth-change'));
                        alert(`Successfully signed in using Aadhaar OTP Identity Validation!`);
                        if (activeRole === 'admin') navigate('/admin/e-hostel');
                        else navigate('/');
                      }, 1200);
                    }
                  }
                }}
                className="py-2.5 px-3 bg-white border border-gray-200 hover:border-slate-350 rounded-xl text-slate-700 font-bold text-[11px] hover:bg-slate-50 transition-all flex items-center justify-between cursor-pointer shadow-3xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 flex items-center justify-center bg-emerald-50 rounded shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11a5 5 0 00-10 0c0 1.25.2 2.454.57 3.58m3.16-10.04a8.99 8.99 0 00-.57 3.46M12 11a9 9 0 01-9 9m16.5-12c.38 1.126.5 2.428.5 3.5 0 2.29-.614 4.437-1.687 6.273M19.5 7.5a12.083 12.083 0 00-1.85-2.825" />
                    </svg>
                  </span>
                  <span className="truncate text-slate-800">Aadhaar OTP</span>
                </div>
                <span className="text-[8px] bg-emerald-100 text-emerald-800 font-extrabold px-1 rounded border border-emerald-250/50 shrink-0">UIDAI</span>
              </button>

              {/* 4. DSC smartcard / USB */}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    const userObj = {
                      email: `dsc.${activeRole}@gov.in`,
                      role: activeRole,
                      name: `${getRoleCleanName(activeRole)} (DSC Token)`
                    };
                    localStorage.setItem('user', JSON.stringify(userObj));
                    window.dispatchEvent(new Event('auth-change'));
                    alert(`Digital Signature Certificate (eSign USB Token) validated successfully! Logged in as ${getRoleCleanName(activeRole)}.`);
                    if (activeRole === 'admin') navigate('/admin/e-hostel');
                    else navigate('/');
                  }, 1200);
                }}
                className="py-2.5 px-3 bg-indigo-50/20 hover:bg-indigo-50/50 border border-indigo-100/80 hover:border-indigo-350 rounded-xl text-slate-700 font-bold text-[11px] transition-all flex items-center justify-between cursor-pointer shadow-3xs hover:-translate-y-0.5 duration-200"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 flex items-center justify-center bg-indigo-100/60 rounded shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-indigo-700" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <rect x="3" y="11" width="18" height="10" rx="2" />
                      <circle cx="12" cy="16" r="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                  </span>
                  <span className="truncate text-slate-800">DSC eSign Token</span>
                </div>
                <span className="text-[8px] bg-indigo-100 text-indigo-800 font-extrabold px-1 rounded border border-indigo-250/50 shrink-0">CCA</span>
              </button>
            </div>
          </div>

          {/* Social / Third-party SSO Identity Section */}
          <div className="space-y-2 pt-1.5 border-t border-slate-100">
            <span className="block text-[9px] font-black uppercase text-slate-400 tracking-widest text-left">Or Third-Party Secure SSO</span>
            <div className="grid grid-cols-2 gap-2.5">
              
              {/* Google SSO */}
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="py-2.5 px-3.5 bg-white border border-slate-200 hover:border-slate-350 hover:bg-slate-50/60 rounded-xl text-slate-700 font-extrabold text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:scale-[0.99] duration-200"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Google</span>
              </button>

              {/* Apple SSO */}
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="py-2.5 px-3.5 bg-black border border-black hover:bg-slate-850 rounded-xl text-white font-extrabold text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] duration-200"
              >
                <svg className="w-4 h-4 shrink-0 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.98 1.12.09 2.27-.58 2.98-1.42z"/>
                </svg>
                <span>Apple</span>
              </button>

            </div>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="pt-2 border-t border-gray-100 text-center text-xs font-semibold text-slate-500">
          Need assistance? <a href="#support" className="text-[#08493d] hover:underline">Contact Academy Support</a>
        </div>
        </div>
      </div>

      {/* 3. High-Fidelity Janparichay SSO Portal Modal */}
      {showSsoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4">
            
            {/* National Tricolor top bar */}
            <div className="w-full h-1.5 flex">
              <div className="flex-1 bg-[#FF9933]"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-[#138808]"></div>
            </div>

            {/* Modal Header */}
            <div className="bg-[#0b352e] text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                  alt="India Emblem" 
                  className="h-8 w-auto filter invert brightness-200"
                />
                <div>
                  <h4 className="text-[9px] font-bold tracking-widest text-[#FF9933] uppercase leading-none">राष्ट्रीय सूचना विज्ञान केंद्र</h4>
                  <h3 className="text-xs font-extrabold tracking-wide uppercase leading-normal text-white">Janparichay SSO Service</h3>
                </div>
              </div>
              <button 
                onClick={() => setShowSsoModal(false)}
                className="text-slate-350 hover:text-white focus:outline-none"
                aria-label="Close SSO Modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-5 text-xs sm:text-sm">
              <div className="text-center">
                <h3 className="text-[#0b352e] font-extrabold text-base">National Single Sign-On (NSSO)</h3>
                <p className="text-[11px] text-slate-500 font-medium">Verify your credentials to login securely to LMS.</p>
              </div>

              {ssoStep === 1 ? (
                /* Step 1: Username Input */
                <form onSubmit={handleSsoNext} className="space-y-4 font-semibold text-slate-600">
                  
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Govt Email ID / Mobile / Parichay Username
                    </label>
                    <input
                      type="text"
                      required
                      value={ssoUsername}
                      onChange={(e) => setSsoUsername(e.target.value)}
                      placeholder="e.g. mudit.sharma@gov.in"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-medium"
                    />
                  </div>

                  <div className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded border border-amber-200/50 text-[10px] text-amber-900 leading-normal font-medium">
                    <input type="checkbox" required defaultChecked className="mt-0.5 rounded border-gray-300 text-[#08493d] focus:ring-emerald-700" />
                    <span>I declare that I am logging in from an authorized government network node and agree to audit logging conditions.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSsoLoading}
                    className="w-full py-2.5 bg-[#0b352e] hover:bg-[#07241f] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    {isSsoLoading ? 'Authenticating...' : 'Send SSO Verification OTP'}
                  </button>
                </form>
              ) : (
                /* Step 2: OTP Verification */
                <form onSubmit={handleSsoVerify} className="space-y-4 font-semibold text-slate-600">
                  <div className="p-3 bg-emerald-50 text-emerald-950 border border-emerald-100 rounded-lg text-center space-y-1">
                    <p className="text-xs font-bold">✓ OTP Code Dispatched</p>
                    <p className="text-[10px] font-normal leading-normal text-emerald-800">
                      A secure OTP verification code has been dispatched to mobile linked with <strong className="text-emerald-950">{ssoUsername}</strong>.
                    </p>
                  </div>

                  <div className="space-y-1.5 text-center">
                    <label className="block text-xs font-bold text-slate-700">
                      Enter 6-Digit OTP Verification Code
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={ssoOtp}
                      onChange={(e) => setSsoOtp(e.target.value.replace(/\D/g,''))}
                      placeholder="e.g. 782910"
                      className="w-48 mx-auto border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-transparent font-mono text-center tracking-widest text-lg font-bold"
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-slate-450">
                    <span>Resend code in 45s</span>
                    <button type="button" onClick={() => alert('SSO OTP code resent!')} className="font-bold text-[#0b352e] hover:underline">Resend Now</button>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSsoStep(1)}
                      className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSsoLoading}
                      className="w-2/3 py-2.5 bg-[#0b352e] hover:bg-[#07241f] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs"
                    >
                      {isSsoLoading ? 'Verifying...' : 'Verify & Sign In'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 text-[9px] text-slate-450 text-center font-semibold uppercase tracking-wider border-t border-gray-100">
              National Informatics Centre (NIC) • Ministry of Electronics & IT
            </div>
          </div>
        </div>
      )}
    </div>
  );
}