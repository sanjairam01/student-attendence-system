import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { StudentTimetableSlot } from '../../types/student';

interface ParentTimetableProps {
  childName: string;
  timetable: StudentTimetableSlot[];
}

export const ParentTimetableView: React.FC<ParentTimetableProps> = ({ childName, timetable }) => {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Class Timetable for {childName}</h2>
          <p className="text-xs text-slate-400 font-medium">Weekly schedule and classroom assignments.</p>
        </div>
      </div>

      <div className="space-y-3">
        {timetable.map((slot) => (
          <div
            key={slot.id}
            className="p-5 rounded-2xl bg-slate-800/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-slate-800 text-amber-300 font-black text-center min-w-[100px]">
                <p className="text-xs">{slot.startTime}</p>
                <p className="text-[10px] text-slate-400 font-semibold">{slot.dayOfWeek}</p>
              </div>

              <div>
                <h4 className="text-sm font-black text-white">{slot.subjectName}</h4>
                <p className="text-xs text-slate-400 font-medium">{slot.facultyName}</p>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-slate-800 border border-white/10 text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Location: {slot.roomNumber}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
