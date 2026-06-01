import React, { useState } from 'react';

const assignments = [
  {
    id: 1,
    title: 'Data Analysis Assignment 3 – Regression Models',
    course: 'Data Analysis with R',
    due: 'Jun 6, 2026',
    status: 'pending',
    marks: null,
    outOf: 50,
    description: 'Analyze the provided dataset using linear regression. Submit R script and PDF report.',
    color: '#dc2626'
  },
  {
    id: 2,
    title: 'Survey Design Mini Project',
    course: 'Survey Design & Methodology',
    due: 'Jun 10, 2026',
    status: 'pending',
    marks: null,
    outOf: 30,
    description: 'Design a household survey instrument for a topic of your choice. Include questionnaire and sampling plan.',
    color: '#d97706'
  },
  {
    id: 3,
    title: 'Statistical Methods – Problem Set 5',
    course: 'Statistical Methods & Theory',
    due: 'Jun 4, 2026',
    status: 'pending',
    marks: null,
    outOf: 25,
    description: 'Solve problems 1–12 from Module 4. Show all workings.',
    color: '#dc2626'
  },
  {
    id: 4,
    title: 'Economic Indicators Analysis',
    course: 'Economic Statistics',
    due: 'May 28, 2026',
    status: 'submitted',
    marks: 41,
    outOf: 50,
    description: 'Analysis of CPI and WPI trends using government datasets.',
    color: '#059669'
  },
  {
    id: 5,
    title: 'Official Statistics Case Study',
    course: 'Official Statistics & Policy',
    due: 'May 20, 2026',
    status: 'graded',
    marks: 22,
    outOf: 25,
    description: 'Case study on use of official statistics in policy formulation.',
    color: '#059669'
  },
];

const STATUS_CONFIG = {
  pending:   { label: 'Pending', color: '#dc2626', bg: '#fef2f2' },
  submitted: { label: 'Submitted', color: '#2563eb', bg: '#eff6ff' },
  graded:    { label: 'Graded', color: '#059669', bg: '#ecfdf5' },
};

export default function MyAssignments() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'pending', 'submitted', 'graded'];

  const filtered = filter === 'all' ? assignments : assignments.filter(a => a.status === filter);

  return (
    <div className="trainee-page-inner">
      {/* Filter Bar */}
      <div className="trainee-filter-bar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`trainee-filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="trainee-filter-count">
              {f === 'all' ? assignments.length : assignments.filter(a => a.status === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* Assignment Cards */}
      <div className="trainee-assignments-list">
        {filtered.map(a => {
          const sc = STATUS_CONFIG[a.status];
          return (
            <div key={a.id} className="trainee-assignment-card">
              <div className="trainee-assignment-card-left" style={{ borderLeftColor: sc.color }} />
              <div className="trainee-assignment-body">
                <div className="trainee-assignment-top">
                  <div>
                    <h3 className="trainee-assignment-title">{a.title}</h3>
                    <p className="trainee-assignment-course">{a.course}</p>
                  </div>
                  <span className="trainee-status-pill" style={{ color: sc.color, background: sc.bg }}>
                    {sc.label}
                  </span>
                </div>

                <p className="trainee-assignment-desc">{a.description}</p>

                <div className="trainee-assignment-footer">
                  <span className="trainee-assignment-due" style={{ color: a.status === 'pending' ? '#dc2626' : '#6b7280' }}>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Due: {a.due}
                  </span>

                  {a.marks !== null ? (
                    <span className="trainee-assignment-marks" style={{ color: sc.color }}>
                      Score: {a.marks} / {a.outOf}
                    </span>
                  ) : (
                    <span className="trainee-assignment-marks">Max: {a.outOf} marks</span>
                  )}

                  {a.status === 'pending' && (
                    <button className="trainee-btn-primary-sm">Submit Assignment</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
