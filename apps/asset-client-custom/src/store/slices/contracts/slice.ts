import {
  Contract,
  Cost,
  CostDetail,
  CostType,
  DelayTolerance,
  DowntimeRule,
  Firm,
  Goal,
  GoalLimitType,
  Metric,
  MetricType,
  PartsPolicy,
  PartsPolicyType,
  TimeType,
  Usability
} from './types';
import { Day } from 'store/common';
import { MetricStatus, WorkType } from '../common/types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { defaultCostForm, defaultValidEndTime, defaultValidStartTime, initialState } from './data';
import contractCostItemValidator from 'helpers/validations/ContractCostItemValidator';

export const contractsAdapter = createEntityAdapter<Contract>({
  sortComparer: (first, second) => first.title.localeCompare(second.title)
});

export const contractsSlice = createSlice({
  initialState: contractsAdapter.getInitialState(initialState),
  name: 'contracts',
  reducers: {
    addContract: contractsAdapter.upsertOne,
    addDisabledBranchIds: (draft, action: PayloadAction<string[]>) => {
      const disabledBranchIds = action.payload;
      disabledBranchIds.forEach((id) => {
        if (!draft.disabledBranchIds.includes(id)) {
          draft.disabledBranchIds.push(id);
        }
      });
    },
    addMetricDowntimeRule: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        downtimeRule: DowntimeRule;
      }>
    ) => {
      const { metricType, downtimeRule } = action.payload;
      draft.draftContract.metrics[metricType.id].downtimeRules.push(downtimeRule);
    },
    addMetricGoal: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        limitType: GoalLimitType;
        goal: Goal;
      }>
    ) => {
      const { metricType, goal, limitType } = action.payload;
      draft.draftContract.metrics[metricType.id].goalForm[limitType].push(goal);
    },
    addNewCostItem: (draft, action: PayloadAction<CostDetail>) => {
      draft.draftContract.costForm.category.details.push(action.payload);
    },
    addPart: (draft, action: PayloadAction<string>) => {
      draft.draftContract.partsPolicy.partList.push(action.payload);
    },
    cancelCostForm: (draft) => {
      draft.draftContract.costForm = {
        ...draft.initialDraftContract.costForm
      };
    },
    clearContractForm: (draft) => {
      draft.draftContract = { ...draft.initialDraftContract };
    },
    clearInitialContractForm: (draft) => {
      draft.draftContract = { ...initialState.initialDraftContract };
      draft.initialDraftContract = { ...initialState.initialDraftContract };

      draft.disabledBranchIds = [];
      draft.selectableBranchIds = [];
    },
    clearInitialMetricForm: (draft, action: PayloadAction<string>) => {
      const metricTypeId = action.payload;
      delete draft.initialDraftContract.metrics[metricTypeId];
    },
    clearMetricForm: (draft, action: PayloadAction<string>) => {
      const typeId = action.payload;
      const initialMetric = draft.initialDraftContract.metrics[typeId];
      if (initialMetric) {
        draft.draftContract.metrics[typeId] = initialMetric;
      } else {
        delete draft.draftContract.metrics[typeId];
      }
    },
    removeAndUpsertContracts: (
      draft,
      action: PayloadAction<{
        contracts: Contract[];
        oldContractIds: string[];
      }>
    ) => {
      const { contracts, oldContractIds } = action.payload;

      contractsAdapter.removeMany(draft, oldContractIds);
      contractsAdapter.upsertMany(draft, contracts);
    },
    removeContract: contractsAdapter.removeOne,
    removeCostItem: (draft, action: PayloadAction<number>) => {
      const index = action.payload;
      const { costForm } = draft.draftContract;
      costForm.category.details.splice(index, 1);
    },
    removeCostSection: (draft) => {
      draft.initialDraftContract.cost = initialState.initialDraftContract.cost;
      draft.initialDraftContract.costForm = {
        ...defaultCostForm
      };

      draft.draftContract.cost = initialState.draftContract.cost;
      draft.draftContract.costForm = {
        ...defaultCostForm
      };
    },
    removeDownTimeRule: (draft, action: PayloadAction<number>) => {
      const index = action.payload;
      const selectedMetricId = draft.draftContract.metrics.selectedMetricType.id;
      draft.draftContract.metrics[selectedMetricId].downtimeRules.splice(index, 1);
    },
    removeFirmsSection: (draft) => {
      draft.initialDraftContract.firm = initialState.initialDraftContract.firm;
      draft.draftContract.firm = initialState.draftContract.firm;
    },
    removeMetric: (draft, action: PayloadAction<string>) => {
      const metricTypeId = action.payload;
      const avaiableMetricItem = draft.availableMetricTypes.find(
        (metric) => metric.id === metricTypeId
      );
      avaiableMetricItem.isMetricExist = false;
      delete draft.draftContract.metrics[metricTypeId];
    },
    removeMetricGoal: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        index: number;
        limitType: GoalLimitType;
      }>
    ) => {
      const { metricType, index, limitType } = action.payload;
      const goals = draft.draftContract.metrics[metricType.id].goalForm[limitType];
      if (index !== -1) {
        goals.splice(index, 1);
      }
    },
    removePartItem: (draft, action: PayloadAction<number>) => {
      const index = action.payload;

      if (index !== -1) {
        draft.draftContract.partsPolicy.partList.splice(index, 1);
      }
    },
    removePartsSection: (draft) => {
      draft.initialDraftContract.partsPolicy = initialState.initialDraftContract.partsPolicy;
      draft.draftContract.partsPolicy = initialState.draftContract.partsPolicy;
    },
    setContractForm: (draft, action: PayloadAction<Contract>) => {
      const basicInformation = action.payload;
      draft.draftContract = {
        ...draft.draftContract,
        ...basicInformation
      };
    },
    setInitialContractForm: (draft, action: PayloadAction<Contract>) => {
      const basicInformation = action.payload;

      draft.initialDraftContract = {
        ...draft.initialDraftContract,
        ...basicInformation
      };

      draft.draftContract = {
        ...draft.draftContract,
        ...basicInformation
      };
    },
    setInitialMetricForm: (
      draft,
      action: PayloadAction<{
        metric: Metric;
        metricTypeId: string;
      }>
    ) => {
      const { metric, metricTypeId } = action.payload;

      draft.initialDraftContract.metrics[metricTypeId] = metric;
      draft.draftContract.metrics[metricTypeId] = metric;
    },
    setMetricForm: (
      draft,
      action: PayloadAction<{
        metric: Metric;
        metricTypeId: string;
      }>
    ) => {
      const { metric, metricTypeId } = action.payload;

      draft.draftContract.metrics[metricTypeId] = metric;
    },
    setSelectableBranchIds: (draft, action: PayloadAction<string[]>) => {
      const selectableBranchIds = action.payload;
      draft.selectableBranchIds = selectableBranchIds;
    },
    setSelectedMetricType: (draft, action: PayloadAction<MetricType>) => {
      draft.draftContract.metrics.selectedMetricType = action.payload;
    },
    updateAvailableStatuses: (
      draft,
      action: PayloadAction<{
        workType: WorkType;
        statuses: MetricStatus[];
      }>
    ) => {
      const { workType, statuses } = action.payload;
      draft.draftContract.metrics.availableStatuses = {
        ...draft.draftContract.metrics.availableStatuses,
        [workType]: statuses
      };
    },
    updateBasicInformation: (
      draft,
      action: PayloadAction<{ title: string; notes: string; startDate: string; endDate: string }>
    ) => {
      const { title, notes, startDate, endDate } = action.payload;
      draft.draftContract.title = title;
      draft.draftContract.notes = notes;
      draft.draftContract.startDate = startDate;
      draft.draftContract.endDate = endDate;
    },
    updateBranchIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftContract.branchIds = action.payload;
    },
    updateContractMetricExist: (
      draft,
      action: PayloadAction<{
        metricTypeId: string;
        isMetricExist: boolean;
      }>
    ) => {
      const { metricTypeId, isMetricExist } = action.payload;

      const index = draft.availableMetricTypes.findIndex((i) => i.id === metricTypeId);
      if (index !== -1) {
        draft.availableMetricTypes[index].isMetricExist = isMetricExist;
      }
    },
    updateContractMetricTypes: (draft, action: PayloadAction<MetricType[]>) => {
      draft.availableMetricTypes = action.payload;
    },
    updateCostAmount: (
      draft,
      action: PayloadAction<{
        amount: number;
        index: number;
        type: CostType;
      }>
    ) => {
      const { index, amount, type } = action.payload;
      const costItem = draft.draftContract.costForm[type].details[index];
      costItem.amount = amount;

      draft.draftContract.costForm[type].valid = draft.draftContract.costForm[type].details.every(
        (detail) => !contractCostItemValidator(detail).amount
      );
    },
    updateCostCategoryIds: (
      draft,
      action: PayloadAction<{
        index: number;
        categoryIds: string[];
      }>
    ) => {
      const { index, categoryIds } = action.payload;
      const costItem = draft.draftContract.costForm.category.details[index];
      costItem.categoryIds = categoryIds;
    },
    updateCostType: (draft, action: PayloadAction<CostType>) => {
      draft.draftContract.costForm.type = action.payload;
    },
    updateDowntimeRuleDefaultStatusSet: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        isDefaultStatusSet: boolean;
      }>
    ) => {
      const { downtimeRuleIndex, metricType, isDefaultStatusSet } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      if (downtimeRuleIndex !== -1) {
        metric.downtimeRules[downtimeRuleIndex].isDefaultStatusSet = isDefaultStatusSet;
      }
    },
    updateDowntimeRuleDelayTolerance: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        delayTolerance: DelayTolerance;
      }>
    ) => {
      const { downtimeRuleIndex, metricType, delayTolerance } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      if (downtimeRuleIndex !== -1) {
        metric.downtimeRules[downtimeRuleIndex].delayTolerance = delayTolerance;
        if (delayTolerance === 'noTolerance') {
          delete metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeType;
          delete metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeValue;
        } else {
          if (!metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeValue) {
            metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeValue = 0;
          }
          if (!metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeType) {
            metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeType = 'minutes';
          }
        }
      }
    },
    updateDowntimeRuleDelayToleranceTimeType: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        timeType: TimeType;
      }>
    ) => {
      const { downtimeRuleIndex, metricType, timeType } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      if (downtimeRuleIndex !== -1) {
        metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeType = timeType;
      }
    },
    updateDowntimeRuleDelayToleranceValue: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        timeValue: number;
      }>
    ) => {
      const { downtimeRuleIndex, metricType, timeValue } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      if (downtimeRuleIndex !== -1) {
        metric.downtimeRules[downtimeRuleIndex].delayToleranceTimeValue = timeValue;
      }
    },
    updateDowntimeRuleSelectedStatusIds: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        statusIds: string[];
      }>
    ) => {
      const { downtimeRuleIndex, metricType, statusIds } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      if (downtimeRuleIndex !== -1) {
        metric.downtimeRules[downtimeRuleIndex].statusIds = statusIds;
      }
    },
    updateDowntimeRuleUsability: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        usability: Usability;
      }>
    ) => {
      const { downtimeRuleIndex, metricType, usability } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      if (downtimeRuleIndex !== -1) {
        metric.downtimeRules[downtimeRuleIndex].usability = usability;
      }
    },
    updateDowntimeRuleWorkType: (
      draft,
      action: PayloadAction<{
        downtimeRuleIndex: number;
        metricType: MetricType;
        workType: WorkType;
      }>
    ) => {
      const { downtimeRuleIndex, metricType, workType } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];
      if (downtimeRuleIndex !== -1) {
        const oldType = metric.downtimeRules[downtimeRuleIndex].workType;
        metric.downtimeRules[downtimeRuleIndex].workType = workType;
        if (oldType !== workType) {
          metric.downtimeRules[downtimeRuleIndex].statusIds = [];

          if (workType === 'breakdown') {
            metric.downtimeRules[downtimeRuleIndex].usability = 'usable';
          } else {
            delete metric.downtimeRules[downtimeRuleIndex].usability;
          }
        }
      }
    },
    updateFirm: (draft, action: PayloadAction<Firm>) => {
      const firm = action.payload;
      draft.draftContract.firm = firm;
    },
    updateInitialDraftCost: (draft, action: PayloadAction<Cost>) => {
      const cost: Cost = {
        ...action.payload,
        valid: true
      };

      draft.initialDraftContract.cost = cost;
      draft.initialDraftContract.costForm = {
        ...defaultCostForm,
        [cost.type]: cost,
        type: cost.type
      };

      draft.draftContract.cost = cost;
      draft.draftContract.costForm = {
        ...defaultCostForm,
        [cost.type]: cost,
        type: cost.type
      };
    },
    updateInitialDraftFirm: (draft, action: PayloadAction<Firm>) => {
      const firm = action.payload;
      draft.draftContract.firm = firm;
      draft.initialDraftContract.firm = firm;
    },
    updateInitialDraftPartsPolicy: (draft, action: PayloadAction<PartsPolicy>) => {
      const partsPolicy = action.payload;
      draft.draftContract.partsPolicy = partsPolicy;
      draft.initialDraftContract.partsPolicy = partsPolicy;
    },
    updateMainCategoryId: (draft, action: PayloadAction<string>) => {
      draft.draftContract.mainCategoryId = action.payload;
    },
    updateMetricAllDay: (
      draft,
      action: PayloadAction<{
        allDay: boolean;
        metricTypeId: string;
      }>
    ) => {
      const { allDay, metricTypeId } = action.payload;
      const metric = draft.draftContract.metrics[metricTypeId];
      metric.allDay = allDay;

      if (!allDay) {
        metric.validStartTime = metric.validStartTime ?? defaultValidStartTime;
        metric.validEndTime = metric.validEndTime ?? defaultValidEndTime;
      }
    },
    updateMetricGoalCategories: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        categories: string[];
        index: number;
        limitType: GoalLimitType;
      }>
    ) => {
      const { metricType, categories, index, limitType } = action.payload;
      const goals = draft.draftContract.metrics[metricType.id].goalForm[limitType];
      goals[index].categoryIds = categories;
    },
    updateMetricGoalPercentageValue: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        index: number;
        percentageValue: number;
      }>
    ) => {
      const { metricType, index, percentageValue } = action.payload;
      const goals = draft.draftContract.metrics[metricType.id].goalForm.percentage;
      goals[index].limitPercentageValue = percentageValue;
    },
    updateMetricGoalTimeType: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        index: number;
        timeType: TimeType;
      }>
    ) => {
      const { metricType, index, timeType } = action.payload;
      const goals = draft.draftContract.metrics[metricType.id].goalForm.timeBased;
      goals[index].limitTimeType = timeType;
    },
    updateMetricGoalTimeValue: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        index: number;
        timeValue: number;
      }>
    ) => {
      const { metricType, index, timeValue } = action.payload;
      const goals = draft.draftContract.metrics[metricType.id].goalForm.timeBased;
      goals[index].limitTimeValue = timeValue;
    },
    updateMetricGoalType: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        goalType: GoalLimitType;
      }>
    ) => {
      const { metricType, goalType } = action.payload;
      draft.draftContract.metrics[metricType.id].goalForm.type = goalType;
    },
    updateMetricOfContract: (
      draft,
      action: PayloadAction<{
        contract: Contract;
        metric: Metric;
        metricTypeId: string;
      }>
    ) => {
      const { contract, metric, metricTypeId } = action.payload;
      const contractToSave: Contract = {
        ...contract,
        metrics: {
          ...contract.metrics,
          [metricTypeId]: metric
        }
      };
      contractToSave.metrics[metricTypeId] = metric;
      draft.initialDraftContract.metrics[metricTypeId] = metric;
      draft.draftContract.metrics[metricTypeId] = metric;
      contractsAdapter.upsertOne(draft, contractToSave);
    },
    updateMetricTimeTolerance: (
      draft,
      action: PayloadAction<{
        metricType: MetricType;
        timeTolerance: number;
      }>
    ) => {
      const { metricType, timeTolerance } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];
      metric.timeTolerance = timeTolerance;
    },
    updateMetricValidDay: (
      draft,
      action: PayloadAction<{
        day: Day;
        metricType: MetricType;
      }>
    ) => {
      const { day, metricType } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];

      const { days } = metric;
      const index = days.indexOf(day);
      if (index === -1) {
        days.push(day);
      } else {
        days.splice(index, 1);
      }
    },
    updateMetricValidDaysHolidaysIncluded: (
      draft,
      action: PayloadAction<{
        holidaysIncluded: boolean;
        metricType: MetricType;
      }>
    ) => {
      const { holidaysIncluded, metricType } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];
      metric.holidaysIncluded = holidaysIncluded;
    },
    updateMetricValidEndTime: (
      draft,
      action: PayloadAction<{
        endTime: string;
        metricType: MetricType;
      }>
    ) => {
      const { endTime, metricType } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];
      metric.validEndTime = endTime;
    },
    updateMetricValidStartTime: (
      draft,
      action: PayloadAction<{
        startTime: string;
        metricType: MetricType;
      }>
    ) => {
      const { startTime, metricType } = action.payload;
      const metric = draft.draftContract.metrics[metricType.id];
      metric.validStartTime = startTime;
    },
    updatePartItem: (
      draft,
      action: PayloadAction<{
        index: number;
        part: string;
      }>
    ) => {
      const { index, part } = action.payload;

      if (index !== -1) {
        draft.draftContract.partsPolicy.partList[index] = part;
      }
    },
    updatePartPolicyType: (draft, action: PayloadAction<PartsPolicyType>) => {
      draft.draftContract.partsPolicy.partPolicyType = action.payload;
      draft.draftContract.partsPolicy.partList = [];
    },
    updatePartsPolicy: (draft, action: PayloadAction<PartsPolicy>) => {
      draft.draftContract.partsPolicy = action.payload;
    },
    upsertContracts: contractsAdapter.upsertMany
  }
});

export default contractsSlice.reducer;

export const {
  addDisabledBranchIds,
  addPart,
  cancelCostForm,
  clearContractForm,
  clearInitialContractForm,
  removeAndUpsertContracts,
  removeContract,
  removeCostItem,
  removeCostSection,
  removeDownTimeRule,
  removeFirmsSection,
  removeMetric,
  removeMetricGoal,
  removePartItem,
  removePartsSection,
  setInitialContractForm,
  setContractForm,
  setSelectableBranchIds,
  updateBasicInformation,
  updateBranchIds,
  updateMetricGoalCategories,
  updateMetricGoalType,
  updateMetricGoalTimeType,
  updateMetricGoalTimeValue,
  updateMetricGoalPercentageValue,
  updateCostAmount,
  updatePartItem,
  updatePartPolicyType,
  updateMetricValidDaysHolidaysIncluded,
  updateMainCategoryId,
  updateMetricAllDay,
  updateMetricValidDay,
  updateMetricValidEndTime,
  updateMetricValidStartTime,
  updateCostCategoryIds,
  updateDowntimeRuleWorkType,
  updateDowntimeRuleUsability,
  updateDowntimeRuleDefaultStatusSet,
  updateDowntimeRuleSelectedStatusIds,
  updateDowntimeRuleDelayTolerance,
  updateDowntimeRuleDelayToleranceTimeType,
  updateDowntimeRuleDelayToleranceValue,
  updateMetricTimeTolerance,
  updateFirm,
  updateInitialDraftFirm,
  updateInitialDraftCost,
  updateInitialDraftPartsPolicy,
  updatePartsPolicy,
  updateContractMetricTypes,
  clearMetricForm,
  clearInitialMetricForm,
  setMetricForm,
  setInitialMetricForm,
  updateMetricOfContract,
  updateAvailableStatuses,
  setSelectedMetricType,
  updateContractMetricExist,
  upsertContracts
} = contractsSlice.actions;
