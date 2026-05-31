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
      case 'induction': return '🎓 Induction Training';
      case 'refresher': return '🔄 Refresher Training';
      case 'domain': return '💻 Domain Training';
      case 'international': return '🌎 International Training';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Dynamic Sub-Tab Content */}
      {['all', 'induction', 'refresher', 'domain', 'international'].includes(activeSubTab) && (
        <div className="space-y-6">
          {/* Action Header Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-3xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-3 items-center">
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
                    <span className="bg-slate-100 px-2 py-0.5 rounded">📍 {ses.venue}</span>
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
