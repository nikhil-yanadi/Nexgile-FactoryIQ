/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavView, NcrItem, WorkOrder, StationTelemetry, AlertItem } from './types';
import {
  INITIAL_ALERTS,
  INITIAL_PROGRAMS,
  INITIAL_WORK_ORDERS,
  FLOW_STATIONS,
  INITIAL_NCRS,
  GATE_STAGES,
  INITIAL_ECOS,
  CONTROLLED_DOCS,
  ACTIVITY_FEED
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { ProgramDeepDive } from './components/ProgramDeepDive';
import { ShopfloorWorkOrder } from './components/ShopfloorWorkOrder';
import { QualityIntelligence } from './components/QualityIntelligence';
import { CapaDrawer } from './components/CapaDrawer';
import {
  NewDeviationModal,
  DispatchOrderModal,
  StationInspectorModal
} from './components/Modals';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('executive-dashboard');
  const [selectedFacility, setSelectedFacility] = useState<string>('Hyderabad Plant 1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Data states
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [programs] = useState(INITIAL_PROGRAMS);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(INITIAL_WORK_ORDERS);
  const [ncrs, setNcrs] = useState<NcrItem[]>(INITIAL_NCRS);
  const [stations] = useState<StationTelemetry[]>(FLOW_STATIONS);

  // Modals & Drawers state
  const [selectedNcr, setSelectedNcr] = useState<NcrItem | null>(null);
  const [isCapaDrawerOpen, setIsCapaDrawerOpen] = useState(false);
  const [isNewDeviationOpen, setIsNewDeviationOpen] = useState(false);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [inspectedStation, setInspectedStation] = useState<StationTelemetry | null>(null);
  const [expandedCamera, setExpandedCamera] = useState(false);
  const [isMessageAuditorOpen, setIsMessageAuditorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4000);
  };

  // Handlers
  const handleAlertAction = (alertId: string, actionName: string) => {
    if (actionName === 'Investigate' || actionName === 'Escalate') {
      setCurrentView('quality-intelligence');
      const targetNcr = ncrs.find((n) => n.id === 'NCR-2024-1142');
      if (targetNcr) {
        setSelectedNcr(targetNcr);
        setIsCapaDrawerOpen(true);
      }
      showToast(`Escalation triggered for Alert #${alertId}. Opened 8D Dossier.`);
    } else if (actionName.includes('Ack') || actionName === 'Dismiss') {
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
      showToast(`Alert #${alertId} acknowledged and resolved.`);
    } else {
      showToast(`Action "${actionName}" executed on ${alertId}.`);
    }
  };

  const handleCreateDeviation = (deviationData: Partial<NcrItem>) => {
    const newId = `NCR-2024-${1143 + ncrs.length}`;
    const newNcr: NcrItem = {
      id: newId,
      program: deviationData.program || 'Apex Alpha (MB-v3.2)',
      part: deviationData.part || 'Apex Alpha Mainboard',
      station: deviationData.station || 'SMT Line 3',
      severity: deviationData.severity || 'Major',
      defectDescription: deviationData.defectDescription || 'Process deviation detected',
      lotRange: deviationData.lotRange || 'Lot #NX-9010',
      stage8D: 'D1: Team Assigned',
      stageNumber: 1,
      lead: 'Sarah Johnson',
      leadInitials: 'SJ',
      slaDaysRemaining: '7 days left',
      status: 'Under Review'
    };
    setNcrs([newNcr, ...ncrs]);
    showToast(`New Incident logged: ${newId} assigned to Sarah Johnson.`);
  };

  const handleDispatchOrder = (orderData: Partial<WorkOrder>) => {
    const newWo: WorkOrder = {
      id: `wo-${workOrders.length + 1}`,
      orderNumber: `WO-2024-${9946 + workOrders.length}`,
      partNumber: orderData.partNumber || 'PN-88201-C',
      partName: orderData.partName || 'Apex Alpha Mainboard Rev C',
      program: orderData.program || 'FactoryIQ Alpha',
      lotSize: orderData.lotSize || 1500,
      completed: 0,
      scrap: 0,
      lead: orderData.lead || 'David Vance',
      priority: orderData.priority || 'High',
      status: 'Queued Next'
    };
    setWorkOrders([newWo, ...workOrders]);
    showToast(`Work Order ${newWo.orderNumber} committed to Line 03 sequence.`);
  };

  const handleApproveD5 = (ncrId: string) => {
    setNcrs((prev) =>
      prev.map((item) =>
        item.id === ncrId
          ? {
              ...item,
              stage8D: 'D6: Validate',
              stageNumber: 6,
              status: 'In Progress'
            }
          : item
      )
    );
    showToast(`D5 Permanent Corrective Action approved. ${ncrId} promoted to D6: Validate.`);
  };

  const handleOperatorAction = (actionType: string) => {
    if (actionType === 'downtime') {
      showToast('Micro-downtime recorded: +3 mins logged for feeder reel splice.', 'info');
    } else if (actionType === 'refill') {
      showToast('Component refill request broadcast: AGV-4 dispatched with reel tray.', 'success');
    } else if (actionType === 'quarantine') {
      showToast('SMT Lot Quarantined: Inspection hold flagged in MES database.', 'error');
    } else if (actionType === 'feeder') {
      showToast('Feeder barcode matrix verified against recipe: All 48 slots aligned.', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => setCurrentView(view)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <Header
          selectedFacility={selectedFacility}
          onFacilityChange={setSelectedFacility}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          alerts={alerts}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onProfileClick={() => setIsSettingsOpen(true)}
          onNavigateToView={(view) => setCurrentView(view)}
        />

        {/* Content Area */}
        <main className="flex-1 mt-16 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {currentView === 'executive-dashboard' && (
            <ExecutiveDashboard
              programs={programs}
              alerts={alerts}
              onNavigateToProgram={() => setCurrentView('program-deep-dive')}
              onNavigateToView={(view) => setCurrentView(view)}
              onNewDeviation={() => setIsNewDeviationOpen(true)}
              onExportBrief={() => showToast('Executive Operations Brief exported to PDF.')}
              onAlertAction={handleAlertAction}
            />
          )}

          {currentView === 'program-deep-dive' && (
            <ProgramDeepDive
              gateStages={GATE_STAGES}
              ecos={INITIAL_ECOS}
              docs={CONTROLLED_DOCS}
              activities={ACTIVITY_FEED}
              onExportReport={() => showToast('Full PVT Validation Dossier exported.')}
              onEngineeringReq={() => showToast('Engineering Request ECO-2024-091 draft initiated.')}
              onMessageAuditor={() => setIsMessageAuditorOpen(true)}
              onDownloadDoc={(docName) => showToast(`Downloaded controlled document: ${docName}`)}
              onNavigateToView={(view) => setCurrentView(view)}
            />
          )}

          {currentView === 'shopfloor-work-order' && (
            <ShopfloorWorkOrder
              workOrders={workOrders}
              stations={stations}
              onDispatchOrder={() => setIsDispatchModalOpen(true)}
              onStationSelect={(stn) => setInspectedStation(stn)}
              onOperatorAction={handleOperatorAction}
              onExpandCamera={() => setExpandedCamera(true)}
              onSelectOrder={(wo) => showToast(`Inspecting Work Order ${wo.orderNumber} (${wo.partName})`)}
            />
          )}

          {currentView === 'quality-intelligence' && (
            <QualityIntelligence
              ncrs={ncrs}
              onOpenCapa={(ncr) => {
                setSelectedNcr(ncr);
                setIsCapaDrawerOpen(true);
              }}
              onInitiateNcr={() => setIsNewDeviationOpen(true)}
              onExportAudit={() => showToast('Audit trail ledger exported to CSV.')}
            />
          )}
        </main>
      </div>

      {/* 8D Investigation & CAPA Dossier Slide-Over Drawer */}
      <CapaDrawer
        ncr={selectedNcr}
        isOpen={isCapaDrawerOpen}
        onClose={() => setIsCapaDrawerOpen(false)}
        onApproveD5={handleApproveD5}
      />

      {/* New Deviation Modal */}
      <NewDeviationModal
        isOpen={isNewDeviationOpen}
        onClose={() => setIsNewDeviationOpen(false)}
        onSubmit={handleCreateDeviation}
      />

      {/* Dispatch Work Order Modal */}
      <DispatchOrderModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        onSubmit={handleDispatchOrder}
      />

      {/* Station Inspector Modal */}
      <StationInspectorModal
        station={inspectedStation}
        isOpen={!!inspectedStation}
        onClose={() => setInspectedStation(null)}
      />

      {/* Message Auditor Modal */}
      {isMessageAuditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsMessageAuditorOpen(false)} />
          <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl shadow-2xl p-6 z-10 border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
              <img
                className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30"
                alt="Lin Zhang"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOqMPUaN7jl0FmEJWVjfn3bQJJ0-LsEd_Gylrbszlf7iFPcvz6_hRcNKWKHCPFfWU47Sm6tS2LirQbjKAWj6kfT0GSKaMNfUoi5sgZCwukNxBCK4s3_HmJOLcIf6g82Y9w-LuTb8vr3h8ExOOo4f3BX9iOsgCnKiK1jJFO2fQvFQpbMWFTx96C25p58x59Qwk9IMJG4rhBamHGA97JPl7rnufVpAy5-4iEbIilt6uinAMgoGtpzpSvAg"
              />
              <div className="flex flex-col">
                <span className="text-zinc-100 font-semibold text-sm">Lin Zhang</span>
                <span className="text-zinc-400 text-xs">Site Lead Quality Auditor (Hyderabad Plant 1)</span>
              </div>
            </div>
            <textarea
              rows={3}
              placeholder="Send quick dispatch note or query to Lin Zhang..."
              className="w-full p-3 bg-zinc-950 rounded-2xl text-xs text-zinc-200 border border-zinc-800 focus:outline-none focus:border-cyan-500 placeholder:text-zinc-600"
            />
            <div className="flex justify-end gap-3 pt-1">
              <button
                onClick={() => setIsMessageAuditorOpen(false)}
                className="px-4 py-2 rounded-full text-zinc-400 hover:text-zinc-200 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsMessageAuditorOpen(false);
                  showToast('Direct communication dispatched to Lin Zhang.');
                }}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs rounded-full shadow-sm transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expand Camera Modal */}
      {expandedCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setExpandedCamera(false)} />
          <div className="relative w-full max-w-3xl bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-zinc-800 flex flex-col">
            <div className="p-4 bg-zinc-950/80 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="text-xs font-bold text-zinc-200">
                  Live Camera 03 • 3D X-Ray Inspection Chamber (Continuous Scan)
                </span>
              </div>
              <button onClick={() => setExpandedCamera(false)} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="relative w-full h-96 bg-black flex items-center justify-center">
              <img
                className="w-full h-full object-contain"
                alt="SMT Solder Inspection Chamber Live High Res"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsOS3AD9SyrLMmlsDcvFSqmEoRblWlxyh_H6823dB4EN0_Zoevg_I6mPLhTAuE7lFJud_0rAoxYx6_E51PMwlFI_GCcYtfXDe2I1iqFawUQOjkUsAFU6GD5vmdaZj2v1RYWs_FM7WDAgjBJJozgrj9pgxpqKXRrXvbYXHC8bJKekhyhgOGiYObMwS9HdMOS0rdvda-mfU3-8n7YrkeY9Sr5VYarAROYFSA6_jMrxqdBdkYENkBigiOPQ"
              />
              <div className="absolute top-4 left-4 font-mono text-xs text-zinc-300 bg-black/70 px-3 py-1.5 rounded-full border border-zinc-800 backdrop-blur-sm">
                FPS: 60 • Sensor: Hamamatsu InGaAs • Exposure: 1.2ms
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
          <div className="relative w-full max-w-md bg-zinc-900 rounded-3xl shadow-2xl p-6 z-10 border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-zinc-100 font-bold text-base">FactoryIQ System Settings</h3>
              <button onClick={() => setIsSettingsOpen(false)} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-zinc-400">PLC Telemetry Frequency</span>
                <span className="font-mono font-semibold text-cyan-400">250 ms</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-zinc-400">Reflow Delta Threshold</span>
                <span className="font-mono font-semibold text-rose-400">±3.5 °C</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                <span className="text-zinc-400">Automatic 8D Escalation</span>
                <span className="text-emerald-400 font-semibold">Enabled</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsSettingsOpen(false);
                showToast('Settings preferences saved.');
              }}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-full text-xs shadow-sm transition-colors mt-2"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsHelpOpen(false)} />
          <div className="relative w-full max-w-lg bg-zinc-900 rounded-3xl shadow-2xl p-6 z-10 border border-zinc-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-zinc-100 font-bold text-base">Nexgile FactoryIQ MES Guide</h3>
              <button onClick={() => setIsHelpOpen(false)} className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 text-xs text-zinc-400 leading-relaxed">
              <p>
                <strong className="text-zinc-200">Executive Dashboard:</strong> Real-time production run-rates, planned vs actual telemetry, defect Pareto distributions, and operational alerts.
              </p>
              <p>
                <strong className="text-zinc-200">Program Deep-Dive:</strong> Project gate milestones (EVT/DVT/PVT), dedicated line allocations, controlled PPAP documentation, and ECO revision tracking.
              </p>
              <p>
                <strong className="text-zinc-200">Shopfloor Work Order:</strong> Line-specific takt cycle pacing, SMT pipeline station telemetry, live camera feeds, and operator quick actions.
              </p>
              <p>
                <strong className="text-zinc-200">Quality Intelligence:</strong> Statistical Process Control (SPC), yield vs scrap curves, and interactive 8D investigation dossier workflows.
              </p>
            </div>
            <button
              onClick={() => setIsHelpOpen(false)}
              className="py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold rounded-full text-xs self-end px-5 shadow-sm transition-colors mt-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-2xl text-xs font-semibold border animate-in slide-in-from-bottom duration-200 ${
            toast.type === 'error'
              ? 'bg-zinc-900 text-rose-400 border-rose-500/30'
              : toast.type === 'info'
              ? 'bg-zinc-900 text-cyan-400 border-cyan-500/30'
              : 'bg-zinc-900 text-emerald-400 border-emerald-500/30'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
          </span>
          <span className="text-zinc-200">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
