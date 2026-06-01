import React, { useState } from 'react';

const CALENDAR_EVENTS = [
  { id: 1, date: 2, title: 'ISS Officer Induction – Day 2', time: '10:00 AM', room: 'Lecture Hall B', category: 'Induction', color: '#059669' },
  { id: 2, date: 5, title: 'Data Analysis with R Lab 1', time: '02:00 PM', room: 'Computer Lab 2', category: 'Lab', color: '#2563eb' },
  { id: 3, date: 8, title: 'Survey Methodology Seminar', time: '09:30 AM', room: 'Room 204', category: 'Seminar', color: '#7c3aed' },
  { id: 4, date: 12, title: 'National Account System Intro', time: '11:00 AM', room: 'Main Auditorium', category: 'Special Lecture', color: '#d97706' },
  { id: 5, date: 15, title: 'Mid-term Exams Commencement', time: '09:00 AM', room: 'Exams Hall A', category: 'Exam', color: '#dc2626' },
  { id: 6, date: 20, title: 'Agricultural Listing Surveys', time: '10:00 AM', room: 'Lecture Hall C', category: 'Course Session', color: '#059669' },
  { id: 7, date: 26, title: 'Republic Day Interactive Quiz', time: '02:00 PM', room: 'Seminar Hall 1', category: 'Activity', color: '#db2777' },
];

export default function CalendarView() {
  const [selectedDay, setSelectedDay] = useState(null);
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  // Helper to get events for a specific day
  const getEventsForDay = (day) => {
    return CALENDAR_EVENTS.filter(e => e.date === day);
  };

  const selectedDayEvents = selectedDay ? getEventsForDay(selectedDay) : [];

  return (
    <div className="trainee-page-inner animate-fadeIn">
      <div className="trainee-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#064e3b', margin: 0 }}>Training Calendar</h3>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0' }}>June 2026 Academic Schedule</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: 700 }}>
            <span style={{ color: '#059669', background: '#ecfdf5', padding: '4px 10px', borderRadius: '100px' }}>• Active Classes</span>
            <span style={{ color: '#2563eb', background: '#eff6ff', padding: '4px 10px', borderRadius: '100px' }}>• Lab Sessions</span>
            <span style={{ color: '#dc2626', background: '#fef2f2', padding: '4px 10px', borderRadius: '100px' }}>• Exams</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '10px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(w => (
            <div key={w} style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', paddingBottom: '6px' }}>{w}</div>
          ))}
          
          {/* Calendar Blank Slots offset (June 2026 starts on Monday) */}
          <div style={{ background: '#f8fafc', borderRadius: '12px', minHeight: '80px', opacity: 0.3 }} />

          {daysInMonth.map(day => {
            const dayEvents = getEventsForDay(day);
            const isSelected = selectedDay === day;
            return (
              <div
                key={day}
                onClick={() => setSelectedDay(day)}
                style={{
                  background: isSelected ? '#ecfdf5' : '#ffffff',
                  border: isSelected ? '2px solid #10b981' : '1px solid #eef2f1',
                  borderRadius: '16px',
                  minHeight: '90px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'stretch',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 10px 20px -8px rgba(16, 185, 129, 0.15)' : 'none'
                }}
                className="calendar-day-tile"
              >
                <span style={{
                  fontSize: '12px',
                  fontWeight: 900,
                  color: isSelected ? '#047857' : '#1e293b',
                  alignSelf: 'flex-start'
                }}>{day}</span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '4px' }}>
                  {dayEvents.map(event => (
                    <div
                      key={event.id}
                      style={{
                        background: event.color + '12',
                        color: event.color,
                        fontSize: '8.5px',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'left'
                      }}
                      title={event.title}
                    >
                      {event.category}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Event Details Drawer */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #eef2f1',
          borderRadius: '20px',
          padding: '20px',
          textAlign: 'left'
        }}>
          <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#022c22', margin: '0 0 10px' }}>
            {selectedDay ? `Scheduled Events on June ${selectedDay}, 2026` : 'Select a calendar day to view schedule details'}
          </h4>

          {selectedDayEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedDayEvents.map(event => (
                <div
                  key={event.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #eef2f1',
                    borderRadius: '14px',
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.01)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '4px', height: '32px', background: event.color, borderRadius: '2px' }} />
                    <div>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: event.color, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{event.category}</span>
                      <h5 style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', margin: '2px 0 0' }}>{event.title}</h5>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                    <div>⏱ {event.time}</div>
                    <div style={{ marginTop: '2px', fontSize: '10px' }}>📍 {event.room}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '11.5px', color: '#94a3b8', margin: 0 }}>No sessions scheduled for this date. Go to self-enrollment or enjoy your day!</p>
          )}
        </div>
      </div>
    </div>
  );
}
