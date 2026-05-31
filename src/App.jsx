import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import Head from './head_foot/head'
import Foot from './head_foot/foot'
import Home from './project/public/home'
import Login from './project/public/login'
import UserManagement from './project/user_management'
import CourseRegistration from './project/course_registration'
import EHostel from './project/admin/e-hostel/e-hostel_home'
import KmsHome from './project/admin/Kms/kms_home'
import ReportAnalyticsDashboard from './project/admin/report analytics/ReportAnalyticsDashboard'

// Import Navbar components
import Contact from './project/nav_bar/contact'
import Documents from './project/nav_bar/documents'
import Trainings from './project/nav_bar/trainings'
import Announcements from './project/nav_bar/announcements'
import Overview from './project/nav_bar/overview'
import Mission from './project/nav_bar/mission'
import Administration from './project/nav_bar/administration'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {!isAdminRoute && <Head />}
      <main className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/e-hostel" element={<EHostel />} />
          <Route path="/admin/kms" element={<KmsHome />} />
          <Route path="/admin/reports" element={<ReportAnalyticsDashboard />} />
          <Route path="/course-registration" element={<CourseRegistration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/trainings" element={<Trainings />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/about/overview" element={<Overview />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/administration" element={<Administration />} />
          <Route path="/courses" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Courses Page</div>} />
          <Route path="/analytics" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Analytics Page</div>} />
          <Route path="/settings" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Settings Page</div>} />
        </Routes>
      </main>
      {!isAdminRoute && <Foot />}
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
