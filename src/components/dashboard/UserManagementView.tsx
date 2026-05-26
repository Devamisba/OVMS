import { useState } from "react";
import { Layout, Icon } from "../layout/layout.tsx";

const EMPLOYEES = [
  { id:"#EMP-2840", name:"Johnathan Doe",  email:"j.doe@ovms-enterprise.com",    dept:"Logistics Ops", role:"Fleet Manager",    status:"ACTIVE",    lastLogin:"2 mins ago" },
  { id:"#EMP-2915", name:"Alina Smith",    email:"a.smith@ovms-enterprise.com",   dept:"Finance",       role:"Approver",         status:"INACTIVE",  lastLogin:"3 days ago" },
  { id:"#EMP-3042", name:"Marcus Knight",  email:"m.knight@ovms-enterprise.com",  dept:"Maintenance",   role:"Lead Mechanic",    status:"ACTIVE",    lastLogin:"1 hour ago" },
  { id:"#EMP-1102", name:"Robert Hanger",  email:"r.hanger@ovms-enterprise.com",  dept:"Operations",    role:"Driver",           status:"SUSPENDED", lastLogin:"Oct 12, 2023" },
  { id:"#EMP-4521", name:"Sarah Peters",   email:"s.peters@ovms-enterprise.com",  dept:"System Admin",  role:"Administrator",    status:"ACTIVE",    lastLogin:"Online" },
];

const statusStyle: Record<string,string> = {
  ACTIVE:"bg-[#dcfce7] text-[#16a34a]",
  INACTIVE:"bg-[#f1f5f9] text-[#64748b]",
  SUSPENDED:"bg-[#dc2626] text-white",
};

export default function UserManagementView({ onNavigate }: { onNavigate?: (p:string)=>void }) {
  const [search, setSearch] = useState("");
  const [addClicked, setAddClicked] = useState(false);

  const filtered = EMPLOYEES.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout activeNav="User Management" onNavigate={onNavigate} topbarTitle="User Management" searchPlaceholder="Quick search schedules..." userRole="Fleet Supervisor">
      <div className="p-6 space-y-5 animate-fadein">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[26px] font-bold text-[#0f172a]">User Management</h2>
            <p className="text-[13px] text-[#64748b] mt-1">Manage employees, drivers, approvers, and administrator access.</p>
          </div>
          <div className="flex gap-2.5">
            <button className="flex items-center gap-2 h-10 px-4 border border-[#e2e8f0] bg-white rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#f8fafc] shadow-sm"><Icon name="tune" className="text-[17px]" />Filter</button>
            <button className="flex items-center gap-2 h-10 px-4 border border-[#e2e8f0] bg-white rounded-xl text-[13px] font-bold text-[#475569] hover:bg-[#f8fafc] shadow-sm"><Icon name="ios_share" className="text-[17px]" />Export</button>
            <button onClick={()=>setAddClicked(true)} className="flex items-center gap-2 h-10 px-5 bg-[#1e3a8a] hover:bg-[#1e40af] text-white rounded-xl text-[13px] font-bold shadow-sm active:scale-95 transition-all">
              <Icon name="add" className="text-[17px]" />{addClicked?"User Added!":"Add User"}
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-6 gap-3">
          {[
            { label:"Total Users",    value:"1,240", badge:"+12%", up:true,  icon:"groups",         bg:"bg-[#e8edf8]", color:"text-[#1e3a8a]" },
            { label:"Active Users",   value:"1,180", badge:"+5%",  up:true,  icon:"person_check",   bg:"bg-[#dcfce7]", color:"text-[#16a34a]" },
            { label:"Drivers",        value:"450",   badge:"0%",   up:true,  icon:"directions_car", bg:"bg-[#e0f2fe]", color:"text-[#0369a1]" },
            { label:"Approvers",      value:"42",    badge:"+2",   up:true,  icon:"approval",       bg:"bg-[#fef3c7]", color:"text-[#d97706]" },
            { label:"Administrators", value:"12",    badge:"Stable",up:true, icon:"admin_panel_settings",bg:"bg-[#ede9fe]",color:"text-[#7c3aed]" },
            { label:"Suspended",      value:"8",     badge:"-1",   up:false, icon:"person_off",     bg:"bg-[#fee2e2]", color:"text-[#dc2626]" },
          ].map(c=>(
            <div key={c.label} className="bg-white rounded-2xl p-4 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className={`w-9 h-9 ${c.bg} rounded-xl flex items-center justify-center`}>
                  <Icon name={c.icon} className={`${c.color} text-[18px]`} />
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${c.up?"bg-[#dcfce7] text-[#16a34a]":"bg-[#fee2e2] text-[#dc2626]"}`}>{c.badge}</span>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] mt-1">{c.label}</div>
              <div className="text-[22px] font-bold text-[#0f172a] leading-tight">{c.value}</div>
            </div>
          ))}
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f1f5f9] flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#0f172a]">All Employees</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[15px]" />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
                  className="h-8 pl-9 pr-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-[12px] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 w-48" />
              </div>
              <span className="text-[12px] text-[#94a3b8]">Showing 1-10 of 1,240</span>
              <button className="w-7 h-7 rounded border border-[#e2e8f0] flex items-center justify-center opacity-40" disabled><Icon name="chevron_left" className="text-[16px]" /></button>
              <button className="w-7 h-7 rounded border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f1f5f9]"><Icon name="chevron_right" className="text-[16px]" /></button>
            </div>
          </div>
          <table className="w-full">
            <thead><tr className="bg-[#f8fafc]">
              {["EMPLOYEE ID","FULL NAME","EMAIL","DEPARTMENT","ROLE","STATUS","LAST LOGIN"].map(h=>(
                <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-[#94a3b8] uppercase tracking-wide">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(e=>(
                <tr key={e.id} className="border-t border-[#f1f5f9] hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-4 py-3.5 text-[12px] font-bold text-[#1e3a8a]">{e.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#e2e8f0] flex items-center justify-center text-[11px] font-bold text-[#475569] flex-shrink-0">
                        {e.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                      </div>
                      <span className="text-[13px] font-semibold text-[#0f172a]">{e.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[12px] text-[#64748b]">{e.email}</td>
                  <td className="px-4 py-3.5 text-[13px] text-[#475569]">{e.dept}</td>
                  <td className="px-4 py-3.5 text-[13px] text-[#475569]">{e.role}</td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle[e.status]}`}>{e.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-[12px] text-[#475569]">{e.lastLogin}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-5 py-3 border-t border-[#f1f5f9] flex items-center justify-between bg-[#fafbfc]">
            <span className="text-[12px] text-[#94a3b8]">Showing 1-10 of 1,240</span>
            <div className="flex gap-1.5">
              {[1,2,3,"…",124].map((n,i)=>(
                <button key={i} className={`w-7 h-7 rounded text-[12px] font-semibold border transition-colors ${n===1?"bg-[#1e3a8a] text-white border-[#1e3a8a]":"border-[#e2e8f0] text-[#475569] hover:bg-[#f1f5f9]"}`}>{n}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-4 pb-4">
          {/* Security Events */}
          <div className="col-span-7 bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-5">
            <h3 className="text-[15px] font-bold text-[#0f172a] mb-4">Recent Security Events</h3>
            <div className="space-y-4">
              {[
                { bg:"bg-[#475569]", icon:"lock_reset", text:<>Password reset initiated for <b>Robert Hanger</b></>, sub:"by Administrator • 14:20 PM" },
                { bg:"bg-[#1e3a8a]", icon:"person_add", text:<>New driver account created: <b>Marco Verratti</b></>,  sub:"Automated System • 11:05 AM" },
                { bg:"bg-[#dc2626]", icon:"block",       text:<>Failed login attempt from unrecognized IP (88.192.x.x)</>, sub:"Security Protocol • 09:12 AM" },
              ].map((ev,i)=>(
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full ${ev.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={ev.icon} className="text-white text-[15px]" />
                  </div>
                  <div>
                    <div className="text-[13px] text-[#0f172a]">{ev.text}</div>
                    <div className="text-[11px] text-[#94a3b8] mt-0.5">{ev.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Access Roles */}
          <div className="col-span-5 bg-[#0f2a5e] rounded-2xl p-5 shadow-sm">
            <h3 className="text-[15px] font-bold text-white mb-1">Access Roles</h3>
            <p className="text-[12px] text-[#93c5fd] mb-4">Review and update global permission sets for organizational departments.</p>
            <div className="space-y-2.5">
              {["Manage Permissions","Department Mapping","Audit Security Logs"].map(item=>(
                <button key={item} className="w-full flex items-center justify-between bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-3 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.98]">
                  {item}
                  <Icon name="arrow_forward" className="text-[18px]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}