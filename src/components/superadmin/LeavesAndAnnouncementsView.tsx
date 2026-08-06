import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Megaphone,
  Bell,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Send,
  Eye,
  Trash2,
  X,
  FileText,
} from 'lucide-react';
import { LeaveRequest, Announcement } from '../../types/superadmin';

interface LeavesAnnouncementsProps {
  tabMode: 'leaves' | 'announcements' | 'notifications';
  setTabMode: (mode: 'leaves' | 'announcements' | 'notifications') => void;
  leaves: LeaveRequest[];
  setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
  announcements: Announcement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
  departments: { name: string }[];
}

export const LeavesAndAnnouncementsView: React.FC<LeavesAnnouncementsProps> = ({
  tabMode,
  setTabMode,
  leaves,
  setLeaves,
  announcements,
  setAnnouncements,
  departments,
}) => {
  // Medical Doc Preview Modal
  const [medicalDocUrl, setMedicalDocUrl] = useState<string | null>(null);

  // Announcement Modal
  const [isAncModalOpen, setIsAncModalOpen] = useState(false);
  const [ancForm, setAncForm] = useState<Partial<Announcement>>({
    title: '',
    content: '',
    targetAudience: 'All',
    scheduledDate: new Date().toISOString().split('T')[0],
    status: 'Published',
  });

  // Notification Broadcast State
  const [notificationType, setNotificationType] = useState<'Email' | 'SMS' | 'Push' | 'Broadcast'>('Broadcast');
  const [notifTarget, setNotifTarget] = useState('All');
  const [notifSubject, setNotifSubject] = useState('');
  const [notifBody, setNotifBody] = useState('');

  // Leave Approval Handlers
  const handleLeaveStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  // Add Announcement Handler
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ancForm.title || !ancForm.content) return;

    const newAnc: Announcement = {
      id: `ANC-${Date.now().toString().slice(-3)}`,
      author: 'Super Admin',
      createdAt: new Date().toLocaleString(),
      ...(ancForm as Announcement),
    };
    setAnnouncements((prev) => [newAnc, ...prev]);
    setIsAncModalOpen(false);
  };

  // Send Notification Handler
  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifSubject || !notifBody) return;
    alert(`[${notificationType}] Dispatch Sent Successfully to ${notifTarget}!`);
    setNotifSubject('');
    setNotifBody('');
  };

  return (
    <div className="space-y-6">
      {/* Top Toggle Bar */}
      <div className="flex items-center justify-between p-4 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTabMode('leaves')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              tabMode === 'leaves'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Leave Management & Approvals</span>
          </button>
          <button
            onClick={() => setTabMode('announcements')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              tabMode === 'announcements'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Institutional Announcements</span>
          </button>
          <button
            onClick={() => setTabMode('notifications')}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition flex items-center gap-2 ${
              tabMode === 'notifications'
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notification & Broadcast Dispatch</span>
          </button>
        </div>

        {tabMode === 'announcements' && (
          <button
            onClick={() => setIsAncModalOpen(true)}
            className="px-4 py-2.5 rounded-2xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Announcement</span>
          </button>
        )}
      </div>

      {/* LEAVE MANAGEMENT TAB */}
      {tabMode === 'leaves' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leaves.map((leave) => (
              <div key={leave.id} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {leave.applicantType} Leave Request
                    </span>
                    <h3 className="text-base font-bold text-white">{leave.applicantName}</h3>
                    <span className="text-xs text-cyan-300 block">{leave.department}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                      leave.status === 'Approved'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : leave.status === 'Rejected'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-xs space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span>Duration:</span>
                    <span className="font-bold text-white">{leave.startDate} to {leave.endDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Type:</span>
                    <span className="font-bold text-cyan-300">{leave.leaveType}</span>
                  </div>
                  <p className="text-slate-300 pt-1 border-t border-white/5 italic">"{leave.reason}"</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  {leave.medicalDocUrl ? (
                    <button
                      onClick={() => setMedicalDocUrl(leave.medicalDocUrl || null)}
                      className="text-xs text-cyan-400 hover:underline flex items-center gap-1.5 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Medical Certificate</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-500">No medical document required</span>
                  )}

                  {leave.status === 'Pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLeaveStatus(leave.id, 'Approved')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleLeaveStatus(leave.id, 'Rejected')}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/30 flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANNOUNCEMENTS TAB */}
      {tabMode === 'announcements' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {announcements.map((anc) => (
              <div key={anc.id} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold uppercase">
                      {anc.targetAudience}
                    </span>
                    <h3 className="text-base font-bold text-white mt-2">{anc.title}</h3>
                  </div>
                  <button
                    onClick={() => setAnnouncements((prev) => prev.filter((a) => a.id !== anc.id))}
                    className="text-rose-400 p-1 hover:text-rose-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{anc.content}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-3 border-t border-white/10">
                  <span>Author: {anc.author}</span>
                  <span>Scheduled: {anc.scheduledDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTIFICATIONS DISPATCH TAB */}
      {tabMode === 'notifications' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-6 max-w-2xl mx-auto">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Bell className="w-5 h-5 text-indigo-400" />
            <span>Emergency Broadcast & Notification Engine</span>
          </h2>

          <form onSubmit={handleSendNotification} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Dispatch Protocol</label>
              <div className="grid grid-cols-4 gap-2">
                {['Broadcast', 'Email', 'SMS', 'Push'].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setNotificationType(type as any)}
                    className={`py-2 rounded-xl font-bold border transition ${
                      notificationType === type
                        ? 'bg-indigo-500 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-950/60 border-white/10 text-slate-400'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Target Audience</label>
              <select
                value={notifTarget}
                onChange={(e) => setNotifTarget(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
              >
                <option value="All">All Registered System Users</option>
                <option value="Faculty Only">Faculty Only</option>
                <option value="Students Only">Students Only</option>
                <option value="Parents Only">Parents & Guardians</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Subject Header</label>
              <input
                type="text"
                value={notifSubject}
                onChange={(e) => setNotifSubject(e.target.value)}
                placeholder="Important Security Notice / Academic Alert"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">Message Body</label>
              <textarea
                value={notifBody}
                onChange={(e) => setNotifBody(e.target.value)}
                placeholder="Write message contents here..."
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white h-28"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Dispatch Notification</span>
            </button>
          </form>
        </div>
      )}

      {/* Create Announcement Modal */}
      {isAncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white">Create Announcement</h3>
              <button onClick={() => setIsAncModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAnnouncement} className="space-y-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Title</label>
                <input
                  type="text"
                  value={ancForm.title || ''}
                  onChange={(e) => setAncForm({ ...ancForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Target Audience</label>
                <select
                  value={ancForm.targetAudience}
                  onChange={(e) => setAncForm({ ...ancForm, targetAudience: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                >
                  <option value="All">All Users</option>
                  <option value="Faculty Only">Faculty Only</option>
                  <option value="Students Only">Students Only</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Announcement Body</label>
                <textarea
                  value={ancForm.content || ''}
                  onChange={(e) => setAncForm({ ...ancForm, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white h-24"
                  required
                />
              </div>

              <button type="submit" className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold">
                Publish Announcement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Medical Document Viewer Modal */}
      {medicalDocUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-cyan-400">MEDICAL CERTIFICATE ATTACHMENT</span>
              <button onClick={() => setMedicalDocUrl(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={medicalDocUrl} alt="Medical Certificate" className="w-full h-64 object-cover rounded-2xl border border-white/10" />
          </div>
        </div>
      )}
    </div>
  );
};
