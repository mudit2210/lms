import React, { useState } from 'react';

const SESSIONS = [
  { id: 1, topic: 'System of National Accounts SNA 2008 Foundations', instructor: 'Dr. Alok Prasad', time: 'Active Now', live: true, link: '#' },
  { id: 2, topic: 'Advanced Machine Learning in Survey Estimators', instructor: 'Prof. Sandeep Sen', time: '02:00 PM (Today)', live: false, link: '#' },
];

export default function Classroom() {
  const [activeSession, setActiveSession] = useState(SESSIONS[0]);
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState([
    'Remember to read SNA 2008 Chapter 3 on sector accounts.',
    'Linear regressions residuals must satisfy the normality assumption before finalizing GVA tables.'
  ]);

  const addNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setSavedNotes(prev => [noteText, ...prev]);
    setNoteText('');
  };

  return (
    <div className="trainee-page-inner animate-fadeIn">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        
        {/* Active Session Frame / Player */}
        <div className="trainee-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '9px', fontWeight: 900, background: '#fef2f2', color: '#dc2626', padding: '3px 8px', borderRadius: '100px', border: '1px solid #fee2e2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>🔴 LIVE CLASSROOM</span>
              <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#064e3b', margin: '6px 0 2px' }}>{activeSession.topic}</h3>
              <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Instructor: <strong style={{ color: '#475569' }}>{activeSession.instructor}</strong></p>
            </div>
            
            <button
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(220,38,38,0.25)'
              }}
            >
              Join Streaming 📹
            </button>
          </div>

          {/* High Fidelity Mock Video Screen */}
          <div style={{
            background: '#0f172a',
            borderRadius: '20px',
            minHeight: '260px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)'
          }}>
            <div style={{ textAlignment: 'center', zIndex: 10 }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.2s'
              }} className="video-play-btn">
                <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p style={{ fontSize: '12px', fontWeight: 800, color: 'white', opacity: 0.9 }}>Connecting to ISS Training Center video feed...</p>
            </div>
          </div>
        </div>

        {/* Notes & Slide Material Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          
          {/* Note Taking Widget */}
          <div className="trainee-card" style={{ padding: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>Session Notes</h4>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 16px' }}>Jot down critical equations, references, or queries during the lecture</p>

            <form onSubmit={addNote} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Type your notes here..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px'
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '0 16px',
                  borderRadius: '10px',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Save Note
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
              {savedNotes.map((note, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #eef2f1',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    fontSize: '11px',
                    color: '#334155',
                    textAlign: 'left',
                    fontWeight: 500
                  }}
                >
                  📝 {note}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
