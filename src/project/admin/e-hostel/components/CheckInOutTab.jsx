import React from 'react';

export default function CheckInOutTab() {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700">
      <div>
        <h3 className="text-base font-extrabold text-slate-800">Check-in / Check-out Logs</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Track and verify check-in timings and checkout logs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Today Check-ins</p>
          <p className="text-2xl font-extrabold text-emerald-950 mt-1">18</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
          <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">Today Check-outs</p>
          <p className="text-2xl font-extrabold text-rose-950 mt-1">12</p>
        </div>
        <div className="bg-[#eff7f5] border border-emerald-100 rounded-xl p-4 text-center">
          <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Occupied Rooms</p>
          <p className="text-2xl font-extrabold text-emerald-950 mt-1">98 / 120</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Activity Ledger</h4>
        <div className="divide-y divide-gray-100 border border-gray-150 rounded-xl overflow-hidden text-xs">
          {[
            { name: 'Rahul Verma', status: 'Checked In', time: '15 May 2025 • 10:30 AM', room: 'Room H-204' },
            { name: 'Vikram Das', status: 'Checked Out', time: '15 May 2025 • 09:15 AM', room: 'Room H-206' },
            { name: 'Anjali Singh', status: 'Checked In', time: '15 May 2025 • 11:45 AM', room: 'Room H-105' },
            { name: 'Suresh Kumar', status: 'Checked In', time: '14 May 2025 • 02:00 PM', room: 'Room H-112' },
            { name: 'Meera Nair', status: 'Checked In', time: '14 May 2025 • 04:30 PM', room: 'Room H-302' }
          ].map((act, idx) => (
            <div key={idx} className="flex justify-between items-center p-3.5 hover:bg-slate-50/50 font-semibold text-slate-700">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${act.status === 'Checked In' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                <div>
                  <p className="font-extrabold text-slate-800">{act.name}</p>
                  <p className="text-[9px] text-slate-400 font-normal">{act.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-slate-800 font-bold">{act.room}</p>
                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full inline-block mt-0.5 ${
                  act.status === 'Checked In' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>{act.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
