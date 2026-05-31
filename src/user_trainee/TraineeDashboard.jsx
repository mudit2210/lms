import React, { useState, useEffect, useRef } from 'react';

import MyCourses from './MyCourses';
import AssignmentsAndExams from './AssignmentsAndExams';
import Certificates from './Certificates';
import Feedback from './Feedback';
import Notifications from './Notifications';
import TrainingCalendar from './TrainingCalendar';
import KnowledgeRepository from './KnowledgeRepository';
import DiscussionForum from './DiscussionForum';
import Events from './Events';
import Hostel from './Hostel';

const modules = [
  { id: 'courses', label: 'Courses', color: 'text-cyan-600', component: MyCourses },
  { id: 'assignments', label: 'Assignments & Exams', color: 'text-blue-600', component: AssignmentsAndExams },
  { id: 'calendar', label: 'Calendar', color: 'text-blue-700', component: TrainingCalendar },
  { id: 'events', label: 'Events', color: 'text-rose-500', component: Events },
  { id: 'repository', label: 'Repository', color: 'text-teal-600', component: KnowledgeRepository },
  { id: 'certificates', label: 'Certificates', color: 'text-orange-500', component: Certificates },
  { id: 'forum', label: 'Forum', color: 'text-indigo-500', component: DiscussionForum },
  { id: 'hostel', label: 'Hostel', color: 'text-pink-600', component: Hostel },
  { id: 'feedback', label: 'Feedback', color: 'text-yellow-600', component: Feedback },
  { id: 'notifications', label: 'Notifications', color: 'text-orange-600', component: Notifications },
];

// SVG icons for each module — clean, professional look
const moduleIcons = {
  courses: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M8 14l16-6 16 6-16 6z" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5"/>
      <path d="M12 16v12c0 4 5.5 7 12 7s12-3 12-7V16" stroke="#0891b2" strokeWidth="1.5" fill="none"/>
      <line x1="40" y1="14" x2="40" y2="34" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="40" cy="34" r="2" fill="#0891b2"/>
    </svg>
  ),
  assignments: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="6" width="28" height="36" rx="4" fill="#dbeafe"/>
      <rect x="10" y="6" width="28" height="36" rx="4" stroke="#3b82f6" strokeWidth="1.5"/>
      <line x1="17" y1="16" x2="31" y2="16" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="17" y1="22" x2="31" y2="22" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
      <line x1="17" y1="28" x2="26" y2="28" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M17 34l3 3 6-6" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  calendar: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="12" width="32" height="28" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5"/>
      <rect x="8" y="12" width="32" height="8" rx="4" fill="#0284c7"/>
      <line x1="16" y1="8" x2="16" y2="14" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="32" y1="8" x2="32" y2="14" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="14" y="26" width="4" height="4" rx="1" fill="#0284c7"/>
      <rect x="22" y="26" width="4" height="4" rx="1" fill="#7dd3fc"/>
      <rect x="30" y="26" width="4" height="4" rx="1" fill="#7dd3fc"/>
      <rect x="14" y="33" width="4" height="4" rx="1" fill="#7dd3fc"/>
    </svg>
  ),
  events: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="16" fill="#ffe4e6"/>
      <circle cx="24" cy="24" r="6" fill="#f43f5e"/>
      <circle cx="24" cy="24" r="2" fill="#fff"/>
      <path d="M24 8v4M24 36v4M8 24h4M36 24h4" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  repository: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="14" width="14" height="24" rx="2" fill="#99f6e4" stroke="#0d9488" strokeWidth="1"/>
      <rect x="22" y="10" width="14" height="28" rx="2" fill="#5eead4" stroke="#0d9488" strokeWidth="1"/>
      <rect x="28" y="14" width="14" height="24" rx="2" fill="#2dd4bf" stroke="#0d9488" strokeWidth="1" transform="rotate(8 35 26)"/>
    </svg>
  ),
  certificates: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="20" r="12" fill="#fed7aa"/>
      <circle cx="24" cy="20" r="7" fill="#f97316" opacity="0.3"/>
      <path d="M24 14l2 4 4.5.5-3.2 3.2.8 4.3-4.1-2.2-4.1 2.2.8-4.3-3.2-3.2 4.5-.5z" fill="#ea580c"/>
      <path d="M20 30l-2 10 6-3 6 3-2-10" stroke="#ea580c" strokeWidth="1.5" fill="#fed7aa"/>
    </svg>
  ),
  forum: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="10" width="26" height="18" rx="4" fill="#e0e7ff"/>
      <rect x="16" y="20" width="26" height="18" rx="4" fill="#c7d2fe" stroke="#6366f1" strokeWidth="1"/>
      <circle cx="23" cy="29" r="2" fill="#6366f1"/>
      <circle cx="29" cy="29" r="2" fill="#6366f1"/>
      <circle cx="35" cy="29" r="2" fill="#6366f1"/>
    </svg>
  ),
  feedback: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M24 8l4 8 9 1.5-6.5 6.3 1.5 9L24 28.5 15.9 32.8l1.5-9L11 17.5l9-1.5z" fill="#fde047" stroke="#ca8a04" strokeWidth="1"/>
    </svg>
  ),
  hostel: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <rect x="10" y="16" width="28" height="24" rx="3" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.5"/>
      <path d="M10 16l14-8 14 8" fill="#fbcfe8" stroke="#ec4899" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="20" y="28" width="8" height="12" rx="1" fill="#ec4899" opacity="0.3"/>
      <rect x="14" y="22" width="5" height="5" rx="1" fill="#f9a8d4"/>
      <rect x="29" y="22" width="5" height="5" rx="1" fill="#f9a8d4"/>
    </svg>
  ),
  notifications: (
    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
      <path d="M24 6c-7 0-12 5-12 12v8l-3 4h30l-3-4v-8c0-7-5-12-12-12z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5"/>
      <path d="M20 34c0 2.2 1.8 4 4 4s4-1.8 4-4" stroke="#ea580c" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

export default function TraineeDashboard() {
  const [profile, setProfile] = useState({});
  const [activeModule, setActiveModule] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editData, setEditData] = useState({});
  const moduleRef = useRef(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    const savedProfile = localStorage.getItem('trainee_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      const seed = {
        name: u.name || 'Sanskar Sharma',
        email: u.email || 'sanskar.sharma@gov.in',
        phone: '+91 98765 43210',
        address: 'NSSTA Campus, Greater Noida, Uttar Pradesh – 201310',
        batch: '46th ISS Probationers (2025-2026)',
        designation: 'Assistant Director (ISS)',
        organization: 'Ministry of Statistics & Programme Implementation',
        enrollmentNo: 'NSSTA/2026/ISS/041',
      };
      localStorage.setItem('trainee_profile', JSON.stringify(seed));
      setProfile(seed);
    }
  }, []);

  const handleEditProfile = () => {
    setEditData({ ...profile });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    localStorage.setItem('trainee_profile', JSON.stringify(editData));
    setProfile(editData);
    setIsEditingProfile(false);
  };

  const handleModuleClick = (mod) => {
    if (activeModule === mod.id) {
      setActiveModule(null);
    } else {
      setActiveModule(mod.id);
      setTimeout(() => {
        moduleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  };

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component;

  return (
    <div className="w-full">

      {/* ===== STUDENT PROFILE SECTION ===== */}
      <div className="w-full bg-gradient-to-br from-[#f0fdf4] via-white to-[#f0f9ff] border-b border-gray-100">
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-7">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[14px] font-bold text-[#08493d] flex items-center gap-2">
              <svg className="w-[18px] h-[18px] text-[#08493d]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Student Profile
            </h2>
            {!isEditingProfile ? (
              <button onClick={handleEditProfile} className="flex items-center gap-1.5 text-[10px] font-bold text-[#08493d] bg-white border border-[#08493d]/20 px-3 py-1.5 rounded-lg hover:bg-[#08493d]/5 hover:border-[#08493d]/40 transition-colors shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => setIsEditingProfile(false)} className="text-[10px] font-bold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSaveProfile} className="text-[10px] font-bold text-white bg-[#08493d] border border-[#08493d] px-3 py-1.5 rounded-lg hover:bg-[#063b31] transition-colors shadow-sm">Save Changes</button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-6 items-stretch">
            {/* Avatar Card */}
            <div className="flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="w-[80px] h-[80px] rounded-2xl bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] border border-green-200 flex items-center justify-center mb-3 shadow-inner">
                <span className="text-[38px] leading-none">🎓</span>
              </div>
              {isEditingProfile ? (
                <input type="text" value={editData.name || ''} onChange={(e) => setEditData({...editData, name: e.target.value})} className="text-[13px] font-bold text-gray-900 text-center border border-gray-200 rounded-lg px-2 py-1 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              ) : (
                <h3 className="text-[13px] font-bold text-gray-900 mt-1">{profile.name}</h3>
              )}
              {isEditingProfile ? (
                <input type="text" value={editData.designation || ''} onChange={(e) => setEditData({...editData, designation: e.target.value})} className="text-[10px] text-gray-500 text-center border border-gray-200 rounded-lg px-2 py-0.5 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              ) : (
                <p className="text-[10px] text-gray-500 mt-0.5">{profile.designation}</p>
              )}
              <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#08493d]/20 bg-[#08493d]/5 text-[9px] font-bold text-[#08493d] shadow-sm">
                <span className="w-[6px] h-[6px] rounded-full bg-[#08493d] animate-pulse"></span>
                Active
              </span>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h4 className="text-[11px] font-bold text-gray-700 flex items-center gap-2 mb-4 pb-2 border-b border-gray-50">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Contact Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-[12px] shrink-0 mt-0.5">✉️</span>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-medium leading-none">Email</p>
                    {isEditingProfile ? (
                      <input type="email" value={editData.email || ''} onChange={(e) => setEditData({...editData, email: e.target.value})} className="text-[12px] font-semibold text-gray-800 mt-1 border border-gray-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                    ) : (
                      <p className="text-[12px] font-semibold text-gray-800 mt-1">{profile.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-[12px] shrink-0 mt-0.5">📞</span>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-medium leading-none">Phone</p>
                    {isEditingProfile ? (
                      <input type="text" value={editData.phone || ''} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="text-[12px] font-semibold text-gray-800 mt-1 border border-gray-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                    ) : (
                      <p className="text-[12px] font-semibold text-gray-800 mt-1">{profile.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-[12px] shrink-0 mt-0.5">📍</span>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-medium leading-none">Address</p>
                    {isEditingProfile ? (
                      <input type="text" value={editData.address || ''} onChange={(e) => setEditData({...editData, address: e.target.value})} className="text-[12px] font-semibold text-gray-800 mt-1 border border-gray-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                    ) : (
                      <p className="text-[12px] font-semibold text-gray-800 mt-1">{profile.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Details */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h4 className="text-[11px] font-bold text-gray-700 flex items-center gap-2 mb-4 pb-2 border-b border-gray-50">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Academic Details
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-[12px] shrink-0 mt-0.5">🏛️</span>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-medium leading-none">Organization</p>
                    {isEditingProfile ? (
                      <input type="text" value={editData.organization || ''} onChange={(e) => setEditData({...editData, organization: e.target.value})} className="text-[12px] font-semibold text-gray-800 mt-1 border border-gray-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                    ) : (
                      <p className="text-[12px] font-semibold text-gray-800 mt-1">{profile.organization}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-[12px] shrink-0 mt-0.5">📖</span>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-medium leading-none">Course / Batch</p>
                    {isEditingProfile ? (
                      <input type="text" value={editData.batch || ''} onChange={(e) => setEditData({...editData, batch: e.target.value})} className="text-[12px] font-semibold text-gray-800 mt-1 border border-gray-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                    ) : (
                      <p className="text-[12px] font-semibold text-gray-800 mt-1">{profile.batch}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center text-[12px] shrink-0 mt-0.5">🔖</span>
                  <div className="flex-1">
                    <p className="text-[9px] text-gray-400 font-medium leading-none">Enrollment No.</p>
                    <p className="text-[12px] font-semibold text-gray-800 mt-1">{profile.enrollmentNo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MODULE GRID ===== */}
      <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-8 bg-[#f6faf8]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => handleModuleClick(mod)}
              className={`group bg-white rounded-2xl border py-6 px-4 flex flex-col items-center text-center gap-3 transition-all duration-250 cursor-pointer ${
                activeModule === mod.id
                  ? 'border-[#08493d]/30 shadow-lg scale-[1.02] ring-2 ring-[#08493d]/10'
                  : 'border-gray-100 hover:border-[#08493d]/20 hover:shadow-md hover:-translate-y-1'
              }`}
            >
              <div className="transition-transform duration-200 group-hover:scale-110">
                {moduleIcons[mod.id]}
              </div>
              <span className={`text-[12px] font-bold ${mod.color}`}>{mod.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ===== ACTIVE MODULE CONTENT ===== */}
      {activeModule && ActiveComponent && (
        <div ref={moduleRef} className="w-full bg-white border-t-2 border-[#08493d]/20 animate-fadeIn">
          {/* Sticky Header */}
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 py-3 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-20 shadow-sm">
            <h3 className="text-[14px] font-bold text-[#08493d] flex items-center gap-3">
              <span className="w-8 h-8">{moduleIcons[activeModule]}</span>
              {modules.find(m => m.id === activeModule)?.label}
            </h3>
            <button
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 hover:text-red-600 bg-gray-50 border border-gray-200 px-3.5 py-2 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
          {/* Content */}
          <div className="w-full">
            <ActiveComponent />
          </div>
        </div>
      )}
    </div>
  );
}
