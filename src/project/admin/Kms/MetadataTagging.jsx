import React, { useState } from 'react';

export default function MetadataTagging({
  activeFile,
  activeRole,
  onUpdateMetadata,
  logAuditAction
}) {
  const [newTag, setNewTag] = useState('');
  const [securityLevel, setSecurityLevel] = useState(activeFile?.metadata.securityLevel || 'Official Confidential');
  const [complianceStandard, setComplianceStandard] = useState(activeFile?.metadata.complianceStandard || 'MoSPI-3.1.3-GTMS');

  const canEdit = ['Super Admin', 'Content Manager'].includes(activeRole);

  if (!activeFile) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-150 text-slate-450 italic text-center text-xs">
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

  const handleSaveClassification = (e) => {
    e.preventDefault();
    const updatedMeta = {
      ...activeFile.metadata,
      securityLevel,
      complianceStandard
    };
    onUpdateMetadata(activeFile.id, { metadata: updatedMeta });
    logAuditAction('Update File Metadata', `Updated security classification and compliance for ${activeFile.name}`);
    alert("Metadata saved successfully!");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-5 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Metadata & Taxonomy Classification</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeFile.name} parameters</span>
      </div>

      <div className="space-y-4">
        {/* Dynamic Tags list */}
        <div className="space-y-2">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Dynamic Tags Hierarchy</h4>
          <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 border rounded-xl min-h-12 items-center">
            {activeFile.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-0.5 bg-white border border-gray-200 text-slate-650 rounded text-[9.5px] font-extrabold flex items-center gap-1 hover:border-red-200 hover:text-red-600 transition-colors"
                onClick={() => handleRemoveTag(tag)}
                style={{ cursor: canEdit ? 'pointer' : 'default' }}
                title={canEdit ? 'Click to Remove Tag' : ''}
              >
                #{tag} {canEdit && <span className="text-[8px] font-normal font-sans text-slate-400">×</span>}
              </span>
            ))}
          </div>
          {canEdit && (
            <form onSubmit={handleAddTag} className="flex gap-2 mt-1">
              <input 
                type="text"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                placeholder="e.g. SurveySample..."
                className="flex-grow border border-gray-300 rounded-lg px-2.5 py-1 bg-white font-semibold text-slate-800 placeholder-gray-400"
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

        {/* Dynamic Metadata Class Form */}
        <form onSubmit={handleSaveClassification} className="space-y-3.5 border-t pt-4">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Security & Compliance Classification</h4>
          
          <div className="space-y-1">
            <label className="text-[9.5px] text-slate-400 font-bold uppercase">Security Classification:</label>
            <select
              value={securityLevel}
              onChange={e => setSecurityLevel(e.target.value)}
              disabled={!canEdit}
              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-bold"
            >
              <option value="Official Confidential">Official Confidential</option>
              <option value="Restricted Official Use">Restricted Official Use</option>
              <option value="Public Released Documentation">Public Released Documentation</option>
              <option value="Trainee Course Restricted">Trainee Course Restricted</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[9.5px] text-slate-400 font-bold uppercase">Government Compliance Standard:</label>
            <select
              value={complianceStandard}
              onChange={e => setComplianceStandard(e.target.value)}
              disabled={!canEdit}
              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-bold"
            >
              <option value="MoSPI-3.1.3-GTMS">MoSPI-3.1.3 Content Compliance</option>
              <option value="NSSTA-Acad-Level2">NSSTA Academic Quality Level 2</option>
              <option value="NIC-Security-V2">NIC Security Signature Verified V2</option>
            </select>
          </div>

          {canEdit && (
            <button 
              type="submit"
              className="w-full py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-2xs cursor-pointer transition-colors"
            >
              Update Classifications
            </button>
          )}
        </form>
      </div>

    </div>
  );
}
