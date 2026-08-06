import React, { useState } from 'react';
import { Bell, AlertTriangle, Send, Mail, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { NotificationItem, Student } from '../../types/admin';

interface NotificationProps {
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  students: Student[];
}

export const AdminNotificationsView: React.FC<NotificationProps> = ({
  notifications,
  setNotifications,
  students,
}) => {
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  // Trigger Low Attendance Warning Dispatch
  const handleTriggerWarningDispatch = () => {
    const defaulters = students.filter((s) => s.attendancePct < 75);
    const newNotifs: NotificationItem[] = defaulters.map((d) => ({
      id: `notif-${Date.now()}-${d.id}`,
      title: `Low Attendance Warning (<75%): ${d.fullName}`,
      message: `Automated warning dispatched to ${d.email} and parent contact (${d.parentPhone}). Current attendance is ${d.attendancePct}%.`,
      type: 'Warning',
      read: false,
      timestamp: 'Just Now',
    }));

    setNotifications((prev) => [...newNotifs, ...prev]);
    setDispatchStatus(`Successfully dispatched ${defaulters.length} automated warnings via SMTP!`);
    setTimeout(() => setDispatchStatus(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-rose-400" />
            <span>Automated Notification & Warning System</span>
          </h2>
          <p className="text-xs text-slate-400">
            Automated email & SMS alerts for low attendance defaulters (&lt;75%), leave updates, and institutional reminders.
          </p>
        </div>

        <button
          onClick={handleTriggerWarningDispatch}
          className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs shadow-lg shadow-rose-500/20 flex items-center gap-2 transition"
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Trigger Defaulter Warnings (&lt;75%)</span>
        </button>
      </div>

      {dispatchStatus && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{dispatchStatus}</span>
        </div>
      )}

      {/* Notifications History List */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4">
        <h3 className="font-extrabold text-white text-base">Notification Logs & Dispatch History</h3>

        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-white flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{n.title}</span>
                </span>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-slate-300 text-[11px]">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
