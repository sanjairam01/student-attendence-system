import React, { useState } from 'react';
import {
  UserCog,
  ShieldCheck,
  ShieldAlert,
  Database,
  Settings,
  User,
  CheckCircle2,
  XCircle,
  KeyRound,
  Download,
  RotateCcw,
  Sparkles,
  Lock,
  Plus,
} from 'lucide-react';
import { SystemUser, RolePermission, AuditLog, SystemSettings } from '../../types/superadmin';

interface SystemAuditProps {
  activeSection: 'users' | 'roles' | 'permissions' | 'settings' | 'backup' | 'audit_logs' | 'profile';
  setActiveSection: (sec: 'users' | 'roles' | 'permissions' | 'settings' | 'backup' | 'audit_logs' | 'profile') => void;
  users: SystemUser[];
  setUsers: React.Dispatch<React.SetStateAction<SystemUser[]>>;
  roles: RolePermission[];
  setRoles: React.Dispatch<React.SetStateAction<RolePermission[]>>;
  auditLogs: AuditLog[];
  settings: SystemSettings;
  setSettings: React.Dispatch<React.SetStateAction<SystemSettings>>;
}

export const SystemAndAuditView: React.FC<SystemAuditProps> = ({
  activeSection,
  setActiveSection,
  users,
  setUsers,
  roles,
  setRoles,
  auditLogs,
  settings,
  setSettings,
}) => {
  const [backupProgress, setBackupProgress] = useState(false);

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    );
  };

  const handleBackupNow = () => {
    setBackupProgress(true);
    setTimeout(() => {
      setBackupProgress(false);
      alert('Database dump backup generated successfully: smartattend_db_dump_20260805.sql.gz');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        {[
          { id: 'users', label: 'Users', icon: <UserCog className="w-4 h-4" /> },
          { id: 'roles', label: 'Roles', icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'permissions', label: 'Permissions Matrix', icon: <Lock className="w-4 h-4" /> },
          { id: 'settings', label: 'System Settings', icon: <Settings className="w-4 h-4" /> },
          { id: 'backup', label: 'Database Backup', icon: <Database className="w-4 h-4" /> },
          { id: 'audit_logs', label: 'Audit Logs', icon: <ShieldAlert className="w-4 h-4" /> },
          { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs transition ${
              activeSection === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* USERS MANAGEMENT */}
      {activeSection === 'users' && (
        <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl overflow-hidden">
          <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-base font-bold text-white">System Users & Accounts</h2>
            <span className="text-xs text-cyan-300">Total Accounts: {users.length}</span>
          </div>
          <table className="w-full text-left text-xs text-slate-200">
            <thead className="bg-slate-950/60 border-b border-white/10 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/5 transition">
                  <td className="p-4">
                    <span className="font-bold text-white block">{u.name}</span>
                    <span className="text-[11px] text-slate-400 block">{u.email}</span>
                  </td>
                  <td className="p-4 font-semibold text-cyan-300">{u.role}</td>
                  <td className="p-4 text-slate-400">{u.lastLogin}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase border ${
                        u.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition ${
                          u.status === 'Active'
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                        }`}
                      >
                        {u.status === 'Active' ? 'Disable' : 'Enable'}
                      </button>
                      <button
                        onClick={() => alert(`Password reset link dispatched to ${u.email}`)}
                        className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                        title="Reset Password"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ROLES & PERMISSIONS */}
      {(activeSection === 'roles' || activeSection === 'permissions') && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((r) => (
              <div key={r.roleId} className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-white">{r.roleName}</h3>
                    <p className="text-xs text-slate-400">{r.description}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 text-[10px] font-bold">
                    SYSTEM ROLE
                  </span>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3 text-xs">
                  <span className="font-bold text-slate-300 block uppercase tracking-wider text-[10px]">Permissions Checklist</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Students CRUD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Faculty CRUD
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Attendance Override
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Master Settings
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SYSTEM SETTINGS */}
      {activeSection === 'settings' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-6 max-w-2xl mx-auto text-xs">
          <h2 className="text-base font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <span>Master College & Platform Settings</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">College / Institution Name</label>
              <input
                type="text"
                value={settings.collegeName}
                onChange={(e) => setSettings({ ...settings, collegeName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Academic Year</label>
                <input
                  type="text"
                  value={settings.academicYear}
                  onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Active Semester</label>
                <input
                  type="text"
                  value={settings.semester}
                  onChange={(e) => setSettings({ ...settings, semester: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Timezone</label>
                <input
                  type="text"
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Email SMTP Gateway</label>
                <input
                  type="text"
                  value={settings.emailSmtp}
                  onChange={(e) => setSettings({ ...settings, emailSmtp: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>
            </div>

            <button
              onClick={() => alert('Master Settings saved successfully!')}
              className="w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* DATABASE BACKUP */}
      {activeSection === 'backup' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-6 max-w-xl mx-auto text-center">
          <Database className="w-12 h-12 mx-auto text-cyan-400" />
          <div>
            <h2 className="text-lg font-bold text-white">Database Backup & Disaster Recovery</h2>
            <p className="text-xs text-slate-400 mt-1">Automatic backups are currently set to <span className="text-emerald-400 font-bold">Daily</span>.</p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleBackupNow}
              disabled={backupProgress}
              className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{backupProgress ? 'Creating Dump...' : 'Trigger Immediate Backup'}</span>
            </button>
          </div>
        </div>
      )}

      {/* AUDIT LOGS */}
      {activeSection === 'audit_logs' && (
        <div className="rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl overflow-hidden text-xs">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-base font-bold text-white">Security & Activity Audit Logs</h2>
          </div>
          <table className="w-full text-left text-slate-200">
            <thead className="bg-slate-950/60 border-b border-white/10 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Details</th>
                <th className="p-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-mono text-slate-400">{log.timestamp}</td>
                  <td className="p-4 font-semibold text-cyan-300">{log.user}</td>
                  <td className="p-4 font-bold text-white">{log.action}</td>
                  <td className="p-4 text-slate-300">{log.details}</td>
                  <td className="p-4 font-mono text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PROFILE */}
      {activeSection === 'profile' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-xl space-y-6 max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 mx-auto flex items-center justify-center font-black text-2xl text-white shadow-xl">
            SA
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Chief Super Admin</h2>
            <p className="text-xs text-cyan-300 font-mono">superadmin@smartattend.edu</p>
            <p className="text-xs text-slate-400 mt-1">Full System Authority Granted</p>
          </div>
        </div>
      )}
    </div>
  );
};
