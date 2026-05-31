import React, { useState } from 'react';

const OFFICIALS_DATA = [
  { id: 1, name: 'Dr. Ramesh Chandra', designation: 'Director General / Head of Academy', role: 'Overall Administration & Strategic Advisory', email: 'dg.lms@example.com', extension: '401', room: 'Admin Block, A-101' },
  { id: 2, name: 'Dr. K. S. Reddy', designation: 'Deputy Director General', role: 'International Cooperation & Research Seminars', email: 'ddg.int@mospi.gov.in', extension: '402', room: 'Admin Block, A-102' },
  { id: 3, name: 'Smt. Anjali Sharma', designation: 'Joint Director', role: 'Academic Course Planning & ISS Induction In-charge', email: 'jdir.trg@mospi.gov.in', extension: '405', room: 'Admin Block, A-105' },
  { id: 4, name: 'Shri Vinay Kumar', designation: 'Deputy Director', role: 'IT Infrastructure, LMS & KMS Administrator', email: 'dd.it@mospi.gov.in', extension: '410', room: 'Computer Block, B-203' },
  { id: 5, name: 'Shri Harish Rawat', designation: 'Assistant Director', role: 'Hostel Lodging & Campus Sports Facilities', email: 'ad.hostel@mospi.gov.in', extension: '420', room: 'Hostel Block Reception' },
  { id: 6, name: 'Smt. Sunita Paul', designation: 'Section Officer', role: 'Accounts, Tenders & Procurement Desk', email: 'so.acct@mospi.gov.in', extension: '433', room: 'Admin Block, A-112' }
];

export default function Administration() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOfficials = OFFICIALS_DATA.filter(off => {
    return off.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           off.designation.toLowerCase().includes(searchQuery.toLowerCase()) || 
           off.role.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Academy Administration</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Directory of key administrative officials, training coordinators, and section officers of LMS.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search Panel */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search by name, designation, or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm"
            />
          </div>
          
          <div className="text-xs sm:text-sm font-semibold text-slate-500">
            Total Staff Listed: <span className="text-[#08493d] font-bold">{filteredOfficials.length}</span>
          </div>
        </div>

        {/* Directory Table Grid */}
        <div className="bg-white rounded-2xl shadow-xs border border-gray-150 overflow-hidden">
          {filteredOfficials.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/75 border-b border-gray-100 text-slate-500 font-bold">
                    <th className="px-6 py-4">Name & Designation</th>
                    <th className="px-6 py-4">Portfolio / Responsibilities</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Phone Ext.</th>
                    <th className="px-6 py-4">Room Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-slate-700">
                  {filteredOfficials.map((off) => (
                    <tr key={off.id} className="hover:bg-slate-50/50 transition-colors group">
                      
                      {/* Name / Desig */}
                      <td className="px-6 py-4">
                        <div className="space-y-0.5">
                          <h4 className="font-extrabold text-slate-800 group-hover:text-[#08493d] transition-colors">
                            {off.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                            {off.designation}
                          </p>
                        </div>
                      </td>

                      {/* Portfolio */}
                      <td className="px-6 py-4">
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {off.role}
                        </p>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`mailto:${off.email}`}
                          className="font-mono text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded border border-emerald-150 transition-colors inline-block"
                        >
                          {off.email}
                        </a>
                      </td>

                      {/* Phone Ext */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-800">
                        Ext. {off.extension}
                      </td>

                      {/* Room Location */}
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                        {off.room}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-slate-700">No staff matching criteria</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                We couldn't find anyone matching your search "{searchQuery}". Try using a different keyword.
              </p>
            </div>
          )}
        </div>

      </section>
    </div>
  );
}
