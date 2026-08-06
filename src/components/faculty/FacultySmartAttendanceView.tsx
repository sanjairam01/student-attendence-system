import React, { useState, useEffect } from 'react';
import {
  QrCode,
  Scan,
  Clock,
  MapPin,
  CheckCircle2,
  RefreshCw,
  Fingerprint,
  Radio,
  Eye,
  ShieldCheck,
  AlertCircle,
  Play,
  Square,
  Sparkles,
} from 'lucide-react';
import { QRAttendanceSession, FacultyClass, FacultySubject } from '../../types/faculty';

interface SmartAttendanceProps {
  activeQRSession: QRAttendanceSession;
  classes: FacultyClass[];
  subjects: FacultySubject[];
  onGenerateNewQR: (classId: string, subjectId: string) => void;
}

export const FacultySmartAttendanceView: React.FC<SmartAttendanceProps> = ({
  activeQRSession,
  classes,
  subjects,
  onGenerateNewQR,
}) => {
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || '');

  const [timeLeft, setTimeLeft] = useState(activeQRSession.expiresInSeconds);
  const [isScanningSim, setIsScanningSim] = useState(false);
  const [simulatedScans, setSimulatedScans] = useState(activeQRSession.scannedCount);

  // GPS & Biometric Toggles
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [faceRecogEnabled, setFaceRecogEnabled] = useState(true);
  const [rfidEnabled, setRfidEnabled] = useState(true);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(true);

  // Timer Countdown Effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Simulate Live Scans
  const handleSimulateScan = () => {
    setIsScanningSim(true);
    setTimeout(() => {
      setSimulatedScans((prev) => prev + 1);
      setIsScanningSim(false);
    }, 800);
  };

  const handleGenerate = () => {
    onGenerateNewQR(selectedClassId, selectedSubjectId);
    setTimeLeft(180);
    setSimulatedScans(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Biometric & Dynamic QR Engine</span>
          </div>
          <h2 className="text-xl font-black text-white">Automated Student Attendance Capture</h2>
          <p className="text-xs text-slate-400 font-medium">
            Dynamic encrypted QR token with GPS geolocation radius verification & AI Face Recognition integration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Hardware Ready
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Display Card (2 Cols) */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="w-full flex items-center justify-between pb-4 border-b border-white/10">
            <div className="text-left">
              <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                Active QR Session
              </span>
              <h3 className="text-lg font-black text-white">{activeQRSession.subjectName}</h3>
              <p className="text-xs text-slate-400">{activeQRSession.className}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black text-slate-400 uppercase">Token Validity</span>
              <p className={`text-2xl font-black font-mono ${timeLeft < 30 ? 'text-rose-400 animate-ping' : 'text-cyan-300'}`}>
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>

          {/* Dynamic Encrypted QR Code Simulation Box */}
          <div className="relative p-6 bg-white rounded-3xl shadow-2xl border-4 border-cyan-400/50 flex flex-col items-center justify-center">
            {/* Visual QR Pattern Simulation */}
            <div className="w-56 h-56 bg-slate-950 rounded-2xl p-4 flex flex-col items-center justify-center text-white relative overflow-hidden">
              <QrCode className="w-40 h-40 text-cyan-400 animate-pulse" />
              <p className="text-[9px] font-mono text-cyan-300 mt-1 truncate max-w-[180px]">
                {activeQRSession.qrCodeToken}
              </p>
            </div>

            {/* Verification Badge */}
            <div className="mt-3 px-3 py-1 rounded-full bg-slate-950 text-cyan-400 text-[10px] font-mono font-extrabold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> GPS Encrypted • 50m Geofence
            </div>
          </div>

          {/* Real-Time Scan Counter */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/5">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Total Enrolled</p>
              <p className="text-2xl font-black text-white">{activeQRSession.totalStudents}</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-[10px] font-bold text-emerald-400 uppercase">Scanned & Marked</p>
              <p className="text-2xl font-black text-emerald-300">{simulatedScans}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-white/5 col-span-2 sm:col-span-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Remaining</p>
              <p className="text-2xl font-black text-slate-300">
                {activeQRSession.totalStudents - simulatedScans}
              </p>
            </div>
          </div>

          {/* Live Actions */}
          <div className="w-full flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleSimulateScan}
              disabled={isScanningSim}
              className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg transition flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>{isScanningSim ? 'Simulating Scan...' : 'Simulate Student QR Scan'}</span>
            </button>

            <button
              onClick={handleGenerate}
              className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs border border-white/10 transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Refresh QR Token</span>
            </button>
          </div>
        </div>

        {/* Configuration & Biometric Sensors Panel (1 Col) */}
        <div className="space-y-6">
          {/* QR Generator Selector */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Session Configuration
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-300">Class Section</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300">Subject</label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="w-full mt-1 bg-slate-800 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white"
                >
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleGenerate}
                className="w-full mt-2 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2"
              >
                <QrCode className="w-4 h-4" />
                <span>Launch New Dynamic QR</span>
              </button>
            </div>
          </div>

          {/* Integrated Hardware Sensors Ready Box */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Smart Validation Modes
            </h3>

            <div className="space-y-3">
              {/* GPS Geofence */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-white/5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="text-xs font-bold text-white">GPS Geofence Validation</p>
                    <p className="text-[10px] text-slate-400">Classroom radius (50m)</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={gpsEnabled}
                  onChange={(e) => setGpsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                />
              </div>

              {/* AI Face Recognition */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-white/5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Face Recognition Ready</p>
                    <p className="text-[10px] text-slate-400">AI camera kiosk sync</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={faceRecogEnabled}
                  onChange={(e) => setFaceRecogEnabled(e.target.checked)}
                  className="w-4 h-4 accent-indigo-400 rounded cursor-pointer"
                />
              </div>

              {/* RFID Card Ready */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-white/5">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs font-bold text-white">RFID Smartcard Scanner</p>
                    <p className="text-[10px] text-slate-400">13.56MHz NFC Gateway</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={rfidEnabled}
                  onChange={(e) => setRfidEnabled(e.target.checked)}
                  className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                />
              </div>

              {/* Fingerprint Biometric */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/50 border border-white/5">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-emerald-400" />
                  <div>
                    <p className="text-xs font-bold text-white">Fingerprint Biometric</p>
                    <p className="text-[10px] text-slate-400">Optical sensor module</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={fingerprintEnabled}
                  onChange={(e) => setFingerprintEnabled(e.target.checked)}
                  className="w-4 h-4 accent-emerald-400 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
