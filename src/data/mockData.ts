import {
  ProgramHealth,
  WorkOrder,
  StationTelemetry,
  NcrItem,
  AlertItem,
  GateStage,
  EcoItem,
  ControlledDoc,
  ActivityFeedItem
} from '../types';

export const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    level: 'critical',
    title: 'SMT Line 3 Reflow Zone 4 Thermal Spike',
    description: 'Reflow delta temp exceeding ±3.5°C threshold (peak +4.2°C). Hyderabad Plant 1, SMT-Bay B.',
    timestamp: '09:38 UTC (4m ago)',
    facility: 'Hyderabad Plant 1',
    actions: ['Investigate', 'Ack (Reflow Lead)', 'Escalate']
  },
  {
    id: 'alt-2',
    level: 'warning',
    title: 'Apex Electronics Batch #NX-8821',
    description: 'SPI solder paste deposition height approaching 3σ statistical control limit. Austin Tech Center.',
    timestamp: '08:52 UTC (50m ago)',
    facility: 'Austin Tech Center',
    actions: ['Adjust Paste Volume', 'Dismiss']
  },
  {
    id: 'alt-3',
    level: 'info',
    title: 'Titanium Substrates Lot #TX-409 Delayed',
    description: 'Customs hold in transit. Inbound delivery delayed by 18 hours. Buffer stock covers 22 hours.',
    timestamp: '07:15 UTC (2h ago)',
    facility: 'Global Supply',
    actions: ['Reroute Buffer', 'Notify Planner']
  }
];

export const INITIAL_PROGRAMS: ProgramHealth[] = [
  {
    id: 'prg-1',
    name: 'Program Apex Alpha',
    code: 'WO-2025-0104',
    customer: 'Apex Electronics',
    site: 'Hyderabad Plant',
    yieldRate: 99.1,
    otdRate: 98.4,
    openNcrs: 1,
    milestonesCompleted: 4,
    milestonesTotal: 5,
    status: 'Nominal'
  },
  {
    id: 'prg-2',
    name: 'Project Titan Compute',
    code: 'WO-2025-0089',
    customer: 'Titan Systems',
    site: 'Austin Tech Center',
    yieldRate: 94.2,
    otdRate: 91.0,
    openNcrs: 4,
    milestonesCompleted: 2,
    milestonesTotal: 5,
    status: 'Critical'
  },
  {
    id: 'prg-3',
    name: 'Helios Energy Inverter',
    code: 'WO-2025-0142',
    customer: 'Helios Corp',
    site: 'Stuttgart Fab',
    yieldRate: 97.8,
    otdRate: 96.5,
    openNcrs: 2,
    milestonesCompleted: 3,
    milestonesTotal: 4,
    status: 'Nominal'
  },
  {
    id: 'prg-4',
    name: 'NeuroPulse Medical Sensor',
    code: 'WO-2025-0210',
    customer: 'BioMedix',
    site: 'Penang Cleanroom',
    yieldRate: 96.2,
    otdRate: 93.8,
    openNcrs: 3,
    milestonesCompleted: 5,
    milestonesTotal: 6,
    status: 'Amber Alert'
  },
  {
    id: 'prg-5',
    name: 'Quantum Avionics Gateway',
    code: 'WO-2025-0301',
    customer: 'AeroDynamics',
    site: 'Hyderabad Plant',
    yieldRate: 98.7,
    otdRate: 97.2,
    openNcrs: 1,
    milestonesCompleted: 1,
    milestonesTotal: 3,
    status: 'Nominal'
  },
  {
    id: 'prg-6',
    name: 'Orion Drone ESC',
    code: 'WO-2025-0199',
    customer: 'Vectis Robotics',
    site: 'Austin Tech Center',
    yieldRate: 93.5,
    otdRate: 89.2,
    openNcrs: 3,
    milestonesCompleted: 2,
    milestonesTotal: 4,
    status: 'Critical'
  }
];

export const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'wo-1',
    orderNumber: 'WO-2024-9941',
    partNumber: 'PN-88201-B',
    partName: 'Apex Alpha Mainboard',
    program: 'FactoryIQ Alpha',
    lotSize: 2500,
    completed: 1840,
    scrap: 12,
    lead: 'Alex Mercer',
    priority: 'High',
    status: 'In Production'
  },
  {
    id: 'wo-2',
    orderNumber: 'WO-2024-9942',
    partNumber: 'PN-40192-A',
    partName: 'Titan Server Power Mod',
    program: 'Titan Compute',
    lotSize: 1200,
    completed: 320,
    scrap: 4,
    lead: 'Elena Rostova',
    priority: 'Medium',
    status: 'Queued Next'
  },
  {
    id: 'wo-3',
    orderNumber: 'WO-2024-9938',
    partNumber: 'PN-77301-D',
    partName: 'Avionics Bus Controller',
    program: 'Quantum Avionics',
    lotSize: 600,
    completed: 580,
    scrap: 2,
    lead: 'Chris Morgan',
    priority: 'Urgent',
    status: 'Final Testing'
  },
  {
    id: 'wo-4',
    orderNumber: 'WO-2024-9945',
    partNumber: 'PN-99401-X',
    partName: 'Medical Sensor Flex PCB',
    program: 'NeuroPulse',
    lotSize: 3000,
    completed: 0,
    scrap: 0,
    lead: 'Unassigned',
    priority: 'Normal',
    status: 'Staged'
  },
  {
    id: 'wo-5',
    orderNumber: 'WO-2024-9939',
    partNumber: 'PN-11094-C',
    partName: 'Helios Inverter Control',
    program: 'Helios Energy',
    lotSize: 800,
    completed: 800,
    scrap: 6,
    lead: 'Rajiv Sharma',
    priority: 'High',
    status: 'Completed'
  }
];

export const FLOW_STATIONS: StationTelemetry[] = [
  {
    stnNumber: '01 / STN',
    name: 'Material Kitting',
    metricLabel: 'Buffer',
    metricValue: '450 pcs',
    statusBadge: 'Ready',
    statusType: 'ready',
    icon: 'inventory',
    details: {
      machineModel: 'Automated Carousel Staging AGV-9',
      operator: 'R. Kulkarni',
      cycleTime: '12.4s',
      driftVariance: '±0.0 mm'
    }
  },
  {
    stnNumber: '02 / STN',
    name: 'Pick & Place',
    metricLabel: 'Speed',
    metricValue: '28k CPH',
    statusBadge: '100% Target',
    statusType: 'nominal',
    icon: 'memory',
    details: {
      machineModel: 'Fuji NXT III Flex High-Speed Dual Gantry',
      operator: 'T. Vance',
      cycleTime: '8.2s',
      driftVariance: '±0.008 mm'
    }
  },
  {
    stnNumber: '03 / STN',
    name: 'Reflow Solder',
    metricLabel: 'Zone 4',
    metricValue: '248°C Alert',
    statusBadge: 'Thermal Drift',
    statusType: 'warning',
    icon: 'warning',
    details: {
      machineModel: 'Heller 1913 MK5 Nitrogen 13-Zone Oven',
      operator: 'D. Vance (Lead)',
      cycleTime: '42.0s',
      temperatureZone: 'Zone 4: 248°C (Max target: 244.5°C)',
      driftVariance: '+3.5°C Excursion'
    }
  },
  {
    stnNumber: '04 / STN',
    name: 'AOI Vision',
    metricLabel: 'False Calls',
    metricValue: '0.12%',
    statusBadge: 'Passing',
    statusType: 'nominal',
    icon: 'visibility',
    details: {
      machineModel: 'Koh Young Zenith 3D AOI Inspection System',
      operator: 'Automated Bot IQ-Scan',
      cycleTime: '11.8s',
      driftVariance: '0.00 ppm drift'
    }
  },
  {
    stnNumber: '05 / STN',
    name: '3D X-Ray (AXI)',
    metricLabel: 'Queue',
    metricValue: '28 units (4.2m)',
    statusBadge: 'Bottleneck',
    statusType: 'bottleneck',
    icon: 'report',
    details: {
      machineModel: 'Nordson Dage Quadra 7 High-Res Computed Tomography',
      operator: 'M. Chen',
      cycleTime: '36.5s',
      driftVariance: 'Queue wait: 4.2m (Threshold 2.5m)'
    }
  },
  {
    stnNumber: '06 / STN',
    name: 'Mechanical Build',
    metricLabel: 'Status',
    metricValue: 'Balanced',
    statusBadge: 'Optimal',
    statusType: 'nominal',
    icon: 'build',
    details: {
      machineModel: 'Robotic Screw Driver & Laser Alignment Cell',
      operator: 'S. Al-Mansoor',
      cycleTime: '24.1s',
      driftVariance: 'Torque: 0.85 Nm ±0.02'
    }
  },
  {
    stnNumber: '07 / STN',
    name: 'Functional Test',
    metricLabel: 'Pass Rate',
    metricValue: '99.1%',
    statusBadge: 'Ready',
    statusType: 'ready',
    icon: 'task_alt',
    details: {
      machineModel: 'Keysight i3070 Series 5 In-Circuit Tester',
      operator: 'A. Mercer',
      cycleTime: '18.3s',
      driftVariance: '0.9% Fail (Recoverable)'
    }
  }
];

export const INITIAL_NCRS: NcrItem[] = [
  {
    id: 'NCR-2024-1142',
    program: 'Apex Alpha (MB-v3.2)',
    part: 'Apex Alpha Mainboard',
    station: 'Reflow Zone 3',
    severity: 'Critical',
    defectDescription: 'Solder bridging on BGA pin pitch 0.4mm',
    lotRange: 'Lot #8831 through #8835 affected',
    stage8D: 'D5: Permanent CA',
    stageNumber: 5,
    lead: 'M. Chen (Sr. QA)',
    leadInitials: 'MC',
    slaDaysRemaining: '2 days left',
    status: 'Under Review'
  },
  {
    id: 'NCR-2024-1138',
    program: 'Titan Compute (TC-800)',
    part: 'Titan Server Power Mod',
    station: 'SMT Line 1 (Feeder 14)',
    severity: 'Major',
    defectDescription: 'Capacitor C104 tombstoning on feeder nozzle #4',
    lotRange: 'Nozzle vacuum micro-drop recorded',
    stage8D: 'D7: Prev Action',
    stageNumber: 7,
    lead: 'R. Patel',
    leadInitials: 'RP',
    slaDaysRemaining: 'On Track (6d)',
    status: 'In Progress'
  },
  {
    id: 'NCR-2024-1129',
    program: 'Helios Inverter (HI-Solar)',
    part: 'Helios Inverter Control',
    station: 'Assembly Cell B',
    severity: 'Minor',
    defectDescription: 'Screw torque variance ±0.15 Nm on chassis anchor',
    lotRange: 'Driver re-calibrated at shift change',
    stage8D: 'D8: Sign-off',
    stageNumber: 8,
    lead: 'K. Larson',
    leadInitials: 'KL',
    slaDaysRemaining: 'Completed',
    status: 'Closed'
  },
  {
    id: 'NCR-2024-1124',
    program: 'Apex Alpha (MB-v3.1)',
    part: 'Apex Alpha v3.1 Sub-board',
    station: 'FCT Test Station 2',
    severity: 'Major',
    defectDescription: '3.3V rail voltage ripple exceeded 45mV threshold',
    lotRange: 'Capacitor ESR batch inconsistency verified',
    stage8D: 'D8: Sign-off',
    stageNumber: 8,
    lead: 'J. Walsh',
    leadInitials: 'JW',
    slaDaysRemaining: 'Completed',
    status: 'Closed'
  }
];

export const GATE_STAGES: GateStage[] = [
  {
    gateNumber: 'GATE 01',
    title: 'Concept Validation',
    subtitle: 'Feasibility & DFM Review',
    status: 'PASSED',
    percentComplete: 100,
    detail: 'Completed Q4 2024'
  },
  {
    gateNumber: 'GATE 02',
    title: 'EVT Prototype',
    subtitle: 'Engineering Validation Test',
    status: 'PASSED',
    percentComplete: 100,
    detail: 'Completed Q1 2025'
  },
  {
    gateNumber: 'GATE 03',
    title: 'DVT Certification',
    subtitle: 'Design Verification Testing',
    status: 'PASSED',
    percentComplete: 100,
    detail: 'Completed Q2 2025'
  },
  {
    gateNumber: 'GATE 04 (CURRENT)',
    title: 'PVT Validation',
    subtitle: 'Pilot Run Target: Aug 15',
    status: 'IN PROGRESS',
    percentComplete: 78,
    detail: 'Batch #5 Running'
  },
  {
    gateNumber: 'GATE 05',
    title: 'Mass Production Ramp',
    subtitle: 'Full Capacity Target: Q4',
    status: 'SCHEDULED',
    percentComplete: 0,
    detail: 'Scheduled Oct 2025'
  }
];

export const INITIAL_ECOS: EcoItem[] = [
  {
    id: 'ECO-2024-089',
    status: 'Approved / In Validation',
    effective: 'Effective: Batch #5 (Aug 04)',
    title: 'Micro-controller firmware revision v2.1.4 rollout',
    description: 'Updates CAN-bus baud rate tolerance and thermal compensation logic in cold-start cycles. Verified on 200 bench test units.',
    owner: 'K. Chen (Lead Firmware Eng)',
    validationStatus: '98/100 PVT Flash Tests Passed'
  },
  {
    id: 'ECO-2024-072',
    status: 'Pending QA Sign-off',
    effective: 'Raised: 4 days ago',
    title: 'Component alternate qualification for C0805 10uF ceramic capacitor',
    description: 'Adds Murata GCM series as secondary multi-source supply to mitigate supply chain lead-time risks for Q4 mass ramp.',
    owner: 'M. Ramirez (Sourcing & Reliability)',
    validationStatus: 'Under Apex QA Review'
  }
];

export const CONTROLLED_DOCS: ControlledDoc[] = [
  {
    id: 'doc-1',
    name: 'PPAP Level 3 Submission Package',
    type: 'PDF',
    size: '14.8 MB',
    meta: 'Signed by Apex QA',
    icon: 'picture_as_pdf',
    color: 'text-primary'
  },
  {
    id: 'doc-2',
    name: 'Control Plan & Process FMEA Rev 4.2',
    type: 'XLSX',
    size: '4.2 MB',
    meta: 'Updated 3d ago',
    icon: 'table_chart',
    color: 'text-tertiary'
  },
  {
    id: 'doc-3',
    name: 'Work Instructions WI-HYD-402',
    type: 'DOCX',
    size: '1.8 MB',
    meta: 'Current Operator SOP',
    icon: 'menu_book',
    color: 'text-secondary'
  }
];

export const ACTIVITY_FEED: ActivityFeedItem[] = [
  {
    id: 'act-1',
    title: 'PVT Batch #4 Yield Report Signed',
    description: 'Sarah Johnson approved yield sign-off with zero critical excursions.',
    time: '2 hours ago • Shift 1 Day',
    type: 'approved'
  },
  {
    id: 'act-2',
    title: 'Automated AOI Calibration Passed',
    description: 'Line AOI-04 optical laser drift test registered nominal zero variance.',
    time: '5 hours ago • Automated Bot IQ-Scan',
    type: 'calibration'
  },
  {
    id: 'act-3',
    title: 'Apex Bi-Weekly Program Review Scheduled',
    description: 'Technical Liaison Marcus Vance confirmed Gate 4 final gate readiness sync.',
    time: 'Yesterday at 16:30 UTC',
    type: 'meeting'
  }
];
