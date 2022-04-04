import { Day } from 'store/common';
import { MetricStatus, WorkType } from '../common/types';

export interface Contract extends ContractBasicInformation {
  metrics?: {
    [typeId: string]: Metric;
    selectedMetricType?: MetricType;
    availableStatuses?: {
      [key: string]: MetricStatus[];
    };
  };
  cost?: Cost;
  costForm?: CostForm;
  firm?: Firm;
  partsPolicy?: PartsPolicy;
  file?: File;
}

export interface ContractBasicInformation {
  branchIds?: string[];
  type?: ContractType;
  id?: string;
  mainCategoryId?: string;
  notes?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
}

export interface ContractDefinition {
  id?: string;
  contractType?: ContractType;
  properties?: {
    [name: string]: ContractProperty;
  };
}

export interface ContractProperty {
  availableParameters?: string[];
  isVisible?: boolean;
}

export interface CostWithCategories {
  id: string;
  categories: string[];
  costAmount?: number;
}

export type CostType = 'none' | 'total' | 'annual' | 'category';

export interface Cost {
  type: CostType;
  details: CostDetail[];
  valid: boolean;
}

export interface CostDetail {
  amount: number;
  categoryIds: string[];
}

export type CostForm = Record<CostType, Cost> & {
  type: CostType;
};

export type ContractType = 'warranty' | 'lease' | 'maintenance' | 'calibration' | 'none';

export interface Firm {
  email?: string;
  firmName?: string;
  contactPerson?: string;
  phone?: string;
}

export type PartsPolicyType =
  | 'allParts'
  | 'somePartsIncluded'
  | 'somePartsNotIncluded'
  | 'partsNotIncluded'
  | 'none';

export interface PartsPolicy {
  partPolicyType?: PartsPolicyType;
  partList?: string[];
}

export interface MetricDefinition {
  id?: string;
  metricType?: MetricType;
  properties?: {
    [name: string]: MetricProperty;
  };
}

export interface MetricType {
  id?: string;
  name?: 'Updown' | 'Response' | 'Repair' | 'Part Supply' | string;
  isMetricExist?: boolean;
  isDefault?: boolean;
}

export interface MetricProperty {
  availableParameters?: string[];
  isVisible?: boolean;
}

export interface Metric {
  id?: string;
  metricType?: MetricType;
  validStartTime?: string;
  validEndTime?: string;
  holidaysIncluded?: boolean;
  timeTolerance?: number;
  days?: Day[];
  goals?: Goal[];
  goalForm?: GoalForm;
  downtimeRules?: DowntimeRule[];
  allDay?: boolean;
}

export interface Goal {
  categoryIds?: string[];
  categoryGroupNo?: number;
  limitType?: GoalLimitType;
  limitTimeValue?: number;
  limitTimeType?: TimeType;
  limitPercentageValue?: number;
}

export type GoalForm = Record<GoalLimitType, Goal[]> & {
  type: GoalLimitType;
};

export type GoalLimitType = 'timeBased' | 'percentage';
export type TimeType = 'minutes' | 'hours' | 'workday' | 'anyday';

export interface DowntimeRule {
  workType?: WorkType;
  usability?: Usability;
  delayTolerance?: DelayTolerance;
  delayToleranceTimeValue?: number;
  delayToleranceTimeType?: TimeType;
  statusIds: string[];
  defaultStatusKeys?: StatusKey[];
  isDefaultStatusSet?: boolean;
}

export type Usability = 'usable' | 'notUsable';
export type DelayTolerance = 'noTolerance' | 'annualTask' | 'everyTask';

export interface GoalType {
  description: string;
  type: 'timeBased' | 'percentageBased' | 'none';
}

export type StatusKey =
  | 'closed'
  | 'paused'
  | 'inProgress'
  | 'external-intervention'
  | 'have-maintenance-document'
  | 'internal-intervention'
  | 'have-not-calibration-document-yet'
  | 'wrong-request'
  | 'waiting-for-service'
  | 'repaired-successfully'
  | 'failed-open-retirement-request'
  | 'other'
  | 'open-another-breakdown-request'
  | 'waiting-for-parts'
  | 'have-not-maintenance-document-yet'
  | 'have-calibration-document'
  | 'waiting-for-confirmation'
  | 'open';

export interface ContractAssociatedInformation {
  assetCount?: number;
  planCount?: number;
}

export type ContractStateShape = {
  availableMetricTypes: MetricType[];
  disabledBranchIds: string[];
  draftContract: Contract;
  initialDraftContract: Contract;
  selectableBranchIds: string[];
};
