import React, { useState, useEffect } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('trainee_notifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    } else {
      const seed = [
        { id: 'N-001', type: 'reminder', title: 'Assignment Due: Statistical Inference Problem Set', message: 'Your assignment for Time Series Analysis is due on June 2, 2026. Please submit before the deadline.', date: '2026-06-02', read: false },
        { id: 'N-002', type: 'announcement', title: 'Campus library will remain closed on June 5 for maintenance.', message: 'The Sukhatme Library will be closed for annual maintenance on June 5. Digital resources remain accessible.', date: '2026-05-31', read: false },
        { id: 'N-003', type: 'grade', title: 'Your MCQ Assessment score is available: 82/100', message: 'Your score for "Sampling Techniques & Estimation" MCQ has been published. View details in Assessments section.', date: '2026-05-29', read: true },
        { id: 'N-004', type: 'session', title: 'Upcoming Session: "Forecasting Methods" tomorrow at 10:00 AM', message: 'Reminder: Your next session on Forecasting Methods is scheduled for tomorrow at 10:00 AM in Hall A-201.', date: '2026-05-31', read: false },
        { id: 'N-005', type: 'announcement', title: 'Sports Day scheduled for June 15, 2026', message: 'Annual Sports Day will be held on June 15. All trainees are encouraged to participate. Registration open until June 10.', date: '2026-05-28', read: true },
        { id: 'N-006', type: 'grade', title: 'Survey Design Proposal graded: 44/50', message: 'Your Survey Design Proposal assignment has been graded. Faculty feedback is available in the Assignments section.', date: '2026-05-25', read: true },
        { id: 'N-007', type: 'reminder', title: 'Feedback form pending for ISS Foundation Module', message: 'Please complete the course feedback form for ISS Foundation Module. Your feedback helps improve future programmes.', date: '2026-05-20', read: true },
        { id: 'N-008', type: 'session', title: 'Guest Lecture: "AI in Official Statistics" on June 3', message: 'Special guest lecture by Dr. Priya Sharma from ISI on "Applications of AI in Official Statistics". Attendance mandatory.', date: '2026-05-30', read: false },
      ];
      localStorage.setItem('trainee_notifications', JSON.stringify(seed));
      setNotifications(seed);
    }
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('trainee_notifications', JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('trainee_notifications', JSON.stringify(updated));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'reminder': return { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-amber-600 bg-amber-50' };
      case 'announcement': return { icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', color: 'text-blue-600 bg-blue-50' };
      case 'grade': return { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', color: 'text-emerald-600 bg-emerald-50' };
      case 'session': return { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'text-indigo-600 bg-indigo-50' };
      default: return { icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', color: 'text-slate-600 bg-slate-50' };
    }
  };

  const filtered = filter === 'all' ? notifications :
    filter === 'unread' ? notifications.filter(n => !n.read) :
    notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Notifications</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}.` : 'All caught up! No unread notifications.'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[10px] font-bold text-[#08493d] hover:text-emerald-700 px-3 py-1.5 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-500 w-fit gap-0.5">
        {[
          { key: 'all', label: 'All' },
          { key: 'unread', label: `Unread (${unreadCount})` },
          { key: 'reminder', label: 'Reminders' },
          { key: 'announcement', label: 'Announcements' },
          { key: 'grade', label: 'Grades' },
          { key: 'session', label: 'Sessions' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 py-1.5 rounded-md transition-colors ${filter === tab.key ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-800'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((notif) => {
          const typeInfo = getTypeIcon(notif.type);
          return (
            <div
              key={notif.id}
              className={`bg-white rounded-xl border shadow-2xs p-4 flex items-start gap-3 transition-colors cursor-pointer hover:bg-slate-50/50 ${
                notif.read ? 'border-gray-150' : 'border-emerald-200 bg-emerald-50/20'
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeInfo.color}`}>
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={typeInfo.icon} />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h4 className={`text-xs font-bold truncate ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                    {notif.title}
                  </h4>
                  {!notif.read && (
                    <span className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-1"></span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{notif.message}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[9px] text-slate-400 font-medium">{notif.date}</span>
                  <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${
                    notif.type === 'reminder' ? 'bg-amber-50 text-amber-700' :
                    notif.type === 'announcement' ? 'bg-blue-50 text-blue-700' :
                    notif.type === 'grade' ? 'bg-emerald-50 text-emerald-700' :
                    'bg-indigo-50 text-indigo-700'
                  }`}>
                    {notif.type}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-gray-150 border-dashed">
            <svg className="w-10 h-10 mx-auto text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-sm font-semibold text-slate-400">No notifications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
