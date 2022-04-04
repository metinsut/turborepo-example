import { RootState } from 'RootTypes';
import { createSelector } from '@reduxjs/toolkit';
import { locationsAdapter } from './slice';
import { selectDisplayedLocationLevelIndex } from '../locationLevels/selectors';

export const {
  selectAll: selectAllLocations,
  selectById: selectLocationById,
  selectIds: selectAllLocationIds,
  selectEntities
} = locationsAdapter.getSelectors<RootState>((state) => state.locations);

export const selectBranchLocationCodeType = (state: RootState) =>
  state.locations.branchLocationCode;

export const selectDraftLocation = (state: RootState) => state.locations.draftLocation;

export const selectExpandedIds = (state: RootState) => state.locations.expandedLocationIds;

export const selectIsLocationExpanded = createSelector(
  selectExpandedIds,
  (state: RootState, id: string) => id,
  (expandedIds, id) => expandedIds.includes(id)
);

export const selectDisplayedLocationIdsByParentId = (state: RootState, parentId: string) =>
  state.locations.displayedLocationIds[parentId] ?? [];

const selectDisplayedLocations = (state: RootState) => state.locations.displayedLocationIds;

export const selectDisplayedLocationIdsByLocationLevelId = createSelector(
  selectDisplayedLocationLevelIndex,
  selectExpandedIds,
  selectDisplayedLocations,
  (
    locationLevelIndex: number,
    allExpandedIds: string[],
    displayedLocations: {
      [id: string]: string[];
    }
  ) => {
    if (locationLevelIndex > allExpandedIds.length - 1) {
      return [];
    }

    const locationId = allExpandedIds[locationLevelIndex];
    return displayedLocations[locationId] ?? [];
  }
);

export const selectCheckedLocationIds = (state: RootState) => state.locations.checkedLocationIds;
export const selectAllCheckedLocationIds = createSelector(
  [selectCheckedLocationIds],
  (checkedIds) => Object.keys(checkedIds).filter((key) => checkedIds[key] === true)
);

export const selectLocationChecked = createSelector(
  [selectCheckedLocationIds, (state: RootState, id: string) => id],
  (checkedIds, id) => checkedIds[id]
);

export const selectCheckedLocationIdsByParentId = createSelector(
  selectCheckedLocationIds,
  selectDisplayedLocationIdsByParentId,
  (checkedIds, displayedIds) => displayedIds.filter((i) => checkedIds[i] === true)
);

export const selectIndeterminateLocationIdsByParentId = createSelector(
  selectCheckedLocationIds,
  selectDisplayedLocationIdsByParentId,
  (checkedIds, displayedIds) => displayedIds.filter((i) => checkedIds[i] === 'indeterminate')
);

export const selectAreAllLocationsCheckedByParentId = createSelector(
  selectCheckedLocationIdsByParentId,
  selectDisplayedLocationIdsByParentId,
  (checkedIds, allIds) => checkedIds.length === allIds.length
);
