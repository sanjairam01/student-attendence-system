import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertOctagon,
  UserCheck,
  Mail,
  Phone,
  MessageSquare,
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { RiskStudentItem, RiskLevel } from '../../types/ai';
import { INITIAL_RISK_STUDENTS } from '../../data/aiData';

export const AiRiskAnalysis: React.FC = () => {
  const [students, setStudents] = useState<RiskStudentItem[]>(INITIAL_RISK_STUDENTS);
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStudentForEmail, setSelectedStudentForEmail] = useState<RiskStudentItem | null>(null);
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [emailSentSuccess, setEmailSentSuccess] = useState<boolean>(false);

  const filteredStudents = students.filter((s) => {
    const matchesFilter = selectedRiskFilter === 'ALL' || s.riskLevel === selectedRiskFilter;
    const matchesQuery =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const handleOpenEmailModal = (student: RiskStudentItem) => {
    setSelectedStudentForEmail(student);
    setEmailSubject(`URGENT: Low Attendance Warning Notice - ${student.fullName} (${student.rollNumber})`);
    setEmailBody(
      `Dear Parent / Guardian,\n\nThis is an automated communication from Smart Attendance AI System.\n\n` +
      `Student Name: ${student.fullName}\n` +
      `Roll No: ${student.rollNumber}\n` +
      `Department: ${student.department}\n` +
      `Current Attendance: ${student.currentAttendancePct}%\n` +
      `Predicted End-of-Term Attendance: ${student.predictedAttendancePct}%\n\n` +
      `Primary Observation: ${student.primaryRiskReason}\n\n` +
      `As the attendance is projected to fall below the mandatory 75% institutional threshold, please attend a counselling session with the Head of Department.\n\n` +
      `Regards,\nOffice of Academic Affairs`
    );
    setEmailSentSuccess(false);
  };

  const handleSendEmail = () => {
    setEmailSentSuccess(true);
    setTimeout(() => {
      setSelectedStudentForEmail(null);
      setEmailSentSuccess(false);
    }, 1500);
  };

  const getRiskBadge = (level: RiskLevel) => {
    switch (level) {
      case 'CRITICAL':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1"><AlertOctagon className="w-3.5 h-3.5" /> CRITICAL RISK</span>;
      case 'HIGH':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> HIGH RISK</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">MEDIUM RISK</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">LOW RISK</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/20 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">1</div>
            <div className="text-xs text-rose-300 font-medium">Critical Risk Students</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/20 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">2</div>
            <div className="text-xs text-amber-300 font-medium">High Risk Students</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">3</div>
            <div className="text-xs text-cyan-300 font-medium">Counselling Flagged</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white font-mono">92.5%</div>
            <div className="text-xs text-purple-300 font-medium">Max Fail Probability</div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, roll number, department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-72"
            />
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((risk) => (
              <button
                key={risk}
                onClick={() => setSelectedRiskFilter(risk)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedRiskFilter === risk
                    ? 'bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Showing <span className="text-cyan-400 font-bold font-mono">{filteredStudents.length}</span> students at risk
        </div>
      </div>

      {/* Roster Cards / Table */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center text-lg font-bold text-white shadow-inner">
                  {student.fullName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white">{student.fullName}</h3>
                    <span className="text-xs text-cyan-400 font-mono font-semibold bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                      {student.rollNumber}
                    </span>
                    {getRiskBadge(student.riskLevel)}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {student.department} • {student.semester} ({student.course})
                  </p>
                </div>
              </div>

              {/* Attendance & Fail Risk probability */}
              <div className="flex items-center gap-6 text-right">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Current / Predicted</div>
                  <div className="text-sm font-extrabold font-mono text-white">
                    <span className={student.currentAttendancePct < 75 ? 'text-rose-400' : 'text-emerald-400'}>
                      {student.currentAttendancePct}%
                    </span>{' '}
                    →{' '}
                    <span className={student.predictedAttendancePct < 75 ? 'text-rose-400' : 'text-emerald-400'}>
                      {student.predictedAttendancePct}%
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Fail Risk Probability</div>
                  <div className="text-lg font-extrabold font-mono text-rose-400">
                    {student.failRiskProbability}%
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEmailModal(student)}
                    className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Parent Email
                  </button>
                  <a
                    href={`tel:${student.guardianPhone}`}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-all"
                    title={`Call Parent: ${student.guardianPhone}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Risk details banner */}
            <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-rose-300">Primary Risk Factor:</span>
                <span className="text-slate-400">{student.primaryRiskReason}</span>
              </div>
              <div className="flex items-center gap-3">
                {student.consecutiveAbsences > 0 && (
                  <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {student.consecutiveAbsences} Consecutive Absences
                  </span>
                )}
                {student.counsellingRequired && (
                  <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                    Counselling Session Required
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Parent Email Modal */}
      <AnimatePresence>
        {selectedStudentForEmail && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white">Automated Parent Notification</h3>
                </div>
                <button
                  onClick={() => setSelectedStudentForEmail(null)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {emailSentSuccess ? (
                <div className="p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Email Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-400">
                    Alert delivered to guardian contact ({selectedStudentForEmail.guardianPhone}) & email queue.
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">To Guardian of:</label>
                      <input
                        type="text"
                        disabled
                        value={`${selectedStudentForEmail.fullName} (${selectedStudentForEmail.rollNumber})`}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-slate-300 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Subject:</label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Message Body:</label>
                      <textarea
                        rows={8}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-slate-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedStudentForEmail(null)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendEmail}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg hover:opacity-90 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Email Alert
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
