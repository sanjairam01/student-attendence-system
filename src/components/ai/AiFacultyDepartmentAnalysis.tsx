import React from 'react';
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  Building2,
  Users,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  INITIAL_FACULTY_ANALYSIS,
  INITIAL_DEPARTMENT_ANALYSIS,
  INITIAL_COURSE_ANALYSIS,
} from '../../data/aiData';

export const AiFacultyDepartmentAnalysis: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Department Analysis Header & Ranking */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">AI Department & Health Ranking</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Updated 5 mins ago</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_DEPARTMENT_ANALYSIS.map((dept) => (
            <div
              key={dept.departmentCode}
              className={`p-5 rounded-2xl border backdrop-blur-xl transition-all ${
                dept.status === 'HEALTHY'
                  ? 'bg-slate-900/60 border-emerald-500/20 hover:border-emerald-500/40'
                  : dept.status === 'MODERATE'
                  ? 'bg-slate-900/60 border-amber-500/20 hover:border-amber-500/40'
                  : 'bg-slate-900/60 border-rose-500/20 hover:border-rose-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Rank #{dept.riskRank}
                </span>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                    dept.status === 'HEALTHY'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : dept.status === 'MODERATE'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {dept.status}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{dept.departmentName}</h3>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Current Attendance</div>
                  <div className="text-xl font-extrabold text-white font-mono">{dept.currentAttendancePct}%</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400">Health Index</div>
                  <div
                    className={`text-xl font-extrabold font-mono ${
                      dept.healthScore >= 80
                        ? 'text-emerald-400'
                        : dept.healthScore >= 70
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {dept.healthScore}/100
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Predicted: <strong className="text-cyan-300 font-mono">{dept.predictedAttendancePct}%</strong></span>
                <span className="text-rose-400 font-semibold">{dept.totalRiskStudents} at Risk</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course & Subject AI Performance Comparison Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">AI Course & Subject Performance Analysis</h3>
          </div>
          <span className="text-xs text-slate-400">Semester Comparison Index</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INITIAL_COURSE_ANALYSIS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="courseCode" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="attendancePct" name="Attendance %" radius={[6, 6, 0, 0]}>
                  {INITIAL_COURSE_ANALYSIS.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.attendancePct >= 85 ? '#10b981' : entry.attendancePct >= 75 ? '#06b6d4' : '#f43f5e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {INITIAL_COURSE_ANALYSIS.map((c) => (
              <div key={c.courseCode} className="p-3 rounded-xl bg-slate-800/60 border border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{c.courseName}</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">{c.attendancePct}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{c.department} • {c.semester}</span>
                  <span className="text-amber-400">-{c.predictedDropPct}% drop risk</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Analysis Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white tracking-wide">AI Faculty Consistency & Logging Analysis</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_FACULTY_ANALYSIS.map((fac) => (
            <div key={fac.id} className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{fac.fullName}</h3>
                  <p className="text-xs text-slate-400">{fac.department}</p>
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    fac.trend === 'IMPROVING'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : fac.trend === 'STABLE'
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  {fac.trend}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5">
                  <div className="text-slate-400 text-[10px]">Consistency</div>
                  <div className="text-base font-bold text-emerald-400 font-mono">{fac.attendanceConsistencyScore}%</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5">
                  <div className="text-slate-400 text-[10px]">Avg Delay</div>
                  <div className="text-base font-bold text-cyan-400 font-mono">{fac.avgSubmissionDelayMinutes}m</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 text-xs space-y-1">
                <div className="text-[10px] uppercase font-semibold text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI Insight
                </div>
                <p className="text-slate-300">{fac.aiRecommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
