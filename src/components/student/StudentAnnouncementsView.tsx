import React from 'react';
import { Megaphone, Calendar, User, Tag, Sparkles } from 'lucide-react';
import { StudentAnnouncement } from '../../types/student';

interface StudentAnnouncementsProps {
  announcements: StudentAnnouncement[];
}

export const StudentAnnouncementsView: React.FC<StudentAnnouncementsProps> = ({ announcements }) => {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Department & Class Announcements</h2>
          <p className="text-xs text-slate-400 font-medium">
            Official broadcasts from faculty, department heads, and academic administration.
          </p>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition space-y-3 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {ann.category} Broadcast
              </span>

              <span className="text-xs font-mono text-slate-400 font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                {ann.publishedDate}
              </span>
            </div>

            <h3 className="text-base font-black text-white">{ann.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{ann.content}</p>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1">
                Published by: <strong className="text-white font-bold">{ann.publisherName}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
