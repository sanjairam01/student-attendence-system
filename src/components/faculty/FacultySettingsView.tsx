import React, { useState } from 'react';
import { Settings, Save, Bell, ShieldCheck, MapPin, QrCode, CheckCircle2 } from 'lucide-react';

export const FacultySettingsView: React.FC = () => {
  const [qrDuration, setQrDuration] = useState(180);
  const [gpsRadius, setGpsRadius] = useState(50);
  const [lowAttThreshold, setLowAttThreshold] = useState(75);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Faculty System Preferences</h2>
          <p className="text-xs text-slate-400 font-medium">
            Configure default QR token timeouts, geofencing radius, and automatic student warning triggers.
          </p>
        </div>

        {saved && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* QR & Hardware Settings */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <QrCode className="w-4 h-4 text-cyan-400" />
            <span>Smart QR & Biometric Hardware Settings</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300">QR Code Expiration (Seconds)</label>
              <input
                type="number"
                value={qrDuration}
                onChange={(e) => setQrDuration(Number(e.target.value))}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">GPS Geofence Radius (Meters)</label>
              <input
                type="number"
                value={gpsRadius}
                onChange={(e) => setGpsRadius(Number(e.target.value))}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Attendance Thresholds */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Defaulter Threshold & Triggers</span>
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-300">
              Low Attendance Defaulter Threshold (%) — Currently {lowAttThreshold}%
            </label>
            <input
              type="range"
              min="50"
              max="90"
              value={lowAttThreshold}
              onChange={(e) => setLowAttThreshold(Number(e.target.value))}
              className="w-full mt-2 accent-cyan-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span>Send automatic email alerts to students when attendance drops below threshold</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="w-4 h-4 accent-cyan-400 rounded"
              />
              <span>Dispatch parent SMS notifications for unexcused class absences</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save System Preferences</span>
        </button>
      </form>
    </div>
  );
};
