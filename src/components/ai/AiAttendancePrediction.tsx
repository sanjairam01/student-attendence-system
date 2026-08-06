import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  Brain,
  Calendar,
  Filter,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Layers,
  Cpu,
  RefreshCw,
} from 'lucide-react';
import { MLAlgorithm } from '../../types/ai';
import { DAILY_FORECAST_DATA, MONTHLY_FORECAST_DATA } from '../../data/aiData';

export const AiAttendancePrediction: React.FC = () => {
  const [scope, setScope] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY' | 'SEMESTER' | 'YEARLY'>('DAILY');
  const [algorithm, setAlgorithm] = useState<MLAlgorithm>('XGBOOST');
  const [department, setDepartment] = useState<string>('ALL');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const forecastData = scope === 'DAILY' || scope === 'WEEKLY' ? DAILY_FORECAST_DATA : MONTHLY_FORECAST_DATA;

  const handleRefreshForecast = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-white tracking-wide">AI Attendance Prediction Engine</h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time Scope selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-white/10">
            {(['DAILY', 'WEEKLY', 'MONTHLY', 'SEMESTER', 'YEARLY'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setScope(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  scope === s
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Algorithm selector */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">Algo:</span>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value as MLAlgorithm)}
              className="bg-transparent text-white focus:outline-none font-mono text-xs cursor-pointer"
            >
              <option value="XGBOOST" className="bg-slate-900">XGBoost v2.4</option>
              <option value="RANDOM_FOREST" className="bg-slate-900">Random Forest</option>
              <option value="GRADIENT_BOOSTING" className="bg-slate-900">Gradient Boosting</option>
              <option value="NEURAL_NETWORK" className="bg-slate-900">Deep Neural Net</option>
              <option value="DECISION_TREE" className="bg-slate-900">Decision Tree</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <Filter className="w-4 h-4 text-emerald-400" />
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-transparent text-white focus:outline-none font-sans text-xs cursor-pointer"
            >
              <option value="ALL" className="bg-slate-900">All Departments</option>
              <option value="CSE" className="bg-slate-900">Computer Science</option>
              <option value="ECE" className="bg-slate-900">Electronics & Comm.</option>
              <option value="ME" className="bg-slate-900">Mechanical Eng.</option>
              <option value="IT" className="bg-slate-900">Information Tech.</option>
            </select>
          </div>

          <button
            onClick={handleRefreshForecast}
            disabled={isSimulating}
            className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 transition-all cursor-pointer"
            title="Recalculate Predictions"
          >
            <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin text-cyan-300' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Prediction Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                {scope} Predictive Attendance Forecast
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Calculated using <span className="text-cyan-400 font-mono">{algorithm}</span> ML Model with 95% Confidence Interval
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Predicted Avg:</span>
              <div className="text-xl font-extrabold text-cyan-400 font-mono">82.6%</div>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="predGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="boundGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="upperBoundPct" name="Upper Confidence Limit" stroke="#3b82f6" strokeDasharray="3 3" fill="url(#boundGradient)" />
                <Area type="monotone" dataKey="predictedPct" name="Predicted Attendance %" stroke="#06b6d4" strokeWidth={3} fill="url(#predGradient)" />
                <Area type="monotone" dataKey="lowerBoundPct" name="Lower Confidence Limit" stroke="#f43f5e" strokeDasharray="3 3" fill="none" />
                {forecastData[0].actualPct && (
                  <Line type="monotone" dataKey="actualPct" name="Actual Logged %" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Summary Cards */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-400" />
              Peak Absence Window
            </h4>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">
              <span className="font-bold">Friday Afternoons & Pre-Holiday Mondays</span> show an estimated <span className="text-purple-200 underline font-mono">14.2% drop</span> in attendance across all departments.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Defaulter Threshold Warning
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Students &lt; 75% Cutoff:</span>
                <span className="text-amber-400 font-bold font-mono">44 Students</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: '28%' }} />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Model predicts 12 additional students will fall below 75% by end of month if unaddressed.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Model Precision Metrics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5">
                <div className="text-slate-400 text-[10px]">Confidence Score</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">94.8%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/5">
                <div className="text-slate-400 text-[10px]">Mean Abs Error</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">1.2%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
