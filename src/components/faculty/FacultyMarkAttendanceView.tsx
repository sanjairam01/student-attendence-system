import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Save,
  Trash2,
  Edit3,
  Filter,
  Users,
  ShieldCheck,
  Building,
  BookOpen,
  Sparkles,
  CheckSquare,
  XSquare,
  RefreshCw,
} from 'lucide-react';
import {
  FacultySubject,
  FacultyClass,
  StudentForFaculty,
  AttendanceStatusType,
  FacultyAttendanceSession,
  FacultyAttendanceRecord,
} from '../../types/faculty';

interface MarkAttendanceProps {
  subjects: FacultySubject[];
  classes: FacultyClass[];
  students: StudentForFaculty[];
  recentSessions: FacultyAttendanceSession[];
  onSaveSession: (session: FacultyAttendanceSession, records: FacultyAttendanceRecord[]) => void;
  onDeleteSession?: (sessionId: string) => void;
}

export const FacultyMarkAttendanceView: React.FC<MarkAttendanceProps> = ({
  subjects,
  classes,
  students,
  recentSessions,
  onSaveSession,
  onDeleteSession,
}) => {
  // Selection State
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');
  const [attendanceDate, setAttendanceDate] = useState('2026-08-05');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 10:00 AM');

  // Student Attendance Map: studentId -> status
  const [studentStatuses, setStudentStatuses] = useState<Record<string, AttendanceStatusType>>({});
  const [studentRemarks, setStudentRemarks] = useState<Record<string, string>>({});

  // Validation State
  const [validationError, setValidationError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Get matching class & subject details
  const activeClass = classes.find((c) => c.id === selectedClassId) || classes[0];
  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  // Filter students for selected class
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  // Load students into attendance worksheet
  const handleLoadStudents = () => {
    // Validate duplicate attendance session check
    const duplicate = recentSessions.find(
      (sess) =>
        sess.classId === selectedClassId &&
        sess.subjectId === selectedSubjectId &&
        sess.date === attendanceDate &&
        sess.timeSlot === timeSlot
    );

    if (duplicate) {
      setValidationError(
        `Duplicate session alert! Attendance for ${activeSubject.name} on ${attendanceDate} (${timeSlot}) has already been recorded.`
      );
      setIsLoaded(false);
      return;
    }

    setValidationError('');

    // Pre-populate all students as Present by default
    const initialStatuses: Record<string, AttendanceStatusType> = {};
    classStudents.forEach((std) => {
      initialStatuses[std.id] = 'Present';
    });

    setStudentStatuses(initialStatuses);
    setIsLoaded(true);
  };

  // Bulk status update
  const handleBulkSetStatus = (status: AttendanceStatusType) => {
    const updated: Record<string, AttendanceStatusType> = {};
    classStudents.forEach((std) => {
      updated[std.id] = status;
    });
    setStudentStatuses(updated);
  };

  // Status option pill badge styling
  const statusOptions: AttendanceStatusType[] = [
    'Present',
    'Absent',
    'Late',
    'Medical Leave',
    'Half Day',
    'Holiday',
    'Online Class',
  ];

  // Save Attendance Handler
  const handleSaveAttendance = () => {
    if (!isLoaded || classStudents.length === 0) {
      setValidationError('Please load student roster before submitting.');
      return;
    }

    // Calculate Summary Counts
    let presentCount = 0;
    let absentCount = 0;
    let lateCount = 0;
    let medicalLeaveCount = 0;

    Object.values(studentStatuses).forEach((st) => {
      if (st === 'Present' || st === 'Online Class') presentCount++;
      else if (st === 'Absent') absentCount++;
      else if (st === 'Late') lateCount++;
      else if (st === 'Medical Leave') medicalLeaveCount++;
    });

    const totalStudents = classStudents.length;
    const attendancePct = Math.round((presentCount / totalStudents) * 1000) / 10;

    const newSessionId = `sess-${Date.now()}`;

    const newSession: FacultyAttendanceSession = {
      id: newSessionId,
      date: attendanceDate,
      timeSlot,
      classId: selectedClassId,
      className: activeClass.name,
      subjectId: selectedSubjectId,
      subjectName: activeSubject.name,
      subjectCode: activeSubject.code,
      roomNumber: activeClass.roomNumber,
      totalStudents,
      presentCount,
      absentCount,
      lateCount,
      medicalLeaveCount,
      attendancePct,
      mode: 'Manual',
      status: 'Completed',
      createdAt: new Date().toLocaleString(),
    };

    const newRecords: FacultyAttendanceRecord[] = classStudents.map((std) => ({
      id: `att-rec-${std.id}-${Date.now()}`,
      sessionId: newSessionId,
      studentId: std.id,
      studentName: std.fullName,
      rollNo: std.rollNo,
      classId: selectedClassId,
      className: activeClass.name,
      subjectId: selectedSubjectId,
      subjectName: activeSubject.name,
      date: attendanceDate,
      timeSlot,
      status: studentStatuses[std.id] || 'Present',
      remarks: studentRemarks[std.id] || '',
      markedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    onSaveSession(newSession, newRecords);
    setSuccessMsg(`Attendance session saved! ${presentCount}/${totalStudents} present (${attendancePct}%).`);
    setIsLoaded(false);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Context Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Manual Roster Attendance Marking</h2>
          <p className="text-xs text-slate-400 font-medium">
            Select course class criteria, load verified roster, and mark attendance with automatic duplicate validation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Faculty Validation Active
          </span>
        </div>
      </div>

      {/* Criteria Selection Form */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>1. Select Class & Subject Parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300">Target Class & Section</label>
            <select
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setIsLoaded(false);
              }}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} (Room {c.roomNumber})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Assigned Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => {
                setSelectedSubjectId(e.target.value);
                setIsLoaded(false);
              }}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code} - {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Attendance Date</label>
            <input
              type="date"
              value={attendanceDate}
              onChange={(e) => {
                setAttendanceDate(e.target.value);
                setIsLoaded(false);
              }}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Scheduled Time Period</label>
            <select
              value={timeSlot}
              onChange={(e) => {
                setTimeSlot(e.target.value);
                setIsLoaded(false);
              }}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM (Period 1)</option>
              <option value="10:15 AM - 11:15 AM">10:15 AM - 11:15 AM (Period 2)</option>
              <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM (Period 3)</option>
              <option value="01:30 PM - 03:30 PM">01:30 PM - 03:30 PM (Lab Period)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleLoadStudents}
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          <span>Load Student Roster ({classStudents.length})</span>
        </button>

        {validationError && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      {/* Student Roster Worksheet */}
      {isLoaded && classStudents.length > 0 && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                2. Mark Student Roster ({classStudents.length} Students)
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Set individual or bulk status. Changes are validated in real time.
              </p>
            </div>

            {/* Bulk Action Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleBulkSetStatus('Present')}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-bold flex items-center gap-1"
              >
                <CheckSquare className="w-3.5 h-3.5" /> All Present
              </button>
              <button
                onClick={() => handleBulkSetStatus('Absent')}
                className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 text-xs font-bold flex items-center gap-1"
              >
                <XSquare className="w-3.5 h-3.5" /> All Absent
              </button>
            </div>
          </div>

          {/* Student Rows Table */}
          <div className="overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase">
                <tr>
                  <th className="p-3">Roll No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Attendance Status Selection</th>
                  <th className="p-3">Remarks / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {classStudents.map((std) => {
                  const currentStatus = studentStatuses[std.id] || 'Present';
                  return (
                    <tr key={std.id} className="hover:bg-white/5 transition">
                      <td className="p-3 font-mono text-cyan-400 font-bold">{std.rollNo}</td>
                      <td className="p-3 font-bold text-white">
                        <div>
                          <p>{std.fullName}</p>
                          <p className="text-[10px] text-slate-400">Current Avg: {std.attendancePct}%</p>
                        </div>
                      </td>

                      {/* Status Selection Pill Options */}
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1.5">
                          {statusOptions.map((st) => {
                            const isSelected = currentStatus === st;
                            return (
                              <button
                                key={st}
                                type="button"
                                onClick={() =>
                                  setStudentStatuses({
                                    ...studentStatuses,
                                    [std.id]: st,
                                  })
                                }
                                className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition ${
                                  isSelected
                                    ? st === 'Present' || st === 'Online Class'
                                      ? 'bg-emerald-500 text-slate-950 font-black shadow'
                                      : st === 'Absent'
                                      ? 'bg-rose-500 text-white font-black shadow'
                                      : st === 'Late'
                                      ? 'bg-amber-500 text-slate-950 font-black shadow'
                                      : 'bg-indigo-500 text-white font-black shadow'
                                    : 'bg-slate-800 text-slate-400 hover:text-white border border-white/5'
                                }`}
                              >
                                {st}
                              </button>
                            );
                          })}
                        </div>
                      </td>

                      {/* Remarks Field */}
                      <td className="p-3">
                        <input
                          type="text"
                          value={studentRemarks[std.id] || ''}
                          onChange={(e) =>
                            setStudentRemarks({
                              ...studentRemarks,
                              [std.id]: e.target.value,
                            })
                          }
                          placeholder="Add remark..."
                          className="bg-slate-800/80 border border-white/10 rounded-xl px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 w-36"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Submit Attendance Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleSaveAttendance}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              <span>Submit & Finalize Attendance</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
