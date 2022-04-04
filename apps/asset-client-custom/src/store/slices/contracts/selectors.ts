import { Contract, ContractBasicInformation } from './types';
import { RootState } from 'RootTypes';
import { WorkType } from '../common/types';
import { contractsAdapter } from './slice';
import { createCachedSelector } from 're-reselect';
import { createDequalSelector } from 'store/common';
import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

export const {
  selectAll: selectAllContracts,
  selectById: selectContractById,
  selectIds: selectAllContractIds,
  selectEntities
} = contractsAdapter.getSelectors<RootState>((state) => state.contracts);

export const selectCost = (state: RootState) => state.contracts.draftContract.cost;

export const selectCostForm = (state: RootState) => state.contracts.draftContract.costForm;
export const selectCostFormForEachCategory = (state: RootState) =>
  state.contracts.draftContract.costForm.category;
export const selectInitialCostForm = (state: RootState) =>
  state.contracts.initialDraftContract.costForm;

export const selectContractBranchIds = (state: RootState) =>
  state.contracts.draftContract.branchIds;

const selectSelectableBranchIds = (state: RootState) => state.contracts.selectableBranchIds;

export const selectSelectableBranches = createSelector(
  (state: RootState) => state,
  selectSelectableBranchIds,
  (state, branchIds) => branchIds.map((branchId) => state.branches.entities[branchId])
);

export const selectDisabledBranchIds = (state: RootState) => state.contracts.disabledBranchIds;

export const selectContractMainCategoryId = (state: RootState) =>
  state.contracts.draftContract.mainCategoryId;

export const selectAvailableStatuses = (state: RootState, workType: WorkType) => {
  const { availableStatuses } = state.contracts.draftContract.metrics;
  return availableStatuses ? availableStatuses[workType] : null;
};

export const selectContract = (state: RootState) => state.contracts.draftContract;

export const selectInitialContract = (state: RootState) => state.contracts.initialDraftContract;

export const selectCostCategoryIds = createCachedSelector(
  selectCostFormForEachCategory,
  (state: RootState, index: number) => index,
  (costFormForEachCategory, index) => costFormForEachCategory.details[index].categoryIds
)((state, index) => index);

export const selectAllCostCategoryIds = createSelector(
  selectCostFormForEachCategory,
  (costFormForEachCategory) => costFormForEachCategory.details.flatMap((i) => i.categoryIds)
);

export const selectOtherCostsCategoryIds = createCachedSelector(
  selectAllCostCategoryIds,
  selectCostCategoryIds,
  (allCostCategoryIds, selectedCostsCategoryIds) =>
    _.difference(allCostCategoryIds, selectedCostsCategoryIds)
)({
  keySelector: (state, costId) => costId,
  selectorCreator: createDequalSelector
});

export const selectSelectedMetricType = (state: RootState) =>
  state.contracts.draftContract.metrics.selectedMetricType;

export const selectSelectedMetric = (state: RootState) =>
  state.contracts.draftContract.metrics[
    state.contracts.draftContract.metrics.selectedMetricType.id
  ];

export const selectGoalCategoriesByIndex = createSelector(
  selectSelectedMetric,
  (state: RootState, index: number) => index,
  (metric, index) => metric.goalForm[metric.goalForm.type][index]?.categoryIds ?? []
);

export const selectAllGoalCategoryIds = createSelector(selectSelectedMetric, (metric) =>
  metric.goalForm[metric.goalForm.type].flatMap((i) => i.categoryIds ?? [])
);

export const selectOtherGoalCategoryIds = createCachedSelector(
  selectAllGoalCategoryIds,
  selectGoalCategoriesByIndex,
  (allGoalCategories, goalCategories) => _.difference(allGoalCategories, goalCategories)
)({
  keySelector: (state, index) => index,
  selectorCreator: createDequalSelector
});

export const selectFirm = (state: RootState) => state.contracts.draftContract.firm;
export const selectInitialFirm = (state: RootState) => state.contracts.initialDraftContract.firm;

export const selectContractBasicInformation = (state: RootState) =>
  convertContractIntoBasicInformation(state.contracts.draftContract);

export const selectInitialContractBasicInformation = (state: RootState) =>
  convertContractIntoBasicInformation(state.contracts.initialDraftContract);

const convertContractIntoBasicInformation = (contract: Contract) => {
  const contractBasicInformation: ContractBasicInformation = {
    branchIds: contract.branchIds,
    endDate: contract.endDate,
    id: contract.id,
    mainCategoryId: contract.mainCategoryId,
    notes: contract.notes,
    startDate: contract.startDate,
    title: contract.title,
    type: contract.type
  };
  return contractBasicInformation;
};

export const selectPartsPolicy = (state: RootState) => state.contracts.draftContract.partsPolicy;
export const selectInitialPartsPolicy = (state: RootState) =>
  state.contracts.initialDraftContract.partsPolicy;

export const selectAvailableMetricTypes = (state: RootState) =>
  state.contracts.availableMetricTypes;

export const selectMetric = (state: RootState, metricTypeId: string) =>
  state.contracts.draftContract.metrics[metricTypeId];

export const selectInitialMetric = (state: RootState, metricTypeId: string) =>
  state.contracts.initialDraftContract.metrics[metricTypeId];
