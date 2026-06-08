import { useState } from "react";
import { Layout, Icon } from "@/components/layout/RoleLayout";
import { REQUESTS, DRIVERS, ACTIVITY } from "@/config/data";
import type { Request, ActivityItem } from "@/config/data";

// ── Priority badge ─────────────────────────────────────────────────────────
function PriBadge({ p }: { p: string }) {
  const map: Record<string, string> = {
    URGENT:   "bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa]",
    NORMAL:   "bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]",
    CRITICAL: "bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${map[p] ?? map.NORMAL}`}>
      {p !== "NORMAL" && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {p}
    </span>
  );
}

// ── Driver status badge ────────────────────────────────────────────────────
function StatusBadge({ s }: { s: string }) {
  const map: Record<string, string> = {
    "AVAILABLE": "bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]",
    "ON TRIP":   "bg-[#dbeafe] text-[#1d4ed8] border border-[#bfdbfe]",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${map[s] ?? "bg-[#f1f5f9] text-[#64748b]"}`}>
      {s}
    </span>
  );
}

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ icon, iconBg, iconColor, label, value }: {
  icon: string; iconBg: string; iconColor: string; label: string; value: string;
}) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 flex-1">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon name={icon} className={`text-[22px] ${iconColor}`} />
      </div>
      <div className="text-[13px] text-[#64748b] mb-1">{label}</div>
      <div className="text-[24px] font-bold text-[#0f172a]">{value}</div>
    </div>
  );
}

// ── Pending request card ───────────────────────────────────────────────────
function RequestCard({ req, onApprove, onReject }: {
  req: Request;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex flex-col gap-4 hover:border-[#c7d7f7] hover:shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={req.avatar}
            alt={req.requesterName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#e2e8f0]"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(req.requesterName)}&background=1e3a8a&color=fff`; }}
          />
          <div>
            <div className="text-[14px] font-bold text-[#0f172a]">{req.requesterName}</div>
            <div className="text-[11px] text-[#94a3b8]">{req.role} • ID {req.reqId}</div>
          </div>
        </div>
        <PriBadge p={req.priority} />
      </div>

      {/* Destination */}
      <div className="flex items-center gap-2 text-[14px] font-semibold text-[#0f172a]">
        <Icon name="location_on" className="text-[18px] text-[#64748b]" />
        {req.destination}
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 text-[12px]">
        <div>
          <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-0.5">Date & Time</div>
          <div className="font-semibold text-[#334155]">{req.date}, {req.time}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-0.5">Vehicle</div>
          <div className="font-semibold text-[#334155]">{req.vehicle}</div>
        </div>
        <div className="col-span-2">
          <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-0.5">Purpose</div>
          <div className="font-semibold text-[#334155]">{req.purpose}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 border-t border-[#f1f5f9]">
        <button
          onClick={() => onApprove(req.id)}
          className="flex-1 h-9 bg-[#1e3a8a] text-white text-[12px] font-bold rounded-xl hover:bg-[#1e40af] active:scale-95 transition-all"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(req.id)}
          className="flex-1 h-9 bg-white border border-[#e2e8f0] text-[#334155] text-[12px] font-bold rounded-xl hover:bg-[#f8fafc] active:scale-95 transition-all"
        >
          Reject
        </button>
        <button className="w-9 h-9 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
          <Icon name="visibility" className="text-[18px] text-[#64748b]" />
        </button>
      </div>
    </div>
  );
}

// ── Activity item ──────────────────────────────────────────────────────────
function ActivityRow({ item }: { item: ActivityItem }) {
  const dotColor = {
    approved:  "bg-[#64748b]",
    completed: "bg-[#3b82f6]",
    system:    "bg-[#64748b]",
  }[item.type] ?? "bg-[#64748b]";
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#f1f5f9] last:border-0">
      <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${dotColor}`} />
      <div>
        <div className="text-[13px] font-semibold text-[#0f172a]">{item.title}</div>
        <div className="text-[12px] text-[#64748b] mt-0.5 leading-relaxed">{item.desc}</div>
        <div className="text-[11px] text-[#94a3b8] mt-1">{item.time}</div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function DashboardPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [requests, setRequests] = useState(REQUESTS.slice(0, 2));
  const [search, setSearch] = useState("");
  const liveDrivers = DRIVERS.filter((d) => d.status !== "OFF DUTY").slice(0, 3);

  return (
    <Layout
      activeNav="Dashboard"
      onNavigate={onNavigate}
      topbarTitle="Operational Dispatch Dashboard"
      userRole="GA/HRD"
      searchPlaceholder="Search requests..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="flex-1 overflow-y-auto bg-[#f8f9ff] p-8">
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#94a3b8] mb-2 flex items-center gap-1.5">
          <span>Portal</span>
          <Icon name="chevron_right" className="text-[16px]" />
          <span className="font-semibold text-[#475569]">GA-HRD Dashboard</span>
        </div>

        {/* Page title */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[26px] font-bold text-[#0f172a]">Operational Dispatch Dashboard</h2>
            <p className="text-[14px] text-[#64748b] mt-1">Manage driver assignments and transportation workflow.</p>
          </div>
        </div>

        {/* Hero */}
        <div className="relative bg-[#1e3a8a] rounded-2xl px-10 py-8 mb-7 overflow-hidden">
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-[0.07]">
            <svg width="260" height="260" fill="none" viewBox="0 0 260 260">
              <path d="M130 0 L140 120 L260 130 L140 140 L130 260 L120 140 L0 130 L120 120 Z" fill="white"/>
            </svg>
          </div>
          <div className="relative z-10 max-w-xl">
            <div className="text-[28px] font-extrabold text-white leading-tight mb-3">
              Good Morning, Operational Coordinator 👋
            </div>
            <div className="text-[14px] text-white/60 leading-relaxed">
              Today you have <span className="text-white font-semibold">12 pending vehicle requests</span>. The average response time is currently <span className="text-white font-semibold">14 minutes</span>. Let's get the fleet moving.
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="flex gap-5 mb-7">
          <StatCard icon="pending_actions"  iconBg="bg-[#fff7ed]" iconColor="text-[#f97316]" label="Pending Requests" value="12 Requests" />
          <StatCard icon="task_alt"         iconBg="bg-[#f0f9ff]" iconColor="text-[#0284c7]" label="Available Drivers" value="24 Online" />
          <StatCard icon="directions_car"   iconBg="bg-[#f0fdf4]" iconColor="text-[#16a34a]" label="Drivers On Duty"  value="156 Total" />
        </div>

        {/* Two column */}
        <div className="grid grid-cols-[1fr_280px] gap-5">
          {/* Pending requests */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <div className="text-[16px] font-bold text-[#0f172a]">Pending Request</div>
              <button
                onClick={() => onNavigate("Driver Assignment")}
                className="text-[13px] font-semibold text-[#1e3a8a] hover:underline flex items-center gap-1"
              >
                View All Requests
                <Icon name="arrow_forward" className="text-[16px]" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {requests.map((req) => (
                <RequestCard
                  key={req.id}
                  req={req}
                  onApprove={(id) => setRequests((p) => p.filter((r) => r.id !== id))}
                  onReject={(id) => setRequests((p) => p.filter((r) => r.id !== id))}
                />
              ))}
              {requests.length === 0 && (
                <div className="col-span-2 py-12 flex flex-col items-center text-center">
                  <Icon name="check_circle" className="text-[40px] text-[#86efac] mb-2" />
                  <p className="font-bold text-[#0f172a]">All clear!</p>
                  <p className="text-[13px] text-[#64748b]">No pending requests at the moment.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {/* Live availability */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[14px] font-bold text-[#0f172a]">Live Availability</div>
                <span className="text-[11px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                  24 Online
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {liveDrivers.map((d) => (
                  <div key={d.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={d.avatar}
                        alt={d.name}
                        className="w-9 h-9 rounded-full object-cover border-2 border-[#e2e8f0]"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=1e3a8a&color=fff`; }}
                      />
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-white rounded-full ${d.status === "AVAILABLE" ? "bg-green-500" : "bg-blue-500"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold text-[#0f172a] truncate">{d.name}</div>
                      <div className="text-[11px] text-[#94a3b8] truncate">{d.vehicle}</div>
                    </div>
                    <StatusBadge s={d.status} />
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate?.("Driver Availability")}
                className="w-full mt-4 h-9 border border-[#e2e8f0] rounded-xl text-[12px] font-bold text-[#334155] hover:bg-[#f8fafc] transition-colors"
              >
                Manage All Drivers
              </button>
            </div>

            {/* Recent activity */}
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5">
              <div className="text-[14px] font-bold text-[#0f172a] mb-3">Recent Activity</div>
              {ACTIVITY.map((item) => (
                <ActivityRow key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
