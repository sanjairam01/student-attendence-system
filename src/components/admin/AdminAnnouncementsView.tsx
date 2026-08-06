import React, { useState } from 'react';
import { Megaphone, Plus, Trash2, Edit2, X, AlertTriangle, Send, Bell } from 'lucide-react';
import { Announcement } from '../../types/admin';

interface AnnouncementProps {
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

export const AdminAnnouncementsView: React.FC<AnnouncementProps> = ({
  announcements,
  setAnnouncements,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    targetAudience: 'All',
    priority: 'Medium',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnc: Announcement = {
      id: `anc-${Date.now()}`,
      title: formData.title || 'Institutional Notice',
      content: formData.content || '',
      targetAudience: formData.targetAudience as any,
      priority: formData.priority as any,
      createdAt: 'Just Now',
      createdBy: 'College Principal / Admin',
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', targetAudience: 'All', priority: 'Medium' });
  };

  const handleDelete = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-pink-400" />
            <span>Campus Broadcasts & Circulars</span>
          </h2>
          <p className="text-xs text-slate-400">
            Publish official notices to students, faculty members, or parents instantly.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Broadcast Circular</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {announcements.map((anc) => (
          <div
            key={anc.id}
            className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3 hover:border-pink-500/40 transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    anc.priority === 'High'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {anc.priority} Priority
                </span>

                <button
                  onClick={() => handleDelete(anc.id)}
                  className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="font-extrabold text-white text-base">{anc.title}</h3>
              <p className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-2xl border border-white/5">
                {anc.content}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
              <span>Audience: {anc.targetAudience}</span>
              <span>{anc.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="font-black text-white text-base">New Institutional Circular</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Notice Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Audience</label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  <option value="All">Entire Institution (All)</option>
                  <option value="Department">Specific Department</option>
                  <option value="Faculty">Teaching Staff Only</option>
                  <option value="Student">Students & Parents</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High (Urgent Alert)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Notice Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={4}
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
                  Broadcast Circular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
