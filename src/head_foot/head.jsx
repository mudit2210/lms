import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Head() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aboutOpen, setAboutOpen] = useState(false);
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
          
          {/* Search Box Form */}
          <form onSubmit={handleSearch} className="flex items-center flex-grow max-w-md xl:max-w-xs relative">
            <input
              type="text"
              placeholder="Namaste! What can I find for you?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-[#08493d] rounded-md px-3 py-1.5 pr-8 text-xs sm:text-sm font-medium placeholder-gray-500 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-shadow shadow-inner"
            />
            <button 
              type="submit" 
              className="absolute right-2 text-emerald-800 hover:text-emerald-600 transition-colors p-1"
              aria-label="Search button"
            >
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>

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
        className={`w-full bg-[#f8fafc] border-b border-gray-200 select-none ${
          mobileMenuOpen ? 'block' : 'hidden'
        } xl:block`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 xl:py-3 flex flex-col xl:flex-row xl:items-center xl:justify-end">
          <ul className="flex flex-col xl:flex-row xl:items-center space-y-2 xl:space-y-0 xl:space-x-8 text-sm font-bold text-slate-800">
            {/* Home link */}
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                className="flex items-center w-full py-1 xl:py-0 text-left hover:text-[#08493d] focus:outline-none transition-colors"
                aria-expanded={aboutOpen}
                aria-haspopup="true"
              >
                <span>About us</span>
                <svg 
                  className={`h-4 w-4 ml-1 transform transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
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
                  `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                  `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                  `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                    `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                  `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                  `block py-1 xl:py-0 hover:text-[#08493d] transition-colors ${isActive ? 'text-[#08493d] border-b-2 border-[#08493d]' : ''}`
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
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-50 text-[#08493d] border border-emerald-250 rounded-md text-xs font-bold hover:bg-emerald-100 transition-colors focus:outline-none cursor-pointer"
                >
                  <svg className="w-4 h-4 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{user.name}</span>
                  <svg className={`h-3 w-3 ml-0.5 transform transition-transform ${profileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {profileOpen && (
                  <ul className="xl:absolute xl:right-0 xl:mt-2 w-48 bg-white border border-gray-150 rounded-lg shadow-lg py-1.5 z-50 text-xs font-semibold text-slate-700 animate-fadeIn">
                    <li className="px-4 py-2 border-b border-gray-100 bg-slate-50/50">
                      <p className="font-extrabold text-slate-800 leading-tight">{user.name}</p>
                      <p className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider mt-0.5">{user.role} Portal</p>
                      <p className="text-[10px] text-slate-400 font-normal truncate mt-0.5">{user.email}</p>
                    </li>
                    {user.role === 'admin' && (
                      <>
                        <li>
                          <NavLink 
                            to="/admin/e-hostel" 
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-slate-50 hover:text-[#08493d] transition-colors"
                          >
                            e-Hostel Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <NavLink 
                            to="/admin/kms" 
                            onClick={() => setProfileOpen(false)}
                            className="block px-4 py-2 hover:bg-slate-50 hover:text-[#08493d] transition-colors"
                          >
                            KMS Content Dashboard
                          </NavLink>
                        </li>
                      </>
                    )}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 hover:bg-rose-50 hover:text-rose-700 font-bold transition-colors border-t border-gray-100 cursor-pointer"
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
    </header>
  );
}