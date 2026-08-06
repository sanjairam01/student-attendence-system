import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, ShieldCheck, Sparkles, LogOut } from 'lucide-react';
import { SystemSettings } from '../../types/superadmin';

export interface HeaderProps {
  activeViewTitle?: string;
  settings?: SystemSettings;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
  theme?: 'Dark' | 'Light';
  setTheme?: (t: 'Dark' | 'Light') => void;
  onOpenNotifications?: () => void;
  unreadCount?: number;
  unreadNotifications?: number;
  onLogout?: () => void;
}

export const SuperAdminHeader: React.FC<HeaderProps> = ({
  activeViewTitle,
  settings,
  searchQuery = '',
  setSearchQuery,
  theme = 'Dark',
  setTheme,
  onOpenNotifications,
  unreadCount,
  unreadNotifications,
  onLogout,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const effectiveUnread = unreadCount ?? unreadNotifications ?? 0;
  const collegeName = settings?.collegeName ? settings.collegeName.split(' ')[0] : 'SmartAttend';
  const academicYear = settings?.academicYear ?? '2025-2026';

  return (
    <header className="sticky top-0 z-20 h-20 px-6 flex items-center justify-between border-b border-white/10 bg-slate-900/60 backdrop-blur-2xl transition-all">
      {/* Title & Floating Global Search Bar */}
      <div className="flex items-center gap-6 w-full max-w-xl">
        {activeViewTitle && (
          <div className="hidden sm:block shrink-0">
            <h1 className="text-base font-black text-white capitalize tracking-wide">
              {activeViewTitle}
            </h1>
          </div>
        )}
        <div className="relative w-full">
          <div
            className={`relative flex items-center rounded-2xl bg-slate-950/40 border transition-all duration-300 ${
              isFocused
                ? 'border-cyan-500/60 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-500/20'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <Search className="w-5 h-5 ml-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Global search (Students, Faculty, Courses, Depts)..."
              className="w-full py-2.5 pl-3 pr-4 bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery && setSearchQuery('')}
                className="mr-3 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Action Controls */}
      <div className="flex items-center gap-3">
        {/* Academic Year Info Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/60 border border-white/10 text-xs text-slate-300 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{collegeName}</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="text-cyan-300">{academicYear}</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme && setTheme(theme === 'Dark' ? 'Light' : 'Dark')}
          className="p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 border border-white/10 text-slate-300 hover:text-white transition shadow-sm"
          title="Toggle Dark / Light Glass Mode"
        >
          {theme === 'Dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-400" />}
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 rounded-2xl bg-slate-800/50 hover:bg-slate-700/60 border border-white/10 text-slate-300 hover:text-white transition shadow-sm"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {effectiveUnread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-pulse">
              {effectiveUnread}
            </span>
          )}
        </button>

        {/* Super Admin Access Badge */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" title="Super Admin Authenticated">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 hover:text-rose-200 transition shadow-sm"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
};

