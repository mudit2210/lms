import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './side_bar';

export default function Home() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };
  const [activeSidebarTab, setActiveSidebarTab] = useState('dashboard');
  
  // Profile & Notification Dropdown States
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Modals States
  const [showAllotModal, setShowAllotModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null); // 'total', 'occupied', 'available', 'checkouts', 'payments'

  // Dynamic Data States
  const [searchTerm, setSearchTerm] = useState('');
  const [allotments, setAllotments] = useState([
    { id: 1, name: 'Rahul Verma', program: 'Leadership Program', room: 'H-204', checkin: '15 May 2025', checkout: '22 May 2025', status: 'Checked In' },
    { id: 2, name: 'Anjali Singh', program: 'Public Policy Program', room: 'H-105', checkin: '16 May 2025', checkout: '23 May 2025', status: 'Checked In' },
    { id: 3, name: 'Vikram Das', program: 'Governance Program', room: 'H-206', checkin: '15 May 2025', checkout: '21 May 2025', status: 'Checked Out' },
    { id: 4, name: 'Meera Nair', program: 'Leadership Program', room: 'H-302', checkin: '17 May 2025', checkout: '24 May 2025', status: 'Checked In' },
    { id: 5, name: 'Arun Patel', program: 'Public Policy Program', room: 'H-110', checkin: '18 May 2025', checkout: '25 May 2025', status: 'Reserved' }
  ]);

  const [tickets, setTickets] = useState([
    { id: 'MTK1254', category: 'Hostel Facility', description: 'AC not working in Room H-204', status: 'Open', priority: 'High' },
    { id: 'MTK1253', category: 'Classroom', description: 'Projector not working in Class 2', status: 'In Progress', priority: 'Medium' },
    { id: 'MTK1252', category: 'Hostel Facility', description: 'Water leakage in Bathroom', status: 'Open', priority: 'High' },
    { id: 'MTK1251', category: 'Classroom', description: 'Chair broken in Seminar Hall', status: 'Resolved', priority: 'Low' }
  ]);

  // Form States
  const [newAllotment, setNewAllotment] = useState({ name: '', program: 'Leadership Program', room: '', checkin: '', checkout: '' });
  const [newTicket, setNewTicket] = useState({ category: 'Hostel Facility', description: '', priority: 'High' });

  // Filtering allotments
  const filteredAllotments = allotments.filter(allot => {
    return allot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           allot.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
           allot.room.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Handle forms submissions
  const handleAllotSubmit = (e) => {
    e.preventDefault();
    if (!newAllotment.name || !newAllotment.room || !newAllotment.checkin || !newAllotment.checkout) {
      alert('Please fill out all allotment details.');
      return;
    }
    const newId = allotments.length + 1;
    setAllotments([
      ...allotments,
      {
        id: newId,
        name: newAllotment.name,
        program: newAllotment.program,
        room: newAllotment.room,
        checkin: newAllotment.checkin,
        checkout: newAllotment.checkout,
        status: 'Reserved'
      }
    ]);
    setNewAllotment({ name: '', program: 'Leadership Program', room: '', checkin: '', checkout: '' });
    setShowAllotModal(false);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!newTicket.description) {
      alert('Please provide a ticket description.');
      return;
    }
    const newId = `MTK${Math.floor(1000 + Math.random() * 9000)}`;
    setTickets([
      {
        id: newId,
        category: newTicket.category,
        description: newTicket.description,
        status: 'Open',
        priority: newTicket.priority
      },
      ...tickets
    ]);
    setNewTicket({ category: 'Hostel Facility', description: '', priority: 'High' });
    setShowTicketModal(false);
  };

  const deleteAllotment = (id) => {
    if (window.confirm("Are you sure you want to remove this room allotment?")) {
      setAllotments(allotments.filter(item => item.id !== id));
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-100 flex font-sans relative">
      
      {/* 1. Sidebar Component on the Left */}
      <SideBar 
        activeTab={activeSidebarTab} 
        setActiveTab={setActiveSidebarTab} 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onRaiseTicket={() => setShowTicketModal(true)}
      />

      {/* Backdrop overlay for mobile drawer */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* 2. Main Dashboard panel on the Right */}
      <div className="flex-grow flex flex-col min-h-screen overflow-hidden w-full">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-250 py-3.5 px-4 sm:px-8 flex justify-between items-center select-none shadow-2xs relative z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
              e-Hostel & Logistics Management System
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
                className="p-1.5 rounded-full hover:bg-slate-150 text-slate-600 transition-colors relative cursor-pointer focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-650 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
                  8
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2.5 w-80 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-40 text-xs text-slate-700 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100 font-extrabold text-slate-800 flex justify-between items-center">
                    <span>Recent Notifications</span>
                    <span className="text-[10px] text-emerald-800 hover:underline cursor-pointer">Clear all</span>
                  </div>
                  <ul className="divide-y divide-gray-50 max-h-64 overflow-y-auto font-medium">
                    <li className="px-4 py-2.5 hover:bg-slate-50 flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-bold">Rahul Verma Checked In</p>
                        <p className="text-[9px] text-slate-400">15 May 2025 • 10:30 AM</p>
                      </div>
                    </li>
                    <li className="px-4 py-2.5 hover:bg-slate-50 flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-bold">Anjali Singh Checked In</p>
                        <p className="text-[9px] text-slate-400">15 May 2025 • 11:45 AM</p>
                      </div>
                    </li>
                    <li className="px-4 py-2.5 hover:bg-slate-50 flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-rose-600 rounded-full mt-1.5"></div>
                      <div>
                        <p className="font-bold">New Ticket: AC not working</p>
                        <p className="text-[9px] text-slate-400">15 May 2025 • 09:30 AM</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 border border-gray-200 rounded-xl transition-colors cursor-pointer focus:outline-none"
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Arun Kumar avatar" 
                  className="w-8 h-8 rounded-full border border-slate-300"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-800">Arun Kumar</p>
                  <p className="text-[9px] text-slate-400 font-semibold uppercase leading-none">Administrator</p>
                </div>
                <svg className={`w-4.5 h-4.5 text-slate-500 transform transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-40 text-xs text-slate-700 font-semibold animate-fadeIn">
                  <div className="px-4 py-2 border-b border-gray-100 bg-slate-50/50">
                    <p className="font-extrabold text-slate-800">Arun Kumar</p>
                    <p className="text-[10px] text-slate-400">admin@lms.academy</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors">Profile Details</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors">System Settings</button>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 border-t border-gray-100 text-rose-700 hover:bg-rose-50 font-bold transition-colors cursor-pointer">Sign Out</button>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* Outer Dashboard Area */}
        <main className="flex-grow p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-65px)]">

          {activeSidebarTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Total Rooms */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Rooms</p>
                      <h3 className="text-2xl font-extrabold text-slate-800">120</h3>
                    </div>
                    <div className="p-3 bg-[#eff7f5] text-[#08493d] rounded-xl">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                      </svg>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailsModal('total')} className="text-[10px] font-bold text-[#08493d] hover:text-emerald-800 mt-4 text-left hover:underline">
                    View Details
                  </button>
                </div>
                {/* 2. Occupied Rooms */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Occupied Rooms</p>
                      <h3 className="text-2xl font-extrabold text-slate-800">98</h3>
                    </div>
                    <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                      </svg>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailsModal('occupied')} className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 mt-4 text-left hover:underline">
                    View Details
                  </button>
                </div>
                {/* 3. Available Rooms */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available Rooms</p>
                      <h3 className="text-2xl font-extrabold text-slate-800">22</h3>
                    </div>
                    <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailsModal('available')} className="text-[10px] font-bold text-amber-750 hover:text-amber-900 mt-4 text-left hover:underline">
                    View Details
                  </button>
                </div>
                {/* 4. Today Check-outs */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today Check-outs</p>
                      <h3 className="text-2xl font-extrabold text-slate-800">12</h3>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-700 rounded-xl">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                  </div>
                  <button onClick={() => setShowDetailsModal('checkouts')} className="text-[10px] font-bold text-purple-700 hover:text-purple-900 mt-4 text-left hover:underline">
                    View Details
                  </button>
                </div>
                {/* 5. Pending Payments */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Payments</p>
                      <h3 className="text-2xl font-extrabold text-slate-800 font-sans">₹ 45,600</h3>
                    </div>
                    <div className="p-3 bg-teal-50 text-teal-700 rounded-xl font-bold">₹</div>
                  </div>
                  <button onClick={() => setShowDetailsModal('payments')} className="text-[10px] font-bold text-teal-700 hover:text-teal-900 mt-4 text-left hover:underline">
                    View Details
                  </button>
                </div>
              </div>

              {/* Grid: Activities and Schedules */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Check-ins activity feed */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800">Check-in Tracker</h3>
                  <div className="space-y-3 font-medium text-xs">
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span className="font-bold text-slate-700">Rahul Verma</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Checked In • H-204</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                        <span className="font-bold text-slate-700">Vikram Das</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Checked Out • H-206</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        <span className="font-bold text-slate-700">Anjali Singh</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Checked In • H-105</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveSidebarTab('check_in_out')} className="text-xs font-bold text-[#08493d] hover:underline block text-center w-full pt-1.5 border-t border-gray-100">
                    View Full Logs →
                  </button>
                </div>

                {/* Venue Scheduling summary */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800">Venue Scheduling</h3>
                  <div className="space-y-3 font-medium text-xs">
                    <div className="flex gap-2">
                      <div className="bg-slate-100 border border-slate-200 rounded text-center p-1 min-w-[32px] font-bold text-slate-700">
                        15
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">ISS Inauguration</p>
                        <p className="text-[10px] text-slate-400">Main Aud. • 09:00 AM</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-slate-100 border border-slate-200 rounded text-center p-1 min-w-[32px] font-bold text-slate-700">
                        15
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Policy Workshop</p>
                        <p className="text-[10px] text-slate-400">Seminar Hall 2 • 02:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setActiveSidebarTab('venue_scheduling')} className="text-xs font-bold text-[#08493d] hover:underline block text-center w-full pt-1.5 border-t border-gray-100">
                    View Calendar →
                  </button>
                </div>

                {/* Open Tickets summary */}
                <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-5 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800">Maintenance Tickets</h3>
                  <div className="space-y-3 font-medium text-xs">
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
                      <span className="font-mono text-[10px] font-bold text-slate-500">MTK1254</span>
                      <span className="font-bold text-slate-800 truncate max-w-[120px]">AC Not Working</span>
                      <span className="text-[9px] font-bold bg-rose-50 text-rose-700 px-2 py-0.2 rounded border border-rose-200">Open</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-gray-100">
                      <span className="font-mono text-[10px] font-bold text-slate-500">MTK1253</span>
                      <span className="font-bold text-slate-800 truncate max-w-[120px]">Projector broken</span>
                      <span className="text-[9px] font-bold bg-amber-50 text-amber-700 px-2 py-0.2 rounded border border-amber-200">Pending</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveSidebarTab('tickets')} className="text-xs font-bold text-[#08493d] hover:underline block text-center w-full pt-1.5 border-t border-gray-100">
                    View All Tickets →
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSidebarTab === 'room_allotment' && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">Room Allotment List</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Assign residential hostel rooms to active academy trainees.</p>
                </div>
                
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
                      className="w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-[#08493d] text-xs font-semibold"
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
              </div>

              {/* Room Allotment Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="px-4 py-3">Trainee Name</th>
                      <th className="px-4 py-3">Program</th>
                      <th className="px-4 py-3">Room No.</th>
                      <th className="px-4 py-3">Check-in</th>
                      <th className="px-4 py-3">Check-out</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
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
                              allot.status === 'Checked Out' ? 'bg-slate-100 text-slate-500 border border-slate-200' :
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
                        <td colSpan="7" className="text-center py-8 text-slate-400">
                          No allotments found matching "{searchTerm}"
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSidebarTab === 'check_in_out' && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">Check-in / Check-out Logs</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Track and verify check-in timings and checkout logs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Today Check-ins</p>
                  <p className="text-2xl font-extrabold text-emerald-950 mt-1">18</p>
                </div>
                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">Today Check-outs</p>
                  <p className="text-2xl font-extrabold text-rose-950 mt-1">12</p>
                </div>
                <div className="bg-[#eff7f5] border border-emerald-100 rounded-xl p-4 text-center">
                  <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Occupied Rooms</p>
                  <p className="text-2xl font-extrabold text-emerald-950 mt-1">98 / 120</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Recent Activity Ledger</h4>
                <div className="divide-y divide-gray-100 border border-gray-150 rounded-xl overflow-hidden text-xs">
                  {[
                    { name: 'Rahul Verma', status: 'Checked In', time: '15 May 2025 • 10:30 AM', room: 'Room H-204' },
                    { name: 'Vikram Das', status: 'Checked Out', time: '15 May 2025 • 09:15 AM', room: 'Room H-206' },
                    { name: 'Anjali Singh', status: 'Checked In', time: '15 May 2025 • 11:45 AM', room: 'Room H-105' },
                    { name: 'Suresh Kumar', status: 'Checked In', time: '14 May 2025 • 02:00 PM', room: 'Room H-112' },
                    { name: 'Meera Nair', status: 'Checked In', time: '14 May 2025 • 04:30 PM', room: 'Room H-302' }
                  ].map((act, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3.5 hover:bg-slate-50/50 font-semibold text-slate-700">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${act.status === 'Checked In' ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                        <div>
                          <p className="font-extrabold text-slate-800">{act.name}</p>
                          <p className="text-[9px] text-slate-400 font-normal">{act.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-slate-800 font-bold">{act.room}</p>
                        <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full inline-block mt-0.5 ${
                          act.status === 'Checked In' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                        }`}>{act.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSidebarTab === 'payments' && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">Payments & Receipts Ledger</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage fees collections, pending hostel dues, and dining receipts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 bg-slate-50 rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Collection</p>
                    <p className="text-xl font-extrabold text-slate-800 mt-1">₹ 2,48,000</p>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded text-xs font-bold font-mono">Paid</span>
                </div>
                <div className="border border-gray-200 bg-slate-50 rounded-xl p-4 flex justify-between items-center">
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
          )}

          {activeSidebarTab === 'tickets' && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-4 animate-fadeIn">
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
          )}

          {activeSidebarTab === 'venue_scheduling' && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">Venue Scheduling & Booking</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Manage allocations of conference halls, auditoriums, and seminar classrooms.</p>
              </div>

              <div className="space-y-4">
                {[
                  { day: '15', month: 'MAY', title: 'Leadership Program Inauguration', room: 'Main Auditorium', time: '09:00 AM - 11:00 AM', status: 'Confirmed' },
                  { day: '15', month: 'MAY', title: 'Policy Workshop', room: 'Seminar Hall - 2', time: '02:00 PM - 05:00 PM', status: 'Confirmed' },
                  { day: '16', month: 'MAY', title: 'Group Discussion', room: 'Conference Hall', time: '10:00 AM - 12:00 PM', status: 'Pending' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start text-xs font-semibold p-4 bg-slate-50 border border-gray-150 rounded-xl">
                    <div className="bg-[#053229] border border-emerald-900 rounded-lg p-2 text-center min-w-[45px] text-white">
                      <p className="text-base font-extrabold leading-none">{item.day}</p>
                      <p className="text-[9px] font-bold mt-1 tracking-wider uppercase">{item.month}</p>
                    </div>
                    <div className="space-y-1 flex-grow">
                      <p className="text-sm font-extrabold text-slate-850 leading-tight">{item.title}</p>
                      <p className="text-xs text-slate-500 font-medium">{item.room} • {item.time}</p>
                      <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 ${
                        item.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSidebarTab === 'classroom_allocation' && (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-base font-extrabold text-slate-800">Classroom Allocation Ledger</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">View capacities and active batches enrolled across statistics classrooms.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-semibold text-slate-700">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 font-bold uppercase">
                      <th className="px-4 py-3">Classroom Name</th>
                      <th className="px-4 py-3">Beds / Seat Capacity</th>
                      <th className="px-4 py-3">Assigned Program</th>
                      <th className="px-4 py-3">Allocation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[
                      { name: 'Classroom 1', cap: 30, program: 'Governance', status: 'Allocated' },
                      { name: 'Classroom 2', cap: 40, program: 'Public Policy', status: 'Allocated' },
                      { name: 'Seminar Hall', cap: 60, program: 'Leadership', status: 'Allocated' },
                      { name: 'Smart Class 1', cap: 25, program: 'Discussion', status: 'Pending' }
                    ].map((room, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="px-4 py-3.5 font-extrabold text-slate-850">{room.name}</td>
                        <td className="px-4 py-3.5 text-slate-600 font-mono font-bold">{room.cap}</td>
                        <td className="px-4 py-3.5 text-slate-600">{room.program}</td>
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            room.status === 'Allocated' ? 'bg-emerald-50 text-emerald-800 border border-emerald-255' : 'bg-amber-50 text-amber-800 border border-amber-255'
                          }`}>{room.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!['dashboard', 'room_allotment', 'check_in_out', 'payments', 'tickets', 'venue_scheduling', 'classroom_allocation'].includes(activeSidebarTab) && (
            <div className="bg-white rounded-2xl border border-gray-150 p-8 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-[#eff7f5] text-[#08493d] rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-base font-extrabold text-slate-800">
                  {activeSidebarTab === 'transport_management' && 'Transport & Logistics Management'}
                  {activeSidebarTab === 'resource_management' && 'Resource & Assets Inventory'}
                  {activeSidebarTab === 'hostel_reports' && 'e-Hostel Compliance Reports'}
                  {activeSidebarTab === 'logistics_reports' && 'Logistics Operational Ledger'}
                  {activeSidebarTab === 'master_data' && 'Global Database Master Data'}
                  {activeSidebarTab === 'system_settings' && 'System Parameters & Configurations'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Monitor active details, allocate items, download spreadsheets, and central parameters.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-xs font-semibold">
                <div className="border border-gray-150 p-4 rounded-xl space-y-1 bg-slate-50/50">
                  <p className="text-slate-400 uppercase text-[9px] tracking-wider font-bold">Status</p>
                  <p className="text-lg font-extrabold text-emerald-800">Fully Online</p>
                </div>
                <div className="border border-gray-150 p-4 rounded-xl space-y-1 bg-slate-50/50">
                  <p className="text-slate-400 uppercase text-[9px] tracking-wider font-bold">Parameters</p>
                  <p className="text-lg font-extrabold text-slate-800">Sync Active</p>
                </div>
                <div className="border border-gray-150 p-4 rounded-xl space-y-1 bg-slate-50/50">
                  <p className="text-slate-400 uppercase text-[9px] tracking-wider font-bold">Last Inspected</p>
                  <p className="text-lg font-extrabold text-slate-800">Just now</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Copyright bar */}
          <footer className="pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs text-slate-400 font-semibold select-none">
            <span>© 2025 LMS. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-slate-600">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-terms" >Terms of Use</a>
              <span>•</span>
              <a href="#support" className="hover:text-slate-600">Help & Support</a>
            </div>
          </footer>

        </main>

      </div>

      {/* 3. Allot Room Modal */}
      {showAllotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4">
            <div className="bg-[#053229] text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Allot Room</h3>
              <button onClick={() => setShowAllotModal(false)} className="text-slate-300 hover:text-white focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAllotSubmit} className="p-6 space-y-4 text-xs sm:text-sm font-semibold text-slate-600">
              
              {/* Trainee Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Trainee Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Arun Patel"
                  value={newAllotment.name}
                  onChange={(e) => setNewAllotment({ ...newAllotment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              {/* Program selection */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Program / Stream</label>
                <select 
                  value={newAllotment.program}
                  onChange={(e) => setNewAllotment({ ...newAllotment, program: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                >
                  <option value="Leadership Program">Leadership Program</option>
                  <option value="Public Policy Program">Public Policy Program</option>
                  <option value="Governance Program">Governance Program</option>
                </select>
              </div>

              {/* Room Number */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Room Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. H-204"
                  value={newAllotment.room}
                  onChange={(e) => setNewAllotment({ ...newAllotment, room: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-mono"
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700">Check-in Date</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 18 May 2025"
                    value={newAllotment.checkin}
                    onChange={(e) => setNewAllotment({ ...newAllotment, checkin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-700">Check-out Date</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. 25 May 2025"
                    value={newAllotment.checkout}
                    onChange={(e) => setNewAllotment({ ...newAllotment, checkout: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAllotModal(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-lg shadow cursor-pointer"
                >
                  Allot Room
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 4. Raise Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4">
            <div className="bg-[#053229] text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Raise Maintenance Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className="text-slate-350 hover:text-white focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleTicketSubmit} className="p-6 space-y-4 text-xs sm:text-sm font-semibold text-slate-600">
              
              {/* Category */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Category</label>
                <select 
                  value={newTicket.category}
                  onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-800 bg-white"
                >
                  <option value="Hostel Facility">Hostel Facility (Plumbing/Electrical)</option>
                  <option value="Classroom">Classroom & Lab Hardware</option>
                  <option value="Canteen">Canteen & Mess</option>
                  <option value="General">Other Campus Areas</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Description of Issue</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="e.g. AC leaking water in Class 2"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-800 resize-none"
                ></textarea>
              </div>

              {/* Priority */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Priority Level</label>
                <div className="flex gap-4">
                  {['High', 'Medium', 'Low'].map((prio) => (
                    <label key={prio} className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="radio" 
                        name="priority"
                        checked={newTicket.priority === prio}
                        onChange={() => setNewTicket({ ...newTicket, priority: prio })}
                        className="text-[#08493d] focus:ring-emerald-700"
                      />
                      <span>{prio}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowTicketModal(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-lg shadow cursor-pointer"
                >
                  Raise Ticket
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. Stat Card Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4">
            
            <div className="bg-slate-800 text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">
                {showDetailsModal === 'total' && 'Total Hostel Capacity'}
                {showDetailsModal === 'occupied' && 'Occupied Rooms Summary'}
                {showDetailsModal === 'available' && 'Available Rooms'}
                {showDetailsModal === 'checkouts' && "Today's Checkout Schedule"}
                {showDetailsModal === 'payments' && 'Pending Dues Ledger'}
              </h3>
              <button onClick={() => setShowDetailsModal(null)} className="text-slate-300 hover:text-white focus:outline-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 text-xs sm:text-sm font-semibold text-slate-650 space-y-4">
              
              {showDetailsModal === 'total' && (
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Block A (Single Occupancy):</span>
                    <span className="font-bold text-slate-800">40 Rooms</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Block B (Double Occupancy):</span>
                    <span className="font-bold text-slate-800">30 Rooms (60 beds)</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Executive VIP Suites:</span>
                    <span className="font-bold text-slate-800">20 Rooms</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-150 text-[10px] text-slate-500 leading-normal">
                    * The total residential campus capacity accounts for 120 individual rooms with high-speed Wi-Fi, studying desks, and dining permissions.
                  </div>
                </div>
              )}

              {showDetailsModal === 'occupied' && (
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Active Trainees Checked In:</span>
                    <span className="font-bold text-slate-800">78 Officers</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Visiting Faculty Members:</span>
                    <span className="font-bold text-slate-800">12 Speakers</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>International Guests:</span>
                    <span className="font-bold text-slate-800">8 Delegates</span>
                  </div>
                  <div className="bg-emerald-50 text-emerald-950 p-3 rounded-lg border border-emerald-100 text-center font-bold">
                    Occupancy Rate: 81.6%
                  </div>
                </div>
              )}

              {showDetailsModal === 'available' && (
                <div className="space-y-2">
                  <p className="text-slate-500 mb-2 font-medium">Ready rooms for incoming batches:</p>
                  <div className="grid grid-cols-3 gap-2 text-center font-mono">
                    {['H-102', 'H-108', 'H-201', 'H-202', 'H-303', 'H-304'].map((rm) => (
                      <div key={rm} className="border border-gray-250 p-2 rounded-lg bg-slate-50 text-slate-800 font-bold">{rm}</div>
                    ))}
                  </div>
                </div>
              )}

              {showDetailsModal === 'checkouts' && (
                <div className="space-y-2.5">
                  <p className="text-slate-500 font-medium">The following trainees have scheduled checkout clearances today:</p>
                  <div className="divide-y divide-gray-50 max-h-40 overflow-y-auto">
                    <div className="py-2 flex justify-between font-mono">
                      <span className="font-sans font-bold">Vikram Das</span>
                      <span className="text-slate-500">Room H-206 • 09:15 AM</span>
                    </div>
                    <div className="py-2 flex justify-between font-mono">
                      <span className="font-sans font-bold">Suresh G.</span>
                      <span className="text-slate-500">Room H-104 • 12:00 PM</span>
                    </div>
                    <div className="py-2 flex justify-between font-mono">
                      <span className="font-sans font-bold">Priya Sen</span>
                      <span className="text-slate-500">Room H-312 • 04:30 PM</span>
                    </div>
                  </div>
                </div>
              )}

              {showDetailsModal === 'payments' && (
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Hostel Lodging Dues:</span>
                    <span className="font-bold text-slate-800">₹ 28,400</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span>Canteen / Food Dues:</span>
                    <span className="font-bold text-slate-800">₹ 17,200</span>
                  </div>
                  <div className="flex justify-between font-bold text-rose-700">
                    <span>Total Outstanding:</span>
                    <span>₹ 45,600</span>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button 
                  onClick={() => setShowDetailsModal(null)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg cursor-pointer text-center"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}