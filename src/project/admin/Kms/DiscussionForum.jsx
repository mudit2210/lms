import React, { useState } from 'react';

export default function DiscussionForum({
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn text-xs font-semibold text-slate-700 select-none">
      
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
                  rows={3}
                  placeholder="Explain your query or information guidelines sharing details..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-white font-bold text-slate-800 placeholder-gray-400"
                />
              </div>

              <button
                onClick={handleCreateThread}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-extrabold uppercase shadow-sm cursor-pointer"
              >
                Publish Thread
              </button>
            </div>

          </div>
        )}

      </div>

      {/* 2. Right Canvas: Active thread details or active threads index list */}
      <div className="lg:col-span-8 space-y-6">
        
        {activeThread ? (
          /* Detailed active thread view */
          <div className="bg-white p-6 rounded-2xl border border-gray-150 shadow-2xs space-y-6">
            
            {/* Header info */}
            <div className="flex justify-between items-start border-b pb-4">
              <div className="space-y-1.5 min-w-0 flex-grow pr-4">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedThreadId('')}
                    className="text-blue-700 font-extrabold hover:underline"
                  >
                    ← Back to Index
                  </button>
                  <span className="text-slate-305 font-normal">/</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-bold uppercase">
                    {activeThread.category}
                  </span>
                </div>
                
                <h4 className="font-extrabold text-sm sm:text-base text-slate-850 flex items-center gap-2 flex-wrap leading-snug">
                  {activeThread.isPinned && <span className="text-yellow-600 font-bold" title="Pinned P2P Thread">📌</span>}
                  {activeThread.isLocked && <span className="text-slate-400 font-bold" title="Locked P2P Thread">🔒</span>}
                  {activeThread.title}
                </h4>

                <p className="text-[10.5px] text-slate-400 font-semibold">
                  Started by: <strong>{activeThread.author}</strong> ({activeThread.authorRole}) on {activeThread.date}
                </p>
              </div>

              {/* Moderation Controls pin/lock */}
              {canModerate && (
                <div className="flex items-center gap-2 shrink-0">
                  <button 
                    onClick={() => handleTogglePin(activeThread.id)}
                    className={`px-2.5 py-1 rounded font-extrabold text-[10px] cursor-pointer ${activeThread.isPinned ? 'bg-yellow-50 text-yellow-800 border border-yellow-250' : 'bg-slate-50 hover:bg-slate-100 border'}`}
                  >
                    {activeThread.isPinned ? 'Unpin' : 'Pin Thread'}
                  </button>
                  <button 
                    onClick={() => handleToggleLock(activeThread.id)}
                    className={`px-2.5 py-1 rounded font-extrabold text-[10px] cursor-pointer ${activeThread.isLocked ? 'bg-slate-100 text-slate-800 border' : 'bg-rose-50 text-rose-800 border border-rose-250 hover:bg-rose-100'}`}
                  >
                    {activeThread.isLocked ? 'Unlock' : 'Lock Thread'}
                  </button>
                </div>
              )}
            </div>

            {/* Original question text block */}
            <div className="bg-slate-50 p-4 rounded-xl border leading-relaxed text-[11.5px] text-slate-700 font-medium">
              {activeThread.content}
            </div>

            {/* Thread replies list */}
            <div className="space-y-4">
              <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b pb-2">
                Discussion Stream ({activeThread.replies.length} replies)
              </h5>
              
              {activeThread.replies.length > 0 ? (
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                  {activeThread.replies.map(rep => (
                    <div key={rep.id} className="bg-white p-4 rounded-xl border border-gray-150 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-700">{rep.author} <span className="text-[9px] bg-slate-50 text-slate-400 border px-1 py-0.1 rounded font-bold uppercase">{rep.role}</span></span>
                        <span>{rep.date}</span>
                      </div>

                      {/* Quoted block wrapper */}
                      {rep.quote && (
                        <div className="pl-3 border-l-2 border-slate-300 italic text-slate-400 bg-slate-50/50 p-2 rounded text-[10.5px]">
                          "{rep.quote}"
                        </div>
                      )}

                      <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">{rep.text}</p>
                      
                      {/* Quote Reply trigger */}
                      {!activeThread.isLocked && (
                        <div className="text-right">
                          <button
                            onClick={() => setReplyQuoteText(rep.text)}
                            className="text-[10px] text-blue-700 font-bold hover:underline cursor-pointer"
                          >
                            Quote & Reply
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic text-center py-4">No responses posted yet. Be the first to share your input!</p>
              )}
            </div>

            {/* Post Reply textarea */}
            {activeThread.isLocked ? (
              <div className="p-4 bg-slate-50 border rounded-xl text-center text-slate-400 italic">
                🔒 This discussion thread has been locked by a supervisor moderator. No further replies can be posted.
              </div>
            ) : (
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-extrabold uppercase">
                  <span>Draft a response</span>
                  {replyQuoteText && (
                    <button 
                      onClick={() => setReplyQuoteText('')}
                      className="text-rose-600 hover:underline"
                    >
                      Clear Quote (x)
                    </button>
                  )}
                </div>

                {replyQuoteText && (
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] italic text-slate-400">
                    Quoting: "{replyQuoteText}"
                  </div>
                )}

                <textarea
                  value={newReplyText}
                  onChange={e => setNewReplyText(e.target.value)}
                  rows={2}
                  placeholder="Post a helpful question response, quote guidelines, or clarify issues..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-white font-semibold text-slate-800"
                />

                <div className="text-right">
                  <button 
                    onClick={() => handlePostReply(activeThread.id)}
                    className="px-5 py-2 bg-[#0b352e] hover:bg-[#07241f] text-white rounded-lg font-extrabold text-xs cursor-pointer shadow-sm"
                  >
                    Submit Response
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* Threads listing index */
          <div className="space-y-4">
            
            <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs flex items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-slate-800 uppercase tracking-wider">Discussion Forum Stream</h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeForumCategory} Active Threads</span>
              </div>
              <input
                type="text"
                placeholder="Search forum topics..."
                value={forumSearchQuery}
                onChange={e => setForumSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 w-full md:w-56 placeholder-gray-400 bg-white font-bold"
              />
            </div>

            <div className="space-y-3">
              {filteredThreads.map(thread => (
                <div 
                  key={thread.id}
                  onClick={() => {
                    setSelectedThreadId(thread.id);
                    setReplyQuoteText('');
                  }}
                  className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs hover:shadow-xs hover:border-[#08493d]/30 cursor-pointer transition-all flex justify-between items-center gap-4"
                >
                  <div className="space-y-1.5 min-w-0 flex-grow pr-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-bold uppercase">
                        {thread.category}
                      </span>
                      {thread.isPinned && (
                        <span className="text-[8.5px] bg-yellow-50 text-yellow-800 border border-yellow-250 px-1.5 py-0.2 rounded font-extrabold uppercase">
                          📌 Pinned
                        </span>
                      )}
                      {thread.isLocked && (
                        <span className="text-[8.5px] bg-slate-100 text-slate-500 border px-1.5 py-0.2 rounded font-extrabold uppercase">
                          🔒 Locked
                        </span>
                      )}
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-slate-800 truncate">{thread.title}</h4>
                    <p className="text-[10.5px] text-slate-400 font-normal">
                      Author: <strong>{thread.author}</strong> ({thread.authorRole}) • {thread.date}
                    </p>
                  </div>

                  <div className="bg-[#08493d]/5 px-3 py-2 rounded-xl text-center shrink-0">
                    <span className="text-sm font-extrabold text-[#08493d]">{thread.replies.length}</span>
                    <span className="text-[8px] text-slate-400 uppercase tracking-wider block font-bold mt-0.5">Replies</span>
                  </div>

                </div>
              ))}

              {filteredThreads.length === 0 && (
                <div className="bg-white p-12 text-center text-slate-400 italic rounded-2xl border border-gray-150 shadow-2xs">
                  No matching discussion threads found. Start a thread using the outline manager on the left panel!
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
