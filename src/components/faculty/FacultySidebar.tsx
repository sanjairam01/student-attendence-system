import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Building,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  FileSpreadsheet,
  BarChart3,
  Megaphone,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  QrCode,
  Code2,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { FacultyTab } from '../../types/faculty';

interface SidebarProps {
  activeTab: FacultyTab;
  setActiveTab: (tab: FacultyTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  pendingLeavesCount?: number;
  unreadNotificationsCount?: number;
  facultyName?: string;
  departmentName?: string;
  onLogout?: () => void;
}

export const FacultySidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  pendingLeavesCount = 1,
  unreadNotificationsCount = 2,
  facultyName = 'Dr. Aris Thorne',
  departmentName = 'Computer Science',
  onLogout,
}) => {
  const menuGroups = [
    {
      title: 'CORE FACULTY WORKSPACE',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { key: 'classes', label: 'My Classes', icon: Building },
        { key: 'subjects', label: 'My Subjects', icon: BookOpen },
        { key: 'timetable', label: 'Class Timetable', icon: Calendar },
        { key: 'students', label: 'Student Directory', icon: Users },
      ],
    },
    {
      title: 'ATTENDANCE ENGINE',
      items: [
        { key: 'mark_attendance', label: 'Mark Attendance', icon: CheckCircle2 },
        { key: 'qr_attendance', label: 'Smart QR & Biometric', icon: QrCode, badge: 'LIVE' },
        { key: 'attendance_history', label: 'Attendance History', icon: Clock },
      ],
    },
    {
      title: 'INSTITUTIONAL & LEAVES',
      items: [
        {
          key: 'leaves',
          label: 'My Leaves',
          icon: FileSpreadsheet,
          badge: pendingLeavesCount > 0 ? `${pendingLeavesCount} Pending` : undefined,
        },
        { key: 'announcements', label: 'Announcements', icon: Megaphone },
        {
          key: 'notifications',
          label: 'Notifications',
          icon: Bell,
          badge: unreadNotificationsCount > 0 ? `${unreadNotificationsCount}` : undefined,
        },
      ],
    },
    {
      title: 'INSIGHTS & CODE',
      items: [
        { key: 'reports', label: 'Attendance Reports', icon: FileSpreadsheet },
        { key: 'analytics', label: 'Analytics & Trends', icon: BarChart3 },
        { key: 'backend_code', label: 'Go API Source Code', icon: Code2, badge: 'Go' },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { key: 'profile', label: 'My Profile', icon: User },
        { key: 'settings', label: 'System Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={`relative z-30 h-screen bg-slate-900/90 border-r border-white/10 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between select-none ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Top Branding */}
      <div>
        <div className="h-20 px-5 flex items-center justify-between border-b border-white/10">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-500/20">
                FA
              </div>
              <div>
                <h1 className="text-sm font-black text-white tracking-wide">SMART ATTEND</h1>
                <p className="text-[10px] text-cyan-400 font-extrabold uppercase">Faculty Portal</p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-10 h-10 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-black text-white text-base shadow">
              FA
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-white border border-white/10 transition"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Navigation Items */}
        <div className="p-3 space-y-6 max-h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!collapsed && (
                <p className="px-3 text-[9px] font-black tracking-wider text-slate-500 uppercase mb-1.5">
                  {group.title}
                </p>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key as FacultyTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 font-semibold'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition ${
                          isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-cyan-400'
                        }`}
                      />
                      {!collapsed && <span className="text-xs tracking-tight">{item.label}</span>}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                          isActive
                            ? 'bg-slate-950 text-cyan-300'
                            : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-3 border-t border-white/10 bg-slate-950/60">
        {!collapsed ? (
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center font-extrabold text-white text-xs shrink-0">
                AT
              </div>
              <div className="overflow-hidden text-left">
                <p className="text-xs font-black text-white truncate">{facultyName}</p>
                <p className="text-[10px] text-cyan-400 font-bold truncate">{departmentName}</p>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onLogout}
            className="w-full p-2.5 rounded-2xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 flex items-center justify-center"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
