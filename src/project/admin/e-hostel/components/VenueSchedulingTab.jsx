import React, { useState } from 'react';

export default function VenueSchedulingTab() {
  // Dynamic State for Venue Bookings
  const [bookings, setBookings] = useState([
    { id: 1, day: '15', month: 'MAY', title: 'Leadership Program Inauguration', room: 'Main Auditorium', time: '09:00 AM - 11:00 AM', status: 'Confirmed' },
    { id: 2, day: '15', month: 'MAY', title: 'Policy Workshop', room: 'Seminar Hall - 2', time: '02:00 PM - 05:00 PM', status: 'Confirmed' },
    { id: 3, day: '16', month: 'MAY', title: 'Group Discussion', room: 'Conference Hall', time: '10:00 AM - 12:00 PM', status: 'Pending' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterRoom, setFilterRoom] = useState('All');
  
  const [newBooking, setNewBooking] = useState({
    title: '',
    room: 'Main Auditorium',
    date: '',
    timeStart: '09:00',
    timeEnd: '11:00',
    status: 'Pending'
  });

  const handleAddBooking = (e) => {
    e.preventDefault();
    if (!newBooking.title || !newBooking.date || !newBooking.timeStart || !newBooking.timeEnd) {
      alert('Please fill out all details.');
      return;
    }

    const parsedDate = new Date(newBooking.date);
    const day = parsedDate.getDate().toString();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[parsedDate.getMonth()];

    const formatTime = (timeStr) => {
      const [h, m] = timeStr.split(':');
      let hours = parseInt(h, 10);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours.toString().padStart(2, '0')}:${m} ${ampm}`;
    };

    const timeRange = `${formatTime(newBooking.timeStart)} - ${formatTime(newBooking.timeEnd)}`;

    const newEntry = {
      id: Date.now(),
      day,
      month,
      title: newBooking.title,
      room: newBooking.room,
      time: timeRange,
      status: newBooking.status
    };

    setBookings([...bookings, newEntry]);
    setShowModal(false);
    
    // Reset Form
    setNewBooking({
      title: '',
      room: 'Main Auditorium',
      date: '',
      timeStart: '09:00',
      timeEnd: '11:00',
      status: 'Pending'
    });
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to remove this booking?')) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: b.status === 'Confirmed' ? 'Pending' : 'Confirmed' } : b
    ));
  };

  const filteredBookings = filterRoom === 'All' 
    ? bookings 
    : bookings.filter(b => b.room === filterRoom);

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700 relative">
      
      {/* Title Header with "+ Add Booking" Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Venue Scheduling & Booking</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Manage allocations of conference halls, auditoriums, and seminar classrooms.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-150 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer focus:outline-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Booking
        </button>
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 items-center text-xs font-semibold overflow-x-auto pb-1 select-none">
        <span className="text-slate-400 shrink-0">Filter:</span>
        {['All', 'Main Auditorium', 'Seminar Hall - 1', 'Seminar Hall - 2', 'Conference Hall'].map((roomOption) => (
          <button
            key={roomOption}
            onClick={() => setFilterRoom(roomOption)}
            className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer shrink-0 ${
              filterRoom === roomOption
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold shadow-3xs'
                : 'bg-slate-50 border-gray-150 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {roomOption}
          </button>
        ))}
      </div>

      {/* Dynamic List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 font-medium border border-dashed border-gray-200 rounded-xl">
            No active schedules found for the selected filter.
          </div>
        ) : (
          filteredBookings.map((item) => (
            <div key={item.id} className="flex gap-4 items-start text-xs font-semibold p-4 bg-slate-50 border border-gray-150 rounded-xl hover:border-gray-300 transition-all group">
              {/* Date Badge */}
              <div className="bg-[#053229] border border-emerald-900 rounded-lg p-2 text-center min-w-[45px] text-white shrink-0">
                <p className="text-base font-extrabold leading-none">{item.day}</p>
                <p className="text-[9px] font-bold mt-1 tracking-wider uppercase">{item.month}</p>
              </div>

              {/* Info Container */}
              <div className="space-y-1 flex-grow">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm font-extrabold text-slate-850 leading-tight">{item.title}</p>
                  
                  {/* Delete button (displays on hover) */}
                  <button 
                    onClick={() => deleteBooking(item.id)}
                    className="p-1 text-slate-350 hover:text-red-650 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer focus:outline-none shrink-0"
                    title="Delete Allocation"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-xs text-slate-500 font-medium">{item.room} • {item.time}</p>
                
                {/* Status Badge toggler */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    title="Click to toggle status"
                    className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 cursor-pointer focus:outline-none select-none transition-all ${
                      item.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' :
                      'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {item.status}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Dialog Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4">
            <div className="bg-[#053229] text-white p-5 flex justify-between items-center">
              <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Book Venue Allocation</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-300 hover:text-white focus:outline-none cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddBooking} className="p-6 space-y-4 text-xs sm:text-sm font-semibold text-slate-600">
              
              <div className="space-y-1.5">
                <label className="block text-slate-700">Event Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Policy Review Session"
                  value={newBooking.title}
                  onChange={(e) => setNewBooking({ ...newBooking, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-855"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700">Select Venue / Room</label>
                <select 
                  value={newBooking.room}
                  onChange={(e) => setNewBooking({ ...newBooking, room: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 bg-white"
                >
                  <option value="Main Auditorium">Main Auditorium</option>
                  <option value="Seminar Hall - 1">Seminar Hall - 1</option>
                  <option value="Seminar Hall - 2">Seminar Hall - 2</option>
                  <option value="Conference Hall">Conference Hall</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700">Date</label>
                <input 
                  type="date" 
                  required
                  value={newBooking.date}
                  onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700">Start Time</label>
                  <input 
                    type="time" 
                    required
                    value={newBooking.timeStart}
                    onChange={(e) => setNewBooking({ ...newBooking, timeStart: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-700">End Time</label>
                  <input 
                    type="time" 
                    required
                    value={newBooking.timeEnd}
                    onChange={(e) => setNewBooking({ ...newBooking, timeEnd: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700">Initial Status</label>
                <div className="flex gap-4">
                  {['Confirmed', 'Pending'].map((st) => (
                    <label key={st} className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                      <input 
                        type="radio" 
                        name="status"
                        checked={newBooking.status === st}
                        onChange={() => setNewBooking({ ...newBooking, status: st })}
                        className="text-[#08493d] focus:ring-emerald-500"
                      />
                      <span>{st}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-lg shadow cursor-pointer transition-colors"
                >
                  Confirm Allocation
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
