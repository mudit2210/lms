import React from 'react';

export default function SideBar({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) {
  const menuItems = [
    {
      id: 'room_allotment',
      label: 'Room Allotment',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'check_in_out',
      label: 'Check-in / Check-out',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'payments',
      label: 'Payments & Receipts',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'tickets',
      label: 'Maintenance Tickets',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      )
    }
  ];

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#032e26] text-white flex flex-col select-none shrink-0 font-sans border-r border-[#04211b] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 h-screen lg:h-auto`}>
      {/* Title Header */}
      <div className="p-6 border-b border-[#053d32]/45 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-yellow-400">e-Hostel</h2>
          <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mt-0.5">Logistics & Accommodation</p>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#053d32]/60 focus:outline-none"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
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

        {/* Separator / Admin Quick Links */}
        <div className="border-t border-[#053d32]/45 my-4 pt-4 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-4">Workspace Navigation</p>
          
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

      {/* Footer Info */}
      <div className="p-4 border-t border-[#053d32]/45 bg-[#02231c]/50 text-center">
        <span className="text-[10px] text-slate-400 font-semibold block">LMS Admin Panel</span>
        <span className="text-[9px] text-slate-500 font-medium block mt-0.5">Version 2.4.1</span>
      </div>
    </aside>
  );
}