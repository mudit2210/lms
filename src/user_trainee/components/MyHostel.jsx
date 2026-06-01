import React from 'react';

export default function MyHostel({ user }) {
  const hostelInfo = {
    block: 'Block C – Ganga Wing',
    room: 'C-204',
    type: 'Double Occupancy',
    floor: '2nd Floor',
    checkIn: 'April 1, 2026',
    checkOut: 'September 30, 2026',
    warden: 'Mr. Rajesh Gupta',
    wardenContact: '+91 98765 43210',
  };

  const payments = [
    { month: 'April 2026', amount: '₹3,200', status: 'paid', date: 'Apr 5' },
    { month: 'May 2026', amount: '₹3,200', status: 'paid', date: 'May 3' },
    { month: 'June 2026', amount: '₹3,200', status: 'due', date: 'Jun 10' },
  ];

  const facilities = [
    { name: 'Wi-Fi Access', status: 'active', icon: '📶' },
    { name: 'Mess Services', status: 'active', icon: '🍽️' },
    { name: 'Laundry', status: 'active', icon: '👕' },
    { name: 'Reading Room', status: 'active', icon: '📚' },
    { name: 'Gym', status: 'maintenance', icon: '🏋️' },
    { name: 'Sports Ground', status: 'active', icon: '⚽' },
  ];

  const messMenu = [
    { day: 'Monday', breakfast: 'Poha + Tea', lunch: 'Dal Rice + Sabzi', dinner: 'Roti + Paneer Curry' },
    { day: 'Tuesday', breakfast: 'Idli + Sambar', lunch: 'Rajma Rice', dinner: 'Roti + Dal Makhani' },
    { day: 'Wednesday', breakfast: 'Paratha + Curd', lunch: 'Chole Rice', dinner: 'Roti + Aloo Matar' },
    { day: 'Thursday', breakfast: 'Upma + Tea', lunch: 'Dal Rice + Salad', dinner: 'Biryani + Raita' },
    { day: 'Friday', breakfast: 'Puri + Sabzi', lunch: 'Matar Paneer + Rice', dinner: 'Roti + Mixed Dal' },
  ];

  const currentDay = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];

  return (
    <div className="trainee-page-inner">
      {/* Room Info Banner */}
      <div className="trainee-hostel-banner">
        <div className="trainee-hostel-room-card">
          <div className="trainee-hostel-room-icon">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p className="trainee-hostel-room-label">Your Room</p>
            <p className="trainee-hostel-room-number">{hostelInfo.room}</p>
            <p className="trainee-hostel-room-block">{hostelInfo.block}</p>
          </div>
        </div>
        <div className="trainee-hostel-info-grid">
          {[
            { label: 'Room Type', value: hostelInfo.type },
            { label: 'Floor', value: hostelInfo.floor },
            { label: 'Check-in', value: hostelInfo.checkIn },
            { label: 'Check-out', value: hostelInfo.checkOut },
            { label: 'Warden', value: hostelInfo.warden },
            { label: 'Contact', value: hostelInfo.wardenContact },
          ].map(item => (
            <div key={item.label} className="trainee-hostel-info-item">
              <p className="trainee-hostel-info-label">{item.label}</p>
              <p className="trainee-hostel-info-value">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="trainee-hostel-grid">
        {/* Mess Payments */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">Mess Payments</h3>
          </div>
          <div className="trainee-payments-list">
            {payments.map((p, i) => (
              <div key={i} className="trainee-payment-row">
                <div>
                  <p className="trainee-payment-month">{p.month}</p>
                  <p className="trainee-payment-date">{p.status === 'paid' ? `Paid on ${p.date}` : `Due: ${p.date}`}</p>
                </div>
                <div className="trainee-payment-right">
                  <span className="trainee-payment-amount">{p.amount}</span>
                  <span
                    className="trainee-status-pill"
                    style={p.status === 'paid' ? { color: '#059669', background: '#ecfdf5' } : { color: '#dc2626', background: '#fef2f2' }}
                  >
                    {p.status === 'paid' ? '✓ Paid' : '⚠ Due'}
                  </span>
                </div>
              </div>
            ))}
            <button className="trainee-btn-primary" style={{ marginTop: '12px', width: '100%', justifyContent: 'center' }}>
              Pay June Fees
            </button>
          </div>
        </div>

        {/* Facilities */}
        <div className="trainee-card">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">Facilities</h3>
          </div>
          <div className="trainee-facilities-grid">
            {facilities.map((f, i) => (
              <div key={i} className={`trainee-facility-item ${f.status}`}>
                <span className="trainee-facility-icon">{f.icon}</span>
                <p className="trainee-facility-name">{f.name}</p>
                <span className="trainee-facility-status">{f.status === 'active' ? '● Active' : '⚠ Maintenance'}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Mess Menu */}
        <div className="trainee-card trainee-card-wide">
          <div className="trainee-card-header">
            <h3 className="trainee-card-title">
              🍽️ Weekly Mess Menu
            </h3>
            <span className="trainee-week-label">June 2026</span>
          </div>
          <div className="trainee-mess-table-wrapper">
            <table className="trainee-mess-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Breakfast</th>
                  <th>Lunch</th>
                  <th>Dinner</th>
                </tr>
              </thead>
              <tbody>
                {messMenu.map((row, i) => (
                  <tr key={i} className={row.day === currentDay ? 'today-row' : ''}>
                    <td className="trainee-mess-day">
                      {row.day}
                      {row.day === currentDay && <span className="trainee-today-label">Today</span>}
                    </td>
                    <td>{row.breakfast}</td>
                    <td>{row.lunch}</td>
                    <td>{row.dinner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
