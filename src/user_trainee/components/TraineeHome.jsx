import React from 'react';

const stats = [
  { label: 'Courses Enrolled', value: '5', sub: '2 In Progress', color: '#059669', bg: '#ecfdf5', border: '#6ee7b7' },
  { label: 'Attendance', value: '87%', sub: 'This Month', color: '#2563eb', bg: '#eff6ff', border: '#93c5fd' },
  { label: 'Assignments Due', value: '3', sub: 'Submit by Friday', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5' },
  { label: 'Overall Grade', value: 'A-', sub: 'GPA: 3.7 / 4.0', color: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd' },
];

const upcomingSessions = [
  { subject: 'Statistical Methods – Module 4', time: 'Today, 10:00 AM', room: 'Lecture Hall B', type: 'Lecture', color: '#059669' },
  { subject: 'Data Analysis with R', time: 'Today, 2:00 PM', room: 'Computer Lab 2', type: 'Lab', color: '#2563eb' },
  { subject: 'Survey Methodology', time: 'Tomorrow, 9:30 AM', room: 'Room 204', type: 'Seminar', color: '#7c3aed' },
];

const announcements = [
  { title: 'Mid-term Schedule Released', body: 'Mid-term examinations will be held from June 10–14. Check the schedule in the Schedule tab.', time: '2 hours ago', type: 'info' },
  { title: 'Assignment Submission Reminder', body: 'Data Analysis Assignment 3 is due this Friday. Late submissions will attract a 10% penalty.', time: '1 day ago', type: 'warn' },
  { title: 'Hostel Mess Menu Updated', body: 'New weekly mess menu for June has been uploaded. Vegetarian options expanded.', time: '2 days ago', type: 'success' },
];

const courseProgress = [
  { name: 'Statistical Methods', progress: 72, color: '#059669' },
  { name: 'Survey Design & Methodology', progress: 55, color: '#2563eb' },
  { name: 'Data Analysis with R', progress: 40, color: '#7c3aed' },
  { name: 'Economic Statistics', progress: 88, color: '#d97706' },
  { name: 'Official Statistics & Policy', progress: 20, color: '#0891b2' },
];

export default function TraineeHome({ user, setActiveTab }) {
  const firstName = user?.name?.split(' ')[0] || 'Trainee';
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="trainee-home">
      {/* Hero Welcome Banner */}
      <div className="trainee-hero-banner">
        <div className="trainee-hero-content">
          <div className="trainee-hero-badge">
            <span className="trainee-hero-badge-dot" />
            46th ISS Batch · Active Session
          </div>
          <h2 className="trainee-hero-title">{greeting}, {firstName}!</h2>
          <p className="trainee-hero-sub">
            You have <strong>3 pending assignments</strong> and <strong>2 sessions</strong> scheduled today. Stay on track!
          </p>
          <div className="trainee-hero-actions">
            <button className="trainee-btn-primary" onClick={() => setActiveTab('courses')}>
              View My Courses
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button className="trainee-btn-secondary" onClick={() => setActiveTab('schedule')}>
              Today's Schedule
            </button>
          </div>
        </div>
        <div className="trainee-hero-widget">
          <p className="trainee-hero-widget-label">Overall Progress</p>
          <p className="trainee-hero-widget-value">63%</p>
          <p className="trainee-hero-widget-sub">Batch Average: 58%</p>
          <div className="trainee-hero-progress-bar">
            <div className="trainee-hero-progress-fill" style={{ width: '63%' }} />
          </div>
          <p className="trainee-hero-widget-note">You are above batch average ↑</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="trainee-stats-grid">
        {stats.map(s => (
          <div
            key={s.label}
            className="trainee-stat-card"
            style={{ background: s.bg, borderColor: s.border }}
          >
            <p className="trainee-stat-label">{s.label}</p>
            <p className="trainee-stat-value" style={{ color: s.color }}>{s.value}</p>
            <p className="trainee-stat-sub">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="trainee-home-grid">
        {/* Today's Sessions */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Today's Sessions
            </h3>
            <button className="trainee-card-link" onClick={() => setActiveTab('schedule')}>View All</button>
          </div>
          <div className="trainee-sessions-list">
            {upcomingSessions.map((s, i) => (
              <div key={i} className="trainee-session-item">
                <div className="trainee-session-color-bar" style={{ background: s.color }} />
                <div className="trainee-session-info">
                  <p className="trainee-session-name">{s.subject}</p>
                  <p className="trainee-session-meta">{s.time} · {s.room}</p>
                </div>
                <span className="trainee-session-type" style={{ color: s.color, background: s.color + '15' }}>
                  {s.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
              </svg>
              Course Progress
            </h3>
            <button className="trainee-card-link" onClick={() => setActiveTab('courses')}>Details</button>
          </div>
          <div className="trainee-progress-list">
            {courseProgress.map((c, i) => (
              <div key={i} className="trainee-progress-item">
                <div className="trainee-progress-header">
                  <span className="trainee-progress-name">{c.name}</span>
                  <span className="trainee-progress-pct" style={{ color: c.color }}>{c.progress}%</span>
                </div>
                <div className="trainee-progress-track">
                  <div
                    className="trainee-progress-fill"
                    style={{ width: `${c.progress}%`, background: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="trainee-card trainee-card-wide">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              Announcements
            </h3>
          </div>
          <div className="trainee-announcements-list">
            {announcements.map((a, i) => (
              <div key={i} className={`trainee-announcement-item type-${a.type}`}>
                <div className={`trainee-announcement-dot dot-${a.type}`} />
                <div className="trainee-announcement-body">
                  <p className="trainee-announcement-title">{a.title}</p>
                  <p className="trainee-announcement-text">{a.body}</p>
                  <p className="trainee-announcement-time">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
