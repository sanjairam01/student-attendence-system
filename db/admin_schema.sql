-- =========================================================
-- SMART ATTENDANCE SYSTEM - ADMIN MODULE SQL SCHEMA
-- Enterprise Relational Database Schema with Foreign Keys, Indexes & Constraints
-- =========================================================

-- 1. INSTITUTIONS TABLE
CREATE TABLE IF NOT EXISTS institutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    academic_year VARCHAR(50) NOT NULL DEFAULT '2025-2026',
    current_semester VARCHAR(100) NOT NULL DEFAULT 'Even Semester',
    working_days_per_week INT NOT NULL DEFAULT 5 CHECK (working_days_per_week BETWEEN 1 AND 7),
    attendance_threshold_pct DECIMAL(5,2) NOT NULL DEFAULT 75.00 CHECK (attendance_threshold_pct BETWEEN 0 AND 100),
    contact_email VARCHAR(255) UNIQUE NOT NULL,
    contact_phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    hod_name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_dept_code_per_inst UNIQUE (institution_id, code)
);

-- 3. COURSES TABLE
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    duration_years INT NOT NULL CHECK (duration_years BETWEEN 1 AND 6),
    total_semesters INT NOT NULL CHECK (total_semesters BETWEEN 1 AND 12),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_course_code_per_inst UNIQUE (institution_id, code)
);

-- 4. SUBJECTS TABLE
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    credits INT NOT NULL CHECK (credits BETWEEN 1 AND 10),
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 12),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_subject_code_per_inst UNIQUE (institution_id, code)
);

-- 5. CLASSES TABLE
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    section VARCHAR(20) NOT NULL,
    batch VARCHAR(50) NOT NULL,
    semester INT NOT NULL,
    room_number VARCHAR(50),
    advisor_faculty_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. FACULTY TABLE
CREATE TABLE IF NOT EXISTS faculty (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    employee_id VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    qualification VARCHAR(255),
    experience_years INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'On Leave', 'Inactive')),
    photo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_faculty_emp_id UNIQUE (institution_id, employee_id)
);

-- 7. STUDENTS TABLE
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE RESTRICT,
    class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    admission_no VARCHAR(50) NOT NULL,
    roll_no VARCHAR(50) NOT NULL,
    register_no VARCHAR(50) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    photo_url TEXT,
    gender VARCHAR(20) CHECK (gender IN ('Male', 'Female', 'Other')),
    dob DATE NOT NULL,
    blood_group VARCHAR(10),
    semester INT NOT NULL DEFAULT 1,
    section VARCHAR(10) NOT NULL DEFAULT 'A',
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    address TEXT,
    parent_name VARCHAR(255),
    parent_phone VARCHAR(50),
    emergency_contact VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Graduated')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_roll_no_per_inst UNIQUE (institution_id, roll_no),
    CONSTRAINT unique_reg_no_per_inst UNIQUE (institution_id, register_no)
);

-- 8. PARENTS & LINKING TABLE
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    parent_id_code VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    occupation VARCHAR(255),
    address TEXT,
    emergency_contact VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS parent_student_links (
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    PRIMARY KEY (parent_id, student_id)
);

-- 9. TIMETABLE SLOTS TABLE
CREATE TABLE IF NOT EXISTS timetable_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    faculty_id UUID NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT no_room_double_booking UNIQUE (institution_id, room_number, day_of_week, start_time),
    CONSTRAINT no_faculty_double_booking UNIQUE (institution_id, faculty_id, day_of_week, start_time)
);

-- 10. ATTENDANCE RECORDS TABLE
CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Present', 'Absent', 'Late', 'Leave')),
    marked_by_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_daily_student_subject_attendance UNIQUE (date, student_id, subject_id)
);

-- 11. LEAVE REQUESTS TABLE
CREATE TABLE IF NOT EXISTS leave_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    applicant_type VARCHAR(20) NOT NULL CHECK (applicant_type IN ('Student', 'Faculty')),
    applicant_id UUID NOT NULL,
    reason TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_count INT NOT NULL CHECK (days_count > 0),
    status VARCHAR(20) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    applied_on DATE DEFAULT CURRENT_DATE,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_audience VARCHAR(50) NOT NULL CHECK (target_audience IN ('All', 'Department', 'Faculty', 'Student')),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    created_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PERFORMANCE INDEXES
CREATE INDEX IF NOT EXISTS idx_students_dept_inst ON students(institution_id, department_id);
CREATE INDEX IF NOT EXISTS idx_students_roll ON students(roll_no);
CREATE INDEX IF NOT EXISTS idx_attendance_date_student ON attendance_records(date, student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_inst_status ON attendance_records(institution_id, status);
CREATE INDEX IF NOT EXISTS idx_faculty_inst ON faculty(institution_id);
CREATE INDEX IF NOT EXISTS idx_timetable_class ON timetable_slots(class_id, day_of_week);
