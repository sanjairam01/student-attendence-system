import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  BookOpen,
  TrendingUp,
  FileSpreadsheet,
  Megaphone,
  Bell,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  Award,
  Check,
} from 'lucide-react';
import {
  StudentProfile,
  SubjectAttendance,
  DailyAttendanceRecord,
  StudentAnnouncement,
  StudentNotification,
  StudentTimetableSlot,
  StudentTab,
} from '../../types/student';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface StudentDashboardProps {
  profile: StudentProfile;
  subjects: SubjectAttendance[];
  dailyRecords: DailyAttendanceRecord[];
  announcements: StudentAnnouncement[];
  notifications: StudentNotification[];
  timetable: StudentTimetableSlot[];
  onNavigate: (tab: StudentTab) => void;
}

export const StudentDashboardView: React.FC<StudentDashboardProps> = ({
  profile,
  subjects,
  dailyRecords,
  announcements,
  notifications,
  timetable,
  onNavigate,
}) => {
  // Stats Calculations
  const presentCount = dailyRecords.filter((r) => r.status === 'Present').length + 122; // historical baseline + records
  const absentCount = dailyRecords.filter((r) => r.status === 'Absent').length + 3;
  const lateCount = dailyRecords.filter((r) => r.status === 'Late').length + 2;
  const leaveCount = dailyRecords.filter((r) => r.status === 'Medical').length + 3;
  const totalClasses = presentCount + absentCount + lateCount + leaveCount;
  const overallPercentage = ((presentCount / totalClasses) * 100).toFixed(1);

  // Monthly Trend Data
  const monthlyTrendData = [
    { month: 'Jan', attendance: 92.0 },
    { month: 'Feb', attendance: 95.2 },
    { month: 'Mar', attendance: 91.8 },
    { month: 'Apr', attendance: 96.0 },
    { month: 'May', attendance: 93.5 },
    { month: 'Jun', attendance: 97.1 },
    { month: 'Jul', attendance: 94.0 },
    { month: 'Aug', attendance: 94.2 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Standing: Excellent (&gt;75% Compliant)</span>
          </div>

          <h2 className="text-2xl font-black text-white">
            Welcome back, <span className="text-cyan-400">{profile.fullName}</span>!
          </h2>
          <p className="text-xs text-slate-300 max-w-xl font-medium leading-relaxed">
            {profile.department} • {profile.course} • Roll #{profile.rollNumber}
          </p>
        </div>

        {/* Quick Percentage Card Badge */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex items-center gap-4 shrink-0 shadow-lg">
          <div className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 font-black text-lg border border-cyan-500/40">
            {overallPercentage}%
          </div>
          <div>
            <p className="text-xs font-black text-white">Overall Attendance</p>
            <p className="text-[10px] text-emerald-400 font-bold">Compliant (&gt;75% Required)</p>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
              {presentCount} / {totalClasses} Classes Attended
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Present Days */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Present Sessions</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{presentCount}</p>
          <span className="text-[10px] text-emerald-400 font-semibold block">Full Attendance</span>
        </div>

        {/* Absent Days */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Absent Sessions</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{absentCount}</p>
          <span className="text-[10px] text-rose-400 font-semibold block">Unexcused Absences</span>
        </div>

        {/* Late Days */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Late Arrivals</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{lateCount}</p>
          <span className="text-[10px] text-amber-400 font-semibold block">Marked Late</span>
        </div>

        {/* Leave Days */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Excused Leaves</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{leaveCount}</p>
          <span className="text-[10px] text-cyan-400 font-semibold block">Approved Medical/Duty</span>
        </div>
      </div>

      {/* Grid: Attendance Trend Chart & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Monthly Attendance Trend (%)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '16px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#cyanGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Classes */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Today's Timetable
              </h3>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono font-bold">Wednesday</span>
          </div>

          <div className="space-y-3">
            {timetable.slice(0, 3).map((slot) => (
              <div
                key={slot.id}
                className={`p-3.5 rounded-2xl border transition ${
                  slot.isCurrent
                    ? 'bg-cyan-500/10 border-cyan-500/40'
                    : 'bg-slate-800/40 border-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{slot.subjectName}</span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-800 text-cyan-300">
                    {slot.startTime}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>{slot.facultyName}</span>
                  <span className="text-slate-300 font-mono">{slot.roomNumber}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigate('timetable')}
            className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition border border-white/5 text-center block"
          >
            View Complete Timetable
          </button>
        </div>
      </div>

      {/* Grid: Subject Breakdown & Placeholders (Assignments / Exams) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subject-wise Attendance (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Subject-wise Attendance Performance
              </h3>
            </div>
            <button
              onClick={() => onNavigate('subjects')}
              className="text-xs font-bold text-cyan-400 hover:underline"
            >
              View All Subjects
            </button>
          </div>

          <div className="space-y-4">
            {subjects.map((sub) => (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black text-white">{sub.subjectName}</span>
                    <span className="ml-2 font-mono text-[10px] text-slate-400">({sub.subjectCode})</span>
                  </div>
                  <div className="font-mono font-black text-cyan-300">
                    {sub.percentage}% ({sub.attendedClasses}/{sub.totalClasses})
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sub.percentage >= 90
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        : sub.percentage >= 75
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500'
                        : 'bg-gradient-to-r from-rose-500 to-amber-500'
                    }`}
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholders: Assignments & Upcoming Exams */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Academic Deadlines
            </h3>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300">
                Assignment #3 Due
              </span>
              <p className="text-xs font-black text-white">B-Tree & Red-Black Tree Implementation</p>
              <p className="text-[10px] text-amber-300 font-mono">Due: Aug 10, 2026 (11:59 PM)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-indigo-500/20 text-indigo-300">
                Upcoming Exam
              </span>
              <p className="text-xs font-black text-white">Machine Learning Mid-Term Evaluation</p>
              <p className="text-[10px] text-indigo-300 font-mono">Date: Sep 12, 2026 • Hall 204</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
