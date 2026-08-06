import React, { useState } from 'react';
import {
  ShieldAlert,
  Shield,
  UserCheck,
  Users,
  Key,
  Layers,
  Sparkles,
  Lock,
  LogOut,
  Moon,
  Sun,
  Bell,
  Mail,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
} from 'lucide-react';

// Super Admin Components & Data
import { SuperAdminSidebar } from './components/superadmin/SuperAdminSidebar';
import { SuperAdminHeader } from './components/superadmin/SuperAdminHeader';
import { SuperAdminDashboardView } from './components/superadmin/SuperAdminDashboardView';
import { StudentManagementView } from './components/superadmin/StudentManagementView';
import { FacultyManagementView } from './components/superadmin/FacultyManagementView';
import { ParentManagementView } from './components/superadmin/ParentManagementView';
import { AcademicManagementView } from './components/superadmin/AcademicManagementView';
import { TimetableAndAttendanceView } from './components/superadmin/TimetableAndAttendanceView';
import { LeavesAndAnnouncementsView } from './components/superadmin/LeavesAndAnnouncementsView';
import { ReportsAndAnalyticsView } from './components/superadmin/ReportsAndAnalyticsView';
import { SystemAndAuditView } from './components/superadmin/SystemAndAuditView';

import {
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_PARENTS,
  INITIAL_DEPARTMENTS,
  INITIAL_COURSES,
  INITIAL_SUBJECTS,
  INITIAL_CLASSES,
  INITIAL_TIMETABLE,
  INITIAL_ATTENDANCE,
  INITIAL_LEAVES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_USERS,
  INITIAL_ROLES,
  INITIAL_AUDIT_LOGS,
  INITIAL_SETTINGS,
} from './data/superadminData';

// Institutional Admin Module Components & Data
import { AdminSidebar } from './components/admin/AdminSidebar';
import { AdminHeader } from './components/admin/AdminHeader';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AdminStudentManagement } from './components/admin/AdminStudentManagement';
import { AdminFacultyManagement } from './components/admin/AdminFacultyManagement';
import { AdminParentManagement } from './components/admin/AdminParentManagement';
import { AdminAcademicManagement } from './components/admin/AdminAcademicManagement';
import { AdminTimetableManagement } from './components/admin/AdminTimetableManagement';
import { AdminAttendanceManagement } from './components/admin/AdminAttendanceManagement';
import { AdminLeavesManagement } from './components/admin/AdminLeavesManagement';
import { AdminAnnouncementsView } from './components/admin/AdminAnnouncementsView';
import { AdminNotificationsView } from './components/admin/AdminNotificationsView';
import { AdminReportsView } from './components/admin/AdminReportsView';
import { AdminAnalyticsView } from './components/admin/AdminAnalyticsView';
import { AdminProfileAndSettings } from './components/admin/AdminProfileAndSettings';
import { AdminGoSourceViewer } from './components/admin/AdminGoSourceViewer';

import {
  INITIAL_ADMIN_STUDENTS,
  INITIAL_ADMIN_FACULTY,
  INITIAL_ADMIN_PARENTS,
  INITIAL_ADMIN_DEPARTMENTS,
  INITIAL_ADMIN_COURSES,
  INITIAL_ADMIN_SUBJECTS,
  INITIAL_ADMIN_CLASSES,
  INITIAL_ADMIN_TIMETABLE,
  INITIAL_ADMIN_ATTENDANCE,
  INITIAL_ADMIN_LEAVES,
  INITIAL_ADMIN_ANNOUNCEMENTS,
  INITIAL_ADMIN_NOTIFICATIONS,
  INITIAL_ADMIN_SETTINGS,
} from './data/adminData';
import { AdminTab } from './types/admin';

// Faculty Module Components & Data
import {
  FacultyTab,
  FacultyLeaveRequest,
  FacultyAttendanceSession,
  FacultyAttendanceRecord,
} from './types/faculty';
import {
  LOGGED_IN_FACULTY_PROFILE,
  INITIAL_FACULTY_SUBJECTS,
  INITIAL_FACULTY_CLASSES,
  INITIAL_FACULTY_STUDENTS,
  INITIAL_FACULTY_TIMETABLE,
  INITIAL_FACULTY_SESSIONS,
  INITIAL_FACULTY_ATTENDANCE_RECORDS,
  INITIAL_ACTIVE_QR_SESSION,
  INITIAL_FACULTY_LEAVES,
  INITIAL_FACULTY_ANNOUNCEMENTS,
  INITIAL_FACULTY_NOTIFICATIONS,
} from './data/facultyData';

import { FacultySidebar } from './components/faculty/FacultySidebar';
import { FacultyHeader } from './components/faculty/FacultyHeader';
import { FacultyDashboardView } from './components/faculty/FacultyDashboardView';
import { FacultyProfileView } from './components/faculty/FacultyProfileView';
import { FacultySubjectsView } from './components/faculty/FacultySubjectsView';
import { FacultyClassesView } from './components/faculty/FacultyClassesView';
import { FacultyMarkAttendanceView } from './components/faculty/FacultyMarkAttendanceView';
import { FacultySmartAttendanceView } from './components/faculty/FacultySmartAttendanceView';
import { FacultyAttendanceHistoryView } from './components/faculty/FacultyAttendanceHistoryView';
import { FacultyStudentsView } from './components/faculty/FacultyStudentsView';
import { FacultyTimetableView } from './components/faculty/FacultyTimetableView';
import { FacultyLeaveView } from './components/faculty/FacultyLeaveView';
import { FacultyAnnouncementsView } from './components/faculty/FacultyAnnouncementsView';
import { FacultyNotificationsView } from './components/faculty/FacultyNotificationsView';
import { FacultyReportsView } from './components/faculty/FacultyReportsView';
import { FacultyAnalyticsView } from './components/faculty/FacultyAnalyticsView';
import { FacultySettingsView } from './components/faculty/FacultySettingsView';
import { FacultyGoSourceViewer } from './components/faculty/FacultyGoSourceViewer';

// Student Module Components & Data
import { StudentTab, StudentLeaveApplication } from './types/student';
import {
  LOGGED_IN_STUDENT_PROFILE,
  INITIAL_STUDENT_SUBJECTS,
  INITIAL_STUDENT_DAILY_RECORDS,
  INITIAL_STUDENT_LEAVES,
  INITIAL_STUDENT_ANNOUNCEMENTS,
  INITIAL_STUDENT_NOTIFICATIONS,
  INITIAL_STUDENT_TIMETABLE,
} from './data/studentData';

import { StudentSidebar } from './components/student/StudentSidebar';
import { StudentHeader } from './components/student/StudentHeader';
import { StudentDashboardView } from './components/student/StudentDashboardView';
import { StudentProfileView } from './components/student/StudentProfileView';
import { StudentAttendanceView } from './components/student/StudentAttendanceView';
import { StudentCalendarView } from './components/student/StudentCalendarView';
import { StudentSubjectsView } from './components/student/StudentSubjectsView';
import { StudentTimetableView } from './components/student/StudentTimetableView';
import { StudentLeaveView } from './components/student/StudentLeaveView';
import { StudentReportsView } from './components/student/StudentReportsView';
import { StudentAnnouncementsView } from './components/student/StudentAnnouncementsView';
import { StudentNotificationsView } from './components/student/StudentNotificationsView';
import { StudentAnalyticsView } from './components/student/StudentAnalyticsView';
import { StudentSettingsView } from './components/student/StudentSettingsView';
import { StudentGoSourceViewer } from './components/student/StudentGoSourceViewer';

// Parent Module Components & Data
import { ParentTab, ChildSummary } from './types/parent';
import {
  LOGGED_IN_PARENT_PROFILE,
  LINKED_CHILDREN,
  INITIAL_PARENT_NOTIFICATIONS,
} from './data/parentData';

import { ParentSidebar } from './components/parent/ParentSidebar';
import { ParentHeader } from './components/parent/ParentHeader';
import { ParentDashboardView } from './components/parent/ParentDashboardView';
import { ParentChildProfileView } from './components/parent/ParentChildProfileView';
import { ParentAttendanceView } from './components/parent/ParentAttendanceView';
import { ParentReportsView } from './components/parent/ParentReportsView';
import { ParentTimetableView } from './components/parent/ParentTimetableView';
import { ParentNotificationsView } from './components/parent/ParentNotificationsView';
import { ParentProfileView } from './components/parent/ParentProfileView';
import { ParentSettingsView } from './components/parent/ParentSettingsView';
import { ParentGoSourceViewer } from './components/parent/ParentGoSourceViewer';

// Reports & Analytics System
import { ReportsHub } from './components/reports/ReportsHub';

// AI Intelligence Module
import { AiHub } from './components/ai/AiHub';

export default function App() {
  // Global Active Role / Mode State
  const [activeTab, setActiveTab] = useState<
    | 'superadmin'
    | 'admin'
    | 'faculty'
    | 'student'
    | 'parent'
    | 'reports_hub'
    | 'ai_module'
    | 'login-superadmin'
    | 'login-admin'
    | 'login-faculty'
    | 'login-student'
    | 'login-parent'
  >('faculty');

  // Active Super Admin View
  const [superAdminView, setSuperAdminView] = useState<string>('dashboard');

  // Active Institutional Admin View
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Academic Sub-Tab State
  const [academicSection, setAcademicSection] = useState<'departments' | 'courses' | 'subjects' | 'classes'>('departments');

  // Timetable/Attendance Mode
  const [timetableMode, setTimetableMode] = useState<'timetable' | 'attendance'>('timetable');

  // Leaves/Announcements Mode
  const [leavesAncMode, setLeavesAncMode] = useState<'leaves' | 'announcements' | 'notifications'>('leaves');

  // Reports/Analytics Mode
  const [reportsAnalyticsMode, setReportsAnalyticsMode] = useState<'reports' | 'analytics'>('reports');

  // System/Audit Section
  const [systemAuditSection, setSystemAuditSection] = useState<
    'users' | 'roles' | 'permissions' | 'settings' | 'backup' | 'audit_logs' | 'profile'
  >('users');

  // Sidebar collapse states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [adminSidebarCollapsed, setAdminSidebarCollapsed] = useState(false);

  // Central State for Super Admin
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [faculty, setFaculty] = useState(INITIAL_FACULTY);
  const [parents, setParents] = useState(INITIAL_PARENTS);
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [attendanceRecords, setAttendanceRecords] = useState(INITIAL_ATTENDANCE);
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [auditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  // Central State for Institutional Admin
  const [adminStudents, setAdminStudents] = useState(INITIAL_ADMIN_STUDENTS);
  const [adminFaculty, setAdminFaculty] = useState(INITIAL_ADMIN_FACULTY);
  const [adminParents, setAdminParents] = useState(INITIAL_ADMIN_PARENTS);
  const [adminDepartments, setAdminDepartments] = useState(INITIAL_ADMIN_DEPARTMENTS);
  const [adminCourses, setAdminCourses] = useState(INITIAL_ADMIN_COURSES);
  const [adminSubjects, setAdminSubjects] = useState(INITIAL_ADMIN_SUBJECTS);
  const [adminClasses, setAdminClasses] = useState(INITIAL_ADMIN_CLASSES);
  const [adminTimetable, setAdminTimetable] = useState(INITIAL_ADMIN_TIMETABLE);
  const [adminAttendance, setAdminAttendance] = useState(INITIAL_ADMIN_ATTENDANCE);
  const [adminLeaves, setAdminLeaves] = useState(INITIAL_ADMIN_LEAVES);
  const [adminAnnouncements, setAdminAnnouncements] = useState(INITIAL_ADMIN_ANNOUNCEMENTS);
  const [adminNotifications, setAdminNotifications] = useState(INITIAL_ADMIN_NOTIFICATIONS);
  const [adminSettings, setAdminSettings] = useState(INITIAL_ADMIN_SETTINGS);

  // Central State for Faculty Module
  const [facultyTab, setFacultyTab] = useState<FacultyTab>('dashboard');
  const [facultySidebarCollapsed, setFacultySidebarCollapsed] = useState(false);
  const [facultyProfile, setFacultyProfile] = useState(LOGGED_IN_FACULTY_PROFILE);
  const [facultySubjects, setFacultySubjects] = useState(INITIAL_FACULTY_SUBJECTS);
  const [facultyClasses, setFacultyClasses] = useState(INITIAL_FACULTY_CLASSES);
  const [facultyStudents, setFacultyStudents] = useState(INITIAL_FACULTY_STUDENTS);
  const [facultyTimetable, setFacultyTimetable] = useState(INITIAL_FACULTY_TIMETABLE);
  const [facultySessions, setFacultySessions] = useState(INITIAL_FACULTY_SESSIONS);
  const [facultyAttendanceRecords, setFacultyAttendanceRecords] = useState(INITIAL_FACULTY_ATTENDANCE_RECORDS);
  const [activeQRSession, setActiveQRSession] = useState(INITIAL_ACTIVE_QR_SESSION);
  const [facultyLeaves, setFacultyLeaves] = useState(INITIAL_FACULTY_LEAVES);
  const [facultyAnnouncements, setFacultyAnnouncements] = useState(INITIAL_FACULTY_ANNOUNCEMENTS);
  const [facultyNotifications, setFacultyNotifications] = useState(INITIAL_FACULTY_NOTIFICATIONS);
  const [facultySearchQuery, setFacultySearchQuery] = useState('');

  // Central State for Student Module
  const [studentTab, setStudentTab] = useState<StudentTab>('dashboard');
  const [studentSidebarCollapsed, setStudentSidebarCollapsed] = useState(false);
  const [studentProfile, setStudentProfile] = useState(LOGGED_IN_STUDENT_PROFILE);
  const [studentSubjects, setStudentSubjects] = useState(INITIAL_STUDENT_SUBJECTS);
  const [studentDailyRecords, setStudentDailyRecords] = useState(INITIAL_STUDENT_DAILY_RECORDS);
  const [studentLeaves, setStudentLeaves] = useState(INITIAL_STUDENT_LEAVES);
  const [studentAnnouncements, setStudentAnnouncements] = useState(INITIAL_STUDENT_ANNOUNCEMENTS);
  const [studentNotifications, setStudentNotifications] = useState(INITIAL_STUDENT_NOTIFICATIONS);
  const [studentTimetable, setStudentTimetable] = useState(INITIAL_STUDENT_TIMETABLE);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');

  // Central State for Parent Module
  const [parentTab, setParentTab] = useState<ParentTab>('dashboard');
  const [parentSidebarCollapsed, setParentSidebarCollapsed] = useState(false);
  const [parentProfile, setParentProfile] = useState(LOGGED_IN_PARENT_PROFILE);
  const [parentChildren, setParentChildren] = useState(LINKED_CHILDREN);
  const [selectedChild, setSelectedChild] = useState<ChildSummary>(LINKED_CHILDREN[0]);
  const [parentNotifications, setParentNotifications] = useState(INITIAL_PARENT_NOTIFICATIONS);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSimulatedLogin = (roleName: string) => {
    if (!loginEmail || !loginPassword) {
      triggerToast('Please provide valid login credentials.');
      return;
    }
    triggerToast(`Authenticated successfully as ${roleName}! Launching Dashboard...`);
    setTimeout(() => {
      if (roleName === 'SUPERADMIN') setActiveTab('superadmin');
      else if (roleName === 'ADMIN') setActiveTab('admin');
      else if (roleName === 'FACULTY') setActiveTab('faculty');
      else if (roleName === 'STUDENT') setActiveTab('student');
      else if (roleName === 'PARENT') setActiveTab('parent');
      else setActiveTab('faculty');
    }, 600);
  };

  const handleSaveFacultySession = (
    session: FacultyAttendanceSession,
    records: FacultyAttendanceRecord[]
  ) => {
    setFacultySessions((prev) => [session, ...prev]);
    setFacultyAttendanceRecords((prev) => [...records, ...prev]);
    triggerToast('Attendance session submitted and saved.');
  };

  const handleDeleteFacultySession = (sessionId: string) => {
    setFacultySessions((prev) => prev.filter((s) => s.id !== sessionId));
    setFacultyAttendanceRecords((prev) => prev.filter((r) => r.sessionId !== sessionId));
    triggerToast('Attendance session deleted.');
  };

  const handleApplyFacultyLeave = (leave: FacultyLeaveRequest) => {
    setFacultyLeaves((prev) => [leave, ...prev]);
    triggerToast('Leave application submitted for admin review.');
  };

  const handleCancelFacultyLeave = (leaveId: string) => {
    setFacultyLeaves((prev) => prev.filter((l) => l.id !== leaveId));
    triggerToast('Leave application cancelled.');
  };

  const handleGenerateNewQR = (classId: string, subjectId: string) => {
    const cls = facultyClasses.find((c) => c.id === classId) || facultyClasses[0];
    const sub = facultySubjects.find((s) => s.id === subjectId) || facultySubjects[0];

    setActiveQRSession({
      sessionId: `qr-sess-${Date.now()}`,
      classId: cls.id,
      className: cls.name,
      subjectId: sub.id,
      subjectName: sub.name,
      qrCodeToken: `APEX-QR-${Math.floor(100000 + Math.random() * 900000)}-VERIFIED`,
      expiresInSeconds: 180,
      generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      gpsRequired: true,
      gpsLatitude: 37.7749,
      gpsLongitude: -122.4194,
      maxRadiusMeters: 50,
      scannedCount: 0,
      totalStudents: cls.studentCount,
      isActive: true,
    });
    triggerToast(`New encrypted QR session launched for ${sub.name}!`);
  };

  const handleApproveAdminLeave = (id: string) => {
    setAdminLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Approved' as const } : l))
    );
    triggerToast('Leave application approved.');
  };

  const handleRejectAdminLeave = (id: string) => {
    setAdminLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Rejected' as const } : l))
    );
    triggerToast('Leave application rejected.');
  };

  return (
    <div className="min-h-screen font-sans antialiased text-slate-100 bg-slate-950">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-extrabold text-xs shadow-2xl flex items-center gap-3 border border-cyan-300/30">
            <Sparkles className="h-4 w-4 text-slate-950" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* INSTITUTIONAL ADMIN MODULE */}
      {activeTab === 'admin' && (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
          <AdminSidebar
            activeTab={adminTab}
            setActiveTab={setAdminTab}
            collapsed={adminSidebarCollapsed}
            setCollapsed={setAdminSidebarCollapsed}
            pendingLeavesCount={adminLeaves.filter((l) => l.status === 'Pending').length}
            unreadNotificationsCount={adminNotifications.filter((n) => !n.read).length}
            institutionName={adminSettings.institutionName}
            onLogout={() => setActiveTab('login-admin')}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <AdminHeader
              activeTitle={adminTab.replace('_', ' ').toUpperCase()}
              institutionName={adminSettings.institutionName}
              onLogout={() => setActiveTab('login-admin')}
              onSwitchRole={(role) => setActiveTab(role)}
            />

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {adminTab === 'dashboard' && (
                <AdminDashboardView
                  students={adminStudents}
                  faculty={adminFaculty}
                  parentsCount={adminParents.length}
                  departments={adminDepartments}
                  coursesCount={adminCourses.length}
                  subjectsCount={adminSubjects.length}
                  classesCount={adminClasses.length}
                  attendanceRecords={adminAttendance}
                  leaves={adminLeaves}
                  announcements={adminAnnouncements}
                  onNavigateTab={(tab) => setAdminTab(tab)}
                  onApproveLeave={handleApproveAdminLeave}
                  onRejectLeave={handleRejectAdminLeave}
                />
              )}

              {adminTab === 'students' && (
                <AdminStudentManagement
                  students={adminStudents}
                  setStudents={setAdminStudents}
                  departments={adminDepartments}
                  courses={adminCourses}
                />
              )}

              {adminTab === 'faculty' && (
                <AdminFacultyManagement
                  faculty={adminFaculty}
                  setFaculty={setAdminFaculty}
                  departments={adminDepartments}
                  subjects={adminSubjects}
                />
              )}

              {adminTab === 'parents' && (
                <AdminParentManagement
                  parents={adminParents}
                  setParents={setAdminParents}
                  students={adminStudents}
                />
              )}

              {(adminTab === 'departments' ||
                adminTab === 'courses' ||
                adminTab === 'subjects' ||
                adminTab === 'classes') && (
                <AdminAcademicManagement
                  initialSubTab={adminTab as any}
                  departments={adminDepartments}
                  setDepartments={setAdminDepartments}
                  courses={adminCourses}
                  setCourses={setAdminCourses}
                  subjects={adminSubjects}
                  setSubjects={setAdminSubjects}
                  classes={adminClasses}
                  setClasses={setAdminClasses}
                  faculty={adminFaculty}
                />
              )}

              {adminTab === 'timetable' && (
                <AdminTimetableManagement
                  timetable={adminTimetable}
                  setTimetable={setAdminTimetable}
                  faculty={adminFaculty}
                  subjects={adminSubjects}
                  classes={adminClasses}
                />
              )}

              {adminTab === 'attendance' && (
                <AdminAttendanceManagement
                  attendanceRecords={adminAttendance}
                  setAttendanceRecords={setAdminAttendance}
                  students={adminStudents}
                  subjects={adminSubjects}
                  classes={adminClasses}
                />
              )}

              {adminTab === 'leaves' && (
                <AdminLeavesManagement
                  leaves={adminLeaves}
                  setLeaves={setAdminLeaves}
                  onApproveLeave={handleApproveAdminLeave}
                  onRejectLeave={handleRejectAdminLeave}
                />
              )}

              {adminTab === 'announcements' && (
                <AdminAnnouncementsView
                  announcements={adminAnnouncements}
                  setAnnouncements={setAdminAnnouncements}
                />
              )}

              {adminTab === 'notifications' && (
                <AdminNotificationsView
                  notifications={adminNotifications}
                  setNotifications={setAdminNotifications}
                  students={adminStudents}
                />
              )}

              {adminTab === 'reports' && (
                <AdminReportsView
                  students={adminStudents}
                  departments={adminDepartments}
                />
              )}

              {adminTab === 'analytics' && <AdminAnalyticsView />}

              {(adminTab === 'profile' || adminTab === 'settings') && (
                <AdminProfileAndSettings
                  settings={adminSettings}
                  setSettings={setAdminSettings}
                />
              )}

              {adminTab === 'backend_code' && <AdminGoSourceViewer />}
            </div>
          </div>
        </div>
      )}

      {/* SUPER ADMIN MASTER MODULE */}
      {activeTab === 'superadmin' && (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
          <SuperAdminSidebar
            activeView={superAdminView}
            setActiveView={(view) => {
              setSuperAdminView(view);
              if (view === 'departments') setAcademicSection('departments');
              if (view === 'courses') setAcademicSection('courses');
              if (view === 'subjects') setAcademicSection('subjects');
              if (view === 'classes') setAcademicSection('classes');
              if (view === 'timetable') setTimetableMode('timetable');
              if (view === 'attendance') setTimetableMode('attendance');
              if (view === 'leaves') setLeavesAncMode('leaves');
              if (view === 'announcements') setLeavesAncMode('announcements');
              if (view === 'notifications') setLeavesAncMode('notifications');
              if (view === 'reports') setReportsAnalyticsMode('reports');
              if (view === 'analytics') setReportsAnalyticsMode('analytics');
              if (view === 'users') setSystemAuditSection('users');
              if (view === 'roles') setSystemAuditSection('roles');
              if (view === 'audit_logs') setSystemAuditSection('audit_logs');
              if (view === 'backup') setSystemAuditSection('backup');
              if (view === 'settings') setSystemAuditSection('settings');
              if (view === 'profile') setSystemAuditSection('profile');
            }}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <SuperAdminHeader
              activeViewTitle={
                superAdminView === 'dashboard'
                  ? 'Overview Dashboard'
                  : superAdminView.replace('_', ' ').toUpperCase()
              }
              settings={settings}
              unreadNotifications={3}
              onLogout={() => setActiveTab('login-superadmin')}
            />

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {superAdminView === 'dashboard' && (
                <SuperAdminDashboardView
                  studentsCount={students.length}
                  facultyCount={faculty.length}
                  parentsCount={parents.length}
                  departmentsCount={departments.length}
                  coursesCount={courses.length}
                  subjectsCount={subjects.length}
                  classesCount={classes.length}
                  pendingLeavesCount={leaves.filter((l) => l.status === 'Pending').length}
                  announcementsCount={announcements.length}
                  todayAttendancePct={95.8}
                  systemLogsCount={auditLogs.length}
                />
              )}

              {superAdminView === 'students' && (
                <StudentManagementView
                  students={students}
                  setStudents={setStudents}
                  departments={departments}
                  courses={courses}
                />
              )}

              {superAdminView === 'faculty' && (
                <FacultyManagementView
                  faculty={faculty}
                  setFaculty={setFaculty}
                  departments={departments}
                  subjects={subjects}
                />
              )}

              {superAdminView === 'parents' && (
                <ParentManagementView
                  parents={parents}
                  setParents={setParents}
                  students={students}
                />
              )}

              {(superAdminView === 'departments' ||
                superAdminView === 'courses' ||
                superAdminView === 'subjects' ||
                superAdminView === 'classes') && (
                <AcademicManagementView
                  activeSection={academicSection}
                  setActiveSection={setAcademicSection}
                  departments={departments}
                  setDepartments={setDepartments}
                  courses={courses}
                  setCourses={setCourses}
                  subjects={subjects}
                  setSubjects={setSubjects}
                  classes={classes}
                  setClasses={setClasses}
                  facultyList={faculty}
                />
              )}

              {(superAdminView === 'timetable' || superAdminView === 'attendance') && (
                <TimetableAndAttendanceView
                  viewMode={timetableMode}
                  setViewMode={setTimetableMode}
                  timetable={timetable}
                  setTimetable={setTimetable}
                  attendanceRecords={attendanceRecords}
                  setAttendanceRecords={setAttendanceRecords}
                  departments={departments}
                  subjects={subjects}
                  facultyList={faculty}
                />
              )}

              {(superAdminView === 'leaves' ||
                superAdminView === 'announcements' ||
                superAdminView === 'notifications') && (
                <LeavesAndAnnouncementsView
                  tabMode={leavesAncMode}
                  setTabMode={setLeavesAncMode}
                  leaves={leaves}
                  setLeaves={setLeaves}
                  announcements={announcements}
                  setAnnouncements={setAnnouncements}
                  departments={departments}
                />
              )}

              {(superAdminView === 'reports' || superAdminView === 'analytics') && (
                <ReportsAndAnalyticsView
                  mode={reportsAnalyticsMode}
                  setMode={setReportsAnalyticsMode}
                  departments={departments}
                  students={students}
                />
              )}

              {(superAdminView === 'users' ||
                superAdminView === 'roles' ||
                superAdminView === 'audit_logs' ||
                superAdminView === 'backup' ||
                superAdminView === 'settings' ||
                superAdminView === 'profile') && (
                <SystemAndAuditView
                  activeSection={systemAuditSection}
                  setActiveSection={setSystemAuditSection}
                  users={users}
                  setUsers={setUsers}
                  roles={roles}
                  setRoles={setRoles}
                  auditLogs={auditLogs}
                  settings={settings}
                  setSettings={setSettings}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* FACULTY ROLE MODULE */}
      {activeTab === 'faculty' && (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
          <FacultySidebar
            activeTab={facultyTab}
            setActiveTab={setFacultyTab}
            collapsed={facultySidebarCollapsed}
            setCollapsed={setFacultySidebarCollapsed}
            pendingLeavesCount={facultyLeaves.filter((l) => l.status === 'Pending').length}
            unreadNotificationsCount={facultyNotifications.filter((n) => !n.read).length}
            facultyName={facultyProfile.name}
            departmentName={facultyProfile.departmentName}
            onLogout={() => setActiveTab('login-faculty')}
          />

          <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
            <FacultyHeader
              profile={facultyProfile}
              title={
                facultyTab === 'dashboard'
                  ? 'Faculty Dashboard'
                  : facultyTab === 'classes'
                  ? 'My Assigned Classes'
                  : facultyTab === 'subjects'
                  ? 'My Assigned Subjects'
                  : facultyTab === 'mark_attendance'
                  ? 'Mark Attendance'
                  : facultyTab === 'qr_attendance'
                  ? 'Smart QR Attendance'
                  : facultyTab === 'attendance_history'
                  ? 'Attendance Audit History'
                  : facultyTab === 'students'
                  ? 'Student Roster Directory'
                  : facultyTab === 'timetable'
                  ? 'Faculty Timetable'
                  : facultyTab === 'leaves'
                  ? 'Faculty Leave Management'
                  : facultyTab === 'announcements'
                  ? 'Department Announcements'
                  : facultyTab === 'notifications'
                  ? 'Notifications & Alerts'
                  : facultyTab === 'reports'
                  ? 'Attendance Reports'
                  : facultyTab === 'analytics'
                  ? 'Analytics & Trends'
                  : facultyTab === 'profile'
                  ? 'My Profile'
                  : facultyTab === 'settings'
                  ? 'System Preferences'
                  : 'Go API Source Code'
              }
              subtitle="Smart Attendance System • Faculty Workspace"
              notifications={facultyNotifications}
              onOpenQR={() => setFacultyTab('qr_attendance')}
              onRoleSwitch={(role) => setActiveTab(role)}
              onLogout={() => setActiveTab('login-faculty')}
              searchQuery={facultySearchQuery}
              setSearchQuery={setFacultySearchQuery}
            />

            <main className="flex-1 pb-12">
              {facultyTab === 'dashboard' && (
                <FacultyDashboardView
                  profile={facultyProfile}
                  classes={facultyClasses}
                  subjects={facultySubjects}
                  todayTimetable={facultyTimetable}
                  recentSessions={facultySessions}
                  pendingLeaves={facultyLeaves}
                  announcements={facultyAnnouncements}
                  notifications={facultyNotifications}
                  onNavigate={setFacultyTab}
                  onOpenQR={() => setFacultyTab('qr_attendance')}
                />
              )}

              {facultyTab === 'profile' && (
                <FacultyProfileView
                  profile={facultyProfile}
                  subjects={facultySubjects}
                  classes={facultyClasses}
                  onUpdateProfile={(updated) =>
                    setFacultyProfile((prev) => ({ ...prev, ...updated }))
                  }
                />
              )}

              {facultyTab === 'subjects' && (
                <FacultySubjectsView
                  subjects={facultySubjects}
                  onMarkAttendanceForSubject={(subId) => setFacultyTab('mark_attendance')}
                />
              )}

              {facultyTab === 'classes' && (
                <FacultyClassesView
                  classes={facultyClasses}
                  students={facultyStudents}
                  onMarkAttendanceForClass={(clsId) => setFacultyTab('mark_attendance')}
                />
              )}

              {facultyTab === 'mark_attendance' && (
                <FacultyMarkAttendanceView
                  subjects={facultySubjects}
                  classes={facultyClasses}
                  students={facultyStudents}
                  recentSessions={facultySessions}
                  onSaveSession={handleSaveFacultySession}
                  onDeleteSession={handleDeleteFacultySession}
                />
              )}

              {facultyTab === 'qr_attendance' && (
                <FacultySmartAttendanceView
                  activeQRSession={activeQRSession}
                  classes={facultyClasses}
                  subjects={facultySubjects}
                  onGenerateNewQR={handleGenerateNewQR}
                />
              )}

              {facultyTab === 'attendance_history' && (
                <FacultyAttendanceHistoryView
                  sessions={facultySessions}
                  classes={facultyClasses}
                  subjects={facultySubjects}
                  attendanceRecords={facultyAttendanceRecords}
                  onDeleteSession={handleDeleteFacultySession}
                />
              )}

              {facultyTab === 'students' && (
                <FacultyStudentsView students={facultyStudents} classes={facultyClasses} />
              )}

              {facultyTab === 'timetable' && (
                <FacultyTimetableView timetableSlots={facultyTimetable} />
              )}

              {facultyTab === 'leaves' && (
                <FacultyLeaveView
                  leaves={facultyLeaves}
                  onApplyLeave={handleApplyFacultyLeave}
                  onCancelLeave={handleCancelFacultyLeave}
                />
              )}

              {facultyTab === 'announcements' && (
                <FacultyAnnouncementsView announcements={facultyAnnouncements} />
              )}

              {facultyTab === 'notifications' && (
                <FacultyNotificationsView
                  notifications={facultyNotifications}
                  onMarkAllAsRead={() =>
                    setFacultyNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                  }
                />
              )}

              {facultyTab === 'reports' && (
                <FacultyReportsView classes={facultyClasses} subjects={facultySubjects} />
              )}

              {facultyTab === 'analytics' && <FacultyAnalyticsView />}

              {facultyTab === 'settings' && <FacultySettingsView />}

              {facultyTab === 'backend_code' && <FacultyGoSourceViewer />}
            </main>
          </div>
        </div>
      )}

      {/* STUDENT WORKSPACE */}
      {activeTab === 'student' && (
        <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
          <StudentSidebar
            activeTab={studentTab}
            setActiveTab={setStudentTab}
            collapsed={studentSidebarCollapsed}
            setCollapsed={setStudentSidebarCollapsed}
            pendingLeavesCount={studentLeaves.filter((l) => l.status === 'Pending').length}
            unreadNotificationsCount={studentNotifications.filter((n) => !n.read).length}
            studentName={studentProfile.fullName}
            rollNumber={studentProfile.rollNumber}
            onLogout={() => setActiveTab('login-student')}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
            <StudentHeader
              profile={studentProfile}
              title={
                studentTab === 'dashboard'
                  ? 'Student Portal'
                  : studentTab === 'attendance'
                  ? 'My Attendance Audit'
                  : studentTab === 'calendar'
                  ? 'Attendance Calendar'
                  : studentTab === 'subjects'
                  ? 'Registered Subjects'
                  : studentTab === 'timetable'
                  ? 'Class Timetable'
                  : studentTab === 'leave'
                  ? 'Leave Applications'
                  : studentTab === 'reports'
                  ? 'Attendance Reports'
                  : studentTab === 'announcements'
                  ? 'Broadcasts & Notices'
                  : studentTab === 'notifications'
                  ? 'Alerts & Notifications'
                  : studentTab === 'analytics'
                  ? 'Attendance Analytics'
                  : studentTab === 'profile'
                  ? 'Student Profile'
                  : studentTab === 'settings'
                  ? 'Preferences'
                  : 'Go API Source Code'
              }
              subtitle="Smart Attendance System • Student Workspace"
              notifications={studentNotifications}
              onRoleSwitch={(role) => setActiveTab(role as any)}
              onLogout={() => setActiveTab('login-student')}
              searchQuery={studentSearchQuery}
              setSearchQuery={setStudentSearchQuery}
            />

            <main className="flex-1 pb-12">
              {studentTab === 'dashboard' && (
                <StudentDashboardView
                  profile={studentProfile}
                  subjects={studentSubjects}
                  dailyRecords={studentDailyRecords}
                  announcements={studentAnnouncements}
                  notifications={studentNotifications}
                  timetable={studentTimetable}
                  onNavigate={setStudentTab}
                />
              )}

              {studentTab === 'profile' && (
                <StudentProfileView
                  profile={studentProfile}
                  onUpdateProfile={(updated) =>
                    setStudentProfile((prev) => ({ ...prev, ...updated }))
                  }
                />
              )}

              {studentTab === 'attendance' && (
                <StudentAttendanceView
                  subjects={studentSubjects}
                  dailyRecords={studentDailyRecords}
                />
              )}

              {studentTab === 'calendar' && <StudentCalendarView />}

              {studentTab === 'subjects' && <StudentSubjectsView subjects={studentSubjects} />}

              {studentTab === 'timetable' && <StudentTimetableView timetable={studentTimetable} />}

              {studentTab === 'leave' && (
                <StudentLeaveView
                  leaves={studentLeaves}
                  onApplyLeave={(newLeave) => {
                    const created: StudentLeaveApplication = {
                      ...newLeave,
                      id: `lve-std-${Date.now()}`,
                      status: 'Pending',
                      appliedOn: new Date().toISOString().split('T')[0],
                    };
                    setStudentLeaves((prev) => [created, ...prev]);
                    triggerToast('Leave application submitted successfully.');
                  }}
                />
              )}

              {studentTab === 'reports' && (
                <StudentReportsView subjects={studentSubjects} dailyRecords={studentDailyRecords} />
              )}

              {studentTab === 'announcements' && (
                <StudentAnnouncementsView announcements={studentAnnouncements} />
              )}

              {studentTab === 'notifications' && (
                <StudentNotificationsView
                  notifications={studentNotifications}
                  onMarkAllRead={() =>
                    setStudentNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                  }
                />
              )}

              {studentTab === 'analytics' && <StudentAnalyticsView subjects={studentSubjects} />}

              {studentTab === 'settings' && <StudentSettingsView />}

              {studentTab === 'backend_code' && <StudentGoSourceViewer />}
            </main>
          </div>
        </div>
      )}

      {/* PARENT WORKSPACE */}
      {activeTab === 'parent' && (
        <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
          <ParentSidebar
            activeTab={parentTab}
            setActiveTab={setParentTab}
            collapsed={parentSidebarCollapsed}
            setCollapsed={setParentSidebarCollapsed}
            unreadNotificationsCount={parentNotifications.filter((n) => !n.read).length}
            parentName={parentProfile.parentName}
            onLogout={() => setActiveTab('login-parent')}
          />

          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
            <ParentHeader
              profile={parentProfile}
              childrenList={parentChildren}
              selectedChild={selectedChild}
              onSelectChild={setSelectedChild}
              title={
                parentTab === 'dashboard'
                  ? 'Parent Portal'
                  : parentTab === 'child_profile'
                  ? 'Child Profile'
                  : parentTab === 'attendance'
                  ? 'Attendance Log'
                  : parentTab === 'reports'
                  ? 'Official Statement'
                  : parentTab === 'timetable'
                  ? 'Class Timetable'
                  : parentTab === 'notifications'
                  ? 'Guardian Alerts'
                  : parentTab === 'profile'
                  ? 'Parent Profile'
                  : parentTab === 'settings'
                  ? 'Alert Settings'
                  : 'Go API Source Code'
              }
              subtitle="Smart Attendance System • Guardian Monitoring Portal"
              notifications={parentNotifications}
              onRoleSwitch={(role) => setActiveTab(role as any)}
              onLogout={() => setActiveTab('login-parent')}
            />

            <main className="flex-1 pb-12">
              {parentTab === 'dashboard' && (
                <ParentDashboardView
                  profile={parentProfile}
                  child={selectedChild}
                  subjects={studentSubjects}
                  onNavigate={setParentTab}
                />
              )}

              {parentTab === 'child_profile' && <ParentChildProfileView child={selectedChild} />}

              {parentTab === 'attendance' && (
                <ParentAttendanceView
                  childName={selectedChild.fullName}
                  subjects={studentSubjects}
                  dailyRecords={studentDailyRecords}
                />
              )}

              {parentTab === 'reports' && (
                <ParentReportsView
                  childName={selectedChild.fullName}
                  subjects={studentSubjects}
                />
              )}

              {parentTab === 'timetable' && (
                <ParentTimetableView
                  childName={selectedChild.fullName}
                  timetable={studentTimetable}
                />
              )}

              {parentTab === 'notifications' && (
                <ParentNotificationsView
                  notifications={parentNotifications}
                  onMarkAllRead={() =>
                    setParentNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
                  }
                />
              )}

              {parentTab === 'profile' && (
                <ParentProfileView
                  profile={parentProfile}
                  onUpdateProfile={(updated) =>
                    setParentProfile((prev) => ({ ...prev, ...updated }))
                  }
                />
              )}

              {parentTab === 'settings' && <ParentSettingsView />}

              {parentTab === 'backend_code' && <ParentGoSourceViewer />}
            </main>
          </div>
        </div>
      )}

      {/* REPORTS & ANALYTICS INTELLIGENCE HUB */}
      {activeTab === 'reports_hub' && (
        <ReportsHub
          onRoleChange={(role) => {
            if (role === 'superadmin' || role === 'admin' || role === 'faculty' || role === 'student' || role === 'parent' || role === 'ai_module') {
              setActiveTab(role as any);
            }
          }}
        />
      )}

      {/* AI INTELLIGENCE MODULE */}
      {activeTab === 'ai_module' && (
        <AiHub onBackToApp={() => setActiveTab('superadmin')} />
      )}

      {/* LOGIN SUITE */}
      {activeTab.startsWith('login-') && (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
          <div className="w-full max-w-md p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-3xl shadow-2xl space-y-6 relative z-10">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-extrabold uppercase border border-cyan-500/20">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>
                  {activeTab === 'login-superadmin'
                    ? 'Super Admin Portal'
                    : activeTab === 'login-admin'
                    ? 'Admin Portal'
                    : activeTab === 'login-faculty'
                    ? 'Faculty Portal'
                    : activeTab === 'login-student'
                    ? 'Student Portal'
                    : 'Parent Portal'}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white">Smart Attendance System</h1>
              <p className="text-xs text-slate-400">Enter institutional credentials to authenticate.</p>
            </div>

            <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-slate-950/80 border border-white/5 text-[10px] font-bold">
              <button
                onClick={() => setActiveTab('login-superadmin')}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login-superadmin' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400'
                }`}
              >
                S.Admin
              </button>
              <button
                onClick={() => setActiveTab('login-admin')}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login-admin' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveTab('login-faculty')}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login-faculty' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400'
                }`}
              >
                Faculty
              </button>
              <button
                onClick={() => setActiveTab('login-student')}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login-student' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => setActiveTab('login-parent')}
                className={`py-2 rounded-xl transition ${
                  activeTab === 'login-parent' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400'
                }`}
              >
                Parent
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSimulatedLogin(activeTab.replace('login-', '').toUpperCase());
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="text-slate-300 font-bold block mb-1">Institutional Email / Roll ID</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="admin@apex.edu"
                    className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full py-2.5 pl-10 pr-10 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <span>Authenticate & Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
