import React from 'react';

export default function VenueSchedulingTab() {
  return (
    <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 animate-fadeIn text-slate-700">
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
  );
}
