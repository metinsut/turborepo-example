import {
  DowntimeRule,
  Goal,
  GoalForm,
  GoalLimitType,
  Metric,
  MetricDetailState,
  TimeType
} from './type';
import { WorkType } from 'store/slices/common/types';

export const initialDetail: Metric = {};

export const initialState: MetricDetailState = {
  draft: initialDetail,
  initial: initialDetail
};

export const limitTypes: GoalLimitType[] = ['timeBased', 'percentage', 'none'];
export const timeTypes: TimeType[] = ['minutes', 'hours', 'workday', 'anyday'];

export const initialMetricGoal: Goal = {
  categoryIds: []
};

const defaultPercentageGoal: Goal = {
  ...initialMetricGoal,
  limitPercentageValue: 95,
  limitType: 'percentage'
};

const defaultTimeBasedGoal: Goal = {
  ...initialMetricGoal,
  limitTimeType: 'workday',
  limitTimeValue: 2,
  limitType: 'timeBased'
};

export const defaultGoalForm: GoalForm = {
  none: [
    {
      limitType: 'none'
    }
  ],
  percentage: [{ ...defaultPercentageGoal }],
  timeBased: [{ ...defaultTimeBasedGoal }],
  type: 'timeBased'
};

export const initialDowntimeRule: DowntimeRule = {
  statusIds: [],
  usability: 'usable',
  workType: 'breakdown'
};

export const workTypes: WorkType[] = ['breakdown', 'calibration', 'maintenance', 'retirement'];
