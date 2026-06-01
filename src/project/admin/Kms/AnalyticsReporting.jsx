import React from 'react';
import IndiaMap from './IndiaMap';

export default function AnalyticsReporting({
  repoFiles,
  coursesData,
  forumThreads
}) {
  // Aggregate high fidelity analytics metrics
  const totalViews = repoFiles.reduce((acc, f) => acc + (f.views || 0), 0);
  const totalDownloads = repoFiles.reduce((acc, f) => acc + (f.downloads || 0), 0);
  const activeQuarantine = repoFiles.filter(f => f.status === 'Quarantine').length;
  
  let totalTopics = 0;
  coursesData.forEach(c => {
    c.lessons.forEach(l => {
      totalTopics += l.topics.length;
    });
  });

  const summaryCards = [
    { label: 'Cumulative Asset Views', value: totalViews, icon: '👁️', color: 'text-blue-600 bg-blue-50' },
    { label: 'Cumulative Document Downloads', value: totalDownloads, icon: '📥', color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Syllabus Course Chapters', value: totalTopics, icon: '📚', color: 'text-amber-600 bg-amber-50' },
    { label: 'Active Forum Threads', value: forumThreads.length, icon: '💬', color: 'text-purple-600 bg-purple-50' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn text-xs font-semibold text-slate-700 select-none text-left">
      
      {/* Analytics stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs flex justify-between items-center transition-all duration-300 hover:shadow-xs hover:-translate-y-0.5">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase">{card.label}</span>
              <h4 className="text-lg font-black text-slate-800">{card.value}</h4>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${card.color}`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main drive charts log block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Storage analysis */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
          <div>
            <h4 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Drive File Storage Format Share</h4>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metrics and file size capacities</span>
          </div>

          <div className="space-y-3.5 pt-2">
            {[
              { type: 'Adobe PDF Documents', share: 55, size: '212 MB', color: 'bg-red-500' },
              { type: 'Video Lecture Streams (MP4)', share: 30, size: '115 MB', color: 'bg-purple-500' },
              { type: 'Microsoft Word Guidelines', share: 10, size: '38 MB', color: 'bg-blue-500' },
              { type: 'Excel Spreadsheet Matrices', share: 5, size: '21 MB', color: 'bg-emerald-500' }
            ].map(item => (
              <div key={item.type} className="space-y-1.5">
                <div className="flex justify-between items-center text-[10.5px]">
                  <span className="font-bold text-slate-805">{item.type}</span>
                  <span className="text-slate-400 font-normal">{item.size} ({item.share}%)</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audit status and safety levels */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
          <div>
            <h4 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Quality Validation Pipeline Status</h4>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Automatic scanners & quarantine threat audits</span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold">Total Drive files under active release:</span>
              <span className="font-black text-[#08493d]">{repoFiles.filter(f => f.status === 'Active').length} files</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 border rounded-xl">
              <span className="font-bold">Total drive files in threat quarantine:</span>
              <span className={`font-black ${activeQuarantine > 0 ? 'text-amber-600' : 'text-slate-505'}`}>{activeQuarantine} files</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#e8f5e9]/30 border border-[#c8e6c9] rounded-xl text-emerald-800">
              <span className="font-bold">GovThreatGuard threat detection rate:</span>
              <span className="font-black text-emerald-700">100.0% (Clean)</span>
            </div>
          </div>
        </div>

        {/* Learner Distribution by State */}
        <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4">
          <div>
            <h4 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">LEARNER DISTRIBUTION BY STATE</h4>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Statewise training enrollment count</span>
          </div>

          <div className="flex flex-col items-center">
            {/* India SVG Map */}
            <IndiaMap className="w-36 h-36 my-1 drop-shadow-xs" />

            {/* Legend */}
            <div className="flex items-center gap-2 w-28 mb-3">
              <span className="text-[9px] text-slate-500 font-bold">Low</span>
              <div className="h-2.5 flex-grow rounded-full bg-gradient-to-r from-[#93c5fd] to-[#1e40af] border border-blue-200"></div>
              <span className="text-[9px] text-slate-500 font-bold">High</span>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-0 border-t border-slate-200">
            {[
              { state: 'Uttar Pradesh', count: '30,117' },
              { state: 'Rajasthan', count: '25,380' },
              { state: 'Maharashtra', count: '21,740' },
              { state: 'Karnataka', count: '18,549' },
              { state: 'Madhya Pradesh', count: '16,255' }
            ].map((item) => (
              <div key={item.state} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0">
                <span className="text-[11px] text-slate-700 font-medium">{item.state}</span>
                <span className="text-[11px] text-slate-900 font-bold">{item.count}</span>
              </div>
            ))}
          </div>

          <div className="pt-1 text-center">
            <button className="text-[10px] text-emerald-800 font-extrabold hover:underline">
              View All States
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
