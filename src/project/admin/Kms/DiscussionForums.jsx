import React from 'react';

export default function DiscussionForums({
  forumThreads,
  setForumThreads,
  activeForumCategory,
  setActiveForumCategory,
  selectedThreadId,
  setSelectedThreadId,
  activeRole,
  user,
  forumSearchQuery,
  setForumSearchQuery,
  handleTogglePin,
  handleToggleLock,
  newThreadTitle,
  setNewThreadTitle,
  newThreadContent,
  setNewThreadContent,
  newThreadCategory,
  setNewThreadCategory,
  newReplyText,
  setNewReplyText,
  handleCreateThread,
  handlePostReply,
  replyQuoteText,
  setReplyQuoteText
}) {
  const categories = ['All Topics', 'Sampling Methodology', 'IT Support', 'Administrative FAQ', 'Research Sharing'];
  const canModerate = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  const filteredThreads = forumThreads.filter(t => {
    const matchesCategory = activeForumCategory === 'All Topics' || t.category === activeForumCategory;
    const matchesSearch = t.title.toLowerCase().includes(forumSearchQuery.toLowerCase()) || 
                          t.author.toLowerCase().includes(forumSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeThread = forumThreads.find(t => t.id === selectedThreadId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn text-xs font-semibold text-slate-700 select-none text-left">
      
      {/* 1. Left Sidebar: Categories list */}
      <div className="lg:col-span-4 space-y-6">
        
        <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-3">
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Forum Categories</h3>
          <div className="flex flex-col gap-1.5">
            {categories.map(cat => {
              const isActive = activeForumCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveForumCategory(cat);
                    setSelectedThreadId('');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive ? 'bg-[#08493d] text-white shadow-sm' : 'hover:bg-slate-50 text-slate-650'}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Create new thread wizard panel (Only if no active thread is selected) */}
        {!selectedThreadId && (
          <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-3">
            <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Start a Thread</h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Topic category:</label>
                <select
                  value={newThreadCategory}
                  onChange={e => setNewThreadCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-bold"
                >
                  <option value="Sampling Methodology">Sampling Methodology</option>
                  <option value="IT Support">IT Support</option>
                  <option value="Administrative FAQ">Administrative FAQ</option>
                  <option value="Research Sharing">Research Sharing</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Thread Title:</label>
                <input
                  type="text"
                  value={newThreadTitle}
                  onChange={e => setNewThreadTitle(e.target.value)}
                  placeholder="e.g. Sampling design feedback..."
                  className="w-full border border-gray-300 rounded-lg px-2.5 py-1.5 bg-white font-bold text-slate-800 placeholder-gray-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase">Question details:</label>
                <textarea
                  value={newThreadContent}
                  onChange={e => setNewThreadContent(e.target.value)}
                  placeholder="Ask a question or share research parameters..."
                  className="w-full h-24 border border-gray-300 rounded-lg p-2.5 bg-white font-semibold text-slate-800 placeholder-gray-400"
                />
              </div>

              <button
                onClick={handleCreateThread}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-2xs cursor-pointer transition-colors"
              >
                Create Thread
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Right Canvas: Active thread detail or thread list */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Thread detail rendering */}
        {activeThread ? (
          <div className="bg-white p-6 rounded-2xl border border-gray-155 shadow-2xs space-y-6">
            
            {/* Header info */}
            <div className="border-b pb-4 flex justify-between items-start gap-4">
              <div className="space-y-1">
                <button 
                  onClick={() => setSelectedThreadId('')}
                  className="text-blue-600 hover:underline text-[10px] font-bold block"
                >
                  ← Back to threads list
                </button>
                <h3 className="font-extrabold text-slate-805 text-sm sm:text-base leading-tight mt-1">{activeThread.title}</h3>
                <p className="text-slate-400 font-bold text-[10px] uppercase">{activeThread.category} • Created by {activeThread.author} ({activeThread.authorRole})</p>
              </div>

              {/* Status indicators */}
              <div className="flex gap-2">
                {activeThread.isPinned && (
                  <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[9px] font-extrabold">📌 PINNED</span>
                )}
                {activeThread.isLocked && (
                  <span className="bg-red-50 text-red-805 border border-red-200 px-2 py-0.5 rounded text-[9px] font-extrabold">🔒 LOCKED</span>
                )}
              </div>
            </div>

            {/* Main Thread Content Post */}
            <div className="p-4 bg-slate-50 border rounded-xl space-y-2">
              <p className="text-slate-700 font-medium leading-relaxed">{activeThread.content}</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold border-t pt-2 border-gray-200/50">
                <span>Date: {activeThread.date}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#08493d]">👍 {activeThread.likes} Upvotes</span>
                </div>
              </div>
            </div>

            {/* Replies thread cascade */}
            <div className="space-y-4">
              <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Replies & Comments ({activeThread.replies.length})</h4>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {activeThread.replies.map(reply => (
                  <div key={reply.id} className="p-4 bg-white border rounded-xl shadow-3xs space-y-2 transition-shadow hover:shadow-2xs">
                    
                    {/* Author line */}
                    <div className="flex justify-between items-center text-[10.5px]">
                      <span className="font-extrabold text-slate-800">{reply.author} <span className="text-[8.5px] font-bold text-slate-400">({reply.role})</span></span>
                      <span className="text-slate-400 font-normal">{reply.date}</span>
                    </div>

                    {/* Quote text overlay */}
                    {reply.quote && (
                      <div className="border-l-2 border-blue-600 pl-3.5 py-1 bg-blue-50/20 text-slate-500 font-medium italic rounded-r text-[10px]">
                        "{reply.quote}"
                      </div>
                    )}

                    <p className="text-slate-650 font-medium leading-relaxed">{reply.content}</p>
                    
                    {/* Reply triggers */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-[10px]">
                      <button 
                        onClick={() => {
                          setReplyQuoteText(reply.content);
                          document.getElementById('reply-textarea')?.focus();
                        }}
                        className="text-blue-600 hover:underline font-bold"
                      >
                        💬 Quote Reply
                      </button>
                      <button 
                        onClick={() => {
                          const updated = forumThreads.map(t => {
                            if (t.id === activeThread.id) {
                              return {
                                ...t,
                                replies: t.replies.map(r => r.id === reply.id ? { ...r, likes: r.likes + 1 } : r)
                              };
                            }
                            return t;
                          });
                          setForumThreads(updated);
                        }}
                        className="text-slate-400 hover:text-[#08493d] transition-colors"
                      >
                        👍 Like ({reply.likes})
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Create new reply text field */}
            {!activeThread.isLocked ? (
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Post a Reply</h4>
                  {replyQuoteText && (
                    <button 
                      onClick={() => setReplyQuoteText('')}
                      className="text-red-500 hover:underline text-[9.5px] font-bold"
                    >
                      Clear Quote ×
                    </button>
                  )}
                </div>

                {replyQuoteText && (
                  <div className="border-l-2 border-blue-500 pl-3.5 py-1 bg-blue-50/10 text-slate-500 font-medium italic rounded-r text-[10px]">
                    Quoting: "{replyQuoteText}"
                  </div>
                )}

                <textarea
                  id="reply-textarea"
                  value={newReplyText}
                  onChange={e => setNewReplyText(e.target.value)}
                  placeholder="Share your statistical advice or answer this thread question..."
                  className="w-full h-24 border border-gray-300 rounded-lg p-2.5 bg-white font-semibold text-slate-800 placeholder-gray-400"
                />

                <button 
                  onClick={handlePostReply}
                  className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-2xs cursor-pointer transition-colors"
                >
                  Submit Reply
                </button>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-center font-bold">
                🔒 This discussion thread has been locked by a Moderator and no longer accepts new replies.
              </div>
            )}

          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Search and Category header */}
            <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-extrabold text-slate-800 uppercase tracking-wider">Peer-to-Peer Forums Q&A</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Category wing: {activeForumCategory}</span>
              </div>
              <input 
                type="text"
                value={forumSearchQuery}
                onChange={e => setForumSearchQuery(e.target.value)}
                placeholder="Search forum topics..."
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full md:w-56 placeholder-gray-405 bg-white"
              />
            </div>

            {/* List of active threads */}
            <div className="space-y-3">
              {filteredThreads.map(thread => (
                <div 
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className="p-5 bg-white rounded-2xl border border-gray-150 shadow-2xs hover:shadow-xs transition-shadow cursor-pointer flex justify-between items-start gap-4"
                >
                  <div className="space-y-1.5 max-w-[80%]">
                    <div className="flex items-center gap-2 flex-wrap">
                      {thread.isPinned && <span className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 rounded text-[8.5px] font-extrabold uppercase shrink-0">📌 Pinned</span>}
                      {thread.isLocked && <span className="bg-red-50 text-red-700 border border-red-200 px-1.5 rounded text-[8.5px] font-extrabold uppercase shrink-0">🔒 Locked</span>}
                      <span className="bg-slate-100 text-slate-500 font-bold px-1.5 rounded text-[8.5px] uppercase tracking-wider shrink-0">{thread.category}</span>
                      <h4 className="font-extrabold text-slate-800 hover:text-blue-700 transition-colors text-sm sm:text-base leading-snug">{thread.title}</h4>
                    </div>
                    <p className="text-slate-500 font-medium text-[11px] leading-relaxed truncate max-w-lg">{thread.content}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Author: {thread.author} • {thread.replies.length} replies • {thread.likes} upvotes</p>
                  </div>

                  {canModerate && (
                    <div className="flex gap-1.5" onClick={e => e.stopPropagation()}>
                      <button 
                        onClick={() => handleTogglePin(thread.id)}
                        className={`p-1 border rounded text-[10px] font-extrabold transition-all cursor-pointer ${thread.isPinned ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white hover:bg-slate-50 text-slate-450 border-gray-300'}`}
                        title={thread.isPinned ? 'Unpin thread' : 'Pin thread'}
                      >
                        📌
                      </button>
                      <button 
                        onClick={() => handleToggleLock(thread.id)}
                        className={`p-1 border rounded text-[10px] font-extrabold transition-all cursor-pointer ${thread.isLocked ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white hover:bg-slate-50 text-slate-450 border-gray-300'}`}
                        title={thread.isLocked ? 'Unlock thread' : 'Lock thread'}
                      >
                        🔒
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
