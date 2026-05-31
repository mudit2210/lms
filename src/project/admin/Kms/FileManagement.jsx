import React, { useState } from 'react';

export default function FileManagement({
  activeRole,
  setShowUploadModal,
  onUploadSuccess,
  logAuditAction
}) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFile, setUploadingFile] = useState(null);

  const canUpload = ['Super Admin', 'Content Manager', 'Trainer'].includes(activeRole);

  const handleDrag = (e) => {
    e.preventDefault();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragOver(true);
    } else {
      setDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!canUpload) {
      alert("Unauthorized: You do not have permissions to upload files.");
      return;
    }
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      simulateUpload(files[0]);
    }
  };

  const simulateUpload = (file) => {
    // Validate size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Exceeded maximum size: File must be under 10 MB.");
      return;
    }

    setUploadingFile(file.name);
    setUploadProgress(10);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newFile = {
              id: 'file-' + Date.now(),
              name: file.name,
              type: file.name.split('.').pop().toLowerCase() || 'pdf',
              size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
              description: 'Manually uploaded statistical drive document.',
              version: 'v1.0',
              status: 'Quarantine', // Automatic threat check quarantine status
              createdBy: activeRole + ' Simulator',
              modifiedBy: activeRole + ' Simulator',
              tags: ['ManualUpload', 'Draft'],
              metadata: {
                creationDate: new Date().toISOString().substring(0, 10),
                complianceStandard: 'MoSPI-3.1.3-GTMS',
                securityLevel: 'Official Confidential'
              },
              versions: [
                { version: '1.0', date: new Date().toISOString().substring(0, 10), updatedBy: activeRole + ' Simulator', remarks: 'Initial manual upload.', size: (file.size / (1024 * 1024)).toFixed(1) + ' MB', contentSnippet: 'Verification and security check draft upload. Scanning complete.' }
              ]
            };
            onUploadSuccess(newFile);
            logAuditAction('Upload File', `Uploaded file ${file.name} to Central repository`);
            setUploadingFile(null);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-155 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Drive File Management</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Drag-and-Drop file asset loader</span>
      </div>

      {canUpload ? (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 transition-all ${
            dragOver ? 'border-[#08493d] bg-emerald-50/20' : 'border-gray-300 hover:border-slate-400 bg-slate-50/50'
          }`}
        >
          <div className="text-3xl">📤</div>
          <div className="space-y-1">
            <p className="font-extrabold text-slate-800">Drag & Drop files here, or click to upload</p>
            <p className="text-[10px] text-slate-400 font-normal">Supports PDF, DOCX, XLSX, and MP4 formats (Max 10MB)</p>
          </div>
          <input 
            type="file" 
            id="file-selector"
            onChange={handleFileInput}
            className="hidden" 
          />
          <label 
            htmlFor="file-selector"
            className="px-4 py-2 border border-gray-300 hover:bg-white text-slate-700 font-extrabold rounded-lg shadow-2xs cursor-pointer transition-colors"
          >
            Choose File
          </label>
        </div>
      ) : (
        <div className="p-6 bg-slate-50 border rounded-xl text-slate-400 font-medium italic text-center">
          You are logged in under a read-only role. Drag-and-drop file upload is locked.
        </div>
      )}

      {/* Progress HUD */}
      {uploadingFile && (
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-150 space-y-3">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
            <span>UPLOADING: {uploadingFile}</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-[9.5px] text-emerald-700 font-extrabold uppercase animate-pulse flex items-center gap-1.5">
            <span>🛡️</span> GovThreatGuard: Actively checking threat signatures...
          </p>
        </div>
      )}
    </div>
  );
}
