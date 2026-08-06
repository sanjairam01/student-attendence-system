import React from 'react';
import {
  GraduationCap,
  Users,
  HeartHandshake,
  Building2,
  BookOpen,
  BookMarked,
  Layers,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  Calendar,
  Megaphone,
  Bell,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import {
  Student,
  Faculty,
  Department,
  LeaveRequest,
  Announcement,
  AttendanceRecord,
} from '../../types/admin';

interface DashboardProps {
  students: Student[];
  faculty: Faculty[];
  parentsCount: number;
  departments: Department[];
  coursesCount: number;
  subjectsCount: number;
  classesCount: number;
  attendanceRecords: AttendanceRecord[];
  leaves: LeaveRequest[];
  announcements: Announcement[];
  onNavigateTab: (tab: any) => void;
  onApproveLeave: (id: string) => void;
  onRejectLeave: (id: string) => void;
}

export const AdminDashboardView: React.FC<DashboardProps> = ({
  students,
  faculty,
  parentsCount,
  departments,
  coursesCount,
  subjectsCount,
  classesCount,
  attendanceRecords,
  leaves,
  announcements,
  onNavigateTab,
  onApproveLeave,
  onRejectLeave,
}) => {
  const presentCount = attendanceRecords.filter((a) => a.status === 'Present').length;
  const absentCount = attendanceRecords.filter((a) => a.status === 'Absent').length;
  const lateCount = attendanceRecords.filter((a) => a.status === 'Late').length;
  const leaveCount = attendanceRecords.filter((a) => a.status === 'Leave').length;
  const totalMarked = attendanceRecords.length || 1;
  const attendancePct = Math.round((presentCount / totalMarked) * 100);

  const pendingLeaves = leaves.filter((l) => l.status === 'Pending');

  const metricCards = [
    {
      label: 'Total Students',
      value: students.length,
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      subtext: `${students.filter((s) => s.status === 'Active').length} Active Enrolled`,
      tab: 'students',
      gradient: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
    },
    {
      label: 'Total Faculty',
      value: faculty.length,
      icon: <Users className="w-5 h-5 text-blue-400" />,
      subtext: `${faculty.filter((f) => f.status === 'Active').length} Active Staff`,
      tab: 'faculty',
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
    },
    {
      label: 'Total Parents',
      value: parentsCount,
      icon: <HeartHandshake className="w-5 h-5 text-teal-400" />,
      subtext: 'Guardian Accounts Linked',
      tab: 'parents',
      gradient: 'from-teal-500/20 via-teal-500/10 to-transparent',
    },
    {
      label: 'Departments',
      value: departments.length,
      icon: <Building2 className="w-5 h-5 text-indigo-400" />,
      subtext: 'Academic Divisions',
      tab: 'departments',
      gradient: 'from-indigo-500/20 via-indigo-500/10 to-transparent',
    },
    {
      label: 'Courses Offered',
      value: coursesCount,
      icon: <BookOpen className="w-5 h-5 text-purple-400" />,
      subtext: 'Degree Programs',
      tab: 'courses',
      gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
    },
    {
      label: 'Total Subjects',
      value: subjectsCount,
      icon: <BookMarked className="w-5 h-5 text-pink-400" />,
      subtext: 'Active Syllabi',
      tab: 'subjects',
      gradient: 'from-pink-500/20 via-pink-500/10 to-transparent',
    },
    {
      label: 'Active Classes',
      value: classesCount,
      icon: <Layers className="w-5 h-5 text-amber-400" />,
      subtext: 'Classroom Sections',
      tab: 'classes',
      gradient: 'from-amber-500/20 via-amber-500/10 to-transparent',
    },
    {
      label: 'Today Attendance %',
      value: `${attendancePct}%`,
      icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
      subtext: `${presentCount} Present / ${totalMarked} Logged`,
      tab: 'attendance',
      gradient: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Banner / Welcome Bar */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-cyan-900/40 via-blue-900/30 to-indigo-950/60 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase tracking-wider border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Institutional Operations Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            Apex Institute Admin Portal
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Real-time management of student demographics, faculty load, timetable schedules, attendance compliance, and leave approvals for your institution.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('reports')}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0 transition"
        >
          <span>Generate Attendance Report</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => onNavigateTab(card.tab)}
            className={`p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all cursor-pointer group relative overflow-hidden bg-gradient-to-b ${card.gradient}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 group-hover:text-cyan-300 transition">
                {card.label}
              </span>
              <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition">
                {card.icon}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-black text-white">{card.value}</div>
              <p className="text-[11px] text-slate-400 mt-1">{card.subtext}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance Stats & Breakdown Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Today's Live Attendance Overview</span>
            </h3>
            <p className="text-xs text-slate-400">Institutional daily attendance tracking summary</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Present: {presentCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-400">
              <XCircle className="w-4 h-4" />
              <span>Absent: {absentCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Late: {lateCount}</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400">
              <FileSpreadsheet className="w-4 h-4" />
              <span>On Leave: {leaveCount}</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-white/5">
          <div
            style={{ width: `${Math.max(5, (presentCount / totalMarked) * 100)}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all"
            title="Present"
          />
          <div
            style={{ width: `${(absentCount / totalMarked) * 100}%` }}
            className="h-full bg-rose-500 transition-all"
            title="Absent"
          />
          <div
            style={{ width: `${(lateCount / totalMarked) * 100}%` }}
            className="h-full bg-amber-500 transition-all"
            title="Late"
          />
          <div
            style={{ width: `${(leaveCount / totalMarked) * 100}%` }}
            className="h-full bg-blue-500 rounded-r-full transition-all"
            title="On Leave"
          />
        </div>
      </div>

      {/* Grid Row: Pending Leaves, Upcoming Classes, Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Leave Requests */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-amber-400" />
              <span>Pending Leave Approvals</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black text-[10px] border border-amber-500/30">
              {pendingLeaves.length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 italic text-center py-6">
                No pending leave applications requiring approval.
              </p>
            ) : (
              pendingLeaves.map((leave) => (
                <div
                  key={leave.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{leave.applicantName}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-slate-400 border border-white/10">
                      {leave.applicantType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 line-clamp-2">{leave.reason}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                    <span>
                      {leave.startDate} to {leave.endDate} ({leave.daysCount} days)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onApproveLeave(leave.id)}
                        className="p-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30"
                        title="Approve Leave"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRejectLeave(leave.id)}
                        className="p-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
                        title="Reject Leave"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={() => onNavigateTab('leaves')}
            className="w-full py-2 text-center text-xs text-cyan-400 font-bold hover:underline"
          >
            View All Leave Applications &rarr;
          </button>
        </div>

        {/* Today's Schedule & Upcoming Classes */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Upcoming Class Timetable</span>
            </h3>
            <button
              onClick={() => onNavigateTab('timetable')}
              className="text-xs text-cyan-400 font-bold hover:underline"
            >
              Full Schedule
            </button>
          </div>

          <div className="space-y-3">
            {[
              { time: '09:00 AM - 10:00 AM', subject: 'Data Structures & Algorithms', room: 'Lab B-302', faculty: 'Dr. Aris Thorne', class: 'CSE 4th Sem A' },
              { time: '10:15 AM - 11:15 AM', subject: 'Database Management Systems', room: 'Lab B-302', faculty: 'Prof. Evelyn Vance', class: 'CSE 4th Sem A' },
              { time: '11:30 AM - 12:30 PM', subject: 'AI & Neural Networks', room: 'Innovation C-101', faculty: 'Dr. Sarah Connor', class: 'AIDS 6th Sem A' },
            ].map((slot, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
                <div className="flex items-center justify-between text-cyan-400 font-extrabold text-[11px]">
                  <span>{slot.time}</span>
                  <span className="text-slate-400">{slot.room}</span>
                </div>
                <div className="font-bold text-white">{slot.subject}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{slot.class}</span>
                  <span>{slot.faculty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements & Notifications */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-pink-400" />
              <span>Institutional Announcements</span>
            </h3>
            <button
              onClick={() => onNavigateTab('announcements')}
              className="text-xs text-cyan-400 font-bold hover:underline"
            >
              Manage
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((anc) => (
              <div key={anc.id} className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white line-clamp-1">{anc.title}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    anc.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {anc.priority}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2">{anc.content}</p>
                <div className="text-[10px] text-slate-400 pt-1">
                  Target: {anc.targetAudience} ({anc.createdAt})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
