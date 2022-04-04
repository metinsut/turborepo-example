import { Day } from 'store/common';
import { Goal, GoalForm, GoalLimitType, Metric, TimeType, Usability } from './type';
import { MetricStatus, WorkType } from 'store/slices/common/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialDowntimeRule, initialState } from './data';

const detailSlice = createSlice({
  initialState,
  name: 'detail',
  reducers: {
    allDayUpdated: (draft, action: PayloadAction<boolean>) => {
      const isAllDay = action.payload;
      draft.draft.allDay = isAllDay;

      if (isAllDay) {
        delete draft.draft.validEndTime;
        delete draft.draft.validStartTime;
      }
    },
    availableStatusesUpdated: (
      draft,
      action: PayloadAction<{ workType: WorkType; statuses: MetricStatus[] }>
    ) => {
      const { workType, statuses } = action.payload;
      draft.availableStatuses = {
        ...draft.availableStatuses,
        [workType]: statuses
      };
    },
    daysUpdated: (draft, action: PayloadAction<Day>) => {
      const day = action.payload;
      const { days } = draft.draft;
      const index = days.indexOf(day);
      if (index === -1) {
        days.push(day);
      } else {
        days.splice(index, 1);
      }
    },
    downTimeRuleStatusIdsUpdated: (
      draft,
      action: PayloadAction<{ statusesIds: string[]; index: number }>
    ) => {
      const { statusesIds, index } = action.payload;
      draft.draft.downtimeRules[index].statusIds = statusesIds;
    },
    downtimeRuleAdded: (draft) => {
      draft.draft.downtimeRules.push(initialDowntimeRule);
    },
    downtimeRuleRemoved: (draft, action: PayloadAction<number>) => {
      const index = action.payload;
      const { downtimeRules } = draft.draft;
      downtimeRules.splice(index, 1);
    },
    downtimeRuleUsabilityUpdated: (
      draft,
      action: PayloadAction<{ index: number; usability: Usability }>
    ) => {
      const { index, usability } = action.payload;
      const { downtimeRules } = draft.draft;
      downtimeRules[index].usability = usability;
    },
    downtimeRuleWorkTypeUpdated: (
      draft,
      action: PayloadAction<{ index: number; workType: WorkType }>
    ) => {
      const { index, workType } = action.payload;
      const { downtimeRules } = draft.draft;
      const downtimeRule = downtimeRules[index];
      downtimeRule.workType = workType;
      if (workType === 'breakdown') {
        downtimeRule.usability = 'usable';
      } else {
        delete downtimeRule.usability;
      }
    },
    goalAdded: (
      draft,
      action: PayloadAction<{
        limitType: GoalLimitType;
        goal: Goal;
      }>
    ) => {
      const { goal, limitType } = action.payload;
      draft.draft.goalForm[limitType].push(goal);
    },
    goalCategoryUpdated: (
      draft,
      action: PayloadAction<{
        categories: string[];
        index: number;
        limitType: GoalLimitType;
      }>
    ) => {
      const { categories, index, limitType } = action.payload;
      const goals = draft.draft.goalForm[limitType];
      goals[index].categoryIds = categories;
    },
    goalFormCreated: (draft, action: PayloadAction<GoalForm>) => {
      const goalForm = { ...action.payload };
      draft.draft.goalForm = goalForm;
      draft.initial.goalForm = goalForm;
    },
    goalPercentageValueChanged: (
      draft,
      action: PayloadAction<{
        index: number;
        percentageValue: number;
      }>
    ) => {
      const { index, percentageValue } = action.payload;
      const goals = draft.draft.goalForm.percentage;
      goals[index].limitPercentageValue = percentageValue;
    },
    goalRemoved: (
      draft,
      action: PayloadAction<{
        index: number;
        limitType: GoalLimitType;
      }>
    ) => {
      const { index, limitType } = action.payload;
      const goals = draft.draft.goalForm[limitType];
      if (index !== -1) {
        goals.splice(index, 1);
      }
    },
    goalTimeTypeChanged: (
      draft,
      action: PayloadAction<{
        index: number;
        timeType: TimeType;
      }>
    ) => {
      const { index, timeType } = action.payload;
      const goals = draft.draft.goalForm.timeBased;
      goals[index].limitTimeType = timeType;
    },
    goalTimeValueChanged: (
      draft,
      action: PayloadAction<{
        index: number;
        timeValue: number;
      }>
    ) => {
      const { index, timeValue } = action.payload;
      const goals = draft.draft.goalForm.timeBased;
      goals[index].limitTimeValue = timeValue;
    },
    goalTypeChanged: (draft, action: PayloadAction<GoalLimitType>) => {
      draft.draft.goalForm.type = action.payload;
    },
    holidaysIncludedUpdated: (draft, action: PayloadAction<boolean>) => {
      draft.draft.holidaysIncluded = action.payload;
    },
    metricCleared: (draft) => {
      draft.draft = { ...initialState.draft };
      draft.initial = { ...initialState.initial };
      draft.availableStatuses = { ...initialState.availableStatuses };
    },
    metricLoaded: (draft, action: PayloadAction<Metric>) => {
      const metric = { ...action.payload };
      draft.initial = metric;
      draft.draft = metric;
    },
    metricReverted: (draft) => {
      draft.draft = { ...draft.initial };
    },
    timeToleranceUpdated: (draft, action: PayloadAction<number>) => {
      draft.draft.timeTolerance = action.payload;
    },
    validEndTimeUpdated: (draft, action: PayloadAction<string>) => {
      draft.draft.validEndTime = action.payload;
    },
    validStartTimeUpdated: (draft, action: PayloadAction<string>) => {
      draft.draft.validStartTime = action.payload;
    }
  }
});

export const {
  allDayUpdated,
  availableStatusesUpdated,
  daysUpdated,
  downtimeRuleAdded,
  downtimeRuleRemoved,
  downtimeRuleUsabilityUpdated,
  downTimeRuleStatusIdsUpdated,
  downtimeRuleWorkTypeUpdated,
  holidaysIncludedUpdated,
  goalAdded,
  goalRemoved,
  goalTimeTypeChanged,
  goalTypeChanged,
  goalPercentageValueChanged,
  goalTimeValueChanged,
  goalCategoryUpdated,
  goalFormCreated,
  metricCleared,
  metricLoaded,
  metricReverted,
  timeToleranceUpdated,
  validEndTimeUpdated,
  validStartTimeUpdated
} = detailSlice.actions;

export default detailSlice.reducer;
