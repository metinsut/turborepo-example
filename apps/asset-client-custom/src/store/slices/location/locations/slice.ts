import { BranchLocationCode, Location } from './types';
import { CheckboxState } from 'store/common';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { locationInitialState } from './data';
import _ from 'lodash';

export const locationsAdapter = createEntityAdapter<Location>({
  sortComparer: (first, second) => first.name.localeCompare(second.name)
});

export const locationsSlice = createSlice({
  initialState: locationsAdapter.getInitialState(locationInitialState),
  name: 'locations',
  reducers: {
    addLocation: locationsAdapter.addOne,
    addLocationToDisplayedIds: (
      draft,
      action: PayloadAction<{
        parentId: string;
        childId: string;
      }>
    ) => {
      const { parentId, childId } = action.payload;
      draft.displayedLocationIds[parentId].push(childId);
    },
    check: (draft, action: PayloadAction<{ id: string; state: CheckboxState }>) => {
      const { id, state } = action.payload;
      if (action.payload.state === false) {
        delete draft.checkedLocationIds[id];
      } else {
        draft.checkedLocationIds[id] = state;
      }
    },
    checkMultiple: (
      draft,
      action: PayloadAction<{
        ids: string[];
        state: CheckboxState;
      }>
    ) => {
      const { ids, state } = action.payload;
      ids.forEach((id) => {
        draft.checkedLocationIds[id] = state;
      });
    },
    clearCheckedLocationIds: (draft) => {
      draft.checkedLocationIds = {};
    },
    clearDraft: (draft) => {
      draft.draftLocation = { ...locationInitialState.draftLocation };
    },
    clearExpandedLocationIds: (draft) => {
      draft.expandedLocationIds = [null];
    },
    collapse: (draft, action: PayloadAction<Location>) => {
      const index =
        draft.expandedLocationIds.findIndex((i) => i === action.payload.parentLocationId) + 1;

      draft.expandedLocationIds.splice(index, draft.expandedLocationIds.length - index);
    },
    deleteLocation: (draft, action: PayloadAction<string>) => {
      const id = action.payload;

      locationsAdapter.removeOne(draft, id);
      delete draft.checkedLocationIds[id];
      _.remove(draft.expandedLocationIds, (expandedId) => id === expandedId);
    },
    deleteLocations: (draft, action: PayloadAction<string[]>) => {
      const ids = action.payload;

      locationsAdapter.removeMany(draft, ids);
      ids.forEach((id) => {
        delete draft.checkedLocationIds[id];
        _.remove(draft.expandedLocationIds, (expandedId) => id === expandedId);
      });
    },
    expand: (draft, action: PayloadAction<Location>) => {
      const index =
        draft.expandedLocationIds.findIndex((i) => i === action.payload?.parentLocationId ?? null) +
        1;

      draft.expandedLocationIds.splice(
        index,
        draft.expandedLocationIds.length - index,
        action.payload?.id ?? null
      );
    },
    pushExpandedLocationIdWithIndex: (
      draft,
      action: PayloadAction<{
        locationId: string;
        index: number;
      }>
    ) => {
      const { locationId, index } = action.payload;
      draft.expandedLocationIds.splice(index, 0, locationId);
    },
    removeLocationIdFromDisplayedIds: (
      draft,
      action: PayloadAction<{
        childId: string;
        parentId: string;
      }>
    ) => {
      const { childId, parentId } = action.payload;
      const index = draft.displayedLocationIds[parentId].findIndex((i) => i === childId);
      if (index !== -1) {
        draft.displayedLocationIds[parentId].splice(index, 1);
      }
    },
    setDisplayedLocationIds: (
      draft,
      action: PayloadAction<{
        parentId: string;
        locationIds: string[];
      }>
    ) => {
      const { parentId, locationIds } = action.payload;
      draft.displayedLocationIds[parentId] = locationIds;
    },
    setDraftLocation: (draft, action: PayloadAction<Location>) => {
      draft.draftLocation = action.payload;
    },
    setExpandedLocationIds: (draft, action: PayloadAction<string[]>) => {
      draft.expandedLocationIds = action.payload;
    },
    upsertBranchLocationCode: (draft, action: PayloadAction<BranchLocationCode>) => {
      const branchLocationCode = action.payload;
      draft.branchLocationCode = branchLocationCode;
    },
    upsertLocation: locationsAdapter.upsertOne,
    upsertLocations: locationsAdapter.upsertMany
  }
});

export default locationsSlice.reducer;

export const {
  addLocationToDisplayedIds,
  check,
  checkMultiple,
  clearCheckedLocationIds,
  clearDraft,
  collapse,
  deleteLocation,
  deleteLocations,
  expand,
  pushExpandedLocationIdWithIndex,
  removeLocationIdFromDisplayedIds,
  setDisplayedLocationIds,
  setDraftLocation,
  setExpandedLocationIds,
  upsertBranchLocationCode,
  upsertLocation,
  upsertLocations
} = locationsSlice.actions;
