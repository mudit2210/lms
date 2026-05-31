import React, { useState, useEffect } from 'react';

// Seeding default attendance sessions
const DEFAULT_ATT_SESSIONS = [
  { id: 'ATT-001', date: '2026-06-01', time: '10:00 AM - 12:00 PM', course: 'Time Series forecasting II', batch: 'ISS-46', trainer: 'Dr. Ramesh Kumar', trainerAtt: 'Present', rate: 95.8, presentList: ['Aman Gupta', 'Deepak Sen', 'Preeti Patil'], absentList: ['Nisha Roy'] },
  { id: 'ATT-002', date: '2026-06-01', time: '02:00 PM - 04:00 PM', course: 'National Accounts Statistics', batch: 'DOM-NAS', trainer: 'Prof. Ananya Sen', trainerAtt: 'Present', rate: 100, presentList: ['Vijay Sharma', 'Harish Prasad'], absentList: [] }
];

export default function AttendanceModule({ theme }) {
  const [attSessions, setAttSessions] = useState(() => {
    const saved = localStorage.getItem('lms_attendance');
    return saved ? JSON.parse(saved) : DEFAULT_ATT_SESSIONS;
  });

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    localStorage.setItem('lms_attendance', JSON.stringify(attSessions));
  }, [attSessions]);

  // Load batches on mount
  useEffect(() => {
    const savedBatches = localStorage.getItem('lms_batches');
    if (savedBatches) {
      setBatches(JSON.parse(savedBatches));
    }
  }, []);

  const [activeTab, setActiveTab] = useState('tracker'); // tracker, biometric, reports
  const [selectedSessionId, setSelectedSessionId] = useState(attSessions[0]?.id || '');
  const [newSession, setNewSession] = useState({ date: '2026-06-01', time: '10:00 AM - 12:00 PM', course: '', batchId: '', trainer: '' });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateSession = (e) => {
    e.preventDefault();
    if (!newSession.batchId) return;
    const targetBatch = batches.find(b => b.id === newSession.batchId);
    if (!targetBatch) return;

    const added = {
      id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
      date: newSession.date,
      time: newSession.time,
      course: targetBatch.course,
      batch: targetBatch.id,
      trainer: targetBatch.trainer,
      trainerAtt: 'Present',
      rate: 100,
      presentList: [...(targetBatch.members || [])],
      absentList: []
    };

    setAttSessions([...attSessions, added]);
    setSelectedSessionId(added.id);
    setShowCreateModal(false);
    alert('Attendance register created successfully. Select student status below.');
  };

  const toggleStudentStatus = (sessionId, studentName) => {
    setAttSessions(attSessions.map(ses => {
      if (ses.id !== sessionId) return ses;
      let present = [...ses.presentList];
      let absent = [...ses.absentList];

      if (present.includes(studentName)) {
        present = present.filter(s => s !== studentName);
        absent.push(studentName);
      } else {
        absent = absent.filter(s => s !== studentName);
        present.push(studentName);
      }

      const total = present.length + absent.length;
      const rate = total > 0 ? parseFloat(((present.length / total) * 100).toFixed(1)) : 100;

      return {
        ...ses,
        presentList: present,
        absentList: absent,
        rate
      };
    }));
  };

  const toggleTrainerStatus = (sessionId) => {
    setAttSessions(attSessions.map(ses => {
      if (ses.id !== sessionId) return ses;
      return {
        ...ses,
        trainerAtt: ses.trainerAtt === 'Present' ? 'Absent' : 'Present'
      };
    }));
  };

  const selectedSession = attSessions.find(s => s.id === selectedSessionId);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Dynamic Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-cyan-500 rounded-full inline-block"></span>
            📊 Attendance Management Portal
          </h2>
          <p className="text-xs text-slate-450 font-semibold mt-1">Audit session logs, execute physical biometric checkpoints, or trigger remote check-ins.</p>
        </div>
      </div>

      {/* Subtabs bar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 font-sans">
        {[
          { id: 'tracker', label: '📋 Session registers' },
          { id: 'biometric', label: '📳 NIC Biometrics Gateway' },
          { id: 'reports', label: '📊 Summary Reports' }
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === sub.id
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Tracker View */}
      {activeTab === 'tracker' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Registers Left List */}
          <div className="bg-white border p-4 rounded-2xl shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="font-extrabold text-slate-800 text-xs">Active Session List</h4>
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-[10px] bg-cyan-600 text-white font-black px-2 py-1 rounded hover:bg-cyan-700 cursor-pointer"
              >
                + Register
              </button>
            </div>
            <div className="space-y-2">
              {attSessions.map(ses => (
                <button
                  key={ses.id}
                  onClick={() => setSelectedSessionId(ses.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selectedSessionId === ses.id ? 'border-cyan-500 bg-cyan-50/20 text-cyan-800' : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-center text-[9px] font-black text-slate-400">
                    <span>{ses.date} • {ses.time}</span>
                    <span className="bg-cyan-100 text-cyan-800 border px-1 py-0.2 rounded">{ses.rate}% Rate</span>
                  </div>
                  <p className="font-extrabold text-slate-800 mt-1">{ses.course}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Attendance sheet right side */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-4">
            {selectedSession ? (
              <>
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Attendance Sheet: {selectedSession.course}</h4>
                    <p className="text-[10px] text-slate-455 font-bold mt-1">Batch: <span className="text-slate-800">{selectedSession.batch}</span> | Trainer: <span className="text-slate-800">{selectedSession.trainer}</span></p>
                  </div>
                  <button
                    onClick={() => toggleTrainerStatus(selectedSession.id)}
                    className={`px-3 py-1 text-[10px] font-black rounded-lg border cursor-pointer uppercase ${
                      selectedSession.trainerAtt === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    Faculty: {selectedSession.trainerAtt}
                  </button>
                </div>

                <div className="space-y-2 pt-1 font-semibold text-slate-655 text-xs">
                  <div className="flex justify-between text-[10px] font-black text-slate-450 border-b pb-1 uppercase">
                    <span>Trainee Name</span>
                    <span>Status Toggle</span>
                  </div>

                  {/* Combine present and absent for full roster list */}
                  {[...selectedSession.presentList, ...selectedSession.absentList].map((student, idx) => {
                    const isPresent = selectedSession.presentList.includes(student);
                    return (
                      <div key={idx} className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <span className="font-extrabold text-slate-850">{student}</span>
                        <button
                          onClick={() => toggleStudentStatus(selectedSession.id, student)}
                          className={`px-3 py-1 rounded text-[10px] font-black tracking-wider border cursor-pointer uppercase ${
                            isPresent ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {isPresent ? 'PRESENT' : 'ABSENT'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-12">Please select a session from the registry sidebar to manage roster attendance.</p>
            )}
          </div>
        </div>
      )}

      {/* Biometrics simulator tab */}
      {activeTab === 'biometric' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">MoSPI Physical Biometrics & Web OTP Portal Gateway</h4>
          <p className="text-xs text-slate-450 mt-0.5 border-b pb-3 border-gray-100">Simulate NIC secure gateway integrations for biometric scanners or two-factor SMS locks.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 border rounded-xl shadow-3xs text-left space-y-3">
              <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-500 uppercase">GATEWAY CHANNEL 1</span>
              <h5 className="font-extrabold text-slate-800 text-xs">Biometric Fingertip Gateway</h5>
              <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">NIC terminal scans biometric signatures for offline trainees, uploading secure occupancy stamps instantly to the active register sheet.</p>
              <button
                onClick={() => alert('Biometric Gate Sync Complete. marked 35 probationers present in Lecture Hall A.')}
                className="w-full py-1.5 bg-cyan-700 hover:bg-cyan-800 text-white font-extrabold text-[10px] rounded-lg cursor-pointer transition-colors text-center"
              >
                Scan Fingerprint Gate ➔
              </button>
            </div>

            <div className="p-5 border rounded-xl shadow-3xs text-left space-y-3">
              <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-500 uppercase">GATEWAY CHANNEL 2</span>
              <h5 className="font-extrabold text-slate-800 text-xs">Web OTP Check-in Authenticator</h5>
              <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">Online webinars trigger dynamic portal checkout codes. Trainees type secure 4-digit codes on their screens to self-check presence stamps.</p>
              <button
                onClick={() => alert('Dispatched Web OTP tokens. remote check-in verification log compiled.')}
                className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 border text-slate-700 font-extrabold text-[10px] rounded-lg cursor-pointer transition-colors text-center"
              >
                Broadcast OTP Checkout ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reports tab */}
      {activeTab === 'reports' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">Academic Roster Attendance Reports</h4>
          <p className="text-xs text-slate-455 border-b pb-3">Downloadable audit worksheets containing historical records.</p>

          <div className="space-y-3 font-semibold text-slate-655 text-xs pt-2">
            {attSessions.map(ses => (
              <div key={ses.id} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-3xs">
                <div>
                  <h5 className="font-extrabold text-slate-800">{ses.course}</h5>
                  <p className="text-[10px] text-slate-450">Date: {ses.date} | Batch: {ses.batch} | Roster size: {ses.presentList.length + ses.absentList.length} Trainees</p>
                </div>
                <button
                  onClick={() => alert(`Attendance ledger worksheet generated for ${ses.course}. Downloading CSV file...`)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border rounded-lg font-black text-[10px] text-slate-700 cursor-pointer"
                >
                  Download Log (CSV)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-extrabold text-slate-800">Launch Daily Attendance Register</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCreateSession} className="space-y-4 font-semibold text-slate-600 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Target Cohort Batch</label>
                <select
                  value={newSession.batchId}
                  onChange={e => setNewSession({ ...newSession, batchId: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-slate-700 font-medium"
                >
                  <option value="">-- Choose Batch --</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Scheduled Timing</label>
                  <select
                    value={newSession.time}
                    onChange={e => setNewSession({ ...newSession, time: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-cyan-500 focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                    <option value="11:30 AM - 01:30 PM">11:30 AM - 01:30 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Target Date</label>
                  <input
                    type="date" required
                    value={newSession.date} onChange={e => setNewSession({ ...newSession, date: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-cyan-500 focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 border rounded-xl hover:bg-slate-50 cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-xl cursor-pointer">Create Register</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
