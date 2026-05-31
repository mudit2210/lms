import React from 'react';

export default function TransportTab({ 
  vehicles = [], 
  transitLogs = [], 
  newTrip, 
  setNewTrip, 
  handleTripSubmit 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 text-slate-700">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Transport & Vehicle Fleet Management</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Manage trainee transits, dispatch shuttles, and track active drivers.</p>
        </div>

        {/* Fleet status grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {vehicles.map((v) => (
            <div key={v.id} className="border border-gray-150 p-4 rounded-xl space-y-2 bg-slate-50/50 relative hover:shadow-xs transition-shadow">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[10px] font-extrabold bg-slate-200 px-2 py-0.5 rounded text-slate-750">{v.id}</span>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                  v.status === 'Available' ? 'bg-emerald-500' :
                  v.status === 'In Transit' ? 'bg-amber-500 animate-pulse' : 'bg-rose-500'
                }`} title={v.status} />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-800">{v.name}</h4>
                <p className="text-[10px] text-slate-400 font-semibold uppercase">{v.type} • {v.capacity}</p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Driver: <strong className="text-slate-700">{v.driver}</strong></span>
                <span className={`font-bold uppercase tracking-wider ${
                  v.status === 'Available' ? 'text-emerald-700' :
                  v.status === 'In Transit' ? 'text-amber-700' : 'text-rose-700'
                }`}>{v.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
          {/* Transit Dispatch Trip Form */}
          <div className="lg:col-span-1 border border-slate-150 p-5 rounded-2xl bg-white space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Dispatch Fleet Shuttle</h4>
            <form onSubmit={handleTripSubmit} className="space-y-3.5 text-xs font-semibold text-slate-650">
              <div className="space-y-1">
                <label className="block text-slate-700">Select Vehicle</label>
                <select 
                  value={newTrip.vehicleId}
                  onChange={(e) => setNewTrip({ ...newTrip, vehicleId: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id} disabled={v.status === 'Maintenance'}>
                      {v.name} ({v.id}) - {v.status}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">Route Details</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Airport to Academy Hostel"
                  value={newTrip.route}
                  onChange={(e) => setNewTrip({ ...newTrip, route: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Time & Date</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 15 May • 04 PM"
                    value={newTrip.time}
                    onChange={(e) => setNewTrip({ ...newTrip, time: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700">Officers Count</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 8"
                    value={newTrip.traineesCount}
                    onChange={(e) => setNewTrip({ ...newTrip, traineesCount: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-sm hover:shadow transition-colors text-center cursor-pointer"
              >
                Dispatch Shuttle →
              </button>
            </form>
          </div>

          {/* Active Transit Logs */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Active Transit Registers</h4>
            <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white divide-y divide-gray-100 text-xs">
              {transitLogs.map((log) => {
                const matchedVehicle = vehicles.find(v => v.id === log.vehicle);
                return (
                  <div key={log.id} className="p-4 hover:bg-slate-50/50 transition-colors flex justify-between items-center font-semibold text-slate-700">
                    <div className="flex items-start gap-3">
                      <span className="font-mono text-[9px] font-bold bg-[#eff7f5] text-[#08493d] px-2 py-0.5 rounded border border-emerald-100">{log.id}</span>
                      <div>
                        <p className="font-extrabold text-slate-800">{log.route}</p>
                        <p className="text-[10px] text-slate-400 font-normal mt-0.5">
                          Fleet: <strong className="text-slate-600">{matchedVehicle?.name}</strong> • Time: {log.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{log.trainees}</span>
                      <span className={`block text-[9px] font-extrabold uppercase mt-1.5 tracking-wider ${
                        log.status === 'Active' ? 'text-amber-700' : 'text-emerald-800'
                      }`}>{log.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
