import React, { useState } from 'react';
import {
  Calendar,
  Plus,
  Clock,
  AlertTriangle,
  X,
  Check,
  Building2,
  Users,
  Download,
  CheckCircle2,
} from 'lucide-react';
import { TimetableSlot, Faculty, Subject, ClassGroup } from '../../types/admin';

interface TimetableProps {
  timetable: TimetableSlot[];
  setTimetable: React.Dispatch<React.SetStateAction<TimetableSlot[]>>;
  faculty: Faculty[];
  subjects: Subject[];
  classes: ClassGroup[];
}

export const AdminTimetableManagement: React.FC<TimetableProps> = ({
  timetable,
  setTimetable,
  faculty,
  subjects,
  classes,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedClass, setSelectedClass] = useState<string>(classes[0]?.id || 'ALL');

  // Add Slot Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conflictWarning, setConflictWarning] = useState<string | null>(null);

  const [slotForm, setSlotForm] = useState({
    classId: classes[0]?.id || '',
    subjectId: subjects[0]?.id || '',
    facultyId: faculty[0]?.id || '',
    roomNumber: 'Lab B-302',
    dayOfWeek: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = [
    '09:00 AM - 10:00 AM',
    '10:15 AM - 11:15 AM',
    '11:30 AM - 12:30 PM',
    '01:30 PM - 02:30 PM',
    '02:45 PM - 03:45 PM',
  ];

  // Conflict Checker
  const checkCollision = (room: string, facId: string, day: string, start: string) => {
    const roomConflict = timetable.find(
      (t) => t.dayOfWeek === day && t.roomNumber === room && t.startTime.startsWith(start.substring(0, 5))
    );
    if (roomConflict) {
      return `Room Conflict: ${room} is already booked on ${day} at ${start} for ${roomConflict.className}`;
    }

    const facultyConflict = timetable.find(
      (t) => t.dayOfWeek === day && t.facultyId === facId && t.startTime.startsWith(start.substring(0, 5))
    );
    if (facultyConflict) {
      return `Faculty Collision: ${facultyConflict.facultyName} is already teaching ${facultyConflict.className} at this time.`;
    }

    return null;
  };

  const handleSaveSlot = (e: React.FormEvent) => {
    e.preventDefault();
    const collision = checkCollision(
      slotForm.roomNumber,
      slotForm.facultyId,
      slotForm.dayOfWeek,
      slotForm.startTime
    );
    if (collision) {
      setConflictWarning(collision);
      return;
    }

    const clsObj = classes.find((c) => c.id === slotForm.classId);
    const subObj = subjects.find((s) => s.id === slotForm.subjectId);
    const facObj = faculty.find((f) => f.id === slotForm.facultyId);

    const newSlot: TimetableSlot = {
      id: `slot-${Date.now()}`,
      classId: slotForm.classId,
      className: clsObj?.name || 'CSE 4th Sem A',
      subjectId: slotForm.subjectId,
      subjectName: subObj?.name || 'Data Structures',
      subjectCode: subObj?.code || 'CS201',
      facultyId: slotForm.facultyId,
      facultyName: facObj?.name || 'Dr. Aris Thorne',
      roomNumber: slotForm.roomNumber,
      dayOfWeek: slotForm.dayOfWeek as any,
      startTime: slotForm.startTime,
      endTime: slotForm.endTime,
    };

    setTimetable((prev) => [...prev, newSlot]);
    setIsModalOpen(false);
    setConflictWarning(null);
  };

  const handleDeleteSlot = (id: string) => {
    setTimetable((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredSlots = timetable.filter(
    (t) =>
      t.dayOfWeek === selectedDay &&
      (selectedClass === 'ALL' || t.classId === selectedClass)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span>Master Timetable & Classroom Allocation</span>
          </h2>
          <p className="text-xs text-slate-400">
            Real-time conflict detection for faculty double-booking and classroom capacity overlap.
          </p>
        </div>

        <button
          onClick={() => {
            setConflictWarning(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Timetable Slot</span>
        </button>
      </div>

      {/* Day & Class Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        {/* Day Selector */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                selectedDay === day
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Class Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-400 font-bold shrink-0">Filter Class:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Class Sections</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.roomNumber})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl bg-slate-900/60 border border-white/10 text-slate-400 text-xs italic">
            No class schedules assigned for {selectedDay}. Click "Add Timetable Slot" above.
          </div>
        ) : (
          filteredSlots.map((slot) => (
            <div
              key={slot.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3 hover:border-purple-500/40 transition group relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[10px] font-black border border-purple-500/30">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <h4 className="font-extrabold text-white text-base mt-2">{slot.subjectName}</h4>
                  <p className="text-[10px] text-cyan-400 font-mono">{slot.subjectCode}</p>
                </div>

                <button
                  onClick={() => handleDeleteSlot(slot.id)}
                  className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                  title="Remove Slot"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Class Section:</span>
                  <span className="font-bold text-white">{slot.className}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Assigned Room:</span>
                  <span className="font-bold text-cyan-300">{slot.roomNumber}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Faculty Teacher:</span>
                  <span className="font-bold text-amber-300">{slot.facultyName}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD SLOT MODAL WITH CONFLICT DETECTOR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">Schedule New Class Lecture</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conflict Banner */}
            {conflictWarning && (
              <div className="p-3.5 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Schedule Conflict Detected!</p>
                  <p className="text-[11px] text-rose-300">{conflictWarning}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSaveSlot} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Class Section *</label>
                  <select
                    value={slotForm.classId}
                    onChange={(e) => setSlotForm({ ...slotForm, classId: e.target.value })}
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
                  <label className="block text-slate-300 font-bold mb-1">Subject *</label>
                  <select
                    value={slotForm.subjectId}
                    onChange={(e) => setSlotForm({ ...slotForm, subjectId: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Faculty In-Charge *</label>
                  <select
                    value={slotForm.facultyId}
                    onChange={(e) => setSlotForm({ ...slotForm, facultyId: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {faculty.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Room / Lab *</label>
                  <input
                    type="text"
                    value={slotForm.roomNumber}
                    onChange={(e) => setSlotForm({ ...slotForm, roomNumber: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Day *</label>
                  <select
                    value={slotForm.dayOfWeek}
                    onChange={(e) => setSlotForm({ ...slotForm, dayOfWeek: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  >
                    {daysOfWeek.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Start Time</label>
                  <input
                    type="text"
                    value={slotForm.startTime}
                    onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">End Time</label>
                  <input
                    type="text"
                    value={slotForm.endTime}
                    onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                    required
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
