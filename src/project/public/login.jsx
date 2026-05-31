import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'faculty', 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Janparichay SSO Modal States
  const [showSsoModal, setShowSsoModal] = useState(false);
  const [ssoStep, setSsoStep] = useState(1); // 1: Username, 2: OTP/Password
  const [ssoUsername, setSsoUsername] = useState('');
  const [ssoOtp, setSsoOtp] = useState('');
  const [isSsoLoading, setIsSsoLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      const userObj = {
        email: email,
        role: activeRole,
        name: activeRole.charAt(0).toUpperCase() + activeRole.slice(1) + ' User'
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      console.log(`Log in as ${activeRole}:`, userObj);
      navigate('/');
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
        name: `${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)} (SSO)`
      };
      localStorage.setItem('user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('auth-change'));
      setShowSsoModal(false);
      alert(`Successfully logged in via Janparichay SSO as ${activeRole.toUpperCase()}!`);
      navigate('/');
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
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-gray-150 relative z-10 animate-fadeIn">
        
        {/* Card Header Branding */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem of India" 
              className="h-10 w-auto object-contain"
            />
            <div className="text-left">
              <h1 className="text-[10px] font-extrabold text-slate-500 tracking-wider uppercase leading-none">
                GOVERNMENT OF INDIA
              </h1>
              <h2 className="text-xs font-bold text-[#8B2635] tracking-tight uppercase leading-tight mt-0.5">
                Ministry of Statistics & PI
              </h2>
            </div>
          </div>
          
          <h3 className="text-xl font-extrabold text-[#08493d] mt-4 font-sans tracking-tight">
            LMS Academy Portal
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Sign in to access your classroom, learning repository, or administrative tools.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1 text-xs font-bold text-slate-500">
          <button
            type="button"
            onClick={() => { setActiveRole('student'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              activeRole === 'student'
                ? 'bg-white text-emerald-800 shadow-sm border border-emerald-50/50'
                : 'hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
            </svg>
            Student
          </button>
          
          <button
            type="button"
            onClick={() => { setActiveRole('faculty'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              activeRole === 'faculty'
                ? 'bg-white text-blue-800 shadow-sm border border-blue-50/50'
                : 'hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Faculty
          </button>
          
          <button
            type="button"
            onClick={() => { setActiveRole('admin'); setError(''); }}
            className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
              activeRole === 'admin'
                ? 'bg-white text-rose-800 shadow-sm border border-rose-50/50'
                : 'hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin
          </button>
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
              <span className="absolute right-3.5 top-2.5 text-slate-400">
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
                Forgot Password?
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
                className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
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
              <span>Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}</span>
            )}
          </button>
        </form>

        {/* Separator / SSO indicator */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or Secure Sign In via</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Janparichay SSO Button */}
        <button
          type="button"
          onClick={() => {
            setShowSsoModal(true);
            setSsoStep(1);
            setSsoUsername('');
            setSsoOtp('');
          }}
          className="w-full py-2.5 px-4 bg-white border border-gray-300 rounded-lg text-slate-700 font-bold text-xs hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08493d] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <span className="w-5 h-5 flex items-center justify-center bg-[#08493d]/5 rounded">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#08493d]" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          <span>Login with Janparichay (SSO)</span>
        </button>

        {/* Footer Support Info */}
        <div className="pt-2 border-t border-gray-100 text-center text-xs font-semibold text-slate-500">
          Need assistance? <a href="#support" className="text-[#08493d] hover:underline">Contact Academy Support</a>
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
                className="text-slate-300 hover:text-white focus:outline-none"
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

                  <div className="flex justify-between items-center text-[10px] text-slate-400">
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
            <div className="bg-slate-50 p-4 text-[9px] text-slate-400 text-center font-semibold uppercase tracking-wider border-t border-gray-100">
              National Informatics Centre (NIC) • Ministry of Electronics & IT
            </div>
          </div>
        </div>
      )}
    </div>
  );
}