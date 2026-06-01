import React from 'react';

export default function VersionCompareModal({ showCompareModal, onClose, onRestore, canEdit }) {
  if (!showCompareModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4 flex flex-col max-h-[85vh]">
        
        <div className="bg-[#0b352e] text-white p-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Version History Control & Split Diff</h3>
            <p className="text-[9.5px] text-emerald-400 font-medium">{showCompareModal.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Version timeline list */}
        <div className="p-5 border-b border-gray-100 bg-slate-50 max-h-[160px] overflow-y-auto shrink-0">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">Available Versions History</p>
          <table className="w-full text-left text-xs font-semibold text-slate-700">
            <thead>
              <tr className="text-slate-400 text-[10px] font-bold border-b uppercase">
                <th className="pb-1">Version</th>
                <th className="pb-1">Modified On</th>
                <th className="pb-1">Updated By</th>
                <th className="pb-1">Remarks</th>
                <th className="pb-1 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {showCompareModal.versions.map((v, idx) => (
                <tr key={v.version} className="hover:bg-slate-100/50">
                  <td className="py-2 text-[#08493d] font-bold">v{v.version}</td>
                  <td className="py-2 text-slate-400">{v.date}</td>
                  <td className="py-2">{v.updatedBy}</td>
                  <td className="py-2 text-[11px] font-medium text-slate-500 max-w-[240px] truncate">{v.remarks}</td>
                  <td className="py-2 text-right">
                    <button 
                      onClick={() => onRestore(v.version)}
                      disabled={idx === 0 || !canEdit}
                      className="text-[10px] text-blue-700 font-extrabold hover:underline disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                    >
                      Restore Version
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Split pane diff simulator */}
        <div className="p-6 overflow-y-auto flex-grow bg-slate-100 min-h-[250px]">
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 text-center">
            Side-by-Side Version Discrepancies Comparison Diff (Active v{showCompareModal.version} vs Previous v1.0)
          </p>
          
          <div className="grid grid-cols-2 gap-4 h-full font-mono text-[10.5px]">
            
            {/* Left Active Pane */}
            <div className="bg-white border p-4 rounded-xl shadow space-y-2 h-[180px] overflow-y-auto">
              <p className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider border-b pb-1">
                Active Version {showCompareModal.version} text snippet
              </p>
              <p className="leading-relaxed text-slate-700 whitespace-pre-wrap">
                {showCompareModal.versions[0]?.contentSnippet || 'No snippet available.'}
              </p>
            </div>

            {/* Right Historical Pane */}
            <div className="bg-white border p-4 rounded-xl shadow space-y-2 h-[180px] overflow-y-auto">
              <p className="text-[9px] font-extrabold text-rose-800 uppercase tracking-wider border-b pb-1">
                Historical Version 1.0 text snippet
              </p>
              <p className="leading-relaxed text-slate-700 whitespace-pre-wrap">
                {showCompareModal.versions[showCompareModal.versions.length - 1]?.contentSnippet || 'No snippet available.'}
              </p>
            </div>

          </div>
        </div>

        <div className="bg-slate-50 p-4 border-t border-gray-150 text-center shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-[#0b352e] text-white font-extrabold rounded-lg text-xs"
          >
            Close Compare Pane
          </button>
        </div>
      </div>
    </div>
  );
}
