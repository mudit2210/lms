import React from 'react';

export default function LogisticsReportsTab({ 
  isExportingLogistics = false, 
  setIsExportingLogistics, 
  logisticsSuccessMsg = '', 
  setLogisticsSuccessMsg, 
  diningCounts, 
  setDiningCounts, 
  fuelLogs = [], 
  setFuelLogs 
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 text-slate-700">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Logistics & Operational Ledger</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Track daily canteen meal dining statistics, fuel registers, and fleet expenses.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Dining Counts */}
          <div className="lg:col-span-1 border border-slate-150 p-5 rounded-2xl bg-slate-50/50 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Canteen Mess Dining Ledger</h4>
            <div className="space-y-3 text-xs font-semibold text-slate-650">
              <div className="flex justify-between items-center border-b border-gray-250 pb-2">
                <span className="text-slate-600">Breakfast Count (Today):</span>
                <input 
                  type="number"
                  value={diningCounts.breakfast}
                  onChange={(e) => setDiningCounts({ ...diningCounts, breakfast: parseInt(e.target.value) || 0 })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center bg-white text-slate-800 font-mono font-bold"
                />
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-slate-600">Lunch Count (Today):</span>
                <input 
                  type="number"
                  value={diningCounts.lunch}
                  onChange={(e) => setDiningCounts({ ...diningCounts, lunch: parseInt(e.target.value) || 0 })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center bg-white text-slate-800 font-mono font-bold"
                />
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-slate-600">Dinner Count (Today):</span>
                <input 
                  type="number"
                  value={diningCounts.dinner}
                  onChange={(e) => setDiningCounts({ ...diningCounts, dinner: parseInt(e.target.value) || 0 })}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center bg-white text-slate-800 font-mono font-bold"
                />
              </div>
              <div className="bg-emerald-50 text-emerald-950 p-3 rounded-lg border border-emerald-100 text-center font-bold font-mono">
                Total Meals Served: {diningCounts.breakfast + diningCounts.lunch + diningCounts.dinner}
              </div>
            </div>
          </div>

          {/* Fuel expenses logger */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fleet Fuel Log Ledger</h4>
              <button 
                onClick={() => {
                  const quantity = prompt('Enter fuel quantity (Liters):', '45');
                  const cost = prompt('Enter total amount in ₹:', '4600');
                  const driver = prompt('Enter driver name:', 'Rajesh Kumar');
                  if (quantity && cost && driver) {
                    const newId = `FL-${Math.floor(10 + Math.random() * 90)}`;
                    setFuelLogs([
                      {
                        id: newId,
                        date: 'Today',
                        vehicle: 'VHC-01',
                        fuelQty: `${quantity} L`,
                        amount: parseInt(cost).toLocaleString('en-IN'),
                        driver: driver
                      },
                      ...fuelLogs
                    ]);
                  }
                }}
                className="px-2.5 py-1 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold text-[10px] rounded shadow-xs transition-colors cursor-pointer"
              >
                + Log Fuel Slip
              </button>
            </div>

            <div className="overflow-x-auto border border-gray-150 rounded-2xl bg-white">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase">
                    <th className="px-4 py-3">Slip ID</th>
                    <th className="px-4 py-3">Fuel Qty</th>
                    <th className="px-4 py-3 text-right">Amount Paid</th>
                    <th className="px-4 py-3">Driver Registered</th>
                    <th className="px-4 py-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium">
                  {fuelLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-mono font-bold text-slate-500">{log.id}</td>
                      <td className="px-4 py-3 font-mono text-slate-850 font-bold">{log.fuelQty}</td>
                      <td className="px-4 py-3 text-right font-mono text-[#08493d] font-bold">₹ {log.amount}</td>
                      <td className="px-4 py-3 text-slate-800 font-extrabold">{log.driver}</td>
                      <td className="px-4 py-3 text-right text-slate-400">{log.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 text-center">
          {logisticsSuccessMsg && (
            <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-2.5 rounded-xl text-center text-xs font-bold font-sans max-w-lg mx-auto mb-3 animate-fadeIn">
              ✓ {logisticsSuccessMsg}
            </div>
          )}

          <button
            onClick={() => {
              setIsExportingLogistics(true);
              setLogisticsSuccessMsg('');
              setTimeout(() => {
                setIsExportingLogistics(false);
                setLogisticsSuccessMsg('Dining lists, Fleet logs & Operational ledger Excel sheet compiled & downloaded!');
              }, 2000);
            }}
            disabled={isExportingLogistics}
            className="px-6 py-2 bg-[#08493d] hover:bg-[#063b31] disabled:bg-emerald-800/50 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            {isExportingLogistics ? (
              <>
                <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Downloading Logistics Data...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Full Logistics Ledger (.xlsx)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
