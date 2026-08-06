import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Printer,
  Download,
  AlertTriangle,
  PieChart as PieChartIcon,
  Flame,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Department, Student } from '../../types/superadmin';

interface ReportsAnalyticsProps {
  mode: 'reports' | 'analytics';
  setMode: (mode: 'reports' | 'analytics') => void;
  departments: Department[];
  students: Student[];
}

export const ReportsAndAnalyticsView: React.FC<ReportsAnalyticsProps> = ({
  mode,
  setMode,
  departments,
  students,
}) => {
  const [reportType, setReportType] = useState('Low Attendance / Defaulter List');
  const defaulters = students.filter((s) => s.attendancePct < 75);

  const handleExportPDF = () => {
    alert(`Generating PDF Report for [${reportType}]... File download started.`);
  };

  const handleExportExcel = () => {
    alert(`Generating Excel (.xlsx) Export for [${reportType}]... File download started.`);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode('reports')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              mode === 'reports'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Master Institutional Reports</span>
          </button>
          <button
            onClick={() => setMode('analytics')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              mode === 'analytics'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Deep Analytics & Heatmaps</span>
          </button>
        </div>

        {mode === 'reports' && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-semibold flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          </div>
        )}
      </div>

      {/* REPORTS MODULE */}
      {mode === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                Select Report Generator Type
              </h3>
              <div className="space-y-1.5">
                {[
                  'Daily Attendance Report',
                  'Weekly Summary Report',
                  'Monthly Attendance Report',
                  'Semester Final Audit',
                  'Department wise Report',
                  'Faculty Performance Audit',
                  'Low Attendance / Defaulter List',
                ].map((rep) => (
                  <button
                    key={rep}
                    onClick={() => setReportType(rep)}
                    className={`w-full text-left p-3 rounded-2xl text-xs font-semibold transition border ${
                      reportType === rep
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-md'
                        : 'bg-white/5 text-slate-300 border-transparent hover:bg-white/10'
                    }`}
                  >
                    {rep}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{reportType}</h3>
                  <p className="text-xs text-slate-400">Generated on {new Date().toLocaleDateString()}</p>
                </div>
                <button onClick={() => window.print()} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300">
                  <Printer className="w-4 h-4" />
                </button>
              </div>

              {reportType.includes('Defaulter') ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-between">
                    <span className="font-bold">Defaulter Threshold: &lt;75% Attendance</span>
                    <span>Total Defaulters: {defaulters.length}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-200">
                      <thead className="border-b border-white/10 text-slate-400 font-semibold">
                        <tr>
                          <th className="p-3">Roll No</th>
                          <th className="p-3">Student Name</th>
                          <th className="p-3">Department</th>
                          <th className="p-3">Attendance %</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {defaulters.map((d) => (
                          <tr key={d.id}>
                            <td className="p-3 font-mono text-cyan-300">{d.rollNo}</td>
                            <td className="p-3 font-bold text-white">{d.fullName}</td>
                            <td className="p-3 text-slate-300">{d.department}</td>
                            <td className="p-3 font-bold text-rose-400">{d.attendancePct}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 italic space-y-2">
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-cyan-400/50" />
                  <p>Report compiled successfully. Click Export PDF or Excel to view complete dataset.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ANALYTICS MODULE */}
      {mode === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Performance Bar Chart */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span>Department Performance Matrix</span>
              </h3>
              <div className="space-y-3">
                {departments.map((d) => (
                  <div key={d.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">{d.name}</span>
                      <span className="text-emerald-400 font-bold">96.5% Avg</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full w-[96%]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Heat Map Widget */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                <Flame className="w-4 h-4 text-amber-400" />
                <span>Monthly Attendance Heat Map (August 2026)</span>
              </h3>
              <div className="grid grid-cols-7 gap-2 pt-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const isHigh = day % 7 !== 0 && day % 6 !== 0;
                  return (
                    <div
                      key={day}
                      className={`p-2 rounded-xl text-center font-bold text-xs ${
                        isHigh
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      <span>{day}</span>
                      <span className="text-[9px] block text-slate-400">{isHigh ? '96%' : '78%'}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
