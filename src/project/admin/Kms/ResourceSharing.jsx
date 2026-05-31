import React, { useState } from 'react';

export default function ResourceSharing({
  activeFile,
  activeRole,
  logAuditAction
}) {
  const [selectedDept, setSelectedDept] = useState('Department of Social Statistics');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const departments = [
    'Department of Social Statistics',
    'Department of Economic Census & Indicators',
    'ISS Trainees 46th Batch',
    'NSSTA Faculty Academic Advisory Board',
    'National Statistical Commission (NSC)'
  ];

  if (!activeFile) {
    return (
      <div className="bg-white p-5 rounded-2xl border border-gray-150 text-slate-450 italic text-center text-xs">
        Select a drive file in the explorer to generate share links and department delegations
      </div>
    );
  }

  const handleGenerateLink = () => {
    const randomHash = Math.random().toString(36).substring(2, 10);
    const link = `http://localhost:5173/share/kms/drive/${activeFile.id}?token=${randomHash}`;
    setShareLink(link);
    setCopied(false);
    logAuditAction('Generate Share Link', `Generated secure sharing token for document ${activeFile.name}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelegateShare = (e) => {
    e.preventDefault();
    logAuditAction('Department Share Delegation', `Delegated official sharing permissions of ${activeFile.name} with ${selectedDept}`);
    alert(`Resource successfully shared and dispatched to the ${selectedDept} dashboard portal!`);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-5 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Resource Sharing & Delegations</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeFile.name} security scopes</span>
      </div>

      <div className="space-y-4">
        {/* Share link generator */}
        <div className="space-y-2">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Secure Access Tokens</h4>
          <div className="space-y-2 bg-slate-50 p-4 border rounded-xl">
            <p className="text-[10.5px] text-slate-500 font-semibold leading-relaxed">
              Generate encrypted tokens that allow temporary reading rights for international statistical delegates or external auditors.
            </p>
            <button 
              onClick={handleGenerateLink}
              className="px-4 py-2 bg-blue-605 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-2xs cursor-pointer bg-blue-600 transition-colors"
            >
              Generate Sharing Link
            </button>

            {shareLink && (
              <div className="flex gap-2 items-center mt-2.5">
                <input 
                  type="text"
                  readOnly
                  value={shareLink}
                  className="flex-grow border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-mono text-[9px] text-slate-650"
                />
                <button 
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded font-extrabold text-[10px] cursor-pointer transition-colors border ${
                    copied ? 'bg-emerald-50 text-emerald-800 border-emerald-250' : 'bg-white border-gray-300 hover:bg-slate-100'
                  }`}
                >
                  {copied ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Department Delegation Form */}
        <form onSubmit={handleDelegateShare} className="border-t pt-4 space-y-3">
          <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Departmental Scope Delegation</h4>
          
          <div className="space-y-1">
            <label className="text-[9.5px] text-slate-400 font-bold uppercase">Target Institutional Department:</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-bold"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-2xs cursor-pointer transition-colors"
          >
            Delegate Shared Access
          </button>
        </form>
      </div>

    </div>
  );
}
