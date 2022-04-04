import { AppThunk } from 'RootTypes';
import { ContractBasicInformation } from '../contracts/types';
import {
  NotifyPersonResponse,
  PersonnelAssignment,
  Plan,
  PlanAssociatedInformation,
  PlanBasicInformation,
  SamplePlanRequest
} from './types';
import {
  addDisabledBranchIds,
  addPlan,
  addPlans,
  removeNotifyPersonsSection,
  removePersonnelAssignmentSection,
  removePlan,
  setInitialPlanForm,
  setPlanSampleTaskDates,
  setSelectableBranchIds,
  updateInitialNotifyPersonIds,
  updateInitialPersonnelAssignment,
  updateNotifyPersonIdsOfPlan,
  updatePersonnelAssignmnetOfPlan
} from './slice';
import { apiCaller } from 'store/common';
import { formatISO } from 'date-fns';
import { getAssetPlans } from 'store/slices/asset/detail/actions';
import { isArrayNullOrEmpty } from 'utils';
import { samplePlanCount } from './data';
import { selectAllBranches } from '../branches';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectContractById } from '../contracts/selectors';
import { selectPlanById, selectPlanDraft } from './selectors';
import { selectSelectedPlanId } from 'store/slices/contractplans/wizard/slice';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showSaveSuccessSnackbar,
  showUpdateSuccessSnackbar
} from '../application';
import axios from 'utils/axiosUtils';
import makePlanInformationValidator from 'helpers/validations/PlanInformationValidator';

export const getAllPlanBasics = (): AppThunk => async (dispatch) => {
  const requestBuilder = () => axios.get<Plan[]>('registration/plans/basics');
  const plans = await dispatch(apiCaller(requestBuilder));

  dispatch(addPlans(plans));
};

export const checkPlanExistsFromStore =
  (): AppThunk<Promise<boolean>> => async (dispatch, getState) => {
    const draftPlan = selectPlanDraft(getState());

    return !!draftPlan.id;
  };

export const getPlanBasicInformation =
  (id: string): AppThunk<Promise<Plan>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Plan>(`registration/plans/${id}/basics`);

    const finalPlan = await dispatch(apiCaller(requestBuilder));
    dispatch(addPlan(finalPlan));
    dispatch(setInitialPlanForm(finalPlan));
    return finalPlan;
  };

export const createPlanBasicInformation =
  (): AppThunk<Promise<Plan>> => async (dispatch, getState) => {
    const plan = getState().plans.draftPlan;
    const basicInfo: PlanBasicInformation = {
      branchIds: plan.branchIds,
      contractId: plan.contractId,
      days: plan.days,
      endDate: plan.endDate,
      frequency: plan.frequency,
      mainCategoryId: plan.mainCategoryId,
      notes: plan.notes,
      period: plan.period,
      startDate: plan.startDate,
      title: plan.title,
      type: plan.type
    };

    const requestBuilder = () => axios.post<Plan>('registration/plans/basics', basicInfo);

    const finalPlan = await dispatch(apiCaller(requestBuilder));
    dispatch(addPlan(finalPlan));
    dispatch(setInitialPlanForm(finalPlan));
    dispatch(showAddSuccessSnackbar());

    return finalPlan;
  };

export const updatePlanBasicInformation =
  (): AppThunk<Promise<Plan>> => async (dispatch, getState) => {
    const plan = getState().plans.draftPlan;
    const basicInfo: PlanBasicInformation = {
      branchIds: plan.branchIds,
      contractId: plan.contractId,
      days: plan.days,
      endDate: plan.endDate,
      frequency: plan.frequency,
      id: plan.id,
      mainCategoryId: plan.mainCategoryId,
      notes: plan.notes,
      period: plan.period,
      startDate: plan.startDate,
      title: plan.title,
      type: plan.type
    };

    const requestBuilder = () => axios.put<Plan>(`registration/plans/${plan.id}/basics`, basicInfo);
    const finalPlan = await dispatch(apiCaller(requestBuilder));
    dispatch(addPlan(finalPlan));
    dispatch(setInitialPlanForm(finalPlan));
    dispatch(showSaveSuccessSnackbar());

    return finalPlan;
  };

export const validateBasicPlanInformation = (
  planInfo: PlanBasicInformation,
  contractInfo: ContractBasicInformation
): boolean => {
  const errors = makePlanInformationValidator(contractInfo)(planInfo);
  const anyInvalid = Object.values(errors).some((error) => error !== undefined);
  return !anyInvalid;
};

export const getSamplePlanDates =
  (samplePlanRequest: SamplePlanRequest): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    let requestUrl = 'registration/plans/task-samples?';

    requestUrl += `period=${samplePlanRequest?.period ?? ''}&`;
    requestUrl += `startDate=${
      samplePlanRequest?.startDate
        ? // +03:00 should be encoded
          encodeURIComponent(formatISO(new Date(samplePlanRequest?.startDate)))
        : ''
    }&`;
    requestUrl += `endDate=${
      samplePlanRequest?.endDate
        ? // +03:00 should be encoded
          encodeURIComponent(formatISO(new Date(samplePlanRequest?.endDate)))
        : ''
    }&`;
    if (samplePlanRequest.period === 'weekly' || samplePlanRequest.period === 'daily') {
      requestUrl += `frequency=${samplePlanRequest?.frequency ?? ''}&`;
    }

    if (samplePlanRequest.days) {
      samplePlanRequest.days.forEach((day) => {
        requestUrl += `days=${day}&`;
      });
    }

    requestUrl += `sampleCount=${samplePlanCount}`;

    const requestBuilder = () => axios.get<string[]>(requestUrl);
    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(setPlanSampleTaskDates(data));

    return data;
  };

export const getNotifyPersonIds =
  (id: string): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<string[]>(`registration/plans/${id}/personnel-to-be-notified`);

    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(updateInitialNotifyPersonIds(data));
    dispatch(updateNotifyPersonIdsOfPlan({ personIds: data, planId: id }));

    return data;
  };

export const saveNotifyPersonIds =
  (planId: string, personIds: string[]): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    let finalData: string[] = [];

    if (isArrayNullOrEmpty(personIds)) {
      await dispatch(deleteNotifyPersonIds(planId));
    } else {
      finalData = await dispatch(updateNotifyPersonIds(planId, personIds));
    }

    return finalData;
  };

const updateNotifyPersonIds =
  (planId: string, personIds: string[]): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const request: NotifyPersonResponse = {
      notifiedPersonnelIds: personIds
    };
    const requestBuilder = () =>
      axios.put<string[]>(`registration/plans/${planId}/personnel-to-be-notified`, request);

    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(updateInitialNotifyPersonIds(data));
    dispatch(updateNotifyPersonIdsOfPlan({ personIds: data, planId }));

    dispatch(showUpdateSuccessSnackbar());

    return data;
  };

const deleteNotifyPersonIds =
  (planId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<string[]>(`registration/plans/${planId}/personnel-to-be-notified`);

    await dispatch(apiCaller(requestBuilder));
    dispatch(removeNotifyPersonsSection());
    dispatch(updateNotifyPersonIdsOfPlan({ personIds: [], planId }));

    dispatch(showDeleteSuccessSnackbar());
  };

export const getPersonnelAssignment =
  (planId: string, updateDraft: boolean = false): AppThunk<Promise<PersonnelAssignment>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PersonnelAssignment>(`registration/plans/${planId}/assignment`);

    const data = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    dispatch(updatePersonnelAssignmnetOfPlan({ personelAssignment: data, planId }));
    if (updateDraft) {
      dispatch(updateInitialPersonnelAssignment(data));
    }

    return data;
  };

export const savePersonnelAssignments =
  (planId: string, assignment: PersonnelAssignment): AppThunk<Promise<PersonnelAssignment>> =>
  async (dispatch) => {
    let finalAssignment: PersonnelAssignment = null;

    if (!assignment.responsiblePersonnelId && assignment.assistantPersonnelIds.length === 0) {
      await dispatch(deletePersonnelAssignments(planId));
    } else {
      finalAssignment = await dispatch(updatePersonnelAssignments(planId, assignment));
    }

    return finalAssignment;
  };

const updatePersonnelAssignments =
  (planId: string, assignment: PersonnelAssignment): AppThunk<Promise<PersonnelAssignment>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<PersonnelAssignment>(`registration/plans/${planId}/assignment`, assignment);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(updateInitialPersonnelAssignment(data));
    dispatch(updatePersonnelAssignmnetOfPlan({ personelAssignment: data, planId }));

    dispatch(showUpdateSuccessSnackbar());

    return data;
  };

const deletePersonnelAssignments =
  (planId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete(`registration/plans/${planId}/assignment`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removePersonnelAssignmentSection());
    dispatch(
      updatePersonnelAssignmnetOfPlan({
        personelAssignment: { assistantPersonnelIds: [] },
        planId
      })
    );

    dispatch(showDeleteSuccessSnackbar());
  };

export const getDisabledBranchIds =
  (): AppThunk<Promise<string[]>> => async (dispatch, getState) => {
    const state = getState();
    const plan = selectPlanDraft(state);
    let disabledBranchIds: string[] = [];

    if (plan.id) {
      const requestBuilder = () =>
        axios.get<string[]>(`registration/plans/${plan.id}/asset/branches`);

      disabledBranchIds = await dispatch(apiCaller(requestBuilder));
      dispatch(addDisabledBranchIds(disabledBranchIds));
    }

    return disabledBranchIds;
  };

export const getSelectableBranches = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const plan = selectPlanDraft(state);

  let branchIds: string[] = [];

  if (plan.contractId) {
    const contract = selectContractById(state, plan.contractId);
    branchIds = contract.branchIds;
  } else {
    const branches = selectAllBranches(getState());
    branchIds = branches.map((i) => i.id);
  }

  dispatch(setSelectableBranchIds(branchIds));
};

export const disassociatePlan =
  (planId?: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const selectedPlanId = planId ?? selectSelectedPlanId(state);
    const assetId = selectAsset(state).id;

    if (assetId) {
      const requestBuilder = () =>
        axios.put(`registration/assets/${assetId}/disassociate-plan`, { planId: selectedPlanId });
      await dispatch(apiCaller(requestBuilder));
      dispatch(getAssetPlans(assetId));
      dispatch(showUpdateSuccessSnackbar(true));
    }
  };

export const deletePlan =
  (planId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete<Plan>(`registration/plans/${planId}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removePlan(planId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const getPlanAssociatedInformation =
  (id: string): AppThunk<Promise<PlanAssociatedInformation>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PlanAssociatedInformation>(`registration/plans/${id}/asset/count`);
    const associatedInformation = await dispatch(apiCaller(requestBuilder));

    return associatedInformation;
  };

export const initializePlanModal =
  (planId: string): AppThunk =>
  async (dispatch, getState) => {
    const contract = selectPlanById(getState(), planId);

    const finalPlan = contract ?? { id: planId };
    dispatch(setInitialPlanForm({ ...finalPlan }));
  };
