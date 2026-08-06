import React, { useState } from 'react';
import { Building, Users, MapPin, CheckCircle2, Search, X, Eye, AlertTriangle } from 'lucide-react';
import { FacultyClass, StudentForFaculty } from '../../types/faculty';

interface ClassesProps {
  classes: FacultyClass[];
  students: StudentForFaculty[];
  onMarkAttendanceForClass: (classId: string) => void;
}

export const FacultyClassesView: React.FC<ClassesProps> = ({
  classes,
  students,
  onMarkAttendanceForClass,
}) => {
  const [selectedClass, setSelectedClass] = useState<FacultyClass | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const classStudents = selectedClass
    ? students.filter(
        (s) =>
          s.classId === selectedClass.id &&
          (s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white">Assigned Student Classes ({classes.length})</h2>
          <p className="text-xs text-slate-400 font-medium">
            Sections and student groups assigned to your lecture schedule.
          </p>
        </div>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <div
            key={cls.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl text-xs font-black uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                Section {cls.section} • Semester {cls.semester}
              </span>
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Room {cls.roomNumber}
              </span>
            </div>

            <div>
              <h3 className="text-xl font-black text-white">{cls.name}</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">{cls.departmentName}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Enrolled Roster</p>
                <p className="text-xl font-black text-white mt-0.5">{cls.studentCount} Students</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Class Avg Attendance</p>
                <p className="text-xl font-black text-emerald-400 mt-0.5">{cls.avgAttendancePct}%</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedClass(cls)}
                className="flex-1 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/10 transition flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>View Class Roster</span>
              </button>

              <button
                onClick={() => onMarkAttendanceForClass(cls.id)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Attendance</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Class Student Roster Overlay Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl max-h-[85vh] rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-6 flex flex-col space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-black text-white">{selectedClass.name} — Student Roster</h3>
                <p className="text-xs text-slate-400 font-medium">
                  {selectedClass.studentCount} enrolled students • Room {selectedClass.roomNumber}
                </p>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Roster Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search student by name or roll number..."
                className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Roster Table */}
            <div className="flex-1 overflow-y-auto custom-scrollbar border border-white/5 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase sticky top-0">
                  <tr>
                    <th className="p-3">Roll No</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Parent Contact</th>
                    <th className="p-3 text-right">Attendance %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {classStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-white/5 transition">
                      <td className="p-3 font-mono text-cyan-400 font-bold">{s.rollNo}</td>
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <span>{s.fullName}</span>
                        {s.isLowAttendanceWarning && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <AlertTriangle className="w-2.5 h-2.5" /> Defaulter
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-400">{s.email}</td>
                      <td className="p-3 font-mono">{s.parentPhone}</td>
                      <td className="p-3 text-right font-black">
                        <span
                          className={s.isLowAttendanceWarning ? 'text-rose-400' : 'text-emerald-400'}
                        >
                          {s.attendancePct}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
