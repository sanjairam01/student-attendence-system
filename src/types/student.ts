export type StudentTab =
  | 'dashboard'
  | 'attendance'
  | 'calendar'
  | 'subjects'
  | 'timetable'
  | 'leave'
  | 'reports'
  | 'notifications'
  | 'announcements'
  | 'analytics'
  | 'profile'
  | 'settings'
  | 'backend_code';

export interface StudentProfile {
  id: string;
  studentId: string;
  admissionNumber: string;
  registerNumber: string;
  rollNumber: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  department: string;
  course: string;
  semester: string;
  section: string;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  emergencyContact: string;
  avatarUrl?: string;
  overallAttendancePct: number;
}

export interface SubjectAttendance {
  id: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  credits: number;
  totalClasses: number;
  attendedClasses: number;
  absentClasses: number;
  lateClasses: number;
  medicalLeaveClasses: number;
  percentage: number;
  scheduleInfo: string;
}

export interface DailyAttendanceRecord {
  id: string;
  date: string;
  dayOfWeek: string;
  subjectCode: string;
  subjectName: string;
  timeSlot: string;
  facultyName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Medical' | 'Holiday';
  remarks?: string;
}

export interface StudentLeaveApplication {
  id: string;
  leaveType: 'Casual' | 'Medical' | 'Duty' | 'Special';
  startDate: string;
  endDate: string;
  daysCount: number;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  appliedOn: string;
  medicalCertName?: string;
}

export interface StudentAnnouncement {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  category: 'Department' | 'Class' | 'General';
  publisherName: string;
  priority: 'High' | 'Normal' | 'Low';
}

export interface StudentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'Warning' | 'Alert' | 'Reminder' | 'Approval' | 'Announcement';
}

export interface StudentTimetableSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  periodNumber: number;
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  roomNumber: string;
  isCurrent?: boolean;
}

export interface StudentReportFilter {
  reportType: 'monthly' | 'semester' | 'subject' | 'daily';
  subjectId?: string;
  month?: string;
  startDate?: string;
  endDate?: string;
}
