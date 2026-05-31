import React, { useState, useEffect } from 'react';

export default function DiscussionForum() {
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [newReply, setNewReply] = useState('');
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('General');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const saved = localStorage.getItem('trainee_forum');
    if (saved) {
      setThreads(JSON.parse(saved));
    } else {
      const seed = [
        {
          id: 'TH-001', title: 'How to interpret ACF and PACF plots?', category: 'Academic', author: 'Mudit Sharma', date: '2026-05-30', replies: [
            { id: 'R-001', author: 'Dr. Ramesh Kumar', content: 'ACF shows correlation at various lags. If ACF cuts off after lag q, consider MA(q). If PACF cuts off after lag p, consider AR(p). For ARIMA, look at both patterns together.', date: '2026-05-30', isInstructor: true },
            { id: 'R-002', author: 'Ananya Gupta', content: 'I found the Box-Jenkins methodology chapter very helpful for this. Pages 45-52 in our reference textbook.', date: '2026-05-31', isInstructor: false },
          ], views: 34, pinned: true
        },
        {
          id: 'TH-002', title: 'R vs Python for statistical computing - which to focus on?', category: 'General', author: 'Vikram Singh', date: '2026-05-28', replies: [
            { id: 'R-003', author: 'Dr. Vikram Patel', content: 'Both are excellent. R has stronger statistical packages (forecast, tseries), while Python excels in ML integration. For official statistics work, R is more commonly used in government departments.', date: '2026-05-28', isInstructor: true },
          ], views: 56, pinned: false
        },
        {
          id: 'TH-003', title: 'Study group for Final Assessment preparation', category: 'Study Group', author: 'Priya Mehta', date: '2026-06-01', replies: [
            { id: 'R-004', author: 'Rahul Verma', content: 'Count me in! Shall we meet at the library after 5 PM on weekdays?', date: '2026-06-01', isInstructor: false },
            { id: 'R-005', author: 'Mudit Sharma', content: 'I am interested too. We can cover ARIMA, spectral analysis, and forecasting methods together.', date: '2026-06-01', isInstructor: false },
          ], views: 28, pinned: false
        },
        {
          id: 'TH-004', title: 'Reference materials for SDG indicators', category: 'Resources', author: 'Sanjay Deshmukh', date: '2026-05-25', replies: [
            { id: 'R-006', author: 'Prof. Ananya Sen', content: 'Check the Knowledge Repository - I have uploaded the NIF handbook and the latest MoSPI SDG report. Also refer to UN Stats Division website for global framework.', date: '2026-05-25', isInstructor: true },
          ], views: 42, pinned: false
        },
        {
          id: 'TH-005', title: 'Sports Day team registration - Badminton', category: 'Extra-Curricular', author: 'Rahul Verma', date: '2026-06-02', replies: [], views: 15, pinned: false
        },
      ];
      localStorage.setItem('trainee_forum', JSON.stringify(seed));
      setThreads(seed);
    }
  }, []);

  const categories = ['All', 'Academic', 'General', 'Study Group', 'Resources', 'Extra-Curricular'];

  const filteredThreads = filterCategory === 'All' ? threads : threads.filter(t => t.category === filterCategory);
  const sortedThreads = [...filteredThreads].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const handlePostReply = () => {
    if (!newReply.trim() || !activeThread) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const reply = {
      id: 'R-' + Date.now(),
      author: user.name || 'Trainee',
      content: newReply,
      date: new Date().toISOString().split('T')[0],
      isInstructor: false,
    };
    const updated = threads.map(t => t.id === activeThread.id ? { ...t, replies: [...t.replies, reply] } : t);
    setThreads(updated);
    localStorage.setItem('trainee_forum', JSON.stringify(updated));
    setActiveThread({ ...activeThread, replies: [...activeThread.replies, reply] });
    setNewReply('');
  };

  const handleCreateThread = () => {
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const thread = {
      id: 'TH-' + Date.now(),
      title: newThreadTitle,
      category: newThreadCategory,
      author: user.name || 'Trainee',
      date: new Date().toISOString().split('T')[0],
      replies: [{ id: 'R-' + Date.now(), author: user.name || 'Trainee', content: newThreadContent, date: new Date().toISOString().split('T')[0], isInstructor: false }],
      views: 0,
      pinned: false,
    };
    const updated = [thread, ...threads];
    setThreads(updated);
    localStorage.setItem('trainee_forum', JSON.stringify(updated));
    setShowNewThread(false);
    setNewThreadTitle('');
    setNewThreadContent('');
  };

  // Thread Detail View
  if (activeThread) {
    return (
      <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
        <button onClick={() => setActiveThread(null)} className="flex items-center gap-1.5 text-xs font-bold text-[#08493d] hover:text-emerald-700 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Forum
        </button>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{activeThread.category}</span>
              <h2 className="text-lg font-extrabold text-slate-800 mt-2">{activeThread.title}</h2>
              <p className="text-[10px] text-slate-400 mt-1">Started by {activeThread.author} • {activeThread.date} • {activeThread.views} views</p>
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-4 mt-6">
            {activeThread.replies.map((reply) => (
              <div key={reply.id} className={`p-4 rounded-xl border ${reply.isInstructor ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50/50 border-gray-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${reply.isInstructor ? 'bg-emerald-600' : 'bg-slate-500'}`}>
                    {reply.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{reply.author}</p>
                    <div className="flex items-center gap-1.5">
                      {reply.isInstructor && <span className="text-[8px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">Faculty</span>}
                      <span className="text-[9px] text-slate-400">{reply.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pl-9">{reply.content}</p>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={3}
              placeholder="Write your reply..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            ></textarea>
            <div className="flex justify-end mt-3">
              <button onClick={handlePostReply} className="px-5 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Discussion Forum</h1>
          <p className="text-xs text-slate-500 mt-0.5">Collaborate with peers and faculty. Ask questions, share resources, and form study groups.</p>
        </div>
        <button
          onClick={() => setShowNewThread(true)}
          className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Thread
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold text-slate-500 w-fit gap-0.5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-md transition-colors ${filterCategory === cat ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Threads List */}
      <div className="space-y-3">
        {sortedThreads.map((thread) => (
          <div
            key={thread.id}
            onClick={() => setActiveThread(thread)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:border-emerald-200 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  {thread.pinned && <span className="text-[8px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">📌 Pinned</span>}
                  <span className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">{thread.category}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#08493d] transition-colors">{thread.title}</h3>
                <p className="text-[10px] text-slate-400 mt-1">by {thread.author} • {thread.date}</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-400 font-medium shrink-0">
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {thread.replies.length}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {thread.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Thread Modal */}
      {showNewThread && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 p-6 mx-4 animate-fadeIn">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-sm font-extrabold text-slate-800">Create New Discussion</h3>
              <button onClick={() => setShowNewThread(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                <input type="text" value={newThreadTitle} onChange={(e) => setNewThreadTitle(e.target.value)} placeholder="What's your question or topic?" className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select value={newThreadCategory} onChange={(e) => setNewThreadCategory(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Content</label>
                <textarea value={newThreadContent} onChange={(e) => setNewThreadContent(e.target.value)} rows={5} placeholder="Describe your question or topic in detail..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"></textarea>
              </div>
              <button onClick={handleCreateThread} className="w-full py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-xs rounded-lg shadow transition-colors">
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
