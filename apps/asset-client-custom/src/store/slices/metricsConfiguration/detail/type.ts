import { Day } from '../../../common/index';
import { MetricStatus, WorkType } from 'store/slices/common/types';
import { MetricType } from '../common/types';
import { Person } from 'store/slices/persons';

export interface MetricDetailState {
  initial: Metric;
  draft: Metric;
  availableStatuses?: {
    [key: string]: MetricStatus[];
  };
}

export interface Metric {
  id?: string;
  mainCategoryId?: string;
  validStartTime?: string;
  validEndTime?: string;
  holidaysIncluded?: boolean;
  timeTolerance?: number;
  days?: Day[];
  goals?: Goal[];
  goalForm?: GoalForm;
  downtimeRules?: DowntimeRule[];
  allDay?: boolean;
  updatedByUser?: Person;
  updatedDate?: string;
}

export interface MetricDefinition {
  id?: string;
  metricType?: MetricType;
  properties?: {
    [name: string]: MetricProperty;
  };
}

export interface MetricProperty {
  availableParameters?: string[];
  isVisible?: boolean;
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

export type GoalLimitType = 'timeBased' | 'percentage' | 'none';
export type TimeType = 'minutes' | 'hours' | 'workday' | 'anyday';

export interface DowntimeRule {
  workType?: WorkType;
  usability?: Usability;
  statusIds: string[];
}

export type Usability = 'usable' | 'notUsable';
export type DelayTolerance = 'noTolerance' | 'annualTask' | 'everyTask';
