import React, { useState, useEffect } from 'react';
import './trainee_dashboard.css';
import { useNavigate } from 'react-router-dom';
import Head from '../head_foot/head';
import TraineeSidebar from './components/TraineeSidebar';
import TraineeHome from './components/TraineeHome';
import MyCourses from './components/MyCourses';
import MySchedule from './components/MySchedule';
import MyAssignments from './components/MyAssignments';
import MyAttendance from './components/MyAttendance';
import MyHostel from './components/MyHostel';
import MyGrades from './components/MyGrades';
import TraineeProfile from './components/TraineeProfile';
import CalendarView from './components/CalendarView';
import GroupJoin from './components/GroupJoin';
import Classroom from './components/Classroom';
import NewCoursesList from './components/NewCoursesList';
import MyCertificates from './components/MyCertificates';
import MyTrainings from './components/MyTrainings';
import ScheduledEvents from './components/ScheduledEvents';

const getTabDisplayName = (tab, lang) => {
  const titles = {
    home: { en: 'Home Portal', hi: 'मुख्य पोर्टल' },
    courses: { en: 'My Courses Workspace', hi: 'मेरे पाठ्यक्रम कार्यक्षेत्र' },
    trainings: { en: 'My Training Tracks', hi: 'मेरे प्रशिक्षण ट्रैक' },
    newcourses: { en: 'Self Enrollment Portal', hi: 'स्व-नामांकन पोर्टल' },
    schedule: { en: 'My Schedule Calendar', hi: 'मेरी अनुसूची कैलेंडर' },
    eventscheduled: { en: 'Scheduled Expert Events', hi: 'अनुसूचित विशेषज्ञ कार्यक्रम' },
    calendar: { en: 'Event Calendar View', hi: 'कैलेंडर दृश्य' },
    classroom: { en: 'Virtual Classroom Portal', hi: 'आभासी कक्षा पोर्टल' },
    group: { en: 'Study Circle & Peer Groups', hi: 'अध्ययन समूह और सहकर्मी समूह' },
    assignments: { en: 'Assignments Dashboard', hi: 'असाइनमेंट डैशबोर्ड' },
    attendance: { en: 'My Attendance Ledger', hi: 'मेरी उपस्थिति बही' },
    certificates: { en: 'My Training Certificates', hi: 'मेरे प्रशिक्षण प्रमाणपत्र' },
    hostel: { en: 'e-Hostel Facilities', hi: 'ई-हॉस्टल सुविधाएं' },
    grades: { en: 'My Grades & Academic Results', hi: 'मेरे ग्रेड और शैक्षणिक परिणाम' },
    profile: { en: 'My Account Settings', hi: 'मेरे खाता सेटिंग्स' },
  };
  return titles[tab]?.[lang] || titles[tab]?.en || 'Officer Workspace';
};

export default function TraineeDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('trainee_lang') || 'en';
  });

  const handleLangToggle = (newLang) => {
    setLang(newLang);
    localStorage.setItem('trainee_lang', newLang);
    window.dispatchEvent(new Event('lang-change'));
  };

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Listen to global auth updates (e.g. from global header)
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

  useEffect(() => {
    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':        return <TraineeHome user={user} setActiveTab={setActiveTab} lang={lang} />;
      case 'courses':     return <MyCourses lang={lang} />;
      case 'trainings':   return <MyTrainings lang={lang} />;
      case 'newcourses':  return <NewCoursesList lang={lang} />;
      case 'schedule':    return <MySchedule lang={lang} />;
      case 'eventscheduled': return <ScheduledEvents lang={lang} />;
      case 'calendar':    return <CalendarView lang={lang} />;
      case 'classroom':   return <Classroom lang={lang} />;
      case 'group':       return <GroupJoin lang={lang} />;
      case 'assignments': return <MyAssignments lang={lang} />;
      case 'attendance':  return <MyAttendance lang={lang} />;
      case 'certificates': return <MyCertificates lang={lang} />;
      case 'hostel':      return <MyHostel user={user} lang={lang} />;
      case 'grades':      return <MyGrades lang={lang} />;
      case 'profile':     return <TraineeProfile user={user} lang={lang} />;
      default:            return <TraineeHome user={user} setActiveTab={setActiveTab} lang={lang} />;
    }
  };

  if (!user) return null;

  return (
    <div className="trainee-portal-wrapper">
      {/* 1. Global MoSPI Landing Page Header */}
      <Head />

      {/* 2. Main Dashboard Layout Area */}
      <div className="trainee-dashboard-root">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="trainee-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <TraineeSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={user}
          handleLogout={handleLogout}
          lang={lang}
        />

        {/* Main Content Pane */}
        <div className="trainee-main">
          {/* Sub-bar for dashboard-specific navigation controls & page details */}
          <div className="trainee-control-bar">
            <button
              className="trainee-hamburger"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="trainee-control-title">
              <h2>{getTabDisplayName(activeTab, lang)}</h2>
              <p>{lang === 'hi' ? '46वां आईएसएस बैच अधिकारी पोर्टल' : '46th ISS Batch Officer Portal'}</p>
            </div>

            <div style={{ flex: 1 }} />

            {/* Bilingual Switcher Widget */}
            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '3px', borderRadius: '10px', marginRight: '8px' }}>
              <button
                onClick={() => handleLangToggle('en')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  background: lang === 'en' ? '#059669' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : '#64748b',
                  boxShadow: lang === 'en' ? '0 2px 6px rgba(5,150,105,0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                EN
              </button>
              <button
                onClick={() => handleLangToggle('hi')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '7px',
                  fontSize: '11px',
                  fontWeight: 900,
                  border: 'none',
                  cursor: 'pointer',
                  background: lang === 'hi' ? '#059669' : 'transparent',
                  color: lang === 'hi' ? '#ffffff' : '#64748b',
                  boxShadow: lang === 'hi' ? '0 2px 6px rgba(5,150,105,0.2)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <main className="trainee-content">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}
