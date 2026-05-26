import type {
  Vehicle,
  Driver,
  FleetRequest,
  ScheduleItem,
  ScheduleConflict,
  SystemNotification,
  AuditLog,
  UserAccount,
  Role,
  SystemConfig
} from "./types";

export const initialVehicles: Vehicle[] = [
  {
    id: "V-4029",
    model: "Tesla Model 3",
    plate: "LXP-4029-BE",
    type: "Electric Sedan",
    driverId: "D-001",
    driverName: "John Doe",
    status: "AVAILABLE",
    battery: 82,
    fuelType: "Electric",
    odometer: 12450,
    nextMaint: "Oct 24, 2024",
    imageType: "tesla",
    vin: "5YJ3E1EB2LF89028"
  },
  {
    id: "V-9912",
    model: "Ford F-150 Cargo",
    plate: "VGT-9912-TR",
    type: "Heavy Duty Truck",
    driverId: "D-002",
    driverName: "Sarah Miller",
    status: "IN TRANSIT",
    battery: 45,
    fuelType: "Diesel",
    odometer: 45200,
    nextMaint: "Sep 12, 2024",
    imageType: "truck",
    vin: "1FTFW1ED1KE34045"
  },
  {
    id: "V-1102",
    model: "Toyota RAV4",
    plate: "HJL-1102-SU",
    type: "Compact SUV",
    driverId: "",
    driverName: "Unassigned",
    status: "MAINTENANCE",
    battery: 12,
    fuelType: "Hybrid",
    odometer: 8900,
    nextMaint: "OVERDUE",
    imageType: "rav4",
    vin: "JTMDFRFV3KD01825"
  },
  {
    id: "V-8829",
    model: "Audi A6",
    plate: "V-8829-AD",
    type: "Luxury Sedan",
    driverId: "D-003",
    driverName: "Mark Wilson",
    status: "AVAILABLE",
    battery: 95,
    fuelType: "Gasoline",
    odometer: 28430,
    nextMaint: "Nov 15, 2024",
    imageType: "tesla",
    vin: "WA1FGAFC8LA401825"
  },
  {
    id: "V-1104",
    model: "Ford Ranger",
    plate: "RNG-1104-QA",
    type: "Pickup Truck",
    driverId: "D-004",
    driverName: "Sarah Jenkins",
    status: "AVAILABLE",
    battery: 70,
    fuelType: "Gasoline",
    odometer: 31200,
    nextMaint: "Dec 05, 2024",
    imageType: "ranger",
    vin: "1FTER4EH2LA51829"
  },
  {
    id: "V-5521",
    model: "Mercedes Sprinter",
    plate: "KLO-5521-X",
    type: "M. Sprinter Van",
    driverId: "D-005",
    driverName: "Robert Wilson",
    status: "AVAILABLE",
    battery: 60,
    fuelType: "Diesel",
    odometer: 64100,
    nextMaint: "Oct 29, 2024",
    imageType: "truck",
    vin: "WD3PF4CC5KP19825"
  }
];

export const initialDrivers: Driver[] = [
  {
    id: "D-001",
    name: "John Doe",
    status: "AVAILABLE",
    licenseType: "Class A",
    licenseExpiry: "Oct 24, 2025",
    performance: 4.9,
    assignedVehicleId: "V-4029",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
    phone: "+1 (555) 019-2834",
    email: "john.doe@kinetic-fleet.com"
  },
  {
    id: "D-002",
    name: "Sarah Miller",
    status: "ON DUTY",
    licenseType: "Class B",
    licenseExpiry: "Nov 12, 2024",
    performance: 4.7,
    assignedVehicleId: "V-9912",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    phone: "+1 (555) 018-2940",
    email: "sarah.miller@kinetic-fleet.com"
  },
  {
    id: "D-003",
    name: "Mark Wilson",
    status: "AVAILABLE",
    licenseType: "Class A",
    licenseExpiry: "Mar 15, 2026",
    performance: 4.8,
    assignedVehicleId: "V-8829",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    phone: "+1 (555) 012-9214",
    email: "mark.wilson@kinetic-fleet.com"
  },
  {
    id: "D-004",
    name: "Sarah Jenkins",
    status: "ON DUTY",
    licenseType: "Class B",
    licenseExpiry: "Jun 10, 2025",
    performance: 4.6,
    assignedVehicleId: "V-1104",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    phone: "+1 (555) 021-9988",
    email: "s.jenkins@kinetic-fleet.com"
  },
  {
    id: "D-005",
    name: "Robert Wilson",
    status: "OFF DUTY",
    licenseType: "Class A",
    licenseExpiry: "Jun 15, 2024",
    performance: 4.2,
    assignedVehicleId: "V-5521",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    phone: "+1 (555) 902-3142",
    email: "robert.wilson@kinetic-fleet.com"
  },
  {
    id: "D-006",
    name: "Elena Rodriguez",
    status: "LEAVE",
    licenseType: "Class B",
    licenseExpiry: "Jan 08, 2026",
    performance: 4.8,
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
    phone: "+1 (555) 035-1829",
    email: "e.rodriguez@kinetic-fleet.com"
  }
];

export const initialFleetRequests: FleetRequest[] = [
  {
    id: "REQ-2048",
    employee: "Sarah Donovan",
    email: "s.donovan@kinetic-fleet.com",
    department: "Corporate Park, Sector 4",
    destination: "Regional HQ Conference",
    vehicleModel: "Audi A6",
    driverName: "Mark Wilson",
    date: "Oct 14, 2023",
    time: "08:30",
    status: "APPROVED",
    priority: "HIGH"
  },
  {
    id: "REQ-2049",
    employee: "James Doe",
    email: "j.doe@kinetic-fleet.com",
    department: "Logistics Ops",
    destination: "Central Warehouse Inventory Audit",
    vehicleModel: "Toyota Hilux",
    driverName: "John Doe",
    date: "Oct 24, 2024",
    time: "08:00",
    status: "APPROVED",
    priority: "URGENT"
  },
  {
    id: "REQ-2050",
    employee: "Sarah White",
    email: "s.white@kinetic-fleet.com",
    department: "Marketing",
    destination: "Tech Expo Plaza Event Setup",
    vehicleModel: "Honda CR-V",
    driverName: "Marcus Lee",
    date: "Oct 24, 2024",
    time: "10:00",
    status: "ONGOING",
    priority: "NORMAL"
  },
  {
    id: "REQ-2051",
    employee: "Alan Kim",
    email: "a.kim@kinetic-fleet.com",
    department: "Engineering",
    destination: "Power Substation 4 Site Inspection",
    vehicleModel: "Ford Ranger",
    driverName: "Unassigned",
    date: "Oct 25, 2024",
    time: "07:00",
    status: "PENDING",
    priority: "HIGH"
  },
  {
    id: "REQ-2052",
    employee: "Elena Post",
    email: "e.post@kinetic-fleet.com",
    department: "Admin",
    destination: "Airport Terminal 2 Guest Pickup",
    vehicleModel: "Nissan Urvan",
    driverName: "Robert Fox",
    date: "Oct 23, 2024",
    time: "23:30",
    status: "COMPLETED",
    priority: "NORMAL"
  }
];

export const initialScheduleItems: ScheduleItem[] = [
  {
    id: "SCH-001",
    vehicleId: "V-8829",
    vehicleLabel: "V-8829 (Sedan)",
    type: "Regular Mission",
    title: "#REQ-294 • John D.",
    driverName: "John Doe",
    startTime: "09:00",
    endTime: "13:00",
    dateLabel: "Mon 12"
  },
  {
    id: "SCH-002",
    vehicleId: "V-8829",
    vehicleLabel: "V-8829 (Sedan)",
    type: "Regular Mission",
    title: "#REQ-301 • Sarah M.",
    driverName: "Sarah Miller",
    startTime: "14:00",
    endTime: "18:00",
    dateLabel: "Mon 12"
  },
  {
    id: "SCH-003",
    vehicleId: "V-1102",
    vehicleLabel: "V-1102 (SUV)",
    type: "Maintenance",
    title: "Oil Change & Brake Check",
    driverName: "Unassigned",
    startTime: "10:00",
    endTime: "16:00",
    dateLabel: "Tue 13"
  },
  {
    id: "SCH-004",
    vehicleId: "V-5521",
    vehicleLabel: "V-5521 (Van)",
    type: "Recurring",
    title: "RECURRING: STAFF SHUTTLE (ROUTE A)",
    driverName: "Robert Wilson",
    startTime: "07:00",
    endTime: "19:00",
    dateLabel: "Mon 12"
  },
  {
    id: "SCH-005",
    vehicleId: "V-9011",
    vehicleLabel: "V-9011 (Sedan)",
    type: "Collision Conflict",
    title: "#REQ-294 • John D. (OVERLAP)",
    driverName: "John Doe",
    startTime: "09:00",
    endTime: "13:00",
    dateLabel: "Tue 13"
  }
];

export const initialConflicts: ScheduleConflict[] = [
  {
    id: "CONF-001",
    vehicleId: "V-9011",
    vehicleLabel: "V-9011 (Sedan)",
    title: "Overlap Detected: V-9011",
    description: "Request #312 and #315 are both scheduled for Oct 15, 09:00 - 13:00 on the same Camry unit.",
    type: "overlap",
    severity: "critical",
    actionRequired: true
  },
  {
    id: "CONF-002",
    vehicleId: "V-1102",
    vehicleLabel: "V-1102 (SUV)",
    title: "Unassigned Request #320",
    description: "High priority VIP transport needed for tomorrow at 08:30. No SUV currently available as V-1102 is in maintenance.",
    type: "unassigned",
    severity: "warning",
    actionRequired: true
  },
  {
    id: "CONF-003",
    vehicleId: "V-2291",
    vehicleLabel: "V-2291 (Sedan)",
    title: "Maintenance Due: V-2291",
    description: "Scheduled service in 48 hours. Ensure vehicle is grounded by tomorrow evening to avoid field failure.",
    type: "maintenance_due",
    severity: "info",
    actionRequired: false
  }
];

export const initialNotifications: SystemNotification[] = [
  {
    id: "NOT-001",
    title: "Collision Detected - Vehicle V-8821",
    description: "G-Force impact detected on Vehicle V-8821 at North Junction. Driver: Alex Rivera. Immediate dispatch required.",
    timeAgo: "2 mins ago",
    severity: "critical",
    category: "Operational",
    isRead: false,
    metadata: "Sector 7-B"
  },
  {
    id: "NOT-002",
    title: "Fuel Expense Approval Required",
    description: "Driver Sarah Jenkins has submitted a high-value fuel expense ($420.50) for approval. Fleet standard limit exceeded.",
    timeAgo: "45 mins ago",
    severity: "high",
    category: "Approvals",
    isRead: false,
    metadata: "Sarah Jenkins"
  },
  {
    id: "NOT-003",
    title: "Service Reminder: Brake Inspection",
    description: "Vehicle V-1102 has reached 15,000 km since last brake service. Maintenance window opening in 48 hours.",
    timeAgo: "2 hours ago",
    severity: "medium",
    category: "Maintenance",
    isRead: false,
    metadata: "V-1102 (Semi-Truck)"
  },
  {
    id: "NOT-004",
    title: "System Update Completed",
    description: "OVMS Core v2.4.1 has been successfully deployed. Check the changelog for new telematics reporting features.",
    timeAgo: "6 hours ago",
    severity: "info",
    category: "System",
    isRead: true,
    metadata: "Info"
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: "#EV-92831",
    user: "Marcus Chen",
    role: "Fleet Manager",
    activityType: "Vehicle Deletion",
    action: "Action: Permanent Removal of Vehicle V-1102",
    module: "Inventory",
    severity: "Critical",
    ipAddress: "192.168.1.45",
    timestamp: "2 mins ago",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "#EV-92830",
    user: "Sarah Jenkins",
    role: "Administrator",
    activityType: "Permission Change",
    action: "Action: Grant Admin Role on System Modules",
    module: "Security",
    severity: "High",
    ipAddress: "10.0.4.112",
    timestamp: "12 mins ago",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "#EV-92829",
    user: "Alex Rivera",
    role: "Fleet Supervisor",
    activityType: "Route Optimization",
    action: "AI suggested route optimization for logistics grid A-3",
    module: "Schedule",
    severity: "Stable",
    ipAddress: "192.168.1.10",
    timestamp: "45 mins ago",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  }
];

export const initialUserAccounts: UserAccount[] = [
  {
    id: "EMP-90231",
    fullName: "Alex Rivera",
    username: "arivera_admin",
    email: "arivera@ovms-logistics.com",
    phone: "+1 (555) 902-3142",
    department: "Fleet Operations",
    position: "Senior Fleet Supervisor",
    roleName: "Administrator",
    status: "ACTIVE",
    lastLogin: "Online",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "EMP-2840",
    fullName: "Johnnathan Doe",
    username: "john_doe_mgr",
    email: "j.doe@ovms-enterprise.com",
    phone: "+1 (555) 019-2834",
    department: "Logistics Ops",
    position: "Fleet Manager",
    roleName: "Transport Coordinator",
    status: "ACTIVE",
    lastLogin: "2 mins ago",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "EMP-2915",
    fullName: "Alina Smith",
    username: "alina_smith_apv",
    email: "a.smith@ovms-enterprise.com",
    phone: "+1 (555) 018-2940",
    department: "Finance",
    position: "Approver",
    roleName: "Approver",
    status: "INACTIVE",
    lastLogin: "3 days ago",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "EMP-3042",
    fullName: "Marcus Knight",
    username: "marcus_maint",
    email: "m.knight@ovms-enterprise.com",
    phone: "+1 (555) 012-9214",
    department: "Maintenance",
    position: "Lead Mechanic",
    roleName: "Driver",
    status: "ACTIVE",
    lastLogin: "1 hour ago",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
  },
  {
    id: "EMP-1102",
    fullName: "Robert Hanger",
    username: "robert_driver",
    email: "r.hanger@ovms-enterprise.com",
    phone: "+1 (555) 902-3142",
    department: "Operations",
    position: "Driver",
    roleName: "Driver",
    status: "SUSPENDED",
    lastLogin: "Oct 12, 2023",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
  }
];

export const initialRoles: Role[] = [
  {
    id: "role-1",
    name: "Administrator",
    description: "Full system access to all configurations, user groups, and fleet logs.",
    activePermissionsCount: 30,
    permissions: [
      { module: "Dashboard", view: true, create: true, edit: true, delete: true, approve: true, export: true, manage: true },
      { module: "Vehicles", view: true, create: true, edit: true, delete: true, approve: true, export: true, manage: true },
      { module: "Requests", view: true, create: true, edit: true, delete: true, approve: true, export: true, manage: true },
      { module: "Reports", view: true, create: true, edit: true, delete: true, approve: true, export: true, manage: true }
    ]
  },
  {
    id: "role-2",
    name: "Approver",
    description: "Financial & asset approval oversight for vehicle dispatches.",
    activePermissionsCount: 14,
    permissions: [
      { module: "Dashboard", view: true, create: false, edit: false, delete: false, approve: true, export: true, manage: false },
      { module: "Vehicles", view: true, create: false, edit: false, delete: false, approve: true, export: true, manage: false },
      { module: "Requests", view: true, create: true, edit: true, delete: false, approve: true, export: true, manage: false },
      { module: "Reports", view: true, create: false, edit: false, delete: false, approve: false, export: true, manage: false }
    ]
  },
  {
    id: "role-3",
    name: "Transport Coord.",
    description: "Fleet & scheduling operations with dispatch allocation privileges.",
    activePermissionsCount: 22,
    permissions: [
      { module: "Dashboard", view: true, create: true, edit: true, delete: false, approve: false, export: true, manage: true },
      { module: "Vehicles", view: true, create: true, edit: true, delete: false, approve: true, export: true, manage: true },
      { module: "Requests", view: true, create: true, edit: true, delete: false, approve: true, export: true, manage: true },
      { module: "Reports", view: true, create: true, edit: false, delete: false, approve: false, export: true, manage: false }
    ]
  },
  {
    id: "role-4",
    name: "Driver",
    description: "Vehicle data access only, logging of route and duty sheets.",
    activePermissionsCount: 6,
    permissions: [
      { module: "Dashboard", view: true, create: false, edit: false, delete: false, approve: false, export: false, manage: false },
      { module: "Vehicles", view: true, create: false, edit: false, delete: false, approve: false, export: false, manage: false },
      { module: "Requests", view: false, create: false, edit: false, delete: false, approve: false, export: false, manage: false },
      { module: "Reports", view: false, create: false, edit: false, delete: false, approve: false, export: false, manage: false }
    ]
  }
];

export const initialSystemConfig: SystemConfig = {
  systemName: "OVMS Enterprise Hub",
  timezone: "UTC (Coordinated Universal Time)",
  dateFormat: "MM/DD/YYYY",
  systemLanguage: "English (United States)",
  companyName: "Global Logistics Solutions Inc.",
  supportEmail: "support@gls-logistics.com",
  hqAddress: "1200 Enterprise Way, Tech District, San Francisco, CA 94105",
  mfaEnabled: true,
  sessionTimeout: 30,
  loginRetryLimit: "5 Attempts",
  ipWhitelist: "10.42.100.5, 10.42.100.12, 192.174.4.21",
  advancedEncryption: true
};
