import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportAnalyticsDashboard() {
  const navigate = useNavigate();

  // Toast notification system
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  // Filters state
  const [financialYear, setFinancialYear] = useState('2024-25');
  const [startDate, setStartDate] = useState('2024-04-01');
  const [endDate, setEndDate] = useState('2025-03-31');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedMinistry, setSelectedMinistry] = useState('All Ministries');
  const [selectedCadre, setSelectedCadre] = useState('All Cadres');
  const [selectedDesignation, setSelectedDesignation] = useState('All Designations');
  const [selectedTrainingType, setSelectedTrainingType] = useState('All Types');

  // Report Center Form state
  const [reportType, setReportType] = useState('Monthly Report');
  const [rcState, setRcState] = useState('All States');
  const [rcMinistry, setRcMinistry] = useState('All Ministries');
  const [rcCadre, setRcCadre] = useState('All Cadres');
  const [rcDesignation, setRcDesignation] = useState('All Designations');
  const [rcTrainingType, setRcTrainingType] = useState('All Types');
  const [rcCourse, setRcCourse] = useState('All Courses');
  const [rcStartDate, setRcStartDate] = useState('2024-04-01');
  const [rcEndDate, setRcEndDate] = useState('2025-03-31');

  // KPI metrics (filter-responsive)
  const [kpiData, setKpiData] = useState({
    learners: 245860, courses: 1250, completionRate: 87.5,
    dropoutRate: 8.2, certifications: 195420, avgHours: 16.5
  });

  // Update KPI when global filters change
  useEffect(() => {
    // 1. Calculate date multiplier based on selected date range relative to 365 days
    let dateMultiplier = 1;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      dateMultiplier = Math.min(1.2, Math.max(0.05, diffDays / 365));
    }

    // 2. Calculate categorical filter factors
    const stateFactor = selectedState === 'All States' ? 1 : 0.22;
    const ministryFactor = selectedMinistry === 'All Ministries' ? 1 : 0.35;
    const cadreFactor = selectedCadre === 'All Cadres' ? 1 : 0.5;
    const designationFactor = selectedDesignation === 'All Designations' ? 1 : 0.45;
    const trainingTypeFactor = selectedTrainingType === 'All Types' ? 1 : 0.4;

    // 3. Composite multiplier
    const m = stateFactor * ministryFactor * cadreFactor * designationFactor * trainingTypeFactor * dateMultiplier;

    // Deterministic seed value from filter lengths so state updates are stable
    const seed = selectedState.length + selectedMinistry.length + selectedCadre.length + selectedTrainingType.length + (startDate?.length || 0);

    setKpiData({
      learners: Math.max(10, Math.floor(245860 * m)),
      courses: Math.max(1, Math.floor(1250 * m)),
      completionRate: Number((82 + (seed % 10) + (dateMultiplier * 5)).toFixed(1)),
      dropoutRate: Number((5 + (seed % 6) + (2 - dateMultiplier * 2)).toFixed(1)),
      certifications: Math.max(5, Math.floor(195420 * m)),
      avgHours: Number((12 + (seed % 8)).toFixed(1))
    });
  }, [selectedState, selectedMinistry, selectedCadre, selectedDesignation, selectedTrainingType, financialYear, startDate, endDate]);

  // Dynamic state distribution data based on filters
  const stateData = React.useMemo(() => {
    const baseData = [
      { name: 'Uttar Pradesh', count: 30200, percent: 12.3 },
      { name: 'Rajasthan', count: 25450, percent: 10.4 },
      { name: 'Maharashtra', count: 21800, percent: 8.9 },
      { name: 'Karnataka', count: 18600, percent: 7.6 },
      { name: 'Madhya Pradesh', count: 16300, percent: 6.6 }
    ];
    
    let dateMultiplier = 1;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      dateMultiplier = Math.min(1.2, Math.max(0.05, diffDays / 365));
    }

    const trainingTypeFactor = selectedTrainingType === 'All Types' ? 1 : 0.4;
    const designationFactor = selectedDesignation === 'All Designations' ? 1 : 0.45;

    let multiplier = dateMultiplier * trainingTypeFactor * designationFactor;
    if (selectedMinistry !== 'All Ministries') multiplier *= 0.6;
    if (selectedCadre !== 'All Cadres') multiplier *= 0.45;
    
    let res = baseData.map(item => {
      let count = Math.floor(item.count * multiplier);
      if (selectedState !== 'All States' && item.name !== selectedState) {
        count = Math.floor(count * 0.08); // heavily suppress other states
      }
      return { ...item, count };
    });
    return res.sort((a, b) => b.count - a.count);
  }, [selectedState, selectedMinistry, selectedCadre, selectedDesignation, selectedTrainingType, startDate, endDate]);

  // Training Type Distribution donut metrics
  const trainingTypeData = React.useMemo(() => {
    let fRatio = 40.2, rRatio = 28.4, lRatio = 17.6, sRatio = 13.8;
    if (selectedTrainingType === 'Foundation Training') {
      fRatio = 85; rRatio = 5; lRatio = 5; sRatio = 5;
    } else if (selectedTrainingType === 'Refresher Training') {
      fRatio = 5; rRatio = 85; lRatio = 5; sRatio = 5;
    }
    const total = kpiData.learners;
    const fCount = Math.floor(total * (fRatio / 100));
    const rCount = Math.floor(total * (rRatio / 100));
    const lCount = Math.floor(total * (lRatio / 100));
    const sCount = total - fCount - rCount - lCount;
    return {
      foundation: { pct: fRatio, count: fCount },
      refresher: { pct: rRatio, count: rCount },
      leadership: { pct: lRatio, count: lCount },
      specialized: { pct: sRatio, count: sCount }
    };
  }, [kpiData.learners, selectedTrainingType]);

  // Gender Distribution metrics
  const genderData = React.useMemo(() => {
    const seed = selectedState.length + selectedMinistry.length;
    const mRatio = Number((50 + (seed % 15)).toFixed(1));
    const fRatio = Number((30 + (seed % 12)).toFixed(1));
    const oRatio = Number((100 - mRatio - fRatio).toFixed(1));
    return { male: mRatio, female: fRatio, other: oRatio };
  }, [selectedState, selectedMinistry, selectedCadre]);

  // Cadre Distribution metrics
  const cadreData = React.useMemo(() => {
    let cRatio = 40.1, sRatio = 30.2, rRatio = 17.8;
    if (selectedCadre.includes('ISS') || selectedCadre.includes('SSS')) {
      cRatio = 80; sRatio = 10; rRatio = 10;
    } else if (selectedCadre === 'State Statistical Service') {
      cRatio = 10; sRatio = 80; rRatio = 10;
    } else if (selectedCadre === 'Planning Service') {
      cRatio = 15; sRatio = 15; rRatio = 70;
    }
    return { central: cRatio, state: sRatio, research: rRatio };
  }, [selectedCadre]);

  // Score Distribution bar heights
  const scoreData = React.useMemo(() => {
    const seed = selectedState.length + selectedMinistry.length + selectedCadre.length;
    let b1 = 5 + (seed % 3);
    let b2 = 12 + (seed % 5);
    let b3 = 28 - (seed % 4);
    let b4 = 35 + (seed % 6);
    let b5 = 20 - (seed % 3);
    const sum = b1 + b2 + b3 + b4 + b5;
    return {
      p1: Number(((b1 / sum) * 100).toFixed(0)),
      p2: Number(((b2 / sum) * 100).toFixed(0)),
      p3: Number(((b3 / sum) * 100).toFixed(0)),
      p4: Number(((b4 / sum) * 100).toFixed(0)),
      p5: Number(((b5 / sum) * 100).toFixed(0))
    };
  }, [selectedState, selectedMinistry, selectedCadre]);

  // Peer Benchmarking data
  const peerData = React.useMemo(() => {
    const seed = selectedState.length;
    return [
      { name: 'MoSPI', rate: 93 + (seed % 3), score: 88 + (seed % 2), rank: '🥇 1' },
      { name: 'Rural Development', rate: 89 + (seed % 3), score: 82 + (seed % 3), rank: '🥈 2' },
      { name: 'Agriculture', rate: 85 + (seed % 3), score: 79 + (seed % 2), rank: '🥉 3' },
      { name: 'Health & Family', rate: 82 + (seed % 4), score: 76 + (seed % 3), rank: '4' }
    ];
  }, [selectedState]);

  // Dynamic Heatmap rates
  const heatmapData = React.useMemo(() => {
    const seed = selectedMinistry.length + selectedCadre.length;
    const generateRates = (base) => {
      return Array.from({ length: 12 }, (_, i) => {
        const val = base + ((seed + i) % 7) - 3;
        return Math.min(100, Math.max(50, val));
      });
    };
    return {
      rajasthan: generateRates(94),
      up: generateRates(87),
      maharashtra: generateRates(93),
      karnataka: generateRates(92),
      mp: generateRates(85)
    };
  }, [selectedMinistry, selectedCadre]);

  // Spline Paths based on filters
  const splinePaths = React.useMemo(() => {
    const seed = selectedState.length + selectedMinistry.length + selectedCadre.length;
    const offset1 = (seed % 8) - 4;
    const offset2 = (seed % 10) - 5;
    const offset3 = (seed % 6) - 3;
    const offset4 = (seed % 12) - 6;
    return {
      registrations: `M 10 ${95 + offset1} C 40 ${85 + offset2}, 80 ${50 + offset3}, 110 ${55 + offset4} C 140 60, 175 40, 210 30 C 240 20, 280 25, 310 15 C 340 5, 380 18, 395 10`,
      starts: `M 10 ${100 - offset1} C 45 ${90 - offset2}, 75 ${60 - offset3}, 110 ${68 - offset4} C 140 75, 180 55, 210 45 C 245 35, 275 40, 310 30 C 345 20, 375 25, 395 20`,
      completions: `M 10 ${105 + offset3} C 40 98, 70 70, 110 80 C 140 88, 170 75, 210 65 C 240 55, 280 60, 310 50 C 340 40, 370 48, 395 40`,
      certifications: `M 10 ${110 + offset4} C 40 105, 70 85, 110 92 C 140 98, 170 88, 210 80 C 240 70, 280 75, 310 62 C 340 50, 370 58, 395 52`
    };
  }, [selectedState, selectedMinistry, selectedCadre]);

  // AI Insights based on selectedState/Ministry
  const aiInsights = React.useMemo(() => {
    let title1 = "Low Engagement Warning";
    let desc1 = "Advanced Excel & Data Analysis Basics show declining weekly activity metrics.";
    let title2 = "Suggested Intervention";
    let desc2 = "Increase live virtual Q&A sessions and append 2 interactive practice score tasks.";

    if (selectedState !== 'All States') {
      title1 = `State Focus: ${selectedState}`;
      desc1 = `Engagement trends in ${selectedState} indicate high participation in Foundation courses.`;
      title2 = "State Recommendation";
      desc2 = "Conduct localized refresher assessments to evaluate learning retention rates.";
    } else if (selectedMinistry !== 'All Ministries') {
      title1 = `Ministry Alert: ${selectedMinistry}`;
      desc1 = `Learners from ${selectedMinistry} have achieved 90%+ average completion rate.`;
      title2 = "Next Milestone";
      desc2 = "Initiate statistical advanced analysis certification program for remaining batches.";
    }

    return [
      { type: 'warning', title: title1, desc: desc1 },
      { type: 'info', title: title2, desc: desc2 }
    ];
  }, [selectedState, selectedMinistry]);

  // Generated preview parameters
  const [previewStats, setPreviewStats] = useState({
    trainings: 1245, participants: 48760,
    completionRate: 87.5, certifications: 38920
  });

  // Automated Reporting schedule form states
  const [schedFreq, setSchedFreq] = useState('Monthly');
  const [schedFormat, setSchedFormat] = useState('PDF & Excel');
  const [schedEmails, setSchedEmails] = useState('nssta@nic.in, nodal@state.gov.in');
  const [schedTime, setSchedTime] = useState('09:00 AM');

  // Scheduled reports list
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: 'Monthly LMS Report', freq: 'Monthly', recipients: 'NSSTA', status: 'Active', next: '01 Jun 2025' },
    { id: 2, name: 'State Progress Report', freq: 'Monthly', recipients: 'State Nodal Officers', status: 'Active', next: '01 Jun 2025' },
    { id: 3, name: 'Quarterly Analytics', freq: 'Quarterly', recipients: 'MoSPI', status: 'Active', next: '01 Jul 2025' },
    { id: 4, name: 'Annual Training Report', freq: 'Yearly', recipients: 'All Stakeholders', status: 'Active', next: '01 Apr 2026' }
  ]);

  // Update Preview Stats when Reports Center wizard settings change
  useEffect(() => {
    const stateMult = rcState === 'All States' ? 1 : 0.2 + Math.random() * 0.15;
    const minMult = rcMinistry === 'All Ministries' ? 1 : 0.3 + Math.random() * 0.2;
    const m = stateMult * minMult;
    setPreviewStats({
      trainings: Math.floor(1245 * m),
      participants: Math.floor(48760 * m),
      completionRate: Number((84 + Math.random() * 8).toFixed(1)),
      certifications: Math.floor(38920 * m)
    });
  }, [rcState, rcMinistry, rcCourse, reportType, rcStartDate, rcEndDate]);

  const handleGenerateReport = () => {
    const seed = Math.random();
    setPreviewStats({
      trainings: Math.floor(1000 + seed * 500),
      participants: Math.floor(40000 + seed * 15000),
      completionRate: Number((82 + seed * 10).toFixed(1)),
      certifications: Math.floor(30000 + seed * 12000)
    });
    showToast(`${reportType} generated for ${rcState} / ${rcMinistry}`, 'success');
  };

  const handleSaveSchedule = (e) => {
    e.preventDefault();
    const newSched = {
      id: Date.now(), name: `${schedFreq} Custom Report`, freq: schedFreq,
      recipients: schedEmails.split(',')[0]?.trim() || 'Admin',
      status: 'Active', next: '01 Jun 2025'
    };
    setScheduledReports([...scheduledReports, newSched]);
    showToast('New automated schedule registered!', 'success');
  };

  const handleDeleteSchedule = (id) => {
    setScheduledReports(prev => prev.filter(r => r.id !== id));
    showToast('Schedule removed', 'info');
  };

  const handleExport = (format) => {
    showToast(`${format} export started — downloading...`, 'success');
  };

  const formatNum = (n) => n.toLocaleString('en-IN');

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 font-sans text-xs font-semibold text-left select-none p-4 sm:p-6 space-y-5">
      
      {/* 1. Header Bar */}
      <div className="bg-white px-5 py-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => window.history.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" title="Menu">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">Report Generation & Analytics</h1>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-0.5">Comprehensive insights on training programs and performance</p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <div className="flex gap-1.5">
            <button className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer" title="Search">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 relative cursor-pointer" title="Notifications">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-slate-50 border border-gray-200 hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer" title="Help">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-2 border-l pl-3">
            <span className="text-[10px] text-slate-400 font-bold hidden sm:inline">Welcome,</span>
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-50 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=facearea&facepad=2" alt="Admin" className="w-8 h-8 rounded-full border border-gray-200" />
              <span className="font-extrabold text-slate-800 hidden sm:inline">Admin User ▾</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Filters Panel */}
      <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 items-end">
        {[
          {l:'Financial Year',v:financialYear,s:setFinancialYear,o:['2024-25','2023-24']},
          {l:'Start Date',v:startDate,s:setStartDate,isDate:true},
          {l:'End Date',v:endDate,s:setEndDate,isDate:true},
          {l:'State',v:selectedState,s:setSelectedState,o:['All States','Uttar Pradesh','Rajasthan','Maharashtra','Karnataka','Madhya Pradesh']},
          {l:'Ministry',v:selectedMinistry,s:setSelectedMinistry,o:['All Ministries','MoSPI','Rural Development','Agriculture']},
          {l:'Cadre',v:selectedCadre,s:setSelectedCadre,o:['All Cadres','Indian Statistical Service (ISS)','Subordinate Statistical Service (SSS)','State Statistical Service','Administrative Service','Revenue Service','Accounts & Audit Service','Planning Service','Technical Cadre','Ministerial Cadre','Field Staff Cadre']},
          {l:'Designation',v:selectedDesignation,s:setSelectedDesignation,o:['All Designations','Additional Director General','Director','Joint Director','Deputy Director','Senior Statistical Officer','Junior Statistical Officer']},
          {l:'Training Type',v:selectedTrainingType,s:setSelectedTrainingType,o:['All Types','Foundation Training','Refresher Training']}
        ].map((f,i) => (
          <div key={i} className="space-y-0.5">
            <label className="text-[8.5px] text-slate-400 font-black uppercase tracking-wider block">{f.l}</label>
            {f.isDate ? (
              <input type="date" value={f.v} onChange={e => f.s(e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-[10.5px] font-bold focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none cursor-pointer" />
            ) : (
              <select value={f.v} onChange={e => f.s(e.target.value)} className="w-full border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-[10.5px] font-bold cursor-pointer focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none appearance-none">
                {f.o.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* 3. KPI Key metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          {label:'Total Learners',value:formatNum(kpiData.learners),change:'▲ 12.5% vs last year',color:'blue',icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'},
          {label:'Courses Conducted',value:formatNum(kpiData.courses),change:'▲ 8.3% vs last year',color:'blue',icon:'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'},
          {label:'Completion Rate',value:`${kpiData.completionRate}%`,change:'▲ 6.7% vs last year',color:'emerald',icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'},
          {label:'Dropout Rate',value:`${kpiData.dropoutRate}%`,change:'▼ -1.3% vs last year',color:'rose',icon:'M13 17h8m0 0V9m0 8l-8-8-4 4-6-6',isDown:true},
          {label:'Certifications Issued',value:formatNum(kpiData.certifications),change:'▲ 10.3% vs last year',color:'amber',icon:'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'},
          {label:'Avg. Learning Hours',value:`${kpiData.avgHours} hrs`,change:'▲ 2.8% vs last year',color:'purple',icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'}
        ].map((m,i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
            <div className={`w-11 h-11 rounded-full bg-${m.color}-50 flex items-center justify-center shrink-0`}>
              <svg className={`w-5 h-5 text-${m.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={m.icon} /></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[8.5px] text-slate-400 uppercase font-black tracking-wider truncate">{m.label}</p>
              <h3 className="text-[15px] font-black text-slate-800 leading-tight">{m.value}</h3>
              <span className={`text-[9px] font-bold ${m.isDown ? 'text-emerald-600' : 'text-emerald-600'}`}>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 4. First Main Grid (Learner Distribution, Spline progress, Reports center) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* State distribution map */}
        <div className="xl:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2">Learner Distribution by State</h3>
            
            {/* Outline map of India simulation */}
            <div className="py-4 flex justify-center relative">
              <svg className="w-32 h-36 opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Simulated India Map polygon paths */}
                <path d="M50 5 L75 25 L85 50 L65 75 L50 95 L25 80 L15 50 L35 20 Z" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
                {/* Active shaded states */}
                <path d="M50 5 L65 20 L55 35 L45 25 Z" fill="#3b82f6" title="Uttar Pradesh" />
                <path d="M25 35 L45 25 L35 50 L20 40 Z" fill="#2563eb" title="Rajasthan" />
                <path d="M35 50 L55 55 L45 75 L30 65 Z" fill="#1d4ed8" title="Maharashtra" />
              </svg>
              
              {/* Legend bar */}
              <div className="absolute bottom-1 left-2 flex items-center gap-1 text-[8.5px] font-bold text-slate-400">
                <span>Low</span>
                <div className="w-12 h-2.5 bg-gradient-to-r from-blue-50 to-blue-800 rounded border" />
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <table className="w-full text-left text-[11px] font-semibold text-slate-700">
              <tbody>
                {stateData.map(s => (
                  <tr key={s.name} className="border-b last:border-b-0 hover:bg-slate-50/50">
                    <td className="py-1">{s.name}</td>
                    <td className="py-1 text-right font-bold text-slate-800">{s.count.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="w-full text-center text-blue-650 hover:underline font-bold text-[10px] mt-1">View All States</button>
          </div>
        </div>

        {/* Spline Monthly chart */}
        <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide">Monthly Training Progress</h3>
            <select className="border rounded text-[10px] px-2 py-0.5 bg-slate-50 font-bold">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>

          {/* Spline line indicators legends */}
          <div className="flex flex-wrap gap-4 py-2 text-[9.5px] font-extrabold justify-center border-b border-dashed border-gray-100">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-blue-650 rounded-full" /> Registrations</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-emerald-650 rounded-full" /> Course Starts</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-600 rounded-full" /> Completions</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-purple-650 rounded-full" /> Certifications</div>
          </div>

          {/* Spline Chart Canvas */}
          <div className="py-6 flex-grow flex items-end min-h-[160px] relative">
            <svg className="w-full h-36 overflow-visible" viewBox="0 0 400 120">
              {/* Grid Background lines */}
              <line x1="0" y1="20" x2="400" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="110" x2="400" y2="110" stroke="#cbd5e1" strokeWidth="1" />

              {/* Blue Spline Registrations */}
              <path d={splinePaths.registrations} fill="none" stroke="#2563eb" strokeWidth="2.5" />
              {/* Green Spline Course Starts */}
              <path d={splinePaths.starts} fill="none" stroke="#10b981" strokeWidth="2" />
              {/* Orange Spline Completions */}
              <path d={splinePaths.completions} fill="none" stroke="#f59e0b" strokeWidth="2" />
              {/* Purple Spline Certifications */}
              <path d={splinePaths.certifications} fill="none" stroke="#8b5cf6" strokeWidth="1.5" />

              {/* Points */}
              <circle cx="310" cy="15" r="3" fill="#2563eb" />
              <circle cx="310" cy="30" r="3" fill="#10b981" />
              <circle cx="310" cy="50" r="3" fill="#f59e0b" />
            </svg>
          </div>

          <div className="grid grid-cols-12 text-[8px] font-black text-slate-400 uppercase text-center pt-2 border-t">
            {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map(m => (
              <span key={m} className="col-span-1">{m}</span>
            ))}
          </div>
        </div>

        {/* Reports center wizards */}
        <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2">Reports Center</h3>
            <p className="text-[10px] text-slate-400 mt-1">Generate, customize and export reports</p>
          </div>

          {/* Three column configuration sections inside */}
          <div className="grid grid-cols-3 gap-3.5 py-4 flex-grow">
            
            {/* 1. Report Type */}
            <div className="space-y-1.5 border-r pr-2">
              <span className="text-[8.5px] text-[#08493d] font-black uppercase">1. Report Type</span>
              {['Monthly Report', 'Quarterly Report', 'Annual Report', 'Custom Report'].map(t => (
                <button
                  key={t}
                  onClick={() => setReportType(t)}
                  className={`w-full py-1.5 px-2 rounded text-left text-[9.5px] font-extrabold border transition-all ${
                    reportType === t 
                      ? 'bg-blue-50 text-blue-750 border-blue-200' 
                      : 'hover:bg-slate-50 border-transparent text-slate-600'
                  }`}
                >
                  📝 {t}
                </button>
              ))}
            </div>

            {/* 2. Apply Filters */}
            <div className="space-y-2 border-r pr-2 text-[9.5px]">
              <span className="text-[8.5px] text-[#08493d] font-black uppercase">2. Apply Filters</span>
              
              <div className="space-y-1.5 overflow-y-auto max-h-[140px] pr-1">
                <div>
                  <label className="text-[8.5px] text-slate-400 font-bold block">State:</label>
                  <select value={rcState} onChange={e => setRcState(e.target.value)} className="w-full border border-gray-200 rounded text-[9.5px] py-0.5 bg-slate-50 cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none">
                    <option value="All States">All States</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8.5px] text-slate-400 font-bold block">Ministry:</label>
                  <select value={rcMinistry} onChange={e => setRcMinistry(e.target.value)} className="w-full border border-gray-200 rounded text-[9.5px] py-0.5 bg-slate-50 cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none">
                    <option value="All Ministries">All Ministries</option>
                    <option value="MoSPI">MoSPI</option>
                    <option value="Rural Development">Rural Development</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8.5px] text-slate-400 font-bold block">Course:</label>
                  <select value={rcCourse} onChange={e => setRcCourse(e.target.value)} className="w-full border border-gray-200 rounded text-[9.5px] py-0.5 bg-slate-50 cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none">
                    <option value="All Courses">All Courses</option>
                    <option value="SDG Indicator Methods">SDG Methods</option>
                    <option value="Advanced Statistical Methods">Advanced Stats</option>
                    <option value="Database Systems Basics">DB Basics</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8.5px] text-slate-400 font-bold block">Start Date:</label>
                  <input type="date" value={rcStartDate} onChange={e => setRcStartDate(e.target.value)} className="w-full border border-gray-200 rounded text-[9.5px] py-0.5 bg-slate-50 cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none" />
                </div>
                <div>
                  <label className="text-[8.5px] text-slate-400 font-bold block">End Date:</label>
                  <input type="date" value={rcEndDate} onChange={e => setRcEndDate(e.target.value)} className="w-full border border-gray-200 rounded text-[9.5px] py-0.5 bg-slate-50 cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none" />
                </div>
              </div>
            </div>

            {/* 3. Export Options */}
            <div className="space-y-1.5 text-center">
              <span className="text-[8.5px] text-[#08493d] font-black uppercase block text-left">3. Export Options</span>
              
              <button onClick={() => handleExport('Excel')} className="w-full py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded font-black text-[9px] border border-emerald-200 flex items-center justify-center gap-1 cursor-pointer">
                📊 Export Excel
              </button>
              <button onClick={() => handleExport('PDF')} className="w-full py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded font-black text-[9px] border border-rose-200 flex items-center justify-center gap-1 cursor-pointer">
                📕 Export PDF
              </button>
              <button onClick={() => showToast('Report email dispatched!', 'success')} className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded font-black text-[9px] border border-blue-200 flex items-center justify-center gap-1 cursor-pointer">
                ✉️ Email Report
              </button>
              <button onClick={() => showToast('Spooling print request...', 'info')} className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded font-black text-[9px] border border-slate-200 flex items-center justify-center gap-1 cursor-pointer">
                🖨️ Print Report
              </button>
            </div>

          </div>

          <button 
            onClick={handleGenerateReport}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-md tracking-wider uppercase text-[10.5px] cursor-pointer"
          >
            Generate Report
          </button>
        </div>

      </div>

      {/* 5. Second Main Grid (Heatmap, donuts, Peer benchmark, preview panel) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Heatmap state completion rates */}
        <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm overflow-x-auto">
          <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Course Completion Heatmap (State-wise %)</h3>
          
          <table className="w-full border-collapse text-[10.5px] text-center font-bold text-slate-700">
            <thead>
              <tr className="bg-slate-50 border-b text-[8px] text-slate-400 uppercase">
                <th className="p-1 text-left">State</th>
                {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Avg'].map(m => (
                  <th key={m} className="p-1">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-1 text-left text-slate-900 font-extrabold text-[10px]">Rajasthan</td>
                {heatmapData.rajasthan.map((v, i) => (
                  <td key={i} className="p-1 text-white text-[9.5px]" style={{ backgroundColor: v >= 93 ? '#047857' : v >= 90 ? '#10b981' : '#34d399' }}>{v}%</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-1 text-left text-slate-900 font-extrabold text-[10px]">Uttar Pradesh</td>
                {heatmapData.up.map((v, i) => (
                  <td key={i} className="p-1 text-slate-800 text-[9.5px]" style={{ backgroundColor: v >= 90 ? '#a7f3d0' : v >= 85 ? '#d1fae5' : '#fef08a' }}>{v}%</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-1 text-left text-slate-900 font-extrabold text-[10px]">Maharashtra</td>
                {heatmapData.maharashtra.map((v, i) => (
                  <td key={i} className="p-1 text-white text-[9.5px]" style={{ backgroundColor: v >= 93 ? '#047857' : v >= 90 ? '#10b981' : '#34d399' }}>{v}%</td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-1 text-left text-slate-900 font-extrabold text-[10px]">Karnataka</td>
                {heatmapData.karnataka.map((v, i) => (
                  <td key={i} className="p-1 text-white text-[9.5px]" style={{ backgroundColor: v >= 93 ? '#047857' : v >= 90 ? '#10b981' : '#34d399' }}>{v}%</td>
                ))}
              </tr>
              <tr>
                <td className="p-1 text-left text-slate-900 font-extrabold text-[10px]">Madhya Pradesh</td>
                {heatmapData.mp.map((v, i) => (
                  <td key={i} className="p-1 text-slate-800 text-[9.5px]" style={{ backgroundColor: v >= 90 ? '#a7f3d0' : v >= 85 ? '#d1fae5' : '#fde047' }}>{v}%</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Training Type Distribution Donut */}
        <div className="xl:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2">Training Type Distribution</h3>
          </div>

          <div className="py-4 flex justify-center relative items-center">
            {/* SVG Donut */}
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#2563eb" strokeWidth="4" strokeDasharray={`${trainingTypeData.foundation.pct} ${100 - trainingTypeData.foundation.pct}`} strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray={`${trainingTypeData.refresher.pct} ${100 - trainingTypeData.refresher.pct}`} strokeDashoffset={`-${trainingTypeData.foundation.pct}`} />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray={`${trainingTypeData.leadership.pct} ${100 - trainingTypeData.leadership.pct}`} strokeDashoffset={`-${trainingTypeData.foundation.pct + trainingTypeData.refresher.pct}`} />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#a855f7" strokeWidth="4" strokeDasharray={`${trainingTypeData.specialized.pct} ${100 - trainingTypeData.specialized.pct}`} strokeDashoffset={`-${trainingTypeData.foundation.pct + trainingTypeData.refresher.pct + trainingTypeData.leadership.pct}`} />
            </svg>
            <div className="absolute text-center leading-none">
              <p className="text-[14px] font-black text-slate-855">{formatNum(kpiData.learners)}</p>
              <span className="text-[8px] text-slate-400 font-bold uppercase block mt-0.5">Total Learners</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[9.5px] font-extrabold">
            <div className="flex justify-between items-center"><span className="text-blue-600">● Foundation Training</span> <span>{trainingTypeData.foundation.pct}% ({formatNum(trainingTypeData.foundation.count)})</span></div>
            <div className="flex justify-between items-center"><span className="text-emerald-600">● Refresher Training</span> <span>{trainingTypeData.refresher.pct}% ({formatNum(trainingTypeData.refresher.count)})</span></div>
            <div className="flex justify-between items-center"><span className="text-amber-600">● Leadership Training</span> <span>{trainingTypeData.leadership.pct}% ({formatNum(trainingTypeData.leadership.count)})</span></div>
            <div className="flex justify-between items-center"><span className="text-purple-500">● Specialized Courses</span> <span>{trainingTypeData.specialized.pct}% ({formatNum(trainingTypeData.specialized.count)})</span></div>
          </div>
        </div>

        {/* Peer benchmarking ministry */}
        <div className="xl:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2">Peer Benchmarking (Ministry)</h3>
          </div>

          <table className="w-full text-left text-[11px] font-semibold text-slate-700 py-2">
            <thead>
              <tr className="text-slate-400 text-[8.5px] font-bold border-b uppercase">
                <th>Ministry</th>
                <th>Completion %</th>
                <th>Avg. Score</th>
                <th className="text-right">Rank</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {peerData.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2 font-extrabold text-slate-800">{p.name}</td>
                  <td className="py-2">{p.rate}%</td>
                  <td className="py-2 font-mono">{p.score}</td>
                  <td className="py-2 text-right">{p.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => showToast("Opening full benchmarks directory...", "info")} className="w-full text-center text-blue-650 hover:underline font-extrabold text-[10px] mt-2">
            View Full Benchmarking
          </button>
        </div>

        {/* Report Preview sidebar */}
        <div className="xl:col-span-2 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Report Preview</h3>
            
            <div className="grid grid-cols-2 gap-2 text-center text-slate-650 border-b pb-3 mb-3">
              <div className="bg-slate-50 p-1.5 rounded border">
                <p className="text-[8px] text-slate-400 font-bold uppercase">Conducted</p>
                <h4 className="font-black text-slate-800 text-[11px]">{previewStats.trainings}</h4>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border">
                <p className="text-[8px] text-slate-400 font-bold uppercase">Participants</p>
                <h4 className="font-black text-slate-800 text-[11px]">{previewStats.participants.toLocaleString()}</h4>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border">
                <p className="text-[8px] text-slate-400 font-bold uppercase">Comp. Rate</p>
                <h4 className="font-black text-slate-800 text-[11px]">{previewStats.completionRate}%</h4>
              </div>
              <div className="bg-slate-50 p-1.5 rounded border">
                <p className="text-[8px] text-slate-400 font-bold uppercase">Certifications</p>
                <h4 className="font-black text-slate-800 text-[11px]">{previewStats.certifications.toLocaleString()}</h4>
              </div>
            </div>

            {/* Top Dropouts bar chart */}
            <div className="space-y-2">
              <p className="text-[8.5px] text-[#08493d] font-black uppercase tracking-wide">Dropout Rate (Top 3)</p>
              
              <div className="space-y-1.5">
                <div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-600">
                    <span>Data Analysis</span>
                    <span>12.2%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                    <div className="bg-rose-550 h-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-600">
                    <span>Advanced Excel</span>
                    <span>11.3%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                    <div className="bg-rose-550 h-full" style={{ width: '56%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-600">
                    <span>Survey Methods</span>
                    <span>9.8%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded overflow-hidden">
                    <div className="bg-rose-550 h-full" style={{ width: '48%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-3 border-t mt-3 flex justify-between items-center text-[9px] font-bold text-slate-400">
            <span>Dropout Trend:</span>
            <span className="text-rose-600 font-extrabold">Mar 25: 8.2%</span>
          </div>
        </div>

      </div>

      {/* 6. Third Main Grid (Gender, cadre, Score, AI Insights) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Gender Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Gender Distribution</h3>
          
          <div className="py-2 flex justify-center relative items-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#3b82f6" strokeWidth="4.5" strokeDasharray={`${genderData.male} ${100 - genderData.male}`} strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#ec4899" strokeWidth="4.5" strokeDasharray={`${genderData.female} ${100 - genderData.female}`} strokeDashoffset={`-${genderData.male}`} />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#94a3b8" strokeWidth="4.5" strokeDasharray={`${genderData.other} ${100 - genderData.other}`} strokeDashoffset={`-${genderData.male + genderData.female}`} />
            </svg>
            <div className="absolute text-center leading-none">
              <span className="text-[10px] font-black text-slate-800">{formatNum(kpiData.learners)}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[9.5px] font-extrabold pt-3">
            <div className="flex justify-between items-center"><span className="text-blue-500">● Male</span> <span>{genderData.male}%</span></div>
            <div className="flex justify-between items-center"><span className="text-pink-500">● Female</span> <span>{genderData.female}%</span></div>
            <div className="flex justify-between items-center"><span className="text-slate-400">● Other</span> <span>{genderData.other}%</span></div>
          </div>
        </div>

        {/* Learner by cadre */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Learner Distribution by Cadre</h3>
          
          <div className="py-2 flex justify-center relative items-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#f1f5f9" strokeWidth="4.5" />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#2563eb" strokeWidth="4.5" strokeDasharray={`${cadreData.central} ${100 - cadreData.central}`} strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#10b981" strokeWidth="4.5" strokeDasharray={`${cadreData.state} ${100 - cadreData.state}`} strokeDashoffset={`-${cadreData.central}`} />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#f59e0b" strokeWidth="4.5" strokeDasharray={`${cadreData.research} ${100 - cadreData.research}`} strokeDashoffset={`-${cadreData.central + cadreData.state}`} />
              <circle cx="18" cy="18" r="15.91" fill="transparent" stroke="#64748b" strokeWidth="4.5" strokeDasharray={`${Number((100 - cadreData.central - cadreData.state - cadreData.research).toFixed(1))} ${Number((cadreData.central + cadreData.state + cadreData.research).toFixed(1))}`} strokeDashoffset={`-${cadreData.central + cadreData.state + cadreData.research}`} />
            </svg>
            <div className="absolute text-center leading-none">
              <span className="text-[10px] font-black text-slate-800">{formatNum(kpiData.learners)}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-[9.5px] font-extrabold pt-3">
            <div className="flex justify-between items-center"><span className="text-blue-650">● Central Stats Service</span> <span>{cadreData.central}%</span></div>
            <div className="flex justify-between items-center"><span className="text-emerald-600">● State Stats Service</span> <span>{cadreData.state}%</span></div>
            <div className="flex justify-between items-center"><span className="text-amber-500">● Research Service</span> <span>{cadreData.research}%</span></div>
          </div>
        </div>

        {/* Score distribution */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Assessment Score Distribution</h3>
          
          <div className="py-2 flex-grow flex items-end justify-between min-h-[100px] px-4">
            {/* Bar 0-20 */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-500">{scoreData.p1}%</span>
              <div className="w-6 bg-blue-400 rounded-t transition-all duration-300" style={{ height: `${scoreData.p1}%` }} />
              <span className="text-[8.5px] text-slate-400 font-bold uppercase">0-20</span>
            </div>
            {/* Bar 21-40 */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-500">{scoreData.p2}%</span>
              <div className="w-6 bg-blue-500 rounded-t transition-all duration-300" style={{ height: `${scoreData.p2}%` }} />
              <span className="text-[8.5px] text-slate-400 font-bold uppercase">21-40</span>
            </div>
            {/* Bar 41-60 */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-500">{scoreData.p3}%</span>
              <div className="w-6 bg-emerald-500 rounded-t transition-all duration-300" style={{ height: `${scoreData.p3}%` }} />
              <span className="text-[8.5px] text-slate-400 font-bold uppercase">41-60</span>
            </div>
            {/* Bar 61-80 */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-500">{scoreData.p4}%</span>
              <div className="w-6 bg-[#08493d] rounded-t transition-all duration-300" style={{ height: `${scoreData.p4}%` }} />
              <span className="text-[8.5px] text-slate-400 font-bold uppercase">61-80</span>
            </div>
            {/* Bar 81-100 */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[9px] font-bold text-slate-500">{scoreData.p5}%</span>
              <div className="w-6 bg-purple-500 rounded-t transition-all duration-300" style={{ height: `${scoreData.p5}%` }} />
              <span className="text-[8.5px] text-slate-400 font-bold uppercase">81-100</span>
            </div>
          </div>
        </div>

        {/* AI Insights box list */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">⚡ AI Insights</h3>
            
            <div className="space-y-3 text-[10px] font-medium text-slate-650">
              {aiInsights.map((insight, idx) => (
                <div key={idx} className={`flex gap-2 p-2 border rounded-lg ${
                  insight.type === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <span className="text-base leading-none">{insight.type === 'warning' ? '⚠️' : '💡'}</span>
                  <div>
                    <p className={`font-black ${insight.type === 'warning' ? 'text-amber-800' : 'text-blue-800'}`}>{insight.title}</p>
                    <p className="mt-0.5">{insight.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] font-bold text-slate-400 text-right pt-2">
            Generated by LMS Engine v2.1
          </div>
        </div>

      </div>

      {/* 7. Fourth Main Grid (Reporting engine, configurations, recent reports) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Automated schedule list */}
        <div className="xl:col-span-5 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Automated Reporting Engine</h3>
          </div>

          <table className="w-full text-left text-[11px] font-semibold text-slate-700">
            <thead>
              <tr className="text-slate-400 text-[8.5px] font-bold border-b uppercase">
                <th className="pb-1.5">Report Name</th>
                <th className="pb-1.5">Frequency</th>
                <th className="pb-1.5">Recipients</th>
                <th className="pb-1.5">Status</th>
                <th className="pb-1.5">Next Run</th>
                <th className="pb-1.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {scheduledReports.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="py-2 font-extrabold text-slate-800">{r.name}</td>
                  <td className="py-2">{r.freq}</td>
                  <td className="py-2 text-slate-500">{r.recipients}</td>
                  <td className="py-2"><span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[9px] font-bold">Active</span></td>
                  <td className="py-2 font-mono text-slate-500">{r.next}</td>
                  <td className="py-2 text-right">
                    <button 
                      onClick={() => handleDeleteSchedule(r.id)} 
                      className="text-rose-600 hover:text-rose-800 hover:underline font-bold text-[10px] cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pt-2 border-t mt-4 text-[9.5px] font-bold text-slate-400">
            Total active schedules: {scheduledReports.length}
          </div>
        </div>

        {/* Schedule settings form */}
        <div className="xl:col-span-3 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Schedule Configuration</h3>
          
          <form onSubmit={handleSaveSchedule} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Frequency:</label>
              <select value={schedFreq} onChange={e => setSchedFreq(e.target.value)} className="w-full border rounded px-2.5 py-1.5 bg-slate-50 font-bold">
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Report Format:</label>
              <select value={schedFormat} onChange={e => setSchedFormat(e.target.value)} className="w-full border rounded px-2.5 py-1.5 bg-slate-50 font-bold">
                <option value="PDF">PDF Only</option>
                <option value="Excel">Excel Only</option>
                <option value="PDF & Excel">PDF & Excel</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Email Recipients:</label>
              <input 
                type="text" 
                value={schedEmails}
                onChange={e => setSchedEmails(e.target.value)}
                placeholder="Comma separated emails"
                className="w-full border rounded px-2.5 py-1.5 bg-white font-semibold text-slate-800 placeholder-gray-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] text-slate-400 font-extrabold uppercase">Schedule Time:</label>
              <input 
                type="text" 
                value={schedTime}
                onChange={e => setSchedTime(e.target.value)}
                placeholder="e.g. 09:00 AM"
                className="w-full border rounded px-2.5 py-1.5 bg-white font-bold text-slate-800"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg shadow-md cursor-pointer"
            >
              Save Schedule configuration
            </button>
          </form>
        </div>

        {/* Recent generated reports list */}
        <div className="xl:col-span-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2 mb-3">Recent Reports</h3>
            
            <div className="space-y-3 text-[10.5px]">
              
              <div className="flex justify-between items-center border-b pb-2">
                <div className="space-y-0.5">
                  <p className="font-black text-slate-800">Monthly Report - May 2025</p>
                  <p className="text-[9px] text-slate-400">Generated on 31 May 2025 09:15 AM</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => showToast("Downloading Excel for Monthly Report...", "success")} className="px-2 py-0.5 border rounded bg-emerald-50 text-emerald-800 text-[8.5px] font-extrabold hover:bg-emerald-100 cursor-pointer">Excel</button>
                  <button onClick={() => showToast("Downloading PDF for Monthly Report...", "success")} className="px-2 py-0.5 border rounded bg-rose-50 text-rose-800 text-[8.5px] font-extrabold hover:bg-rose-100 cursor-pointer">PDF</button>
                </div>
              </div>

              <div className="flex justify-between items-center border-b pb-2">
                <div className="space-y-0.5">
                  <p className="font-black text-slate-800">Quarterly Report - Q4 (2024-25)</p>
                  <p className="text-[9px] text-slate-400">Generated on 30 Apr 2025 06:40 PM</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => showToast("Downloading Excel for Quarterly Report...", "success")} className="px-2 py-0.5 border rounded bg-emerald-50 text-emerald-800 text-[8.5px] font-extrabold hover:bg-emerald-100 cursor-pointer">Excel</button>
                  <button onClick={() => showToast("Downloading PDF for Quarterly Report...", "success")} className="px-2 py-0.5 border rounded bg-rose-50 text-rose-800 text-[8.5px] font-extrabold hover:bg-rose-100 cursor-pointer">PDF</button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="font-black text-slate-800">Annual Report - 2024-25</p>
                  <p className="text-[9px] text-slate-400">Generated on 15 Apr 2025 11:30 AM</p>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => showToast("Downloading Excel for Annual Report...", "success")} className="px-2 py-0.5 border rounded bg-emerald-50 text-emerald-800 text-[8.5px] font-extrabold hover:bg-emerald-100 cursor-pointer">Excel</button>
                  <button onClick={() => showToast("Downloading PDF for Annual Report...", "success")} className="px-2 py-0.5 border rounded bg-rose-50 text-rose-800 text-[8.5px] font-extrabold hover:bg-rose-100 cursor-pointer">PDF</button>
                </div>
              </div>

            </div>
          </div>

          <button onClick={() => showToast("Opening full archives directory...", "info")} className="w-full text-center text-blue-650 hover:underline font-extrabold text-[10px] mt-4">
            View All Generated Reports
          </button>
        </div>

      </div>

      {/* 8. Download Global Reports large buttons */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <h3 className="font-extrabold text-slate-800 text-[12.5px] uppercase tracking-wide border-b pb-2">Download Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {name:'National Dashboard Report',bg:'bg-emerald-600 hover:bg-emerald-700',icon:'📊'},
            {name:'Ministry Benchmark Report',bg:'bg-orange-500 hover:bg-orange-600',icon:'🏛️'},
            {name:'Training Impact Assessment Report',bg:'bg-blue-600 hover:bg-blue-700',icon:'📋'},
            {name:'Course Completion Heatmap Report',bg:'bg-amber-500 hover:bg-amber-600',icon:'🗺️'}
          ].map((r,i) => (
            <button key={i} onClick={() => showToast(`Downloading ${r.name}...`, 'success')} className={`w-full py-3 ${r.bg} text-white rounded-xl shadow-sm font-black tracking-wide text-[10.5px] flex items-center justify-between px-4 cursor-pointer transition-colors`}>
              <span className="flex items-center gap-2">{r.icon} {r.name}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
          ))}
        </div>
      </div>

      {/* Floating Toast Notification Center */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
        {toasts.map(t => (
          <div key={t.id} className={`p-3.5 rounded-xl shadow-lg border text-white font-extrabold text-[11px] flex items-center gap-2 pointer-events-auto animate-slide-up ${
            t.type === 'success' ? 'bg-emerald-600 border-emerald-500' : 'bg-blue-600 border-blue-500'
          }`}>
            <span>{t.type === 'success' ? '✓' : 'ℹ'}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
