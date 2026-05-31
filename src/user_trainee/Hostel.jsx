import React, { useState, useEffect } from 'react';

export default function Hostel() {
  const [roomDetails, setRoomDetails] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState({ category: 'Housekeeping', description: '' });
  const [activeTab, setActiveTab] = useState('room');
  const [messMenu, setMessMenu] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ fromDate: '', toDate: '', reason: '' });

  useEffect(() => {
    // Room Details
    const savedRoom = localStorage.getItem('trainee_hostel_room');
    if (savedRoom) { setRoomDetails(JSON.parse(savedRoom)); }
    else {
      const room = {
        roomNo: 'B-214',
        block: 'Block B – ISS Officers Wing',
        floor: '2nd Floor',
        type: 'Single Occupancy (AC)',
        checkIn: '2026-03-01',
        checkOut: '2026-08-30',
        warden: 'Sh. Vikram Malhotra',
        wardenPhone: '+91 98112 23344',
        amenities: ['AC', 'Wi-Fi', 'Attached Bathroom', 'Study Table', 'Wardrobe', 'Geyser'],
        status: 'Occupied',
      };
      localStorage.setItem('trainee_hostel_room', JSON.stringify(room));
      setRoomDetails(room);
    }

    // Complaints
    const savedComplaints = localStorage.getItem('trainee_hostel_complaints');
    if (savedComplaints) { setComplaints(JSON.parse(savedComplaints)); }
    else {
      const seed = [
        { id: 'HC-001', category: 'Maintenance', description: 'AC not cooling properly in room B-214', date: '2026-05-28', status: 'Resolved' },
        { id: 'HC-002', category: 'Housekeeping', description: 'Room cleaning not done today', date: '2026-05-30', status: 'In Progress' },
      ];
      localStorage.setItem('trainee_hostel_complaints', JSON.stringify(seed));
      setComplaints(seed);
    }

    // Mess Menu
    setMessMenu([
      { day: 'Monday', breakfast: 'Poha, Bread-Butter, Tea/Coffee, Fruits', lunch: 'Dal Tadka, Jeera Rice, Roti, Salad, Curd', dinner: 'Paneer Butter Masala, Rice, Roti, Gulab Jamun' },
      { day: 'Tuesday', breakfast: 'Idli-Sambhar, Toast, Tea/Coffee, Banana', lunch: 'Rajma, Steamed Rice, Roti, Raita, Papad', dinner: 'Mix Veg, Dal Fry, Rice, Roti, Ice Cream' },
      { day: 'Wednesday', breakfast: 'Aloo Paratha, Curd, Tea/Coffee, Fruits', lunch: 'Chole, Rice, Roti, Salad, Buttermilk', dinner: 'Kadhai Paneer, Dal Makhani, Rice, Roti, Kheer' },
      { day: 'Thursday', breakfast: 'Upma, Bread-Jam, Tea/Coffee, Sprouts', lunch: 'Sambar-Rice, Roti, Veg Pulao, Curd', dinner: 'Malai Kofta, Rice, Roti, Salad, Fruit Custard' },
      { day: 'Friday', breakfast: 'Chole Bhature, Tea/Coffee, Fruits', lunch: 'Dal Palak, Jeera Rice, Roti, Raita', dinner: 'Shahi Paneer, Rice, Naan, Gulab Jamun' },
      { day: 'Saturday', breakfast: 'Dosa-Chutney, Tea/Coffee, Banana', lunch: 'Kadhi-Rice, Roti, Aloo Gobi, Papad', dinner: 'Biryani (Veg), Raita, Salad, Sweet' },
      { day: 'Sunday', breakfast: 'Puri-Sabzi, Tea/Coffee, Fruits, Juice', lunch: 'Special Thali – Paneer, Dal, Rice, Roti, Sweet, Salad', dinner: 'Pasta/Noodles, Soup, Bread, Ice Cream' },
    ]);

    // Leave Requests
    const savedLeave = localStorage.getItem('trainee_hostel_leave');
    if (savedLeave) { setLeaveRequests(JSON.parse(savedLeave)); }
    else {
      const seed = [
        { id: 'LV-001', fromDate: '2026-06-15', toDate: '2026-06-17', reason: 'Family function in Delhi', status: 'Approved', appliedOn: '2026-06-10' },
        { id: 'LV-002', fromDate: '2026-07-01', toDate: '2026-07-02', reason: 'Medical appointment', status: 'Pending', appliedOn: '2026-06-28' },
      ];
      localStorage.setItem('trainee_hostel_leave', JSON.stringify(seed));
      setLeaveRequests(seed);
    }
  }, []);

  const handleSubmitComplaint = () => {
    if (!newComplaint.description.trim()) { alert('Please describe the issue.'); return; }
    const complaint = {
      id: 'HC-' + Date.now(),
      category: newComplaint.category,
      description: newComplaint.description,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    const updated = [complaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem('trainee_hostel_complaints', JSON.stringify(updated));
    setNewComplaint({ category: 'Housekeeping', description: '' });
    alert('Complaint submitted successfully!');
  };

  const handleSubmitLeave = () => {
    if (!leaveForm.fromDate || !leaveForm.toDate || !leaveForm.reason.trim()) { alert('Please fill all fields.'); return; }
    const leave = {
      id: 'LV-' + Date.now(),
      ...leaveForm,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };
    const updated = [leave, ...leaveRequests];
    setLeaveRequests(updated);
    localStorage.setItem('trainee_hostel_leave', JSON.stringify(updated));
    setLeaveForm({ fromDate: '', toDate: '', reason: '' });
    setShowLeaveForm(false);
    alert('Leave application submitted!');
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayMenu = messMenu.find(m => m.day === today.split(',')[0]) || messMenu[0];

  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Hostel & Accommodation</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">Room details, mess menu, complaints, and leave management.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl text-[11px] font-bold">
          {['room', 'mess', 'complaints', 'leave'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
              {tab === 'room' ? 'My Room' : tab === 'mess' ? 'Mess Menu' : tab === 'complaints' ? 'Complaints' : 'Leave'}
            </button>
          ))}
        </div>
      </div>

      {/* MY ROOM TAB */}
      {activeTab === 'room' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[13px] font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-lg">🏠</span> Room Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-[9px] text-gray-400 font-medium">Room No.</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.roomNo}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Block</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.block}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Floor</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.floor}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Room Type</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.type}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Check-in</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.checkIn}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Check-out</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.checkOut}</p></div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-50">
              <p className="text-[9px] text-gray-400 font-medium mb-2">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {roomDetails.amenities?.map((a, i) => (
                  <span key={i} className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">{a}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-[13px] font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-lg">👤</span> Hostel Warden
            </h3>
            <div className="space-y-3">
              <div><p className="text-[9px] text-gray-400 font-medium">Name</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.warden}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Contact</p><p className="text-[13px] font-bold text-gray-900 mt-0.5">{roomDetails.wardenPhone}</p></div>
              <div><p className="text-[9px] text-gray-400 font-medium">Status</p>
                <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[9px] font-bold text-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{roomDetails.status}
                </span>
              </div>
            </div>
            <div className="mt-5 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-[10px] font-bold text-amber-800">📋 Hostel Rules Reminder</p>
              <p className="text-[9px] text-amber-700 mt-1 leading-relaxed">Gate closes at 10:00 PM. Visitors allowed 5-7 PM only. Mess timings: B 7:30-9:00, L 12:30-2:00, D 7:30-9:00.</p>
            </div>
          </div>
        </div>
      )}

      {/* MESS MENU TAB */}
      {activeTab === 'mess' && (
        <div className="space-y-4">
          {todayMenu && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 p-5 mb-4">
              <p className="text-[10px] font-bold text-emerald-700 mb-2">🍽️ Today's Menu ({today})</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div><p className="text-[9px] text-gray-400 font-medium">Breakfast</p><p className="text-[11px] font-semibold text-gray-800 mt-0.5">{todayMenu.breakfast}</p></div>
                <div><p className="text-[9px] text-gray-400 font-medium">Lunch</p><p className="text-[11px] font-semibold text-gray-800 mt-0.5">{todayMenu.lunch}</p></div>
                <div><p className="text-[9px] text-gray-400 font-medium">Dinner</p><p className="text-[11px] font-semibold text-gray-800 mt-0.5">{todayMenu.dinner}</p></div>
              </div>
            </div>
          )}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-bold border-b border-gray-100">
                  <th className="p-3">Day</th><th className="p-3">Breakfast</th><th className="p-3">Lunch</th><th className="p-3">Dinner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700 font-medium">
                {messMenu.map(m => (
                  <tr key={m.day} className={`hover:bg-gray-50/50 ${m.day === today ? 'bg-emerald-50/30' : ''}`}>
                    <td className="p-3 font-bold text-gray-900">{m.day}</td>
                    <td className="p-3">{m.breakfast}</td>
                    <td className="p-3">{m.lunch}</td>
                    <td className="p-3">{m.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMPLAINTS TAB */}
      {activeTab === 'complaints' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="text-[12px] font-bold text-gray-900 mb-3">Raise a Complaint</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <select value={newComplaint.category} onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})} className="border border-gray-200 rounded-xl px-3 py-2 text-[11px] font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300">
                <option>Housekeeping</option><option>Maintenance</option><option>Electrical</option><option>Plumbing</option><option>Wi-Fi/Internet</option><option>Mess/Food</option><option>Other</option>
              </select>
              <input type="text" value={newComplaint.description} onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})} placeholder="Describe the issue..." className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              <button onClick={handleSubmitComplaint} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[10px] rounded-xl transition-colors shrink-0">Submit</button>
            </div>
          </div>
          <div className="space-y-2">
            {complaints.map(c => (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.category}</span>
                    <span className="text-[9px] text-gray-400">{c.date}</span>
                  </div>
                  <p className="text-[12px] font-semibold text-gray-800">{c.description}</p>
                </div>
                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : c.status === 'In Progress' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'}`}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEAVE TAB */}
      {activeTab === 'leave' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-[12px] font-bold text-gray-900">Leave Applications</h3>
            <button onClick={() => setShowLeaveForm(!showLeaveForm)} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[10px] rounded-xl transition-colors">
              {showLeaveForm ? 'Cancel' : '+ Apply Leave'}
            </button>
          </div>
          {showLeaveForm && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-600 block mb-1">From Date</label>
                  <input type="date" value={leaveForm.fromDate} onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-600 block mb-1">To Date</label>
                  <input type="date" value={leaveForm.toDate} onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-600 block mb-1">Reason</label>
                <input type="text" value={leaveForm.reason} onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})} placeholder="Reason for leave..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              </div>
              <button onClick={handleSubmitLeave} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl transition-colors">Submit Application</button>
            </div>
          )}
          <div className="space-y-2">
            {leaveRequests.map(l => (
              <div key={l.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center justify-between">
                <div>
                  <p className="text-[12px] font-semibold text-gray-800">{l.reason}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{l.fromDate} → {l.toDate} • Applied: {l.appliedOn}</p>
                </div>
                <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${l.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : l.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}>{l.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
