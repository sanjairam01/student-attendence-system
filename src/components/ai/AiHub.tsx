import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Users,
  Building2,
  Lightbulb,
  Cpu,
  History,
  Bot,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Activity,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { AiDashboardWidget } from './AiDashboardWidget';
import { AiAttendancePrediction } from './AiAttendancePrediction';
import { AiRiskAnalysis } from './AiRiskAnalysis';
import { AiFacultyDepartmentAnalysis } from './AiFacultyDepartmentAnalysis';
import { AiRecommendations } from './AiRecommendations';
import { AiModelTraining } from './AiModelTraining';
import { AiPredictionHistory } from './AiPredictionHistory';
import { AiChatbot } from './AiChatbot';
import { AiGoSourceViewer } from './AiGoSourceViewer';
import { INITIAL_RISK_STUDENTS, INITIAL_RECOMMENDATIONS, INITIAL_DEPARTMENT_ANALYSIS } from '../../data/aiData';

export type AiTab =
  | 'DASHBOARD'
  | 'PREDICTION'
  | 'RISK_ANALYSIS'
  | 'FACULTY_DEPT'
  | 'RECOMMENDATIONS'
  | 'MODEL_TRAINING'
  | 'HISTORY'
  | 'CHATBOT'
  | 'GO_BACKEND';

interface AiHubProps {
  onBackToApp?: () => void;
}

export const AiHub: React.FC<AiHubProps> = ({ onBackToApp }) => {
  const [activeTab, setActiveTab] = useState<AiTab>('DASHBOARD');

  const navTabs = [
    { id: 'DASHBOARD', label: 'AI Dashboard', icon: Brain },
    { id: 'PREDICTION', label: 'Attendance Prediction', icon: TrendingUp },
    { id: 'RISK_ANALYSIS', label: 'Risk Analysis', icon: ShieldAlert },
    { id: 'FACULTY_DEPT', label: 'Faculty & Dept', icon: Building2 },
    { id: 'RECOMMENDATIONS', label: 'Recommendations', icon: Lightbulb },
    { id: 'MODEL_TRAINING', label: 'Model Training', icon: Cpu },
    { id: 'HISTORY', label: 'Prediction History', icon: History },
    { id: 'CHATBOT', label: 'AI Assistant', icon: Bot },
    { id: 'GO_BACKEND', label: 'Go Source Architecture', icon: Code2 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 font-sans relative overflow-x-hidden">
      {/* iOS 26 Liquid Glass Background Lights */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Top Header */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white shadow-xl">
              <Brain className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Smart Attendance AI Module
                </h1>
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-mono">
                  v3.5 ML Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Predictive Analytics • Automated Risk Intervention • Deep Neural Forecasts • Go Microservices
              </p>
            </div>
          </div>

          {/* Quick Status Pills */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs font-mono">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">ML Model:</span>
              <span className="text-emerald-400 font-bold">XGBoost Active</span>
            </div>

            {onBackToApp && (
              <button
                onClick={onBackToApp}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer"
              >
                Back to Core App
              </button>
            )}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex flex-wrap items-center gap-1 overflow-x-auto">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AiTab)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'DASHBOARD' && (
              <div className="space-y-8">
                {/* Widgets Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <AiDashboardWidget
                    title="Predicted Attendance"
                    value="84.2%"
                    subtitle="End-of-Semester Forecast"
                    trend="UP"
                    trendValue="+1.8%"
                    icon={TrendingUp}
                    gradient="bg-cyan-500"
                    badgeText="XGBoost Active"
                    badgeType="info"
                    onClick={() => setActiveTab('PREDICTION')}
                  />

                  <AiDashboardWidget
                    title="Risk Students"
                    value="5"
                    subtitle="3 Requiring Counselling"
                    trend="DOWN"
                    trendValue="-2"
                    icon={ShieldAlert}
                    gradient="bg-rose-500"
                    badgeText="Action Required"
                    badgeType="danger"
                    onClick={() => setActiveTab('RISK_ANALYSIS')}
                  />

                  <AiDashboardWidget
                    title="Class Health Index"
                    value="88/100"
                    subtitle="Based on 4 Departments"
                    trend="STABLE"
                    trendValue="Optimal"
                    icon={Activity}
                    gradient="bg-emerald-500"
                    badgeText="Healthy"
                    badgeType="success"
                    onClick={() => setActiveTab('FACULTY_DEPT')}
                  />

                  <AiDashboardWidget
                    title="AI Recommendations"
                    value="4"
                    subtitle="2 Urgent Interventions"
                    trend="UP"
                    trendValue="New"
                    icon={Lightbulb}
                    gradient="bg-amber-500"
                    badgeText="Auto-Generated"
                    badgeType="warning"
                    onClick={() => setActiveTab('RECOMMENDATIONS')}
                  />
                </div>

                {/* Main Dashboard Quick Overview Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* High Risk Students Quick List */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-rose-400" />
                        Immediate Risk Students
                      </h3>
                      <button
                        onClick={() => setActiveTab('RISK_ANALYSIS')}
                        className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        View All <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {INITIAL_RISK_STUDENTS.slice(0, 3).map((student) => (
                        <div
                          key={student.id}
                          className="p-4 rounded-xl bg-slate-950 border border-white/5 flex flex-wrap items-center justify-between gap-3"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{student.fullName}</span>
                              <span className="text-[10px] text-cyan-400 font-mono px-1.5 py-0.5 rounded bg-cyan-500/10">
                                {student.rollNumber}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {student.department} • {student.primaryRiskReason}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-bold text-rose-400 font-mono">
                              {student.failRiskProbability}% Fail Risk
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {student.currentAttendancePct}% → {student.predictedAttendancePct}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Today's Recommendations Preview */}
                  <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        Today's AI Actions
                      </h3>
                      <button
                        onClick={() => setActiveTab('RECOMMENDATIONS')}
                        className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
                      >
                        Details
                      </button>
                    </div>

                    <div className="space-y-3">
                      {INITIAL_RECOMMENDATIONS.slice(0, 3).map((rec) => (
                        <div key={rec.id} className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1 text-xs">
                          <span className="text-[10px] uppercase font-bold text-amber-400">{rec.type.replace(/_/g, ' ')}</span>
                          <p className="text-slate-300">{rec.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'PREDICTION' && <AiAttendancePrediction />}
            {activeTab === 'RISK_ANALYSIS' && <AiRiskAnalysis />}
            {activeTab === 'FACULTY_DEPT' && <AiFacultyDepartmentAnalysis />}
            {activeTab === 'RECOMMENDATIONS' && <AiRecommendations />}
            {activeTab === 'MODEL_TRAINING' && <AiModelTraining />}
            {activeTab === 'HISTORY' && <AiPredictionHistory />}
            {activeTab === 'CHATBOT' && <AiChatbot />}
            {activeTab === 'GO_BACKEND' && <AiGoSourceViewer />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
