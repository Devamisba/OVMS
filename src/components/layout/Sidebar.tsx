import {
  LayoutDashboard,
  Car,
  Users,
  Calendar,
  BarChart3,
  Shield,
  UserCog,
  Bell,
  ClipboardList,
  Settings,
  Activity
} from "lucide-react";
import { type Tab } from "../../types/types.ts";

interface SidebarProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  unreadCount: number;
}

export default function Sidebar({ currentTab, onTabChange, unreadCount }: SidebarProps) {
  const mainNavigation = [
    { name: "Dashboard" as Tab, icon: LayoutDashboard },
    { name: "Vehicle Management" as Tab, icon: Car },
    { name: "Driver Management" as Tab, icon: Users },
    { name: "Request Monitoring" as Tab, icon: ClipboardList },
    { name: "Vehicle Schedule" as Tab, icon: Calendar },
    { name: "Reports & Analytics" as Tab, icon: BarChart3 }
  ];

  const adminNavigation = [
    { name: "User Management" as Tab, icon: UserCog },
    { name: "Role Management" as Tab, icon: Shield },
    { name: "Notification Center" as Tab, icon: Bell, indicator: true },
    { name: "Audit Logs" as Tab, icon: Activity },
    { name: "System Settings" as Tab, icon: Settings }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col shrink-0 min-h-screen">
      {/* Brand Identification Logo Block */}
      <div className="p-6 border-b border-slate-50 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00236f] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#00236f]/10">
          <Car className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-[#00236f] leading-none tracking-tight">
            OVMS
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Enterprise Fleet
          </p>
        </div>
      </div>

      {/* Main Navigation menu scrolling zone */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => onTabChange(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#e5eeff] text-[#00236f]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#00236f]" : "text-slate-400"}`} />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Administration boundary section */}
        <div className="space-y-2">
          <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            Administration
          </p>
          <div className="space-y-1">
            {adminNavigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => onTabChange(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#e5eeff] text-[#00236f]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#00236f]" : "text-slate-400"}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.indicator && unreadCount > 0 && (
                    <span className="w-5 h-5 bg-[#ba1a1a] text-white font-mono font-bold text-[10px] rounded-full flex items-center justify-center shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active profile static card section at the bottom */}
      <div className="p-4 border-t border-slate-50 bg-[#f8f9ff]/50">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
            alt="Alex Rivera Admin Avatar"
            className="w-9 h-9 rounded-full object-cover border border-[#cbdbf5]"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-xs text-slate-900 truncate">
              Alex Rivera
            </h4>
            <p className="text-[10px] text-slate-400 font-medium truncate">
              Admin | Fleet Supervisor
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
