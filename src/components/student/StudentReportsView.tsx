import React, { useState } from 'react';
import { FileText, Download, Printer, Filter, Calendar } from 'lucide-react';
import { SubjectAttendance, DailyAttendanceRecord } from '../../types/student';

interface StudentReportsProps {
  subjects: SubjectAttendance[];
  dailyRecords: DailyAttendanceRecord[];
}

export const StudentReportsView: React.FC<StudentReportsProps> = ({ subjects, dailyRecords }) => {
  const [reportType, setReportType] = useState<'monthly' | 'semester'>('monthly');

  const handleDownloadPDF = () => {
    alert('Exporting Official Student Attendance Statement (PDF Format)...');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Student Academic Reports</h2>
          <p className="text-xs text-slate-400 font-medium">
            Generate and export official attendance transcripts and monthly compliance certificates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-white/10 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Statement (PDF)</span>
          </button>
        </div>
      </div>

      {/* Report Summary Document Sheet */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl space-y-6 shadow-2xl">
        <div className="pb-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
              APEX INSTITUTE OF TECHNOLOGY • OFFICIAL TRANSCRIPT
            </span>
            <h3 className="text-2xl font-black text-white">Attendance Performance Record</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Generated: August 05, 2026</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800 border border-white/10 text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Compliance Status</span>
            <span className="text-sm font-black text-emerald-400 font-mono">Eligible for Exams (&gt;75%)</span>
          </div>
        </div>

        {/* Subjects Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-white uppercase tracking-wider">Subject-Wise Performance Summary</h4>

          <div className="overflow-x-auto border border-white/10 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="p-3.5">Code</th>
                  <th className="p-3.5">Subject Title</th>
                  <th className="p-3.5">Instructor</th>
                  <th className="p-3.5">Credits</th>
                  <th className="p-3.5">Lectures</th>
                  <th className="p-3.5">Attended</th>
                  <th className="p-3.5">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {subjects.map((sub) => (
                  <tr key={sub.id}>
                    <td className="p-3.5 font-mono text-cyan-300 font-bold">{sub.subjectCode}</td>
                    <td className="p-3.5 font-bold text-white">{sub.subjectName}</td>
                    <td className="p-3.5">{sub.facultyName}</td>
                    <td className="p-3.5">{sub.credits}</td>
                    <td className="p-3.5">{sub.totalClasses}</td>
                    <td className="p-3.5">{sub.attendedClasses}</td>
                    <td className="p-3.5 font-mono font-black text-cyan-400">{sub.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
