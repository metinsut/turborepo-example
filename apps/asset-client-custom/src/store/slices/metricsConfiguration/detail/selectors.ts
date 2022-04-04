import { RootState } from 'RootTypes';
import { WorkType } from 'store/slices/common/types';
import { createDequalSelector } from 'store/common';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';
import createCachedSelector from 're-reselect';

export const selectDraftMetric = (state: RootState) => state.metricsConfiguration.detail.draft;
export const selectInitialDraftMetric = (state: RootState) =>
  state.metricsConfiguration.detail.initial;
export const selectMetricMainCategoryId = (state: RootState) =>
  state.metricsConfiguration.detail.draft.mainCategoryId;
export const selectDraftTimeTolerance = (state: RootState) =>
  state.metricsConfiguration.detail.draft.timeTolerance;
export const selectDraftAllDay = (state: RootState) =>
  state.metricsConfiguration.detail.draft.allDay;
export const selectDraftHolidaysIncluded = (state: RootState) =>
  state.metricsConfiguration.detail.draft.holidaysIncluded;
export const selectDraftDays = (state: RootState) => state.metricsConfiguration.detail.draft.days;
export const selectDraftValidStartTime = (state: RootState) =>
  state.metricsConfiguration.detail.draft.validStartTime;
export const selectDraftValidEndTime = (state: RootState) =>
  state.metricsConfiguration.detail.draft.validEndTime;
export const selectDraftGoalForm = (state: RootState) =>
  state.metricsConfiguration.detail.draft.goalForm;
export const selectDraftDowntimeRules = (state: RootState) =>
  state.metricsConfiguration.detail.draft.downtimeRules;
export const selectAvailableStatuses = (state: RootState, workType: WorkType) => {
  const { availableStatuses } = state.metricsConfiguration.detail;
  return availableStatuses ? availableStatuses[workType] : null;
};

export const selectAllGoalCategoryIds = createSelector(selectDraftGoalForm, (goalForm) =>
  goalForm[goalForm.type].flatMap((i) => i.categoryIds ?? [])
);

export const selectGoalCategoriesByIndex = createSelector(
  selectDraftGoalForm,
  (state: RootState, index: number) => index,
  (goalForm, index) => goalForm[goalForm.type][index]?.categoryIds ?? []
);

export const selectOtherGoalCategoryIds = createCachedSelector(
  selectAllGoalCategoryIds,
  selectGoalCategoriesByIndex,
  (allGoalCategories, goalCategories) => _.difference(allGoalCategories, goalCategories)
)({
  keySelector: (state, index) => index,
  selectorCreator: createDequalSelector
});
