import { AppThunk, RootState } from 'RootTypes';
import { apiCaller } from 'store/common';
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  showAddSuccessSnackbar,
  showDeleteSuccessSnackbar,
  showUpdateSuccessSnackbar
} from 'store/slices/application';
import axios from 'utils/axiosUtils';

export type Status = {
  id?: string;
  name?: string;
  key?: StatusKeys;
  substatuses?: Substatus[];
};

export type Substatus = {
  id?: string;
  name?: string;
  mainCategoryId?: string;
};

export type StatusKeys = 'inProgress' | 'paused' | 'closed' | 'open';

export const maxBreakdownSubstatusNumber = 9;

const adapter = createEntityAdapter<Status>();

const slice = createSlice({
  initialState: adapter.getInitialState(),
  name: 'breakdownStatuses',
  reducers: {
    removeAll: adapter.removeAll,
    setAll: adapter.setAll
  }
});

export const getBreakdownStatuses =
  (mainCategoryId: string): AppThunk<Promise<Status[]>> =>
  (dispatch) => {
    dispatch(slice.actions.removeAll());
    return dispatch(refreshBreakdownStatuses(mainCategoryId));
  };

export const refreshBreakdownStatuses =
  (mainCategoryId: string): AppThunk<Promise<Status[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Status[]>(
        `breakdown/breakdowntasksubstatuses/configurable?mainCategoryId=${mainCategoryId}`
      );

    const breakdownStatuses = await dispatch(apiCaller(requestBuilder));

    dispatch(slice.actions.setAll(breakdownStatuses));
    return breakdownStatuses;
  };

export const getSelectableBreakdownStatuses =
  (mainCategoryId: string): AppThunk<Promise<Status[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Status[]>(
        `breakdown/breakdowntasksubstatuses/selectable?mainCategoryId=${mainCategoryId}`
      );

    const breakdownStatuses = await dispatch(apiCaller(requestBuilder));

    dispatch(slice.actions.setAll(breakdownStatuses));
    return breakdownStatuses;
  };

export const addBreakdownSubstatus =
  (
    mainCategoryId: string,
    taskStatusId: string,
    substatus: Substatus
  ): AppThunk<Promise<Substatus>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post<Substatus>(`breakdown/breakdowntasksubstatuses`, {
        ...substatus,
        mainCategoryId,
        taskStatusId
      });

    const addedSubstatus = await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownStatuses(mainCategoryId));
    dispatch(showAddSuccessSnackbar());
    return addedSubstatus;
  };

export const updateBreakdownSubstatus =
  (mainCategoryId: string, substatus: Substatus): AppThunk<Promise<Substatus>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<Substatus>(`breakdown/breakdowntasksubstatuses/${substatus.id}`, substatus);

    const updatedSubstatus = await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownStatuses(mainCategoryId));
    dispatch(showUpdateSuccessSnackbar());

    return updatedSubstatus;
  };

export const deleteBreakdownSubstatus =
  (mainCategoryId: string, id: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<Substatus>(`breakdown/breakdowntasksubstatuses/${id}`);

    await dispatch(apiCaller(requestBuilder));

    await dispatch(refreshBreakdownStatuses(mainCategoryId));
    dispatch(showDeleteSuccessSnackbar());
  };

export const {
  selectById: selectBreakdownStatusById,
  selectIds: selectAllBreakdownStatusIds,
  selectAll: selectAllBreakdownStatuses
} = adapter.getSelectors<RootState>(
  (state) => state.taskConfiguration.breakdown.breakdownSubstatus
);

export const selectBreakdownStatusByStatusKey = createSelector(
  selectAllBreakdownStatuses,
  (state: RootState, statusKey: StatusKeys) => statusKey,
  (allTaskStatuses, statusKey) => allTaskStatuses.filter((i) => i.key === statusKey)
);

export default slice.reducer;
