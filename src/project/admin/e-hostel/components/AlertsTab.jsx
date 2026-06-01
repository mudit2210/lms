import React, { useState } from 'react';

export default function AlertsTab() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'CRITICAL', title: 'Water Supply Disruption', message: 'Main pump house is undergoing emergency repair. Water supply to Block B and Executive Block will be suspended between 02:00 PM and 05:00 PM today.', date: '01 June 2026 • 10:30 AM', sender: 'Campus Warden Desk' },
    { id: 2, type: 'WARNING', title: 'Severe Storm Forecast', message: 'Meteorological Department has issued an orange alert for heavy rain and high winds. Please secure all window locks and avoid parking vehicles under trees.', date: '01 June 2026 • 09:15 AM', sender: 'Administration Section' },
    { id: 3, type: 'INFO', title: 'Guest Lecture in Auditorium', message: 'All trainee officers are requested to join the keynote address on "Official Statistics in Digital India" at 11:30 AM. Attendance is mandatory.', date: '31 May 2026 • 04:00 PM', sender: 'Training Coordinator' }
  ]);

  const [newAlert, setNewAlert] = useState({ title: '', message: '', type: 'INFO' });

  const handlePublishAlert = (e) => {
    e.preventDefault();
    if (!newAlert.title || !newAlert.message) return;
    
    const timeStr = new Date().toLocaleString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    setAlerts([
      {
        id: Date.now(),
        type: newAlert.type,
        title: newAlert.title,
        message: newAlert.message,
        date: timeStr,
        sender: 'Hostel System Admin Console'
      },
      ...alerts
    ]);

    setNewAlert({ title: '', message: '', type: 'INFO' });
  };

  const handleDismiss = (id) => {
    if (window.confirm("Are you sure you want to dismiss this broadcast announcement?")) {
      setAlerts(alerts.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-700 font-sans">
      
      {/* Emergency Alerts Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Emergency Alerts & Broadcast Announcements</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Broadcast critical emergency alerts, weather warnings, scheduling delays, and campus announcements to all trainees instantly.</p>
        </div>
        <div className="flex gap-2 text-xs font-bold text-center">
          <div className="bg-red-50 text-red-800 border border-red-100 px-3.5 py-2 rounded-xl shadow-3xs">
            <span className="text-[10px] text-slate-400 block uppercase">Critical Warnings</span>
            <span className="text-lg font-black font-mono">{alerts.filter(a => a.type === 'CRITICAL').length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Publish Broadcast Form */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col justify-between space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-800">Publish Emergency Announcement</h3>
            <p className="text-xs text-slate-500 font-medium">Draft and broadcast notifications instantly to all trainee monitors.</p>
          </div>

          <form onSubmit={handlePublishAlert} className="space-y-4 font-semibold text-xs sm:text-sm text-slate-650">
            
            <div className="space-y-1.5">
              <label className="block text-slate-700">Broadcast Priority / Type</label>
              <div className="grid grid-cols-3 gap-2">
                {['INFO', 'WARNING', 'CRITICAL'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewAlert({ ...newAlert, type })}
                    className={`py-2 rounded-lg text-[10px] font-black border transition-all text-center cursor-pointer ${
                      newAlert.type === type
                        ? type === 'CRITICAL' ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                          : type === 'WARNING' ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                          : 'bg-blue-600 border-blue-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700">Announcement Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Water Pipeline Outage"
                value={newAlert.title}
                onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-bold text-slate-800 bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-700">Broadcast Message</label>
              <textarea
                required
                rows="4"
                placeholder="Draft detailed description of the alert or notice here..."
                value={newAlert.message}
                onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs font-semibold text-slate-800 bg-white resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs uppercase rounded-lg shadow-sm cursor-pointer transition-colors"
            >
              🚀 Broadcast Alert Instantly
            </button>
          </form>
        </div>

        {/* Live Broadcast Feed */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 lg:col-span-2 flex flex-col justify-between space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-slate-800">Live Broadcast Feed</h3>
            <p className="text-xs text-slate-500 font-medium">Currently active alerts and notices broadcast across the academy grid.</p>
          </div>

          <div className="space-y-4 flex-grow overflow-y-auto max-h-[420px] pr-1">
            {alerts.length > 0 ? (
              alerts.map((item) => {
                const isCritical = item.type === 'CRITICAL';
                const isWarning = item.type === 'WARNING';
                return (
                  <div 
                    key={item.id} 
                    className={`border-l-4 rounded-r-xl p-4.5 transition-all text-xs font-semibold relative group ${
                      isCritical ? 'bg-rose-50/50 border-rose-600 text-rose-950' : 
                      isWarning ? 'bg-amber-50/40 border-amber-500 text-amber-950' : 
                      'bg-blue-50/30 border-blue-600 text-blue-950'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                            isCritical ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            isWarning ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            {item.type}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold font-mono">{item.date}</span>
                        </div>
                        <h4 className="font-extrabold text-sm text-slate-800 leading-snug">{item.title}</h4>
                      </div>
                      
                      <button
                        onClick={() => handleDismiss(item.id)}
                        className="text-slate-350 hover:text-rose-700 text-xs font-black uppercase transition-colors hover:underline cursor-pointer"
                        title="Dismiss alert"
                      >
                        Dismiss
                      </button>
                    </div>
                    
                    <p className="text-slate-600 mt-2.5 font-medium leading-relaxed">{item.message}</p>
                    
                    <div className="mt-3.5 pt-2 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>Sender: {item.sender}</span>
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-rose-600 animate-ping' : isWarning ? 'bg-amber-500' : 'bg-blue-600'}`}></span>
                        Live Broadcast
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl space-y-2">
                <p className="text-slate-800 font-extrabold text-sm">No active broadcasts found</p>
                <p className="text-slate-450 font-medium text-xs">All emergency channels are clear.</p>
              </div>
            )}
          </div>
        </div>

      </div>
      
    </div>
  );
}
