import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TRAINING_PROGRAMMES = [
  {
    id: 1,
    title: 'ISS Probationary Officers Induction Programme (46th Batch)',
    category: 'induction',
    duration: '2 Years',
    eligibility: 'UPSC ISS Examination Qualified Officers',
    dates: 'Dec 15, 2026 - Dec 14, 2028',
    seats: 45,
    coordinator: 'Dr. Ramesh Chandra, Director',
    description: 'Comprehensive academic and practical induction training on national accounts, microeconomics, survey sampling design, and field training modules.'
  },
  {
    id: 2,
    title: 'Advanced Training Programme on Time Series Forecasting',
    category: 'short_term',
    duration: '2 Weeks',
    eligibility: 'Central / State Government Statistical Officers',
    dates: 'Jun 10, 2026 - Jun 23, 2026',
    seats: 30,
    coordinator: 'Smt. Anjali Sharma, Joint Director',
    description: 'Hands-on workshop covering ARIMA modelling, seasonal adjustment methods, and forecast metrics calculation using R and Python.'
  },
  {
    id: 3,
    title: 'Big Data Analytics and Machine Learning in Official Statistics',
    category: 'short_term',
    duration: '1 Week',
    eligibility: 'Middle Management Officers of MoSPI & State Cells',
    dates: 'Jun 22, 2026 - Jun 27, 2026',
    seats: 25,
    coordinator: 'Shri Vinay Kumar, Deputy Director',
    description: 'Introducing big data platforms, Hadoop ecosystem basics, and application of machine learning techniques to national census registries.'
  },
  {
    id: 4,
    title: 'International Training on Agricultural Census and Food Security Indicators',
    category: 'international',
    duration: '3 Weeks',
    eligibility: 'Nominees from SAARC, ASEAN, and African Nations',
    dates: 'Jul 05, 2026 - Jul 25, 2026',
    seats: 20,
    coordinator: 'Dr. K. S. Reddy, Deputy Director General',
    description: 'Global standard methodologies for agricultural holdings enumeration, food security metric computation, and FAO guidelines overview.'
  },
  {
    id: 5,
    title: 'Training of Trainers (ToT) in Survey Sampling Methodologies',
    category: 'short_term',
    duration: '1 Week',
    eligibility: 'Senior Academic Faculty and Institutional Trainers',
    dates: 'Aug 17, 2026 - Aug 22, 2026',
    seats: 35,
    coordinator: 'Dr. Ramesh Chandra, Director',
    description: 'Designed to establish standard methodologies and teaching methods for survey coordinators across various state departments.'
  }
];

export default function Trainings() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [downloadingCalendar, setDownloadingCalendar] = useState(false);

  const filteredPrograms = TRAINING_PROGRAMMES.filter(program => {
    return selectedFilter === 'all' || program.category === selectedFilter;
  });

  const handleDownloadCalendar = () => {
    setDownloadingCalendar(true);
    setTimeout(() => {
      setDownloadingCalendar(false);
      alert('LMS Annual Training Calendar 2026-27 downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Training Programmes</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Explore induction courses for ISS officers, advanced short-term workshops, and global international training modules.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Calendar Download Callout */}
        <div className="bg-[#08493d]/5 rounded-2xl border border-[#08493d]/10 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
              <svg className="w-5 h-5 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Annual Training Calendar 2026-27
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Get the complete comprehensive syllabus schedule and application deadlines for all short-term and long-term training programmes.
            </p>
          </div>
          
          <button
            onClick={handleDownloadCalendar}
            disabled={downloadingCalendar}
            className={`w-full md:w-auto px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
              downloadingCalendar
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-300 text-[#08493d] font-extrabold shadow-sm hover:shadow cursor-pointer'
            }`}
          >
            {downloadingCalendar ? 'Generating...' : 'Download PDF Calendar'}
          </button>
        </div>

        {/* Filters Tabs */}
        <div className="flex overflow-x-auto pb-2 border-b border-gray-200 text-sm font-bold text-slate-500 gap-2">
          {[
            { id: 'all', name: 'All Programmes' },
            { id: 'induction', name: 'Induction Training' },
            { id: 'short_term', name: 'Short-term Workshops' },
            { id: 'international', name: 'International Programmes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-lg border whitespace-nowrap transition-all duration-150 cursor-pointer ${
                selectedFilter === tab.id 
                  ? 'bg-[#08493d] text-white border-[#08493d] shadow-sm' 
                  : 'bg-white text-slate-600 border-gray-200 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((prog) => (
            <div key={prog.id} className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Category indicator accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${
                prog.category === 'induction' ? 'bg-indigo-600' :
                prog.category === 'international' ? 'bg-amber-500' : 'bg-emerald-600'
              }`}></div>

              <div className="space-y-4">
                {/* Badges */}
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${
                    prog.category === 'induction' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                    prog.category === 'international' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                    'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}>
                    {prog.category === 'induction' ? 'Induction' :
                     prog.category === 'international' ? 'International' : 'Short-Term'}
                  </span>
                  
                  <span className="text-[10px] font-bold text-[#08493d] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                    Seats Available: {prog.seats}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-base font-extrabold text-slate-800 group-hover:text-[#08493d] transition-colors leading-snug">
                  {prog.title}
                </h4>

                {/* Description */}
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {prog.description}
                </p>

                {/* Metadata details */}
                <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-2 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Duration:</span>
                    <span className="font-bold text-slate-800">{prog.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-500">Scheduled Dates:</span>
                    <span className="font-bold text-slate-800">{prog.dates}</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-slate-200/50 pt-2 mt-1">
                    <span className="font-semibold text-slate-500">Eligibility:</span>
                    <span className="font-bold text-slate-700 line-clamp-1">{prog.eligibility}</span>
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <span className="text-[10px] text-slate-400 font-semibold truncate max-w-[50%]">
                  Coord: {prog.coordinator}
                </span>
                
                <Link
                  to="/course-registration"
                  className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white text-xs font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 uppercase tracking-wider"
                >
                  Register Course
                </Link>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
