import React, { useState, useEffect } from 'react';

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

  const [theme, setTheme] = useState(() => localStorage.getItem('admin-theme') || 'light');
  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem('admin-theme') || 'light');
    window.addEventListener('admin-theme-change', syncTheme);
    return () => window.removeEventListener('admin-theme-change', syncTheme);
  }, []);

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
        <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
          theme === 'light'
            ? 'bg-white border-slate-200/80 shadow-2xs'
            : 'bg-white border-gray-155 shadow-2xs'
        }`}>
          <h3 className={`font-extrabold uppercase tracking-wider ${
            theme === 'light' ? 'text-purple-600' : 'text-[#08493d]'
          }`}>Sector Taxonomy</h3>
          <div className="flex flex-col gap-1.5">
            {sectors.map(sec => {
              const isActive = activeSector === sec;
              return (
                <button
                  key={sec}
                  onClick={() => setActiveSector(sec)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? theme === 'light'
                        ? 'bg-purple-600 text-white shadow-sm shadow-purple-100'
                        : 'bg-[#08493d] text-white shadow-sm'
                      : 'hover:bg-slate-50 text-slate-650'
                  }`}
                >
                  {sec}
                </button>
              );
            })}
          </div>
        </div>

        {/* Saved Favorites List */}
        <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
          theme === 'light'
            ? 'bg-white border-slate-200/80 shadow-2xs'
            : 'bg-white border-gray-155 shadow-2xs'
        }`}>
          <h3 className={`font-extrabold uppercase tracking-wider ${
            theme === 'light' ? 'text-purple-600' : 'text-[#08493d]'
          }`}>My Saved Bookmarks</h3>
          
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
        <div className={`p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
          theme === 'light'
            ? 'bg-white border-slate-200/80 shadow-2xs'
            : 'bg-white border-gray-155 shadow-2xs'
        }`}>
          <div>
            <h3 className="font-extrabold text-slate-800 uppercase tracking-wider">Knowledge Base Catalog</h3>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Archived research manuals & reports</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border uppercase ${
            theme === 'light'
              ? 'bg-purple-50 text-purple-800 border-purple-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-250'
          }`}>
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
                className={`rounded-2xl border transition-all flex flex-col justify-between ${
                  theme === 'light'
                    ? 'bg-white border-slate-200/80 shadow-2xs hover:shadow-xs'
                    : 'bg-white border-gray-150 shadow-2xs hover:shadow-xs'
                }`}
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
                    className={`font-bold hover:underline transition-colors ${
                      theme === 'light' ? 'text-purple-600 hover:text-purple-800' : 'text-blue-600 hover:text-blue-800'
                    }`}
                  >
                    Open Document →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommended Reference reading shelf */}
        <div className={`p-5 rounded-2xl border transition-all space-y-3 ${
          theme === 'light'
            ? 'bg-purple-50/20 border-purple-200/60'
            : 'bg-[#fcf8f0] border-[#ebd7be]/60 shadow-2xs'
        }`}>
          <h4 className={`font-extrabold uppercase tracking-wider text-[10.5px] ${
            theme === 'light' ? 'text-purple-800' : 'text-[#70461b]'
          }`}>🔥 Highly Recommended Literature</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedFiles.map(file => (
              <div 
                key={file.id} 
                onClick={() => setSelectedFile(file)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors space-y-1 ${
                  theme === 'light'
                    ? 'bg-white border-purple-200/40 hover:border-purple-400/80 shadow-3xs'
                    : 'bg-white border-[#ebd7be]/40 hover:border-[#ebd7be]'
                }`}
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
