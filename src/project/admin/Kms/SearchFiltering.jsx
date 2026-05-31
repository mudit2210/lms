import React from 'react';

export default function SearchFiltering({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs flex flex-col md:flex-row items-center gap-4 text-left font-semibold text-xs text-slate-700 select-none">
      
      {/* Search Input Box */}
      <div className="w-full md:flex-grow relative">
        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Search Database Repository</label>
        <input 
          type="text"
          placeholder="Search learning assets by tags, categories, title or owner..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 bg-white text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#08493d] focus:border-transparent transition-all font-semibold"
        />
        <span className="absolute left-3.5 top-7 text-slate-400 text-sm">🔍</span>
      </div>

      {/* Format Category selector */}
      <div className="w-full md:w-64">
        <label className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block mb-1">Format Category Filter</label>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-2.5 py-2 bg-white font-bold focus:outline-none"
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
