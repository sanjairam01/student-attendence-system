import React, { useState } from 'react';
import { FileSpreadsheet, Check, X, Filter, Clock, AlertTriangle } from 'lucide-react';
import { LeaveRequest } from '../../types/admin';

interface LeavesProps {
  leaves: LeaveRequest[];
  setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
  onApproveLeave: (id: string) => void;
  onRejectLeave: (id: string) => void;
}

export const AdminLeavesManagement: React.FC<LeavesProps> = ({
  leaves,
  setLeaves,
  onApproveLeave,
  onRejectLeave,
}) => {
  const [applicantType, setApplicantType] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [commentModalLeave, setCommentModalLeave] = useState<{ id: string; action: 'Approve' | 'Reject' } | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleConfirmAction = () => {
    if (!commentModalLeave) return;
    if (commentModalLeave.action === 'Approve') {
      onApproveLeave(commentModalLeave.id);
    } else {
      onRejectLeave(commentModalLeave.id);
    }
    // save comment if present
    setLeaves((prev) =>
      prev.map((l) => (l.id === commentModalLeave.id ? { ...l, adminComment: commentText } : l))
    );
    setCommentModalLeave(null);
    setCommentText('');
  };

  const filteredLeaves = leaves.filter((l) => {
    const matchesType = applicantType === 'ALL' || l.applicantType === applicantType;
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl">
        <div className="space-y-1">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            <span>Institutional Leave & Medical Application Desk</span>
          </h2>
          <p className="text-xs text-slate-400">
            Review and approve leave applications for both student body and teaching staff.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={applicantType}
            onChange={(e) => setApplicantType(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
          >
            <option value="ALL">All Applicants (Students & Faculty)</option>
            <option value="Student">Student Applications</option>
            <option value="Faculty">Faculty Applications</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-xs text-white"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending Approval</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeaves.map((leave) => (
          <div
            key={leave.id}
            className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl space-y-3 hover:border-amber-500/40 transition"
          >
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    leave.applicantType === 'Faculty'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {leave.applicantType}
                </span>
                <h4 className="font-extrabold text-white text-base mt-1.5">
                  {leave.applicantName}
                </h4>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                  leave.status === 'Approved'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : leave.status === 'Rejected'
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                }`}
              >
                {leave.status}
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-3 bg-slate-950/40 p-3 rounded-2xl border border-white/5">
              "{leave.reason}"
            </p>

            <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Duration:</span>
                <span className="font-bold text-white">
                  {leave.startDate} to {leave.endDate}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Days:</span>
                <span className="font-bold text-cyan-300">{leave.daysCount} Days</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Applied On:</span>
                <span>{leave.appliedOn}</span>
              </div>
            </div>

            {leave.status === 'Pending' ? (
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => setCommentModalLeave({ id: leave.id, action: 'Approve' })}
                  className="w-1/2 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve</span>
                </button>

                <button
                  onClick={() => setCommentModalLeave({ id: leave.id, action: 'Reject' })}
                  className="w-1/2 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            ) : (
              leave.adminComment && (
                <p className="text-[10px] text-slate-400 italic">
                  Admin Note: {leave.adminComment}
                </p>
              )
            )}
          </div>
        ))}
      </div>

      {/* COMMENT MODAL */}
      {commentModalLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4 text-xs">
            <h3 className="font-black text-white text-base">
              {commentModalLeave.action} Leave Application
            </h3>
            <p className="text-slate-400">Provide an optional admin note for the applicant:</p>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="e.g. Approved under medical quota..."
              className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-white/10 text-white focus:outline-none focus:border-cyan-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCommentModalLeave(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-5 py-2 rounded-xl font-black text-slate-950 ${
                  commentModalLeave.action === 'Approve' ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              >
                Confirm {commentModalLeave.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
