import React, { useState } from 'react';

export default function MetadataTagging({
  activeFile,
  activeRole,
  onUpdateMetadata,
  logAuditAction
}) {
  const [newTag, setNewTag] = useState('');
  
  // Local form states mapped dynamically
  const [title, setTitle] = useState(activeFile?.name || '');
  const [description, setDescription] = useState(activeFile?.description || '');
  const [author, setAuthor] = useState(activeFile?.metadata?.author || '');
  const [publisher, setPublisher] = useState(activeFile?.metadata?.publisher || '');
  const [difficulty, setDifficulty] = useState(activeFile?.metadata?.difficulty || 'Medium');
  const [duration, setDuration] = useState(activeFile?.metadata?.duration || '1.5 hours');
  const [learningObjective, setLearningObjective] = useState(activeFile?.metadata?.learningObjective || '');
  const [department, setDepartment] = useState(activeFile?.metadata?.department || '');
  const [division, setDivision] = useState(activeFile?.metadata?.division || '');
  const [program, setProgram] = useState(activeFile?.metadata?.program || '');
  const [category, setCategory] = useState(activeFile?.metadata?.category || '');
  const [language, setLanguage] = useState(activeFile?.metadata?.language || 'English');

  const canEdit = ['Super Admin', 'Content Manager'].includes(activeRole);

  // Sync state if activeFile shifts
  React.useEffect(() => {
    if (activeFile) {
      setTitle(activeFile.name || '');
      setDescription(activeFile.description || '');
      setAuthor(activeFile.metadata?.author || '');
      setPublisher(activeFile.metadata?.publisher || '');
      setDifficulty(activeFile.metadata?.difficulty || 'Medium');
      setDuration(activeFile.metadata?.duration || '1.5 hours');
      setLearningObjective(activeFile.metadata?.learningObjective || '');
      setDepartment(activeFile.metadata?.department || '');
      setDivision(activeFile.metadata?.division || '');
      setProgram(activeFile.metadata?.program || '');
      setCategory(activeFile.metadata?.category || '');
      setLanguage(activeFile.metadata?.language || 'English');
    }
  }, [activeFile]);

  if (!activeFile) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-150 text-slate-450 italic text-center text-xs shadow-2xs font-semibold">
        Select a drive file in the explorer to view/modify its metadata
      </div>
    );
  }

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    
    const updatedTags = [...activeFile.tags, newTag.trim()];
    onUpdateMetadata(activeFile.id, { tags: updatedTags });
    logAuditAction('Add File Tag', `Added tag #${newTag.trim()} to file ${activeFile.name}`);
    setNewTag('');
  };

  const handleRemoveTag = (tagToRemove) => {
    if (!canEdit) return;
    const updatedTags = activeFile.tags.filter(t => t !== tagToRemove);
    onUpdateMetadata(activeFile.id, { tags: updatedTags });
    logAuditAction('Remove File Tag', `Removed tag #${tagToRemove} from file ${activeFile.name}`);
  };

  const handleSaveAllMetadata = (e) => {
    e.preventDefault();
    const updatedFileFields = {
      name: title,
      description: description,
      metadata: {
        ...activeFile.metadata,
        author,
        publisher,
        difficulty,
        duration,
        learningObjective,
        department,
        division,
        program,
        category,
        language,
        lastModifiedDate: new Date().toISOString().substring(0, 10)
      }
    };
    onUpdateMetadata(activeFile.id, updatedFileFields);
    logAuditAction('Update Metadata Registry', `Updated MoSPI meta schema categories for: ${title}`);
    alert("KMS file metadata schema saved successfully!");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none max-h-[85vh] overflow-y-auto">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">MoSPI Section 3.1.3 Taxonomy Classification</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dynamic tags & metadata scheme</span>
      </div>

      {/* Tag editor */}
      <div className="space-y-2">
        <h4 className="text-[10.5px] text-slate-400 font-extrabold uppercase tracking-wider border-b pb-1">Tagging System</h4>
        <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border rounded-xl min-h-12 items-center">
          {activeFile.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-0.5 bg-white border border-gray-250 text-slate-650 rounded text-[9.5px] font-extrabold flex items-center gap-1 hover:border-red-200 hover:text-red-650 transition-colors"
              onClick={() => handleRemoveTag(tag)}
              style={{ cursor: canEdit ? 'pointer' : 'default' }}
              title={canEdit ? 'Click to Remove Tag' : ''}
            >
              #{tag} {canEdit && <span className="text-[8px] font-normal font-sans text-slate-400">×</span>}
            </span>
          ))}
        </div>
        {canEdit && (
          <form onSubmit={handleAddTag} className="flex gap-2">
            <input 
              type="text"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              placeholder="Add tag (e.g. Leadership, Finance, HR...)"
              className="flex-grow border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-semibold text-slate-800 placeholder-gray-400"
            />
            <button 
              type="submit"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-750 text-white rounded font-extrabold text-[10.5px] cursor-pointer"
            >
              + Tag
            </button>
          </form>
        )}
      </div>

      {/* Main Metadata Forms split in collapsibles */}
      <form onSubmit={handleSaveAllMetadata} className="space-y-4 pt-2">
        
        {/* 1. Basic Metadata */}
        <div className="space-y-2.5 p-3 bg-slate-50 rounded-xl border border-gray-200">
          <h4 className="text-[10px] text-[#08493d] font-black uppercase tracking-wider">A. Basic Metadata</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Author:</label>
              <input 
                type="text" 
                value={author} 
                onChange={e => setAuthor(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Publisher:</label>
              <input 
                type="text" 
                value={publisher} 
                onChange={e => setPublisher(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Language:</label>
              <input 
                type="text" 
                value={language} 
                onChange={e => setLanguage(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Description:</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                readOnly={!canEdit}
                className="w-full h-12 border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
          </div>
        </div>

        {/* 2. Learning Metadata */}
        <div className="space-y-2.5 p-3 bg-slate-50 rounded-xl border border-gray-200">
          <h4 className="text-[10px] text-[#08493d] font-black uppercase tracking-wider">B. Learning Metadata</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Difficulty Level:</label>
              <select 
                value={difficulty} 
                onChange={e => setDifficulty(e.target.value)} 
                disabled={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white font-bold"
              >
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Duration:</label>
              <input 
                type="text" 
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Learning Objective:</label>
              <input 
                type="text" 
                value={learningObjective} 
                onChange={e => setLearningObjective(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
          </div>
        </div>

        {/* 3. Business Metadata */}
        <div className="space-y-2.5 p-3 bg-slate-50 rounded-xl border border-gray-200">
          <h4 className="text-[10px] text-[#08493d] font-black uppercase tracking-wider">C. Business Metadata</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Department:</label>
              <input 
                type="text" 
                value={department} 
                onChange={e => setDepartment(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Division:</label>
              <input 
                type="text" 
                value={division} 
                onChange={e => setDivision(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Program:</label>
              <input 
                type="text" 
                value={program} 
                onChange={e => setProgram(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Category:</label>
              <input 
                type="text" 
                value={category} 
                onChange={e => setCategory(e.target.value)} 
                readOnly={!canEdit}
                className="w-full border border-gray-300 rounded px-2 py-1 bg-white"
              />
            </div>
          </div>
        </div>

        {canEdit && (
          <button 
            type="submit"
            className="w-full py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-xs cursor-pointer transition-colors uppercase tracking-wider text-[10px]"
          >
            Save All Classifications Schema
          </button>
        )}

      </form>
    </div>
  );
}
