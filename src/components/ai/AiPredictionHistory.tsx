import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  History,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Cpu,
  Calendar,
} from 'lucide-react';
import { PredictionHistoryRecord } from '../../types/ai';
import { INITIAL_PREDICTION_HISTORY } from '../../data/aiData';

export const AiPredictionHistory: React.FC = () => {
  const [history] = useState<PredictionHistoryRecord[]>(INITIAL_PREDICTION_HISTORY);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredHistory = history.filter(
    (item) =>
      item.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.predictedResult.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.algorithmUsed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Export header */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <History className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">Historical Prediction Logs & Audit Trail</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search history logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-64"
            />
          </div>

          <button className="px-3 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export Logs (CSV)
          </button>
        </div>
      </div>

      {/* History Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Prediction Scope</th>
                <th className="p-3">Target Name</th>
                <th className="p-3">Predicted Output</th>
                <th className="p-3">Algorithm</th>
                <th className="p-3">Confidence</th>
                <th className="p-3">Action Triggered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filteredHistory.map((row) => (
                <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3 text-slate-400 font-sans">{row.predictionDate}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold">
                      {row.scope}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-white font-sans">{row.targetName}</td>
                  <td className="p-3 text-cyan-300 font-semibold">{row.predictedResult}</td>
                  <td className="p-3 text-slate-400">{row.algorithmUsed}</td>
                  <td className="p-3 text-emerald-400 font-bold">{row.confidenceScore}%</td>
                  <td className="p-3 text-slate-300 font-sans">{row.actionTriggered || 'Auto-Logged'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
