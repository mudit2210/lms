import React from 'react';

export default function KnowledgeRepository({
  repoFiles,
  searchQuery,
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn text-xs font-semibold text-slate-700 select-none text-left">
      
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
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Archived research manuals & reports</span>
          </div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded text-[10px] font-extrabold">
            {filteredFiles.length} Resource Available
          </span>
        </div>

        {/* Catalog grid cards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFiles.map(file => {
            const isBookmarked = bookmarkedIds.includes(file.id);
            return (
              <div 
                key={file.id} 
                className="bg-white rounded-2xl border border-gray-150 shadow-2xs hover:shadow-xs transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase tracking-wider text-[8px]">
                      {file.type} format
                    </span>
                    <button 
                      onClick={() => handleToggleBookmark(file.id)}
                      className={`text-base p-0.5 hover:scale-110 transition-transform cursor-pointer ${isBookmarked ? 'text-amber-500' : 'text-slate-300'}`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save to bookmarks'}
                    >
                      ★
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-800 text-sm">{file.name}</h4>
                    <p className="text-slate-500 font-normal leading-relaxed text-[11px]">{file.description}</p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50/50 border-t border-gray-100 flex justify-between items-center text-[10px]">
                  <span className="text-slate-400 font-bold uppercase">{file.metadata.department}</span>
                  <button 
                    onClick={() => setSelectedFile(file)}
                    className="text-blue-600 hover:text-blue-800 font-bold"
                  >
                    Open Document →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommended Reference reading shelf */}
        <div className="bg-[#fcf8f0] p-5 rounded-2xl border border-[#ebd7be]/60 shadow-2xs space-y-3">
          <h4 className="font-extrabold text-[#70461b] uppercase tracking-wider text-[10.5px]">🔥 Highly Recommended Literature</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedFiles.map(file => (
              <div 
                key={file.id} 
                onClick={() => setSelectedFile(file)}
                className="bg-white p-3 rounded-lg border border-[#ebd7be]/40 hover:border-[#ebd7be] cursor-pointer transition-colors space-y-1"
              >
                <p className="font-bold text-slate-800 truncate text-[11px]">{file.name}</p>
                <p className="text-[9.5px] text-slate-400 font-normal">{file.views} views • v{file.version}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
