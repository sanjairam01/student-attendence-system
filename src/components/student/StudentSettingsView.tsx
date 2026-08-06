import React, { useState } from 'react';
import { Settings, Bell, Shield, Moon, Save, CheckCircle2 } from 'lucide-react';

export const StudentSettingsView: React.FC = () => {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [lowAttendanceAlert, setLowAttendanceAlert] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Portal & Alert Preferences</h2>
          <p className="text-xs text-slate-400 font-medium">Configure notification channels and display settings.</p>
        </div>
        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <Bell className="w-4 h-4 text-cyan-400" />
            <span>Notification Triggers</span>
          </h3>

          <div className="space-y-3 text-xs font-semibold text-slate-300">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40">
              <span>Receive Email Alerts for Low Attendance Thresholds</span>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-white/10 text-cyan-500 focus:ring-cyan-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40">
              <span>Receive SMS Instant Alerts for Absences</span>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-white/10 text-cyan-500 focus:ring-cyan-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40">
              <span>Warn when attendance drops below 80%</span>
              <input
                type="checkbox"
                checked={lowAttendanceAlert}
                onChange={(e) => setLowAttendanceAlert(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-900 border-white/10 text-cyan-500 focus:ring-cyan-500"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </form>
    </div>
  );
};
