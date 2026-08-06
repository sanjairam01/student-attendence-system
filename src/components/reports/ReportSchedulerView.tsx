import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  Mail,
  Play,
  Plus,
  CheckCircle2,
  PauseCircle,
  FileText,
  Send,
  BellRing,
} from 'lucide-react';
import { INITIAL_SCHEDULED_REPORTS, INITIAL_REPORT_NOTIFICATIONS } from '../../data/reportsData';
import { ScheduledReportItem } from '../../types/reports';

export const ReportSchedulerView: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduledReportItem[]>(INITIAL_SCHEDULED_REPORTS);
  const [notifications, setNotifications] = useState(INITIAL_REPORT_NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newTitle, setNewTitle] = useState('');
  const [newFrequency, setNewFrequency] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SEMESTER'>('WEEKLY');
  const [newRecipient, setNewRecipient] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newRecipient) return;

    const newJob: ScheduledReportItem = {
      id: `sch-${Date.now()}`,
      reportTitle: newTitle,
      frequency: newFrequency,
      recipients: [newRecipient],
      format: 'BOTH',
      lastRun: 'Pending First Trigger',
      nextRun: '2026-08-06 08:00 AM',
      status: 'ACTIVE',
      createdRole: 'admin',
    };

    setSchedules([newJob, ...schedules]);
    setNewTitle('');
    setNewRecipient('');
    triggerToast(`Created automated schedule for "${newJob.reportTitle}"`);
  };

  const handleRunNow = (job: ScheduledReportItem) => {
    triggerToast(`Manually dispatched report "${job.reportTitle}" to ${job.recipients.join(', ')}`);
  };

  const toggleStatus = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : s
      )
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-between shadow-2xl animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Automated Institutional Report Scheduler</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Configure automated cron dispatchers to send PDF/Excel attendance digests to leadership emails.
          </p>
        </div>
      </div>

      {/* Scheduler Form & Active Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* New Cron Job Form */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Create Automated Report Job</span>
          </h3>

          <form onSubmit={handleCreateSchedule} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Report Title</label>
              <input
                type="text"
                placeholder="e.g., Weekly CSE Attendance Audit"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Frequency Schedule</label>
              <select
                value={newFrequency}
                onChange={(e) => setNewFrequency(e.target.value as any)}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-slate-300"
              >
                <option value="DAILY">Daily (06:00 AM)</option>
                <option value="WEEKLY">Weekly (Mondays 08:00 AM)</option>
                <option value="MONTHLY">Monthly (1st of Month)</option>
                <option value="SEMESTER">Semester End Summary</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Recipient Email Address</label>
              <input
                type="email"
                placeholder="dean.academic@university.edu"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 text-slate-950 font-black text-xs shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Schedule Cron Dispatcher</span>
            </button>
          </form>
        </div>

        {/* Existing Scheduled Jobs */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <BellRing className="w-4 h-4 text-cyan-400" />
            <span>Active Scheduled Report Jobs ({schedules.length})</span>
          </h3>

          <div className="space-y-3">
            {schedules.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-800/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 font-mono text-[10px] font-bold">
                      {job.frequency}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase ${
                        job.status === 'ACTIVE' ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      • {job.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white">{job.reportTitle}</h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Mail className="w-3 h-3 text-slate-500" />
                    <span>{job.recipients.join(', ')}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleRunNow(job)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold text-xs border border-cyan-500/30 hover:bg-cyan-500/30 transition flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Now</span>
                  </button>

                  <button
                    onClick={() => toggleStatus(job.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs border border-white/10 hover:text-white transition"
                  >
                    {job.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
