import { AppThunk, RootState } from 'RootTypes';
import { PagedRequestOptions, PagedResult, apiCaller } from 'store/common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Person, SearchByBranchIdsRequest, upsertPersons } from 'store/slices/persons';
import { PersonFilter, PersonFilterType, StatusKeys, TaskType } from '../common/type';
import { Priority } from 'store/slices/breakdown/common/types';
import { TASKLIST, loadFromLocalStorage } from 'helpers/localStorage';
import { selectAllBranchIds } from 'store/slices/branches';
import { selectIsUserAuthorized } from 'store/slices/session';
import axios from 'utils/axiosUtils';

export interface TaskListFilter {
  branchIds: string[];
  personnel: PersonFilter[];
  priorities: Priority[];
  statuses: StatusKeys[];
  taskTypes: TaskType[];
  localStorageInitialized: boolean;
}

export const statusKeys: StatusKeys[] = ['open', 'inProgress', 'paused', 'closed'];
export const priorityKeys: Priority[] = ['none', 'low', 'medium', 'high'];
export const taskTypeKeys: TaskType[] = ['breakdown', 'calibration', 'maintenance', 'retirement'];
export const personFilterTypes: PersonFilterType[] = ['me', 'allMyTeam', 'specificPersons'];
export const defaultTaskListFilter: TaskListFilter = {
  branchIds: [],
  localStorageInitialized: false,
  personnel: [
    {
      type: 'me'
    },
    {
      type: 'allMyTeam'
    }
  ],
  priorities: ['none', 'low', 'medium', 'high'],
  statuses: ['open', 'inProgress', 'paused'],
  taskTypes: []
};

export const TaskListFilterSlice = createSlice({
  initialState: defaultTaskListFilter,
  name: 'taskListFilter',
  reducers: {
    clearFilters: (draft) => {
      draft.branchIds = defaultTaskListFilter.branchIds;
      draft.personnel = defaultTaskListFilter.personnel;
      draft.priorities = defaultTaskListFilter.priorities;
      draft.statuses = defaultTaskListFilter.statuses;
    },
    initFromLocalStorage: (draft, action) => {
      draft.branchIds = action.payload.branchIds;
      draft.personnel = action.payload.personnel;
      draft.priorities = action.payload.priorities;
      draft.statuses = action.payload.statuses;
      draft.taskTypes = action.payload.taskTypes;
      draft.localStorageInitialized = true;
    },
    resetLocalStorageStatus: (draft) => {
      draft.localStorageInitialized = false;
    },
    updateBranchFilters: (draft, action: PayloadAction<string[]>) => {
      draft.branchIds = action.payload;
    },
    updatePersonFilter: (draft, action: PayloadAction<PersonFilter[]>) => {
      draft.personnel = action.payload;
    },
    updatePriority: (draft, action: PayloadAction<Priority[]>) => {
      draft.priorities = action.payload;
    },
    updateStatues: (draft, action: PayloadAction<StatusKeys[]>) => {
      draft.statuses = action.payload;
    }
  }
});

export const loadTaskListFilterFromLocalStorage =
  (): AppThunk<void> => async (dispatch, getState) => {
    const branchList = selectAllBranchIds(getState());
    const personTypeList = personFilterTypes;
    const prioritiesList = priorityKeys;
    const statusList = statusKeys;
    const taskTypeList = taskTypeKeys;

    const taskListFilterStorage = loadFromLocalStorage(TASKLIST);

    const checkBranchIdsIsArray = Array.isArray(taskListFilterStorage?.branchIds);
    const checkPersonnelIsArray = Array.isArray(taskListFilterStorage?.personnel);
    const checkPrioritiesIsArray = Array.isArray(taskListFilterStorage?.priorities);
    const checkTaskTypesIsArray = Array.isArray(taskListFilterStorage?.taskTypes);
    const checkStatusesIsArray = Array.isArray(taskListFilterStorage?.statuses);

    let { branchIds, personnel, priorities, statuses, taskTypes } = defaultTaskListFilter;

    if (checkBranchIdsIsArray) {
      branchIds = taskListFilterStorage?.branchIds.filter((branchId: string) =>
        branchList.includes(branchId)
      );
    }

    if (checkPersonnelIsArray) {
      personnel = taskListFilterStorage?.personnel.filter((personnel: PersonFilter) =>
        personTypeList.includes(personnel.type)
      );

      const isUserAuthSelectPerson = selectIsUserAuthorized(
        getState(),
        'taskList_Filter_PersonSelect'
      );

      // If user not auth for select person we need to remove it from local storage
      if (!isUserAuthSelectPerson) {
        personnel = defaultTaskListFilter.personnel;
      }

      const specificPersonFilter = personnel.find((i) => i.type === 'specificPersons');

      if (specificPersonFilter) {
        const verifiedPersonnelIds = await dispatch(
          verifyLocalStoragePersonnelIds(branchIds, specificPersonFilter.personnelIds)
        );
        specificPersonFilter.personnelIds = verifiedPersonnelIds;
      }
    }

    if (checkPrioritiesIsArray) {
      priorities = taskListFilterStorage?.priorities.filter((priority: Priority) =>
        prioritiesList.includes(priority)
      );
    }

    if (checkStatusesIsArray) {
      statuses = taskListFilterStorage?.statuses.filter((status: StatusKeys) =>
        statusList.includes(status)
      );
    }

    if (checkTaskTypesIsArray) {
      taskTypes = taskListFilterStorage?.taskTypes.filter((taskType: TaskType) =>
        taskTypeList.includes(taskType)
      );
    }

    dispatch(
      initFromLocalStorage({
        ...taskListFilterStorage,
        branchIds,
        personnel,
        priorities,
        statuses,
        taskTypes
      })
    );
  };

export const verifyLocalStoragePersonnelIds =
  (branchIds: string[], personnelIds: string[]): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const options: PagedRequestOptions = {
      page: 1,
      size: 100
    };
    const result = await dispatch(searchTaskUsersByBranches(branchIds, '', options, personnelIds));

    const authorizedPersonnelIds = result.items.map((i) => i.id);
    const verifiedPersonnelIds = personnelIds.filter((i) => authorizedPersonnelIds.includes(i));
    return verifiedPersonnelIds;
  };

export const searchTaskUsersByBranches =
  (
    branchIds: string[],
    searchText: string = '',
    options: PagedRequestOptions,
    userIds: string[] = []
  ): AppThunk<Promise<PagedResult<Person>>> =>
  async (dispatch) => {
    const requestObject: SearchByBranchIdsRequest = {
      branchIds,
      fullName: searchText,
      userIds,
      ...options
    };
    const requestBuilder = () =>
      axios.post<PagedResult<Person>>(
        '/breakdown/breakdowns/users/search/by-authorizations',
        requestObject
      );
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertPersons(data.items.slice()));
    return data;
  };

export const selectTaskListFilters = (state: RootState) => state.tasks.taskListFilter;
export const selectStatus = (state: RootState) => state.tasks.taskListFilter.statuses;
export const selectBranch = (state: RootState) => state.tasks.taskListFilter.branchIds;
export const selectTaskType = (state: RootState) => state.tasks.taskListFilter.taskTypes;
export const selectPriority = (state: RootState) => state.tasks.taskListFilter.priorities;
export const selectPersonnel = (state: RootState) => state.tasks.taskListFilter.personnel;
export const selectLocalStorageInitialized = (state: RootState) =>
  state.tasks.taskListFilter.localStorageInitialized;

export default TaskListFilterSlice.reducer;
export const {
  clearFilters,
  initFromLocalStorage,
  resetLocalStorageStatus,
  updateBranchFilters,
  updatePersonFilter,
  updatePriority,
  updateStatues
} = TaskListFilterSlice.actions;
