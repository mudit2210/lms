import React, { useState, useEffect } from 'react';

export default function AssignmentsAndExams() {
  const [activeTab, setActiveTab] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submissionFile, setSubmissionFile] = useState('');
  const [attemptingQuiz, setAttemptingQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    // Load Assignments
    const savedA = localStorage.getItem('trainee_assignments');
    if (savedA) { setAssignments(JSON.parse(savedA)); }
    else {
      const seed = [
        { id: 'ASG-001', title: 'Statistical Inference Problem Set', course: 'Time Series Analysis', dueDate: '2026-06-02', status: 'Pending', totalMarks: 25, obtainedMarks: null, feedback: '', submittedDate: null, description: 'Solve problems 1-10 from Chapter 5. Show all working steps.' },
        { id: 'ASG-002', title: 'ARIMA Model Report', course: 'Time Series Analysis', dueDate: '2026-06-08', status: 'Pending', totalMarks: 30, obtainedMarks: null, feedback: '', submittedDate: null, description: 'Fit an ARIMA model to GDP quarterly data. Submit report with diagnostics.' },
        { id: 'ASG-003', title: 'Survey Design Proposal', course: 'ISS Foundation Module', dueDate: '2026-04-01', status: 'Graded', totalMarks: 50, obtainedMarks: 44, feedback: 'Excellent proposal. Minor improvements needed in cost estimation.', submittedDate: '2026-03-30', description: 'Design a multi-stage sampling survey for household consumption.' },
        { id: 'ASG-004', title: 'National Accounts Case Analysis', course: 'ISS Foundation Module', dueDate: '2026-04-12', status: 'Submitted', totalMarks: 40, obtainedMarks: null, feedback: '', submittedDate: '2026-04-11', description: 'Analyze GDP discrepancy between production and expenditure approaches.' },
      ];
      localStorage.setItem('trainee_assignments', JSON.stringify(seed));
      setAssignments(seed);
    }

    // Load Assessments
    const savedE = localStorage.getItem('trainee_assessments');
    if (savedE) { setAssessments(JSON.parse(savedE)); }
    else {
      const seed = [
        {
          id: 'ASM-001', title: 'MCQ: Statistical Inference Fundamentals', course: 'Time Series Analysis', type: 'MCQ', totalMarks: 100, obtainedMarks: null, status: 'Pending', dueDate: '2026-06-05', duration: '45 min',
          questions: [
            { id: 'Q1', text: 'Which is a measure of central tendency?', options: ['Variance', 'Mean', 'Range', 'Std Dev'], correct: 1 },
            { id: 'Q2', text: 'Type I error probability is denoted by:', options: ['β', 'α', 'σ', 'μ'], correct: 1 },
            { id: 'Q3', text: 'Constant mean & variance series is called:', options: ['Ergodic', 'Stationary', 'Seasonal', 'Cyclic'], correct: 1 },
            { id: 'Q4', text: 'ARIMA stands for:', options: ['Auto Regressive Integrated Moving Average', 'Automated Regression Internal Model', 'Auto Recursive Integrated Mean', 'None'], correct: 0 },
            { id: 'Q5', text: 'Durbin-Watson test detects:', options: ['Heteroscedasticity', 'Multicollinearity', 'Autocorrelation', 'Normality'], correct: 2 },
          ]
        },
        { id: 'ASM-002', title: 'Descriptive: Survey Methodology Case Study', course: 'ISS Foundation', type: 'Descriptive', totalMarks: 50, obtainedMarks: 42, status: 'Graded', dueDate: '2026-04-10', duration: '90 min', questions: [] },
        { id: 'ASM-003', title: 'MCQ: Sampling Techniques & Estimation', course: 'ISS Foundation', type: 'MCQ', totalMarks: 100, obtainedMarks: 82, status: 'Graded', dueDate: '2026-04-05', duration: '60 min', questions: [] },
        { id: 'ASM-004', title: 'Case Study: National Accounts Statistics', course: 'Time Series Analysis', type: 'Case-Based', totalMarks: 75, obtainedMarks: null, status: 'Pending', dueDate: '2026-06-12', duration: '120 min', questions: [] },
      ];
      localStorage.setItem('trainee_assessments', JSON.stringify(seed));
      setAssessments(seed);
    }
  }, []);

  // Assignment handlers
  const handleSubmitAssignment = (id) => {
    if (!submissionText && !submissionFile) { alert('Please add a response or upload a file.'); return; }
    const updated = assignments.map(a => a.id === id ? { ...a, status: 'Submitted', submittedDate: new Date().toISOString().split('T')[0] } : a);
    setAssignments(updated);
    localStorage.setItem('trainee_assignments', JSON.stringify(updated));
    setShowSubmitModal(null); setSubmissionText(''); setSubmissionFile('');
  };

  // Assessment handlers
  const handleStartQuiz = (assessment) => {
    if (assessment.type === 'MCQ' && assessment.questions.length > 0) {
      setAttemptingQuiz(assessment); setAnswers({}); setQuizSubmitted(false); setQuizScore(null);
    } else { alert('This assessment opens in a separate window. (Simulation)'); }
  };

  const handleSubmitQuiz = () => {
    if (!attemptingQuiz) return;
    let correct = 0;
    attemptingQuiz.questions.forEach(q => { if (answers[q.id] === q.correct) correct++; });
    const score = Math.round((correct / attemptingQuiz.questions.length) * attemptingQuiz.totalMarks);
    setQuizScore(score); setQuizSubmitted(true);
    const updated = assessments.map(a => a.id === attemptingQuiz.id ? { ...a, status: 'Graded', obtainedMarks: score } : a);
    setAssessments(updated);
    localStorage.setItem('trainee_assessments', JSON.stringify(updated));
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Submitted': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Graded': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Quiz attempt view
  if (attemptingQuiz && !quizSubmitted) {
    return (
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-[14px] font-bold text-gray-900">{attemptingQuiz.title}</h2>
              <p className="text-[10px] text-gray-400 mt-0.5">{attemptingQuiz.course} • {attemptingQuiz.duration} • {attemptingQuiz.totalMarks} marks</p>
            </div>
            <button onClick={() => setAttemptingQuiz(null)} className="text-[10px] font-bold text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors">Cancel</button>
          </div>
          <div className="space-y-5">
            {attemptingQuiz.questions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-gray-50 rounded-xl">
                <p className="text-[11px] font-bold text-gray-800 mb-3"><span className="text-gray-400 mr-2">Q{idx + 1}.</span>{q.text}</p>
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => (
                    <label key={optIdx} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${answers[q.id] === optIdx ? 'bg-gray-900 border-gray-900 text-white' : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[q.id] === optIdx ? 'border-white' : 'border-gray-300'}`}>
                        {answers[q.id] === optIdx && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <span className="text-[11px] font-medium">{opt}</span>
                      <input type="radio" name={q.id} className="hidden" checked={answers[q.id] === optIdx} onChange={() => setAnswers({ ...answers, [q.id]: optIdx })} />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-[10px] text-gray-400">Answered: {Object.keys(answers).length}/{attemptingQuiz.questions.length}</p>
            <button onClick={handleSubmitQuiz} disabled={Object.keys(answers).length < attemptingQuiz.questions.length} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz result view
  if (quizSubmitted && quizScore !== null) {
    return (
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7 flex items-center justify-center min-h-[40vh]">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center max-w-sm w-full">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${quizScore >= 60 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
            <span className={`text-xl font-bold ${quizScore >= 60 ? 'text-emerald-700' : 'text-rose-700'}`}>{quizScore}/{attemptingQuiz.totalMarks}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{quizScore >= 60 ? 'Well Done!' : 'Keep Practicing!'}</h2>
          <p className="text-[11px] text-gray-400 mb-6">{attemptingQuiz.title}</p>
          <button onClick={() => { setAttemptingQuiz(null); setQuizSubmitted(false); setQuizScore(null); }} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl transition-colors">Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Assignments & Exams</h1>
          <p className="text-[11px] text-gray-500 mt-0.5">Submit assignments and attempt online assessments.</p>
        </div>
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl text-[11px] font-bold">
          <button onClick={() => setActiveTab('assignments')} className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'assignments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
            Assignments ({assignments.length})
          </button>
          <button onClick={() => setActiveTab('assessments')} className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'assessments' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}>
            Exams ({assessments.length})
          </button>
        </div>
      </div>

      {/* ASSIGNMENTS TAB */}
      {activeTab === 'assignments' && (
        <div className="space-y-3">
          {assignments.map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusStyle(a.status)}`}>{a.status}</span>
                    <span className="text-[9px] text-gray-400">Due: {a.dueDate}</span>
                  </div>
                  <h3 className="text-[13px] font-bold text-gray-900">{a.title}</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">{a.course} • {a.totalMarks} marks</p>
                  <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">{a.description}</p>
                  {a.feedback && (
                    <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                      <p className="text-[9px] font-bold text-emerald-800 mb-0.5">Faculty Feedback:</p>
                      <p className="text-[10px] text-gray-700">{a.feedback}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {a.status === 'Graded' && <p className="text-lg font-bold text-gray-900">{a.obtainedMarks}<span className="text-gray-400 text-sm">/{a.totalMarks}</span></p>}
                  {a.status === 'Pending' && <button onClick={() => setShowSubmitModal(a)} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[10px] rounded-xl transition-colors">Submit</button>}
                  {a.status === 'Submitted' && <span className="text-[10px] text-blue-600 font-semibold">Submitted {a.submittedDate}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ASSESSMENTS TAB */}
      {activeTab === 'assessments' && (
        <div className="space-y-3">
          {assessments.map(a => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusStyle(a.status)}`}>{a.status}</span>
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${a.type === 'MCQ' ? 'bg-blue-50 text-blue-700' : a.type === 'Descriptive' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>{a.type}</span>
                  <span className="text-[9px] text-gray-400">{a.duration}</span>
                </div>
                <h3 className="text-[13px] font-bold text-gray-900">{a.title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{a.course} • Due: {a.dueDate} • {a.totalMarks} marks</p>
              </div>
              <div className="shrink-0">
                {a.status === 'Graded' ? (
                  <p className="text-lg font-bold text-gray-900">{a.obtainedMarks}<span className="text-gray-400 text-sm">/{a.totalMarks}</span></p>
                ) : (
                  <button onClick={() => handleStartQuiz(a)} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[10px] rounded-xl transition-colors">Start Exam</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Submit Assignment Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[13px] font-bold text-gray-900">Submit: {showSubmitModal.title}</h3>
              <button onClick={() => setShowSubmitModal(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Your Response</label>
                <textarea value={submissionText} onChange={(e) => setSubmissionText(e.target.value)} rows={4} placeholder="Type your answer..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-[11px] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"></textarea>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-700 mb-1">Upload File (PDF/DOC)</label>
                <input type="file" onChange={(e) => setSubmissionFile(e.target.files?.[0]?.name || '')} className="w-full text-[10px] text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                {submissionFile && <p className="text-[10px] text-emerald-600 font-semibold mt-1">✓ {submissionFile}</p>}
              </div>
              <button onClick={() => handleSubmitAssignment(showSubmitModal.id)} className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl transition-colors">Submit Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
