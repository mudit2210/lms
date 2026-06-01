import React, { useState, useEffect } from 'react';

export default function SearchFiltering({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType
}) {
  const [theme, setTheme] = useState(() => localStorage.getItem('admin-theme') || 'light');
  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem('admin-theme') || 'light');
    window.addEventListener('admin-theme-change', syncTheme);
    return () => window.removeEventListener('admin-theme-change', syncTheme);
  }, []);

  return (
    <div className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-center gap-4 text-left font-semibold text-xs text-slate-700 select-none ${
      theme === 'light'
        ? 'bg-white border-slate-200/80 shadow-2xs'
        : 'bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs'
    }`}>
      
      {/* Search Input Box */}
      <div className="w-full md:flex-grow relative">
        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Search Database Repository</label>
        <input 
          type="text"
          placeholder="Search learning assets by tags, categories, title or owner..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className={`w-full border rounded-lg pl-9 pr-3 py-2 bg-white text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all font-semibold ${
            theme === 'light'
              ? 'border-slate-250 focus:ring-purple-500'
              : 'border-gray-300 focus:ring-[#08493d]'
          }`}
        />
        <div className="absolute left-3 top-[29px] text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Format Category selector */}
      <div className="w-full md:w-64">
        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Format Category Filter</label>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className={`w-full border rounded-lg px-2.5 py-2 bg-white font-bold focus:outline-none transition-colors ${
            theme === 'light'
              ? 'border-slate-250 text-slate-850 focus:border-purple-400'
              : 'border-gray-300 text-slate-800'
          }`}
        >
          <option value="all">All Formats</option>
          <option value="pdf">Adobe PDF Documents</option>
          <option value="docx">Microsoft Word Sheets</option>
          <option value="xlsx">Excel Spreadsheet Matrices</option>
          <option value="mp4">Video MP4 Streams</option>
        </select>
      </div>

    </div>
  );
}
