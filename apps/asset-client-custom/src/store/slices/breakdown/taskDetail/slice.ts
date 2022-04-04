import { BreakdownCost } from '../common/types';
import { History, TaskDetailInformation } from './types';
import { PagedResult } from 'store/common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Person } from 'store/slices/persons';
import { StatusKeys } from 'store/slices/tasks/common/type';
import { Substatus } from 'store/slices/taskConfiguration/breakdown/breakdownStatuses';
import { Usability } from 'store/slices/breakdown/common/types';
import { initialState } from './data';

const taskDetailSlice = createSlice({
  initialState,
  name: 'taskDetail',
  reducers: {
    clearDraft: (draft) => {
      draft.draft = { ...initialState.draft };
    },
    setAssignment: (
      draft,
      action: PayloadAction<{
        assistantPersonnels: Person[];
        responsiblePersonnel: Person;
      }>
    ) => {
      draft.draft.taskStatusInformation.assistantPersonnels = action.payload.assistantPersonnels;
      draft.draft.taskStatusInformation.responsiblePerson = action.payload.responsiblePersonnel;
    },
    setBreakdownCosts: (draft, action: PayloadAction<BreakdownCost[]>) => {
      draft.draft.breakdownInformation.breakdownCosts = action.payload;
    },
    setDraft: (draft, action: PayloadAction<TaskDetailInformation>) => {
      draft.draft = {
        ...draft.draft,
        ...action.payload
      };
    },
    setTaskHistory: (draft, action: PayloadAction<PagedResult<History>>) => {
      draft.draft.history = action.payload;
    },
    setTaskHistoryCurrentPage: (draft, action: PayloadAction<number>) => {
      draft.draft.history.currentPage = action.payload;
    },
    setTaskStatus: (
      draft,
      action: PayloadAction<{
        status: StatusKeys;
        substatus: Substatus;
      }>
    ) => {
      const { status, substatus } = action.payload;
      draft.draft.taskStatusInformation.status = status;
      draft.draft.taskStatusInformation.substatusId = substatus?.id ?? undefined;
      draft.draft.taskStatusInformation.substatus = substatus?.name ?? undefined;
    },
    setUsability: (draft, action: PayloadAction<Usability>) => {
      draft.draft.breakdownInformation.usability = action.payload;
    },
    updateType: (
      draft,
      action: PayloadAction<{ breakdownTypeId: string; breakdownType: string }>
    ) => {
      draft.draft.breakdownInformation.breakdownType = action.payload.breakdownType;
      draft.draft.breakdownInformation.breakdownTypeId = action.payload.breakdownTypeId;
    }
  }
});

export default taskDetailSlice.reducer;

export const {
  clearDraft,
  setAssignment,
  setBreakdownCosts,
  setDraft,
  setTaskHistory,
  setTaskHistoryCurrentPage,
  setTaskStatus,
  setUsability,
  updateType
} = taskDetailSlice.actions;
