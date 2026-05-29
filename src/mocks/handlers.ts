import { http, HttpResponse } from 'msw';
import { initialVehicles } from './data/vehicles';
import { initialDrivers } from './data/drivers';
import { initialFleetRequests } from './data/requests';
import { initialScheduleItems } from './data/schedules';
import { initialConflicts } from './data/conflicts';
import { initialNotifications } from './data/notifications';
import { initialAuditLogs } from './data/auditLogs';
import { initialUserAccounts } from './data/users';
import { initialRoles } from './data/roles';
import { initialSystemConfig } from './data/systemConfig';
import type { Vehicle, Driver, FleetRequest, UserAccount, Role, SystemConfig } from '../types';

// Let's create in-memory databases using arrays, copying from initial mock data
let vehicles = [...initialVehicles];
let drivers = [...initialDrivers];
let requests = [...initialFleetRequests];
let schedules = [...initialScheduleItems];
let conflicts = [...initialConflicts];
let notifications = [...initialNotifications];
let auditLogs = [...initialAuditLogs];
let users = [...initialUserAccounts];
let roles = [...initialRoles];
let systemConfig = { ...initialSystemConfig };

export const handlers = [
  // --- Vehicles API ---
  http.get('/api/vehicles', () => {
    return HttpResponse.json({ data: vehicles, total: vehicles.length });
  }),
  http.get('/api/vehicles/:id', ({ params }) => {
    const vehicle = vehicles.find((v) => v.id === params.id);
    return vehicle
      ? HttpResponse.json({ data: vehicle })
      : new HttpResponse(JSON.stringify({ message: 'Vehicle not found' }), { status: 404 });
  }),
  http.post('/api/vehicles', async ({ request }) => {
    const newVehicle = (await request.json()) as Vehicle;
    vehicles.push(newVehicle);
    return HttpResponse.json({ data: newVehicle }, { status: 201 });
  }),
  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const updated = (await request.json()) as Partial<Vehicle>;
    const idx = vehicles.findIndex((v) => v.id === params.id);
    if (idx === -1) {
      return new HttpResponse(JSON.stringify({ message: 'Vehicle not found' }), { status: 404 });
    }
    vehicles[idx] = { ...vehicles[idx], ...updated };
    return HttpResponse.json({ data: vehicles[idx] });
  }),
  http.delete('/api/vehicles/:id', ({ params }) => {
    const exists = vehicles.some((v) => v.id === params.id);
    if (!exists) {
      return new HttpResponse(JSON.stringify({ message: 'Vehicle not found' }), { status: 404 });
    }
    vehicles = vehicles.filter((v) => v.id !== params.id);
    return HttpResponse.json({ message: 'Vehicle deleted successfully' });
  }),

  // --- Drivers API ---
  http.get('/api/drivers', () => {
    return HttpResponse.json({ data: drivers, total: drivers.length });
  }),
  http.post('/api/drivers', async ({ request }) => {
    const newDriver = (await request.json()) as Driver;
    drivers.push(newDriver);
    return HttpResponse.json({ data: newDriver }, { status: 201 });
  }),
  http.put('/api/drivers/:id', async ({ params, request }) => {
    const updated = (await request.json()) as Partial<Driver>;
    const idx = drivers.findIndex((d) => d.id === params.id);
    if (idx === -1) {
      return new HttpResponse(JSON.stringify({ message: 'Driver not found' }), { status: 404 });
    }
    drivers[idx] = { ...drivers[idx], ...updated };
    return HttpResponse.json({ data: drivers[idx] });
  }),
  http.delete('/api/drivers/:id', ({ params }) => {
    drivers = drivers.filter((d) => d.id !== params.id);
    return HttpResponse.json({ message: 'Driver deleted' });
  }),

  // --- Requests API ---
  http.get('/api/requests', () => {
    return HttpResponse.json({ data: requests, total: requests.length });
  }),
  http.post('/api/requests', async ({ request }) => {
    const newReq = (await request.json()) as FleetRequest;
    requests.push(newReq);
    return HttpResponse.json({ data: newReq }, { status: 201 });
  }),
  http.put('/api/requests/:id', async ({ params, request }) => {
    const updated = (await request.json()) as Partial<FleetRequest>;
    const idx = requests.findIndex((r) => r.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    requests[idx] = { ...requests[idx], ...updated };
    return HttpResponse.json({ data: requests[idx] });
  }),

  // --- Schedules API ---
  http.get('/api/schedules', () => {
    return HttpResponse.json({ data: schedules, total: schedules.length });
  }),

  // --- Conflicts API ---
  http.get('/api/conflicts', () => {
    return HttpResponse.json({ data: conflicts, total: conflicts.length });
  }),

  // --- Notifications API ---
  http.get('/api/notifications', () => {
    return HttpResponse.json({ data: notifications, total: notifications.length });
  }),
  http.put('/api/notifications/:id/read', ({ params }) => {
    const idx = notifications.findIndex((n) => n.id === params.id);
    if (idx !== -1) {
      notifications[idx].isRead = true;
      return HttpResponse.json({ data: notifications[idx] });
    }
    return new HttpResponse(null, { status: 404 });
  }),
  http.put('/api/notifications/mark-all-read', () => {
    notifications = notifications.map((n) => ({ ...n, isRead: true }));
    return HttpResponse.json({ message: 'All notifications marked as read' });
  }),

  // --- Audit Logs API ---
  http.get('/api/audit-logs', () => {
    return HttpResponse.json({ data: auditLogs, total: auditLogs.length });
  }),

  // --- Users API ---
  http.get('/api/users', () => {
    return HttpResponse.json({ data: users, total: users.length });
  }),
  http.post('/api/users', async ({ request }) => {
    const newUser = (await request.json()) as UserAccount;
    users.push(newUser);
    return HttpResponse.json({ data: newUser }, { status: 201 });
  }),
  http.put('/api/users/:id', async ({ params, request }) => {
    const updated = (await request.json()) as Partial<UserAccount>;
    const idx = users.findIndex((u) => u.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    users[idx] = { ...users[idx], ...updated };
    return HttpResponse.json({ data: users[idx] });
  }),
  http.delete('/api/users/:id', ({ params }) => {
    users = users.filter((u) => u.id !== params.id);
    return HttpResponse.json({ message: 'User deleted' });
  }),

  // --- Roles API ---
  http.get('/api/roles', () => {
    return HttpResponse.json({ data: roles, total: roles.length });
  }),
  http.post('/api/roles', async ({ request }) => {
    const newRole = (await request.json()) as Role;
    roles.push(newRole);
    return HttpResponse.json({ data: newRole }, { status: 201 });
  }),
  http.put('/api/roles/:id', async ({ params, request }) => {
    const updated = (await request.json()) as Partial<Role>;
    const idx = roles.findIndex((r) => r.id === params.id);
    if (idx === -1) return new HttpResponse(null, { status: 404 });
    roles[idx] = { ...roles[idx], ...updated };
    return HttpResponse.json({ data: roles[idx] });
  }),
  http.delete('/api/roles/:id', ({ params }) => {
    roles = roles.filter((r) => r.id !== params.id);
    return HttpResponse.json({ message: 'Role deleted' });
  }),

  // --- System Config API ---
  http.get('/api/system-config', () => {
    return HttpResponse.json({ data: systemConfig });
  }),
  http.put('/api/system-config', async ({ request }) => {
    const updated = (await request.json()) as Partial<SystemConfig>;
    systemConfig = { ...systemConfig, ...updated };
    return HttpResponse.json({ data: systemConfig });
  }),
];
