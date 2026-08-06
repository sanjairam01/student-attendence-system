import React, { useState } from 'react';
import { Settings, Bell, Save, CheckCircle2 } from 'lucide-react';

export const ParentSettingsView: React.FC = () => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
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
          <h2 className="text-xl font-black text-white">Guardian SMS & Alert Settings</h2>
          <p className="text-xs text-slate-400 font-medium">Configure alert triggers for student attendance.</p>
        </div>
        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
        <div className="space-y-3 text-xs font-semibold text-slate-300">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40">
            <span>Instant SMS Alert when Child is Marked Absent</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-white/10 text-amber-500 focus:ring-amber-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40">
            <span>Weekly Attendance Summary Email Digest</span>
            <input
              type="checkbox"
              checked={emailDigest}
              onChange={(e) => setEmailDigest(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-white/10 text-amber-500 focus:ring-amber-500"
            />
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};
