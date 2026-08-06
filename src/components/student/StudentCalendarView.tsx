import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock, FileSpreadsheet } from 'lucide-react';

export const StudentCalendarView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState('August 2026');

  // Days in August 2026 starting from Saturday (Day 1)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Simulated status mapping for August 2026
  const getDayStatus = (day: number) => {
    // Weekends (Sundays) -> Holiday
    if (day % 7 === 2 || day % 7 === 3) return 'Holiday';
    if (day === 20) return 'Absent';
    if (day === 28) return 'Late';
    if (day >= 10 && day <= 12) return 'Leave';
    if (day > 5) return 'Pending'; // future days
    return 'Present';
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Monthly Attendance Calendar</h2>
          <p className="text-xs text-slate-400 font-medium">
            Visual day-by-day attendance tracking with official status legend.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500" /> Present
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-500" /> Absent
          </span>
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-3 h-3 rounded-full bg-amber-500" /> Late
          </span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-3 h-3 rounded-full bg-cyan-500" /> Leave
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-3 h-3 rounded-full bg-slate-600" /> Holiday
          </span>
        </div>
      </div>

      {/* Month Navigator Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-cyan-400" />
            <span>{currentMonth}</span>
          </h3>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid Header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-black uppercase text-slate-400">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* August 1st 2026 is Saturday -> 5 padding slots for Mon..Fri */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={`pad-${idx}`} className="h-24 rounded-2xl bg-slate-950/40 border border-white/5 opacity-30" />
          ))}

          {daysInMonth.map((day) => {
            const status = getDayStatus(day);
            return (
              <div
                key={day}
                className={`h-24 p-3 rounded-2xl border transition flex flex-col justify-between ${
                  status === 'Present'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : status === 'Absent'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    : status === 'Late'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : status === 'Leave'
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                    : status === 'Holiday'
                    ? 'bg-slate-800/40 border-white/5 text-slate-500'
                    : 'bg-slate-900/40 border-white/5 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black font-mono">{day}</span>
                  {status === 'Present' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {status === 'Absent' && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                  {status === 'Late' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
                  {status === 'Leave' && <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />}
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider block">
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
