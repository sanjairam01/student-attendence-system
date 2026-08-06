import React from 'react';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  HeartHandshake,
  Building2,
  BookOpen,
  BookMarked,
  Layers,
  Clock,
  Calendar,
  FileSpreadsheet,
  FileText,
  BarChart3,
  Megaphone,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Code2,
} from 'lucide-react';
import { AdminTab } from '../../types/admin';

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  pendingLeavesCount?: number;
  unreadNotificationsCount?: number;
  institutionName?: string;
  onLogout?: () => void;
}

export const AdminSidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  pendingLeavesCount = 2,
  unreadNotificationsCount = 3,
  institutionName = 'Apex Institute',
  onLogout,
}) => {
  const menuItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'faculty', label: 'Faculty', icon: <Users className="w-5 h-5" /> },
    { id: 'parents', label: 'Parents', icon: <HeartHandshake className="w-5 h-5" /> },
    { id: 'departments', label: 'Departments', icon: <Building2 className="w-5 h-5" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'subjects', label: 'Subjects', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'classes', label: 'Classes', icon: <Layers className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" /> },
    { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-5 h-5" /> },
    { id: 'leaves', label: 'Leaves', icon: <FileSpreadsheet className="w-5 h-5" />, badge: pendingLeavesCount },
    { id: 'reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" />, badge: unreadNotificationsCount },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'backend_code', label: 'Go REST Backend', icon: <Code2 className="w-5 h-5 text-cyan-400" /> },
  ];

  return (
    <aside
      className={`relative flex flex-col h-screen border-r border-white/10 bg-slate-900/80 backdrop-blur-3xl transition-all duration-300 z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-20 px-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-teal-500 to-indigo-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-500/20 shrink-0">
            A
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-sm text-white tracking-wide truncate">
                {institutionName}
              </span>
              <span className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-wider">
                Institutional Admin
              </span>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-white transition border border-white/10"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 font-medium text-xs group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 backdrop-blur-xl font-bold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`shrink-0 transition-transform ${isActive ? 'scale-110 text-cyan-400' : 'group-hover:scale-105'}`}>
                {item.icon}
              </div>

              {!collapsed && <span className="truncate">{item.label}</span>}

              {/* Badge */}
              {item.badge && item.badge > 0 && (
                <span
                  className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow ${
                    collapsed ? 'absolute top-1 right-1' : ''
                  } ${
                    item.id === 'leaves'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Account & Logout */}
      <div className="p-3 border-t border-white/10 bg-slate-950/50">
        <div className="flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0 shadow">
                AD
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">Admin User</p>
                <p className="text-[10px] text-slate-400 truncate">admin@apex.edu</p>
              </div>
            </div>
          ) : (
            <div className="mx-auto w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow">
              AD
            </div>
          )}

          {!collapsed && onLogout && (
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 border border-rose-500/20 transition"
              title="Logout Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
