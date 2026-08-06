import React, { useState } from 'react';
import { Settings, User, Building2, Save, ShieldCheck, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { InstitutionSettings } from '../../types/admin';

interface SettingsProps {
  settings: InstitutionSettings;
  setSettings: React.Dispatch<React.SetStateAction<InstitutionSettings>>;
}

export const AdminProfileAndSettings: React.FC<SettingsProps> = ({ settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState<'institution' | 'profile'>('institution');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formSettings, setFormSettings] = useState({ ...settings });
  const [profileData, setProfileData] = useState({
    name: 'Institutional Administrator',
    email: 'admin@apex.edu',
    phone: '+1 (555) 123-9988',
    currentPassword: '',
    newPassword: '',
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Tab bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10">
        <button
          onClick={() => setActiveTab('institution')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === 'institution'
              ? 'bg-cyan-500 text-slate-950 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Institutional Settings</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition ${
            activeTab === 'profile'
              ? 'bg-cyan-500 text-slate-950 font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Admin Security & Profile</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {activeTab === 'institution' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4 text-xs">
          <h3 className="font-extrabold text-white text-base">Institution Profile Configuration</h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Institution Name</label>
                <input
                  type="text"
                  value={formSettings.institutionName}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, institutionName: e.target.value })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Academic Year</label>
                <input
                  type="text"
                  value={formSettings.academicYear}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, academicYear: e.target.value })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Current Semester</label>
                <input
                  type="text"
                  value={formSettings.currentSemester}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, currentSemester: e.target.value })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Defaulter Threshold Percentage (%)
                </label>
                <input
                  type="number"
                  value={formSettings.attendanceThresholdPct}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      attendanceThresholdPct: Number(e.target.value),
                    })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white font-bold text-cyan-300"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Institutional Contact Email</label>
                <input
                  type="email"
                  value={formSettings.contactEmail}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, contactEmail: e.target.value })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">SMTP Gateway Host</label>
                <input
                  type="text"
                  value={formSettings.smtpHost}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, smtpHost: e.target.value })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Institution Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-4 text-xs">
          <h3 className="font-extrabold text-white text-base">Admin Account Credentials & Security</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-slate-300 font-bold mb-1">Admin Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Email</label>
              <input
                type="email"
                value={profileData.email}
                disabled
                className="w-full py-2 px-3 rounded-xl bg-slate-950/50 border border-white/5 text-slate-400"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
              <span className="font-bold text-white block">Two-Factor Authentication (2FA)</span>
              <p className="text-slate-400 text-[11px]">
                Enforce mandatory TOTP authenticator app verification for Admin logins.
              </p>
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                2FA Enabled (Hardware Authenticator)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
