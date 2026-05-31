import React, { useState, useEffect } from 'react';

export default function Attendance() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Read from the SAME trainee_courses localStorage key used by MyCourses
    const savedCourses = localStorage.getItem('trainee_courses');
    if (savedCourses) {
      const allCourses = JSON.parse(savedCourses);
      // Build attendance data from the same courses
      const attendanceData = allCourses.map(c => ({
        id: c.id,
        name: c.title,
        code: c.code || c.id,
        totalLectures: c.sessions * 2, // theory + practical per session
        present: Math.round(c.completedSessions * 2 * 0.95), // 95% of attended sessions
        absent: Math.round(c.completedSessions * 2 * 0.05),
        remaining: (c.sessions - c.completedSessions) * 2,
        activities: c.progress > 0 ? [
          { name: 'Theory', percentage: Math.min(100, Math.round(c.progress * 1.1)), type: 'T' },
          { name: 'Practical', percentage: Math.min(100, Math.round(c.progress * 0.95)), type: 'P' },
        ] : [
          { name: 'Theory', percentage: 0, type: 'T' },
        ],
      }));
      setCourses(attendanceData);
    } else {
      // Fallback seed — same 4 courses as MyCourses
      const seed = [
        { id: 'CRS-001', name: 'Two-week Training on Time Series Analysis', code: 'TSA6-01', totalLectures: 28, present: 17, absent: 1, remaining: 10, activities: [{ name: 'Theory', percentage: 95, type: 'T' }, { name: 'Practical', percentage: 90, type: 'P' }] },
        { id: 'CRS-002', name: 'ISS Foundation Module - Batch 46', code: 'ISS6-46', totalLectures: 60, present: 57, absent: 3, remaining: 0, activities: [{ name: 'Theory', percentage: 97, type: 'T' }, { name: 'Practical', percentage: 93, type: 'P' }] },
        { id: 'CRS-003', name: 'Workshop on Big Data Analytics & ML', code: 'BDA7-10', totalLectures: 20, present: 4, absent: 0, remaining: 16, activities: [{ name: 'Theory', percentage: 100, type: 'T' }, { name: 'Practical', percentage: 100, type: 'P' }] },
        { id: 'CRS-004', name: 'International Programme on Agricultural Statistics', code: 'AGS8-05', totalLectures: 40, present: 0, absent: 0, remaining: 40, activities: [{ name: 'Theory', percentage: 0, type: 'T' }] },
      ];
      setCourses(seed);
    }
  }, []);

  const totalLectures = courses.reduce((sum, c) => sum + c.totalLectures, 0);
  const totalPresent = courses.reduce((sum, c) => sum + c.present, 0);
  const totalAbsent = courses.reduce((sum, c) => sum + c.absent, 0);
  const overallPct = (totalPresent + totalAbsent) > 0 ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100) : 0;

  const CircleProgress = ({ percentage, size = 52 }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    const color = percentage >= 75 ? '#08493d' : percentage >= 50 ? '#d97706' : '#dc2626';

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth="4" />
          <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth="4" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-gray-700">{percentage}%</span>
      </div>
    );
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Attendance</h1>
        <p className="text-[11px] text-gray-500 mt-1">Course-wise attendance details for all enrolled programmes.</p>

        {/* Summary Stats */}
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-[#08493d]/10 flex items-center justify-center">
              <span className="w-2 h-2 rounded-sm bg-[#08493d]"></span>
            </span>
            <span className="text-[11px] font-semibold text-[#08493d]">Total Lectures</span>
            <span className="text-[12px] font-bold text-gray-900 ml-0.5">{totalLectures}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700">Present</span>
            <span className="text-[12px] font-bold text-gray-900 ml-0.5">{totalPresent}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 rounded bg-rose-100 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-rose-700">Absent</span>
            <span className="text-[12px] font-bold text-gray-900 ml-0.5">{totalAbsent}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-[11px] font-semibold text-gray-500">Overall:</span>
            <span className="text-[13px] font-bold text-[#08493d]">{overallPct}%</span>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#08493d] rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }}></div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {courses.map((course) => {
          const conducted = course.present + course.absent;
          const pct = conducted > 0 ? Math.round((course.present / conducted) * 100) : 0;
          return (
            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-[#08493d]/20 transition-all">
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[13px] font-bold text-gray-900 leading-snug pr-2">{course.name}</h3>
                <span className="shrink-0 text-[9px] font-bold text-[#08493d] bg-[#08493d]/5 border border-[#08493d]/20 px-2 py-0.5 rounded-full">{course.code}</span>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4">
                <CircleProgress percentage={pct} />
                <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium">Total</p>
                    <p className="text-[15px] font-bold text-gray-900 mt-0.5">{course.totalLectures}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium">Present</p>
                    <p className="text-[15px] font-bold text-emerald-600 mt-0.5">{course.present}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-400 font-medium">Absent</p>
                    <p className="text-[15px] font-bold text-rose-500 mt-0.5">{course.absent}</p>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="mt-4 pt-3 border-t border-gray-50">
                <p className="text-[10px] font-bold text-gray-600 mb-2">Activities ({course.activities.length})</p>
                {course.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5">
                    <span className={`text-[11px] font-semibold ${act.type === 'T' ? 'text-blue-600' : 'text-teal-600'}`}>{act.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${act.percentage >= 75 ? 'bg-[#08493d]' : act.percentage >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${act.percentage}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 w-8 text-right">{act.percentage}%</span>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${act.type === 'P' ? 'bg-teal-500' : 'bg-blue-500'}`}>{act.type}</span>
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
