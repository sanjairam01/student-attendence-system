export type AdminTab =
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
  | 'reports'
  | 'analytics'
  | 'announcements'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'backend_code';

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  registerNo: string;
  fullName: string;
  photoUrl: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  departmentId: string;
  departmentName?: string;
  courseId: string;
  courseName?: string;
  semester: number;
  section: string;
  email: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  emergencyContact: string;
  status: 'Active' | 'Inactive' | 'Graduated';
  attendancePct: number;
  academicGpa: number;
}

export interface Faculty {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experienceYears: number;
  departmentId: string;
  departmentName?: string;
  assignedSubjectIds: string[];
  assignedClassIds: string[];
  status: 'Active' | 'On Leave' | 'Inactive';
  photoUrl: string;
}

export interface Parent {
  id: string;
  parentId: string;
  name: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  emergencyContact: string;
  linkedStudentIds: string[];
}

export interface Department {
  id: string;
  code: string;
  name: string;
  hodName: string;
  description: string;
  facultyCount: number;
  studentCount: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  durationYears: number;
  totalSemesters: number;
  departmentId: string;
  departmentName?: string;
  description: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  departmentId: string;
  departmentName?: string;
  facultyId?: string;
  facultyName?: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  section: string;
  batch: string;
  departmentId: string;
  departmentName?: string;
  courseId: string;
  courseName?: string;
  semester: number;
  roomNumber: string;
  advisorFacultyId?: string;
  advisorFacultyName?: string;
  studentCount: number;
}

export interface TimetableSlot {
  id: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  subjectCode?: string;
  facultyId: string;
  facultyName: string;
  roomNumber: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:00 AM"
}

export interface AttendanceRecord {
  id: string;
  date: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  classId: string;
  className: string;
  subjectId: string;
  subjectName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  markedBy: string;
  remarks?: string;
}

export interface LeaveRequest {
  id: string;
  applicantType: 'Student' | 'Faculty';
  applicantId: string;
  applicantName: string;
  departmentName: string;
  role: string;
  reason: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
  comment?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  targetAudience: 'All' | 'Department' | 'Faculty' | 'Student';
  departmentId?: string;
  departmentName?: string;
  scheduledFor?: string;
  priority: 'Low' | 'Medium' | 'High';
  createdBy: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  type: 'Warning' | 'Leave' | 'Announcement' | 'Birthday' | 'System';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  recipientGroup: string;
}

export interface InstitutionSettings {
  institutionName: string;
  logoUrl: string;
  academicYear: string;
  currentSemester: string;
  workingDaysPerWeek: number;
  attendanceThresholdPct: number;
  contactEmail: string;
  contactPhone: string;
  address: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  sendAutomaticWarnings: boolean;
}
