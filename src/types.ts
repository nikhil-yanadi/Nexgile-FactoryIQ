export type NavView = 
  | 'executive-dashboard'
  | 'program-deep-dive'
  | 'quality-intelligence'
  | 'shopfloor-work-order';

export interface AlertItem {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  facility: string;
  actions: string[];
}

export interface ProgramHealth {
  id: string;
  name: string;
  code: string;
  customer: string;
  site: string;
  yieldRate: number;
  otdRate: number;
  openNcrs: number;
  milestonesCompleted: number;
  milestonesTotal: number;
  status: 'Nominal' | 'Critical' | 'Amber Alert';
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  partNumber: string;
  partName: string;
  program: string;
  lotSize: number;
  completed: number;
  scrap: number;
  lead: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Normal';
  status: 'In Production' | 'Queued Next' | 'Final Testing' | 'Staged' | 'Completed';
}

export interface StationTelemetry {
  stnNumber: string;
  name: string;
  metricLabel: string;
  metricValue: string;
  statusBadge: string;
  statusType: 'nominal' | 'warning' | 'bottleneck' | 'ready';
  icon: string;
  queue?: string;
  temp?: string;
  cph?: string;
  details?: {
    machineModel: string;
    operator: string;
    cycleTime: string;
    temperatureZone?: string;
    driftVariance?: string;
  };
}

export interface NcrItem {
  id: string;
  program: string;
  part: string;
  station: string;
  severity: 'Critical' | 'Major' | 'Minor';
  defectDescription: string;
  lotRange: string;
  stage8D: string;
  stageNumber: number; // 1 to 8
  lead: string;
  leadInitials: string;
  slaDaysRemaining: string;
  status: 'Under Review' | 'In Progress' | 'Closed';
}

export interface GateStage {
  gateNumber: string;
  title: string;
  subtitle: string;
  status: 'PASSED' | 'IN PROGRESS' | 'SCHEDULED';
  percentComplete: number;
  detail: string;
}

export interface EcoItem {
  id: string;
  status: 'Approved / In Validation' | 'Pending QA Sign-off' | 'Draft';
  effective: string;
  title: string;
  description: string;
  owner: string;
  validationStatus: string;
}

export interface ControlledDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  meta: string;
  icon: string;
  color: string;
}

export interface ActivityFeedItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'approved' | 'calibration' | 'meeting' | 'alert';
}
