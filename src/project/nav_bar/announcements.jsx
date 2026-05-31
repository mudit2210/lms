import React, { useState } from 'react';

const ANNOUNCEMENTS_DATA = [
  {
    id: 1,
    title: 'Admissions open for the 46th Batch of Indian Statistical Service (ISS) Training Program.',
    category: 'admissions',
    date: 'May 28, 2026',
    isNew: true,
    summary: 'Official call for UPSC ISS examination qualified probationary officers for the two-year induction program commencing Dec 2026.',
    details: 'The Learning Management System (LMS) Academy invites registrations for the 46th Batch of ISS Probationary Officers. All eligible UPSC-qualified officers are requested to submit their credentials online. The program will encompass advanced statistical theory, econometric modelling, database management, and field attachments with premier ministries and international organisations. For registration procedures and boarding details, please refer to the attached circular.'
  },
  {
    id: 2,
    title: 'National Seminar on "Official Statistics for Sustainable Development Goals" to be held on June 29, 2026.',
    category: 'events',
    date: 'May 20, 2026',
    isNew: true,
    summary: 'A national seminar celebrating Statistics Day with state ministries presenting progress on NIF guidelines.',
    details: 'To commemorate National Statistics Day 2026, LMS is hosting a national seminar focusing on the integration of state statistical databases into the National Indicator Framework (NIF) for monitoring SDGs. The seminar will feature keynote lectures by eminent economists and panel discussions on computational tools. Trainees and officials can submit research papers before June 15, 2026.'
  },
  {
    id: 3,
    title: 'LMS signs Memorandum of Understanding with Indian Statistical Institute (ISI) for advanced research.',
    category: 'general',
    date: 'May 12, 2026',
    isNew: false,
    summary: 'Collaborative partnership for academic research exchange, survey methodology optimization, and training.',
    details: 'In a significant step towards improving research outputs, LMS and the Indian Statistical Institute (ISI), Kolkata have entered into a Memorandum of Understanding (MoU). This agreement establishes joint academic advisory boards, student exchange structures for ISS probationers, and collaborative research in survey sampling errors, big data techniques, and machine learning implementations in official statistics registries.'
  },
  {
    id: 4,
    title: 'Notice Inviting Tender (NIT) for upgrading Campus Computer Laboratory networking infrastructure.',
    category: 'tenders',
    date: 'May 02, 2026',
    isNew: false,
    summary: 'Sealed bids are invited from registered agencies for supply and deployment of networking hardware.',
    details: 'LMS invites sealed bids under the two-bid system from experienced and financially sound agencies for the complete overhaul of campus fiber networking, deployment of CAT6 systems, and installation of managed switches. Detailed bid documents, hardware specifications, and terms and conditions can be downloaded. Deadline for bid submission is June 10, 2026.'
  },
  {
    id: 5,
    title: 'Advisory: Integration of state-level census registries into centralized database framework.',
    category: 'general',
    date: 'Apr 22, 2026',
    isNew: false,
    summary: 'Important instructions for all state statistical coordinators regarding metadata standardization.',
    details: 'This advisory outlines the mandatory guidelines for mapping state-level census descriptors to the national schema. Standardized taxonomy and encoding must be followed for all consumer indices and census surveys commencing after July 2026. Failure to adhere to these classifications will prevent synchronization with the national servers.'
  }
];

export default function Announcements() {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const tabs = [
    { id: 'all', name: 'All Announcements' },
    { id: 'admissions', name: 'Admissions' },
    { id: 'events', name: 'Events & Seminars' },
    { id: 'tenders', name: 'Circulars & Tenders' },
    { id: 'general', name: 'General Advisories' }
  ];

  const filteredNotices = ANNOUNCEMENTS_DATA.filter(notice => {
    if (activeTab === 'all') return true;
    if (activeTab === 'tenders') return notice.category === 'tenders';
    if (activeTab === 'general') return notice.category === 'general';
    return notice.category === activeTab;
  });

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleDownloadAttachment = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert('Attachment downloaded successfully!');
    }, 1200);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Announcements & Circulars</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Stay updated with the latest admissions calendars, tenders, workshop schedules, and administrative circulars.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto pb-2 border-b border-gray-200 text-sm font-bold text-slate-500 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-lg border whitespace-nowrap transition-all duration-150 cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-[#08493d] text-white border-[#08493d] shadow-sm' 
                  : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Notices Stack */}
        <div className="space-y-4">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => {
              const isExpanded = expandedId === notice.id;
              return (
                <div 
                  key={notice.id} 
                  className={`bg-white rounded-2xl shadow-xs border transition-all duration-200 overflow-hidden ${
                    isExpanded ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/10' : 'border-gray-150 hover:border-gray-300'
                  }`}
                >
                  {/* Notice Header - Clickable */}
                  <div 
                    onClick={() => toggleExpand(notice.id)}
                    className="p-5 sm:p-6 flex justify-between items-start gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {notice.date}
                        </span>
                        
                        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                          notice.category === 'admissions' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                          notice.category === 'events' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                          notice.category === 'tenders' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                          'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          {notice.category}
                        </span>

                        {notice.isNew && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 text-[9px] font-bold border border-rose-200 animate-pulse">
                            <span className="w-1 h-1 rounded-full bg-rose-600"></span>
                            New
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-800 leading-snug hover:text-[#08493d] transition-colors">
                        {notice.title}
                      </h3>
                      {!isExpanded && (
                        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2">
                          {notice.summary}
                        </p>
                      )}
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-50 text-slate-500 hover:text-[#08493d] hover:bg-emerald-50 transition-colors mt-1">
                      <svg 
                        className={`w-5 h-5 transform transition-transform duration-250 ${isExpanded ? 'rotate-180 text-emerald-800' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Expanded Body Details */}
                  {isExpanded && (
                    <div className="px-5 pb-6 sm:px-6 border-t border-gray-100 pt-5 space-y-4 animate-slideDown">
                      <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                        <p className="font-semibold text-slate-700">Detailed Description:</p>
                        <p>{notice.details}</p>
                      </div>

                      {/* Attachment Section */}
                      <div className="bg-slate-50 rounded-xl p-4 border border-gray-200/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-rose-50 border border-rose-100 rounded-lg text-rose-700">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-bold text-slate-800">Circular_Attachment_{notice.id}.pdf</p>
                            <p className="text-[10px] text-slate-400">PDF Document • 1.5 MB • Published by Registrar</p>
                          </div>
                        </div>

                        <button
                          disabled={downloadingId !== null}
                          onClick={() => handleDownloadAttachment(notice.id)}
                          className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                            downloadingId === notice.id
                              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/50 cursor-pointer'
                          }`}
                        >
                          {downloadingId === notice.id ? 'Saving...' : 'Download File'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-slate-700">No Announcements found</h4>
              <p className="text-xs text-slate-400">There are currently no active announcements in this category.</p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
