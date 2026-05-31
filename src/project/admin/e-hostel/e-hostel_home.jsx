import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './side_bar';

// Modular Components
import DashboardTab from './components/DashboardTab';
import RoomAllotmentTab from './components/RoomAllotmentTab';
import CheckInOutTab from './components/CheckInOutTab';
import PaymentsTab from './components/PaymentsTab';
import TicketsTab from './components/TicketsTab';
import VenueSchedulingTab from './components/VenueSchedulingTab';
import ClassroomAllocationTab from './components/ClassroomAllocationTab';
import TransportTab from './components/TransportTab';
import ResourceTab from './components/ResourceTab';
import HostelReportsTab from './components/HostelReportsTab';
import LogisticsReportsTab from './components/LogisticsReportsTab';
import MasterDataTab from './components/MasterDataTab';
import SystemSettingsTab from './components/SystemSettingsTab';

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

  // 1. Transport State
  const [vehicles, setVehicles] = useState([
    { id: 'VHC-01', name: 'Innova Crysta', type: 'SUV', capacity: '7 Seater', status: 'Available', driver: 'Rajesh Kumar' },
    { id: 'VHC-02', name: 'Force Traveller', type: 'Mini Bus', capacity: '17 Seater', status: 'In Transit', driver: 'Satish Yadav' },
    { id: 'VHC-03', name: 'Maruti Suzuki Ertiga', type: 'MUV', capacity: '7 Seater', status: 'Available', driver: 'Manpreet Singh' },
    { id: 'VHC-04', name: 'Tata Winger', type: 'Van', capacity: '15 Seater', status: 'Maintenance', driver: 'Ravi Shankar' }
  ]);
  const [transitLogs, setTransitLogs] = useState([
    { id: 'TR-102', vehicle: 'VHC-02', route: 'Airport to Academy Hostel', time: '15 May 2025 • 02:00 PM', status: 'Active', trainees: '12 Officers' },
    { id: 'TR-101', vehicle: 'VHC-01', route: 'Academy to Railway Station', time: '14 May 2025 • 10:00 AM', status: 'Completed', trainees: '4 Speakers' }
  ]);
  const [newTrip, setNewTrip] = useState({ vehicleId: 'VHC-01', route: '', time: '', traineesCount: '' });

  const handleTripSubmit = (e) => {
    e.preventDefault();
    if (!newTrip.route || !newTrip.time || !newTrip.traineesCount) {
      alert('Please fill all trip details.');
      return;
    }
    const newTripId = `TR-${Math.floor(100 + Math.random() * 900)}`;
    setTransitLogs([
      {
        id: newTripId,
        vehicle: newTrip.vehicleId,
        route: newTrip.route,
        time: newTrip.time,
        status: 'Active',
        trainees: `${newTrip.traineesCount} Officers`
      },
      ...transitLogs
    ]);
    setVehicles(vehicles.map(vh => vh.id === newTrip.vehicleId ? { ...vh, status: 'In Transit' } : vh));
    setNewTrip({ vehicleId: 'VHC-01', route: '', time: '', traineesCount: '' });
  };

  // 2. Resource Inventory State
  const [resources, setResources] = useState([
    { id: 'RES-01', name: 'Single Bedsheet (White)', category: 'Linen', total: 350, available: 120, status: 'In Stock' },
    { id: 'RES-02', name: 'Pillow Cover (Green)', category: 'Linen', total: 200, available: 45, status: 'Low Stock' },
    { id: 'RES-03', name: 'Executive Wooden Desk', category: 'Furniture', total: 120, available: 120, status: 'In Stock' },
    { id: 'RES-04', name: 'Ergonomic Office Chair', category: 'Furniture', total: 150, available: 12, status: 'Low Stock' },
    { id: 'RES-05', name: 'LED Desk Lamp', category: 'Appliances', total: 80, available: 65, status: 'In Stock' }
  ]);
  const [resourceSearch, setResourceSearch] = useState('');
  const [newResource, setNewResource] = useState({ name: '', category: 'Linen', total: '', available: '' });

  const handleResourceSubmit = (e) => {
    e.preventDefault();
    if (!newResource.name || !newResource.total || !newResource.available) {
      alert('Please fill out all resource details.');
      return;
    }
    const totalNum = parseInt(newResource.total);
    const availNum = parseInt(newResource.available);
    const newId = `RES-${Math.floor(10 + Math.random() * 90)}`;
    setResources([
      ...resources,
      {
        id: newId,
        name: newResource.name,
        category: newResource.category,
        total: totalNum,
        available: availNum,
        status: availNum < 50 ? 'Low Stock' : 'In Stock'
      }
    ]);
    setNewResource({ name: '', category: 'Linen', total: '', available: '' });
  };

  // 3. Hostel Reports State
  const [selectedHostelReport, setSelectedHostelReport] = useState('occupancy');
  const [isExportingHostel, setIsExportingHostel] = useState(false);
  const [hostelSuccessMsg, setHostelSuccessMsg] = useState('');

  // 4. Logistics Reports State
  const [isExportingLogistics, setIsExportingLogistics] = useState(false);
  const [logisticsSuccessMsg, setLogisticsSuccessMsg] = useState('');
  const [diningCounts, setDiningCounts] = useState({ breakfast: 85, lunch: 140, dinner: 120 });
  const [fuelLogs, setFuelLogs] = useState([
    { id: 'FL-01', date: '14 May 2025', vehicle: 'VHC-01', fuelQty: '40 L', amount: '4,100', driver: 'Rajesh Kumar' },
    { id: 'FL-02', date: '12 May 2025', vehicle: 'VHC-02', fuelQty: '80 L', amount: '8,200', driver: 'Satish Yadav' }
  ]);

  // 5. Master Data Catalog State
  const [masterRooms, setMasterRooms] = useState([
    { roomNo: 'H-101', type: 'Single Occupancy', block: 'Block A', status: 'Occupied' },
    { roomNo: 'H-102', type: 'Single Occupancy', block: 'Block A', status: 'Available' },
    { roomNo: 'H-201', type: 'Double Occupancy', block: 'Block B', status: 'Available' },
    { roomNo: 'H-204', type: 'Double Occupancy', block: 'Block B', status: 'Occupied' },
    { roomNo: 'H-301', type: 'VIP Suite', block: 'Executive Block', status: 'Occupied' }
  ]);
  const [masterVenues, setMasterVenues] = useState([
    { name: 'Main Auditorium', capacity: 250, type: 'Hall', location: 'Ground Floor' },
    { name: 'Seminar Hall - 1', capacity: 60, type: 'Classroom', location: 'First Floor' },
    { name: 'Seminar Hall - 2', capacity: 60, type: 'Classroom', location: 'First Floor' },
    { name: 'Conference Room', capacity: 25, type: 'Meeting Room', location: 'Second Floor' }
  ]);
  const [newMasterRoom, setNewMasterRoom] = useState({ roomNo: '', type: 'Single Occupancy', block: 'Block A' });
  const [newMasterVenue, setNewMasterVenue] = useState({ name: '', capacity: '', type: 'Classroom', location: '' });

  const handleMasterRoomSubmit = (e) => {
    e.preventDefault();
    if (!newMasterRoom.roomNo) return;
    if (masterRooms.some(r => r.roomNo.toUpperCase() === newMasterRoom.roomNo.toUpperCase())) {
      alert('Room already exists in Master Catalog.');
      return;
    }
    setMasterRooms([
      ...masterRooms,
      {
        roomNo: newMasterRoom.roomNo.toUpperCase(),
        type: newMasterRoom.type,
        block: newMasterRoom.block,
        status: 'Available'
      }
    ]);
    setNewMasterRoom({ roomNo: '', type: 'Single Occupancy', block: 'Block A' });
  };

  const handleMasterVenueSubmit = (e) => {
    e.preventDefault();
    if (!newMasterVenue.name || !newMasterVenue.capacity || !newMasterVenue.location) return;
    if (masterVenues.some(v => v.name.toLowerCase() === newMasterVenue.name.toLowerCase())) {
      alert('Venue already exists.');
      return;
    }
    setMasterVenues([
      ...masterVenues,
      {
        name: newMasterVenue.name,
        capacity: parseInt(newMasterVenue.capacity),
        type: newMasterVenue.type,
        location: newMasterVenue.location
      }
    ]);
    setNewMasterVenue({ name: '', capacity: '', type: 'Classroom', location: '' });
  };

  // 6. System Settings State
  const [systemSettings, setSystemSettings] = useState({
    ssoClientId: 'PARICHAY-LMS-5542-PROD',
    ssoEndpoint: 'https://parichay.nic.in/api/v2/auth',
    mfaEnabled: true,
    activeDirectorySync: true,
    adDomain: 'lms.academy.local',
    emailGatewayHost: 'smtp.lms.academy.gov.in',
    emailGatewayPort: '465',
    smsGatewayUrl: 'https://sms.gov.in/api/send'
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

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

          {/* Active Tab Dispatcher */}
          {activeSidebarTab === 'dashboard' && (
            <DashboardTab 
              setActiveSidebarTab={setActiveSidebarTab}
              setShowDetailsModal={setShowDetailsModal}
              allotments={allotments}
              tickets={tickets}
            />
          )}

          {activeSidebarTab === 'room_allotment' && (
            <RoomAllotmentTab 
              allotments={allotments}
              deleteAllotment={deleteAllotment}
              setShowAllotModal={setShowAllotModal}
            />
          )}

          {activeSidebarTab === 'check_in_out' && (
            <CheckInOutTab />
          )}

          {activeSidebarTab === 'payments' && (
            <PaymentsTab />
          )}

          {activeSidebarTab === 'tickets' && (
            <TicketsTab 
              tickets={tickets}
              setShowTicketModal={setShowTicketModal}
            />
          )}

          {activeSidebarTab === 'venue_scheduling' && (
            <VenueSchedulingTab />
          )}

          {activeSidebarTab === 'classroom_allocation' && (
            <ClassroomAllocationTab />
          )}

          {activeSidebarTab === 'transport_management' && (
            <TransportTab 
              vehicles={vehicles}
              transitLogs={transitLogs}
              newTrip={newTrip}
              setNewTrip={setNewTrip}
              handleTripSubmit={handleTripSubmit}
            />
          )}

          {activeSidebarTab === 'resource_management' && (
            <ResourceTab 
              resources={resources}
              resourceSearch={resourceSearch}
              setResourceSearch={setResourceSearch}
              newResource={newResource}
              setNewResource={setNewResource}
              handleResourceSubmit={handleResourceSubmit}
            />
          )}

          {activeSidebarTab === 'hostel_reports' && (
            <HostelReportsTab 
              selectedHostelReport={selectedHostelReport}
              setSelectedHostelReport={setSelectedHostelReport}
              isExportingHostel={isExportingHostel}
              setIsExportingHostel={setIsExportingHostel}
              hostelSuccessMsg={hostelSuccessMsg}
              setHostelSuccessMsg={setHostelSuccessMsg}
            />
          )}

          {activeSidebarTab === 'logistics_reports' && (
            <LogisticsReportsTab 
              isExportingLogistics={isExportingLogistics}
              setIsExportingLogistics={setIsExportingLogistics}
              logisticsSuccessMsg={logisticsSuccessMsg}
              setLogisticsSuccessMsg={setLogisticsSuccessMsg}
              diningCounts={diningCounts}
              setDiningCounts={setDiningCounts}
              fuelLogs={fuelLogs}
              setFuelLogs={setFuelLogs}
            />
          )}

          {activeSidebarTab === 'master_data' && (
            <MasterDataTab 
              masterRooms={masterRooms}
              setMasterRooms={setMasterRooms}
              masterVenues={masterVenues}
              setMasterVenues={setMasterVenues}
              newMasterRoom={newMasterRoom}
              setNewMasterRoom={setNewMasterRoom}
              newMasterVenue={newMasterVenue}
              setNewMasterVenue={setNewMasterVenue}
              handleMasterRoomSubmit={handleMasterRoomSubmit}
              handleMasterVenueSubmit={handleMasterVenueSubmit}
            />
          )}

          {activeSidebarTab === 'system_settings' && (
            <SystemSettingsTab 
              systemSettings={systemSettings}
              setSystemSettings={setSystemSettings}
              settingsSaved={settingsSaved}
              setSettingsSaved={setSettingsSaved}
            />
          )}

          {/* Footer Copyright bar */}
          <footer className="pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs text-slate-400 font-semibold select-none">
            <span>© 2025 LMS. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#privacy" className="hover:text-slate-650">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-slate-655" >Terms of Use</a>
              <span>•</span>
              <a href="#support" className="hover:text-slate-650">Help & Support</a>
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

            <form onSubmit={handleAllotSubmit} className="p-6 space-y-4 text-xs sm:text-sm font-semibold text-slate-650">
              
              {/* Trainee Name */}
              <div className="space-y-1.5">
                <label className="block text-slate-700">Trainee Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Arun Patel"
                  value={newAllotment.name}
                  onChange={(e) => setNewAllotment({ ...newAllotment, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-850"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 text-slate-850 resize-none"
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