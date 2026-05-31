import React from 'react';

export default function MasterDataTab({ 
  masterRooms = [], 
  setMasterRooms, 
  masterVenues = [], 
  setMasterVenues, 
  newMasterRoom, 
  setNewMasterRoom, 
  newMasterVenue, 
  setNewMasterVenue, 
  handleMasterRoomSubmit, 
  handleMasterVenueSubmit 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 text-slate-700">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Global Database Master Data Catalog</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Register new physical locations, hostels rooms, and class venues in the system directory.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hostel Rooms Catalog */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hostel Rooms Database</h4>
              <span className="text-[10px] text-slate-400 font-semibold">{masterRooms.length} Total Rooms registered</span>
            </div>

            <form onSubmit={handleMasterRoomSubmit} className="grid grid-cols-4 gap-2.5 text-xs font-semibold text-slate-650 items-end">
              <div className="col-span-1.5 space-y-1">
                <label className="block text-slate-700">Room No.</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. H-312"
                  value={newMasterRoom.roomNo}
                  onChange={(e) => setNewMasterRoom({ ...newMasterRoom, roomNo: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-slate-850 font-bold bg-white"
                />
              </div>
              <div className="col-span-1.5 space-y-1">
                <label className="block text-slate-700">Type</label>
                <select 
                  value={newMasterRoom.type}
                  onChange={(e) => setNewMasterRoom({ ...newMasterRoom, type: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-850 bg-white"
                >
                  <option>Single Occupancy</option>
                  <option>Double Occupancy</option>
                  <option>VIP Suite</option>
                </select>
              </div>
              <div className="col-span-1 space-y-1">
                <label className="block text-slate-700">Block</label>
                <select 
                  value={newMasterRoom.block}
                  onChange={(e) => setNewMasterRoom({ ...newMasterRoom, block: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-850 bg-white"
                >
                  <option>Block A</option>
                  <option>Block B</option>
                  <option>Executive Block</option>
                </select>
              </div>
              <button 
                type="submit" 
                className="px-2.5 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded text-[10px] shadow-sm hover:shadow cursor-pointer text-center"
              >
                Add Room
              </button>
            </form>

            <div className="overflow-x-auto border border-gray-150 rounded-xl max-h-64 overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="px-3 py-2">Room No.</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Block</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {masterRooms.map((rm) => (
                    <tr key={rm.roomNo} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-mono font-bold text-slate-800">{rm.roomNo}</td>
                      <td className="px-3 py-2 text-slate-550">{rm.type}</td>
                      <td className="px-3 py-2 text-slate-550">{rm.block}</td>
                      <td className="px-3 py-2">
                        <span className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold ${
                          rm.status === 'Available' ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}>{rm.status}</span>
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button 
                          onClick={() => setMasterRooms(masterRooms.filter(r => r.roomNo !== rm.roomNo))}
                          className="text-rose-600 hover:underline hover:text-rose-800 cursor-pointer font-bold text-[10px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Seminar Venues Catalog */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Seminar Venues & Auditoriums</h4>
              <span className="text-[10px] text-slate-400 font-semibold">{masterVenues.length} Total Venues registered</span>
            </div>

            <form onSubmit={handleMasterVenueSubmit} className="grid grid-cols-4 gap-2.5 text-xs font-semibold text-slate-650 items-end">
              <div className="col-span-1.5 space-y-1">
                <label className="block text-slate-700">Venue Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Smart Room 2"
                  value={newMasterVenue.name}
                  onChange={(e) => setNewMasterVenue({ ...newMasterVenue, name: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-850 font-bold bg-white"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="block text-slate-700">Seats</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 40"
                  value={newMasterVenue.capacity}
                  onChange={(e) => setNewMasterVenue({ ...newMasterVenue, capacity: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-slate-855 font-bold bg-white"
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="block text-slate-700">Floor Location</label>
                <input 
                  type="text" 
                  required
                  placeholder="First Floor"
                  value={newMasterVenue.location}
                  onChange={(e) => setNewMasterVenue({ ...newMasterVenue, location: e.target.value })}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-855 bg-white"
                />
              </div>
              <button 
                type="submit" 
                className="px-2.5 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded text-[10px] shadow-sm hover:shadow cursor-pointer text-center"
              >
                Add Venue
              </button>
            </form>

            <div className="overflow-x-auto border border-gray-150 rounded-xl max-h-64 overflow-y-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="px-3 py-2">Venue</th>
                    <th className="px-3 py-2 text-center">Seat Capacity</th>
                    <th className="px-3 py-2">Floor Location</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {masterVenues.map((vn) => (
                    <tr key={vn.name} className="hover:bg-slate-50/50">
                      <td className="px-3 py-2 font-extrabold text-slate-855">{vn.name}</td>
                      <td className="px-3 py-2 text-center font-mono font-bold text-[#08493d]">{vn.capacity} seats</td>
                      <td className="px-3 py-2 text-slate-550">{vn.location}</td>
                      <td className="px-3 py-2 text-right">
                        <button 
                          onClick={() => setMasterVenues(masterVenues.filter(v => v.name !== vn.name))}
                          className="text-rose-600 hover:underline hover:text-rose-800 cursor-pointer font-bold text-[10px]"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
