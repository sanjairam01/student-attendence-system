-- Smart Attendance Management System - Database Schema Rollback

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `system_settings`;
DROP TABLE IF EXISTS `audit_logs`;
DROP TABLE IF EXISTS `sessions`;
DROP TABLE IF EXISTS `notifications`;
DROP TABLE IF EXISTS `leave_requests`;
DROP TABLE IF EXISTS `attendance_logs`;
DROP TABLE IF EXISTS `attendance`;
DROP TABLE IF EXISTS `timetables`;
DROP TABLE IF EXISTS `student_subjects`;
DROP TABLE IF EXISTS `faculty_subjects`;
DROP TABLE IF EXISTS `classes`;
DROP TABLE IF EXISTS `subjects`;
DROP TABLE IF EXISTS `students`;
DROP TABLE IF EXISTS `parents`;
DROP TABLE IF EXISTS `faculty`;
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `departments`;
DROP TABLE IF EXISTS `roles`;

SET FOREIGN_KEY_CHECKS = 1;
