import React, { useState } from 'react';
import { FileText, Download, Printer, Filter, AlertTriangle, CheckCircle2, Building2 } from 'lucide-react';
import { Student, Department } from '../../types/admin';

interface ReportsProps {
  students: Student[];
  departments: Department[];
}

export const AdminReportsView: React.FC<ReportsProps> = ({ students, departments }) => {
  const [reportType, setReportType] = useState<'summary' | 'defaulters' | 'department'>('summary');
  const [selectedDept, setSelectedDept] = useState('ALL');

  const defaulters = students.filter((s) => s.attendancePct < 75);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Institutional Attendance Reports & Compliance</span>
          </h2>
          <p className="text-xs text-slate-400">
            Generate formal attendance reports, defaulter lists (&lt;75%), and department summaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-bold flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Sub-tab options */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10">
        <button
          onClick={() => setReportType('summary')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            reportType === 'summary' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400'
          }`}
        >
          Attendance Summary Report
        </button>
        <button
          onClick={() => setReportType('defaulters')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            reportType === 'defaulters' ? 'bg-rose-500 text-white font-black' : 'text-slate-400'
          }`}
        >
          Attendance Defaulters (&lt;75%)
        </button>
        <button
          onClick={() => setReportType('department')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            reportType === 'department' ? 'bg-indigo-500 text-white font-black' : 'text-slate-400'
          }`}
        >
          Departmental Compliance
        </button>
      </div>

      {/* Summary Report View */}
      {reportType === 'summary' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="font-black text-white text-base">Comprehensive Student Attendance Overview</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-[10px] font-black text-slate-400">
                <tr>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Semester</th>
                  <th className="py-3 px-4">Attendance %</th>
                  <th className="py-3 px-4">Eligibility Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {students.map((s) => (
                  <tr key={s.id}>
                    <td className="py-3 px-4 font-mono font-bold text-slate-200">{s.rollNo}</td>
                    <td className="py-3 px-4 font-extrabold text-white">{s.fullName}</td>
                    <td className="py-3 px-4">{s.departmentName}</td>
                    <td className="py-3 px-4">Sem {s.semester}</td>
                    <td className="py-3 px-4 font-black">{s.attendancePct}%</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-black ${
                          s.attendancePct >= 75
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {s.attendancePct >= 75 ? 'Eligible for Exams' : 'Detained / Warning'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Defaulters Report View */}
      {reportType === 'defaulters' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-rose-500/30 backdrop-blur-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span>Defaulters List (&lt;75% Attendance Threshold)</span>
            </h3>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-extrabold text-xs">
              {defaulters.length} Defaulter Students
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 uppercase text-[10px] font-black text-rose-400">
                <tr>
                  <th className="py-3 px-4">Roll No</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4">Attendance %</th>
                  <th className="py-3 px-4">Parent Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {defaulters.map((s) => (
                  <tr key={s.id} className="bg-rose-500/5">
                    <td className="py-3 px-4 font-mono font-bold text-rose-300">{s.rollNo}</td>
                    <td className="py-3 px-4 font-extrabold text-white">{s.fullName}</td>
                    <td className="py-3 px-4">{s.departmentName}</td>
                    <td className="py-3 px-4">{s.email}</td>
                    <td className="py-3 px-4 font-black text-rose-400">{s.attendancePct}%</td>
                    <td className="py-3 px-4 text-amber-300 font-bold">{s.parentPhone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Departmental View */}
      {reportType === 'department' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
          <h3 className="font-black text-white text-base">Departmental Compliance Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {departments.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                <h4 className="font-extrabold text-white text-sm">{d.name}</h4>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Enrolled Students:</span>
                  <span className="font-bold text-white">80</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Average Attendance:</span>
                  <span className="font-bold text-emerald-400">93.5%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
