import React, { useState } from 'react';
import { FileSpreadsheet, Plus, CheckCircle2, Clock, XCircle, FileText, Upload, Calendar } from 'lucide-react';
import { StudentLeaveApplication } from '../../types/student';

interface StudentLeaveProps {
  leaves: StudentLeaveApplication[];
  onApplyLeave: (newLeave: Omit<StudentLeaveApplication, 'id' | 'status' | 'appliedOn'>) => void;
}

export const StudentLeaveView: React.FC<StudentLeaveProps> = ({ leaves, onApplyLeave }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState<'Casual' | 'Medical' | 'Duty' | 'Special'>('Casual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [medicalCertName, setMedicalCertName] = useState('');

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyLeave({
      leaveType,
      startDate,
      endDate,
      daysCount: calculateDays(),
      reason,
      medicalCertName: medicalCertName || undefined,
    });
    setShowApplyModal(false);
    setReason('');
    setStartDate('');
    setEndDate('');
    setMedicalCertName('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Student Leave Applications</h2>
          <p className="text-xs text-slate-400 font-medium">
            Submit duty or medical leave requests for approval by Department Head & Class Advisor.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for New Leave</span>
        </button>
      </div>

      {/* Applied Leaves List */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
          Application Audit Log ({leaves.length})
        </h3>

        <div className="space-y-3">
          {leaves.map((leave) => (
            <div
              key={leave.id}
              className="p-5 rounded-2xl bg-slate-800/40 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {leave.leaveType} Leave
                  </span>
                  <span className="text-xs font-black text-white font-mono">
                    {leave.startDate} to {leave.endDate} ({leave.daysCount} Days)
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1.5 ${
                    leave.status === 'Approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : leave.status === 'Rejected'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {leave.status === 'Approved' && <CheckCircle2 className="w-3 h-3" />}
                  {leave.status === 'Pending' && <Clock className="w-3 h-3" />}
                  {leave.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                  {leave.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{leave.reason}</p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Applied On: {leave.appliedOn}</span>
                {leave.medicalCertName && (
                  <span className="text-cyan-400 font-mono flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" /> {leave.medicalCertName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Apply for Absence / Leave
              </h3>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Category / Type</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                >
                  <option value="Casual">Casual Leave</option>
                  <option value="Medical">Medical Leave (Doctor Advised)</option>
                  <option value="Duty">On-Duty / Hackathon / Event</option>
                  <option value="Special">Special Institutional Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Reason for Leave</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Explain why you are requesting leave..."
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-slate-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Attach Document (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Doctor_Note.pdf or Event_Invitation.pdf"
                  value={medicalCertName}
                  onChange={(e) => setMedicalCertName(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white placeholder-slate-400"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
