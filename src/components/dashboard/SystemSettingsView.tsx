import { useState } from "react";
import {
  Settings,
  Shield,
  Clock,
  Save,
  Building,
  Mail,
  Locate,
  Globe,
  CheckCircle
} from "lucide-react";
import { type SystemConfig } from "../../types/types.ts";

interface SystemSettingsViewProps {
  config: SystemConfig;
  onSaveConfig: (updated: SystemConfig) => void;
}

export default function SystemSettingsView({ config, onSaveConfig }: SystemSettingsViewProps) {
  // Direct mutable fields in local form
  const [sysName, setSysName] = useState(config.systemName);
  const [compName, setCompName] = useState(config.companyName);
  const [supportEmail, setSupportEmail] = useState(config.supportEmail);
  const [hqAddress, setHqAddress] = useState(config.hqAddress);
  const [mfa, setMfa] = useState(config.mfaEnabled);
  const [sessionTimeout, setSessionTimeout] = useState(config.sessionTimeout);
  const [retryLimit, setRetryLimit] = useState(config.loginRetryLimit);
  const [ipWhiteList, setIpWhiteList] = useState(config.ipWhitelist);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      systemName: sysName,
      timezone: config.timezone,
      dateFormat: config.dateFormat,
      systemLanguage: config.systemLanguage,
      companyName: compName,
      supportEmail: supportEmail,
      hqAddress: hqAddress,
      mfaEnabled: mfa,
      sessionTimeout: sessionTimeout,
      loginRetryLimit: retryLimit,
      ipWhitelist: ipWhiteList,
      advancedEncryption: config.advancedEncryption
    });

    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Settings Action Hub */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core parameters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#00236f]" />
              <h4 className="font-display font-semibold text-slate-900 text-sm">
                General Enterprise Settings
              </h4>
            </div>

            {showSavedFeedback && (
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded-xl animate-bounce">
                <CheckCircle className="w-4 h-4" /> Parameters Saved
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">System Hub Name</label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={sysName}
                  onChange={(e) => setSysName(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#cbdbf5] text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Company Entity</label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={compName}
                  onChange={(e) => setCompName(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#cbdbf5] text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">Supervisor Support Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#cbdbf5] text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">HQ Corporate Address</label>
              <div className="relative">
                <Locate className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={hqAddress}
                  onChange={(e) => setHqAddress(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#cbdbf5] text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Parameters Block */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
            <Shield className="w-5 h-5 text-[#ba1a1a]" />
            <h4 className="font-display font-semibold text-slate-900 text-sm">
              Operational Security & MFA
            </h4>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <h5 className="font-bold text-xs text-slate-900 leading-snug">Multi-Factor Authentication (MFA)</h5>
                <p className="text-[11px] text-slate-400 mt-0.5">Force all logging coordinators to authorize identity via SMS or email code.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mfa}
                  onChange={(e) => setMfa(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-slate-200 rounded-full peer peer-checked:bg-[#00236f] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all pointer-events-none" />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Inactivity Session Timeout (Minutes)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 30)}
                    className="w-full pl-9 pr-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Login Retry Limit threshold</label>
                <select
                  value={retryLimit}
                  onChange={(e) => setRetryLimit(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="3 Attempts">3 Attempts Lockout</option>
                  <option value="5 Attempts">5 Attempts Lockout</option>
                  <option value="10 Attempts">10 Attempts Lockout</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase">IP Whitelisting Range (Comma-Separated)</label>
              <textarea
                value={ipWhiteList}
                onChange={(e) => setIpWhiteList(e.target.value)}
                rows={2}
                placeholder="e.g. 192.168.1.1, 10.42.100.5"
                className="w-full p-3 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#cbdbf5] text-slate-700 font-mono font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Submit Save bar */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#00236f] hover:bg-[#1e3a8a] text-white py-2.5 px-6 rounded-xl text-xs font-bold shadow-md shadow-[#00236f]/10 cursor-pointer transition-colors"
          >
            <Save className="w-4 h-4" /> Save Configuration Parameters
          </button>
        </div>
      </form>
    </div>
  );
}
