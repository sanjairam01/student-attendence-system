import React, { useRef } from 'react';
import { X, Printer, Download, FileSpreadsheet, ShieldCheck, CheckCircle, Award } from 'lucide-react';
import { DetailedReportRecord, ReportFilterState } from '../../types/reports';

interface PdfExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ReportFilterState;
  records: DetailedReportRecord[];
  title?: string;
}

export const PdfExportModal: React.FC<PdfExportModalProps> = ({
  isOpen,
  onClose,
  filters,
  records,
  title = 'OFFICIAL INSTITUTIONAL ATTENDANCE STATEMENT',
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    // Triggers direct browser print-to-pdf standard
    window.print();
  };

  const totalPresent = records.filter((r) => r.status === 'PRESENT').length;
  const totalAbsent = records.filter((r) => r.status === 'ABSENT').length;
  const totalLate = records.filter((r) => r.status === 'LATE').length;
  const totalLeave = records.filter((r) => r.status === 'ON_LEAVE').length;
  const totalRecords = records.length || 1;
  const overallPercentage = ((totalPresent / totalRecords) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Controls Header */}
        <div className="p-4 bg-slate-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Official Report PDF & Print Generator</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable A4 Container */}
        <div className="p-8 overflow-y-auto bg-white text-slate-900 custom-scrollbar print-area" ref={printRef}>
          {/* Official College Header */}
          <div className="border-b-2 border-slate-900 pb-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-2xl font-mono shrink-0 shadow-lg">
                APEX
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 uppercase tracking-wide">
                  APEX INSTITUTE OF TECHNOLOGY & SCIENCE
                </h1>
                <p className="text-xs text-slate-600 font-semibold">
                  Accredited Grade A+ • Autonomous Engineering Campus
                </p>
                <p className="text-[10px] text-slate-500 font-mono">
                  Affiliated with National University • Office of the Academic Registrar
                </p>
              </div>
            </div>

            <div className="text-right font-mono text-[11px] text-slate-600 space-y-1">
              <p><span className="font-bold text-slate-900">Doc Ref:</span> APX-ATT-2026-08</p>
              <p><span className="font-bold text-slate-900">Generated On:</span> {new Date().toLocaleDateString('en-US', { dateStyle: 'medium' })}</p>
              <p><span className="font-bold text-slate-900">Authority:</span> Central Attendance Cell</p>
            </div>
          </div>

          {/* Document Title Banner */}
          <div className="my-6 p-4 rounded-xl bg-slate-100 border border-slate-300 text-center space-y-1">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">{title}</h2>
            <p className="text-xs text-slate-600 font-medium font-mono">
              Scope: {filters.departmentId || 'All Departments'} • Course: {filters.courseId || 'All Courses'} • Date: {filters.startDate} to {filters.endDate}
            </p>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-5 gap-3 my-6 font-mono text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Total Records</p>
              <p className="text-base font-black text-slate-900 mt-1">{totalRecords}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-[10px] text-emerald-700 font-bold uppercase">Present</p>
              <p className="text-base font-black text-emerald-800 mt-1">{totalPresent}</p>
            </div>
            <div className="p-3 rounded-xl bg-red-50 border border-red-200">
              <p className="text-[10px] text-red-700 font-bold uppercase">Absent</p>
              <p className="text-base font-black text-red-800 mt-1">{totalAbsent}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-[10px] text-amber-700 font-bold uppercase">Late</p>
              <p className="text-base font-black text-amber-800 mt-1">{totalLate}</p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
              <p className="text-[10px] text-cyan-700 font-bold uppercase">Attendance %</p>
              <p className="text-base font-black text-cyan-800 mt-1">{overallPercentage}%</p>
            </div>
          </div>

          {/* Detailed Statement Table */}
          <table className="w-full text-left text-xs border-collapse my-6">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[10px] uppercase">
                <th className="p-2.5 border border-slate-800">Date</th>
                <th className="p-2.5 border border-slate-800">Roll No</th>
                <th className="p-2.5 border border-slate-800">Student Name</th>
                <th className="p-2.5 border border-slate-800">Dept</th>
                <th className="p-2.5 border border-slate-800">Subject</th>
                <th className="p-2.5 border border-slate-800">Status</th>
                <th className="p-2.5 border border-slate-800">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-[11px] font-medium">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50">
                  <td className="p-2 border border-slate-200 font-mono text-slate-600">{rec.date}</td>
                  <td className="p-2 border border-slate-200 font-mono font-bold text-slate-800">{rec.studentRoll}</td>
                  <td className="p-2 border border-slate-200 font-bold text-slate-900">{rec.studentName}</td>
                  <td className="p-2 border border-slate-200 text-slate-700">{rec.department}</td>
                  <td className="p-2 border border-slate-200 text-slate-700">{rec.subject}</td>
                  <td className="p-2 border border-slate-200 font-mono font-bold">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        rec.status === 'PRESENT'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rec.status === 'ABSENT'
                          ? 'bg-red-100 text-red-800'
                          : rec.status === 'LATE'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-2 border border-slate-200 font-mono text-[10px] text-slate-500">
                    {rec.method} ({rec.markedTime})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Signature & Verification Block */}
          <div className="pt-12 mt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
            <div className="space-y-10">
              <div className="border-b border-slate-400 w-48 pb-1" />
              <div>
                <p className="font-bold text-slate-900">Prepared by Attendance Officer</p>
                <p className="text-[10px] text-slate-500 font-mono">Verified Biometric Audit System</p>
              </div>
            </div>

            <div className="text-right space-y-10 flex flex-col items-end">
              <div className="border-b border-slate-400 w-48 pb-1 text-center font-mono text-[10px] text-slate-400">
                [SEAL & STAMP]
              </div>
              <div>
                <p className="font-bold text-slate-900">Dean of Academic Affairs</p>
                <p className="text-[10px] text-slate-500 font-mono">Apex Institute Controller</p>
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-center font-mono text-[9px] text-slate-400">
            This document is computer-generated from the Apex Smart Attendance System. No physical signature is required for electronic validation.
          </div>
        </div>
      </div>
    </div>
  );
};
