import { Search, Bell, AlertTriangle } from "lucide-react";
import type { Tab } from "../../types";

interface HeaderProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
  unreadNotificationsCount: number;
  unresolvedConflictsCount: number;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onNotificationClick: () => void;
  onAlertClick: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  unreadNotificationsCount,
  unresolvedConflictsCount,
  searchTerm,
  onSearchTermChange,
  onNotificationClick,
  onAlertClick
}: HeaderProps) {
  // Map internal technical tab labels to elegant display headers matching screenshots
  const displayTitleMap: Record<Tab, string> = {
    Dashboard: "Administrator Dashboard",
    "Vehicle Management": "Vehicle Management",
    "Driver Management": "Driver Management Suite",
    "Request Monitoring": "Request Monitoring Hub",
    "Vehicle Schedule": "Schedule Management",
    "Reports & Analytics": "Reports & Analytics Studio",
    "User Management": "User Management Control",
    "Role Management": "Access Role Management",
    "Notification Center": "Operational Notification Center",
    "Audit Logs": "Security Audit Logs",
    "System Settings": "System Configuration Settings"
  };

  return (
    <header className="h-16 bg-white border-b border-slate-100 px-8 flex items-center justify-between shrink-0 sticky top-0 z-40">
      {/* Dynamic Title */}
      <div className="flex items-center gap-3">
        <h2 className="font-display font-bold text-lg text-slate-900 tracking-tight">
          {displayTitleMap[currentTab] || currentTab}
        </h2>
      </div>

      {/* Global Resource Query Bar */}
      <div className="flex-1 max-w-md mx-8 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          placeholder={`Global query in ${currentTab.toLowerCase()}...`}
          className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#cbdbf5] focus:bg-white transition-all duration-200"
        />
      </div>

      {/* Action Anchors */}
      <div className="flex items-center gap-6">
        {/* Urgent Warning Notification Bell */}
        <button
          onClick={onNotificationClick}
          className="relative p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          title="Buka Pusat Notifikasi"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] border-2 border-white rounded-full animate-pulse" />
          )}
        </button>

        {/* Operational Conflict Flag Trigger */}
        <button
          onClick={onAlertClick}
          className="relative p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
          title="Buka Jadwal & Konflik Kritis"
        >
          <AlertTriangle className={`w-5 h-5 ${unresolvedConflictsCount > 0 ? "text-[#ba1a1a]" : ""}`} />
          {unresolvedConflictsCount > 0 && (
            <span className="absolute -top-1 -right-1 px-1 py-0.2 bg-[#ba1a1a] text-white font-mono font-bold text-[8px] rounded-md">
              {unresolvedConflictsCount}
            </span>
          )}
        </button>

        {/* Vertical Separator */}
        <div className="w-px h-6 bg-slate-100" />

        {/* Session Administrator Identity Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <h5 className="font-semibold text-xs text-slate-900 leading-tight">
              Admin User
            </h5>
            <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase leading-none mt-0.5">
              Fleet Supervisor
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
            alt="Alex Rivera Admin Profile Thumbnail"
            className="w-10 h-10 rounded-full border border-slate-100 object-cover cursor-pointer hover:border-[#cbdbf5] transition-all"
            onClick={() => onTabChange("System Settings")}
          />
        </div>
      </div>
    </header>
  );
}
