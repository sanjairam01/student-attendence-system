import React from 'react';
import { Bell } from 'lucide-react';
import { ParentNotification } from '../../types/parent';

interface ParentNotificationsProps {
  notifications: ParentNotification[];
  onMarkAllRead: () => void;
}

export const ParentNotificationsView: React.FC<ParentNotificationsProps> = ({
  notifications,
  onMarkAllRead,
}) => {
  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Guardian Alerts & Broadcasts</h2>
          <p className="text-xs text-slate-400 font-medium">Real-time SMS and app push notifications.</p>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-4 py-2.5 rounded-2xl bg-slate-800 text-amber-300 font-bold text-xs border border-white/10"
        >
          Mark All Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-2xl border flex items-start gap-4 ${
              n.read ? 'bg-slate-900/50 border-white/5 opacity-80' : 'bg-slate-900 border-amber-500/30'
            }`}
          >
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-300 shrink-0">
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
