import React from 'react';

export default function KnowledgeBase({
  repoFiles,
  searchQuery,
  setSearchQuery,
  setSelectedFile,
  bookmarkedIds,
  handleToggleBookmark,
  activeSector,
  setActiveSector
}) {
  const sectors = ['All Wings', 'Agriculture', 'Economic Division', 'IT Security & Support', 'Financial Procurement'];

  // Filter verified released files
  const releasedFiles = repoFiles.filter(f => f.status === 'Active');

  const filteredFiles = releasedFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = activeSector === 'All Wings' || file.metadata.department === activeSector;
    return matchesSearch && matchesSector;
  });

  const bookmarkedFiles = releasedFiles.filter(f => bookmarkedIds.includes(f.id));

  // AI Mock recommendation: pick files with high views
  const recommendedFiles = [...releasedFiles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn text-xs font-semibold text-slate-700 select-none">
      
      {/* 1. Left Sidebar: Bookmarks and Sector Filters */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Sector wings filter buttons */}
        <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-3">
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">Sector Taxonomy</h3>
          <div className="flex flex-col gap-1.5">
            {sectors.map(sec => {
              const isActive = activeSector === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setActiveSector(sec)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${isActive ? 'bg-[#08493d] text-white shadow-sm' : 'hover:bg-slate-50 text-slate-650'}`}
                >
                  {sec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Saved Favorites List */}
        <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-3">
          <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider">My Saved Bookmarks</h3>
          
          {bookmarkedFiles.length > 0 ? (
            <ul className="divide-y divide-gray-100 max-h-[220px] overflow-y-auto pr-1">
              {bookmarkedFiles.map(file => (
                <li key={file.id} className="py-2.5 flex justify-between items-center gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <button 
                      onClick={() => setSelectedFile(file)}
                      className="font-extrabold hover:underline text-slate-800 text-left truncate block w-full"
                    >
                      {file.name}
                    </button>
                    <p className="text-[9.5px] text-slate-400 font-normal">{file.metadata.department}</p>
                  </div>
                  <button 
                    onClick={() => handleToggleBookmark(file.id)}
                    className="text-rose-600 hover:text-rose-800 text-sm font-bold p-1 cursor-pointer"
                    title="Remove Bookmark"
                  >
                    ★
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 italic text-[11px] leading-relaxed">
              No bookmarked guides yet. Click the star icon on active guides list on the right to bookmark them.
            </p>
          )}

        </div>

      </div>

      {/* 2. Right Canvas: Active Category Catalog Explorer */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Search header box */}
        <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs flex items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider">Knowledge Base Catalog</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{activeSector} Wing Archive</span>
          </div>
          <input
            type="text"
            placeholder="Search guides, reports or manuals..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 w-full md:w-56 placeholder-gray-400 bg-white"
          />
        </div>

        {/* Active guides list mapping */}
        <div className="space-y-4">
          {filteredFiles.length > 0 ? (
            filteredFiles.map(file => {
              const isBookmarked = bookmarkedIds.includes(file.id);
              return (
                <div key={file.id} className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  
                  {/* Info details */}
                  <div className="space-y-1.5 min-w-0 flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] bg-blue-50 text-blue-800 border border-blue-200 px-1.5 py-0.2 rounded font-extrabold uppercase">
                        {file.metadata.category}
                      </span>
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-bold">
                        {file.metadata.department}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-slate-850 truncate">{file.name}</h4>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{file.description}</p>
                    
                    <div className="flex items-center gap-3.5 text-[9.5px] text-slate-400">
                      <span>Author: <strong>{file.metadata.author}</strong></span>
                      <span>•</span>
                      <span>Format: <strong>{file.type.toUpperCase()}</strong></span>
                      <span>•</span>
                      <span>Views: <strong>{file.views}</strong></span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    <button 
                      onClick={() => handleToggleBookmark(file.id)}
                      className={`text-base p-1 rounded hover:bg-slate-50 cursor-pointer ${isBookmarked ? 'text-yellow-500' : 'text-slate-350 hover:text-slate-650'}`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save to Bookmarks'}
                    >
                      ★
                    </button>
                    <button 
                      onClick={() => setSelectedFile(file)}
                      className="px-4 py-1.5 bg-[#0b352e] hover:bg-[#07241f] text-white rounded font-extrabold shadow-sm text-xs cursor-pointer text-center"
                    >
                      Open Guide
                    </button>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="bg-white p-12 text-center text-slate-400 italic rounded-2xl border border-gray-150 shadow-2xs">
              No matching knowledge base documents found under {activeSector}.
            </div>
          )}
        </div>

        {/* AI Recommendations Section */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200">
          <h4 className="text-[10px] font-extrabold text-[#08493d] uppercase tracking-wider mb-3">⚡ Smart AI Recommendations based on Popularity</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedFiles.map(file => (
              <div 
                key={file.id}
                onClick={() => setSelectedFile(file)}
                className="bg-white p-3 rounded-xl border border-gray-150 hover:border-[#08493d]/50 cursor-pointer transition-colors space-y-1.5"
              >
                <span className="text-[8px] bg-amber-50 text-amber-800 border border-amber-250 px-1 py-0.2 rounded font-extrabold uppercase">POPULAR</span>
                <p className="font-extrabold text-slate-800 truncate leading-snug">{file.name}</p>
                <p className="text-[10px] text-slate-400 font-normal truncate">Views: {file.views} • {file.type.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
