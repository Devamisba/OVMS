import { useState } from "react";

// ── Shared types/data (sama persis dengan DashboardView) ──
const NAV_MAIN = [
  { icon: "dashboard",      label: "Dashboard"           },
  { icon: "directions_car", label: "Vehicle Management"  },
  { icon: "person",         label: "Driver Management"   },
  { icon: "monitor_heart",  label: "Request Monitoring"  },
  { icon: "calendar_month", label: "Vehicle Schedule"    },
  { icon: "analytics",      label: "Reports & Analytics" },
];
const NAV_ADMIN = [
  { icon: "group",                label: "User Management"     },
  { icon: "admin_panel_settings", label: "Role Management"     },
  { icon: "notifications",        label: "Notification Center" },
  { icon: "history",              label: "Audit Logs"          },
  { icon: "settings",             label: "System Settings"     },
];

// ── Gantt data ──
const WEEK_DAYS = [
  { short: "Mon", day: "12" },
  { short: "Tue", day: "13" },
  { short: "Wed", day: "14" },
  { short: "Thu", day: "15" },
  { short: "Fri", day: "16" },
  { short: "Sat", day: "17" },
  { short: "Sun", day: "18" },
];

type BlockType = "mission" | "recurring" | string;
interface GanttBlock { start: number; span: number; type: BlockType; label: string; sub: string; icon?: string; hasMenu?: boolean; conflict?: boolean }
interface Vehicle    { id: string; type: string; model: string; blocks: GanttBlock[] }

const VEHICLES: Vehicle[] = [
  {
    id: "V-8829", type: "Sedan", model: "T. Camry",
    blocks: [
      { start: 0, span: 1, type: "mission",  label: "#REQ-294 • John D.", sub: "REGIONAL HQ TRANSFER", hasMenu: true },
      { start: 1, span: 2, type: "mission",  label: "#REQ-301 • Sa...",   sub: "CLIENT SITE B...",     hasMenu: true },
    ],
  },
  {
    id: "V-1104", type: "SUV", model: "F. Explorer",
    blocks: [
      { start: 1, span: 2, type: "mission", label: "#REQ-28", sub: "Training" },
    ],
  },
  {
    id: "V-5521", type: "Van", model: "M. Sprinter",
    blocks: [
      { start: 0, span: 5, type: "recurring", label: "RECURRING: STAFF SHUTTLE (ROUTE A)", sub: "", icon: "autorenew" },
    ],
  },
  {
    id: "V-9011", type: "Sedan", model: "T. Camry",
    blocks: [
      { start: 0, span: 1, type: "mission",  label: "#REQ-294 • John D.", sub: "REGIONAL HQ TRANSFER", hasMenu: true, conflict: true },
      { start: 1, span: 2, type: "mission",  label: "#REQ-301 • Sa...",   sub: "CLIENT SITE B...",     hasMenu: true },
    ],
  },
  {
    id: "V-2391", type: "Sedan", model: "H. Accord",
    blocks: [
      { start: 3, span: 1, type: "conflict", label: "CONFLICT", sub: "REQ-315" },
    ],
  },
];

const BLOCK_STYLES: Record<string, string> = {
  mission:   "bg-[#1e3a8a] text-white",
  recurring: "bg-[#c2410c] text-white",
};

// ── Icon helper ──
function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span
      className={`material-symbols-outlined select-none leading-none ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
    >
      {name}
    </span>
  );
}

// ── Gantt Row ──
function GanttRow({ vehicle }: { vehicle: Vehicle }) {
  const isConflict = false;
  const COL_W = 130; // px per day column

  return (
    <div className="flex border-b border-[#f1f5f9] hover:bg-[#fafbff] transition-colors group">
      {/* Vehicle label */}
      <div className="w-[200px] flex-shrink-0 flex items-center gap-3 px-4 py-3 border-r border-[#f1f5f9]">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isConflict ? "bg-red-100" : "bg-[#e8edf8]"}`}>
          <Icon name="directions_car" className={`text-[18px] ${isConflict ? "text-[#dc2626]" : "text-[#1e3a8a]"}`} />
        </div>
        <div>
          <div className={`text-[13px] font-bold leading-tight ${isConflict ? "text-[#dc2626]" : "text-[#0f172a]"}`}>
            {vehicle.id} ({vehicle.type})
          </div>
          <div className="text-[11px] text-[#94a3b8]">{vehicle.model}</div>
        </div>
      </div>

      {/* Gantt cells */}
      <div className="flex-1 relative overflow-hidden" style={{ height: 60 }}>
        {/* Day column lines */}
        <div className="absolute inset-0 flex pointer-events-none">
          {WEEK_DAYS.map((_, i) => (
            <div key={i} className="border-r border-[#f1f5f9]" style={{ width: COL_W, flexShrink: 0 }} />
          ))}
        </div>

        {/* Blocks (exclude maintenance/conflict) */}
        {vehicle.blocks.filter(b => b.type === "mission" || b.type === "recurring").map((block, bi) => (
          <div
            key={bi}
            className={`absolute top-2 rounded-lg flex items-center overflow-hidden shadow-sm ${BLOCK_STYLES[block.type]}`}
            style={{
              left: block.start * COL_W + 4,
              width: block.span * COL_W - 8,
              height: 44,
            }}
          >
            <div className="flex-1 min-w-0 px-2.5 py-1">
              <div className="flex items-center gap-1">
                {block.icon && <Icon name={block.icon} className="text-[13px] text-white/80" />}
                <span className="text-[11px] font-bold truncate">{block.label}</span>
              </div>
              {block.sub && (
                <span className="text-[9px] font-semibold tracking-wider opacity-75 uppercase truncate block">{block.sub}</span>
              )}
            </div>
            {block.hasMenu && (
              <button className="px-1.5 opacity-70 hover:opacity-100 flex-shrink-0">
                <Icon name="more_vert" className="text-[16px] text-white" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Export ──
export default function ScheduleView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeNav,   setActiveNav]   = useState("Vehicle Schedule");
  const [viewMode,    setViewMode]    = useState<"Day"|"Week"|"Month">("Day");
  const [filterOpen,  setFilterOpen]  = useState(false);
  const [vehicleType, setVehicleType] = useState("All");

  const handleNav = (label: string) => {
    setActiveNav(label);
    onNavigate?.(label);
  };

  const filteredVehicles = vehicleType === "All"
    ? VEHICLES
    : VEHICLES.filter(v => v.type.toLowerCase() === vehicleType.toLowerCase());

  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ════ SIDEBAR ════ */}
      <aside className="w-[240px] flex-shrink-0 bg-white border-r border-[#e2e8f0] flex flex-col overflow-y-auto">
        <div className="flex items-center gap-3 px-5 pt-6 pb-6">
          <div className="w-10 h-10 bg-[#1e3a8a] rounded-xl flex items-center justify-center shadow-sm">
            <Icon name="directions_car" className="text-white text-[22px]" />
          </div>
          <div>
            <div className="text-[17px] font-bold text-[#0f172a] leading-tight">OVMS</div>
            <div className="text-[11px] text-[#94a3b8] font-medium">Enterprise Fleet</div>
          </div>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {NAV_MAIN.map(item => (
            <button key={item.label} onClick={() => handleNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                activeNav === item.label
                  ? "bg-[#1e3a8a] text-white shadow-sm"
                  : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e293b]"
              }`}>
              <Icon name={item.icon} className={`text-[21px] ${activeNav === item.label ? "text-white" : "text-[#64748b]"}`} />
              <span className="text-[13.5px] font-semibold">{item.label}</span>
            </button>
          ))}
          <div className="pt-4 pb-2 px-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Administration</span>
          </div>
          {NAV_ADMIN.map(item => (
            <button key={item.label} onClick={() => handleNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                activeNav === item.label
                  ? "bg-[#1e3a8a] text-white shadow-sm"
                  : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e293b]"
              }`}>
              <Icon name={item.icon} className={`text-[21px] ${activeNav === item.label ? "text-white" : "text-[#64748b]"}`} />
              <span className="text-[13.5px] font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="h-6" />
      </aside>

      {/* ════ MAIN ════ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Topbar ── */}
        <header className="bg-white border-b border-[#e2e8f0] px-8 h-[68px] flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-6">
            <h1 className="text-[20px] font-bold text-[#0f172a]">Vehicle Schedule</h1>
            <div className="relative">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[18px]" />
              <input type="text" placeholder="Quick search schedules..."
                className="h-9 pl-9 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-full text-[13px] text-[#475569] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 w-64 transition-all" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f1f5f9]">
              <Icon name="notifications" className="text-[#475569] text-[22px]" />
              {/* conflict indicator removed */}
            </button>
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f1f5f9]">
              <Icon name="warning" className="text-[#475569] text-[22px]" />
            </button>
            <div className="w-px h-7 bg-[#e2e8f0] mx-2" />
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="text-right">
                <div className="text-[13px] font-bold text-[#0f172a] leading-tight">Admin User</div>
                <div className="text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider">Fleet Supervisor</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#1e3a8a] border-2 border-[#e2e8f0] overflow-hidden">
                <img src="https://i.pravatar.cc/40?img=12" alt="Admin" className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            </div>
          </div>
        </header>

        {/* ── Canvas ── */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex gap-5">

            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 min-w-0 space-y-5">

              {/* Page header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[26px] font-bold text-[#0f172a]">Schedule Management</h2>
                  <p className="text-[13.5px] text-[#64748b] mt-1 max-w-md leading-relaxed">
                    Manage and coordinate vehicle deployments, maintenance schedules, and operational assignments across the entire fleet.
                  </p>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e2e8f0] rounded-xl text-[13px] font-bold text-[#1e3a8a] bg-white hover:bg-[#eff6ff] transition-colors shadow-sm">
                    <Icon name="ios_share" className="text-[18px]" />
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-xl text-[13px] font-bold shadow-sm transition-colors">
                    <Icon name="add" className="text-[18px]" />
                    New Schedule
                  </button>
                </div>
              </div>

              {/* ── Stat Cards ── */}
              <div className="grid grid-cols-4 gap-3">
                {/* Scheduled Today */}
                <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-[#e8edf8] rounded-xl flex items-center justify-center">
                      <Icon name="calendar_today" className="text-[#1e3a8a] text-[20px]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#16a34a] bg-[#dcfce7] px-2 py-0.5 rounded-full">
                      +12% vs yest.
                    </span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1">Scheduled Today</div>
                  <div className="text-[32px] font-bold text-[#0f172a] leading-tight">24</div>
                </div>

                {/* Upcoming 7 Days */}
                <div className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 bg-[#e8edf8] rounded-xl flex items-center justify-center">
                      <Icon name="event_note" className="text-[#1e3a8a] text-[20px]" />
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] mb-1">Upcoming (7 Days)</div>
                  <div className="text-[32px] font-bold text-[#0f172a] leading-tight">142</div>
                </div>

                {/* Conflicts UI removed */}
              </div>

              {/* ── Gantt Calendar ── */}
              <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="px-5 py-3.5 border-b border-[#f1f5f9] flex items-center gap-3 flex-wrap">
                  {/* View mode */}
                  <div className="flex bg-[#f1f5f9] rounded-xl p-1">
                    {(["Day","Week","Month"] as const).map(m => (
                      <button key={m} onClick={() => setViewMode(m)}
                        className={`px-4 py-1.5 rounded-lg text-[12px] font-bold transition-all ${
                          viewMode === m ? "bg-white shadow-sm text-[#1e3a8a]" : "text-[#94a3b8] hover:text-[#475569]"
                        }`}>{m}</button>
                    ))}
                  </div>

                  {/* Nav */}
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
                      <Icon name="chevron_left" className="text-[#475569] text-[18px]" />
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] text-[12px] font-bold text-[#475569] hover:bg-[#f1f5f9] transition-colors">
                      Today
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
                      <Icon name="chevron_right" className="text-[#475569] text-[18px]" />
                    </button>
                  </div>
                  <span className="text-[15px] font-bold text-[#0f172a]">October 12 – 18, 2023</span>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Vehicle type filter */}
                  <div className="relative">
                    <button onClick={() => setFilterOpen(!filterOpen)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-colors">
                      Vehicle Type: {vehicleType}
                      <Icon name="keyboard_arrow_down" className="text-[16px]" />
                    </button>
                    {filterOpen && (
                      <div className="absolute top-full left-0 mt-1 bg-white rounded-xl border border-[#e2e8f0] shadow-xl z-30 py-1 min-w-[140px]">
                        {["All","Sedan","SUV","Van"].map(t => (
                          <button key={t} onClick={() => { setVehicleType(t); setFilterOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-[12px] font-semibold hover:bg-[#f1f5f9] transition-colors ${vehicleType === t ? "text-[#1e3a8a]" : "text-[#475569]"}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9] transition-colors">
                    <Icon name="tune" className="text-[#64748b] text-[18px]" />
                  </button>
                </div>

                {/* Gantt table */}
                <div className="overflow-x-auto">
                  {/* Header */}
                  <div className="flex border-b border-[#f1f5f9] bg-[#f8fafc]">
                    <div className="w-[200px] flex-shrink-0 px-4 py-2.5 border-r border-[#f1f5f9]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">Vehicle Entity</span>
                    </div>
                    <div className="flex" style={{ minWidth: 7 * 130 }}>
                      {WEEK_DAYS.map((d, i) => (
                        <div key={i} className="flex items-center justify-center border-r border-[#f1f5f9] py-2.5" style={{ width: 130 }}>
                          <span className={`text-[12px] font-bold ${d.short === "Mon" && "text-[#1e3a8a]"}`}>
                            {d.short} {d.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rows */}
                  {filteredVehicles.map(v => (
                    <GanttRow key={v.id} vehicle={v} />
                  ))}
                </div>

                {/* Legend (maintenance/conflict removed) */}
                <div className="px-5 py-3 border-t border-[#f1f5f9] bg-[#fafbfc] flex items-center gap-5 flex-wrap">
                  {[
                    { color: "bg-[#1e3a8a]", label: "Regular Mission" },
                    { color: "bg-[#c2410c]", label: "Recurring" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-sm ${item.color}`} />
                      <span className={`text-[12px] font-semibold text-[#64748b]`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* end left column */}

            {/* right column removed per request */}
          </div>
        </div>{/* end canvas */}
      </div>{/* end main */}

      {/* Global styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal;
          line-height: 1; letter-spacing: normal;
          text-transform: none; display: inline-block;
          white-space: nowrap; word-wrap: normal; direction: ltr;
          -webkit-font-smoothing: antialiased; vertical-align: middle;
        }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
      `}</style>
    </div>
  );
}