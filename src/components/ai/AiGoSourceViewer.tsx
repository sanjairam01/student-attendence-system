import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Copy, Check, FileCode, Server, Database } from 'lucide-react';
import { GO_SOURCE_FILES } from '../../data/aiData';

export const AiGoSourceViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('controllers/ai/ai_controller.go');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    const content = GO_SOURCE_FILES[selectedFile];
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Enterprise Go (Golang) AI REST Service Codebase</h2>
            <p className="text-xs text-slate-400">Clean Architecture Backend • PostgreSQL DDL • Microservice Ready</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          {copied ? 'Copied to Clipboard' : 'Copy Source Code'}
        </button>
      </div>

      {/* File Selector Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-mono">
        {Object.keys(GO_SOURCE_FILES).map((fileName) => (
          <button
            key={fileName}
            onClick={() => setSelectedFile(fileName)}
            className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFile === fileName
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold shadow'
                : 'bg-slate-950/60 text-slate-400 border-white/5 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            {fileName}
          </button>
        ))}
      </div>

      {/* Code Editor Preview Window */}
      <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto max-h-[500px] leading-relaxed relative shadow-inner">
        <pre className="whitespace-pre">{GO_SOURCE_FILES[selectedFile]}</pre>
      </div>
    </div>
  );
};
