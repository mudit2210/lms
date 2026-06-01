import React, { useState } from 'react';
import { t } from '../locales';

const COMPLETED_COURSES = [
  { id: 'cert-1', title: 'Refresher Course on Advanced Statistics & Official Data Auditing', issueDate: 'May 12, 2026', authority: 'LMS Central Training Institute', verifyHash: 'MOSPI-ISS-2026-X83A7', grade: 'Outstanding (A)', type: 'Course' },
  { id: 'cert-2', title: 'Data Analysis with R & Programming Frameworks', issueDate: 'April 22, 2026', authority: 'LMS Central Training Institute', verifyHash: 'MOSPI-ISS-2026-Y12B4', grade: 'Very Good (A-)', type: 'Course' },
  { id: 'cert-3', title: 'Python Application in Macroeconomic Data', issueDate: 'March 15, 2026', authority: 'LMS Academic Senate', verifyHash: 'MOSPI-ISS-2026-P93Q2', grade: 'Outstanding (A)', type: 'Course' },
];

const COMPLETED_TRAININGS = [
  { id: 'cert-4', title: '46th ISS Probationary Induction Training (Phase 1)', issueDate: 'May 28, 2026', authority: 'Central Training Division, MoSPI', verifyHash: 'MOSPI-TRN-46-A92K7', grade: 'Pass (Excellent)', type: 'Training' },
  { id: 'cert-5', title: 'National Accounts Methodology Workshop', issueDate: 'April 10, 2026', authority: 'Central Statistics Office (CSO)', verifyHash: 'MOSPI-TRN-46-M38B2', grade: 'Pass (Very Good)', type: 'Training' },
];

export default function MyCertificates({ lang = 'en' }) {
  const [downloadingId, setDownloadingId] = useState(null);
  const [viewingCertId, setViewingCertId] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');

  const triggerDownload = (certId, title) => {
    setDownloadingId(certId);
    setTimeout(() => {
      setDownloadingId(null);
      
      const successMsg = lang === 'hi'
        ? `प्रमाणपत्र सफलतापूर्वक डाउनलोड किया गया: "${lang === 'hi' ? translateTitle(title) : title}"`
        : `Downloaded certificate: "${title}" PDF document successfully!`;
      setDownloadSuccess(successMsg);
      setTimeout(() => setDownloadSuccess(''), 3500);
    }, 1800);
  };

  const translateTitle = (title) => {
    if (lang !== 'hi') return title;
    if (title.includes('Refresher Course')) return 'उन्नत सांख्यिकी और आधिकारिक डेटा ऑडिटिंग पर रिफ्रेशर कोर्स';
    if (title.includes('Data Analysis with R')) return 'आर और प्रोग्रामिंग फ्रेमवर्क के साथ डेटा विश्लेषण';
    if (title.includes('Python Application')) return 'मैक्रोइकॉनॉमिक डेटा में पायथन अनुप्रयोग';
    if (title.includes('46th ISS')) return '46वीं आईएसएस परिवीक्षाधीन प्रेरण प्रशिक्षण (चरण 1)';
    if (title.includes('National Accounts')) return 'राष्ट्रीय लेखा पद्धति कार्यशाला';
    return title;
  };

  const translateAuth = (auth) => {
    if (lang !== 'hi') return auth;
    if (auth.includes('Central Training Institute')) return 'एलएमएस केंद्रीय प्रशिक्षण संस्थान';
    if (auth.includes('Academic Senate')) return 'एलएमएस शैक्षणिक सीनेट';
    if (auth.includes('Central Training Division')) return 'केंद्रीय प्रशिक्षण प्रभाग, एमओएसपीआई';
    if (auth.includes('Central Statistics Office')) return 'केंद्रीय सांख्यिकी कार्यालय (सीएसओ)';
    return auth;
  };

  const translateGrade = (grade) => {
    if (lang !== 'hi') return grade;
    if (grade.includes('Outstanding')) return 'उत्कृष्ट (ए)';
    if (grade.includes('Very Good')) return 'बहुत अच्छा (ए-)';
    if (grade.includes('Pass (Excellent)')) return 'उत्तीर्ण (उत्कृष्ट)';
    if (grade.includes('Pass (Very Good)')) return 'उत्तीर्ण (बहुत अच्छा)';
    return grade;
  };

  const renderCertDrawer = (cert) => {
    return (
      <div 
        style={{
          marginTop: '16px',
          padding: '24px',
          background: '#f8fafc',
          border: '2px solid #a7f3d0',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: 'inset 0 2px 8px rgba(5,150,105,0.03)',
          position: 'relative',
          maxWidth: '800px',
          margin: '16px auto 0'
        }}
        className="animate-scaleUp"
      >
        {/* Certificate Border Frame */}
        <div style={{
          border: '4px double #059669',
          padding: '24px',
          background: '#ffffff',
          borderRadius: '12px',
          position: 'relative'
        }}>
          {/* Top Branding Emblem */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Emblem of India" 
            style={{ height: '42px', margin: '0 auto 10px', display: 'block' }}
          />
          <h5 style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px' }}>{t('government_of_india', lang)}</h5>
          <h6 style={{ fontSize: '9px', fontWeight: 750, color: '#8b2635', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px' }}>{t('ministry_name', lang)}</h6>

          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#064e3b', margin: '0 0 10px' }}>{t('achievement_title', lang)}</h3>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>{t('certify_sub', lang)}</p>

          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: '#1e293b', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', maxWidth: '320px', margin: '0 auto 16px' }}>
            {lang === 'hi' ? 'परिवीक्षाधीन अधिकारी' : 'Trainee Officer User'}
          </h2>

          <p style={{ fontSize: '11.5px', color: '#475569', lineHeight: 1.6, maxWidth: '480px', margin: '0 auto 20px' }}>
            {lang === 'hi' ? (
              <>
                ने अधिगम प्रबंधन प्रणाली विभाग द्वारा आयोजित शीर्षक वाले आधिकारिक सांख्यिकीय कार्यक्रम <br />
                <strong style={{ color: '#064e3b', fontSize: '12px' }}>"{translateTitle(cert.title)}"</strong> <br />
                को सफलतापूर्वक पूरा कर लिया है, जिसमें प्राप्त ग्रेड <strong style={{ color: '#059669' }}>{translateGrade(cert.grade)}</strong> है।
              </>
            ) : (
              <>
                has successfully completed the official statistical program titled <br />
                <strong style={{ color: '#064e3b', fontSize: '12px' }}>"{cert.title}"</strong> <br />
                conducted by the learning management system division, achieving an evaluation grade of <strong style={{ color: '#059669' }}>{cert.grade}</strong>.
              </>
            )}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', padding: '0 20px' }}>
            <div style={{ textAlign: 'left', fontSize: '10px', color: '#64748b' }}>
              <div>{lang === 'hi' ? 'जारी तिथि' : 'Date of Issue'}: <strong style={{ color: '#475569' }}>{lang === 'hi' ? cert.issueDate.replace('May', 'मई').replace('April', 'अप्रैल').replace('March', 'मार्च') : cert.issueDate}</strong></div>
              <div style={{ marginTop: '2px' }}>{lang === 'hi' ? 'सत्यापन कोड' : 'Verify ID'}: {cert.verifyHash}</div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ borderBottom: '1px solid #cbd5e1', width: '100px', margin: '0 0 4px auto' }} />
              <div style={{ fontSize: '9px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{t('director_academic', lang)}</div>
              <div style={{ fontSize: '8px', color: '#94a3b8' }}>{t('mospi_central', lang)}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCertCard = (cert) => {
    const isViewing = viewingCertId === cert.id;
    return (
      <div
        key={cert.id}
        style={{
          border: '1px solid #eef2f1',
          borderRadius: '24px',
          padding: '20px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 24px -8px rgba(8, 73, 61, 0.04)',
          transition: 'all 0.25s ease'
        }}
        className="certificate-card"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{
              width: '54px', height: '54px', borderRadius: '14px',
              background: '#ecfdf5', border: '1px solid #a7f3d0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#059669', flexShrink: 0
            }}>
              <svg style={{ width: '24px', height: '24px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138z" />
              </svg>
            </div>
            <div>
              <span style={{ fontSize: '8.5px', fontWeight: 900, background: '#f1f5f9', color: '#64748b', padding: '3px 8px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t('official_credential', lang)}</span>
              <h4 style={{ fontSize: '13px', fontWeight: 900, color: '#064e3b', margin: '4px 0 2px', lineHeight: 1.3 }}>{translateTitle(cert.title)}</h4>
              <p style={{ fontSize: '10.5px', color: '#64748b', margin: 0 }}>{lang === 'hi' ? 'ग्रेड' : 'Grade'}: <strong style={{ color: '#059669' }}>{translateGrade(cert.grade)}</strong></p>
            </div>
          </div>

          <div style={{ textAlign: 'right', fontSize: '10.5px', color: '#64748b', fontWeight: 650 }}>
            <div>{lang === 'hi' ? 'जारी' : 'Issued'}: <strong style={{ color: '#475569' }}>{lang === 'hi' ? cert.issueDate.replace('May', 'मई').replace('April', 'अप्रैल').replace('March', 'मार्च') : cert.issueDate}</strong></div>
            <div style={{ marginTop: '2px', fontSize: '9px' }}>{translateAuth(cert.authority)}</div>
          </div>
        </div>

        {/* Validation / Action Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '14px',
          borderTop: '1px solid #f8faf9',
          marginTop: '14px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 600 }}>
            {lang === 'hi' ? 'सत्यापन हैश' : 'Hash'}: <span style={{ color: '#64748b', fontFamily: 'monospace', fontWeight: 750, background: '#f8fafc', padding: '2px 8px', borderRadius: '6px', border: '1px solid #eef2f1' }}>{cert.verifyHash}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setViewingCertId(isViewing ? null : cert.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#475569',
                transition: 'all 0.2s'
              }}
            >
              {isViewing ? t('hide_cert', lang) : `👁 ${t('view_ecert', lang)}`}
            </button>

            <button
              onClick={() => triggerDownload(cert.id, cert.title)}
              disabled={downloadingId === cert.id}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                cursor: downloadingId === cert.id ? 'default' : 'pointer',
                border: 'none',
                background: downloadingId === cert.id ? '#eef2f1' : 'linear-gradient(135deg, #10b981, #059669)',
                color: downloadingId === cert.id ? '#64748b' : 'white',
                boxShadow: downloadingId === cert.id ? 'none' : '0 4px 10px rgba(5,150,105,0.15)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {downloadingId === cert.id ? (
                <>{t('generating', lang)}</>
              ) : (
                <>💾 {t('download_pdf', lang)}</>
              )}
            </button>
          </div>
        </div>

        {isViewing && renderCertDrawer(cert)}
      </div>
    );
  };

  // Filter lists based on query
  const filteredCourses = COMPLETED_COURSES.filter(cert =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.verifyHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.authority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrainings = COMPLETED_TRAININGS.filter(cert =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.verifyHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.authority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const combinedCerts = [...filteredCourses, ...filteredTrainings];

  return (
    <div className="trainee-page-inner animate-fadeIn">
      {downloadSuccess && (
        <div style={{
          background: '#059669',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '14px',
          fontSize: '12px',
          fontWeight: 700,
          marginBottom: '16px',
          boxShadow: '0 10px 20px -8px rgba(5,150,105,0.4)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }} className="animate-scaleUp">
          <span>🎉 {downloadSuccess}</span>
          <button style={{ background: 'none', border: 'none', color: 'white', fontWeight: 900, cursor: 'pointer' }} onClick={() => setDownloadSuccess('')}>×</button>
        </div>
      )}

      {/* Control bar: Search & View Switcher */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px',
        background: '#ffffff',
        padding: '16px 24px',
        borderRadius: '24px',
        border: '1px solid #eef2f1',
        boxShadow: '0 8px 24px -10px rgba(8,73,61,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              type="text"
              placeholder={t('search_placeholder', lang)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 16px 11px 38px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                fontSize: '12px',
                outline: 'none',
                transition: 'all 0.2s',
                background: '#f8fafc',
                fontWeight: 600,
                color: '#334155'
              }}
            />
            <svg style={{ position: 'absolute', left: '14px', top: '13px', width: '15px', height: '15px', color: '#94a3b8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              border: 'none',
              background: viewMode === 'grid' ? '#ffffff' : 'transparent',
              color: viewMode === 'grid' ? '#0f172a' : '#64748b',
              boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <svg style={{ width: '13px', height: '13px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {t('grid_view', lang)}
          </button>
          
          <button
            onClick={() => setViewMode('list')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '9px',
              fontSize: '11.5px',
              fontWeight: 800,
              cursor: 'pointer',
              border: 'none',
              background: viewMode === 'list' ? '#ffffff' : 'transparent',
              color: viewMode === 'list' ? '#0f172a' : '#64748b',
              boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <svg style={{ width: '13px', height: '13px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {t('list_view', lang)}
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <>
          {/* 1. COMPLETED COURSES SECTION */}
          <div className="trainee-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>{t('completed_courses_title', lang)}</h3>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>{t('completed_courses_sub', lang)}</p>
            
            {filteredCourses.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredCourses.map(cert => renderCertCard(cert))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8', fontSize: '12px' }}>
                {lang === 'hi' ? 'आपकी खोज से मेल खाने वाला कोई प्रमाणपत्र नहीं मिला।' : 'No completed courses match your search criteria.'}
              </div>
            )}
          </div>

          {/* 2. COMPLETED TRAININGS SECTION */}
          <div className="trainee-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>{t('completed_trainings_title', lang)}</h3>
            <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>{t('completed_trainings_sub', lang)}</p>
            
            {filteredTrainings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredTrainings.map(cert => renderCertCard(cert))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8', fontSize: '12px' }}>
                {lang === 'hi' ? 'आपकी खोज से मेल खाने वाला कोई प्रशिक्षण प्रमाणपत्र नहीं मिला।' : 'No completed training programs match your search criteria.'}
              </div>
            )}
          </div>
        </>
      ) : (
        /* TABLE LIST VIEW */
        <div className="trainee-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#064e3b', margin: '0 0 4px' }}>{t('cert_ledger_title', lang)}</h3>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 20px' }}>{t('cert_ledger_sub', lang)}</p>

          {combinedCerts.length > 0 ? (
            <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #eef2f1' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>{t('cert_title_auth', lang)}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>{t('category', lang)}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>{t('grade_achieved', lang)}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>{t('issue_date', lang)}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800 }}>{t('ecert_check', lang)}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 800, textAlign: 'right' }}>{t('actions', lang)}</th>
                  </tr>
                </thead>
                <tbody>
                  {combinedCerts.map(cert => {
                    const isViewing = viewingCertId === cert.id;
                    return (
                      <React.Fragment key={cert.id}>
                        <tr 
                          style={{ 
                            borderBottom: '1px solid #f1f5f9', 
                            background: isViewing ? '#f0fdf4' : '#ffffff',
                            transition: 'all 0.2s',
                            cursor: 'pointer'
                          }}
                          onClick={() => setViewingCertId(isViewing ? null : cert.id)}
                          className="cert-list-row"
                        >
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '12.5px' }}>{translateTitle(cert.title)}</div>
                            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{translateAuth(cert.authority)}</div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{ 
                              padding: '4px 10px', 
                              borderRadius: '100px', 
                              fontSize: '10px', 
                              fontWeight: 800,
                              background: cert.type === 'Training' ? '#eff6ff' : '#ecfdf5',
                              color: cert.type === 'Training' ? '#2563eb' : '#059669',
                              border: cert.type === 'Training' ? '1px solid #bfdbfe' : '1px solid #a7f3d0'
                            }}>
                              {lang === 'hi' && cert.type === 'Course' ? 'पाठ्यक्रम' : lang === 'hi' && cert.type === 'Training' ? 'प्रशिक्षण' : cert.type}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', fontWeight: 750, color: '#334155' }}>
                            {translateGrade(cert.grade)}
                          </td>
                          <td style={{ padding: '16px 20px', color: '#64748b', fontWeight: 500 }}>
                            {lang === 'hi' ? cert.issueDate.replace('May', 'मई').replace('April', 'अप्रैल').replace('March', 'मार्च') : cert.issueDate}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setViewingCertId(isViewing ? null : cert.id);
                              }}
                              style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '5px',
                                padding: '5px 10px', 
                                borderRadius: '8px', 
                                fontSize: '10.5px', 
                                fontWeight: 800,
                                background: '#ecfdf5',
                                color: '#047857',
                                border: '1px solid #a7f3d0',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              className="ecert-check-btn"
                            >
                              <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: '#10b981',
                                display: 'inline-block'
                              }} />
                              ✓ {t('verified_check', lang)}
                            </button>
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => setViewingCertId(isViewing ? null : cert.id)}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  cursor: 'pointer',
                                  border: '1px solid #cbd5e1',
                                  background: '#ffffff',
                                  color: '#475569',
                                  transition: 'all 0.2s'
                                }}
                              >
                                {isViewing ? t('hide_cert', lang) : t('view_ecert', lang)}
                              </button>
                              <button
                                onClick={() => triggerDownload(cert.id, cert.title)}
                                disabled={downloadingId === cert.id}
                                style={{
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  fontSize: '11px',
                                  fontWeight: 800,
                                  cursor: downloadingId === cert.id ? 'default' : 'pointer',
                                  border: 'none',
                                  background: downloadingId === cert.id ? '#eef2f1' : 'linear-gradient(135deg, #10b981, #059669)',
                                  color: downloadingId === cert.id ? '#64748b' : 'white',
                                  transition: 'all 0.2s'
                                }}
                              >
                                {downloadingId === cert.id ? '⏳' : `💾 ${t('download_pdf', lang)}`}
                              </button>
                            </div>
                          </td>
                        </tr>
                        {isViewing && (
                          <tr style={{ background: '#f8fafc' }}>
                            <td colSpan="6" style={{ padding: '24px', borderBottom: '1px solid #eef2f1' }} onClick={(e) => e.stopPropagation()}>
                              {renderCertDrawer(cert)}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', color: '#94a3b8', fontSize: '13px' }}>
              {lang === 'hi' ? 'बही में आपकी खोज से मेल खाने वाला कोई प्रमाणपत्र नहीं मिला।' : 'No completed certificates match your search query in the ledger.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
