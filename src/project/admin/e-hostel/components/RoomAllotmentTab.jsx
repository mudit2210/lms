import React, { useState } from 'react';

export default function RoomAllotmentTab({ 
  allotments = [], 
  deleteAllotment, 
  setShowAllotModal 
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering allotments
  const filteredAllotments = allotments.filter(allot => {
    return allot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           allot.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
           allot.room.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-4 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Room Allotment List</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Assign residential hostel rooms to active academy trainees.</p>
        </div>
        
        <div className="flex w-full sm:w-auto gap-3 items-center">
          {/* Search Bar */}
          <div className="relative flex-grow sm:w-60">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by Name/Program/Room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#08493d] text-xs font-semibold text-slate-800 bg-white"
            />
          </div>

          {/* Allot Button */}
          <button 
            onClick={() => setShowAllotModal(true)}
            className="px-3.5 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold text-xs rounded-lg shadow-sm hover:shadow transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            + Allot New Room
          </button>
        </div>
      </div>

      {/* Room Allotment Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
              <th className="px-4 py-3">Trainee Name</th>
              <th className="px-4 py-3">Program</th>
              <th className="px-4 py-3">Room No.</th>
              <th className="px-4 py-3">Check-in</th>
              <th className="px-4 py-3">Check-out</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredAllotments.length > 0 ? (
              filteredAllotments.map((allot) => (
                <tr key={allot.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-extrabold text-slate-800">{allot.name}</td>
                  <td className="px-4 py-3.5 text-slate-500">{allot.program}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-800 font-bold">{allot.room}</td>
                  <td className="px-4 py-3.5 text-slate-400">{allot.checkin}</td>
                  <td className="px-4 py-3.5 text-slate-400">{allot.checkout}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      allot.status === 'Checked In' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      allot.status === 'Checked Out' ? 'bg-slate-100 text-slate-500 border border-slate-200' :
                      'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {allot.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right whitespace-nowrap">
                    <button 
                      onClick={() => deleteAllotment(allot.id)}
                      className="text-rose-600 hover:text-rose-800 text-[10px] font-extrabold uppercase hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-slate-400 font-semibold">
                  No allotments found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
