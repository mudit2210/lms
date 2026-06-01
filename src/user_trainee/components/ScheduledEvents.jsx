import React, { useState } from 'react';

const EVENTS = [
  { id: 'ev-1', title: 'Sustainable Development Goals Indexing Tracker Workshop', speakers: 'Ministry SDG Director & United Nations Rep', time: 'June 18, 2026 at 10:00 AM', desc: 'Understanding international mapping frameworks for tracking SDG metrics across state databases.', registered: false, color: '#059669' },
  { id: 'ev-2', title: 'National Statistical Commission Guest Speaker Session', speakers: 'NSC Chairman', time: 'June 29, 2026 at 02:30 PM', desc: 'Celebrating National Statistics Day with a lecture on the future of official statistical models in India.', registered: true, color: '#2563eb' },
];

export default function ScheduledEvents() {
  const [events, setEvents] = useState(EVENTS);
  const [alertMsg, setAlertMsg] = useState('');

  const handleRegister = (evId, title) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === evId) {
        const nextState = !ev.registered;
        setAlertMsg(nextState ? `Successfully registered & added "${title}" to your schedule!` : `Cancelled registration for "${title}".`);
        setTimeout(() => setAlertMsg(''), 3000);
        return { ...ev, registered: nextState };
      }
      return ev;
    }));
  };

  return (
    <div className="trainee-page-inner animate-fadeIn">
      {alertMsg && (
        <div style={{
          background: '#059669',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '14px',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '16px',
          boxShadow: '0 10px 20px -8px rgba(5,150,105,0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }} className="animate-scaleUp">
          <span>🎉 {alertMsg}</span>
          <button style={{ background: 'none', border: 'none', color: 'white', fontWeight: 900, cursor: 'pointer' }} onClick={() => setAlertMsg('')}>×</button>
        </div>
      )}

      <div className="trainee-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>Scheduled Events & Webinars</h3>
        <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>Register for expert statistical seminars, national workshops, and ministry conferences</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {events.map(ev => (
            <div
              key={ev.id}
              style={{
                border: '1px solid #eef2f1',
                borderRadius: '24px',
                padding: '24px',
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                boxShadow: '0 8px 24px -8px rgba(8, 73, 61, 0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '14px',
                    background: ev.color + '12', border: `1px solid ${ev.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: ev.color, flexShrink: 0
                  }}>
                    <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', fontWeight: 900, background: ev.color + '12', color: ev.color, padding: '3px 8px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Academic Event</span>
                    <h4 style={{ fontSize: '14px', fontWeight: 900, color: '#064e3b', margin: '4px 0 2px', lineHeight: 1.35 }}>{ev.title}</h4>
                    <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Speakers: <strong style={{ color: '#475569' }}>{ev.speakers}</strong></p>
                  </div>
                </div>

                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 650, background: '#f8fafc', padding: '6px 12px', borderRadius: '10px', border: '1px solid #eef2f1' }}>
                  ⏱ {ev.time}
                </div>
              </div>

              <p style={{ fontSize: '11.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>{ev.desc}</p>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingTop: '12px',
                borderTop: '1px solid #f8faf9',
                marginTop: '6px'
              }}>
                <button
                  onClick={() => handleRegister(ev.id, ev.title)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '11.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: ev.registered ? '1px solid #ef4444' : 'none',
                    background: ev.registered ? '#fef2f2' : 'linear-gradient(135deg, #10b981, #059669)',
                    color: ev.registered ? '#ef4444' : 'white',
                    boxShadow: ev.registered ? 'none' : '0 4px 10px rgba(5,150,105,0.2)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {ev.registered ? 'Cancel Registration' : 'Register Event'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
