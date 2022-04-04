import { AppThunk } from 'RootTypes';
import { LocationLevel } from './types';
import { apiCaller } from 'store/common';
import { getLocations } from '../locations/actions';
import { pushExpandedLocationIdWithIndex } from '../locations/slice';
import {
  removeLocationLevel,
  removeLocationLevelIdFromDisplayedIds,
  setDisplayedLocationLevelIds,
  upsertLocationLevel,
  upsertLocationLevels
} from './slice';
import { selectBranchLocationCodeType, selectExpandedIds } from '../locations/selectors';
import { selectLocationLevelById } from './selectors';
import axios from 'utils/axiosUtils';

export const getLocationLevels =
  (branchId?: string): AppThunk<Promise<LocationLevel[]>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const selectedBranchLocation = selectBranchLocationCodeType(currentState);

    const requestBuilder = () =>
      axios.get<LocationLevel[]>(
        `location/locationLevels/branch/${branchId ?? selectedBranchLocation.branchId}`
      );
    const locationLevels = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocationLevels(locationLevels));
    dispatch(
      setDisplayedLocationLevelIds(
        locationLevels.sort((a, b) => a.level - b.level).map((i) => i.id)
      )
    );
    return locationLevels;
  };

export const createLocationLevel =
  (locationLevel: LocationLevel, parentLocationLevelId: string): AppThunk<Promise<LocationLevel>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const selectedBranchLocation = selectBranchLocationCodeType(currentState);

    const locationLevelToCreate: LocationLevel = {
      branchId: selectedBranchLocation.branchId,
      parentLocationLevelId,
      ...locationLevel
    };

    const requestBuilder = () =>
      axios.post<LocationLevel>('location/locationLevels', locationLevelToCreate);
    const finalLocationLevel = await dispatch(apiCaller(requestBuilder));

    const newLocationLevelsWithOrder = await dispatch(getLocationLevels());
    const expandedLocationIds = selectExpandedIds(currentState);

    const finalLocationLevelIndex = newLocationLevelsWithOrder.findIndex(
      (i) => i.id === finalLocationLevel.id
    );

    if (finalLocationLevelIndex !== -1 && finalLocationLevelIndex < expandedLocationIds.length) {
      const newEmptyLocations = await dispatch(
        getLocations(expandedLocationIds[finalLocationLevelIndex])
      );

      if (newEmptyLocations?.length > 0) {
        const newEmptyLocationId = newEmptyLocations[0].id;
        await dispatch(
          pushExpandedLocationIdWithIndex({
            index: finalLocationLevelIndex + 1,
            locationId: newEmptyLocationId
          })
        );
      }
    }

    return finalLocationLevel;
  };

export const updateLocationLevel =
  (locationLevel: LocationLevel): AppThunk<Promise<LocationLevel>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const currentLocationLevel = selectLocationLevelById(currentState, locationLevel.id);

    if (currentLocationLevel.name === locationLevel.name) {
      return currentLocationLevel;
    }

    const requestBuilder = () =>
      axios.put<LocationLevel>(`location/locationLevels/${locationLevel.id}`, locationLevel);
    const finalLocationLevel = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocationLevel(finalLocationLevel));
    return finalLocationLevel;
  };

export const deleteLocationLevel =
  (locationLevelId: string): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.delete<LocationLevel>(`location/locationLevels/${locationLevelId}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(removeLocationLevelIdFromDisplayedIds(locationLevelId));
    dispatch(removeLocationLevel(locationLevelId));
  };
