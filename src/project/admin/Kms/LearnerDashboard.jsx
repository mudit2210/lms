import React from 'react';

export default function LearnerDashboard({
  repoFiles,
  bookmarkedIds,
  setSelectedFile,
  coursesData,
  onDownload,
  setActiveTab,
  setSelectedCourseId
}) {
  const bookmarkedFiles = repoFiles.filter(f => bookmarkedIds.includes(f.id));
  
  const learningStats = [
    { label: 'Courses In Progress', value: '2', icon: '📚', color: 'bg-emerald-50 text-emerald-800 border-emerald-150' },
    { label: 'Completed Lessons', value: '4', icon: '✅', color: 'bg-blue-50 text-blue-800 border-blue-150' },
    { label: 'Hours Spent', value: '18.5 hrs', icon: '⏱️', color: 'bg-amber-50 text-amber-800 border-amber-150' },
    { label: 'Resource Bookmarks', value: bookmarkedFiles.length, icon: '🔖', color: 'bg-purple-50 text-purple-800 border-purple-150' }
  ];

  const enrolledCourses = [
    {
      id: 'CRS-001',
      title: 'Foundation Training Program 2026',
      progress: 65,
      lastAccessed: '2 hours ago',
      color: 'from-emerald-700 to-teal-900',
      totalLessons: 4,
      completedLessons: 2
    },
    {
      id: 'CRS-002',
      title: 'Government Procurement & Financial Audits',
      progress: 30,
      lastAccessed: 'Yesterday',
      color: 'from-blue-700 to-indigo-900',
      totalLessons: 3,
      completedLessons: 1
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-xs font-semibold text-slate-700 select-none text-left">
      
      {/* Welcome Learner Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#08493d] to-[#0c3c32] rounded-2xl p-6 sm:p-8 text-white shadow-sm border border-emerald-800/40">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:16px_16px]"></div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-block bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-extrabold">
            Trainee Portal Workspace
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Welcome back, ISS Probationary Officer!
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
            Your customized learning track is compiled and optimized. Access accredited MoSPI frameworks, consult best practices guidelines, or download national statistical templates below.
          </p>
        </div>
      </div>

      {/* Learning Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {learningStats.map(stat => (
          <div key={stat.label} className={`p-4 bg-white rounded-xl border border-gray-150 shadow-2xs flex items-center justify-between transition-all duration-300 hover:shadow-xs`}>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">{stat.label}</span>
              <p className="text-lg font-black text-slate-800">{stat.value}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-lg border border-slate-100">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Active Enrolled Courses */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">My Active Courses</h3>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Assigned training curricula</span>
            </div>
          </div>

          <div className="space-y-4">
            {enrolledCourses.map(course => (
              <div 
                key={course.id}
                onClick={() => {
                  setSelectedCourseId(course.id);
                  setActiveTab('courses');
                }}
                className="group border border-gray-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow cursor-pointer"
              >
                {/* Course Header Banner */}
                <div className={`bg-gradient-to-r ${course.color} p-4 text-white space-y-1`}>
                  <p className="text-[9px] text-yellow-300 uppercase tracking-widest font-extrabold">Active Syllabus</p>
                  <h4 className="font-extrabold text-sm sm:text-base group-hover:text-yellow-100 transition-colors leading-snug">{course.title}</h4>
                </div>

                {/* Course Details Body */}
                <div className="p-4 bg-slate-50/50 space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                    <span>PROGRESS: {course.progress}%</span>
                    <span>{course.completedLessons} of {course.totalLessons} Lessons Finished</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>

                  <div className="flex justify-between items-center pt-1 text-[10px] text-slate-500 font-semibold border-t border-slate-100">
                    <span>Last accessed: {course.lastAccessed}</span>
                    <span className="text-blue-600 font-extrabold group-hover:underline flex items-center gap-1">
                      Continue Learning <span>▶</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bookmarked Resources & Announcements */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Bookmarks */}
          <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
            <div>
              <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Bookmarked Resources</h3>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Saved reference guidelines</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {bookmarkedFiles.length > 0 ? (
                bookmarkedFiles.map(file => (
                  <div 
                    key={file.id} 
                    className="flex justify-between items-center p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-gray-150 transition-colors cursor-pointer group"
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="space-y-0.5 max-w-[70%]">
                      <p className="font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors">{file.name}</p>
                      <p className="text-[9px] text-slate-400">{file.size} • {file.type.toUpperCase()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDownload(file); }}
                        className="p-1 hover:bg-white text-slate-400 hover:text-emerald-700 rounded border border-transparent hover:border-gray-200 transition-all"
                        title="Download"
                      >
                        📥
                      </button>
                      <span className="text-slate-350 text-[10px]">▶</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 italic">
                  No bookmarks saved yet. Browse the Knowledge Base to add templates and manuals to your dashboard.
                </div>
              )}
            </div>
          </div>

          {/* Quick Syllabus Recommendations */}
          <div className="bg-[#fcf8f0] p-5 rounded-2xl border border-[#ebd7be]/60 shadow-2xs space-y-3">
            <h4 className="font-extrabold text-[#70461b] uppercase tracking-wider text-[10.5px]">Academic Advisory Board Notice</h4>
            <p className="text-[11px] text-[#805f3d] font-semibold leading-relaxed">
              Trainee performance assessment exams on <strong>GFR Procurement Standards</strong> will commence next Friday. Please make sure to review the official procurement templates and participate in the Q&A thread in the discussion forum.
            </p>
            <div className="pt-1.5 border-t border-[#ebd7be]/50 flex justify-between items-center">
              <span className="text-[9px] text-[#907659] font-extrabold uppercase">NSSTA Greater Noida</span>
              <button 
                onClick={() => setActiveTab('forum')}
                className="text-[10px] text-amber-800 font-extrabold hover:underline"
              >
                Go to Q&A Board →
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
