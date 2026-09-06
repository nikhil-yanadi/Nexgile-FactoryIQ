import React, { useState } from 'react';
import { NcrItem } from '../types';

interface QualityIntelligenceProps {
  ncrs: NcrItem[];
  onOpenCapa: (ncr: NcrItem) => void;
  onInitiateNcr: () => void;
  onExportAudit: () => void;
}

export const QualityIntelligence: React.FC<QualityIntelligenceProps> = ({
  ncrs,
  onOpenCapa,
  onInitiateNcr,
  onExportAudit
}) => {
  const [timeRange, setTimeRange] = useState<'12w' | '30d' | 'shift'>('12w');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [ledgerSearch, setLedgerSearch] = useState<string>('');

  const filteredNcrs = ncrs.filter((ncr) => {
    if (severityFilter !== 'all' && ncr.severity.toLowerCase() !== severityFilter) {
      return false;
    }
    if (ledgerSearch.trim()) {
      const q = ledgerSearch.toLowerCase();
      return (
        ncr.id.toLowerCase().includes(q) ||
        ncr.program.toLowerCase().includes(q) ||
        ncr.part.toLowerCase().includes(q) ||
        ncr.defectDescription.toLowerCase().includes(q) ||
        ncr.lead.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 1. Header & Quality Control Ribbon */}
      <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-zinc-800 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold tracking-wider uppercase">
            <span>Plant Quality Intelligence</span>
            <span className="text-zinc-600">/</span>
            <span className="text-cyan-400 font-semibold">SPC &amp; CAPA Master Ledger</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-zinc-100 tracking-tight font-bold text-2xl">
              Quality Intelligence &amp; 8D Command
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live SPC Telemetry
            </span>
          </div>
        </div>

        {/* Action ribbon */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="inline-flex rounded-full p-1 bg-zinc-950 border border-zinc-800">
            {(['12w', '30d', 'shift'] as const).map((rng) => {
              const labels = { '12w': 'Rolling 12W', '30d': '30 Days', 'shift': 'Shift-by-Shift' };
              return (
                <button
                  key={rng}
                  onClick={() => setTimeRange(rng)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
                    timeRange === rng
                      ? 'font-semibold text-zinc-950 bg-cyan-400 shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {labels[rng]}
                </button>
              );
            })}
          </div>

          <button
            onClick={onExportAudit}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-full border border-zinc-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-zinc-400">file_download</span>
            Export Audit Trail
          </button>

          <button
            onClick={onInitiateNcr}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold rounded-full transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add_alert</span>
            Initiate NCR
          </button>
        </div>
      </div>

      {/* 2. Top 5 Core Quality KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* First Pass Yield */}
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">First Pass Yield</span>
            <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="material-symbols-outlined text-[16px]">verified</span>
            </span>
          </div>
          <div className="my-2">
            <span className="text-zinc-100 text-2xl font-bold font-mono">98.42%</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-emerald-400 font-semibold">+0.28% vs Target 98.00%</span>
            <span className="text-[11px] text-zinc-500">In statistical control</span>
          </div>
        </div>

        {/* Defect Rate DPMO */}
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">Defect Rate</span>
            <span className="p-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <span className="material-symbols-outlined text-[16px]">analytics</span>
            </span>
          </div>
          <div className="my-2">
            <span className="text-zinc-100 text-2xl font-bold font-mono">1,580</span>
            <span className="text-xs text-zinc-500 ml-1">DPMO</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-emerald-400 font-semibold">-120 DPMO MoM</span>
            <span className="text-[11px] text-zinc-500">4.45 Sigma Capability</span>
          </div>
        </div>

        {/* Active Non-Conformances */}
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-rose-400 font-semibold tracking-wider">Active NCRs</span>
            <span className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <span className="material-symbols-outlined text-[16px]">report</span>
            </span>
          </div>
          <div className="my-2">
            <span className="text-rose-400 text-2xl font-bold font-mono">14</span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30">3 Crit</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-medium border border-amber-500/30">7 Maj</span>
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">4 Min</span>
          </div>
        </div>

        {/* CAPA Resolution Rate */}
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">CAPA Resolution Rate</span>
            <span className="p-1.5 rounded-xl bg-zinc-800 text-zinc-300 border border-zinc-700">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
            </span>
          </div>
          <div className="my-2">
            <span className="text-zinc-100 text-2xl font-bold font-mono">92.8%</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-emerald-400 font-semibold">Target: 90%</span>
            <span className="text-[11px] text-zinc-500">Avg closure: 14.2 days</span>
          </div>
        </div>

        {/* Field Escapes */}
        <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-800 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase text-zinc-400 font-semibold tracking-wider">Field Escapes</span>
            <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="material-symbols-outlined text-[16px]">shield</span>
            </span>
          </div>
          <div className="my-2">
            <span className="text-emerald-400 text-2xl font-bold font-mono">0</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-emerald-400 font-semibold">180 Days Streak</span>
            <span className="text-[11px] text-zinc-500">Certified Defect-Free</span>
          </div>
        </div>
      </div>

      {/* 3. Analytics Visualizations: Pareto + Yield/Scrap Trend + Station Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel 1: Defect Pareto Analysis (4 Cols) */}
        <div className="lg:col-span-4 bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400 text-[20px]">bar_chart</span>
              <h3 className="text-zinc-100 font-semibold text-base">Defect Pareto Analysis</h3>
            </div>
            <span className="text-xs uppercase text-zinc-500 font-semibold">80/20 Rule</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">Solder Bridging (QFN/BGA)</span>
                <span className="font-mono text-zinc-200 font-semibold">41% (118)</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '41%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">Tombstoning (Passive 0402)</span>
                <span className="font-mono text-zinc-200 font-semibold">24% (69)</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">BGA Voiding Ratio &gt; 15%</span>
                <span className="font-mono text-zinc-200 font-semibold">16% (46)</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '16%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">Polarity Inversion</span>
                <span className="font-mono text-zinc-200 font-semibold">11% (32)</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-zinc-300">Cosmetic / Solder Ball</span>
                <span className="font-mono text-zinc-200 font-semibold">8% (23)</span>
              </div>
              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800/80">
                <div className="bg-zinc-600 h-full rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-zinc-950/70 text-xs text-zinc-400 flex items-center justify-between border border-zinc-800/80">
            <span>Cumulative Top 3: 81.0%</span>
            <span className="text-emerald-400 font-semibold">Action items mapped to 8D</span>
          </div>
        </div>

        {/* Panel 2: Yield vs Scrap Trend Dual-Axis (5 Cols) */}
        <div className="lg:col-span-5 bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400 text-[20px]">show_chart</span>
              <h3 className="text-zinc-100 font-semibold text-base">Yield vs Scrap Trend</h3>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>FPY Curve</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Scrap Rate</span>
              </div>
            </div>
          </div>

          {/* SVG Trend Chart */}
          <div className="relative w-full h-52 bg-zinc-950/40 rounded-2xl p-2 border border-zinc-800/60">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 420 180">
              <line stroke="#27272a" strokeDasharray="2 2" x1="20" x2="400" y1="20" y2="20" />
              <line stroke="#27272a" strokeDasharray="2 2" x1="20" x2="400" y1="60" y2="60" />
              <line stroke="#27272a" strokeDasharray="2 2" x1="20" x2="400" y1="100" y2="100" />
              <line stroke="#27272a" strokeDasharray="2 2" x1="20" x2="400" y1="140" y2="140" />

              {/* Scrap Area Fill */}
              <path
                d="M 30 160 L 70 156 L 120 152 L 170 155 L 220 148 L 270 150 L 320 154 L 370 158 L 390 162 L 390 170 L 30 170 Z"
                fill="#f43f5e"
                fillOpacity="0.15"
              />
              <path
                d="M 30 160 L 70 156 L 120 152 L 170 155 L 220 148 L 270 150 L 320 154 L 370 158 L 390 162"
                stroke="#f43f5e"
                strokeWidth="2"
              />

              {/* FPY Trend Line */}
              <path
                d="M 30 50 L 70 42 L 120 38 L 170 45 L 220 32 L 270 30 L 320 28 L 370 24 L 390 22"
                stroke="#34d399"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <circle cx="390" cy="22" fill="#34d399" r="4" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-zinc-800 text-xs">
            <div className="flex flex-col">
              <span className="text-zinc-500 uppercase text-[10px] font-semibold">Mean First Pass Yield</span>
              <span className="font-mono font-bold text-emerald-400 text-sm">98.34%</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-zinc-500 uppercase text-[10px] font-semibold">Average Scrap PPM</span>
              <span className="font-mono font-bold text-rose-400 text-sm">420 ppm</span>
            </div>
          </div>
        </div>

        {/* Panel 3: Yield by Station Breakdown (3 Cols) */}
        <div className="lg:col-span-3 bg-zinc-900 rounded-3xl p-6 flex flex-col gap-3 border border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-zinc-100 font-semibold text-sm">
              Yield by Station
            </h3>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Real-time</span>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {[
              { name: 'SMT High-Speed', yieldVal: '99.7%', status: 'nominal' },
              { name: 'Reflow Convection', yieldVal: '98.9%', status: 'nominal' },
              { name: 'AOI Vision', yieldVal: '98.2%', status: 'bottleneck' },
              { name: 'AXI 3D X-Ray', yieldVal: '99.1%', status: 'nominal' },
              { name: 'Mechanical Assembly', yieldVal: '99.4%', status: 'nominal' },
              { name: 'Functional Test (FCT)', yieldVal: '98.6%', status: 'nominal' }
            ].map((stn) => (
              <div
                key={stn.name}
                className="flex items-center justify-between p-2 rounded-2xl bg-zinc-950/60 text-xs border border-zinc-800/80"
              >
                <span className="text-zinc-300 font-medium">{stn.name}</span>
                <span
                  className={`font-mono font-bold ${
                    stn.status === 'bottleneck' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {stn.yieldVal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Non-Conformance & CAPA Master Ledger Table */}
      <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 flex flex-col shadow-sm">
        {/* Ledger Header */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-zinc-950/60 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <span className="material-symbols-outlined text-[20px]">policy</span>
            </div>
            <div>
              <h2 className="text-zinc-100 font-semibold text-base">
                Non-Conformance &amp; CAPA Master Ledger
              </h2>
              <p className="text-xs text-zinc-400">
                Auditable 8D resolution workflows tracked against customer SLAs
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2 text-zinc-500 text-[16px]">
                search
              </span>
              <input
                value={ledgerSearch}
                onChange={(e) => setLedgerSearch(e.target.value)}
                placeholder="Search NCR, program, lead..."
                className="pl-9 pr-3 py-1.5 bg-zinc-900 rounded-xl text-xs text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500 w-52 placeholder:text-zinc-600"
              />
            </div>

            <div className="inline-flex rounded-full p-1 bg-zinc-950 text-xs font-medium border border-zinc-800">
              <button
                onClick={() => setSeverityFilter('all')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  severityFilter === 'all' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSeverityFilter('critical')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  severityFilter === 'critical' ? 'bg-rose-500 text-white font-bold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setSeverityFilter('major')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  severityFilter === 'major' ? 'bg-amber-500 text-zinc-950 font-bold shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Major
              </button>
              <button
                onClick={() => setSeverityFilter('minor')}
                className={`px-3 py-1 rounded-full transition-colors ${
                  severityFilter === 'minor' ? 'bg-zinc-800 text-zinc-300 font-medium shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Minor
              </button>
            </div>
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 text-zinc-400 text-xs uppercase tracking-wider border-b border-zinc-800">
                <th className="py-3 px-5 font-semibold">NCR #</th>
                <th className="py-3 px-5 font-semibold">Program &amp; Part</th>
                <th className="py-3 px-5 font-semibold">Defect Description &amp; Station</th>
                <th className="py-3 px-5 font-semibold text-center">Severity</th>
                <th className="py-3 px-5 font-semibold text-center">8D Stage</th>
                <th className="py-3 px-5 font-semibold">Lead &amp; SLA</th>
                <th className="py-3 px-5 font-semibold text-center">Status</th>
                <th className="py-3 px-5 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-xs font-normal">
              {filteredNcrs.map((ncr) => {
                const isCritical = ncr.severity === 'Critical';
                const isMajor = ncr.severity === 'Major';
                return (
                  <tr
                    key={ncr.id}
                    onClick={() => onOpenCapa(ncr)}
                    className={`hover:bg-zinc-800/40 transition-colors cursor-pointer ${
                      isCritical ? 'bg-rose-500/5' : ''
                    }`}
                  >
                    <td className="py-3.5 px-5">
                      <span className="font-mono font-bold text-cyan-400">{ncr.id}</span>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-200">{ncr.program}</span>
                        <span className="text-[11px] text-zinc-500">{ncr.part}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex flex-col max-w-xs">
                        <span className="text-zinc-300 leading-tight">{ncr.defectDescription}</span>
                        <span className="font-mono text-[11px] text-zinc-500 mt-0.5">
                          {ncr.station} • {ncr.lotRange}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isCritical
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : isMajor
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {ncr.severity}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono font-bold text-xs">
                        {ncr.stage8D}
                      </span>
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex flex-col">
                        <span className="text-zinc-300 text-[12px]">{ncr.lead}</span>
                        <span
                          className={`font-mono text-[11px] font-semibold ${
                            isCritical ? 'text-rose-400' : 'text-zinc-500'
                          }`}
                        >
                          {ncr.slaDaysRemaining}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          ncr.status === 'Closed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : ncr.status === 'Under Review'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {ncr.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCapa(ncr);
                        }}
                        className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-cyan-400 hover:text-cyan-300 text-xs font-semibold border border-zinc-700 transition-colors"
                      >
                        Review 8D
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
