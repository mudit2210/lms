import React, { useState } from 'react';

export default function VersionControl({
  activeFile,
  activeRole,
  onAddVersion,
  logAuditAction
}) {
  const [remarks, setRemarks] = useState('');
  const [fileSize, setFileSize] = useState('3.8 MB');
  const [contentSnippet, setContentSnippet] = useState('');

  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  if (!activeFile) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-150 text-slate-450 italic text-center text-xs">
        Select a drive file in the explorer to view its version records
      </div>
    );
  }

  const handleSubmitRevision = (e) => {
    e.preventDefault();
    if (!remarks || !contentSnippet) {
      alert("Please fill in the remarks and content snippet fields.");
      return;
    }

    const currentVer = parseFloat(activeFile.version.replace('v', ''));
    const nextVer = 'v' + (currentVer + 0.1).toFixed(1);

    const newRev = {
      version: (currentVer + 0.1).toFixed(1),
      date: new Date().toISOString().substring(0, 10),
      updatedBy: activeRole + ' Simulator',
      remarks: remarks,
      size: fileSize,
      contentSnippet: contentSnippet
    };

    onAddVersion(activeFile.id, nextVer, newRev);
    logAuditAction('Draft Version revision', `Added revision draft ${nextVer} to file ${activeFile.name}`);
    
    setRemarks('');
    setContentSnippet('');
    alert(`Successfully compiled draft version ${nextVer} and pushed into review quarantine!`);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-5 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Repository Version Control</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active revisions history log</span>
      </div>

      <div className="space-y-4">
        {/* Active version tags */}
        <div className="flex justify-between items-center p-3.5 bg-slate-50 border rounded-xl">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">Latest Released Version</span>
            <p className="text-sm font-black text-[#08493d]">{activeFile.version}</p>
          </div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase">
            {activeFile.status} status
          </span>
        </div>

        {/* Revisions historical log */}
        <div className="space-y-2">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Historical Logs</h4>
          <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
            {activeFile.versions.map((ver, idx) => (
              <div key={idx} className="py-2.5 space-y-1">
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="font-extrabold text-blue-700">Revision v{ver.version}</span>
                  <span className="text-slate-400 font-normal">{ver.date} • {ver.size}</span>
                </div>
                <p className="text-slate-650 font-medium">{ver.remarks}</p>
                <p className="text-[9.5px] text-slate-400 font-normal">Updated by: {ver.updatedBy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form to submit a new version draft */}
        {canEdit && (
          <form onSubmit={handleSubmitRevision} className="border-t pt-4 space-y-3">
            <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Submit Revision Draft</h4>
            
            <div className="space-y-1">
              <label className="text-[9.5px] text-slate-400 font-bold uppercase">Revision Remarks / Log:</label>
              <input 
                type="text"
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                placeholder="e.g. Added section 4 sustainable parameters..."
                className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-semibold text-slate-800 placeholder-gray-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9.5px] text-slate-400 font-bold uppercase">New Revision Snippet Content:</label>
              <textarea 
                value={contentSnippet}
                onChange={e => setContentSnippet(e.target.value)}
                placeholder="Paste revision content here for diff comparer..."
                className="w-full h-20 border border-gray-300 rounded-lg p-2.5 font-mono text-slate-800 placeholder-gray-400"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-2xs cursor-pointer transition-colors"
            >
              Push Revision to Review
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
