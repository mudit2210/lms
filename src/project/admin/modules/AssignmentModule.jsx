import React, { useState, useEffect } from 'react';

// Seeding default assessments
const DEFAULT_ASSIGNMENTS = [
  { id: 'ASN-001', title: 'Macroeconomic GDP Regression Model', course: 'National Accounts Statistics & GDP Estimations', maxMarks: 100, dueDate: '2026-06-15', status: 'Published' },
  { id: 'ASN-002', title: 'Seasonal Adjustments with X-13ARIMA', course: 'Time Series & Forecasting Applied Practicum', maxMarks: 50, dueDate: '2026-06-22', status: 'Published' }
];

const DEFAULT_SUBMISSIONS = [
  { subId: 'SUB-101', asnId: 'ASN-001', student: 'Aman Gupta', date: '2026-06-12', fileName: 'GDP_Regression_ISS_Aman.pdf', marks: 92, status: 'Graded', critique: 'Excellent econometric model specifications. Clean residuals plots.' },
  { subId: 'SUB-102', asnId: 'ASN-001', student: 'Preeti Patil', date: '2026-06-14', fileName: 'GDP_Est_Macro_Preeti.pdf', marks: null, status: 'Submitted', critique: '' },
  { subId: 'SUB-103', asnId: 'ASN-002', student: 'Deepak Sen', date: '2026-06-13', fileName: 'ARIMA_Seasonal_Deepak.pdf', marks: null, status: 'Submitted', critique: '' }
];

export default function AssignmentModule({ theme }) {
  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('lms_assignments');
    return saved ? JSON.parse(saved) : DEFAULT_ASSIGNMENTS;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('lms_submissions');
    return saved ? JSON.parse(saved) : DEFAULT_SUBMISSIONS;
  });

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    localStorage.setItem('lms_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('lms_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Read batches on mount
  useEffect(() => {
    const savedBatches = localStorage.getItem('lms_batches');
    if (savedBatches) setBatches(JSON.parse(savedBatches));
  }, []);

  const [activeTab, setActiveTab] = useState('desk'); // desk, vault, grading, leaderboard
  const [newAsn, setNewAsn] = useState({ title: '', course: '', maxMarks: 100, dueDate: '' });
  const [selectedAsnId, setSelectedAsnId] = useState(assignments[0]?.id || '');
  const [gradeInput, setGradeInput] = useState({ marks: '', critique: '' });
  const [gradingSubId, setGradingSubId] = useState(null);

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAsn.title || !newAsn.course) return;
    const added = {
      id: `ASN-${Math.floor(100 + Math.random() * 900)}`,
      ...newAsn,
      status: 'Published'
    };
    setAssignments([...assignments, added]);
    alert('Success! Assessment handout published to active trainee portal streams.');
    setNewAsn({ title: '', course: '', maxMarks: 100, dueDate: '' });
  };

  const handleGradeSubmission = (e) => {
    e.preventDefault();
    if (!gradingSubId || !gradeInput.marks) return;
    setSubmissions(submissions.map(sub => {
      if (sub.subId !== gradingSubId) return sub;
      return {
        ...sub,
        marks: parseFloat(gradeInput.marks),
        critique: gradeInput.critique,
        status: 'Graded'
      };
    }));
    setGradingSubId(null);
    setGradeInput({ marks: '', critique: '' });
    alert('Success! Grade verified and published to Leaderboard.');
  };

  const selectedAsn = assignments.find(a => a.id === selectedAsnId);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Dynamic Header */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-pink-500 rounded-full inline-block"></span>
            Assignment Desk & Evaluation Portal
          </h2>
          <p className="text-xs text-slate-450 font-semibold mt-1">Publish training handouts, evaluate cryptographic submittal vaults, and post grades.</p>
        </div>
      </div>

      {/* Subtabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 font-sans">
        {[
          { id: 'desk', label: 'Assignment Desk' },
          { id: 'vault', label: 'Submission Vault' },
          { id: 'grading', label: 'Evaluation & Grading' },
          { id: 'leaderboard', label: 'Marks Leaderboard' }
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === sub.id
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Assignment Desk tab */}
      {activeTab === 'desk' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Handout Form */}
          <div className="bg-white p-5 border rounded-2xl shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Publish New Assignment</h4>
            <form onSubmit={handleCreateAssignment} className="space-y-3 font-semibold text-slate-655 text-xs">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Assignment Title</label>
                <input
                  type="text" required placeholder="e.g. ARIMA Models seasonal adjustments..."
                  value={newAsn.title} onChange={e => setNewAsn({ ...newAsn, title: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Target Course</label>
                <input
                  type="text" required placeholder="e.g. Time Series Applied Practicum"
                  value={newAsn.course} onChange={e => setNewAsn({ ...newAsn, course: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Max Marks Score</label>
                  <input
                    type="number" required
                    value={newAsn.maxMarks} onChange={e => setNewAsn({ ...newAsn, maxMarks: parseInt(e.target.value) || 100 })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Due Date</label>
                  <input
                    type="date" required
                    value={newAsn.dueDate} onChange={e => setNewAsn({ ...newAsn, dueDate: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-lg cursor-pointer transition-colors text-center">
                Publish Handout ➔
              </button>
            </form>
          </div>

          {/* Active assignments listing */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Active Assessments Registry</h4>
            <div className="space-y-3 font-semibold text-slate-655 text-xs">
              {assignments.map(asn => (
                <div key={asn.id} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-3xs relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-pink-500"></div>
                  <div>
                    <h5 className="font-extrabold text-slate-850">{asn.title}</h5>
                    <p className="text-[10px] text-slate-450 mt-0.5">{asn.course}</p>
                    <p className="text-[10px] text-rose-600 mt-1">Due timeline: {asn.dueDate} | Max grading: {asn.maxMarks} Marks</p>
                  </div>
                  <button
                    onClick={() => setAssignments(assignments.filter(a => a.id !== asn.id))}
                    className="text-red-500 hover:text-red-700 font-extrabold cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Submission Vault Browser tab */}
      {activeTab === 'vault' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Assignment switcher */}
          <div className="bg-white border p-4 rounded-2xl shadow-xs space-y-3">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Select Active Handout</h4>
            <div className="space-y-2">
              {assignments.map(asn => (
                <button
                  key={asn.id}
                  onClick={() => setSelectedAsnId(asn.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selectedAsnId === asn.id ? 'border-pink-500 bg-pink-50/20 text-pink-800' : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-extrabold">{asn.title}</p>
                  <p className="text-[9px] text-slate-450 mt-1">{asn.course}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submittals table list */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-4">
            {selectedAsn ? (
              <>
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Vault Upload Submittals: {selectedAsn.title}</h4>
                    <p className="text-[10px] text-slate-455">Total handouts: {submissions.filter(s => s.asnId === selectedAsn.id).length} uploads recorded.</p>
                  </div>
                </div>

                <div className="space-y-3 font-semibold text-slate-655 text-xs pt-1">
                  {submissions.filter(s => s.asnId === selectedAsnId).length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-6">No trainees have uploaded deliverables for this assignment yet.</p>
                  ) : (
                    submissions.filter(s => s.asnId === selectedAsnId).map(sub => (
                      <div key={sub.subId} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-3xs">
                        <div>
                          <p className="font-extrabold text-slate-800">{sub.student}</p>
                          <p className="text-[10px] text-slate-450 mt-0.5">Uploaded file: <span className="text-blue-600 underline font-mono">{sub.fileName}</span></p>
                          <p className="text-[9px] text-slate-400 mt-1 font-bold">Submittal Timestamp: {sub.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                            sub.status === 'Graded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-250'
                          }`}>{sub.status}</span>
                          {sub.marks !== null && (
                            <span className="font-black text-slate-800 text-xs">{sub.marks} / {selectedAsn.maxMarks}</span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-12">Please select an assignment handout from the registry sidebar to inspect submittals.</p>
            )}
          </div>
        </div>
      )}

      {/* Evaluation and Grading tab */}
      {activeTab === 'grading' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-4">
          <h4 className="font-extrabold text-slate-800 font-sans">Evaluation & Grading Desk</h4>
          <p className="text-xs text-slate-450 font-semibold border-b pb-3 border-gray-100">Review trainee research submittals, assign marks, and dispatch performance comments.</p>

          <div className="space-y-4 pt-2">
            {submissions.filter(s => s.status === 'Submitted').length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">All submitted handouts have been successfully graded. Roster clear.</p>
            ) : (
              submissions.filter(s => s.status === 'Submitted').map(sub => {
                const parent = assignments.find(a => a.id === sub.asnId);
                return (
                  <div key={sub.subId} className="border border-slate-200 rounded-xl p-4 space-y-3 shadow-3xs flex flex-col justify-between">
                    <div className="flex justify-between items-start border-b pb-2 border-slate-100">
                      <div>
                        <h5 className="font-extrabold text-slate-800 text-xs">{sub.student}</h5>
                        <p className="text-[10px] text-slate-450 font-semibold">{parent ? parent.title : 'Unrecognized course'} • File: <span className="font-mono text-blue-600">{sub.fileName}</span></p>
                      </div>
                      <span className="bg-amber-50 text-amber-700 border border-amber-250 px-2 py-0.5 rounded text-[8.5px] font-black uppercase">
                        Pending Evaluation
                      </span>
                    </div>

                    <form onSubmit={handleGradeSubmission} className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <div className="space-y-1 text-xs">
                        <label className="block text-[10px] font-black text-slate-455 uppercase">Grading Marks (Max: {parent ? parent.maxMarks : 100})</label>
                        <input
                          type="number" required placeholder="Score..."
                          value={gradingSubId === sub.subId ? gradeInput.marks : ''}
                          onChange={e => {
                            setGradingSubId(sub.subId);
                            setGradeInput({ ...gradeInput, marks: e.target.value });
                          }}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1 text-xs">
                        <label className="block text-[10px] font-black text-slate-455 uppercase">Faculty Review Critique</label>
                        <input
                          type="text" required placeholder="Write constructive feedback critique..."
                          value={gradingSubId === sub.subId ? gradeInput.critique : ''}
                          onChange={e => {
                            setGradingSubId(sub.subId);
                            setGradeInput({ ...gradeInput, critique: e.target.value });
                          }}
                          className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-pink-500 focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white font-extrabold rounded-lg cursor-pointer text-xs"
                      >
                        Publish Grade
                      </button>
                    </form>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Leaderboard tab */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-5 border-b border-gray-150">
            <h4 className="font-extrabold text-slate-800 font-sans">Trainee Grades Leaderboard</h4>
            <p className="text-xs text-slate-450 mt-0.5">Statistical rankings ledger showing secure evaluation grades published to active cohorts.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-semibold text-slate-600">
              <thead className="bg-slate-50 border-b border-gray-150 uppercase tracking-wider text-slate-400 font-black text-[10px]">
                <tr>
                  <th className="p-4">Trainee Scholar</th>
                  <th className="p-4">Assignment Topic</th>
                  <th className="p-4">Submittal Date</th>
                  <th className="p-4">Marks Awarded</th>
                  <th className="p-4">Faculty review comments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-slate-700 font-medium">
                {submissions.filter(s => s.status === 'Graded').map(sub => {
                  const parent = assignments.find(a => a.id === sub.asnId);
                  return (
                    <tr key={sub.subId} className="hover:bg-slate-50/50">
                      <td className="p-4 font-extrabold text-slate-850">{sub.student}</td>
                      <td className="p-4 text-pink-750 font-bold">{parent ? parent.title : 'Unassigned assessment'}</td>
                      <td className="p-4">{sub.date}</td>
                      <td className="p-4 font-black text-slate-800">{sub.marks} / {parent ? parent.maxMarks : 100}</td>
                      <td className="p-4 italic text-slate-500 font-medium font-sans">"{sub.critique}"</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
