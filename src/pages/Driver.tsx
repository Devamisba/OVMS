import { useState } from "react";
import { Layout, Icon } from "../components/layout/layout.tsx";

const DRIVERS = [
  { name:"Marcus Chen",    emp:"EMP-90231", status:"AVAILABLE", statusColor:"bg-[#dcfce7] text-[#16a34a]",  vehicle:"Unassigned", license:"Class A", expiry:"Oct 24, 2025", expiryAlert:false, score:4.9, img:"https://i.pravatar.cc/40?img=33" },
  { name:"Sarah Jenkins",  emp:"EMP-88422", status:"ON DUTY",   statusColor:"bg-[#dbeafe] text-[#1d4ed8]",  vehicle:"ABC-1234",   license:"Class B", expiry:"Nov 12, 2024", expiryAlert:false, score:4.7, img:"https://i.pravatar.cc/40?img=44" },
  { name:"Robert Wilson",  emp:"EMP-77109", status:"OFF DUTY",  statusColor:"bg-[#f1f5f9] text-[#64748b]",  vehicle:"Unassigned", license:"Class A", expiry:"Jun 15, 2024", expiryAlert:true,  score:4.2, img:"https://i.pravatar.cc/40?img=55" },
  { name:"Elena Rodriguez",emp:"EMP-90554", status:"OFF DUTY",  statusColor:"bg-[#f1f5f9] text-[#64748b]",  vehicle:"Unassigned", license:"Class B", expiry:"Jan 08, 2026", expiryAlert:false, score:4.8, img:"https://i.pravatar.cc/40?img=66" },
];

export default function Driver({ onNavigate }: { onNavigate?: (p:string)=>void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = DRIVERS
    .filter(d => statusFilter === "All" || d.status === statusFilter)
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.emp.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout activeNav="Driver Management" onNavigate={onNavigate} topbarTitle="Driver Management" searchPlaceholder="Global Search..." userRole="Administrator">
      <div className="p-6 space-y-5 animate-fadein">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[26px] font-bold text-[#0f172a]">Driver Management</h2>
            <p className="text-[13px] text-[#64748b] mt-1">Manage and monitor driver assignments, certifications, and availability.</p>
          </div>
          <div className="flex gap-2.5">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e2e8f0] bg-white rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
              <Icon name="upload" className="text-[17px]" />Import
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#e2e8f0] bg-white rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#f8fafc] transition-colors shadow-sm">
              <Icon name="download" className="text-[17px]" />Export
            </button>
            <button className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all shadow-sm active:scale-95">
              <Icon name="person_add" className="text-[17px]" />Add Driver
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label:"Total Drivers", value:"85", sub:"+4% vs last month", icon:"groups", color:"text-[#1e3a8a]", bg:"bg-[#e8edf8]", border:"" },
            { label:"Active / On Duty", value:"42", sub:"49%", icon:"commute", color:"text-[#0369a1]", bg:"bg-[#e0f2fe]", border:"", bar:true, barVal:49 },
            { label:"Expiring Soon", value:"5", sub:"Requires immediate action", icon:"notification_important", color:"text-[#dc2626]", bg:"bg-[#fee2e2]", border:"border-[#fecdd3]", urgent:true },
          ].map(c => (
            <div key={c.label} className={`bg-white rounded-2xl p-5 border ${c.border||"border-[#e2e8f0]"} shadow-sm hover:shadow-md transition-shadow ${c.urgent?"border-l-4 border-l-[#dc2626]":""}`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 ${c.bg} rounded-xl flex items-center justify-center`}>
                  <Icon name={c.icon} className={`${c.color} text-[20px]`} />
                </div>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mb-1">{c.label}</div>
              <div className={`text-[32px] font-bold leading-tight ${c.urgent?"text-[#dc2626]":"text-[#0f172a]"}`}>{c.value}</div>
              {c.bar ? (
                <div className="mt-2">
                  <div className="h-[3px] bg-[#f1f5f9] rounded-full overflow-hidden"><div className="bg-[#0ea5e9] h-full rounded-full" style={{width:`${c.barVal}%`}} /></div>
                  <div className="text-[11px] text-[#64748b] mt-1">{c.sub}</div>
                </div>
              ) : (
                <div className={`text-[11px] mt-1 ${c.urgent?"text-[#dc2626] font-semibold":"text-[#64748b]"}`}>{c.sub}</div>
              )}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#f1f5f9] flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[16px]" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Driver or ID..."
                className="w-full h-9 pl-9 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20" />
            </div>
            <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)}
              className="h-9 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] font-semibold text-[#475569] focus:outline-none">
              {["All","AVAILABLE","ON DUTY","OFF DUTY"].map(s=><option key={s} value={s}>Status: {s}</option>)}
            </select>
            <select className="h-9 px-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] font-semibold text-[#475569] focus:outline-none">
              <option>License Type</option><option>Class A</option><option>Class B</option>
            </select>
            <button onClick={()=>{setSearch("");setStatusFilter("All");}} className="h-9 px-4 border border-[#e2e8f0] rounded-lg text-[12px] font-bold text-[#475569] hover:bg-[#f1f5f9]">Reset</button>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[12px] text-[#94a3b8]">Showing 1-10 of 85</span>
              <button className="w-7 h-7 rounded border border-[#e2e8f0] flex items-center justify-center opacity-40" disabled><Icon name="chevron_left" className="text-[16px]" /></button>
              <button className="w-7 h-7 rounded border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9]"><Icon name="chevron_right" className="text-[16px]" /></button>
            </div>
          </div>

          <table className="w-full">
            <thead><tr className="bg-[#f8fafc]">
              {["DRIVER","STATUS","ASSIGNED VEHICLE","LICENSE TYPE","LICENSE EXPIRY","ACTIONS"].map(h=>(
                <th key={h} className="px-5 py-3 text-left text-[10.5px] font-bold text-[#94a3b8] uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(d=>(
                <tr key={d.emp} className="border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={d.img} alt="" className="w-9 h-9 rounded-full object-cover border border-[#e2e8f0]" />
                      <div>
                        <div className="text-[13px] font-bold text-[#0f172a]">{d.name}</div>
                        <div className="text-[11px] text-[#94a3b8]">{d.emp}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${d.statusColor}`}>{d.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-[13px] font-semibold text-[#0f172a]">{d.vehicle}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[#475569]">{d.license}</td>
                  <td className="px-5 py-3.5">
                    <div className={d.expiryAlert?"text-[#dc2626] font-bold":"text-[#475569]"}>
                      <div className="text-[13px]">{d.expiry}</div>
                      {d.expiryAlert && <div className="text-[10px] font-bold uppercase tracking-wider">Expiring in 5 days</div>}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#eef2ff] text-[#1e3a8a] text-[12px] font-semibold hover:bg-[#dbeafe] transition">
                        <Icon name="edit" className="text-[14px]" />Edit
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#fee2e2] text-[#b91c1c] text-[12px] font-semibold hover:bg-[#fecaca] transition">
                        <Icon name="delete" className="text-[14px]" />Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#f1f5f9] flex items-center justify-between bg-[#fafbfc]">
            <span className="text-[12px] text-[#94a3b8]">Showing 1 to 10 of 85 entries</span>
            <div className="flex gap-1.5">
              {[1,2,3,"…",9].map((n,i)=>(
                <button key={i} className={`w-7 h-7 rounded text-[12px] font-semibold border transition-colors ${n===2?"bg-[#1e3a8a] text-white border-[#1e3a8a]":"border-[#e2e8f0] text-[#475569] hover:bg-[#f1f5f9]"}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
