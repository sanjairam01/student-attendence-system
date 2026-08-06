export type ParentTab =
  | 'dashboard'
  | 'child_profile'
  | 'attendance'
  | 'reports'
  | 'timetable'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'backend_code';

export interface ParentProfile {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  linkedChildrenCount: number;
  emergencyContact: string;
}

export interface ChildSummary {
  id: string;
  studentId: string;
  rollNumber: string;
  registerNumber: string;
  admissionNumber: string;
  fullName: string;
  department: string;
  course: string;
  semester: string;
  section: string;
  attendancePct: number;
  todayStatus: 'Present' | 'Absent' | 'Late' | 'Leave' | 'Holiday';
  totalClasses: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  leaveDays: number;
  avatarUrl?: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  advisorName: string;
  advisorPhone: string;
}

export interface ParentNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'Low Attendance' | 'Absent' | 'Leave Approval' | 'Announcement';
}

export interface ParentReportFilter {
  childId: string;
  reportType: 'monthly' | 'semester' | 'subject';
  month?: string;
}
