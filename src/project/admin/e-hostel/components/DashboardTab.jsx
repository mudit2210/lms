import React, { useState } from 'react';

export default function DashboardTab({ 
  setActiveSidebarTab, 
  setShowDetailsModal, 
  setShowAllotModal,
  setShowTicketModal,
  allotments = [], 
  tickets = [] 
}) {
  const [activeSubTab, setActiveSubTab] = useState('ehostel'); // ehostel, logistics
  const [searchAllot, setSearchAllot] = useState('');

  // Allotments filtering
  const filteredAllotments = allotments.filter(item => {
    const query = searchAllot.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.program.toLowerCase().includes(query) ||
      item.room.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'checked in':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'checked out':
        return 'bg-slate-100 text-slate-600 border border-gray-200';
      case 'reserved':
        return 'bg-amber-50 text-amber-700 border border-amber-250';
      default:
        return 'bg-slate-50 text-slate-600';
    }
  };

  const getTicketStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'in progress':
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-250';
      default:
        return 'bg-slate-150 text-slate-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-rose-600 font-bold';
      case 'medium':
        return 'text-amber-600 font-bold';
      case 'low':
        return 'text-emerald-600 font-bold';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans select-none">
      {/* 1. Header Tab Selector */}
      <div className="flex border-b border-slate-200/80 pb-0.5 mb-6 text-xs sm:text-sm">
        <button 
          onClick={() => setActiveSubTab('ehostel')}
          className={`pb-3 px-5 font-black border-b-2.5 transition-all duration-150 cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'ehostel' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          e-Hostel Overview
        </button>
        <button 
          onClick={() => setActiveSubTab('logistics')}
          className={`pb-3 px-5 font-black border-b-2.5 transition-all duration-150 cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'logistics' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Logistics Overview
        </button>
      </div>

      {activeSubTab === 'ehostel' ? (
        <>
          {/* 2. e-Hostel Metrics Row (5 Cards) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Metric 1: Total Rooms */}
            <div className="bg-white rounded-2xl shadow-3xs border border-slate-100 p-4.5 flex items-center hover:shadow-xs hover:border-blue-150 transition-all text-left group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 border border-blue-100">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm13-6h-8v7H4V6H2v13h2v-2h16v2h2v-9a3 3 0 0 0-3-3z"/>
                </svg>
              </div>
              <div className="flex-grow ml-3.5 min-w-0">
                <p className="text-[11px] font-bold text-slate-500 tracking-tight leading-none">Total Rooms</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">120</h3>
                <button 
                  onClick={() => setShowDetailsModal('total')}
                  className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 hover:underline mt-1.5 block cursor-pointer transition-colors text-left"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Metric 2: Occupied Rooms */}
            <div className="bg-white rounded-2xl shadow-3xs border border-slate-100 p-4.5 flex items-center hover:shadow-xs hover:border-emerald-150 transition-all text-left group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 border border-emerald-100">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm13-6h-8v7H4V6H2v13h2v-2h16v2h2v-9a3 3 0 0 0-3-3z"/>
                </svg>
              </div>
              <div className="flex-grow ml-3.5 min-w-0">
                <p className="text-[11px] font-bold text-slate-500 tracking-tight leading-none">Occupied Rooms</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">98</h3>
                <button 
                  onClick={() => setShowDetailsModal('occupied')}
                  className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 hover:underline mt-1.5 block cursor-pointer transition-colors text-left"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Metric 3: Available Rooms */}
            <div className="bg-white rounded-2xl shadow-3xs border border-slate-100 p-4.5 flex items-center hover:shadow-xs hover:border-amber-150 transition-all text-left group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-amber-50 text-amber-600 border border-amber-100">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm13-6h-8v7H4V6H2v13h2v-2h16v2h2v-9a3 3 0 0 0-3-3z"/>
                </svg>
              </div>
              <div className="flex-grow ml-3.5 min-w-0">
                <p className="text-[11px] font-bold text-slate-500 tracking-tight leading-none">Available Rooms</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">22</h3>
                <button 
                  onClick={() => setShowDetailsModal('available')}
                  className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 hover:underline mt-1.5 block cursor-pointer transition-colors text-left"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Metric 4: Today Check-outs */}
            <div className="bg-white rounded-2xl shadow-3xs border border-slate-100 p-4.5 flex items-center hover:shadow-xs hover:border-purple-150 transition-all text-left group">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-purple-50 text-purple-600 border border-purple-100">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
                </svg>
              </div>
              <div className="flex-grow ml-3.5 min-w-0">
                <p className="text-[11px] font-bold text-slate-500 tracking-tight leading-none">Today Check-outs</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">12</h3>
                <button 
                  onClick={() => setShowDetailsModal('checkouts')}
                  className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 hover:underline mt-1.5 block cursor-pointer transition-colors text-left"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Metric 5: Pending Payments */}
            <div className="bg-white rounded-2xl shadow-3xs border border-slate-100 p-4.5 flex items-center hover:shadow-xs hover:border-teal-150 transition-all text-left group col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-teal-50 text-teal-600 border border-teal-100">
                <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12M6 8h12M6 13h10M6 3c5 0 8 3 8 5 0 5-8 5-8 5M18 13L9 22"/>
                </svg>
              </div>
              <div className="flex-grow ml-3.5 min-w-0">
                <p className="text-[11px] font-bold text-slate-500 tracking-tight leading-none">Pending Payments</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-850 tracking-tight mt-1 font-sans">₹ 45,600</h3>
                <button 
                  onClick={() => setShowDetailsModal('payments')}
                  className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 hover:underline mt-1.5 block cursor-pointer transition-colors text-left"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* 3. Middle Core Widgets (3 columns) */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Widget 1: Room Allotment (Grid Col span 2) */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-800">Room Allotment</h3>
                  <button 
                    onClick={() => setShowAllotModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-3xs cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Allot New Room
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <input 
                      type="text" 
                      placeholder="Search by Name / Program / Room No." 
                      value={searchAllot}
                      onChange={e => setSearchAllot(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-slate-800"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className="p-2 border border-slate-200 hover:border-slate-300 rounded-xl bg-white hover:bg-slate-50 text-slate-500 cursor-pointer flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </button>
                </div>

                {/* Allotments Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-slate-400 font-bold text-[9.5px]">
                      <tr>
                        <th className="p-3">Trainee Name</th>
                        <th className="p-3">Program</th>
                        <th className="p-3">Room No.</th>
                        <th className="p-3">Check-in</th>
                        <th className="p-3">Check-out</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                      {filteredAllotments.slice(0, 5).map(allot => (
                        <tr key={allot.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-extrabold text-slate-850">{allot.name}</td>
                          <td className="p-3 text-slate-500">{allot.program}</td>
                          <td className="p-3 font-bold font-mono text-[#08493d]">{allot.room}</td>
                          <td className="p-3 text-slate-500">{allot.checkin}</td>
                          <td className="p-3 text-slate-500">{allot.checkout}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase border ${getStatusBadge(allot.status)}`}>
                              {allot.status}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <button className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer focus:outline-none">
                              <svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button 
                onClick={() => setActiveSidebarTab('room_allotment')} 
                className="text-xs font-extrabold text-blue-600 hover:underline block text-center w-full pt-3 border-t border-slate-100 cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Widget 2: Check-in / Check-out Tracking */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-4">
                <div className="border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-800">Check-in / Check-out Tracking</h3>
                </div>

                {/* 2 mini stats cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9.5px] font-bold text-slate-500 uppercase leading-none">Today Check-ins</p>
                      <p className="text-base font-black text-emerald-800 mt-1">18</p>
                    </div>
                  </div>
                  <div className="bg-rose-50 border border-rose-100 p-3 rounded-xl flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9.5px] font-bold text-slate-500 uppercase leading-none">Today Check-outs</p>
                      <p className="text-base font-black text-rose-800 mt-1">12</p>
                    </div>
                  </div>
                </div>
                {/* Occupied row banner */}
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-500 font-bold">
                    <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Currently Occupied</span>
                  </div>
                  <span className="font-black text-slate-800 text-sm">98</span>
                </div>

                {/* Recent Activity Mini List */}
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Recent Activity</p>
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {[
                      { name: 'Rahul Verma', status: 'Checked In', time: '15 May 2025 10:30 AM', color: 'bg-emerald-500' },
                      { name: 'Vikram Das', status: 'Checked Out', time: '15 May 2025 09:15 AM', color: 'bg-slate-400' },
                      { name: 'Anjali Singh', status: 'Checked In', time: '15 May 2025 11:45 AM', color: 'bg-emerald-500' },
                      { name: 'Meera Nair', status: 'Checked In', time: '15 May 2025 02:20 PM', color: 'bg-emerald-500' }
                    ].map((act, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5 border-b border-slate-50 hover:bg-slate-50/50 transition-colors rounded-lg px-1.5">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/40">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-baseline">
                            <span className="font-extrabold text-slate-800 text-xs truncate">{act.name}</span>
                            <span className="text-[9px] text-slate-400 font-semibold shrink-0">{act.time.split(' ').slice(2).join(' ')}</span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${act.color}`}></span>
                            <span className="text-[10px] text-slate-500 font-semibold">{act.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setActiveSidebarTab('check_in_out')}
                className="text-xs font-extrabold text-blue-600 hover:underline block text-center w-full pt-3 border-t border-slate-100 cursor-pointer font-sans"
              >
                View All Activity
              </button>
            </div>

            {/* Widget 3: Payment Receipts */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-800">Payment Receipts</h3>
                  <button 
                    onClick={() => setActiveSidebarTab('payments')} 
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-extrabold cursor-pointer focus:outline-none"
                  >
                    View All
                  </button>
                </div>

                {/* Receipts Stack */}
                <div className="space-y-3 pt-1">
                  {[
                    { name: 'Rahul Verma', rcpt: 'RCP1254', amount: '₹ 12,000', date: '15 May 2025' },
                    { name: 'Anjali Singh', rcpt: 'RCP1253', amount: '₹ 12,000', date: '15 May 2025' },
                    { name: 'Meera Nair', rcpt: 'RCP1252', amount: '₹ 12,000', date: '14 May 2025' },
                    { name: 'Arun Patel', rcpt: 'RCP1251', amount: '₹ 12,000', date: '14 May 2025' }
                  ].map((rcpt, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/50 hover:bg-slate-100/30 rounded-xl border border-slate-100 flex justify-between items-center gap-3 transition-all duration-150">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/40">
                          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-855 text-xs leading-none">{rcpt.name}</p>
                          <p className="text-[9.5px] text-slate-455 mt-1 font-semibold font-mono">Receipt No: {rcpt.rcpt}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-slate-800 text-xs leading-none font-sans">{rcpt.amount}</p>
                        <p className="text-[9px] text-emerald-600 font-extrabold mt-1 uppercase tracking-wider">Paid</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setActiveSidebarTab('payments')} 
                className="text-xs font-extrabold text-blue-600 hover:underline block text-center w-full pt-3 border-t border-slate-100 cursor-pointer"
              >
                View All Receipts
              </button>
            </div>

          </div>

          {/* 4. Bottom Row (3 equal-width columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Venue Scheduling */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-800">Venue Scheduling</h3>
                  <button 
                    onClick={() => setActiveSidebarTab('venue_scheduling')} 
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-extrabold cursor-pointer"
                  >
                    View Calendar
                  </button>
                </div>

                <div className="space-y-3.5 pt-1">
                  {[
                    { title: 'Leadership Program Inauguration', hall: 'Main Auditorium', time: '09:00 AM - 11:00 AM', date: '15 MAY', status: 'Confirmed' },
                    { title: 'Policy Workshop', hall: 'Seminar Hall - 2', time: '02:00 PM - 05:00 PM', date: '15 MAY', status: 'Confirmed' },
                    { title: 'Group Discussion', hall: 'Conference Hall', time: '10:00 AM - 12:00 PM', date: '16 MAY', status: 'Pending' }
                  ].map((evt, idx) => (
                    <div key={idx} className="flex gap-3 hover:bg-slate-50/40 p-1.5 rounded-xl transition-colors">
                      <div className="bg-slate-100 border border-slate-200 rounded-xl text-center p-2 min-w-[50px] shrink-0 font-extrabold flex flex-col justify-center">
                        <span className="text-sm text-slate-800 leading-none">{evt.date.split(' ')[0]}</span>
                        <span className="text-[8.5px] text-slate-400 mt-1 uppercase tracking-wider">{evt.date.split(' ')[1]}</span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-extrabold text-slate-805 text-xs truncate leading-snug">{evt.title}</p>
                        <p className="text-[10px] text-slate-455 mt-0.5 truncate">{evt.hall}</p>
                        <p className="text-[9.5px] text-slate-400 mt-1">{evt.time}</p>
                      </div>
                      <div className="shrink-0 flex items-center">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wide border ${
                          evt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-250'
                        }`}>{evt.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setActiveSidebarTab('venue_scheduling')} 
                className="text-xs font-extrabold text-blue-600 hover:underline block text-center w-full pt-3 border-t border-slate-100 cursor-pointer animate-pulse-slow"
              >
                View All Schedule
              </button>
            </div>

            {/* Column 2: Classroom Allocation */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-805">Classroom Allocation</h3>
                  <button 
                    onClick={() => setActiveSidebarTab('classroom_allocation')} 
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-extrabold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
                    <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-slate-400 font-bold text-[9.5px]">
                      <tr>
                        <th className="p-2">Room Name</th>
                        <th className="p-2">Capacity</th>
                        <th className="p-2">Allocated For</th>
                        <th className="p-2">Date & Time</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                      {[
                        { room: 'Classroom 1', cap: 30, prog: 'Governance Program', time: '15 May 2025 09:00 - 11:00 AM', status: 'Allocated' },
                        { room: 'Classroom 2', cap: 40, prog: 'Public Policy Program', time: '15 May 2025 02:00 - 05:00 PM', status: 'Allocated' },
                        { room: 'Seminar Hall', cap: 60, prog: 'Leadership Program', time: '16 May 2025 10:00 - 01:00 PM', status: 'Allocated' },
                        { room: 'Smart Class 1', cap: 25, prog: 'Group Discussion', time: '16 May 2025 02:00 - 04:00 PM', status: 'Pending' }
                      ].map((classAlloc, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="p-2 font-extrabold text-slate-855">{classAlloc.room}</td>
                          <td className="p-2 text-slate-800 font-bold font-mono">{classAlloc.cap}</td>
                          <td className="p-2 text-[10px] leading-tight font-extrabold text-[#08493d]">{classAlloc.prog}</td>
                          <td className="p-2 text-[9.5px] leading-tight text-slate-455">{classAlloc.time}</td>
                          <td className="p-2">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wide border ${
                              classAlloc.status === 'Allocated' ? 'bg-emerald-50 text-emerald-700 border-emerald-250' : 'bg-amber-50 text-amber-700 border-amber-250'
                            }`}>{classAlloc.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button 
                onClick={() => setActiveSidebarTab('classroom_allocation')} 
                className="text-xs font-extrabold text-blue-600 hover:underline block text-center w-full pt-3 border-t border-slate-100 cursor-pointer"
              >
                View All Allocations
              </button>
            </div>

            {/* Column 3: Maintenance Tickets */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-3xs p-5 flex flex-col justify-between text-left space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <h3 className="text-sm font-extrabold text-slate-800">Maintenance Tickets</h3>
                  <button 
                    onClick={() => setActiveSidebarTab('tickets')} 
                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-extrabold cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-semibold text-slate-655">
                    <thead className="bg-slate-50 border-b border-slate-200 uppercase tracking-wider text-slate-400 font-bold text-[9.5px]">
                      <tr>
                        <th className="p-2">Ticket ID</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Description</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Priority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                      {tickets.slice(0, 4).map(ticket => (
                        <tr key={ticket.id} className="hover:bg-slate-50/50">
                          <td className="p-2 font-mono font-bold text-slate-500">{ticket.id}</td>
                          <td className="p-2 text-[10px] truncate max-w-[80px]">{ticket.category}</td>
                          <td className="p-2 font-bold text-slate-800 truncate max-w-[120px]">{ticket.description}</td>
                          <td className="p-2">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wide border ${getTicketStatusBadge(ticket.status)}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <span className={getPriorityColor(ticket.priority)}>
                              {ticket.priority}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button 
                onClick={() => setShowTicketModal(true)} 
                className="text-xs font-extrabold text-blue-600 hover:underline block text-center w-full pt-3 border-t border-slate-100 cursor-pointer"
              >
                Raise New Ticket
              </button>
            </div>

          </div>
        </>
      ) : (
        /* Logistics Overview Sub-Tab */
        <div className="space-y-6 animate-fadeIn text-left">
          
          {/* Metrics summary widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-450 font-black uppercase tracking-widest">Active Transits</p>
              <p className="text-3xl font-black text-slate-800 mt-1">2 Active</p>
              <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">✓ Driver GPS Live Streams</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase tracking-widest">Dining Meal Counter</p>
              <p className="text-3xl font-black text-slate-800 mt-1">140 Nominated</p>
              <p className="text-[10px] text-blue-600 mt-1.5 font-bold">✓ Canteen dining buffers mapped</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase tracking-widest">Available Fleets</p>
              <p className="text-3xl font-black text-slate-800 mt-1">3 Vehicles</p>
              <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">✓ Cryptographically Sealed Registry</p>
            </div>
          </div>

          {/* Quick links grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border p-5 shadow-3xs space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="font-extrabold text-slate-800 text-sm">Transport Logs & Fleets</h4>
                <button 
                  onClick={() => setActiveSidebarTab('transport_management')} 
                  className="text-xs text-blue-600 hover:underline font-bold"
                >
                  Manage Fleets
                </button>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed font-semibold">Active airport shuttles and driver mapping catalogs. Ensure smooth commutes for delegated officers.</p>
              <button 
                onClick={() => setActiveSidebarTab('transport_management')}
                className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 border text-slate-700 font-extrabold text-xs rounded-xl shadow-3xs cursor-pointer transition-colors"
              >
                Go to Transport Management Desk
              </button>
            </div>

            <div className="bg-white rounded-2xl border p-5 shadow-3xs space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h4 className="font-extrabold text-slate-800 text-sm">Mess Dining & Meal Plans</h4>
                <button 
                  onClick={() => setActiveSidebarTab('mess_management')} 
                  className="text-xs text-blue-600 hover:underline font-bold"
                >
                  Review Plans
                </button>
              </div>
              <p className="text-xs text-slate-450 leading-relaxed font-semibold">Audit mess daily dining statistics and structural food charts. Update dining allocations.</p>
              <button 
                onClick={() => setActiveSidebarTab('mess_management')}
                className="w-full text-center py-2 bg-slate-50 hover:bg-slate-100 border text-slate-700 font-extrabold text-xs rounded-xl shadow-3xs cursor-pointer transition-colors"
              >
                Go to Canteen Mess Desk
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
