import React, { useState } from 'react';

export default function RichContentEditor({
  activeTopic,
  editingTopicContent,
  setEditingTopicContent,
  activeRole,
  handleSaveTopicContent
}) {
  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  // local states for attaching files/images/videos dynamically
  const [attName, setAttName] = useState('');
  const [attType, setAttType] = useState('pdf');
  
  // Image properties
  const [imgUrl, setImgUrl] = useState('https://images.unsplash.com/photo-1457369804613-52c61a468e7d');
  const [imgWidth, setImgWidth] = useState(250);
  const [imgCaption, setImgCaption] = useState('Sustainable Indicators Dashboard Outline');

  // Video properties
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [videoProvider, setVideoProvider] = useState('youtube');

  // local attachments array synchronized with activeTopic
  const [localAttachments, setLocalAttachments] = useState(activeTopic?.attachments || []);

  React.useEffect(() => {
    if (activeTopic) {
      setLocalAttachments(activeTopic.attachments || []);
    }
  }, [activeTopic]);

  if (!activeTopic) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-150 text-slate-450 italic text-center text-xs shadow-2xs font-semibold">
        Select a nested topic from the syllabus outlined list on the left to read or edit its rich classroom content
      </div>
    );
  }

  const handleInsertLayout = (type) => {
    let contentSnippet = '';
    if (type === 'gov') {
      contentSnippet = `\n\n> ### 🏛️ MoSPI Compliance Framework
> * **Standard Code**: GTMS-MoSPI-2026-NIF
> * **Audit Status**: Quality Approved Draft
> * **Regulatory Mandate**: Section 3(b) official national statistical outline parameters.`;
    } else if (type === 'code') {
      contentSnippet = `\n\n\`\`\`python
# Official National Indicator Framework Formula
def calculate_sustainable_index(indicators):
    return sum(indicators) / len(indicators)
\`\`\``;
    } else if (type === 'table') {
      contentSnippet = `\n\n| Indicator Unit | Target Code | 2026 Goal |\n| :--- | :--- | :--- |\n| Sustainable Dev | SDG-01 | 98.4% |\n| Poverty Ratio | POV-12 | < 5.0% |`;
    } else if (type === 'quote') {
      contentSnippet = `\n\n> "Official indicators represent the core benchmarks for structural economic evaluations." - MoSPI Survey Director`;
    }
    setEditingTopicContent(prev => prev + contentSnippet);
  };

  const handleAddAttachment = (e) => {
    e.preventDefault();
    if (!attName.trim()) return;
    const newAtt = {
      id: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: attName.trim(),
      type: attType
    };
    const updated = [...localAttachments, newAtt];
    setLocalAttachments(updated);
    activeTopic.attachments = updated; // dynamic reference update
    setAttName('');
    alert("Asset attachment successfully appended to topic outline!");
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-5 text-left font-semibold text-xs text-slate-700 select-none">
      
      {/* Header Info */}
      <div className="flex justify-between items-center border-b pb-3.5">
        <div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase">
            Topic Rich Editor Canvas
          </span>
          <h3 className="text-base font-black text-slate-800 mt-1">{activeTopic.title}</h3>
        </div>
        {canEdit && (
          <button
            onClick={() => {
              handleSaveTopicContent(activeTopic.id, editingTopicContent);
              activeTopic.attachments = localAttachments;
            }}
            className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-2xs cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            Save Changes (✓)
          </button>
        )}
      </div>

      {/* WYSIWYG Editing Area */}
      {canEdit ? (
        <div className="space-y-4">
          
          {/* Format Control Toolbar */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-50 border rounded-lg">
            {['Bold', 'Italic', 'Underline', 'Heading 1', 'Heading 2', 'Bullet List'].map(cmd => (
              <button
                key={cmd}
                type="button"
                onClick={() => setEditingTopicContent(prev => prev + ` **[${cmd}]**`)}
                className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-slate-650 transition-all cursor-pointer"
              >
                {cmd}
              </button>
            ))}
            <span className="text-slate-350">|</span>
            <button
              type="button"
              onClick={() => handleInsertLayout('code')}
              className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-blue-700 cursor-pointer"
            >
              Code Block
            </button>
            <button
              type="button"
              onClick={() => handleInsertLayout('gov')}
              className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-emerald-700 cursor-pointer"
            >
              GovStandard
            </button>
            <button
              type="button"
              onClick={() => handleInsertLayout('table')}
              className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-slate-700 cursor-pointer"
            >
              Table
            </button>
            <button
              type="button"
              onClick={() => handleInsertLayout('quote')}
              className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-slate-700 cursor-pointer"
            >
              Block Quote
            </button>
          </div>

          <textarea
            value={editingTopicContent}
            onChange={(e) => setEditingTopicContent(e.target.value)}
            placeholder="Compose training manuals or enter lesson markdown guidelines here..."
            className="w-full h-44 border border-gray-300 rounded-xl p-4 font-mono text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-[#08493d] focus:border-transparent transition-all leading-relaxed"
          />

          {/* Attachments & Layout Composers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            
            {/* A. Attachments uploader */}
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <h4 className="text-[10px] text-[#08493d] font-black uppercase tracking-wider">A. Reference Asset Attachments</h4>
              <form onSubmit={handleAddAttachment} className="space-y-2.5">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">Asset Name:</label>
                  <input 
                    type="text" 
                    value={attName}
                    onChange={e => setAttName(e.target.value)}
                    placeholder="e.g. Statistical Syllabus Manual.pdf"
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 bg-white font-semibold text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase">Asset Format Type:</label>
                  <select 
                    value={attType}
                    onChange={e => setAttType(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2.5 py-1.5 bg-white font-bold text-slate-800"
                  >
                    <option value="pdf">Document PDF</option>
                    <option value="ppt">PowerPoint PPT</option>
                    <option value="docx">Microsoft Word DOC</option>
                    <option value="mp4">Lecture Video MP4</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full py-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded font-extrabold text-[10.5px] cursor-pointer"
                >
                  + Add File Attachment
                </button>
              </form>
            </div>

            {/* B. Multimedia embed options */}
            <div className="bg-slate-50 p-4 rounded-xl border border-gray-200 space-y-3">
              <h4 className="text-[10px] text-[#08493d] font-black uppercase tracking-wider">B. Image & Video Embeds</h4>
              
              <div className="space-y-2.5">
                {/* Image controls */}
                <div className="space-y-1.5 p-2 bg-white rounded border">
                  <div className="flex justify-between items-center text-[9px] text-slate-450 uppercase font-extrabold">
                    <span>Embedded Image Size Slider:</span>
                    <span>{imgWidth}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="150" 
                    max="450" 
                    value={imgWidth}
                    onChange={e => setImgWidth(Number(e.target.value))}
                    className="w-full cursor-pointer accent-[#08493d]"
                  />
                  <input 
                    type="text" 
                    value={imgCaption}
                    onChange={e => setImgCaption(e.target.value)}
                    placeholder="Image Caption"
                    className="w-full text-[9.5px] border rounded px-2 py-0.5 mt-1 font-semibold text-slate-800"
                  />
                </div>

                {/* Video controls */}
                <div className="space-y-1 p-2 bg-white rounded border">
                  <label className="text-[9px] text-slate-400 font-extrabold uppercase block">YouTube Video Embed Link:</label>
                  <input 
                    type="text" 
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    className="w-full text-[9.5px] border rounded px-2 py-0.5 font-semibold text-slate-800"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="p-4 bg-slate-50 border rounded-xl text-slate-500 font-medium italic">
          You are currently in learner scope. Editing and save actions are gated for admins and trainers.
        </div>
      )}

      {/* Live Rendered Content Layout */}
      <div className="space-y-2 border-t pt-4">
        <h4 className="text-[10.5px] text-slate-400 font-extrabold uppercase tracking-wider">Topic Content Layout (Preview)</h4>
        
        <div className="bg-slate-50/50 p-5 rounded-2xl border border-gray-150 min-h-24 space-y-5 text-slate-700 font-normal leading-relaxed">
          
          {/* 1. Rich Text Content */}
          {activeTopic.content ? (
            <div className="space-y-3 font-medium text-[11px] sm:text-xs">
              {activeTopic.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('> ')) {
                  return (
                    <blockquote key={pIdx} className="border-l-4 border-emerald-600 pl-4 py-1.5 bg-emerald-50/20 text-slate-650 italic rounded-r font-medium">
                      {paragraph.replace('> ', '')}
                    </blockquote>
                  );
                }
                if (paragraph.startsWith('```')) {
                  return (
                    <pre key={pIdx} className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[10.5px] overflow-x-auto leading-relaxed border border-slate-850 shadow-inner">
                      {paragraph.replace(/```python\n|```/g, '')}
                    </pre>
                  );
                }
                if (paragraph.includes('|')) {
                  // Render a table
                  const rows = paragraph.trim().split('\n');
                  return (
                    <div key={pIdx} className="overflow-x-auto border rounded-xl shadow-3xs bg-white">
                      <table className="w-full border-collapse text-[10.5px]">
                        <tbody>
                          {rows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx === 0 ? 'bg-slate-50 border-b font-black text-slate-800' : 'border-b hover:bg-slate-50/50'}>
                              {row.split('|').filter(c => c.trim() !== '').map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 border-r">{cell.trim()}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return <p key={pIdx}>{paragraph}</p>;
              })}
            </div>
          ) : (
            <span className="text-slate-400 italic">No syllabus content authored yet. Use the editor workspace canvas above.</span>
          )}

          {/* 2. Embedded Image Layout */}
          {imgUrl && (
            <div className="space-y-1.5 flex flex-col items-center">
              <img 
                src={imgUrl} 
                alt="Topic Graphic Layout"
                className="rounded-xl border shadow-xs object-cover transition-all"
                style={{ width: `${imgWidth}px` }}
              />
              {imgCaption && (
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{imgCaption}</p>
              )}
            </div>
          )}

          {/* 3. Embedded Video Layout */}
          {videoUrl && (
            <div className="max-w-md mx-auto space-y-1 flex flex-col items-center">
              <div className="w-full aspect-video rounded-xl overflow-hidden border shadow bg-black">
                <iframe 
                  src={videoUrl} 
                  title="Lecture Video Embed"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <p className="text-[9.5px] text-slate-400 font-semibold italic">Embedded Classroom Lecture Resource</p>
            </div>
          )}

          {/* 4. PDF Attachment / Download Resources */}
          {localAttachments.length > 0 && (
            <div className="pt-4 border-t border-gray-200/50 space-y-2 select-none">
              <h5 className="text-[9.5px] font-extrabold text-[#08493d] uppercase tracking-wider">Attached Syllabus Resources (Downloadable)</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {localAttachments.map(att => (
                  <div key={att.id} className="flex justify-between items-center bg-white p-2.5 border border-gray-200 rounded-lg shadow-3xs">
                    <div className="flex items-center gap-2 truncate">
                      <span>{att.type === 'pdf' ? '📕' : att.type === 'mp4' ? '🎬' : '📙'}</span>
                      <span className="font-bold text-slate-800 text-[10.5px] truncate">{att.name}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Simulated attachment download for: ${att.name}`)}
                      className="px-2 py-0.5 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded text-[8.5px] uppercase shrink-0"
                    >
                      Download (↓)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
