import { Plan, PlanBasicInformation } from './types';
import { RootState } from 'RootTypes';
import { createSelector } from '@reduxjs/toolkit';
import { plansAdapter } from './slice';
import { selectAsset } from '../asset/detail/selectors';

export const {
  selectAll: selectAllPlans,
  selectById: selectPlanById,
  selectIds: selectAllPlanIds,
  selectEntities
} = plansAdapter.getSelectors<RootState>((state) => state.plans);

export const selectPlanBranchIds = (state: RootState) => state.plans.draftPlan.branchIds;

const selectSelectableBranchIds = (state: RootState) => state.plans.selectableBranchIds;

export const selectSelectableBranches = createSelector(
  (state: RootState) => state,
  selectSelectableBranchIds,
  (state, branchIds) => branchIds.map((branchId) => state.branches.entities[branchId])
);

export const selectDisabledBranchIds = (state: RootState) => state.plans.disabledBranchIds;

export const selectPlanMainCategoryId = (state: RootState) => state.plans.draftPlan.mainCategoryId;

export const selectPlanDraft = (state: RootState) => state.plans.draftPlan;

export const selectInitialPlan = (state: RootState) => state.plans.initialDraftPlan;

export const selectSampleTaskDates = (state: RootState) => state.plans.sampleTaskDates;

export const selectPlanBasicInformation = (state: RootState) =>
  convertPlanIntoBasicInformation(state.plans.draftPlan);

export const selectInitialPlanBasicInformation = (state: RootState) =>
  convertPlanIntoBasicInformation(state.plans.initialDraftPlan);

export const selectNotifyPersonIds = (state: RootState) => state.plans.draftPlan.notifyPersonIds;

export const selectInitialNotifyPersonIds = (state: RootState) =>
  state.plans.initialDraftPlan.notifyPersonIds;

export const selectPersonnelAssignments = (state: RootState) =>
  state.plans.draftPlan.personnelAssignment;

export const selectInitialPersonnelAssignments = (state: RootState) =>
  state.plans.initialDraftPlan.personnelAssignment;

export const selectPersonnelAssignmentsOfPlan = (state: RootState, planId: string) =>
  state.plans.entities[planId].personnelAssignment;

export const selectAssociatedPlansInAssetByContractId = createSelector(
  selectEntities,
  selectAsset,
  (state: RootState, contractId: string) => contractId,
  (allPlans, asset, contractId) => {
    const { planIds } = asset;
    if (!planIds || planIds.length === 0) {
      return [];
    }

    const plans = planIds.map((id: string) => allPlans[id]);
    const associatedPlans = plans.filter((plan) => plan?.contractId === contractId);
    return associatedPlans;
  }
);

export const selectAssociatedPlanIdsByContractId = createSelector(
  selectAllPlans,
  (state: RootState, contractId: string) => contractId,
  (allPlans, contractId) => allPlans.filter((i) => i.contractId === contractId).map((i) => i.id)
);

const convertPlanIntoBasicInformation = (plan: Plan) => {
  const planBasicInformation: PlanBasicInformation = {
    ...plan
  };

  return planBasicInformation;
};
