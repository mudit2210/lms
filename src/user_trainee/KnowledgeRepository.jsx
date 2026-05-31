import React, { useState, useEffect } from 'react';

export default function KnowledgeRepository() {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const seed = [
      { id: 'RES-001', title: 'Introduction to Time Series Analysis', type: 'PDF', category: 'Course Material', course: 'Time Series Analysis', author: 'Dr. Ramesh Kumar', size: '2.4 MB', date: '2026-06-10', downloads: 45 },
      { id: 'RES-002', title: 'ARIMA Modeling - Video Lecture', type: 'Video', category: 'Course Material', course: 'Time Series Analysis', author: 'Dr. Ramesh Kumar', size: '156 MB', date: '2026-06-12', downloads: 38 },
      { id: 'RES-003', title: 'Survey Methodology Best Practices', type: 'PDF', category: 'Best Practices', course: 'ISS Foundation', author: 'Prof. Ananya Sen', size: '1.8 MB', date: '2026-03-15', downloads: 92 },
      { id: 'RES-004', title: 'National Accounts Statistics - Presentation', type: 'PPT', category: 'Course Material', course: 'ISS Foundation', author: 'Dr. Vikram Patel', size: '5.2 MB', date: '2026-03-20', downloads: 67 },
      { id: 'RES-005', title: 'Consumer Price Index Methodology', type: 'PDF', category: 'Research Paper', course: 'General', author: 'MoSPI Research Division', size: '3.1 MB', date: '2026-01-10', downloads: 124 },
      { id: 'RES-006', title: 'Machine Learning in Official Statistics', type: 'Video', category: 'Research Paper', course: 'Big Data Analytics', author: 'Dr. Sarah Mitchell', size: '210 MB', date: '2026-05-20', downloads: 56 },
      { id: 'RES-007', title: 'R Programming for Statisticians', type: 'PDF', category: 'Learning Resource', course: 'General', author: 'NSSTA Faculty', size: '4.7 MB', date: '2026-02-01', downloads: 203 },
      { id: 'RES-008', title: 'SDG Indicators Framework - India', type: 'PDF', category: 'Institutional Report', course: 'General', author: 'MoSPI', size: '8.3 MB', date: '2025-12-15', downloads: 89 },
      { id: 'RES-009', title: 'Sampling Design Case Study: NSSO 78th Round', type: 'Case Study', category: 'Case Study', course: 'ISS Foundation', author: 'Prof. Ananya Sen', size: '1.2 MB', date: '2026-04-05', downloads: 71 },
      { id: 'RES-010', title: 'Python for Data Science - Tutorial Series', type: 'Video', category: 'Learning Resource', course: 'Big Data Analytics', author: 'Dr. Vikram Patel', size: '340 MB', date: '2026-05-01', downloads: 145 },
      { id: 'RES-011', title: 'Agricultural Statistics Handbook', type: 'PDF', category: 'Best Practices', course: 'General', author: 'FAO & MoSPI', size: '6.5 MB', date: '2025-11-20', downloads: 78 },
      { id: 'RES-012', title: 'Exponential Smoothing Methods - Slides', type: 'PPT', category: 'Course Material', course: 'Time Series Analysis', author: 'Dr. Ramesh Kumar', size: '3.8 MB', date: '2026-06-16', downloads: 32 },
    ];
    setResources(seed);
  }, []);

  const types = ['All', 'PDF', 'Video', 'PPT', 'Case Study'];
  const categories = ['All', 'Course Material', 'Research Paper', 'Best Practices', 'Learning Resource', 'Institutional Report', 'Case Study'];

  const filtered = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || r.type === filterType;
    const matchesCategory = filterCategory === 'All' || r.category === filterCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'PDF': return { icon: '📄', color: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'Video': return { icon: '🎬', color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'PPT': return { icon: '📊', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'Case Study': return { icon: '📋', color: 'bg-blue-50 text-blue-700 border-blue-200' };
      default: return { icon: '📁', color: 'bg-slate-50 text-slate-600 border-slate-200' };
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Knowledge Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">Access course materials, research papers, videos, case studies, and best practices.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
          <span className="bg-slate-100 px-2.5 py-1 rounded-lg">{filtered.length} resources</span>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by title or author..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {types.map(t => <option key={t} value={t}>{t === 'All' ? 'All Types' : t}</option>)}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
          >
            {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
          </select>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => {
          const typeInfo = getTypeIcon(resource.type);
          return (
            <div key={resource.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-emerald-200 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{typeInfo.icon}</span>
                <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border ${typeInfo.color}`}>{resource.type}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-800 group-hover:text-[#08493d] transition-colors leading-relaxed mb-2">{resource.title}</h3>
              <p className="text-[10px] text-slate-400 font-medium mb-3">{resource.author} • {resource.course}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3 text-[9px] text-slate-400 font-medium">
                  <span>{resource.size}</span>
                  <span>↓ {resource.downloads}</span>
                </div>
                <button
                  onClick={() => alert(`Downloading: ${resource.title}`)}
                  className="text-[9px] font-bold text-[#08493d] hover:text-emerald-700 px-2.5 py-1 bg-emerald-50 rounded-lg border border-emerald-100 transition-colors"
                >
                  Download
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 border-dashed">
          <p className="text-sm font-semibold text-slate-400">No resources match your search criteria.</p>
        </div>
      )}
    </div>
  );
}
