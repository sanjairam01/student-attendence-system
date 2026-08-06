import React, { useState } from 'react';
import { Clock, MapPin, User, Calendar, BookOpen } from 'lucide-react';
import { StudentTimetableSlot } from '../../types/student';

interface StudentTimetableProps {
  timetable: StudentTimetableSlot[];
}

export const StudentTimetableView: React.FC<StudentTimetableProps> = ({ timetable }) => {
  const [activeDay, setActiveDay] = useState<
    'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'
  >('Wednesday');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const daySlots = timetable.filter((s) => s.dayOfWeek === activeDay);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Class Timetable & Period Schedule</h2>
          <p className="text-xs text-slate-400 font-medium">
            Weekly lecture timetable, assigned hall locations, and period timings.
          </p>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        {days.map((d) => {
          const isActive = activeDay === d;
          return (
            <button
              key={d}
              onClick={() => setActiveDay(d)}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black transition flex items-center justify-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{d}</span>
            </button>
          );
        })}
      </div>

      {/* Timetable Slot List */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
          {activeDay} Schedule ({daySlots.length} Lectures)
        </h3>

        {daySlots.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-xs font-bold">
            No lectures scheduled for {activeDay}. Enjoy your study recess!
          </div>
        ) : (
          <div className="space-y-3">
            {daySlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-5 rounded-2xl border transition flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  slot.isCurrent
                    ? 'bg-cyan-500/10 border-cyan-500/40 shadow-lg'
                    : 'bg-slate-800/40 border-white/5 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-800 text-cyan-300 font-black text-center min-w-[110px] border border-white/5">
                    <p className="text-xs">{slot.startTime}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{slot.endTime}</p>
                    <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-extrabold mt-1 block">
                      Period #{slot.periodNumber}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-white">{slot.subjectName}</h4>
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-slate-800 text-slate-300 border border-white/10">
                        {slot.subjectCode}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-300">
                      Instructor: <span className="text-cyan-300 font-bold">{slot.facultyName}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Location: {slot.roomNumber}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
