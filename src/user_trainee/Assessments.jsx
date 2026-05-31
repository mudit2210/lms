import React, { useState, useEffect } from 'react';

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [attemptingQuiz, setAttemptingQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('trainee_assessments');
    if (saved) {
      setAssessments(JSON.parse(saved));
    } else {
      const seed = [
        {
          id: 'ASM-001', title: 'MCQ: Statistical Inference Fundamentals', course: 'Time Series Analysis', type: 'MCQ', totalMarks: 100, obtainedMarks: null, status: 'Pending', dueDate: '2026-06-05', duration: '45 min',
          questions: [
            { id: 'Q1', text: 'Which of the following is a measure of central tendency?', options: ['Variance', 'Mean', 'Range', 'Standard Deviation'], correct: 1 },
            { id: 'Q2', text: 'The probability of a Type I error is denoted by:', options: ['β', 'α', 'σ', 'μ'], correct: 1 },
            { id: 'Q3', text: 'A time series with constant mean and variance is called:', options: ['Ergodic', 'Stationary', 'Seasonal', 'Cyclic'], correct: 1 },
            { id: 'Q4', text: 'ARIMA stands for:', options: ['Auto Regressive Integrated Moving Average', 'Automated Regression Internal Model Analysis', 'Auto Recursive Integrated Mean Average', 'None of the above'], correct: 0 },
            { id: 'Q5', text: 'The Durbin-Watson test is used to detect:', options: ['Heteroscedasticity', 'Multicollinearity', 'Autocorrelation', 'Normality'], correct: 2 },
          ]
        },
        { id: 'ASM-002', title: 'Descriptive: Survey Methodology Case Study', course: 'ISS Foundation Module', type: 'Descriptive', totalMarks: 50, obtainedMarks: 42, status: 'Graded', dueDate: '2026-04-10', duration: '90 min', questions: [] },
        { id: 'ASM-003', title: 'MCQ: Sampling Techniques & Estimation', course: 'ISS Foundation Module', type: 'MCQ', totalMarks: 100, obtainedMarks: 82, status: 'Graded', dueDate: '2026-04-05', duration: '60 min', questions: [] },
        { id: 'ASM-004', title: 'Case Study: National Accounts Statistics', course: 'Time Series Analysis', type: 'Case-Based', totalMarks: 75, obtainedMarks: null, status: 'Pending', dueDate: '2026-06-12', duration: '120 min', questions: [] },
      ];
      localStorage.setItem('trainee_assessments', JSON.stringify(seed));
      setAssessments(seed);
    }
  }, []);

  const pendingAssessments = assessments.filter(a => a.status === 'Pending');
  const gradedAssessments = assessments.filter(a => a.status === 'Graded');

  const handleStartQuiz = (assessment) => {
    if (assessment.type === 'MCQ' && assessment.questions.length > 0) {
      setAttemptingQuiz(assessment);
      setAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
    } else {
      alert('This assessment type will open in a separate window. (Simulation)');
    }
  };

  const handleSubmitQuiz = () => {
    if (!attemptingQuiz) return;
    let correct = 0;
    attemptingQuiz.questions.forEach((q) => { if (answers[q.id] === q.correct) correct++; });
    const score = Math.round((correct / attemptingQuiz.questions.length) * attemptingQuiz.totalMarks);
    setQuizScore(score);
    setQuizSubmitted(true);
    const updated = assessments.map(a => a.id === attemptingQuiz.id ? { ...a, status: 'Graded', obtainedMarks: score } : a);
    setAssessments(updated);
    localStorage.setItem('trainee_assessments', JSON.stringify(updated));
  };

  if (attemptingQuiz && !quizSubmitted) {
    return (
      <div className="p-5 sm:p-7 min-h-full bg-[#fafafa]">
        <div className="bg-white rounded-3xl border border-gray-100 p-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900">{attemptingQuiz.title}</h2>
              <p className="text-[10px] text-gray-400 mt-0.5">{attemptingQuiz.course} • {attemptingQuiz.duration} • {attemptingQuiz.totalMarks} marks</p>
            </div>
            <button onClick={() => setAttemptingQuiz(null)} className="text-[10px] font-bold text-rose-600 hover:text-rose-800 px-3 py-1.5 border border-rose-200 rounded-xl hover:bg-rose-50 transition-colors">Cancel</button>
          </div>
          <div className="space-y-5">
            {attemptingQuiz.questions.map((q, idx) => (
              <div key={q.id} className="p-4 bg-gray-50 rounded-2xl">
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
            <p className="text-[10px] text-gray-400 font-medium">Answered: {Object.keys(answers).length}/{attemptingQuiz.questions.length}</p>
            <button onClick={handleSubmitQuiz} disabled={Object.keys(answers).length < attemptingQuiz.questions.length} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed">Submit</button>
          </div>
        </div>
      </div>
    );
  }

  if (quizSubmitted && quizScore !== null) {
    return (
      <div className="p-5 sm:p-7 min-h-full bg-[#fafafa] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center max-w-sm w-full">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${quizScore >= 60 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
            <span className={`text-xl font-bold ${quizScore >= 60 ? 'text-emerald-700' : 'text-rose-700'}`}>{quizScore}/{attemptingQuiz.totalMarks}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">{quizScore >= 60 ? 'Well Done!' : 'Keep Practicing!'}</h2>
          <p className="text-[11px] text-gray-400 mb-6">{attemptingQuiz.title}</p>
          <button onClick={() => { setAttemptingQuiz(null); setQuizSubmitted(false); setQuizScore(null); }} className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[11px] rounded-xl transition-colors">Back to Assessments</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-7 min-h-full bg-[#fafafa] space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Assessments</h1>
        <p className="text-[11px] text-gray-400 mt-0.5">Attempt quizzes, view scores, and track your academic performance.</p>
      </div>

      <div className="flex bg-gray-100 p-0.5 rounded-xl text-[10px] font-bold text-gray-500 w-fit">
        <button onClick={() => setActiveTab('pending')} className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === 'pending' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-800'}`}>Pending ({pendingAssessments.length})</button>
        <button onClick={() => setActiveTab('graded')} className={`px-4 py-1.5 rounded-lg transition-colors ${activeTab === 'graded' ? 'bg-white text-gray-900 shadow-sm' : 'hover:text-gray-800'}`}>Graded ({gradedAssessments.length})</button>
      </div>

      <div className="space-y-3">
        {(activeTab === 'pending' ? pendingAssessments : gradedAssessments).map((assessment) => (
          <div key={assessment.id} className="bg-white rounded-3xl border border-gray-100 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full ${assessment.type === 'MCQ' ? 'bg-blue-50 text-blue-700' : assessment.type === 'Descriptive' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>{assessment.type}</span>
                <span className="text-[9px] text-gray-400 font-medium">{assessment.duration}</span>
              </div>
              <h3 className="text-[13px] font-bold text-gray-900">{assessment.title}</h3>
              <p className="text-[10px] text-gray-400">{assessment.course} • Due: {assessment.dueDate}</p>
            </div>
            <div className="flex items-center gap-3">
              {assessment.status === 'Graded' ? (
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{assessment.obtainedMarks}<span className="text-gray-400 text-sm">/{assessment.totalMarks}</span></p>
                </div>
              ) : (
                <button onClick={() => handleStartQuiz(assessment)} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold text-[10px] rounded-xl transition-colors">Start</button>
              )}
            </div>
          </div>
        ))}
        {(activeTab === 'pending' ? pendingAssessments : gradedAssessments).length === 0 && (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 border-dashed">
            <p className="text-[11px] font-medium text-gray-400">{activeTab === 'pending' ? 'No pending assessments.' : 'No graded assessments yet.'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
