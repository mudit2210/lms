import React, { useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const WEEK_SESSIONS = {
  Mon: [
    { time: '09:00 - 10:30', subject: 'Statistical Methods', type: 'Lecture', room: 'Hall B', color: '#059669' },
    { time: '14:00 - 15:30', subject: 'Data Analysis with R', type: 'Lab', room: 'Lab 2', color: '#7c3aed' },
  ],
  Tue: [
    { time: '09:30 - 11:00', subject: 'Survey Methodology', type: 'Seminar', room: 'Room 204', color: '#2563eb' },
    { time: '11:30 - 13:00', subject: 'Economic Statistics', type: 'Lecture', room: 'Hall A', color: '#d97706' },
  ],
  Wed: [
    { time: '10:00 - 11:30', subject: 'Statistical Methods', type: 'Tutorial', room: 'Room 112', color: '#059669' },
    { time: '14:30 - 16:00', subject: 'Official Statistics', type: 'Lecture', room: 'Hall C', color: '#0891b2' },
  ],
  Thu: [
    { time: '09:00 - 10:30', subject: 'Economic Statistics', type: 'Lab', room: 'Lab 1', color: '#d97706' },
    { time: '11:00 - 12:30', subject: 'Data Analysis with R', type: 'Lecture', room: 'Hall B', color: '#7c3aed' },
    { time: '15:00 - 16:30', subject: 'Survey Methodology', type: 'Lab', room: 'Lab 3', color: '#2563eb' },
  ],
  Fri: [
    { time: '09:00 - 10:30', subject: 'Official Statistics', type: 'Seminar', room: 'Room 205', color: '#0891b2' },
    { time: '14:00 - 15:30', subject: 'Statistical Methods', type: 'Assessment', room: 'Exam Hall', color: '#dc2626' },
  ],
};

const upcomingEvents = [
  { date: 'Jun 3', event: 'Mid-Term Assessment – Statistical Methods', type: 'Exam', color: '#dc2626' },
  { date: 'Jun 7', event: 'Field Visit – NSO Regional Office', type: 'Field Trip', color: '#059669' },
  { date: 'Jun 10', event: 'Guest Lecture – Dr. Arun Joshi (IIPS)', type: 'Guest Lecture', color: '#7c3aed' },
  { date: 'Jun 14', event: 'Assignment 3 Submission Deadline', type: 'Deadline', color: '#d97706' },
];

export default function MySchedule() {
  const today = new Date().getDay(); // 0=Sun,1=Mon...
  const todayDayIdx = today === 0 || today === 6 ? 0 : today - 1;
  const [activeDay, setActiveDay] = useState(DAYS[todayDayIdx] || 'Mon');

  return (
    <div className="trainee-page-inner">
      <div className="trainee-schedule-grid">
        {/* Weekly Timetable */}
        <div className="trainee-card trainee-card-wide">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Weekly Timetable
            </h3>
            <span className="trainee-week-label">June 2026 · Week 1</span>
          </div>

          {/* Day Tabs */}
          <div className="trainee-day-tabs">
            {DAYS.map(d => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`trainee-day-tab ${activeDay === d ? 'active' : ''}`}
              >
                {d}
                {d === DAYS[todayDayIdx] && <span className="trainee-today-dot" />}
              </button>
            ))}
          </div>

          {/* Sessions for selected day */}
          <div className="trainee-sessions-day">
            {(WEEK_SESSIONS[activeDay] || []).length === 0 ? (
              <div className="trainee-empty-state">No sessions scheduled</div>
            ) : (
              (WEEK_SESSIONS[activeDay] || []).map((s, i) => (
                <div key={i} className="trainee-session-row">
                  <div className="trainee-session-time-col">
                    <p className="trainee-session-time">{s.time}</p>
                  </div>
                  <div className="trainee-session-bar" style={{ borderLeftColor: s.color }}>
                    <div className="trainee-session-bar-header">
                      <p className="trainee-session-subject">{s.subject}</p>
                      <span className="trainee-session-type-pill" style={{ color: s.color, background: s.color + '15' }}>
                        {s.type}
                      </span>
                    </div>
                    <p className="trainee-session-room">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {s.room}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Upcoming Events
            </h3>
          </div>
          <div className="trainee-events-list">
            {upcomingEvents.map((e, i) => (
              <div key={i} className="trainee-event-item">
                <div className="trainee-event-date" style={{ background: e.color + '15', color: e.color }}>
                  {e.date}
                </div>
                <div className="trainee-event-info">
                  <p className="trainee-event-name">{e.event}</p>
                  <span className="trainee-event-type" style={{ color: e.color }}>{e.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
