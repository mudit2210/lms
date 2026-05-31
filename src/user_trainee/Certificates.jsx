import React, { useState, useEffect } from 'react';

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('trainee_certificates');
    if (saved) {
      setCertificates(JSON.parse(saved));
    } else {
      const seed = [
        { id: 'CERT-001', title: 'ISS Foundation Module - Batch 46', type: 'Completion', course: 'ISS Foundation Module', issueDate: '2026-04-15', grade: 'A', validUntil: '2031-04-15', certificateNo: 'NSSTA/2026/COMP/0041' },
        { id: 'CERT-002', title: 'Workshop on Survey Methodology', type: 'Participation', course: 'Survey Methodology Workshop', issueDate: '2026-02-20', grade: null, validUntil: null, certificateNo: 'NSSTA/2026/PART/0128' },
        { id: 'CERT-003', title: 'Best Performer - Statistical Computing Lab', type: 'Appreciation', course: 'ISS Foundation Module', issueDate: '2026-04-15', grade: null, validUntil: null, certificateNo: 'NSSTA/2026/APPR/0007' },
      ];
      localStorage.setItem('trainee_certificates', JSON.stringify(seed));
      setCertificates(seed);
    }
  }, []);

  const getTypeColor = (type) => {
    switch (type) {
      case 'Completion': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Participation': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Appreciation': return 'bg-amber-50 text-amber-800 border-amber-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Completion': return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z';
      case 'Participation': return 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z';
      case 'Appreciation': return 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z';
      default: return '';
    }
  };

  const handleDownload = (cert) => {
    alert(`Downloading certificate: ${cert.certificateNo}\n\nIn production, this would generate a PDF certificate with digital signature and QR code verification.`);
  };

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-slate-800">Certificates</h1>
        <p className="text-xs text-slate-500 mt-0.5">View and download your training certificates — completion, participation, and appreciation.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-extrabold text-slate-800">{certificates.filter(c => c.type === 'Completion').length}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Completion</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-extrabold text-slate-800">{certificates.filter(c => c.type === 'Participation').length}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Participation</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-150 p-4 shadow-2xs flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-extrabold text-slate-800">{certificates.filter(c => c.type === 'Appreciation').length}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Appreciation</p>
          </div>
        </div>
      </div>

      {/* Certificate Cards */}
      <div className="space-y-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl border border-gray-150 shadow-2xs p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                  cert.type === 'Completion' ? 'bg-emerald-50' : cert.type === 'Participation' ? 'bg-blue-50' : 'bg-amber-50'
                }`}>
                  <svg className={`w-6 h-6 ${
                    cert.type === 'Completion' ? 'text-emerald-700' : cert.type === 'Participation' ? 'text-blue-700' : 'text-amber-700'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={getTypeIcon(cert.type)} />
                  </svg>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${getTypeColor(cert.type)}`}>
                      {cert.type}
                    </span>
                    {cert.grade && (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded border bg-indigo-50 text-indigo-700 border-indigo-200">
                        Grade: {cert.grade}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{cert.title}</h3>
                  <p className="text-[10px] text-slate-400">Certificate No: {cert.certificateNo}</p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium mt-1">
                    <span>Issued: {cert.issueDate}</span>
                    {cert.validUntil && <span>Valid Until: {cert.validUntil}</span>}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(cert)}
                className="flex items-center gap-2 px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-bold text-[10px] rounded-lg shadow transition-colors shrink-0"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-150 border-dashed">
          <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <p className="text-sm font-semibold text-slate-400">No certificates earned yet. Complete a course to receive your first certificate!</p>
        </div>
      )}
    </div>
  );
}
