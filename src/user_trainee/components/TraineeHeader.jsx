import React from 'react';

const TAB_TITLES = {
  home:        { title: 'My Dashboard', subtitle: 'Welcome to your learning workspace' },
  courses:     { title: 'My Courses', subtitle: 'Enrolled training programs & syllabi' },
  schedule:    { title: 'Schedule', subtitle: 'Upcoming sessions & training calendar' },
  assignments: { title: 'Assignments', subtitle: 'Pending submissions & graded work' },
  attendance:  { title: 'Attendance', subtitle: 'Session-wise attendance register' },
  grades:      { title: 'Grades & Results', subtitle: 'Assessments, scores & performance' },
  hostel:      { title: 'e-Hostel', subtitle: 'Room allotment & hostel services' },
  profile:     { title: 'My Profile', subtitle: 'Personal details & account settings' },
};

export default function TraineeHeader({
  user, activeTab, isSidebarOpen, setIsSidebarOpen, handleLogout
}) {
  const tab = TAB_TITLES[activeTab] || TAB_TITLES.home;
  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : 'TR';

  return (
    <header className="trainee-header">
      <div className="trainee-header-left">
        {/* Hamburger */}
        <button
          className="trainee-hamburger"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <h1 className="trainee-page-title">{tab.title}</h1>
          <p className="trainee-page-subtitle">{tab.subtitle}</p>
        </div>
      </div>

      <div className="trainee-header-right">
        {/* Notifications */}
        <button className="trainee-notif-btn" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="trainee-notif-dot" />
        </button>

        {/* Avatar */}
        <div className="trainee-header-avatar">{initials}</div>
      </div>
    </header>
  );
}
