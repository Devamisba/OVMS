import { useState } from "react";
import { Search, Terminal } from "lucide-react";
import { type AuditLog } from "../../types/types.ts";

interface AuditLogsViewProps {
  logs: AuditLog[];
}

export default function AuditLogsView({ logs }: AuditLogsViewProps) {
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>("All Severity");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      activeSeverityFilter === "All Severity" || l.severity === activeSeverityFilter;

    return matchesSearch && matchesSeverity;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search Header Banner */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search logs by operator, action, incident ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#cbdbf5] text-slate-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={activeSeverityFilter}
            onChange={(e) => setActiveSeverityFilter(e.target.value)}
            className="bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold rounded-lg px-3 py-1.5 cursor-pointer focus:outline-none"
          >
            <option>All Severity</option>
            <option>Critical</option>
            <option>High</option>
            <option>Normal</option>
            <option>Stable</option>
          </select>
        </div>
      </div>

      {/* Terminal static report info above the logs list */}
      <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-[10px] space-y-1.5 border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 text-rose-500 font-bold">
          <Terminal className="w-4 h-4" /> [SECURITY TAMPER-PROOF PROTOCOL LOGS]
        </div>
        <p>&gt; Status: Ledger stream is online & synchronized.</p>
        <p>&gt; IP Whitelist Protection Level: Active. Retaining standard security hashes.</p>
        <p>&gt; Encryption Cipher: AES-256 GCM fully authorized.</p>
      </div>

      {/* Audit ledger list */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Operator info and profile avatar */}
            <div className="flex items-start gap-4">
              <img
                src={log.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120"}
                alt={log.user}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#cbdbf5]"
              />

              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h5 className="font-bold text-slate-900 text-xs">{log.user}</h5>
                  <span className="text-[10px] text-slate-400 font-bold tracking-wider bg-slate-50 px-1.5 py-0.5 rounded leading-none">
                    {log.role}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">{log.id}</span>
                </div>

                <p className="text-xs text-slate-600 leading-normal font-medium">
                  {log.action}
                </p>

                <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                  MODULE TARGET: <span className="font-mono text-slate-800">{log.module}</span>
                </div>
              </div>
            </div>

            {/* Severity badges, IP info and timings */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0">
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold border leading-none font-mono ${
                  log.severity === "Critical"
                    ? "bg-rose-50 text-rose-700 border-rose-100 animate-pulse"
                    : log.severity === "High"
                    ? "bg-rose-50 text-rose-600 border-rose-100"
                    : log.severity === "Normal"
                    ? "bg-blue-50 text-blue-700 border-blue-100"
                    : "bg-emerald-50 text-emerald-700 border-emerald-110"
                }`}
              >
                {log.severity}
              </span>

              <div className="text-right text-[10px] text-slate-400 font-mono font-semibold space-y-0.5">
                <p>IP: {log.ipAddress}</p>
                <p>{log.timestamp}</p>
              </div>
            </div>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="bg-slate-50 p-12 text-center rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-bold">
            No audit records match the selected parameters.
          </div>
        )}
      </div>
    </div>
  );
}
