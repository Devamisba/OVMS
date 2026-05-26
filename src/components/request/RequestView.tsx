import { useState } from "react";
import { Layout, Icon } from "../layout/layout.tsx";
const REQUESTS = [
  { id:"#REQ-8902", name:"James Doe",    dept:"LOGISTICS",   vehicle:"Toyota Hilux (ABC-123)",   driver:"Sam Rivers",     dest:"Central Warehouse", destSub:"Inventory Audit",  sched:"Oct 24, 08:30 AM", dur:"4h duration",  status:"",          statusColor:"", priority:"" },
  { id:"#REQ-8895", name:"Sarah White",  dept:"MARKETING",   vehicle:"Honda CR-V (XYZ-789)",    driver:"Marcus Lee",     dest:"Tech Expo Plaza",   destSub:"Event Setup",      sched:"Oct 24, 10:00 AM", dur:"8h duration",  status:"ONGOING",   statusColor:"bg-[#dbeafe] text-[#1d4ed8]", priority:"" },
  { id:"#REQ-8890", name:"Alan Kim",     dept:"ENGINEERING", vehicle:"Ford Ranger (JKL-556)",   driver:"Unassigned",     dest:"Power Substation 4",destSub:"Site Inspection",  sched:"Oct 25, 07:00 AM", dur:"6h duration",  status:"PENDING",   statusColor:"bg-[#fef3c7] text-[#d97706]", priority:"" },
  { id:"#REQ-8882", name:"Elena Post",   dept:"ADMIN",       vehicle:"Nissan Urvan (MNO-221)",  driver:"Robert Fox",     dest:"Airport Terminal 2",destSub:"Client Pickup",    sched:"Oct 23, 11:30 PM", dur:"2h duration",  status:"COMPLETED", statusColor:"bg-[#dcfce7] text-[#16a34a]", priority:"" },
];

export default function RequestMonitoringView({ onNavigate }: { onNavigate?: (p:string)=>void }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = REQUESTS
    .filter(r => statusFilter === "All" || r.status === statusFilter)
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout activeNav="Request Monitoring" onNavigate={onNavigate} topbarTitle="Request Monitoring" searchPlaceholder="Quick search schedules..." userRole="Fleet Supervisor">
      <div className="p-6 space-y-5 animate-fadein">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[26px] font-bold text-[#0f172a]">Request Monitoring</h2>
            <p className="text-[13px] text-[#64748b] mt-1">Real-time oversight of vehicle dispatch and mission status across the enterprise.</p>
          </div>
          <div className="flex gap-2.5">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e2e8f0] bg-white rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#f8fafc] shadow-sm"><Icon name="download" className="text-[17px]" />Export</button>
            <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-sm active:scale-95 transition-all"><Icon name="add" className="text-[17px]" />New Request</button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label:"Total Requests", value:"1,284", sub:"+12% vs last month", icon:"assignment", bg:"bg-[#e8edf8]", color:"text-[#1e3a8a]", subColor:"text-[#16a34a]" },
            { label:"Pending Approval", value:"42",   sub:"+5% from yesterday", icon:"pending_actions", bg:"bg-[#fff7ed]", color:"text-[#c2410c]", subColor:"text-[#dc2626]" },
            { label:"Active Missions", value:"156",  sub:"Steady", icon:"commute", bg:"bg-[#e0f2fe]", color:"text-[#0369a1]", subColor:"text-[#64748b]", bar:true, barVal:65 },
            { label:"Completed Today", value:"89",   sub:"+18 missions", icon:"task_alt", bg:"bg-[#dcfce7]", color:"text-[#16a34a]", subColor:"text-[#16a34a]" },
          ].map(c => (
            <div key={c.label} className="bg-white rounded-2xl p-5 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center`}>
                  <Icon name={c.icon} className={`${c.color} text-[20px]`} />
                </div>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">{c.label}</div>
              <div className="text-[28px] font-bold text-[#0f172a] leading-tight">{c.value}</div>
              {c.bar ? (
                <div className="mt-2">
                  <div className="h-[3px] bg-[#f1f5f9] rounded-full overflow-hidden mt-1"><div className="bg-[#0ea5e9] h-full rounded-full" style={{width:`${c.barVal}%`}} /></div>
                  <div className={`text-[11px] mt-1 ${c.subColor}`}>{c.sub}</div>
                </div>
              ) : <div className={`text-[11px] mt-1 font-semibold ${c.subColor}`}>{c.sub}</div>}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#f1f5f9] flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[16px]" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Requests..."
                className="w-full h-9 pl-9 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20" />
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="h-9 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] font-semibold text-[#475569] focus:outline-none">
              {["All","ONGOING","PENDING","COMPLETED"].map(s=><option key={s} value={s}>Status: {s}</option>)}
            </select>
            <select className="h-9 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] font-semibold text-[#475569] focus:outline-none">
              <option>Priority: All</option><option>HIGH</option><option>MEDIUM</option><option>LOW</option>
            </select>
            <div className="flex items-center gap-2 h-9 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] text-[#475569]">
              <Icon name="calendar_today" className="text-[15px]" />
              Oct 20, 2024 – Oct 27, 2024
            </div>
          </div>

          <table className="w-full">
            <thead><tr className="bg-[#f8fafc]">
              {["REQUEST ID","REQUESTER","VEHICLE & DRIVER","DESTINATION","SCHEDULE","PRIORITY","STATUS","ACTIONS"].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-[#94a3b8] uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id} className="border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-4 py-4 text-[13px] font-bold text-[#1e3a8a]">{r.id}</td>
                  <td className="px-4 py-4">
                    <div className="text-[13px] font-bold text-[#0f172a]">{r.name}</div>
                    <div className="text-[10px] font-bold uppercase text-[#94a3b8] tracking-wider">{r.dept}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[12px] font-bold text-[#0f172a]">{r.vehicle}</div>
                    <div className="text-[11px] text-[#94a3b8]">Driver: {r.driver}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[13px] text-[#0f172a]">{r.dest}</div>
                    <div className="text-[11px] italic text-[#94a3b8]">{r.destSub}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-[12px] text-[#0f172a]">{r.sched}</div>
                    <div className="text-[11px] text-[#94a3b8]">{r.dur}</div>
                  </td>
                  <td className="px-4 py-4 text-[12px] text-[#64748b]">—</td>
                  <td className="px-4 py-4">
                    {r.status && <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${r.statusColor}`}>{r.status}</span>}
                  </td>
                  <td className="px-4 py-4">
                    <button className="w-8 h-8 rounded-lg hover:bg-[#f1f5f9] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <Icon name="more_vert" className="text-[#64748b] text-[18px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#f1f5f9] flex items-center justify-between bg-[#fafbfc]">
            <span className="text-[12px] text-[#94a3b8]">Showing 1 to 10 of 284 requests</span>
            <div className="flex gap-1.5">
              {[1,2,3,"…",29].map((n,i)=>(
                <button key={i} className={`w-7 h-7 rounded text-[12px] font-semibold border transition-colors ${n===1?"bg-[#1e3a8a] text-white border-[#1e3a8a]":"border-[#e2e8f0] text-[#475569] hover:bg-[#f1f5f9]"}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}