import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Award,
  Building,
  MapPin,
  Calendar,
  Lock,
  Save,
  CheckCircle2,
  BookOpen,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { FacultyProfile, FacultySubject, FacultyClass } from '../../types/faculty';

interface ProfileProps {
  profile: FacultyProfile;
  subjects: FacultySubject[];
  classes: FacultyClass[];
  onUpdateProfile: (updated: Partial<FacultyProfile>) => void;
}

export const FacultyProfileView: React.FC<ProfileProps> = ({
  profile,
  subjects,
  classes,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    qualification: profile.qualification,
    officeLocation: profile.officeLocation,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileSuccess, setProfileSuccess] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    setPasswordError('');
    setPasswordSuccess(true);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Profile Header Card */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative group">
          <img
            src={profile.photoUrl}
            alt={profile.name}
            className="w-28 h-28 rounded-3xl object-cover border-2 border-cyan-400 shadow-xl"
          />
          <div className="absolute inset-0 rounded-3xl bg-slate-950/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer">
            <span className="text-[10px] font-black text-white uppercase tracking-wider">Change Photo</span>
          </div>
        </div>

        <div className="text-center md:text-left space-y-2 flex-1">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {profile.facultyId}
            </span>
            <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {profile.designation}
            </span>
          </div>

          <h1 className="text-2xl font-black text-white">{profile.name}</h1>
          <p className="text-xs text-slate-300 font-medium max-w-xl">{profile.qualification}</p>

          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-cyan-400" />
              <span>{profile.departmentName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>{profile.officeLocation}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{profile.experienceYears} Years Academic Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Edit Profile & Change Password */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form 1: Profile Details Form */}
        <form
          onSubmit={handleProfileSubmit}
          className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Update Profile Information
              </h3>
            </div>
            {profileSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved Successfully
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-300">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Qualification & Degrees</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Office Room / Location</label>
              <input
                type="text"
                value={formData.officeLocation}
                onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </form>

        {/* Form 2: Change Password Form */}
        <form
          onSubmit={handlePasswordSubmit}
          className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Security & Change Password
              </h3>
            </div>
            {passwordSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Password Updated
              </span>
            )}
          </div>

          {passwordError && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold">
              {passwordError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-300">Current Password</label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Confirm New Password</label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-xs shadow-lg shadow-indigo-500/20 hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Update Security Password</span>
          </button>
        </form>
      </div>

      {/* Summary Row: Assigned Subjects & Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
            Assigned Subjects ({subjects.length})
          </h3>
          <div className="mt-4 space-y-3">
            {subjects.map((sub) => (
              <div key={sub.id} className="p-3 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{sub.name}</p>
                  <p className="text-[10px] text-slate-400">{sub.code} • {sub.credits} Credits • Sem {sub.semester}</p>
                </div>
                <span className="text-xs font-black text-cyan-400">{sub.avgAttendancePct}% Avg</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
          <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
            Assigned Classes ({classes.length})
          </h3>
          <div className="mt-4 space-y-3">
            {classes.map((cls) => (
              <div key={cls.id} className="p-3 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{cls.name}</p>
                  <p className="text-[10px] text-slate-400">{cls.studentCount} Students • Room: {cls.roomNumber}</p>
                </div>
                <span className="text-xs font-black text-emerald-400">{cls.avgAttendancePct}% Avg</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
