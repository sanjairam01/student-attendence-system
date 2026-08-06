import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  UserCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Send,
  MessageSquare,
} from 'lucide-react';
import { AiRecommendationItem } from '../../types/ai';
import { INITIAL_RECOMMENDATIONS } from '../../data/aiData';

export const AiRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AiRecommendationItem[]>(INITIAL_RECOMMENDATIONS);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const handleAction = (id: string, status: 'ACTIONED' | 'DISMISSED') => {
    setRecommendations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, status } : rec))
    );
    setActionSuccessMsg(`Recommendation updated to ${status}`);
    setTimeout(() => setActionSuccessMsg(null), 2000);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">HIGH PRIORITY</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">MEDIUM PRIORITY</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">LOW PRIORITY</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">Autonomous AI Recommendation Engine</h2>
            <p className="text-xs text-slate-400">Prescriptive insights for students, faculty & academic administration</p>
          </div>
        </div>

        {actionSuccessMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {actionSuccessMsg}
          </motion.div>
        )}
      </div>

      {/* Recommendation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec) => (
          <motion.div
            key={rec.id}
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-2xl border backdrop-blur-xl space-y-4 relative overflow-hidden transition-all duration-300 ${
              rec.status === 'ACTIONED'
                ? 'bg-slate-900/30 border-white/5 opacity-60'
                : 'bg-slate-900/70 border-white/10 hover:border-cyan-500/30'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-slate-800 text-cyan-400 border border-white/10">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">
                    {rec.targetType}: {rec.targetName}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{rec.type.replace(/_/g, ' ')}</h3>
                </div>
              </div>
              {getPriorityBadge(rec.priority)}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/5">
              {rec.description}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-slate-400">
              <span>Triggered {rec.createdAt}</span>

              {rec.status === 'PENDING' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAction(rec.id, 'DISMISSED')}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-semibold transition-all"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => handleAction(rec.id, 'ACTIONED')}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg hover:opacity-90 cursor-pointer"
                  >
                    Execute Action <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Actioned
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
