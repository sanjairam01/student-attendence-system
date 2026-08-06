export type UserRole = 'superadmin' | 'admin' | 'faculty' | 'student' | 'parent';

export type ReportType = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'semester'
  | 'yearly'
  | 'department'
  | 'course'
  | 'subject'
  | 'faculty'
  | 'student'
  | 'defaulter'
  | 'summary';

export type AttendanceStatusFilter = 'ALL' | 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE';

export interface ReportFilterState {
  role: UserRole;
  departmentId: string;
  courseId: string;
  semester: string;
  section: string;
  subjectId: string;
  facultyId: string;
  studentId: string;
  attendanceStatus: AttendanceStatusFilter;
  startDate: string;
  endDate: string;
  searchQuery: string;
  sortBy: 'date' | 'name' | 'attendancePct' | 'rollNumber' | 'department';
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

export interface OverviewKpiStats {
  totalStudents: number;
  totalFaculty: number;
  totalDepartments: number;
  totalSubjects: number;
  totalCourses: number;
  todayAttendance: {
    present: number;
    absent: number;
    late: number;
    onLeave: number;
    percentage: number;
  };
  monthlyAttendancePct: number;
  semesterAttendancePct: number;
  yearlyAttendancePct: number;
}

export interface AttendanceTrendData {
  period: string; // e.g. "Mon", "Jan", "Sem 1"
  present: number;
  absent: number;
  late: number;
  leave: number;
  percentage: number;
}

export interface DepartmentAttendanceStat {
  id: string;
  name: string;
  code: string;
  totalStudents: number;
  totalClasses: number;
  presentPct: number;
  defaultersCount: number;
  status: 'OPTIMAL' | 'WARNING' | 'CRITICAL';
}

export interface FacultyPerformanceStat {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  subjectName: string;
  totalSessionsHeld: number;
  avgAttendancePct: number;
  punctualityRatePct: number;
  rating: number;
}

export interface CourseAttendanceStat {
  id: string;
  courseName: string;
  code: string;
  department: string;
  semester: string;
  enrolledStudents: number;
  avgAttendancePct: number;
}

export interface DefaulterStudent {
  id: string;
  rollNumber: string;
  fullName: string;
  department: string;
  course: string;
  semester: string;
  section: string;
  totalClasses: number;
  attendedClasses: number;
  absentClasses: number;
  attendancePct: number;
  parentPhone: string;
  status: 'WARNING' | 'SEVERE_DEFAULTER' | 'CRITICAL_RISK';
}

export interface HeatmapCell {
  day: string; // "Mon", "Tue"...
  timeSlot: string; // "09:00 AM", "10:00 AM"...
  attendancePct: number;
  count: number;
}

export interface ScheduledReportItem {
  id: string;
  reportTitle: string;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SEMESTER' | 'YEARLY';
  recipients: string[];
  format: 'PDF' | 'EXCEL' | 'BOTH';
  lastRun: string;
  nextRun: string;
  status: 'ACTIVE' | 'PAUSED';
  createdRole: UserRole;
}

export interface SystemNotificationAlert {
  id: string;
  type: 'REPORT_GENERATED' | 'EXPORT_COMPLETE' | 'LOW_ATTENDANCE_ALERT' | 'MONTHLY_SUMMARY';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'info' | 'warning' | 'alert' | 'success';
}

export interface DetailedReportRecord {
  id: string;
  date: string;
  studentRoll: string;
  studentName: string;
  department: string;
  course: string;
  semester: string;
  section: string;
  subject: string;
  faculty: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE';
  markedTime: string;
  method: 'BIOMETRIC' | 'RFID' | 'FACIAL_AI' | 'MANUAL';
  remarks?: string;
}
