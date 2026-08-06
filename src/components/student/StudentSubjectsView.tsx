import React from 'react';
import { BookOpen, User, Award, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { SubjectAttendance } from '../../types/student';

interface StudentSubjectsProps {
  subjects: SubjectAttendance[];
}

export const StudentSubjectsView: React.FC<StudentSubjectsProps> = ({ subjects }) => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">My Registered Academic Subjects</h2>
          <p className="text-xs text-slate-400 font-medium">
            Subject credits, faculty instructors, lecture distribution, and individual attendance ratios.
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition space-y-4 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {sub.subjectCode}
                </span>
                <h3 className="text-lg font-black text-white mt-2">{sub.subjectName}</h3>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black font-mono text-cyan-400">{sub.percentage}%</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Attendance Ratio</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Faculty Instructor</p>
                  <p className="font-bold text-white">{sub.facultyName}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400">Course Credits</p>
                  <p className="font-bold text-white">{sub.credits} Credits</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-xs flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{sub.scheduleInfo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
