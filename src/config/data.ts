export type Priority = "URGENT" | "NORMAL" | "CRITICAL";
export type DriverStatus = "AVAILABLE" | "ON TRIP" | "OFF DUTY";

export interface Request {
  id: string;
  reqId: string;
  requesterName: string;
  role: string;
  avatar: string;
  priority: Priority;
  destination: string;
  date: string;
  time: string;
  vehicle: string;
  purpose: string;
}

export interface Driver {
  id: string;
  driverId: string;
  name: string;
  vehicle: string;
  avatar: string;
  status: DriverStatus;
  trips?: number;
  rating?: number;
}

export interface ActivityItem {
  id: string;
  type: "approved" | "completed" | "system";
  title: string;
  desc: string;
  time: string;
}

// ── Requests ──────────────────────────────────────────────────────────────
export const REQUESTS: Request[] = [
  {
    id: "1", reqId: "RQ-4421",
    requesterName: "Sarah Jenkins", role: "HR Dept", avatar: "https://i.pravatar.cc/40?img=47",
    priority: "URGENT", destination: "Regional Logistics Hub",
    date: "Oct 24", time: "09:00 AM", vehicle: "SUV Class", purpose: "Site Inspection",
  },
  {
    id: "2", reqId: "RQ-3312",
    requesterName: "Michael Ross", role: "Finance", avatar: "https://i.pravatar.cc/40?img=60",
    priority: "NORMAL", destination: "Downtown Office",
    date: "Oct 24", time: "02:30 PM", vehicle: "Sedan", purpose: "Client Meeting",
  },
  {
    id: "3", reqId: "RQ-5521",
    requesterName: "Marcus Chen", role: "Logistics Operations", avatar: "https://i.pravatar.cc/40?img=11",
    priority: "URGENT", destination: "North Port Distribution Hub, Sector 4",
    date: "Oct 24, 2023", time: "08:00 AM", vehicle: "Heavy Cargo Truck", purpose: "Emergency Supply Chain Restock - Priority A",
  },
  {
    id: "4", reqId: "RQ-6634",
    requesterName: "Elena Rodriguez", role: "Field Engineering", avatar: "https://i.pravatar.cc/40?img=20",
    priority: "NORMAL", destination: "South Terminal Maintenance Yard",
    date: "Oct 24, 2023", time: "10:30 AM", vehicle: "Maintenance Van", purpose: "Routine Equipment Inspection & Calibration",
  },
  {
    id: "5", reqId: "RQ-7891",
    requesterName: "Kevin Lim", role: "IT Department", avatar: "https://i.pravatar.cc/40?img=15",
    priority: "CRITICAL", destination: "HQ Data Center B",
    date: "Oct 24, 2023", time: "11:00 AM", vehicle: "SUV Premium", purpose: "Emergency Server Replacement",
  },
];

// ── Drivers ───────────────────────────────────────────────────────────────
export const DRIVERS: Driver[] = [
  { id: "1", driverId: "DR-8291", name: "Marcus Chen",     vehicle: "SUV Class • ID 992",  avatar: "https://i.pravatar.cc/40?img=11", status: "AVAILABLE", trips: 142, rating: 4.9 },
  { id: "2", driverId: "DR-9402", name: "Sarah J. Miller", vehicle: "Sedan • ID 841",       avatar: "https://i.pravatar.cc/40?img=47", status: "ON TRIP",   trips: 98,  rating: 4.7 },
  { id: "3", driverId: "DR-5521", name: "David Chen",      vehicle: "Bus • ID 210",         avatar: "",                                status: "OFF DUTY",  trips: 63,  rating: 4.5 },
  { id: "4", driverId: "DR-1102", name: "Robert Chen",     vehicle: "SUV Class • ID 992",   avatar: "https://i.pravatar.cc/40?img=60", status: "AVAILABLE", trips: 211, rating: 4.8 },
  { id: "5", driverId: "DR-3341", name: "Linda Wu",        vehicle: "Sedan • ID 841",       avatar: "https://i.pravatar.cc/40?img=5",  status: "ON TRIP",   trips: 77,  rating: 4.6 },
  { id: "6", driverId: "DR-4490", name: "James Peterson",  vehicle: "Bus • ID 210",         avatar: "https://i.pravatar.cc/40?img=13", status: "AVAILABLE", trips: 88,  rating: 4.7 },
  { id: "7", driverId: "DR-7712", name: "Ayu Pratiwi",     vehicle: "Sedan • ID 503",       avatar: "https://i.pravatar.cc/40?img=9",  status: "AVAILABLE", trips: 55,  rating: 4.9 },
  { id: "8", driverId: "DR-2239", name: "Budi Santoso",    vehicle: "Van • ID 117",         avatar: "https://i.pravatar.cc/40?img=33", status: "OFF DUTY",  trips: 34,  rating: 4.3 },
];

// ── Activity ──────────────────────────────────────────────────────────────
export const ACTIVITY: ActivityItem[] = [
  { id: "1", type: "approved",   title: "New request approved",  desc: "Director travel request #1029 needs assignment.", time: "2 minutes ago" },
  { id: "2", type: "completed",  title: "Trip #482 Completed",   desc: "Driver Robert Chen completed the airport drop-off.", time: "15 minutes ago" },
  { id: "3", type: "system",     title: "System Update",         desc: "Fleet maintenance schedule for June uploaded.", time: "1 hour ago" },
];