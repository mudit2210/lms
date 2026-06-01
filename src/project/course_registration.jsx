import React, { useState } from 'react';

export default function CourseRegistration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    org: 'Ministry of Statistics & PI',
    designation: '',
    course: 'Two-week Training Programme on Time Series Analysis',
    nominationLetter: null,
  });
  
  const [mfaCode, setMfaCode] = useState('');
  const [showMfaInput, setShowMfaInput] = useState(false);
  const [isSentMfa, setIsSentMfa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const coursesList = [
    'Two-week Training Programme on Time Series Analysis',
    'Workshop on Big Data Analytics and Machine Learning in Official Statistics',
    'International Training Programme on Agricultural Statistics',
    'ISS Probationary Officer Foundation Module',
    'Advanced Survey Methodology & National Indicator Framework'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, nominationLetter: e.target.files[0].name }));
    }
  };

  const handleRequestMfa = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.designation) {
      setError('Please fill in all fields before requesting MFA verification.');
      return;
    }
    setError('');
    setIsLoading(true);
    
    // Simulate sending OTP SMS/Email (MFA)
    setTimeout(() => {
      setIsLoading(false);
      setIsSentMfa(true);
      setShowMfaInput(true);
      alert('A 6-digit verification code has been sent to your email & registered mobile.');
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showMfaInput && !mfaCode) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      // Store registration data in localStorage under 'pending_registrations'
      const existing = JSON.parse(localStorage.getItem('pending_registrations') || '[]');
      const newReg = {
        id: 'REG-' + Date.now(),
        ...formData,
        status: 'Pending Approval',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      existing.push(newReg);
      localStorage.setItem('pending_registrations', JSON.stringify(existing));

      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 py-12 px-4 select-none animate-fadeIn">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800">Registration Submitted!</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Thank you, <strong className="text-slate-700">{formData.fullName}</strong>. Your nomination for <em className="text-emerald-800 font-semibold">{formData.course}</em> has been recorded successfully.
          </p>
          <div className="bg-amber-50 text-amber-800 border border-amber-200 text-xs p-3 rounded-lg font-medium leading-relaxed">
            **Admin Approval Pending**: Your self-registration will be reviewed by the Course Director. You will receive login details upon approval.
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-2.5 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-sm rounded-lg shadow transition-colors cursor-pointer"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#08493d]/5 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-md border border-gray-150 relative z-10 animate-fadeIn">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-gray-100 pb-6 mb-6">
          <h2 className="text-2xl font-extrabold text-[#08493d]">Online Course Enrolment Form</h2>
          <p className="text-xs text-slate-500 font-medium">
            Nominate yourself or submit a registration request for NSSTA statistical training courses.
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-lg text-xs font-semibold mb-6 flex items-center gap-2">
            <svg className="w-4.5 h-4.5 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={showMfaInput ? handleSubmit : handleRequestMfa} className="space-y-5 text-xs sm:text-sm">
          
          {/* Section 1: Personal details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Full Name (As in service book)</label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={showMfaInput}
                placeholder="e.g. Mudit Sharma"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Email Address (Government/Official preferred)</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={showMfaInput}
                placeholder="e.g. mudit.sharma@gov.in"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Mobile Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                disabled={showMfaInput}
                placeholder="e.g. +91 9876543210"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Official Designation</label>
              <input
                type="text"
                name="designation"
                required
                value={formData.designation}
                onChange={handleInputChange}
                disabled={showMfaInput}
                placeholder="e.g. Assistant Director (ISS)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Sponsoring Organization / Department</label>
            <input
              type="text"
              name="org"
              required
              value={formData.org}
              onChange={handleInputChange}
              disabled={showMfaInput}
              placeholder="e.g. Ministry of Statistics and Programme Implementation"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
            />
          </div>

          {/* Section 2: Course nomination */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Select Training Program</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              disabled={showMfaInput}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
            >
              {coursesList.map((courseOption, index) => (
                <option key={index} value={courseOption}>{courseOption}</option>
              ))}
            </select>
          </div>

          {/* Sponsoring/Nomination Letter upload */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Upload Nomination / Sponsoring Letter (PDF/DOC)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-10 w-10 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h20a4 4 0 004-4V20m-12-8l12 12m-12-12v12h12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-xs text-slate-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-bold text-emerald-800 hover:text-emerald-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} disabled={showMfaInput} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</p>
                {formData.nominationLetter && (
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded inline-block mt-2">
                    ✓ Selected: {formData.nominationLetter}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MFA input verification code */}
          {showMfaInput && (
            <div className="space-y-1.5 p-4 bg-emerald-50/50 border border-emerald-100 rounded-lg animate-fadeIn">
              <label className="block text-xs font-bold text-slate-800">
                Multi-Factor Authentication Code (MFA)
              </label>
              <p className="text-[11px] text-slate-500 mb-2">
                Please enter the 6-digit verification code sent to your registered email to authenticate this nomination.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.replace(/\D/g,''))}
                  placeholder="e.g. 892015"
                  className="w-48 border border-gray-300 rounded-lg px-3 py-2 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-center tracking-widest text-lg font-bold"
                />
                <button
                  type="button"
                  onClick={() => alert('MFA code resent successfully!')}
                  className="text-xs font-bold text-[#08493d] hover:underline cursor-pointer"
                >
                  Resend Code
                </button>
              </div>
            </div>
          )}

          {/* Submit/Request button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-[#08493d] to-emerald-800 hover:from-[#063b31] hover:to-emerald-900 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Processing...</span>
              </>
            ) : showMfaInput ? (
              <span>Verify & Complete Registration</span>
            ) : (
              <span>Authenticate & Request Enrolment</span>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}
