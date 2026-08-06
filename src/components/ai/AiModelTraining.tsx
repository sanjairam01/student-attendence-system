import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  UploadCloud,
  Play,
  CheckCircle2,
  Database,
  Layers,
  Sparkles,
  Save,
  RotateCcw,
  Sliders,
  Check,
} from 'lucide-react';
import { MLAlgorithm, MlModelInfo, ConfusionMatrix } from '../../types/ai';
import { INITIAL_ML_MODELS } from '../../data/aiData';

export const AiModelTraining: React.FC = () => {
  const [modelsList, setModelsList] = useState<MlModelInfo[]>(INITIAL_ML_MODELS);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<MLAlgorithm>('XGBOOST');
  const [datasetName, setDatasetName] = useState<string>('student_attendance_log_2026.csv');
  const [recordCount, setRecordCount] = useState<number>(45000);

  // Preprocessing Options
  const [handleMissing, setHandleMissing] = useState<boolean>(true);
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(true);
  const [detectOutliers, setDetectOutliers] = useState<boolean>(true);
  const [normalizeFeatures, setNormalizeFeatures] = useState<boolean>(true);
  const [encodeCategoricals, setEncodeCategoricals] = useState<boolean>(true);

  // Training state
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [trainingProgress, setTrainingProgress] = useState<number>(0);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [latestTrainedModel, setLatestTrainedModel] = useState<MlModelInfo | null>(null);

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    setTrainingLogs(['[0.0s] Initializing dataset pipeline...', '[0.2s] Applying pre-processing filters...']);
    setLatestTrainedModel(null);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setTrainingProgress(progress);

      if (progress === 40) {
        setTrainingLogs((prev) => [
          ...prev,
          `[0.8s] Splitting train/test sets (80/20)...`,
          `[1.1s] Fitting ${selectedAlgorithm} estimator...`,
        ]);
      } else if (progress === 80) {
        setTrainingLogs((prev) => [
          ...prev,
          `[2.0s] Computing precision, recall, and cross-validation matrix...`,
        ]);
      } else if (progress >= 100) {
        clearInterval(interval);
        setIsTraining(false);

        // Generate metrics
        const acc = Math.min(98.5, 90 + Math.random() * 8);
        const prec = acc - Math.random() * 2;
        const rec = acc + Math.random() * 1.5;
        const f1 = (2 * prec * rec) / (prec + rec);

        const newModel: MlModelInfo = {
          id: `mdl-${Date.now()}`,
          modelName: `${selectedAlgorithm} Custom Attendance Estimator`,
          algorithm: selectedAlgorithm,
          version: '1.0.0',
          datasetName,
          recordsCount: recordCount,
          accuracy: Number(acc.toFixed(1)),
          precision: Number(prec.toFixed(1)),
          recall: Number(rec.toFixed(1)),
          f1Score: Number(f1.toFixed(1)),
          confusionMatrix: {
            tp: Math.floor(recordCount * 0.18),
            fp: Math.floor(recordCount * 0.012),
            tn: Math.floor(recordCount * 0.78),
            fn: Math.floor(recordCount * 0.028),
          },
          trainedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
          status: 'ACTIVE',
        };

        setLatestTrainedModel(newModel);
        setModelsList((prev) => [newModel, ...prev]);
        setTrainingLogs((prev) => [
          ...prev,
          `[2.5s] Model training complete! Accuracy: ${newModel.accuracy}%, F1: ${newModel.f1Score}%`,
        ]);
      }
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Configuration & Training Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Preprocessing & Algorithm Configuration */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/5">
            <Sliders className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Data Preprocessing & Settings</h3>
          </div>

          {/* Dataset Upload Simulation */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">Upload Training Dataset (CSV)</label>
            <div className="p-4 rounded-xl bg-slate-950 border border-dashed border-white/20 hover:border-cyan-500/50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
              <UploadCloud className="w-6 h-6 text-cyan-400" />
              <div className="text-xs font-semibold text-slate-300">{datasetName}</div>
              <div className="text-[10px] text-slate-500 font-mono">{recordCount.toLocaleString()} records • 14 feature vectors</div>
            </div>
          </div>

          {/* Algorithm Selection */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">Select Machine Learning Algorithm</label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value as MLAlgorithm)}
              className="w-full px-3 py-2 bg-slate-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="XGBOOST">XGBoost (Extreme Gradient Boosting)</option>
              <option value="RANDOM_FOREST">Random Forest Classifier</option>
              <option value="DECISION_TREE">Decision Tree</option>
              <option value="GRADIENT_BOOSTING">Gradient Boosting Machine</option>
              <option value="LOGISTIC_REGRESSION">Logistic Regression</option>
              <option value="SVM">Support Vector Machine (SVM)</option>
              <option value="KNN">K-Nearest Neighbors (KNN)</option>
              <option value="NAIVE_BAYES">Gaussian Naive Bayes</option>
              <option value="NEURAL_NETWORK">Deep Artificial Neural Network</option>
            </select>
          </div>

          {/* Data Preprocessing Options */}
          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-semibold block">Preprocessing Steps</label>
            <div className="space-y-2 text-xs text-slate-300">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={handleMissing}
                  onChange={(e) => setHandleMissing(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
                Missing Values Imputation (Mean/Mode)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeDuplicates}
                  onChange={(e) => setRemoveDuplicates(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
                Deduplication & Record Cleanse
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={detectOutliers}
                  onChange={(e) => setDetectOutliers(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
                Outlier Detection (IQR Thresholding)
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={normalizeFeatures}
                  onChange={(e) => setNormalizeFeatures(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
                Z-Score Feature Normalization
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={encodeCategoricals}
                  onChange={(e) => setEncodeCategoricals(e.target.checked)}
                  className="rounded accent-cyan-500"
                />
                Categorical One-Hot Encoding
              </label>
            </div>
          </div>

          {/* Start Training Button */}
          <button
            onClick={handleStartTraining}
            disabled={isTraining}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className={`w-4 h-4 ${isTraining ? 'animate-spin' : ''}`} />
            {isTraining ? 'Training In Progress...' : 'Execute Model Training'}
          </button>
        </div>

        {/* Right: Real-time Training Execution & Metrics Display */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">Training Engine & Confusion Matrix</h3>
            </div>
            {latestTrainedModel && (
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Model Ready
              </span>
            )}
          </div>

          {/* Progress bar */}
          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">Training Epoch Pipeline</span>
                <span className="text-white font-bold">{trainingProgress}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 h-full rounded-full"
                  style={{ width: `${trainingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Live Logs Terminal */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-[11px] text-cyan-300 h-36 overflow-y-auto space-y-1">
            {trainingLogs.length === 0 ? (
              <span className="text-slate-600">Ready to train. Click "Execute Model Training" to begin.</span>
            ) : (
              trainingLogs.map((log, idx) => <div key={idx}>{log}</div>)
            )}
          </div>

          {/* Trained Metrics & Confusion Matrix */}
          {latestTrainedModel && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-2"
            >
              {/* Score breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Accuracy</div>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono">{latestTrainedModel.accuracy}%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Precision</div>
                  <div className="text-xl font-extrabold text-cyan-400 font-mono">{latestTrainedModel.precision}%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase">Recall</div>
                  <div className="text-xl font-extrabold text-purple-400 font-mono">{latestTrainedModel.recall}%</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-white/10 text-center">
                  <div className="text-[10px] text-slate-400 uppercase">F1 Score</div>
                  <div className="text-xl font-extrabold text-amber-400 font-mono">{latestTrainedModel.f1Score}%</div>
                </div>
              </div>

              {/* Confusion Matrix */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                <div className="text-xs font-bold text-slate-300">Validation Confusion Matrix</div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="text-slate-400 text-[10px]">True Positives (TP)</div>
                    <div className="text-base font-bold text-emerald-400">{latestTrainedModel.confusionMatrix.tp}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                    <div className="text-slate-400 text-[10px]">False Positives (FP)</div>
                    <div className="text-base font-bold text-rose-400">{latestTrainedModel.confusionMatrix.fp}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="text-slate-400 text-[10px]">False Negatives (FN)</div>
                    <div className="text-base font-bold text-amber-400">{latestTrainedModel.confusionMatrix.fn}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-slate-400 text-[10px]">True Negatives (TN)</div>
                    <div className="text-base font-bold text-blue-400">{latestTrainedModel.confusionMatrix.tn}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Model Repository Table */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          Active Model Registry & Trained Artefacts
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-3">Model Name</th>
                <th className="p-3">Algorithm</th>
                <th className="p-3">Dataset</th>
                <th className="p-3">Accuracy</th>
                <th className="p-3">F1 Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Trained Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {modelsList.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                  <td className="p-3 font-bold text-white font-sans">{m.modelName}</td>
                  <td className="p-3 text-cyan-400">{m.algorithm}</td>
                  <td className="p-3 text-slate-400">{m.datasetName}</td>
                  <td className="p-3 text-emerald-400 font-bold">{m.accuracy}%</td>
                  <td className="p-3 text-purple-400 font-bold">{m.f1Score}%</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 text-[11px] font-sans">{m.trainedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
