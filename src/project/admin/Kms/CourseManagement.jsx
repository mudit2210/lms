import React, { useState, useEffect } from 'react';

export default function CourseManagement({
  coursesData,
  selectedCourseId,
  setSelectedCourseId,
  activeRole,
  handleAddCourse,
  handleOrderSequence,
  onUpdateCourse,
  onDeleteCourse
}) {
  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);
  
  const selectedCourse = coursesData.find(c => c.id === selectedCourseId);

  // Detail fields local states
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [status, setStatus] = useState('Draft');

  // Sync if selectedCourse changes
  useEffect(() => {
    if (selectedCourse) {
      setCourseName(selectedCourse.title || selectedCourse.name || '');
      setCourseCode(selectedCourse.code || '');
      setDescription(selectedCourse.description || 'Syllabus guidelines and training material description.');
      setThumbnail(selectedCourse.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3');
      setCategory(selectedCourse.category || 'General Statistics');
      setDuration(selectedCourse.duration || '12 hours');
      setStatus(selectedCourse.status || 'Draft');
    }
  }, [selectedCourseId, coursesData]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedCourse) return;
    onUpdateCourse(selectedCourse.id, {
      title: courseName,
      name: courseName,
      code: courseCode,
      description,
      thumbnail,
      category,
      duration,
      status
    });
    alert("Course guidelines saved successfully!");
  };

  const handlePublish = () => {
    if (!selectedCourse) return;
    onUpdateCourse(selectedCourse.id, { status: 'Published' });
    setStatus('Published');
    alert("Course status successfully published!");
  };

  const handleArchive = () => {
    if (!selectedCourse) return;
    onUpdateCourse(selectedCourse.id, { status: 'Archived' });
    setStatus('Archived');
    alert("Course status successfully archived!");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none">
      
      <div className="border-b pb-3 flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Curriculum Courses</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accredited academic courses</span>
        </div>
        {canEdit && (
          <button 
            onClick={handleAddCourse}
            className="px-3 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white rounded text-[10.5px] font-extrabold shadow-2xs cursor-pointer transition-colors"
          >
            + Add Course
          </button>
        )}
      </div>

      {/* Courses List */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {coursesData.map((course, idx) => {
          const isSelected = selectedCourseId === course.id;
          return (
            <div 
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                isSelected 
                  ? 'bg-blue-50/50 border-blue-450 shadow-3xs' 
                  : 'hover:bg-slate-50 bg-slate-50/10 border-gray-200'
              }`}
            >
              <div className="space-y-1 max-w-[70%]">
                <div className="flex items-center gap-1.5">
                  <span className="text-blue-600">📘</span>
                  <h4 className="font-extrabold text-slate-800 text-[11px] truncate max-w-[150px]">{course.title}</h4>
                </div>
                <div className="flex gap-2 items-center text-[9px] font-bold text-slate-400 uppercase">
                  <span>{course.id}</span>
                  <span>•</span>
                  <span className={`px-1.5 py-0.2 rounded border ${
                    course.status === 'Published' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                    course.status === 'Archived' ? 'bg-slate-100 text-slate-500 border-gray-200' :
                    'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {course.status || 'Draft'}
                  </span>
                </div>
              </div>

              {canEdit && (
                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                  <button 
                    disabled={idx === 0}
                    onClick={() => handleOrderSequence('courses', null, idx, idx - 1)}
                    className="p-1 hover:bg-white border border-transparent hover:border-gray-250 rounded disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button 
                    disabled={idx === coursesData.length - 1}
                    onClick={() => handleOrderSequence('courses', null, idx, idx + 1)}
                    className="p-1 hover:bg-white border border-transparent hover:border-gray-250 rounded disabled:opacity-30 cursor-pointer"
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

      {/* Selected Course Fields detail editor */}
      {selectedCourse ? (
        <div className="border-t pt-3.5 space-y-3">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Selected Course Parameters</h4>
          
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-450 uppercase font-extrabold">Course Name:</label>
                <input 
                  type="text" 
                  value={courseName}
                  onChange={e => setCourseName(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Course Code:</label>
                <input 
                  type="text" 
                  value={courseCode}
                  onChange={e => setCourseCode(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Category:</label>
                <input 
                  type="text" 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Duration:</label>
                <input 
                  type="text" 
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Thumbnail Link:</label>
                <input 
                  type="text" 
                  value={thumbnail}
                  onChange={e => setThumbnail(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Description:</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full h-12 border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-850"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Status:</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  disabled={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-bold text-slate-800"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>

            {canEdit && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                <button 
                  type="submit"
                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded text-[10px] font-extrabold cursor-pointer"
                >
                  Save Changes
                </button>
                <button 
                  type="button"
                  onClick={handlePublish}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-extrabold cursor-pointer"
                >
                  Publish
                </button>
                <button 
                  type="button"
                  onClick={handleArchive}
                  className="px-2.5 py-1.5 bg-slate-500 hover:bg-slate-600 text-white rounded text-[10px] font-extrabold cursor-pointer"
                >
                  Archive
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this course?")) {
                      onDeleteCourse(selectedCourse.id);
                    }
                  }}
                  className="px-2.5 py-1.5 bg-red-650 hover:bg-red-700 text-white rounded text-[10px] font-extrabold cursor-pointer ml-auto bg-rose-650"
                >
                  Delete
                </button>
              </div>
            )}
          </form>
        </div>
      ) : (
        <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 text-center text-slate-400 italic text-[11px]">
          Select a course in the registry to manage its outline and detailed properties.
        </div>
      )}

    </div>
  );
}
