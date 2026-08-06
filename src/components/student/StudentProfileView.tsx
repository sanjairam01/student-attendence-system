import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Key, Save, CheckCircle2, Building, HeartPulse } from 'lucide-react';
import { StudentProfile } from '../../types/student';

interface StudentProfileProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

export const StudentProfileView: React.FC<StudentProfileProps> = ({ profile, onUpdateProfile }) => {
  const [formData, setFormData] = useState({
    email: profile.email,
    phone: profile.phone,
    address: profile.address,
    emergencyContact: profile.emergencyContact,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [updatedSuccess, setUpdatedSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setUpdatedSuccess(true);
    setTimeout(() => setUpdatedSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) return;
    setPasswordSuccess(true);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Student Identity Card */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-6 shadow-2xl">
        <img
          src={profile.avatarUrl}
          alt={profile.fullName}
          className="w-24 h-24 rounded-3xl object-cover border-2 border-cyan-400 shadow-xl"
        />

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-2xl font-black text-white">{profile.fullName}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Active Student
            </span>
          </div>

          <p className="text-xs text-slate-300 font-medium">
            {profile.department} • {profile.course}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs font-mono">
            <span className="text-slate-400">
              Roll #: <strong className="text-cyan-300">{profile.rollNumber}</strong>
            </span>
            <span className="text-slate-400">
              Reg #: <strong className="text-cyan-300">{profile.registerNumber}</strong>
            </span>
            <span className="text-slate-400">
              Adm #: <strong className="text-cyan-300">{profile.admissionNumber}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Academic Info & Personal Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Profile Details */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10 flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            <span>Academic & Institutional Mapping</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Semester & Section:</span>
              <span className="font-bold text-white">
                {profile.semester} ({profile.section})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Date of Birth:</span>
              <span className="font-bold text-white">{profile.dob}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Gender:</span>
              <span className="font-bold text-white">{profile.gender}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Blood Group:</span>
              <span className="font-bold text-rose-400 font-mono">{profile.bloodGroup}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-slate-400">Parent / Guardian Name:</span>
              <span className="font-bold text-white">{profile.parentName}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Parent Contact Phone:</span>
              <span className="font-mono font-bold text-cyan-300">{profile.parentPhone}</span>
            </div>
          </div>
        </div>

        {/* Editable Contact Info Form */}
        <form
          onSubmit={handleProfileSubmit}
          className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Contact & Address Settings</span>
            </h3>
            {updatedSuccess && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Profile Updated
              </span>
            )}
          </div>

          <div className="space-y-3">
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
              <label className="text-xs font-bold text-slate-300">Student Phone Number</label>
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

            <div>
              <label className="text-xs font-bold text-slate-300">Emergency Contact Info</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </form>
      </div>

      {/* Change Password Form */}
      <form
        onSubmit={handlePasswordSubmit}
        className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4 max-w-xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400" />
            <span>Security & Credential Management</span>
          </h3>
          {passwordSuccess && (
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Password Changed
            </span>
          )}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-300">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300">Confirm Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};
