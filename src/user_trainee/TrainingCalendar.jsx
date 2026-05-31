import React, { useState, useEffect } from 'react';

export default function TrainingCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 5)); // June 2026
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const seed = [
      { id: 'E-001', date: '2026-06-01', title: 'Forecasting Methods - Lecture 10', time: '10:00 AM', venue: 'Hall A-201', type: 'lecture', course: 'Time Series Analysis' },
      { id: 'E-002', date: '2026-06-01', title: 'Lab: ARIMA Model Implementation', time: '2:00 PM', venue: 'Computer Lab 3', type: 'lab', course: 'Time Series Analysis' },
      { id: 'E-003', date: '2026-06-02', title: 'Guest Lecture: Official Statistics', time: '11:00 AM', venue: 'Conference Hall', type: 'guest', course: 'ISS Foundation' },
      { id: 'E-004', date: '2026-06-03', title: 'Spectral Analysis - Lecture 11', time: '10:00 AM', venue: 'Hall A-201', type: 'lecture', course: 'Time Series Analysis' },
      { id: 'E-005', date: '2026-06-05', title: 'MCQ Assessment: Forecasting', time: '10:00 AM', venue: 'Exam Hall', type: 'assessment', course: 'Time Series Analysis' },
      { id: 'E-006', date: '2026-06-08', title: 'Assignment Submission Deadline', time: '11:59 PM', venue: 'Online Portal', type: 'deadline', course: 'Time Series Analysis' },
      { id: 'E-007', date: '2026-06-10', title: 'Multivariate Time Series', time: '10:00 AM', venue: 'Hall A-201', type: 'lecture', course: 'Time Series Analysis' },
      { id: 'E-008', date: '2026-06-12', title: 'Lab: VAR Models', time: '2:00 PM', venue: 'Computer Lab 3', type: 'lab', course: 'Time Series Analysis' },
      { id: 'E-009', date: '2026-06-15', title: 'Annual Sports Day', time: '8:00 AM', venue: 'Sports Complex', type: 'event', course: 'Extra-Curricular' },
      { id: 'E-010', date: '2026-06-18', title: 'Essay Competition: Data for Development', time: '2:00 PM', venue: 'Seminar Hall', type: 'event', course: 'Extra-Curricular' },
      { id: 'E-011', date: '2026-06-20', title: 'Final Assessment: Time Series', time: '10:00 AM', venue: 'Exam Hall', type: 'assessment', course: 'Time Series Analysis' },
      { id: 'E-012', date: '2026-06-24', title: 'Course Completion & Valedictory', time: '3:00 PM', venue: 'Conference Hall', type: 'event', course: 'Time Series Analysis' },
      { id: 'E-013', date: '2026-07-01', title: 'Big Data Analytics - Day 1', time: '10:00 AM', venue: 'Hall B-101', type: 'lecture', course: 'Big Data Analytics & ML' },
    ];
    setEvents(seed);
  }, []);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthStr = currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });

  const getEventsForDate = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lecture': return 'bg-blue-500';
      case 'lab': return 'bg-emerald-500';
      case 'guest': return 'bg-purple-500';
      case 'assessment': return 'bg-rose-500';
      case 'deadline': return 'bg-amber-500';
      case 'event': return 'bg-indigo-500';
      default: return 'bg-slate-400';
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case 'lecture': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'lab': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'guest': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'assessment': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'deadline': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'event': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const selectedDateStr = selectedDate ? `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}` : null;
  const selectedEvents = selectedDate ? events.filter(e => e.date === selectedDateStr) : [];

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-xl font-extrabold text-slate-800">Training Calendar</h1>
        <p className="text-xs text-slate-500 mt-0.5">View your sessions, assessments, deadlines, and events at a glance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-5">
            <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-sm font-extrabold text-slate-800">{monthStr}</h2>
            <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-[9px] font-bold text-slate-400 uppercase py-2">{day}</div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-16"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDate(day);
              const isSelected = selectedDate === day;
              const isToday = day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`h-16 p-1 rounded-lg border text-left flex flex-col transition-all ${
                    isSelected ? 'border-[#08493d] bg-emerald-50 ring-1 ring-emerald-200' :
                    isToday ? 'border-blue-300 bg-blue-50/50' :
                    dayEvents.length > 0 ? 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30' :
                    'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${isToday ? 'text-blue-700' : isSelected ? 'text-[#08493d]' : 'text-slate-600'}`}>{day}</span>
                  <div className="flex flex-wrap gap-0.5 mt-auto">
                    {dayEvents.slice(0, 3).map((ev) => (
                      <span key={ev.id} className={`w-1.5 h-1.5 rounded-full ${getTypeColor(ev.type)}`}></span>
                    ))}
                    {dayEvents.length > 3 && <span className="text-[7px] text-slate-400 font-bold">+{dayEvents.length - 3}</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100">
            {[
              { type: 'lecture', label: 'Lecture' },
              { type: 'lab', label: 'Lab' },
              { type: 'guest', label: 'Guest' },
              { type: 'assessment', label: 'Assessment' },
              { type: 'deadline', label: 'Deadline' },
              { type: 'event', label: 'Event' },
            ].map(item => (
              <div key={item.type} className="flex items-center gap-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${getTypeColor(item.type)}`}></span>
                <span className="text-[9px] font-semibold text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Events */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-extrabold text-slate-800 mb-4">
            {selectedDate ? `Events on ${selectedDate} ${monthStr.split(' ')[0]}` : 'Select a date'}
          </h3>
          {selectedDate && selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map(ev => (
                <div key={ev.id} className="p-3.5 rounded-xl border border-gray-100 bg-slate-50/50 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border ${getTypeBadge(ev.type)}`}>{ev.type}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800">{ev.title}</p>
                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-medium">
                    <span>🕐 {ev.time}</span>
                    <span>📍 {ev.venue}</span>
                  </div>
                  <p className="text-[9px] text-slate-400">{ev.course}</p>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 text-slate-400">
              <p className="text-xs font-medium">No events scheduled for this date.</p>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <svg className="w-10 h-10 mx-auto text-slate-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-xs font-medium">Click on a date to view events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
