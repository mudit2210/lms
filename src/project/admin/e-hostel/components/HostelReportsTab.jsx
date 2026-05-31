import React from 'react';

export default function HostelReportsTab({ 
  selectedHostelReport = 'occupancy', 
  setSelectedHostelReport, 
  isExportingHostel = false, 
  setIsExportingHostel, 
  hostelSuccessMsg = '', 
  setHostelSuccessMsg 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 text-slate-700">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">e-Hostel Performance & Compliance Audits</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Generate analytical reports of room occupancy rates, ticket resolutions, and logistics compliance scores.</p>
        </div>

        {/* Dashboard stats style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#eff7f5] border border-emerald-100 rounded-2xl p-5 text-left space-y-1 hover:shadow-xs transition-shadow">
            <p className="text-[10px] font-bold text-[#08493d] uppercase tracking-wider">Average Monthly Occupancy</p>
            <div className="flex items-baseline gap-2 pt-1">
              <h4 className="text-2xl font-extrabold text-[#08493d]">81.6%</h4>
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/60 px-1.5 py-0.2 rounded">+2.4% vs LTM</span>
            </div>
            <div className="w-full bg-emerald-200/50 rounded-full h-1.5 mt-3">
              <div className="bg-[#08493d] h-1.5 rounded-full" style={{ width: '81.6%' }}></div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-left space-y-1 hover:shadow-xs transition-shadow">
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Maintenance Resolution Rate</p>
            <div className="flex items-baseline gap-2 pt-1">
              <h4 className="text-2xl font-extrabold text-amber-900">93.8%</h4>
              <span className="text-[10px] text-amber-850 font-bold bg-amber-100/60 px-1.5 py-0.2 rounded">avg 6.2 hours</span>
            </div>
            <div className="w-full bg-amber-200/50 rounded-full h-1.5 mt-3">
              <div className="bg-amber-700 h-1.5 rounded-full" style={{ width: '93.8%' }}></div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-left space-y-1 hover:shadow-xs transition-shadow">
            <p className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">Hostel Compliance Audits</p>
            <div className="flex items-baseline gap-2 pt-1">
              <h4 className="text-2xl font-extrabold text-purple-900">98.2%</h4>
              <span className="text-[10px] text-purple-850 font-bold bg-purple-100/60 px-1.5 py-0.2 rounded">Excellent rating</span>
            </div>
            <div className="w-full bg-purple-200/50 rounded-full h-1.5 mt-3">
              <div className="bg-purple-700 h-1.5 rounded-full" style={{ width: '98.2%' }}></div>
            </div>
          </div>
        </div>

        {/* Simulated exporter */}
        <div className="border border-slate-150 rounded-2xl p-6 bg-slate-50/50 space-y-4 max-w-2xl mx-auto">
          <div className="text-center space-y-1.5">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Automated Audit & Ledger Downloader</h4>
            <p className="text-xs text-slate-500 font-medium">Configure filters and download official government-certified reports dynamically.</p>
          </div>

          {hostelSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-3 rounded-xl text-center text-xs font-bold font-sans animate-fadeIn">
              ✓ {hostelSuccessMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
            <div className="space-y-1.5">
              <label className="block text-slate-700">Audit Type</label>
              <select 
                value={selectedHostelReport} 
                onChange={(e) => setSelectedHostelReport(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
              >
                <option value="occupancy">Trainee Room Occupancy Audit</option>
                <option value="maintenance">Maintenance Tickets Resolution Ledger</option>
                <option value="compliance">Security & Compliance Clearance Logs</option>
                <option value="inventory">Linen & supplies Stock Assessment</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-slate-700">Export File Format</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white">
                <option>Microsoft Excel (.xlsx)</option>
                <option>Comma Separated Values (.csv)</option>
                <option>Adobe PDF Document (.pdf)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={() => {
                setIsExportingHostel(true);
                setHostelSuccessMsg('');
                setTimeout(() => {
                  setIsExportingHostel(false);
                  setHostelSuccessMsg(`Report (${selectedHostelReport === 'occupancy' ? 'Room Occupancy Audit' : selectedHostelReport === 'maintenance' ? 'Tickets Ledger' : 'Compliance Logs'}) compiled and downloaded successfully!`);
                }, 2000);
              }}
              disabled={isExportingHostel}
              className="px-6 py-2 bg-[#08493d] hover:bg-[#063b31] disabled:bg-emerald-800/50 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              {isExportingHostel ? (
                <>
                  <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Compiling Ledger Data...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Export & Download Certified Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
