import { AppThunk, RootState } from 'RootTypes';
import { PagedRequestOptions, PagedResult, apiCaller } from 'store/common';
import {
  PayloadAction,
  createEntityAdapter,
  createSlice
} from '@reduxjs/toolkit';
import { Task } from '../common/type';
import {
  WfcFilter,
  selectWfcFilterBranch
} from 'store/slices/tasks/waitingForConformation/waitingForConfirmationFilter';
import axios from 'utils/axiosUtils';

export type PagedWFCOptions = {
  page: number;
  size: number;
  branchIds: string[];
};

export type WfcListState = {
  page: number;
  pageSize: number;
  total: number;
  branchIds: string[];
};

export const defaultState: WfcListState = {
  branchIds: [],
  page: 1,
  pageSize: 30,
  total: 0
};

const waitingForConfirmationAdapter = createEntityAdapter<Task>();

export const initialState =
  waitingForConfirmationAdapter.getInitialState(defaultState);

export const waitingForConfirmationSlice = createSlice({
  initialState,
  name: 'waitingForConfirmation',
  reducers: {
    clear: draft => {
      draft.page = initialState.page;
      draft.pageSize = initialState.pageSize;
      draft.total = initialState.total;
      waitingForConfirmationAdapter.removeAll(draft);
    },
    incrementPage: draft => {
      draft.page += 1;
    },
    setAllWaitingForConfirmations: (
      draft,
      action: PayloadAction<PagedResult<Task>>
    ) => {
      const { items, total } = action.payload;
      draft.total = total;
      waitingForConfirmationAdapter.setAll(draft, items);
    },
    setTotal: (draft, action: PayloadAction<number>) => {
      draft.total = action.payload;
    },
    setWaitingForConfirmations: (
      draft,
      action: PayloadAction<PagedResult<Task>>
    ) => {
      const { items, total } = action.payload;
      draft.total = total;
      waitingForConfirmationAdapter.setMany(draft, items);
    }
  }
});

export const getWaitingForConfirmationList =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const state = getState();
    const page = selectCurrentPage(state);
    const size = selectPageSize(state);
    const branchIds = selectWfcFilterBranch(state);
    const requestData: PagedRequestOptions & WfcFilter = {
      branchIds,
      page,
      size
    };
    const requestBuilder = () =>
      axios.post<PagedResult<Task>>(
        '/gw/tasks/waiting-for-confirmation-list',
        requestData
      );
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(
      waitingForConfirmationSlice.actions.setWaitingForConfirmations(data)
    );
  };

export const fetchAllDiscoveredWaitingForConfirmations =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const state = getState();
    const page = selectCurrentPage(state);
    const size = selectPageSize(state);
    const branchIds = selectWfcFilterBranch(state);
    const requestData: PagedRequestOptions & WfcFilter = {
      branchIds,
      page: 1,
      size: page * size
    };
    const requestBuilder = () =>
      axios.post<PagedResult<Task>>(
        '/gw/tasks/waiting-for-confirmation-list',
        requestData
      );
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(
      waitingForConfirmationSlice.actions.setAllWaitingForConfirmations(data)
    );
  };
export const selectTotalNumber = (state: RootState) =>
  state.tasks.waitingForConfirmationList.total;

export const selectCurrentPage = (state: RootState) =>
  state.tasks.waitingForConfirmationList.page;

export const selectPageSize = (state: RootState) =>
  state.tasks.waitingForConfirmationList.pageSize;

export const {
  selectAll: selectAllWaitingForConfirmation,
  selectById: selectWaitingForConfirmationById,
  selectIds: selectAllWaitingForConfirmationIds,
  selectEntities
} = waitingForConfirmationAdapter.getSelectors<RootState>(
  state => state.tasks.waitingForConfirmationList
);

export default waitingForConfirmationSlice.reducer;
export const { incrementPage, clear } = waitingForConfirmationSlice.actions;
