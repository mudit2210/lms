import React, { useState } from 'react';

export default function VisitorTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [visitors, setVisitors] = useState([
    { id: 'GP-4012', name: 'Dr. Suresh Mehta', traineeVisited: 'Rahul Verma (Room H-204)', purpose: 'Official Mentorship', checkinTime: '15 May 2025 • 09:30 AM', checkoutTime: '15 May 2025 • 11:30 AM', status: 'Checked Out' },
    { id: 'GP-4013', name: 'Neelam Singh', traineeVisited: 'Anjali Singh (Room H-105)', purpose: 'Family Visit', checkinTime: '15 May 2025 • 04:00 PM', checkoutTime: 'Pending', status: 'Checked In' },
    { id: 'GP-4014', name: 'Amit Sharma', traineeVisited: 'Vikram Das (Room H-206)', purpose: 'Book Delivery / Research', checkinTime: '14 May 2025 • 11:00 AM', checkoutTime: '14 May 2025 • 12:15 PM', status: 'Checked Out' },
    { id: 'GP-4015', name: 'Sunita Nair', traineeVisited: 'Meera Nair (Room H-302)', purpose: 'Family Visit', checkinTime: 'Pending', checkoutTime: 'Pending', status: 'Approved' }
  ]);

  const [newVisitor, setNewVisitor] = useState({ name: '', traineeVisited: '', purpose: 'Family Visit' });

  const handleCreatePass = (e) => {
    e.preventDefault();
    if (!newVisitor.name || !newVisitor.traineeVisited) return;
    const newId = `GP-${Math.floor(4000 + Math.random() * 9000)}`;
    setVisitors([
      ...visitors,
      {
        id: newId,
        name: newVisitor.name,
        traineeVisited: newVisitor.traineeVisited,
        purpose: newVisitor.purpose,
        checkinTime: 'Pending',
        checkoutTime: 'Pending',
        status: 'Approved'
      }
    ]);
    setNewVisitor({ name: '', traineeVisited: '', purpose: 'Family Visit' });
  };

  const handleCheckIn = (id) => {
    const timeStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: 'Checked In', checkinTime: timeStr } : v));
  };

  const handleCheckOut = (id) => {
    const timeStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    setVisitors(visitors.map(v => v.id === id ? { ...v, status: 'Checked Out', checkoutTime: timeStr } : v));
  };

  const filteredVisitors = visitors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.traineeVisited.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn text-slate-700 font-sans">
      
      {/* Visitor Management Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Visitor Management & Gate Pass Console</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Authorise campus entries, issue security gate passes for visitors, track check-in/out registers, and secure the residential quarters.</p>
        </div>
        <div className="flex gap-2 text-xs font-bold text-center">
          <div className="bg-[#eff7f5] text-[#08493d] border border-emerald-100 px-3.5 py-2 rounded-xl shadow-3xs">
            <span className="text-[10px] text-slate-400 block uppercase">In Campus</span>
            <span className="text-lg font-black font-mono">{visitors.filter(v => v.status === 'Checked In').length}</span>
          </div>
          <div className="bg-blue-50 text-blue-800 border border-blue-100 px-3.5 py-2 rounded-xl shadow-3xs">
            <span className="text-[10px] text-slate-400 block uppercase">Approved Today</span>
            <span className="text-lg font-black font-mono">{visitors.filter(v => v.status === 'Approved').length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Issue Gate Pass Form */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col justify-between space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-800">Issue Security Gate Pass</h3>
            <p className="text-xs text-slate-500 font-medium">Create a pre-approved security entry permit for hostel visitors.</p>
          </div>

          <form onSubmit={handleCreatePass} className="space-y-4 font-semibold text-xs sm:text-sm text-slate-650">
            <div className="space-y-1.5">
              <label className="block text-slate-700">Visitor's Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Suresh Mehta"
                value={newVisitor.name}
                onChange={(e) => setNewVisitor({ ...newVisitor, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700">Trainee & Room Visited</label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Verma (Room H-204)"
                value={newVisitor.traineeVisited}
                onChange={(e) => setNewVisitor({ ...newVisitor, traineeVisited: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700">Purpose of Visit</label>
              <select
                value={newVisitor.purpose}
                onChange={(e) => setNewVisitor({ ...newVisitor, purpose: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-slate-850 bg-white"
              >
                <option value="Family Visit">Family Visit</option>
                <option value="Official Mentorship">Official Mentorship / Faculty Desk</option>
                <option value="Delivery / Services">Delivery / Maintenance Services</option>
                <option value="Other">Other Campus Business</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold text-xs uppercase rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              Generate Entry Pass
            </button>
          </form>
        </div>

        {/* Gate Passes & Visitors Registry */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 lg:col-span-2 flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Security Gate Register</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Manage live check-ins/outs for all residential entry points.</p>
            </div>
            
            <div className="relative w-full sm:w-56">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by Pass ID, Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#08493d] text-xs font-semibold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto flex-grow">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="px-4 py-3">Pass ID</th>
                  <th className="px-4 py-3">Visitor Name</th>
                  <th className="px-4 py-3">Purpose</th>
                  <th className="px-4 py-3">Check-In / Out Log</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {filteredVisitors.length > 0 ? (
                  filteredVisitors.map((pass) => (
                    <tr key={pass.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-500 whitespace-nowrap">{pass.id}</td>
                      <td className="px-4 py-3.5">
                        <p className="font-extrabold text-slate-800">{pass.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">Visits: {pass.traineeVisited}</p>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">{pass.purpose}</td>
                      <td className="px-4 py-3.5">
                        <p className="text-[10px] text-slate-500">In: <span className="font-bold font-mono">{pass.checkinTime}</span></p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Out: <span className="font-bold font-mono">{pass.checkoutTime}</span></p>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          pass.status === 'Checked In' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          pass.status === 'Checked Out' ? 'bg-slate-100 text-slate-550 border border-slate-200' :
                          'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}>{pass.status}</span>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        {pass.status === 'Approved' && (
                          <button
                            onClick={() => handleCheckIn(pass.id)}
                            className="text-emerald-700 hover:text-emerald-900 text-[10px] font-black uppercase hover:underline cursor-pointer"
                          >
                            Check In
                          </button>
                        )}
                        {pass.status === 'Checked In' && (
                          <button
                            onClick={() => handleCheckOut(pass.id)}
                            className="text-rose-600 hover:text-rose-800 text-[10px] font-black uppercase hover:underline cursor-pointer"
                          >
                            Check Out
                          </button>
                        )}
                        {pass.status === 'Checked Out' && (
                          <span className="text-[10px] font-bold text-slate-400">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-slate-400 font-semibold">
                      No visitor passes found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      
    </div>
  );
}
