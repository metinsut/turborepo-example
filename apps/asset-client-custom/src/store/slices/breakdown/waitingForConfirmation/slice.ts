import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Priority } from 'store/slices/breakdown/common/types';
import { WaitingForConfirmationInformation } from './types';
import { initialState } from './data';

const waitingForConfirmationSlice = createSlice({
  initialState,
  name: 'waitingForConfirmation',
  reducers: {
    clearAssignmentInformation: (draft) => {
      draft.draft.assignmentInformation = { ...initialState.draft.assignmentInformation };
    },
    clearDraftInformation: (draft) => {
      draft.draft = { ...initialState.draft };
    },
    removeAssistantPersonnelIds: (draft) => {
      draft.draft.assignmentInformation.assistantPersonnelIds = [];
    },
    removeResponsiblePersonnelId: (draft) => {
      draft.draft.assignmentInformation.responsiblePersonnelId = '';
      draft.draft.assignmentInformation.assistantPersonnelIds = [];
    },
    setAssignerNote: (draft, action: PayloadAction<string>) => {
      draft.draft.assignmentInformation.assignerNote = action.payload;
    },
    setAssistantPersonnelIds: (draft, action: PayloadAction<string[]>) => {
      draft.draft.assignmentInformation.assistantPersonnelIds = action.payload;
    },
    setDraftInformation: (draft, action: PayloadAction<WaitingForConfirmationInformation>) => {
      draft.draft = action.payload;
      draft.draft.assignmentInformation = { ...initialState.draft.assignmentInformation };
    },
    setPriority: (draft, action: PayloadAction<Priority>) => {
      draft.draft.assignmentInformation.priority = action.payload;
    },
    setResponsiblePersonnelId: (draft, action: PayloadAction<string>) => {
      const responsiblePersonnelId = action.payload;
      draft.draft.assignmentInformation.responsiblePersonnelId = responsiblePersonnelId;
      if (!responsiblePersonnelId) {
        draft.draft.assignmentInformation.assistantPersonnelIds = [];
      }
    }
  }
});

export default waitingForConfirmationSlice.reducer;

export const {
  clearAssignmentInformation,
  clearDraftInformation,
  removeAssistantPersonnelIds,
  removeResponsiblePersonnelId,
  setAssignerNote,
  setAssistantPersonnelIds,
  setDraftInformation,
  setPriority,
  setResponsiblePersonnelId
} = waitingForConfirmationSlice.actions;
