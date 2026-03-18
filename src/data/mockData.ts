import { Room, Event, QRWaypoint, CampusLocation } from '../types';

export const rooms: Room[] = [
  // Floor 1
  {
    id: 'R101',
    name: 'Computer Science Lab A',
    department: 'Computer Science',
    capacity: 30,
    status: 'available',
    x: 50,
    y: 100,
    width: 120,
    height: 80,
    type: 'lab',
    floor: 1,
    amenities: ['Projector', 'WiFi', 'AC', '30 Computers'],
    description: 'State-of-the-art computer lab with latest hardware and software for programming and development courses.',
    phone: '+91 20 1234 5678',
    email: 'cslab@pccoer.in'
  },
  {
    id: 'R102',
    name: 'Lecture Hall B',
    department: 'General',
    capacity: 150,
    status: 'occupied',
    x: 200,
    y: 100,
    width: 150,
    height: 100,
    type: 'classroom',
    floor: 1,
    amenities: ['Projector', 'Audio System', 'AC'],
    description: 'Large lecture hall with modern audio-visual equipment for seminars and large classes.',
    phone: '+91 20 1234 5679',
    email: 'lecturehall@pccoer.in'
  },
  {
    id: 'L103',
    name: 'Chemistry Lab',
    department: 'Chemistry',
    capacity: 25,
    status: 'maintenance',
    x: 380,
    y: 120,
    width: 100,
    height: 90,
    type: 'lab',
    floor: 1,
    amenities: ['Lab Equipment', 'Safety Shower', 'Fume Hoods'],
    description: 'Fully equipped chemistry laboratory with modern equipment and safety features.',
    phone: '+91 20 1234 5680',
    email: 'chemlab@pccoer.in'
  },
  {
    id: 'O104',
    name: 'Dean Office',
    department: 'Administration',
    capacity: 5,
    status: 'available',
    x: 520,
    y: 100,
    width: 80,
    height: 60,
    type: 'office',
    floor: 1,
    amenities: ['WiFi', 'AC'],
    description: 'Office of the Dean of Engineering.',
    phone: '+91 20 1234 5681',
    email: 'dean@pccoer.in'
  },
  // Floor 2
  {
    id: 'R201',
    name: 'Physics Lab',
    department: 'Physics',
    capacity: 20,
    status: 'available',
    x: 60,
    y: 120,
    width: 110,
    height: 85,
    type: 'lab',
    floor: 2,
    amenities: ['Lab Equipment', 'Projector', 'AC'],
    description: 'Advanced physics laboratory for experimental work and demonstrations.',
    phone: '+91 20 1234 5682',
    email: 'physlab@pccoer.in'
  },
  {
    id: 'R202',
    name: 'Mathematics Classroom',
    department: 'Mathematics',
    capacity: 40,
    status: 'occupied',
    x: 200,
    y: 110,
    width: 130,
    height: 90,
    type: 'classroom',
    floor: 2,
    amenities: ['Whiteboard', 'Projector', 'AC'],
    description: 'Dedicated classroom for mathematics courses with advanced teaching aids.',
    phone: '+91 20 1234 5683',
    email: 'mathclass@pccoer.in'
  },
  {
    id: 'O203',
    name: 'Faculty Lounge',
    department: 'General',
    capacity: 15,
    status: 'available',
    x: 380,
    y: 130,
    width: 95,
    height: 70,
    type: 'office',
    floor: 2,
    amenities: ['WiFi', 'Coffee Machine', 'AC'],
    description: 'Comfortable lounge area for faculty members to relax and collaborate.',
    phone: '+91 20 1234 5684',
    email: 'faculty@pccoer.in'
  },
  {
    id: 'A204',
    name: 'Student Services',
    department: 'Administration',
    capacity: 10,
    status: 'available',
    x: 500,
    y: 115,
    width: 90,
    height: 75,
    type: 'admin',
    floor: 2,
    amenities: ['WiFi', 'AC'],
    description: 'Student services office for academic counseling and administrative support.',
    phone: '+91 20 1234 5685',
    email: 'services@pccoer.in'
  }
];

export const events: Event[] = [
  {
    id: 'E1',
    title: 'Data Structures Lecture',
    instructor: 'Dr. Sharma',
    startTime: '09:00',
    endTime: '10:30',
    roomId: 'R101',
    date: new Date().toISOString()
  },
  {
    id: 'E2',
    title: 'Engineering Mathematics',
    instructor: 'Prof. Patel',
    startTime: '11:00',
    endTime: '12:30',
    roomId: 'R102',
    date: new Date().toISOString()
  },
  {
    id: 'E3',
    title: 'Physics Practical',
    instructor: 'Dr. Kumar',
    startTime: '14:00',
    endTime: '16:00',
    roomId: 'R201',
    date: new Date().toISOString()
  },
  {
    id: 'E4',
    title: 'Calculus Class',
    instructor: 'Prof. Singh',
    startTime: '10:00',
    endTime: '11:30',
    roomId: 'R202',
    date: new Date().toISOString()
  }
];

export const qrWaypoints: QRWaypoint[] = [
  {
    id: 'qr-entrance-1',
    roomId: 'R101',
    coordinates: [100, 100],
    qrCode: 'QR-ENT-01',
    description: 'Main Entrance - Floor 1'
  },
  {
    id: 'qr-corridor-1',
    roomId: '',
    coordinates: [200, 150],
    qrCode: 'QR-COR-01',
    description: 'Central Corridor - Floor 1'
  },
  {
    id: 'qr-stairs-1',
    roomId: '',
    coordinates: [300, 200],
    qrCode: 'QR-STR-01',
    description: 'Staircase - Floor 1'
  }
];

export const campusLocations: CampusLocation[] = [
  {
    id: 'loc-1',
    name: 'PCCOER Main Building',
    type: 'building',
    coordinates: [18.6502585647921, 73.74521620405763],
    description: 'Main academic building'
  },
  {
    id: 'loc-2',
    name: 'Library',
    type: 'building',
    coordinates: [18.6499, 73.7450],
    description: 'Central library with digital resources'
  },
  {
    id: 'loc-3',
    name: 'Computer Science Lab',
    type: 'facility',
    coordinates: [18.6504, 73.7454],
    description: 'Advanced computing facility'
  },
  {
    id: 'loc-4',
    name: 'Main Gate',
    type: 'landmark',
    coordinates: [18.6497, 73.7448],
    description: 'Main campus entrance'
  },
  {
    id: 'loc-5',
    name: 'Student Parking',
    type: 'facility',
    coordinates: [18.6498, 73.7449],
    description: 'Student parking area'
  },
  {
    id: 'loc-6',
    name: 'Canteen',
    type: 'facility',
    coordinates: [18.6501, 73.7453],
    description: 'Campus cafeteria'
  },
  {
    id: 'loc-7',
    name: 'Sports Complex',
    type: 'facility',
    coordinates: [18.6505, 73.7456],
    description: 'Indoor and outdoor sports facilities'
  },
  {
    id: 'loc-8',
    name: 'Auditorium',
    type: 'building',
    coordinates: [18.6500, 73.7455],
    description: 'Main auditorium for events and seminars'
  },
  {
    id: 'loc-9',
    name: 'Administration Block',
    type: 'building',
    coordinates: [18.6499, 73.7451],
    description: 'Administrative offices and student services'
  },
  {
    id: 'loc-10',
    name: 'Engineering Workshop',
    type: 'facility',
    coordinates: [18.6503, 73.7450],
    description: 'Mechanical and electrical workshops'
  }
];