import React, { useState } from 'react';
import {
  Clock,
  Search,
  Filter,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
  Edit3,
  FileSpreadsheet,
  Building,
  BookOpen,
} from 'lucide-react';
import {
  FacultyAttendanceSession,
  FacultyClass,
  FacultySubject,
  FacultyAttendanceRecord,
} from '../../types/faculty';

interface HistoryProps {
  sessions: FacultyAttendanceSession[];
  classes: FacultyClass[];
  subjects: FacultySubject[];
  attendanceRecords: FacultyAttendanceRecord[];
  onDeleteSession?: (sessionId: string) => void;
}

export const FacultyAttendanceHistoryView: React.FC<HistoryProps> = ({
  sessions,
  classes,
  subjects,
  attendanceRecords,
  onDeleteSession,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('ALL');
  const [selectedSubjectId, setSelectedSubjectId] = useState('ALL');
  const [selectedDate, setSelectedDate] = useState('');
  const [viewMode, setViewMode] = useState<'sessions' | 'logs'>('sessions');

  const filteredSessions = sessions.filter((s) => {
    const matchesSearch =
      s.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subjectCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClassId === 'ALL' || s.classId === selectedClassId;
    const matchesSubject = selectedSubjectId === 'ALL' || s.subjectId === selectedSubjectId;
    const matchesDate = !selectedDate || s.date === selectedDate;

    return matchesSearch && matchesClass && matchesSubject && matchesDate;
  });

  const filteredRecords = attendanceRecords.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subjectName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClassId === 'ALL' || r.classId === selectedClassId;
    const matchesSubject = selectedSubjectId === 'ALL' || r.subjectId === selectedSubjectId;
    const matchesDate = !selectedDate || r.date === selectedDate;

    return matchesSearch && matchesClass && matchesSubject && matchesDate;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Attendance Audit History & Logs</h2>
          <p className="text-xs text-slate-400 font-medium">
            Complete historical record of submitted attendance sessions, QR logs, and individual student markers.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-800 border border-white/10">
          <button
            onClick={() => setViewMode('sessions')}
            className={`px-4 py-1.5 rounded-xl text-xs font-black transition ${
              viewMode === 'sessions'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Class Sessions ({filteredSessions.length})
          </button>
          <button
            onClick={() => setViewMode('logs')}
            className={`px-4 py-1.5 rounded-xl text-xs font-black transition ${
              viewMode === 'logs'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Student Log Entries ({filteredRecords.length})
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, class, or roll..."
              className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Class Filter */}
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
          >
            <option value="ALL">All Assigned Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Subject Filter */}
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code} - {s.name}
              </option>
            ))}
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
          />
        </div>
      </div>

      {/* View Mode 1: Sessions List */}
      {viewMode === 'sessions' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
          <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Class / Room</th>
                  <th className="p-3.5">Mode</th>
                  <th className="p-3.5">Present / Total</th>
                  <th className="p-3.5">Attendance %</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredSessions.map((sess) => (
                  <tr key={sess.id} className="hover:bg-white/5 transition">
                    <td className="p-3.5 font-mono text-white">
                      <p className="font-bold">{sess.date}</p>
                      <p className="text-[10px] text-slate-400">{sess.timeSlot}</p>
                    </td>

                    <td className="p-3.5 font-bold text-white">
                      <p>{sess.subjectName}</p>
                      <p className="text-[10px] text-cyan-400 font-mono">{sess.subjectCode}</p>
                    </td>

                    <td className="p-3.5">
                      <p className="font-bold">{sess.className}</p>
                      <p className="text-[10px] text-slate-400">Room {sess.roomNumber}</p>
                    </td>

                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {sess.mode}
                      </span>
                    </td>

                    <td className="p-3.5 font-bold text-white">
                      <span className="text-emerald-400">{sess.presentCount}</span> / {sess.totalStudents}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        ({sess.absentCount} Abs, {sess.lateCount} Late)
                      </span>
                    </td>

                    <td className="p-3.5 font-black text-cyan-300 text-sm">
                      {sess.attendancePct}%
                    </td>

                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => onDeleteSession && onDeleteSession(sess.id)}
                        className="p-1.5 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 border border-rose-500/20"
                        title="Delete Session Log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Mode 2: Detailed Log Records */}
      {viewMode === 'logs' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
          <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="p-3.5">Student Roll</th>
                  <th className="p-3.5">Student Name</th>
                  <th className="p-3.5">Subject</th>
                  <th className="p-3.5">Date & Slot</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Marked At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-white/5 transition">
                    <td className="p-3.5 font-mono text-cyan-400 font-bold">{rec.rollNo}</td>
                    <td className="p-3.5 font-bold text-white">{rec.studentName}</td>
                    <td className="p-3.5 text-slate-300">{rec.subjectName}</td>
                    <td className="p-3.5 font-mono text-slate-400">
                      {rec.date} ({rec.timeSlot})
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          rec.status === 'Present' || rec.status === 'Online Class'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : rec.status === 'Absent'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400">{rec.markedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
