import React, { useState } from 'react';
import { StationTelemetry, WorkOrder, NcrItem } from '../types';

interface NewDeviationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deviation: Partial<NcrItem>) => void;
}

export const NewDeviationModal: React.FC<NewDeviationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [program, setProgram] = useState('Apex Alpha (MB-v3.2)');
  const [part, setPart] = useState('Apex Alpha Mainboard');
  const [station, setStation] = useState('Reflow Zone 4');
  const [severity, setSeverity] = useState<'Critical' | 'Major' | 'Minor'>('Major');
  const [description, setDescription] = useState('');
  const [lotRange, setLotRange] = useState('Lot #NX-9010');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmit({
      program,
      part,
      station,
      severity,
      defectDescription: description,
      lotRange,
      stage8D: 'D1: Team Assigned',
      stageNumber: 1,
      lead: 'Sarah Johnson',
      leadInitials: 'SJ',
      slaDaysRemaining: '7 days left',
      status: 'Under Review'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-3xl shadow-2xl p-6 z-10 border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 material-symbols-outlined text-[20px]">
              warning
            </span>
            <h3 className="text-zinc-100 font-bold text-base">Initiate Incident / Deviation</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Program</label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="Apex Alpha (MB-v3.2)">Apex Alpha (MB-v3.2)</option>
                <option value="Titan Compute (TC-800)">Titan Compute (TC-800)</option>
                <option value="Helios Inverter (HI-Solar)">Helios Inverter (HI-Solar)</option>
                <option value="NeuroPulse Medical Sensor">NeuroPulse Medical Sensor</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Severity</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="Critical">Critical (Immediate Line Stop)</option>
                <option value="Major">Major (3σ Excursion)</option>
                <option value="Minor">Minor (Cosmetic / Watch)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Station / Cell</label>
              <input
                value={station}
                onChange={(e) => setStation(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500 placeholder:text-zinc-600"
                placeholder="e.g. Reflow Zone 4"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Lot Number</label>
              <input
                value={lotRange}
                onChange={(e) => setLotRange(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500 placeholder:text-zinc-600"
                placeholder="e.g. Lot #NX-9010"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Defect Description</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe physical anomaly, statistical delta, or visual defect observed..."
              className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500 placeholder:text-zinc-600"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-full text-xs shadow-sm transition-colors"
            >
              Generate NCR &amp; Notify QA
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Partial<WorkOrder>) => void;
}

export const DispatchOrderModal: React.FC<DispatchModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [partName, setPartName] = useState('Apex Alpha Mainboard Rev C');
  const [partNumber, setPartNumber] = useState('PN-88201-C');
  const [program, setProgram] = useState('FactoryIQ Alpha');
  const [lotSize, setLotSize] = useState('1500');
  const [lead, setLead] = useState('David Vance');
  const [priority, setPriority] = useState<'Urgent' | 'High' | 'Medium' | 'Normal'>('High');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      partName,
      partNumber,
      program,
      lotSize: parseInt(lotSize, 10) || 1000,
      completed: 0,
      scrap: 0,
      lead,
      priority,
      status: 'Queued Next'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-3xl shadow-2xl p-6 z-10 border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 material-symbols-outlined text-[20px]">
              send_time_extension
            </span>
            <h3 className="text-zinc-100 font-bold text-base">Dispatch SMT Work Order</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Assembly Description</label>
            <input
              required
              value={partName}
              onChange={(e) => setPartName(e.target.value)}
              className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Part Number</label>
              <input
                required
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Program</label>
              <input
                required
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Lot Size</label>
              <input
                type="number"
                required
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Line Lead</label>
              <input
                required
                value={lead}
                onChange={(e) => setLead(e.target.value)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase text-zinc-400 font-semibold tracking-wider">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="px-3 py-2 bg-zinc-950 rounded-xl text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-full text-xs shadow-sm transition-colors"
            >
              Commit to Line Sequence
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface StationInspectorModalProps {
  station: StationTelemetry | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StationInspectorModal: React.FC<StationInspectorModalProps> = ({ station, isOpen, onClose }) => {
  if (!isOpen || !station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-3xl shadow-2xl p-6 z-10 border border-zinc-800 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 material-symbols-outlined text-[20px]">
              {station.icon}
            </span>
            <div>
              <span className="font-mono text-xs text-zinc-500 font-bold">{station.stnNumber}</span>
              <h3 className="text-zinc-100 font-bold text-base">{station.name}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between">
            <span className="text-zinc-400">{station.metricLabel}</span>
            <span className="font-mono font-bold text-base text-zinc-100">{station.metricValue}</span>
          </div>

          {station.details && (
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold">Machine Asset</span>
                <span className="font-medium text-zinc-200 mt-0.5">{station.details.machineModel}</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold">Assigned Op</span>
                <span className="font-medium text-zinc-200 mt-0.5">{station.details.operator}</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold">Takt Cycle Time</span>
                <span className="font-mono font-medium text-cyan-400 mt-0.5">{station.details.cycleTime}</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-semibold">Drift Variance</span>
                <span className="font-mono font-medium text-emerald-400 mt-0.5">{station.details.driftVariance}</span>
              </div>
            </div>
          )}

          {station.details?.temperatureZone && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs flex items-start gap-2.5">
              <span className="material-symbols-outlined text-rose-400 text-[18px]">thermostat</span>
              <div className="flex flex-col">
                <span className="font-bold text-rose-400">Thermal Excursion Active</span>
                <span className="text-zinc-300 mt-0.5">{station.details.temperatureZone}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-medium border border-zinc-700 transition-colors"
          >
            Calibrate Sensor
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold shadow-sm transition-colors"
          >
            Acknowledge Station
          </button>
        </div>
      </div>
    </div>
  );
};
