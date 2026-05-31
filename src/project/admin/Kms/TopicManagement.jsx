import React, { useState, useEffect } from 'react';

export default function TopicManagement({
  activeLesson,
  selectedTopicId,
  setSelectedTopicId,
  activeRole,
  handleAddTopic,
  handleOrderSequence,
  onUpdateTopic,
  onDeleteTopic,
  onDuplicateTopic,
  courseId,
  lessonId
}) {
  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);
  
  if (!activeLesson) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-150 text-slate-400 italic text-center text-xs">
        Select a Lesson to manage its nested topics
      </div>
    );
  }

  const selectedTopic = activeLesson.topics.find(t => t.id === selectedTopicId);

  // local fields states
  const [topicTitle, setTopicTitle] = useState('');
  const [description, setDescription] = useState('');
  const [learningObjectives, setLearningObjectives] = useState('');

  useEffect(() => {
    if (selectedTopic) {
      setTopicTitle(selectedTopic.title || '');
      setDescription(selectedTopic.description || 'Topic outlining primary syllabus content.');
      setLearningObjectives(selectedTopic.learningObjectives || 'Analyze, trace, and record regional variables.');
    }
  }, [selectedTopicId, activeLesson]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!selectedTopic) return;
    onUpdateTopic(courseId, lessonId, selectedTopic.id, {
      title: topicTitle,
      description,
      learningObjectives
    });
    alert("Topic details saved successfully!");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none">
      
      <div className="border-b pb-3 flex justify-between items-center">
        <div>
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Topics inside Lesson</h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeLesson.title} syllabus map</span>
        </div>
        {canEdit && (
          <button 
            onClick={handleAddTopic}
            className="px-3 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white rounded text-[10.5px] font-extrabold shadow-2xs cursor-pointer transition-colors"
          >
            + Add Topic
          </button>
        )}
      </div>

      {/* Topic list */}
      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
        {activeLesson.topics.map((topic, idx) => {
          const isSelected = selectedTopicId === topic.id;
          return (
            <div 
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                isSelected 
                  ? 'bg-blue-50/50 border-blue-450 shadow-3xs' 
                  : 'hover:bg-slate-50 bg-slate-50/10 border-gray-200'
              }`}
            >
              <div className="space-y-1 max-w-[70%]">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-600">📑</span>
                  <h4 className="font-extrabold text-slate-800 text-[11px] truncate max-w-[150px]">{topic.title}</h4>
                </div>
                <div className="flex gap-2 items-center text-[9px] font-bold text-slate-400 uppercase">
                  <span>{topic.id}</span>
                  <span>•</span>
                  <span>Seq: {idx + 1}</span>
                </div>
              </div>

              {canEdit && (
                <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                  <button 
                    disabled={idx === 0}
                    onClick={() => handleOrderSequence('topics', idx, idx - 1)}
                    className="p-1 hover:bg-white border border-transparent hover:border-gray-250 rounded disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    ▲
                  </button>
                  <button 
                    disabled={idx === activeLesson.topics.length - 1}
                    onClick={() => handleOrderSequence('topics', idx, idx + 1)}
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

      {/* Selected Topic parameters detail card */}
      {selectedTopic ? (
        <div className="border-t pt-3.5 space-y-3">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Topic Parameters</h4>
          
          <form onSubmit={handleSave} className="space-y-3">
            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Topic Title:</label>
                <input 
                  type="text" 
                  value={topicTitle}
                  onChange={e => setTopicTitle(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Sequence Number:</label>
                <input 
                  type="text" 
                  value={activeLesson.topics.findIndex(t => t.id === selectedTopic.id) + 1}
                  readOnly
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-slate-50 font-bold text-slate-450"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-slate-455 uppercase font-extrabold">Learning Objectives:</label>
                <input 
                  type="text" 
                  value={learningObjectives}
                  onChange={e => setLearningObjectives(e.target.value)}
                  readOnly={!canEdit}
                  className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-semibold text-slate-800"
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
                  onClick={() => onDuplicateTopic(courseId, lessonId, selectedTopic.id)}
                  className="px-2.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded text-[10px] font-extrabold cursor-pointer"
                >
                  Duplicate
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this topic?")) {
                      onDeleteTopic(courseId, lessonId, selectedTopic.id);
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
          Select a topic to manage its nested leaf properties.
        </div>
      )}

    </div>
  );
}
