import React from 'react';
import {
  Search,
  Bell,
  ShieldCheck,
  Building2,
  LogOut,
  Sparkles,
  UserCheck,
} from 'lucide-react';

interface HeaderProps {
  activeTitle: string;
  institutionName?: string;
  onLogout?: () => void;
  onSwitchRole?: (role: 'superadmin' | 'admin') => void;
}

export const AdminHeader: React.FC<HeaderProps> = ({
  activeTitle,
  institutionName = 'Apex Institute of Technology',
  onLogout,
  onSwitchRole,
}) => {
  return (
    <header className="h-20 px-6 border-b border-white/10 bg-slate-900/60 backdrop-blur-2xl flex items-center justify-between gap-4 z-20">
      {/* Title & Badge */}
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-base font-black text-white capitalize flex items-center gap-2">
            <span>{activeTitle}</span>
          </h1>
          <p className="text-[11px] text-cyan-400 font-bold flex items-center gap-1.5">
            <Building2 className="w-3 h-3" />
            <span>{institutionName}</span>
          </p>
        </div>
      </div>

      {/* Global Search & Role Switcher */}
      <div className="flex items-center gap-3">
        {/* Role Switcher Pill */}
        {onSwitchRole && (
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-2xl bg-slate-950/80 border border-white/10 text-xs font-bold">
            <button
              onClick={() => onSwitchRole('superadmin')}
              className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white transition"
            >
              Super Admin
            </button>
            <button
              onClick={() => onSwitchRole('admin')}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-black shadow"
            >
              Institutional Admin
            </button>
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-white/10 transition relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        {/* Admin Avatar Pill */}
        <div className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-800/60 border border-white/10">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-white text-xs shadow">
            AD
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-black text-white">Apex Admin</p>
            <p className="text-[9px] text-cyan-400 font-extrabold uppercase">Institution Scope</p>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
