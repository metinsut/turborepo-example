import { RootState } from 'RootTypes';
import { createSelector } from 'reselect';
import { locationLevelsAdapter } from './slice';

export const {
  selectAll: selectAllLocationLevels,
  selectById: selectLocationLevelById,
  selectIds: selectAllLocationLevelIds,
  selectEntities
} = locationLevelsAdapter.getSelectors<RootState>((state) => state.locationLevels);

export const selectDisplayedLocationLevelIds = (state: RootState) =>
  state.locationLevels.displayedIds;

export const selectDisplayedLocationLevels = createSelector(
  selectAllLocationLevels,
  selectDisplayedLocationLevelIds,
  (allLevels, allDisplayedIds) => allLevels.filter((level) => allDisplayedIds.includes(level.id))
);

export const selectDisplayedLocationLevelIndex = (state: RootState, locationLevelId: string) =>
  state.locationLevels.displayedIds.findIndex((i) => i === locationLevelId);

export const selectDisplayedParentLocationLevelId = createSelector(
  selectDisplayedLocationLevelIndex,
  selectDisplayedLocationLevelIds,
  (childIndex, allDisplayedIds) => (childIndex > 0 ? allDisplayedIds[childIndex - 1] : null)
);

export const selectDisplayedChildLocationLevelId = createSelector(
  selectDisplayedLocationLevelIndex,
  selectDisplayedLocationLevelIds,
  (parentIndex, allDisplayedIds) => {
    if (parentIndex === -1 || parentIndex === allDisplayedIds.length - 1) {
      return null;
    }
    return allDisplayedIds[parentIndex + 1];
  }
);
