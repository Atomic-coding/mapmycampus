# MapMyCampus API Documentation

## Base URL
```
https://your-project.supabase.co/rest/v1
```

## Authentication
All authenticated requests require a Bearer token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## API Endpoints

### Authentication

#### POST /auth/signup
Register a new user account
```json
{
  "email": "student@university.edu",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe",
  "role": "student",
  "student_id": "123456789",
  "department": "Computer Science"
}
```

#### POST /auth/signin
Sign in with email and password
```json
{
  "email": "student@university.edu",
  "password": "securepassword"
}
```

#### POST /auth/signout
Sign out current user (requires authentication)

#### POST /auth/reset-password
Request password reset
```json
{
  "email": "student@university.edu"
}
```

### User Management

#### GET /users/profile
Get current user profile (requires authentication)

#### PUT /users/profile
Update user profile (requires authentication)
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "phone": "+1234567890",
  "department": "Engineering"
}
```

#### POST /users/upload-avatar
Upload profile picture (requires authentication)
- Content-Type: multipart/form-data
- File field: "avatar"

### Buildings

#### GET /buildings
Get all active buildings
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Engineering Building",
      "code": "ENG",
      "address": "123 Campus Drive",
      "latitude": 40.7589,
      "longitude": -73.9851,
      "total_floors": 5,
      "description": "Main engineering building",
      "image_url": "https://...",
      "created_at": "2023-01-01T00:00:00Z"
    }
  ]
}
```

#### GET /buildings/{building_id}
Get specific building details

#### GET /buildings/{building_id}/floors
Get all floors for a building
```json
{
  "data": [
    {
      "id": "uuid",
      "building_id": "uuid",
      "floor_number": 1,
      "name": "Ground Floor",
      "floor_plan_url": "https://...",
      "floor_plan_svg": "<svg>...</svg>",
      "is_accessible": true
    }
  ]
}
```

### Floors and Rooms

#### GET /floors/{floor_id}
Get specific floor details including rooms

#### GET /floors/{floor_id}/rooms
Get all rooms on a floor
```json
{
  "data": [
    {
      "id": "uuid",
      "floor_id": "uuid",
      "room_number": "101",
      "name": "Computer Lab A",
      "type": "laboratory",
      "capacity": 30,
      "description": "Advanced computer laboratory",
      "amenities": ["computers", "projector", "whiteboard"],
      "coordinates": {"x": 100, "y": 150, "width": 80, "height": 60},
      "qr_code": "ROOM_101_QR",
      "is_bookable": true,
      "is_accessible": true,
      "image_url": "https://..."
    }
  ]
}
```

#### GET /rooms/{room_id}
Get specific room details

#### GET /rooms/{room_id}/occupancy
Get current room occupancy
```json
{
  "data": {
    "room_id": "uuid",
    "current_occupancy": 15,
    "max_capacity": 30,
    "status": "occupied",
    "last_updated": "2023-01-01T12:00:00Z"
  }
}
```

#### PUT /rooms/{room_id}/occupancy
Update room occupancy (requires authentication)
```json
{
  "current_occupancy": 20,
  "status": "occupied"
}
```

### QR Code System

#### GET /qr/{qr_code}
Get information from QR code scan
```json
{
  "data": {
    "id": "uuid",
    "code": "ROOM_101_QR",
    "room_id": "uuid",
    "location_name": "Computer Lab A",
    "qr_data": {
      "room_number": "101",
      "floor": 1,
      "building": "ENG",
      "type": "laboratory",
      "capacity": 30,
      "current_occupancy": 15,
      "amenities": ["computers", "projector"],
      "description": "Advanced computer laboratory"
    },
    "scan_count": 145
  }
}
```

#### POST /qr/{qr_code}/scan
Record QR code scan (optional authentication)
```json
{
  "user_location": {"x": 100, "y": 150},
  "scan_timestamp": "2023-01-01T12:00:00Z"
}
```

#### POST /qr/generate
Generate new QR code for room (requires admin authentication)
```json
{
  "room_id": "uuid",
  "location_name": "New Lab",
  "expires_at": "2024-01-01T00:00:00Z"
}
```

### Navigation

#### POST /navigation/route
Get navigation route between two points
```json
{
  "from": {
    "building_id": "uuid",
    "floor_id": "uuid",
    "coordinates": {"x": 100, "y": 150}
  },
  "to": {
    "room_id": "uuid"
  },
  "accessibility_required": false
}
```

Response:
```json
{
  "data": {
    "route": [
      {
        "floor_id": "uuid",
        "waypoints": [
          {"x": 100, "y": 150, "type": "start"},
          {"x": 120, "y": 150, "type": "intersection"},
          {"x": 200, "y": 200, "type": "destination"}
        ]
      }
    ],
    "total_distance": 150.5,
    "estimated_time": "3 minutes",
    "instructions": [
      "Head east down the main corridor",
      "Turn right at the intersection",
      "Room 101 will be on your left"
    ]
  }
}
```

#### GET /navigation/waypoints/{floor_id}
Get all waypoints for a floor

#### POST /navigation/log
Log navigation session (requires authentication)
```json
{
  "from_location": {"building": "ENG", "floor": 1, "coordinates": {"x": 100, "y": 150}},
  "to_location": {"room_id": "uuid"},
  "route_taken": ["waypoint1", "waypoint2", "waypoint3"],
  "navigation_time": "00:03:30",
  "completed": true
}
```

### Events and Bookings

#### GET /events
Get upcoming events (optional filters)
Query parameters:
- building_id
- floor_id
- room_id
- date_from
- date_to
- is_public

#### GET /events/{event_id}
Get specific event details

#### POST /events
Create new event (requires authentication)
```json
{
  "room_id": "uuid",
  "title": "CS101 Lecture",
  "description": "Introduction to Computer Science",
  "start_time": "2023-01-15T09:00:00Z",
  "end_time": "2023-01-15T10:30:00Z",
  "attendee_count": 25,
  "is_public": true
}
```

#### PUT /events/{event_id}
Update event (requires authentication - organizer only)

#### DELETE /events/{event_id}
Cancel event (requires authentication - organizer only)

#### GET /rooms/{room_id}/schedule
Get room schedule for specific date range
Query parameters:
- date_from (required)
- date_to (required)

### Announcements

#### GET /announcements
Get active announcements
Query parameters:
- building_id
- floor_id
- type (general, emergency, maintenance, event)

#### POST /announcements
Create announcement (requires admin authentication)
```json
{
  "title": "Maintenance Notice",
  "content": "Elevator will be out of service...",
  "type": "maintenance",
  "target_audience": ["student", "faculty"],
  "building_id": "uuid",
  "priority": 3,
  "expires_at": "2023-01-20T00:00:00Z"
}
```

### Feedback and Reports

#### GET /feedback
Get user's feedback history (requires authentication)

#### POST /feedback
Submit feedback (requires authentication)
```json
{
  "room_id": "uuid",
  "type": "room_issue",
  "title": "Broken projector in Lab A",
  "description": "The projector in Computer Lab A is not working properly...",
  "priority": 2
}
```

#### GET /admin/feedback
Get all feedback for admin review (requires admin authentication)

#### PUT /admin/feedback/{feedback_id}
Update feedback status (requires admin authentication)
```json
{
  "status": "resolved",
  "resolved_by": "admin_user_id"
}
```

### Analytics (Admin Only)

#### GET /analytics/usage
Get system usage statistics
Query parameters:
- date_from
- date_to
- building_id
- metric (scans, navigation, events, users)

#### GET /analytics/popular-rooms
Get most visited/scanned rooms

#### GET /analytics/navigation-patterns
Get common navigation routes

#### GET /analytics/occupancy-trends
Get room occupancy trends over time

## Real-time Subscriptions

### Room Occupancy Updates
Subscribe to real-time room occupancy changes:
```javascript
supabase
  .channel('room-occupancy')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'room_occupancy' },
    (payload) => console.log('Occupancy update:', payload)
  )
  .subscribe()
```

### Event Updates
Subscribe to event changes:
```javascript
supabase
  .channel('events')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'events' },
    (payload) => console.log('Event update:', payload)
  )
  .subscribe()
```

### Emergency Announcements
Subscribe to high-priority announcements:
```javascript
supabase
  .channel('announcements')
  .on('postgres_changes',
    { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'announcements',
      filter: 'type=eq.emergency'
    },
    (payload) => console.log('Emergency announcement:', payload)
  )
  .subscribe()
```

## Error Responses

All API errors follow this format:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Email format is invalid"
    }
  }
}
```

Common error codes:
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Input validation failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `SERVER_ERROR`: Internal server error

## Rate Limiting

- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- QR scan endpoints: 200 requests per minute
- File upload endpoints: 10 requests per minute