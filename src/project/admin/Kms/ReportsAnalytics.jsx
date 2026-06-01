import React from 'react';
import IndiaMap from './IndiaMap';

export default function ReportsAnalytics({
  auditLogs,
  repoFiles,
  forumThreads
}) {
  
  // Calculate total views, total downloads
  const totalViews = repoFiles.reduce((acc, curr) => acc + (curr.views || 0), 0);
  const totalDownloads = repoFiles.reduce((acc, curr) => acc + (curr.downloads || 0), 0);
  const totalDiscussionsCount = forumThreads.length;

  return (
    <div className="space-y-6 animate-fadeIn text-xs font-semibold text-slate-700 select-none">
      
      {/* Metrics overview card list grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">Total Document Views</span>
          <h4 className="text-2xl font-black text-blue-900 font-mono">{totalViews}</h4>
          <p className="text-[10px] text-slate-400 font-medium">Accumulated drive previews read</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">Total Downloads (↓)</span>
          <h4 className="text-2xl font-black text-[#08493d] font-mono">{totalDownloads}</h4>
          <p className="text-[10px] text-slate-400 font-medium">Compliance guidelines exported locally</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">Discussions Created</span>
          <h4 className="text-2xl font-black text-amber-700 font-mono">{totalDiscussionsCount}</h4>
          <p className="text-[10px] text-slate-400 font-medium">Peer-to-peer training Q&As posted</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-1.5">
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">Repository Version Count</span>
          <h4 className="text-2xl font-black text-purple-900 font-mono">18</h4>
          <p className="text-[10px] text-slate-400 font-medium">Total revision changes tracked</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Popular Tags keywords */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider border-b pb-3">Popular search keywords</h3>
          
          <div className="space-y-3">
            {[
              { tag: 'SOP', count: 18, color: 'bg-blue-50 text-blue-800' },
              { tag: 'Sampling', count: 12, color: 'bg-emerald-50 text-emerald-800' },
              { tag: 'GFR Regulations', count: 9, color: 'bg-amber-50 text-amber-800' },
              { tag: 'IT Policy', count: 8, color: 'bg-purple-50 text-purple-800' },
              { tag: 'Compliance', count: 5, color: 'bg-rose-50 text-rose-800' }
            ].map(item => (
              <div key={item.tag} className="flex justify-between items-center">
                <span className={`px-2.5 py-1 rounded text-xs font-bold ${item.color}`}>
                  #{item.tag}
                </span>
                <span className="text-[11px] font-bold text-slate-400">{item.count} assets</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Immutable system audit logs */}
        <div className="lg:col-span-8 bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4 flex flex-col h-[340px]">
          <div className="border-b pb-3 flex justify-between items-center shrink-0">
            <div>
              <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Immutable Compliance Audit trail</h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">System operations log registry</span>
            </div>
            <span className="text-[9px] bg-slate-100 border px-2 py-0.5 rounded font-extrabold text-slate-500 uppercase">
              READ-ONLY compliance logs
            </span>
          </div>

          {/* Audit trail details list scroll wrapper */}
          <div className="flex-grow overflow-y-auto space-y-2 pr-1 font-mono text-[11px]">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 bg-slate-50 border rounded-xl flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 leading-snug">
                    [{log.action.toUpperCase()}] {log.details}
                  </p>
                  <p className="text-[9.5px] text-slate-400">
                    Operated By: <strong>{log.operator}</strong> ({log.role})
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Third row: Map and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* State Distribution Card */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs">
          <h3 className="font-black text-[#0f172a] uppercase tracking-wider border-b border-slate-300 pb-3 text-xs mb-4">LEARNER DISTRIBUTION BY STATE</h3>
          
          <div className="flex flex-col items-center">
            {/* India SVG Map */}
            <IndiaMap className="w-36 h-36 my-4 drop-shadow-sm" />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 w-32 mb-4">
            <span className="text-[10px] text-slate-500 font-bold">Low</span>
            <div className="h-3.5 flex-grow rounded-full bg-gradient-to-r from-[#93c5fd] to-[#1e40af] border border-blue-200 shadow-inner"></div>
            <span className="text-[10px] text-slate-500 font-bold">High</span>
          </div>

          {/* Table */}
          <div className="space-y-0 border-t border-slate-300">
            {[
              { state: 'Uttar Pradesh', count: '30,117' },
              { state: 'Rajasthan', count: '25,380' },
              { state: 'Maharashtra', count: '21,740' },
              { state: 'Karnataka', count: '18,549' },
              { state: 'Madhya Pradesh', count: '16,255' }
            ].map((item) => (
              <div key={item.state} className="flex justify-between items-center py-2.5 border-b border-slate-300">
                <span className="text-[11px] text-slate-700 font-medium">{item.state}</span>
                <span className="text-[11px] text-[#0f172a] font-bold">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="pt-5 text-center">
            <button className="text-[11px] text-[#0f172a] font-black hover:underline">
              View All States
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
