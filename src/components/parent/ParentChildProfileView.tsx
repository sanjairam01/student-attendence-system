import React from 'react';
import { UserCheck, Building, Phone, Mail, Award, HeartPulse, User } from 'lucide-react';
import { ChildSummary } from '../../types/parent';

interface ParentChildProfileProps {
  child: ChildSummary;
}

export const ParentChildProfileView: React.FC<ParentChildProfileProps> = ({ child }) => {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Student Banner */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
        <img
          src={child.avatarUrl}
          alt={child.fullName}
          className="w-24 h-24 rounded-3xl object-cover border-2 border-amber-400 shadow-xl"
        />

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-black text-white">{child.fullName}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Enrolled Student
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            {child.department} • {child.course}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-mono">
            <span className="text-slate-400">
              Roll #: <strong className="text-amber-300">{child.rollNumber}</strong>
            </span>
            <span className="text-slate-400">
              Reg #: <strong className="text-amber-300">{child.registerNumber}</strong>
            </span>
            <span className="text-slate-400">
              Adm #: <strong className="text-amber-300">{child.admissionNumber}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Institutional Mapping & Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Mapping */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            <span>Academic Profile</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Semester & Section:</span>
              <span className="font-bold text-white">
                {child.semester} ({child.section})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Date of Birth:</span>
              <span className="font-bold text-white">{child.dob}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Gender:</span>
              <span className="font-bold text-white">{child.gender}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Blood Group:</span>
              <span className="font-mono font-bold text-rose-400">{child.bloodGroup}</span>
            </div>
          </div>
        </div>

        {/* Faculty Advisor Contact Card */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Class Advisor & Academic Guidance</span>
          </h3>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/5 space-y-2">
            <p className="text-sm font-black text-white">{child.advisorName}</p>
            <p className="text-xs text-slate-300 font-medium">Department Class Advisor & Faculty Mentor</p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Direct Phone:</span>
              <strong>{child.advisorPhone}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
