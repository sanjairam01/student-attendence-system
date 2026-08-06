import React, { useState } from 'react';
import {
  CheckSquare,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  FileSpreadsheet,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { SubjectAttendance, DailyAttendanceRecord } from '../../types/student';

interface StudentAttendanceProps {
  subjects: SubjectAttendance[];
  dailyRecords: DailyAttendanceRecord[];
}

export const StudentAttendanceView: React.FC<StudentAttendanceProps> = ({
  subjects,
  dailyRecords,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredRecords = dailyRecords.filter((record) => {
    const matchesSubject =
      selectedSubject === 'ALL' || record.subjectCode === selectedSubject;
    const matchesStatus =
      selectedStatus === 'ALL' || record.status === selectedStatus;
    const matchesSearch =
      record.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.facultyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.date.includes(searchQuery);

    return matchesSubject && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">My Attendance Audit Log</h2>
          <p className="text-xs text-slate-400 font-medium">
            Complete subject-wise breakdown, attendance status logs, and verified timestamps.
          </p>
        </div>
      </div>

      {/* Subject Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md font-mono text-[10px] font-black bg-cyan-500/10 text-cyan-300">
                {sub.subjectCode}
              </span>
              <span
                className={`text-sm font-black font-mono ${
                  sub.percentage >= 90
                    ? 'text-emerald-400'
                    : sub.percentage >= 75
                    ? 'text-cyan-400'
                    : 'text-rose-400'
                }`}
              >
                {sub.percentage}%
              </span>
            </div>

            <div>
              <h4 className="text-sm font-black text-white">{sub.subjectName}</h4>
              <p className="text-xs text-slate-400 font-medium">{sub.facultyName}</p>
            </div>

            <div className="pt-2 border-t border-white/5 grid grid-cols-4 gap-1 text-center text-[10px] font-bold">
              <div className="p-1 rounded bg-slate-800 text-emerald-300">
                <p className="text-slate-400 text-[8px]">Present</p>
                <p>{sub.attendedClasses}</p>
              </div>
              <div className="p-1 rounded bg-slate-800 text-rose-300">
                <p className="text-slate-400 text-[8px]">Absent</p>
                <p>{sub.absentClasses}</p>
              </div>
              <div className="p-1 rounded bg-slate-800 text-amber-300">
                <p className="text-slate-400 text-[8px]">Late</p>
                <p>{sub.lateClasses}</p>
              </div>
              <div className="p-1 rounded bg-slate-800 text-cyan-300">
                <p className="text-slate-400 text-[8px]">Medical</p>
                <p>{sub.medicalLeaveClasses}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Controls Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search date, subject, faculty..."
              className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
            >
              <option value="ALL">All Registered Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.subjectCode}>
                  {s.subjectCode} - {s.subjectName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
            >
              <option value="ALL">All Attendance Statuses</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
              <option value="Late">Late Only</option>
              <option value="Medical">Medical Leave</option>
              <option value="Holiday">Holiday</option>
            </select>
          </div>
        </div>
      </div>

      {/* Daily Records Timeline Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
          Attendance Timeline & Verifications ({filteredRecords.length})
        </h3>

        <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3.5">Date & Day</th>
                <th className="p-3.5">Time Slot</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Faculty</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Remarks / Audit Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-white/5 transition">
                  <td className="p-3.5 font-mono text-cyan-300 font-bold">
                    {r.date} <span className="text-slate-500 font-normal">({r.dayOfWeek})</span>
                  </td>
                  <td className="p-3.5 font-mono">{r.timeSlot}</td>
                  <td className="p-3.5 font-bold text-white">
                    {r.subjectName} <span className="text-slate-400 font-mono text-[10px]">({r.subjectCode})</span>
                  </td>
                  <td className="p-3.5">{r.facultyName}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        r.status === 'Present'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : r.status === 'Absent'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : r.status === 'Late'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400 text-[11px]">{r.remarks || 'Standard Automated Log'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
