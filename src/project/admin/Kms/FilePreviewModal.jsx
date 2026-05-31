import React, { useState } from 'react';

export default function FilePreviewModal({ selectedFile, onClose, onDownload }) {
  if (!selectedFile) return null;

  const [pdfPage, setPdfPage] = useState(1);
  const [pptSlide, setPptSlide] = useState(1);
  const [imgZoom, setImgZoom] = useState(100);
  const [imgRotate, setImgRotate] = useState(0);

  // Fallback views or downloads tracking indicators
  const fileViews = selectedFile.views || 45;
  const fileDownloads = selectedFile.downloads || 12;

  const pptSlidesData = [
    {
      num: 1,
      title: "MoSPI Section 3.1.3 National Framework Overview",
      bullets: [
        "Established compliance guidelines for governmental LCMS/KMS databases.",
        "Role-based administrative gating structures (Super Admin to Learner).",
        "Draft quarantine threat scans & audit trails metrics."
      ]
    },
    {
      num: 2,
      title: "Course outline Structure Principles",
      bullets: [
        "Curriculum Course nodes act as academic program anchors.",
        "Lessons sequence chapters inside an active course outline.",
        "Topics serve as rich text leaf pages loaded with attachments."
      ]
    },
    {
      num: 3,
      title: "Regulatory Peer Q&A Forums",
      bullets: [
        "Enable statistical surveyors to share field methodologies.",
        "Encourage peer-to-peer discussions, quote replies, and locks.",
        "Chronological compliance logs record moderator actions."
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-[#0b352e] text-white p-4 sm:p-5 flex justify-between items-center shrink-0 text-left">
          <div className="space-y-0.5">
            <span className="text-[9px] bg-yellow-400 text-[#0b352e] px-1.5 py-0.2 rounded font-extrabold uppercase">
              Preview Widget ({selectedFile.type.toUpperCase()})
            </span>
            <h3 className="font-extrabold text-sm sm:text-base tracking-wide leading-snug">{selectedFile.name}</h3>
          </div>
          
          <button 
            onClick={onClose}
            className="text-slate-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Close Preview"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Custom Interactive Preview Skin Container */}
        <div className="p-6 bg-slate-100 flex-grow overflow-y-auto min-h-[350px] text-left">
          
          {/* PDF Viewer */}
          {selectedFile.type === 'pdf' && (
            <div className="bg-white border rounded-xl shadow p-5 space-y-4 max-w-2xl mx-auto text-xs font-semibold text-slate-700">
              <div className="flex justify-between items-center border-b border-gray-155 pb-2">
                <span className="text-slate-400 font-bold">Adobe PDF Reader (v{selectedFile.version})</span>
                <div className="flex items-center gap-1.5">
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => alert('PDF Zoom In simulated')}>Zoom +</button>
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => alert('PDF Zoom Out simulated')}>Zoom -</button>
                </div>
              </div>
              
              <div className="space-y-3 leading-relaxed max-h-[200px] overflow-y-auto pr-1">
                <p className="font-extrabold text-slate-900 text-sm">CHAPTER {pdfPage}: OFFICIAL PROCUREMENT CODES</p>
                <p>This handbook outlines the standard rules under GFR regulations, district target tracking systems, and spatial agricultural databases.</p>
                <p>Section 1.{pdfPage}: Official statistics schedules must detail the source, verified date, aggregation methods, and administrative supervisor signature.</p>
                <p>All regional centers must log entries on central database nodes before 18:00 daily.</p>
              </div>
              
              <div className="text-center pt-2 border-t border-gray-100 text-slate-400 flex justify-between items-center">
                <span>Page {pdfPage} of 12</span>
                <div className="flex gap-1.5">
                  <button 
                    className="px-3 py-1 bg-slate-50 border rounded font-bold disabled:opacity-40" 
                    disabled={pdfPage === 1}
                    onClick={() => setPdfPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </button>
                  <button 
                    className="px-3 py-1 bg-slate-50 border rounded font-bold disabled:opacity-40" 
                    disabled={pdfPage === 12}
                    onClick={() => setPdfPage(prev => Math.min(12, prev + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Word Viewer */}
          {selectedFile.type === 'docx' && (
            <div className="bg-white border rounded-xl shadow p-6 max-w-2xl mx-auto space-y-3 text-xs text-slate-700 leading-relaxed font-semibold">
              <div className="text-center pb-2 border-b border-gray-100">
                <h3 className="font-extrabold text-slate-900 text-sm">{selectedFile.name}</h3>
                <p className="text-[10px] text-slate-400">Microsoft Word Sheet v{selectedFile.version}</p>
              </div>
              <div 
                className="prose leading-relaxed space-y-2.5 max-h-[220px] overflow-y-auto pr-1"
                dangerouslySetInnerHTML={{ __html: selectedFile.versions?.[0]?.contentSnippet || selectedFile.description || 'No content snippet available.' }}
              />
            </div>
          )}

          {/* PPT Viewer */}
          {(selectedFile.type === 'ppt' || selectedFile.type === 'pptx') && (
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-5 space-y-4 max-w-2xl mx-auto text-xs font-semibold text-slate-200">
              <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                <span className="text-slate-400 font-bold">PowerPoint Slideshow Viewer</span>
                <span className="bg-amber-600 text-white font-extrabold px-2 py-0.5 rounded text-[9px] uppercase">
                  Slide {pptSlide} of {pptSlidesData.length}
                </span>
              </div>

              {/* Dynamic Presentation Slide screen */}
              <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 min-h-[160px] flex flex-col justify-center space-y-3 text-left">
                <h4 className="text-sm font-black text-amber-400 border-b border-slate-800 pb-2 uppercase tracking-wide">
                  {pptSlidesData[pptSlide - 1].title}
                </h4>
                <ul className="space-y-2 list-disc pl-5 text-slate-300">
                  {pptSlidesData[pptSlide - 1].bullets.map((b, i) => (
                    <li key={i} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                <div className="flex gap-1">
                  {pptSlidesData.map(s => (
                    <button 
                      key={s.num} 
                      onClick={() => setPptSlide(s.num)}
                      className={`w-5 h-5 rounded font-black text-[9px] ${pptSlide === s.num ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-350 hover:bg-slate-650'}`}
                    >
                      {s.num}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button 
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 rounded font-bold disabled:opacity-40 cursor-pointer"
                    disabled={pptSlide === 1}
                    onClick={() => setPptSlide(prev => Math.max(1, prev - 1))}
                  >
                    Prev
                  </button>
                  <button 
                    className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white border border-slate-600 rounded font-bold disabled:opacity-40 cursor-pointer"
                    disabled={pptSlide === pptSlidesData.length}
                    onClick={() => setPptSlide(prev => Math.min(pptSlidesData.length, prev + 1))}
                  >
                    Next Slide
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Excel Spreadsheet Viewer */}
          {selectedFile.type === 'xlsx' && (
            <div className="bg-white border rounded-xl shadow p-4 space-y-3 max-w-2xl mx-auto text-xs font-semibold text-slate-700 overflow-x-auto">
              <p className="text-slate-400 font-bold border-b pb-2">Excel Spreadsheet Matrix: Q1 Response Rates</p>
              <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-gray-200 uppercase">
                    <th className="p-2">District Unit</th>
                    <th className="p-2">Target Schedules</th>
                    <th className="p-2">Responses Logged</th>
                    <th className="p-2">Rate %</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr>
                    <td className="p-2 font-bold text-slate-800">Delhi North Center</td>
                    <td className="p-2 font-mono">500</td>
                    <td className="p-2 font-mono">480</td>
                    <td className="p-2 font-mono text-emerald-800">96.0%</td>
                    <td className="p-2"><span className="text-[8px] bg-emerald-50 text-emerald-800 px-1 py-0.2 rounded font-bold border border-emerald-250">Verified</span></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-800">Delhi South Center</td>
                    <td className="p-2 font-mono">600</td>
                    <td className="p-2 font-mono">520</td>
                    <td className="p-2 font-mono text-amber-800">86.6%</td>
                    <td className="p-2"><span className="text-[8px] bg-amber-50 text-amber-800 px-1 py-0.2 rounded font-bold border border-amber-250">Pending</span></td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-800">Mumbai Central Unit</td>
                    <td className="p-2 font-mono">800</td>
                    <td className="p-2 font-mono">760</td>
                    <td className="p-2 font-mono text-emerald-800">95.0%</td>
                    <td className="p-2"><span className="text-[8px] bg-emerald-50 text-emerald-800 px-1 py-0.2 rounded font-bold border border-emerald-250">Verified</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Video Player */}
          {selectedFile.type === 'mp4' && (
            <div className="max-w-2xl mx-auto space-y-3">
              <div className="aspect-video w-full rounded-xl overflow-hidden border shadow bg-black relative flex items-center justify-center">
                <p className="text-white text-xs font-bold font-sans">
                  [Interactive HTML5 Video Player Canvas]
                </p>
                {/* Mock Play Overlay Controls bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center text-white text-[10px] font-bold font-sans select-none">
                  <div className="flex items-center gap-3">
                    <button className="hover:text-emerald-400" onClick={() => alert('Video Play/Pause')}>▶ Play</button>
                    <span>0:00 / 2:40</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Speed: 1.0x</span>
                    <span>🔊 100%</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold italic text-center">Video lecture content: Orientation for regional ISS field probationers.</p>
            </div>
          )}

          {/* Text/Document Editor */}
          {selectedFile.type === 'txt' && (
            <div className="bg-white border rounded-xl shadow p-5 max-w-2xl mx-auto space-y-3 text-xs text-slate-700 leading-relaxed font-semibold">
              <p className="text-slate-400 font-bold border-b pb-2">Institutional Text guidelines v{selectedFile.version}</p>
              <textarea 
                readOnly
                value="[GUIDELINE MEMORANDUM]\n\nAll institutional surveys are requested to match participant goals dynamically.\nAudit controls are verified on central servers.\nNo third-party cookies or scripts may be used inside governmental intranets."
                className="w-full h-36 font-mono text-[10.5px] p-3 border rounded-lg bg-slate-50 text-slate-650"
              />
            </div>
          )}

          {/* Images previewer */}
          {['png', 'jpg', 'jpeg', 'gif'].includes(selectedFile.type) && (
            <div className="bg-white border rounded-xl shadow p-5 max-w-2xl mx-auto text-xs font-semibold text-slate-700 space-y-4">
              <div className="flex justify-between items-center border-b border-gray-155 pb-2">
                <span className="text-slate-400 font-bold">Image Preview Screen</span>
                <div className="flex gap-2">
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => setImgZoom(prev => Math.min(200, prev + 25))}>Zoom +</button>
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => setImgZoom(prev => Math.max(50, prev - 25))}>Zoom -</button>
                  <button className="px-2 py-0.5 border rounded hover:bg-slate-50 font-bold" onClick={() => setImgRotate(prev => prev + 90)}>Rotate ↻</button>
                </div>
              </div>
              
              {/* Picture area */}
              <div className="h-60 bg-slate-50 rounded-lg flex items-center justify-center overflow-hidden border">
                <div 
                  className="w-32 h-32 bg-[#0b352e] text-white flex items-center justify-center font-bold text-center rounded-xl transition-all duration-200"
                  style={{
                    transform: `scale(${imgZoom / 100}) rotate(${imgRotate}deg)`
                  }}
                >
                  🖼️ {selectedFile.name.substring(0, 12)}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 font-semibold italic text-center">Zoom Level: {imgZoom}% • Rotation: {imgRotate}° • Captions: Institutional Reference Blueprint.</p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-gray-150 flex justify-between items-center text-xs font-bold text-slate-500 shrink-0 text-left">
          <div className="space-y-0.5">
            <p>Views: {fileViews} • Downloads: {fileDownloads} • Average Viewing Time: 4.5m</p>
            <p className="text-[10px] font-medium text-slate-400">Created By: {selectedFile.createdBy} on {selectedFile.metadata?.creationDate || '2026-05-01'}</p>
          </div>
          
          <button 
            onClick={() => onDownload(selectedFile)}
            className="px-4 py-2 bg-[#0b352e] hover:bg-[#07241f] text-white font-extrabold rounded-lg shadow-sm cursor-pointer"
          >
            Download Document
          </button>
        </div>
      </div>
    </div>
  );
}
