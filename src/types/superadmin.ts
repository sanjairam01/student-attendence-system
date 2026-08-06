export type SuperAdminTab =
  | 'dashboard'
  | 'students'
  | 'faculty'
  | 'parents'
  | 'departments'
  | 'courses'
  | 'subjects'
  | 'classes'
  | 'attendance'
  | 'timetable'
  | 'leaves'
  | 'announcements'
  | 'reports'
  | 'analytics'
  | 'notifications'
  | 'users'
  | 'roles'
  | 'permissions'
  | 'settings'
  | 'backup'
  | 'audit_logs'
  | 'profile';

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  regNo: string;
  fullName: string;
  photoUrl: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  department: string;
  course: string;
  semester: string;
  section: string;
  bloodGroup: string;
  nationality: string;
  status: 'Active' | 'Suspended' | 'Graduated' | 'Inactive';
  attendancePct: number;
  history?: { date: string; action: string; note: string }[];
}

export interface Faculty {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string;
  department: string;
  qualification: string;
  experience: string;
  employmentStatus: 'Active' | 'On Leave' | 'Terminated';
  assignedSubjects: string[];
  assignedClasses: string[];
}

export interface Parent {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  address: string;
  children: { studentId: string; studentName: string; rollNo: string; department: string }[];
}

export interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  description: string;
  studentCount: number;
  facultyCount: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  duration: string;
  semesterCount: number;
  department: string;
  description: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  credits: number;
  semester: string;
  department: string;
  course: string;
  assignedFaculty: string;
}

export interface ClassItem {
  id: string;
  name: string;
  batch: string;
  academicYear: string;
  semester: string;
  section: string;
  roomNumber: string;
  assignedFaculty: string;
  studentCount: number;
}

export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  timeSlot: string;
  subject: string;
  faculty: string;
  room: string;
  className: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  department: string;
  course: string;
  className: string;
  subject: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  markedBy: string;
}

export interface LeaveRequest {
  id: string;
  applicantType: 'Student' | 'Faculty';
  applicantName: string;
  applicantId: string;
  department: string;
  leaveType: 'Medical' | 'Casual' | 'Emergency' | 'Academic';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  medicalDocUrl?: string;
  submittedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Department Specific' | 'Faculty Only' | 'Students Only';
  targetDepartment?: string;
  scheduledDate: string;
  author: string;
  status: 'Published' | 'Scheduled' | 'Draft';
  createdAt: string;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'HOD' | 'Faculty' | 'Parent' | 'Student';
  status: 'Active' | 'Inactive';
  lastLogin: string;
}

export interface RolePermission {
  roleId: string;
  roleName: string;
  description: string;
  permissions: {
    students: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    faculty: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    attendance: { view: boolean; edit: boolean; override: boolean };
    reports: { view: boolean; export: boolean };
    settings: { fullAccess: boolean };
  };
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'LOGIN' | 'ATTENDANCE_CHANGE' | 'DB_BACKUP' | 'SETTINGS_UPDATE' | 'ROLE_ASSIGN' | 'STUDENT_DELETE';
  details: string;
  ipAddress: string;
}

export interface SystemSettings {
  collegeName: string;
  collegeLogo: string;
  academicYear: string;
  semester: string;
  emailSmtp: string;
  theme: 'Dark' | 'Light' | 'Liquid Glass';
  language: string;
  timezone: string;
  autoBackup: boolean;
  backupFrequency: 'Daily' | 'Weekly' | 'Monthly';
}
