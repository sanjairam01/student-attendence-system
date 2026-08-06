import React, { useState } from 'react';
import {
  AlertTriangle,
  Flame,
  TrendingUp,
  UserX,
  PhoneCall,
  Search,
  Filter,
  ShieldAlert,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { DEFAULTERS_LIST, ATTENDANCE_HEATMAP_DATA } from '../../data/reportsData';
import { DefaulterStudent } from '../../types/reports';

export const AdvancedAnalyticsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | 'CRITICAL_RISK' | 'SEVERE_DEFAULTER' | 'WARNING'>('ALL');

  const filteredDefaulters = DEFAULTERS_LIST.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || student.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getHeatmapColor = (pct: number) => {
    if (pct >= 90) return 'bg-emerald-500/80 text-white border-emerald-400/40';
    if (pct >= 80) return 'bg-emerald-600/50 text-emerald-200 border-emerald-500/30';
    if (pct >= 75) return 'bg-amber-500/60 text-amber-100 border-amber-400/30';
    if (pct >= 70) return 'bg-orange-600/70 text-orange-100 border-orange-500/30';
    return 'bg-red-600/80 text-white border-red-400/40';
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-amber-400" />
            <span>Advanced Risk Telemetry & Attendance Heatmap</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            AI-assisted defaulter identification (&lt;75% mandatory cutoff) and temporal attendance density analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>{DEFAULTERS_LIST.length} Active Defaulters</span>
          </div>
        </div>
      </div>

      {/* Attendance Density Heatmap Matrix */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span>Weekly Temporal Attendance Density Heatmap</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Attendance percentages mapped across days of the week and lecture hours.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> 90%+ Optimal</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500" /> 75-80% Warning</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500" /> &lt;70% Critical</span>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-center border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="text-xs font-mono font-bold text-slate-400 p-2 text-left">Day / Time</th>
                {timeSlots.map((slot) => (
                  <th key={slot} className="text-xs font-mono font-bold text-slate-300 p-2 min-w-[100px]">
                    {slot}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day) => (
                <tr key={day}>
                  <td className="text-xs font-bold text-white font-mono p-2 text-left bg-slate-800/40 rounded-xl">
                    {day}
                  </td>
                  {timeSlots.map((slot) => {
                    const cell = ATTENDANCE_HEATMAP_DATA.find((c) => c.day === day && c.timeSlot === slot);
                    const pct = cell ? cell.attendancePct : 80;
                    return (
                      <td key={slot} className="p-1">
                        <div
                          className={`p-3 rounded-2xl border text-xs font-mono font-bold flex flex-col items-center justify-center transition shadow-lg ${getHeatmapColor(
                            pct
                          )}`}
                        >
                          <span>{pct}%</span>
                          <span className="text-[9px] opacity-75 font-normal">{cell?.count || 400} Std</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Defaulter Audit List Section (<75% Attendance) */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <UserX className="w-5 h-5 text-red-400" />
              <span>Institutional Defaulter Roster (&lt;75% Attendance)</span>
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Students failing mandatory attendance requirements requiring immediate academic intervention.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search defaulter name, roll..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-slate-300 font-medium"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL_RISK">Critical Risk (&lt;65%)</option>
              <option value="SEVERE_DEFAULTER">Severe Defaulter (65-70%)</option>
              <option value="WARNING">Warning Zone (70-75%)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5">Roll Number</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Dept & Course</th>
                <th className="p-3.5">Classes (Att / Total)</th>
                <th className="p-3.5">Attendance %</th>
                <th className="p-3.5">Guardian Contact</th>
                <th className="p-3.5">Risk Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {filteredDefaulters.map((student) => (
                <tr key={student.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono text-slate-300">{student.rollNumber}</td>
                  <td className="p-3.5 text-white font-bold">{student.fullName}</td>
                  <td className="p-3.5 text-slate-300">
                    {student.department} • {student.semester} ({student.section})
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">
                    {student.attendedClasses} / {student.totalClasses}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-red-400">{student.attendancePct}%</td>
                  <td className="p-3.5 text-slate-300 flex items-center gap-1.5 font-mono">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                    <span>{student.parentPhone}</span>
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        student.status === 'CRITICAL_RISK'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : student.status === 'SEVERE_DEFAULTER'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {student.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
