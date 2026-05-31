import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'admission',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Mock submit behavior
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'admission',
        message: ''
      });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* Banner Header with Gradient */}
      <section className="bg-gradient-to-r from-[#08493d] to-[#0d3b31] text-white py-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Contact Academy</h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
            Have questions about training programs, admissions, or research collaborations? We're here to help.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Office Contacts (Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Address and General Info */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-slate-800 border-b border-gray-100 pb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              LMS Headquarters
            </h3>

            {/* Address */}
            <div className="flex gap-4 items-start text-sm">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl mt-0.5 border border-emerald-100/50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700">Location Address</h4>
                <p className="text-slate-500 leading-relaxed">
                  Learning Management System (LMS) Academy,<br />
                  Plot No. 22, Knowledge Park-II,<br />
                  Greater Noida, Gautam Buddha Nagar,<br />
                  Uttar Pradesh - 201310
                </p>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="flex gap-4 items-start text-sm">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl mt-0.5 border border-emerald-100/50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700">Phone & Fax</h4>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-600">Tel:</span> +91-120-2320462 / 2320465<br />
                  <span className="font-semibold text-slate-600">Fax:</span> +91-120-2320454
                </p>
              </div>
            </div>

            {/* Email addresses */}
            <div className="flex gap-4 items-start text-sm">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl mt-0.5 border border-emerald-100/50">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700">Official Emails</h4>
                <p className="text-slate-500">
                  <span className="font-semibold text-slate-600">General Inquiry:</span> lms@example.com<br />
                  <span className="font-semibold text-slate-600">Academic/Training:</span> trg-lms@example.com
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Map Visual Mockup */}
          <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Campus Location Map</h3>
            <div className="relative h-48 bg-emerald-950/5 rounded-xl border border-gray-200 overflow-hidden flex items-center justify-center">
              {/* Styling a beautiful map graphic mock */}
              <div className="absolute inset-0 bg-slate-100 opacity-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:16px_16px]"></div>
              
              {/* Mock road layers */}
              <div className="absolute w-full h-4 bg-white/80 top-1/3 border-y border-slate-200 rotate-6 shadow-2xs"></div>
              <div className="absolute h-full w-4 bg-white/80 left-1/3 border-x border-slate-200 -rotate-12 shadow-2xs"></div>
              <div className="absolute w-full h-6 bg-[#08493d]/5 top-1/2 flex items-center justify-center text-[8px] font-bold text-emerald-800 tracking-widest uppercase">Knowledge Park II Road</div>
              
              {/* LMS Pin */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
                <div className="bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md border border-emerald-700 animate-bounce whitespace-nowrap mb-1">
                  LMS Campus
                </div>
                <div className="w-3.5 h-3.5 bg-rose-600 rounded-full border-2 border-white shadow-md flex items-center justify-center animate-pulse">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Coordinates / Map Card info */}
              <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm flex justify-between items-center text-[10px]">
                <span className="font-semibold text-slate-600">Lat: 28.4632° N, Lon: 77.5028° E</span>
                <a 
                  href="https://maps.google.com/?q=LMS+Greater+Noida" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Query Form (Span 7) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-800">Send us a Message</h3>
              <p className="text-slate-400 text-xs mt-1">Fields marked with <span className="text-rose-500">*</span> are mandatory.</p>
            </div>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 px-6 py-8 rounded-xl text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold">Query Submitted Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for contacting LMS Support. Your message has been received. Our administration team will respond to you at the earliest.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm font-medium text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-slate-600">Full Name <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Mudit Sharma" 
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-slate-600">Email Address <span className="text-rose-500">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. mudit@example.com" 
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800 placeholder-slate-400"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-slate-600">Contact Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210" 
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800 placeholder-slate-400"
                    />
                  </div>

                  {/* Subject Category */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-slate-600">Subject Category <span className="text-rose-500">*</span></label>
                    <select 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800 bg-white"
                    >
                      <option value="admission">Admissions & Course Enrollment</option>
                      <option value="research">Research & Publications</option>
                      <option value="facility">Hostel & Campus Facilities</option>
                      <option value="it_support">IT Portal / LMS Support</option>
                      <option value="other">Other Inquiries</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-slate-600">Message / Query Details <span className="text-rose-500">*</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your query details here..." 
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all text-slate-800 placeholder-slate-400 resize-y"
                  ></textarea>
                </div>

                {/* Verification Check (Captcha Mock) */}
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-150 flex flex-col sm:flex-row justify-between items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-950 font-mono text-yellow-300 px-3 py-1.5 rounded-md font-bold tracking-widest text-base shadow-inner select-all select-none">
                      L M S
                    </div>
                    <span className="text-xs text-slate-500">Security Check Code</span>
                  </div>
                  <div className="w-full sm:w-40">
                    <input 
                      type="text" 
                      required
                      placeholder="Type LMS" 
                      pattern="LMS|lms"
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-center font-bold tracking-wider"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  className="w-full py-3 bg-[#08493d] hover:bg-[#063b31] text-white font-bold rounded-lg shadow-sm hover:shadow transition-all duration-200 uppercase tracking-wider text-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit Query
                </button>
              </form>
            )}

          </div>
        </div>

      </section>
    </div>
  );
}
