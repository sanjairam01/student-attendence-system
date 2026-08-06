import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  Search,
  Filter,
  Download,
  X,
  Check,
  Edit2,
  Trash2,
} from 'lucide-react';
import { AttendanceRecord, Student, Subject, ClassGroup } from '../../types/admin';

interface AttendanceProps {
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  students: Student[];
  subjects: Subject[];
  classes: ClassGroup[];
}

export const AdminAttendanceManagement: React.FC<AttendanceProps> = ({
  attendanceRecords,
  setAttendanceRecords,
  students,
  subjects,
  classes,
}) => {
  const [selectedDate, setSelectedDate] = useState('2025-05-12');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Batch Mark Modal
  const [isMarkModalOpen, setIsMarkModalOpen] = useState(false);
  const [batchClassId, setBatchClassId] = useState(classes[0]?.id || '');
  const [batchSubjectId, setBatchSubjectId] = useState(subjects[0]?.id || '');
  const [batchDate, setBatchDate] = useState('2025-05-12');
  const [studentStatuses, setStudentStatuses] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Leave'>>({});

  const handleOpenMarkModal = () => {
    // Populate all students as Present by default
    const initial: Record<string, 'Present' | 'Absent' | 'Late' | 'Leave'> = {};
    students.forEach((s) => {
      initial[s.id] = 'Present';
    });
    setStudentStatuses(initial);
    setIsMarkModalOpen(true);
  };

  const handleSaveBatchAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const clsObj = classes.find((c) => c.id === batchClassId);
    const subObj = subjects.find((s) => s.id === batchSubjectId);

    const newRecords: AttendanceRecord[] = students.map((std) => ({
      id: `att-${Date.now()}-${std.id}`,
      date: batchDate,
      studentId: std.id,
      studentName: std.fullName,
      rollNo: std.rollNo,
      classId: batchClassId,
      className: clsObj?.name || 'CSE 4th Sem A',
      subjectId: batchSubjectId,
      subjectName: subObj?.name || 'Data Structures',
      status: studentStatuses[std.id] || 'Present',
      markedByFacultyName: 'Admin Override',
      remarks: 'Batch Logged',
    }));

    setAttendanceRecords((prev) => [...newRecords, ...prev]);
    setIsMarkModalOpen(false);
  };

  const handleUpdateRecordStatus = (id: string, nextStatus: 'Present' | 'Absent' | 'Late' | 'Leave') => {
    setAttendanceRecords((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status: nextStatus } : rec))
    );
  };

  const handleDeleteRecord = (id: string) => {
    setAttendanceRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredRecords = attendanceRecords.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || r.classId === selectedClass;
    const matchesStatus = selectedStatus === 'ALL' || r.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span>Attendance Master Registry</span>
          </h2>
          <p className="text-xs text-slate-400">
            View, override, and batch register daily student attendance records across subjects.
          </p>
        </div>

        <button
          onClick={handleOpenMarkModal}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Batch Mark Attendance</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student name or roll no..."
            className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Late">Late</option>
          <option value="Leave">On Leave</option>
        </select>
      </div>

      {/* Attendance Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase text-[10px] font-extrabold text-slate-400 border-b border-white/10">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Class & Subject</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Marked By</th>
                <th className="py-3.5 px-4 text-right">Quick Status Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400 italic">
                    No attendance records found for the filter parameters.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-300">{r.date}</td>
                    <td className="py-3.5 px-4">
                      <p className="font-extrabold text-white">{r.studentName}</p>
                      <p className="text-[10px] text-cyan-400 font-mono">{r.rollNo}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="text-white font-bold">{r.subjectName}</p>
                      <p className="text-[10px] text-slate-400">{r.className}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                          r.status === 'Present'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : r.status === 'Absent'
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : r.status === 'Late'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{r.markedByFacultyName}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleUpdateRecordStatus(r.id, 'Present')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'Present'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 hover:text-emerald-400'
                          }`}
                        >
                          P
                        </button>
                        <button
                          onClick={() => handleUpdateRecordStatus(r.id, 'Absent')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'Absent'
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-rose-400'
                          }`}
                        >
                          A
                        </button>
                        <button
                          onClick={() => handleUpdateRecordStatus(r.id, 'Late')}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'Late'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 hover:text-amber-400'
                          }`}
                        >
                          L
                        </button>
                        <button
                          onClick={() => handleDeleteRecord(r.id)}
                          className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 ml-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* BATCH MARK ATTENDANCE MODAL */}
      {isMarkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">Batch Attendance Marking</h3>
              <button onClick={() => setIsMarkModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveBatchAttendance} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Class Section</label>
                  <select
                    value={batchClassId}
                    onChange={(e) => setBatchClassId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Subject</label>
                  <select
                    value={batchSubjectId}
                    onChange={(e) => setBatchSubjectId(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Date</label>
                  <input
                    type="date"
                    value={batchDate}
                    onChange={(e) => setBatchDate(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              {/* Student Marking List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {students.map((std) => (
                  <div
                    key={std.id}
                    className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-bold text-white">{std.fullName}</p>
                      <p className="text-[10px] text-cyan-400 font-mono">{std.rollNo}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {(['Present', 'Absent', 'Late', 'Leave'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setStudentStatuses((prev) => ({ ...prev, [std.id]: st }))}
                          className={`px-3 py-1 rounded-xl text-[10px] font-extrabold transition ${
                            studentStatuses[std.id] === st
                              ? st === 'Present'
                                ? 'bg-emerald-500 text-slate-950'
                                : st === 'Absent'
                                ? 'bg-rose-500 text-white'
                                : st === 'Late'
                                ? 'bg-amber-500 text-slate-950'
                                : 'bg-blue-500 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsMarkModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
                  Save Batch Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
