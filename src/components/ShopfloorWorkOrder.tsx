import React, { useState } from 'react';
import { WorkOrder, StationTelemetry } from '../types';

interface ShopfloorWorkOrderProps {
  workOrders: WorkOrder[];
  stations: StationTelemetry[];
  onDispatchOrder: () => void;
  onStationSelect: (station: StationTelemetry) => void;
  onOperatorAction: (actionType: string) => void;
  onExpandCamera: () => void;
  onSelectOrder: (order: WorkOrder) => void;
}

export const ShopfloorWorkOrder: React.FC<ShopfloorWorkOrderProps> = ({
  workOrders,
  stations,
  onDispatchOrder,
  onStationSelect,
  onOperatorAction,
  onExpandCamera,
  onSelectOrder
}) => {
  const [selectedPlant, setSelectedPlant] = useState('Hyderabad Plant 1');
  const [selectedLine, setSelectedLine] = useState('SMT Line 03');
  const [selectedShift, setSelectedShift] = useState('Shift 1 - Day Shift');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = workOrders.filter((wo) => {
    if (statusFilter === 'in-prod') return wo.status === 'In Production';
    if (statusFilter === 'queued') return wo.status === 'Queued Next' || wo.status === 'Staged';
    if (statusFilter === 'completed') return wo.status === 'Completed';
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 1. Operational Context & Line Filter Strip */}
      <div className="bg-zinc-900 rounded-3xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-zinc-800">
        <div className="flex flex-wrap items-center gap-4">
          {/* Plant Selector */}
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">
              Site / Plant
            </span>
            <div className="flex items-center gap-2 bg-zinc-950/80 px-3.5 py-2 rounded-2xl border border-zinc-800">
              <span className="material-symbols-outlined text-[18px] text-blue-400">apartment</span>
              <select
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                className="bg-transparent font-headline-sm text-body-sm font-semibold text-zinc-200 focus:outline-none cursor-pointer text-[13px]"
              >
                <option value="Hyderabad Plant 1" className="bg-zinc-900 text-zinc-200">Hyderabad Plant 1</option>
                <option value="Austin Tech Center" className="bg-zinc-900 text-zinc-200">Austin Tech Center</option>
                <option value="Stuttgart Fab" className="bg-zinc-900 text-zinc-200">Stuttgart Fab</option>
                <option value="Penang Cleanroom" className="bg-zinc-900 text-zinc-200">Penang Cleanroom</option>
              </select>
            </div>
          </div>

          {/* Line Assignment */}
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">
              Line Assignment
            </span>
            <div className="flex items-center gap-2 bg-zinc-950/80 px-3.5 py-2 rounded-2xl border border-zinc-800">
              <span className="material-symbols-outlined text-[18px] text-blue-400">tune</span>
              <select
                value={selectedLine}
                onChange={(e) => setSelectedLine(e.target.value)}
                className="bg-transparent font-headline-sm text-body-sm font-semibold text-zinc-200 focus:outline-none cursor-pointer text-[13px]"
              >
                <option value="SMT Line 03" className="bg-zinc-900 text-zinc-200">SMT Line 03 (High-Speed SMT &amp; Box Build)</option>
                <option value="SMT Line 01" className="bg-zinc-900 text-zinc-200">SMT Line 01 (Prototype EVT)</option>
                <option value="SMT Line 02" className="bg-zinc-900 text-zinc-200">SMT Line 02 (Fuji High Volume)</option>
                <option value="SMT Line 04" className="bg-zinc-900 text-zinc-200">SMT Line 04 (Cleanroom Flex Assembly)</option>
              </select>
            </div>
          </div>

          {/* Active Shift */}
          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">
              Active Shift
            </span>
            <div className="flex items-center gap-2 bg-zinc-950/80 px-3.5 py-2 rounded-2xl border border-zinc-800">
              <span className="material-symbols-outlined text-[18px] text-emerald-400">schedule</span>
              <select
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
                className="bg-transparent font-headline-sm text-body-sm font-semibold text-zinc-200 focus:outline-none cursor-pointer text-[13px]"
              >
                <option value="Shift 1 - Day Shift" className="bg-zinc-900 text-zinc-200">Shift 1 - Day Shift (06:00 - 14:30)</option>
                <option value="Shift 2 - Swing Shift" className="bg-zinc-900 text-zinc-200">Shift 2 - Swing Shift (14:30 - 23:00)</option>
                <option value="Shift 3 - Night Shift" className="bg-zinc-900 text-zinc-200">Shift 3 - Graveyard (23:00 - 06:00)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status indicator & Dispatch Action */}
        <div className="flex items-center gap-3 flex-wrap self-start md:self-center">
          <div className="hidden lg:flex flex-col text-right">
            <span className="font-body-xs text-[11px] text-zinc-500">Supervisor: David Vance</span>
            <span className="font-metric-table text-body-xs text-emerald-400 font-semibold flex items-center justify-end gap-1.5 text-[12px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Line Speed: 100%
            </span>
          </div>

          <button
            onClick={onDispatchOrder}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-body-sm font-semibold rounded-2xl shadow-xs transition-colors text-[13px]"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">send_time_extension</span>
            Dispatch Order
          </button>
        </div>
      </div>

      {/* 2. Live Shift Telemetry Strip (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {/* Total Output */}
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Total Output</span>
          <div className="my-1.5">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">1,180</span>
            <span className="font-body-xs text-[11px] text-zinc-500 ml-1">units</span>
          </div>
          <span className="font-metric-table text-[11px] text-emerald-400 font-semibold">+4.2% pacing</span>
        </div>

        {/* Shift Target */}
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Shift Target</span>
          <div className="my-1.5">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">1,250</span>
            <span className="font-body-xs text-[11px] text-zinc-500 ml-1">units</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: '94.4%' }}></div>
          </div>
        </div>

        {/* Current WIP */}
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Current WIP</span>
          <div className="my-1.5">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">142</span>
            <span className="font-body-xs text-[11px] text-zinc-500 ml-1">units</span>
          </div>
          <span className="font-body-xs text-[11px] text-zinc-500">Buffer: 18m</span>
        </div>

        {/* Real-time Yield */}
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Real-Time Yield</span>
          <div className="my-1.5">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">98.7%</span>
            <span className="font-body-xs text-[11px] text-zinc-500 ml-1">FTY</span>
          </div>
          <span className="font-metric-table text-[11px] text-emerald-400 font-semibold">+0.3% vs target</span>
        </div>

        {/* Cycle Time (Takt) */}
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <span className="font-label-caps text-[11px] uppercase text-zinc-400 font-semibold">Cycle Time (Takt)</span>
          <div className="my-1.5">
            <span className="font-metric-display text-metric-display text-zinc-100 text-2xl font-bold">38.2</span>
            <span className="font-body-xs text-[11px] text-zinc-500 ml-1">s</span>
          </div>
          <span className="font-body-xs text-[11px] text-zinc-500">Std: 40.0s</span>
        </div>

        {/* Downtime Today */}
        <div className="bg-zinc-900 p-4 rounded-3xl border border-zinc-800 flex flex-col justify-between">
          <span className="font-label-caps text-[11px] uppercase text-red-400 font-semibold">Downtime Today</span>
          <div className="my-1.5">
            <span className="font-metric-display text-metric-display text-red-400 text-2xl font-bold">14</span>
            <span className="font-body-xs text-[11px] text-zinc-500 ml-1">mins</span>
          </div>
          <span className="font-body-xs text-[11px] text-red-400 font-medium truncate" title="Reflow Thermal Calib">
            Reflow Thermal Calib
          </span>
        </div>
      </div>

      {/* 3. SMT Production Flow Architecture (Pipeline Process Flow) */}
      <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <span className="material-symbols-outlined text-[20px]">alt_route</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                SMT Production Flow Architecture
              </h2>
              <p className="font-body-xs text-[12px] text-zinc-400">
                Live automated telemetry stream from physical PLC and vision sensors
              </p>
            </div>
          </div>
          <span className="text-body-xs text-[12px] text-zinc-500">
            Click any station for diagnostic inspection
          </span>
        </div>

        {/* Pipeline Stations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3">
          {stations.map((stn) => {
            const isWarning = stn.statusType === 'warning';
            const isBottleneck = stn.statusType === 'bottleneck';
            return (
              <div
                key={stn.stnNumber}
                onClick={() => onStationSelect(stn)}
                className={`p-3.5 rounded-2xl flex flex-col justify-between gap-2 border cursor-pointer transition-all ${
                  isWarning
                    ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                    : isBottleneck
                    ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-zinc-950/80 border-zinc-800 hover:bg-zinc-950'
                }`}
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-metric-table text-zinc-400 font-bold">{stn.stnNumber}</span>
                  <span
                    className={`font-label-caps text-[9px] uppercase px-2 py-0.5 rounded-full font-bold ${
                      isWarning
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : isBottleneck
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {stn.statusBadge}
                  </span>
                </div>

                <div className="flex items-center gap-2 my-1">
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      isWarning ? 'text-red-400' : isBottleneck ? 'text-amber-400' : 'text-blue-400'
                    }`}
                  >
                    {stn.icon}
                  </span>
                  <span className="font-headline-sm text-body-sm font-semibold text-zinc-200 text-[13px] truncate">
                    {stn.name}
                  </span>
                </div>

                <div className="flex flex-col text-[11px] pt-1.5 border-t border-zinc-800">
                  <span className="text-zinc-500">{stn.metricLabel}</span>
                  <span
                    className={`font-metric-table font-bold text-[12px] truncate ${
                      isWarning ? 'text-red-400' : 'text-zinc-200'
                    }`}
                  >
                    {stn.metricValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Active Work Orders Table & Quick Operator Controls */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Active Work Orders Table (8 Cols) */}
        <div className="xl:col-span-8 flex flex-col bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800">
          <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-zinc-950/40 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <span className="material-symbols-outlined text-[20px]">assignment</span>
              </div>
              <div>
                <h2 className="font-headline-sm text-base text-zinc-100 font-semibold">
                  Active Work Orders on SMT Line 03
                </h2>
                <p className="font-body-xs text-[12px] text-zinc-400">
                  Sequenced production batches scheduled for current 24-hour cycle
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex rounded-2xl p-1 bg-zinc-950 border border-zinc-800 text-xs font-medium">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  statusFilter === 'all' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All Orders
              </button>
              <button
                onClick={() => setStatusFilter('in-prod')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  statusFilter === 'in-prod' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                In Production
              </button>
              <button
                onClick={() => setStatusFilter('queued')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  statusFilter === 'queued' ? 'bg-zinc-800 text-zinc-100 font-semibold shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Queued
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/60 text-zinc-400 font-label-caps text-[11px] uppercase tracking-wider border-b border-zinc-800">
                  <th className="py-3 px-5 font-semibold">Order #</th>
                  <th className="py-3 px-5 font-semibold">Part Number &amp; Description</th>
                  <th className="py-3 px-5 font-semibold text-right">Lot Size</th>
                  <th className="py-3 px-5 font-semibold text-center">Progress &amp; Scrap</th>
                  <th className="py-3 px-5 font-semibold">Line Lead / Op</th>
                  <th className="py-3 px-5 font-semibold text-center">Status</th>
                  <th className="py-3 px-5 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-body-sm font-normal text-[13px]">
                {filteredOrders.map((wo) => {
                  const percent = Math.round((wo.completed / wo.lotSize) * 100);
                  const isUrgent = wo.priority === 'Urgent';
                  return (
                    <tr
                      key={wo.id}
                      onClick={() => onSelectOrder(wo)}
                      className="hover:bg-zinc-950/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex flex-col">
                          <span className="font-metric-table font-bold text-blue-400">{wo.orderNumber}</span>
                          <span className="text-[11px] text-zinc-500">{wo.program}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-zinc-200">{wo.partName}</span>
                          <span className="font-metric-table text-[11px] text-zinc-500">{wo.partNumber}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-right font-metric-table font-semibold text-zinc-200">
                        {wo.lotSize.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-5">
                        <div className="flex flex-col gap-1 w-36 mx-auto">
                          <div className="flex justify-between text-[11px]">
                            <span className="font-metric-table font-semibold text-zinc-300">
                              {wo.completed} ({percent}%)
                            </span>
                            {wo.scrap > 0 && (
                              <span className="font-metric-table text-red-400 font-medium">{wo.scrap} scr</span>
                            )}
                          </div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${percent === 100 ? 'bg-emerald-400' : 'bg-blue-500'}`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-zinc-300">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-zinc-500">person</span>
                          <span className="text-[12px]">{wo.lead}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            wo.status === 'In Production'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : wo.status === 'Completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : wo.status === 'Final Testing'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                          }`}
                        >
                          {isUrgent && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>}
                          {wo.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectOrder(wo);
                          }}
                          className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-full transition-colors"
                          title="Inspect Order"
                        >
                          <span className="material-symbols-outlined text-[18px]">read_more</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Floor Mode Quick Operator Controls & Physical Telemetry (4 Cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Quick Operator Controls */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-4 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">touch_app</span>
                </div>
                <h3 className="font-headline-sm text-base text-zinc-100 font-semibold">
                  Floor Mode Controls
                </h3>
              </div>
              <span className="font-label-caps text-[10px] uppercase text-emerald-400 font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onOperatorAction('downtime')}
                className="p-3.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950 transition-colors flex flex-col items-start gap-1 text-left border border-zinc-800/80 group"
              >
                <span className="material-symbols-outlined text-[20px] text-red-400 group-hover:scale-110 transition-transform">
                  timer_off
                </span>
                <span className="font-headline-sm text-[12px] font-semibold text-zinc-200">
                  Log Micro-Downtime
                </span>
                <span className="text-[10px] text-zinc-500">Record reel change / jam</span>
              </button>

              <button
                onClick={() => onOperatorAction('refill')}
                className="p-3.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950 transition-colors flex flex-col items-start gap-1 text-left border border-zinc-800/80 group"
              >
                <span className="material-symbols-outlined text-[20px] text-blue-400 group-hover:scale-110 transition-transform">
                  local_shipping
                </span>
                <span className="font-headline-sm text-[12px] font-semibold text-zinc-200">
                  Component Refill
                </span>
                <span className="text-[10px] text-zinc-500">Page warehouse AGV</span>
              </button>

              <button
                onClick={() => onOperatorAction('quarantine')}
                className="p-3.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950 transition-colors flex flex-col items-start gap-1 text-left border border-zinc-800/80 group"
              >
                <span className="material-symbols-outlined text-[20px] text-amber-400 group-hover:scale-110 transition-transform">
                  gavel
                </span>
                <span className="font-headline-sm text-[12px] font-semibold text-zinc-200">
                  Hold Lot / Quarantine
                </span>
                <span className="text-[10px] text-zinc-500">Isolate current SMT batch</span>
              </button>

              <button
                onClick={() => onOperatorAction('feeder')}
                className="p-3.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-950 transition-colors flex flex-col items-start gap-1 text-left border border-zinc-800/80 group"
              >
                <span className="material-symbols-outlined text-[20px] text-emerald-400 group-hover:scale-110 transition-transform">
                  barcode_scanner
                </span>
                <span className="font-headline-sm text-[12px] font-semibold text-zinc-200">
                  Change Feeder Setup
                </span>
                <span className="text-[10px] text-zinc-500">Load recipe barcode</span>
              </button>
            </div>
          </div>

          {/* Line Camera Feed / Physical Telemetry Snapshot */}
          <div className="bg-zinc-900 rounded-3xl p-6 flex flex-col gap-3 border border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <span className="material-symbols-outlined text-[20px]">videocam</span>
                </div>
                <h3 className="font-headline-sm text-base text-zinc-100 font-semibold text-[14px]">
                  Cam 03 • AXI Feed LIVE
                </h3>
              </div>
              <span className="flex items-center gap-1 font-metric-table text-[10px] text-red-400 font-bold px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                18ms latency
              </span>
            </div>

            <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-inner group">
              <img
                className="w-full h-full object-cover"
                alt="SMT Solder Inspection Chamber Live Feed"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOS3AD9SyrLMmlsDcvFSqmEoRblWlxyh_H6823dB4EN0_Zoevg_I6mPLhTAuE7lFJud_0rAoxYx6_E51PMwlFI_GCcYtfXDe2I1iqFawUQOjkUsAFU6GD5vmdaZj2v1RYWs_FM7WDAgjBJJozgrj9pgxpqKXRrXvbYXHC8bJKekhyhgOGiYObMwS9HdMOS0rdvda-mfU3-8n7YrkeY9Sr5VYarAROYFSA6_jMrxqdBdkYENkBigiOPQ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex items-end justify-between p-4">
                <div className="flex flex-col text-white">
                  <span className="font-label-caps text-[10px] uppercase font-bold tracking-wider text-blue-400">
                    Chamber 04B: Solder Profile
                  </span>
                  <span className="text-[11px] text-zinc-300">Continuous 3D CT scan active</span>
                </div>
                <button
                  onClick={onExpandCamera}
                  className="px-3 py-1 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 text-[11px] font-semibold rounded-xl border border-zinc-700/60 backdrop-blur-xs transition-colors"
                >
                  Expand View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
