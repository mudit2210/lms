import React from 'react';

export default function RolePermissionManagement({
  activeRole,
  setActiveRole
}) {
  const roleSpecs = [
    {
      role: 'Super Admin',
      title: 'System Control Scope',
      desc: 'Full read/write permissions. Master approval access for the entire training repository, curriculum outlined structures, discussion locking, and activity audits.',
      scopes: ['Repository Edit/Upload', 'Hierarchy Builder', 'Quality Approval', 'Analytics & Auditing', 'SSO Configurations'],
      color: 'border-red-200 bg-red-50/10 text-red-800'
    },
    {
      role: 'Content Manager',
      title: 'Syllabus Curator Scope',
      desc: 'Curate learning materials, upload files, define topics/lessons, sequence academic indices, and manage forum categories.',
      scopes: ['Repository Edit/Upload', 'Hierarchy Builder', 'Category Curation', 'Audit Reviews'],
      color: 'border-blue-200 bg-blue-50/10 text-blue-800'
    },
    {
      role: 'Trainer',
      title: 'Faculty Workspace Scope',
      desc: 'Compose rich-text topic pages, attach reference materials inside courses, lock syllabus sequences, and respond to trainee forum threads.',
      scopes: ['Rich Text Editor', 'Course Attachment Links', 'Forum Thread Replying'],
      color: 'border-amber-200 bg-amber-50/10 text-amber-800'
    },
    {
      role: 'Reviewer',
      title: 'Governance Auditor Scope',
      desc: 'Moderation, compliance quality audits, releasing files from quarantine quarantine threat checking, and logging regulatory approvals.',
      scopes: ['Quality Approval', 'Threat Scan Overrides', 'Repository Audit'],
      color: 'border-purple-200 bg-purple-50/10 text-purple-800'
    },
    {
      role: 'Learner',
      title: 'Trainee Read-Only Scope',
      desc: 'Personal dashboard, course outline tracking, document downloads, saved reference bookmarks, and active forum participations.',
      scopes: ['Personal Learning Space', 'Document Reading/Downloading', 'Bookmark Collections', 'Forum Thread Q&As'],
      color: 'border-emerald-200 bg-emerald-50/10 text-emerald-800'
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-5 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Role & Permission Management</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Multi-Tenant RBAC authorization specs</span>
      </div>

      {/* Simulator Quick switcher info */}
      <div className="bg-[#08493d]/5 p-4 rounded-xl border border-[#08493d]/15">
        <p className="text-[10.5px] text-slate-650 font-semibold leading-relaxed">
          Use the <strong>Scope Role Permissions</strong> dropdown in the left sidebar to swap between multi-tenant profiles. Watch the entire KMS module filter layouts, tabs, and operation buttons instantaneously.
        </p>
      </div>

      <div className="space-y-4">
        {roleSpecs.map(spec => {
          const isCurrentlyActive = activeRole === spec.role;
          return (
            <div 
              key={spec.role}
              className={`p-4 rounded-xl border transition-all ${
                isCurrentlyActive ? 'border-[#08493d] bg-slate-50/50 shadow-xs' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">{spec.role}</h4>
                    <span className="text-[9px] font-bold text-slate-400">({spec.title})</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[85%]">{spec.desc}</p>
                </div>
                {isCurrentlyActive && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-250 px-2 py-0.5 rounded text-[8.5px] font-extrabold uppercase shrink-0">
                    Active Session
                  </span>
                )}
              </div>

              {/* Scope badges */}
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                {spec.scopes.map(sc => (
                  <span 
                    key={sc}
                    className="px-2 py-0.2 bg-slate-100 text-slate-500 border border-gray-200 rounded text-[8.5px] font-extrabold"
                  >
                    ✓ {sc}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
