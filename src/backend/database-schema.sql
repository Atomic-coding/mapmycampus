-- MapMyCampus Database Schema
-- This schema can be used with PostgreSQL (Supabase) or any other SQL database

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table for authentication and profiles
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'faculty', 'staff', 'admin')),
    student_id VARCHAR(50) UNIQUE,
    employee_id VARCHAR(50) UNIQUE,
    phone VARCHAR(20),
    department VARCHAR(100),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Buildings table
CREATE TABLE buildings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_floors INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Floors table
CREATE TABLE floors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    building_id UUID NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
    floor_number INTEGER NOT NULL,
    name VARCHAR(100),
    floor_plan_url TEXT,
    floor_plan_svg TEXT, -- SVG data for interactive maps
    is_accessible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(building_id, floor_number)
);

-- Rooms table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    name VARCHAR(200),
    type VARCHAR(50) NOT NULL CHECK (type IN ('classroom', 'laboratory', 'office', 'restroom', 'library', 'cafeteria', 'auditorium', 'meeting_room', 'study_room', 'other')),
    capacity INTEGER,
    description TEXT,
    amenities JSONB, -- JSON array of amenities
    coordinates JSONB NOT NULL, -- {x, y, width, height} for floor plan positioning
    qr_code VARCHAR(255) UNIQUE,
    is_bookable BOOLEAN DEFAULT false,
    is_accessible BOOLEAN DEFAULT true,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Room occupancy tracking
CREATE TABLE room_occupancy (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    current_occupancy INTEGER DEFAULT 0,
    max_capacity INTEGER,
    status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'occupied', 'reserved', 'maintenance', 'closed')),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES users(id)
);

-- Events and bookings
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    attendee_count INTEGER,
    is_public BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QR codes for rooms and locations
CREATE TABLE qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(255) UNIQUE NOT NULL,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    location_name VARCHAR(200),
    qr_data JSONB NOT NULL, -- Contains navigation data and metadata
    scan_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Navigation waypoints for pathfinding
CREATE TABLE waypoints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    floor_id UUID NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    name VARCHAR(100),
    type VARCHAR(50) NOT NULL CHECK (type IN ('room_entrance', 'staircase', 'elevator', 'exit', 'intersection', 'landmark')),
    coordinates JSONB NOT NULL, -- {x, y} coordinates on floor plan
    connections JSONB, -- Array of connected waypoint IDs
    is_accessible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User navigation history and analytics
CREATE TABLE navigation_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    from_location JSONB,
    to_location JSONB,
    route_taken JSONB, -- Array of waypoints used
    navigation_time INTERVAL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campus announcements and notifications
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'general' CHECK (type IN ('general', 'emergency', 'maintenance', 'event')),
    target_audience JSONB, -- Array of roles or specific user IDs
    building_id UUID REFERENCES buildings(id),
    floor_id UUID REFERENCES floors(id),
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Feedback and reports
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    room_id UUID REFERENCES rooms(id),
    type VARCHAR(50) NOT NULL CHECK (type IN ('bug_report', 'feature_request', 'room_issue', 'navigation_issue', 'general')),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
    priority INTEGER DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_rooms_floor_id ON rooms(floor_id);
CREATE INDEX idx_rooms_type ON rooms(type);
CREATE INDEX idx_rooms_qr_code ON rooms(qr_code);
CREATE INDEX idx_room_occupancy_room_id ON room_occupancy(room_id);
CREATE INDEX idx_events_room_id ON events(room_id);
CREATE INDEX idx_events_start_time ON events(start_time);
CREATE INDEX idx_qr_codes_code ON qr_codes(code);
CREATE INDEX idx_waypoints_floor_id ON waypoints(floor_id);
CREATE INDEX idx_navigation_logs_user_id ON navigation_logs(user_id);
CREATE INDEX idx_announcements_active ON announcements(is_active, created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_buildings_updated_at BEFORE UPDATE ON buildings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_floors_updated_at BEFORE UPDATE ON floors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE floors ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_occupancy ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (can be customized based on requirements)
CREATE POLICY "Users can view their own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own data" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Everyone can view active buildings" ON buildings FOR SELECT USING (is_active = true);
CREATE POLICY "Everyone can view floors" ON floors FOR SELECT USING (true);
CREATE POLICY "Everyone can view rooms" ON rooms FOR SELECT USING (true);
CREATE POLICY "Everyone can view room occupancy" ON room_occupancy FOR SELECT USING (true);

CREATE POLICY "Authenticated users can view events" ON events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Event organizers can manage their events" ON events FOR ALL USING (auth.uid() = organizer_id);

CREATE POLICY "Everyone can view active QR codes" ON qr_codes FOR SELECT USING (is_active = true);

CREATE POLICY "Users can view their navigation logs" ON navigation_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their navigation logs" ON navigation_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view active announcements" ON announcements FOR SELECT USING (is_active = true);

CREATE POLICY "Users can submit feedback" ON feedback FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their feedback" ON feedback FOR SELECT USING (auth.uid() = user_id);