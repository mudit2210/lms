import React, { useState } from 'react';

export default function CourseTreeBuilder({
  coursesData,
  setCoursesData,
  selectedCourseId,
  setSelectedCourseId,
  selectedLessonId,
  setSelectedLessonId,
  selectedTopicId,
  setSelectedTopicId,
  editingTopicContent,
  setEditingTopicContent,
  activeRole,
  handleAddCourse,
  handleAddLesson,
  handleAddTopic,
  handleSaveTopicContent,
  handleOrderSequence
}) {
  const canEdit = ['admin', 'coordinator', 'trainer'].includes(activeRole);

  const activeCourse = coursesData.find(c => c.id === selectedCourseId);
  const activeLesson = activeCourse?.lessons.find(l => l.id === selectedLessonId);
  const activeTopic = activeLesson?.topics.find(t => t.id === selectedTopicId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn text-xs font-semibold text-slate-700 select-none">
      
      {/* 1. Left Course Hierarchy Sidebar Node Panel */}
      <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
        
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Courses Outline Tree</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Syllabus Sequence Node Map</span>
          </div>
          {canEdit && (
            <button 
              onClick={handleAddCourse}
              className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-extrabold text-[10px]"
            >
              + Course
            </button>
          )}
        </div>

        {/* Courses listing */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {coursesData.map(course => {
            const isSelectedCourse = course.id === selectedCourseId;
            return (
              <div key={course.id} className="space-y-2 border-b border-gray-100 pb-3 last:border-b-0">
                
                {/* Course Main Node Head */}
                <div 
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setSelectedLessonId('');
                    setSelectedTopicId('');
                  }}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${isSelectedCourse ? 'bg-blue-50 text-blue-800' : 'hover:bg-slate-50'}`}
                >
                  <div className="space-y-0.5">
                    <p className="font-extrabold">{course.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{course.lessons.length} Lessons • {course.code}</p>
                  </div>
                  {isSelectedCourse && <span className="text-blue-800 font-extrabold text-sm">▶</span>}
                </div>

                {/* Lessons mapping (Rendered only when active) */}
                {isSelectedCourse && (
                  <div className="pl-4 border-l-2 border-blue-200/50 space-y-2.5 mt-2 ml-2">
                    
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-slate-400 font-extrabold uppercase">Lessons Node Block</span>
                      {canEdit && (
                        <button 
                          onClick={() => handleAddLesson(course.id)}
                          className="text-blue-600 hover:underline"
                        >
                          + Add Lesson
                        </button>
                      )}
                    </div>

                    {course.lessons.map(lesson => {
                      const isSelectedLesson = lesson.id === selectedLessonId;
                      return (
                        <div key={lesson.id} className="space-y-1.5 bg-slate-50/50 p-2 rounded border border-gray-150">
                          
                          {/* Lesson Head and Sequencing controls */}
                          <div 
                            onClick={() => {
                              setSelectedLessonId(lesson.id);
                              setSelectedTopicId('');
                            }}
                            className={`flex justify-between items-center cursor-pointer p-1 rounded hover:bg-slate-100 ${isSelectedLesson ? 'bg-slate-100 text-slate-800' : ''}`}
                          >
                            <span className="font-extrabold text-slate-800">{lesson.title}</span>
                            
                            {/* Sequence arrows */}
                            {canEdit && (
                              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                <button 
                                  onClick={() => handleOrderSequence(course.id, lesson.id, null, 'up')}
                                  className="text-slate-400 hover:text-slate-700 p-0.5 font-bold"
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                                <button 
                                  onClick={() => handleOrderSequence(course.id, lesson.id, null, 'down')}
                                  className="text-slate-400 hover:text-slate-700 p-0.5 font-bold"
                                  title="Move Down"
                                >
                                  ▼
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Topics Node Block mapping */}
                          {isSelectedLesson && (
                            <div className="pl-3 border-l border-emerald-300 space-y-1 mt-1 ml-1">
                              
                              <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase mb-1">
                                <span>Topic Pages</span>
                                {canEdit && (
                                  <button 
                                    onClick={() => handleAddTopic(course.id, lesson.id)}
                                    className="text-emerald-700 hover:underline"
                                  >
                                    + Topic
                                  </button>
                                )}
                              </div>

                              {lesson.topics.map(topic => {
                                const isSelectedTopic = topic.id === selectedTopicId;
                                return (
                                  <div 
                                    key={topic.id}
                                    onClick={() => {
                                      setSelectedTopicId(topic.id);
                                      setEditingTopicContent(topic.content);
                                    }}
                                    className={`flex justify-between items-center p-1 rounded text-[11px] cursor-pointer hover:bg-slate-200 ${isSelectedTopic ? 'bg-emerald-50 text-emerald-800 border-l-2 border-emerald-500' : ''}`}
                                  >
                                    <span className="font-semibold truncate max-w-[130px]">{topic.title}</span>
                                    
                                    {/* Topic sequence controls */}
                                    {canEdit && (
                                      <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                                        <button 
                                          onClick={() => handleOrderSequence(course.id, lesson.id, topic.id, 'up')}
                                          className="text-slate-400 hover:text-slate-700 text-[8px]"
                                        >
                                          ▲
                                        </button>
                                        <button 
                                          onClick={() => handleOrderSequence(course.id, lesson.id, topic.id, 'down')}
                                          className="text-slate-400 hover:text-slate-700 text-[8px]"
                                        >
                                          ▼
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                            </div>
                          )}

                        </div>
                      );
                    })}

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

      {/* 2. Right Canvas: Content Editor Widget */}
      <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs flex flex-col min-h-[460px]">
        
        {activeTopic ? (
          <div className="flex-grow flex flex-col space-y-4">
            
            {/* Header info bar */}
            <div className="flex justify-between items-center border-b pb-3.5">
              <div className="space-y-0.5">
                <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-extrabold uppercase">
                  Active Page editor canvas
                </span>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800 leading-snug">{activeTopic.title}</h4>
                <p className="text-[10px] text-slate-400 font-medium">
                  Course: {activeCourse.title} • Lesson: {activeLesson.title}
                </p>
              </div>

              {canEdit && (
                <button 
                  onClick={() => handleSaveTopicContent(activeCourse.id, activeLesson.id, activeTopic.id)}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-extrabold shadow-sm cursor-pointer"
                >
                  Save Changes (✓)
                </button>
              )}
            </div>

            {/* Rich Editor Simulated Workspace canvas */}
            <div className="flex-grow flex flex-col border border-gray-250 rounded-xl overflow-hidden shadow-inner bg-slate-50/50">
              
              {/* WYSIWYG Mock Buttons Panel */}
              <div className="bg-slate-50 border-b border-gray-250 p-2 flex flex-wrap gap-1">
                {['Bold', 'Italic', 'Underline', 'Heading 1', 'Heading 2', 'Bullet List', 'Insert Code Block', 'GovStandard Layout'].map(btn => (
                  <button
                    key={btn}
                    type="button"
                    onClick={() => {
                      if (!canEdit) return;
                      // Prepend tag markup text in simulated text panel
                      let snippet = '';
                      if (btn === 'Bold') snippet = ' **bold text** ';
                      if (btn === 'Italic') snippet = ' *italic text* ';
                      if (btn === 'Heading 1') snippet = '\n# HEADING 1\n';
                      if (btn === 'Insert Code Block') snippet = '\n```python\n# insert python statistics algorithm\n```\n';
                      if (btn === 'GovStandard Layout') snippet = '\n> [!NOTE]\n> Standard operational compliance mandate under GFR Clause 15.\n';
                      
                      if (snippet) {
                        setEditingTopicContent(prev => prev + snippet);
                      } else {
                        alert(`Simulating formatting tool: [${btn}]`);
                      }
                    }}
                    className="px-2.5 py-1 text-[10px] font-extrabold border bg-white rounded text-slate-650 hover:bg-slate-50 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
                    disabled={!canEdit}
                  >
                    {btn}
                  </button>
                ))}
              </div>

              {/* Text Area */}
              <textarea
                value={editingTopicContent}
                onChange={e => canEdit && setEditingTopicContent(e.target.value)}
                disabled={!canEdit}
                placeholder="Enter markdown syllabus or long-form documents guidelines..."
                className="w-full flex-grow p-4 bg-white text-xs font-mono text-slate-800 focus:outline-none resize-none leading-relaxed min-h-[220px]"
              />

            </div>

            {/* Simulated Live preview below */}
            <div className="bg-slate-50 p-4 border rounded-xl space-y-2">
              <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider border-b pb-1">
                Syllabus Page Preview
              </p>
              <div className="text-[11px] text-slate-700 leading-relaxed font-sans prose whitespace-pre-line">
                {editingTopicContent || <span className="text-slate-400 italic">No syllabus content authored yet. Use the editor workspace canvas above.</span>}
              </div>
            </div>

          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8 text-xs font-semibold text-slate-400 space-y-3">
            <div className="w-12 h-12 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-2xl font-bold">
              👁
            </div>
            <h4 className="font-extrabold text-slate-600 text-sm">Course Editor Workspace</h4>
            <p className="max-w-xs leading-relaxed">
              Select a Course from the outlines hierarchy sidebar, expand a Lesson, and click on an active Topic Page to open the Rich Editor workspace.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
