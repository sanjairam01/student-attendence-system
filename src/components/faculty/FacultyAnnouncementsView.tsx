import React, { useState } from 'react';
import { Megaphone, Search, Tag, Calendar, User, Bell } from 'lucide-react';
import { FacultyAnnouncement } from '../../types/faculty';

interface AnnouncementsProps {
  announcements: FacultyAnnouncement[];
}

export const FacultyAnnouncementsView: React.FC<AnnouncementsProps> = ({ announcements }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'Department' | 'Class' | 'Institutional'>('ALL');

  const filtered = announcements.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || a.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Department & Class Circulars</h2>
          <p className="text-xs text-slate-400 font-medium">
            Official institutional announcements, departmental circulars, and class notices.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notices..."
              className="w-full bg-slate-800 border border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {(['ALL', 'Department', 'Class', 'Institutional'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`flex-1 py-2 rounded-2xl text-xs font-bold transition ${
                  categoryFilter === cat
                    ? 'bg-cyan-500 text-slate-950 font-black shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcements Feed List */}
      <div className="space-y-4">
        {filtered.map((anc) => (
          <div
            key={anc.id}
            className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/30 transition shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {anc.category}
                </span>
                {anc.targetClassName && (
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-300">
                    {anc.targetClassName}
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-mono">{anc.publishedDate}</span>
            </div>

            <h3 className="text-lg font-black text-white">{anc.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">{anc.content}</p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Published by: {anc.publisherName}</span>
              <span className="text-cyan-400 font-bold">Priority: {anc.priority}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
