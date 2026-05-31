import React, { useState } from 'react';

const DOCUMENT_DATA = [
  { id: 1, title: 'Annual Statistical Capacity Report 2025-26', category: 'reports', size: '4.2 MB', date: 'May 15, 2026', code: 'MoSPI-ASCR-01' },
  { id: 2, title: 'Handbook on National Indicator Framework (NIF) for SDGs', category: 'manuals', size: '8.5 MB', date: 'Apr 30, 2026', code: 'LMS-NIF-04' },
  { id: 3, title: 'Indian Journal of Official Statistics - Vol XII, Issue 1', category: 'journals', size: '12.1 MB', date: 'Apr 18, 2026', code: 'IJOS-2026-V12' },
  { id: 4, title: 'Consumer Expenditure Survey (CES) 2024 Methodology', category: 'reports', size: '3.8 MB', date: 'Mar 10, 2026', code: 'MoSPI-CES-24' },
  { id: 5, title: 'Circular on Index of Industrial Production (IIP) Compilation Standards 2025', category: 'circulars', size: '1.2 MB', date: 'Jan 15, 2026', code: 'CIR-IIP-25' },
  { id: 6, title: 'Guidelines for State Statistical Cell Registration & Auditing', category: 'circulars', size: '2.4 MB', date: 'Dec 05, 2025', code: 'GUIDE-SSC-09' },
  { id: 7, title: 'Annual LMS Training Course Outline & Brochure 2026', category: 'manuals', size: '5.0 MB', date: 'Nov 20, 2025', code: 'LMS-BROCH-26' },
  { id: 8, title: 'National Accounts Statistics Sources & Methods Manual', category: 'manuals', size: '15.6 MB', date: 'Oct 14, 2025', code: 'MoSPI-NAS-M' }
];

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [downloadingId, setDownloadingId] = useState(null);

  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'reports', name: 'Census & Reports' },
    { id: 'manuals', name: 'Methodology Manuals' },
    { id: 'journals', name: 'Academic Journals' },
    { id: 'circulars', name: 'Circulars & Guidelines' }
  ];

  // Filtering Logic
  const filteredDocs = DOCUMENT_DATA.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (id, filename) => {
    setDownloadingId(id);
    // Simulate high-fidelity download delay and indicator
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Mock download completed for: ${filename}`);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Documents & Publications</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Access census reports, survey manuals, official circulars, and the Indian Journal of Official Statistics repository.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search and Filters Panel */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by title or document code..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Result Count */}
          <div className="text-xs sm:text-sm font-semibold text-slate-500 whitespace-nowrap">
            Showing <span className="text-[#08493d] font-bold">{filteredDocs.length}</span> of {DOCUMENT_DATA.length} available files
          </div>
        </div>

        {/* Categories Tab Layout */}
        <div className="flex overflow-x-auto pb-2 scrollbar-thin border-b border-gray-200 text-sm font-bold text-slate-500 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg border whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedCategory === cat.id 
                  ? 'bg-[#08493d] text-white border-[#08493d] shadow-sm' 
                  : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Documents Grid/Table Card */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 overflow-hidden">
          {filteredDocs.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-gray-100 text-slate-500 font-bold">
                    <th className="px-6 py-4">Doc Code</th>
                    <th className="px-6 py-4">Document Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Release Date</th>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold border border-slate-200">
                          {doc.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800 group-hover:text-[#08493d] transition-colors max-w-md">
                          {doc.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          doc.category === 'reports' ? 'bg-emerald-50 border-emerald-250 text-emerald-800' :
                          doc.category === 'manuals' ? 'bg-amber-50 border-amber-250 text-amber-800' :
                          doc.category === 'journals' ? 'bg-indigo-50 border-indigo-250 text-indigo-800' :
                          'bg-slate-50 border-slate-250 text-slate-600'
                        }`}>
                          {doc.category === 'reports' ? 'Census & Report' :
                           doc.category === 'manuals' ? 'Manual' :
                           doc.category === 'journals' ? 'Journal' : 'Circular'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs">
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-slate-500 text-xs font-mono">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          disabled={downloadingId !== null}
                          onClick={() => handleDownload(doc.id, doc.title)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            downloadingId === doc.id
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 cursor-pointer border border-emerald-200/50'
                          }`}
                        >
                          {downloadingId === doc.id ? (
                            <>
                              <svg className="animate-spin h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Saving...
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-slate-700">No documents found</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We couldn't find any documents matching your query "{searchQuery}". Try adjusting your keywords or clearing the category filter.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
