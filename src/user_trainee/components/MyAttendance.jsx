import React, { useState } from 'react';
import { t } from '../locales';

const attendanceData = [
  { course: 'Statistical Methods & Theory', total: 32, present: 29, percent: 90.6, color: '#059669' },
  { course: 'Survey Design & Methodology', total: 28, present: 23, percent: 82.1, color: '#2563eb' },
  { course: 'Data Analysis with R', total: 25, present: 20, percent: 80.0, color: '#7c3aed' },
  { course: 'Economic Statistics', total: 30, present: 28, percent: 93.3, color: '#d97706' },
  { course: 'Official Statistics & Policy', total: 18, present: 14, percent: 77.8, color: '#0891b2' },
];

const recentRecords = [
  { date: 'Jun 1, Mon', subject: 'Statistical Methods', status: 'present' },
  { date: 'Jun 1, Mon', subject: 'Data Analysis with R', status: 'present' },
  { date: 'May 31, Sun', subject: 'Weekend Session', status: 'holiday' },
  { date: 'May 30, Sat', subject: 'Weekend', status: 'holiday' },
  { date: 'May 29, Fri', subject: 'Official Statistics', status: 'present' },
  { date: 'May 29, Fri', subject: 'Statistical Methods', status: 'absent' },
  { date: 'May 28, Thu', subject: 'Economic Statistics', status: 'present' },
  { date: 'May 28, Thu', subject: 'Data Analysis with R', status: 'present' },
];

export default function MyAttendance({ lang = 'en' }) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [attendanceAlert, setAttendanceAlert] = useState('');
  const [records, setRecords] = useState(recentRecords);

  const STATUS_ICON = {
    present: { label: t('present', lang), color: '#059669', bg: '#ecfdf5', icon: '✓' },
    absent:  { label: t('absent', lang), color: '#dc2626', bg: '#fef2f2', icon: '✕' },
    holiday: { label: t('holiday', lang), color: '#6b7280', bg: '#f9fafb', icon: '—' },
  };

  const handleCheckIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(true);
    setCheckInTime(timeStr);
    setCheckOutTime(null);
    
    const alertMsg = lang === 'hi'
      ? `उपस्थिति दर्ज (चेक-इन) सफलतापूर्वक ${timeStr} पर की गई! आपका प्रशिक्षण दिन शुभ हो।`
      : `Checked-In successfully at ${timeStr}! Have a productive training day.`;
    setAttendanceAlert(alertMsg);
    
    // Add today's record dynamically
    const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const newRecord = {
      date: `${monthDay}, ${dayName}`,
      subject: lang === 'hi' ? 'डिजिटल बायोमेट्रिक जांच' : 'Digital Biometric check',
      status: 'present'
    };
    setRecords(prev => [newRecord, ...prev]);

    setTimeout(() => setAttendanceAlert(''), 4000);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setIsCheckedIn(false);
    setCheckOutTime(timeStr);

    const alertMsg = lang === 'hi'
      ? `चेक-आउट सफलतापूर्वक ${timeStr} पर किया गया! दैनिक उपस्थिति लॉग संकलित है।`
      : `Checked-Out successfully at ${timeStr}! Daily attendance log compiled.`;
    setAttendanceAlert(alertMsg);
    setTimeout(() => setAttendanceAlert(''), 4000);
  };

  const overall = Math.round(attendanceData.reduce((s, d) => s + d.percent, 0) / attendanceData.length * 10) / 10;
  const overallColor = overall >= 85 ? '#059669' : overall >= 75 ? '#d97706' : '#dc2626';

  return (
    <div className="trainee-page-inner animate-fadeIn">
      {/* Attendance Alert notifications */}
      {attendanceAlert && (
        <div style={{
          background: isCheckedIn ? '#059669' : '#1e293b',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '14px',
          fontSize: '12.5px',
          fontWeight: 700,
          marginBottom: '20px',
          boxShadow: '0 8px 20px -8px rgba(0,0,0,0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }} className="animate-scaleUp">
          <span>🎉 {attendanceAlert}</span>
          <button style={{ background: 'none', border: 'none', color: 'white', fontWeight: 900, cursor: 'pointer' }} onClick={() => setAttendanceAlert('')}>×</button>
        </div>
      )}

      {/* 1. Live Daily Check-In/Check-Out Desk */}
      <div className="trainee-card" style={{ padding: '24px', marginBottom: '24px', border: '1px solid #a7f3d0', background: '#ffffff', boxShadow: '0 10px 30px -10px rgba(5,150,105,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: isCheckedIn ? '#10b981' : '#f59e0b',
                display: 'inline-block',
                boxShadow: isCheckedIn ? '0 0 10px #10b981' : '0 0 10px #f59e0b',
                transition: 'all 0.3s'
              }} />
              <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', color: isCheckedIn ? '#059669' : '#d97706', letterSpacing: '0.04em' }}>
                {isCheckedIn ? t('status_active', lang) : t('status_inactive', lang)}
              </span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#064e3b', margin: '4px 0 2px' }}>{t('biometric_desk', lang)}</h3>
            <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{t('biometric_sub', lang)}</p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleCheckIn}
              disabled={isCheckedIn}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: isCheckedIn ? 'default' : 'pointer',
                border: 'none',
                background: isCheckedIn ? '#cbd5e1' : 'linear-gradient(135deg, #10b981, #059669)',
                color: isCheckedIn ? '#94a3b8' : 'white',
                boxShadow: isCheckedIn ? 'none' : '0 6px 15px rgba(5,150,105,0.2)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📥 {t('checkin', lang)}
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!isCheckedIn}
              style={{
                padding: '10px 20px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 800,
                cursor: !isCheckedIn ? 'default' : 'pointer',
                border: 'none',
                background: !isCheckedIn ? '#cbd5e1' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: !isCheckedIn ? '#94a3b8' : 'white',
                boxShadow: !isCheckedIn ? 'none' : '0 6px 15px rgba(220,38,38,0.2)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📤 {t('checkout', lang)}
            </button>
          </div>
        </div>

        {/* Live Attendance desk times */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #eef2f1'
        }}>
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eef2f1' }}>
            <p style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 650, margin: '0 0 4px', textTransform: 'uppercase' }}>{t('todays_date', lang)}</p>
            <p style={{ fontSize: '13px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
              {new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eef2f1' }}>
            <p style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 650, margin: '0 0 4px', textTransform: 'uppercase' }}>{t('checkin_timestamp', lang)}</p>
            <p style={{ fontSize: '13px', fontWeight: 800, color: checkInTime ? '#059669' : '#94a3b8', margin: 0 }}>
              {checkInTime ? `🕒 ${checkInTime}` : '—'}
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '12px', border: '1px solid #eef2f1' }}>
            <p style={{ fontSize: '10.5px', color: '#64748b', fontWeight: 650, margin: '0 0 4px', textTransform: 'uppercase' }}>{t('checkout_timestamp', lang)}</p>
            <p style={{ fontSize: '13px', fontWeight: 800, color: checkOutTime ? '#dc2626' : '#94a3b8', margin: 0 }}>
              {checkOutTime ? `🕒 ${checkOutTime}` : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="trainee-attendance-summary" style={{ marginBottom: '24px' }}>
        <div className="trainee-attendance-overall" style={{ borderColor: overallColor }}>
          <p className="trainee-attendance-overall-label">{t('overall_attendance', lang)}</p>
          <p className="trainee-attendance-overall-value" style={{ color: overallColor }}>{overall}%</p>
          <p className="trainee-attendance-overall-sub">
            {overall >= 85 ? `✓ ${t('above_threshold', lang)}` : overall >= 75 ? `⚠ ${t('below_threshold', lang)}` : `✕ ${t('critical_attendance', lang)}`}
          </p>
        </div>
        <div className="trainee-attendance-stats-row">
          {[
            { label: t('classes_attended', lang), value: attendanceData.reduce((s, d) => s + d.present, 0), color: '#059669' },
            { label: t('classes_missed', lang), value: attendanceData.reduce((s, d) => s + (d.total - d.present), 0), color: '#dc2626' },
            { label: t('total_classes', lang), value: attendanceData.reduce((s, d) => s + d.total, 0), color: '#2563eb' },
          ].map(s => (
            <div key={s.label} className="trainee-stat-card" style={{ borderColor: s.color + '40', background: s.color + '08' }}>
              <p className="trainee-stat-label">{s.label}</p>
              <p className="trainee-stat-value" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="trainee-attendance-grid">
        {/* Course-wise */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">{t('course_wise_attendance', lang)}</h3>
          </div>
          <div className="trainee-attendance-courses">
            {attendanceData.map((d, i) => (
              <div key={i} className="trainee-attendance-row">
                <div className="trainee-attendance-course-info">
                  <p className="trainee-attendance-course-name">
                    {lang === 'hi' && d.course.includes('Statistical Methods') ? 'सांख्यिकीय तरीके और सिद्धांत' :
                     lang === 'hi' && d.course.includes('Survey Design') ? 'सर्वेक्षण डिजाइन और कार्यप्रणाली' :
                     lang === 'hi' && d.course.includes('Data Analysis') ? 'आर के साथ डेटा विश्लेषण' :
                     lang === 'hi' && d.course.includes('Economic Statistics') ? 'आर्थिक सांख्यिकी' :
                     lang === 'hi' && d.course.includes('Official Statistics') ? 'आधिकारिक सांख्यिकी और नीति' : d.course}
                  </p>
                  <p className="trainee-attendance-course-meta">{d.present} / {d.total} {lang === 'hi' ? 'कक्षाएं' : 'classes'}</p>
                </div>
                <div className="trainee-attendance-bar-col">
                  <div className="trainee-progress-track">
                    <div className="trainee-progress-fill" style={{ width: `${d.percent}%`, background: d.color }} />
                  </div>
                  <span className="trainee-attendance-pct" style={{ color: d.color }}>{d.percent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Records */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">{t('recent_records', lang)}</h3>
          </div>
          <div className="trainee-recent-records">
            {records.map((r, i) => {
              const s = STATUS_ICON[r.status] || STATUS_ICON.present;
              return (
                <div key={i} className="trainee-record-row" style={{ transition: 'all 0.2s' }}>
                  <div>
                    <p className="trainee-record-subject">
                      {lang === 'hi' && r.subject === 'Statistical Methods' ? 'सांख्यिकीय तरीके' :
                       lang === 'hi' && r.subject === 'Data Analysis with R' ? 'आर के साथ डेटा विश्लेषण' :
                       lang === 'hi' && r.subject === 'Weekend Session' ? 'सप्ताहांत सत्र' :
                       lang === 'hi' && r.subject === 'Weekend' ? 'सप्ताहांत' :
                       lang === 'hi' && r.subject === 'Official Statistics' ? 'आधिकारिक सांख्यिकी' :
                       lang === 'hi' && r.subject === 'Economic Statistics' ? 'आर्थिक सांख्यिकी' :
                       lang === 'hi' && r.subject.includes('Biometric') ? 'डिजिटल बायोमेट्रिक जांच' : r.subject}
                    </p>
                    <p className="trainee-record-date">
                      {lang === 'hi' ? r.date.replace('Jun', 'जून').replace('May', 'मई').replace('Mon', 'सोमवार').replace('Sun', 'रविवार').replace('Sat', 'शनिवार').replace('Fri', 'शुक्रवार').replace('Thu', 'गुरुवार') : r.date}
                    </p>
                  </div>
                  <span className="trainee-status-pill" style={{ color: s.color, background: s.bg }}>
                    {s.icon} {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
