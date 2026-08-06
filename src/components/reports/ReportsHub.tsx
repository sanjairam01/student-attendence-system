import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Clock,
  Code2,
  ShieldAlert,
  UserCheck,
  Building2,
  Lock,
} from 'lucide-react';
import { UserRole } from '../../types/reports';
import { INITIAL_OVERVIEW_KPI, WEEKLY_ATTENDANCE_TREND, DEPARTMENT_STATS } from '../../data/reportsData';
import { DashboardAnalyticsView } from './DashboardAnalyticsView';
import { AttendanceAnalyticsView } from './AttendanceAnalyticsView';
import { AdvancedAnalyticsView } from './AdvancedAnalyticsView';
import { ReportGeneratorView } from './ReportGeneratorView';
import { ReportSchedulerView } from './ReportSchedulerView';
import { ReportsGoSourceViewer } from './ReportsGoSourceViewer';

interface ReportsHubProps {
  currentRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export const ReportsHub: React.FC<ReportsHubProps> = ({
  currentRole = 'admin',
  onRoleChange,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'analytics' | 'advanced' | 'reports_engine' | 'scheduler' | 'backend_code'
  >('dashboard');

  const [activeRole, setActiveRole] = useState<UserRole>(currentRole);

  const handleRoleSelect = (role: UserRole) => {
    setActiveRole(role);
    if (onRoleChange) onRoleChange(role);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans space-y-6 pb-12">
      {/* Top Bar Navigation with Role Authorization Selector */}
      <div className="p-4 bg-slate-900 border-b border-white/10 sticky top-0 z-30 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-slate-950 font-black">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-tight">
                Reports & Analytics Intelligence Hub
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                Unified reporting, export generator, risk telemetry, and automated schedulers.
              </p>
            </div>
          </div>

          {/* Role Context Selector */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 text-xs font-semibold">
            <span className="text-[10px] text-slate-400 font-bold uppercase px-2 flex items-center gap-1">
              <Lock className="w-3 h-3 text-cyan-400" /> Role Context:
            </span>
            {(['superadmin', 'admin', 'faculty', 'student', 'parent'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSelect(r)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold uppercase transition ${
                  activeRole === r
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="p-2 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'analytics'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Attendance Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'advanced'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Heatmap & Defaulters</span>
          </button>

          <button
            onClick={() => setActiveTab('reports_engine')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'reports_engine'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Report Engine & Export</span>
          </button>

          {(activeRole === 'superadmin' || activeRole === 'admin') && (
            <button
              onClick={() => setActiveTab('scheduler')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
                activeTab === 'scheduler'
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Report Scheduler</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('backend_code')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === 'backend_code'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Go Source Code</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <main>
        {activeTab === 'dashboard' && (
          <DashboardAnalyticsView
            stats={INITIAL_OVERVIEW_KPI}
            weeklyTrend={WEEKLY_ATTENDANCE_TREND}
            departments={DEPARTMENT_STATS}
          />
        )}

        {activeTab === 'analytics' && <AttendanceAnalyticsView />}

        {activeTab === 'advanced' && <AdvancedAnalyticsView />}

        {activeTab === 'reports_engine' && <ReportGeneratorView />}

        {activeTab === 'scheduler' && <ReportSchedulerView />}

        {activeTab === 'backend_code' && <ReportsGoSourceViewer />}
      </main>
    </div>
  );
};
