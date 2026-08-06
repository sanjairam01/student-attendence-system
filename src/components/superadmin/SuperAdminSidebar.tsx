import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  UserCheck,
  Building2,
  BookOpen,
  BookMarked,
  Layers,
  Clock,
  Calendar,
  FileSpreadsheet,
  Megaphone,
  BarChart3,
  TrendingUp,
  Bell,
  UserCog,
  ShieldCheck,
  Lock,
  Settings,
  Database,
  ShieldAlert,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { SuperAdminTab } from '../../types/superadmin';

interface SidebarProps {
  activeView: SuperAdminTab;
  setActiveView: (tab: SuperAdminTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  pendingLeavesCount?: number;
}

export const SuperAdminSidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  collapsed,
  setCollapsed,
  pendingLeavesCount = 0,
}) => {
  const menuItems: { id: SuperAdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'students', label: 'Students', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'faculty', label: 'Faculty', icon: <Users className="w-5 h-5" /> },
    { id: 'parents', label: 'Parents', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'departments', label: 'Departments', icon: <Building2 className="w-5 h-5" /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'subjects', label: 'Subjects', icon: <BookMarked className="w-5 h-5" /> },
    { id: 'classes', label: 'Classes', icon: <Layers className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance', icon: <Clock className="w-5 h-5" /> },
    { id: 'timetable', label: 'Timetable', icon: <Calendar className="w-5 h-5" /> },
    { id: 'leaves', label: 'Leaves', icon: <FileSpreadsheet className="w-5 h-5" />, badge: pendingLeavesCount },
    { id: 'announcements', label: 'Announcements', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'users', label: 'Users', icon: <UserCog className="w-5 h-5" /> },
    { id: 'roles', label: 'Roles', icon: <ShieldCheck className="w-5 h-5" /> },
    { id: 'permissions', label: 'Permissions', icon: <Lock className="w-5 h-5" /> },
    { id: 'settings', label: 'System Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'backup', label: 'Database Backup', icon: <Database className="w-5 h-5" /> },
    { id: 'audit_logs', label: 'Audit Logs', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={`relative z-30 transition-all duration-300 ease-in-out flex flex-col h-screen select-none border-r border-white/20 bg-slate-900/80 backdrop-blur-2xl text-slate-100 ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-20 px-4 border-b border-white/10">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-500/25 ring-1 ring-white/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                SmartAttend
              </span>
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-widest">
                Super Admin OS
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-slate-300 hover:text-white"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
        {menuItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl transition-all duration-200 font-medium text-sm group relative ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 backdrop-blur-xl'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <div
                className={`transition-transform duration-200 ${
                  isActive ? 'text-cyan-400 scale-110' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              >
                {item.icon}
              </div>
              {!collapsed && <span className="truncate">{item.label}</span>}

              {item.badge && item.badge > 0 ? (
                <span
                  className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                    collapsed
                      ? 'absolute top-2 right-2'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}

              {/* Tooltip for collapsed mode */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-slate-200 text-xs rounded-xl shadow-2xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-white/10 bg-slate-950/40">
        <button
          onClick={() => setActiveView('profile')}
          className="w-full flex items-center gap-3 p-2.5 rounded-2xl hover:bg-white/5 transition border border-transparent hover:border-white/10"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
            SA
          </div>
          {!collapsed && (
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-sm font-semibold text-slate-100 truncate">Super Admin</span>
              <span className="text-xs text-cyan-400 truncate">superadmin@smartattend.edu</span>
            </div>
          )}
        </button>

        <button
          onClick={() => alert('Super Admin Logout initiated. Session terminated safely.')}
          className={`w-full mt-2 flex items-center justify-center gap-2 p-2.5 rounded-2xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition ${
            collapsed ? 'px-0' : ''
          }`}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span>System Logout</span>}
        </button>
      </div>
    </aside>
  );
};
