import React, { useState } from 'react';

const TRAINING_TRACKS = [
  { id: 'track-1', title: '46th ISS Induction Foundation Training', duration: '8 Weeks (Full Time)', enrolledDate: 'April 1, 2026', syllabusProgress: 63, criteria: 'Min 80% Attendance & Pass Mid-terms', status: 'Ongoing', color: '#059669' },
  { id: 'track-2', title: 'Survey Methodology Domain Training', duration: '3 Weeks', enrolledDate: 'Scheduled: July 2026', syllabusProgress: 0, criteria: 'Field Clearance & Presentation', status: 'Not Started', color: '#2563eb' },
];

export default function MyTrainings() {
  const [feedbackSuccess, setFeedbackSuccess] = useState('');
  const [feedback, setFeedback] = useState({ course: '46th ISS Induction Foundation Training', score: '5', comments: '' });

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!feedback.comments.trim()) return;
    setFeedbackSuccess(`Thank you! Your feedback for "${feedback.course}" has been submitted successfully.`);
    setFeedback(prev => ({ ...prev, comments: '' }));
    setTimeout(() => setFeedbackSuccess(''), 3500);
  };

  return (
    <div className="trainee-page-inner animate-fadeIn">
      {feedbackSuccess && (
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
          <span>🎉 {feedbackSuccess}</span>
          <button style={{ background: 'none', border: 'none', color: 'white', fontWeight: 900, cursor: 'pointer' }} onClick={() => setFeedbackSuccess('')}>×</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        
        {/* Active Tracks list */}
        <div className="trainee-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>My Active Training Tracks</h3>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>Track your probationary and administrative training courses progress</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {TRAINING_TRACKS.map(track => (
              <div
                key={track.id}
                style={{
                  border: '1px solid #eef2f1',
                  borderRadius: '24px',
                  padding: '20px',
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(8, 73, 61, 0.02)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '13.5px', fontWeight: 850, color: '#0f172a', margin: 0 }}>{track.title}</h4>
                    <p style={{ fontSize: '10.5px', color: '#94a3b8', margin: '2px 0 0' }}>Enrolled: {track.enrolledDate} · Duration: {track.duration}</p>
                  </div>
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 950,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    background: track.status === 'Ongoing' ? '#ecfdf5' : '#f1f5f9',
                    color: track.status === 'Ongoing' ? '#059669' : '#64748b'
                  }}>{track.status}</span>
                </div>

                {/* Progress track bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#475569', marginBottom: '6px' }}>
                    <span>Syllabus Covered</span>
                    <span style={{ color: track.color }}>{track.syllabusProgress}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#eef2f1', borderRadius: '100px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${track.syllabusProgress}%`, background: track.color, borderRadius: '100px' }} />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  paddingTop: '10px',
                  borderTop: '1px solid #f8faf9',
                  color: '#64748b',
                  fontWeight: 650
                }}>
                  <span>Eligibility Parameter: <strong style={{ color: '#475569' }}>{track.criteria}</strong></span>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Training Feedback Form */}
        <div className="trainee-card" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>Training Quality Feedback</h4>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 16px' }}>Share your feedback to help us maintain academic and logistic excellence in training programs</p>

          <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>Select Training Program</label>
                <select
                  value={feedback.course}
                  onChange={(e) => setFeedback(prev => ({ ...prev, course: e.target.value }))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                >
                  <option>46th ISS Induction Foundation Training</option>
                  <option>Refresher Course on Advanced Statistics</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>Quality Rating (1 to 5)</label>
                <select
                  value={feedback.score}
                  onChange={(e) => setFeedback(prev => ({ ...prev, score: e.target.value }))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px' }}
                >
                  <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
                  <option value="4">⭐⭐⭐⭐ Very Good (4/5)</option>
                  <option value="3">⭐⭐⭐ Satisfactory (3/5)</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, color: '#334155', display: 'block', marginBottom: '6px' }}>Detailed Review & Comments</label>
              <textarea
                value={feedback.comments}
                onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                rows="3"
                placeholder="Type your feedback comments here (materials, lodging, speakers, etc.)..."
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontFamily: 'inherit' }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                alignSelf: 'flex-end',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontSize: '11.5px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(5,150,105,0.2)'
              }}
            >
              Submit Feedback
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
