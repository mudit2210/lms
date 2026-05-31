import React from 'react';

export default function Notifications({
  repoFiles,
  forumThreads,
  activeRole
}) {
  const pendingCount = repoFiles.filter(f => f.status === 'Quarantine').length;
  
  const alertsList = [
    {
      id: 1,
      title: 'Academic Performance Review Scheduled',
      time: '1 hour ago',
      desc: 'Trainees enrolled in GFR Procurement training have scheduled test assessments.',
      type: 'info',
      tag: 'Academic'
    },
    {
      id: 2,
      title: `${pendingCount} Quarantined Files Pending Quality Audit`,
      time: '3 hours ago',
      desc: 'NIC automated vulnerability scans completed. Released approval required from Reviewer/Admin.',
      type: 'warning',
      tag: 'Governance'
    },
    {
      id: 3,
      title: 'New Thread Added in Sampling Methodology Forum',
      time: 'Yesterday',
      desc: 'Trainer composed a discussion outline "Sampling design feedback & NSS recommendations".',
      type: 'success',
      tag: 'Forum'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">System Alerts & Notifications</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Real-time learning advisory warnings</span>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
        {alertsList.map(alert => (
          <div 
            key={alert.id}
            className={`p-3.5 rounded-xl border flex gap-3.5 items-start ${
              alert.type === 'warning' ? 'bg-amber-50/20 border-amber-200' :
              alert.type === 'success' ? 'bg-emerald-50/20 border-emerald-200' :
              'bg-slate-50 border-gray-200'
            }`}
          >
            <div className="text-lg">
              {alert.type === 'warning' ? '⚠️' : alert.type === 'success' ? '📢' : '💡'}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10.5px]">
                <span className="font-extrabold text-slate-800">{alert.title}</span>
                <span className="text-slate-400 font-normal">{alert.time}</span>
              </div>
              <p className="text-slate-500 font-medium">{alert.desc}</p>
              <span className={`inline-block text-[9px] font-extrabold px-1.5 py-0.2 rounded border ${
                alert.tag === 'Governance' ? 'bg-amber-100/50 text-amber-805 border-amber-200 text-amber-800' :
                alert.tag === 'Forum' ? 'bg-emerald-100/50 text-emerald-805 border-emerald-200 text-emerald-800' :
                'bg-blue-50 text-blue-800 border-blue-200'
              }`}>
                {alert.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
