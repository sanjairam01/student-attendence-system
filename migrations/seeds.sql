-- Initial Seed Data for Smart Attendance Management System

-- 1. Insert Roles
INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'SuperAdmin', 'System Owner with complete operational permissions'),
(2, 'Admin', 'Institutional Administrator managing departments, courses, users'),
(3, 'Faculty', 'Academic Faculty marking attendance, managing classes & leaves'),
(4, 'Student', 'Enrolled Student viewing attendance stats, submitting leave requests'),
(5, 'Parent', 'Guardian monitoring student attendance & warnings');

-- 2. Insert Departments
INSERT INTO `departments` (`id`, `code`, `name`, `description`) VALUES
(1, 'CSE', 'Computer Science & Engineering', 'Department of Computer Science & Software Systems'),
(2, 'ECE', 'Electronics & Communication Engineering', 'Department of Electronics & Communication'),
(3, 'MECH', 'Mechanical Engineering', 'Department of Mechanical & Robotics Systems'),
(4, 'EEE', 'Electrical & Electronics Engineering', 'Department of Electrical Engineering');

-- 3. Insert Courses
INSERT INTO `courses` (`id`, `department_id`, `code`, `name`, `duration_years`, `total_semesters`) VALUES
(1, 1, 'BTECH-CSE', 'B.Tech in Computer Science & Engineering', 4, 8),
(2, 1, 'MTECH-CSE', 'M.Tech in Software Engineering', 2, 4),
(3, 2, 'BTECH-ECE', 'B.Tech in Electronics & Communication', 4, 8);

-- 4. Insert Default Admin Users (Password: Admin@123 -> bcrypt hash)
INSERT INTO `users` (`id`, `role_id`, `email`, `password_hash`, `first_name`, `last_name`, `phone`, `is_active`, `is_verified`) VALUES
(1, 1, 'superadmin@smartattendance.edu', '$2a$12$4mUfP2c/d6R8sE8A3U.s1eL4Cq9oZJk.2kP5p8d6m7o8N9P0q1R2S', 'System', 'SuperAdmin', '+1234567890', 1, 1),
(2, 2, 'admin@smartattendance.edu', '$2a$12$4mUfP2c/d6R8sE8A3U.s1eL4Cq9oZJk.2kP5p8d6m7o8N9P0q1R2S', 'Chief', 'Admin', '+1987654321', 1, 1),
(3, 3, 'faculty.smith@smartattendance.edu', '$2a$12$4mUfP2c/d6R8sE8A3U.s1eL4Cq9oZJk.2kP5p8d6m7o8N9P0q1R2S', 'John', 'Smith', '+1122334455', 1, 1),
(4, 4, 'alex.johnson@student.edu', '$2a$12$4mUfP2c/d6R8sE8A3U.s1eL4Cq9oZJk.2kP5p8d6m7o8N9P0q1R2S', 'Alex', 'Johnson', '+1555666777', 1, 1);

-- 5. Insert Admins Detail
INSERT INTO `admins` (`id`, `user_id`, `employee_id`, `designation`) VALUES
(1, 1, 'EMP-SA001', 'Chief Systems Architect'),
(2, 2, 'EMP-AD001', 'Academic Registrar');

-- 6. Insert Faculty Detail
INSERT INTO `faculty` (`id`, `user_id`, `department_id`, `employee_code`, `designation`, `specialization`, `joining_date`) VALUES
(1, 3, 1, 'FAC-CSE-001', 'Associate Professor', 'Database Systems & Web Architecture', '2020-08-15');

-- 7. Insert Student Detail
INSERT INTO `students` (`id`, `user_id`, `parent_id`, `department_id`, `course_id`, `roll_number`, `registration_no`, `current_semester`, `section`, `batch_year`, `gender`) VALUES
(1, 4, NULL, 1, 1, '2024-CSE-042', 'REG-2024-8891', 4, 'A', 2024, 'Male');

-- 8. Insert System Settings
INSERT INTO `system_settings` (`setting_key`, `setting_value`, `description`) VALUES
('MINIMUM_ATTENDANCE_PERCENTAGE', '75.0', 'Minimum required attendance percentage for exam eligibility'),
('ENABLE_EMAIL_NOTIFICATIONS', 'true', 'Toggle automatic attendance deficit warning emails'),
('SEMESTER_START_DATE', '2026-01-10', 'Official start date of current academic semester'),
('ALLOW_SELF_QR_CHECKIN', 'true', 'Enable student QR scan check-in during active class lectures');
