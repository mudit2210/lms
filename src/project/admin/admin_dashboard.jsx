import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import TrainingModule from './modules/TrainingModule';
import EventsModule from './modules/EventsModule';
import TNAModule from './modules/TNAModule';
import BatchModule from './modules/BatchModule';
import AttendanceModule from './modules/AttendanceModule';
import AssignmentModule from './modules/AssignmentModule';
import CMSModule from './modules/CMSModule';

// Custom Reusable Expandable Sidebar Sub-menu Component
function SidebarExpandableMenu({
  title,
  tabKey,
  icon,
  isExpanded,
  onToggle,
  activeDashboardTab,
  activeSubTab,
  setActiveDashboardTab,
  setActiveSubTab,
  setIsSidebarOpen,
  subItems,
  theme
}) {
  return (
    <div className="space-y-1">
      <button
        onClick={() => {
          setActiveDashboardTab(tabKey);
          onToggle();
          if (activeSubTab === 'all' || !isExpanded) {
            setActiveSubTab('all');
          }
        }}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
          activeDashboardTab === tabKey 
            ? 'bg-blue-600 text-white shadow-md' 
            : theme === 'light'
              ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className={`shrink-0 ${activeDashboardTab === tabKey ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`}>
            {icon}
          </span>
          <span className={`${activeDashboardTab === tabKey ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>{title}</span>
        </div>
        <svg className={`w-4.5 h-4.5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className={`pl-4 space-y-1 border-l ml-6 py-1 text-left ${
          theme === 'light' ? 'border-slate-200' : 'border-white/10'
        }`}>
          {subItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveDashboardTab(tabKey);
                setActiveSubTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 rounded text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === item.id 
                  ? theme === 'light'
                    ? 'text-blue-650 font-bold bg-slate-100'
                    : 'text-yellow-400 font-bold bg-white/5' 
                  : theme === 'light'
                    ? 'text-slate-950 hover:text-black hover:bg-slate-50'
                    : 'text-slate-350 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

  // Dynamic theme state syncing across the ecosystem
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('admin-theme') || 'light';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('admin-theme', nextTheme);
    window.dispatchEvent(new Event('admin-theme-change'));
  };

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem('admin-theme') || 'light');
    };
    window.addEventListener('admin-theme-change', syncTheme);
    return () => window.removeEventListener('admin-theme-change', syncTheme);
  }, []);

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

  // State for new simulated academic modules
  const [activeWorkflowSteps, setActiveWorkflowSteps] = useState({
    training: 0,
    calendar: 0,
    tna: 0,
    group: 0,
    attendance: 0,
    assignment: 0
  });

  const [simulatedCounts, setSimulatedCounts] = useState({
    programs: 8,
    events: 5,
    tnaNeeds: 12,
    batches: 18,
    attendanceSessions: 45,
    assignments: 34
  });

  // Input States
  const [programInput, setProgramInput] = useState({ name: '', type: 'Induction Training' });
  const [eventInput, setEventInput] = useState({ name: '', type: 'Quiz Event' });
  const [tnaInput, setTnaInput] = useState({ dept: 'Department of Statistics', need: '' });

  const [activeDashboardTab, setActiveDashboardTab] = useState('console'); // console, training, events
  const [activeSubTab, setActiveSubTab] = useState('all'); // all, induction, refresher, domain, international, schedules, faculty, venues, training_cal, faculty_cal, trainee_cal, campus_events
  const [isTrainingMenuExpanded, setIsTrainingMenuExpanded] = useState(false);
  const [isEventsMenuExpanded, setIsEventsMenuExpanded] = useState(false);


  const incrementWorkflowStep = (moduleKey, maxSteps) => {
    setActiveWorkflowSteps(prev => {
      const nextStep = (prev[moduleKey] + 1) % maxSteps;
      
      const moduleNames = {
        training: 'Course & Training',
        calendar: 'Calendar & Events',
        tna: 'TNA Engine',
        group: 'Group & Batch',
        attendance: 'Attendance',
        assignment: 'Assignment Desk'
      };
      
      const newLog = {
        id: 'SYS-' + Date.now(),
        time: 'Just now',
        type: 'SUCCESS',
        msg: `Workflow progressed to step ${nextStep + 1} inside ${moduleNames[moduleKey]} Module.`,
        operator: user.name
      };
      setSystemLogs(logs => [newLog, ...logs.slice(0, 3)]);

      return {
        ...prev,
        [moduleKey]: nextStep
      };
    });
  };

  const handleCreateMockProgram = (e) => {
    e.preventDefault();
    if (!programInput.name) return;
    setSimulatedCounts(prev => ({ ...prev, programs: prev.programs + 1 }));
    
    const newLog = {
      id: 'SYS-' + Date.now(),
      time: 'Just now',
      type: 'INFO',
      msg: `Created new Training Program: ${programInput.name} (${programInput.type})`,
      operator: 'Academic Registry'
    };
    setSystemLogs(logs => [newLog, ...logs.slice(0, 3)]);
    
    alert(`Success! Simulated Program "${programInput.name}" created under ${programInput.type} with 1 Active Batch.`);
    setProgramInput({ name: '', type: 'Induction Training' });
  };

  const handleCreateMockEvent = (e) => {
    e.preventDefault();
    if (!eventInput.name) return;
    setSimulatedCounts(prev => ({ ...prev, events: prev.events + 1 }));
    
    const newLog = {
      id: 'SYS-' + Date.now(),
      time: 'Just now',
      type: 'SUCCESS',
      msg: `Published Event: "${eventInput.name}" (${eventInput.type})`,
      operator: 'Campus Event Board'
    };
    setSystemLogs(logs => [newLog, ...logs.slice(0, 3)]);
    
    alert(`Success! Published simulated event "${eventInput.name}". Open registration is now active for trainees.`);
    setEventInput({ name: '', type: 'Quiz Event' });
  };

  const handleCreateMockTna = (e) => {
    e.preventDefault();
    if (!tnaInput.need) return;
    setSimulatedCounts(prev => ({ ...prev, tnaNeeds: prev.tnaNeeds + 1 }));
    
    const newLog = {
      id: 'SYS-' + Date.now(),
      time: 'Just now',
      type: 'WARN',
      msg: `TNA Need Submitted from ${tnaInput.dept}: "${tnaInput.need}"`,
      operator: 'TNA Assessor'
    };
    setSystemLogs(logs => [newLog, ...logs.slice(0, 3)]);
    
    alert(`Success! Simulated TNA entry recorded from "${tnaInput.dept}" for "${tnaInput.need}". Pending review by Admin.`);
    setTnaInput({ dept: 'Department of Statistics', need: '' });
  };

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
    <div className={`w-full min-h-screen flex font-sans antialiased select-none transition-colors duration-200 ${
      theme === 'light' ? 'bg-slate-50 text-slate-800' : 'bg-slate-100 text-slate-800'
    }`}>

      {/* 1. Sidebar Navigation (Left Panel) */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-68 flex flex-col transform transition-all duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 h-screen shrink-0 shadow-xl ${
        theme === 'light'
          ? 'bg-slate-50/90 backdrop-blur-md text-slate-700 border-r border-slate-200/70 shadow-sm'
          : 'bg-[#053229] text-white border-r border-[#031b16]'
      }`}>

        {/* Sidebar Header Title */}
        <div className={`p-6 flex justify-between items-center ${
          theme === 'light' ? 'border-b border-slate-200/60 bg-slate-100/50' : 'border-b border-white/10 bg-[#03251e]'
        }`}>
          <div>
            <h2 className={`text-xl font-extrabold tracking-tight flex items-center gap-2 ${
              theme === 'light' ? 'text-slate-800' : 'text-white'
            }`}>
              <span className={`inline-block w-3.5 h-3.5 rounded-xs animate-pulse ${
                theme === 'light' ? 'bg-emerald-500' : 'bg-yellow-400'
              }`}></span>
              LMS Console
            </h2>
            <p className={`text-[10px] font-bold uppercase tracking-wider mt-0.5 ${
              theme === 'light' ? 'text-emerald-600' : 'text-emerald-400'
            }`}>Admin Control Gate</p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className={`lg:hidden p-1.5 rounded-lg focus:outline-none ${
              theme === 'light' ? 'text-slate-400 hover:text-slate-700 hover:bg-slate-100' : 'text-slate-455 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Close Admin Menu"
          >
            <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Account Profile Card (Official Gov-grade Design) */}
        <div className={`p-4 m-4 rounded-xl border ${
          theme === 'light'
            ? 'bg-slate-50 border-slate-200 shadow-3xs'
            : 'bg-[#03221b] border-emerald-900/60 shadow-inner'
        }`}>
          {/* Top official banner */}
          <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-gray-150/40 select-none">
            <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className={`text-[8px] font-bold tracking-widest uppercase ${theme === 'light' ? 'text-slate-450' : 'text-emerald-400/70'}`}>
              SECURE GOVT. PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Professional solid circular avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
              theme === 'light' 
                ? 'bg-[#08493d] text-white border-emerald-700 shadow-3xs' 
                : 'bg-[#042d25] text-emerald-350 border-emerald-800'
            }`}>
              <span className="font-extrabold text-sm uppercase tracking-wider">
                {user.name?.[0] || 'A'}
              </span>
            </div>
            
            <div className="min-w-0 flex-1">
              <p className={`font-extrabold text-xs truncate leading-tight tracking-tight ${
                theme === 'light' ? 'text-slate-800' : 'text-white'
              }`}>
                {user.name}
              </p>
              <p className={`text-[9px] font-mono font-medium truncate mt-0.5 ${
                theme === 'light' ? 'text-slate-455' : 'text-slate-400'
              }`}>
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Central Management</p>

          <button
            onClick={() => { setActiveDashboardTab('console'); navigate('/admin/dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'console'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'console' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-455'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className={`${activeDashboardTab === 'console' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Command Dashboard</span>
          </button>

          <button
            onClick={() => { navigate('/admin/reports'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'reports'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'reports' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className={`${activeDashboardTab === 'reports' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Reports & Analytics</span>
          </button>

          {/* Group 2: LMS Access */}
          <div className={`border-t my-3 pt-3 ${theme === 'light' ? 'border-slate-200/80' : 'border-white/5'}`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">LMS Access</p>
          </div>

          {/* Module 2: Course & Training Management with expandable Sub-menu */}
          <SidebarExpandableMenu
            title="Course & Training"
            tabKey="training"
            theme={theme}
            icon={
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            }
            isExpanded={isTrainingMenuExpanded}
            onToggle={() => setIsTrainingMenuExpanded(!isTrainingMenuExpanded)}
            activeDashboardTab={activeDashboardTab}
            activeSubTab={activeSubTab}
            setActiveDashboardTab={setActiveDashboardTab}
            setActiveSubTab={setActiveSubTab}
            setIsSidebarOpen={setIsSidebarOpen}
            subItems={[
              { id: 'all', label: 'Overview Summary' },
              { id: 'induction', label: 'Induction Training' },
              { id: 'refresher', label: 'Refresher Training' },
              { id: 'domain', label: 'Domain Training' },
              { id: 'international', label: 'International Training' },
              { id: 'schedules', label: 'Session Scheduling' },
              { id: 'faculty', label: 'Faculty Mapping' },
              { id: 'venues', label: 'Venue Allocation' }
            ]}
          />

          {/* Module 3: Calendar & Event Management with expandable Sub-menu */}
          <SidebarExpandableMenu
            title="Calendar & Events"
            tabKey="events"
            theme={theme}
            icon={
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            isExpanded={isEventsMenuExpanded}
            onToggle={() => setIsEventsMenuExpanded(!isEventsMenuExpanded)}
            activeDashboardTab={activeDashboardTab}
            activeSubTab={activeSubTab}
            setActiveDashboardTab={setActiveDashboardTab}
            setActiveSubTab={setActiveSubTab}
            setIsSidebarOpen={setIsSidebarOpen}
            subItems={[
              { id: 'all', label: 'Events Overview' },
              { id: 'training_cal', label: 'Training Calendar' },
              { id: 'faculty_cal', label: 'Faculty Calendar' },
              { id: 'trainee_cal', label: 'Trainee Calendar' },
              { id: 'campus_events', label: 'Campus Events' }
            ]}
          />

          {/* TNA Needs assessment */}
          <button
            onClick={() => { setActiveDashboardTab('tna'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'tna'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'tna' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className={`${activeDashboardTab === 'tna' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>TNA Need Assessment</span>
          </button>

          {/* Group & Batches */}
          <button
            onClick={() => { setActiveDashboardTab('batch'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'batch'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'batch' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className={`${activeDashboardTab === 'batch' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Batches & Groups</span>
          </button>

          {/* Attendance Module */}
          <button
            onClick={() => { setActiveDashboardTab('attendance'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'attendance'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'attendance' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className={`${activeDashboardTab === 'attendance' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Roster Attendance</span>
          </button>

          {/* Assignment Desk */}
          <button
            onClick={() => { setActiveDashboardTab('assignment'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'assignment'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'assignment' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
            <span className={`${activeDashboardTab === 'assignment' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Assignment Desk</span>
          </button>

          {/* CMS Module */}
          <button
            onClick={() => { setActiveDashboardTab('cms'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              activeDashboardTab === 'cms'
                ? 'bg-blue-600 text-white shadow-md'
                : theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${activeDashboardTab === 'cms' ? 'text-blue-200' : theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className={`${activeDashboardTab === 'cms' ? 'text-white' : theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Syllabus CMS</span>
          </button>

          {/* Group 3: Portal Access */}
          <div className={`border-t my-3 pt-3 ${theme === 'light' ? 'border-slate-200/80' : 'border-white/5'}`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Portal Access</p>
          </div>

          <button
            onClick={() => { navigate('/admin/e-hostel'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              theme === 'light'
                ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>e-Hostel Logistics</span>
          </button>

          <button
            onClick={() => { navigate('/admin/kms'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              theme === 'light'
                ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Knowledge (KMS)</span>
          </button>

          <button
            onClick={() => { navigate('/admin/users'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all cursor-pointer text-left ${
              theme === 'light'
                ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>User Accounts</span>
          </button>

          <div className="border-t border-white/5 my-4 pt-4 space-y-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">Workspace Navigation</p>

            <button
              onClick={() => { navigate('/admin/dashboard'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                theme === 'light'
                  ? 'text-slate-950 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-350 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-blue-505'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-350'}`}>Back to Admin Dashboard</span>
            </button>

            <button
              onClick={() => { navigate('/'); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                theme === 'light'
                  ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Back to Public Site</span>
            </button>

            <button
              onClick={() => { navigate('/admin/users'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                theme === 'light'
                  ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>User Directory</span>
            </button>

            <button
              onClick={() => { navigate('/admin/reports'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                theme === 'light'
                  ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Reports & Analytics</span>
            </button>

            <button
              onClick={() => { navigate('/admin/kms'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                theme === 'light'
                  ? 'text-slate-955 hover:bg-slate-100 hover:text-black font-extrabold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <svg className={`w-4.5 h-4.5 shrink-0 ${theme === 'light' ? 'text-slate-900' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className={`${theme === 'light' ? 'text-slate-950' : 'text-slate-300'}`}>Knowledge Management</span>
            </button>

            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-left ${
                theme === 'light'
                  ? 'text-rose-650 hover:bg-rose-50 hover:text-rose-800 font-black'
                  : 'text-rose-350 hover:bg-rose-900/20 hover:text-rose-200'
              }`}
            >
              <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </nav>

        {/* Footer Support Helpbox */}
        <div className={`p-4 text-xs font-semibold ${
          theme === 'light' ? 'border-t border-slate-200 bg-slate-100/50 text-slate-500' : 'border-t border-white/5 bg-[#03211b] text-slate-450'
        }`}>
          <p className="leading-normal">System Version 3.1.5</p>
          <p className={`${theme === 'light' ? 'text-emerald-700/70' : 'text-emerald-400/70'} text-[10px] mt-0.5`}>Gov-Secure Active Sandbox</p>
        </div>
      </aside>

      {/* 2. Main Dashboard Content deck */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">

        {/* Top Header Panel */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-35 shadow-xs">
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
            <button
              onClick={() => navigate('/')}
              title="Back to Public Site"
              className="mr-1.5 p-1.5 rounded-full hover:bg-slate-100 text-slate-650 hover:text-[#08493d] transition-all cursor-pointer focus:outline-none inline-flex items-center justify-center shrink-0 border border-transparent hover:border-gray-200 shadow-3xs hover:shadow-xs"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                Admin Command Console
              </h1>
              <p className="text-xs text-slate-450 font-semibold mt-0.5">National Statistical Training Academy (NSSTA) • Portal Management Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              <span className="font-extrabold tracking-wide">System Online</span>
            </span>
          </div>
        </header>

        {/* Dashboard Main deck Grid */}
        <main className="flex-grow p-6 space-y-6">
          {activeDashboardTab === 'console' && (
            <>
          {/* Welcome Dashboard Hero Header banner */}
          <div className={`rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300 ${
            theme === 'light'
              ? 'bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white border border-slate-800 shadow-lg'
              : 'bg-gradient-to-r from-[#08493d] to-[#0d6b5c] text-white shadow-md'
          }`}>
            <div className="space-y-2 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome, {user.name}!</h2>
              <p className={`text-xs sm:text-sm font-semibold max-w-xl leading-relaxed ${theme === 'light' ? 'text-slate-300' : 'text-emerald-100'}`}>
                This is the LMS Administrative Command Portal. Manage logistics workflows for **e-Hostel Allotment**, **KMS central archives**, learning courses tree builders, and trainee database access control points.
              </p>
            </div>
            {/* Visual Glassmorphic Widget showing CPU and clock */}
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-xl p-4 shrink-0 w-full md:w-56 text-left select-none relative z-10">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${theme === 'light' ? 'text-emerald-300' : 'text-emerald-300'}`}>Gateway Monitor</p>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-3xl font-black tracking-tighter">99.9%</span>
                <span className="text-xs text-emerald-255 font-extrabold uppercase">Uptime CDN</span>
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
          </div>

          {/* Quick Metrics Statistics Bar Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Enrolled Users</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">1,248</p>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block mt-2">
                ↑ +12% this week
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">KMS Central Drive Assets</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">142 Files</p>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mt-2">
                ✓ 5 wing libraries
              </span>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">e-Hostel Room Allotments</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">78 / 100</p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3.5">
                <div className="h-full bg-emerald-650 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs hover:shadow-md transition-shadow text-left">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Active Syllabi Modules</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">24 Modules</p>
              <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100 inline-block mt-2">
                ✓ MoSPI Compliant
              </span>
            </div>

          </div>

          {/* Primary Main Modules Cards Grid (The Core Requested Panels) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: e-Hostel Logistics Dashboard Card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col group text-left">
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
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Occupancy Register</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">78 Allocated Rooms</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Maintenance Desk</p>
                    <p className="text-sm font-extrabold text-rose-700 mt-1">3 Active Tickets</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payments Track</p>
                    <p className="text-sm font-extrabold text-emerald-700 mt-1">92% Collected</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Fleet</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">8 Transport Buses</p>
                  </div>
                </div>
              </div>

              {/* Enter Module trigger */}
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => navigate('/admin/e-hostel')}
                  className={`px-5 py-2.5 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5 ${
                    theme === 'light' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#08493d] hover:bg-[#063b31]'
                  }`}
                >
                  Enter e-Hostel Portal
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card 2: Knowledge Management Portal (KMS) Card */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col group text-left">
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
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Central LCMS Drive</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">142 Uploaded Assets</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Governance Drafts</p>
                    <p className="text-sm font-extrabold text-yellow-750 mt-1">5 Pending Approvals</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">P2P Forums</p>
                    <p className="text-sm font-extrabold text-blue-855 mt-1">24 Active Threads</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Curriculum Outline</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">12 Syllabi Packages</p>
                  </div>
                </div>
              </div>

              {/* Enter Module trigger */}
              <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
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

            {/* Card 3: Reports Center & Interactive Analytics Card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col group text-left">
              {/* Premium Gradient Top Cap */}
              <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-700"></div>
              
              <div className="p-6 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center text-purple-800 group-hover:scale-105 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-100 text-purple-850 border border-purple-200 rounded-full">
                    Reports & Analytics
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-800 group-hover:text-purple-900">Reports Center & Interactive Analytics</h3>
                  <p className="text-xs text-slate-450 leading-relaxed font-semibold">
                    Dynamic dashboard analytics tracking MoSPI trainee distributions. Access interactive reports, apply multi-dimensional filters (State, Cadre, Designation, Training Type), and generate PDF/Excel summaries.
                  </p>
                </div>

                {/* Module Metrics grid inside card */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Reports</p>
                    <p className="text-sm font-extrabold text-slate-700 mt-1">1,280 Generated</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dynamic Filters</p>
                    <p className="text-sm font-extrabold text-indigo-700 mt-1">8 Composite Scales</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Certifications</p>
                    <p className="text-sm font-extrabold text-purple-850 mt-1">450 Certified</p>
                  </div>
                  <div className="bg-slate-50 border border-gray-150 p-3 rounded-xl">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Data Sync</p>
                    <p className="text-sm font-extrabold text-emerald-700 mt-1">Real-Time Reactive</p>
                  </div>
                </div>
              </div>

              {/* Enter Module trigger */}
              <div className="px-6 py-4 bg-slate-50 border-t border-gray-150 flex justify-end">
                <button
                  onClick={() => navigate('/admin/reports')}
                  className="px-5 py-2.5 bg-purple-650 hover:bg-purple-750 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow hover:translate-x-0.5 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  Enter Analytics Center
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* User Directory quick console card (Whole Width block) */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row items-center p-6 gap-6 text-left group">
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
                <span>System Admins: <strong>6 Accounts</strong></span>
                <span>Faculty: <strong>42 Accounts</strong></span>
                <span>Active Trainees: <strong>1,200 Accounts</strong></span>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/users')}
              className="w-full md:w-auto px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
            >
              Manage Accounts Directory
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* ======================================================== */}
          {/* SPECIALIZED CORE ACADEMIC MODULES COMMAND CONSOLE        */}
          {/* ======================================================== */}
          <div className="space-y-6">
            <div className="border-t border-gray-200 pt-6 text-left">
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
                📂 Specialized Core Academic Modules Command Console
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Interact with the workflow simulators, execute quick creators, and check live metrics sync for modules 2 through 7.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {/* Module 2: Course & Training Management */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-800">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full">
                      Module 2 • Training
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800">Course & Training Management</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Create programs (Induction, Refresher, Domain, International), map faculty, allot venues, manage online/offline modes.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <div>📁 Active Programs: <strong className="text-emerald-700">{simulatedCounts.programs}</strong></div>
                    <div>👤 Faculty Mapped: <strong className="text-emerald-700">32 Mapped</strong></div>
                    <div className="col-span-2 text-[9px] text-slate-400 font-bold border-t border-gray-200/50 mt-1 pt-1">
                      Modes: Online Webcast & Offline Classrooms
                    </div>
                  </div>

                  {/* Stepper Simulator */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-450 uppercase">Workflow Simulator:</span>
                      <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-black">
                        Step {activeWorkflowSteps.training + 1} / 7
                      </span>
                    </div>
                    
                    {/* Horizontal Visual Nodes */}
                    <div className="flex items-center justify-between relative px-1">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                      {[
                        { title: 'Create Program' },
                        { title: 'Create Batch' },
                        { title: 'Assign Trainer' },
                        { title: 'Allocate Venue' },
                        { title: 'Schedule Sessions' },
                        { title: 'Notify participants' },
                        { title: 'Conduct Training' }
                      ].map((step, idx) => {
                        const isCompleted = idx <= activeWorkflowSteps.training;
                        const isCurrent = idx === activeWorkflowSteps.training;
                        return (
                          <div 
                            key={idx} 
                            title={step.title}
                            className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center text-[8px] font-black border transition-all duration-300 ${
                              isCurrent ? 'bg-emerald-500 border-emerald-600 text-white scale-125 shadow-md shadow-emerald-500/20' :
                              isCompleted ? 'bg-emerald-700 border-emerald-800 text-emerald-100' :
                              'bg-white border-gray-300 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold text-center italic mt-1.5">
                      Current Action: {
                        [
                          'Create Training Program',
                          'Create Batch',
                          'Assign Trainer',
                          'Allocate Venue',
                          'Schedule Sessions',
                          'Notify Participants',
                          'Conduct Training'
                        ][activeWorkflowSteps.training]
                      } ➔
                    </p>

                    <button
                      onClick={() => incrementWorkflowStep('training', 7)}
                      className="w-full mt-2 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-250 text-[#08493d] text-[10px] font-black rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      Advance Simulator Step ➔
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCreateMockProgram} className="border-t border-gray-100 pt-3 space-y-2">
                    <p className="text-[9px] font-black text-slate-450 uppercase">Program Creator:</p>
                    <div className="flex gap-2">
                      <select
                        value={programInput.type}
                        onChange={(e) => setProgramInput({ ...programInput, type: e.target.value })}
                        className="bg-white border border-gray-300 rounded px-1.5 py-0.8 text-[10px] focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 font-semibold"
                      >
                        <option value="Induction Training">Induction</option>
                        <option value="Refresher Training">Refresher</option>
                        <option value="Domain Training">Domain</option>
                        <option value="International Training">International</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={programInput.name}
                        onChange={(e) => setProgramInput({ ...programInput, name: e.target.value })}
                        placeholder="Program Name..."
                        className="flex-1 bg-white border border-gray-300 rounded px-2 py-0.8 text-[10px] focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 font-semibold placeholder-slate-400"
                      />
                      <button
                        type="submit"
                        className="bg-emerald-800 hover:bg-emerald-900 text-white font-black text-[9px] px-2.5 rounded cursor-pointer"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Module 3: Calendar & Event Management */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-800">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-50 text-amber-850 border border-amber-200 rounded-full">
                      Module 3 • Calendar
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800">Calendar & Event Management</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Unified view of training schedules, faculty availability, and trainee programs. Administer Sports Events, Essay Contests, and Quiz Competitions.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <div>📅 Live Events: <strong className="text-amber-800">{simulatedCounts.events} Published</strong></div>
                    <div>🎯 Calendars: <strong className="text-amber-800">3 Isolated Tracks</strong></div>
                    <div className="col-span-2 text-[9px] text-slate-400 font-bold border-t border-gray-200/50 mt-1 pt-1">
                      Event Types: Sports, Essays & Quizzes
                    </div>
                  </div>

                  {/* Stepper Simulator */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-450 uppercase">Workflow Simulator:</span>
                      <span className="text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded font-black">
                        Step {activeWorkflowSteps.calendar + 1} / 5
                      </span>
                    </div>
                    
                    {/* Horizontal Visual Nodes */}
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                      {[
                        { title: 'Create Event' },
                        { title: 'Publish Event' },
                        { title: 'Registration' },
                        { title: 'Attendance' },
                        { title: 'Result & Certificate' }
                      ].map((step, idx) => {
                        const isCompleted = idx <= activeWorkflowSteps.calendar;
                        const isCurrent = idx === activeWorkflowSteps.calendar;
                        return (
                          <div 
                            key={idx} 
                            title={step.title}
                            className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center text-[8px] font-black border transition-all duration-300 ${
                              isCurrent ? 'bg-amber-500 border-amber-600 text-white scale-125 shadow-md shadow-amber-500/20' :
                              isCompleted ? 'bg-amber-700 border-amber-800 text-amber-100' :
                              'bg-white border-gray-300 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold text-center italic mt-1.5">
                      Current Action: {
                        [
                          'Create Event',
                          'Publish Event on Portal',
                          'Nominee Registration',
                          'Mark Event Attendance',
                          'Issue Result & Secure Certificate'
                        ][activeWorkflowSteps.calendar]
                      } ➔
                    </p>

                    <button
                      onClick={() => incrementWorkflowStep('calendar', 5)}
                      className="w-full mt-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-250 text-amber-850 text-[10px] font-black rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      Advance Simulator Step ➔
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCreateMockEvent} className="border-t border-gray-100 pt-3 space-y-2">
                    <p className="text-[9px] font-black text-slate-450 uppercase">Event Publisher:</p>
                    <div className="flex gap-2">
                      <select
                        value={eventInput.type}
                        onChange={(e) => setEventInput({ ...eventInput, type: e.target.value })}
                        className="bg-white border border-gray-300 rounded px-1.5 py-0.8 text-[10px] focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-700 font-semibold"
                      >
                        <option value="Quiz Event">Quiz</option>
                        <option value="Sports Event">Sports</option>
                        <option value="Essay Competition">Essay</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={eventInput.name}
                        onChange={(e) => setEventInput({ ...eventInput, name: e.target.value })}
                        placeholder="Event Title..."
                        className="flex-1 bg-white border border-gray-300 rounded px-2 py-0.8 text-[10px] focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-700 font-semibold placeholder-slate-400"
                      />
                      <button
                        type="submit"
                        className="bg-amber-700 hover:bg-amber-850 text-white font-black text-[9px] px-2.5 rounded cursor-pointer"
                      >
                        Publish
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Module 4: Training Need Assessment (TNA) */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                <div className="h-2 bg-gradient-to-r from-rose-500 to-red-500"></div>
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center text-rose-800">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-full">
                      Module 4 • TNA Need
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800">Training Need Assessment (TNA)</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Skill Gap analysis by designation or department. Evaluate requirements, generate dynamic course mappings and training schedules.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <div>📊 Skill Gaps Logged: <strong className="text-rose-800">{simulatedCounts.tnaNeeds} Needs</strong></div>
                    <div>🏢 Departments Mapped: <strong className="text-rose-800">8 Units Mapped</strong></div>
                    <div className="col-span-2 text-[9px] text-slate-400 font-bold border-t border-gray-200/50 mt-1 pt-1">
                      Targeting: Group B & Group A Officers
                    </div>
                  </div>

                  {/* Stepper Simulator */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-450 uppercase">Workflow Simulator:</span>
                      <span className="text-rose-800 bg-rose-50 px-1.5 py-0.2 rounded font-black">
                        Step {activeWorkflowSteps.tna + 1} / 5
                      </span>
                    </div>
                    
                    {/* Horizontal Visual Nodes */}
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                      {[
                        { title: 'Dept Inputs Need' },
                        { title: 'Training Need Assessment' },
                        { title: 'Approval' },
                        { title: 'Course Mapping' },
                        { title: 'Training Schedule' }
                      ].map((step, idx) => {
                        const isCompleted = idx <= activeWorkflowSteps.tna;
                        const isCurrent = idx === activeWorkflowSteps.tna;
                        return (
                          <div 
                            key={idx} 
                            title={step.title}
                            className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center text-[8px] font-black border transition-all duration-300 ${
                              isCurrent ? 'bg-rose-500 border-rose-600 text-white scale-125 shadow-md shadow-rose-500/20' :
                              isCompleted ? 'bg-rose-700 border-rose-800 text-rose-105' :
                              'bg-white border-gray-300 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold text-center italic mt-1.5">
                      Current Action: {
                        [
                          'Department Inputs Need Requirements',
                          'Establish Training Need Assessment',
                          'Obtain Director Approval',
                          'Auto Course Syllabus Mapping',
                          'Publish Training Course Schedule'
                        ][activeWorkflowSteps.tna]
                      } ➔
                    </p>

                    <button
                      onClick={() => incrementWorkflowStep('tna', 5)}
                      className="w-full mt-2 py-1 bg-rose-50 hover:bg-rose-100 border border-rose-250 text-rose-850 text-[10px] font-black rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      Advance Simulator Step ➔
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleCreateMockTna} className="border-t border-gray-100 pt-3 space-y-2">
                    <p className="text-[9px] font-black text-slate-450 uppercase">TNA Need Submitter:</p>
                    <div className="flex gap-2">
                      <select
                        value={tnaInput.dept}
                        onChange={(e) => setTnaInput({ ...tnaInput, dept: e.target.value })}
                        className="bg-white border border-gray-300 rounded px-1.5 py-0.8 text-[10px] focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-700 font-semibold"
                      >
                        <option value="Department of Statistics">Statistics</option>
                        <option value="Economics Division">Economics</option>
                        <option value="IT Administration">IT Admin</option>
                      </select>
                      <input
                        type="text"
                        required
                        value={tnaInput.need}
                        onChange={(e) => setTnaInput({ ...tnaInput, need: e.target.value })}
                        placeholder="Requested skill..."
                        className="flex-1 bg-white border border-gray-300 rounded px-2 py-0.8 text-[10px] focus:outline-none focus:ring-1 focus:ring-rose-500 text-slate-700 font-semibold placeholder-slate-400"
                      />
                      <button
                        type="submit"
                        className="bg-rose-700 hover:bg-rose-850 text-white font-black text-[9px] px-2.5 rounded cursor-pointer"
                      >
                        Log Need
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Module 5: Group & Batch Management */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-600"></div>
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center text-purple-800">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-purple-50 text-purple-800 border border-purple-200 rounded-full">
                      Module 5 • Groups
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800">Group & Batch Management</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Configure specific training batches, send group notifications, membership rules, and map courses to designation-based groups.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <div>👥 Active Batches: <strong className="text-purple-800">{simulatedCounts.batches} Batches</strong></div>
                    <div>📢 Notify: <strong className="text-purple-800">Group Broadcasts</strong></div>
                    <div className="col-span-2 text-[9px] text-slate-400 font-bold border-t border-gray-200/50 mt-1 pt-1">
                      Integration: Synchronized with NIC Tenancy
                    </div>
                  </div>

                  {/* Stepper Simulator */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-450 uppercase">Workflow Simulator:</span>
                      <span className="text-purple-800 bg-purple-50 px-1.5 py-0.2 rounded font-black">
                        Step {activeWorkflowSteps.group + 1} / 5
                      </span>
                    </div>
                    
                    {/* Horizontal Visual Nodes */}
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                      {[
                        { title: 'Create Group' },
                        { title: 'Add Members' },
                        { title: 'Assign Course' },
                        { title: 'Assign Trainer' },
                        { title: 'Schedule Sessions' }
                      ].map((step, idx) => {
                        const isCompleted = idx <= activeWorkflowSteps.group;
                        const isCurrent = idx === activeWorkflowSteps.group;
                        return (
                          <div 
                            key={idx} 
                            title={step.title}
                            className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center text-[8px] font-black border transition-all duration-300 ${
                              isCurrent ? 'bg-purple-500 border-purple-600 text-white scale-125 shadow-md shadow-purple-500/20' :
                              isCompleted ? 'bg-purple-700 border-purple-800 text-purple-105' :
                              'bg-white border-gray-300 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold text-center italic mt-1.5">
                      Current Action: {
                        [
                          'Create New Segmented Group',
                          'Add Trainee Members to Batch',
                          'Assign Mapped Syllabus Course',
                          'Assign Mapped Faculty Trainer',
                          'Schedule Classroom Sessions'
                        ][activeWorkflowSteps.group]
                      } ➔
                    </p>

                    <button
                      onClick={() => incrementWorkflowStep('group', 5)}
                      className="w-full mt-2 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-250 text-purple-800 text-[10px] font-black rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      Advance Simulator Step ➔
                    </button>
                  </div>
                  
                  {/* Action Link */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      onClick={() => navigate('/admin/users')}
                      className="w-full py-1.5 bg-purple-650 hover:bg-purple-750 text-white text-[10px] font-black rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Manage Batches & Groups in Directory
                    </button>
                  </div>
                </div>
              </div>

              {/* Module 6: Attendance Management */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center text-cyan-800">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-cyan-50 text-cyan-800 border border-cyan-200 rounded-full">
                      Module 6 • Attendance
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800">Attendance Management</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Mark and verify attendance for trainers & trainees. Covers session-wise tracking for both online webinars and offline host classrooms.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <div>📊 Sessions Logged: <strong className="text-cyan-800">{simulatedCounts.attendanceSessions} Sessions</strong></div>
                    <div>📈 Attendance Rate: <strong className="text-cyan-800">94.8% Average</strong></div>
                    <div className="col-span-2 text-[9px] text-slate-400 font-bold border-t border-gray-200/50 mt-1 pt-1">
                      Modes: Biometric, Digital Check-in, Web OTP
                    </div>
                  </div>

                  {/* Stepper Simulator */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-450 uppercase">Workflow Simulator:</span>
                      <span className="text-cyan-800 bg-cyan-50 px-1.5 py-0.2 rounded font-black">
                        Step {activeWorkflowSteps.attendance + 1} / 4
                      </span>
                    </div>
                    
                    {/* Horizontal Visual Nodes */}
                    <div className="flex items-center justify-between relative px-3">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                      {[
                        { title: 'Session Starts' },
                        { title: 'Mark Attendance' },
                        { title: 'Verify Attendance' },
                        { title: 'Generate Report' }
                      ].map((step, idx) => {
                        const isCompleted = idx <= activeWorkflowSteps.attendance;
                        const isCurrent = idx === activeWorkflowSteps.attendance;
                        return (
                          <div 
                            key={idx} 
                            title={step.title}
                            className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center text-[8px] font-black border transition-all duration-300 ${
                              isCurrent ? 'bg-cyan-500 border-cyan-600 text-white scale-125 shadow-md shadow-cyan-500/20' :
                              isCompleted ? 'bg-cyan-700 border-cyan-800 text-cyan-105' :
                              'bg-white border-gray-300 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold text-center italic mt-1.5">
                      Current Action: {
                        [
                          'Academic Session Starts',
                          'Mark Present/Absent',
                          'Auditor Verification check',
                          'Generate Detailed Attendance Report'
                        ][activeWorkflowSteps.attendance]
                      } ➔
                    </p>

                    <button
                      onClick={() => incrementWorkflowStep('attendance', 4)}
                      className="w-full mt-2 py-1 bg-cyan-50 hover:bg-cyan-100 border border-cyan-250 text-cyan-850 text-[10px] font-black rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      Advance Simulator Step ➔
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      onClick={() => {
                        setSimulatedCounts(prev => ({ ...prev, attendanceSessions: prev.attendanceSessions + 1 }));
                        alert("Successfully triggered active biometric sync! Marked 42 trainees present in 'Time Series Analysis' afternoon block.");
                      }}
                      className="w-full py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white text-[10px] font-black rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Trigger Biometric Sync Mark Present
                    </button>
                  </div>
                </div>
              </div>

              {/* Module 7: Assignment Management */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group text-left">
                <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500"></div>
                <div className="p-5 flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-pink-50 border border-pink-100 rounded-xl flex items-center justify-center text-pink-800">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-pink-50 text-pink-800 border border-pink-200 rounded-full">
                      Module 7 • Assignments
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-extrabold text-slate-800">Assignment Management</h3>
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Create, publish, and evaluate academic assignments. Facilitates secure upload submission portal, trainer evaluations, scoring metrics, and publishing marks.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-150">
                    <div>📝 Active Tasks: <strong className="text-pink-800">{simulatedCounts.assignments} Handouts</strong></div>
                    <div>📈 Submission Rate: <strong className="text-pink-800">89% Submitted</strong></div>
                    <div className="col-span-2 text-[9px] text-slate-400 font-bold border-t border-gray-200/50 mt-1 pt-1">
                      Platform: Safe cryptographically sealed vaults
                    </div>
                  </div>

                  {/* Stepper Simulator */}
                  <div className="space-y-2 border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-450 uppercase">Workflow Simulator:</span>
                      <span className="text-pink-800 bg-pink-50 px-1.5 py-0.2 rounded font-black">
                        Step {activeWorkflowSteps.assignment + 1} / 5
                      </span>
                    </div>
                    
                    {/* Horizontal Visual Nodes */}
                    <div className="flex items-center justify-between relative px-2">
                      <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                      {[
                        { title: 'Trainer Creates' },
                        { title: 'Published' },
                        { title: 'Submission' },
                        { title: 'Trainer Evaluation' },
                        { title: 'Marks Published' }
                      ].map((step, idx) => {
                        const isCompleted = idx <= activeWorkflowSteps.assignment;
                        const isCurrent = idx === activeWorkflowSteps.assignment;
                        return (
                          <div 
                            key={idx} 
                            title={step.title}
                            className={`w-3.5 h-3.5 rounded-full z-10 flex items-center justify-center text-[8px] font-black border transition-all duration-300 ${
                              isCurrent ? 'bg-pink-500 border-pink-600 text-white scale-125 shadow-md shadow-pink-500/20' :
                              isCompleted ? 'bg-pink-700 border-pink-800 text-pink-105' :
                              'bg-white border-gray-300 text-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold text-center italic mt-1.5">
                      Current Action: {
                        [
                          'Trainer Creates Assessment Assignment',
                          'Assignment Published to Portal',
                          'Learner Submission Uploaded to Vault',
                          'Trainer Evaluation & Grading',
                          'Final Marks Published to Trainees'
                        ][activeWorkflowSteps.assignment]
                      } ➔
                    </p>

                    <button
                      onClick={() => incrementWorkflowStep('assignment', 5)}
                      className="w-full mt-2 py-1 bg-pink-50 hover:bg-pink-100 border border-pink-250 text-pink-800 text-[10px] font-black rounded-lg text-center cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      Advance Simulator Step ➔
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-100 pt-3">
                    <button
                      onClick={() => {
                        setSimulatedCounts(prev => ({ ...prev, assignments: prev.assignments + 1 }));
                        alert("Mock Assignment 'Time Series Forecasting Practicum II' successfully created and published! Email notifications dispatched.");
                      }}
                      className="w-full py-1.5 bg-pink-700 hover:bg-pink-855 text-white text-[10px] font-black rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Create & Publish New Mapped Assignment
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Simulated System Activity Terminal Log & Uptime widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            
            {/* Terminal Activity Log table */}
            <div className={`border rounded-2xl p-6 text-left shadow-lg relative overflow-hidden transition-colors duration-200 ${
              theme === 'light'
                ? 'bg-slate-50 border-slate-250 text-slate-700 font-mono shadow-md'
                : 'bg-[#021814] border-[#043329] text-emerald-400 font-mono'
            }`}>
              <div className={`flex justify-between items-center border-b pb-3 mb-4 select-none ${
                theme === 'light' ? 'border-slate-200' : 'border-[#043329]'
              }`}>
                <p className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
                  theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                }`}>
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
                  <div key={log.id} className={`flex items-start gap-3 p-1.5 rounded transition-colors ${
                    theme === 'light' ? 'hover:bg-slate-200/50' : 'hover:bg-[#03211b]'
                  }`}>
                    <span className="text-slate-500 shrink-0 font-bold select-none">{log.time}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[9px] font-black tracking-wider uppercase select-none ${
                      log.type === 'SUCCESS'
                        ? theme === 'light' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : log.type === 'WARN'
                        ? theme === 'light' ? 'bg-amber-50 text-amber-800 border border-amber-250' : 'bg-amber-950 text-amber-300 border border-amber-800'
                        : theme === 'light' ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' : 'bg-slate-900 text-slate-350 border border-slate-700'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-slate-450 shrink-0 font-bold font-sans">[{log.operator}]</span>
                    <span className={`font-sans font-semibold leading-normal ${
                      theme === 'light' ? 'text-slate-800' : 'text-emerald-105'
                    }`}>{log.msg}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health Indicators */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Gateway Integrations Health</h4>

                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Relational Database Server
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      ONLINE
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-extrabold text-slate-600 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Gov-Secure Firewall Shield
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      SECURED & SAFE
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
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

              <div className="pt-6 border-t border-slate-100 mt-4 select-none">
                <p className="text-[10px] font-bold text-slate-400 leading-normal">
                  All systems operating at peak performance levels under standard cryptographic safety policies.
                </p>
              </div>
            </div>

          </div>
          </>
        )}

        {/* 🎓 Course & Training Management Module */}
        {activeDashboardTab === 'training' && (
          <TrainingModule activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} theme={theme} />
        )}

        {/* 📅 Calendar & Event Management Module */}
        {activeDashboardTab === 'events' && (
          <EventsModule activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} theme={theme} />
        )}

        {/* 🎯 Training Need Assessment (TNA) Module */}
        {activeDashboardTab === 'tna' && (
          <TNAModule theme={theme} />
        )}

        {/* 👥 Group & Batch Management Module */}
        {activeDashboardTab === 'batch' && (
          <BatchModule theme={theme} />
        )}

        {/* 📊 Attendance Management Module */}
        {activeDashboardTab === 'attendance' && (
          <AttendanceModule theme={theme} />
        )}

        {/* 📝 Assignment Management Module */}
        {activeDashboardTab === 'assignment' && (
          <AssignmentModule theme={theme} />
        )}

        {/* 📚 Content Management System (CMS) */}
        {activeDashboardTab === 'cms' && (
          <CMSModule theme={theme} />
        )}
        </main>
      </div>

    </div>
  );
}
