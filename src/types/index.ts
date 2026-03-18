// Room type - represents a physical room on campus
export interface Room {
  id: string;           // e.g., "R101", "L103", "O104"
  name: string;         // e.g., "Computer Science Lab A"
  department: string;   // e.g., "Computer Science"
  capacity: number;     // e.g., 30
  status: 'available' | 'occupied' | 'maintenance';
  x: number;            // SVG X coordinate on floor plan
  y: number;            // SVG Y coordinate
  width: number;        // SVG rectangle width
  height: number;       // SVG rectangle height
  type: 'classroom' | 'lab' | 'office' | 'admin';
  amenities?: string[]; // e.g., ['Projector', 'WiFi', 'AC']
  floor: number;        // Floor number (1, 2, etc.)
  description?: string; // Room description text
  phone?: string;       // Contact phone
  email?: string;       // Contact email
}

// Event type - represents a scheduled event
export interface Event {
  id: string;
  title: string;
  instructor: string;
  startTime: string;    // "HH:MM" format
  endTime: string;      // "HH:MM" format
  roomId: string;       // References Room.id
  date: string;         // ISO date string
}

// User type - represents an app user
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'staff' | 'admin';
  avatar?: string;
  phone?: string;
  department?: string;
  studentId?: string;
  address?: string;
}

// Navigation step for directions
export interface NavigationStep {
  instruction: string;
  direction: 'straight' | 'left' | 'right' | 'up' | 'down';
  distance: string;
}

// QR Waypoint for indoor navigation
export interface QRWaypoint {
  id: string;
  roomId: string;
  coordinates: [number, number];
  qrCode: string;
  description: string;
}

// Campus Location for outdoor map
export interface CampusLocation {
  id: string;
  name: string;
  type: 'building' | 'facility' | 'landmark';
  coordinates: [number, number];
  description?: string;
}
