import React from 'react';

export default function Foot() {
  return (
    <footer className="w-full bg-[#0b3c33] text-slate-100 font-sans mt-auto border-t-4 border-yellow-400 select-none">
      {/* Upper Footer Links */}
      <div className="max-w-7xl mx-auto py-8 px-6 sm:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
        {/* About Ministry & Academy */}
        <div className="space-y-3">
          <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-sm border-b border-[#0f4e43] pb-1.5">
            About NSSTA
          </h4>
          <p className="text-slate-300 leading-relaxed text-xs">
            The National Statistical Systems Training Academy (NSSTA) is the premier Central Training Institute of the Ministry of Statistics & Programme Implementation (MoSPI). It serves as the national hub for training in official statistics, survey methods, and data science.
          </p>
        </div>

        {/* Useful Portal Links */}
        <div className="space-y-3">
          <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-sm border-b border-[#0f4e43] pb-1.5">
            Helpful Links
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
            <li><a href="https://mospi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">MoSPI Portal</a></li>
            <li><a href="https://india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors">National Portal</a></li>
            <li><a href="#policies" className="hover:text-yellow-300 transition-colors">Website Policies</a></li>
            <li><a href="#disclaimer" className="hover:text-yellow-300 transition-colors">Disclaimer</a></li>
            <li><a href="#sitemap" className="hover:text-yellow-300 transition-colors">Sitemap</a></li>
            <li><a href="#feedback" className="hover:text-yellow-300 transition-colors">Feedback & Help</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-yellow-400 font-bold uppercase tracking-wider text-sm border-b border-[#0f4e43] pb-1.5">
            Contact Academy
          </h4>
          <p className="text-slate-300 text-xs leading-relaxed">
            <strong>Address:</strong> Plot No. 22, Knowledge Park-II, Greater Noida, Gautam Buddh Nagar, Uttar Pradesh - 201310<br />
            <strong>Email:</strong> nssta@mospi.gov.in<br />
            <strong>Phone:</strong> +91-120-2320462
          </p>
        </div>
      </div>

      {/* Lower Copyright & NIC Bar */}
      <div className="w-full bg-[#052620] py-4 px-6 sm:px-12 lg:px-20 text-[10px] sm:text-xs text-slate-400 text-center border-t border-[#041d18]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-slate-300 font-medium text-left">
            <p>© 2026 National Statistical Systems Training Academy (NSSTA). All Rights Reserved.</p>
            <p className="text-[10px] text-slate-400 font-normal">Content owned, updated and maintained by the National Statistical Systems Training Academy, MoSPI, Government of India.</p>
          </div>
          
          <div className="flex items-center space-x-3 text-slate-400 select-none">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-slate-300">Hosted by</span>
              <span className="font-extrabold text-[#38bdf8]">National Informatics Centre</span>
            </div>
            {/* Simple NIC Logo representation */}
            <div className="bg-white/10 px-2 py-1 rounded border border-white/5 font-extrabold text-white text-xs select-none">
              NIC
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
