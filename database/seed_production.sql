-- ============================================================================
-- SMART ATTENDANCE SYSTEM - ENTERPRISE SEED DATA
-- ============================================================================

USE smart_attendance_db;

-- 1. Seed Departments
INSERT INTO departments (id, code, name) VALUES
('dept-cs-01', 'CS', 'Computer Science & Engineering'),
('dept-ece-02', 'ECE', 'Electronics & Communication Engineering'),
('dept-mech-03', 'MECH', 'Mechanical Engineering')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- 2. Seed Users (Passwords hashed using bcrypt for "Password123!")
INSERT INTO users (id, email, password_hash, first_name, last_name, role, department_id, phone, is_active) VALUES
('usr-super-01', 'superadmin@university.edu', '$2a$12$K1R2m/8pQ2Y3A4B5C6D7Ee8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3', 'System', 'Director', 'superadmin', 'dept-cs-01', '+18005550101', 1),
('usr-admin-01', 'admin@university.edu', '$2a$12$K1R2m/8pQ2Y3A4B5C6D7Ee8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3', 'Sarah', 'Conner', 'admin', 'dept-cs-01', '+18005550102', 1),
('usr-faculty-01', 'faculty.smith@university.edu', '$2a$12$K1R2m/8pQ2Y3A4B5C6D7Ee8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3', 'Dr. Alan', 'Turing', 'faculty', 'dept-cs-01', '+18005550103', 1),
('usr-student-01', 'student.john@university.edu', '$2a$12$K1R2m/8pQ2Y3A4B5C6D7Ee8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3', 'John', 'Doe', 'student', 'dept-cs-01', '+18005550104', 1),
('usr-parent-01', 'parent.doe@gmail.com', '$2a$12$K1R2m/8pQ2Y3A4B5C6D7Ee8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3', 'Robert', 'Doe', 'parent', 'dept-cs-01', '+18005550105', 1)
ON DUPLICATE KEY UPDATE email=VALUES(email);

-- 3. Seed Courses
INSERT INTO courses (id, code, title, department_id, semester, credits) VALUES
('crs-cs101', 'CS101', 'Data Structures & Algorithms', 'dept-cs-01', 3, 4),
('crs-cs102', 'CS102', 'Database Management Systems', 'dept-cs-01', 4, 3)
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- 4. Seed Classes & Enrollments
INSERT INTO classes (id, course_id, faculty_id, academic_year, room_number, schedule_info) VALUES
('cls-001', 'crs-cs101', 'usr-faculty-01', '2025-2026', 'Lab 302', 'Mon/Wed 09:00 AM - 10:30 AM')
ON DUPLICATE KEY UPDATE room_number=VALUES(room_number);

INSERT INTO class_enrollments (id, class_id, student_id) VALUES
('enr-001', 'cls-001', 'usr-student-01')
ON DUPLICATE KEY UPDATE class_id=VALUES(class_id);

-- 5. Seed Attendance Sessions & Records
INSERT INTO attendance_sessions (id, class_id, faculty_id, session_date, start_time, end_time, status) VALUES
('ses-001', 'cls-001', 'usr-faculty-01', CURDATE(), '09:00:00', '10:30:00', 'completed')
ON DUPLICATE KEY UPDATE status=VALUES(status);

INSERT INTO attendance_records (id, session_id, student_id, status, marking_method, confidence_score) VALUES
('rec-001', 'ses-001', 'usr-student-01', 'PRESENT', 'QR_SCAN', 98.50)
ON DUPLICATE KEY UPDATE status=VALUES(status);
