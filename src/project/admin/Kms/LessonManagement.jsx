import React, { useState, useEffect } from 'react';

export default function LessonManagement({
  activeCourse,
  selectedLessonId,
  setSelectedLessonId,
  activeRole,
  handleAddLesson,
  handleOrderSequence,
  onUpdateLesson,
  onDeleteLesson,
  onDuplicateLesson
}) {
  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);
  
  if (!activeCourse) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-150 text-slate-400 italic text-center text-xs">
        Select a Course to manage its nested lessons
      </div>
    );
  }

  const selectedLesson = activeCourse.lessons.find(l => l.id === selectedLessonId);

  // local fields states
  const [lessonTitle, setLessonTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('2 hours');

  useEffect(() => {
    if (selectedLesson) {
      setLessonTitle(selectedLesson.title || '');
      setDescription(selectedLesson.description || 'Lesson outlining detailed concepts.');
      setDuration(selectedLesson.duration || '2 hours');
    }
  }, [selectedLessonId, activeCourse]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedLesson) return;
    onUpdateLesson(activeCourse.id, selectedLesson.id, {
      title: lessonTitle,
      description,
      duration
    });
    alert("Lesson outline updated successfully!");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none">
      
      <div className="border-b pb-3 flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Lessons inside Course</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeCourse.title} outline</span>
        </div>
        {canEdit && (
          <button 
            onClick={handleAddLesson}
            className="px-3 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white rounded text-[10.5px] font-extrabold shadow-2xs cursor-pointer transition-colors"
          >
            + Add Lesson
          </button>
        )}
      </div>

      {/* Lesson list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {activeCourse.lessons.map((lesson, idx) => {
          const isSelected = selectedLessonId === lesson.id;
          return (
            <div 
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                isSelected 
                  ? 'bg-blue-50/50 border-blue-450 shadow-3xs' 
                  : 'hover:bg-slate-50 bg-slate-50/10 border-gray-200'
              }`}
            >
              <div className="space-y-1 max-w-[70%]">
                <div className="flex items-center gap-1.5">
                  <span className="text-amber-600">📁</span>
                  <h4 className="font-extrabold text-slate-800 text-[11px] truncate max-w-[150px]">{lesson.title}</h4>
                </div>
                <div className="flex gap-2 items-center text-[9px] font-bold text-slate-400 uppercase">
                  <span>{lesson.id}</span>
                  <span>•</span>
                  <span>Seq: {idx + 1}</span>
                  <span>•</span>
                  <span>{lesson.topics?.length || 0} Topics</span>
                </div>
              </div>

              {canEdit && (
                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                  <button 
                    disabled={idx === 0}
                    onClick={() => handleOrderSequence('lessons', idx, idx - 1)}
                    className="p-1 hover:bg-white border border-transparent hover:border-gray-250 rounded disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button 
                    disabled={idx === activeCourse.lessons.length - 1}
                    onClick={() => handleOrderSequence('lessons', idx, idx + 1)}
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

      {/* Selected Lesson Editor Form */}
      {selectedLesson ? (
        <div className="border-t pt-3.5 space-y-3">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Lesson Parameters</h4>
          
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Lesson Title:</label>
                <input 
                  type="text" 
                  value={lessonTitle}
                  onChange={e => setLessonTitle(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Estimated Duration:</label>
                <input 
                  type="text" 
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Sequence Number:</label>
                <input 
                  type="text" 
                  value={activeCourse.lessons.findIndex(l => l.id === selectedLesson.id) + 1}
                  readOnly
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-slate-50 font-bold text-slate-450"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Description:</label>
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full h-12 border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-850"
                />
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
                  onClick={() => onDuplicateLesson(activeCourse.id, selectedLesson.id)}
                  className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-extrabold cursor-pointer"
                >
                  Duplicate
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this lesson?")) {
                      onDeleteLesson(activeCourse.id, selectedLesson.id);
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
          Select a lesson to manage its nested structure and details.
        </div>
      )}

    </div>
  );
}
