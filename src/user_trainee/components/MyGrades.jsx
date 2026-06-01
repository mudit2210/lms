import React from 'react';

const grades = [
  {
    course: 'Statistical Methods & Theory', code: 'ISS-SM-101',
    midterm: 82, finals: null, assignments: 88, practicals: 91,
    overall: null, grade: null, color: '#059669', status: 'ongoing'
  },
  {
    course: 'Survey Design & Methodology', code: 'ISS-SDM-102',
    midterm: 76, finals: null, assignments: 80, practicals: null,
    overall: null, grade: null, color: '#2563eb', status: 'ongoing'
  },
  {
    course: 'Data Analysis with R', code: 'ISS-DAR-201',
    midterm: 70, finals: null, assignments: 85, practicals: 78,
    overall: null, grade: null, color: '#7c3aed', status: 'ongoing'
  },
  {
    course: 'Economic Statistics', code: 'ISS-ES-301',
    midterm: 88, finals: 84, assignments: 82, practicals: 90,
    overall: 86, grade: 'A', color: '#d97706', status: 'completed'
  },
  {
    course: 'Official Statistics & Policy', code: 'ISS-OSP-401',
    midterm: null, finals: null, assignments: 88, practicals: null,
    overall: null, grade: null, color: '#0891b2', status: 'ongoing'
  },
];

const GRADE_MAP = [
  { min: 90, label: 'A+', color: '#059669' },
  { min: 80, label: 'A', color: '#059669' },
  { min: 70, label: 'B+', color: '#2563eb' },
  { min: 60, label: 'B', color: '#2563eb' },
  { min: 50, label: 'C', color: '#d97706' },
  { min: 0,  label: 'F', color: '#dc2626' },
];

const getGrade = (val) => {
  if (val === null) return { label: '—', color: '#9ca3af' };
  return GRADE_MAP.find(g => val >= g.min) || { label: 'F', color: '#dc2626' };
};

const ScoreCell = ({ val }) => {
  const g = getGrade(val);
  if (val === null) return <span className="trainee-score-na">—</span>;
  return <span className="trainee-score-cell" style={{ color: g.color }}>{val}%</span>;
};

export default function MyGrades() {
  const completed = grades.filter(g => g.overall !== null);
  const gpa = completed.length
    ? (completed.reduce((s, g) => s + g.overall, 0) / completed.length / 25).toFixed(1)
    : '—';

  return (
    <div className="trainee-page-inner">
      {/* GPA Banner */}
      <div className="trainee-grades-banner">
        <div className="trainee-gpa-card">
          <p className="trainee-gpa-label">Cumulative GPA</p>
          <p className="trainee-gpa-value">{gpa}</p>
          <p className="trainee-gpa-sub">/ 4.0  ·  Based on {completed.length} completed course{completed.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="trainee-grade-legend">
          {GRADE_MAP.slice(0, -1).map(g => (
            <div key={g.label} className="trainee-grade-legend-item">
              <span style={{ color: g.color, fontWeight: 800 }}>{g.label}</span>
              <span className="trainee-grade-legend-min">≥ {g.min}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grades Table */}
      <div className="trainee-card">
        <div className="trainee-card-header">
          <h3 className="trainee-card-title">Grade Sheet</h3>
          <span className="trainee-card-link">Download PDF</span>
        </div>
        <div className="trainee-grades-table-wrapper">
          <table className="trainee-grades-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Mid-Term</th>
                <th>Assignments</th>
                <th>Practicals</th>
                <th>Finals</th>
                <th>Overall</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => {
                const gradeObj = g.grade ? getGrade(g.overall) : { label: 'IP', color: '#6b7280' };
                return (
                  <tr key={i}>
                    <td>
                      <div>
                        <p className="trainee-grades-course-name">{g.course}</p>
                        <p className="trainee-grades-code">{g.code}</p>
                      </div>
                    </td>
                    <td><ScoreCell val={g.midterm} /></td>
                    <td><ScoreCell val={g.assignments} /></td>
                    <td><ScoreCell val={g.practicals} /></td>
                    <td><ScoreCell val={g.finals} /></td>
                    <td><ScoreCell val={g.overall} /></td>
                    <td>
                      <span className="trainee-grade-badge" style={{ color: gradeObj.color, background: gradeObj.color + '15' }}>
                        {g.grade || gradeObj.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
