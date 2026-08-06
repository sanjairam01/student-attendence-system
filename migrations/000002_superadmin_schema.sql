-- Smart Attendance Management System: Super Admin SQL Schema
-- Engine: MySQL 8.0+ / PostgreSQL Compatible DDL with Foreign Keys & Indexes

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    head_faculty_id VARCHAR(36),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(36) PRIMARY KEY,
    department_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    duration_years INT NOT NULL DEFAULT 4,
    semester_count INT NOT NULL DEFAULT 8,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX,
    CONSTRAINT fk_courses_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 3. Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
    id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(36) NOT NULL,
    department_id VARCHAR(36) NOT NULL,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    credits INT NOT NULL DEFAULT 3,
    semester_num INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX,
    CONSTRAINT fk_subjects_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_subjects_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- 4. Faculty Table
CREATE TABLE IF NOT EXISTS faculty (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    department_id VARCHAR(36) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30),
    qualification VARCHAR(200),
    experience_years INT DEFAULT 0,
    employment_status ENUM('Active', 'OnLeave', 'Terminated') DEFAULT 'Active',
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX,
    CONSTRAINT fk_faculty_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
);

-- 5. Classes / Batches Table
CREATE TABLE IF NOT EXISTS classes (
    id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(36) NOT NULL,
    advisor_faculty_id VARCHAR(36),
    name VARCHAR(100) NOT NULL,
    batch_year INT NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    semester_num INT NOT NULL,
    section_name VARCHAR(10) NOT NULL,
    room_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX,
    CONSTRAINT fk_classes_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT fk_classes_faculty FOREIGN KEY (advisor_faculty_id) REFERENCES faculty(id) ON DELETE SET NULL
);

-- 6. Students Table
CREATE TABLE IF NOT EXISTS students (
    id VARCHAR(36) PRIMARY KEY,
    admission_no VARCHAR(50) NOT NULL UNIQUE,
    roll_no VARCHAR(50) NOT NULL UNIQUE,
    reg_no VARCHAR(50) NOT NULL UNIQUE,
    class_id VARCHAR(36) NOT NULL,
    department_id VARCHAR(36) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30),
    parent_name VARCHAR(150),
    parent_phone VARCHAR(30),
    address TEXT,
    blood_group VARCHAR(10),
    nationality VARCHAR(50) DEFAULT 'American',
    status ENUM('Active', 'Suspended', 'Graduated', 'Withdrawn') DEFAULT 'Active',
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX,
    CONSTRAINT fk_students_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_students_department FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
);

-- 7. Parent Mapping Table
CREATE TABLE IF NOT EXISTS parents (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL,
    emergency_contact VARCHAR(30),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL INDEX
);

CREATE TABLE IF NOT EXISTS parent_student_mapping (
    parent_id VARCHAR(36) NOT NULL,
    student_id VARCHAR(36) NOT NULL,
    relationship VARCHAR(50) DEFAULT 'Parent',
    PRIMARY KEY (parent_id, student_id),
    CONSTRAINT fk_psm_parent FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
    CONSTRAINT fk_psm_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- 8. Timetable Table
CREATE TABLE IF NOT EXISTS timetables (
    id VARCHAR(36) PRIMARY KEY,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    faculty_id VARCHAR(36) NOT NULL,
    day_of_week ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    room_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_timetable_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_timetable_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    CONSTRAINT fk_timetable_faculty FOREIGN KEY (faculty_id) REFERENCES faculty(id) ON DELETE CASCADE
);

-- 9. Attendance Records Table
CREATE TABLE IF NOT EXISTS attendance_records (
    id VARCHAR(36) PRIMARY KEY,
    student_id VARCHAR(36) NOT NULL,
    class_id VARCHAR(36) NOT NULL,
    subject_id VARCHAR(36) NOT NULL,
    faculty_id VARCHAR(36) NOT NULL,
    attendance_date DATE NOT NULL,
    status ENUM('Present', 'Absent', 'Late', 'Excused') NOT NULL,
    verification_type ENUM('BiometricFace', 'QRCode', 'GeotaggedGPS', 'Manual') DEFAULT 'Manual',
    remarks TEXT,
    marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_att_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    CONSTRAINT fk_att_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    CONSTRAINT fk_att_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    INDEX idx_att_date (attendance_date),
    INDEX idx_att_student_date (student_id, attendance_date)
);

-- 10. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_email VARCHAR(150) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(100),
    details TEXT,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
