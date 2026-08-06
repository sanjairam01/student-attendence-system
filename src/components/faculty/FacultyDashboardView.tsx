import React from 'react';
import {
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  QrCode,
  Calendar,
  AlertTriangle,
  Megaphone,
  Bell,
  ArrowRight,
  TrendingUp,
  Activity,
  FileSpreadsheet,
  Building,
  BookOpen,
} from 'lucide-react';
import {
  FacultyProfile,
  FacultyClass,
  FacultySubject,
  FacultyAttendanceSession,
  FacultyTimetableSlot,
  FacultyLeaveRequest,
  FacultyAnnouncement,
  FacultyNotification,
  FacultyTab,
} from '../../types/faculty';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

interface DashboardProps {
  profile: FacultyProfile;
  classes: FacultyClass[];
  subjects: FacultySubject[];
  todayTimetable: FacultyTimetableSlot[];
  recentSessions: FacultyAttendanceSession[];
  pendingLeaves: FacultyLeaveRequest[];
  announcements: FacultyAnnouncement[];
  notifications: FacultyNotification[];
  onNavigate: (tab: FacultyTab) => void;
  onOpenQR: () => void;
}

export const FacultyDashboardView: React.FC<DashboardProps> = ({
  profile,
  classes,
  subjects,
  todayTimetable,
  recentSessions,
  pendingLeaves,
  announcements,
  notifications,
  onNavigate,
  onOpenQR,
}) => {
  // Mock Weekly Attendance Trend data
  const weeklyData = [
    { day: 'Mon', attendancePct: 94 },
    { day: 'Tue', attendancePct: 96 },
    { day: 'Wed', attendancePct: 92 },
    { day: 'Thu', attendancePct: 95 },
    { day: 'Fri', attendancePct: 97 },
  ];

  const currentPeriod = todayTimetable.find((t) => t.isCurrentPeriod) || todayTimetable[0];
  const upcomingClasses = todayTimetable.filter((t) => !t.isCurrentPeriod);

  // Today's Stats calculation
  const totalStudentsEnrolled = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const todaysSession = recentSessions[0];
  const presentCount = todaysSession ? todaysSession.presentCount : 61;
  const absentCount = todaysSession ? todaysSession.absentCount : 3;
  const lateCount = todaysSession ? todaysSession.lateCount : 1;
  const attendancePct = todaysSession ? todaysSession.attendancePct : 93.8;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Glass Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-500/20 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Attendance System • Faculty Portal</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Welcome back, <span className="text-cyan-400">{profile.name}</span>
            </h1>
            <p className="text-sm text-slate-300 font-medium max-w-xl">
              {profile.designation} • {profile.departmentName}. Today you have{' '}
              <span className="text-cyan-300 font-bold">{todayTimetable.length} lecture sessions</span> scheduled.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenQR}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 transition"
            >
              <QrCode className="w-4 h-4" />
              <span>Generate Smart QR</span>
            </button>
            <button
              onClick={() => onNavigate('mark_attendance')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-black text-xs border border-white/10 hover:border-cyan-500/30 transition"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Manual Attendance</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Attendance % */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Today's Attendance
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{attendancePct}%</span>
              <span className="text-xs font-bold text-emerald-400">+1.8% vs last week</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">
              Across all {classes.length} active class sections
            </p>
          </div>
        </div>

        {/* Card 2: Students Present */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Students Present
            </span>
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white">{presentCount}</span>
              <span className="text-xs font-bold text-slate-400">/ {totalStudentsEnrolled} total</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Verified via Smart QR & Manual Log</p>
          </div>
        </div>

        {/* Card 3: Absent / Late */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Absent & Late
            </span>
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-rose-400">{absentCount}</span>
              <span className="text-xs font-bold text-slate-400">Absent</span>
              <span className="text-xl font-bold text-amber-400 ml-2">{lateCount}</span>
              <span className="text-xs font-bold text-slate-400">Late</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Automatic SMS/Email alerts dispatched</p>
          </div>
        </div>

        {/* Card 4: Pending Leave Requests */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              Pending Leaves
            </span>
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-amber-300">{pendingLeaves.length} Application</span>
              <button
                onClick={() => onNavigate('leaves')}
                className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
              >
                View status <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">Medical Leave (Aug 12-14) under review</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Attendance Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): Today's Classes & Current Period */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Period Highlight Card */}
          {currentPeriod && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Live Current Period
                </span>
              </div>

              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Period #{currentPeriod.periodNumber} • {currentPeriod.startTime} - {currentPeriod.endTime}
              </p>

              <h3 className="text-2xl font-black text-white mt-1">{currentPeriod.subjectName}</h3>
              <p className="text-xs font-semibold text-slate-300 mt-0.5">
                {currentPeriod.className} • Room: {currentPeriod.roomNumber}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenQR}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Start Live QR Session</span>
                </button>
                <button
                  onClick={() => onNavigate('mark_attendance')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs border border-white/10 transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Mark Roster Manually</span>
                </button>
              </div>
            </div>
          )}

          {/* Today's Classes Timetable List */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Today's Scheduled Classes ({todayTimetable.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('timetable')}
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                Full Weekly Schedule &rarr;
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {todayTimetable.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    slot.isCurrentPeriod
                      ? 'bg-cyan-500/10 border-cyan-500/30'
                      : 'bg-slate-800/40 border-white/5 hover:bg-slate-800/70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-slate-800 text-cyan-300 font-black text-xs text-center min-w-[70px]">
                      <p>{slot.startTime}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{slot.endTime}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{slot.subjectName}</span>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-slate-800 text-slate-300 border border-white/10">
                          {slot.subjectCode}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        {slot.className} • Location: <span className="text-slate-200">{slot.roomNumber}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('mark_attendance')}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-white/10"
                    >
                      Attendance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Trend Chart */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Weekly Class Attendance Trend (%)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Average 94.8%</span>
            </div>

            <div className="h-64 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                  <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#334155',
                      borderRadius: '16px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendancePct"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    dot={{ fill: '#38bdf8', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Quick Actions, Announcements, Alerts */}
        <div className="space-y-6">
          {/* Quick Actions Panel */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Quick Actions
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                onClick={onOpenQR}
                className="p-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 flex flex-col items-center justify-center gap-2 transition"
              >
                <QrCode className="w-6 h-6" />
                <span className="text-xs font-black text-center">Smart QR</span>
              </button>

              <button
                onClick={() => onNavigate('mark_attendance')}
                className="p-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-300 flex flex-col items-center justify-center gap-2 transition"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-xs font-black text-center">Mark Roster</span>
              </button>

              <button
                onClick={() => onNavigate('leaves')}
                className="p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 flex flex-col items-center justify-center gap-2 transition"
              >
                <FileSpreadsheet className="w-6 h-6" />
                <span className="text-xs font-black text-center">Apply Leave</span>
              </button>

              <button
                onClick={() => onNavigate('reports')}
                className="p-3.5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-300 flex flex-col items-center justify-center gap-2 transition"
              >
                <FileSpreadsheet className="w-6 h-6" />
                <span className="text-xs font-black text-center">Export PDF</span>
              </button>
            </div>
          </div>

          {/* Department & Class Announcements */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">Announcements</h3>
              </div>
              <button
                onClick={() => onNavigate('announcements')}
                className="text-xs font-bold text-cyan-400 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {announcements.map((anc) => (
                <div key={anc.id} className="p-3.5 rounded-2xl bg-slate-800/50 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-500/20 text-indigo-300">
                      {anc.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{anc.publishedDate}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{anc.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{anc.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Low Attendance Defaulter Warnings */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-rose-500/20 backdrop-blur-xl">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Defaulter Warnings (&lt;75%)
              </h3>
            </div>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Marcus Sterling</p>
                  <p className="text-[10px] text-slate-400">CSE 4th Sem Sec A • Roll #003</p>
                </div>
                <span className="text-xs font-black text-rose-400">68.4%</span>
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Liam Hemsworth</p>
                  <p className="text-[10px] text-slate-400">CSE 4th Sem Sec A • Roll #005</p>
                </div>
                <span className="text-xs font-black text-rose-400">71.5%</span>
              </div>

              <button
                onClick={() => onNavigate('students')}
                className="w-full mt-2 py-2 text-center text-xs font-bold text-cyan-400 hover:underline"
              >
                Open Student Directory &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
