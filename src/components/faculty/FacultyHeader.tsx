import React from 'react';
import {
  Bell,
  Search,
  Sparkles,
  QrCode,
  ShieldCheck,
  UserCheck,
  Calendar,
  Clock,
  ChevronDown,
  ArrowRightLeft,
  LogOut,
} from 'lucide-react';
import { FacultyProfile, FacultyNotification } from '../../types/faculty';

interface FacultyHeaderProps {
  profile: FacultyProfile;
  title: string;
  subtitle?: string;
  notifications: FacultyNotification[];
  onOpenQR: () => void;
  onRoleSwitch?: (role: 'superadmin' | 'admin' | 'faculty') => void;
  onLogout?: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const FacultyHeader: React.FC<FacultyHeaderProps> = ({
  profile,
  title,
  subtitle,
  notifications,
  onOpenQR,
  onRoleSwitch,
  onLogout,
  searchQuery,
  setSearchQuery,
}) => {
  const [showNotifs, setShowNotifs] = React.useState(false);
  const [showRoleMenu, setShowRoleMenu] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 h-20 px-6 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-between gap-4">
      {/* Title & Page Context */}
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-black text-white tracking-tight">{title}</h2>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {profile.departmentName}
          </span>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium">{subtitle}</p>}
      </div>

      {/* Center Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search students, subjects, classes, or attendance logs..."
          className="w-full bg-slate-800/60 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick QR Attendance Trigger Button */}
        <button
          onClick={onOpenQR}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500 hover:opacity-90 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition"
        >
          <QrCode className="w-4 h-4" />
          <span className="hidden sm:inline">Launch QR Attendance</span>
        </button>

        {/* Current Class Period Indicator Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-slate-800/80 border border-white/10 text-slate-300 text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Active Period: CS201 (09:00 - 10:00 AM)</span>
        </div>

        {/* Notifications Popover Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-300 relative transition"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-3 w-80 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <p className="text-xs font-black text-white uppercase tracking-wider">Faculty Alerts</p>
                <span className="text-[10px] text-cyan-400 font-bold">{unreadCount} New</span>
              </div>
              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 rounded-2xl bg-slate-800/50 border border-white/5">
                    <p className="text-xs font-bold text-white">{n.title}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{n.message}</p>
                    <p className="text-[9px] text-cyan-400 mt-1 font-mono">{n.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Role Switcher & Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-white transition"
          >
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-8 h-8 rounded-xl object-cover border border-cyan-400/30"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black leading-tight text-white">{profile.name}</p>
              <p className="text-[9px] text-cyan-400 font-extrabold uppercase">Faculty</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-3 w-56 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-2 z-50">
              <div className="p-3 border-b border-white/10 mb-1">
                <p className="text-xs font-black text-white">{profile.name}</p>
                <p className="text-[10px] text-slate-400">{profile.email}</p>
                <p className="text-[10px] text-cyan-400 font-bold mt-0.5">{profile.designation}</p>
              </div>

              {onRoleSwitch && (
                <div className="p-1 space-y-1">
                  <p className="px-2 text-[9px] font-black text-slate-500 uppercase">Switch Portal Context</p>
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onRoleSwitch('superadmin');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />
                    <span>Super Admin Portal</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onRoleSwitch('admin');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Institutional Admin Portal</span>
                  </button>
                </div>
              )}

              {onLogout && (
                <div className="border-t border-white/10 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
