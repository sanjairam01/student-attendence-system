import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  AlertCircle,
  Trash2,
  FileText,
} from 'lucide-react';
import { FacultyLeaveRequest } from '../../types/faculty';

interface LeaveProps {
  leaves: FacultyLeaveRequest[];
  onApplyLeave: (leave: FacultyLeaveRequest) => void;
  onCancelLeave: (leaveId: string) => void;
}

export const FacultyLeaveView: React.FC<LeaveProps> = ({
  leaves,
  onApplyLeave,
  onCancelLeave,
}) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState<'Casual' | 'Medical' | 'Duty' | 'Earned' | 'Special'>('Casual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [medicalCertName, setMedicalCertName] = useState('');

  const handleFileSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMedicalCertName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) return;

    const newLeave: FacultyLeaveRequest = {
      id: `leave-fac-${Date.now()}`,
      leaveType,
      startDate,
      endDate,
      daysCount: 3, // calculated estimate
      reason,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0],
      medicalCertName: medicalCertName || undefined,
    };

    onApplyLeave(newLeave);
    setShowApplyModal(false);
    setReason('');
    setMedicalCertName('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Faculty Leave Management</h2>
          <p className="text-xs text-slate-400 font-medium">
            Apply for Casual, Duty, or Medical Leave with supporting document verification.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-90 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Apply New Leave</span>
        </button>
      </div>

      {/* Leave History Table */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
        <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
          Leave Request Applications ({leaves.length})
        </h3>

        <div className="mt-4 overflow-x-auto custom-scrollbar border border-white/5 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800/80 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Dates</th>
                <th className="p-3.5">Duration</th>
                <th className="p-3.5">Reason</th>
                <th className="p-3.5">Medical Cert</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {leaves.map((l) => (
                <tr key={l.id} className="hover:bg-white/5 transition">
                  <td className="p-3.5 font-bold text-white">{l.leaveType} Leave</td>
                  <td className="p-3.5 font-mono text-cyan-300">
                    {l.startDate} &rarr; {l.endDate}
                  </td>
                  <td className="p-3.5 font-bold">{l.daysCount} Days</td>
                  <td className="p-3.5 max-w-xs text-slate-400 truncate">{l.reason}</td>
                  <td className="p-3.5">
                    {l.medicalCertName ? (
                      <span className="text-cyan-400 font-mono text-[11px] underline flex items-center gap-1">
                        <FileText className="w-3 h-3" /> {l.medicalCertName}
                      </span>
                    ) : (
                      <span className="text-slate-500">N/A</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        l.status === 'Approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : l.status === 'Pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-right">
                    {l.status === 'Pending' && (
                      <button
                        onClick={() => onCancelLeave(l.id)}
                        className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs font-bold"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg rounded-3xl bg-slate-900 border border-white/10 shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-black text-white">Submit Leave Request</h3>
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value as any)}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2.5 text-xs text-white"
                >
                  <option value="Casual">Casual Leave</option>
                  <option value="Medical">Medical Leave</option>
                  <option value="Duty">On Duty Leave (Conference / Official)</option>
                  <option value="Earned">Earned Leave</option>
                  <option value="Special">Special Circumstance</option>
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
                <label className="text-xs font-bold text-slate-300">Detailed Reason</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide explicit context for institutional approval..."
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3.5 py-2 text-xs text-white"
                  required
                />
              </div>

              {/* Medical Certificate Upload Simulation */}
              <div>
                <label className="text-xs font-bold text-slate-300">Medical / Duty Document Upload</label>
                <div className="mt-1 p-4 rounded-2xl bg-slate-800/60 border border-dashed border-white/20 text-center flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 transition">
                  <Upload className="w-5 h-5 text-cyan-400 mb-1" />
                  <p className="text-xs text-slate-300 font-bold">
                    {medicalCertName || 'Click or drag certificate PDF / image'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg"
                    onChange={handleFileSimulate}
                    className="hidden"
                    id="cert-upload"
                  />
                  <label htmlFor="cert-upload" className="text-[10px] text-cyan-400 font-bold mt-1 cursor-pointer">
                    Browse Files
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg transition"
            >
              Submit Leave Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
