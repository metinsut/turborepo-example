import { AppThunk, RootState } from 'RootTypes';
import { PagedResult, apiCaller } from 'store/common';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PersonFilter, StatusKeys, Task, TaskType } from '../common/type';
import { Priority } from 'store/slices/breakdown/common/types';
import {
  selectBranch,
  selectPersonnel,
  selectPriority,
  selectStatus,
  selectTaskType
} from 'store/slices/tasks/taskList/taskListFilter';
import axios from 'utils/axiosUtils';

export type TaskListState = {
  page: number;
  size: number;
  total: number;
};

export type TaskListRequestType = {
  branchIds: string[];
  priorities: Priority[];
  personnelFilters: PersonFilter[];
  taskTypes: TaskType[];
  statuses: StatusKeys[];
  page: number;
  size: number;
};

export const defaultState: TaskListState = {
  page: 1,
  size: 30,
  total: 0
};

const tasksAdapter = createEntityAdapter<Task>();

const initialState = tasksAdapter.getInitialState(defaultState);

export const tasksSlice = createSlice({
  initialState: tasksAdapter.getInitialState(initialState),
  name: 'tasks',
  reducers: {
    clear: (draft) => {
      draft.page = initialState.page;
      draft.size = initialState.size;
      draft.total = initialState.total;
      tasksAdapter.removeAll(draft);
    },
    incrementPage: (draft) => {
      draft.page += 1;
    },
    setAllTasks: (draft, action: PayloadAction<PagedResult<Task>>) => {
      const { items, total } = action.payload;
      draft.total = total;
      tasksAdapter.upsertMany(draft, items);
    },
    setTotal: (draft, action: PayloadAction<number>) => {
      draft.total = action.payload;
    }
  }
});

export const getTaskList = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const state = getState();
  const page = selectCurrentPage(state);
  const size = selectPageSize(state);
  const taskTypes = selectTaskType(state);
  const personnelFilters = selectPersonnel(state);
  const priorities = selectPriority(state);
  const statuses = selectStatus(state);
  const branchIds = selectBranch(state);

  const requestData: TaskListRequestType = {
    branchIds,
    page,
    personnelFilters,
    priorities,
    size,
    statuses,
    taskTypes
  };
  const requestBuilder = () => axios.post<PagedResult<Task>>('gw/tasks/task-list', requestData);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(tasksSlice.actions.setAllTasks(data));
};

export const selectTotalNumber = (state: RootState) => state.tasks.taskList.total;
export const selectCurrentPage = (state: RootState) => state.tasks.taskList.page;
export const selectPageSize = (state: RootState) => state.tasks.taskList.size;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectAllTaskIds,
  selectEntities
} = tasksAdapter.getSelectors<RootState>((state) => state.tasks.taskList);

export default tasksSlice.reducer;
export const { incrementPage, clear } = tasksSlice.actions;
