import { AppThunk, RootState } from 'RootTypes';
import { MYREQUESTLIST, loadFromLocalStorage } from 'helpers/localStorage';
import { PagedResult, apiCaller } from 'store/common';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StatusGroup, Task } from './common/type';
import { selectAllBranchIds } from 'store/slices/branches';
import { showUpdateSuccessSnackbar } from '../application';
import axios from 'utils/axiosUtils';

export type MyRequestPageRequestType = {
  page: number;
  size: number;
  branchIds: string[];
  statusFilters: StatusGroup[];
};

export type MyRequestPageStateType = {
  localStorageInitialized?: boolean;
  page: number;
  size: number;
  total: number;
  branchIds: string[];
  statusFilters: StatusGroup[];
};

export const statusGroups: StatusGroup[] = [
  'workInProgress',
  'waitingForApproval',
  'finished',
  'denied'
];

export const defaultState: MyRequestPageStateType = {
  branchIds: [],
  localStorageInitialized: false,
  page: 1,
  size: 30,
  statusFilters: ['workInProgress', 'waitingForApproval'],
  total: 0
};

const myRequestsAdapter = createEntityAdapter<Task>();

export const initialState = myRequestsAdapter.getInitialState(defaultState);

export const myRequestsSlice = createSlice({
  initialState: myRequestsAdapter.getInitialState(initialState),
  name: 'myRequests',
  reducers: {
    clear: (draft) => {
      draft.page = initialState.page;
      draft.size = initialState.size;
      draft.total = initialState.total;
      myRequestsAdapter.removeAll(draft);
    },
    clearFilters: (draft) => {
      draft.statusFilters = defaultState.statusFilters;
      draft.branchIds = defaultState.branchIds;
    },
    incrementPage: (draft) => {
      draft.page += 1;
    },
    initFromLocalStorage: (draft, action) => {
      draft.branchIds = action.payload.branchIds;
      draft.statusFilters = action.payload.statusFilters;
      draft.localStorageInitialized = true;
    },
    resetLocalStorageStatus: (draft) => {
      draft.localStorageInitialized = false;
    },
    setAllMyRequests: (draft, action: PayloadAction<PagedResult<Task>>) => {
      const { items, total } = action.payload;
      draft.total = total;
      myRequestsAdapter.setAll(draft, items);
    },
    setMyRequests: (draft, action: PayloadAction<PagedResult<Task>>) => {
      const { items, total } = action.payload;
      draft.total = total;
      myRequestsAdapter.setMany(draft, items);
    },
    updateBranchFilters: (draft, action: PayloadAction<string[]>) => {
      draft.branchIds = action.payload;
    },
    updateStatusFilters: (draft, action: PayloadAction<StatusGroup[]>) => {
      draft.statusFilters = action.payload;
    }
  }
});

export const getMyRequestsList = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const state = getState();
  const page = selectCurrentPage(state);
  const size = selectPageSize(state);
  const statusFilters = selectStatusFilters(state);
  const branchIds = selectBranchFilters(state);
  const requestData: MyRequestPageRequestType = {
    branchIds,
    page,
    size,
    statusFilters
  };
  const requestBuilder = () =>
    axios.post<PagedResult<Task>>('/gw/tasks/my-request-list', requestData);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(myRequestsSlice.actions.setMyRequests(data));
};

export const fetchAllDiscoveredMyRequests =
  (): AppThunk<Promise<void>> => async (dispatch, getState) => {
    const state = getState();
    const page = selectCurrentPage(state);
    const size = selectPageSize(state);
    const branchIds = selectBranchFilters(state);
    const statusFilters = selectStatusFilters(state);
    const requestData: MyRequestPageRequestType = {
      branchIds,
      page: 1,
      size: page * size,
      statusFilters
    };
    const requestBuilder = () =>
      axios.post<PagedResult<Task>>('/gw/tasks/my-request-list', requestData);
    const data = await dispatch(apiCaller(requestBuilder));
    dispatch(myRequestsSlice.actions.setAllMyRequests(data));
  };

export const resolveMyRequest =
  (id: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.put(`breakdown/breakdowns/${id}/resolve`);
    await dispatch(apiCaller(requestBuilder));
    await dispatch(fetchAllDiscoveredMyRequests());
    dispatch(showUpdateSuccessSnackbar());
  };

export const loadMyRequestFilterFromLocalStorage = (): AppThunk<void> => (dispatch, getState) => {
  const branchList = selectAllBranchIds(getState());
  const statusList = statusGroups;
  const myRequestFilterStorage = loadFromLocalStorage(MYREQUESTLIST);

  const checkBranchIdsIsArray = Array.isArray(myRequestFilterStorage?.branchIds);
  const checkStatusFiltersIsArray = Array.isArray(myRequestFilterStorage?.statusFilters);

  let { statusFilters } = defaultState;
  let { branchIds } = defaultState;

  if (checkBranchIdsIsArray) {
    branchIds = myRequestFilterStorage?.branchIds.filter((branchId: string) =>
      branchList.includes(branchId)
    );
  }

  if (checkStatusFiltersIsArray) {
    statusFilters = myRequestFilterStorage?.statusFilters.filter((status: StatusGroup) =>
      statusList.includes(status)
    );
  }

  dispatch(initFromLocalStorage({ ...myRequestFilterStorage, branchIds, statusFilters }));
};

export const selectMyRequestList = (state: RootState) => state.tasks.myRequestsList;
export const selectTotalNumber = (state: RootState) => state.tasks.myRequestsList.total;
export const selectCurrentPage = (state: RootState) => state.tasks.myRequestsList.page;
export const selectPageSize = (state: RootState) => state.tasks.myRequestsList.size;
export const selectStatusFilters = (state: RootState) => state.tasks.myRequestsList.statusFilters;
export const selectBranchFilters = (state: RootState) => state.tasks.myRequestsList.branchIds;
export const selectLocalStorageInitialized = (state: RootState) =>
  state.tasks.myRequestsList.localStorageInitialized;

export const {
  selectAll: selectAllMyRequests,
  selectById: selectMyRequestsById,
  selectIds: selectAllMyRequestsIds,
  selectEntities
} = myRequestsAdapter.getSelectors<RootState>((state) => state.tasks.myRequestsList);

export default myRequestsSlice.reducer;
export const {
  clear,
  clearFilters,
  incrementPage,
  initFromLocalStorage,
  resetLocalStorageStatus,
  updateStatusFilters,
  updateBranchFilters
} = myRequestsSlice.actions;
