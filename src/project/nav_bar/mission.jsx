import React from 'react';

const CORE_VALUES = [
  {
    id: 1,
    title: 'Professional Integrity',
    description: 'Adhering to strict standards of objectivity, impartiality, and scientific honesty in compiling and analysing national databases.',
    icon: (
      <svg className="w-6 h-6 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Academic Excellence',
    description: 'Fostering top-tier pedagogical practices and research initiatives to keep pace with global developments in survey methodologies.',
    icon: (
      <svg className="w-6 h-6 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Methodological Innovation',
    description: 'Pioneering statistical automation, data science implementations, big data analytics, and cloud server registry frameworks.',
    icon: (
      <svg className="w-6 h-6 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Global Collaboration',
    description: 'Exchanging capacity, training strategies, and methodologies with global institutes like ISI, SAARC, ASEAN, and United Nations ESD.',
    icon: (
      <svg className="w-6 h-6 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
];

export default function Mission() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Mission & Vision</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Our strategic vision, core academic values, and professional targets for official statisticians.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Two Columns: Vision and Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Vision Statement Card */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 sm:p-8 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#08493d]"></div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-800">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">Vision Statement</h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              "To develop LMS into a globally recognized Center of Excellence in training on Official Statistics and related analytical subjects, serving as a hub for capacity building, professional statistical research, and collaborative knowledge exchange."
            </p>
          </div>

          {/* Mission Statement Card */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 sm:p-8 space-y-4 hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-yellow-500"></div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-700">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">Mission Statement</h3>
            </div>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              "To upgrade and update the knowledge, competence, and analytical skills of official statisticians across India; design and run high-quality training programs; foster statistical research; and coordinate with national and international statistical institutes."
            </p>
          </div>

        </div>

        {/* Values Title */}
        <div className="space-y-2 border-b border-gray-200 pb-3 text-center">
          <h3 className="text-xl font-extrabold text-slate-800">Core Organizational Values</h3>
          <p className="text-xs sm:text-sm text-slate-500">The foundational pillars that guide LMS in training and academic advisory roles.</p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CORE_VALUES.map((val) => (
            <div key={val.id} className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex gap-4 hover:shadow-md transition-shadow group">
              <div className="p-3 bg-emerald-50 rounded-xl w-fit h-fit border border-emerald-100/50 group-hover:bg-emerald-100 transition-colors">
                {val.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-slate-800 group-hover:text-[#08493d] transition-colors">{val.title}</h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
