import React from 'react';

export default function SideBar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen, onRaiseTicket }) {
  const [user, setUser] = React.useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : { name: 'Admin Administrator', email: 'admin@mospi.gov.in', role: 'admin' };
    } catch {
      return { name: 'Admin Administrator', email: 'admin@mospi.gov.in', role: 'admin' };
    }
  });

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'faculty': return 'Trainer / Faculty';
      case 'student': return 'Trainee / Learner';
      case 'course-director': return 'Course Director';
      case 'course-coordinator': return 'Course Coordinator';
      case 'warden': return 'Warden';
      case 'cms': return 'Content Manager';
      default: return role || 'User';
    }
  };

  const menuGroups = [
    {
      title: null,
      items: [
        {
          id: 'dashboard',
          label: 'e-Hostel Dashboard',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'e-Hostel',
      items: [
        {
          id: 'room_allotment',
          label: 'Room Allotment',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )
        },
        {
          id: 'check_in_out',
          label: 'Check-in / Check-out',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          )
        },
        {
          id: 'payments',
          label: 'Payments & Receipts',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        },
        {
          id: 'tickets',
          label: 'Maintenance Tickets',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Logistics',
      items: [
        {
          id: 'venue_scheduling',
          label: 'Venue Scheduling',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        },
        {
          id: 'classroom_allocation',
          label: 'Classroom Allocation',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 4a2 2 0 002-2V4a2 2 0 00-2-2h-3a2 2 0 00-2 2v3M9 8h4m-4 4h4m-4 4h2" />
            </svg>
          )
        },
        {
          id: 'transport_management',
          label: 'Transport Management',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 17a5 5 0 0110 0m-10 0a5 5 0 0010 0m-10 0V9a2 2 0 114 0v8m-4-8h10a1 1 0 011 1v3H4m16 0h-4" />
            </svg>
          )
        },
        {
          id: 'resource_management',
          label: 'Resource Management',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Reports',
      items: [
        {
          id: 'hostel_reports',
          label: 'Hostel Reports',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        },
        {
          id: 'logistics_reports',
          label: 'Logistics Reports',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Settings',
      items: [
        {
          id: 'master_data',
          label: 'Master Data',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          )
        },
        {
          id: 'system_settings',
          label: 'System Settings',
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )
        }
      ]
    },
    {
      title: 'Workspace Navigation',
      items: [
        {
          id: 'back_home',
          label: 'Back to Public Site',
          onClick: () => { window.location.href = '/'; },
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          )
        },
        {
          id: 'user_directory',
          label: 'User Directory',
          onClick: () => { window.location.href = '/admin/users'; },
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )
        },
        {
          id: 'logout',
          label: 'Sign Out',
          onClick: () => {
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('auth-change'));
            window.location.href = '/login';
          },
          icon: (
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#053229] text-white flex flex-col select-none shrink-0 font-sans border-r border-[#031b16] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 h-screen lg:h-auto`}>
      {/* Title Header */}
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-white">LMS Console</h2>
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">Admin Management</p>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus:outline-none"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* User Account Profile Card embedded beautifully */}
      <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-br from-[#063f33]/90 to-[#042d25]/90 mx-3 my-2 rounded-xl border border-white/10 shadow-inner">
        <div className="flex items-center gap-3">
          {/* Avatar block with HSL gradient border */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-blue-500 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#053229] rounded-[10px] flex items-center justify-center font-black text-sm text-white">
              {user.name?.[0] || 'A'}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white font-extrabold text-xs truncate leading-tight">{user.name}</p>
            <p className="text-emerald-400/80 text-[9px] font-bold truncate mt-0.5">{getRoleLabel(user.role)}</p>
          </div>
        </div>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuGroups.map((group, groupIndex) => {
          // Skip the last group (Workspace Navigation) — it's rendered separately below
          if (group.title === 'Workspace Navigation') return null;
          return (
            <div key={groupIndex} className="space-y-1">
              {group.title && (
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4 pt-2 pb-1">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        setActiveTab(item.id);
                      }
                      if (setIsSidebarOpen) setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-300 hover:bg-[#053d32]/60 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })}

        {/* Separator / Admin Quick Links */}
        <div className="border-t border-[#053d32]/45 my-4 pt-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4">Workspace Navigation</p>
          
          <button
            onClick={() => {
              if (setIsSidebarOpen) setIsSidebarOpen(false);
              window.location.href = '/admin/dashboard';
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-350 hover:bg-[#053d32]/60 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="3" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="14" y="14" width="7" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Admin Dashboard</span>
          </button>
          
          <button
            onClick={() => {
              if (setIsSidebarOpen) setIsSidebarOpen(false);
              window.location.href = '/';
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-[#053d32]/60 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Public Site</span>
          </button>
          
          <button
            onClick={() => {
              if (setIsSidebarOpen) setIsSidebarOpen(false);
              window.location.href = '/admin/users';
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-[#053d32]/60 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>User Directory</span>
          </button>

          <button
            onClick={() => {
              if (setIsSidebarOpen) setIsSidebarOpen(false);
              window.location.href = '/admin/kms';
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-[#053d32]/60 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Knowledge Management</span>
          </button>

          <button
            onClick={() => {
              if (setIsSidebarOpen) setIsSidebarOpen(false);
              window.location.href = '/admin/reports';
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-300 hover:bg-[#053d32]/60 hover:text-white transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Report & Analytics</span>
          </button>

          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.dispatchEvent(new Event('auth-change'));
              window.location.href = '/login';
            }}
            className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-bold text-rose-350 hover:bg-rose-900/30 hover:text-rose-200 transition-all cursor-pointer text-left"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Need Help Box */}
      <div className="border border-white/10 bg-[#031c17] p-4 rounded-xl mx-3.5 my-4 text-left">
        <p className="text-xs font-bold text-white mb-0.5">Need Help?</p>
        <p className="text-[10px] text-slate-400 font-semibold leading-normal">Contact Support Desk</p>
        <button
          onClick={() => {
            if (onRaiseTicket) {
              onRaiseTicket();
            } else {
              alert('Opening Raise Ticket form...');
            }
          }}
          className="w-full mt-2.5 py-1.5 bg-[#08493d] hover:bg-[#063b31] text-white text-xs font-bold rounded-lg shadow-sm text-center cursor-pointer transition-colors block"
        >
          Raise Ticket
        </button>
      </div>
    </aside>
  );
}