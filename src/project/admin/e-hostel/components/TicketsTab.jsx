import React from 'react';

export default function TicketsTab({ tickets = [], setShowTicketModal }) {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-4 animate-fadeIn text-slate-700">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Maintenance & Facility Tickets</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Monitor and register maintenance logs for residential facilities.</p>
        </div>
        <button 
          onClick={() => setShowTicketModal(true)}
          className="px-3.5 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold text-xs rounded-lg shadow-sm hover:shadow transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          Raise Ticket
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
          <thead>
            <tr className="bg-slate-50 text-slate-400 font-bold uppercase">
              <th className="px-4 py-3">Ticket ID</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 font-medium">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3.5 font-mono font-bold text-slate-500">{ticket.id}</td>
                <td className="px-4 py-3.5 text-slate-800 font-extrabold">{ticket.category}</td>
                <td className="px-4 py-3.5 text-slate-650" title={ticket.description}>
                  {ticket.description}
                </td>
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    ticket.status === 'Resolved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    ticket.status === 'In Progress' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                    'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}>{ticket.status}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className={`inline-block text-[10px] font-bold uppercase ${
                    ticket.priority === 'High' ? 'text-rose-700' :
                    ticket.priority === 'Medium' ? 'text-amber-700' : 'text-emerald-700'
                  }`}>{ticket.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
