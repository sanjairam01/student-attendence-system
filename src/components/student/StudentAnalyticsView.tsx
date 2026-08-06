import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { SubjectAttendance } from '../../types/student';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';

interface StudentAnalyticsProps {
  subjects: SubjectAttendance[];
}

export const StudentAnalyticsView: React.FC<StudentAnalyticsProps> = ({ subjects }) => {
  const chartData = subjects.map((s) => ({
    name: s.subjectCode,
    percentage: s.percentage,
    fullName: s.subjectName,
  }));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Student Attendance Analytics</h2>
          <p className="text-xs text-slate-400 font-medium">
            Visual metrics, subject comparisons, and exam eligibility projections.
          </p>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cyan-400" />
          <span>Subject-wise Attendance Ratio Chart (%)</span>
        </h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.percentage >= 90 ? '#38bdf8' : entry.percentage >= 75 ? '#34d399' : '#f87171'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
