import React from 'react';

export default function MetadataDetailModal({ showMetadataDrawer, onClose }) {
  if (!showMetadataDrawer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative animate-fadeIn mx-4 flex flex-col max-h-[85vh]">
        
        <div className="bg-[#0b352e] text-white p-5 flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-extrabold text-sm sm:text-base uppercase tracking-wider">Classification Metadata</h3>
            <p className="text-[9.5px] text-emerald-400 font-medium">{showMetadataDrawer.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs font-semibold text-slate-650">
          
          {/* Basic metadata */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-[#08493d] uppercase tracking-wider">1. Basic Metadata</h4>
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 border rounded-lg">
              <p><strong>Title:</strong> {showMetadataDrawer.name}</p>
              <p><strong>Author:</strong> {showMetadataDrawer.metadata.author}</p>
              <p><strong>Publisher:</strong> {showMetadataDrawer.metadata.publisher}</p>
              <p><strong>Date Added:</strong> {showMetadataDrawer.metadata.creationDate}</p>
            </div>
          </div>

          {/* Learning metadata */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-[#08493d] uppercase tracking-wider">2. Learning Taxonomy</h4>
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 border rounded-lg">
              <p><strong>Syllabus Course:</strong> {showMetadataDrawer.metadata.course}</p>
              <p><strong>Lesson Node:</strong> {showMetadataDrawer.metadata.lesson}</p>
              <p><strong>Topic Node:</strong> {showMetadataDrawer.metadata.topic}</p>
              <p><strong>Difficulty Level:</strong> {showMetadataDrawer.metadata.difficulty}</p>
            </div>
          </div>

          {/* Business metadata */}
          <div className="space-y-1.5">
            <h4 className="text-[10px] font-bold text-[#08493d] uppercase tracking-wider">3. Business Metadata</h4>
            <div className="grid grid-cols-2 gap-2 p-2 bg-slate-50 border rounded-lg">
              <p><strong>Department:</strong> {showMetadataDrawer.metadata.department}</p>
              <p><strong>Division Wing:</strong> {showMetadataDrawer.metadata.division}</p>
              <p><strong>Syllabus Program:</strong> {showMetadataDrawer.metadata.program}</p>
              <p><strong>Category Type:</strong> {showMetadataDrawer.metadata.category}</p>
            </div>
          </div>

        </div>

        <div className="bg-slate-50 p-4 border-t border-gray-150 text-center shrink-0">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-[#0b352e] text-white font-extrabold rounded-lg text-xs"
          >
            Close Metadata Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
