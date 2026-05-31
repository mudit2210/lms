import React, { useState, useEffect } from 'react';

// Seeding default courses hierarchy
const DEFAULT_COURSES = [
  {
    id: 'CRS-001',
    name: 'National Accounts Statistics & GDP Estimations',
    lessons: [
      {
        id: 'LES-101',
        title: 'Introduction to National GDP Calculations',
        topics: [
          { id: 'TOP-201', title: 'GDP Output vs Income Method', type: 'text', content: 'Statistical guidelines on compiling GDP indices across macro industries.' },
          { id: 'TOP-202', title: 'NIF SDG indicator manual', type: 'pdf', content: 'Handbook on National Indicator Framework (NIF) for SDGs.pdf' }
        ]
      }
    ]
  },
  {
    id: 'CRS-002',
    name: 'Time Series & Forecasting Applied Practicum',
    lessons: [
      {
        id: 'LES-102',
        title: 'Seasonal Regression Models',
        topics: [
          { id: 'TOP-203', title: 'X-13ARIMA structural methods', type: 'video', content: 'ARIMA_Seasonal_Syllabus.mp4' }
        ]
      }
    ]
  }
];

const DEFAULT_ASSETS = [
  { id: 'AST-501', title: 'ISS Probationers Syllabus manual.pdf', type: 'PDF Document', size: '4.2 MB', date: '2026-05-15', tags: 'ISS, Induction' },
  { id: 'AST-502', title: 'Regression forecasting practicum slides.ppt', type: 'PPT Slide', size: '8.5 MB', date: '2026-05-20', tags: 'Regression, Practicum' },
  { id: 'AST-503', title: 'GDP compilation methodology.mp4', type: 'Video Lecture', size: '45 MB', date: '2026-05-28', tags: 'GDP, NAS' }
];

const DEFAULT_VERSIONS = [
  { id: 'VER-001', author: 'Dr. Ramesh Kumar', date: '2026-06-01 10:30 AM', note: 'Modified lesson 1 topics: Added GDP Output GDP formulas.', file: 'GDP Estimations V2' },
  { id: 'VER-002', author: 'Prof. Ananya Sen', date: '2026-06-01 02:45 PM', note: 'Corrected X-13ARIMA slide indices.', file: 'ARIMA Syllabus V1.2' }
];

export default function CMSModule({ theme }) {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lms_courses');
    return saved ? JSON.parse(saved) : DEFAULT_COURSES;
  });

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem('lms_assets');
    return saved ? JSON.parse(saved) : DEFAULT_ASSETS;
  });

  const [versions, setVersions] = useState(() => {
    const saved = localStorage.getItem('lms_versions');
    return saved ? JSON.parse(saved) : DEFAULT_VERSIONS;
  });

  useEffect(() => {
    localStorage.setItem('lms_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('lms_assets', JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    localStorage.setItem('lms_versions', JSON.stringify(versions));
  }, [versions]);

  // Read latest programs on mount to sync dynamic courses list
  useEffect(() => {
    const savedPrograms = localStorage.getItem('lms_programs');
    if (savedPrograms) {
      const programsList = JSON.parse(savedPrograms);
      setCourses(prevCourses => {
        const updated = [...prevCourses];
        programsList.forEach(prog => {
          if (!updated.some(c => c.name === prog.name)) {
            updated.push({
              id: `CRS-${Math.floor(100 + Math.random() * 900)}`,
              name: prog.name,
              lessons: []
            });
          }
        });
        return updated;
      });
    }
  }, []);

  const [activeTab, setActiveTab] = useState('tree'); // tree, upload, version_control
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [selectedLessonId, setSelectedLessonId] = useState('');
  
  // Creation States
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newTopic, setNewTopic] = useState({ title: '', type: 'text', content: '' });
  
  const [newAsset, setNewAsset] = useState({ title: '', type: 'PDF Document', size: '2.5 MB', tags: '' });
  const [newVersion, setNewVersion] = useState({ note: '', file: '' });

  const handleCreateLesson = (e) => {
    e.preventDefault();
    if (!newLessonTitle || !selectedCourseId) return;
    setCourses(courses.map(crs => {
      if (crs.id !== selectedCourseId) return crs;
      return {
        ...crs,
        lessons: [
          ...crs.lessons,
          {
            id: `LES-${Math.floor(100 + Math.random() * 900)}`,
            title: newLessonTitle,
            topics: []
          }
        ]
      };
    }));
    setNewLessonTitle('');
    alert('Lesson added to active Course.');
  };

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTopic.title || !selectedCourseId || !selectedLessonId) return;
    setCourses(courses.map(crs => {
      if (crs.id !== selectedCourseId) return crs;
      return {
        ...crs,
        lessons: crs.lessons.map(les => {
          if (les.id !== selectedLessonId) return les;
          return {
            ...les,
            topics: [
              ...les.topics,
              {
                id: `TOP-${Math.floor(100 + Math.random() * 900)}`,
                ...newTopic
              }
            ]
          };
        })
      };
    }));
    setNewTopic({ title: '', type: 'text', content: '' });
    alert('Topic element mapped successfully.');
  };

  const handleUploadAsset = (e) => {
    e.preventDefault();
    if (!newAsset.title) return;
    const added = {
      id: `AST-${Math.floor(100 + Math.random() * 900)}`,
      ...newAsset,
      date: '2026-06-01'
    };
    setAssets([...assets, added]);
    alert('Success! Content asset securely uploaded to LCMS storage drive.');
    setNewAsset({ title: '', type: 'PDF Document', size: '2.5 MB', tags: '' });
  };

  const handleCommitVersion = (e) => {
    e.preventDefault();
    if (!newVersion.note || !newVersion.file) return;
    const added = {
      id: `VER-${Math.floor(100 + Math.random() * 900)}`,
      author: 'Admin Administrator',
      date: '2026-06-01 04:00 PM',
      ...newVersion
    };
    setVersions([added, ...versions]);
    alert('Success! System checkpoint committed to version queue.');
    setNewVersion({ note: '', file: '' });
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="space-y-6 text-left animate-fadeIn">
      {/* Header Panel */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
            📚 MoSPI Content & Syllabus LCMS Workspace
          </h2>
          <p className="text-xs text-slate-450 font-semibold mt-1">Design academic course outlines, upload instructional media files, and manage version history logs.</p>
        </div>
      </div>

      {/* Subtabs Menu */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3 font-sans">
        {[
          { id: 'tree', label: '🌳 Curriculum outline' },
          { id: 'upload', label: '📁 Media asset uploads' },
          { id: 'version_control', label: '🛡️ Version Control Ledger' }
        ].map(sub => (
          <button
            key={sub.id}
            onClick={() => setActiveTab(sub.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === sub.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white border border-gray-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Curriculum outline tab */}
      {activeTab === 'tree' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Courses List Selector */}
          <div className="bg-white border p-4 rounded-2xl shadow-xs space-y-3">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Central LCMS Syllabus Courses</h4>
            <div className="space-y-2">
              {courses.map(crs => (
                <button
                  key={crs.id}
                  onClick={() => {
                    setSelectedCourseId(crs.id);
                    setSelectedLessonId(crs.lessons?.[0]?.id || '');
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selectedCourseId === crs.id ? 'border-emerald-500 bg-emerald-50/20 text-emerald-800' : 'border-slate-100 hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <p className="font-extrabold">{crs.name}</p>
                  <p className="text-[10px] text-slate-450 mt-1 font-medium">{crs.lessons?.length || 0} Syllabus Lessons</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Lesson and Topic builders */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-5">
            {selectedCourse ? (
              <>
                <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">Course Structure Builder: {selectedCourse.name}</h4>
                    <p className="text-[11px] text-slate-455">Add interactive chapters, attachments, and learning topics.</p>
                  </div>
                </div>

                {/* Chapters and topic listings */}
                <div className="space-y-4 font-semibold text-slate-655 text-xs">
                  {selectedCourse.lessons?.length === 0 ? (
                    <p className="text-xs text-slate-400 italic text-center py-4">No lessons added to this course yet. Use the quick additions form below.</p>
                  ) : (
                    selectedCourse.lessons.map(les => (
                      <div key={les.id} className="border border-slate-100 p-4 rounded-xl space-y-2 relative bg-slate-50/15 hover:border-emerald-400/40">
                        <div className="flex justify-between items-center border-b pb-1.5 border-slate-100">
                          <span className="font-extrabold text-slate-800 text-xs">📖 Lesson: {les.title}</span>
                          <button
                            onClick={() => setSelectedLessonId(les.id)}
                            className={`px-2 py-0.5 rounded text-[9px] font-black border uppercase transition-all cursor-pointer ${
                              selectedLessonId === les.id ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            Selected
                          </button>
                        </div>
                        {les.topics?.length === 0 ? (
                          <p className="text-[10px] text-slate-400 italic">No topics mapped to this chapter.</p>
                        ) : (
                          <div className="space-y-1.5 pt-1.5 pl-3 border-l border-emerald-200/50">
                            {les.topics.map(top => (
                              <div key={top.id} className="flex justify-between items-center text-[11px]">
                                <div>
                                  <p className="font-extrabold text-slate-850">➔ {top.title}</p>
                                  <p className="text-[10px] text-slate-450 italic">Content: "{top.content}"</p>
                                </div>
                                <span className="bg-slate-100 border px-1.5 py-0.2 rounded text-[8.5px] font-black text-slate-500 uppercase">{top.type}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Forms grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 border-slate-100">
                  {/* Create Lesson */}
                  <form onSubmit={handleCreateLesson} className="space-y-2 border-r pr-4 border-slate-150">
                    <h5 className="font-extrabold text-slate-800 text-xs">Create New Syllabus Lesson</h5>
                    <div className="space-y-1.5 text-xs">
                      <input
                        type="text" required placeholder="e.g. Chapter 1: Regressions basics..."
                        value={newLessonTitle} onChange={e => setNewLessonTitle(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                      <button type="submit" className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-center cursor-pointer">
                        Add Lesson Chapter
                      </button>
                    </div>
                  </form>

                  {/* Create Topic */}
                  <form onSubmit={handleCreateTopic} className="space-y-2">
                    <h5 className="font-extrabold text-slate-800 text-xs">Add Topic to Selected Lesson</h5>
                    <div className="space-y-1.5 text-xs font-semibold">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text" required placeholder="Topic Title..."
                          value={newTopic.title} onChange={e => setNewTopic({ ...newTopic, title: e.target.value })}
                          className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                        />
                        <select
                          value={newTopic.type} onChange={e => setNewTopic({ ...newTopic, type: e.target.value })}
                          className="w-full bg-white border border-gray-300 rounded-lg px-2 py-1 focus:outline-none font-medium"
                        >
                          <option value="text">Text Node</option>
                          <option value="pdf">PDF Document</option>
                          <option value="video">Video lecture</option>
                          <option value="ppt">PPT Slide</option>
                        </select>
                      </div>
                      <input
                        type="text" required placeholder="Asset filename or content snippet..."
                        value={newTopic.content} onChange={e => setNewTopic({ ...newTopic, content: e.target.value })}
                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
                      />
                      <button type="submit" disabled={!selectedLessonId} className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-center cursor-pointer disabled:opacity-50">
                        Map Topic Element
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-12">Please select an academic course from the registry sidebar to load syllabus nodes.</p>
            )}
          </div>
        </div>
      )}

      {/* Media asset uploads tab */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload media form */}
          <div className="bg-white p-5 border rounded-2xl shadow-xs space-y-4 text-xs font-semibold">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Upload Asset to central drive</h4>
            <form onSubmit={handleUploadAsset} className="space-y-3 text-slate-655">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Asset Title Filename</label>
                <input
                  type="text" required placeholder="e.g. GDP_regression_equations.pdf..."
                  value={newAsset.title} onChange={e => setNewAsset({ ...newAsset, title: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">Document Format</label>
                  <select
                    value={newAsset.type} onChange={e => setNewAsset({ ...newAsset, type: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none"
                  >
                    <option value="PDF Document">PDF Document</option>
                    <option value="PPT Slide">PPT Slide</option>
                    <option value="Video Lecture">Video Lecture</option>
                    <option value="Case Study">Case Study Packet</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-black text-slate-455 uppercase">File Weight size</label>
                  <input
                    type="text" required placeholder="e.g. 5.6 MB"
                    value={newAsset.size} onChange={e => setNewAsset({ ...newAsset, size: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Metadata Tags</label>
                <input
                  type="text" placeholder="e.g. Econometrics, ISS-46..."
                  value={newAsset.tags} onChange={e => setNewAsset({ ...newAsset, tags: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button type="submit" className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-center cursor-pointer transition-colors">
                Upload File to Vault ➔
              </button>
            </form>
          </div>

          {/* Drive directory list */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Central LCMS Document Drive</h4>
            <div className="space-y-3 font-semibold text-slate-655 text-xs">
              {assets.map(ast => (
                <div key={ast.id} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-3xs relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-emerald-500"></div>
                  <div>
                    <h5 className="font-extrabold text-slate-850">{ast.title}</h5>
                    <p className="text-[10px] text-slate-450 mt-0.5">Format: <span className="font-bold">{ast.type}</span> | Weight: {ast.size} | Upload Date: {ast.date}</p>
                    <span className="text-[9px] bg-slate-100 px-2 py-0.5 border text-slate-600 rounded font-black mt-2 inline-block">Tags: {ast.tags}</span>
                  </div>
                  <button
                    onClick={() => setAssets(assets.filter(a => a.id !== ast.id))}
                    className="text-red-500 hover:text-red-700 font-extrabold cursor-pointer"
                  >
                    Delete File
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Version Control Ledger tab */}
      {activeTab === 'version_control' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Commit form */}
          <div className="bg-white p-5 border rounded-2xl shadow-xs space-y-4 text-xs font-semibold">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Commit System Checkpoint</h4>
            <form onSubmit={handleCommitVersion} className="space-y-3 text-slate-655">
              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Target Syllabus Package</label>
                <input
                  type="text" required placeholder="e.g. GDP Estimations V2..."
                  value={newVersion.file} onChange={e => setNewVersion({ ...newVersion, file: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-black text-slate-455 uppercase">Commit Description Note</label>
                <textarea
                  required placeholder="Describe specific revisions completed in syllabus text..."
                  value={newVersion.note} onChange={e => setNewVersion({ ...newVersion, note: e.target.value })}
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none h-20"
                />
              </div>

              <button type="submit" className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg text-center cursor-pointer transition-colors">
                Commit Checkpoint ➔
              </button>
            </form>
          </div>

          {/* Audit trail ledger */}
          <div className="md:col-span-2 bg-white border p-5 rounded-2xl shadow-xs space-y-4">
            <h4 className="font-extrabold text-slate-800 text-xs border-b pb-2">Version control & audits ledger</h4>
            <div className="space-y-3 text-xs font-semibold text-slate-655">
              {versions.map(ver => (
                <div key={ver.id} className="p-4 border rounded-xl flex justify-between items-center hover:shadow-3xs relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-slate-500"></div>
                  <div>
                    <h5 className="font-extrabold text-slate-850">Commit {ver.id} ➔ {ver.file}</h5>
                    <p className="text-[10px] text-slate-450 mt-0.5">Committed by: <span className="font-bold text-slate-700">{ver.author}</span> | Timestamp: {ver.date}</p>
                    <p className="text-[11px] text-slate-600 mt-2 font-medium italic">Revision notes: "{ver.note}"</p>
                  </div>
                  <button
                    onClick={() => alert(`Reverting central LCMS packages to state ${ver.id}... Rollback successful.`)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 border text-slate-700 font-extrabold text-[10px] rounded-lg cursor-pointer transition-all shrink-0"
                  >
                    Rollback
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
