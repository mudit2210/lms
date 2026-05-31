import React, { useState } from 'react';
import heroImg from '../../assets/hero.png';

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');

  const notices = {
    news: [
      { id: 1, date: 'May 28, 2026', tag: 'General', title: 'Admissions open for the 46th Batch of Indian Statistical Service (ISS) Training Program.' },
      { id: 2, date: 'May 20, 2026', tag: 'Events', title: 'National Seminar on "Official Statistics for Sustainable Development Goals" to be held on June 29, 2026.' },
      { id: 3, date: 'May 12, 2026', tag: 'News', title: 'LMS signs Memorandum of Understanding with Indian Statistical Institute (ISI) for advanced research.' }
    ],
    trainings: [
      { id: 1, date: 'Jun 10, 2026', tag: 'Upcoming', title: 'Two-week Training Programme on "Time Series Analysis and Forecasting" for State Govt. Officers.' },
      { id: 2, date: 'Jun 22, 2026', tag: 'Ongoing', title: 'Workshop on "Big Data Analytics and Machine Learning in Official Statistics".' },
      { id: 3, date: 'Jul 05, 2026', tag: 'Upcoming', title: 'International Training Programme on "Agricultural Statistics and Food Security Indicators".' }
    ],
    publications: [
      { id: 1, date: 'May 15, 2026', tag: 'Report', title: 'Annual Statistical Capacity Indicators Report 2025-26 released by MoSPI.' },
      { id: 2, date: 'Apr 30, 2026', tag: 'Manual', title: 'Updated Handbook on National Indicator Framework (NIF) for Sustainable Development Goals.' },
      { id: 3, date: 'Apr 18, 2026', tag: 'Journal', title: 'Indian Journal of Official Statistics - Volume XII, Issue 1 now available.' }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800">
      
      {/* Hero Section with Government Branding style */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 shadow-md">
        {/* Subtle background overlay grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          {/* Left Column: Heading & Mission */}
          <div className="lg:w-3/5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Central Training Institute of MoSPI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              राष्ट्रीय सांख्यिकीय प्रणाली
              <span className="block mt-2 text-yellow-300 text-2xl sm:text-3xl lg:text-4xl font-bold font-sans">
                National Statistical System
              </span>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl">
              Empowering official statisticians across India and the globe. LMS coordinates and conducts training, promotes statistical research, and maintains the primary Knowledge Portal for official statistics in India.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-[#08493d] font-bold text-sm rounded shadow transition-all duration-200 transform hover:-translate-y-0.5">
                Go to Classroom
              </button>
              <button className="px-5 py-2.5 border border-emerald-300/40 hover:bg-white/10 text-white font-semibold text-sm rounded transition-all duration-200">
                Browse Repository
              </button>
            </div>
          </div>

          {/* Right Column: Hero Graphic or Building Image */}
          <div className="lg:w-2/5 flex justify-center">
            <div className="relative group">
              {/* Decorative background glow */}
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-emerald-400 to-yellow-400 opacity-20 blur-lg group-hover:opacity-35 transition duration-500"></div>
              
              {/* Actual Image / Fallback card */}
              {heroImg ? (
                <img 
                  src={heroImg} 
                  alt="LMS Training Campus" 
                  className="rounded-lg shadow-xl max-h-72 w-auto object-cover border border-emerald-800/40 relative"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.target.style.display = 'none';
                    document.getElementById('fallback-hero').style.display = 'flex';
                  }}
                />
              ) : null}

              {/* High-fidelity CSS SVG Fallback for Hero in case image doesn't exist */}
              <div 
                id="fallback-hero" 
                className="hidden h-64 w-96 rounded-lg bg-emerald-950 border border-emerald-800 flex-col justify-between p-6 shadow-inner relative"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h4 className="text-yellow-400 font-bold text-xs uppercase tracking-wider">LMS CAMPUS</h4>
                    <p className="text-white font-extrabold text-lg">Greater Noida, UP</p>
                  </div>
                  <div className="p-2 bg-emerald-900/50 rounded-lg border border-emerald-800 text-yellow-300">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-emerald-900 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-yellow-400"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-emerald-300 font-semibold">
                    <span>Capacity: 500+ Officers</span>
                    <span>Established: 2009</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Academy Stats Banner Section */}
      <section className="w-full bg-[#f6ebd8]/60 border-y border-[#e2d5c1] py-8 px-6 sm:px-12 lg:px-20 select-none">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          
          {/* Card 1: Conference Hall */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="text-[#08493d] mb-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="3" width="16" height="10" rx="1" />
                <circle cx="12" cy="7" r="1.5" />
                <path d="M9 11c0-1.2 1.2-1.5 3-1.5s3 .3 3 1.5" />
                <path d="M2 17h20v2H2z" />
                <path d="M5 19v2M19 19v2" />
                <circle cx="8" cy="15" r="0.8" fill="currentColor" />
                <circle cx="12" cy="15" r="0.8" fill="currentColor" />
                <circle cx="16" cy="15" r="0.8" fill="currentColor" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-[#032e26]">150</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#08493d] tracking-wider uppercase">
                Conference Hall Capacity
              </div>
            </div>
          </div>

          {/* Card 2: Sukhatme Library */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="text-[#08493d] mb-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="4" height="16" rx="0.5" />
                <path d="M4 8h4M4 16h4" />
                <rect x="9" y="4" width="4" height="16" rx="0.5" />
                <path d="M9 8h4M9 16h4" />
                <g transform="rotate(15 15 12)">
                  <rect x="13" y="3" width="4" height="16" rx="0.5" />
                  <path d="M13 7h4M13 14h4" />
                </g>
              </svg>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-[#032e26]">32348+</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#08493d] tracking-wider uppercase">
                Sukhatme Library
              </div>
            </div>
          </div>

          {/* Card 3: Hostel Rooms */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="text-[#08493d] mb-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="6" width="16" height="14" rx="1.5" />
                <path d="M3 6h18M6 3h12v3H6z" />
                <rect x="7" y="9" width="3" height="3" rx="0.5" />
                <rect x="14" y="9" width="3" height="3" rx="0.5" />
                <rect x="7" y="14" width="3" height="3" rx="0.5" />
                <rect x="14" y="14" width="3" height="3" rx="0.5" />
                <path d="M11 20v-3h2v3" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-[#032e26]">76+</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#08493d] tracking-wider uppercase">
                Hostel Rooms
              </div>
            </div>
          </div>

          {/* Card 4: CBC Accredited */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="text-[#08493d] mb-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="10" r="6" />
                <path d="M12 6.5l1.1 2.2 2.4.4-1.7 1.7.4 2.4-2.2-1.1-2.2 1.1.4-2.4-1.7-1.7 2.4-.4z" fill="currentColor" />
                <path d="M9.5 15.5l-1.5 5 4-2 4 2-1.5-5" strokeLinejoin="round" />
                <circle cx="5" cy="6" r="0.6" fill="currentColor" />
                <circle cx="19" cy="6" r="0.6" fill="currentColor" />
                <circle cx="4" cy="11" r="0.6" fill="currentColor" />
                <circle cx="20" cy="11" r="0.6" fill="currentColor" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-[#032e26]">CBC</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#08493d] tracking-wider uppercase">
                Accredited
              </div>
            </div>
          </div>

          {/* Card 5: Sports Courts */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="text-[#08493d] mb-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="1" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <circle cx="12" cy="12" r="3" />
                <rect x="3" y="8" width="4" height="8" />
                <rect x="17" y="8" width="4" height="8" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-[#032e26]">7</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#08493d] tracking-wider uppercase">
                Sports Courts
              </div>
            </div>
          </div>

          {/* Card 6: Training Participants */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-100 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="text-[#08493d] mb-3">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <rect x="6" y="3" width="12" height="8" rx="1" />
                <path d="M9 6h6M9 8h4" />
                <circle cx="4" cy="7" r="1.2" />
                <path d="M2 12c0-1.5 1-2 2-2s2 .5 2 2" />
                <line x1="4.5" y1="9" x2="6.5" y2="7" />
                <circle cx="8" cy="16" r="1" />
                <path d="M7 19c0-.8.6-1.2 1-1.2s1 .4 1 1.2" />
                <circle cx="12" cy="16" r="1" />
                <path d="M11 19c0-.8.6-1.2 1-1.2s1 .4 1 1.2" />
                <circle cx="16" cy="16" r="1" />
                <path d="M15 19c0-.8.6-1.2 1-1.2s1 .4 1 1.2" />
              </svg>
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-[#032e26]">4960+</div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#08493d] tracking-wider uppercase">
                Training Participants
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Gateways (LMS, KMS, Officers Desktop) */}
      <section className="max-w-7xl mx-auto py-12 px-6 sm:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Gateway 1: LMS */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-150 p-6 flex flex-col justify-between transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Learning Management System</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Virtual classroom portal for trainee officers. Register for online modules, download reference slides, complete statistics quizzes, and obtain graduation certificates.
            </p>
          </div>
          <button className="mt-6 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded transition-colors uppercase tracking-wider">
            Enter Classroom
          </button>
        </div>

        {/* Gateway 2: KMS */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-150 p-6 flex flex-col justify-between transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Knowledge Repository</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              The official reference vault for national surveys. Access Census documents, Consumer Expenditure statistics, manuals, indices methodologies (CPI/IIP), and NAF guidelines.
            </p>
          </div>
          <button className="mt-6 w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs rounded transition-colors uppercase tracking-wider">
            Search Repository
          </button>
        </div>

        {/* Gateway 3: ISS Probationary */}
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-150 p-6 flex flex-col justify-between transition-shadow">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">ISS Officers Desktop</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Specialized administration login for Indian Statistical Service probationers, international delegates, and resource speakers. Manage schedules, reports, and grading.
            </p>
          </div>
          <button className="mt-6 w-full py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs rounded transition-colors uppercase tracking-wider">
            Officer Login
          </button>
        </div>

      </section>

      {/* Notice Board and Statistics section */}
      <section className="max-w-7xl mx-auto pb-16 px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Notice Board Tabs Component */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-150 p-6 lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-100 pb-3 mb-4 gap-2">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-ping"></span>
              Notice Board & Announcements
            </h3>
            
            {/* Tabs */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
              <button 
                onClick={() => setActiveTab('news')}
                className={`px-3 py-1 rounded-md transition-colors ${activeTab === 'news' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                What's New
              </button>
              <button 
                onClick={() => setActiveTab('trainings')}
                className={`px-3 py-1 rounded-md transition-colors ${activeTab === 'trainings' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Training Calendar
              </button>
              <button 
                onClick={() => setActiveTab('publications')}
                className={`px-3 py-1 rounded-md transition-colors ${activeTab === 'publications' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
              >
                Publications
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-1">
            {notices[activeTab].map((item) => (
              <div key={item.id} className="py-3 flex items-start gap-3 hover:bg-slate-50/50 rounded-md px-1.5 transition-colors group">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap bg-slate-100 px-1.5 py-0.5 rounded">
                    {item.date}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className={`inline-block text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                    item.tag === 'Upcoming' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                    item.tag === 'Ongoing' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                    item.tag === 'Report' || item.tag === 'Manual' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-slate-50 border-slate-200 text-slate-600'
                  }`}>
                    {item.tag}
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-[#08493d] transition-colors leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Statistics Sidebar */}
        <div className="bg-[#08493d]/5 rounded-xl border border-[#08493d]/10 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b border-gray-200 pb-2">
              Academy Highlights
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              LMS remains committed to providing state-of-the-art training in Official Statistics, Survey Methodologies, and Data Science.
            </p>
            
            {/* Stats list */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg shadow-2xs">
                <span className="text-xs font-semibold text-slate-500">Trained Officers</span>
                <span className="text-sm font-extrabold text-[#08493d]">15,400+</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg shadow-2xs">
                <span className="text-xs font-semibold text-slate-500">Courses Completed</span>
                <span className="text-sm font-extrabold text-[#08493d]">480+</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-white rounded-lg shadow-2xs">
                <span className="text-xs font-semibold text-slate-500">International Delegates</span>
                <span className="text-sm font-extrabold text-[#08493d]">1,250+</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200/50 text-center">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
              Government of India Initiative
            </span>
          </div>
        </div>

      </section>
    </div>
  );
}
