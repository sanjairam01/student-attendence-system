import React from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  BookOpen,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  UserX,
  TrendingUp,
  Percent,
  Calendar,
  Award,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { OverviewKpiStats, AttendanceTrendData, DepartmentAttendanceStat } from '../../types/reports';

interface DashboardAnalyticsViewProps {
  stats: OverviewKpiStats;
  weeklyTrend: AttendanceTrendData[];
  departments: DepartmentAttendanceStat[];
}

export const DashboardAnalyticsView: React.FC<DashboardAnalyticsViewProps> = ({
  stats,
  weeklyTrend,
  departments,
}) => {
  const pieData = [
    { name: 'Present', value: stats.todayAttendance.present, color: '#10b981' },
    { name: 'Absent', value: stats.todayAttendance.absent, color: '#ef4444' },
    { name: 'Late', value: stats.todayAttendance.late, color: '#f59e0b' },
    { name: 'On Leave', value: stats.todayAttendance.onLeave, color: '#8b5cf6' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner KPI Summary */}
      <div className="relative overflow-hidden p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/20 shadow-2xl backdrop-blur-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                Real-time Intelligence
              </span>
              <span className="text-xs text-slate-400 font-mono">Live Institutional Telemetry</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Executive Attendance Analytics & KPI Dashboard
            </h1>
            <p className="text-xs text-slate-300 font-medium max-w-2xl">
              Consolidated real-time attendance telemetry across all departments, faculties, and student cohorts with automated risk evaluation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center shrink-0">
              <p className="text-2xl font-black text-emerald-400 font-mono">
                {stats.todayAttendance.percentage}%
              </p>
              <p className="text-[10px] text-emerald-300/80 font-semibold uppercase tracking-wider">
                Today's Attendance
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center shrink-0">
              <p className="text-2xl font-black text-cyan-400 font-mono">
                {stats.monthlyAttendancePct}%
              </p>
              <p className="text-[10px] text-cyan-300/80 font-semibold uppercase tracking-wider">
                Monthly Average
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Key Institutional Counter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Students</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3 font-mono">{stats.totalStudents.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4.2% active enrollment
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl hover:border-indigo-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Faculty</span>
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3 font-mono">{stats.totalFaculty}</p>
          <p className="text-[10px] text-slate-400 font-semibold mt-1">Across 6 departments</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Departments</span>
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3 font-mono">{stats.totalDepartments}</p>
          <p className="text-[10px] text-purple-300 font-semibold mt-1">CSE, IT, ECE, EEE...</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Courses</span>
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3 font-mono">{stats.totalCourses}</p>
          <p className="text-[10px] text-amber-300 font-semibold mt-1">UG & PG Programs</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl hover:border-emerald-500/40 transition col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Active Subjects</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-3 font-mono">{stats.totalSubjects}</p>
          <p className="text-[10px] text-emerald-300 font-semibold mt-1">Current Semester</p>
        </div>
      </div>

      {/* Row 2: Today's Attendance Breakdown Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">Present Today</p>
            <p className="text-xl font-black text-emerald-400 font-mono">{stats.todayAttendance.present}</p>
            <p className="text-[10px] text-slate-400 font-medium">Students in class</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-red-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">Absent Today</p>
            <p className="text-xl font-black text-red-400 font-mono">{stats.todayAttendance.absent}</p>
            <p className="text-[10px] text-slate-400 font-medium">Unexcused missing</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">Late Arrivals</p>
            <p className="text-xl font-black text-amber-400 font-mono">{stats.todayAttendance.late}</p>
            <p className="text-[10px] text-slate-400 font-medium">Recorded with delay</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-purple-500/20 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">Approved Leave</p>
            <p className="text-xl font-black text-purple-400 font-mono">{stats.todayAttendance.onLeave}</p>
            <p className="text-[10px] text-slate-400 font-medium">Excused absences</p>
          </div>
        </div>
      </div>

      {/* Row 3: Main Charts - Weekly Attendance Trend & Today's Pie Ratio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-white">Weekly Attendance Velocity</h3>
              <p className="text-xs text-slate-400 font-medium">Aggregate percentage across all academic sessions this week.</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/20">
              Avg: 86.7%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="percentage"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPercentage)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Today's Status Distribution Pie */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-black text-white">Today's Attendance Ratio</h3>
            <p className="text-xs text-slate-400 font-medium">Distribution across present, absent, late & leave.</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/40">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 text-[11px]">{item.name}:</span>
                <span className="text-white font-mono font-bold ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 4: Department Performance Bar Summary */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white">Departmental Attendance Index</h3>
            <p className="text-xs text-slate-400 font-medium">Average attendance % per engineering department.</p>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={departments} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="code" stroke="#64748b" fontSize={11} tickLine={false} />
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
              <Bar dataKey="presentPct" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
