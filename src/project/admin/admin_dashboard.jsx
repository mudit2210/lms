import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : { name: 'Admin Administrator', email: 'admin@mospi.gov.in', role: 'admin' };
    } catch {
      return { name: 'Admin Administrator', email: 'admin@mospi.gov.in', role: 'admin' };
    }
  });

  // Dynamic status states for simulated console activity
  const [cpuUsage, setCpuUsage] = useState(14);
  const [systemLogs, setSystemLogs] = useState([
    { id: 'SYS-001', time: '10 mins ago', type: 'INFO', msg: 'Governance Queue: scanned 5 files, signatures secure.', operator: 'KMS Engine' },
    { id: 'SYS-002', time: '25 mins ago', type: 'SUCCESS', msg: 'e-Hostel check-in: room allotment 104 assigned to Trainee 042.', operator: 'Warden console' },
    { id: 'SYS-003', time: '1 hour ago', type: 'WARN', msg: 'Audit log exported: administrative summary generated.', operator: 'Priya Singh' },
    { id: 'SYS-004', time: '2 hours ago', type: 'INFO', msg: 'System checkpoint: daily database replication verified.', operator: 'Backup Daemon' }
  ]);

  // Simulate CPU usage variation for micro-animations
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const change = Math.floor(Math.random() * 5) - 2;
        const next = prev + change;
        return next > 30 ? 25 : next < 5 ? 8 : next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'faculty': return 'Trainer / Faculty';
      case 'student': return 'Trainee / Learner';
      case 'course-director': return 'Course Director';
      case 'course-coordinator': return 'Course Coordinator';
      case 'warden': return 'Warden';
      case 'cms': return 'Content Manager';
      default: return role || 'User';
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex font-sans text-slate-800 antialiased select-none">
      
      {/* 1. Sidebar Navigation (Left Panel) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-68 bg-[#053229] text-white flex flex-col border-r border-[#031b16] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 h-screen shrink-0 shadow-xl`}>
        
        {/* Sidebar Header Title */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#03251e]">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span className="inline-block w-3.5 h-3.5 bg-yellow-400 rounded-xs animate-pulse"></span>
              LMS Console
            </h2>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">Admin Control Gate</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-450 hover:text-white hover:bg-white/5 focus:outline-none"
            aria-label="Close Admin Menu"
          >
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Account Profile Card embedded beautifully */}
        <div className="p-5 border-b border-white/5 bg-gradient-to-br from-[#063f33]/90 to-[#042d25]/90 m-4 rounded-xl border border-white/10 shadow-inner">
          <div className="flex items-center gap-3">
            {/* Avatar block with HSL gradient border */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#053229] rounded-[10px] flex items-center justify-center font-black text-lg text-white">
                {user.name?.[0] || 'A'}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-white font-extrabold text-sm truncate leading-tight">{user.name}</p>
              <p className="text-emerald-400/80 text-[10px] font-bold truncate mt-0.5">{user.email}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/65 border border-emerald-800/80 text-[9px] font-extrabold text-emerald-300 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              {getRoleLabel(user.role)}
            </span>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Central Management</p>
          
          <button
            onClick={() => { navigate('/admin/dashboard'); setIsSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5 text-blue-200 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Command Dashboard</span>
          </button>

          <button
            onClick={() => { navigate('/admin/e-hostel'); setIsSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>e-Hostel Logistics</span>
          </button>

          <button
            onClick={() => { navigate('/admin/kms'); setIsSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Knowledge (KMS)</span>
          </button>

          <button
            onClick={() => { navigate('/admin/users'); setIsSidebarOpen(false); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>User Accounts</span>
          </button>

          <div className="border-t border-white/5 my-4 pt-4 space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3">System Actions</p>
            
            <button
              onClick={() => { navigate('/'); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-350 hover:bg-white/5 hover:text-white transition-all cursor-pointer text-left"
            >
              <svg className="w-4 h-4 text-slate-450 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Public Site</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-rose-300 hover:bg-rose-900/20 hover:text-rose-200 transition-all cursor-pointer text-left"
            >
              <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Sign Out console</span>
            </button>
          </div>
        </nav>

        {/* Footer Support Helpbox */}
        <div className="p-4 border-t border-white/5 bg-[#03211b] text-xs font-semibold">
          <p className="text-slate-450 leading-normal">System Version 3.1.5</p>
          <p className="text-emerald-400/70 text-[10px] mt-0.5">Gov-Secure Active Sandbox</p>
        </div>
      </aside>

      {/* 2. Main Dashboard Content deck */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* Top Header Panel */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-35 shadow-xs">
          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Open Admin Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                👤 Admin Command Console
              </h1>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">National Statistical Training Academy (NSSTA) • Portal Management Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#eff7f5] text-[#08493d] border border-emerald-250 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live Sandbox Server
            </span>
          </div>
        </header>

        {/* Dashboard Main deck Grid */}
        <main className="flex-grow p-6 space-y-6">
          
          {/* Welcome Dashboard Hero Header banner */}
          <div className="bg-gradient-to-r from-[#08493d] to-[#0d6b5c] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome, {user.name}!</h2>
              <p className="text-emerald-100 text-xs sm:text-sm font-semibold max-w-xl leading-relaxed">
                This is the LMS Administrative Command Portal. Manage logistics workflows for **e-Hostel Allotment**, **KMS central archives**, learning courses tree builders, and trainee database access control points.
              </p>
            </div>
            {/* Visual Glassmorphic Widget showing CPU and clock */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 shrink-0 w-full md:w-56 text-left select-none relative z-10">
              <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Gateway Monitor</p>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-3xl font-black tracking-tighter">99.9%</span>
                <span className="text-xs text-emerald-200 font-extrabold uppercase">Uptime CDN</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-emerald-100 font-bold border-t border-white/10 pt-2.5">
                <span>CPU load: {cpuUsage}%</span>
                <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-400 transition-all duration-500 rounded-full" 
                    style={{ width: `${cpuUsage}%` }}
                  />
                </div>
              </div>
            </div>
            {/* Decorative background vectors */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none rounded-r-2xl"></div>
          </div>

          {/* Quick Metrics Statistics Bar Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Enrolled Users</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">1,248</p>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block mt-2">
                ↑ +12% this week
              </span>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">KMS Central Drive Assets</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">142 Files</p>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mt-2">
                ✓ 5 wing libraries
              </span>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">e-Hostel Room Allotments</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">78 / 100</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3.5">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Syllabi Modules</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">24 Modules</p>
              <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100 inline-block mt-2">
                ✓ MoSPI Compliant
              </span>
            </div>

          </div>

          {/* Primary Main Modules Cards Grid (The Core Requested Panels) */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Card 1: e-Hostel Logistics Dashboard Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col group text-left">
              {/* Premium Gradient Top Cap */}
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-700"></div>
              
              <div className="p-6 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-850 border border-emerald-200 rounded-full">
                    Hostel & logistics
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-850">e-Hostel Logistics & Allocation Portal</h3>
                  <p className="text-xs text-slate-450 leading-relaxed font-semibold">
                    Comprehensive logistics operations for Trainees check-in and check-out cycles. Manage room allotment registers, fee receipt collections, scheduling venues, classroom allocations, transport tracking, and ticket maintenance.
                  </p>
                </div>

                {/* Module Metrics grid inside card */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Occupancy Register</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">78 Allocated Rooms</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Maintenance Desk</p>
                    <p className="text-sm font-extrabold text-rose-700 mt-1">3 Active Tickets</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payments Track</p>
                    <p className="text-sm font-extrabold text-emerald-700 mt-1">92% Collected</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Fleet</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">8 Transport Buses</p>
                  </div>
                </div>
              </div>

              {/* Enter Module trigger */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex justify-end">
                <button
                  onClick={() => navigate('/admin/e-hostel')}
                  className="px-5 py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Enter e-Hostel Portal
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 2: Knowledge Management Portal (KMS) Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col group text-left">
              {/* Premium Gradient Top Cap */}
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
              
              <div className="p-6 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-800 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-blue-100 text-blue-850 border border-blue-200 rounded-full">
                    KMS & Syllabus
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-800 group-hover:text-blue-900">Knowledge Management Portal (KMS)</h3>
                  <p className="text-xs text-slate-450 leading-relaxed font-semibold">
                    Centralized Course & Content Management system built for MoSPI academic wings. Features LCMS file upload repositories, Drag & Drop course syllabus hierarchy trees, Peer discussion forum categories, Draft governance queues, and audit trails.
                  </p>
                </div>

                {/* Module Metrics grid inside card */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Central LCMS Drive</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">142 Uploaded Assets</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Governance Drafts</p>
                    <p className="text-sm font-extrabold text-yellow-750 mt-1">5 Pending Approvals</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">P2P Forums</p>
                    <p className="text-sm font-extrabold text-blue-850 mt-1">24 Active Threads</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Curriculum Outline</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">12 Syllabi Packages</p>
                  </div>
                </div>
              </div>

              {/* Enter Module trigger */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex justify-end">
                <button
                  onClick={() => navigate('/admin/kms')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Enter KMS Portal
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* User Directory quick console card (Whole Width block) */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row items-center p-6 gap-6 text-left group">
            <div className="w-14 h-14 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center text-purple-700 shrink-0 group-hover:scale-105 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            
            <div className="flex-grow space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-slate-800">MoSPI Trainees & Accounts Directory</h3>
                <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-200 rounded-full">
                  Access Management
                </span>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed font-semibold">
                Control user account profiles and credentials database files. Manage roles assignment configuration scopes (Super Admins, Content Managers, Trainers, Course Directors, Wardens, Trainee Learners).
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 font-bold pt-1">
                <span>👑 System Admins: <strong>6 Accounts</strong></span>
                <span>🎓 Faculty: <strong>42 Accounts</strong></span>
                <span>📖 Active Trainees: <strong>1,200 Accounts</strong></span>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/users')}
              className="w-full md:w-auto px-5 py-3 bg-purple-650 hover:bg-purple-750 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
            >
              Manage Accounts Directory
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Simulated System Activity Terminal Log & Uptime widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Terminal Activity Log table */}
            <div className="lg:col-span-2 bg-[#021814] border border-[#043329] rounded-2xl p-6 text-left font-mono text-emerald-400 shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-[#043329] pb-3 mb-4 select-none">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-ping"></span>
                  Console Terminal Activity Stream
                </p>
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                </div>
              </div>

              <div className="space-y-3.5 text-xs overflow-x-auto">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 hover:bg-[#03211b] p-1.5 rounded transition-colors">
                    <span className="text-slate-500 shrink-0 font-bold select-none">{log.time}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-black tracking-wider uppercase select-none ${
                      log.type === 'SUCCESS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      log.type === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-900 text-slate-350 border border-slate-700'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-slate-450 shrink-0 font-bold font-sans">[{log.operator}]</span>
                    <span className="text-emerald-100 font-sans font-semibold leading-normal">{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health Indicators */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-left flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Gateway Integrations Health</h4>
                
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Relational Database Server
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      ONLINE
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Gov-Secure Firewall Shield
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      SECURED & SAFE
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Document Storage CDN
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      99.98% HEALTHY
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Email Notification Engine
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      CONNECTED
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-4 select-none">
                <p className="text-[10px] font-bold text-slate-400 leading-normal">
                  All systems operating at peak performance levels under standard cryptographic safety policies.
                </p>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
}
