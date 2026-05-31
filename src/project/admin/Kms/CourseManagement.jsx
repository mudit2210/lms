import React from 'react';

export default function CourseManagement({
  coursesData,
  selectedCourseId,
  setSelectedCourseId,
  activeRole,
  handleAddCourse,
  handleOrderSequence
}) {
  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4 text-left">
      <div className="border-b pb-3 flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Curriculum Courses Registry</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accredited active academic courses</span>
        </div>
        {canEdit && (
          <button 
            onClick={handleAddCourse}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded text-[11px] font-extrabold shadow-2xs cursor-pointer transition-colors"
          >
            + Course
          </button>
        )}
      </div>

      <div className="space-y-3">
        {coursesData.map((course, idx) => {
          const isSelected = selectedCourseId === course.id;
          return (
            <div 
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                isSelected 
                  ? 'bg-blue-50/50 border-blue-550 shadow-2xs' 
                  : 'hover:bg-slate-50 bg-slate-50/10 border-gray-200'
              }`}
            >
              <div className="space-y-1 max-w-[70%]">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">📘</span>
                  <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{course.title}</h4>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{course.id} • {course.lessons.length} Lessons Available</p>
              </div>

              {canEdit && (
                <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                  <button 
                    disabled={idx === 0}
                    onClick={() => handleOrderSequence('courses', null, idx, idx - 1)}
                    className="p-1 hover:bg-white border border-transparent hover:border-gray-200 rounded disabled:opacity-30 disabled:hover:border-transparent"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button 
                    disabled={idx === coursesData.length - 1}
                    onClick={() => handleOrderSequence('courses', null, idx, idx + 1)}
                    className="p-1 hover:bg-white border border-transparent hover:border-gray-200 rounded disabled:opacity-30 disabled:hover:border-transparent"
                    title="Move Down"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
