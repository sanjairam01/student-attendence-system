import React, { useState } from 'react';
import {
  Search,
  Filter,
  FileSpreadsheet,
  FileText,
  Printer,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
} from 'lucide-react';
import { SAMPLE_DETAILED_RECORDS } from '../../data/reportsData';
import { DetailedReportRecord, ReportFilterState } from '../../types/reports';
import { PdfExportModal } from './PdfExportModal';

export const ReportGeneratorView: React.FC = () => {
  const [filters, setFilters] = useState<ReportFilterState>({
    role: 'admin',
    departmentId: '',
    courseId: '',
    semester: '',
    section: '',
    subjectId: '',
    facultyId: '',
    studentId: '',
    attendanceStatus: 'ALL',
    startDate: '2026-08-01',
    endDate: '2026-08-05',
    searchQuery: '',
    sortBy: 'date',
    sortOrder: 'desc',
    page: 1,
    pageSize: 10,
  });

  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  // Filter & Search Logic
  const filteredRecords = SAMPLE_DETAILED_RECORDS.filter((rec) => {
    const query = filters.searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      rec.studentName.toLowerCase().includes(query) ||
      rec.studentRoll.toLowerCase().includes(query) ||
      rec.department.toLowerCase().includes(query) ||
      rec.subject.toLowerCase().includes(query) ||
      rec.faculty.toLowerCase().includes(query);

    const matchesDept = !filters.departmentId || rec.department === filters.departmentId;
    const matchesStatus =
      filters.attendanceStatus === 'ALL' || rec.status === filters.attendanceStatus;

    return matchesSearch && matchesDept && matchesStatus;
  });

  // Sorting
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    let comparison = 0;
    if (filters.sortBy === 'date') comparison = a.date.localeCompare(b.date);
    else if (filters.sortBy === 'name') comparison = a.studentName.localeCompare(b.studentName);
    else if (filters.sortBy === 'rollNumber') comparison = a.studentRoll.localeCompare(b.studentRoll);

    return filters.sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedRecords.length / filters.pageSize) || 1;
  const paginatedRecords = sortedRecords.slice(
    (filters.page - 1) * filters.pageSize,
    filters.page * filters.pageSize
  );

  // Excel CSV Download
  const handleExportExcel = () => {
    const headers = ['Record ID', 'Date', 'Roll Number', 'Student Name', 'Department', 'Course', 'Subject', 'Faculty', 'Status', 'Marked Time', 'Method'];
    const csvRows = [headers.join(',')];

    sortedRecords.forEach((r) => {
      const row = [
        r.id,
        r.date,
        `"${r.studentRoll}"`,
        `"${r.studentName}"`,
        `"${r.department}"`,
        `"${r.course}"`,
        `"${r.subject}"`,
        `"${r.faculty}"`,
        r.status,
        r.markedTime,
        r.method,
      ];
      csvRows.push(row.join(','));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Apex_Attendance_Report_${filters.startDate}_to_${filters.endDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Action Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span>Institutional Attendance Report Engine</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Multi-tiered search filters, pagination, and multi-format PDF & Excel CSV export generators.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setPdfModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Official PDF</span>
          </button>

          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel (.CSV)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-white/10 flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Layout</span>
          </button>
        </div>
      </div>

      {/* Multi-Field Filters Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>Advanced Search & Query Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Global Search */}
          <div className="sm:col-span-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Query</label>
            <div className="relative mt-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Student, Roll, Dept, Subject..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value, page: 1 })}
                className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Department Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</label>
            <select
              value={filters.departmentId}
              onChange={(e) => setFilters({ ...filters, departmentId: e.target.value, page: 1 })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          {/* Attendance Status */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
            <select
              value={filters.attendanceStatus}
              onChange={(e) => setFilters({ ...filters, attendanceStatus: e.target.value as any, page: 1 })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
              <option value="LATE">Late</option>
              <option value="ON_LEAVE">On Leave</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Start Date</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-slate-300"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">End Date</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-slate-300"
            />
          </div>
        </div>
      </div>

      {/* Main Glass Data Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <p>
            Showing <span className="font-bold text-white">{paginatedRecords.length}</span> of{' '}
            <span className="font-bold text-white">{sortedRecords.length}</span> records
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-slate-400">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-slate-800 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white"
            >
              <option value="date">Date</option>
              <option value="name">Student Name</option>
              <option value="rollNumber">Roll Number</option>
            </select>
            <button
              onClick={() =>
                setFilters({
                  ...filters,
                  sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
                })
              }
              className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Roll No</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Dept & Course</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Faculty</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Time / Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {paginatedRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-mono text-slate-300">{rec.date}</td>
                  <td className="p-3.5 font-mono font-bold text-white">{rec.studentRoll}</td>
                  <td className="p-3.5 font-bold text-cyan-300">{rec.studentName}</td>
                  <td className="p-3.5 text-slate-300">
                    {rec.department} • {rec.semester} ({rec.section})
                  </td>
                  <td className="p-3.5 text-slate-300">{rec.subject}</td>
                  <td className="p-3.5 text-slate-400">{rec.faculty}</td>
                  <td className="p-3.5 font-mono font-bold">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] ${
                        rec.status === 'PRESENT'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : rec.status === 'ABSENT'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : rec.status === 'LATE'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-slate-400 text-[10px]">
                    {rec.markedTime} • {rec.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between pt-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Show:</span>
            <select
              value={filters.pageSize}
              onChange={(e) =>
                setFilters({ ...filters, pageSize: Number(e.target.value), page: 1 })
              }
              className="bg-slate-800 border border-white/10 rounded-xl px-2 py-1 text-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>per page</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={filters.page === 1}
              onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
              className="p-2 rounded-xl bg-slate-800 border border-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-slate-300 font-bold">
              Page {filters.page} of {totalPages}
            </span>
            <button
              disabled={filters.page === totalPages}
              onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
              className="p-2 rounded-xl bg-slate-800 border border-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Official PDF Generator Modal */}
      <PdfExportModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        filters={filters}
        records={sortedRecords}
      />
    </div>
  );
};
