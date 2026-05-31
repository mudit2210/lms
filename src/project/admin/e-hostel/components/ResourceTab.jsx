import React from 'react';

export default function ResourceTab({ 
  resources = [], 
  resourceSearch = '', 
  setResourceSearch, 
  newResource, 
  setNewResource, 
  handleResourceSubmit 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-5 text-slate-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-800">Resource & Assets Inventory</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Track, audit, and allocate hostel linen supplies, structural furniture, and electrical appliances.</p>
          </div>
          
          <div className="relative w-full sm:w-60">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search inventory supplies..."
              value={resourceSearch}
              onChange={(e) => setResourceSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#08493d] text-xs font-semibold text-slate-800 bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Supplies Table */}
          <div className="lg:col-span-2 overflow-x-auto border border-gray-150 rounded-2xl bg-white">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase">
                  <th className="px-4 py-3">Resource Asset</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-center">Total Stock</th>
                  <th className="px-4 py-3 text-center">Available</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {resources.filter(res => res.name.toLowerCase().includes(resourceSearch.toLowerCase())).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-extrabold text-slate-800">{item.name}</p>
                      <span className="font-mono text-[9px] text-slate-400 font-semibold">{item.id}</span>
                    </td>
                    <td className="px-4 py-3.5 text-slate-505">{item.category}</td>
                    <td className="px-4 py-3.5 text-center font-mono text-slate-800 font-bold">{item.total}</td>
                    <td className="px-4 py-3.5 text-center font-mono text-[#08493d] font-bold">{item.available}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Supply Side Form */}
          <div className="lg:col-span-1 border border-slate-150 p-5 rounded-2xl bg-slate-50/50 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Log New Supply Batch</h4>
            <form onSubmit={handleResourceSubmit} className="space-y-3.5 text-xs font-semibold text-slate-650">
              <div className="space-y-1">
                <label className="block text-slate-700">Asset / Supply Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Single Bedsheet (White)"
                  value={newResource.name}
                  onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">Category</label>
                <select 
                  value={newResource.category}
                  onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                >
                  <option value="Linen">Linen (Bedsheets, Towels)</option>
                  <option value="Furniture">Furniture (Chairs, Desks)</option>
                  <option value="Appliances">Appliances (ACs, Lamps, Geysers)</option>
                  <option value="General">Other Essentials</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700">Total Stock</label>
                  <input 
                    type="number" 
                    required
                    placeholder="350"
                    value={newResource.total}
                    onChange={(e) => setNewResource({ ...newResource, total: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700">Available Qty</label>
                  <input 
                    type="number" 
                    required
                    placeholder="120"
                    value={newResource.available}
                    onChange={(e) => setNewResource({ ...newResource, available: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-mono"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-sm hover:shadow transition-colors text-center cursor-pointer"
              >
                Add to Stock Inventory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
