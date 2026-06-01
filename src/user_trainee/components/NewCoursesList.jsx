import React, { useState } from 'react';

const NEW_COURSES = [
  { id: 101, title: 'Python Application in Macroeconomic Data', instructor: 'Dr. Ramesh Nair', credits: 4, duration: '4 Weeks', level: 'Intermediate', enrolled: false },
  { id: 102, title: 'Principles of Official Price Indexing', instructor: 'Prof. S. Raghunath', credits: 3, duration: '3 Weeks', level: 'Beginner', enrolled: false },
  { id: 103, title: 'Machine Learning Models for Yield Estimation', instructor: 'Dr. H. J. Bhabha', credits: 5, duration: '6 Weeks', level: 'Advanced', enrolled: false },
  { id: 104, title: 'System of Environmental-Economic Accounting', instructor: 'Ministry Representative', credits: 4, duration: '4 Weeks', level: 'Advanced', enrolled: false },
];

export default function NewCoursesList() {
  const [courses, setCourses] = useState(NEW_COURSES);
  const [search, setSearch] = useState('');
  const [enrolledMsg, setEnrolledMsg] = useState('');

  const enrollCourse = (courseId, courseTitle) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        setEnrolledMsg(`Successfully enrolled in "${courseTitle}"!`);
        setTimeout(() => setEnrolledMsg(''), 3000);
        return { ...c, enrolled: true };
      }
      return c;
    }));
  };

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) || 
    c.instructor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="trainee-page-inner animate-fadeIn">
      {enrolledMsg && (
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
          <span>🎉 {enrolledMsg}</span>
          <button style={{ background: 'none', border: 'none', color: 'white', fontWeight: 900, cursor: 'pointer' }} onClick={() => setEnrolledMsg('')}>×</button>
        </div>
      )}

      <div className="trainee-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#064e3b', margin: 0 }}>Newly Launched Courses</h3>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0' }}>Self-enroll in statistical and programming programs</p>
          </div>

          {/* Search bar */}
          <input
            type="text"
            placeholder="Search new courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '11.5px',
              minWidth: '220px'
            }}
          />
        </div>

        {/* Course Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '18px' }}>
          {filtered.map(course => (
            <div
              key={course.id}
              style={{
                border: '1px solid #eef2f1',
                borderRadius: '24px',
                background: '#ffffff',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                boxShadow: '0 8px 24px -8px rgba(8, 73, 61, 0.05)'
              }}
              className="new-course-card"
            >
              {/* Card top gradient band */}
              <div style={{
                height: '8px',
                background: 'linear-gradient(90deg, #10b981, #059669)'
              }} />

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '9px', fontWeight: 900, background: '#f1f5f9', color: '#475569',
                      padding: '3px 8px', borderRadius: '100px', textTransform: 'uppercase'
                    }}>{course.level}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>⏱ {course.duration}</span>
                  </div>

                  <h4 style={{ fontSize: '13px', fontWeight: 850, color: '#0f172a', margin: '0 0 6px', lineHeight: 1.4 }}>{course.title}</h4>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 14px' }}>Instructor: <strong style={{ color: '#64748b' }}>{course.instructor}</strong></p>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '12px',
                  borderTop: '1px solid #f8faf9',
                  marginTop: '10px'
                }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669' }}>🎓 {course.credits} Credits</span>
                  
                  <button
                    onClick={() => enrollCourse(course.id, course.title)}
                    disabled={course.enrolled}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: course.enrolled ? 'default' : 'pointer',
                      border: 'none',
                      background: course.enrolled ? '#ecfdf5' : 'linear-gradient(135deg, #10b981, #059669)',
                      color: course.enrolled ? '#059669' : 'white',
                      boxShadow: course.enrolled ? 'none' : '0 4px 10px rgba(5,150,105,0.2)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {course.enrolled ? '✓ Enrolled' : 'Self Enroll'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
