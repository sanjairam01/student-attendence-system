import React from 'react';
import { Bell, CheckCircle2, Clock, AlertTriangle, ShieldCheck, Mail } from 'lucide-react';
import { FacultyNotification } from '../../types/faculty';

interface NotificationsProps {
  notifications: FacultyNotification[];
  onMarkAllAsRead: () => void;
}

export const FacultyNotificationsView: React.FC<NotificationsProps> = ({
  notifications,
  onMarkAllAsRead,
}) => {
  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Faculty Activity & System Alerts</h2>
          <p className="text-xs text-slate-400 font-medium">
            Class schedule reminders, defaulter warnings, and leave status updates.
          </p>
        </div>

        <button
          onClick={onMarkAllAsRead}
          className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold text-xs border border-white/10 transition"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition flex items-start gap-4 ${
              n.read ? 'bg-slate-800/30 border-white/5 opacity-70' : 'bg-slate-800/80 border-cyan-500/30'
            }`}
          >
            <div className="p-2.5 rounded-2xl bg-slate-800 text-cyan-400 border border-white/10 shrink-0">
              <Bell className="w-4 h-4" />
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{n.message}</p>
              <span className="inline-block text-[9px] font-black uppercase text-cyan-400 mt-1">
                Category: {n.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
