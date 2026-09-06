import React, { useState } from 'react';
import { ProgramHealth, AlertItem, NavView } from '../types';

interface ExecutiveDashboardProps {
  programs: ProgramHealth[];
  alerts: AlertItem[];
  onNavigateToProgram: (programId: string) => void;
  onNavigateToView: (view: NavView) => void;
  onNewDeviation: () => void;
  onExportBrief: () => void;
  onAlertAction: (alertId: string, actionName: string) => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  programs,
  alerts,
  onNavigateToProgram,
  onNavigateToView,
  onNewDeviation,
  onExportBrief,
  onAlertAction
}) => {
  const [timeFilter, setTimeFilter] = useState<'shift' | 'today' | 'week' | 'quarter'>('today');
  const [granularity, setGranularity] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter programs based on selection
  const filteredPrograms = programs.filter((prg) => {
    if (programFilter === 'critical') return prg.status === 'Critical';
    if (programFilter === 'flagged') return prg.status === 'Critical' || prg.status === 'Amber Alert';
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-space-xl">
      {/* Executive Overview Control Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-zinc-400 font-label-caps uppercase text-[11px] font-semibold tracking-wider">
            <span>Global Operations</span>
            <span className="text-zinc-600">/</span>
            <span>Factory Intelligence</span>
            <span className="text-zinc-600">/</span>
            <span className="text-blue-400 font-headline-sm text-[11px] font-semibold">Real-Time Telemetry</span>
          </div>
          <div className="flex items-center gap-space-md flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-zinc-100 tracking-tight font-bold text-2xl">
              Executive Operations Cockpit
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/25 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
        </div>

        {/* Quick Action / Date Selectors */}
        <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
          <div className="inline-flex rounded-full p-1 bg-zinc-900 border border-zinc-800">
            {(['shift', 'today', 'week', 'quarter'] as const).map((key) => {
              const labels = { shift: 'Shift', today: 'Today', week: 'Week', quarter: 'Q2-2025' };
              const isSelected = timeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => setTimeFilter(key)}
                  className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    isSelected
                      ? 'font-semibold text-white bg-blue-600 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>

          <button
            onClick={onExportBrief}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-body-sm font-medium rounded-full border border-zinc-800 transition-all text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px] text-zinc-400">file_download</span>
            Export Brief
          </button>

          <button
            onClick={onNewDeviation}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-body-sm font-semibold rounded-full shadow-md shadow-blue-600/20 transition-all text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Deviation
          </button>
        </div>
      </div>

      {/* 1. Top KPI Summary Strip (6 executive bento cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Active Programs */}
        <div
          onClick={() => onNavigateToView('program-deep-dive')}
          className="flex flex-col justify-between p-5 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Active Programs</span>
            <span className="p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="font-metric-display text-zinc-100 tracking-tight text-3xl font-bold">24</span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>+2 vs Q1
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="font-body-xs text-[11px] text-zinc-500">Target: 30 programs by Q4</span>
          </div>
        </div>

        {/* At Risk Programs */}
        <div
          onClick={() => setProgramFilter('critical')}
          className="flex flex-col justify-between p-5 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[11px] uppercase text-red-400 font-semibold tracking-wider">At Risk Programs</span>
            <span className="p-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="font-metric-display text-red-400 tracking-tight text-3xl font-bold">3</span>
            <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              Critical
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="font-body-xs text-[11px] text-zinc-300 truncate" title="Apex Aero-6, Titan Core, Helios V">
              Apex Aero-6, Titan, Helios V
            </span>
            <span className="font-body-xs text-[11px] text-red-400 font-medium">12.5% of total volume</span>
          </div>
        </div>

        {/* On-Time Delivery */}
        <div className="flex flex-col justify-between p-5 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">On-Time Delivery</span>
            <span className="p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="font-metric-display text-zinc-100 tracking-tight text-3xl font-bold">
              96.4<span className="text-lg font-normal text-zinc-400">%</span>
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <span className="material-symbols-outlined text-[14px]">arrow_upward</span>+1.2% MoM
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96.4%' }}></div>
            </div>
            <span className="font-body-xs text-[11px] text-zinc-400 flex justify-between">
              <span>Target: 95.0%</span>
              <span className="text-emerald-400 font-medium">Over-performing</span>
            </span>
          </div>
        </div>

        {/* First Pass Yield */}
        <div
          onClick={() => onNavigateToView('quality-intelligence')}
          className="flex flex-col justify-between p-5 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">First Pass Yield</span>
            <span className="p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">precision_manufacturing</span>
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="font-metric-display text-zinc-100 tracking-tight text-3xl font-bold">
              98.2<span className="text-lg font-normal text-zinc-400">%</span>
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-emerald-400">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>+0.4%
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '98.2%' }}></div>
            </div>
            <span className="font-body-xs text-[11px] text-zinc-400 flex justify-between">
              <span>Benchmark: 97.5%</span>
              <span className="text-emerald-400 font-medium">+0.7% Delta</span>
            </span>
          </div>
        </div>

        {/* Line Utilization */}
        <div
          onClick={() => onNavigateToView('shopfloor-work-order')}
          className="flex flex-col justify-between p-5 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Line Utilization</span>
            <span className="p-2 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 group-hover:bg-zinc-800 transition-colors">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="font-metric-display text-zinc-100 tracking-tight text-3xl font-bold">
              88.6<span className="text-lg font-normal text-zinc-400">%</span>
            </span>
            <span className="inline-flex items-center text-xs font-semibold text-zinc-400">
              4 Global Lines
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '88.6%' }}></div>
            </div>
            <span className="font-body-xs text-[11px] text-zinc-400 flex justify-between">
              <span>Headroom: 11.4%</span>
              <span className="text-zinc-500">Max: 92.0%</span>
            </span>
          </div>
        </div>

        {/* Active NCRs */}
        <div
          onClick={() => onNavigateToView('quality-intelligence')}
          className="flex flex-col justify-between p-5 bg-zinc-900 rounded-3xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Active NCRs</span>
            <span className="p-2 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">report</span>
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="font-metric-display text-zinc-100 tracking-tight text-3xl font-bold">14</span>
            <span className="inline-flex items-center text-xs font-medium text-red-400">
              -3 resolved today
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-semibold">3 Crit</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-medium">7 Maj</span>
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 font-normal">4 Min</span>
          </div>
        </div>
      </section>

      {/* 2. Middle Section: Telemetry & Urgent Triage (Grid) */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Panel A: Planned vs Actual Production Chart (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 relative">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Panel Header */}
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-zinc-900/80 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                  Throughput Run-Rate: Planned vs. Actual
                </h2>
                <p className="font-body-xs text-[12px] text-zinc-400">
                  Telemetry aggregation across Hyderabad, Austin, Stuttgart & Penang facilities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Legend */}
              <div className="hidden sm:flex items-center gap-4 text-body-xs text-[12px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-blue-500/40 border border-blue-500/60"></span>
                  <span>Planned (120.0k)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500"></span>
                  <span>Actual (124.5k)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-red-500 rounded-full"></span>
                  <span>Downtime Loss</span>
                </div>
              </div>
              {/* Time Granularity Switcher */}
              <div className="inline-flex rounded-full p-1 bg-zinc-950 border border-zinc-800 text-body-xs">
                {(['weekly', 'monthly', 'quarterly'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGranularity(g)}
                    className={`px-3 py-0.5 capitalize text-xs font-medium rounded-full transition-all ${
                      granularity === g
                        ? 'font-semibold text-white bg-blue-600 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart Canvas Container */}
          <div className="p-6 flex flex-col justify-between flex-1">
            <div className="relative w-full h-72">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 760 260">
                {/* Grid Lines */}
                <line stroke="#27272a" strokeDasharray="3 3" x1="40" x2="740" y1="20" y2="20" />
                <text fill="#71717a" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="32" y="24">140k</text>
                <line stroke="#27272a" strokeDasharray="3 3" x1="40" x2="740" y1="75" y2="75" />
                <text fill="#71717a" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="32" y="79">105k</text>
                <line stroke="#27272a" strokeDasharray="3 3" x1="40" x2="740" y1="130" y2="130" />
                <text fill="#71717a" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="32" y="134">70k</text>
                <line stroke="#27272a" strokeDasharray="3 3" x1="40" x2="740" y1="185" y2="185" />
                <text fill="#71717a" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="32" y="189">35k</text>
                <line stroke="#3f3f46" strokeWidth="1" x1="40" x2="740" y1="240" y2="240" />
                <text fill="#71717a" fontFamily="JetBrains Mono" fontSize="10" textAnchor="end" x="32" y="244">0</text>

                {/* Month 1: Jan */}
                <rect fill="#3b82f6" height="160" opacity="0.3" rx="4" width="28" x="70" y="80" />
                <rect fill="#10b981" height="172" rx="4" width="28" x="102" y="68" />
                <text fill="#a1a1aa" fontFamily="Inter" fontSize="11" textAnchor="middle" x="100" y="255">Jan</text>

                {/* Month 2: Feb */}
                <rect fill="#3b82f6" height="168" opacity="0.3" rx="4" width="28" x="180" y="72" />
                <rect fill="#10b981" height="180" rx="4" width="28" x="212" y="60" />
                <text fill="#a1a1aa" fontFamily="Inter" fontSize="11" textAnchor="middle" x="210" y="255">Feb</text>

                {/* Month 3: Mar */}
                <rect fill="#3b82f6" height="150" opacity="0.3" rx="4" width="28" x="290" y="90" />
                <rect fill="#10b981" height="142" rx="4" width="28" x="322" y="98" />
                <path d="M 322 98 L 350 98" stroke="#ef4444" strokeLinecap="round" strokeWidth="3" />
                <text fill="#a1a1aa" fontFamily="Inter" fontSize="11" textAnchor="middle" x="320" y="255">Mar</text>

                {/* Month 4: Apr */}
                <rect fill="#3b82f6" height="175" opacity="0.3" rx="4" width="28" x="400" y="65" />
                <rect fill="#10b981" height="188" rx="4" width="28" x="432" y="52" />
                <text fill="#a1a1aa" fontFamily="Inter" fontSize="11" textAnchor="middle" x="430" y="255">Apr</text>

                {/* Month 5: May */}
                <rect fill="#3b82f6" height="182" opacity="0.3" rx="4" width="28" x="510" y="58" />
                <rect fill="#10b981" height="192" rx="4" width="28" x="542" y="48" />
                <text fill="#a1a1aa" fontFamily="Inter" fontSize="11" textAnchor="middle" x="540" y="255">May</text>

                {/* Month 6: Jun (Current) */}
                <rect fill="#3b82f6" height="190" opacity="0.3" rx="4" width="28" x="620" y="50" />
                <rect fill="#10b981" height="202" rx="4" width="28" x="652" y="38" />
                <text fill="#f4f4f5" fontFamily="Inter" fontSize="11" fontWeight="600" textAnchor="middle" x="650" y="255">Jun (Live)</text>

                {/* Target Variance Projection Line */}
                <path d="M 116 68 Q 226 50, 336 98 T 556 48 T 666 38" fill="none" stroke="#60a5fa" strokeDasharray="4 2" strokeWidth="2.5" />
                <circle cx="666" cy="38" fill="#60a5fa" r="4" />
              </svg>
            </div>

            {/* Metric Callout Strip Under Graph */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 mt-4 bg-zinc-950/80 rounded-2xl p-4 border border-zinc-800/80">
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] text-zinc-400 uppercase font-semibold">Gross Run-Rate Variance</span>
                <span className="font-metric-table text-base font-semibold text-emerald-400">+4,520 units (+3.76%)</span>
                <span className="font-body-xs text-[11px] text-zinc-500">Exceeding quarterly baseline</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] text-zinc-400 uppercase font-semibold">Unplanned Downtime Impact</span>
                <span className="font-metric-table text-base font-semibold text-red-400">-1,410 units</span>
                <span className="font-body-xs text-[11px] text-zinc-500">Thermal recalibration bottleneck</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-[11px] text-zinc-400 uppercase font-semibold">Cycle Time Efficiency</span>
                <span className="font-metric-table text-base font-semibold text-blue-400">42.4s / unit</span>
                <span className="font-body-xs text-[11px] text-zinc-500">Target benchmark: 45.0s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel B: Attention Required & Alerts Stream (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          {/* Alert Stream Header */}
          <div className="px-6 py-4 flex items-center justify-between bg-zinc-900/80 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                <span className="material-symbols-outlined text-[20px]">e911_emergency</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">Operational Alerts</h2>
                <p className="font-body-xs text-[12px] text-zinc-400">{alerts.length} active shopfloor escalations</p>
              </div>
            </div>
            <span className="font-label-caps text-[10px] px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 uppercase font-bold tracking-wider">
              Live Stream
            </span>
          </div>

          {/* Alert Items Stack */}
          <div className="p-5 flex flex-col gap-3.5 flex-1 justify-between">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-2xl bg-zinc-950/80 flex flex-col gap-2 hover:border-zinc-700 transition-all border border-zinc-800/80"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      alert.level === 'critical'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : alert.level === 'warning'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {alert.level === 'critical' ? 'error' : alert.level === 'warning' ? 'warning_amber' : 'info'}
                    </span>
                    <span className="capitalize">{alert.level === 'info' ? 'Material Risk' : alert.level}</span>
                  </span>
                  <span className="font-metric-table text-body-xs text-[11px] text-zinc-500">
                    {alert.timestamp}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-0.5">
                  <h3 className="font-headline-sm text-body-md font-semibold text-zinc-100 text-[14px]">
                    {alert.title}
                  </h3>
                  <p className="font-body-xs text-[12px] text-zinc-400 leading-relaxed">
                    {alert.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-1 pt-2 border-t border-zinc-800/60 flex-wrap">
                  {alert.actions.map((act, idx) => {
                    const isPrimary = idx === 0;
                    const isDanger = act === 'Escalate';
                    return (
                      <button
                        key={act}
                        onClick={() => onAlertAction(alert.id, act)}
                        className={`px-3 py-1 font-body-xs text-[12px] font-medium rounded-full transition-colors ${
                          isPrimary
                            ? 'bg-blue-600 text-white hover:bg-blue-500'
                            : isDanger
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                            : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                        }`}
                      >
                        {act}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Lower Section: Program Health & Quality Deep-Dive (Split Layout) */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Panel C: Program Health Overview Table (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-zinc-900/80 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <span className="material-symbols-outlined text-[20px]">table_chart</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                  Program Operational Health
                </h2>
                <p className="font-body-xs text-[12px] text-zinc-400">
                  Active customer contractual commitments & yield metrics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Filter:</span>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="px-3 py-1 bg-zinc-950 text-xs font-medium text-zinc-200 rounded-full border border-zinc-800 focus:outline-none cursor-pointer"
              >
                <option value="all">All 24 Programs</option>
                <option value="flagged">Flagged & Critical</option>
                <option value="critical">Critical Only</option>
              </select>
            </div>
          </div>

          {/* High-Density Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/60 text-zinc-400 font-label-caps text-[11px] uppercase tracking-wider border-b border-zinc-800/80">
                  <th className="py-3 px-5 font-semibold">Program Name</th>
                  <th className="py-3 px-5 font-semibold">Customer / Site</th>
                  <th className="py-3 px-5 font-semibold text-right">Yield</th>
                  <th className="py-3 px-5 font-semibold text-right">OTD %</th>
                  <th className="py-3 px-5 font-semibold text-center">Open NCRs</th>
                  <th className="py-3 px-5 font-semibold text-center">Milestones</th>
                  <th className="py-3 px-5 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-body-sm font-normal text-[13px]">
                {filteredPrograms.map((prg) => {
                  const isCritical = prg.status === 'Critical';
                  const isAmber = prg.status === 'Amber Alert';
                  return (
                    <tr
                      key={prg.id}
                      onClick={() => onNavigateToProgram(prg.id)}
                      className={`hover:bg-zinc-800/40 transition-colors cursor-pointer ${
                        isCritical ? 'bg-red-500/5' : ''
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-zinc-200 hover:text-blue-400 transition-colors">
                            {prg.name}
                          </span>
                          <span className="font-metric-table text-[11px] text-zinc-500">
                            {prg.code}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex flex-col">
                          <span className="text-zinc-300">{prg.customer}</span>
                          <span className="font-body-xs text-[11px] text-zinc-500">{prg.site}</span>
                        </div>
                      </td>
                      <td
                        className={`py-3.5 px-5 text-right font-metric-table font-semibold ${
                          prg.yieldRate >= 97 ? 'text-emerald-400' : prg.yieldRate < 95 ? 'text-red-400' : 'text-zinc-300'
                        }`}
                      >
                        {prg.yieldRate.toFixed(1)}%
                      </td>
                      <td
                        className={`py-3.5 px-5 text-right font-metric-table font-semibold ${
                          prg.otdRate >= 96 ? 'text-emerald-400' : prg.otdRate < 92 ? 'text-red-400' : 'text-zinc-300'
                        }`}
                      >
                        {prg.otdRate.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${
                            isCritical
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : isAmber
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                          }`}
                        >
                          {prg.openNcrs}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-xs font-medium text-zinc-400">
                            {prg.milestonesCompleted} / {prg.milestonesTotal}
                          </span>
                          <div className="w-16 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${isCritical ? 'bg-red-500' : 'bg-blue-500'}`}
                              style={{ width: `${(prg.milestonesCompleted / prg.milestonesTotal) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            isCritical
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : isAmber
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isCritical ? 'bg-red-400' : isAmber ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                          ></span>
                          {prg.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer pagination */}
          <div className="py-3 px-6 bg-zinc-950/40 flex items-center justify-between text-body-xs text-[12px] text-zinc-400 border-t border-zinc-800">
            <span>Showing {filteredPrograms.length} of 24 manufacturing programs</span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 disabled:opacity-40 hover:bg-zinc-800 transition-colors text-xs"
              >
                Prev
              </button>
              <span className="font-metric-table text-zinc-400">Page {currentPage} / 4</span>
              <button
                disabled={currentPage === 4}
                onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}
                className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 transition-colors text-xs"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Panel D: Quality & Supply Chain Snapshot (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Defect Pareto Breakdown Card */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[18px]">pie_chart</span>
                </div>
                <h3 className="font-headline-sm text-base text-zinc-100 font-semibold">Defect Pareto Breakdown</h3>
              </div>
              <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Weekly 3σ</span>
            </div>

            {/* Pareto Bars */}
            <div className="flex flex-col gap-3.5 mt-1">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-body-xs font-medium text-[12px]">
                  <span className="text-zinc-300">Solder Bridging (QFN / Fine Pitch)</span>
                  <span className="font-metric-table text-zinc-200 font-semibold">42% (118)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-body-xs font-medium text-[12px]">
                  <span className="text-zinc-300">Component Misalignment</span>
                  <span className="font-metric-table text-zinc-200 font-semibold">28% (79)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-body-xs font-medium text-[12px]">
                  <span className="text-zinc-300">Tombstoning (Passive 0402)</span>
                  <span className="font-metric-table text-zinc-200 font-semibold">18% (51)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-body-xs font-medium text-[12px]">
                  <span className="text-zinc-300">BGA Voiding Ratio &gt; 15%</span>
                  <span className="font-metric-table text-zinc-200 font-semibold">12% (34)</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-zinc-600 h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-950/80 flex items-center justify-between border border-zinc-800/80 mt-1">
              <span className="text-body-xs text-[12px] text-zinc-400">Defect Rate Trend</span>
              <span className="text-body-xs text-[12px] font-semibold text-emerald-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">arrow_downward</span>
                -0.18% vs prev batch
              </span>
            </div>
          </div>

          {/* Supply Chain & Stockout Snapshot Card */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                </div>
                <h3 className="font-headline-sm text-base text-zinc-100 font-semibold">Supply Chain Health</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Stable
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-zinc-950/80 flex flex-col border border-zinc-800/80">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase font-semibold">Supplier OTD</span>
                <span className="font-metric-table text-lg font-bold text-zinc-100 mt-1">94.2%</span>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">+0.8% MoM</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/80 flex flex-col border border-zinc-800/80">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase font-semibold">Stockout Risk</span>
                <span className="font-metric-table text-lg font-bold text-red-400 mt-1">2 Items</span>
                <span className="text-[10px] text-red-400 font-medium mt-0.5">Action rqd</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/80 flex flex-col border border-zinc-800/80">
                <span className="font-label-caps text-[10px] text-zinc-400 uppercase font-semibold">Raw Inv. Days</span>
                <span className="font-metric-table text-lg font-bold text-blue-400 mt-1">34.2 d</span>
                <span className="text-[10px] text-zinc-500 mt-0.5">Target: 30 d</span>
              </div>
            </div>

            {/* Flagged Item Alert Banner */}
            <div className="p-3.5 rounded-2xl bg-red-500/10 flex items-start gap-2.5 text-body-xs border border-red-500/20">
              <span className="material-symbols-outlined text-red-400 text-[18px] mt-0.5">priority_high</span>
              <div className="flex flex-col text-[12px]">
                <span className="font-semibold text-zinc-200">ST Micro ARM Cortex-M7 Lot #889</span>
                <span className="text-zinc-400 mt-0.5">4.2 days runway remaining at Hyderabad SMT-1</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
