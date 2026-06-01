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

const TAB_DISPLAY_NAMES = {
  home: 'Home Portal',
  courses: 'My Courses Workspace',
  trainings: 'My Training Tracks',
  newcourses: 'Self Enrollment Portal',
  schedule: 'My Schedule Calendar',
  eventscheduled: 'Scheduled Expert Events',
  calendar: 'Event Calendar View',
  classroom: 'Virtual Classroom Portal',
  group: 'Study Circle & Peer Groups',
  assignments: 'Assignments Dashboard',
  attendance: 'My Attendance Ledger',
  certificates: 'My Training Certificates',
  hostel: 'e-Hostel Facilities',
  grades: 'My Grades & Academic Results',
  profile: 'My Account Settings',
};

export default function TraineeDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

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
      case 'home':        return <TraineeHome user={user} setActiveTab={setActiveTab} />;
      case 'courses':     return <MyCourses />;
      case 'trainings':   return <MyTrainings />;
      case 'newcourses':  return <NewCoursesList />;
      case 'schedule':    return <MySchedule />;
      case 'eventscheduled': return <ScheduledEvents />;
      case 'calendar':    return <CalendarView />;
      case 'classroom':   return <Classroom />;
      case 'group':       return <GroupJoin />;
      case 'assignments': return <MyAssignments />;
      case 'attendance':  return <MyAttendance />;
      case 'certificates': return <MyCertificates />;
      case 'hostel':      return <MyHostel user={user} />;
      case 'grades':      return <MyGrades />;
      case 'profile':     return <TraineeProfile user={user} />;
      default:            return <TraineeHome user={user} setActiveTab={setActiveTab} />;
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
              <h2>{TAB_DISPLAY_NAMES[activeTab] || 'Officer Workspace'}</h2>
              <p>46th ISS Batch Officer Portal</p>
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

