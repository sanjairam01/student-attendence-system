import React from 'react';
import { SubjectAttendance, DailyAttendanceRecord } from '../../types/student';
import { CheckSquare, CheckCircle2, XCircle, Clock, FileSpreadsheet } from 'lucide-react';

interface ParentAttendanceProps {
  childName: string;
  subjects: SubjectAttendance[];
  dailyRecords: DailyAttendanceRecord[];
}

export const ParentAttendanceView: React.FC<ParentAttendanceProps> = ({
  childName,
  subjects,
  dailyRecords,
}) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Attendance Audit Log for {childName}</h2>
          <p className="text-xs text-slate-400 font-medium">Read-only verified attendance session history.</p>
        </div>
      </div>

      {/* Subject Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-black bg-amber-500/10 text-amber-300">
                {sub.subjectCode}
              </span>
              <span className="text-sm font-black font-mono text-amber-400">{sub.percentage}%</span>
            </div>

            <div>
              <h4 className="text-sm font-black text-white">{sub.subjectName}</h4>
              <p className="text-xs text-slate-400 font-medium">{sub.facultyName}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Records Stream Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
          Daily Verification Log
        </h3>

        <div className="overflow-x-auto border border-white/5 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Time Slot</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {dailyRecords.map((r) => (
                <tr key={r.id}>
                  <td className="p-3.5 font-mono text-amber-300 font-bold">{r.date}</td>
                  <td className="p-3.5 font-bold text-white">{r.subjectName}</td>
                  <td className="p-3.5 font-mono">{r.timeSlot}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        r.status === 'Present'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : r.status === 'Absent'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{r.remarks || 'Standard System Record'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
