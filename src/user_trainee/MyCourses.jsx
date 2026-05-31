import React, { useState, useEffect } from 'react';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [mainTab, setMainTab] = useState('courses'); // 'courses' or 'attendance'

  useEffect(() => {
    // Always use fresh seed data to ensure all fields are present
    const seed = [
      {
        id: 'CRS-001',
        title: 'Two-week Training on Time Series Analysis',
        code: 'TSA6-01',
        type: 'Domain-Specific',
        progress: 65,
        sessions: 14,
        completedSessions: 9,
        faculty: 'Dr. Ramesh Kumar',
        facultyDesignation: 'Professor, ISI Kolkata',
        startDate: '2026-06-10',
        endDate: '2026-06-24',
        status: 'In Progress',
        description: 'Comprehensive training covering ARIMA, exponential smoothing, spectral analysis, and forecasting techniques for official statistics.',
        objectives: ['Understand time series decomposition', 'Build ARIMA models', 'Apply forecasting methods to real data', 'Interpret spectral analysis results'],
        schedule: 'Mon-Fri, 10:00 AM – 4:00 PM',
        venue: 'Hall A-201 & Computer Lab 3',
        credits: 4,
        syllabus: [
          { week: 'Week 1', topics: 'Introduction, Stationarity, ACF/PACF, AR Models, MA Models, ARIMA' },
          { week: 'Week 2', topics: 'Seasonal ARIMA, Exponential Smoothing, Spectral Analysis, Forecasting, Project' },
        ],
        assessments: [
          { name: 'MCQ: Statistical Inference', marks: 100, status: 'Pending' },
          { name: 'ARIMA Model Report', marks: 30, status: 'Pending' },
          { name: 'Final Assessment', marks: 100, status: 'Upcoming' },
        ],
        materials: 4,
      },
        {
          id: 'CRS-002',
          title: 'ISS Foundation Module - Batch 46',
          code: 'ISS6-46',
          type: 'Induction',
          progress: 100,
          sessions: 30,
          completedSessions: 30,
          faculty: 'Prof. Ananya Sen',
          facultyDesignation: 'Director (Training), NSSTA',
          startDate: '2026-03-01',
          endDate: '2026-04-15',
          status: 'Completed',
          description: 'Foundation training for ISS probationers covering survey methodology, sampling theory, national accounts, and administrative statistics.',
          objectives: ['Master survey design principles', 'Understand national accounts framework', 'Apply sampling techniques', 'Analyze administrative data sources'],
          schedule: 'Mon-Sat, 9:30 AM – 5:00 PM',
          venue: 'Conference Hall & Seminar Room',
          credits: 8,
          syllabus: [
            { week: 'Week 1-2', topics: 'Survey Methodology, Sampling Theory, Questionnaire Design' },
            { week: 'Week 3-4', topics: 'National Accounts, GDP Estimation, Index Numbers (CPI/IIP)' },
            { week: 'Week 5-6', topics: 'Administrative Statistics, SDG Indicators, Project Work' },
          ],
          assessments: [
            { name: 'MCQ: Sampling Techniques', marks: 100, status: 'Graded', score: 82 },
            { name: 'Survey Design Proposal', marks: 50, status: 'Graded', score: 44 },
            { name: 'National Accounts Case Study', marks: 40, status: 'Graded', score: 36 },
          ],
          materials: 12,
        },
        {
          id: 'CRS-003',
          title: 'Workshop on Big Data Analytics & ML',
          code: 'BDA7-10',
          type: 'Refresher',
          progress: 20,
          sessions: 10,
          completedSessions: 2,
          faculty: 'Dr. Vikram Patel',
          facultyDesignation: 'Data Scientist, NIC',
          startDate: '2026-07-01',
          endDate: '2026-07-12',
          status: 'In Progress',
          description: 'Hands-on workshop on machine learning applications in official statistics, big data processing, and predictive modeling.',
          objectives: ['Understand ML fundamentals', 'Process large datasets with Python', 'Build classification & regression models', 'Apply ML to official statistics use cases'],
          schedule: 'Mon-Fri, 10:00 AM – 5:00 PM',
          venue: 'Computer Lab 1 & 2',
          credits: 3,
          syllabus: [
            { week: 'Week 1', topics: 'Python for Data Science, Pandas, NumPy, Data Visualization' },
            { week: 'Week 2', topics: 'Supervised Learning, Random Forest, Neural Networks, Project' },
          ],
          assessments: [
            { name: 'Lab Assignment: Data Wrangling', marks: 25, status: 'Pending' },
            { name: 'ML Model Project', marks: 50, status: 'Upcoming' },
          ],
          materials: 6,
        },
        {
          id: 'CRS-004',
          title: 'International Programme on Agricultural Statistics',
          code: 'AGS8-05',
          type: 'International',
          progress: 0,
          sessions: 20,
          completedSessions: 0,
          faculty: 'Dr. Sarah Mitchell',
          facultyDesignation: 'FAO Consultant, Rome',
          startDate: '2026-08-05',
          endDate: '2026-08-25',
          status: 'Upcoming',
          description: 'International training programme covering agricultural census, crop estimation, food security indicators, and SDG monitoring.',
          objectives: ['Understand agricultural census methodology', 'Learn crop cutting experiments', 'Monitor food security indicators', 'Apply SDG framework to agriculture'],
          schedule: 'Mon-Fri, 9:00 AM – 4:30 PM',
          venue: 'International Training Centre',
          credits: 5,
          syllabus: [
            { week: 'Week 1', topics: 'Agricultural Census, Land Use Statistics, Crop Area Estimation' },
            { week: 'Week 2', topics: 'Crop Yield Estimation, Livestock Census, Cost of Cultivation' },
            { week: 'Week 3', topics: 'Food Security, SDG Indicators, International Best Practices, Project' },
          ],
          assessments: [
            { name: 'Country Presentation', marks: 30, status: 'Upcoming' },
            { name: 'Group Project Report', marks: 50, status: 'Upcoming' },
          ],
          materials: 0,
        },
      ];
      localStorage.setItem('trainee_courses', JSON.stringify(seed));
      setCourses(seed);
  }, []);

  const filteredCourses = filterStatus === 'All' ? courses : courses.filter(c => c.status === filterStatus);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Upcoming': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Domain-Specific': return 'bg-purple-50 text-purple-700';
      case 'Induction': return 'bg-indigo-50 text-indigo-700';
      case 'Refresher': return 'bg-teal-50 text-teal-700';
      case 'International': return 'bg-rose-50 text-rose-700';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  // Course Detail View
  if (selectedCourse) {
    const course = selectedCourse;
    return (
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
        {/* Back Button */}
        <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-1.5 text-[11px] font-bold text-[#08493d] hover:text-[#063b31] mb-5 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to All Courses
        </button>

        {/* Course Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          <div className="bg-gradient-to-r from-[#08493d] to-[#0a5e4e] px-6 py-5 text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/20`}>{course.type}</span>
                  <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-white/20">{course.code}</span>
                </div>
                <h1 className="text-lg font-bold">{course.title}</h1>
                <p className="text-[11px] text-emerald-200 mt-1">{course.description}</p>
              </div>
              <span className={`shrink-0 text-[9px] font-bold px-3 py-1 rounded-full border ${getStatusStyle(course.status)}`}>{course.status}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-gray-600">Course Progress</span>
              <span className="text-[12px] font-bold text-[#08493d]">{course.progress}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ${course.progress === 100 ? 'bg-emerald-500' : 'bg-[#08493d]'}`} style={{ width: `${course.progress}%` }}></div>
            </div>
            <p className="text-[9px] text-gray-400 mt-1.5">{course.completedSessions} of {course.sessions} sessions completed</p>
          </div>

          {/* Quick Info Grid */}
          <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div><p className="text-[9px] text-gray-400 font-medium">Faculty</p><p className="text-[11px] font-bold text-gray-900 mt-0.5">{course.faculty}</p><p className="text-[9px] text-gray-400">{course.facultyDesignation}</p></div>
            <div><p className="text-[9px] text-gray-400 font-medium">Duration</p><p className="text-[11px] font-bold text-gray-900 mt-0.5">{course.startDate} → {course.endDate}</p><p className="text-[9px] text-gray-400">{course.schedule}</p></div>
            <div><p className="text-[9px] text-gray-400 font-medium">Venue</p><p className="text-[11px] font-bold text-gray-900 mt-0.5">{course.venue}</p></div>
            <div><p className="text-[9px] text-gray-400 font-medium">Credits</p><p className="text-[11px] font-bold text-gray-900 mt-0.5">{course.credits} Credits</p><p className="text-[9px] text-gray-400">{course.materials} materials</p></div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Objectives */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-[#08493d] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#08493d]/10 flex items-center justify-center text-[10px]">🎯</span>
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {course.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-gray-700">
                  <svg className="w-4 h-4 text-[#08493d] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Syllabus */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-[#08493d] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#08493d]/10 flex items-center justify-center text-[10px]">📘</span>
              Syllabus
            </h3>
            <div className="space-y-3">
              {course.syllabus.map((s, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl">
                  <p className="text-[9px] font-bold text-[#08493d] uppercase">{s.week}</p>
                  <p className="text-[11px] text-gray-700 mt-0.5">{s.topics}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Assessments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-[#08493d] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#08493d]/10 flex items-center justify-center text-[10px]">📝</span>
              Assessments
            </h3>
            <div className="space-y-2">
              {course.assessments.map((a, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-800">{a.name}</p>
                    <p className="text-[9px] text-gray-400 mt-0.5">Total: {a.marks} marks</p>
                  </div>
                  {a.status === 'Graded' ? (
                    <span className="text-[12px] font-bold text-emerald-700">{a.score}/{a.marks}</span>
                  ) : (
                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${a.status === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'}`}>{a.status}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Course Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-[#08493d] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#08493d]/10 flex items-center justify-center text-[10px]">📊</span>
              Course Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-center">
                <p className="text-xl font-bold text-emerald-700">{course.completedSessions}</p>
                <p className="text-[9px] text-emerald-600 font-medium mt-0.5">Sessions Done</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-center">
                <p className="text-xl font-bold text-blue-700">{course.sessions - course.completedSessions}</p>
                <p className="text-[9px] text-blue-600 font-medium mt-0.5">Remaining</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl text-center">
                <p className="text-xl font-bold text-amber-700">{course.assessments.length}</p>
                <p className="text-[9px] text-amber-600 font-medium mt-0.5">Assessments</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl text-center">
                <p className="text-xl font-bold text-purple-700">{course.materials}</p>
                <p className="text-[9px] text-purple-600 font-medium mt-0.5">Materials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Course List View
  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
      {/* Main Tab: Courses / Attendance */}
      <div className="flex items-center gap-4 mb-5 border-b border-gray-100 pb-3">
        <button onClick={() => setMainTab('courses')} className={`text-[13px] font-bold pb-2 border-b-2 transition-colors ${mainTab === 'courses' ? 'text-[#08493d] border-[#08493d]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>
          📖 My Courses
        </button>
        <button onClick={() => setMainTab('attendance')} className={`text-[13px] font-bold pb-2 border-b-2 transition-colors ${mainTab === 'attendance' ? 'text-[#08493d] border-[#08493d]' : 'text-gray-400 border-transparent hover:text-gray-600'}`}>
          ✅ Attendance
        </button>
      </div>

      {/* ATTENDANCE TAB */}
      {mainTab === 'attendance' && (
        <AttendanceView courses={courses} />
      )}

      {/* COURSES TAB */}
      {mainTab === 'courses' && (<>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Enrolled Programmes</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">Track progress and access course details.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl text-[10px] font-bold">
          {['All', 'In Progress', 'Completed', 'Upcoming'].map(status => (
            <button key={status} onClick={() => setFilterStatus(status)} className={`px-3 py-1.5 rounded-lg transition-colors ${filterStatus === status ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
              {status} {status !== 'All' && `(${courses.filter(c => c.status === status).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-xl font-bold text-gray-900">{courses.length}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Total Enrolled</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-xl font-bold text-blue-600">{courses.filter(c => c.status === 'In Progress').length}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">In Progress</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-xl font-bold text-emerald-600">{courses.filter(c => c.status === 'Completed').length}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-xl font-bold text-amber-600">{courses.filter(c => c.status === 'Upcoming').length}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase mt-0.5">Upcoming</p>
        </div>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <div key={course.id} onClick={() => setSelectedCourse(course)} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#08493d]/20 transition-all cursor-pointer group">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${getTypeStyle(course.type)}`}>{course.type}</span>
                  <span className="text-[9px] font-semibold text-gray-400">{course.code}</span>
                </div>
                <h3 className="text-[14px] font-bold text-gray-900 group-hover:text-[#08493d] transition-colors">{course.title}</h3>
                <p className="text-[10px] text-gray-500 mt-1">{course.faculty} • {course.facultyDesignation}</p>
                <p className="text-[11px] text-gray-600 mt-2 leading-relaxed line-clamp-2">{course.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(course.status)}`}>{course.status}</span>
                <span className="text-[9px] text-gray-400">{course.startDate} → {course.endDate}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${course.progress === 100 ? 'bg-emerald-500' : 'bg-[#08493d]'}`} style={{ width: `${course.progress}%` }}></div>
              </div>
              <span className="text-[11px] font-bold text-gray-600">{course.progress}%</span>
              <span className="text-[9px] text-gray-400">{course.completedSessions}/{course.sessions} sessions</span>
            </div>

            {/* Footer Info */}
            <div className="mt-3 pt-3 border-t border-gray-50 flex flex-wrap items-center gap-4 text-[9px] text-gray-400 font-medium">
              <span className="flex items-center gap-1">📍 {course.venue}</span>
              <span className="flex items-center gap-1">🕐 {course.schedule}</span>
              <span className="flex items-center gap-1">📝 {course.assessments.length} assessments</span>
              <span className="flex items-center gap-1">📚 {course.materials} materials</span>
              <span className="ml-auto text-[10px] font-bold text-[#08493d] opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-[12px] font-medium text-gray-400">No courses found for this filter.</p>
        </div>
      )}
      </>)}
    </div>
  );
}

// Attendance View Component (inline)
function AttendanceView({ courses }) {
  const attendanceData = courses.map(c => ({
    id: c.id,
    name: c.title,
    code: c.code,
    totalLectures: c.sessions * 2,
    present: Math.round(c.completedSessions * 2 * 0.95),
    absent: Math.max(0, Math.round(c.completedSessions * 2 * 0.05)),
    remaining: (c.sessions - c.completedSessions) * 2,
    activities: c.progress > 0 ? [
      { name: 'Theory', percentage: Math.min(100, Math.round(c.progress * 1.05)), type: 'T' },
      { name: 'Practical', percentage: Math.min(100, Math.round(c.progress * 0.95)), type: 'P' },
    ] : [{ name: 'Theory', percentage: 0, type: 'T' }],
  }));

  const totalLectures = attendanceData.reduce((s, c) => s + c.totalLectures, 0);
  const totalPresent = attendanceData.reduce((s, c) => s + c.present, 0);
  const totalAbsent = attendanceData.reduce((s, c) => s + c.absent, 0);
  const overallPct = (totalPresent + totalAbsent) > 0 ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100) : 0;

  const CircleProgress = ({ percentage, size = 50 }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage >= 75 ? '#08493d' : percentage >= 50 ? '#d97706' : '#dc2626';
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth="4" />
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-700">{percentage}%</span>
      </div>
    );
  };

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-[#08493d]/10 flex items-center justify-center"><span className="w-2 h-2 rounded-sm bg-[#08493d]"></span></span>
          <span className="text-[11px] font-semibold text-[#08493d]">Total Lectures</span>
          <span className="text-[12px] font-bold text-gray-900">{totalLectures}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
          </span>
          <span className="text-[11px] font-semibold text-emerald-700">Present</span>
          <span className="text-[12px] font-bold text-gray-900">{totalPresent}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded bg-rose-100 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-rose-500"></span></span>
          <span className="text-[11px] font-semibold text-rose-700">Absent</span>
          <span className="text-[12px] font-bold text-gray-900">{totalAbsent}</span>
        </div>
        <span className="ml-auto text-[13px] font-bold text-[#08493d]">{overallPct}% Overall</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-[#08493d] rounded-full" style={{ width: `${overallPct}%` }}></div>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {attendanceData.map(course => {
          const conducted = course.present + course.absent;
          const pct = conducted > 0 ? Math.round((course.present / conducted) * 100) : 0;
          return (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-[12px] font-bold text-gray-900 leading-snug pr-2">{course.name}</h3>
                <span className="shrink-0 text-[9px] font-bold text-[#08493d] bg-[#08493d]/5 border border-[#08493d]/20 px-2 py-0.5 rounded-full">{course.code}</span>
              </div>
              <div className="flex items-center gap-4">
                <CircleProgress percentage={pct} />
                <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                  <div><p className="text-[9px] text-gray-400">Total</p><p className="text-[14px] font-bold text-gray-900">{course.totalLectures}</p></div>
                  <div><p className="text-[9px] text-gray-400">Present</p><p className="text-[14px] font-bold text-emerald-600">{course.present}</p></div>
                  <div><p className="text-[9px] text-gray-400">Absent</p><p className="text-[14px] font-bold text-rose-500">{course.absent}</p></div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50">
                {course.activities.map((act, i) => (
                  <div key={i} className="flex items-center justify-between py-1">
                    <span className={`text-[10px] font-semibold ${act.type === 'T' ? 'text-blue-600' : 'text-teal-600'}`}>{act.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${act.percentage >= 75 ? 'bg-[#08493d]' : act.percentage >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${act.percentage}%` }}></div>
                      </div>
                      <span className="text-[9px] font-bold text-gray-600 w-7 text-right">{act.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
