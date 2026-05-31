import React, { useState, useEffect } from 'react';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('trainee_assignments');
    if (saved) {
      setAssignments(JSON.parse(saved));
    } else {
      const seed = [
        { id: 'ASG-001', title: 'Statistical Inference Problem Set', course: 'Time Series Analysis', dueDate: '2026-06-02', status: 'Pending', totalMarks: 25, obtainedMarks: null, feedback: '', submittedDate: null, description: 'Solve problems 1-10 from Chapter 5 of the reference textbook. Show all working steps and state assumptions clearly.' },
        { id: 'ASG-002', title: 'ARIMA Model Report', course: 'Time Series Analysis', dueDate: '2026-06-08', status: 'Pending', totalMarks: 30, obtainedMarks: null, feedback: '', submittedDate: null, description: 'Fit an ARIMA model to the provided GDP quarterly data. Submit a report with model selection criteria, diagnostics, and 4-quarter forecast.' },
        { id: 'ASG-003', title: 'Survey Design Proposal', course: 'ISS Foundation Module', dueDate: '2026-04-01', status: 'Graded', totalMarks: 50, obtainedMarks: 44, feedback: 'Excellent proposal. Sampling frame well-defined. Minor improvements needed in cost estimation section.', submittedDate: '2026-03-30', description: 'Design a multi-stage sampling survey for estimating household consumption expenditure in a district.' },
        { id: 'ASG-004', title: 'National Accounts Case Analysis', course: 'ISS Foundation Module', dueDate: '2026-04-12', status: 'Submitted', totalMarks: 40, obtainedMarks: null, feedback: '', submittedDate: '2026-04-11', description: 'Analyze the discrepancy between GDP estimates from production and expenditure approaches using the provided dataset.' },
      ];
      localStorage.setItem('trainee_assignments', JSON.stringify(seed));
      setAssignments(seed);
    }
  }, []);

  const handleSubmit = (assignmentId) => {
    if (!submissionText && !submissionFile) {
      alert('Please add a response or upload a file.');
      return;
    }
    const updated = assignments.map(a => {
      if (a.id === assignmentId) {
        return { ...a, status: 'Submitted', submittedDate: new Date().toISOString().split('T')[0] };
      }
      return a;
    });
    setAssignments(updated);
    localStorage.setItem('trainee_assignments', JSON.stringify(updated));
    setShowSubmitModal(null);
    setSubmissionText('');
    setSubmissionFile('');
    alert('Assignment submitted successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Submitted': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Graded': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800">Assignments</h1>
        <p className="text-xs text-slate-500 mt-0.5">View assignments, submit your work, and check grades & feedback from faculty.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-2xs text-center">
          <p className="text-2xl font-extrabold text-amber-600">{assignments.filter(a => a.status === 'Pending').length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Pending</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-2xs text-center">
          <p className="text-2xl font-extrabold text-blue-600">{assignments.filter(a => a.status === 'Submitted').length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Submitted</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-2xs text-center">
          <p className="text-2xl font-extrabold text-emerald-600">{assignments.filter(a => a.status === 'Graded').length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Graded</p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-xl border border-gray-150 shadow-2xs p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium">Due: {assignment.dueDate}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800">{assignment.title}</h3>
                <p className="text-[10px] text-slate-400">Course: {assignment.course} • Total Marks: {assignment.totalMarks}</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{assignment.description}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {assignment.status === 'Graded' && (
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-[#08493d]">{assignment.obtainedMarks}/{assignment.totalMarks}</p>
                    <p className="text-[9px] text-slate-400">Score</p>
                  </div>
                )}
                {assignment.status === 'Pending' && (
                  <button
                    onClick={() => setShowSubmitModal(assignment)}
                    className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors"
                  >
                    Submit Work
                  </button>
                )}
                {assignment.status === 'Submitted' && (
                  <span className="text-[10px] text-blue-600 font-semibold">Submitted on {assignment.submittedDate}</span>
                )}
              </div>
            </div>

            {/* Feedback Section */}
            {assignment.feedback && (
              <div className="mt-4 pt-3 border-t border-gray-100 bg-emerald-50/50 p-3 rounded-lg">
                <p className="text-[10px] font-bold text-emerald-800 mb-1">Faculty Feedback:</p>
                <p className="text-xs text-slate-600 leading-relaxed">{assignment.feedback}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-6 mx-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-extrabold text-slate-800">Submit: {showSubmitModal.title}</h3>
              <button onClick={() => setShowSubmitModal(null)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Your Response / Notes</label>
                <textarea
                  value={submissionText}
                  onChange={(e) => setSubmissionText(e.target.value)}
                  rows={5}
                  placeholder="Type your answer or notes here..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                ></textarea>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Upload File (PDF/DOC)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-slate-50 transition-colors">
                  <input
                    type="file"
                    onChange={(e) => setSubmissionFile(e.target.files?.[0]?.name || '')}
                    className="hidden"
                    id="assignment-file"
                  />
                  <label htmlFor="assignment-file" className="cursor-pointer">
                    <svg className="w-8 h-8 mx-auto text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <p className="text-xs text-slate-500 font-medium">Click to upload or drag & drop</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">PDF, DOC, DOCX up to 10MB</p>
                  </label>
                  {submissionFile && (
                    <p className="text-xs font-bold text-emerald-700 mt-2">✓ {submissionFile}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleSubmit(showSubmitModal.id)}
                className="w-full py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-xs rounded-lg shadow transition-colors"
              >
                Submit Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
