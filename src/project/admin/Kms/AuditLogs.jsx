import React from 'react';

export default function AuditLogs({
  auditLogs
}) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-2xs space-y-4 text-left font-semibold text-xs text-slate-700 select-none">
      <div>
        <h3 className="font-extrabold text-[#08493d] uppercase tracking-wider text-xs">Immutable Compliance Audit Logs</h3>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">MoSPI system compliance logs</span>
      </div>

      <div className="bg-[#fcf8f0] p-3 rounded-xl border border-[#ebd7be]/60">
        <p className="text-[10px] text-[#805f3d] font-semibold leading-relaxed">
          <strong>🔒 Security Mandate:</strong> In accordance with the national statistical quality framework, all administrative actions, outline sequencing changes, file uploads, and approvals are locked with cryptographically secure timestamps.
        </p>
      </div>

      {/* Audit Logs Table */}
      <div className="border border-gray-150 rounded-xl overflow-hidden shadow-2xs bg-white">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-150 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
              <th className="p-3 pl-4">Timestamp</th>
              <th className="p-3">Operator Credit</th>
              <th className="p-3">Profile Role</th>
              <th className="p-3">Audit Operation</th>
              <th className="p-3 pr-4">Action Details Summary</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 font-medium">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                
                {/* Time */}
                <td className="p-3 pl-4 text-slate-400 text-[10px]">
                  {log.timestamp}
                </td>

                {/* Operator */}
                <td className="p-3 font-bold text-slate-800">
                  {log.operator}
                </td>

                {/* Role */}
                <td className="p-3">
                  <span className={`px-1.5 py-0.2 rounded text-[8px] font-extrabold uppercase border ${
                    log.role === 'Super Admin' ? 'bg-red-50 text-red-700 border-red-200' :
                    log.role === 'Content Manager' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-slate-50 text-slate-600 border-gray-200'
                  }`}>
                    {log.role}
                  </span>
                </td>

                {/* Operation */}
                <td className="p-3 font-extrabold text-slate-800">
                  {log.action}
                </td>

                {/* Details */}
                <td className="p-3 pr-4 text-slate-500 font-semibold max-w-[300px] truncate" title={log.details}>
                  {log.details}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
