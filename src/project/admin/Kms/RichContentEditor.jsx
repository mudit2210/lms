import React from 'react';

export default function RichContentEditor({
  activeTopic,
  editingTopicContent,
  setEditingTopicContent,
  activeRole,
  handleSaveTopicContent
}) {
  const canEdit = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  if (!activeTopic) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-150 text-slate-450 italic text-center text-xs">
        Select a nested topic from the syllabus outlined list on the left to read or edit its rich classroom content
      </div>
    );
  }

  // Predefined simulated layout blocks for academic composing speed
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
    }
    setEditingTopicContent(prev => prev + contentSnippet);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700">
      
      {/* Header Info */}
      <div className="flex justify-between items-center border-b pb-3.5">
        <div>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase">
            Active Page Editor Canvas
          </span>
          <h3 className="text-base font-black text-slate-800 mt-1">{activeTopic.title}</h3>
        </div>
        {canEdit && (
          <button
            onClick={() => handleSaveTopicContent(activeTopic.id, editingTopicContent)}
            className="px-4 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold rounded-lg shadow-2xs cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            Save Changes (✓)
          </button>
        )}
      </div>

      {/* WYSIWYG Editing Area */}
      {canEdit ? (
        <div className="space-y-3">
          
          {/* Format Control Toolbar */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-slate-50 border rounded-lg">
            {['Bold', 'Italic', 'Underline', 'Heading 1', 'Heading 2', 'Bullet List'].map(cmd => (
              <button
                key={cmd}
                type="button"
                onClick={() => setEditingTopicContent(prev => prev + ` **[${cmd}]**`)}
                className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-slate-600 transition-all cursor-pointer"
              >
                {cmd}
              </button>
            ))}
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={() => handleInsertLayout('code')}
              className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-blue-700 cursor-pointer"
            >
              Insert Code Block
            </button>
            <button
              type="button"
              onClick={() => handleInsertLayout('gov')}
              className="px-2 py-1 hover:bg-white border hover:border-gray-300 rounded font-bold text-[10px] text-emerald-700 cursor-pointer"
            >
              GovStandard Layout
            </button>
          </div>

          <textarea
            value={editingTopicContent}
            onChange={(e) => setEditingTopicContent(e.target.value)}
            placeholder="Compose training manuals or enter lesson markdown guidelines here..."
            className="w-full h-56 border border-gray-300 rounded-xl p-4 font-mono text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-1 focus:ring-[#08493d] focus:border-transparent transition-all leading-relaxed"
          />

        </div>
      ) : (
        <div className="p-4 bg-slate-50 border rounded-xl text-slate-500 font-medium italic">
          You are currently in learner scope. Editing and save actions are gated for admins and trainers.
        </div>
      )}

      {/* Live rendered Syllabus Preview Canvas */}
      <div className="space-y-2 border-t pt-4">
        <h4 className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Syllabus Page Preview</h4>
        <div className="bg-slate-50/50 p-5 rounded-xl border border-gray-150 min-h-24 space-y-4 text-slate-700 font-normal leading-relaxed">
          {activeTopic.content ? (
            <div className="space-y-3 font-medium">
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
                    <pre key={pIdx} className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-850 shadow-inner">
                      {paragraph.replace(/```python\n|```/g, '')}
                    </pre>
                  );
                }
                return <p key={pIdx}>{paragraph}</p>;
              })}
            </div>
          ) : (
            <span className="text-slate-400 italic">No syllabus content authored yet. Use the editor workspace canvas above.</span>
          )}

          {/* Attachments Section inside Topic */}
          {activeTopic.attachments && activeTopic.attachments.length > 0 && (
            <div className="pt-4 border-t border-gray-200/50 space-y-2 select-none">
              <h5 className="text-[9.5px] font-extrabold text-[#08493d] uppercase tracking-wider">Syllabus Inline Reference Media</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeTopic.attachments.map(att => (
                  <div key={att.id} className="flex justify-between items-center bg-white p-2 border border-gray-200 rounded-lg shadow-2xs">
                    <div className="flex items-center gap-1.5 truncate">
                      <span>{att.type === 'pdf' ? '📕' : att.type === 'mp4' ? '🎬' : '📙'}</span>
                      <span className="font-bold text-slate-800 text-[10px] truncate">{att.name}</span>
                    </div>
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1 rounded uppercase shrink-0">{att.type}</span>
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
