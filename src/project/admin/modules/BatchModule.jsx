import React, { useState, useEffect } from 'react';

// Seeding default batches
const DEFAULT_BATCHES = [
  { id: 'BAT-001', name: '46th ISS Probationers Group Alpha', course: '46th Batch Induction Course for ISS Probationers', trainer: 'Dr. Ramesh Kumar', size: 24, startDate: '2026-06-08', endDate: '2026-06-22', status: 'Active', mode: 'offline', members: ['Aman Gupta', 'Deepak Sen', 'Nisha Roy', 'Preeti Patil'] },
  { id: 'BAT-002', name: 'GDP Compilation Workshop Grade I', course: 'National Accounts Statistics & GDP Estimations', trainer: 'Prof. Ananya Sen', size: 18, startDate: '2026-06-22', endDate: '2026-06-25', status: 'Active', mode: 'hybrid', members: ['Vijay Sharma', 'Harish Prasad'] }
];

export default function BatchModule({ theme }) {
  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('lms_batches');
    return saved ? JSON.parse(saved) : DEFAULT_BATCHES;
  });

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('lms_programs');
    return saved ? JSON.parse(saved) : [];
  });

  const [faculty, setFaculty] = useState(() => {
    const saved = localStorage.getItem('lms_faculty');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lms_batches', JSON.stringify(batches));
  }, [batches]);

  // Load programs & faculty on mount
  useEffect(() => {
    const savedProgs = localStorage.getItem('lms_programs');
    if (savedProgs) setPrograms(JSON.parse(savedProgs));
    const savedFac = localStorage.getItem('lms_faculty');
    if (savedFac) setFaculty(JSON.parse(savedFac));
  }, []);

  const [activeTab, setActiveTab] = useState('all'); // all, create, membership, notifications
  const [newBatch, setNewBatch] = useState({ name: '', course: '', trainer: '', startDate: '', endDate: '', mode: 'offline' });
  const [selectedBatchId, setSelectedBatchId] = useState(batches[0]?.id || '');
  const [newMemberName, setNewMemberName] = useState('');
  const [notification, setNotification] = useState({ batchId: '', msg: '', channel: 'Portal Alert' });

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!newBatch.name || !newBatch.course) return;
    const added = {
      id: `BAT-${Math.floor(100 + Math.random() * 900)}`,
      ...newBatch,
      size: 0,
      status: 'Active',
      members: []
    };
    setBatches([...batches, added]);
    alert('Success! New Training Batch created successfully.');
    setActiveTab('all');
    setNewBatch({ name: '', course: '', trainer: '', startDate: '', endDate: '', mode: 'offline' });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName || !selectedBatchId) return;
    setBatches(batches.map(bat => {
      if (bat.id !== selectedBatchId) return bat;
      return {
        ...bat,
        members: [...bat.members, newMemberName],
        size: bat.size + 1
      };
    }));
    setNewMemberName('');
    alert(`Added trainee to batch membership.`);
  };

  const handleRemoveMember = (batchId, memberName) => {
    setBatches(batches.map(bat => {
      if (bat.id !== batchId) return bat;
      return {
        ...bat,
        members: bat.members.filter(m => m !== memberName),
        size: Math.max(0, bat.size - 1)
      };
    }));
  };

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!notification.msg || !notification.batchId) return;
    alert(`Success! Broadcast notification dispatched to Batch trainees via ${notification.channel}.`);
    setNotification({ batchId: '', msg: '', channel: 'Portal Alert' });
  };

  const selectedBatch = batches.find(b => b.id === selectedBatchId);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Action Header Card */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-violet-600 rounded-full inline-block"></span>
            👥 Groups & Batch Management Workspace
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Configure academic trainee cohorts, allocate coordinators, and schedule alerts.</p>
        </div>
      </div>

      {/* Batch Subtabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 font-sans">
        {[
          { id: 'all', label: '🗂️ All Batches' },
          { id: 'create', label: '➕ Create Batch' },
          { id: 'membership', label: '👥 Group Membership' },
          { id: 'notifications', label: '📢 Dispatch Notifications' }
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === sub.id
                ? 'bg-violet-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* ── Tab Contents ── */}
      {activeTab === 'all' && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-gray-150 flex justify-between items-center">
            <div>
              <h4 className="font-extrabold text-slate-800 font-sans">Statistical Training Batches Directory</h4>
              <p className="text-xs text-slate-455 mt-0.5">Directory catalog mapping classrooms, coordinators, and member volumes.</p>
            </div>
            <span className="bg-purple-50 border border-purple-200 text-purple-800 font-black px-2.5 py-0.5 rounded text-[10px] uppercase">
              {batches.length} Batches Active
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
              <thead className="bg-slate-50 border-b border-gray-150 uppercase tracking-wider text-slate-400 font-black text-[10px]">
                <tr>
                  <th className="p-4">Batch ID</th>
                  <th className="p-4">Batch Cohort Name</th>
                  <th className="p-4">Associated Syllabus Course</th>
                  <th className="p-4">Faculty Coordinator</th>
                  <th className="p-4">Trainees Volume</th>
                  <th className="p-4">Duration timeline</th>
                  <th className="p-4">Status Check</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                {batches.map(bat => (
                  <tr key={bat.id} className="hover:bg-slate-50/50">
                    <td className="p-4 font-mono font-bold text-slate-500">{bat.id}</td>
                    <td className="p-4 font-extrabold text-slate-850">{bat.name}</td>
                    <td className="p-4 text-emerald-800">{bat.course}</td>
                    <td className="p-4 font-bold text-slate-800">{bat.trainer || 'Unassigned'}</td>
                    <td className="p-4 font-bold text-indigo-700">{bat.members?.length || 0} Trainees</td>
                    <td className="p-4">{bat.startDate} to {bat.endDate}</td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-250 px-2 py-0.5 rounded text-[9px] font-black tracking-wider uppercase">
                        {bat.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Batch tab */}
      {activeTab === 'create' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">Establish New Training Group Batch</h4>
          <form onSubmit={handleCreateBatch} className="border-t border-gray-100 pt-4 space-y-4 font-semibold text-slate-655 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Batch Name Designation</label>
                <input
                  type="text" required placeholder="e.g. 46th ISS Batch Alpha Group..."
                  value={newBatch.name} onChange={e => setNewBatch({ ...newBatch, name: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Parent Training Program Course</label>
                <select
                  value={newBatch.course}
                  onChange={e => {
                    const match = programs.find(p => p.name === e.target.value);
                    setNewBatch({ ...newBatch, course: e.target.value, trainer: match ? match.trainer : '', mode: match ? match.mode : 'offline' });
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none"
                >
                  <option value="">-- Select Registered Program --</option>
                  {programs.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Start Date</label>
                <input
                  type="date" required
                  value={newBatch.startDate} onChange={e => setNewBatch({ ...newBatch, startDate: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">End Date</label>
                <input
                  type="date" required
                  value={newBatch.endDate} onChange={e => setNewBatch({ ...newBatch, endDate: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Assigned Trainer</label>
                <select
                  value={newBatch.trainer} onChange={e => setNewBatch({ ...newBatch, trainer: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none"
                >
                  <option value="">-- Choose Instructor --</option>
                  {faculty.map(f => <option key={f.name} value={f.name}>{f.name}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" className="px-5 py-2 bg-violet-650 hover:bg-violet-750 text-white font-bold rounded-lg cursor-pointer">
              Launch Mapped Batch
            </button>
          </form>
        </div>
      )}

      {/* Group Membership tab */}
      {activeTab === 'membership' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Batches Selector List */}
          <div className="bg-white border p-4 rounded-2xl shadow-xs space-y-3">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Active Batches Selector</h4>
            <div className="space-y-2">
              {batches.map(bat => (
                <button
                  key={bat.id}
                  onClick={() => setSelectedBatchId(bat.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selectedBatchId === bat.id ? 'border-violet-500 bg-violet-50/20 text-violet-800' : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-extrabold">{bat.name}</p>
                  <p className="text-[10px] text-slate-450 mt-1 font-medium">{bat.course}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Members list and add member form */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-4">
            {selectedBatch ? (
              <>
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Group Members: {selectedBatch.name}</h4>
                    <p className="text-[11px] text-slate-450">Currently assigned trainees mapped to curriculum path.</p>
                  </div>
                  <span className="bg-violet-100 border text-violet-850 px-2 py-0.5 rounded font-black text-[10px] uppercase">
                    {selectedBatch.members?.length || 0} trainees enrolled
                  </span>
                </div>

                <form onSubmit={handleAddMember} className="flex gap-2 font-semibold text-slate-655 text-xs pt-1">
                  <input
                    type="text" required placeholder="Trainee Name to add..."
                    value={newMemberName} onChange={e => setNewMemberName(e.target.value)}
                    className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                  <button type="submit" className="bg-violet-650 hover:bg-violet-750 text-white font-extrabold px-4 py-1.5 rounded-lg cursor-pointer">
                    + Enroll Trainee
                  </button>
                </form>

                <div className="space-y-2 pt-2 text-xs font-semibold">
                  {selectedBatch.members?.length === 0 ? (
                    <p className="text-[10px] text-slate-400 italic">No trainees currently enrolled in this batch.</p>
                  ) : (
                    selectedBatch.members?.map((mem, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-slate-50 pb-2">
                        <span className="font-extrabold text-slate-800">{mem}</span>
                        <button
                          onClick={() => handleRemoveMember(selectedBatch.id, mem)}
                          className="text-red-500 hover:text-red-700 font-extrabold cursor-pointer"
                        >
                          Unenroll
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-12">Please select a batch from the sidebar register to manage members.</p>
            )}
          </div>
        </div>
      )}

      {/* Notifications tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">Dispatch Group Broadcast Alerts</h4>
          <p className="text-xs text-slate-450 mt-0.5 border-b pb-3 border-gray-100">Broadcast immediate programmatic changes or syllabus warnings to cohort members.</p>

          <form onSubmit={handleBroadcast} className="space-y-4 font-semibold text-slate-655 text-xs pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Target Group Batch</label>
                <select
                  value={notification.batchId}
                  onChange={e => setNotification({ ...notification, batchId: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none text-slate-700"
                >
                  <option value="">-- Choose Target Batch --</option>
                  {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Dispatch Channel</label>
                <select
                  value={notification.channel}
                  onChange={e => setNotification({ ...notification, channel: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-violet-500 focus:outline-none text-slate-700"
                >
                  <option value="Portal Alert">Portal Notification Engine</option>
                  <option value="Secure Email Server">NIC Gov Secure Email</option>
                  <option value="SMS Dispatcher">Web OTP Mobile SMS</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-black text-slate-455 uppercase">Alert Message Content</label>
              <textarea
                required placeholder="e.g. Due to urgent VIP conference, Lecture Hall A afternoon session is rescheduled to Lecture Hall B..."
                value={notification.msg} onChange={e => setNotification({ ...notification, msg: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-violet-500 focus:outline-none h-20 placeholder-slate-400"
              />
            </div>

            <button type="submit" className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg cursor-pointer">
              Broadcast Alert ➔
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
