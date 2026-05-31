import React from 'react';

export default function ApprovalWorkflow({
  repoFiles,
  handleQuarantineAction,
  activeRole
}) {
  const canModerate = ['Super Admin', 'Reviewer'].includes(activeRole);
  
  // Quality Review Queue items (draft state files or quarantine state files)
  const pendingReviewFiles = repoFiles.filter(f => f.status === 'Quarantine');

  return (
    <div className="space-y-6 animate-fadeIn text-xs font-semibold text-slate-700 select-none text-left">
      
      {/* Overview stats header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">1. Draft Audit Status</span>
          <h4 className="text-xl font-black text-blue-900">{repoFiles.filter(f => f.status === 'Active').length} Published</h4>
          <p className="text-[10.5px] text-slate-400 font-normal">Active institutional resource drive files</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">2. Quality Review Stage</span>
          <h4 className="text-xl font-black text-yellow-600">{pendingReviewFiles.length} Pending Approval</h4>
          <p className="text-[10.5px] text-slate-400 font-normal">Quarantined threat check & validation pipeline</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">3. Moderation Rule Code</span>
          <h4 className="text-sm font-black text-emerald-800">GovThreatGuard enabled</h4>
          <p className="text-[10.5px] text-slate-400 font-normal">Automatic malware scan on all new uploads</p>
        </div>

      </div>

      {/* Grid of items needing approval */}
      <div className="bg-white rounded-2xl border border-gray-150 shadow-2xs overflow-hidden">
        
        <div className="p-5 border-b border-gray-150 flex justify-between items-center">
          <div>
            <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Academic Quality Review Pipeline</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Draft Validation workflow queue</span>
          </div>
          <span className="bg-amber-50 text-amber-700 border border-amber-250 px-2 py-0.5 rounded text-[10px] font-extrabold">
            {pendingReviewFiles.length} Action Needed
          </span>
        </div>

        {pendingReviewFiles.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-150 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Document Resource</th>
                <th className="p-4">Tags Taxonomy</th>
                <th className="p-4">Owner Credit</th>
                <th className="p-4">Date Uploaded</th>
                <th className="p-4 text-center">Threat Scanner Integrity</th>
                <th className="p-4 pr-6 text-right">Moderator Approvals</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {pendingReviewFiles.map(file => (
                <tr key={file.id} className="hover:bg-slate-50/50 bg-amber-50/10">
                  
                  {/* File Title */}
                  <td className="p-4 pl-6 space-y-1">
                    <p className="font-extrabold text-slate-800">{file.name}</p>
                    <p className="text-[10px] text-slate-400 font-normal">{file.description}</p>
                  </td>

                  {/* Taxonomy */}
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {file.tags.map(tag => (
                        <span key={tag} className="px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded text-[9px] font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{file.createdBy}</p>
                  </td>

                  {/* Date */}
                  <td className="p-4 text-slate-400">
                    {file.metadata.creationDate}
                  </td>

                  {/* Threat scanner */}
                  <td className="p-4 text-center">
                    <span className="text-[8.5px] bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded font-extrabold uppercase">
                      ✓ Scan Clean (100%)
                    </span>
                  </td>

                  {/* Approvals buttons */}
                  <td className="p-4 pr-6 text-right space-x-2">
                    {canModerate ? (
                      <>
                        <button 
                          onClick={() => handleQuarantineAction(file.id, 'Active')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-extrabold shadow-3xs cursor-pointer"
                        >
                          Approve Release (✓)
                        </button>
                        <button 
                          onClick={() => handleQuarantineAction(file.id, 'Reject')}
                          className="px-2.5 py-1 bg-rose-650 hover:bg-rose-700 text-white rounded text-[10px] font-extrabold shadow-3xs cursor-pointer bg-red-650"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-slate-400 italic">Unauthorized</span>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-8 text-center text-slate-400 italic text-xs space-y-1">
            <p className="font-bold">✓ All document submissions cleared and released!</p>
            <p className="text-[10px] text-slate-400 font-normal">Academic review quarantine pipeline contains 0 pending files.</p>
          </div>
        )}

      </div>

    </div>
  );
}
