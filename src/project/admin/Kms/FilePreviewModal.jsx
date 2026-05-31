import React from 'react';

export default function FilePreviewModal({ selectedFile, onClose, onDownload }) {
  if (!selectedFile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#0b352e] text-white p-4 sm:p-5 flex justify-between items-center shrink-0">
          <div className="space-y-0.5">
            <span className="text-[9px] bg-yellow-400 text-[#0b352e] px-1.5 py-0.2 rounded font-extrabold uppercase">
              Preview Widget ({selectedFile.type.toUpperCase()})
            </span>
            <h3 className="font-extrabold text-sm sm:text-base tracking-wide leading-snug">{selectedFile.name}</h3>
          </div>
          
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white focus:outline-none"
            aria-label="Close Preview"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Custom Interactive Preview Skin Container */}
        <div className="p-6 bg-slate-100 flex-grow overflow-y-auto min-h-[300px]">
          
          {selectedFile.type === 'pdf' && (
            <div className="bg-white border rounded-xl shadow p-5 space-y-4 max-w-2xl mx-auto text-xs font-semibold text-slate-700">
              <div className="flex justify-between items-center border-b border-gray-155 pb-2">
                <span className="text-slate-400 font-bold">PDF Reader Screen (v{selectedFile.version})</span>
                <div className="flex items-center gap-1.5">
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => alert('PDF Zoom In simulated')}>Zoom +</button>
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => alert('PDF Zoom Out simulated')}>Zoom -</button>
                </div>
              </div>
              
              {/* Mock content rendering */}
              <div className="space-y-3 leading-relaxed max-h-[200px] overflow-y-auto pr-1">
                <p className="font-extrabold text-slate-900 text-sm">CHAPTER 1: CONSTITUTION AND SCOPE GUIDELINES</p>
                <p>This handbook outlines the standard rules under GFR regulations, district target tracking systems, and spatial agricultural databases.</p>
                <p>Section 1.1: Official statistics schedules must detail the source, verified date, aggregation methods, and administrative supervisor signature.</p>
                <p>All regional centers must log entries on central database nodes before 18:00 daily.</p>
              </div>
              
              <div className="text-center pt-2 border-t border-gray-100 text-slate-400 flex justify-between items-center">
                <span>Page 1 of 12</span>
                <div className="flex gap-1.5">
                  <button className="px-3 py-1 bg-slate-50 border rounded font-bold disabled:opacity-40" disabled>Previous</button>
                  <button className="px-3 py-1 bg-slate-50 border rounded font-bold" onClick={() => alert('PDF Next Page simulated')}>Next</button>
                </div>
              </div>
            </div>
          )}

          {selectedFile.type === 'docx' && (
            <div className="bg-white border rounded-xl shadow p-6 max-w-2xl mx-auto space-y-3 text-xs text-slate-700 leading-relaxed font-semibold">
              <div className="text-center pb-2 border-b border-gray-100">
                <h3 className="font-extrabold text-slate-900 text-sm">{selectedFile.name}</h3>
                <p className="text-[10px] text-slate-400">Microsoft Word Sheet v{selectedFile.version}</p>
              </div>
              <div 
                className="prose leading-relaxed space-y-2.5 max-h-[220px] overflow-y-auto pr-1"
                dangerouslySetInnerHTML={{ __html: selectedFile.versions[0]?.contentSnippet || 'No content snippet available.' }}
              />
            </div>
          )}

          {selectedFile.type === 'xlsx' && (
            <div className="bg-white border rounded-xl shadow p-4 space-y-3 max-w-2xl mx-auto text-xs font-semibold text-slate-700 overflow-x-auto">
              <p className="text-slate-400 font-bold border-b pb-2">Excel Spreadsheet Matrix: Q1 Response Rates</p>
              <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-gray-200 uppercase">
                    <th className="p-2">District Unit</th>
                    <th className="p-2">Target Schedules</th>
                    <th className="p-2">Responses Logged</th>
                    <th className="p-2">Rate %</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr>
                    <td className="p-2 font-bold text-slate-800">Delhi North Center</td>
                    <td className="p-2 font-mono">500</td>
                    <td className="p-2 font-mono">480</td>
                    <td className="p-2 font-mono text-emerald-800">96.0%</td>
                    <td className="p-2"><span className="text-[8px] bg-emerald-50 text-emerald-800 px-1 py-0.2 rounded font-bold border border-emerald-250">Verified</span></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-800">Delhi South Center</td>
                    <td className="p-2 font-mono">600</td>
                    <td className="p-2 font-mono">520</td>
                    <td className="p-2 font-mono text-amber-800">86.6%</td>
                    <td className="p-2"><span className="text-[8px] bg-amber-50 text-amber-800 px-1 py-0.2 rounded font-bold border border-amber-250">Pending</span></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-800">Mumbai Central Unit</td>
                    <td className="p-2 font-mono">800</td>
                    <td className="p-2 font-mono">760</td>
                    <td className="p-2 font-mono text-emerald-800">95.0%</td>
                    <td className="p-2"><span className="text-[8px] bg-emerald-50 text-emerald-800 px-1 py-0.2 rounded font-bold border border-emerald-250">Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {selectedFile.type === 'mp4' && (
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="aspect-video w-full rounded-xl overflow-hidden border shadow bg-black relative flex items-center justify-center">
                <p className="text-white text-xs font-bold font-sans">
                  [Interactive HTML5 Video Player Canvas Mock]
                </p>
                {/* Mock Play Overlay Controls bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center text-white text-[10px] font-bold font-sans select-none">
                  <div className="flex items-center gap-3">
                    <button className="hover:text-emerald-400" onClick={() => alert('Video Play/Pause')}>▶ Play</button>
                    <span>0:00 / 2:40</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Speed: 1.0x</span>
                    <span>🔊 100%</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold italic text-center">Video lecture content: Orientation for regional ISS field probationers.</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-gray-150 flex justify-between items-center text-xs font-bold text-slate-500 shrink-0">
          <div className="space-y-0.5">
            <p>Views: {selectedFile.views} • Downloads: {selectedFile.downloads}</p>
            <p className="text-[10px] font-medium text-slate-400">Created By: {selectedFile.createdBy} on {selectedFile.metadata.creationDate}</p>
          </div>
          
          <button 
            onClick={() => onDownload(selectedFile)}
            className="px-4 py-2 bg-[#0b352e] hover:bg-[#07241f] text-white font-extrabold rounded-lg shadow-sm cursor-pointer"
          >
            Download Document
          </button>
        </div>
      </div>
    </div>
  );
}
