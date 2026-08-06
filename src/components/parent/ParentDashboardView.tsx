import React from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  Building,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { ParentProfile, ChildSummary, ParentTab } from '../../types/parent';
import { SubjectAttendance } from '../../types/student';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface ParentDashboardProps {
  profile: ParentProfile;
  child: ChildSummary;
  subjects: SubjectAttendance[];
  onNavigate: (tab: ParentTab) => void;
}

export const ParentDashboardView: React.FC<ParentDashboardProps> = ({
  profile,
  child,
  subjects,
  onNavigate,
}) => {
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
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 border border-white/10 backdrop-blur-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guardian Portal • Linked Child Monitoring</span>
          </div>

          <h2 className="text-2xl font-black text-white">
            Welcome, <span className="text-amber-400">{profile.parentName}</span>
          </h2>
          <p className="text-xs text-slate-300 font-medium">
            Real-time academic & attendance record tracking for <strong className="text-white">{child.fullName}</strong>.
          </p>
        </div>

        {/* Child Quick Card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 flex items-center gap-4 shrink-0 shadow-lg">
          <img
            src={child.avatarUrl}
            alt={child.fullName}
            className="w-14 h-14 rounded-2xl object-cover border border-amber-400"
          />
          <div>
            <p className="text-sm font-black text-white">{child.fullName}</p>
            <p className="text-[10px] text-amber-300 font-mono">Roll: {child.rollNumber}</p>
            <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300">
              <CheckCircle2 className="w-3 h-3" /> Today: {child.todayStatus}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Percentage */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Attendance Ratio</span>
            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300">
              Compliant
            </span>
          </div>
          <p className="text-2xl font-black text-amber-400 font-mono">{child.attendancePct}%</p>
          <span className="text-[10px] text-slate-400 font-medium block">Threshold: &gt;75% required</span>
        </div>

        {/* Present Days */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Classes Attended</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{child.presentDays}</p>
          <span className="text-[10px] text-emerald-400 font-semibold block">Out of {child.totalClasses} Lectures</span>
        </div>

        {/* Absences */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Absences Logged</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{child.absentDays}</p>
          <span className="text-[10px] text-rose-400 font-semibold block">Unexcused Absences</span>
        </div>

        {/* Class Advisor Info */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Class Advisor</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Phone className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs font-black text-white truncate">{child.advisorName}</p>
          <span className="text-[10px] text-amber-300 font-mono block">{child.advisorPhone}</span>
        </div>
      </div>

      {/* Grid: Trend Chart & Subject-wise Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Trend Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Child Attendance Progression (%)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('reports')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Full Statement</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
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
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#amberGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Ratios */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Subject Ratios
            </h3>
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs font-bold text-amber-400 hover:underline"
            >
              Details
            </button>
          </div>

          <div className="space-y-3">
            {subjects.slice(0, 4).map((sub) => (
              <div key={sub.id} className="p-3 rounded-2xl bg-slate-800/40 border border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate max-w-[150px]">{sub.subjectName}</span>
                  <span className="font-mono font-black text-amber-300">{sub.percentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full"
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
