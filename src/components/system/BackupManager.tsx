import React, { useState } from 'react';
import { Database, Download, Upload, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export const BackupManager: React.FC = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backups, setBackups] = useState([
    { id: 'b-001', filename: 'smart_attendance_backup_2026_08_05.sql.gz', size: '14.2 MB', createdAt: '2026-08-05 02:00:00', type: 'AUTOMATED' },
    { id: 'b-002', filename: 'smart_attendance_backup_2026_08_04.sql.gz', size: '13.9 MB', createdAt: '2026-08-04 02:00:00', type: 'AUTOMATED' }
  ]);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const now = new Date();
      const dateStr = now.toISOString().replace(/[-T:]/g, '_').split('.')[0];
      const newBackup = {
        id: `b-${Date.now()}`,
        filename: `smart_attendance_manual_${dateStr}.sql.gz`,
        size: '14.5 MB',
        createdAt: now.toISOString().replace('T', ' ').substring(0, 19),
        type: 'MANUAL'
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Database Backup & Recovery Manager</h3>
            <p className="text-xs text-slate-400">Automated snapshot schedule & manual disaster recovery export</p>
          </div>
        </div>
        <button
          onClick={handleCreateBackup}
          disabled={isBackingUp}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
        >
          {isBackingUp ? (
            <>Creating Snapshot...</>
          ) : (
            <>
              <Upload className="w-4 h-4" /> Create Manual Snapshot
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {backups.map((b) => (
          <div key={b.id} className="flex items-center justify-between p-3.5 bg-slate-950/50 border border-slate-800 rounded-xl text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-lg text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="font-mono font-medium text-slate-200">{b.filename}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.createdAt}</span>
                  <span>•</span>
                  <span>{b.size}</span>
                  <span>•</span>
                  <span className="text-indigo-400 font-semibold">{b.type}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => alert(`Downloading backup snapshot ${b.filename}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-all"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
