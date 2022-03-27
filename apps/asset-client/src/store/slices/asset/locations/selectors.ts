import { RootState } from 'RootTypes';
import { createSelector } from '@reduxjs/toolkit';
import { locationsAdapter } from './slice';

export const {
  selectAll: selectAllLocations,
  selectById: selectLocationById,
  selectIds: selectAllLocationIds
} = locationsAdapter.getSelectors<RootState>((state) => state.assets.locations);

export const selectCheckedLocationIds = (state: RootState) =>
  state.assets.locations.checkedLocationIds;

export const selectLocationIdsByParentId = createSelector(
  selectAllLocations,
  (state: RootState, parentId: string) => parentId,
  (allLocations, parentId) =>
    allLocations.filter((i) => i.parentLocationId === parentId).map((i) => i.id)
);

type BranchParentLocationIdPair = {
  branchId: string;
  parentId: string;
};

export const selectLocationIdsByParentIdAndBranchId = createSelector(
  selectAllLocations,
  (state: RootState, pair: BranchParentLocationIdPair) => pair,
  (allLocations, pair) => {
    const final = allLocations
      .filter((i) => i.parentLocationId === pair.parentId && i.branchId === pair.branchId)
      .map((i) => i.id);
    return final;
  }
);

export const isLocationChecked = createSelector(
  [selectCheckedLocationIds, (state: RootState, id: string) => id],
  (checkedIds, id) => checkedIds[id]
);

export const selectDisplayedLocationIdsByParentId = (state: RootState, parentId: string) =>
  state.assets.locations.displayedLocationIds[parentId] ?? [];

export const selectIndeterminateLocationIdsByParentId = createSelector(
  selectCheckedLocationIds,
  selectDisplayedLocationIdsByParentId,
  (checkedIds, displayedIds) => displayedIds.filter((i) => checkedIds[i] === 'indeterminate')
);

export const selectCheckedLocationIdsByParentId = createSelector(
  selectCheckedLocationIds,
  selectDisplayedLocationIdsByParentId,
  (checkedIds, displayedIds) => displayedIds.filter((i) => checkedIds[i] === true)
);

export const selectExpandedLocationIds = (state: RootState) =>
  state.assets.locations.expandedLocationIds;

export const selectLocationIsExpanded = createSelector(
  selectExpandedLocationIds,
  (state: RootState, id: string) => id,
  (expandedIds, id) => expandedIds.includes(id)
);

export const selectIsLocationSelected = (state: RootState, id: string) =>
  state.assets.locations.selectedLocationId === id;

export const selectSelectedLocationId = (state: RootState) =>
  state.assets.locations.selectedLocationId;

export const selectLocationLevel = (state: RootState, locationLevelId: string) =>
  state.assets.locations.locationLevels.find((i) => i.id === locationLevelId);

export const selectLocationsByParentId = createSelector(
  selectAllLocations,
  (state: RootState, parentId: string) => parentId,
  (allLocations, parentId) => allLocations.filter((i) => i.parentLocationId === parentId)
);

export const selectAllCheckedLocationIds = createSelector(
  [selectCheckedLocationIds],
  (checkedIds) => Object.keys(checkedIds).filter((key) => checkedIds[key] === true)
);
