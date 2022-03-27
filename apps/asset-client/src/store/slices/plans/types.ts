import { Day } from 'store/common';

export interface Plan extends PlanBasicInformation {
  branchIds?: string[];
  contractAssociation?: PlanContractAssociation;
  notifyPersonIds?: string[];
  personnelAssignment?: PersonnelAssignment;
}

export interface PlanBasicInformation {
  id?: string;
  title?: string;
  contractId?: string;
  notes?: string;
  type?: PlanType;
  startDate?: string;
  endDate?: string;
  period?: PlanPeriodType;
  frequency?: number;
  days?: Day[];
  branchIds?: string[];
  mainCategoryId?: string;
}

export interface PersonnelAssignment {
  assistantPersonnelIds?: string[];
  responsiblePersonnelId?: string;
}

export type PlanStateShape = {
  draftPlan: Plan;
  disabledBranchIds: string[];
  initialDraftPlan: Plan;
  sampleTaskDates: string[];
  selectableBranchIds: string[];
  selectedPlanId: string;
};

export type PlanContractAssociation = 'withContract' | 'noContract';
export type PlanType = 'maintenance' | 'calibration' | 'none';

export type PlanPeriodType =
  | 'daily'
  | 'weekly'
  | 'everyMonth'
  | 'every3Month'
  | 'every6Month'
  | 'everyYear'
  | 'every2Year'
  | 'none';

export interface SamplePlanRequest {
  startDate?: string;
  endDate?: string;
  period?: PlanPeriodType;
  frequency?: number;
  days?: Day[];
}

export interface NotifyPersonResponse {
  notifiedPersonnelIds?: string[];
}

export interface PlanAssociatedInformation {
  assetCount?: number;
}
