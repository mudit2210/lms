import React, { useState } from 'react';

export default function RoomAllotmentTab({ 
  allotments = [], 
  setAllotments,
  deleteAllotment, 
  setShowAllotModal 
}) {
  const [activeSubTab, setActiveSubTab] = useState('active_allotments'); // 'active_allotments', 'waitlist', 'room_swap'
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Waitlist local state in case parent doesn't provide
  const [waitlist, setWaitlist] = useState([
    { id: 1, name: 'Siddharth Sen', program: 'Governance Program', registrationDate: '18 May 2025', priority: 'High', status: 'Waiting' },
    { id: 2, name: 'Pooja Hegde', program: 'Leadership Program', registrationDate: '20 May 2025', priority: 'Medium', status: 'Waiting' },
    { id: 3, name: 'Rohan Sharma', program: 'Public Policy Program', registrationDate: '22 May 2025', priority: 'Low', status: 'Waiting' }
  ]);
  const [newWaitlist, setNewWaitlist] = useState({ name: '', program: 'Leadership Program', priority: 'High' });

  // 2. Room Swap local state in case parent doesn't provide
  const [swapRequests, setSwapRequests] = useState([
    { id: 1, name: 'Rahul Verma', currentRoom: 'H-204', requestedRoom: 'H-206', reason: 'Closer to elevator due to knee pain', status: 'Pending' },
    { id: 2, name: 'Meera Nair', currentRoom: 'H-302', requestedRoom: 'H-105', reason: 'Requires ground floor for medical accessibility', status: 'Pending' }
  ]);
  const [newSwap, setNewSwap] = useState({ name: '', currentRoom: '', requestedRoom: '', reason: '' });

  // Filtering allotments
  const filteredAllotments = allotments.filter(allot => {
    return allot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           allot.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
           allot.room.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Action handlers
  const handleAddToWaitlist = (e) => {
    e.preventDefault();
    if (!newWaitlist.name) return;
    setWaitlist([
      ...waitlist,
      {
        id: Date.now(),
        name: newWaitlist.name,
        program: newWaitlist.program,
        registrationDate: 'Today',
        priority: newWaitlist.priority,
        status: 'Waiting'
      }
    ]);
    setNewWaitlist({ name: '', program: 'Leadership Program', priority: 'High' });
  };

  const handleAllotFromWaitlist = (waititem) => {
    const assignedRoom = `H-${Math.floor(100 + Math.random() * 300)}`;
    
    // Fallback if setAllotments is not provided
    if (setAllotments) {
      setAllotments([
        ...allotments,
        {
          id: allotments.length + 1,
          name: waititem.name,
          program: waititem.program,
          room: assignedRoom,
          checkin: 'Today',
          checkout: '30 May 2025',
          status: 'Reserved'
        }
      ]);
    }
    
    setWaitlist(waitlist.filter(item => item.id !== waititem.id));
    alert(`Successfully allotted Room ${assignedRoom} to ${waititem.name} from Waitlist!`);
  };

  const handleCreateSwapRequest = (e) => {
    e.preventDefault();
    if (!newSwap.name || !newSwap.currentRoom || !newSwap.requestedRoom) return;
    setSwapRequests([
      ...swapRequests,
      {
        id: Date.now(),
        name: newSwap.name,
        currentRoom: newSwap.currentRoom.toUpperCase(),
        requestedRoom: newSwap.requestedRoom.toUpperCase(),
        reason: newSwap.reason,
        status: 'Pending'
      }
    ]);
    setNewSwap({ name: '', currentRoom: '', requestedRoom: '', reason: '' });
  };

  const handleApproveSwap = (swap) => {
    // Modify allotments to update the trainee's room number
    if (setAllotments) {
      setAllotments(allotments.map(allot => {
        if (allot.name.toLowerCase() === swap.name.toLowerCase()) {
          return { ...allot, room: swap.requestedRoom };
        }
        return allot;
      }));
    }
    
    // Update swap request status
    setSwapRequests(swapRequests.map(req => req.id === swap.id ? { ...req, status: 'Approved' } : req));
    alert(`Approved Room Swap! ${swap.name} has been transferred from ${swap.currentRoom} to ${swap.requestedRoom}.`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700">
      
      {/* Sub-Tabs Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-3">
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-650">
          <button 
            onClick={() => setActiveSubTab('active_allotments')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer ${activeSubTab === 'active_allotments' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'hover:text-slate-900'}`}
          >
            Active Allotments
          </button>
          <button 
            onClick={() => setActiveSubTab('waitlist')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'waitlist' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'hover:text-slate-900'}`}
          >
            Waitlist Management
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
              {waitlist.length}
            </span>
          </button>
          <button 
            onClick={() => setActiveSubTab('room_swap')}
            className={`px-4 py-2 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${activeSubTab === 'room_swap' ? 'bg-white text-slate-900 shadow-sm font-extrabold' : 'hover:text-slate-900'}`}
          >
            Room Swap & Transfer
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
              {swapRequests.filter(r => r.status === 'Pending').length}
            </span>
          </button>
        </div>
        
        {activeSubTab === 'active_allotments' && (
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
        )}
      </div>

      {/* View 1: Active Allotments List */}
      {activeSubTab === 'active_allotments' && (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="px-4 py-3">Trainee Name</th>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3 font-mono">Room No.</th>
                  <th className="px-4 py-3">Check-in</th>
                  <th className="px-4 py-3">Check-out</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
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
                          allot.status === 'Checked Out' ? 'bg-slate-100 text-slate-550 border border-slate-200' :
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
      )}

      {/* View 2: Waitlist Management */}
      {activeSubTab === 'waitlist' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add to Waitlist Form */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-4.5 space-y-4">
            <div>
              <h4 className="text-xs font-black uppercase text-[#08493d] tracking-wider">Register to Waitlist</h4>
              <p className="text-[10px] text-slate-550 mt-0.5">Queue a trainee officer when all room blocks are currently fully booked.</p>
            </div>

            <form onSubmit={handleAddToWaitlist} className="space-y-3 font-semibold text-xs text-slate-650">
              <div className="space-y-1">
                <label className="block text-slate-700">Trainee Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Sen"
                  value={newWaitlist.name}
                  onChange={(e) => setNewWaitlist({ ...newWaitlist, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">Program / Stream</label>
                <select
                  value={newWaitlist.program}
                  onChange={(e) => setNewWaitlist({ ...newWaitlist, program: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800"
                >
                  <option value="Leadership Program">Leadership Program</option>
                  <option value="Public Policy Program">Public Policy Program</option>
                  <option value="Governance Program">Governance Program</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">Priority Level</label>
                <select
                  value={newWaitlist.priority}
                  onChange={(e) => setNewWaitlist({ ...newWaitlist, priority: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded shadow-sm text-[11px] uppercase cursor-pointer"
              >
                Add Trainee to Waitlist
              </button>
            </form>
          </div>

          {/* Waitlist Table Register */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Trainee Waitlist Queue</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="px-4 py-3">Trainee Name</th>
                    <th className="px-4 py-3">Program</th>
                    <th className="px-4 py-3">Queued Date</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {waitlist.length > 0 ? (
                    waitlist.map((wait) => (
                      <tr key={wait.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-extrabold text-slate-800">{wait.name}</td>
                        <td className="px-4 py-3.5 text-slate-500">{wait.program}</td>
                        <td className="px-4 py-3.5 text-slate-400">{wait.registrationDate}</td>
                        <td className="px-4 py-3.5">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            wait.priority === 'High' ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                            wait.priority === 'Medium' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                            'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>{wait.priority}</span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleAllotFromWaitlist(wait)}
                            className="text-emerald-700 hover:text-emerald-900 text-[10px] font-black uppercase hover:underline cursor-pointer"
                          >
                            Allot Room
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-slate-400 font-semibold">
                        Waitlist queue is completely clear.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Room Swap / Transfer */}
      {activeSubTab === 'room_swap' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lodge Swap Request */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-4.5 space-y-4">
            <div>
              <h4 className="text-xs font-black uppercase text-[#08493d] tracking-wider">File Room Swap Request</h4>
              <p className="text-[10px] text-slate-550 mt-0.5">Submit room allocation transfer requests for medical or operational needs.</p>
            </div>

            <form onSubmit={handleCreateSwapRequest} className="space-y-3 font-semibold text-xs text-slate-650">
              <div className="space-y-1">
                <label className="block text-slate-700">Trainee Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Verma"
                  value={newSwap.name}
                  onChange={(e) => setNewSwap({ ...newSwap, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Current Room</label>
                  <input
                    type="text"
                    required
                    placeholder="H-204"
                    value={newSwap.currentRoom}
                    onChange={(e) => setNewSwap({ ...newSwap, currentRoom: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700">Requested Room</label>
                  <input
                    type="text"
                    required
                    placeholder="H-206"
                    value={newSwap.requestedRoom}
                    onChange={(e) => setNewSwap({ ...newSwap, requestedRoom: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700">Reason for Request</label>
                <textarea
                  required
                  rows="2"
                  placeholder="Provide clinical or accessibility justification..."
                  value={newSwap.reason}
                  onChange={(e) => setNewSwap({ ...newSwap, reason: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-805 resize-none font-semibold"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded shadow-sm text-[11px] uppercase cursor-pointer"
              >
                File Swap Request
              </button>
            </form>
          </div>

          {/* Swap Register */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Room Transfer Registry</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="px-4 py-3">Trainee Name</th>
                    <th className="px-4 py-3 font-mono">Current</th>
                    <th className="px-4 py-3 font-mono">Requested</th>
                    <th className="px-4 py-3">Reason</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {swapRequests.length > 0 ? (
                    swapRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 font-extrabold text-slate-800">{req.name}</td>
                        <td className="px-4 py-3.5 font-mono text-slate-500 font-bold">{req.currentRoom}</td>
                        <td className="px-4 py-3.5 font-mono text-[#08493d] font-black">{req.requestedRoom}</td>
                        <td className="px-4 py-3.5 text-slate-500 max-w-xs truncate" title={req.reason}>
                          {req.reason}
                        </td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            req.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                            'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}>{req.status}</span>
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          {req.status === 'Pending' ? (
                            <button
                              onClick={() => handleApproveSwap(req)}
                              className="text-emerald-700 hover:text-emerald-900 text-[10px] font-black uppercase hover:underline cursor-pointer"
                            >
                              Approve Swap
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-slate-400 font-semibold">
                        No pending room transfer requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
