import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, CheckCircle2 } from 'lucide-react';
import { ParentProfile } from '../../types/parent';

interface ParentProfileProps {
  profile: ParentProfile;
  onUpdateProfile: (updated: Partial<ParentProfile>) => void;
}

export const ParentProfileView: React.FC<ParentProfileProps> = ({ profile, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
  });
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setUpdatedSuccess(true);
    setTimeout(() => setUpdatedSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Guardian Contact Profile</h2>
          <p className="text-xs text-slate-400 font-medium">Manage your contact details for emergency institution broadcasts.</p>
        </div>
        {updatedSuccess && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-300">Guardian Name</label>
            <input
              type="text"
              value={profile.parentName}
              disabled
              className="w-full mt-1 bg-slate-800/50 border border-white/5 rounded-2xl px-3.5 py-2 text-xs text-slate-400 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Mobile Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Residential Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
