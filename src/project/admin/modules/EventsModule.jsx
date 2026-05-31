import React, { useState, useEffect } from 'react';

// Seeding default campus events
const DEFAULT_EVENTS = [
  { id: 'EVT-001', name: 'National Statistical Academy General Quiz 2026', type: 'Quiz Event', date: '2026-06-05', capacity: 50, registrants: 42, status: 'registration_open', venue: 'Lecture Hall A', desc: 'An academy-wide quiz covering core statistical algorithms, ISS guidelines, and MoSPI history.' },
  { id: 'EVT-002', name: 'Economic Policy Writing & Forecasting Contest', type: 'Essay Competition', date: '2026-06-12', capacity: 30, registrants: 18, status: 'pending_submissions', venue: 'Computer Lab 2', desc: 'Essay competition on macroeconomic trends, structural regressions, and statistical index frameworks.' },
  { id: 'EVT-003', name: 'NSTA Annual Inter-Batch Table Tennis Cup', type: 'Sports Event', date: '2026-06-20', capacity: 64, registrants: 32, status: 'registration_open', venue: 'Campus Recreation Lounge', desc: 'Table tennis tournament for probationers, external delegates, and academy directorate staff.' }
];

const DEFAULT_REGISTRANTS = {
  'EVT-001': [
    { name: 'Amit Kumar', email: 'amit.iss@mospi.gov.in', dept: '46th ISS Batch', status: 'Approved' },
    { name: 'Priya Singh', email: 'priya.s@mospi.gov.in', dept: '46th ISS Batch', status: 'Pending' }
  ],
  'EVT-002': [
    { name: 'Rohan Sharma', email: 'rohan.s@mospi.gov.in', dept: 'National Accounts Statistics', status: 'Approved' }
  ]
};

const JUNE_2026 = { year: 2026, month: 'June', firstDayOffset: 0, totalDays: 30 }; // June 1, 2026 is a Monday

export default function EventsModule({ activeSubTab, setActiveSubTab, theme }) {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('lms_events');
    return saved ? JSON.parse(saved) : DEFAULT_EVENTS;
  });

  const [registrants, setRegistrants] = useState(() => {
    const saved = localStorage.getItem('lms_registrants');
    return saved ? JSON.parse(saved) : DEFAULT_REGISTRANTS;
  });

  useEffect(() => {
    localStorage.setItem('lms_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('lms_registrants', JSON.stringify(registrants));
  }, [registrants]);

  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ name: '', type: 'Quiz Event', date: '', capacity: 40, venue: 'Lecture Hall A', desc: '' });
  const [selectedDayEvent, setSelectedDayEvent] = useState(null);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.date) return;
    const added = {
      id: `EVT-${Math.floor(100 + Math.random() * 900)}`,
      ...newEvent,
      registrants: 0,
      status: 'draft'
    };
    setEvents([...events, added]);
    setShowEventModal(false);
    setNewEvent({ name: '', type: 'Quiz Event', date: '', capacity: 40, venue: 'Lecture Hall A', desc: '' });
  };

  const advanceEventStatus = (id) => {
    setEvents(events.map(evt => {
      if (evt.id !== id) return evt;
      let nextStatus = 'draft';
      if (evt.status === 'draft') nextStatus = 'published';
      else if (evt.status === 'published') nextStatus = 'registration_open';
      else if (evt.status === 'registration_open') nextStatus = 'pending_submissions';
      else if (evt.status === 'pending_submissions') nextStatus = 'completed';
      return { ...evt, status: nextStatus };
    }));
  };

  const incrementRegistrants = (id) => {
    setEvents(events.map(evt => {
      if (evt.id !== id) return evt;
      if (evt.registrants >= evt.capacity) return evt;
      return { ...evt, registrants: evt.registrants + 1 };
    }));
    // Add a quick mock registrant
    const list = registrants[id] || [];
    const addedUser = {
      name: `Self Registrant ${list.length + 1}`,
      email: `trainee.${list.length + 1}@mospi.gov.in`,
      dept: 'Public Nominee Unit',
      status: 'Approved'
    };
    setRegistrants({
      ...registrants,
      [id]: [...list, addedUser]
    });
  };

  const handleTriageRegistrant = (evtId, index, status) => {
    const list = [...(registrants[evtId] || [])];
    list[index].status = status;
    setRegistrants({
      ...registrants,
      [evtId]: list
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-600 border border-gray-200';
      case 'published': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'registration_open': return 'bg-emerald-50 text-emerald-700 border border-emerald-250';
      case 'pending_submissions': return 'bg-amber-50 text-amber-700 border border-amber-250';
      case 'completed': return 'bg-purple-50 text-purple-750 border border-purple-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getDotColor = (type) => {
    switch (type) {
      case 'Quiz Event': return 'bg-indigo-500';
      case 'Essay Competition': return 'bg-amber-500';
      case 'Sports Event': return 'bg-emerald-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Overview summaries sub-tab */}
      {activeSubTab === 'all' && (
        <div className="space-y-6">
          {/* Metrics summary widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-450 font-black uppercase">Published Events</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{events.filter(e => e.status !== 'draft').length} Live</p>
              <p className="text-[10px] text-amber-700 mt-1.5 font-bold">✓ Active registrations</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase">Total Nominees Logged</p>
              <p className="text-3xl font-black text-slate-800 mt-1">
                {events.reduce((sum, e) => sum + e.registrants, 0)} Registrants
              </p>
              <p className="text-[10px] text-blue-600 mt-1.5 font-bold">👥 Across sports & academic categories</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase">System Certifications</p>
              <p className="text-3xl font-black text-slate-800 mt-1">
                {events.filter(e => e.status === 'completed').length * 24 + 42} Issued
              </p>
              <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">✓ Cryptographically Sealed Registry</p>
            </div>
          </div>

          {/* Core Extracurricular Events catalog */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-gray-150 flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-slate-800 font-sans">MoSPI Extracurricular Events Board</h4>
                <p className="text-xs text-slate-455 mt-0.5">Statistical quizzes, sports leagues, and essay writing milestones.</p>
              </div>
              <button
                onClick={() => setShowEventModal(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
              >
                + Publish Event
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
                <thead className="bg-slate-50 border-b border-gray-150 uppercase tracking-wider text-slate-400 font-black text-[10px]">
                  <tr>
                    <th className="p-4">Event Code</th>
                    <th className="p-4">Event Category</th>
                    <th className="p-4">Event Title</th>
                    <th className="p-4">Scheduled Date</th>
                    <th className="p-4">Capacity Gauge</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                  {events.map(evt => (
                    <tr key={evt.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-450">{evt.id}</td>
                      <td className="p-4">
                        <span className="bg-slate-100 border px-2 py-0.5 rounded text-[9px] font-black uppercase text-slate-600">{evt.type}</span>
                      </td>
                      <td className="p-4 font-extrabold text-slate-800">{evt.name}</td>
                      <td className="p-4 font-bold">{evt.date}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{evt.registrants} / {evt.capacity}</span>
                          <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${Math.min(100, (evt.registrants / evt.capacity) * 100)}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border ${getStatusBadge(evt.status)}`}>
                          {evt.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 space-x-1.5">
                        <button
                          onClick={() => advanceEventStatus(evt.id)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[10px] font-black text-slate-700 rounded-lg cursor-pointer transition-all"
                        >
                          Cycle Status ➔
                        </button>
                        {evt.status === 'registration_open' && (
                          <button
                            onClick={() => incrementRegistrants(evt.id)}
                            className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-250 text-[10px] font-black text-amber-800 rounded-lg cursor-pointer transition-all"
                          >
                            +1 Nominee
                          </button>
                        )}
                        <button
                          onClick={() => setEvents(events.filter(e => e.id !== evt.id))}
                          className="text-red-500 hover:text-red-700 font-extrabold cursor-pointer"
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

      {/* Training Calendar / Faculty Calendar / Trainee Calendar month view grid */}
      {['training_cal', 'faculty_cal', 'trainee_cal'].includes(activeSubTab) && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-slate-800 capitalize font-sans">{activeSubTab.replace('_', ' ')} Grid View</h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Click any highlighted day event to display scheduled session insights.</p>
              </div>
              <span className="bg-amber-50 border border-amber-250 text-amber-800 font-black px-3 py-1 rounded-xl text-xs">
                📅 June 2026
              </span>
            </div>

            {/* Calendar Grid 7 columns */}
            <div className="grid grid-cols-7 gap-1 text-center font-sans font-extrabold text-xs text-slate-500 border-b border-gray-200 pb-2">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                <div key={day} className="p-2 text-[10px] font-black text-slate-400">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5 font-sans font-bold text-xs select-none">
              {Array.from({ length: 30 }).map((_, index) => {
                const dayNumber = index + 1;
                const formattedDate = `2026-06-${dayNumber < 10 ? '0' + dayNumber : dayNumber}`;
                const matchedEvents = events.filter(e => e.date === formattedDate);

                return (
                  <div
                    key={dayNumber}
                    onClick={() => {
                      if (matchedEvents.length > 0) {
                        setSelectedDayEvent(matchedEvents[0]);
                      } else {
                        alert(`Day ${dayNumber} is completely free. Click 'Publish Event' to add an item here.`);
                      }
                    }}
                    className={`p-2.5 rounded-xl border flex flex-col justify-between items-start h-24 transition-all cursor-pointer ${
                      matchedEvents.length > 0
                        ? 'border-amber-200 bg-amber-50/20 hover:bg-amber-100/30'
                        : 'border-gray-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-[11px] text-slate-400 font-black">{dayNumber}</span>
                    {matchedEvents.map(evt => (
                      <span
                        key={evt.id}
                        className={`text-[8.5px] text-white font-extrabold px-1.5 py-0.5 rounded truncate w-full block text-left mt-1 ${getDotColor(evt.type)}`}
                      >
                        {evt.name}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Campus Events tab: publisher + event register triage */}
      {activeSubTab === 'campus_events' && (
        <div className="space-y-6">
          {/* Publisher */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 font-sans">Publish Extracurricular Activity</h4>
            <form onSubmit={handleCreateEvent} className="border-t border-gray-100 pt-4 space-y-4 font-semibold text-slate-600 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Event Name Title</label>
                  <input
                    type="text" required placeholder="e.g. Annual Badminton Tournament..."
                    value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Event Category Type</label>
                  <select
                    value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Quiz Event">Quiz Event</option>
                    <option value="Sports Event">Sports Event</option>
                    <option value="Essay Competition">Essay Competition</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Target Date</label>
                  <input
                    type="date" required
                    value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Capacity Limit</label>
                  <input
                    type="number" required
                    value={newEvent.capacity} onChange={e => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) || 40 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Venue location</label>
                  <input
                    type="text" required placeholder="e.g. Recreation Hall"
                    value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Detailed Description</label>
                <textarea
                  placeholder="Describe event criteria, scoring system, and instructions..."
                  value={newEvent.desc} onChange={e => setNewEvent({ ...newEvent, desc: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none h-16"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs rounded-xl cursor-pointer"
              >
                Publish Campus Event
              </button>
            </form>
          </div>

          {/* Registrations list per event triage */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 font-sans">Active Registrants / Nominees Ledger</h4>
            <div className="space-y-5">
              {events.map(evt => {
                const list = registrants[evt.id] || [];
                return (
                  <div key={evt.id} className="border border-gray-150 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="font-extrabold text-slate-800 text-xs">{evt.name}</span>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-500">
                        {list.length} nominations logged
                      </span>
                    </div>
                    {list.length === 0 ? (
                      <p className="text-[10px] text-slate-400 italic">No nominees currently registered for this event.</p>
                    ) : (
                      <div className="space-y-2 pt-1">
                        {list.map((reg, rIdx) => (
                          <div key={rIdx} className="flex justify-between items-center text-xs border-b border-slate-50 pb-1.5">
                            <div>
                              <p className="font-bold text-slate-800">{reg.name} <span className="text-slate-400 font-medium">({reg.email})</span></p>
                              <p className="text-[10px] text-slate-450">{reg.dept}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border ${
                                reg.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                reg.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                                'bg-amber-50 text-amber-700 border-amber-250'
                              }`}>{reg.status}</span>
                              {reg.status === 'Pending' && (
                                <div className="space-x-1 font-bold">
                                  <button onClick={() => handleTriageRegistrant(evt.id, rIdx, 'Approved')} className="text-emerald-600 hover:text-emerald-800 cursor-pointer">Approve</button>
                                  <span className="text-slate-300">|</span>
                                  <button onClick={() => handleTriageRegistrant(evt.id, rIdx, 'Rejected')} className="text-red-500 hover:text-red-700 cursor-pointer">Reject</button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── CREATE EVENT MODAL ── */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowEventModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Publish Extracurricular Event</h3>
              <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Event Activity Title</label>
                <input
                  type="text" required placeholder="e.g. Academy General Quiz..."
                  value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Category Type</label>
                  <select
                    value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="Quiz Event">Quiz Event</option>
                    <option value="Sports Event">Sports Event</option>
                    <option value="Essay Competition">Essay Competition</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Target Date</label>
                  <input
                    type="date" required
                    value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Maximum Capacity</label>
                  <input
                    type="number" required
                    value={newEvent.capacity} onChange={e => setNewEvent({ ...newEvent, capacity: parseInt(e.target.value) || 40 })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Venue Location</label>
                  <input
                    type="text" required placeholder="e.g. Auditorium Hall"
                    value={newEvent.venue} onChange={e => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowEventModal(false)} className="px-4 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-amber-700 hover:bg-amber-850 text-white font-black rounded-xl cursor-pointer">Publish Event</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SELECTED EVENT DETAIL MODAL ── */}
      {selectedDayEvent && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedDayEvent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b pb-2">
              <div>
                <span className={`px-2 py-0.5 rounded text-[8.5px] font-black uppercase text-white ${getDotColor(selectedDayEvent.type)}`}>
                  {selectedDayEvent.type}
                </span>
                <h3 className="text-sm font-extrabold text-slate-800 mt-1.5">{selectedDayEvent.name}</h3>
              </div>
              <button onClick={() => setSelectedDayEvent(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-3 font-semibold text-slate-600 text-xs">
              <p className="text-slate-500 leading-normal font-medium">{selectedDayEvent.desc || 'No further description details available.'}</p>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
                <p>🗓️ Date: <span className="text-slate-800 font-bold">{selectedDayEvent.date}</span></p>
                <p>📍 Location: <span className="text-slate-800 font-bold">{selectedDayEvent.venue}</span></p>
                <p>👥 Enrolled: <span className="text-slate-800 font-bold">{selectedDayEvent.registrants} / {selectedDayEvent.capacity}</span></p>
                <p>✨ State: <span className="text-slate-850 capitalize font-bold">{selectedDayEvent.status.replace('_', ' ')}</span></p>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={() => setSelectedDayEvent(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
