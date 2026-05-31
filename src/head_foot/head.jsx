import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const searchDatabase = [
  // 1. Courses
  { 
    title: "Induction Training for ISS Officers", 
    type: "Course", 
    category: "Course & Training Module", 
    desc: "Foundation training program for newly recruited Indian Statistical Service (ISS) officers.",
    duration: "8 Weeks",
    syllabus: ["Principles of Official Statistics", "National Accounts Overview", "Survey Sampling Designs", "Field Training Clearance"],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "Refresher Course on Advanced Statistics", 
    type: "Course", 
    category: "Course & Training Module", 
    desc: "Update program on regressions, advanced modeling, R, and Python applications in official data.",
    duration: "2 Weeks",
    syllabus: ["Linear Regressions", "Machine Learning in Official Statistics", "Data Visualizations", "Practical Hands-on Auditing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "Agricultural Statistics Domain Course", 
    type: "Course", 
    category: "Course & Training Module", 
    desc: "Domain training covering crop estimation surveys, yield metrics, and agricultural listing registers.",
    duration: "3 Weeks",
    syllabus: ["Crop Yield Estimation Methodology", "GIS Mapping in Agriculture", "Area Estimation Surveys", "Farming Datasets Analysis"],
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "SNDG Global Indicators Workshop", 
    type: "Course", 
    category: "Course & Training Module", 
    desc: "International training program mapping United Nations Sustainable Development Goals (SDG) tracking.",
    duration: "1 Week",
    syllabus: ["SDG Global Progress Indices", "Metadata Tagging for Indicators", "Cross-national Data Exchanges", "Voluntary Reviews Compilation"],
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "National Accounts Statistics", 
    type: "Course", 
    category: "Course & Training Module", 
    desc: "Domain-specific training on national economy accounts, domestic savings, and capital metrics.",
    duration: "4 Weeks",
    syllabus: ["System of National Accounts Fundamentals", "Gross Domestic Product Calculations", "Balance of Payments", "Price Indexing Mechanics"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=60"
  },

  // 2. Lessons
  { 
    title: "Gross Domestic Product (GDP) Principles", 
    type: "Lesson", 
    category: "Content Management Module (CMS)", 
    desc: "Core lesson mapping GDP output calculations, basic prices, and index adjustments.",
    duration: "3 hours",
    syllabus: ["Basic Prices vs Producer Prices", "Intermediate Consumption Analysis", "GDP Production Approach Methodology"],
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "System of National Accounts (SNA 2008)", 
    type: "Lesson", 
    category: "Content Management Module (CMS)", 
    desc: "Fundamental lesson mapping standard guidelines set by United Nations and IMF.",
    duration: "4 hours",
    syllabus: ["Institutional Sector Classifications", "Accumulation Accounts", "SNA 2008 vs SNA 1993 Revisions"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "Stratified Random Sampling Designs", 
    type: "Lesson", 
    category: "Content Management Module (CMS)", 
    desc: "Academic lesson analyzing standard stratification parameters and variances.",
    duration: "5 hours",
    syllabus: ["Strata Formations & Division Rules", "Standard Error Calculations", "Neyman Allocation Methods"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "Cluster Sampling and Estimators", 
    type: "Lesson", 
    category: "Content Management Module (CMS)", 
    desc: "Specialized sampling designs analyzing standard cluster formations and indicators.",
    duration: "4.5 hours",
    syllabus: ["Cluster vs Stratified Comparison", "Design Effects Formulation", "Intra-class Correlation Matrices"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&auto=format&fit=crop&q=60"
  },

  // 3. Topics
  { 
    title: "GDP Expenditure Approach Analysis", 
    type: "Topic", 
    category: "Content Management Module (CMS)", 
    desc: "Specialized topic reviewing household consumptions, investments, and net exports.",
    duration: "1.5 hours",
    syllabus: ["Private Final Consumption Expenditure", "Gross Fixed Capital Formation", "Exports/Imports Price Adjustments"],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "Gross Value Added (GVA) Computations", 
    type: "Topic", 
    category: "Content Management Module (CMS)", 
    desc: "Sectoral GDP computation overview across primary, secondary, and tertiary sectors.",
    duration: "2 hours",
    syllabus: ["GVA at Basic Prices Calculation", "Product Taxes and Subsidies Adjustments", "Sectoral Production Valuation"],
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "Optimal Allocation in Stratified Sampling", 
    type: "Topic", 
    category: "Content Management Module (CMS)", 
    desc: "Techniques for Neyman allocation formulas under cost and precision constraints.",
    duration: "1.2 hours",
    syllabus: ["Cost Functions Optimization", "Lagrangian Multipliers Application", "Variance Minimization Equations"],
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500&auto=format&fit=crop&q=60"
  },

  // 4. Events
  { 
    title: "Annual Sports Meet 2025", 
    type: "Event", 
    category: "Calendar & Event Module", 
    desc: "Academy-wide sports meet featuring badminton, table tennis, and chess matches.",
    duration: "3 Days",
    syllabus: ["Inauguration Shuttles", "Trainee-Faculty Chess Match", "Badminton Doubles Final", "Medals Ceremony"],
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "National Essay Competition on Data Science", 
    type: "Event", 
    category: "Calendar & Event Module", 
    desc: "Essay competition open to all central ministries statistics personnel on official data.",
    duration: "Submission by June 30",
    syllabus: ["Essay Prompt: AI in Official Statistics", "Review Committee Screening", "Awards and Certifications Release"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60"
  },
  { 
    title: "LMS Republic Day Quiz Event", 
    type: "Event", 
    category: "Calendar & Event Module", 
    desc: "Interactive quiz mapping national history, statistical acts, and constitutional laws.",
    duration: "1 Day (Jan 26)",
    syllabus: ["Preliminary Screening Round", "Stage Finale Quiz", "National Statistics Day Trophies"],
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&auto=format&fit=crop&q=60"
  }
];

export default function Head() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selectedSearchItem, setSelectedSearchItem] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState('');

  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const spotlightInputRef = useRef(null);

  // Focus spotlight input when it opens
  useEffect(() => {
    if (spotlightOpen) {
      const timer = setTimeout(() => {
        if (spotlightInputRef.current) {
          spotlightInputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [spotlightOpen]);

  // Handle keyboard shortcuts Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlightOpen(true);
      }
      if (e.key === 'Escape') {
        setSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getRecommendedSearches = () => {
    switch (activeCategory) {
      case 'Course':
        return [
          {
            title: "Induction Training for ISS Officers",
            type: "Course",
            category: "Course & Training Module",
            desc: "Foundation training program for newly recruited Indian Statistical Service (ISS) officers.",
            syllabus: ["Principles of Official Statistics", "National Accounts Overview", "Survey Sampling Designs", "Field Training Clearance"],
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&auto=format&fit=crop&q=60",
            tagText: "8-WEEK CURRICULUM",
            themeColor: "emerald"
          },
          {
            title: "Refresher Course on Advanced Statistics",
            type: "Course",
            category: "Course & Training Module",
            desc: "Update program on regressions, advanced modeling, R, and Python applications in official data.",
            syllabus: ["Linear Regressions", "Machine Learning in Official Statistics", "Data Visualizations", "Practical Hands-on Auditing"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=60",
            tagText: "2-WEEK REFRESHER",
            themeColor: "emerald"
          },
          {
            title: "Agricultural Statistics Domain Course",
            type: "Course",
            category: "Course & Training Module",
            desc: "Domain training covering crop estimation surveys, yield metrics, and agricultural listing registers.",
            syllabus: ["Crop Yield Estimation Methodology", "GIS Mapping in Agriculture", "Area Estimation Surveys", "Farming Datasets Analysis"],
            image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&auto=format&fit=crop&q=60",
            tagText: "3-WEEK DOMAIN",
            themeColor: "emerald"
          },
          {
            title: "National Accounts Statistics",
            type: "Course",
            category: "Course & Training Module",
            desc: "Domain-specific training on national economy accounts, domestic savings, and capital metrics.",
            syllabus: ["System of National Accounts Fundamentals", "Gross Domestic Product Calculations", "Balance of Payments", "Price Indexing Mechanics"],
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=60",
            tagText: "4-WEEK ACCOUNTS",
            themeColor: "emerald"
          }
        ];
      case 'Lesson':
        return [
          {
            title: "System of National Accounts (SNA 2008)",
            type: "Lesson",
            category: "Content Management Module (CMS)",
            desc: "Fundamental lesson mapping standard guidelines set by United Nations and IMF.",
            syllabus: ["Institutional Sector Classifications", "Accumulation Accounts", "SNA 2008 vs SNA 1993 Revisions"],
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=60",
            tagText: "FEATURED LESSON",
            themeColor: "blue"
          },
          {
            title: "Gross Domestic Product (GDP) Principles",
            type: "Lesson",
            category: "Content Management Module (CMS)",
            desc: "Core lesson mapping GDP output calculations, basic prices, and index adjustments.",
            syllabus: ["Basic Prices vs Producer Prices", "Intermediate Consumption Analysis", "GDP Production Approach Methodology"],
            image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&auto=format&fit=crop&q=60",
            tagText: "GDP BASICS",
            themeColor: "blue"
          },
          {
            title: "Stratified Random Sampling Designs",
            type: "Lesson",
            category: "Content Management Module (CMS)",
            desc: "Academic lesson analyzing standard stratification parameters and variances.",
            syllabus: ["Strata Formations & Division Rules", "Standard Error Calculations", "Neyman Allocation Methods"],
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&auto=format&fit=crop&q=60",
            tagText: "SAMPLING METHOD",
            themeColor: "blue"
          },
          {
            title: "Cluster Sampling and Estimators",
            type: "Lesson",
            category: "Content Management Module (CMS)",
            desc: "Specialized sampling designs analyzing standard cluster formations and indicators.",
            syllabus: ["Cluster vs Stratified Comparison", "Design Effects Formulation", "Intra-class Correlation Matrices"],
            image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&auto=format&fit=crop&q=60",
            tagText: "ADVANCED ESTIMATORS",
            themeColor: "blue"
          }
        ];
      case 'Topic':
        return [
          {
            title: "Optimal Allocation in Stratified Sampling",
            type: "Topic",
            category: "Content Management Module (CMS)",
            desc: "Techniques for Neyman allocation formulas under cost and precision constraints.",
            syllabus: ["Cost Functions Optimization", "Lagrangian Multipliers Application", "Variance Minimization Equations"],
            image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&auto=format&fit=crop&q=60",
            tagText: "STATISTICS METHODOLOGY",
            themeColor: "purple"
          },
          {
            title: "GDP Expenditure Approach Analysis",
            type: "Topic",
            category: "Content Management Module (CMS)",
            desc: "Specialized topic reviewing household consumptions, investments, and net exports.",
            syllabus: ["Private Final Consumption Expenditure", "Gross Fixed Capital Formation", "Exports/Imports Price Adjustments"],
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=60",
            tagText: "GDP EXPENDITURE",
            themeColor: "purple"
          },
          {
            title: "Gross Value Added (GVA) Computations",
            type: "Topic",
            category: "Content Management Module (CMS)",
            desc: "Sectoral GDP computation overview across primary, secondary, and tertiary sectors.",
            syllabus: ["GVA at Basic Prices Calculation", "Product Taxes and Subsidies Adjustments", "Sectoral Production Valuation"],
            image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&auto=format&fit=crop&q=60",
            tagText: "GVA COMPUTATIONS",
            themeColor: "purple"
          }
        ];
      case 'Event':
        return [
          {
            title: "National Essay Competition on Data Science",
            type: "Event",
            category: "Calendar & Event Module",
            desc: "Essay competition open to all central ministries statistics personnel on official data.",
            syllabus: ["Essay Prompt: AI in Official Statistics", "Review Committee Screening", "Awards and Certifications Release"],
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=60",
            tagText: "ACADEMY EVENT",
            themeColor: "amber"
          },
          {
            title: "Annual Sports Meet 2025",
            type: "Event",
            category: "Calendar & Event Module",
            desc: "Academy-wide sports meet featuring badminton, table tennis, and chess matches.",
            syllabus: ["Inauguration Shuttles", "Trainee-Faculty Chess Match", "Badminton Doubles Final", "Medals Ceremony"],
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&auto=format&fit=crop&q=60",
            tagText: "ACADEMY MEET",
            themeColor: "amber"
          },
          {
            title: "LMS Republic Day Quiz Event",
            type: "Event",
            category: "Calendar & Event Module",
            desc: "Interactive quiz mapping national history, statistical acts, and constitutional laws.",
            syllabus: ["Preliminary Screening Round", "Stage Finale Quiz", "National Statistics Day Trophies"],
            image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=300&auto=format&fit=crop&q=60",
            tagText: "QUIZ COMPETITION",
            themeColor: "amber"
          }
        ];
      default: // 'All'
        return [
          {
            title: "System of National Accounts (SNA 2008)",
            type: "Lesson",
            category: "Content Management Module (CMS)",
            desc: "Fundamental lesson mapping standard guidelines set by United Nations and IMF.",
            syllabus: ["Institutional Sector Classifications", "Accumulation Accounts", "SNA 2008 vs SNA 1993 Revisions"],
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=60",
            tagText: "FEATURED LESSON",
            themeColor: "emerald"
          },
          {
            title: "Optimal Allocation in Stratified Sampling",
            type: "Topic",
            category: "Content Management Module (CMS)",
            desc: "Techniques for Neyman allocation formulas under cost and precision constraints.",
            syllabus: ["Cost Functions Optimization", "Lagrangian Multipliers Application", "Variance Minimization Equations"],
            image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&auto=format&fit=crop&q=60",
            tagText: "STATISTICS METHODOLOGY",
            themeColor: "purple"
          },
          {
            title: "Induction Training for ISS Officers",
            type: "Course",
            category: "Course & Training Module",
            desc: "Foundation training program for newly recruited Indian Statistical Service (ISS) officers.",
            syllabus: ["Principles of Official Statistics", "National Accounts Overview", "Survey Sampling Designs", "Field Training Clearance"],
            image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&auto=format&fit=crop&q=60",
            tagText: "8-WEEK CURRICULUM",
            themeColor: "blue"
          },
          {
            title: "National Essay Competition on Data Science",
            type: "Event",
            category: "Calendar & Event Module",
            desc: "Essay competition open to all central ministries statistics personnel on official data.",
            syllabus: ["Essay Prompt: AI in Official Statistics", "Review Committee Screening", "Awards and Certifications Release"],
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=60",
            tagText: "ACADEMY EVENT",
            themeColor: "amber"
          }
        ];
    }
  };

  const filteredSpotlightResults = searchDatabase.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return false;
    const matchesQuery = item.title.toLowerCase().includes(query) ||
                         item.type.toLowerCase().includes(query) ||
                         item.category.toLowerCase().includes(query) ||
                         item.desc.toLowerCase().includes(query);
    const matchesCategory = activeCategory === 'All' || item.type === activeCategory;
    return matchesQuery && matchesCategory;
  });

  const filteredSuggestions = searchDatabase.filter(item => {
    if (!searchQuery) return false;
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query) ||
           item.type.toLowerCase().includes(query) ||
           item.category.toLowerCase().includes(query) ||
           item.desc.toLowerCase().includes(query);
  });

  const renderCalendarSheet = (item) => {
    let top = 'EVENT';
    let center = 'CAL';
    let bottom = 'INFO';

    if (item.title.toLowerCase().includes('sports')) {
      top = 'SPORTS';
      center = '3D';
      bottom = '2025';
    } else if (item.duration.toLowerCase().includes('june 30')) {
      top = 'DEADLINE';
      center = '30';
      bottom = 'JUN';
    } else if (item.duration.toLowerCase().includes('jan 26')) {
      top = 'QUIZ';
      center = '26';
      bottom = 'JAN';
    }

    return (
      <div className="w-20 h-20 bg-white border-2 border-amber-200 rounded-xl overflow-hidden shadow-xs flex flex-col shrink-0 select-none text-center font-sans">
        <div className="bg-rose-600 text-white text-[8px] font-black uppercase py-1 tracking-wider leading-none">
          {top}
        </div>
        <div className="flex-grow flex flex-col justify-center bg-amber-50/15">
          <span className="text-[#08493d] font-black text-2xl leading-none tracking-tighter">{center}</span>
          <span className="text-slate-450 font-black text-[9px] uppercase tracking-widest mt-0.5">{bottom}</span>
        </div>
      </div>
    );
  };

  const renderItemCard = (item, onClick) => {
    const type = item.type;
    if (type === 'Course') {
      return (
        <div 
          onClick={onClick}
          className="border border-blue-150 bg-blue-50/20 hover:bg-blue-50/40 hover:border-blue-300 hover:shadow-md transition-all duration-200 rounded-xl p-4 cursor-pointer flex gap-4 items-center text-left group hover:-translate-y-0.5"
        >
          {item.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-blue-200/50 bg-white">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          )}
          <div className="space-y-1.5 min-w-0 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border text-blue-805 bg-blue-100 border-blue-200">
                ⏱ {item.duration || '8 WEEKS'} Course
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">{item.category}</span>
            </div>
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-blue-900 truncate">
              {item.title}
            </h5>
            <p className="text-[11px] text-slate-505 leading-normal font-medium line-clamp-1">
              {item.desc}
            </p>
            {item.syllabus && item.syllabus.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {item.syllabus.slice(0, 2).map((syl, i) => (
                  <span key={i} className="text-[8.5px] font-extrabold text-blue-900 bg-blue-100/60 border border-blue-200/40 px-2 py-0.2 rounded truncate max-w-[120px]">
                    ✓ {syl}
                  </span>
                ))}
                {item.syllabus.length > 2 && (
                  <span className="text-[8.5px] font-extrabold text-slate-450 bg-slate-50 border border-slate-200 px-1.5 py-0.2 rounded">
                    +{item.syllabus.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
          <span className="text-blue-800 font-extrabold shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hidden sm:inline-flex items-center gap-0.5">
            Access ➔
          </span>
        </div>
      );
    } else if (type === 'Lesson') {
      return (
        <div 
          onClick={onClick}
          className="border border-emerald-100 bg-[#eff7f5]/25 hover:bg-[#eff7f5]/55 hover:border-emerald-350 hover:shadow-md transition-all duration-200 rounded-xl p-4 cursor-pointer flex gap-4 items-center text-left group hover:-translate-y-0.5"
        >
          {item.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-emerald-200/50 bg-white relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[#08493d]/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow">
                  <svg className="w-3.5 h-3.5 text-[#08493d] ml-0.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-1.5 min-w-0 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border text-emerald-850 bg-emerald-100 border-emerald-250">
                📖 {item.duration || 'Core'} Lesson
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">{item.category}</span>
            </div>
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-[#08493d] truncate">
              {item.title}
            </h5>
            <p className="text-[11px] text-slate-505 leading-normal font-medium line-clamp-1">
              {item.desc}
            </p>
            {item.syllabus && item.syllabus.length > 0 && (
              <div className="text-[10px] font-semibold text-emerald-800 flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <span>Includes {item.syllabus.length} key learning topics</span>
              </div>
            )}
          </div>
          <span className="text-[#08493d] font-extrabold shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hidden sm:inline-flex items-center gap-0.5">
            Learn ➔
          </span>
        </div>
      );
    } else if (type === 'Topic') {
      return (
        <div 
          onClick={onClick}
          className="border border-purple-150 bg-purple-50/20 hover:bg-purple-50/40 hover:border-purple-300 hover:shadow-md transition-all duration-200 rounded-xl p-4 cursor-pointer flex gap-4 items-center text-left group hover:-translate-y-0.5"
        >
          {item.image && (
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-purple-200/50 bg-white">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          )}
          <div className="space-y-1.5 min-w-0 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border text-purple-800 bg-purple-100 border-purple-200">
                🔬 {item.duration || 'Specialized'} Topic
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">{item.category}</span>
            </div>
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-purple-900 truncate">
              {item.title}
            </h5>
            <p className="text-[11px] text-slate-550 leading-normal font-medium line-clamp-1">
              {item.desc}
            </p>
            {item.syllabus && item.syllabus.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {item.syllabus.slice(0, 1).map((syl, i) => (
                  <span key={i} className="text-[8.5px] font-bold text-purple-900 bg-purple-100/50 border border-purple-200/30 px-2 py-0.2 rounded truncate max-w-[150px]">
                    Method: {syl}
                  </span>
                ))}
              </div>
            )}
          </div>
          <span className="text-purple-800 font-extrabold shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hidden sm:inline-flex items-center gap-0.5">
            View ➔
          </span>
        </div>
      );
    } else { // type === 'Event'
      return (
        <div 
          onClick={onClick}
          className="border border-amber-150 bg-amber-50/20 hover:bg-amber-55/35 hover:border-amber-300 hover:shadow-md transition-all duration-200 rounded-xl p-4 cursor-pointer flex gap-4 items-center text-left group hover:-translate-y-0.5"
        >
          {renderCalendarSheet(item)}
          
          <div className="space-y-1.5 min-w-0 flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border text-amber-850 bg-amber-100 border-amber-250">
                📅 Notice / {item.duration || 'Academy Event'}
              </span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide truncate">{item.category}</span>
            </div>
            <h5 className="font-extrabold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-amber-900 truncate">
              {item.title}
            </h5>
            <p className="text-[11px] text-slate-550 leading-normal font-medium line-clamp-1">
              {item.desc}
            </p>
            {item.syllabus && item.syllabus.length > 0 && (
              <div className="text-[10px] text-amber-800 font-extrabold flex items-center gap-1.5 mt-1.5">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                <span>Active: {item.syllabus[0]}</span>
              </div>
            )}
          </div>
          <span className="text-amber-800 font-extrabold shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hidden sm:inline-flex items-center gap-0.5">
            Register ➔
          </span>
        </div>
      );
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  React.useEffect(() => {
    const handleAuthChange = () => {
      try {
        const savedUser = localStorage.getItem('user');
        setUser(savedUser ? JSON.parse(savedUser) : null);
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setProfileOpen(false);
    window.dispatchEvent(new Event('auth-change'));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="w-full bg-white font-sans shadow-sm">
      {/* 1. Teal Top Bar */}
      <div className="w-full bg-[#08493d] text-white text-[10px] sm:text-xs font-semibold py-1.5 px-4 sm:px-8 flex justify-between items-center select-none border-b border-[#053229]">
        <div className="flex items-center space-x-3 tracking-wider">
          <a href="#main-content" className="hover:text-yellow-300 transition-colors uppercase">
            Skip to main content
          </a>
          <span className="text-[#053229]">|</span>
          <a href="#accessibility" className="hover:text-yellow-300 transition-colors uppercase">
            Screen Reader Access
          </a>
        </div>
        <div className="flex items-center space-x-4">
          {/* Accessibility Icon */}
          <button 
            title="Accessibility Options" 
            className="hover:text-yellow-300 transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-yellow-300"
            aria-label="Accessibility helper"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-4 w-4 fill-current" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v2h2V7zm0 4h-2v6h2v-6z"/>
            </svg>
          </button>
          
          {/* Universal Accessibility Person Icon */}
          <button 
            title="Universal Accessibility" 
            className="hover:text-yellow-300 transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-yellow-300"
            aria-label="Universal accessibility services"
          >
            <svg 
              viewBox="0 0 24 24" 
              className="h-4 w-4 fill-current" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="6" r="2" />
              <path d="M21 9h-6v11h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Main Header Branding Bar */}
      <div className="w-full py-3 px-4 sm:px-8 flex flex-col xl:flex-row justify-between items-center gap-4 xl:gap-2 border-b border-gray-100">
        {/* Left Branding Group (Emblem, Text, Helix Logo) */}
        <div className="flex items-center space-x-3 sm:space-x-4 self-start xl:self-center">
          {/* Sarnath Lion Capital Emblem */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Emblem of India" 
            className="h-12 sm:h-16 w-auto object-contain select-none"
            draggable="false"
          />

          {/* Department Titles */}
          <div className="flex flex-col justify-center border-r border-gray-200 pr-3 sm:pr-4 py-0.5">
            <h1 className="text-gray-900 font-extrabold text-xs sm:text-sm md:text-base tracking-wide leading-tight">
              GOVERNMENT OF INDIA
            </h1>
            <h2 className="text-[#8B2635] font-bold text-[9px] sm:text-[10px] md:text-xs tracking-tight uppercase leading-tight mt-0.5">
              Ministry of Statistics and<br className="hidden sm:inline" /> Programme Implementation
            </h2>
            <h3 className="text-[#1E40AF] font-bold text-[8px] sm:text-[9px] md:text-[10px] tracking-wider uppercase leading-tight mt-1">
              Learning Management<br className="hidden sm:inline" /> System
            </h3>
          </div>

          {/* LMS Helix Logo */}
          <div className="flex items-center" title="LMS Logo">
            <svg 
              viewBox="0 0 100 120" 
              className="h-12 sm:h-16 w-auto object-contain" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="helixGradient" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.25"/>
                </filter>
              </defs>
              <g filter="url(#shadow)">
                {/* Spiral support structure */}
                <rect x="48" y="12" width="4" height="74" rx="2" fill="#D97706" opacity="0.3"/>
                {/* Top decorative sphere */}
                <circle cx="50" cy="8" r="4" fill="url(#helixGradient)" />

                {/* Spiral Helix Ribbon Staircase Steps */}
                {/* Step 7 (Top) */}
                <path d="M 44 15 C 44 11, 56 11, 56 15 C 56 19, 44 19, 44 15" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 44 15 L 44 18 C 44 21, 56 21, 56 18 L 56 15 Z" fill="#92400E" opacity="0.8"/>
                {/* Step 6 */}
                <path d="M 40 26 C 40 22, 60 22, 60 26 C 60 30, 40 30, 40 26" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 40 26 L 40 30 C 40 34, 60 34, 60 30 L 60 26 Z" fill="#78350F" opacity="0.8"/>
                {/* Step 5 */}
                <path d="M 36 38 C 36 34, 64 34, 64 38 C 64 42, 36 42, 36 38" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 36 38 L 36 42 C 36 45, 64 45, 64 42 L 64 38 Z" fill="#92400E" opacity="0.8"/>
                {/* Step 4 */}
                <path d="M 32 50 C 32 46, 68 46, 68 50 C 68 54, 32 54, 32 50" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 32 50 L 32 54 C 32 57, 68 57, 68 54 L 68 50 Z" fill="#78350F" opacity="0.8"/>
                {/* Step 3 */}
                <path d="M 28 62 C 28 58, 72 58, 72 62 C 72 66, 28 66, 28 62" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 28 62 L 28 66 C 28 69, 72 69, 72 66 L 72 62 Z" fill="#92400E" opacity="0.8"/>
                {/* Step 2 */}
                <path d="M 24 74 C 24 70, 76 70, 76 74 C 76 78, 24 78, 24 74" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 24 74 L 24 78 C 24 81, 76 81, 76 78 L 76 74 Z" fill="#78350F" opacity="0.8"/>
                {/* Step 1 (Bottom) */}
                <path d="M 20 86 C 20 82, 80 82, 80 86 C 80 90, 20 90, 20 86" fill="url(#helixGradient)" stroke="#92400E" strokeWidth="0.5"/>
                <path d="M 20 86 L 20 90 C 20 93, 80 93, 80 90 L 80 86 Z" fill="#92400E" opacity="0.8"/>
                
                {/* Helix outer curve highlight */}
                <path d="M 20 86 C 20 71, 80 71, 80 57 C 80 43, 20 43, 20 29 C 20 15, 80 15, 80 9" stroke="url(#helixGradient)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.95"/>
              </g>
              {/* LMS Text at base */}
              <text x="50" y="112" fontFamily="system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#D97706" textAnchor="middle" letterSpacing="0.5">LMS</text>
            </svg>
          </div>
        </div>

        {/* Right Section: Search & Data for Development Logo & Menu trigger */}
        <div className="flex items-center justify-between xl:justify-end w-full xl:w-auto gap-4">
          
          {/* Spotlight Search Box Trigger Button */}
          <div 
            onClick={() => {
              setSpotlightOpen(true);
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="flex items-center flex-grow max-w-md xl:max-w-xs relative cursor-pointer group select-none"
          >
            <div className="w-full border-2 border-[#08493d] rounded-md px-3.5 py-1.5 pr-14 text-xs font-semibold text-slate-400 bg-[#eff7f5]/40 group-hover:bg-white group-hover:border-emerald-600 transition-all flex items-center justify-between shadow-inner">
              <span className="truncate">Search lessons, courses, events...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold bg-white text-slate-400 rounded border border-slate-200 shadow-xs">
                Ctrl K
              </kbd>
            </div>
            <div className="absolute right-3.5 text-emerald-800 group-hover:text-emerald-600 transition-colors">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>

          {/* Data for Development Circular Logo */}
          <div className="flex items-center" title="Data for Development / MoSPI Logo">
            <svg 
              viewBox="0 0 120 120" 
              className="h-12 sm:h-16 w-auto object-contain select-none" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer circle with segment arcs in different colors (SDGs representation) */}
              <circle cx="60" cy="50" r="38" stroke="#f1f5f9" strokeWidth="2.5" />
              
              {/* Colorful Wheel representation */}
              <circle cx="60" cy="50" r="35" stroke="#1E3A8A" strokeWidth="2" fill="#FFFFFF"/>
              {/* SDG arc segments styled beautifully */}
              <circle cx="60" cy="50" r="33.5" stroke="#EF4444" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="0" />
              <circle cx="60" cy="50" r="33.5" stroke="#F59E0B" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="15" />
              <circle cx="60" cy="50" r="33.5" stroke="#10B981" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="30" />
              <circle cx="60" cy="50" r="33.5" stroke="#3B82F6" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="45" />
              <circle cx="60" cy="50" r="33.5" stroke="#6366F1" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="60" />
              <circle cx="60" cy="50" r="33.5" stroke="#EC4899" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="75" />
              <circle cx="60" cy="50" r="33.5" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="10 90" strokeDashoffset="90" />

              {/* Inner Chakra emblem */}
              <circle cx="60" cy="50" r="18" stroke="#1E40AF" strokeWidth="1.2" fill="#EFF6FF" />
              {/* Spokes inside */}
              <line x1="60" y1="32" x2="60" y2="68" stroke="#1E40AF" strokeWidth="0.8"/>
              <line x1="42" y1="50" x2="78" y2="50" stroke="#1E40AF" strokeWidth="0.8"/>
              <line x1="47.3" y1="37.3" x2="72.7" y2="62.7" stroke="#1E40AF" strokeWidth="0.8"/>
              <line x1="47.3" y1="62.7" x2="72.7" y2="37.3" stroke="#1E40AF" strokeWidth="0.8"/>
              <circle cx="60" cy="50" r="4.5" fill="#1E40AF"/>

              {/* Leaves/Cradle at base */}
              {/* Left Leaf */}
              <path d="M 33 66 C 24 74, 38 88, 56 88 C 45 88, 36 78, 33 66 Z" fill="#22C55E"/>
              <path d="M 34 66 C 26 73, 37 84, 52 86 C 43 85, 37 76, 34 66 Z" fill="#15803D"/>
              {/* Right Leaf */}
              <path d="M 87 66 C 96 74, 82 88, 64 88 C 75 88, 84 78, 87 66 Z" fill="#22C55E"/>
              <path d="M 86 66 C 94 73, 83 84, 68 86 C 77 85, 83 76, 86 66 Z" fill="#15803D"/>
              {/* Center connector base */}
              <path d="M 52 84 C 52 84, 60 80, 68 84 C 65 88, 55 88, 52 84 Z" fill="#166534"/>

              {/* Bottom orange ribbon background */}
              <path d="M 28 92 L 92 92 C 92 92, 60 97, 28 92 Z" fill="#F97316" opacity="0.3"/>
              
              {/* Logo Typography */}
              <text x="60" y="106" fontFamily="sans-serif" fontWeight="800" fontSize="7.8" fill="#1E3A8A" textAnchor="middle" letterSpacing="0.2">DATA FOR DEVELOPMENT</text>
            </svg>
          </div>

          {/* Hamburger Mobile Menu Button (Shows only on mobile/tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            aria-label="Toggle Navigation Menu"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.3 5.71a1 1 0 00-1.42 0L12 10.59 7.12 5.7a1 1 0 00-1.42 1.42L10.59 12 5.7 16.88a1 1 0 101.42 1.42L12 13.41l4.88 4.89a1 1 0 001.42-1.42L13.41 12l4.89-4.88a1 1 0 000-1.41z"/>
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 3. Navigation Bar (Desktop layout: items aligned, Mobile layout: drawer/stacked list) */}
      <nav 
        className={`w-full bg-white border-b border-gray-250 select-none ${
          mobileMenuOpen ? 'block' : 'hidden'
        } xl:block`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 xl:py-2.5 flex flex-col xl:flex-row xl:items-center xl:justify-end">
          <ul className="flex flex-col xl:flex-row xl:items-center space-y-2 xl:space-y-0 xl:space-x-8 text-sm font-bold text-slate-800">
            {/* Home link */}
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                    isActive 
                      ? 'text-[#08493d] border-[#08493d]' 
                      : 'text-slate-800 border-transparent'
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            
            {/* About us (Dropdown on click/hover) */}
            <li 
              className="relative" 
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button 
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center w-full py-1 xl:py-2 text-left hover:text-[#08493d] focus:outline-none transition-colors border-b-[3px] border-transparent text-slate-800"
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                <span>About us</span>
                <svg 
                  className={`h-3.5 w-3.5 ml-1 transform transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {aboutOpen && (
                <ul className="xl:absolute xl:left-0 xl:mt-2 xl:before:content-[''] xl:before:absolute xl:before:-top-2 xl:before:left-0 xl:before:right-0 xl:before:h-2 w-full xl:w-48 bg-white border border-gray-100 rounded-md xl:shadow-lg py-1 z-50 text-xs sm:text-sm font-medium text-slate-700 animate-fadeIn">
                  <li>
                    <NavLink to="/about/overview" className="block px-4 py-2 hover:bg-emerald-50 hover:text-[#08493d] transition-colors">
                      Overview
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about/mission" className="block px-4 py-2 hover:bg-emerald-50 hover:text-[#08493d] transition-colors">
                      Mission & Vision
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about/administration" className="block px-4 py-2 hover:bg-emerald-50 hover:text-[#08493d] transition-colors">
                      Administration
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

            {/* Documents */}
            <li>
              <NavLink 
                to="/documents" 
                className={({ isActive }) => 
                  `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                    isActive 
                      ? 'text-[#08493d] border-[#08493d]' 
                      : 'text-slate-800 border-transparent'
                  }`
                }
              >
                Documents
              </NavLink>
            </li>

            {/* Trainings */}
            <li>
              <NavLink 
                to="/trainings" 
                className={({ isActive }) => 
                  `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                    isActive 
                      ? 'text-[#08493d] border-[#08493d]' 
                      : 'text-slate-800 border-transparent'
                  }`
                }
              >
                Trainings
              </NavLink>
            </li>

            {/* Announcements */}
            <li>
              <NavLink 
                to="/announcements" 
                className={({ isActive }) => 
                  `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                    isActive 
                      ? 'text-[#08493d] border-[#08493d]' 
                      : 'text-slate-800 border-transparent'
                  }`
                }
              >
                Announcements
              </NavLink>
            </li>

            {/* Admin Console (Visible only for admin role) */}
            {user?.role === 'admin' && (
              <li>
                <NavLink 
                  to="/admin/users" 
                  className={({ isActive }) => 
                    `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                      isActive 
                        ? 'text-[#08493d] border-[#08493d]' 
                        : 'text-slate-800 border-transparent'
                    }`
                  }
                >
                  Admin Console
                </NavLink>
              </li>
            )}

            {/* Course Registration */}
            <li>
              <NavLink 
                to="/course-registration" 
                className={({ isActive }) => 
                  `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                    isActive 
                      ? 'text-[#08493d] border-[#08493d]' 
                      : 'text-slate-800 border-transparent'
                  }`
                }
              >
                Register Course
              </NavLink>
            </li>

            {/* Contact */}
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => 
                  `block py-1 xl:py-2 hover:text-[#08493d] transition-colors border-b-[3px] ${
                    isActive 
                      ? 'text-[#08493d] border-[#08493d]' 
                      : 'text-slate-800 border-transparent'
                  }`
                }
              >
                Contact
              </NavLink>
            </li>

            {/* Login Button or Profile Dropdown */}
            {user ? (
              <li className="relative xl:pl-2">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#eff7f5] text-[#08493d] border border-[#08493d] rounded-md text-xs font-bold hover:bg-[#e2f2ef] transition-colors focus:outline-none cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5 text-[#08493d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{user.name}</span>
                  <svg className={`h-3.5 w-3.5 ml-1 transform transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <ul className="xl:absolute xl:right-0 xl:mt-2 w-48 bg-white border border-[#08493d] rounded-lg shadow-lg py-3 z-50 text-xs font-semibold text-slate-700 animate-fadeIn">
                    <li className="px-4 pb-2 text-left">
                      <p className="text-sm font-extrabold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-[#15803D] font-extrabold uppercase tracking-wider mt-1">{user.role === 'admin' ? 'ADMIN PORTAL' : (user.role.toUpperCase() + ' PORTAL')}</p>
                      <p className="text-xs text-slate-400 font-medium lowercase mt-0.5">{user.email}</p>
                    </li>
                    {user.role === 'admin' && (
                      <li className="border-t border-gray-100 pt-1.5">
                        <NavLink 
                          to="/admin/e-hostel" 
                          onClick={() => setProfileOpen(false)}
                          className="block px-4 py-2 hover:bg-slate-50 hover:text-[#08493d] transition-colors font-bold text-xs"
                        >
                          e-Hostel Dashboard
                        </NavLink>
                      </li>
                    )}
                    <li className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-rose-50 hover:text-rose-700 font-bold transition-colors text-xs cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <li className="xl:pl-2">
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `inline-flex items-center justify-center px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-150 ${
                      isActive 
                        ? 'bg-yellow-400 text-[#08493d] shadow-sm' 
                        : 'bg-[#08493d] text-white hover:bg-[#063b31] hover:shadow-xs'
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* 4. Spotlight Search Overlay */}
      {spotlightOpen && (
        <div className="fixed inset-0 z-50 bg-[#053229]/80 backdrop-blur-md flex flex-col items-center pt-[8vh] sm:pt-[12vh] px-4 select-none animate-fadeIn font-sans">
          {/* Click-away backdrop container */}
          <div className="fixed inset-0 -z-10" onClick={() => setSpotlightOpen(false)} />

          {/* Modal Container */}
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden flex flex-col max-h-[80vh] animate-scaleUp">
            
            {/* Search Input Box Header */}
            <div className="relative border-b border-gray-150 p-4 sm:p-5 bg-gradient-to-r from-[#eff7f5] to-white flex items-center gap-3">
              <div className="absolute left-8 text-emerald-800">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </div>

              <input
                ref={spotlightInputRef}
                type="text"
                placeholder="Type to search ISS trainings, SNA principles, events, essays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#08493d] rounded-xl py-3 pl-12 pr-32 text-sm sm:text-base font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-700/20 focus:border-[#08493d] transition-all shadow-inner"
              />

              <div className="absolute right-8 flex items-center gap-2">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-1.5 text-gray-400 hover:text-gray-650 rounded-full hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
                    title="Clear input"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-bold bg-gray-100 text-slate-500 rounded border border-gray-250 select-none">
                  ESC
                </span>
                <button
                  onClick={() => setSpotlightOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors focus:outline-none cursor-pointer"
                  title="Close Search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Category Navigation Bar */}
            <div className="px-5 py-2.5 bg-slate-50 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {['All', 'Course', 'Lesson', 'Topic', 'Event'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#08493d] text-white border-[#08493d] shadow-sm'
                      : 'bg-white text-slate-650 border-gray-200 hover:bg-gray-100 hover:text-slate-800'
                  }`}
                >
                  {cat === 'All' ? 'All Resources' : cat + 's'}
                </button>
              ))}
            </div>

            {/* Content Results & Suggestions Scroll Pane */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white max-h-[50vh]">
              {searchQuery.trim().length === 0 ? (
                // 1. Recommended / Spotlight Welcome Dashboard State
                <div className="space-y-5 animate-fadeIn">
                  <div>
                    {activeCategory === 'All' ? (
                      <>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Quick Searches</h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium">Explore standard curriculums and events in high demand:</p>
                      </>
                    ) : (
                      <>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeCategory} Resources Catalog</h4>
                        <p className="text-xs text-slate-550 mt-0.5 font-medium">Browse our full listing of statistical {activeCategory.toLowerCase()}s:</p>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {(activeCategory === 'All' 
                      ? getRecommendedSearches() 
                      : searchDatabase.filter(item => item.type === activeCategory)
                    ).map((item, idx) => 
                      renderItemCard(item, () => {
                        const found = searchDatabase.find(dbItem => dbItem.title === item.title);
                        if (found) {
                          setSelectedSearchItem(found);
                          setSpotlightOpen(false);
                          setEnrollMsg('');
                        }
                      })
                    )}
                  </div>

                  {/* Keyboard Guide Footer info inside results */}
                  <div className="bg-[#eff7f5] rounded-xl p-3 border border-emerald-150 flex items-center justify-between text-[11px] text-emerald-850 font-bold">
                    <span className="flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                      </svg>
                      Tip: Search filters like Lessons, Courses, or Topics update instantly as you type.
                    </span>
                    <span className="hidden sm:inline-block">Press ESC anytime to exit.</span>
                  </div>
                </div>
              ) : (
                // 2. Real-time Search Results Grid
                <div className="space-y-3.5 animate-fadeIn">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-gray-100 pb-2">
                    <span>Search Results ({filteredSpotlightResults.length})</span>
                    <span>Filtering by {activeCategory === 'All' ? 'All Types' : activeCategory + 's'}</span>
                  </div>

                  {filteredSpotlightResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {filteredSpotlightResults.map((item, idx) => 
                        renderItemCard(item, () => {
                          setSelectedSearchItem(item);
                          setSpotlightOpen(false);
                          setEnrollMsg('');
                        })
                      )}
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-500">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <p className="text-slate-800 font-extrabold text-sm">No results match your criteria</p>
                        <p className="text-slate-400 font-medium text-xs">Try selecting a different filter above or typing something else.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom Keyboard Shortcuts Help Bar */}
            <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-150 flex items-center justify-between text-[11px] text-slate-450 font-bold select-none">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-250 rounded text-[9px] shadow-xs text-slate-500 font-sans">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-250 rounded text-[9px] shadow-xs text-slate-500 font-sans">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white border border-gray-250 rounded text-[9px] shadow-xs text-slate-500 font-sans">ESC</kbd> Close
                </span>
              </div>
              <div className="text-right font-semibold text-slate-400">
                National Statistics Academy (NSSTA) Portal
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Global Search Detail Modal */}
      {selectedSearchItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-900/10 overflow-hidden relative animate-fadeIn mx-4 text-left">
            
            {/* cover image inside modal */}
            {selectedSearchItem.image && (
              <div className="h-44 w-full relative overflow-hidden bg-slate-100 shrink-0">
                <img src={selectedSearchItem.image} alt={selectedSearchItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                      selectedSearchItem.type === 'Course' ? 'bg-blue-600 text-blue-50 border-blue-400' :
                      selectedSearchItem.type === 'Lesson' ? 'bg-emerald-600 text-emerald-50 border-emerald-400' :
                      selectedSearchItem.type === 'Topic' ? 'bg-purple-600 text-purple-50 border-purple-400' :
                      'bg-amber-600 text-amber-50 border-amber-400'
                    }`}>
                      {selectedSearchItem.type}
                    </span>
                    <span className="text-[10px] text-emerald-300 font-black uppercase tracking-widest">{selectedSearchItem.category}</span>
                  </div>
                </div>
                {/* Close Button overlay */}
                <button 
                  onClick={() => setSelectedSearchItem(null)} 
                  className="absolute top-4 right-4 text-white hover:text-rose-250 bg-slate-900/40 hover:bg-slate-900/60 p-1.5 rounded-full focus:outline-none cursor-pointer transition-colors"
                  title="Close Modal"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* fallback header if no image */}
            {!selectedSearchItem.image && (
              <div className="bg-[#053229] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    selectedSearchItem.type === 'Course' ? 'bg-blue-800/80 text-blue-100 border-blue-600' :
                    selectedSearchItem.type === 'Lesson' ? 'bg-emerald-800/80 text-emerald-100 border-emerald-600' :
                    selectedSearchItem.type === 'Topic' ? 'bg-purple-800/80 text-purple-100 border-purple-600' :
                    'bg-amber-800/80 text-amber-100 border-amber-600'
                  }`}>
                    {selectedSearchItem.type}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">{selectedSearchItem.category}</span>
                </div>
                <button 
                  onClick={() => setSelectedSearchItem(null)} 
                  className="text-slate-350 hover:text-white focus:outline-none cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <div className="p-6 space-y-4 text-xs sm:text-sm font-semibold text-slate-650">
              {enrollMsg && (
                <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-3 rounded-xl text-center text-xs font-bold font-sans">
                  ✓ {enrollMsg}
                </div>
              )}

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-800 leading-snug">{selectedSearchItem.title}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium leading-normal">
                  Reference Module: <strong className="text-slate-500">{selectedSearchItem.category}</strong> • Duration: {selectedSearchItem.duration}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Description</label>
                <p className="text-slate-650 text-xs leading-relaxed font-semibold bg-slate-50 p-3.5 border border-gray-150 rounded-xl">
                  {selectedSearchItem.desc}
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {selectedSearchItem.type === 'Event' ? 'Event Schedule / Agenda' : 'Syllabus & Course Modules'}
                </label>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedSearchItem.syllabus.map((syl, i) => (
                    <li key={i} className="flex items-center gap-2 p-2 bg-slate-50 border border-gray-100 rounded-lg">
                      <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full shrink-0" />
                      <span className="truncate text-slate-700 font-bold">{syl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedSearchItem(null)}
                  className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 border border-gray-300 text-slate-700 font-bold rounded-lg cursor-pointer text-center"
                >
                  Close Window
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setEnrollMsg(
                      selectedSearchItem.type === 'Event' 
                        ? 'Successfully registered for this quiz/competition! Invitation card cached in Profile.'
                        : 'Enrolled successfully! Course materials and lectures are now active in your Trainee Dashboard.'
                    );
                  }}
                  className="w-1/2 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-lg shadow-sm hover:shadow cursor-pointer text-center"
                >
                  {selectedSearchItem.type === 'Event' ? 'Register Event' : 'Access Course'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}