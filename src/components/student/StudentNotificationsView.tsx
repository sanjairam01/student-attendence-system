import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock } from 'lucide-react';
import { StudentNotification } from '../../types/student';

interface StudentNotificationsProps {
  notifications: StudentNotification[];
  onMarkAllRead: () => void;
}

export const StudentNotificationsView: React.FC<StudentNotificationsProps> = ({
  notifications,
  onMarkAllRead,
}) => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Student Notifications & Alerts</h2>
          <p className="text-xs text-slate-400 font-medium">
            Automated alerts for attendance scanning, leave approvals, and threshold reminders.
          </p>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs border border-white/10"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications Stream */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border transition flex items-start gap-4 ${
              n.read ? 'bg-slate-900/50 border-white/5 opacity-80' : 'bg-slate-900 border-cyan-500/30'
            }`}
          >
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-300 shrink-0">
              <Bell className="w-5 h-5" />
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-white">{n.title}</h4>
                <span className="text-[10px] font-mono text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
