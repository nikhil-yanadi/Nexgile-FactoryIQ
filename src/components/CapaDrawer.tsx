import React, { useState } from 'react';
import { NcrItem } from '../types';

interface CapaDrawerProps {
  ncr: NcrItem | null;
  isOpen: boolean;
  onClose: () => void;
  onApproveD5: (ncrId: string) => void;
}

export const CapaDrawer: React.FC<CapaDrawerProps> = ({
  ncr,
  isOpen,
  onClose,
  onApproveD5
}) => {
  const [d5Approved, setD5Approved] = useState(false);

  if (!isOpen || !ncr) return null;

  const handleApprove = () => {
    setD5Approved(true);
    onApproveD5(ncr.id);
  };

  const steps8D = [
    { num: 'D1', label: 'Team', status: 'done' },
    { num: 'D2', label: 'Problem', status: 'done' },
    { num: 'D3', label: 'Contain', status: 'done' },
    { num: 'D4', label: 'Cause', status: 'done' },
    { num: 'D5', label: 'Correct', status: d5Approved ? 'done' : 'active' },
    { num: 'D6', label: 'Validate', status: d5Approved ? 'active' : 'pending' },
    { num: 'D7', label: 'Prevent', status: 'pending' },
    { num: 'D8', label: 'Sign-off', status: 'pending' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-2xl bg-zinc-900 shadow-2xl z-10 flex flex-col h-full border-l border-zinc-800 overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-6 bg-zinc-950/80 border-b border-zinc-800 flex items-start justify-between">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">
                Quality Intelligence / Non-Conformance Report
              </span>
              <span className="text-zinc-600">•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold uppercase">
                {ncr.severity}
              </span>
            </div>
            <h2 className="text-zinc-100 font-bold text-xl">
              8D Investigation &amp; CAPA Dossier
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="font-mono font-semibold text-cyan-400">{ncr.id}</span>
              <span>•</span>
              <span>{ncr.part}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase text-zinc-500 font-semibold">SLA Expiry</span>
              <span className="font-mono text-rose-400 font-bold text-xs">48h 12m remaining</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* 8D Lifecycle Stepper */}
          <div className="bg-zinc-950/60 rounded-3xl p-5 border border-zinc-800/80 flex flex-col gap-3">
            <span className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">
              8D Lifecycle Protocol Status
            </span>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-1">
              {steps8D.map((st) => {
                const isDone = st.status === 'done';
                const isActive = st.status === 'active';
                return (
                  <div
                    key={st.num}
                    className={`flex flex-col items-center p-2 rounded-2xl text-center transition-all border ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-sm'
                        : isDone
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold">{st.num}</span>
                    <span className="text-[10px] font-medium truncate w-full mt-0.5">{st.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 1: Problem Summary & D3 Containment */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">gavel</span>
              <span>D3: Immediate Containment Actions</span>
            </div>
            <div className="bg-zinc-950/60 rounded-3xl p-5 border border-zinc-800/80 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-zinc-200">
                  100% 3D AXI screening applied to lots #8831 through #8835
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                  Verified Containment
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Total of 38 non-compliant units quarantined in Warehouse Bay 4-C. Immediate hold placed on line SMT-03 reflow conveyor pending root-cause investigation. Zero escapes to subsequent staging.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-mono pt-2 border-t border-zinc-800/80">
                <span>Quarantine Batch: Q-8831-A</span>
                <span>Units Screened: 2,500</span>
                <span>Defects Isolated: 38</span>
              </div>
            </div>
          </div>

          {/* Section 2: D4 Root Cause Findings (5-Why & Ishikawa) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">troubleshoot</span>
              <span>D4: Root Cause Findings (5-Why Analysis)</span>
            </div>
            <div className="bg-zinc-950/60 rounded-3xl p-5 border border-zinc-800/80 flex flex-col gap-3">
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
                <span className="material-symbols-outlined text-rose-400 text-[18px] mt-0.5">error</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Primary Root Cause</span>
                  <span className="text-xs font-semibold text-zinc-200 mt-0.5">
                    Nitrogen Flow Fluctuation in Reflow Zone 3 due to Solenoid Valve Sticking
                  </span>
                </div>
              </div>

              {/* 5-Why Chain */}
              <div className="flex flex-col gap-2 pl-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-cyan-400">Why 1:</span>
                  <span className="text-zinc-300">Solder bridging observed on fine-pitch 0.4mm BGA pins.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-cyan-400">Why 2:</span>
                  <span className="text-zinc-300">Solder surface tension collapsed during peak liquidus phase.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-cyan-400">Why 3:</span>
                  <span className="text-zinc-300">Nitrogen blanket purity dropped below 1,000 ppm O2 threshold.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-cyan-400">Why 4:</span>
                  <span className="text-zinc-300">Proportional solenoid valve NV-302 sticking due to particulate build-up.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono font-bold text-cyan-400">Why 5:</span>
                  <span className="text-zinc-200 font-semibold">
                    Preventative maintenance schedule for gas inlet filters was 180 days instead of 90 days.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: D5 Permanent Corrective Actions */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">task_alt</span>
              <span>D5: Permanent Corrective Actions (PCA)</span>
            </div>
            <div className="bg-zinc-950/60 rounded-3xl p-5 border border-zinc-800/80 flex flex-col gap-2.5">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span className="text-xs text-zinc-200 font-medium">
                    Replace solenoid valve assembly NV-302 with ceramic spool unit
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">DONE</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span className="text-xs text-zinc-200 font-medium">
                    Integrate real-time O2 sensor PLC interlock (auto-halt on &gt;1,200 ppm)
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase">DONE</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      d5Approved ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {d5Approved ? 'check_circle' : 'pending'}
                  </span>
                  <span className="text-xs text-zinc-200 font-medium">
                    Revise SOP PM-REF-04: Shorten solenoid inspection window to 60 days
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase ${
                    d5Approved ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {d5Approved ? 'APPROVED' : 'PENDING SIGN-OFF'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: D6 Validation Sample Results */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              <span>D6: Validation Sample Results</span>
            </div>
            <div className="bg-zinc-950/60 rounded-3xl p-5 border border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Sample Run</span>
                <span className="font-mono font-bold text-zinc-200 text-base mt-1">500 units</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Defects Detected</span>
                <span className="font-mono font-bold text-emerald-400 text-base mt-1">0 defects</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">N2 Purity</span>
                <span className="font-mono font-bold text-cyan-400 text-base mt-1">980 ppm O2</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col">
                <span className="text-[10px] uppercase text-zinc-500 font-semibold">Cpk Index</span>
                <span className="font-mono font-bold text-emerald-400 text-base mt-1">1.84 (Pass)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-6 bg-zinc-950/80 border-t border-zinc-800 flex items-center justify-between gap-4">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-800 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-zinc-400">print</span>
            Print 8D Dossier
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={d5Approved}
              onClick={handleApprove}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold transition-all ${
                d5Approved
                  ? 'bg-emerald-500 text-zinc-950 opacity-90 cursor-default shadow-sm'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-sm'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {d5Approved ? 'done_all' : 'verified'}
              </span>
              <span>{d5Approved ? 'D5 Approved & Promoted' : 'Approve D5 Action'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
