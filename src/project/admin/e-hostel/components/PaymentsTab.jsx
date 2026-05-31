import React from 'react';

export default function PaymentsTab() {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700">
      <div>
        <h3 className="text-base font-extrabold text-slate-800">Payments & Receipts Ledger</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Manage fees collections, pending hostel dues, and dining receipts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-gray-200 bg-slate-50 rounded-xl p-4 flex justify-between items-center font-semibold">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Collection</p>
            <p className="text-xl font-extrabold text-slate-800 mt-1">₹ 2,48,000</p>
          </div>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs font-bold font-mono">Paid</span>
        </div>
        <div className="border border-gray-200 bg-slate-50 rounded-xl p-4 flex justify-between items-center font-semibold">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outstanding Dues</p>
            <p className="text-xl font-extrabold text-rose-700 mt-1">₹ 45,600</p>
          </div>
          <span className="text-rose-700 bg-rose-50 px-2 py-1 rounded text-xs font-bold font-mono">Pending</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Transactions</h4>
        <div className="space-y-3">
          {[
            { name: 'Rahul Verma', receipt: 'RCP1254', amount: '12,000', date: '15 May 2025', status: 'Paid' },
            { name: 'Anjali Singh', receipt: 'RCP1253', amount: '12,000', date: '15 May 2025', status: 'Paid' },
            { name: 'Meera Nair', receipt: 'RCP1252', amount: '12,000', date: '14 May 2025', status: 'Paid' },
            { name: 'Vikram Das', receipt: 'RCP1251', amount: '8,500', date: '12 May 2025', status: 'Pending' }
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50/50 border border-slate-150/50 rounded-xl text-xs font-semibold">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#eff7f5] text-[#08493d] rounded-lg">
                  <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-[9px] text-slate-400 font-mono">Receipt: {item.receipt} • {item.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-slate-800">₹ {item.amount}</p>
                <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full inline-block mt-0.5 ${
                  item.status === 'Paid' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
