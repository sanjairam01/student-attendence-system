import React, { useState } from 'react';
import {
  BarChart2,
  PieChart as PieIcon,
  TrendingUp,
  Calendar,
  Building2,
  GraduationCap,
  BookOpen,
  UserCheck,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  DAILY_ATTENDANCE_TREND,
  WEEKLY_ATTENDANCE_TREND,
  MONTHLY_ATTENDANCE_TREND,
  SEMESTER_ATTENDANCE_TREND,
  DEPARTMENT_STATS,
  FACULTY_PERFORMANCE_STATS,
  COURSE_ATTENDANCE_STATS,
} from '../../data/reportsData';

type AnalyticsScope =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'semester'
  | 'yearly'
  | 'department'
  | 'course'
  | 'section'
  | 'subject'
  | 'faculty'
  | 'student';

export const AttendanceAnalyticsView: React.FC = () => {
  const [activeScope, setActiveScope] = useState<AnalyticsScope>('weekly');

  const radarData = [
    { subject: 'CSE Dept', A: 91, fullMark: 100 },
    { subject: 'IT Dept', A: 88, fullMark: 100 },
    { subject: 'ECE Dept', A: 84, fullMark: 100 },
    { subject: 'EEE Dept', A: 81, fullMark: 100 },
    { subject: 'MECH Dept', A: 76, fullMark: 100 },
    { subject: 'CIVIL Dept', A: 79, fullMark: 100 },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Scope Navigation Bar */}
      <div className="p-2 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap gap-1.5 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveScope('daily')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'daily'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Daily Attendance
        </button>
        <button
          onClick={() => setActiveScope('weekly')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'weekly'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Weekly Attendance
        </button>
        <button
          onClick={() => setActiveScope('monthly')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'monthly'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Monthly Attendance
        </button>
        <button
          onClick={() => setActiveScope('semester')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'semester'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Semester Attendance
        </button>
        <button
          onClick={() => setActiveScope('department')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'department'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Department-wise
        </button>
        <button
          onClick={() => setActiveScope('course')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'course'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Course-wise
        </button>
        <button
          onClick={() => setActiveScope('faculty')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
            activeScope === 'faculty'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Faculty-wise
        </button>
      </div>

      {/* Main Analytics Content Container */}
      {(activeScope === 'daily' || activeScope === 'weekly' || activeScope === 'monthly' || activeScope === 'semester') && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white capitalize">
                  {activeScope} Attendance Volume & Breakdowns
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Detailed distribution of Present, Absent, Late, and Leave counts.
                </p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={
                    activeScope === 'daily'
                      ? DAILY_ATTENDANCE_TREND
                      : activeScope === 'weekly'
                      ? WEEKLY_ATTENDANCE_TREND
                      : activeScope === 'monthly'
                      ? MONTHLY_ATTENDANCE_TREND
                      : SEMESTER_ATTENDANCE_TREND
                  }
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="present" fill="#10b981" name="Present" stackId="a" />
                  <Bar dataKey="late" fill="#f59e0b" name="Late" stackId="a" />
                  <Bar dataKey="leave" fill="#8b5cf6" name="Leave" stackId="a" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white">Attendance Rate Percentage Line</h3>
                <p className="text-xs text-slate-400 font-medium">Percentage curve over time slots.</p>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={
                    activeScope === 'daily'
                      ? DAILY_ATTENDANCE_TREND
                      : activeScope === 'weekly'
                      ? WEEKLY_ATTENDANCE_TREND
                      : activeScope === 'monthly'
                      ? MONTHLY_ATTENDANCE_TREND
                      : SEMESTER_ATTENDANCE_TREND
                  }
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[50, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    dot={{ fill: '#06b6d4', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Department-wise Scope */}
      {activeScope === 'department' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-black text-white">Department Radar Balance</h3>
            <p className="text-xs text-slate-400 font-medium">Relative attendance strength comparison.</p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={10} />
                  <Radar name="Attendance %" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-base font-black text-white">Department Risk & Defaulters</h3>
            <div className="space-y-3">
              {DEPARTMENT_STATS.map((dept) => (
                <div key={dept.id} className="p-3.5 rounded-2xl bg-slate-800/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-white">{dept.name} ({dept.code})</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{dept.totalStudents} students • {dept.defaultersCount} defaulters</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-cyan-400 font-mono">{dept.presentPct}%</span>
                    <span className={`block text-[9px] font-bold uppercase px-2 py-0.5 rounded-md mt-0.5 ${
                      dept.status === 'OPTIMAL' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {dept.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Course-wise Scope */}
      {activeScope === 'course' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-black text-white">Course Enrolled Attendance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {COURSE_ATTENDANCE_STATS.map((crs) => (
              <div key={crs.id} className="p-5 rounded-2xl bg-slate-800/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 font-mono text-[10px] font-bold">
                    {crs.code}
                  </span>
                  <span className="text-sm font-black text-emerald-400 font-mono">{crs.avgAttendancePct}%</span>
                </div>
                <h4 className="text-sm font-black text-white">{crs.courseName}</h4>
                <p className="text-xs text-slate-400">{crs.semester} • {crs.enrolledStudents} Enrolled Students</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Faculty-wise Scope */}
      {activeScope === 'faculty' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-black text-white">Faculty Lecture Attendance Delivery Ratings</h3>
          <div className="space-y-3">
            {FACULTY_PERFORMANCE_STATS.map((fac) => (
              <div key={fac.id} className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black text-white">{fac.name} ({fac.employeeId})</h4>
                  <p className="text-xs text-slate-400">{fac.subjectName} • {fac.department}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs font-black text-emerald-400 font-mono">{fac.avgAttendancePct}%</p>
                    <p className="text-[10px] text-slate-400">Class Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-cyan-400 font-mono">{fac.punctualityRatePct}%</p>
                    <p className="text-[10px] text-slate-400">Punctuality</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-black text-amber-400 font-mono">★ {fac.rating}</p>
                    <p className="text-[10px] text-slate-400">Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
