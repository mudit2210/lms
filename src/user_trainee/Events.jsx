import React, { useState, useEffect } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('trainee_events');
    if (saved) {
      setEvents(JSON.parse(saved));
    } else {
      const seed = [
        { id: 'EVT-001', title: 'Annual Sports Day 2026', type: 'Sports', date: '2026-06-15', time: '8:00 AM - 5:00 PM', venue: 'NSSTA Sports Complex', description: 'Annual inter-batch sports competition featuring cricket, badminton, table tennis, volleyball, and athletics. All trainees are encouraged to participate.', status: 'Upcoming', registered: true },
        { id: 'EVT-002', title: 'Essay Competition: Data for Development', type: 'Essay', date: '2026-06-18', time: '2:00 PM - 4:00 PM', venue: 'Seminar Hall', description: 'Write a 2000-word essay on "Role of Official Statistics in Achieving SDGs". Top 3 entries will receive certificates of appreciation from Director General.', status: 'Upcoming', registered: false },
        { id: 'EVT-003', title: 'Inter-Batch Quiz Competition', type: 'Quiz', date: '2026-06-22', time: '3:00 PM - 5:00 PM', venue: 'Conference Hall', description: 'Team-based quiz competition covering statistics, current affairs, and general knowledge. Teams of 3 members each.', status: 'Upcoming', registered: false },
        { id: 'EVT-004', title: 'National Seminar on Official Statistics for SDGs', type: 'Seminar', date: '2026-06-29', time: '10:00 AM - 4:00 PM', venue: 'NSSTA Auditorium', description: 'National-level seminar with speakers from MoSPI, UNDP, World Bank, and leading academic institutions. Attendance mandatory for all ISS probationers.', status: 'Upcoming', registered: true },
        { id: 'EVT-005', title: 'Cultural Evening & Talent Show', type: 'Cultural', date: '2026-06-24', time: '6:00 PM - 9:00 PM', venue: 'Open Air Theatre', description: 'Valedictory cultural programme for Time Series Analysis batch. Music, dance, skits, and poetry performances by trainees.', status: 'Upcoming', registered: true },
        { id: 'EVT-006', title: 'Yoga & Wellness Workshop', type: 'Sports', date: '2026-06-21', time: '6:00 AM - 7:30 AM', venue: 'Lawn Area', description: 'International Yoga Day special workshop conducted by certified yoga instructor. Open to all campus residents.', status: 'Upcoming', registered: false },
        { id: 'EVT-007', title: 'Photography Contest: Campus Life', type: 'Cultural', date: '2026-06-10', time: 'All Day', venue: 'NSSTA Campus', description: 'Capture the best moments of campus life. Submit up to 3 photographs. Winners announced on Sports Day.', status: 'Ongoing', registered: true },
      ];
      localStorage.setItem('trainee_events', JSON.stringify(seed));
      setEvents(seed);
    }
  }, []);

  const types = ['All', 'Sports', 'Quiz', 'Essay', 'Seminar', 'Cultural'];
  const filtered = filterType === 'All' ? events : events.filter(e => e.type === filterType);

  const handleRegister = (eventId) => {
    const updated = events.map(e => e.id === eventId ? { ...e, registered: true } : e);
    setEvents(updated);
    localStorage.setItem('trainee_events', JSON.stringify(updated));
    alert('Successfully registered for the event!');
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Sports': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Quiz': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Essay': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Seminar': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cultural': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getTypeEmoji = (type) => {
    switch (type) {
      case 'Sports': return '🏅';
      case 'Quiz': return '🧠';
      case 'Essay': return '✍️';
      case 'Seminar': return '🎤';
      case 'Cultural': return '🎭';
      default: return '📅';
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800">Events & Activities</h1>
        <p className="text-xs text-slate-500 mt-0.5">Sports, quizzes, essay competitions, seminars, and cultural programmes at NSSTA.</p>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-500 w-fit gap-0.5">
        {types.map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-md transition-colors ${filterType === type ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-800'}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Event Header */}
            <div className={`p-4 ${
              event.type === 'Sports' ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
              event.type === 'Quiz' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' :
              event.type === 'Essay' ? 'bg-gradient-to-r from-amber-500 to-orange-600' :
              event.type === 'Seminar' ? 'bg-gradient-to-r from-blue-500 to-cyan-600' :
              'bg-gradient-to-r from-purple-500 to-pink-600'
            } text-white`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{getTypeEmoji(event.type)}</span>
                <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  event.status === 'Ongoing' ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
                }`}>{event.status}</span>
              </div>
              <h3 className="text-sm font-bold mt-2">{event.title}</h3>
            </div>

            {/* Event Body */}
            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
              <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1">📅 {event.date}</span>
                <span className="flex items-center gap-1">🕐 {event.time}</span>
                <span className="flex items-center gap-1">📍 {event.venue}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className={`text-[8px] font-bold uppercase px-2.5 py-1 rounded-full border ${getTypeColor(event.type)}`}>{event.type}</span>
                {event.registered ? (
                  <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Registered
                  </span>
                ) : (
                  <button
                    onClick={() => handleRegister(event.id)}
                    className="text-[10px] font-bold text-white bg-[#08493d] hover:bg-[#063b31] px-3 py-1.5 rounded-lg shadow-sm transition-colors"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
