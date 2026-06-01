import React, { useState } from 'react';

export default function ClassroomAllocationTab() {
  const [allocations, setAllocations] = useState([
    { id: 1, name: 'Classroom 1', cap: 30, program: 'Governance', status: 'Allocated' },
    { id: 2, name: 'Classroom 2', cap: 40, program: 'Public Policy', status: 'Allocated' },
    { id: 3, name: 'Seminar Hall', cap: 60, program: 'Leadership', status: 'Allocated' },
    { id: 4, name: 'Smart Class 1', cap: 25, program: 'Discussion', status: 'Pending' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newAllocation, setNewAllocation] = useState({
    name: '',
    cap: '',
    program: 'Governance',
    status: 'Allocated'
  });

  const handleAddAllocation = (e) => {
    e.preventDefault();
    if (!newAllocation.name || !newAllocation.cap || !newAllocation.program) {
      alert('Please fill out all details.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: newAllocation.name,
      cap: parseInt(newAllocation.cap, 10),
      program: newAllocation.program,
      status: newAllocation.status
    };

    setAllocations([...allocations, newEntry]);
    setShowModal(false);
    
    // Reset Form
    setNewAllocation({
      name: '',
      cap: '',
      program: 'Governance',
      status: 'Allocated'
    });
  };

  const deleteAllocation = (id) => {
    if (window.confirm('Are you sure you want to remove this classroom allocation?')) {
      setAllocations(allocations.filter(a => a.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setAllocations(allocations.map(a => 
      a.id === id ? { ...a, status: a.status === 'Allocated' ? 'Pending' : 'Allocated' } : a
    ));
  };

  const filteredAllocations = allocations.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700 relative">
      
      {/* Title Header with Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Classroom Allocation Ledger</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">View capacities and active batches enrolled across statistics classrooms.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-150 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Allocate Classroom
        </button>
      </div>

      {/* Search Bar / Controls */}
      <div className="flex items-center gap-3">
        <div className="relative flex-grow max-w-sm">
          <input
            type="text"
            placeholder="Search classrooms or programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-205 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-slate-650 font-bold"
          >
            Clear
          </button>
        )}
      </div>

      {/* Allocations Table */}
      <div className="overflow-x-auto border border-gray-100 rounded-2xl">
        <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase select-none">
              <th className="px-5 py-3">Classroom Name</th>
              <th className="px-5 py-3">Seat Capacity</th>
              <th className="px-5 py-3">Assigned Program</th>
              <th className="px-5 py-3">Allocation Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredAllocations.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-5 py-8 text-center text-xs text-slate-400 font-medium">
                  No allocations found matching the search criteria.
                </td>
              </tr>
            ) : (
              filteredAllocations.map((room) => (
                <tr key={room.id} className="hover:bg-slate-50/40 transition-colors group">
                  <td className="px-5 py-4 font-extrabold text-slate-850">{room.name}</td>
                  <td className="px-5 py-4 text-slate-600 font-mono font-bold">{room.cap}</td>
                  <td className="px-5 py-4 text-slate-650">{room.program}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleStatus(room.id)}
                      title="Click to toggle status"
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border select-none transition-all ${
                        room.status === 'Allocated' 
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100' 
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {room.status}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => deleteAllocation(room.id)}
                      className="p-1 text-slate-350 hover:text-red-650 transition-colors opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer inline-flex items-center"
                      title="Delete Allocation"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Allocation Entry Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4">
            <div className="bg-[#053229] text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Allocate Classroom Batch</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-300 hover:text-white focus:outline-none cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddAllocation} className="p-6 space-y-4 text-xs sm:text-sm font-semibold text-slate-650">
              
              <div className="space-y-1.5">
                <label className="block text-slate-700">Classroom / Hall Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Smart Class 2"
                  value={newAllocation.name}
                  onChange={(e) => setNewAllocation({ ...newAllocation, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-855"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700">Seat Capacity</label>
                <input 
                  type="number" 
                  required
                  min="1"
                  placeholder="e.g. 40"
                  value={newAllocation.cap}
                  onChange={(e) => setNewAllocation({ ...newAllocation, cap: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-855"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700">Assigned Program</label>
                <select 
                  value={newAllocation.program}
                  onChange={(e) => setNewAllocation({ ...newAllocation, program: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                >
                  <option value="Governance">Governance</option>
                  <option value="Public Policy">Public Policy</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Discussion">Discussion</option>
                  <option value="Other">Other Session</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700">Allocation Status</label>
                <div className="flex gap-4">
                  {['Allocated', 'Pending'].map((st) => (
                    <label key={st} className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                      <input 
                        type="radio" 
                        name="status"
                        checked={newAllocation.status === st}
                        onChange={() => setNewAllocation({ ...newAllocation, status: st })}
                        className="text-[#08493d] focus:ring-emerald-500"
                      />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-lg shadow cursor-pointer transition-colors"
                >
                  Allocate Class
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
