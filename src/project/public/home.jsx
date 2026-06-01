import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/hero.png';

const partnerCourses = [
  {
    id: 1,
    partner: "Red Hat",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg",
    title: "Red Hat Certified System Administrator (RHCSA) RH124",
    duration: "80 Hrs",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=500&auto=format&fit=crop&q=60",
    category: "scholarship",
    partnerKey: "Red Hat"
  },
  {
    id: 2,
    partner: "PHYTEC",
    partnerLogo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    title: "Embedded Full Stack IIOT Analyst",
    duration: "1200 Hrs",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=500&auto=format&fit=crop&q=60",
    category: "certifications",
    partnerKey: "PHYTEC"
  },
  {
    id: 3,
    partner: "EC-Council",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/EC-Council_Logo.png",
    title: "Certified Ethical Hacker - CEH",
    duration: "68 Hrs",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
    category: "certifications",
    partnerKey: "EC- COUNCIL"
  },
  {
    id: 4,
    partner: "Adobe",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_Logo.svg",
    title: "Digital Application Designing",
    duration: "130 Hrs",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&auto=format&fit=crop&q=60",
    category: "scholarship",
    partnerKey: "ADOBE"
  },
  {
    id: 5,
    partner: "Red Hat",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg",
    title: "Red Hat Certified Engineer in Linux Automation (RHCE) RH294",
    duration: "40 Hrs",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=500&auto=format&fit=crop&q=60",
    category: "scholarship",
    partnerKey: "Red Hat"
  },
  {
    id: 6,
    partner: "PHYTEC",
    partnerLogo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    title: "Basic Embedded Full Stack IIOT Analyst",
    duration: "600 Hrs",
    image: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&auto=format&fit=crop&q=60",
    category: "certifications",
    partnerKey: "PHYTEC"
  },
  {
    id: 7,
    partner: "EC-Council",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/EC-Council_Logo.png",
    title: "Certified SOC Analyst",
    duration: "80 Hrs",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=60",
    category: "certifications",
    partnerKey: "EC- COUNCIL"
  },
  {
    id: 8,
    partner: "Adobe",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Adobe_Corporate_Logo.svg",
    title: "Graphics Designing",
    duration: "130 Hrs",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60",
    category: "scholarship",
    partnerKey: "ADOBE"
  },
  {
    id: 9,
    partner: "AWS",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    title: "AWS Certified Solutions Architect - Associate",
    duration: "120 Hrs",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60",
    category: "certifications",
    partnerKey: "AWS"
  },
  {
    id: 10,
    partner: "AWS",
    partnerLogo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    title: "AWS Certified Cloud Practitioner Basics",
    duration: "60 Hrs",
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ea29?w=500&auto=format&fit=crop&q=60",
    category: "scholarship",
    partnerKey: "AWS"
  },
  {
    id: 11,
    partner: "Autofina",
    partnerLogo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60",
    title: "Industrial Robotics & Automation Design Specialist",
    duration: "240 Hrs",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60",
    category: "certifications",
    partnerKey: "AUTOFINA ROBOTICS"
  }
];

const renderImageFallback = (course) => {
  const isScholarship = course.category === 'scholarship';
  const fromColor = isScholarship ? 'from-rose-500' : 'from-[#0B4F9C]';
  const toColor = isScholarship ? 'to-pink-600' : 'to-blue-700';
  
  // Custom SVG icon based on partner/title
  let icon = (
    <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );

  const partnerUpper = course.partner.toUpperCase();
  if (partnerUpper.includes('AWS')) {
    icon = (
      <svg className="w-8 h-8 text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    );
  } else if (partnerUpper.includes('ADOBE')) {
    icon = (
      <svg className="w-8 h-8 text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122l9.37-9.37a2.121 2.121 0 113 3l-9.37 9.37a4.5 4.5 0 01-1.697 1.096l-3.2 1.067 1.067-3.2a4.5 4.5 0 011.096-1.697z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.878 18.122l4.244-4.244m1.414-1.414L15 11" />
      </svg>
    );
  } else if (partnerUpper.includes('ROBOTICS') || partnerUpper.includes('AUTOFINA')) {
    icon = (
      <svg className="w-8 h-8 text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.68-.34-1.34-.8-1.92-1.38s-1.04-1.24-1.38-1.92M13.5 8.25V6a2.25 2.25 0 00-2.25-2.25H9A2.25 2.25 0 006.75 6v2.25m6.75 0h1.5a2.25 2.25 0 012.25 2.25v1.5m-10.5-3.75h-1.5A2.25 2.25 0 003 10.5v1.5m1.5 5.25v2.25A2.25 2.25 0 006.75 21.75h1.5a2.25 2.25 0 002.25-2.25V17.25m6-9v9m-9-9h9M6 10.5h12M6 13.5h12" />
      </svg>
    );
  } else if (partnerUpper.includes('EC- COUNCIL') || partnerUpper.includes('EC-COUNCIL')) {
    icon = (
      <svg className="w-8 h-8 text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    );
  } else if (partnerUpper.includes('PHYTEC')) {
    icon = (
      <svg className="w-8 h-8 text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
      </svg>
    );
  } else if (partnerUpper.includes('RED HAT')) {
    icon = (
      <svg className="w-8 h-8 text-white/95" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    );
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${fromColor} ${toColor} flex flex-col items-center justify-center p-4 relative overflow-hidden group-hover:scale-105 duration-300 transition-transform`}>
      {/* Subtle overlay lines/dots for textures */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="z-10 flex flex-col items-center justify-center space-y-2">
        <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20 shadow-sm flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[9px] font-black tracking-widest text-white/90 uppercase text-center font-sans">
          {course.partner}
        </span>
      </div>
    </div>
  );
};

export default function Home() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const saved = localStorage.getItem('user');
        setUser(saved ? JSON.parse(saved) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const [activeTab, setActiveTab] = useState('news');
  const [activePartnerTab, setActivePartnerTab] = useState('ALL');
  const [selectedCourseType, setSelectedCourseType] = useState('all'); 
  const [currentCoursePage, setCurrentCoursePage] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (courseId) => {
    setImageErrors(prev => ({ ...prev, [courseId]: true }));
  };

  const handlePartnerTabChange = (tab) => {
    setActivePartnerTab(tab);
    setCurrentCoursePage(0);
  };

  const handleCourseTypeChange = (type) => {
    if (selectedCourseType === type) {
      setSelectedCourseType('all');
    } else {
      setSelectedCourseType(type);
    }
    setCurrentCoursePage(0);
  };

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

  const filteredCourses = partnerCourses.filter(course => {
    const matchesPartner = activePartnerTab === 'ALL' || course.partnerKey === activePartnerTab;
    const matchesType = selectedCourseType === 'all' || course.category === selectedCourseType;
    return matchesPartner && matchesType;
  });

  const cardsPerPage = 8;
  const totalPages = Math.ceil(filteredCourses.length / cardsPerPage) || 1;
  const pageIndex = Math.min(currentCoursePage, totalPages - 1);
  const displayedCourses = filteredCourses.slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage);

  const handlePrevPage = () => {
    setCurrentCoursePage(prev => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNextPage = () => {
    setCurrentCoursePage(prev => (prev < totalPages - 1 ? prev + 1 : 0));
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
              {user && user.role === 'student' && (
                <Link
                  to="/trainee/dashboard"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded shadow transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-1.5 border border-emerald-400/30 font-sans"
                >
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                  Go to Trainee Dashboard
                </Link>
              )}
              <Link to="/login" className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-[#08493d] font-bold text-sm rounded shadow transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center">
                Go to Classroom
              </Link>
              {/* <button className="px-5 py-2.5 border border-emerald-300/40 hover:bg-white/10 text-white font-semibold text-sm rounded transition-all duration-200">
                Browse Repository
              </button> */}
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


      {/* 5. Industry Partners Courses Showcase Section */}
      <section className="max-w-7xl mx-auto py-12 px-6 sm:px-12 lg:px-20 select-none animate-fadeIn font-sans">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Heading, Filter buttons & Slide Navigation */}
          <div className="lg:w-1/4 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Partner Heading label with pink underline decorator */}
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Industry Partners
                  </span>
                  <span className="h-0.5 bg-rose-500 w-10 rounded"></span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0B4F9C] tracking-tight">
                  COURSES
                </h3>
              </div>

              {/* Red-pink scholarship filter buttons */}
              <div className="flex flex-col gap-3.5">
                <button
                  onClick={() => handleCourseTypeChange('scholarship')}
                  className={`w-full text-center px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all duration-200 cursor-pointer shadow-2xs ${
                    selectedCourseType === 'scholarship'
                      ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  Scholarship Courses
                </button>
                <button
                  onClick={() => handleCourseTypeChange('certifications')}
                  className={`w-full text-center px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all duration-200 cursor-pointer shadow-2xs ${
                    selectedCourseType === 'certifications'
                      ? 'bg-rose-600 border-rose-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-rose-600 hover:bg-rose-50'
                  }`}
                >
                  Certifications Courses
                </button>
              </div>
            </div>

            {/* Slider arrows navigation - Pinned to bottom left exactly like mockup */}
            <div className="flex items-center gap-3.5 pt-4 lg:pt-0">
              <button
                onClick={handlePrevPage}
                className="w-12 h-12 rounded-xl border-2 border-black bg-white flex items-center justify-center text-black font-extrabold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Previous page"
              >
                <svg className="w-5 h-5 stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <button
                onClick={handleNextPage}
                className="w-12 h-12 rounded-xl border-2 border-black bg-white flex items-center justify-center text-black font-extrabold hover:bg-slate-50 transition-all cursor-pointer shadow-2xs active:scale-95"
                title="Next page"
              >
                <svg className="w-5 h-5 stroke-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Tab Bar & Course Card Carousel Grid */}
          <div className="lg:w-3/4 flex flex-col space-y-4">
            
            {/* Horizontal tab navigator bar for Industry Partners */}
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'AWS', 'ADOBE', 'AUTOFINA ROBOTICS', 'EC- COUNCIL', 'PHYTEC'].map((partner) => (
                <button
                  key={partner}
                  onClick={() => handlePartnerTabChange(partner)}
                  className={`px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-150 cursor-pointer border ${
                    activePartnerTab === partner
                      ? 'bg-[#0B4F9C] text-white border-[#0B4F9C] shadow-sm'
                      : 'bg-white text-slate-650 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {partner}
                </button>
              ))}
            </div>

            {/* Horizontal Divider Line */}
            <div className="border-b border-slate-200 w-full my-1"></div>

            {/* Slide Pagination Indicator bar */}
            <div className="flex items-center gap-1.5 py-1">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentCoursePage(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    pageIndex === idx ? 'bg-[#0B4F9C] w-8' : 'bg-slate-200 w-3 hover:bg-slate-350'
                  }`}
                  title={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Dynamic Card Grid (4 columns wide, 2 rows deep) */}
            {displayedCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 animate-scaleUp">
                {displayedCourses.map((course) => {
                  // Local helper to render logos inside mapping scope
                  const renderLocalLogo = (partner) => {
                    const p = partner.toUpperCase();
                    if (p.includes('RED HAT')) {
                      return (
                        <span className="text-[#C90000] shrink-0 flex items-center">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.06 14.54c-.31.33-.76.46-1.18.35-.42-.11-.75-.44-.86-.86l-.68-2.61c-.08-.31.02-.63.26-.84.23-.21.56-.26.84-.13l2.42 1.08c.41.18.66.61.61 1.06-.05.45-.39.81-.83.91l-.58.04z" />
                          </svg>
                        </span>
                      );
                    }
                    if (p.includes('PHYTEC')) {
                      return (
                        <span className="text-slate-800 shrink-0 flex items-center">
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
                          </svg>
                        </span>
                      );
                    }
                    if (p.includes('EC- COUNCIL') || p.includes('EC-COUNCIL')) {
                      return (
                        <span className="text-blue-700 shrink-0 flex items-center text-[10px] font-black font-sans">
                          E
                        </span>
                      );
                    }
                    if (p.includes('ADOBE')) {
                      return (
                        <span className="text-red-600 shrink-0 flex items-center">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2L2 22h4l3-7h6l3 7h4L12 2zm-1.5 10l1.5-3.5 1.5 3.5h-3z" />
                          </svg>
                        </span>
                      );
                    }
                    return (
                      <span className="text-slate-600 shrink-0 flex items-center text-[10px] font-black font-sans">
                        {partner[0].toUpperCase()}
                      </span>
                    );
                  };

                  return (
                    <div
                      key={course.id}
                      className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1.5 duration-250 transition-all flex flex-col justify-between group"
                    >
                      {/* Top graphic part with Duration tag */}
                      <div className="relative h-36 w-full overflow-hidden bg-slate-100 shrink-0 border-b border-slate-150">
                        {!imageErrors[course.id] ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 duration-300 transition-transform"
                            onError={() => handleImageError(course.id)}
                          />
                        ) : (
                          renderImageFallback(course)
                        )}
                        
                        {/* Vertical Duration Badge Tag (Matches layout exactly - pinned to absolute right-0) */}
                        <div className="absolute right-0 top-0 bottom-0 bg-white border-l border-slate-200 px-2 flex items-center justify-center shadow-2xs">
                          <span 
                            className="text-[9px] font-black uppercase text-slate-800 tracking-wider text-center whitespace-nowrap"
                            style={{ writingMode: 'vertical-rl' }}
                          >
                            {course.duration.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Bottom body text & brand logo */}
                      <div className="p-4 flex-grow flex flex-col justify-between space-y-4 text-left bg-gradient-to-b from-white to-slate-50/20">
                        
                        {/* Partner Identity row */}
                        <div className="flex items-center gap-2 shrink-0">
                          {/* Mini visual logo/icon representation */}
                          <div className="w-5 h-5 rounded bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-150 p-0.5">
                            {renderLocalLogo(course.partner)}
                          </div>
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            {course.partner.toUpperCase()}
                          </span>
                        </div>

                        {/* Course title in blue typography - Top aligned! */}
                        <h4 className="text-xs font-bold text-[#0B4F9C] leading-snug hover:underline min-h-[3rem] text-left flex items-start">
                          {course.title}
                        </h4>

                        {/* Tag pill indicating Scholarship/Cert status */}
                        <div className="pt-3.5 shrink-0 flex items-center justify-between border-t border-slate-100">
                          <span className={`text-[8.5px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                            course.category === 'scholarship'
                              ? 'bg-rose-100/70 text-rose-700'
                              : 'bg-emerald-100/70 text-emerald-700'
                          }`}>
                            {course.category.toUpperCase()}
                          </span>
                          <span className="text-[10px] font-bold text-[#0B4F9C] opacity-0 group-hover:opacity-100 transition-opacity">
                            View details ➔
                          </span>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-800 font-extrabold text-sm">No courses currently found</p>
                  <p className="text-slate-450 font-medium text-xs">Try selecting another partner tab or resetting the scholarship filters.</p>
                </div>
              </div>
            )}

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
