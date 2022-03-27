import { CheckboxState } from 'store/common';
import { Location, LocationLevel } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { initialState, parentLocationIdOfRoot } from './data';

export const locationsAdapter = createEntityAdapter<Location>();

export const locationsSlice = createSlice({
  initialState: locationsAdapter.getInitialState(initialState),
  name: 'assetLocations',
  reducers: {
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
    clearExpandedLocationIds: (draft) => {
      draft.expandedLocationIds = [parentLocationIdOfRoot];
    },
    clearSelectedLocation: (draft) => {
      draft.selectedLocationId = undefined;
    },
    collapseLocation: (draft, action: PayloadAction<Location>) => {
      const index =
        draft.expandedLocationIds.findIndex((i) => i === action.payload.parentLocationId) + 1;

      draft.expandedLocationIds.splice(index, draft.expandedLocationIds.length - index);
    },
    expandLocation: (draft, action: PayloadAction<Location>) => {
      const index =
        draft.expandedLocationIds.findIndex((i) => i === action.payload.parentLocationId) + 1;

      draft.expandedLocationIds.splice(
        index,
        draft.expandedLocationIds.length - index,
        action.payload.id
      );
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
    setExpandedLocationIds: (draft, action: PayloadAction<string[]>) => {
      draft.expandedLocationIds = action.payload;
    },
    setSelectedLocationId: (draft, action: PayloadAction<string>) => {
      draft.selectedLocationId = action.payload;
    },
    updateDisplayedLocationIds: (draft, action: PayloadAction<Location[]>) => {
      const locations = action.payload;
      locations.forEach((location) => {
        const { parentLocationId, id } = location;
        if (!draft.displayedLocationIds[parentLocationId]) {
          draft.displayedLocationIds[parentLocationId] = [];
        }

        const hasId = draft.displayedLocationIds[parentLocationId].includes(id);
        if (!hasId) {
          draft.displayedLocationIds[parentLocationId].push(id);
        }
      });
    },
    upsertLocation: locationsAdapter.upsertOne,
    upsertLocationLevel: (draft, action: PayloadAction<LocationLevel>) => {
      const locationLevel = action.payload;
      const index = draft.locationLevels.findIndex((i) => i.id === locationLevel.id);

      if (index !== -1) {
        draft.locationLevels[index] = locationLevel;
      } else {
        draft.locationLevels.push(locationLevel);
      }
    },
    upsertLocations: locationsAdapter.upsertMany
  }
});

export default locationsSlice.reducer;

export const {
  check,
  checkMultiple,
  clearExpandedLocationIds,
  clearCheckedLocationIds,
  clearSelectedLocation,
  collapseLocation,
  expandLocation,
  setDisplayedLocationIds,
  setExpandedLocationIds,
  setSelectedLocationId,
  updateDisplayedLocationIds,
  upsertLocation,
  upsertLocationLevel,
  upsertLocations
} = locationsSlice.actions;
