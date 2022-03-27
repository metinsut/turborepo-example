import { AppThunk } from 'RootTypes';
import { BreakdownCost } from '../common/types';
import { BreakdownTypeResultType, History, TaskDetailInformation } from './types';
import { PagedResult, apiCaller } from 'store/common';
import { StatusKeys } from 'store/slices/tasks/common/type';
import {
  Substatus,
  getSelectableBreakdownStatuses
} from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { TASKLIST } from 'routes/constant-route';
import { Usability } from 'store/slices/breakdown/common/types';
import { getBreakdownCostTypes } from 'store/slices/taskConfiguration/breakdown/breakdownCosts';
import { getBreakdownTypes } from 'store/slices/taskConfiguration/breakdown/breakdownTypes';
import { history } from 'utils/history';
import { selectBreakdownId, selectTaskHistoryPageCount, selectTaskHistorySize } from './selector';
import {
  setBreakdownCosts,
  setDraft,
  setTaskHistory,
  setTaskStatus,
  setUsability,
  updateType
} from './slice';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import { upsertPerson, upsertPersons } from 'store/slices/persons';
import axios from 'utils/axiosUtils';

const getTaskDetail =
  (taskId: string): AppThunk<Promise<TaskDetailInformation>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<TaskDetailInformation>(`gw/breakdown/breakdowns/${taskId}/task-detail`);
    const taskDetail = await dispatch(apiCaller(requestBuilder));

    if (taskDetail.taskStatusInformation.responsiblePerson) {
      dispatch(upsertPerson(taskDetail.taskStatusInformation.responsiblePerson));
    }
    if (taskDetail.taskStatusInformation.assistantPersonnels) {
      dispatch(upsertPersons(taskDetail.taskStatusInformation.assistantPersonnels));
    }
    if (taskDetail.breakdownInformation.requesterPerson) {
      dispatch(upsertPerson(taskDetail.breakdownInformation.requesterPerson));
    }
    if (taskDetail.breakdownInformation.responsibleManager) {
      dispatch(upsertPerson(taskDetail.breakdownInformation.responsibleManager));
    }

    dispatch(setDraft(taskDetail));
    return taskDetail;
  };

const initializeTaskDetailPage =
  (taskId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    try {
      const taskDetail = await dispatch(getTaskDetail(taskId));
      const mainCategoryId = taskDetail.assetInformation.categories[0]?.id ?? '';

      const breakdownStatusPromise = dispatch(getSelectableBreakdownStatuses(mainCategoryId));
      const breakdownTypePromise = dispatch(getBreakdownTypes(mainCategoryId));
      const costTypePromise = dispatch(getBreakdownCostTypes(mainCategoryId));
      await Promise.all([breakdownStatusPromise, breakdownTypePromise, costTypePromise]);
    } catch (error) {
      history.push(TASKLIST);
    }
  };

const commitTask =
  (taskId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestPayload = { id: taskId };
    const requestBuilder = () =>
      axios.put<typeof requestPayload>(`breakdown/breakdowns/${taskId}/commit`, requestPayload);

    await dispatch(apiCaller(requestBuilder));
    dispatch(showUpdateSuccessSnackbar());
  };

const updateTaskStatus =
  (status: StatusKeys, substatus: Substatus = undefined): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const breakdownId = selectBreakdownId(currentState);

    const requestPayload = substatus ? { status, substatusId: substatus.id } : { status };

    const requestBuilder = () =>
      axios.put<typeof requestPayload>(
        `breakdown/breakdowns/${breakdownId}/status`,
        requestPayload
      );

    await dispatch(apiCaller(requestBuilder));
    dispatch(setTaskStatus({ status, substatus }));
    dispatch(showUpdateSuccessSnackbar());
  };

const updateBreakdownType =
  (typeId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();
    const breakdownId = selectBreakdownId(state);
    const requestBuilder = () =>
      axios.put<BreakdownTypeResultType>(`breakdown/breakdowns/${breakdownId}/type`, {
        breakdownTypeId: typeId
      });

    const { breakdownType, breakdownTypeId } = await dispatch(apiCaller(requestBuilder));

    dispatch(updateType({ breakdownType, breakdownTypeId }));
    dispatch(showUpdateSuccessSnackbar());
  };

export const refreshBreakdownCosts =
  (breakdownId: string): AppThunk<Promise<BreakdownCost[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<{ breakdownId: string; costs: BreakdownCost[] }>(
        `breakdown/breakdowns/${breakdownId}/costs`
      );

    const breakdownCosts = await dispatch(apiCaller(requestBuilder));
    dispatch(setBreakdownCosts(breakdownCosts.costs));
    return breakdownCosts.costs;
  };

const updateBreakdownCost =
  (
    breakdownId: string,
    breakdownCostId: string,
    breakdownCost: BreakdownCost
  ): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put(`breakdown/breakdowns/${breakdownId}/costs/${breakdownCostId}`, breakdownCost);

    await dispatch(apiCaller(requestBuilder));
    dispatch(refreshBreakdownCosts(breakdownId));
    dispatch(showUpdateSuccessSnackbar());
  };

const deleteBreakdownCost =
  (breakdownId: string, breakdownCostId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete(`breakdown/breakdowns/${breakdownId}/costs/${breakdownCostId}`);

    await dispatch(apiCaller(requestBuilder));
    dispatch(refreshBreakdownCosts(breakdownId));
    dispatch(showDeleteSuccessSnackbar());
  };

const addBreakdownCost =
  (breakdownId: string, breakdownCost: BreakdownCost): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post(`breakdown/breakdowns/${breakdownId}/costs`, breakdownCost);

    await dispatch(apiCaller(requestBuilder));
    dispatch(refreshBreakdownCosts(breakdownId));
    dispatch(showAddSuccessSnackbar());
  };

const updateBreakdownUsability =
  (usability: Usability): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();
    const breakdownId = selectBreakdownId(state);
    const requestPayload = { usability };
    const requestBuilder = () =>
      axios.put<typeof requestPayload>(
        `breakdown/breakdowns/${breakdownId}/usability`,
        requestPayload
      );

    const response = await dispatch(apiCaller(requestBuilder));

    dispatch(setUsability(response.usability));
    dispatch(showUpdateSuccessSnackbar());
  };

const getHistory =
  (taskId: string, page: number, size: number): AppThunk<Promise<PagedResult<History>>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<PagedResult<History>>(
        `gw/breakdown/breakdowns/${taskId}/update-histories?page=${page}&size=${size}`
      );
    const taskHistory = await dispatch(apiCaller(requestBuilder));

    dispatch(setTaskHistory(taskHistory));
    return taskHistory;
  };

const initializeHistory = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const currentState = getState();
  const breakdownId = selectBreakdownId(currentState);
  const size = selectTaskHistorySize(currentState);
  dispatch(getHistory(breakdownId, 1, size));
};

const getHistoryPageByNumber =
  (page: number): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const breakdownId = selectBreakdownId(currentState);
    const size = selectTaskHistorySize(currentState);
    const pageCount = selectTaskHistoryPageCount(currentState);
    if (page <= pageCount && page > 0) {
      dispatch(getHistory(breakdownId, page, size));
    }
  };

export {
  addBreakdownCost,
  commitTask,
  deleteBreakdownCost,
  getHistory,
  getHistoryPageByNumber,
  initializeHistory,
  initializeTaskDetailPage,
  updateBreakdownCost,
  updateBreakdownType,
  updateTaskStatus,
  updateBreakdownUsability
};
