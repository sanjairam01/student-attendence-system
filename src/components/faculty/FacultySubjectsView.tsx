import React from 'react';
import { BookOpen, Award, Users, BarChart2, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { FacultySubject } from '../../types/faculty';

interface SubjectsProps {
  subjects: FacultySubject[];
  onMarkAttendanceForSubject: (subjectId: string) => void;
}

export const FacultySubjectsView: React.FC<SubjectsProps> = ({
  subjects,
  onMarkAttendanceForSubject,
}) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Context Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white">Assigned Course Curriculum ({subjects.length})</h2>
          <p className="text-xs text-slate-400 font-medium">
            Subject courses assigned for teaching, practical lab evaluations, and syllabus tracking.
          </p>
        </div>
        <span className="px-3.5 py-1.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-black text-xs">
          Academic Year 2025 - 2026
        </span>
      </div>

      {/* Grid of Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition shadow-xl flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-black bg-slate-800 text-cyan-400 border border-white/10">
                  {sub.code}
                </span>
                <span className="text-xs font-extrabold text-slate-400">{sub.credits} Credits</span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-snug">{sub.name}</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  {sub.departmentName} • Semester {sub.semester}
                </p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Enrolled Students</p>
                  <p className="text-lg font-black text-white mt-0.5">{sub.studentCount}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Attendance</p>
                  <p className="text-lg font-black text-emerald-400 mt-0.5">{sub.avgAttendancePct}%</p>
                </div>
              </div>

              {/* Syllabus Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-400">Syllabus Completion</span>
                  <span className="text-cyan-300">{sub.syllabusCompletionPct}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"
                    style={{ width: `${sub.syllabusCompletionPct}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => onMarkAttendanceForSubject(sub.id)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Attendance for {sub.code}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
