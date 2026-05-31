import React from 'react';

export default function CentralRepository({
  repoFiles,
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  activeRole,
  setSelectedFile,
  setShowCompareModal,
  setShowMetadataDrawer,
  handleQuarantineAction,
  setShowUploadModal,
  onDownload
}) {
  const canUpload = ['admin', 'coordinator', 'director', 'trainer'].includes(activeRole);
  const canModerate = ['admin', 'director'].includes(activeRole);

  const filteredFiles = repoFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const driveUsagePercent = 38.6; // Mock metric value

  return (
    <div className="space-y-6 animate-fadeIn text-xs font-semibold text-slate-700 select-none">
      
      {/* Search and Filters Hub */}
      <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Drive Storage Capacity Gauge */}
        <div className="w-full md:w-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
            ☁
          </div>
          <div>
            <h4 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">LMS Cloud Drive Quota</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${driveUsagePercent}%` }} />
              </div>
              <span className="font-extrabold text-[10px]">{driveUsagePercent}% ({386} MB of 1 GB used)</span>
            </div>
          </div>
        </div>

        {/* Filters and Upload wizard triggers */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 border border-gray-300 rounded-lg bg-slate-50 px-2.5 py-1">
            <label className="text-[10px] text-slate-400 font-extrabold uppercase">Format Filter:</label>
            <select 
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="bg-transparent text-slate-700 outline-none font-bold"
            >
              <option value="all">All Formats</option>
              <option value="pdf">Adobe PDF Documents</option>
              <option value="docx">Microsoft Word Sheets</option>
              <option value="xlsx">Excel Spreadsheet Matrices</option>
              <option value="mp4">Video MP4 Streams</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search drive assets by tags or titles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 w-full md:w-48 placeholder-gray-400 bg-white"
          />

          {canUpload && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-extrabold shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-sm">+</span> Add Learning Asset
            </button>
          )}
        </div>

      </div>

      {/* Main drive explorer list grid */}
      <div className="bg-white rounded-2xl border border-gray-150 shadow-2xs overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-150 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="p-4 pl-6">Document Information & Status</th>
              <th className="p-4">Tags Taxonomy</th>
              <th className="p-4">Last Version</th>
              <th className="p-4">Owner Credit</th>
              <th className="p-4 text-center">Governance Status</th>
              <th className="p-4 pr-6 text-right">Integrity Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {filteredFiles.map(file => {
              const isQuarantine = file.status === 'Quarantine';
              return (
                <tr key={file.id} className={`hover:bg-slate-50/50 ${isQuarantine ? 'bg-amber-50/30' : ''}`}>
                  
                  {/* File Metadata Name */}
                  <td className="p-4 pl-6 space-y-1 max-w-[280px]">
                    <div className="flex items-center gap-2">
                      {/* Formats Icons skins */}
                      {file.type === 'pdf' && <span className="text-rose-600 text-sm">📕</span>}
                      {file.type === 'docx' && <span className="text-blue-650 text-sm">📘</span>}
                      {file.type === 'xlsx' && <span className="text-emerald-700 text-sm">📗</span>}
                      {file.type === 'mp4' && <span className="text-purple-650 text-sm">🎬</span>}
                      
                      <button 
                        onClick={() => !isQuarantine && setSelectedFile(file)}
                        className={`text-slate-800 font-extrabold hover:underline text-left leading-snug cursor-pointer ${isQuarantine ? 'opacity-50 pointer-events-none' : ''}`}
                      >
                        {file.name}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 font-normal leading-relaxed">{file.description}</p>
                  </td>

                  {/* Taxonomy tags */}
                  <td className="p-4">
                    <div className="flex flex-wrap items-center gap-1 max-w-[180px]">
                      {file.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded text-[9px] font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Version tag */}
                  <td className="p-4">
                    <button 
                      onClick={() => !isQuarantine && setShowCompareModal(file)}
                      className={`text-[#08493d] font-bold hover:underline cursor-pointer ${isQuarantine ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      v{file.version} (Logs)
                    </button>
                  </td>

                  {/* Author credit */}
                  <td className="p-4">
                    <p className="text-slate-850 font-bold">{file.createdBy}</p>
                    <p className="text-[9.5px] text-slate-400 font-normal">{file.metadata.creationDate}</p>
                  </td>

                  {/* Status column */}
                  <td className="p-4 text-center">
                    {isQuarantine ? (
                      <span className="text-[8.5px] bg-amber-50 text-amber-700 border border-amber-250 px-2 py-0.5 rounded font-extrabold uppercase animate-pulse">
                        ⚠️ In Threat Quarantine
                      </span>
                    ) : (
                      <span className="text-[8.5px] bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded font-extrabold uppercase">
                        ✓ Active Released
                      </span>
                    )}
                  </td>

                  {/* Operations actions buttons */}
                  <td className="p-4 pr-6 text-right space-x-2">
                    {isQuarantine ? (
                      canModerate ? (
                        <>
                          <button 
                            onClick={() => handleQuarantineAction(file.id, 'approve')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-extrabold text-[10px] cursor-pointer"
                          >
                            Release File
                          </button>
                          <button 
                            onClick={() => handleQuarantineAction(file.id, 'delete')}
                            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-extrabold text-[10px] cursor-pointer"
                          >
                            Delete File
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] font-medium text-slate-400 italic">Under review...</span>
                      )
                    ) : (
                      <>
                        <button 
                          onClick={() => setSelectedFile(file)}
                          className="text-blue-750 font-extrabold hover:underline hover:text-blue-800 cursor-pointer"
                        >
                          Read Panel
                        </button>
                        <span className="text-slate-300">|</span>
                        <button 
                          onClick={() => setShowMetadataDrawer(file)}
                          className="text-slate-500 font-extrabold hover:underline cursor-pointer"
                        >
                          Taxonomy Drawer
                        </button>
                        <span className="text-slate-300">|</span>
                        <button 
                          onClick={() => onDownload(file)}
                          className="text-emerald-700 font-extrabold hover:underline cursor-pointer"
                        >
                          Download (↓)
                        </button>
                      </>
                    )}
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
