import { AppThunk } from 'RootTypes';
import { Category } from '../categories/types';
import {
  Contract,
  ContractAssociatedInformation,
  ContractBasicInformation,
  Cost,
  CostDetail,
  CostType,
  Firm,
  Goal,
  GoalForm,
  GoalLimitType,
  Metric,
  MetricType,
  PartsPolicy,
  StatusKey
} from './types';
import { MetricStatus, WorkType } from '../common/types';
import {
  addDisabledBranchIds,
  addPart,
  contractsSlice,
  removeContract,
  removeCostSection,
  removeFirmsSection,
  removeMetric,
  removePartsSection,
  setInitialContractForm,
  setInitialMetricForm,
  setSelectableBranchIds,
  updateAvailableStatuses,
  updateContractMetricExist,
  updateContractMetricTypes,
  updateDowntimeRuleDefaultStatusSet,
  updateDowntimeRuleSelectedStatusIds,
  updateInitialDraftCost,
  updateInitialDraftFirm,
  updateInitialDraftPartsPolicy,
  updateMetricOfContract
} from './slice';
import { apiCaller } from 'store/common';
import { defaultGoalForm, getDraftMetric, initialDowntimeRule, limitTypes } from './data';
import { getAssetContracts, getAssetPlans } from 'store/slices/asset/detail/actions';
import { getMultipleCategoriesWithParentsByIds } from '../categories/actions';
import { isObjectNullOrEmpty } from 'utils';
import { removePlans } from '../plans/slice';
import { selectAllBranches } from '../branches';
import {
  selectAllContractIds,
  selectContract,
  selectContractById,
  selectCostForm
} from './selectors';
import { selectAsset } from 'store/slices/asset/detail/selectors';
import { selectAssociatedPlanIdsByContractId } from '../plans/selectors';
import { selectSelectedContractId } from 'store/slices/contractplans/wizard/slice';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from '../application';
import axios from 'utils/axiosUtils';
import saveAs from 'file-saver';

export const getContractBasicInformation =
  (id: string): AppThunk<Promise<Contract>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Contract>(`registration/contracts/${id}/basics`);
    const finalContract = await dispatch(apiCaller(requestBuilder));
    dispatch(contractsSlice.actions.addContract(finalContract));
    dispatch(contractsSlice.actions.setInitialContractForm(finalContract));
    return finalContract;
  };

export const createContractBasicInformation =
  (): AppThunk<Promise<Contract>> => async (dispatch, getState) => {
    const contract = getState().contracts.draftContract;
    const basicInformation: ContractBasicInformation = {
      branchIds: contract.branchIds,
      endDate: contract.endDate,
      mainCategoryId: contract.mainCategoryId,
      notes: contract.notes,
      startDate: contract.startDate,
      title: contract.title,
      type: contract.type
    };

    const requestBuilder = () =>
      axios.post<Contract>('registration/contracts/basics', basicInformation);

    const finalContract = await dispatch(apiCaller(requestBuilder));
    dispatch(contractsSlice.actions.addContract(finalContract));
    dispatch(contractsSlice.actions.setInitialContractForm(finalContract));
    dispatch(showAddSuccessSnackbar());
    return finalContract;
  };

export const updateContractBasicInformation =
  (): AppThunk<Promise<Contract>> => async (dispatch, getState) => {
    const contract = getState().contracts.draftContract;
    const basicInformation: ContractBasicInformation = {
      branchIds: contract.branchIds,
      endDate: contract.endDate,
      mainCategoryId: contract.mainCategoryId,
      notes: contract.notes,
      startDate: contract.startDate,
      title: contract.title,
      type: contract.type
    };

    const requestBuilder = () =>
      axios.put<Contract>(`registration/contracts/${contract.id}/basics`, basicInformation);

    const finalContract = await dispatch(apiCaller(requestBuilder));
    dispatch(contractsSlice.actions.addContract(finalContract));
    dispatch(contractsSlice.actions.setInitialContractForm(finalContract));
    dispatch(showUpdateSuccessSnackbar());
    return finalContract;
  };

export const initializeContractModal =
  (contractId: string): AppThunk =>
  async (dispatch, getState) => {
    const contract = selectContractById(getState(), contractId);

    const finalContract = contract ?? { id: contractId };
    dispatch(setInitialContractForm({ ...finalContract }));
  };

export const deleteContract =
  (contractId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const associatedPlanIds = selectAssociatedPlanIdsByContractId(currentState, contractId);

    const requestBuilder = () => axios.delete<Contract>(`registration/contracts/${contractId}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removeContract(contractId));
    dispatch(removePlans(associatedPlanIds));
    dispatch(showDeleteSuccessSnackbar());
  };

export const disassociateContract =
  (contractId?: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const selectedContractId = contractId ?? selectSelectedContractId(state);
    const assetId = selectAsset(state).id;

    if (assetId) {
      const requestBuilder = () =>
        axios.put(`registration/assets/${assetId}/disassociate-contract`, {
          contractId: selectedContractId
        });
      await dispatch(apiCaller(requestBuilder));
      dispatch(getAssetContracts(assetId));
      dispatch(getAssetPlans(assetId));
      dispatch(showUpdateSuccessSnackbar(true));
    }
  };

export const checkContractExistsFromStore =
  (): AppThunk<Promise<boolean>> => async (dispatch, getState) => {
    const draftContract = selectContract(getState());

    return !!draftContract.id;
  };

export const getDisabledBranchIds =
  (): AppThunk<Promise<string[]>> => async (dispatch, getState) => {
    const state = getState();
    const draftContract = selectContract(state);
    let disabledBranchIds: string[] = [];

    if (draftContract.id) {
      const requestBuilder = () =>
        axios.get<string[]>(`registration/contracts/${draftContract.id}/asset-and-plan/branches`);

      disabledBranchIds = await dispatch(apiCaller(requestBuilder));
      dispatch(addDisabledBranchIds(disabledBranchIds));
    }

    return disabledBranchIds;
  };

export const getSelectableBranches = (): AppThunk => async (dispatch, getState) => {
  const branches = selectAllBranches(getState());
  dispatch(setSelectableBranchIds(branches.map((i) => i.id)));
};

export const addNewCostItem = (): AppThunk => async (dispatch) => {
  const newCostItem: CostDetail = {
    amount: undefined,
    categoryIds: []
  };

  dispatch(contractsSlice.actions.addNewCostItem(newCostItem));
};

export const getAllContractBasics = (): AppThunk => async (dispatch, getState) => {
  const requestBuilder = () => axios.get<Contract[]>('registration/contracts/basics');
  const contracts = await dispatch(apiCaller(requestBuilder));

  const oldContractIds = selectAllContractIds(getState()) as string[];
  dispatch(contractsSlice.actions.removeAndUpsertContracts({ contracts, oldContractIds }));
};

export const getContractFile =
  (contractId: string): AppThunk =>
  async (dispatch, getState) => {
    const requestBuilder = () =>
      axios.get<Blob>(`contracts/${contractId}/files`, { responseType: 'arraybuffer' });
    const data = await dispatch(apiCaller(requestBuilder));
    const blob = new Blob([data]);

    const currentState = getState();
    const { file } = selectContractById(currentState, contractId);

    saveAs(blob, file.name);
  };

export const addPartToPartPolicy = (): AppThunk => async (dispatch) => {
  dispatch(addPart(''));
};

export const updateCostType =
  (costType: CostType): AppThunk =>
  async (dispatch) => {
    dispatch(contractsSlice.actions.updateCostType(costType));
  };

export const getFirm =
  (contractId: string): AppThunk<Promise<Firm>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Firm>(`registration/contracts/${contractId}/firms`);
    const firm = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    dispatch(updateInitialDraftFirm(firm));

    return firm;
  };

export const saveFirm =
  (contractId: string, firm: Firm): AppThunk<Promise<Firm>> =>
  async (dispatch) => {
    let finalFirm: Firm = null;
    if (isObjectNullOrEmpty(firm) || Object.values(firm).every((i) => !i)) {
      await dispatch(deleteFirm(contractId));
    } else {
      finalFirm = await dispatch(updateFirm(contractId, firm));
    }

    return finalFirm;
  };

export const updateFirm =
  (contractId: string, firm: Firm): AppThunk<Promise<Firm>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<Firm>(`registration/contracts/${contractId}/firms`, firm);
    const finalFirm = await dispatch(apiCaller(requestBuilder));

    dispatch(updateInitialDraftFirm(finalFirm));
    dispatch(showUpdateSuccessSnackbar());
    return finalFirm;
  };

export const deleteFirm =
  (contractId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete(`registration/contracts/${contractId}/firms`);
    const finalFirm = await dispatch(apiCaller(requestBuilder));

    dispatch(removeFirmsSection());
    dispatch(showUpdateSuccessSnackbar());
    return finalFirm;
  };

export const getPartsPolicy =
  (contractId: string): AppThunk<Promise<PartsPolicy>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PartsPolicy>(`registration/contracts/${contractId}/parts-policy`);
    const partsPolicy = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    dispatch(updateInitialDraftPartsPolicy(partsPolicy));

    return partsPolicy;
  };

export const savePartsPolicy =
  (contractId: string, partsPolicy: PartsPolicy): AppThunk<Promise<PartsPolicy>> =>
  async (dispatch) => {
    let finalPartsPolicy: PartsPolicy = null;
    if (partsPolicy.partPolicyType === 'none') {
      await dispatch(deletePartPolicy(contractId));
    } else {
      finalPartsPolicy = await dispatch(updatePartPolicy(contractId, partsPolicy));
    }

    return finalPartsPolicy;
  };

const updatePartPolicy =
  (contractId: string, partsPolicy: PartsPolicy): AppThunk<Promise<PartsPolicy>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<PartsPolicy>(`registration/contracts/${contractId}/parts-policy`, partsPolicy);
    const finalPartsPolicy = await dispatch(apiCaller(requestBuilder));

    dispatch(updateInitialDraftPartsPolicy(finalPartsPolicy));
    dispatch(showUpdateSuccessSnackbar());

    return finalPartsPolicy;
  };

const deletePartPolicy =
  (contractId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete(`registration/contracts/${contractId}/parts-policy`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removePartsSection());
    dispatch(showUpdateSuccessSnackbar());
  };

export const getCost =
  (contractId: string): AppThunk<Promise<Cost>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Cost>(`registration/contracts/${contractId}/costs`);
    const cost = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    dispatch(updateInitialDraftCost(cost));

    return cost;
  };

export const saveCost =
  (contractId: string, cost: Cost): AppThunk<Promise<Cost>> =>
  async (dispatch) => {
    let finalCost: Cost = null;
    if (cost.type === 'none') {
      await dispatch(deleteCost(contractId));
    } else {
      finalCost = await dispatch(updateCost(contractId, cost));
    }

    return finalCost;
  };

const updateCost =
  (contractId: string, cost: Cost): AppThunk<Promise<Cost>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<Cost>(`registration/contracts/${contractId}/costs`, cost);
    const finalCost = await dispatch(apiCaller(requestBuilder));

    dispatch(updateInitialDraftCost(finalCost));
    dispatch(showUpdateSuccessSnackbar());
    return finalCost;
  };

const deleteCost =
  (contractId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete(`registration/contracts/${contractId}/costs`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removeCostSection());
    dispatch(showUpdateSuccessSnackbar());
  };

export const getCostCategoriesWithParents =
  (): AppThunk<Promise<Category[]>> => async (dispatch, getState) => {
    const costForm = selectCostForm(getState());
    const ids = costForm.category.details.flatMap((i) => i.categoryIds);
    const categories = await dispatch(getMultipleCategoriesWithParentsByIds(ids));

    return categories;
  };

export const getContractAssociatedInformation =
  (contractId: string): AppThunk<Promise<ContractAssociatedInformation>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<ContractAssociatedInformation>(
        `registration/contracts/${contractId}/asset-and-plan/counts`
      );
    const associatedInformation = await dispatch(apiCaller(requestBuilder));

    return associatedInformation;
  };

export const getContractMetricTypes =
  (contractId: string): AppThunk<Promise<MetricType[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<MetricType[]>(`registration/metrictypes/contract/${contractId}`);
    const metricTypes = await dispatch(apiCaller(requestBuilder));

    dispatch(updateContractMetricTypes(metricTypes));

    return metricTypes;
  };

export const getContractMetric =
  (contractId: string, metricTypeId: string): AppThunk<Promise<Metric>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const contract = selectContractById(currentState, contractId);
    const requestBuilder = () =>
      axios.get<Metric>(`registration/contracts/${contractId}/metrics/${metricTypeId}`);
    const metric = await dispatch(apiCaller(requestBuilder));
    const finalMetric = createGoalFormForMetric(metric);

    dispatch(
      updateMetricOfContract({
        contract,
        metric: finalMetric,
        metricTypeId
      })
    );

    return finalMetric;
  };

export const initializeContractMetric =
  (contractId: string, metricType: MetricType, editMode: boolean): AppThunk<Promise<Metric>> =>
  async (dispatch) => {
    let finalMetric: Metric;
    if (editMode) {
      finalMetric = await dispatch(getContractMetric(contractId, metricType.id));
    } else {
      finalMetric = getDraftMetric(metricType);
    }

    dispatch(
      setInitialMetricForm({
        metric: finalMetric,
        metricTypeId: metricType.id
      })
    );

    return finalMetric;
  };

export const addDowntimeRuleToMetric =
  (metricType: MetricType): AppThunk =>
  async (dispatch) => {
    dispatch(
      contractsSlice.actions.addMetricDowntimeRule({
        downtimeRule: initialDowntimeRule,
        metricType
      })
    );
  };

export const addMetricGoal =
  (metricType: MetricType, limitType: GoalLimitType): AppThunk =>
  async (dispatch) => {
    const defaultGoals = defaultGoalForm[limitType];

    dispatch(
      contractsSlice.actions.addMetricGoal({
        goal: { ...defaultGoals[0] },
        limitType,
        metricType
      })
    );
  };

export const getStatuses =
  (workType: WorkType, mainCategoryId: string): AppThunk<Promise<MetricStatus[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<MetricStatus[]>(
        `registration/taskstatuses/filter?workType=${workType}&mainCategoryId=${mainCategoryId}`
      );
    const taskStatuses = await dispatch(apiCaller(requestBuilder));

    dispatch(
      updateAvailableStatuses({
        statuses: taskStatuses,
        workType
      })
    );

    return taskStatuses;
  };

export const updateContractMetric =
  (contractId: string, metricTypeId: string, metric: Metric): AppThunk<Promise<Metric>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const contract = selectContractById(currentState, contractId);

    const goalsToSave: Goal[] = metric.goalForm[metric.goalForm.type].map((goal, index) => ({
      ...goal,
      categoryGroupNo: index
    }));

    const metricToSave: Metric = {
      ...metric,
      goals: goalsToSave
    };

    delete metricToSave.goalForm;

    const requestBuilder = () =>
      axios.put<Metric>(
        `registration/contracts/${contractId}/metrics/${metricTypeId}`,
        metricToSave
      );
    const finalMetric = await dispatch(apiCaller(requestBuilder));
    const metricWithGoalForm = createGoalFormForMetric(finalMetric);

    dispatch(
      updateMetricOfContract({
        contract,
        metric: metricWithGoalForm,
        metricTypeId
      })
    );

    dispatch(
      updateContractMetricExist({
        isMetricExist: true,
        metricTypeId
      })
    );

    dispatch(showUpdateSuccessSnackbar());

    return metricWithGoalForm;
  };

const createGoalFormForMetric = (metric: Metric) => {
  const goalForm: GoalForm = {
    ...defaultGoalForm
  };

  if (metric.goals && metric.goals.length > 0) {
    goalForm.type = metric.goals[0].limitType;

    limitTypes.forEach((type) => {
      const goalsOfType = metric.goals.filter((goal) => goal.limitType === type);
      if (goalsOfType.length !== 0) {
        goalForm[type] = goalsOfType;
      }
    });
  }

  const finalMetric = {
    ...metric,
    goalForm
  };

  return finalMetric;
};

export const checkDefaultStatuses =
  (
    statusKeys: StatusKey[],
    taskStatuses: MetricStatus[],
    index: number,
    metricType: MetricType
  ): AppThunk =>
  async (dispatch) => {
    if (statusKeys && taskStatuses) {
      const defaultStatusIds: string[] = [];

      statusKeys.forEach((key) => {
        const statusId = getStatusIdFromKey(taskStatuses, key);
        if (statusId) {
          defaultStatusIds.push(statusId);
        }
      });

      dispatch(
        updateDowntimeRuleSelectedStatusIds({
          downtimeRuleIndex: index,
          metricType,
          statusIds: defaultStatusIds
        })
      );

      dispatch(
        updateDowntimeRuleDefaultStatusSet({
          downtimeRuleIndex: index,
          isDefaultStatusSet: true,
          metricType
        })
      );
    }
  };

const getStatusIdFromKey = (taskStatuses: MetricStatus[], key: StatusKey) => {
  let statusId: string;
  const searchedTaskStatus = taskStatuses.find((i) => i.key === key);
  if (searchedTaskStatus) {
    statusId = searchedTaskStatus.id;
  } else {
    taskStatuses.forEach((s) => {
      const searchedTaskSubstatus = s.taskSubStatuses.find((i) => i.key === key);

      if (searchedTaskSubstatus) {
        statusId = searchedTaskSubstatus.id;
      }
    });
  }

  return statusId;
};

export const deleteContractMetric =
  (contractId: string, metricTypeId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete(`registration/contracts/${contractId}/metrics/${metricTypeId}`);
    await dispatch(apiCaller(requestBuilder));
    dispatch(removeMetric(metricTypeId));
    dispatch(showDeleteSuccessSnackbar());
  };
