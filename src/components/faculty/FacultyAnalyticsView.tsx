import React from 'react';
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity, Sparkles, Filter } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export const FacultyAnalyticsView: React.FC = () => {
  // Monthly Attendance Trend
  const monthlyData = [
    { month: 'Jan', attendancePct: 92.5 },
    { month: 'Feb', attendancePct: 94.1 },
    { month: 'Mar', attendancePct: 91.8 },
    { month: 'Apr', attendancePct: 95.0 },
    { month: 'May', attendancePct: 96.2 },
    { month: 'Jun', attendancePct: 93.4 },
    { month: 'Jul', attendancePct: 94.8 },
    { month: 'Aug', attendancePct: 95.6 },
  ];

  // Subject Performance Breakdown
  const subjectData = [
    { subject: 'Data Structures', attendancePct: 94.2, passRate: 98 },
    { subject: 'Machine Learning', attendancePct: 96.5, passRate: 95 },
    { subject: 'DS Lab', attendancePct: 98.1, passRate: 100 },
  ];

  // Attendance Status Distribution
  const pieData = [
    { name: 'Present', value: 88, color: '#10b981' },
    { name: 'Absent', value: 5, color: '#f43f5e' },
    { name: 'Late', value: 4, color: '#f59e0b' },
    { name: 'Medical Leave', value: 3, color: '#6366f1' },
  ];

  // Weekly Heatmap Matrix Simulation
  const heatMapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const heatMapPeriods = ['Period 1 (09:00)', 'Period 2 (10:15)', 'Period 3 (11:30)', 'Period 4 (01:30)'];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Predictive Analytics Engine</span>
          </div>
          <h2 className="text-xl font-black text-white">Class & Subject Analytics Dashboard</h2>
          <p className="text-xs text-slate-400 font-medium">
            Comparative analysis, monthly distribution, attendance trends, and period heatmap.
          </p>
        </div>
      </div>

      {/* Grid: Line Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Line Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Monthly Attendance Trend (%)
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-400">+2.4% Semester Growth</span>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis domain={[85, 100]} stroke="#94a3b8" fontSize={12} />
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
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart (1 Col) */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <PieIcon className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Status Distribution Ratio
            </h3>
          </div>

          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '16px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-white/5">
            {pieData.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-slate-300">{p.name}: {p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: Bar Chart & Weekly Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Bar Chart */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Subject Attendance vs Pass Rate (%)
            </h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '16px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Bar dataKey="attendancePct" name="Attendance %" fill="#38bdf8" radius={[8, 8, 0, 0]} />
                <Bar dataKey="passRate" name="Pass Rate %" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Attendance Heatmap Matrix */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Activity className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Weekly Period Attendance Heatmap
            </h3>
          </div>

          <div className="space-y-3 pt-2">
            {heatMapPeriods.map((period, pIdx) => (
              <div key={period} className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{period}</span>
                <div className="grid grid-cols-5 gap-2">
                  {heatMapDays.map((day, dIdx) => {
                    // Simulated score between 90 - 99
                    const score = 90 + ((pIdx * 3 + dIdx * 2) % 10);
                    return (
                      <div
                        key={day}
                        className={`p-2.5 rounded-xl text-center font-bold text-xs transition ${
                          score >= 96
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : score >= 92
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        <p className="text-[9px] text-slate-400 font-normal uppercase">{day}</p>
                        <p>{score}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
