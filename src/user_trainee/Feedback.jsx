import React, { useState, useEffect } from 'react';

export default function Feedback() {
  const [feedbackForms, setFeedbackForms] = useState([]);
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('trainee_feedback');
    if (saved) {
      setFeedbackForms(JSON.parse(saved));
    } else {
      const seed = [
        {
          id: 'FB-001', title: 'Faculty Evaluation - Dr. Ramesh Kumar', course: 'Time Series Analysis', type: 'Faculty', status: 'Pending', dueDate: '2026-06-25',
          criteria: ['Subject Knowledge', 'Teaching Methodology', 'Communication Skills', 'Availability for Doubts', 'Course Material Quality']
        },
        {
          id: 'FB-002', title: 'Course Feedback - ISS Foundation Module', course: 'ISS Foundation Module', type: 'Course', status: 'Submitted', dueDate: '2026-04-16',
          criteria: ['Course Content Relevance', 'Practical Application', 'Duration Adequacy', 'Assessment Fairness', 'Overall Satisfaction'],
          submittedRatings: { 'Course Content Relevance': 5, 'Practical Application': 4, 'Duration Adequacy': 4, 'Assessment Fairness': 5, 'Overall Satisfaction': 5 },
          submittedComments: 'Excellent foundation programme. Very well structured with good balance of theory and practice.'
        },
        {
          id: 'FB-003', title: 'Logistics & Infrastructure Feedback', course: 'Time Series Analysis', type: 'Logistics', status: 'Pending', dueDate: '2026-06-25',
          criteria: ['Classroom Facilities', 'Computer Lab Equipment', 'Library Resources', 'Hostel Accommodation', 'Mess/Canteen Quality']
        },
        {
          id: 'FB-004', title: 'Post-Training Impact Assessment', course: 'ISS Foundation Module', type: 'Impact', status: 'Pending', dueDate: '2026-07-15',
          criteria: ['Knowledge Gained', 'Skills Developed', 'Applicability to Work', 'Confidence Improvement', 'Would Recommend to Others']
        },
      ];
      localStorage.setItem('trainee_feedback', JSON.stringify(seed));
      setFeedbackForms(seed);
    }
  }, []);

  const handleSubmitFeedback = () => {
    if (Object.keys(ratings).length < activeFeedback.criteria.length) {
      alert('Please rate all criteria before submitting.');
      return;
    }

    const updated = feedbackForms.map(f => {
      if (f.id === activeFeedback.id) {
        return { ...f, status: 'Submitted', submittedRatings: ratings, submittedComments: comments };
      }
      return f;
    });
    setFeedbackForms(updated);
    localStorage.setItem('trainee_feedback', JSON.stringify(updated));
    setActiveFeedback(null);
    setRatings({});
    setComments('');
    alert('Feedback submitted successfully! Thank you for your response.');
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Faculty': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Course': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Logistics': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Impact': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  // Feedback Form View
  if (activeFeedback) {
    return (
      <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
        <div className="bg-white rounded-xl border border-gray-150 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-extrabold text-slate-800">{activeFeedback.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeFeedback.course} • {activeFeedback.type} Evaluation</p>
            </div>
            <button
              onClick={() => { setActiveFeedback(null); setRatings({}); setComments(''); }}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          <div className="space-y-5">
            {activeFeedback.criteria.map((criterion, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-gray-100">
                <p className="text-xs font-bold text-slate-800 mb-3">{idx + 1}. {criterion}</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRatings({ ...ratings, [criterion]: star })}
                      className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center font-bold text-sm transition-all ${
                        ratings[criterion] >= star
                          ? 'bg-yellow-400 border-yellow-500 text-yellow-900'
                          : 'bg-white border-gray-200 text-slate-400 hover:border-yellow-300'
                      }`}
                    >
                      {star}
                    </button>
                  ))}
                  <span className="text-[10px] text-slate-400 ml-2 font-medium">
                    {ratings[criterion] === 1 ? 'Poor' : ratings[criterion] === 2 ? 'Fair' : ratings[criterion] === 3 ? 'Good' : ratings[criterion] === 4 ? 'Very Good' : ratings[criterion] === 5 ? 'Excellent' : 'Rate 1-5'}
                  </span>
                </div>
              </div>
            ))}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Additional Comments (Optional)</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                placeholder="Share any additional feedback, suggestions, or observations..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              ></textarea>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <p className="text-xs text-slate-400 font-medium">
                Rated: {Object.keys(ratings).length}/{activeFeedback.criteria.length} criteria
              </p>
              <button
                onClick={handleSubmitFeedback}
                className="px-6 py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-xs rounded-lg shadow transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800">Feedback</h1>
        <p className="text-xs text-slate-500 mt-0.5">Submit feedback for faculty, courses, logistics, and post-training impact assessment.</p>
      </div>

      {/* Feedback Forms List */}
      <div className="space-y-4">
        {feedbackForms.map((form) => (
          <div key={form.id} className="bg-white rounded-xl border border-gray-150 shadow-2xs p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${getTypeColor(form.type)}`}>
                  {form.type}
                </span>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                  form.status === 'Submitted' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {form.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800">{form.title}</h3>
              <p className="text-[10px] text-slate-400">Course: {form.course} • Due: {form.dueDate}</p>
            </div>

            {form.status === 'Pending' ? (
              <button
                onClick={() => setActiveFeedback(form)}
                className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors shrink-0"
              >
                Fill Feedback
              </button>
            ) : (
              <div className="text-right shrink-0">
                <p className="text-[10px] text-emerald-700 font-bold">✓ Submitted</p>
                {form.submittedRatings && (
                  <p className="text-[9px] text-slate-400 mt-0.5">
                    Avg: {(Object.values(form.submittedRatings).reduce((a, b) => a + b, 0) / Object.values(form.submittedRatings).length).toFixed(1)}/5
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
