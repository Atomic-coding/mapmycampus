-- Sample data for MapMyCampus
-- This script inserts realistic test data for development and demonstration

-- Insert sample buildings
INSERT INTO buildings (id, name, code, address, latitude, longitude, total_floors, description, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Engineering Building', 'ENG', '123 Campus Drive, University City', 40.7589, -73.9851, 4, 'Main engineering building with labs and classrooms', 'https://images.unsplash.com/photo-1562774053-701939374585'),
('550e8400-e29b-41d4-a716-446655440002', 'Science Hall', 'SCI', '456 Research Way, University City', 40.7599, -73.9861, 3, 'Science laboratories and lecture halls', 'https://images.unsplash.com/photo-1581092921461-eab62e97a780'),
('550e8400-e29b-41d4-a716-446655440003', 'Student Center', 'SC', '789 Student Plaza, University City', 40.7579, -73.9841, 2, 'Student services, dining, and meeting spaces', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b');

-- Insert sample floors
INSERT INTO floors (id, building_id, floor_number, name, floor_plan_url, is_accessible) VALUES
-- Engineering Building floors
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 1, 'Ground Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 2, 'Second Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 3, 'Third Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true),
-- Science Hall floors
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 1, 'Ground Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 2, 'Second Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true),
-- Student Center floors
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 1, 'Ground Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true),
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440003', 2, 'Second Floor', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e', true);

-- Insert sample rooms for Engineering Building Ground Floor
INSERT INTO rooms (id, floor_id, room_number, name, type, capacity, description, amenities, coordinates, qr_code, is_bookable, image_url) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '101', 'Computer Lab A', 'laboratory', 30, 'Advanced computer laboratory with latest hardware', '["computers", "projector", "whiteboard", "air_conditioning"]', '{"x": 50, "y": 100, "width": 120, "height": 80}', 'ENG_101_QR', true, 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', '102', 'Electronics Lab', 'laboratory', 25, 'Electronics and circuit design laboratory', '["oscilloscopes", "multimeters", "power_supplies", "workbenches"]', '{"x": 200, "y": 100, "width": 100, "height": 80}', 'ENG_102_QR', true, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', '103', 'Lecture Hall A', 'classroom', 80, 'Large lecture hall with amphitheater seating', '["projector", "microphone", "sound_system", "whiteboard"]', '{"x": 50, "y": 200, "width": 150, "height": 100}', 'ENG_103_QR', true, 'https://images.unsplash.com/photo-1562774053-701939374585'),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', '104', 'Study Room 1', 'study_room', 8, 'Small group study room', '["whiteboard", "table", "chairs", "power_outlets"]', '{"x": 320, "y": 150, "width": 60, "height": 60}', 'ENG_104_QR', true, 'https://images.unsplash.com/photo-1577896851231-70ef18881754'),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', 'WC1', 'Restroom (Men)', 'restroom', 0, 'Men''s restroom', '["accessible", "hand_dryer"]', '{"x": 400, "y": 100, "width": 40, "height": 30}', 'ENG_WC1_QR', false, NULL),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440001', 'WC2', 'Restroom (Women)', 'restroom', 0, 'Women''s restroom', '["accessible", "hand_dryer"]', '{"x": 400, "y": 140, "width": 40, "height": 30}', 'ENG_WC2_QR', false, NULL);

-- Insert sample rooms for Engineering Building Second Floor
INSERT INTO rooms (id, floor_id, room_number, name, type, capacity, description, amenities, coordinates, qr_code, is_bookable, image_url) VALUES
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440002', '201', 'Faculty Office A', 'office', 1, 'Professor John Smith''s office', '["computer", "printer", "bookshelf"]', '{"x": 50, "y": 100, "width": 60, "height": 60}', 'ENG_201_QR', false, 'https://images.unsplash.com/photo-1497366216548-37526070297c'),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440002', '202', 'Faculty Office B', 'office', 1, 'Professor Jane Doe''s office', '["computer", "printer", "bookshelf"]', '{"x": 120, "y": 100, "width": 60, "height": 60}', 'ENG_202_QR', false, 'https://images.unsplash.com/photo-1497366216548-37526070297c'),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440002', '203', 'Conference Room', 'meeting_room', 12, 'Faculty conference room', '["projector", "conference_table", "video_conference"]', '{"x": 200, "y": 100, "width": 100, "height": 80}', 'ENG_203_QR', true, 'https://images.unsplash.com/photo-1556761175-b413da4baf72'),
('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440002', '204', 'Research Lab', 'laboratory', 15, 'Advanced research laboratory', '["equipment", "fume_hood", "safety_shower"]', '{"x": 50, "y": 200, "width": 120, "height": 80}', 'ENG_204_QR', false, 'https://images.unsplash.com/photo-1581092921461-eab62e97a780');

-- Insert sample rooms for Science Hall
INSERT INTO rooms (id, floor_id, room_number, name, type, capacity, description, amenities, coordinates, qr_code, is_bookable, image_url) VALUES
('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440004', '101', 'Chemistry Lab', 'laboratory', 24, 'General chemistry laboratory', '["fume_hoods", "lab_benches", "safety_equipment", "chemical_storage"]', '{"x": 50, "y": 100, "width": 140, "height": 90}', 'SCI_101_QR', true, 'https://images.unsplash.com/photo-1582719471384-894fbb16e074'),
('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440004', '102', 'Physics Lab', 'laboratory', 20, 'Physics experiments laboratory', '["lab_equipment", "measuring_tools", "safety_equipment"]', '{"x": 200, "y": 100, "width": 120, "height": 90}', 'SCI_102_QR', true, 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa'),
('770e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440005', '201', 'Biology Lab', 'laboratory', 28, 'Biology and life sciences laboratory', '["microscopes", "lab_benches", "specimen_storage", "safety_equipment"]', '{"x": 50, "y": 100, "width": 150, "height": 90}', 'SCI_201_QR', true, 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56');

-- Insert sample rooms for Student Center
INSERT INTO rooms (id, floor_id, room_number, name, type, capacity, description, amenities, coordinates, qr_code, is_bookable, image_url) VALUES
('770e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440006', '101', 'Main Cafeteria', 'cafeteria', 200, 'Main dining area', '["food_service", "seating", "wifi", "accessible"]', '{"x": 50, "y": 100, "width": 200, "height": 150}', 'SC_101_QR', false, 'https://images.unsplash.com/photo-1567521464027-f127ff144326'),
('770e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440006', '102', 'Student Lounge', 'other', 50, 'Casual seating and social area', '["comfortable_seating", "wifi", "charging_stations", "vending"]', '{"x": 270, "y": 100, "width": 100, "height": 80}', 'SC_102_QR', false, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'),
('770e8400-e29b-41d4-a716-446655440016', '660e8400-e29b-41d4-a716-446655440007', '201', 'Library Study Area', 'library', 60, 'Quiet study area with books and computers', '["books", "computers", "quiet_zone", "printing"]', '{"x": 50, "y": 100, "width": 180, "height": 120}', 'SC_201_QR', false, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570'),
('770e8400-e29b-41d4-a716-446655440017', '660e8400-e29b-41d4-a716-446655440007', '202', 'Group Study Room A', 'study_room', 10, 'Large group study room', '["large_table", "whiteboard", "projector", "power_outlets"]', '{"x": 250, "y": 100, "width": 80, "height": 60}', 'SC_202_QR', true, 'https://images.unsplash.com/photo-1577896851231-70ef18881754'),
('770e8400-e29b-41d4-a716-446655440018', '660e8400-e29b-41d4-a716-446655440007', '203', 'Group Study Room B', 'study_room', 6, 'Small group study room', '["table", "whiteboard", "chairs", "power_outlets"]', '{"x": 250, "y": 170, "width": 60, "height": 50}', 'SC_203_QR', true, 'https://images.unsplash.com/photo-1577896851231-70ef18881754');

-- Insert room occupancy data
INSERT INTO room_occupancy (room_id, current_occupancy, max_capacity, status) VALUES
('770e8400-e29b-41d4-a716-446655440001', 15, 30, 'occupied'),
('770e8400-e29b-41d4-a716-446655440002', 0, 25, 'available'),
('770e8400-e29b-41d4-a716-446655440003', 0, 80, 'available'),
('770e8400-e29b-41d4-a716-446655440004', 4, 8, 'occupied'),
('770e8400-e29b-41d4-a716-446655440007', 1, 1, 'occupied'),
('770e8400-e29b-41d4-a716-446655440008', 0, 1, 'available'),
('770e8400-e29b-41d4-a716-446655440009', 0, 12, 'available'),
('770e8400-e29b-41d4-a716-446655440010', 8, 15, 'occupied'),
('770e8400-e29b-41d4-a716-446655440011', 12, 24, 'occupied'),
('770e8400-e29b-41d4-a716-446655440012', 0, 20, 'available'),
('770e8400-e29b-41d4-a716-446655440013', 0, 28, 'available'),
('770e8400-e29b-41d4-a716-446655440014', 85, 200, 'occupied'),
('770e8400-e29b-41d4-a716-446655440015', 25, 50, 'occupied'),
('770e8400-e29b-41d4-a716-446655440016', 30, 60, 'occupied'),
('770e8400-e29b-41d4-a716-446655440017', 0, 10, 'available'),
('770e8400-e29b-41d4-a716-446655440018', 3, 6, 'occupied');

-- Insert sample QR codes
INSERT INTO qr_codes (code, room_id, location_name, qr_data, scan_count, is_active) VALUES
('ENG_101_QR', '770e8400-e29b-41d4-a716-446655440001', 'Computer Lab A', '{"room_number": "101", "building": "ENG", "floor": 1, "type": "laboratory", "capacity": 30, "amenities": ["computers", "projector", "whiteboard"]}', 47, true),
('ENG_102_QR', '770e8400-e29b-41d4-a716-446655440002', 'Electronics Lab', '{"room_number": "102", "building": "ENG", "floor": 1, "type": "laboratory", "capacity": 25, "amenities": ["oscilloscopes", "multimeters"]}', 23, true),
('ENG_103_QR', '770e8400-e29b-41d4-a716-446655440003', 'Lecture Hall A', '{"room_number": "103", "building": "ENG", "floor": 1, "type": "classroom", "capacity": 80, "amenities": ["projector", "microphone"]}', 89, true),
('SCI_101_QR', '770e8400-e29b-41d4-a716-446655440011', 'Chemistry Lab', '{"room_number": "101", "building": "SCI", "floor": 1, "type": "laboratory", "capacity": 24, "amenities": ["fume_hoods", "lab_benches"]}', 34, true),
('SC_201_QR', '770e8400-e29b-41d4-a716-446655440016', 'Library Study Area', '{"room_number": "201", "building": "SC", "floor": 2, "type": "library", "capacity": 60, "amenities": ["books", "computers"]}', 156, true);

-- Insert sample waypoints for navigation
INSERT INTO waypoints (floor_id, name, type, coordinates, connections) VALUES
-- Engineering Building Ground Floor waypoints
('660e8400-e29b-41d4-a716-446655440001', 'Main Entrance', 'exit', '{"x": 20, "y": 150}', '["wp_eng_1_2", "wp_eng_1_3"]'),
('660e8400-e29b-41d4-a716-446655440001', 'Main Corridor Junction', 'intersection', '{"x": 150, "y": 150}', '["wp_eng_1_1", "wp_eng_1_3", "wp_eng_1_4"]'),
('660e8400-e29b-41d4-a716-446655440001', 'Lab Wing Entrance', 'intersection', '{"x": 100, "y": 100}', '["wp_eng_1_1", "wp_eng_1_2"]'),
('660e8400-e29b-41d4-a716-446655440001', 'Staircase A', 'staircase', '{"x": 300, "y": 50}', '["wp_eng_1_2"]'),
('660e8400-e29b-41d4-a716-446655440001', 'Elevator A', 'elevator', '{"x": 350, "y": 50}', '["wp_eng_1_2"]');

-- Insert sample events
INSERT INTO events (room_id, organizer_id, title, description, start_time, end_time, attendee_count, is_public) VALUES
('770e8400-e29b-41d4-a716-446655440003', (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), 'CS101 Introduction to Programming', 'First lecture of the semester covering programming fundamentals', '2024-01-15 09:00:00+00', '2024-01-15 10:30:00+00', 75, true),
('770e8400-e29b-41d4-a716-446655440001', (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), 'Web Development Workshop', 'Hands-on workshop building modern web applications', '2024-01-16 14:00:00+00', '2024-01-16 17:00:00+00', 25, true),
('770e8400-e29b-41d4-a716-446655440009', (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), 'Faculty Meeting', 'Monthly department faculty meeting', '2024-01-17 15:00:00+00', '2024-01-17 16:30:00+00', 12, false),
('770e8400-e29b-41d4-a716-446655440017', (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), 'Study Group - Data Structures', 'Weekly study group for CS students', '2024-01-18 19:00:00+00', '2024-01-18 21:00:00+00', 8, true);

-- Insert sample announcements
INSERT INTO announcements (title, content, type, target_audience, building_id, priority, created_by, expires_at) VALUES
('Welcome Back Students!', 'Welcome to the new semester! Please review the updated safety protocols and building access procedures.', 'general', '["student", "faculty", "staff"]', NULL, 1, (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), '2024-02-01 23:59:59+00'),
('Engineering Building Maintenance', 'The elevator in the Engineering Building will be out of service on January 20th from 8 AM to 2 PM for routine maintenance.', 'maintenance', '["student", "faculty", "staff"]', '550e8400-e29b-41d4-a716-446655440001', 3, (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), '2024-01-21 00:00:00+00'),
('New Study Rooms Available', 'Additional study rooms have been added to the Student Center second floor. Book them through the MapMyCampus app!', 'general', '["student"]', '550e8400-e29b-41d4-a716-446655440003', 2, (SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), '2024-01-25 23:59:59+00');

-- Insert sample feedback
INSERT INTO feedback (user_id, room_id, type, title, description, priority) VALUES
((SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), '770e8400-e29b-41d4-a716-446655440001', 'room_issue', 'Projector not working in Computer Lab A', 'The main projector in room 101 is not displaying properly. It shows a blue screen when connected to the instructor computer.', 2),
((SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), NULL, 'feature_request', 'Add restroom locations to map', 'It would be helpful to have restroom locations clearly marked on the interactive map with distance indicators.', 1),
((SELECT id FROM users WHERE email = 'admin@example.com' LIMIT 1), '770e8400-e29b-41d4-a716-446655440004', 'room_issue', 'Study room booking system issue', 'Unable to book study room 104 through the app. The "Book Now" button does not respond.', 3);

-- Create a default admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, role, employee_id, department, is_active, email_verified) VALUES
('admin@example.com', '$2b$10$9Ux8RpXKjIqFqfJdHM2lZOwF7J8Z6XK1mY5N8gO9Ij0NrF6jxQ8Mi', 'System', 'Administrator', 'admin', 'ADMIN001', 'IT Services', true, true)
ON CONFLICT (email) DO NOTHING;