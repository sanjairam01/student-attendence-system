import React from 'react';
import { FileText, Download, Printer } from 'lucide-react';
import { SubjectAttendance } from '../../types/student';

interface ParentReportsProps {
  childName: string;
  subjects: SubjectAttendance[];
}

export const ParentReportsView: React.FC<ParentReportsProps> = ({ childName, subjects }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Context Header */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Guardian Official Statement for {childName}</h2>
          <p className="text-xs text-slate-400 font-medium">Download or print official transcript report.</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Statement</span>
        </button>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/10 space-y-6">
        <div className="pb-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-amber-400">APEX INSTITUTE OF TECHNOLOGY</span>
            <h3 className="text-2xl font-black text-white">Official Attendance Report</h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Child: {childName}</p>
          </div>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-400 font-bold uppercase">
              <tr>
                <th className="p-3.5">Subject</th>
                <th className="p-3.5">Instructor</th>
                <th className="p-3.5">Lectures</th>
                <th className="p-3.5">Attended</th>
                <th className="p-3.5">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {subjects.map((s) => (
                <tr key={s.id}>
                  <td className="p-3.5 font-bold text-white">{s.subjectName}</td>
                  <td className="p-3.5">{s.facultyName}</td>
                  <td className="p-3.5">{s.totalClasses}</td>
                  <td className="p-3.5">{s.attendedClasses}</td>
                  <td className="p-3.5 font-mono font-black text-amber-400">{s.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
