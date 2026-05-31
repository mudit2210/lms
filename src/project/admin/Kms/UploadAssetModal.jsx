import React, { useState } from 'react';

export default function UploadAssetModal({ 
  showUploadModal, 
  onClose, 
  onUploadSubmit, 
  isUploading, 
  uploadProgress, 
  uploadSuccess, 
  setUploadSuccess
}) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'pdf',
    description: '',
    tagsString: '',
    author: 'NSSTA Advisor',
    course: '',
    difficulty: 'Intermediate',
    category: 'SOP',
    department: 'Statistics & Surveys'
  });

  if (!showUploadModal) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUploadSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4 flex flex-col max-h-[85vh]">
        
        <div className="bg-blue-900 text-white p-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Upload Asset & Classify Metadata</h3>
            <p className="text-[9.5px] text-blue-200 font-medium">LMS Central repository drive</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {uploadSuccess ? (
          <div className="p-8 text-center space-y-4 font-semibold text-xs text-slate-650 animate-fadeIn">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-150 text-lg font-bold">
              ✓
            </div>
            <h4 className="font-extrabold text-slate-800 text-sm">Asset Successfully Processed!</h4>
            <p className="leading-relaxed">
              Malware/threat scans checks completed 100% clean. The document was logged in draft state and is waiting for Reviewer/Supervisor quality approvals.
            </p>
            <button 
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg text-xs cursor-pointer inline-block"
            >
              Return to Drive
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs font-semibold text-slate-600">
            
            {isUploading ? (
              <div className="py-12 text-center space-y-3.5 animate-fadeIn">
                <p className="font-extrabold text-slate-700">Uploading & Threat Scanning Process...</p>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden max-w-xs mx-auto">
                  <div className="bg-emerald-600 h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Scanning for GovThreatGuard integrity compliance...</span>
              </div>
            ) : (
              <>
                {/* Basic info */}
                <div className="space-y-3 border-b border-gray-100 pb-3">
                  <h4 className="text-[10px] font-extrabold text-[#08493d] uppercase tracking-wider">1. Basic Metadata Info</h4>
                  
                  <div className="space-y-1.5">
                    <label className="block text-slate-700">Document Asset Title:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sampling verification guidelines"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-slate-700">Asset File Format Type:</label>
                      <select
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 text-slate-800 bg-white"
                      >
                        <option value="pdf">Adobe PDF (.pdf)</option>
                        <option value="docx">Microsoft Word (.docx)</option>
                        <option value="xlsx">Excel Sheet (.xlsx)</option>
                        <option value="mp4">Video MP4 (.mp4)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-slate-700">Author Credit:</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-700">Short Description:</label>
                    <textarea
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      placeholder="Summarize this documents guidelines or survey purposes..."
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                {/* Taxonomy / Classification metadata */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-extrabold text-[#08493d] uppercase tracking-wider">2. Taxonomy & Metadata Details</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-slate-700">Category Classification:</label>
                      <select
                        value={formData.category}
                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:ring-2 focus:ring-blue-500 text-slate-800"
                      >
                        <option value="SOP">SOP Guide</option>
                        <option value="Course Material">Course Material</option>
                        <option value="Data Sheet">Data Sheet</option>
                        <option value="Video Lecture">Video Lecture</option>
                        <option value="Policy Document">IT / Security Policy</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-slate-700">Target Syllabus Course:</label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={e => setFormData({ ...formData, course: e.target.value })}
                        placeholder="e.g. Stratified Sampling Schemes"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-slate-700">Enter Search Tags (Comma Separated):</label>
                    <input
                      type="text"
                      value={formData.tagsString}
                      onChange={e => setFormData({ ...formData, tagsString: e.target.value })}
                      placeholder="e.g. SOP, Compliance, Finance"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 text-slate-800"
                    />
                    {/* Auto-tag suggestions badge button helpers */}
                    <div className="flex flex-wrap items-center gap-1 mt-1 text-[8.5px]">
                      <span className="text-slate-400 font-bold">Suggested AI keywords:</span>
                      {['SOP', 'Manual', 'GFR', 'Procurement', 'IT Policy', 'Sampling'].map(tag => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            const activeTags = formData.tagsString.split(',').map(s => s.trim()).filter(Boolean);
                            if (!activeTags.includes(tag)) {
                              setFormData({ ...formData, tagsString: [...activeTags, tag].join(', ') });
                            }
                          }}
                          className="px-1.5 py-0.2 bg-slate-50 border rounded font-bold text-slate-650 hover:bg-slate-100 cursor-pointer"
                        >
                          +{tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg text-xs shadow cursor-pointer text-center uppercase tracking-wider"
                >
                  Process Upload & Quarantine Check
                </button>
              </>
            )}

          </form>
        )}

        <div className="bg-slate-50 p-4 border-t border-gray-150 text-center shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="w-full py-2 border border-gray-300 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 cursor-pointer"
          >
            Cancel Upload Operation
          </button>
        </div>
      </div>
    </div>
  );
}
