import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Head from './head_foot/head'
import Foot from './head_foot/foot'
import Home from './project/home'
import Login from './project/login'
import UserManagement from './project/user_management'
import CourseRegistration from './project/course_registration'
import TraineeLayout from './user_trainee/TraineeLayout'
import TraineeDashboard from './user_trainee/TraineeDashboard'
import MyCourses from './user_trainee/MyCourses'
import Assessments from './user_trainee/Assessments'
import Assignments from './user_trainee/Assignments'
import Attendance from './user_trainee/Attendance'
import Certificates from './user_trainee/Certificates'
import Feedback from './user_trainee/Feedback'
import TraineeProfile from './user_trainee/TraineeProfile'
import Notifications from './user_trainee/Notifications'
import TrainingCalendar from './user_trainee/TrainingCalendar'
import KnowledgeRepository from './user_trainee/KnowledgeRepository'
import DiscussionForum from './user_trainee/DiscussionForum'
import Events from './user_trainee/Events'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Head />
        <main className="w-full flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/course-registration" element={<CourseRegistration />} />
            {/* Trainee Portal Routes */}
            <Route path="/trainee" element={<TraineeLayout />}>
              <Route path="dashboard" element={<TraineeDashboard />} />
              <Route path="courses" element={<MyCourses />} />
              <Route path="calendar" element={<TrainingCalendar />} />
              <Route path="assessments" element={<Assessments />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="repository" element={<KnowledgeRepository />} />
              <Route path="forum" element={<DiscussionForum />} />
              <Route path="events" element={<Events />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="profile" element={<TraineeProfile />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
            <Route path="/contact" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Contact Page</div>} />
            <Route path="/documents" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Documents Page</div>} />
            <Route path="/trainings" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Trainings Page</div>} />
            <Route path="/announcements" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Announcements Page</div>} />
            <Route path="/about/overview" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Overview Page</div>} />
            <Route path="/about/mission" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Mission & Vision Page</div>} />
            <Route path="/about/administration" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Administration Page</div>} />
            <Route path="/courses" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Courses Page</div>} />
            <Route path="/analytics" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Analytics Page</div>} />
            <Route path="/settings" element={<div className="text-lg font-medium text-slate-800 p-6 bg-white m-6 rounded-lg border border-gray-250 shadow-2xs">Settings Page</div>} />
          </Routes>
        </main>
        <Foot />
      </div>
    </Router>
  )
}

export default App
