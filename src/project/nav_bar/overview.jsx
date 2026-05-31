import React from 'react';

const INFRASTRUCTURE_HIGHLIGHTS = [
  {
    id: 1,
    title: 'Sukhatme Library',
    capacity: '32,348+ Books',
    description: 'Comprehensive research repository stocking journals, census reports, micro-surveys, and a digital subscription module.',
    icon: (
      <svg className="w-8 h-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Hostel Block',
    capacity: '76+ Air-conditioned Rooms',
    description: 'Featuring single/double occupancies, central dining halls, visiting delegates VIP suites, and a recreation lounge.',
    icon: (
      <svg className="w-8 h-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="6" width="16" height="14" rx="1.5" />
        <path d="M3 6h18M6 3h12v3H6zM11 20v-3h2v3" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Mahalanobis Conference Hall',
    capacity: '150 Seats Capacity',
    description: 'Equipped with digital projection, simultaneous interpretation facilities, video conferencing channels, and acoustic control.',
    icon: (
      <svg className="w-8 h-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="3" width="16" height="10" rx="1" />
        <circle cx="12" cy="7" r="1.5" />
        <path d="M9 11c0-1.2 1.2-1.5 3-1.5s3 .3 3 1.5M2 17h20v2H2z" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Computer & Server Lab',
    capacity: '120 Workstations',
    description: 'Equipped with high-performance computing facilities and analytical software packages including R, Python, SAS, and SPSS.',
    icon: (
      <svg className="w-8 h-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M9 20h6M12 16v4M7 20h10" />
      </svg>
    )
  }
];

export default function Overview() {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Academy Overview</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Learn about the national hub of official statistics training and statistical research coordination.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Intro Section - Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-250">
              Established in 2009
            </span>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#032e26] tracking-tight leading-snug">
              Premier Central Training Institute of MoSPI
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The Learning Management System (LMS) Academy, located in Greater Noida, Uttar Pradesh, is a state-of-the-art training and learning platform. 
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              LMS is tasked with the critical mandate of human resource development in statistics, catering to probationary officers, senior statistical officers of central and state governments, as well as delegates from foreign countries under bilateral cooperation frameworks.
            </p>
            
            {/* Core Roles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700">Officers Probationary Induction</div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700">Foreign Delegates Cooperation Training</div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700">Official Statistics Research & Publications</div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700">State Statistical Capacity Building</div>
              </div>
            </div>
          </div>

          {/* Right Visual Graphic Card (Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-tr from-[#08493d] to-[#041d18] text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:16px_16px]"></div>
            <div className="relative space-y-6">
              <h4 className="text-yellow-400 font-extrabold uppercase tracking-wider text-xs sm:text-sm">Academy highlights</h4>
              
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-400 pl-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold">15,400+</div>
                  <div className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest">Officers trained</div>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold">1,250+</div>
                  <div className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest">International delegates</div>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold">480+</div>
                  <div className="text-[10px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest">Courses completed</div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-800 text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                Capacity Building Commission (CBC) Accredited
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Highlights Title */}
        <div className="space-y-2 border-b border-gray-200 pb-3">
          <h3 className="text-xl font-extrabold text-slate-800">State-of-the-Art Campus Infrastructure</h3>
          <p className="text-xs sm:text-sm text-slate-500">LMS provides premium lodging, analytical servers, and lecture facilities within its Greater Noida campus.</p>
        </div>

        {/* Infrastructure Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INFRASTRUCTURE_HIGHLIGHTS.map((infra) => (
            <div key={infra.id} className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="space-y-4">
                <div className="p-3 bg-emerald-50 rounded-xl w-fit border border-emerald-100/50 group-hover:bg-emerald-100 transition-colors">
                  {infra.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 group-hover:text-[#08493d] transition-colors">{infra.title}</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/30 mt-1 inline-block">
                    {infra.capacity}
                  </span>
                </div>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  {infra.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
