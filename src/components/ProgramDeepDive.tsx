import React, { useState } from 'react';
import { GateStage, EcoItem, ControlledDoc, ActivityFeedItem } from '../types';

interface ProgramDeepDiveProps {
  gateStages: GateStage[];
  ecos: EcoItem[];
  docs: ControlledDoc[];
  activities: ActivityFeedItem[];
  onExportReport: () => void;
  onEngineeringReq: () => void;
  onMessageAuditor: () => void;
  onDownloadDoc: (docName: string) => void;
  onNavigateToView: (view: any) => void;
}

export const ProgramDeepDive: React.FC<ProgramDeepDiveProps> = ({
  gateStages,
  ecos,
  docs,
  activities,
  onExportReport,
  onEngineeringReq,
  onMessageAuditor,
  onDownloadDoc,
  onNavigateToView
}) => {
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const tabs = ['Overview', 'Milestones', 'Production', 'Quality Intelligence', 'Documents (18)', 'Engineering (ECOs)'];

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Program Context Header */}
      <div className="relative overflow-hidden bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-blue-500/5 pointer-events-none blur-3xl"></div>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-label-caps text-[11px] uppercase text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full font-semibold">
                NPI Phase 4
              </span>
              <span className="text-zinc-600 text-body-xs font-body-xs">•</span>
              <span className="font-body-sm text-[13px] text-zinc-400">Customer:</span>
              <span className="font-headline-sm text-[14px] font-bold text-zinc-100">Apex Electronics</span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-label-caps text-[11px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                HEALTH: NOMINAL
              </span>
            </div>

            <div className="flex items-baseline gap-3 flex-wrap mt-1">
              <h1 className="font-display-lg text-3xl sm:text-4xl text-zinc-100 tracking-tight font-bold">
                FactoryIQ Alpha
              </h1>
              <span className="font-metric-table text-metric-table text-zinc-400 text-[13px]">
                ID: PRG-2024-APX-01
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-zinc-400 font-body-sm text-[13px] mt-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-zinc-500">domain</span>
                <span>Hyderabad Plant 1 (Line 2 &amp; 4)</span>
              </div>
              <span className="text-zinc-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-zinc-500">badge</span>
                <span>Director: Sarah Johnson</span>
              </div>
              <span className="text-zinc-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-zinc-500">event_available</span>
                <span>
                  Target Delivery: <strong className="text-zinc-200 font-semibold">Q3 2025</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Top Level Progress */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-wrap">
            <div className="flex flex-col gap-1.5 w-56 p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-label-caps uppercase text-zinc-400 font-semibold">Total Target</span>
                <span className="font-metric-table text-blue-400 font-bold">78% (39,240 / 50k)</span>
              </div>
              <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <span className="font-body-xs text-[11px] text-zinc-500 text-right">10,760 units remaining</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={onExportReport}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-body-sm text-[13px] rounded-full transition-colors border border-zinc-700/60"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-zinc-400">file_download</span>
                Export Report
              </button>
              <button
                onClick={onEngineeringReq}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-body-sm text-[13px] rounded-full transition-colors border border-zinc-700/60"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-zinc-400">add_circle</span>
                Engineering Req
              </button>
              <button
                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors border border-zinc-700/60"
                title="Program Settings"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Tab Navigation Bar */}
      <div className="bg-zinc-900 rounded-2xl px-4 py-2 flex items-center justify-between overflow-x-auto border border-zinc-800">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isTabActive = activeTab === tab;
            const iconMap: Record<string, string> = {
              'Overview': 'overview',
              'Milestones': 'alt_route',
              'Production': 'precision_manufacturing',
              'Quality Intelligence': 'fact_check',
              'Documents (18)': 'folder_shared',
              'Engineering (ECOs)': 'engineering'
            };
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (tab === 'Quality Intelligence') {
                    onNavigateToView('quality-intelligence');
                  } else if (tab === 'Production') {
                    onNavigateToView('shopfloor-work-order');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 text-body-sm text-[13px] font-medium transition-all rounded-full whitespace-nowrap ${
                  isTabActive
                    ? 'text-blue-400 font-semibold bg-zinc-800 border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{iconMap[tab] || 'tab'}</span>
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pl-4 hidden sm:flex">
          <span className="font-label-caps text-[11px] uppercase text-zinc-500 font-semibold">Live Telemetry</span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </div>
      </div>

      {/* Milestone Timeline Interactive Banner */}
      <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-headline-sm text-zinc-100 flex items-center gap-2 font-bold text-base">
              Project Gate Stage Progression
              <span className="text-body-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium text-[11px]">
                Stage-Gate Framework v3.4
              </span>
            </h2>
            <p className="font-body-sm text-[13px] text-zinc-400 mt-0.5">
              Controlled Phase Gates tracking customer-certified build deliverables
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-body-xs text-[12px] text-zinc-400">
              Current Gate: <strong className="text-zinc-200 font-semibold">Gate 4 PVT</strong>
            </span>
            <span className="font-metric-table text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold text-[13px]">
              T-22 Days to Gate Sign-off
            </span>
          </div>
        </div>

        {/* Timeline Stepper Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          {gateStages.map((gate) => {
            const isPassed = gate.status === 'PASSED';
            const isCurrent = gate.status === 'IN PROGRESS';
            return (
              <div
                key={gate.gateNumber}
                className={`p-4 rounded-2xl flex flex-col justify-between gap-3 border transition-all ${
                  isCurrent
                    ? 'bg-zinc-950/90 relative overflow-hidden border-blue-500/40 ring-1 ring-blue-500/20'
                    : isPassed
                    ? 'bg-zinc-950/60 hover:bg-zinc-950/80 border-zinc-800/80'
                    : 'bg-zinc-950/30 hover:bg-zinc-950/50 opacity-60 border-zinc-800/40'
                }`}
              >
                {isCurrent && <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-500"></div>}
                <div className="flex items-center justify-between">
                  <span
                    className={`font-label-caps text-[10px] uppercase font-bold ${
                      isCurrent ? 'text-blue-400' : isPassed ? 'text-zinc-400' : 'text-zinc-600'
                    }`}
                  >
                    {gate.gateNumber}
                  </span>
                  <span
                    className={`flex items-center gap-1 font-label-caps text-[10px] font-bold uppercase ${
                      isPassed
                        ? 'text-emerald-400'
                        : isCurrent
                        ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full'
                        : 'text-zinc-600'
                    }`}
                  >
                    {isPassed && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
                    {gate.status}
                  </span>
                </div>

                <div>
                  <h3
                    className={`font-headline-sm text-body-sm text-zinc-200 ${
                      isCurrent ? 'font-bold text-zinc-100' : 'font-semibold'
                    }`}
                  >
                    {gate.title}
                  </h3>
                  <p className="font-body-xs text-[11px] text-zinc-500 mt-0.5">{gate.subtitle}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        isPassed ? 'bg-emerald-400' : isCurrent ? 'bg-blue-500' : 'bg-transparent'
                      }`}
                      style={{ width: `${gate.percentComplete}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-metric-table text-blue-400 font-semibold">
                      {isCurrent ? `${gate.percentComplete}%` : ''}
                    </span>
                    <span className="font-metric-table text-zinc-500 text-right ml-auto">
                      {gate.detail}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-zinc-900 rounded-3xl p-5 flex flex-col justify-between gap-3 border border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Output Run-Rate</span>
              <span className="font-body-xs text-[11px] text-zinc-500">Units per 24h cycle</span>
            </div>
            <div className="p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <span className="material-symbols-outlined text-[18px]">speed</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">1,420</span>
            <div className="flex flex-col items-end">
              <span className="font-metric-table text-metric-table text-red-400 flex items-center font-semibold text-xs">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                -5.3%
              </span>
              <span className="font-body-xs text-[11px] text-zinc-500">Target: 1,500</span>
            </div>
          </div>
          <div className="h-8 w-full pt-1">
            <svg className="w-full h-full text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 100 24">
              <path
                d="M0,18 L15,16 L30,12 L45,15 L60,9 L75,11 L90,6 L100,8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M0,18 L15,16 L30,12 L45,15 L60,9 L75,11 L90,6 L100,8 L100,24 L0,24 Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
            </svg>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-zinc-900 rounded-3xl p-5 flex flex-col justify-between gap-3 border border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Cumulative FPY</span>
              <span className="font-body-xs text-[11px] text-zinc-500">First Pass Yield</span>
            </div>
            <div className="p-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">98.6%</span>
            <div className="flex flex-col items-end">
              <span className="font-metric-table text-metric-table text-emerald-400 flex items-center font-semibold text-xs">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                +0.6%
              </span>
              <span className="font-body-xs text-[11px] text-zinc-500">Target: 98.0%</span>
            </div>
          </div>
          <div className="flex items-center gap-2 h-8">
            <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '98.6%' }}></div>
            </div>
            <span className="font-metric-table text-[11px] text-emerald-400 font-bold">Passed</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-zinc-900 rounded-3xl p-5 flex flex-col justify-between gap-3 border border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Cycle Time / Assy</span>
              <span className="font-body-xs text-[11px] text-zinc-500">SMT to Packaging</span>
            </div>
            <div className="p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">
              42.4<span className="font-headline-sm text-body-sm text-zinc-400 font-normal text-sm">s</span>
            </span>
            <div className="flex flex-col items-end">
              <span className="font-metric-table text-metric-table text-emerald-400 flex items-center font-semibold text-xs">
                <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                -1.6s
              </span>
              <span className="font-body-xs text-[11px] text-zinc-500">Std: 44.0s</span>
            </div>
          </div>
          <div className="h-8 flex items-center justify-between text-[11px] bg-zinc-950/80 px-3 rounded-xl border border-zinc-800/80">
            <span className="text-zinc-400">Pacing Margin</span>
            <span className="font-metric-table text-emerald-400 font-semibold">+3.6% Ahead</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-zinc-900 rounded-3xl p-5 flex flex-col justify-between gap-3 border border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">NCR &amp; Actions</span>
              <span className="font-body-xs text-[11px] text-zinc-500">Non-Conformance</span>
            </div>
            <div className="p-2 rounded-2xl bg-zinc-800 border border-zinc-700/60 text-zinc-400">
              <span className="material-symbols-outlined text-[18px]">bug_report</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">
              2 <span className="font-headline-sm text-body-sm text-zinc-400 font-normal text-sm">Active</span>
            </span>
            <div className="flex flex-col items-end">
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-label-caps text-[10px] font-semibold border border-zinc-700/50">
                Low Severity
              </span>
              <span className="font-body-xs text-[11px] text-zinc-500">0 Critical Blockers</span>
            </div>
          </div>
          <div className="h-8 flex items-center justify-between text-[12px]">
            <span className="text-zinc-400">Resolution SLA</span>
            <span className="font-metric-table text-emerald-400 font-semibold">100% on schedule</span>
          </div>
        </div>
      </div>

      {/* Deep-Dive Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lines & ECOs (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Production Facility & Machine Allocation */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                    Assigned Dedicated Lines &amp; Workcells
                  </h2>
                  <p className="font-body-xs text-[12px] text-zinc-400">
                    Physical equipment utilization allocated to FactoryIQ Alpha
                  </p>
                </div>
              </div>
              <span className="font-metric-table text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full font-semibold text-xs">
                92% Overall Utilization
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Line 1 */}
              <div className="bg-zinc-950/80 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-body-sm text-zinc-200 font-semibold text-[13px]">
                    SMT Surface Mount Line 02
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-label-caps text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>RUNNING
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-xs text-[12px] text-zinc-400 mt-1">
                  <span>Tooling: Fuji NXT III Flex</span>
                  <span className="font-metric-table text-zinc-200 font-medium">94.2% Load</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
                <div className="flex justify-between text-body-xs text-[11px] text-zinc-500 pt-1">
                  <span>
                    OEE: <strong className="text-zinc-300 font-metric-table font-semibold">89.4%</strong>
                  </span>
                  <span>Next Maint: 14 Aug</span>
                </div>
              </div>

              {/* Line 2 */}
              <div className="bg-zinc-950/80 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-body-sm text-zinc-200 font-semibold text-[13px]">
                    Automated Optical Line AOI-04
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-label-caps text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>RUNNING
                  </span>
                </div>
                <div className="flex items-center justify-between text-body-xs text-[12px] text-zinc-400 mt-1">
                  <span>Scanner: Koh Young 3D AOI</span>
                  <span className="font-metric-table text-zinc-200 font-medium">89.8% Load</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '89.8%' }}></div>
                </div>
                <div className="flex justify-between text-body-xs text-[11px] text-zinc-500 pt-1">
                  <span>
                    OEE: <strong className="text-zinc-300 font-metric-table font-semibold">92.1%</strong>
                  </span>
                  <span>Calibration: Passed</span>
                </div>
              </div>
            </div>

            {/* Line Photo Anchor & Floor Context */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner">
              <img
                className="w-full h-full object-cover"
                alt="High-tech electronics cleanroom assembly floor"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOS3AD9SyrLMmlsDcvFSqmEoRblWlxyh_H6823dB4EN0_Zoevg_I6mPLhTAuE7lFJud_0rAoxYx6_E51PMwlFI_GCcYtfXDe2I1iqFawUQOjkUsAFU6GD5vmdaZj2v1RYWs_FM7WDAgjBJJozgrj9pgxpqKXRrXvbYXHC8bJKekhyhgOGiYObMwS9HdMOS0rdvda-mfU3-8n7YrkeY9Sr5VYarAROYFSA6_jMrxqdBdkYENkBigiOPQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent flex items-end justify-between p-4 text-white">
                <div>
                  <span className="font-label-caps text-[10px] uppercase text-blue-400 font-bold tracking-wider">
                    Hyderabad Plant 1 • Cleanroom Bay 2B
                  </span>
                  <p className="font-body-sm text-[12px] text-zinc-300">
                    Dedicated PVT production run for Apex Electronics Alpha assemblies
                  </p>
                </div>
                <span className="font-metric-table text-zinc-200 bg-zinc-900/90 border border-zinc-700/60 px-2.5 py-1 rounded-full text-xs font-semibold">
                  24/7 Shift Active
                </span>
              </div>
            </div>
          </div>

          {/* Active Engineering Change Orders (ECO) */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">published_with_changes</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                    Active Engineering Change Orders (ECO)
                  </h2>
                  <p className="font-body-xs text-[12px] text-zinc-400">
                    Engineering lifecycle revisions impacting Bill of Materials &amp; Firmware
                  </p>
                </div>
              </div>
              <button
                onClick={onEngineeringReq}
                className="text-blue-400 hover:text-blue-300 font-body-sm text-[13px] flex items-center gap-1 font-medium transition-colors"
                type="button"
              >
                <span>View All ({ecos.length})</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* ECO Items List */}
            <div className="flex flex-col gap-3">
              {ecos.map((eco) => (
                <div
                  key={eco.id}
                  className="p-4 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950 transition-all flex flex-col gap-2 border border-zinc-800/80"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-metric-table text-body-sm text-blue-400 font-bold">{eco.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-caps text-[10px] font-semibold ${
                          eco.status.includes('Approved')
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            : 'bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                        }`}
                      >
                        {eco.status}
                      </span>
                    </div>
                    <span className="font-body-xs text-[11px] text-zinc-400">{eco.effective}</span>
                  </div>

                  <span className="font-headline-sm text-body-sm text-zinc-200 font-semibold text-[13px]">
                    {eco.title}
                  </span>
                  <p className="font-body-xs text-[12px] text-zinc-400 leading-relaxed">
                    {eco.description}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-body-xs text-[11px] text-zinc-500 flex-wrap gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px]">person</span>
                      <span>Owner: {eco.owner}</span>
                    </div>
                    <span className="text-emerald-400 font-medium">{eco.validationStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Controlled Docs & Activity Log (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Controlled Documents Package */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">folder_special</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">Controlled Documents</h2>
                  <p className="font-body-xs text-[12px] text-zinc-400">
                    Apex certified quality packages &amp; work instructions
                  </p>
                </div>
              </div>
              <button
                className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-full transition-colors"
                title="Upload Doc"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">upload_file</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950 transition-colors flex items-center justify-between border border-zinc-800/80 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2.5 rounded-xl bg-zinc-800 ${doc.color} flex-shrink-0`}>
                      <span className="material-symbols-outlined text-[20px]">{doc.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-headline-sm text-body-sm text-zinc-200 font-semibold text-[13px] truncate">
                        {doc.name}
                      </span>
                      <span className="font-body-xs text-[11px] text-zinc-500">
                        {doc.type} • {doc.size} • {doc.meta}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDownloadDoc(doc.name)}
                    className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-full transition-colors"
                    title={`Download ${doc.name}`}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Program Activity Feed */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 flex-1 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                    Program Activity Log
                  </h2>
                  <p className="font-body-xs text-[12px] text-zinc-400">
                    Audit trail of critical changes and signs-off
                  </p>
                </div>
              </div>
              <span className="font-label-caps text-[10px] uppercase text-zinc-500 font-bold tracking-wider">
                LIVE FEED
              </span>
            </div>

            {/* Activity Timeline */}
            <div className="flex flex-col gap-4 relative pl-4 my-2">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-zinc-800"></div>

              {activities.map((act) => (
                <div key={act.id} className="relative flex items-start gap-3">
                  <div
                    className={`h-4 w-4 rounded-full flex items-center justify-center -ml-4 ring-4 ring-zinc-900 ${
                      act.type === 'approved'
                        ? 'bg-emerald-500 text-black'
                        : act.type === 'calibration'
                        ? 'bg-blue-500 text-white'
                        : 'bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[10px]">
                      {act.type === 'approved' ? 'check' : act.type === 'calibration' ? 'tune' : 'calendar_today'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-headline-sm text-body-sm text-zinc-200 font-semibold text-[13px]">
                      {act.title}
                    </span>
                    <p className="font-body-xs text-[12px] text-zinc-400 leading-relaxed">
                      {act.description}
                    </p>
                    <span className="font-metric-table text-[11px] text-zinc-500 mt-0.5">
                      {act.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* QA Specialist Snapshot */}
            <div className="mt-auto pt-2">
              <div className="bg-zinc-950/80 rounded-2xl p-3.5 flex items-center justify-between border border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <img
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                    alt="Lin Zhang Site Lead Quality Auditor"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOqMPUaN7jl0FmEJWVjfn3bQJJ0-LsEd_Gylrbszlf7iFPcvz6_hRcNKWKHCPFfWU47Sm6tS2LirQbjKAWj6kfT0GSKaMNfUoi5sgZCwukNxBCK4s3_HmJOLcIf6g82Y9w-LuTb8vr3h8ExOOo4f3BX9iOsgCnKiK1jJFO2fQvFQpbMWFTx96C25p58x59Qwk9IMJG4rhBamHGA97JPl7rnufVpAy5-4iEbIilt6uinAMgoGtpzpSvAg"
                  />
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-body-xs text-zinc-200 font-semibold text-[12px]">
                      Lin Zhang
                    </span>
                    <span className="font-body-xs text-[11px] text-zinc-500">
                      Site Lead Quality Auditor
                    </span>
                  </div>
                </div>
                <button
                  onClick={onMessageAuditor}
                  className="text-blue-400 hover:text-blue-300 font-body-xs text-[12px] flex items-center gap-1 font-medium transition-colors px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20"
                  type="button"
                >
                  <span>Message</span>
                  <span className="material-symbols-outlined text-[14px]">chat</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
