import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminAnalyticsView: React.FC = () => {
  const attendanceTrendData = [
    { month: 'Jan', attendance: 92 },
    { month: 'Feb', attendance: 94 },
    { month: 'Mar', attendance: 91 },
    { month: 'Apr', attendance: 95 },
    { month: 'May', attendance: 93 },
  ];

  const deptPerformanceData = [
    { department: 'CSE', attendance: 95 },
    { department: 'ECE', attendance: 92 },
    { department: 'AIDS', attendance: 96 },
    { department: 'MECH', attendance: 88 },
  ];

  const statusDistributionData = [
    { name: 'Present', value: 288, color: '#10b981' },
    { name: 'Absent', value: 16, color: '#f43f5e' },
    { name: 'Late', value: 12, color: '#f59e0b' },
    { name: 'On Leave', value: 4, color: '#3b82f6' },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-1">
        <h2 className="text-lg font-black text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>Institutional Analytics & Data Visualizations</span>
        </h2>
        <p className="text-xs text-slate-400">
          In-depth analytical trend metrics for department attendance and student participation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Monthly Attendance Percentage Trend</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Departmental Attendance Comparison</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[80, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                />
                <Bar dataKey="attendance" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-400" />
          <span>Today's Live Student Attendance Distribution</span>
        </h3>

        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={statusDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
              >
                {statusDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
              />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-center gap-6 text-xs font-bold">
          {statusDistributionData.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-slate-300">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
