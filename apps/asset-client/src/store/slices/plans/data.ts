import { Plan, PlanPeriodType, PlanStateShape, PlanType } from './types';

export const planTypes: PlanType[] = ['maintenance', 'calibration'];

export const planPeriodTypes: PlanPeriodType[] = [
  'daily',
  'weekly',
  'everyMonth',
  'every3Month',
  'every6Month',
  'everyYear',
  'every2Year'
];

export const weeklyPeriods: number[] = [1, 2, 3];
export const dailyPeriods: number[] = [1, 2, 3, 4, 5, 6];

export const samplePlanCount: number = 5;

export const draftPlan: Plan = {
  branchIds: [],
  id: '',
  notes: '',
  personnelAssignment: {
    assistantPersonnelIds: [],
    responsiblePersonnelId: undefined
  },
  title: '',
  type: 'maintenance'
};

export const initialState: PlanStateShape = {
  disabledBranchIds: [],
  draftPlan,
  initialDraftPlan: draftPlan,
  sampleTaskDates: [],
  selectableBranchIds: [],
  selectedPlanId: undefined
};
