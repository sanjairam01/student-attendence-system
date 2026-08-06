import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Filter,
  CheckCircle2,
  FileText,
  Building,
  BookOpen,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { FacultyClass, FacultySubject, FacultyReportFilter } from '../../types/faculty';

interface ReportsProps {
  classes: FacultyClass[];
  subjects: FacultySubject[];
}

export const FacultyReportsView: React.FC<ReportsProps> = ({ classes, subjects }) => {
  const [filter, setFilter] = useState<FacultyReportFilter>({
    reportType: 'monthly',
    classId: classes[0]?.id || '',
    subjectId: subjects[0]?.id || '',
    startDate: '2026-08-01',
    endDate: '2026-08-31',
    attendanceThresholdPct: 75,
  });

  const [generating, setGenerating] = useState(false);
  const [generatedSuccess, setGeneratedSuccess] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGeneratedSuccess(false);
    setTimeout(() => {
      setGenerating(false);
      setGeneratedSuccess(true);
    }, 1000);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,RollNo,StudentName,Subject,AttendancePercentage,Status\n' +
      '2023-CSE-001,Alexander Vance,CS201,96.5%,Good Standing\n' +
      '2023-CSE-002,Sophia Montgomery,CS201,98.2%,Good Standing\n' +
      '2023-CSE-003,Marcus Sterling,CS201,68.4%,Low Attendance Defaulter\n' +
      '2023-CSE-004,Elena Rostova,CS201,92.0%,Good Standing\n' +
      '2023-CSE-005,Liam Hemsworth,CS201,71.5%,Low Attendance Defaulter\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Faculty_Attendance_Report_${filter.reportType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Attendance Analytics & Report Generator</h2>
          <p className="text-xs text-slate-400 font-medium">
            Generate formal compliance reports in PDF or Excel for departmental filing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel (.CSV)</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/10 transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Filter Parameters Form */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Report Generator Configuration</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Report Scope</label>
            <select
              value={filter.reportType}
              onChange={(e) => setFilter({ ...filter, reportType: e.target.value as any })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white"
            >
              <option value="daily">Daily Attendance Summary</option>
              <option value="weekly">Weekly Attendance Report</option>
              <option value="monthly">Monthly Aggregate Report</option>
              <option value="semester">Semester Comprehensive</option>
              <option value="subject">Subject Specific Report</option>
              <option value="class">Class Section Report</option>
              <option value="student">Individual Student Audit</option>
              <option value="low_attendance">Low Attendance Defaulters (&lt;75%)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Class Section</label>
            <select
              value={filter.classId}
              onChange={(e) => setFilter({ ...filter, classId: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Assigned Subject</label>
            <select
              value={filter.subjectId}
              onChange={(e) => setFilter({ ...filter, subjectId: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Minimum Threshold %</label>
            <input
              type="number"
              value={filter.attendanceThresholdPct}
              onChange={(e) => setFilter({ ...filter, attendanceThresholdPct: Number(e.target.value) })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>{generating ? 'Processing Report Engine...' : 'Compile Report Preview'}</span>
        </button>
      </div>

      {/* Report Preview Document Card */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <h3 className="text-lg font-black text-white uppercase tracking-wider">
                Official Faculty Attendance Audit Document
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Apex Institute of Technology • Computer Science & Engineering
            </p>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono text-xs font-bold">
              Report Type: {filter.reportType.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Sample Generated Report Table */}
        <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3.5">Roll Number</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Class & Section</th>
                <th className="p-3.5">Lectures Held</th>
                <th className="p-3.5">Attended</th>
                <th className="p-3.5">Attendance %</th>
                <th className="p-3.5">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr className="hover:bg-white/5 transition">
                <td className="p-3.5 font-mono text-cyan-400 font-bold">2023-CSE-001</td>
                <td className="p-3.5 font-bold text-white">Alexander Vance</td>
                <td className="p-3.5">CSE 4th Sem A</td>
                <td className="p-3.5 font-mono">42</td>
                <td className="p-3.5 font-mono text-emerald-400">40</td>
                <td className="p-3.5 font-black text-emerald-400">95.2%</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    Compliant
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5 transition">
                <td className="p-3.5 font-mono text-cyan-400 font-bold">2023-CSE-002</td>
                <td className="p-3.5 font-bold text-white">Sophia Montgomery</td>
                <td className="p-3.5">CSE 4th Sem A</td>
                <td className="p-3.5 font-mono">42</td>
                <td className="p-3.5 font-mono text-emerald-400">41</td>
                <td className="p-3.5 font-black text-emerald-400">97.6%</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                    Compliant
                  </span>
                </td>
              </tr>

              <tr className="hover:bg-white/5 transition bg-rose-500/5">
                <td className="p-3.5 font-mono text-rose-400 font-bold">2023-CSE-003</td>
                <td className="p-3.5 font-bold text-white">Marcus Sterling</td>
                <td className="p-3.5">CSE 4th Sem A</td>
                <td className="p-3.5 font-mono">42</td>
                <td className="p-3.5 font-mono text-rose-400">28</td>
                <td className="p-3.5 font-black text-rose-400">66.6%</td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
                    Defaulter Notice Issued
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
