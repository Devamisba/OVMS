import { useState } from "react";
import { Layout, Icon } from "@/components/layout/RoleLayout";
import { REQUESTS, DRIVERS } from "@/config/data";
import type { Request, Priority, Driver } from "@/config/data";

type TabFilter = "All" | "Normal" | "Urgent" | "Critical";

function PriBadge({ p }: { p: Priority }) {
  const map: Record<Priority, string> = {
    URGENT:   "bg-[#fff7ed] text-[#c2410c] border border-[#fed7aa]",
    NORMAL:   "bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]",
    CRITICAL: "bg-[#fef2f2] text-[#dc2626] border border-[#fecaca]",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${map[p]}`}>{p}</span>
  );
}

function RequestCard({ req, onApprove, onReject }: {
  req: Request;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-[#c7d7f7] hover:shadow-sm transition-all">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#f8fafc]">
        <div className="flex items-center gap-3">
          <img
            src={req.avatar}
            alt={req.requesterName}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#e2e8f0]"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(req.requesterName)}&background=1e3a8a&color=fff`; }}
          />
          <div>
            <div className="text-[14px] font-bold text-[#0f172a] uppercase tracking-wide">{req.requesterName}</div>
            <div className="text-[11px] text-[#94a3b8] uppercase tracking-wider">{req.role}</div>
          </div>
        </div>
        <PriBadge p={req.priority} />
      </div>

      {/* Body */}
      <div className="px-6 py-4 space-y-3">
        {/* Destination */}
        <div>
          <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Destination</div>
          <div className="flex items-center gap-1.5 text-[14px] font-semibold text-[#0f172a]">
            <Icon name="location_on" className="text-[16px] text-[#64748b]" />
            {req.destination}
          </div>
        </div>

        {/* Schedule */}
        <div>
          <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Schedule</div>
          <div className="text-[13px] text-[#334155]">{req.date}, 2023</div>
          <div className="text-[16px] font-bold text-[#0f172a]">{req.time}</div>
        </div>

        {/* Purpose */}
        <div>
          <div className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mb-1">Purpose</div>
          <div className="text-[13px] text-[#475569] italic">"{req.purpose}"</div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 pb-5 flex items-center gap-2">
        <button
          onClick={() => onApprove(req.id)}
          className="flex-1 h-10 bg-[#1e3a8a] text-white text-[13px] font-bold rounded-xl hover:bg-[#1e40af] active:scale-95 transition-all"
        >
          Approve
        </button>
        <button
          onClick={() => onReject(req.id)}
          className="flex-1 h-10 bg-white border border-[#dc2626] text-[#dc2626] text-[13px] font-bold rounded-xl hover:bg-[#fef2f2] active:scale-95 transition-all"
        >
          Reject
        </button>
        <button className="w-10 h-10 bg-white border border-[#e2e8f0] rounded-xl flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
          <Icon name="visibility" className="text-[18px] text-[#64748b]" />
        </button>
      </div>
    </div>
  );
}

export default function RequestsPage({ onNavigate }: { onNavigate: (p: string) => void }) {
  const [tab, setTab]           = useState<TabFilter>("All");
  const [search, setSearch]     = useState("");
  const [requests, setRequests] = useState(REQUESTS);

  const readyDrivers = DRIVERS.filter((d: Driver) => d.status === "AVAILABLE");

  const filtered = requests.filter((r: Request) => {
    const matchTab =
      tab === "All" ||
      (tab === "Normal"   && r.priority === "NORMAL")   ||
      (tab === "Urgent"   && r.priority === "URGENT")   ||
      (tab === "Critical" && r.priority === "CRITICAL");
    const q = search.toLowerCase();
    const matchQ =
      r.requesterName.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q) ||
      r.reqId.toLowerCase().includes(q);
    return matchTab && matchQ;
  });

  const urgentCount   = requests.filter((r: Request) => r.priority === "URGENT").length;
  const criticalCount = requests.filter((r: Request) => r.priority === "CRITICAL").length;

  return (
    <Layout
      activeNav="Driver Assignment"
      onNavigate={onNavigate}
      topbarTitle="Driver Assignment"
      userRole="GA/HRD"
      searchPlaceholder="Search requests..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="flex-1 overflow-y-auto bg-[#f8f9ff] p-8">
        {/* Breadcrumb */}
        <div className="text-[12px] text-[#94a3b8] mb-1 flex items-center gap-1.5">
          <span>Portal</span>
          <Icon name="chevron_right" className="text-[16px]" />
          <span className="font-semibold text-[#1e3a8a]">Driver Assignment</span>
        </div>
        <div className="text-[16px] font-bold text-[#0f172a] mb-1">Driver Assignment Center</div>
        <div className="text-[13px] text-[#64748b] mb-6 max-w-2xl">
          Assign available drivers to approved operational vehicle requests and monitor transportation coordination across the organization.
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {/* Pending */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
              <Icon name="pending_actions" className="text-[22px] text-[#3b82f6]" />
            </div>
            <div>
              <div className="text-[12px] text-[#64748b]">Pending Requests</div>
              <div className="text-[22px] font-bold text-[#0f172a]">{requests.length}</div>
            </div>
          </div>
          {/* Available drivers */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center flex-shrink-0">
              <Icon name="location_on" className="text-[22px] text-[#16a34a]" />
            </div>
            <div>
              <div className="text-[12px] text-[#64748b]">Available Drivers</div>
              <div className="text-[22px] font-bold text-[#0f172a]">{readyDrivers.length}</div>
            </div>
          </div>
          {/* Active trips */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#1e3a8a] flex items-center justify-center flex-shrink-0">
              <Icon name="route" className="text-[22px] text-white" />
            </div>
            <div>
              <div className="text-[12px] text-[#64748b]">Active Driver Trips</div>
              <div className="text-[22px] font-bold text-[#0f172a]">8</div>
            </div>
          </div>
          {/* Critical */}
          <div className="bg-[#fef2f2] border border-[#fecaca] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#fecaca] flex items-center justify-center flex-shrink-0">
              <Icon name="error" className="text-[22px] text-[#dc2626]" />
            </div>
            <div>
              <div className="text-[12px] text-[#dc2626] font-semibold">Critical Requests</div>
              <div className="text-[22px] font-bold text-[#dc2626]">{criticalCount}</div>
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-[1fr_260px] gap-5">
          <div>
            {/* Tab filter */}
            <div className="flex gap-1 bg-white border border-[#e2e8f0] rounded-xl p-1 w-fit mb-5">
              {(["All", "Normal", "Urgent", "Critical"] as TabFilter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 h-9 rounded-lg text-[13px] font-semibold transition-all flex items-center gap-1.5 ${
                    tab === t ? "bg-[#1e3a8a] text-white shadow-sm" : "text-[#64748b] hover:text-[#334155]"
                  }`}
                >
                  {t}
                  {t === "Urgent" && urgentCount > 0 && (
                    <span className={`w-2 h-2 rounded-full ${tab === "Urgent" ? "bg-white" : "bg-[#f97316]"}`} />
                  )}
                </button>
              ))}
            </div>

            {/* Request list */}
            <div className="flex flex-col gap-4">
              {filtered.length === 0 ? (
                <div className="bg-white border border-[#e2e8f0] rounded-2xl py-16 flex flex-col items-center">
                  <Icon name="inbox" className="text-[40px] text-[#cbd5e1] mb-2" />
                  <p className="font-bold text-[#0f172a]">No requests found</p>
                  <p className="text-[13px] text-[#64748b] mt-1">Try changing the filter or search.</p>
                </div>
              ) : (
                filtered.map((req) => (
                  <RequestCard
                    key={req.id}
                    req={req}
                    onApprove={(id) => setRequests((p) => p.filter((r) => r.id !== id))}
                    onReject={(id) => setRequests((p) => p.filter((r) => r.id !== id))}
                  />
                ))
              )}
            </div>
          </div>

          {/* Drivers sidebar */}
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 h-fit">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[14px] font-bold text-[#0f172a]">Drivers Availability</div>
              <span className="text-[11px] font-bold text-white bg-[#1e3a8a] px-2.5 py-0.5 rounded-full">
                {readyDrivers.length} Ready
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {readyDrivers.slice(0, 3).map((d) => (
                <div key={d.id} className="border border-[#e2e8f0] rounded-xl p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <img
                        src={d.avatar}
                        alt={d.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#e2e8f0]"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=1e3a8a&color=fff`; }}
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] font-bold text-[#0f172a]">{d.name}</div>
                      <span className="text-[10px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">Ready</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1e3a8a] rounded-full" style={{ width: `${60 + (d.id.charCodeAt(0) % 40)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onNavigate("Driver Availability")}
              className="w-full mt-4 h-9 border border-[#e2e8f0] rounded-xl text-[12px] font-bold text-[#334155] hover:bg-[#f8fafc] transition-colors"
            >
              View All Drivers
            </button>
          </div>
        </div>
      </div>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#1e3a8a] text-white rounded-full shadow-xl hover:bg-[#1e40af] active:scale-95 transition-all flex items-center justify-center z-50">
        <Icon name="add" className="text-[28px]" />
      </button>
    </Layout>
  );
}