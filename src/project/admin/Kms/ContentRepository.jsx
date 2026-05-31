import React from 'react';

export default function ContentRepository({
  repoFiles,
  searchQuery,
  filterType,
  activeRole,
  setSelectedFile,
  setShowCompareModal,
  setShowMetadataDrawer,
  handleQuarantineAction,
  setShowUploadModal,
  onDownload
}) {
  const driveUsagePercent = 38.6;

  const filteredFiles = repoFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const canUpload = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  return (
    <div className="space-y-6 animate-fadeIn text-xs font-semibold text-slate-700 select-none text-left">
      
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
          {canUpload && (
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white rounded-lg font-extrabold shadow-xs flex items-center gap-1.5 cursor-pointer"
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
            {filteredFiles.map(file => (
              <tr key={file.id} className="hover:bg-slate-50/50 transition-colors">
                
                {/* File Name & Desc */}
                <td className="p-4 pl-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {file.type === 'pdf' ? '📕' : file.type === 'docx' ? '📘' : file.type === 'mp4' ? '🎬' : '📙'}
                    </span>
                    <p className="font-extrabold text-slate-800">{file.name}</p>
                  </div>
                  <p className="text-[10px] text-slate-450 font-normal pl-6">{file.description}</p>
                </td>

                {/* Tags */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {file.tags.map(tag => (
                      <span key={tag} className="px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded text-[9px] font-bold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Version Log compare */}
                <td className="p-4">
                  <button 
                    onClick={() => { setSelectedFile(file); setShowCompareModal(true); }}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-bold transition-all text-left"
                  >
                    {file.version} (Logs)
                  </button>
                </td>

                {/* Owner */}
                <td className="p-4 space-y-0.5">
                  <p className="font-bold text-slate-800">{file.createdBy}</p>
                  <p className="text-[9.5px] text-slate-400 font-normal">{file.metadata.creationDate}</p>
                </td>

                {/* Status indicator */}
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase border ${
                    file.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 
                    file.status === 'Quarantine' ? 'bg-amber-50 text-amber-700 border-amber-250' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    ✓ {file.status === 'Active' ? 'Active Released' : 'In Threat Quarantine'}
                  </span>
                </td>

                {/* Action button triggers */}
                <td className="p-4 pr-6 text-right space-x-2">
                  <button 
                    onClick={() => setSelectedFile(file)}
                    className="text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                  >
                    Read Panel
                  </button>
                  <span className="text-slate-300">|</span>
                  <button 
                    onClick={() => { setSelectedFile(file); setShowMetadataDrawer(true); }}
                    className="text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
                  >
                    Taxonomy Drawer
                  </button>
                  <span className="text-slate-300">|</span>
                  <button 
                    onClick={() => onDownload(file)}
                    className="text-emerald-700 hover:text-emerald-950 font-extrabold hover:underline cursor-pointer"
                  >
                    Download (↓)
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
