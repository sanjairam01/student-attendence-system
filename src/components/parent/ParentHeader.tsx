import React, { useState } from 'react';
import {
  Bell,
  User,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Layers,
  GraduationCap,
  Users,
} from 'lucide-react';
import { ParentProfile, ChildSummary, ParentNotification } from '../../types/parent';

interface ParentHeaderProps {
  profile: ParentProfile;
  childrenList: ChildSummary[];
  selectedChild: ChildSummary;
  onSelectChild: (child: ChildSummary) => void;
  title: string;
  subtitle: string;
  notifications: ParentNotification[];
  onRoleSwitch: (role: string) => void;
  onLogout: () => void;
}

export const ParentHeader: React.FC<ParentHeaderProps> = ({
  profile,
  childrenList,
  selectedChild,
  onSelectChild,
  title,
  subtitle,
  notifications,
  onRoleSwitch,
  onLogout,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 px-6 py-4 bg-slate-950/80 border-b border-white/10 backdrop-blur-2xl flex items-center justify-between gap-4">
      {/* Title & Context */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-black text-white tracking-wide">{title}</h1>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Linked Child: {selectedChild.fullName}
          </span>
        </div>
        <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Child Selector Dropdown */}
        {childrenList.length > 1 && (
          <select
            value={selectedChild.id}
            onChange={(e) => {
              const child = childrenList.find((c) => c.id === e.target.value);
              if (child) onSelectChild(child);
            }}
            className="bg-slate-900 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
          >
            {childrenList.map((c) => (
              <option key={c.id} value={c.id}>
                Child: {c.fullName} ({c.rollNumber})
              </option>
            ))}
          </select>
        )}

        {/* Notifications Button */}
        <div className="relative">
          <button className="p-2.5 rounded-2xl bg-slate-900 text-slate-300 hover:text-white border border-white/10 relative transition">
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Profile / Role Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-2xl bg-slate-900 border border-white/10 hover:border-amber-500/30 transition"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-black text-xs">
              RV
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-white leading-tight">{profile.parentName}</p>
              <p className="text-[10px] text-amber-400 font-mono leading-tight">Guardian</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-3 z-50 space-y-2">
              <div className="p-3 rounded-2xl bg-slate-800/60 border border-white/5 space-y-1">
                <p className="text-xs font-black text-white">{profile.parentName}</p>
                <p className="text-[10px] text-slate-400">{profile.email}</p>
              </div>

              <div className="space-y-1 pt-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2">
                  Switch Active Role
                </p>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onRoleSwitch('superadmin');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
                >
                  <span>Super Admin Portal</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onRoleSwitch('admin');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
                >
                  <span>Admin Workspace</span>
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onRoleSwitch('faculty');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
                >
                  <span>Faculty Workspace</span>
                  <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onRoleSwitch('student');
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 flex items-center justify-between"
                >
                  <span>Student Workspace</span>
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-rose-400 hover:bg-rose-500/20 flex items-center justify-between"
                >
                  <span>Logout Parent</span>
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
