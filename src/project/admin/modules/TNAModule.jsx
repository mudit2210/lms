import React, { useState, useEffect } from 'react';

// Seeding default TNA Needs
const DEFAULT_TNA_NEEDS = [
  { id: 'TNA-001', dept: 'Department of Statistics', designation: 'ISS Probationers', skill: 'Time Series Regression & R-Modeling', priority: 'Critical', status: 'Pending', approvalNote: '', mappedCourse: '' },
  { id: 'TNA-002', dept: 'Economics Division', designation: 'Director-level Officers', skill: 'National GDP Estimation & Compilation Methods', priority: 'High', status: 'Approved', approvalNote: 'Urgent refresher requested by Ministry head.', mappedCourse: 'National Accounts Statistics & GDP Estimations' },
  { id: 'TNA-003', dept: 'IT Administration', designation: 'Subordinate Statistical Service', skill: 'Cybersecurity Protocols & SSO Integration', priority: 'Medium', status: 'Approved', approvalNote: 'Mapped to NIC secure protocol session.', mappedCourse: '' }
];

export default function TNAModule({ theme }) {
  const [tnaNeeds, setTnaNeeds] = useState(() => {
    const saved = localStorage.getItem('lms_tna_needs');
    return saved ? JSON.parse(saved) : DEFAULT_TNA_NEEDS;
  });

  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('lms_programs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lms_tna_needs', JSON.stringify(tnaNeeds));
  }, [tnaNeeds]);

  // Read latest programs on mount
  useEffect(() => {
    const saved = localStorage.getItem('lms_programs');
    if (saved) setPrograms(JSON.parse(saved));
  }, []);

  const [activeTab, setActiveTab] = useState('overview'); // overview, inputs, gap_analysis, approvals, mapping
  const [newNeed, setNewNeed] = useState({ dept: 'Department of Statistics', designation: 'ISS Probationers', skill: '', priority: 'High' });
  const [approvalNote, setApprovalNote] = useState('');
  const [selectedNeed, setSelectedNeed] = useState(null);

  const handleSubmitNeed = (e) => {
    e.preventDefault();
    if (!newNeed.skill) return;
    const added = {
      id: `TNA-${Math.floor(100 + Math.random() * 900)}`,
      ...newNeed,
      status: 'Pending',
      approvalNote: '',
      mappedCourse: ''
    };
    setTnaNeeds([...tnaNeeds, added]);
    setNewNeed({ dept: 'Department of Statistics', designation: 'ISS Probationers', skill: '', priority: 'High' });
    alert('Success! Simulated TNA need submitted for Admin evaluation.');
  };

  const handleApproveNeed = (id, note) => {
    setTnaNeeds(tnaNeeds.map(need => {
      if (need.id !== id) return need;
      return { ...need, status: 'Approved', approvalNote: note };
    }));
    setSelectedNeed(null);
    setApprovalNote('');
  };

  const handleRejectNeed = (id, note) => {
    setTnaNeeds(tnaNeeds.map(need => {
      if (need.id !== id) return need;
      return { ...need, status: 'Rejected', approvalNote: note };
    }));
    setSelectedNeed(null);
    setApprovalNote('');
  };

  const handleMapCourse = (id, courseName) => {
    setTnaNeeds(tnaNeeds.map(need => {
      if (need.id !== id) return need;
      return { ...need, mappedCourse: courseName };
    }));
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'High': return 'bg-amber-50 text-amber-700 border border-amber-200';
      default: return 'bg-slate-100 text-slate-600 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Overview stats header cap */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block"></span>
            🎯 Training Need Assessment (TNA) Dashboard
          </h2>
          <p className="text-xs text-slate-400 font-semibold mt-1">Identify academic requirements, review skill indices, and map official syllabi.</p>
        </div>
      </div>

      {/* TNA subtabs menu bar */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 font-sans">
        {[
          { id: 'overview', label: '📊 TNA Overview' },
          { id: 'inputs', label: '📥 Department Inputs' },
          { id: 'gap_analysis', label: '📈 Skill Gap Matrix' },
          { id: 'approvals', label: '⚖️ Approvals Queue' },
          { id: 'mapping', label: '🔗 Course Mapping' }
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === sub.id
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-450 font-black uppercase">Logged Needs</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{tnaNeeds.length}</p>
              <p className="text-[10px] text-rose-600 mt-1.5 font-bold">✓ Across active statistical units</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase">Pending Approval</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{tnaNeeds.filter(n => n.status === 'Pending').length}</p>
              <p className="text-[10px] text-amber-600 mt-1.5 font-bold">⚖️ Awaiting Director review</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase">Approved Gaps</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{tnaNeeds.filter(n => n.status === 'Approved').length}</p>
              <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">✓ Verified requirements</p>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-xs">
              <p className="text-[10px] text-slate-455 font-black uppercase">Mapped to Courses</p>
              <p className="text-3xl font-black text-slate-800 mt-1">{tnaNeeds.filter(n => n.mappedCourse).length}</p>
              <p className="text-[10px] text-blue-600 mt-1.5 font-bold">✓ Integrated schedule recommendation</p>
            </div>
          </div>

          {/* Active Requirements List */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-gray-150">
              <h4 className="font-extrabold text-slate-800 font-sans">Active Educational Requirements Registry</h4>
              <p className="text-xs text-slate-455 mt-0.5">Summary ledger of statistical skill shortages recorded from divisions.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
                <thead className="bg-slate-50 border-b border-gray-150 uppercase tracking-wider text-slate-400 font-black text-[10px]">
                  <tr>
                    <th className="p-4">TNA Code</th>
                    <th className="p-4">Statistical Wing</th>
                    <th className="p-4">Designation Level</th>
                    <th className="p-4">Logged Skill Shortage</th>
                    <th className="p-4">Priority Scale</th>
                    <th className="p-4">Status Check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                  {tnaNeeds.map(need => (
                    <tr key={need.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono font-bold text-slate-500">{need.id}</td>
                      <td className="p-4 font-extrabold text-slate-800">{need.dept}</td>
                      <td className="p-4 font-semibold">{need.designation}</td>
                      <td className="p-4 text-slate-750 font-bold">{need.skill}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${getPriorityBadge(need.priority)}`}>
                          {need.priority}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                          need.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          need.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                          'bg-amber-50 text-amber-700 border-amber-250'
                        }`}>{need.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Department Inputs Tab */}
      {activeTab === 'inputs' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">Submit Immediate Educational Need request</h4>
          <form onSubmit={handleSubmitNeed} className="border-t border-gray-100 pt-4 space-y-4 font-semibold text-slate-655 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Logged Submitting Division</label>
                <select
                  value={newNeed.dept} onChange={e => setNewNeed({ ...newNeed, dept: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="Department of Statistics">Department of Statistics</option>
                  <option value="Economics Division">Economics Division</option>
                  <option value="IT Administration">IT Administration</option>
                  <option value="Survey Methodology Cell">Survey Methodology Cell</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Designation Level</label>
                <select
                  value={newNeed.designation} onChange={e => setNewNeed({ ...newNeed, designation: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="ISS Probationers">ISS Probationers</option>
                  <option value="Director-level Officers">Director-level Officers</option>
                  <option value="Subordinate Statistical Service">Subordinate Statistical Service</option>
                  <option value="Systems Administrator Desk">Systems Administrator Desk</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Skill Gap Shortage</label>
                <input
                  type="text" required placeholder="e.g. Econometric Modeling & R Studio practicums..."
                  value={newNeed.skill} onChange={e => setNewNeed({ ...newNeed, skill: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Priority Index</label>
                <select
                  value={newNeed.priority} onChange={e => setNewNeed({ ...newNeed, priority: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <button type="submit" className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg cursor-pointer">
              Log Assessment Request
            </button>
          </form>
        </div>
      )}

      {/* Skill Gap Matrix analysis tab */}
      {activeTab === 'gap_analysis' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div>
            <h4 className="font-extrabold text-slate-800 font-sans">Skill Gap Matrix & Priority Index</h4>
            <p className="text-xs text-slate-450 font-semibold mt-0.5">Designation-wise matrix breakdown of logged requirements mapped to severity indices.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {tnaNeeds.map(need => (
              <div key={need.id} className="p-4 border rounded-xl shadow-3xs flex flex-col justify-between h-28 hover:shadow-xs hover:border-rose-455 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-black text-slate-850 text-xs">{need.skill}</h5>
                    <p className="text-[10px] text-slate-450 font-bold mt-0.5">{need.dept} ➔ {need.designation}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                    need.priority === 'Critical' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-slate-100 text-slate-800 border'
                  }`}>
                    {need.priority}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold border-t pt-2 border-slate-50">
                  <span className="text-slate-400">Severity Rating: <strong className="text-rose-800">{need.priority === 'Critical' ? '9.8/10' : '7.5/10'}</strong></span>
                  <span className="text-slate-400">Security Cleared: <strong className="text-emerald-700">Yes</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approvals queue tab */}
      {activeTab === 'approvals' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">TNA Approvals & Directorate Queue</h4>
          <div className="space-y-4 pt-2">
            {tnaNeeds.filter(n => n.status === 'Pending').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">Approval queue is completely clear. All logged needs processed.</p>
            ) : (
              tnaNeeds.filter(n => n.status === 'Pending').map(need => (
                <div key={need.id} className="border border-slate-200 rounded-xl p-4 space-y-3 shadow-3xs flex flex-col justify-between">
                  <div className="flex justify-between items-start border-b pb-2 border-slate-100">
                    <div>
                      <h5 className="font-extrabold text-slate-800 text-xs">{need.skill}</h5>
                      <p className="text-[10px] text-slate-450 font-semibold">{need.dept} • {need.designation}</p>
                    </div>
                    <span className="bg-amber-50 text-amber-700 border border-amber-250 px-2 py-0.5 rounded text-[8.5px] font-black uppercase">
                      Awaiting Audit
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-455 uppercase">Directorate Evaluation Notes</label>
                    <textarea
                      placeholder="Add administrative review notes and schedule details..."
                      value={selectedNeed === need.id ? approvalNote : ''}
                      onChange={e => {
                        setSelectedNeed(need.id);
                        setApprovalNote(e.target.value);
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none h-14 font-medium"
                    />
                  </div>

                  <div className="flex justify-end gap-2 text-xs font-bold pt-1">
                    <button
                      onClick={() => handleRejectNeed(need.id, selectedNeed === need.id ? approvalNote : '')}
                      className="px-3.5 py-1.5 border border-rose-250 text-rose-800 rounded-lg hover:bg-rose-50 cursor-pointer"
                    >
                      Reject Request
                    </button>
                    <button
                      onClick={() => handleApproveNeed(need.id, selectedNeed === need.id ? approvalNote : '')}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer"
                    >
                      Approve & Map
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Course Mapping tab */}
      {activeTab === 'mapping' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">Approved Need Course Syllabus Mapping</h4>
          <p className="text-xs text-slate-450 font-semibold border-b pb-3 border-gray-100">Map approved skills gaps to pre-registered MoSPI curriculum packages.</p>

          <div className="space-y-4 font-semibold text-slate-655 text-xs pt-2">
            {tnaNeeds.filter(n => n.status === 'Approved').map(need => (
              <div key={need.id} className="p-4 border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-3xs">
                <div>
                  <h5 className="font-extrabold text-slate-800">{need.skill}</h5>
                  <p className="text-[10px] text-slate-450 font-bold">{need.dept} • {need.designation}</p>
                  {need.approvalNote && <p className="text-[10px] text-slate-400 mt-1 italic">Notes: "{need.approvalNote}"</p>}
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-[9px] font-black text-slate-455 uppercase shrink-0">Map Course:</label>
                  <select
                    value={need.mappedCourse}
                    onChange={e => handleMapCourse(need.id, e.target.value)}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none"
                  >
                    <option value="">-- Choose Syllabus --</option>
                    {programs.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
