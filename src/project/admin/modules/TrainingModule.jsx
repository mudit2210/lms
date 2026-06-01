import React, { useState, useEffect } from 'react';

// Default mock data to seed localStorage if empty
const DEFAULT_PROGRAMS = [
  { id: 'PROG-001', name: '46th Batch Induction Course for ISS Probationers', type: 'induction', duration: '2 Weeks', venue: 'Lecture Hall A', trainer: 'Dr. Ramesh Kumar', batch: 'ISS-46', startDate: '2026-06-08', status: 'active', mode: 'offline' },
  { id: 'PROG-002', name: 'Time Series & Forecasting Applied Practicum', type: 'refresher', duration: '1 Week', venue: 'Computer Lab 2', trainer: 'Prof. Ananya Sen', batch: 'REF-2026', startDate: '2026-06-15', status: 'upcoming', mode: 'online' },
  { id: 'PROG-003', name: 'National Accounts Statistics & GDP Estimations', type: 'domain', duration: '3 Days', venue: 'Conference Room 1', trainer: 'Dr. Ramesh Kumar', batch: 'DOM-NAS', startDate: '2026-06-22', status: 'active', mode: 'hybrid' },
  { id: 'PROG-004', name: 'SAARC Senior Statistical Officers Seminar', type: 'international', duration: '5 Days', venue: 'Lecture Hall B', trainer: 'Sanjay Deshmukh', batch: 'INT-SAARC', startDate: '2026-06-29', status: 'upcoming', mode: 'offline' }
];

const DEFAULT_FACULTY = [
  { name: 'Dr. Ramesh Kumar', des: 'Senior Advisor', dept: 'Applied Statistics', course: 'Time Series Forecasting II', load: '4 Lectures/Week', status: 'Active' },
  { name: 'Prof. Ananya Sen', des: 'Warden Faculty', dept: 'Macroeconomics Dept', course: 'National Accounts Statistics', load: '2 Lectures/Week', status: 'Active' },
  { name: 'Sanjay Deshmukh', des: 'System Admin Coordinator', dept: 'NIC Security Desk', course: 'SSO Protocols', load: '1 Seminar/Week', status: 'Active' }
];

const DEFAULT_VENUES = [
  { hall: 'Lecture Hall A', cap: '60 Learners', status: 'OCCUPIED', border: 'border-rose-200 bg-rose-50/40 text-rose-800' },
  { hall: 'Lecture Hall B', cap: '45 Learners', status: 'AVAILABLE', border: 'border-emerald-200 bg-emerald-50/40 text-emerald-800' },
  { hall: 'Conference Room 1', cap: '20 Learners', status: 'OCCUPIED', border: 'border-rose-200 bg-rose-50/40 text-rose-800' },
  { hall: 'Computer Lab 2', cap: '30 Learners', status: 'AVAILABLE', border: 'border-emerald-200 bg-emerald-50/40 text-emerald-800' }
];

const DEFAULT_SESSIONS = [
  { id: 'SES-001', time: '10:00 AM - 12:00 PM', program: '46th Batch Induction Course for ISS Probationers', trainer: 'Dr. Ramesh Kumar', venue: 'Lecture Hall A', batch: 'ISS-46', mode: 'offline' },
  { id: 'SES-002', time: '02:00 PM - 04:00 PM', program: 'Time Series & Forecasting Applied Practicum', trainer: 'Prof. Ananya Sen', venue: 'Computer Lab 2', batch: 'REF-2026', mode: 'online' }
];

export default function TrainingModule({ activeSubTab, setActiveSubTab, theme }) {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('lms_programs');
    return saved ? JSON.parse(saved) : DEFAULT_PROGRAMS;
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('lms_faculty');
    return saved ? JSON.parse(saved) : DEFAULT_FACULTY;
  });

  const [venues, setVenues] = useState(() => {
    const saved = localStorage.getItem('lms_venues');
    return saved ? JSON.parse(saved) : DEFAULT_VENUES;
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('lms_sessions');
    return saved ? JSON.parse(saved) : DEFAULT_SESSIONS;
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('lms_programs', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('lms_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('lms_venues', JSON.stringify(venues));
  }, [venues]);

  useEffect(() => {
    localStorage.setItem('lms_sessions', JSON.stringify(sessions));
  }, [sessions]);

  // Form input states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('overview'); // overview, catalog
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [newProgram, setNewProgram] = useState({ name: '', type: 'induction', duration: '1 Week', venue: 'Lecture Hall A', trainer: 'Dr. Ramesh Kumar', batch: '', startDate: '', mode: 'offline' });

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [newSession, setNewSession] = useState({ time: '10:00 AM - 12:00 PM', program: '', trainer: '', venue: '', batch: '', mode: 'offline' });

  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [newFaculty, setNewFaculty] = useState({ name: '', des: 'Senior Advisor', dept: 'Applied Statistics', course: '', load: '2 Lectures/Week' });

  const handleCreateProgram = (e) => {
    e.preventDefault();
    if (!newProgram.name) return;
    const added = {
      id: `PROG-${Math.floor(100 + Math.random() * 900)}`,
      ...newProgram,
      status: 'upcoming'
    };
    setPrograms([...programs, added]);
    setShowProgramModal(false);
    setNewProgram({ name: '', type: 'induction', duration: '1 Week', venue: 'Lecture Hall A', trainer: 'Dr. Ramesh Kumar', batch: '', startDate: '', mode: 'offline' });
  };

  const handleCreateSession = (e) => {
    e.preventDefault();
    const added = {
      id: `SES-${Math.floor(100 + Math.random() * 900)}`,
      ...newSession
    };
    setSessions([...sessions, added]);
    setShowSessionModal(false);
  };

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    const added = {
      ...newFaculty,
      status: 'Active'
    };
    setFaculty([...faculty, added]);
    setShowFacultyModal(false);
  };

  const toggleVenue = (index) => {
    const updated = [...venues];
    const prev = updated[index];
    if (prev.status === 'AVAILABLE') {
      prev.status = 'OCCUPIED';
      prev.border = 'border-rose-200 bg-rose-50/40 text-rose-800';
    } else {
      prev.status = 'AVAILABLE';
      prev.border = 'border-emerald-200 bg-emerald-50/40 text-emerald-800';
    }
    setVenues(updated);
  };

  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = prog.name.toLowerCase().includes(searchQuery.toLowerCase()) || prog.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || prog.type === filterType;
    return matchesSearch && matchesType;
  });

  const getBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'upcoming': return 'bg-blue-50 text-blue-700 border border-blue-200';
      default: return 'bg-slate-50 text-slate-600 border border-gray-200';
    }
  };

  const getTabCategoryLabel = (cat) => {
    switch (cat) {
      case 'induction': return 'Induction Training';
      case 'refresher': return 'Refresher Training';
      case 'domain': return 'Domain Training';
      case 'international': return 'International Training';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Dynamic Sub-Tab Content */}
      {['all', 'induction', 'refresher', 'domain', 'international'].includes(activeSubTab) && (
        <div className="space-y-6">
          {activeSubTab === 'all' && viewMode === 'overview' ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Premium Dashboard Header Banner */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white rounded-2xl p-6 shadow-md relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 z-10">
                  <h3 className="text-xl font-extrabold tracking-tight">Academic Courses & Training Dashboard</h3>
                  <p className="text-xs text-emerald-100 font-medium">Comprehensive insight report of active intakes, faculty assignments, classroom occupancies, and curricular pathways.</p>
                </div>
                <button
                  onClick={() => setViewMode('catalog')}
                  className="px-4.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all cursor-pointer shrink-0 z-10 flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Browse Detailed Catalog Table
                </button>
              </div>

              {/* Dynamic Stats Metrics Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 p-4.5 rounded-2xl shadow-3xs text-left relative overflow-hidden hover:shadow-xs transition-shadow">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Programs</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{programs.length}</p>
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block mt-2 font-sans">
                    Induction, Refresher, Domain
                  </span>
                </div>

                <div className="bg-white border border-gray-200 p-4.5 rounded-2xl shadow-3xs text-left relative overflow-hidden hover:shadow-xs transition-shadow">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mapped Faculty</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{faculty.length}</p>
                  <span className="text-[9px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block mt-2 font-sans">
                    Applied Statistics, Macro
                  </span>
                </div>

                <div className="bg-white border border-gray-200 p-4.5 rounded-2xl shadow-3xs text-left relative overflow-hidden hover:shadow-xs transition-shadow">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Daily Schedules</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">{sessions.length} Classes</p>
                  <span className="text-[9px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded border border-purple-100 inline-block mt-2 font-sans">
                    Lecture timings active
                  </span>
                </div>

                <div className="bg-white border border-gray-200 p-4.5 rounded-2xl shadow-3xs text-left relative overflow-hidden hover:shadow-xs transition-shadow">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue Uptime</p>
                  <p className="text-2xl font-black text-slate-800 tracking-tight mt-1">
                    {venues.filter(v => v.status === 'OCCUPIED').length} / {venues.length} Occupied
                  </p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(venues.filter(v => v.status === 'OCCUPIED').length / venues.length) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* 4 Category Cards (Induction, Refresher, Domain, International) */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-800 text-sm font-sans tracking-tight">Active Curricular Pathways Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      id: 'induction',
                      name: 'Induction Training',
                      desc: 'Foundation and core syllabus modules for newly appointed ISS Probationary Officers.',
                      themeColor: 'border-emerald-250 bg-emerald-50/10 text-emerald-800',
                      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                      icon: (
                        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      )
                    },
                    {
                      id: 'refresher',
                      name: 'Refresher Training',
                      desc: 'Advanced mid-career training cycles focusing on econometric analytics and statistical models.',
                      themeColor: 'border-blue-200 bg-blue-50/10 text-blue-800',
                      badge: 'bg-blue-100 text-blue-800 border-blue-200',
                      icon: (
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                        </svg>
                      )
                    },
                    {
                      id: 'domain',
                      name: 'Domain Training',
                      desc: 'Specialized statistical methods (SDG metrics, survey sampling designs, national estimations).',
                      themeColor: 'border-purple-200 bg-purple-50/10 text-purple-800',
                      badge: 'bg-purple-100 text-purple-800 border-purple-200',
                      icon: (
                        <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )
                    },
                    {
                      id: 'international',
                      name: 'International Training',
                      desc: 'Seminars and forums for global officers from SAARC and international statistical registries.',
                      themeColor: 'border-amber-200 bg-amber-50/10 text-amber-800',
                      badge: 'bg-amber-100 text-amber-800 border-amber-200',
                      icon: (
                        <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      )
                    }
                  ].map(cat => {
                    const activeProg = programs.find(p => p.type === cat.id);
                    return (
                      <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xs hover:scale-[1.01] transition-all flex flex-col justify-between text-left space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {cat.icon}
                              <h5 className="font-extrabold text-slate-800 text-sm">{cat.name}</h5>
                            </div>
                            <span className="text-[10px] text-slate-450 font-bold bg-slate-100 px-2 py-0.5 rounded-md uppercase font-sans">Active</span>
                          </div>
                          <p className="text-xs text-slate-455 leading-relaxed font-semibold">{cat.desc}</p>
                        </div>

                        {activeProg ? (
                          <div className="p-3.5 bg-slate-50/80 border rounded-xl space-y-2.5">
                            <div className="flex justify-between items-start">
                              <p className="text-xs font-black text-slate-800 leading-snug max-w-[80%]">{activeProg.name}</p>
                              <span className="text-[9px] font-mono font-bold text-slate-450">{activeProg.id}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-slate-550 font-bold border-t border-slate-150/40 pt-2 font-sans">
                              <span>Duration: <strong className="text-slate-700">{activeProg.duration}</strong></span>
                              <span>Venue: <strong className="text-slate-700">{activeProg.venue}</strong></span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-slate-550 font-bold font-sans">
                              <span>Coordinator: <strong className="text-slate-700">{activeProg.trainer}</strong></span>
                              <span className="capitalize">Mode: <strong className="text-emerald-700">{activeProg.mode}</strong></span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-slate-50/50 border border-dashed rounded-xl text-center">
                            <p className="text-[11px] text-slate-400 italic">No program currently scheduled under this category</p>
                          </div>
                        )}

                        <button
                          onClick={() => {
                            setActiveSubTab(cat.id);
                          }}
                          className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl shadow-3xs cursor-pointer transition-colors"
                        >
                          Manage {cat.name} Category
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Today's Schedules timeline preview */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-3xs space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm font-sans tracking-tight">Today's Active Timetable Preview</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Real-time scheduled lecture tracks across statistical training halls.</p>
                  </div>
                  <button
                    onClick={() => setActiveSubTab('schedules')}
                    className="text-xs text-emerald-600 hover:text-emerald-800 font-extrabold cursor-pointer hover:underline"
                  >
                    View Timetable Desk
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sessions.map(ses => (
                    <div key={ses.id} className="p-4 border border-slate-150 hover:border-emerald-400/60 hover:bg-slate-50/20 rounded-xl transition-all flex flex-col justify-between space-y-3 relative overflow-hidden text-left bg-slate-50/5">
                      <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500"></div>
                      <div className="space-y-1">
                        <span className="text-[9px] bg-slate-100 border px-1.5 py-0.2 rounded font-black text-slate-500 font-mono">{ses.time}</span>
                        <h5 className="font-extrabold text-xs sm:text-sm text-slate-800 pt-1 leading-snug">{ses.program}</h5>
                        <p className="text-[11px] text-slate-400 font-bold">Trainer: <span className="text-slate-700">{ses.trainer}</span></p>
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-bold border-t pt-2 border-slate-100 font-sans">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{ses.venue}</span>
                        <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-black">Group {ses.batch}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Action Header Card */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-3 items-center">
                  {activeSubTab === 'all' && (
                    <button
                      onClick={() => setViewMode('overview')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-250 text-slate-700 font-extrabold text-xs rounded-xl shadow-3xs cursor-pointer flex items-center gap-1.5 mr-2"
                    >
                      ← Dashboard Overview
                    </button>
                  )}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search training code/name..."
                    className="bg-slate-50 border border-slate-200 text-xs px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 font-bold"
                  >
                    <option value="all">All Categories</option>
                    <option value="induction">Induction</option>
                    <option value="refresher">Refresher</option>
                    <option value="domain">Domain</option>
                    <option value="international">International</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    setNewProgram(p => ({ ...p, type: activeSubTab === 'all' ? 'induction' : activeSubTab }));
                    setShowProgramModal(true);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  + Create Training Program
                </button>
              </div>

              {/* Program Registry Grid / Table */}
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="p-5 border-b border-gray-150 flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-slate-800 font-sans">
                      {activeSubTab === 'all' ? 'All Active & Upcoming Training Catalog' : `${getTabCategoryLabel(activeSubTab)} Catalog`}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">MoSPI accredited educational and training programs registry.</p>
                  </div>
                  <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 font-black px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                    {filteredPrograms.filter(p => activeSubTab === 'all' || p.type === activeSubTab).length} Active Rows
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-semibold text-slate-655">
                    <thead className="bg-slate-50 border-b border-gray-150 uppercase tracking-wider text-slate-400 font-black text-[10px]">
                      <tr>
                        <th className="p-4">Code</th>
                        <th className="p-4">Program Name</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Duration</th>
                        <th className="p-4">Batch Code</th>
                        <th className="p-4">Mode</th>
                        <th className="p-4">Trainer / Faculty</th>
                        <th className="p-4">Venue</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
                      {filteredPrograms
                        .filter(prog => activeSubTab === 'all' || prog.type === activeSubTab)
                        .map((prog) => (
                          <tr key={prog.id} className="hover:bg-slate-50/50">
                            <td className="p-4 font-mono font-bold text-slate-500">{prog.id}</td>
                            <td className="p-4 font-extrabold text-slate-850">{prog.name}</td>
                            <td className="p-4">
                              <span className="bg-slate-100 border border-gray-200 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                                {prog.type}
                              </span>
                            </td>
                            <td className="p-4">{prog.duration}</td>
                            <td className="p-4 font-bold text-indigo-700">{prog.batch || 'TBA'}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                                prog.mode === 'online' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                                prog.mode === 'hybrid' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                                'bg-slate-100 text-slate-700 border border-gray-200'
                              }`}>
                                {prog.mode}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-800">{prog.trainer}</td>
                            <td className="p-4 text-slate-600 font-semibold">{prog.venue}</td>
                            <td className="p-4">
                              <button
                                onClick={() => setPrograms(programs.filter(p => p.id !== prog.id))}
                                className="text-red-500 hover:text-red-700 font-black cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Session Schedules Tab */}
      {activeSubTab === 'schedules' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-3xs flex justify-between items-center">
            <div>
              <h4 className="font-extrabold text-slate-800 font-sans">Academic Sessions Scheduler</h4>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Programmatic schedule maps for classrooms and lecture timings.</p>
            </div>
            <button
              onClick={() => {
                if (programs.length > 0) {
                  setNewSession(s => ({ ...s, program: programs[0].name, trainer: programs[0].trainer, venue: programs[0].venue, batch: programs[0].batch || 'TBA' }));
                }
                setShowSessionModal(true);
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
            >
              + Schedule Session
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 text-sm">Today's Class Timetable</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessions.map(ses => (
                <div key={ses.id} className="p-4 border border-gray-200 hover:border-emerald-400/60 hover:bg-slate-50/20 rounded-xl transition-all flex flex-col justify-between space-y-3 shadow-3xs relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-1.5 h-full bg-emerald-500"></div>
                  <div className="space-y-1">
                    <span className="text-[9px] bg-slate-100 border px-1.5 py-0.2 rounded font-black text-slate-500">{ses.time}</span>
                    <h5 className="font-extrabold text-sm text-slate-800 pt-1 leading-snug">{ses.program}</h5>
                    <p className="text-xs text-slate-400 font-bold">Trainer: <span className="text-slate-700">{ses.trainer}</span></p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold border-t pt-2 border-gray-100">
                    <span className="bg-slate-100 px-2 py-0.5 rounded">{ses.venue}</span>
                    <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded font-black">Group {ses.batch}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Faculty Mapping Tab */}
      {activeSubTab === 'faculty' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-3xs flex justify-between items-center">
            <div>
              <h4 className="font-extrabold text-slate-800 font-sans">Faculty & Instructor Mapping Register</h4>
              <p className="text-xs text-slate-455 mt-0.5">Assign professors and coordinators to academic course loads.</p>
            </div>
            <button
              onClick={() => setShowFacultyModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
            >
              + Add New Faculty
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-655">
                <thead className="bg-slate-50 border-b border-gray-150 uppercase tracking-wider text-slate-400 font-black text-[10px]">
                  <tr>
                    <th className="p-4">Faculty Name</th>
                    <th className="p-4">Designation</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Assigned Active Course</th>
                    <th className="p-4">Load Registry</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700">
                  {faculty.map((fac, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-extrabold text-slate-850">{fac.name}</td>
                      <td className="p-4">{fac.des}</td>
                      <td className="p-4">{fac.dept}</td>
                      <td className="p-4 font-bold text-emerald-800">{fac.course || 'Unassigned'}</td>
                      <td className="p-4">
                        <span className="text-[10px] text-slate-550 font-bold bg-slate-100 border border-gray-200 rounded px-2 py-0.5">{fac.load}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[9px] font-black tracking-wider">
                          {fac.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Venue Allocation Tab */}
      {activeSubTab === 'venues' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <h4 className="font-extrabold text-slate-800 font-sans">Venue & Lecture Hall Allocations</h4>
            <p className="text-xs text-slate-455 font-semibold mt-0.5">Real-time room checker. Click a venue card to toggle booking availability status.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-semibold text-slate-655 pt-2">
            {venues.map((ven, index) => (
              <div
                key={ven.hall}
                onClick={() => toggleVenue(index)}
                className={`p-4 border rounded-xl shadow-3xs flex flex-col justify-between h-28 cursor-pointer hover:shadow-sm hover:scale-[1.01] transition-all select-none ${ven.border}`}
              >
                <div>
                  <p className="text-xs font-black text-slate-800">{ven.hall}</p>
                  <p className="text-[10px] text-slate-450 mt-0.5">Capacity: {ven.cap}</p>
                </div>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded border inline-block mt-3 w-max ${
                  ven.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800 border-emerald-250' : 'bg-rose-100 text-rose-800 border-rose-250'
                }`}>
                  {ven.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PROGRAM MODAL ── */}
      {showProgramModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowProgramModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Add New Training Course Program</h3>
              <button onClick={() => setShowProgramModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreateProgram} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-450 uppercase">Program Course Title</label>
                <input
                  type="text" required placeholder="e.g. 47th ISS Induction Training..."
                  value={newProgram.name} onChange={e => setNewProgram({ ...newProgram, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-450 uppercase">Training Category</label>
                  <select
                    value={newProgram.type} onChange={e => setNewProgram({ ...newProgram, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="induction">Induction</option>
                    <option value="refresher">Refresher</option>
                    <option value="domain">Domain</option>
                    <option value="international">International</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-450 uppercase">Duration</label>
                  <input
                    type="text" required placeholder="e.g. 2 Weeks"
                    value={newProgram.duration} onChange={e => setNewProgram({ ...newProgram, duration: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Training Mode</label>
                  <select
                    value={newProgram.mode} onChange={e => setNewProgram({ ...newProgram, mode: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Batch Allocation Code</label>
                  <input
                    type="text" required placeholder="e.g. ISS-47"
                    value={newProgram.batch} onChange={e => setNewProgram({ ...newProgram, batch: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Allocated Lecture Hall</label>
                  <select
                    value={newProgram.venue} onChange={e => setNewProgram({ ...newProgram, venue: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {venues.map(v => <option key={v.hall} value={v.hall}>{v.hall}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Trainer Coordinator</label>
                  <select
                    value={newProgram.trainer} onChange={e => setNewProgram({ ...newProgram, trainer: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {faculty.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowProgramModal(false)} className="px-4 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer">Log Course</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SESSION MODAL ── */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowSessionModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Schedule Active Classroom Session</h3>
              <button onClick={() => setShowSessionModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreateSession} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-450 uppercase">Parent Training Program</label>
                <select
                  value={newSession.program} onChange={e => {
                    const match = programs.find(p => p.name === e.target.value);
                    setNewSession({ ...newSession, program: e.target.value, trainer: match ? match.trainer : '', venue: match ? match.venue : '', batch: match ? match.batch : 'TBA' });
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {programs.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-450 uppercase">Timing Slot</label>
                  <select
                    value={newSession.time} onChange={e => setNewSession({ ...newSession, time: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:30 AM - 01:30 PM">11:30 AM - 01:30 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:30 PM - 06:30 PM">04:30 PM - 06:30 PM</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-450 uppercase">Lecture Venue</label>
                  <select
                    value={newSession.venue} onChange={e => setNewSession({ ...newSession, venue: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {venues.map(v => <option key={v.hall} value={v.hall}>{v.hall}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowSessionModal(false)} className="px-4 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer">Add Schedule</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── FACULTY MODAL ── */}
      {showFacultyModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowFacultyModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Map New Faculty Trainer</h3>
              <button onClick={() => setShowFacultyModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreateFaculty} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-450 uppercase">Faculty Full Name</label>
                <input
                  type="text" required placeholder="e.g. Dr. Harish Prasad..."
                  value={newFaculty.name} onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-450 uppercase">Designation</label>
                  <input
                    type="text" required placeholder="e.g. Professor / Director"
                    value={newFaculty.des} onChange={e => setNewFaculty({ ...newFaculty, des: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-450 uppercase">Department</label>
                  <input
                    type="text" required placeholder="e.g. Survey Methodology Cell"
                    value={newFaculty.dept} onChange={e => setNewFaculty({ ...newFaculty, dept: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowFacultyModal(false)} className="px-4 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl cursor-pointer">Assign Registry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
