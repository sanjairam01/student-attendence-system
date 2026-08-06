import {
  OverviewKpiStats,
  AttendanceTrendData,
  DepartmentAttendanceStat,
  FacultyPerformanceStat,
  CourseAttendanceStat,
  DefaulterStudent,
  HeatmapCell,
  ScheduledReportItem,
  SystemNotificationAlert,
  DetailedReportRecord,
} from '../types/reports';

export const INITIAL_OVERVIEW_KPI: OverviewKpiStats = {
  totalStudents: 1480,
  totalFaculty: 86,
  totalDepartments: 6,
  totalSubjects: 42,
  totalCourses: 14,
  todayAttendance: {
    present: 1284,
    absent: 112,
    late: 54,
    onLeave: 30,
    percentage: 86.75,
  },
  monthlyAttendancePct: 88.4,
  semesterAttendancePct: 85.9,
  yearlyAttendancePct: 87.2,
};

export const DAILY_ATTENDANCE_TREND: AttendanceTrendData[] = [
  { period: '08:00 AM', present: 220, absent: 15, late: 12, leave: 3, percentage: 88.0 },
  { period: '09:00 AM', present: 310, absent: 20, late: 18, leave: 2, percentage: 88.5 },
  { period: '10:00 AM', present: 295, absent: 25, late: 10, leave: 5, percentage: 88.0 },
  { period: '11:00 AM', present: 280, absent: 30, late: 8, leave: 4, percentage: 86.9 },
  { period: '12:00 PM', present: 180, absent: 12, late: 4, leave: 2, percentage: 90.9 },
  { period: '02:00 PM', present: 260, absent: 28, late: 14, leave: 6, percentage: 84.4 },
  { period: '03:00 PM', present: 240, absent: 35, late: 16, leave: 8, percentage: 80.2 },
];

export const WEEKLY_ATTENDANCE_TREND: AttendanceTrendData[] = [
  { period: 'Mon', present: 1340, absent: 80, late: 40, leave: 20, percentage: 90.5 },
  { period: 'Tue', present: 1310, absent: 95, late: 50, leave: 25, percentage: 88.5 },
  { period: 'Wed', present: 1290, absent: 110, late: 55, leave: 25, percentage: 87.1 },
  { period: 'Thu', present: 1284, absent: 112, late: 54, leave: 30, percentage: 86.7 },
  { period: 'Fri', present: 1220, absent: 150, late: 70, leave: 40, percentage: 82.4 },
  { period: 'Sat', present: 950, absent: 380, late: 100, leave: 50, percentage: 64.1 },
];

export const MONTHLY_ATTENDANCE_TREND: AttendanceTrendData[] = [
  { period: 'Week 1', present: 6400, absent: 520, late: 280, leave: 100, percentage: 87.6 },
  { period: 'Week 2', present: 6580, absent: 480, late: 240, leave: 90, percentage: 89.0 },
  { period: 'Week 3', present: 6310, absent: 610, late: 310, leave: 120, percentage: 85.8 },
  { period: 'Week 4', present: 6490, absent: 510, late: 250, leave: 110, percentage: 88.2 },
];

export const SEMESTER_ATTENDANCE_TREND: AttendanceTrendData[] = [
  { period: 'Jan', present: 25400, absent: 2100, late: 1100, leave: 400, percentage: 87.5 },
  { period: 'Feb', present: 26100, absent: 1900, late: 950, leave: 350, percentage: 89.0 },
  { period: 'Mar', present: 24800, absent: 2400, late: 1300, leave: 500, percentage: 85.5 },
  { period: 'Apr', present: 25900, absent: 2000, late: 1000, leave: 400, percentage: 88.3 },
  { period: 'May', present: 23200, absent: 3100, late: 1600, leave: 700, percentage: 81.1 },
];

export const DEPARTMENT_STATS: DepartmentAttendanceStat[] = [
  { id: 'dept-1', name: 'Computer Science & Engineering', code: 'CSE', totalStudents: 480, totalClasses: 320, presentPct: 91.2, defaultersCount: 12, status: 'OPTIMAL' },
  { id: 'dept-2', name: 'Information Technology', code: 'IT', totalStudents: 360, totalClasses: 310, presentPct: 88.6, defaultersCount: 18, status: 'OPTIMAL' },
  { id: 'dept-3', name: 'Electronics & Communication', code: 'ECE', totalStudents: 290, totalClasses: 300, presentPct: 84.2, defaultersCount: 26, status: 'WARNING' },
  { id: 'dept-4', name: 'Electrical & Electronics', code: 'EEE', totalStudents: 180, totalClasses: 290, presentPct: 81.5, defaultersCount: 22, status: 'WARNING' },
  { id: 'dept-5', name: 'Mechanical Engineering', code: 'MECH', totalStudents: 120, totalClasses: 280, presentPct: 76.8, defaultersCount: 29, status: 'CRITICAL' },
  { id: 'dept-6', name: 'Civil Engineering', code: 'CIVIL', totalStudents: 50, totalClasses: 260, presentPct: 79.4, defaultersCount: 9, status: 'WARNING' },
];

export const FACULTY_PERFORMANCE_STATS: FacultyPerformanceStat[] = [
  { id: 'fac-1', name: 'Dr. Robert Langdon', employeeId: 'FAC-1001', department: 'Computer Science', subjectName: 'Distributed Cloud Systems', totalSessionsHeld: 48, avgAttendancePct: 92.4, punctualityRatePct: 98.2, rating: 4.9 },
  { id: 'fac-2', name: 'Prof. Sarah Jenkins', employeeId: 'FAC-1002', department: 'Information Technology', subjectName: 'Cybersecurity Fundamentals', totalSessionsHeld: 42, avgAttendancePct: 90.1, punctualityRatePct: 96.5, rating: 4.8 },
  { id: 'fac-3', name: 'Dr. Michael Chang', employeeId: 'FAC-1003', department: 'Electronics', subjectName: 'Embedded Systems Architecture', totalSessionsHeld: 40, avgAttendancePct: 83.5, punctualityRatePct: 91.0, rating: 4.2 },
  { id: 'fac-4', name: 'Prof. Amanda Vance', employeeId: 'FAC-1004', department: 'Electrical', subjectName: 'Power Electronics II', totalSessionsHeld: 38, avgAttendancePct: 80.8, punctualityRatePct: 89.4, rating: 4.0 },
  { id: 'fac-5', name: 'Dr. Arthur Pendelton', employeeId: 'FAC-1005', department: 'Mechanical', subjectName: 'Thermodynamics & Heat Transfer', totalSessionsHeld: 36, avgAttendancePct: 75.2, punctualityRatePct: 84.1, rating: 3.7 },
];

export const COURSE_ATTENDANCE_STATS: CourseAttendanceStat[] = [
  { id: 'crs-1', courseName: 'B.Tech Computer Science', code: 'BT-CSE', department: 'CSE', semester: 'Semester 6', enrolledStudents: 160, avgAttendancePct: 92.1 },
  { id: 'crs-2', courseName: 'B.Tech Artificial Intelligence', code: 'BT-AI', department: 'CSE', semester: 'Semester 4', enrolledStudents: 140, avgAttendancePct: 90.8 },
  { id: 'crs-3', courseName: 'B.Tech Information Tech', code: 'BT-IT', department: 'IT', semester: 'Semester 6', enrolledStudents: 120, avgAttendancePct: 88.9 },
  { id: 'crs-4', courseName: 'B.Tech Electronics & Comm', code: 'BT-ECE', department: 'ECE', semester: 'Semester 4', enrolledStudents: 110, avgAttendancePct: 84.5 },
  { id: 'crs-5', courseName: 'M.Tech Software Engineering', code: 'MT-SE', department: 'CSE', semester: 'Semester 2', enrolledStudents: 45, avgAttendancePct: 94.6 },
];

export const DEFAULTERS_LIST: DefaulterStudent[] = [
  { id: 'def-1', rollNumber: 'CS2026-089', fullName: 'Alexander Hayes', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'A', totalClasses: 120, attendedClasses: 82, absentClasses: 38, attendancePct: 68.3, parentPhone: '+1 (555) 019-2831', status: 'SEVERE_DEFAULTER' },
  { id: 'def-2', rollNumber: 'EC2026-042', fullName: 'Brandon Miller', department: 'ECE', course: 'B.Tech ECE', semester: 'Semester 4', section: 'B', totalClasses: 115, attendedClasses: 76, absentClasses: 39, attendancePct: 66.0, parentPhone: '+1 (555) 018-9920', status: 'SEVERE_DEFAULTER' },
  { id: 'def-3', rollNumber: 'ME2026-018', fullName: 'Christopher Lee', department: 'MECH', course: 'B.Tech ME', semester: 'Semester 6', section: 'A', totalClasses: 110, attendedClasses: 68, absentClasses: 42, attendancePct: 61.8, parentPhone: '+1 (555) 012-4411', status: 'CRITICAL_RISK' },
  { id: 'def-4', rollNumber: 'IT2026-095', fullName: 'David Rodriguez', department: 'IT', course: 'B.Tech IT', semester: 'Semester 6', section: 'C', totalClasses: 125, attendedClasses: 91, absentClasses: 34, attendancePct: 72.8, parentPhone: '+1 (555) 014-7733', status: 'WARNING' },
  { id: 'def-5', rollNumber: 'EE2026-031', fullName: 'Ethan Hunt', department: 'EEE', course: 'B.Tech EEE', semester: 'Semester 4', section: 'A', totalClasses: 118, attendedClasses: 84, absentClasses: 34, attendancePct: 71.1, parentPhone: '+1 (555) 016-5522', status: 'WARNING' },
  { id: 'def-6', rollNumber: 'CS2026-112', fullName: 'Fiona Gallagher', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'B', totalClasses: 120, attendedClasses: 70, absentClasses: 50, attendancePct: 58.3, parentPhone: '+1 (555) 011-8844', status: 'CRITICAL_RISK' },
  { id: 'def-7', rollNumber: 'CV2026-009', fullName: 'George Martin', department: 'CIVIL', course: 'B.Tech Civil', semester: 'Semester 4', section: 'A', totalClasses: 105, attendedClasses: 77, absentClasses: 28, attendancePct: 73.3, parentPhone: '+1 (555) 017-3399', status: 'WARNING' },
];

export const ATTENDANCE_HEATMAP_DATA: HeatmapCell[] = [
  { day: 'Mon', timeSlot: '08:00 AM', attendancePct: 94, count: 420 },
  { day: 'Mon', timeSlot: '09:00 AM', attendancePct: 96, count: 480 },
  { day: 'Mon', timeSlot: '10:00 AM', attendancePct: 92, count: 460 },
  { day: 'Mon', timeSlot: '11:00 AM', attendancePct: 88, count: 440 },
  { day: 'Mon', timeSlot: '02:00 PM', attendancePct: 85, count: 410 },
  { day: 'Mon', timeSlot: '03:00 PM', attendancePct: 81, count: 390 },

  { day: 'Tue', timeSlot: '08:00 AM', attendancePct: 91, count: 410 },
  { day: 'Tue', timeSlot: '09:00 AM', attendancePct: 95, count: 475 },
  { day: 'Tue', timeSlot: '10:00 AM', attendancePct: 90, count: 450 },
  { day: 'Tue', timeSlot: '11:00 AM', attendancePct: 86, count: 430 },
  { day: 'Tue', timeSlot: '02:00 PM', attendancePct: 83, count: 400 },
  { day: 'Tue', timeSlot: '03:00 PM', attendancePct: 78, count: 370 },

  { day: 'Wed', timeSlot: '08:00 AM', attendancePct: 89, count: 400 },
  { day: 'Wed', timeSlot: '09:00 AM', attendancePct: 93, count: 465 },
  { day: 'Wed', timeSlot: '10:00 AM', attendancePct: 89, count: 445 },
  { day: 'Wed', timeSlot: '11:00 AM', attendancePct: 84, count: 420 },
  { day: 'Wed', timeSlot: '02:00 PM', attendancePct: 82, count: 395 },
  { day: 'Wed', timeSlot: '03:00 PM', attendancePct: 76, count: 360 },

  { day: 'Thu', timeSlot: '08:00 AM', attendancePct: 88, count: 395 },
  { day: 'Thu', timeSlot: '09:00 AM', attendancePct: 92, count: 460 },
  { day: 'Thu', timeSlot: '10:00 AM', attendancePct: 88, count: 440 },
  { day: 'Thu', timeSlot: '11:00 AM', attendancePct: 82, count: 410 },
  { day: 'Thu', timeSlot: '02:00 PM', attendancePct: 80, count: 385 },
  { day: 'Thu', timeSlot: '03:00 PM', attendancePct: 74, count: 350 },

  { day: 'Fri', timeSlot: '08:00 AM', attendancePct: 84, count: 380 },
  { day: 'Fri', timeSlot: '09:00 AM', attendancePct: 89, count: 440 },
  { day: 'Fri', timeSlot: '10:00 AM', attendancePct: 82, count: 410 },
  { day: 'Fri', timeSlot: '11:00 AM', attendancePct: 78, count: 390 },
  { day: 'Fri', timeSlot: '02:00 PM', attendancePct: 72, count: 340 },
  { day: 'Fri', timeSlot: '03:00 PM', attendancePct: 65, count: 310 },
];

export const INITIAL_SCHEDULED_REPORTS: ScheduledReportItem[] = [
  { id: 'sch-1', reportTitle: 'Daily Institution Attendance Digest', frequency: 'DAILY', recipients: ['principal@university.edu', 'dean.academic@university.edu'], format: 'BOTH', lastRun: '2026-08-05 06:00 AM', nextRun: '2026-08-06 06:00 AM', status: 'ACTIVE', createdRole: 'superadmin' },
  { id: 'sch-2', reportTitle: 'Weekly Defaulter (<75%) Student Roster', frequency: 'WEEKLY', recipients: ['hod.cse@university.edu', 'hod.ece@university.edu'], format: 'PDF', lastRun: '2026-08-01 08:00 AM', nextRun: '2026-08-08 08:00 AM', status: 'ACTIVE', createdRole: 'admin' },
  { id: 'sch-3', reportTitle: 'Monthly Departmental Performance Report', frequency: 'MONTHLY', recipients: ['admin.office@university.edu'], format: 'EXCEL', lastRun: '2026-08-01 00:00 AM', nextRun: '2026-09-01 00:00 AM', status: 'ACTIVE', createdRole: 'admin' },
];

export const INITIAL_REPORT_NOTIFICATIONS: SystemNotificationAlert[] = [
  { id: 'notif-1', type: 'REPORT_GENERATED', title: 'Monthly Attendance Digest Ready', message: 'The official July 2026 Monthly Attendance Audit Report was generated.', timestamp: '10 mins ago', read: false, severity: 'info' },
  { id: 'notif-2', type: 'LOW_ATTENDANCE_ALERT', title: 'Critical Low Attendance Alert', message: '7 students in Mechanical Engineering dropped below 65% attendance cutoff.', timestamp: '1 hour ago', read: false, severity: 'alert' },
  { id: 'notif-3', type: 'EXPORT_COMPLETE', title: 'Excel Export Completed', message: 'Semester 6 CSE Attendance Record exported to CSV/XLSX successfully.', timestamp: '3 hours ago', read: true, severity: 'success' },
];

export const SAMPLE_DETAILED_RECORDS: DetailedReportRecord[] = [
  { id: 'rec-101', date: '2026-08-05', studentRoll: 'CS2026-001', studentName: 'Alexander Hayes', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'A', subject: 'Cloud Computing Architecture', faculty: 'Dr. Robert Langdon', status: 'PRESENT', markedTime: '08:58 AM', method: 'FACIAL_AI' },
  { id: 'rec-102', date: '2026-08-05', studentRoll: 'CS2026-002', studentName: 'Beatrice Vance', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'A', subject: 'Cloud Computing Architecture', faculty: 'Dr. Robert Langdon', status: 'PRESENT', markedTime: '08:55 AM', method: 'BIOMETRIC' },
  { id: 'rec-103', date: '2026-08-05', studentRoll: 'CS2026-003', studentName: 'Charles Xavier', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'A', subject: 'Cloud Computing Architecture', faculty: 'Dr. Robert Langdon', status: 'LATE', markedTime: '09:12 AM', method: 'RFID' },
  { id: 'rec-104', date: '2026-08-05', studentRoll: 'CS2026-004', studentName: 'Diana Prince', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'A', subject: 'Cloud Computing Architecture', faculty: 'Dr. Robert Langdon', status: 'ABSENT', markedTime: '-', method: 'MANUAL', remarks: 'Unexcused Absence' },
  { id: 'rec-105', date: '2026-08-05', studentRoll: 'CS2026-005', studentName: 'Edward Stark', department: 'CSE', course: 'B.Tech CSE', semester: 'Semester 6', section: 'A', subject: 'Cloud Computing Architecture', faculty: 'Dr. Robert Langdon', status: 'ON_LEAVE', markedTime: '-', method: 'MANUAL', remarks: 'Medical Leave Approved' },
  { id: 'rec-106', date: '2026-08-05', studentRoll: 'EC2026-012', studentName: 'Fiona Apple', department: 'ECE', course: 'B.Tech ECE', semester: 'Semester 4', section: 'B', subject: 'Signals & Systems', faculty: 'Dr. Michael Chang', status: 'PRESENT', markedTime: '10:02 AM', method: 'BIOMETRIC' },
  { id: 'rec-107', date: '2026-08-05', studentRoll: 'EC2026-013', studentName: 'Gabriel Garcia', department: 'ECE', course: 'B.Tech ECE', semester: 'Semester 4', section: 'B', subject: 'Signals & Systems', faculty: 'Dr. Michael Chang', status: 'ABSENT', markedTime: '-', method: 'MANUAL' },
  { id: 'rec-108', date: '2026-08-05', studentRoll: 'IT2026-044', studentName: 'Hannah Montana', department: 'IT', course: 'B.Tech IT', semester: 'Semester 6', section: 'A', subject: 'Database Internals', faculty: 'Prof. Sarah Jenkins', status: 'PRESENT', markedTime: '11:00 AM', method: 'FACIAL_AI' },
  { id: 'rec-109', date: '2026-08-05', studentRoll: 'IT2026-045', studentName: 'Ian Wright', department: 'IT', course: 'B.Tech IT', semester: 'Semester 6', section: 'A', subject: 'Database Internals', faculty: 'Prof. Sarah Jenkins', status: 'LATE', markedTime: '11:15 AM', method: 'RFID' },
  { id: 'rec-110', date: '2026-08-05', studentRoll: 'ME2026-002', studentName: 'Jack Reacher', department: 'MECH', course: 'B.Tech ME', semester: 'Semester 6', section: 'A', subject: 'Fluid Mechanics', faculty: 'Dr. Arthur Pendelton', status: 'ABSENT', markedTime: '-', method: 'MANUAL', remarks: 'Parent Notified via SMS' },
];
