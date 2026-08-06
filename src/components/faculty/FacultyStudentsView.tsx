import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  AlertTriangle,
  Mail,
  Phone,
  Building,
  Eye,
  X,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { StudentForFaculty, FacultyClass } from '../../types/faculty';

interface StudentsProps {
  students: StudentForFaculty[];
  classes: FacultyClass[];
}

export const FacultyStudentsView: React.FC<StudentsProps> = ({ students, classes }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('ALL');
  const [showLowOnly, setShowLowOnly] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentForFaculty | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClass = selectedClassId === 'ALL' || s.classId === selectedClassId;
    const matchesWarning = !showLowOnly || s.isLowAttendanceWarning;

    return matchesSearch && matchesClass && matchesWarning;
  });

  const lowAttendanceCount = students.filter((s) => s.isLowAttendanceWarning).length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Enrolled Students Roster ({students.length})</h2>
          <p className="text-xs text-slate-400 font-medium">
            Manage student academic profiles, track attendance deficits, and inspect contact records.
          </p>
        </div>

        {lowAttendanceCount > 0 && (
          <div className="px-3.5 py-1.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-black text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>{lowAttendanceCount} Defaulters (&lt;75%)</span>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search student by name, roll, or email..."
              className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
          >
            <option value="ALL">All Class Sections</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 px-3 py-2 bg-slate-800 border border-white/10 rounded-2xl cursor-pointer text-xs font-bold text-slate-300">
            <input
              type="checkbox"
              checked={showLowOnly}
              onChange={(e) => setShowLowOnly(e.target.checked)}
              className="w-4 h-4 accent-rose-500 rounded"
            />
            <span>Filter Low Attendance Defaulters (&lt;75%)</span>
          </label>
        </div>
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((s) => (
          <div
            key={s.id}
            className={`p-6 rounded-3xl bg-slate-900/80 border transition shadow-xl space-y-4 flex flex-col justify-between ${
              s.isLowAttendanceWarning ? 'border-rose-500/30' : 'border-white/10 hover:border-cyan-500/30'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-xl text-[10px] font-mono font-black bg-slate-800 text-cyan-400 border border-white/10">
                  {s.rollNo}
                </span>

                {s.isLowAttendanceWarning ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Defaulter
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/10 text-emerald-300">
                    Good Standing
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{s.fullName}</h3>
                <p className="text-xs text-slate-400 font-medium">{s.className}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Total Attendance</span>
                <span
                  className={`text-xl font-black ${
                    s.isLowAttendanceWarning ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {s.attendancePct}%
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(s)}
              className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/10 transition flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Inspect Profile & Contacts</span>
            </button>
          </div>
        ))}
      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-black text-white">Student Academic File</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-800/50 space-y-1">
                <p className="text-sm font-black text-white">{selectedStudent.fullName}</p>
                <p className="font-mono text-cyan-400">Roll No: {selectedStudent.rollNo}</p>
                <p className="text-slate-400">Admission ID: {selectedStudent.admissionNo}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-2xl bg-slate-800/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Class & Section</p>
                  <p className="font-bold text-white mt-0.5">{selectedStudent.className}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-800/50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Attendance %</p>
                  <p
                    className={`font-black text-lg mt-0.5 ${
                      selectedStudent.isLowAttendanceWarning ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {selectedStudent.attendancePct}%
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/50 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email: {selectedStudent.email}
                </p>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-indigo-400" /> Student Phone: {selectedStudent.phone}
                </p>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rose-400" /> Parent Phone: {selectedStudent.parentPhone}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
