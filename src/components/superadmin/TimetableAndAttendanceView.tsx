import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Plus,
  Printer,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Edit,
  Sparkles,
} from 'lucide-react';
import { TimetableSlot, AttendanceRecord } from '../../types/superadmin';

interface TimetableAttendanceProps {
  viewMode: 'timetable' | 'attendance';
  setViewMode: (mode: 'timetable' | 'attendance') => void;
  timetable: TimetableSlot[];
  setTimetable: React.Dispatch<React.SetStateAction<TimetableSlot[]>>;
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  departments: { name: string }[];
  subjects: { name: string }[];
  facultyList: { fullName: string }[];
}

export const TimetableAndAttendanceView: React.FC<TimetableAttendanceProps> = ({
  viewMode,
  setViewMode,
  timetable,
  setTimetable,
  attendanceRecords,
  setAttendanceRecords,
  departments,
  subjects,
  facultyList,
}) => {
  // Timetable Form State
  const [isAddSlotOpen, setIsAddSlotOpen] = useState(false);
  const [conflictError, setConflictError] = useState('');
  const [slotForm, setSlotForm] = useState<Partial<TimetableSlot>>({
    day: 'Monday',
    timeSlot: '09:00 AM - 10:00 AM',
    subject: subjects[0]?.name || 'Distributed Cloud Systems',
    faculty: facultyList[0]?.fullName || 'Dr. Robert Miller',
    room: 'Hall 402',
    className: 'CSE 2026 - Section A',
  });

  // Attendance Filters State
  const [attSearch, setAttSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterDate, setFilterDate] = useState('');

  // Conflict Check Logic for Timetable Slot
  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError('');

    // Check for room or faculty conflict at same day & time
    const conflict = timetable.find(
      (t) =>
        t.day === slotForm.day &&
        t.timeSlot === slotForm.timeSlot &&
        (t.room === slotForm.room || t.faculty === slotForm.faculty)
    );

    if (conflict) {
      setConflictError(
        `Conflict Detected! Room ${conflict.room} or Faculty ${conflict.faculty} is already booked on ${conflict.day} at ${conflict.timeSlot}.`
      );
      return;
    }

    const newSlot: TimetableSlot = {
      id: `TT-${Date.now().toString().slice(-3)}`,
      ...(slotForm as TimetableSlot),
    };
    setTimetable((prev) => [...prev, newSlot]);
    setIsAddSlotOpen(false);
  };

  // Filtered Attendance List
  const filteredAttendance = useMemo(() => {
    return attendanceRecords.filter((a) => {
      const matchesSearch =
        a.studentName.toLowerCase().includes(attSearch.toLowerCase()) ||
        a.rollNo.toLowerCase().includes(attSearch.toLowerCase()) ||
        a.markedBy.toLowerCase().includes(attSearch.toLowerCase());
      const matchesDept = !filterDept || a.department === filterDept;
      const matchesSubject = !filterSubject || a.subject === filterSubject;
      const matchesDate = !filterDate || a.date === filterDate;
      return matchesSearch && matchesDept && matchesSubject && matchesDate;
    });
  }, [attendanceRecords, attSearch, filterDept, filterSubject, filterDate]);

  return (
    <div className="space-y-6">
      {/* Top Section Toggle */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('timetable')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              viewMode === 'timetable'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Timetable Scheduler & Matrix</span>
          </button>
          <button
            onClick={() => setViewMode('attendance')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              viewMode === 'attendance'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Master Attendance Records</span>
          </button>
        </div>

        {viewMode === 'timetable' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Printing Weekly Timetable Driver Initialized.')}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Timetable</span>
            </button>
            <button
              onClick={() => setIsAddSlotOpen(true)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Slot</span>
            </button>
          </div>
        )}
      </div>

      {/* TIMETABLE VIEW */}
      {viewMode === 'timetable' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Weekly Institutional Timetable Grid</span>
              </h2>
              <span className="text-xs text-slate-400">Conflict Engine: <span className="text-emerald-400 font-bold">Active</span></span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => {
                const daySlots = timetable.filter((t) => t.day === day);
                return (
                  <div key={day} className="p-3.5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                    <span className="text-xs font-extrabold text-cyan-300 block text-center uppercase tracking-wider border-b border-white/10 pb-2">
                      {day}
                    </span>
                    <div className="space-y-2">
                      {daySlots.length === 0 ? (
                        <span className="text-[10px] text-slate-500 block text-center py-4 italic">No Classes</span>
                      ) : (
                        daySlots.map((slot) => (
                          <div key={slot.id} className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-1 relative group">
                            <span className="text-[10px] font-bold text-cyan-400 block">{slot.timeSlot}</span>
                            <span className="text-xs font-bold text-white block leading-tight">{slot.subject}</span>
                            <span className="text-[10px] text-slate-300 block">{slot.faculty}</span>
                            <span className="text-[10px] text-emerald-400 font-mono block">{slot.room} • {slot.className}</span>
                            <button
                              onClick={() => setTimetable((prev) => prev.filter((s) => s.id !== slot.id))}
                              className="absolute top-1.5 right-1.5 text-rose-400 opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ATTENDANCE VIEW */}
      {viewMode === 'attendance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
            <div className="relative md:col-span-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={attSearch}
                onChange={(e) => setAttSearch(e.target.value)}
                placeholder="Search student or roll no..."
                className="w-full py-2 pl-10 pr-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-200"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-200"
            >
              <option value="">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-200"
            />
          </div>

          <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-200">
                <thead className="bg-slate-950/60 border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Student & Roll No</th>
                    <th className="p-4">Class & Subject</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Attendance Status</th>
                    <th className="p-4">Marked By</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-white/5 transition">
                      <td className="p-4">
                        <span className="font-bold text-white block">{rec.studentName}</span>
                        <span className="text-[10px] text-cyan-300 block">{rec.rollNo}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-200 block">{rec.subject}</span>
                        <span className="text-[10px] text-slate-400 block">{rec.className}</span>
                      </td>
                      <td className="p-4 text-slate-300 font-mono">{rec.date}</td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                            rec.status === 'Present'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : rec.status === 'Absent'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {rec.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-300">{rec.markedBy}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Remove attendance log entry for ${rec.studentName}?`)) {
                              setAttendanceRecords((prev) => prev.filter((a) => a.id !== rec.id));
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
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
        </div>
      )}

      {/* Add Timetable Slot Modal */}
      {isAddSlotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white border-b border-white/10 pb-3">Schedule Class Slot</h3>

            {conflictError && (
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{conflictError}</span>
              </div>
            )}

            <form onSubmit={handleAddSlot} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Day of Week</label>
                <select
                  value={slotForm.day}
                  onChange={(e) => setSlotForm({ ...slotForm, day: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Time Slot</label>
                <input
                  type="text"
                  value={slotForm.timeSlot || ''}
                  onChange={(e) => setSlotForm({ ...slotForm, timeSlot: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  placeholder="09:00 AM - 10:00 AM"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Room Number</label>
                <input
                  type="text"
                  value={slotForm.room || ''}
                  onChange={(e) => setSlotForm({ ...slotForm, room: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddSlotOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                  Check & Save Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
