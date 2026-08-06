export type FacultyTab =
  | 'dashboard'
  | 'classes'
  | 'subjects'
  | 'mark_attendance'
  | 'qr_attendance'
  | 'attendance_history'
  | 'students'
  | 'timetable'
  | 'leaves'
  | 'reports'
  | 'analytics'
  | 'announcements'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'backend_code';

export type AttendanceStatusType =
  | 'Present'
  | 'Absent'
  | 'Late'
  | 'Medical Leave'
  | 'Half Day'
  | 'Holiday'
  | 'Online Class';

export interface FacultyProfile {
  id: string;
  facultyId: string;
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  qualification: string;
  experienceYears: number;
  departmentId: string;
  departmentName: string;
  officeLocation: string;
  designation: string;
  joinDate: string;
}

export interface FacultySubject {
  id: string;
  code: string;
  name: string;
  credits: number;
  departmentId: string;
  departmentName: string;
  semester: number;
  studentCount: number;
  avgAttendancePct: number;
  syllabusCompletionPct: number;
}

export interface FacultyClass {
  id: string;
  name: string;
  section: string;
  semester: number;
  departmentId: string;
  departmentName: string;
  roomNumber: string;
  studentCount: number;
  avgAttendancePct: number;
}

export interface StudentForFaculty {
  id: string;
  rollNo: string;
  admissionNo: string;
  fullName: string;
  email: string;
  phone: string;
  parentPhone: string;
  classId: string;
  className: string;
  departmentName: string;
  semester: number;
  attendancePct: number;
  isLowAttendanceWarning: boolean; // <75%
  avatarUrl?: string;
}

export interface FacultyAttendanceSession {
  id: string;
  date: string;
  timeSlot: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  roomNumber: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  medicalLeaveCount: number;
  attendancePct: number;
  mode: 'Manual' | 'QR Code' | 'GPS Biometric' | 'Face Recognition';
  status: 'Completed' | 'In-Progress' | 'Draft';
  createdAt: string;
}

export interface FacultyAttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  date: string;
  timeSlot: string;
  status: AttendanceStatusType;
  remarks?: string;
  markedAt: string;
}

export interface QRAttendanceSession {
  sessionId: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  qrCodeToken: string;
  expiresInSeconds: number;
  generatedAt: string;
  gpsRequired: boolean;
  gpsLatitude?: number;
  gpsLongitude?: number;
  maxRadiusMeters?: number;
  scannedCount: number;
  totalStudents: number;
  isActive: boolean;
}

export interface FacultyTimetableSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  periodNumber: number;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  roomNumber: string;
  isCurrentPeriod?: boolean;
}

export interface FacultyLeaveRequest {
  id: string;
  leaveType: 'Casual' | 'Medical' | 'Duty' | 'Earned' | 'Special';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  appliedOn: string;
  medicalCertName?: string;
  adminComment?: string;
}

export interface FacultyAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'Department' | 'Class' | 'Institutional';
  targetClassId?: string;
  targetClassName?: string;
  priority: 'High' | 'Medium' | 'Low';
  publishedDate: string;
  publisherName: string;
}

export interface FacultyNotification {
  id: string;
  title: string;
  message: string;
  type: 'Class Reminder' | 'Attendance Alert' | 'Leave Update' | 'Announcement' | 'System';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface FacultyReportFilter {
  reportType: 'daily' | 'weekly' | 'monthly' | 'semester' | 'subject' | 'class' | 'student' | 'low_attendance';
  classId: string;
  subjectId: string;
  startDate: string;
  endDate: string;
  attendanceThresholdPct: number;
}
