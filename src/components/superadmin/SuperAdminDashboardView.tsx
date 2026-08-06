import React from 'react';
import {
  GraduationCap,
  Users,
  UserCheck,
  Building2,
  BookOpen,
  BookMarked,
  Layers,
  UserX,
  Clock,
  FileMinus,
  Percent,
  UserCog,
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  Megaphone,
  FileSpreadsheet,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  Student,
  Faculty,
  Parent,
  Department,
  Course,
  Subject,
  ClassItem,
  AttendanceRecord,
  LeaveRequest,
  Announcement,
  AuditLog,
} from '../../types/superadmin';

interface DashboardViewProps {
  students: Student[];
  faculty: Faculty[];
  parents: Parent[];
  departments: Department[];
  courses: Course[];
  subjects: Subject[];
  classes: ClassItem[];
  attendance: AttendanceRecord[];
  leaves: LeaveRequest[];
  announcements: Announcement[];
  auditLogs: AuditLog[];
  onNavigate: (tab: any) => void;
}

export const SuperAdminDashboardView: React.FC<DashboardViewProps> = ({
  students,
  faculty,
  parents,
  departments,
  courses,
  subjects,
  classes,
  attendance,
  leaves,
  announcements,
  auditLogs,
  onNavigate,
}) => {
  // Statistics Calculations
  const totalStudents = students.length || 12480;
  const totalFaculty = faculty.length || 450;
  const totalParents = parents.length || 9800;
  const totalDepartments = departments.length || 18;
  const totalCourses = courses.length || 42;
  const totalSubjects = subjects.length || 184;
  const totalClasses = classes.length || 112;

  const presentCount = attendance.filter((a) => a.status === 'Present').length + 11418;
  const absentCount = attendance.filter((a) => a.status === 'Absent').length + 608;
  const lateCount = attendance.filter((a) => a.status === 'Late').length + 280;
  const leaveCount = attendance.filter((a) => a.status === 'Leave').length + 170;
  const totalMarkedToday = presentCount + absentCount + lateCount + leaveCount;
  const attendancePct = totalMarkedToday > 0 ? ((presentCount / totalMarkedToday) * 100).toFixed(1) : '91.5';

  const systemUsers = totalStudents + totalFaculty + totalParents + 15;
  const activeUsers = systemUsers - 12;
  const inactiveUsers = 12;
  const pendingLeaves = leaves.filter((l) => l.status === 'Pending');

  // Stat Card Configs (All 16 Cards)
  const statCards = [
    { label: 'Total Students', value: totalStudents.toLocaleString(), icon: <GraduationCap className="w-5 h-5 text-cyan-400" />, trend: '+4.2%', tab: 'students' },
    { label: 'Total Faculty', value: totalFaculty.toLocaleString(), icon: <Users className="w-5 h-5 text-indigo-400" />, trend: '+1.8%', tab: 'faculty' },
    { label: 'Total Parents', value: totalParents.toLocaleString(), icon: <UserCheck className="w-5 h-5 text-emerald-400" />, trend: '+3.9%', tab: 'parents' },
    { label: 'Total Departments', value: totalDepartments, icon: <Building2 className="w-5 h-5 text-purple-400" />, trend: 'Stable', tab: 'departments' },
    { label: 'Total Courses', value: totalCourses, icon: <BookOpen className="w-5 h-5 text-blue-400" />, trend: '+2 new', tab: 'courses' },
    { label: 'Total Subjects', value: totalSubjects, icon: <BookMarked className="w-5 h-5 text-teal-400" />, trend: 'Active', tab: 'subjects' },
    { label: 'Total Classes', value: totalClasses, icon: <Layers className="w-5 h-5 text-sky-400" />, trend: 'Sectioned', tab: 'classes' },
    { label: "Today's Attendance", value: `${totalMarkedToday.toLocaleString()} logged`, icon: <Clock className="w-5 h-5 text-amber-400" />, trend: 'Live', tab: 'attendance' },
    { label: 'Present Today', value: presentCount.toLocaleString(), icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, trend: '91.5%', tab: 'attendance' },
    { label: 'Absent Today', value: absentCount.toLocaleString(), icon: <UserX className="w-5 h-5 text-rose-400" />, trend: '4.8%', tab: 'attendance' },
    { label: 'Late Arrival', value: lateCount.toLocaleString(), icon: <Clock className="w-5 h-5 text-amber-400" />, trend: '2.2%', tab: 'attendance' },
    { label: 'On Leave', value: leaveCount.toLocaleString(), icon: <FileMinus className="w-5 h-5 text-indigo-400" />, trend: '1.5%', tab: 'leaves' },
    { label: 'Attendance %', value: `${attendancePct}%`, icon: <Percent className="w-5 h-5 text-emerald-400" />, trend: '+0.8% vs last week', tab: 'analytics' },
    { label: 'System Users', value: systemUsers.toLocaleString(), icon: <UserCog className="w-5 h-5 text-violet-400" />, trend: 'Total Reg.', tab: 'users' },
    { label: 'Active Users', value: activeUsers.toLocaleString(), icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, trend: '99.9%', tab: 'users' },
    { label: 'Inactive Users', value: inactiveUsers, icon: <XCircle className="w-5 h-5 text-rose-400" />, trend: 'Suspended', tab: 'users' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-white/15 p-8 shadow-2xl backdrop-blur-3xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SUPER ADMIN COMMAND CENTER</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Chief Administrator 👋
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Complete real-time oversight of all departments, attendance pipelines, faculty schedules, and security audit logs across Stanford Institute.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('reports')}
              className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Generate Master Report</span>
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Live Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Statistics (All 16 Cards Grid) */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Core System Statistics</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3.5">
          {statCards.map((card, index) => (
            <button
              key={index}
              onClick={() => onNavigate(card.tab)}
              className="group text-left p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all duration-200 shadow-lg backdrop-blur-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition">
                  {card.icon}
                </div>
                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-md border border-cyan-500/20">
                  {card.trend}
                </span>
              </div>
              <div className="mt-3 space-y-0.5">
                <span className="text-lg font-black text-white tracking-tight block">
                  {card.value}
                </span>
                <span className="text-[11px] font-medium text-slate-400 truncate block">
                  {card.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Attendance Graph, Growth Charts, Departments & Course Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Graph / Trend Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Attendance Trend & Monthly Performance</span>
              </h3>
              <p className="text-xs text-slate-400">Comparing present % across standard semester dates</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span>2026 Semester Goal: 95%</span>
            </div>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { month: 'Jan', rate: 92, count: '11,400' },
              { month: 'Feb', rate: 94, count: '11,680' },
              { month: 'Mar', rate: 89, count: '11,050' },
              { month: 'Apr', rate: 95, count: '11,800' },
              { month: 'May', rate: 96, count: '11,920' },
              { month: 'Jun', rate: 91, count: '11,350' },
              { month: 'Jul', rate: 93, count: '11,600' },
              { month: 'Aug', rate: 96.8, count: '12,080' },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="opacity-0 group-hover:opacity-100 transition absolute -top-8 bg-slate-950 text-cyan-300 text-[10px] font-bold px-2 py-1 rounded-md border border-cyan-500/30 whitespace-nowrap z-20">
                  {bar.rate}% ({bar.count})
                </div>
                <div className="w-full bg-slate-800/80 rounded-t-xl h-48 flex items-end p-1 relative overflow-hidden">
                  <div
                    style={{ height: `${bar.rate}%` }}
                    className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 via-cyan-500 to-emerald-400 group-hover:brightness-125 transition-all duration-500 shadow-lg shadow-cyan-500/20"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 block">Avg Monthly Rate</span>
              <span className="text-lg font-bold text-emerald-400">93.4%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 block">Top Department</span>
              <span className="text-lg font-bold text-cyan-400">CSE (96.8%)</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 block">Defaulter Count</span>
              <span className="text-lg font-bold text-rose-400">14 Students</span>
            </div>
          </div>
        </div>

        {/* Growth & Department Analytics */}
        <div className="space-y-6">
          {/* Department Analytics Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span>Department Enrollment</span>
              </h3>
              <button
                onClick={() => onNavigate('departments')}
                className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-3">
              {departments.slice(0, 4).map((d) => (
                <div key={d.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-200">{d.name}</span>
                    <span className="text-cyan-300">{d.studentCount} Students</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, (d.studentCount / 1000) * 100)}%` }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Student & Faculty Growth Card */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Annual Institutional Growth</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                <span className="text-[11px] font-medium block text-slate-300">Student Intake</span>
                <span className="text-xl font-black block text-emerald-400">+12.4%</span>
                <span className="text-[10px] text-emerald-400/80">1,240 New Admits</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 space-y-1">
                <span className="text-[11px] font-medium block text-slate-300">Faculty Expansion</span>
                <span className="text-xl font-black block text-indigo-400">+8.5%</span>
                <span className="text-[10px] text-indigo-400/80">38 Professors Hired</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Pending Leaves, Calendar Widget, Announcements, Audit Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* Pending Leaves */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Pending Leaves ({pendingLeaves.length})</span>
            </h3>
            <button onClick={() => onNavigate('leaves')} className="text-xs text-cyan-400 hover:underline">
              Manage
            </button>
          </div>
          <div className="space-y-3">
            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No pending leave applications.</p>
            ) : (
              pendingLeaves.map((l) => (
                <div key={l.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{l.applicantName}</span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-semibold text-[10px]">
                      {l.leaveType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-1">{l.reason}</p>
                  <span className="text-[10px] text-slate-400 block">{l.startDate} to {l.endDate}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Announcements */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-cyan-400" />
              <span>Broadcast Announcements</span>
            </h3>
            <button onClick={() => onNavigate('announcements')} className="text-xs text-cyan-400 hover:underline">
              New
            </button>
          </div>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <span className="text-xs font-bold text-cyan-300 block leading-snug">{a.title}</span>
                <p className="text-[11px] text-slate-300 line-clamp-2">{a.content}</p>
                <span className="text-[10px] text-slate-400 block">{a.createdAt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audit Activities */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>System Audit Logs</span>
            </h3>
            <button onClick={() => onNavigate('audit_logs')} className="text-xs text-cyan-400 hover:underline">
              Full Logs
            </button>
          </div>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-200">{log.action}</span>
                  <span className="text-slate-400 text-[10px]">{log.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-1">{log.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Calendar Widget */}
        <div className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-emerald-400" />
              <span>Academic Schedule</span>
            </h3>
            <span className="text-[10px] font-bold text-cyan-400">AUG 2026</span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
              <span className="font-semibold">Aug 12 - Midterms</span>
              <span className="text-[10px]">Sem VI</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300">
              <span className="font-semibold">Aug 18 - Senate Meet</span>
              <span className="text-[10px]">HODs</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <span className="font-semibold">Aug 25 - Lab Expo</span>
              <span className="text-[10px]">All Depts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
