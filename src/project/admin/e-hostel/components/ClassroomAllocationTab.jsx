import React from 'react';

export default function ClassroomAllocationTab() {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700">
      <div>
        <h3 className="text-base font-extrabold text-slate-800">Classroom Allocation Ledger</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">View capacities and active batches enrolled across statistics classrooms.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase">
              <th className="px-4 py-3">Classroom Name</th>
              <th className="px-4 py-3">Beds / Seat Capacity</th>
              <th className="px-4 py-3">Assigned Program</th>
              <th className="px-4 py-3">Allocation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: 'Classroom 1', cap: 30, program: 'Governance', status: 'Allocated' },
              { name: 'Classroom 2', cap: 40, program: 'Public Policy', status: 'Allocated' },
              { name: 'Seminar Hall', cap: 60, program: 'Leadership', status: 'Allocated' },
              { name: 'Smart Class 1', cap: 25, program: 'Discussion', status: 'Pending' }
            ].map((room, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50">
                <td className="px-4 py-3.5 font-extrabold text-slate-850">{room.name}</td>
                <td className="px-4 py-3.5 text-slate-600 font-mono font-bold">{room.cap}</td>
                <td className="px-4 py-3.5 text-slate-650">{room.program}</td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    room.status === 'Allocated' ? 'bg-emerald-50 text-emerald-800 border border-emerald-255' : 'bg-amber-50 text-amber-800 border border-amber-255'
                  }`}>{room.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
