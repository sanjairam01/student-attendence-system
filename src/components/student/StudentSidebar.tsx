import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BookOpen,
  Clock,
  FileSpreadsheet,
  FileText,
  Bell,
  Megaphone,
  BarChart3,
  User,
  Settings,
  Code2,
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { StudentTab } from '../../types/student';

interface StudentSidebarProps {
  activeTab: StudentTab;
  setActiveTab: (tab: StudentTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  pendingLeavesCount: number;
  unreadNotificationsCount: number;
  studentName: string;
  rollNumber: string;
  onLogout: () => void;
}

export const StudentSidebar: React.FC<StudentSidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  pendingLeavesCount,
  unreadNotificationsCount,
  studentName,
  rollNumber,
  onLogout,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'My Attendance', icon: CheckSquare },
    { id: 'calendar', label: 'Attendance Calendar', icon: Calendar },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'timetable', label: 'Timetable', icon: Clock },
    {
      id: 'leave',
      label: 'Leave Application',
      icon: FileSpreadsheet,
      badge: pendingLeavesCount > 0 ? pendingLeavesCount : undefined,
    },
    { id: 'reports', label: 'Reports', icon: FileText },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount : undefined,
    },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'analytics', label: 'Student Analytics', icon: BarChart3 },
    { id: 'profile', label: 'My Profile', icon: User },
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black text-white tracking-wide">APEX SMART</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Student
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Attendance & Academic Hub</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg">
            <GraduationCap className="w-5 h-5" />
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
              onClick={() => setActiveTab(item.id as StudentTab)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                isActive
                  ? item.isSpecial
                    ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                    : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
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
                    isActive ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/20 text-cyan-300'
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
              <div className="w-9 h-9 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-black text-xs shrink-0">
                AV
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white truncate">{studentName}</p>
                <p className="text-[10px] text-slate-400 font-mono truncate">{rollNumber}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800/80 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition"
              title="Logout Student Session"
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
