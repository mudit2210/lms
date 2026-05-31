import React from 'react';

export default function SystemSettingsTab({ 
  systemSettings, 
  setSystemSettings, 
  settingsSaved = false, 
  setSettingsSaved 
}) {
  return (
    <div className="space-y-6 animate-fadeIn text-slate-700">
      <div className="bg-white rounded-2xl shadow-xs border border-gray-150 p-6 space-y-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">System Parameters & Integrations</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Securely manage API configurations, email/SMS gateway URLs, and active directory properties.</p>
        </div>

        {settingsSaved && (
          <div className="bg-emerald-50 border border-emerald-250 text-emerald-850 p-3 rounded-xl text-center text-xs font-bold font-sans animate-fadeIn">
            ✓ System variables and API parameters cached in config.env successfully!
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Single Sign-On */}
          <div className="border border-slate-150 p-5 rounded-2xl bg-slate-50/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="p-1 bg-[#eff7f5] text-[#08493d] rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Parichay / JanParichay SSO</h4>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-650">
              <div className="space-y-1">
                <label className="block text-slate-700">SSO Client ID</label>
                <input 
                  type="text" 
                  value={systemSettings.ssoClientId}
                  onChange={(e) => setSystemSettings({ ...systemSettings, ssoClientId: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-slate-850 font-mono text-[11px]"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">API Callback Endpoint</label>
                <input 
                  type="text" 
                  value={systemSettings.ssoEndpoint}
                  onChange={(e) => setSystemSettings({ ...systemSettings, ssoEndpoint: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-slate-850 font-mono text-[11px]"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <label className="text-slate-700 cursor-pointer text-xs">Enforce Multi-Factor Auth (MFA)</label>
                <input 
                  type="checkbox" 
                  checked={systemSettings.mfaEnabled}
                  onChange={(e) => setSystemSettings({ ...systemSettings, mfaEnabled: e.target.checked })}
                  className="w-4.5 h-4.5 text-[#08493d] focus:ring-emerald-700 cursor-pointer rounded"
                />
              </div>
            </div>
          </div>

          {/* Active Directory */}
          <div className="border border-slate-150 p-5 rounded-2xl bg-slate-50/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="p-1 bg-[#eff7f5] text-[#08493d] rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">LDAP & Active Directory</h4>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-650">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 cursor-pointer text-xs">Enforce AD Domain Sync</label>
                <input 
                  type="checkbox" 
                  checked={systemSettings.activeDirectorySync}
                  onChange={(e) => setSystemSettings({ ...systemSettings, activeDirectorySync: e.target.checked })}
                  className="w-4.5 h-4.5 text-[#08493d] focus:ring-emerald-700 cursor-pointer rounded"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">AD Server Domain</label>
                <input 
                  type="text" 
                  value={systemSettings.adDomain}
                  disabled={!systemSettings.activeDirectorySync}
                  onChange={(e) => setSystemSettings({ ...systemSettings, adDomain: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-slate-850 font-mono text-[11px] disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Mail & SMS Gateways */}
          <div className="border border-slate-150 p-5 rounded-2xl bg-slate-50/40 space-y-4">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
              <span className="p-1 bg-[#eff7f5] text-[#08493d] rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">Communication Gateways</h4>
            </div>

            <div className="space-y-3.5 text-xs font-semibold text-slate-650">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2 space-y-1">
                  <label className="block text-slate-700">SMTP Host</label>
                  <input 
                    type="text" 
                    value={systemSettings.emailGatewayHost}
                    onChange={(e) => setSystemSettings({ ...systemSettings, emailGatewayHost: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-slate-850 font-mono text-[11px]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700">SMTP Port</label>
                  <input 
                    type="text" 
                    value={systemSettings.emailGatewayPort}
                    onChange={(e) => setSystemSettings({ ...systemSettings, emailGatewayPort: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-slate-850 font-mono text-[11px] text-center"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-slate-700">SMS Gateway Hub API</label>
                <input 
                  type="text" 
                  value={systemSettings.smsGatewayUrl}
                  onChange={(e) => setSystemSettings({ ...systemSettings, smsGatewayUrl: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded bg-white text-slate-850 font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-5 text-center">
          <button
            onClick={() => {
              setSettingsSaved(true);
              setTimeout(() => setSettingsSaved(false), 4000);
            }}
            className="px-6 py-2 bg-[#08493d] hover:bg-[#063b31] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            <span>Save Integration Toggles & Parameters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
