import React, { useState } from 'react';

const courses = [
  {
    id: 1, name: 'Statistical Methods & Theory', code: 'ISS-SM-101',
    faculty: 'Dr. Ramesh Sharma', progress: 72, status: 'In Progress',
    modules: 12, completed: 9, nextClass: 'Today, 10:00 AM',
    color: '#059669', bg: '#ecfdf5', credits: 4
  },
  {
    id: 2, name: 'Survey Design & Methodology', code: 'ISS-SDM-102',
    faculty: 'Prof. Anita Verma', progress: 55, status: 'In Progress',
    modules: 10, completed: 5, nextClass: 'Tomorrow, 9:30 AM',
    color: '#2563eb', bg: '#eff6ff', credits: 3
  },
  {
    id: 3, name: 'Data Analysis with R', code: 'ISS-DAR-201',
    faculty: 'Dr. Priya Nair', progress: 40, status: 'In Progress',
    modules: 15, completed: 6, nextClass: 'Today, 2:00 PM',
    color: '#7c3aed', bg: '#f5f3ff', credits: 3
  },
  {
    id: 4, name: 'Economic Statistics', code: 'ISS-ES-301',
    faculty: 'Prof. Suresh Kumar', progress: 88, status: 'Near Complete',
    modules: 8, completed: 7, nextClass: 'Thursday, 11:00 AM',
    color: '#d97706', bg: '#fffbeb', credits: 4
  },
  {
    id: 5, name: 'Official Statistics & Policy', code: 'ISS-OSP-401',
    faculty: 'Dr. K. Meenakshi', progress: 20, status: 'Just Started',
    modules: 14, completed: 3, nextClass: 'Friday, 3:00 PM',
    color: '#0891b2', bg: '#ecfeff', credits: 3
  },
];

export default function MyCourses() {
  const [selected, setSelected] = useState(null);

  if (selected !== null) {
    const c = courses[selected];
    return (
      <div className="trainee-page-inner">
        <button className="trainee-back-btn" onClick={() => setSelected(null)}>
          ← Back to Courses
        </button>
        <div className="trainee-course-detail">
          <div className="trainee-course-detail-header" style={{ background: c.color }}>
            <span className="trainee-course-code-badge">{c.code}</span>
            <h2 className="trainee-course-detail-title">{c.name}</h2>
            <p className="trainee-course-detail-faculty">{c.faculty} · {c.credits} Credits</p>
          </div>
          <div className="trainee-course-detail-body">
            <div className="trainee-course-meta-grid">
              <div className="trainee-meta-item">
                <p className="trainee-meta-label">Progress</p>
                <p className="trainee-meta-value" style={{ color: c.color }}>{c.progress}%</p>
              </div>
              <div className="trainee-meta-item">
                <p className="trainee-meta-label">Modules Completed</p>
                <p className="trainee-meta-value">{c.completed} / {c.modules}</p>
              </div>
              <div className="trainee-meta-item">
                <p className="trainee-meta-label">Next Class</p>
                <p className="trainee-meta-value">{c.nextClass}</p>
              </div>
              <div className="trainee-meta-item">
                <p className="trainee-meta-label">Status</p>
                <span className="trainee-status-pill" style={{ color: c.color, background: c.bg }}>{c.status}</span>
              </div>
            </div>
            <div className="trainee-module-list">
              <h3 className="trainee-section-title">Modules</h3>
              {Array.from({ length: c.modules }, (_, i) => (
                <div key={i} className={`trainee-module-item ${i < c.completed ? 'done' : i === c.completed ? 'current' : ''}`}>
                  <div className={`trainee-module-dot ${i < c.completed ? 'done' : i === c.completed ? 'current' : ''}`}
                    style={i < c.completed ? { background: c.color } : {}}>
                    {i < c.completed ? '✓' : i + 1}
                  </div>
                  <div>
                    <p className="trainee-module-name">Module {i + 1}: {['Introduction & Fundamentals', 'Core Concepts', 'Theoretical Framework', 'Applied Methods', 'Case Studies', 'Data Collection', 'Analysis Techniques', 'Interpretation', 'Report Writing', 'Practical Assessment', 'Advanced Topics', 'Research Methods', 'Policy Implications', 'Review & Revision', 'Final Assessment'][i] || `Module ${i + 1}`}</p>
                    <p className="trainee-module-status">{i < c.completed ? 'Completed' : i === c.completed ? 'In Progress' : 'Pending'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trainee-page-inner">
      <div className="trainee-courses-grid">
        {courses.map((c, i) => (
          <div key={c.id} className="trainee-course-card" onClick={() => setSelected(i)}>
            <div className="trainee-course-card-top" style={{ background: c.color }}>
              <span className="trainee-course-code">{c.code}</span>
              <span className="trainee-course-credits">{c.credits} Credits</span>
            </div>
            <div className="trainee-course-card-body">
              <h3 className="trainee-course-name">{c.name}</h3>
              <p className="trainee-course-faculty">{c.faculty}</p>
              <div className="trainee-course-progress-row">
                <span className="trainee-course-progress-label">{c.progress}% complete</span>
                <span className="trainee-course-progress-label">{c.completed}/{c.modules} modules</span>
              </div>
              <div className="trainee-progress-track">
                <div className="trainee-progress-fill" style={{ width: `${c.progress}%`, background: c.color }} />
              </div>
              <div className="trainee-course-footer">
                <span className="trainee-status-pill" style={{ color: c.color, background: c.bg }}>{c.status}</span>
                <span className="trainee-course-next">{c.nextClass}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
