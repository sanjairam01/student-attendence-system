import React from 'react';
import {
  LayoutDashboard,
  UserCheck,
  CheckSquare,
  FileText,
  Clock,
  Bell,
  User,
  Settings,
  Code2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { ParentTab } from '../../types/parent';

interface ParentSidebarProps {
  activeTab: ParentTab;
  setActiveTab: (tab: ParentTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  unreadNotificationsCount: number;
  parentName: string;
  onLogout: () => void;
}

export const ParentSidebar: React.FC<ParentSidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  unreadNotificationsCount,
  parentName,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Parent Dashboard', icon: LayoutDashboard },
    { id: 'child_profile', label: 'Child Profile', icon: UserCheck },
    { id: 'attendance', label: 'Child Attendance', icon: CheckSquare },
    { id: 'reports', label: 'Attendance Reports', icon: FileText },
    { id: 'timetable', label: 'Child Timetable', icon: Clock },
    {
      id: 'notifications',
      label: 'Parent Alerts',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
    { id: 'profile', label: 'Parent Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'backend_code', label: 'Go REST API Code', icon: Code2, isSpecial: true },
  ];

  return (
    <aside
      className={`relative z-30 h-screen flex flex-col bg-slate-900/90 border-r border-white/10 backdrop-blur-2xl transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white tracking-wide">APEX SMART</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Parent
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Guardian Portal</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
            <Users className="w-5 h-5" />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition border border-white/5"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 overflow-y-auto custom-scrollbar space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as ParentTab)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? item.isSpecial
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                  : item.isSpecial
                  ? 'text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : ''}`} />

              {!collapsed && (
                <span className="flex-1 text-left truncate tracking-wide">{item.label}</span>
              )}

              {!collapsed && item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* User Footer Profile Card */}
      <div className="p-4 border-t border-white/10 bg-slate-950/50">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-black text-xs shrink-0">
                RV
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white truncate">{parentName}</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">Guardian Account</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800/80 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition"
              title="Logout Parent Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onLogout}
            className="w-full py-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 flex items-center justify-center"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
