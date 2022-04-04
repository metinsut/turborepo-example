import { AssetInfo } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Priority, Usability } from 'store/slices/breakdown/common/types';
import { initialState } from './data';

const openBreakdownSlice = createSlice({
  initialState,
  name: 'openBreakdown',
  reducers: {
    clearOpenBreakdown: (draft) => {
      draft.draft = { ...initialState.draft };
      draft.initial = { ...initialState.initial };
    },
    removeAssistantPersonnelIds: (draft) => {
      draft.draft.assistantPersonnelIds = [];
    },
    removeLocationId: (draft) => {
      delete draft.draft.locationId;
    },
    removeResponsiblePersonnelId: (draft) => {
      draft.draft.responsiblePersonnelId = '';
      draft.draft.assistantPersonnelIds = [];
    },
    setAssetInfo: (draft, action: PayloadAction<AssetInfo>) => {
      const { id, locationId } = action.payload;
      draft.assetInfo = action.payload;

      draft.draft.assetId = id;
      draft.initial.assetId = id;

      draft.draft.locationId = locationId;
      draft.initial.locationId = locationId;
    },
    setAssistantPersonnelIds: (draft, action: PayloadAction<string[]>) => {
      draft.draft.assistantPersonnelIds = action.payload;
    },
    setDefinition: (draft, action: PayloadAction<string>) => {
      draft.draft.definition = action.payload;
    },
    setInitialRequestedPersonnelId: (draft, action: PayloadAction<string>) => {
      draft.draft.requestedPersonnelId = action.payload;
      draft.initial.requestedPersonnelId = action.payload;
    },
    setInitialResponsiblePersonnelId: (draft, action: PayloadAction<string>) => {
      draft.draft.responsiblePersonnelId = action.payload;
      draft.initial.responsiblePersonnelId = action.payload;
    },
    setLocationId: (draft, action: PayloadAction<string>) => {
      draft.draft.locationId = action.payload;
    },
    setPriority: (draft, action: PayloadAction<Priority>) => {
      draft.draft.priority = action.payload;
    },
    setRequestedPersonnelId: (draft, action: PayloadAction<string>) => {
      draft.draft.requestedPersonnelId = action.payload;
    },
    setResponsiblePersonnelId: (draft, action: PayloadAction<string>) => {
      const responsiblePersonnelId = action.payload;
      draft.draft.responsiblePersonnelId = responsiblePersonnelId;
      if (!responsiblePersonnelId) {
        draft.draft.assistantPersonnelIds = [];
      }
    },
    setUsability: (draft, action: PayloadAction<Usability>) => {
      draft.draft.usability = action.payload;
    },
    setUserAuth: (draft, action: PayloadAction<boolean>) => {
      draft.isUserAuthorized = action.payload;
    }
  }
});

export default openBreakdownSlice.reducer;

export const {
  clearOpenBreakdown,
  setAssetInfo,
  setDefinition,
  setLocationId,
  setInitialRequestedPersonnelId,
  setInitialResponsiblePersonnelId,
  setUsability,
  setPriority,
  setAssistantPersonnelIds,
  setResponsiblePersonnelId,
  removeResponsiblePersonnelId,
  removeAssistantPersonnelIds,
  setRequestedPersonnelId,
  removeLocationId,
  setUserAuth
} = openBreakdownSlice.actions;
