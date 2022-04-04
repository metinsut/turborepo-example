import { LocationLevel } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { locationLevelInitialState } from './data';
import { numberCompare } from 'store/common';

export const locationLevelsAdapter = createEntityAdapter<LocationLevel>({
  sortComparer: (first, second) => numberCompare(first.level, second.level)
});

export const locationLevelsSlice = createSlice({
  initialState: locationLevelsAdapter.getInitialState(locationLevelInitialState),
  name: 'locationLevels',
  reducers: {
    removeLocationLevel: locationLevelsAdapter.removeOne,
    removeLocationLevelIdFromDisplayedIds: (draft, action: PayloadAction<string>) => {
      const index = draft.displayedIds.findIndex((i) => i === action.payload);
      if (index !== -1) {
        draft.displayedIds.splice(index, 1);
      }
    },
    setDisplayedLocationLevelIds: (draft, action: PayloadAction<string[]>) => {
      draft.displayedIds = action.payload;
    },
    upsertLocationLevel: locationLevelsAdapter.upsertOne,
    upsertLocationLevels: locationLevelsAdapter.upsertMany
  }
});

export default locationLevelsSlice.reducer;

export const {
  removeLocationLevel,
  removeLocationLevelIdFromDisplayedIds,
  setDisplayedLocationLevelIds,
  upsertLocationLevel,
  upsertLocationLevels
} = locationLevelsSlice.actions;
