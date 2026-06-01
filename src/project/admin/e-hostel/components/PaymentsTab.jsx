import React, { useState } from 'react';

export default function PaymentsTab() {
  // 1. Interactive States for Collection & Outstanding Dues
  const [totalCollection, setTotalCollection] = useState(248000);
  const [outstandingDues, setOutstandingDues] = useState(45600);

  // 2. Ledger list state
  const [transactions, setTransactions] = useState([
    { name: 'Rahul Verma', receipt: 'RCP1254', amount: 12000, date: '15 May 2025', category: 'Hostel Fees', method: 'UPI', status: 'Paid' },
    { name: 'Anjali Singh', receipt: 'RCP1253', amount: 12000, date: '15 May 2025', category: 'Hostel Fees', method: 'Net Banking', status: 'Paid' },
    { name: 'Meera Nair', receipt: 'RCP1252', amount: 12000, date: '14 May 2025', category: 'Hostel Fees', method: 'Card Payment', status: 'Paid' },
    { name: 'Vikram Das', receipt: 'RCP1251', amount: 8500, date: '12 May 2025', category: 'Mess Charges', method: 'UPI', status: 'Pending' }
  ]);

  // 3. Form State
  const [newPayment, setNewPayment] = useState({
    name: '',
    amount: '',
    category: 'Hostel Fees',
    method: 'UPI',
    status: 'Paid'
  });

  // Active receipt for popup
  const [activeReceipt, setActiveReceipt] = useState(null);

  const handleDownloadReceipt = () => {
    if (!activeReceipt) return;
    const text = `====================================================
        GOVERNMENT OF INDIA - TRAINING ACADEMY
                E-HOSTEL RECEIPT LEDGER
====================================================
Receipt No   : ${activeReceipt.receipt}
Date         : ${activeReceipt.date}
Trainee Name : ${activeReceipt.name}
Fee Category : ${activeReceipt.category}
Gateway      : ${activeReceipt.method}
Status       : ${activeReceipt.status.toUpperCase()}
----------------------------------------------------
TOTAL PAID   : INR ${activeReceipt.amount.toLocaleString('en-IN')}/-
====================================================
Thank you for your payment. This is a computer-generated 
receipt and does not require a physical signature.
====================================================`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Receipt_${activeReceipt.receipt}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!newPayment.name || !newPayment.amount) return;

    const amt = parseFloat(newPayment.amount);
    const newReceiptId = `RCP${Math.floor(1255 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    // Append to transactions list
    setTransactions([
      {
        name: newPayment.name,
        receipt: newReceiptId,
        amount: amt,
        date: dateStr,
        category: newPayment.category,
        method: newPayment.method,
        status: newPayment.status
      },
      ...transactions
    ]);

    // Recalculate summary cards
    if (newPayment.status === 'Paid') {
      setTotalCollection(prev => prev + amt);
    } else {
      setOutstandingDues(prev => prev + amt);
    }

    // Reset Form
    setNewPayment({
      name: '',
      amount: '',
      category: 'Hostel Fees',
      method: 'UPI',
      status: 'Paid'
    });

    // Open high fidelity receipt pop-up
    setActiveReceipt({
      name: newPayment.name,
      receipt: newReceiptId,
      amount: amt,
      date: dateStr,
      category: newPayment.category,
      method: newPayment.method,
      status: newPayment.status
    });
  };

  const handleResolveDues = (idx) => {
    const tx = transactions[idx];
    if (tx.status === 'Pending') {
      const updatedList = [...transactions];
      updatedList[idx] = { ...tx, status: 'Paid' };
      setTransactions(updatedList);
      setTotalCollection(prev => prev + tx.amount);
      setOutstandingDues(prev => prev - tx.amount);
      alert(`Outstanding dues cleared successfully for receipt ${tx.receipt}!`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700 font-sans">
      
      {/* Header section */}
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-base font-extrabold text-slate-800">Fee Payment & Settlement Portal</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">Collect residential fees, process mess charges, manage invoice status ledger, and reconcile outstanding trainee dues.</p>
      </div>

      {/* Reconcile summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="border border-emerald-100 bg-[#eff7f5] rounded-2xl p-5 flex justify-between items-center font-semibold shadow-3xs">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Collection (Consolidated)</p>
            <p className="text-2xl font-black text-[#08493d] mt-1 font-mono">₹ {totalCollection.toLocaleString('en-IN')}</p>
          </div>
          <span className="text-emerald-700 bg-white border border-emerald-200 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider font-mono">Paid Ledger</span>
        </div>
        
        <div className="border border-rose-100 bg-rose-50/40 rounded-2xl p-5 flex justify-between items-center font-semibold shadow-3xs">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Outstanding Mess & Hostel Dues</p>
            <p className="text-2xl font-black text-rose-700 mt-1 font-mono font-bold">₹ {outstandingDues.toLocaleString('en-IN')}</p>
          </div>
          <span className="text-rose-700 bg-white border border-rose-200 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider font-mono">Dues Invoice</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Interactive Payment Portal Form */}
        <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-5 space-y-4">
          <div>
            <h4 className="text-xs font-black uppercase text-[#08493d] tracking-wider">Record / Collect Payment</h4>
            <p className="text-[10px] text-slate-550 mt-0.5">Process rent and mess fees receipts directly into the academy ledger system.</p>
          </div>

          <form onSubmit={handleProcessPayment} className="space-y-3 font-semibold text-xs text-slate-650">
            <div className="space-y-1">
              <label className="block text-slate-700">Trainee Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Das"
                value={newPayment.name}
                onChange={(e) => setNewPayment({ ...newPayment, name: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-slate-700">Fee Category</label>
              <select
                value={newPayment.category}
                onChange={(e) => setNewPayment({ ...newPayment, category: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800"
              >
                <option value="Hostel Fees">Hostel Rent / Accommodate</option>
                <option value="Mess Charges">Mess / Canteen Dues</option>
                <option value="Security Deposit">Caution / Security Deposit</option>
                <option value="Miscellaneous">Misc Maintenance Service Charges</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-slate-700">Amount (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 8500"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-808 font-mono font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">Payment Status</label>
                <select
                  value={newPayment.status}
                  onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800"
                >
                  <option value="Paid">Cleared / Paid</option>
                  <option value="Pending">Unpaid / Invoice</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-slate-700">Transaction Gateway</label>
              <select
                value={newPayment.method}
                onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                className="w-full px-2.5 py-1.5 border border-gray-300 rounded focus:outline-none bg-white text-slate-800"
              >
                <option value="UPI">BHIM UPI / QR Code</option>
                <option value="Net Banking">Govt Net Banking / SBI Card</option>
                <option value="Card Payment">Debit / Credit Card</option>
                <option value="Treasury Challan">Govt Treasury Challan Registry</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded shadow-sm text-[11px] uppercase cursor-pointer"
            >
              Collect Fee & Print Receipt
            </button>
          </form>
        </div>

        {/* Transactions Ledger Registry */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Fee Collections Registry</h4>
          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {transactions.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3.5 bg-slate-50/50 border border-slate-150/40 rounded-xl text-xs font-semibold hover:shadow-2xs transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#eff7f5] text-[#08493d] rounded-lg border border-emerald-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-800">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono font-bold leading-normal mt-0.5">
                      Receipt: <span className="text-slate-550 font-black">{item.receipt}</span> • {item.date}
                    </p>
                    <p className="text-[9px] text-emerald-800 font-bold bg-[#eff7f5] border border-emerald-100 rounded px-1.5 py-0.2 w-max mt-1">
                      {item.category} ({item.method})
                    </p>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-1 shrink-0">
                  <p className="font-extrabold text-slate-800 font-mono text-sm">₹ {item.amount.toLocaleString('en-IN')}</p>
                  
                  {item.status === 'Paid' ? (
                    <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                      Cleared
                    </span>
                  ) : (
                    <button
                      onClick={() => handleResolveDues(idx)}
                      className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-rose-50 text-rose-800 border border-rose-200 rounded-full cursor-pointer hover:bg-rose-100"
                      title="Click to clear outstanding dues"
                    >
                      Clear Dues
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
      {/* Receipt Pop-up Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4 font-sans text-xs">
            
            {/* Modal Header */}
            <div className="bg-[#053229] text-white p-4.5 flex justify-between items-center">
              <h3 className="font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Fee Receipt Generated
              </h3>
              <button onClick={() => setActiveReceipt(null)} className="text-slate-300 hover:text-white focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Receipt Body - High Fidelity Govt Style */}
            <div className="p-6 space-y-6 text-slate-700 font-semibold relative">
              {/* Decorative background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none select-none">
                <span className="text-[#08493d] font-black text-6xl tracking-widest uppercase transform -rotate-12">LMS</span>
              </div>
              
              <div className="text-center border-b border-dashed border-slate-200 pb-4">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest leading-none">GOVERNMENT OF INDIA</p>
                <h4 className="text-sm font-extrabold text-[#08493d] tracking-tight mt-1">NATIONAL STATISTICAL SYSTEM TRAINING ACADEMY</h4>
                <p className="text-[9px] text-slate-450 mt-0.5">Greater Noida, Uttar Pradesh, 201310</p>
              </div>

              {/* Receipt metadata grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-b border-dashed border-slate-200 pb-4 leading-relaxed">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Receipt Number</p>
                  <p className="font-mono text-slate-800 font-bold">{activeReceipt.receipt}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Transaction Date</p>
                  <p className="text-slate-800 font-extrabold">{activeReceipt.date}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Trainee Officer</p>
                  <p className="text-slate-800 font-extrabold">{activeReceipt.name}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Payment Gateway</p>
                  <p className="text-slate-800 font-extrabold">{activeReceipt.method}</p>
                </div>
              </div>

              {/* Item ledger list */}
              <div className="space-y-2 pb-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Description / Head of Account</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-150 rounded-xl">
                  <div>
                    <p className="font-bold text-slate-800">{activeReceipt.category}</p>
                    <p className="text-[9px] text-slate-400">Quarter allotment charge dues</p>
                  </div>
                  <span className="font-mono font-bold text-slate-800">₹ {activeReceipt.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Status and Total */}
              <div className="flex justify-between items-center bg-[#eff7f5] border border-emerald-100 p-4 rounded-xl">
                <div>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Ledger Settlement</p>
                  <span className="inline-block bg-white text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[8px] font-black uppercase mt-0.5 tracking-wider">
                    {activeReceipt.status === 'Paid' ? 'Reconciled / Cleared' : 'Pending Invoice'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Amount Paid</p>
                  <p className="font-mono font-black text-lg text-[#08493d]">₹ {activeReceipt.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Signature section */}
              <div className="flex justify-between items-end pt-2 text-[8.5px] text-slate-400 font-bold">
                <div>
                  <p>Computer-generated E-Receipt</p>
                  <p className="mt-0.5">No physical signature required</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  {/* Mock security barcode stamp representation */}
                  <div className="w-16 h-3 bg-slate-200 flex gap-0.5 mb-1 overflow-hidden shrink-0">
                    <div className="w-0.5 bg-slate-700 h-full"></div>
                    <div className="w-1 bg-slate-700 h-full"></div>
                    <div className="w-0.5 bg-slate-700 h-full"></div>
                    <div className="w-1.5 bg-slate-700 h-full"></div>
                    <div className="w-0.5 bg-slate-700 h-full"></div>
                    <div className="w-2 bg-slate-700 h-full"></div>
                  </div>
                  <span>Treasury Division Console</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3 border-t border-slate-100 select-none">
                <button
                  type="button"
                  onClick={() => setActiveReceipt(null)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-xl cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="w-1/2 py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
