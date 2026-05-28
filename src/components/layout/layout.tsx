import type { CSSProperties, ReactNode } from "react";
import { NAV_MAIN, NAV_ADMIN } from "./navData";

export function Icon({ name, className = "", style }: { name: string; className?: string; style?: CSSProperties }) {
  return (
    <span className={`material-symbols-outlined select-none leading-none ${className}`}
      style={{ fontVariationSettings:"'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24", ...style }}>
      {name}
    </span>
  );
}

export function Sidebar({ activeNav, onNavigate }: { activeNav: string; onNavigate?: (p: string) => void }) {
  const go = (label: string) => { onNavigate?.(label); };
  const btn = (item: { icon: string; label: string }) => (
    <button key={item.label} onClick={() => go(item.label)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
        activeNav === item.label
          ? "bg-[#1e3a8a] text-white shadow-sm scale-[1.01]"
          : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e293b] hover:translate-x-0.5"
      }`}>
      <Icon name={item.icon} className={`text-[21px] flex-shrink-0 ${activeNav === item.label ? "text-white" : "text-[#64748b]"}`} />
      <span className="text-[13.5px] font-semibold truncate">{item.label}</span>
    </button>
  );
  return (
    <aside className="w-[220px] flex-shrink-0 bg-white border-r border-[#e2e8f0] flex flex-col overflow-y-auto">
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
        {NAV_MAIN.map(btn)}
        <div className="pt-4 pb-2 px-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Administration</span>
        </div>
        {NAV_ADMIN.map(btn)}
      </nav>
      <div className="h-4" />
    </aside>
  );
}

export function Topbar({ title, userName = "Admin User", userRole = "Administrator", searchPlaceholder = "Quick search...", searchValue, onSearchChange }:
  { title: string; userName?: string; userRole?: string; searchPlaceholder?: string; searchValue?: string; onSearchChange?: (value: string) => void }) {
  return (
    <header className="bg-white border-b border-[#e2e8f0] px-8 h-[68px] flex items-center justify-between flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-6">
        <h1 className="text-[18px] font-bold text-[#0f172a]">{title}</h1>
        <div className="relative">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-[18px]" />
          <input type="text" value={searchValue} onChange={e => onSearchChange?.(e.target.value)} placeholder={searchPlaceholder}
            className="h-9 pl-9 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-full text-[13px] text-[#475569] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 w-56" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f1f5f9]">
          <Icon name="notifications" className="text-[#475569] text-[22px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-white" />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f1f5f9]">
          <Icon name="warning" className="text-[#475569] text-[22px]" />
        </button>
        <div className="w-px h-7 bg-[#e2e8f0] mx-2" />
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="text-right">
            <div className="text-[13px] font-bold text-[#0f172a] leading-tight">{userName}</div>
            <div className="text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider">{userRole}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#1e3a8a] border-2 border-[#e2e8f0] overflow-hidden">
            <img src="https://i.pravatar.cc/40?img=12" alt="" className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export function Layout({ activeNav, onNavigate, topbarTitle, userName, userRole, searchPlaceholder, searchValue, onSearchChange, children }:
  { activeNav: string; onNavigate?: (p:string)=>void; topbarTitle: string; userName?: string; userRole?: string; searchPlaceholder?: string; searchValue?: string; onSearchChange?: (value: string) => void; children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden animate-fadein" style={{ fontFamily:"'Inter',sans-serif" }}>
      <Sidebar activeNav={activeNav} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={topbarTitle} userName={userName} userRole={userRole} searchPlaceholder={searchPlaceholder} searchValue={searchValue} onSearchChange={onSearchChange} />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .material-symbols-outlined{font-family:'Material Symbols Outlined';font-weight:normal;font-style:normal;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;vertical-align:middle;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:8px;}
        @keyframes fadein{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .animate-fadein{animation:fadein 0.25s ease-out;}
        @keyframes slidein{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
        .animate-slidein{animation:slidein 0.2s ease-out;}
        @keyframes pulse-dot{0%,100%{opacity:1}50%{opacity:0.4}}
        .animate-pulse-dot{animation:pulse-dot 1.5s ease-in-out infinite;}
      `}</style>
    </div>
  );
}
