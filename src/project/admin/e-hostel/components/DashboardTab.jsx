import React from 'react';

export default function DashboardTab({ 
  setActiveSidebarTab, 
  setShowDetailsModal, 
  allotments = [], 
  tickets = [] 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* 1. Total Rooms */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Rooms</p>
              <h3 className="text-2xl font-extrabold text-slate-800">120</h3>
            </div>
            <div className="p-3 bg-[#eff7f5] text-[#08493d] rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
              </svg>
            </div>
          </div>
          <button onClick={() => setShowDetailsModal('total')} className="text-[10px] font-bold text-[#08493d] hover:text-emerald-800 mt-4 text-left hover:underline cursor-pointer">
            View Details
          </button>
        </div>

        {/* 2. Occupied Rooms */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Occupied Rooms</p>
              <h3 className="text-2xl font-extrabold text-slate-800">98</h3>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              </svg>
            </div>
          </div>
          <button onClick={() => setShowDetailsModal('occupied')} className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 mt-4 text-left hover:underline cursor-pointer">
            View Details
          </button>
        </div>

        {/* 3. Available Rooms */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Rooms</p>
              <h3 className="text-2xl font-extrabold text-slate-800">22</h3>
            </div>
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <button onClick={() => setShowDetailsModal('available')} className="text-[10px] font-bold text-amber-750 hover:text-amber-900 mt-4 text-left hover:underline cursor-pointer">
            View Details
          </button>
        </div>

        {/* 4. Today Check-outs */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today Check-outs</p>
              <h3 className="text-2xl font-extrabold text-slate-800">12</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3h4a3 3 0 013 3v1" />
              </svg>
            </div>
          </div>
          <button onClick={() => setShowDetailsModal('checkouts')} className="text-[10px] font-bold text-purple-700 hover:text-purple-900 mt-4 text-left hover:underline cursor-pointer">
            View Details
          </button>
        </div>

        {/* 5. Pending Dues */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Payments</p>
              <h3 className="text-2xl font-extrabold text-slate-800 font-sans">₹ 45,600</h3>
            </div>
            <div className="p-3 bg-teal-50 text-teal-700 rounded-xl font-bold">₹</div>
          </div>
          <button onClick={() => setShowDetailsModal('payments')} className="text-[10px] font-bold text-teal-700 hover:text-teal-900 mt-4 text-left hover:underline cursor-pointer">
            View Details
          </button>
        </div>
      </div>

      {/* Grid: Activities and Schedules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Check-in tracker */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800">Check-in Tracker</h3>
          <div className="space-y-3 font-medium text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span className="font-bold text-slate-700">Rahul Verma</span>
              </div>
              <span className="text-[10px] text-slate-400">Checked In • H-204</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                <span className="font-bold text-slate-700">Vikram Das</span>
              </div>
              <span className="text-[10px] text-slate-400">Checked Out • H-206</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span className="font-bold text-slate-700">Anjali Singh</span>
              </div>
              <span className="text-[10px] text-slate-400">Checked In • H-105</span>
            </div>
          </div>
          <button onClick={() => setActiveSidebarTab('check_in_out')} className="text-xs font-bold text-[#08493d] hover:underline block text-center w-full pt-1.5 border-t border-gray-100 cursor-pointer">
            View Full Logs →
          </button>
        </div>

        {/* Venue scheduling */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800">Venue Scheduling</h3>
          <div className="space-y-3 font-medium text-xs">
            <div className="flex gap-2">
              <div className="bg-slate-100 border border-slate-200 rounded text-center p-1 min-w-[32px] font-bold text-slate-700">
                15
              </div>
              <div>
                <p className="font-bold text-slate-800">ISS Inauguration</p>
                <p className="text-[10px] text-slate-400">Main Aud. • 09:00 AM</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-slate-100 border border-slate-200 rounded text-center p-1 min-w-[32px] font-bold text-slate-700">
                15
              </div>
              <div>
                <p className="font-bold text-slate-800">Policy Workshop</p>
                <p className="text-[10px] text-slate-400">Seminar Hall 2 • 02:00 PM</p>
              </div>
            </div>
          </div>
          <button onClick={() => setActiveSidebarTab('venue_scheduling')} className="text-xs font-bold text-[#08493d] hover:underline block text-center w-full pt-1.5 border-t border-gray-100 cursor-pointer">
            View Calendar →
          </button>
        </div>

        {/* Tickets summary */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800">Maintenance Tickets</h3>
          <div className="space-y-3 font-medium text-xs">
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
              <span className="font-mono text-[10px] font-bold text-slate-500">MTK1254</span>
              <span className="font-bold text-slate-800 truncate max-w-[120px]">AC Not Working</span>
              <span className="text-[9px] font-bold bg-rose-50 text-rose-700 px-2 py-0.2 rounded border border-rose-200">Open</span>
            </div>
            <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
              <span className="font-mono text-[10px] font-bold text-slate-500">MTK1253</span>
              <span className="font-bold text-slate-800 truncate max-w-[120px]">Projector broken</span>
              <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-2 py-0.2 rounded border border-amber-200">Pending</span>
            </div>
          </div>
          <button onClick={() => setActiveSidebarTab('tickets')} className="text-xs font-bold text-[#08493d] hover:underline block text-center w-full pt-1.5 border-t border-gray-100 cursor-pointer">
            View All Tickets →
          </button>
        </div>
      </div>
    </div>
  );
}
