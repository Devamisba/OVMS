import { useState } from "react";
import type { SystemConfig, SystemNotification, AuditLog } from "./types/types";
import { initialNotifications, initialAuditLogs, initialSystemConfig } from "./mockData";
import AuditLogsView from "./components/dashboard/AuditLogsView";
import DashboardView from "./components/dashboard/DashboardView";
import DriverView from "./components/dashboard/DriverView";
import NotificationCenterView from "./components/dashboard/NotificationCenterView";
import ReportsView from "./components/dashboard/ReportsView";
import RequestView from "./components/request/RequestView";
import RoleManagementView from "./components/dashboard/RoleManagementView";
import ScheduleView from "./components/dashboard/ScheduleView";
import SystemSettingsView from "./components/dashboard/SystemSettingsView";
import UserManagementView from "./components/dashboard/UserManagementView";
import VehicleView from "./components/dashboard/vehicle/VehicleView";

type Page =
  | "Dashboard"
  | "Vehicle Schedule"
  | "Vehicle Management"
  | "Driver Management"
  | "Request Monitoring"
  | "Reports & Analytics"
  | "User Management"
  | "Role Management"
  | "Notification Center"
  | "Audit Logs"
  | "System Settings";

// Placeholder untuk halaman yang belum dibuat
function ComingSoon({ page, onNavigate }: { page: string; onNavigate: (p: string) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#f1f5f9]"
      style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-16 h-16 bg-[#e8edf8] rounded-2xl flex items-center justify-center">
        <span className="material-symbols-outlined text-[32px] text-[#1e3a8a]"
          style={{ fontFamily: "'Material Symbols Outlined'" }}>
          construction
        </span>
      </div>
      <div className="text-center">
        <h2 className="text-[20px] font-bold text-[#0f172a]">{page}</h2>
        <p className="text-[14px] text-[#64748b] mt-1">This page is coming soon.</p>
      </div>
      <button
        onClick={() => onNavigate("Dashboard")}
        className="px-5 py-2.5 bg-[#1e3a8a] text-white rounded-xl text-[13px] font-bold hover:bg-[#1e40af] transition-colors"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Dashboard");
  const [notifications, setNotifications] = useState<SystemNotification[]>(initialNotifications);
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [systemConfig, setSystemConfig] = useState<SystemConfig>(initialSystemConfig);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((current) => current.map((notification) =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, isRead: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  };

  const handleSaveSystemConfig = (updated: SystemConfig) => {
    setSystemConfig(updated);
  };

  // Render halaman sesuai currentPage
  switch (currentPage) {
    case "Dashboard":
      return <DashboardView onNavigate={navigate} />;
    case "Vehicle Management":
      return <VehicleView onNavigate={navigate} />;
    case "Driver Management":
      return <DriverView onNavigate={navigate} />;
    case "Request Monitoring":
      return <RequestView onNavigate={navigate} />;
    case "Vehicle Schedule":
      return <ScheduleView onNavigate={navigate} />;
    case "Reports & Analytics":
      return <ReportsView onNavigate={navigate} />;
    case "User Management":
      return <UserManagementView onNavigate={navigate} />;
    case "Role Management":
      return <RoleManagementView onNavigate={navigate} />;
    case "Notification Center":
      return (
        <NotificationCenterView
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onMarkAllAllAsRead={handleMarkAllAsRead}
          onDeleteNotification={handleDeleteNotification}
        />
      );
    case "Audit Logs":
      return <AuditLogsView logs={auditLogs} />;
    case "System Settings":
      return <SystemSettingsView config={systemConfig} onSaveConfig={handleSaveSystemConfig} />;
    default:
      return (
        <div className="flex h-screen">
          <ComingSoon page={currentPage} onNavigate={navigate} />
        </div>
      );
  }
}