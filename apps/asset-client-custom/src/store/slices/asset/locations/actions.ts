import { AppThunk } from 'RootTypes';
import { CheckboxState, apiCaller } from 'store/common';
import { Location, LocationLevel } from './types';
import {
  check,
  checkMultiple,
  clearSelectedLocation,
  collapseLocation,
  locationsSlice,
  setDisplayedLocationIds,
  setExpandedLocationIds,
  setSelectedLocationId,
  updateDisplayedLocationIds,
  upsertLocationLevel,
  upsertLocations
} from './slice';
import {
  isLocationChecked,
  selectCheckedLocationIdsByParentId,
  selectDisplayedLocationIdsByParentId,
  selectExpandedLocationIds,
  selectIndeterminateLocationIdsByParentId,
  selectIsLocationSelected,
  selectLocationById
} from './selectors';
import { parentLocationIdOfRoot } from './data';
import axios from 'utils/axiosUtils';

export const getLocations =
  (parentLocationId: string, branchId: string): AppThunk<Promise<Location[]>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    let query = `location/locations/branch/${branchId}`;
    if (parentLocationId) {
      query += `?parent=${parentLocationId ?? ''}`;
    }
    const requestBuilder = () => axios.get<Location[]>(query);
    const locations: Location[] = await dispatch(apiCaller(requestBuilder));
    const locationIds = locations.map((i) => i.id);

    dispatch(upsertLocations(locations));
    dispatch(
      setDisplayedLocationIds({
        locationIds,
        parentId: parentLocationId
      })
    );

    locations.forEach((location) => {
      if (location.childLocations && location.childLocations.length > 0) {
        dispatch(upsertLocations(location.childLocations));
        dispatch(
          setDisplayedLocationIds({
            locationIds: location.childLocations.map((i) => i.id),
            parentId: location.id
          })
        );
      }
    });

    const isParentChecked = isLocationChecked(currentState, parentLocationId);
    if (isParentChecked === true) {
      dispatch(
        checkMultiple({
          ids: locationIds,
          state: true
        })
      );
    }
    return locations;
  };

export const getLocationDetailFullPath =
  (locationId: string): AppThunk<Promise<Location[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<Location[]>(`location/locations/${locationId}/detail/full-path`);
    const apiLocations = await dispatch(apiCaller(requestBuilder, { autoHandleExceptions: [404] }));

    const locations = apiLocations.map((i) => convertApiLocationToLocation(i));

    dispatch(upsertLocations(locations));
    return locations;
  };

export const getLocationLevel =
  (locationLevelId: string): AppThunk<Promise<LocationLevel>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<LocationLevel>(`location/locationLevels/${locationLevelId}`);
    const locationLevel = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocationLevel(locationLevel));
    return locationLevel;
  };

export const getMultipleLocationsFullPath =
  (locationIds: string[]): AppThunk<Promise<Location[]>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post<Location[]>(`location/locations/full-paths`, locationIds);
    const apiLocations = await dispatch(apiCaller(requestBuilder));

    const locations = apiLocations.map((i) => convertApiLocationToLocation(i));

    dispatch(upsertLocations(locations));
    dispatch(updateDisplayedLocationIds(locations));
    return locations;
  };

export const expandLocation =
  (location: Location, expand: boolean): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    if (expand) {
      dispatch(locationsSlice.actions.expandLocation(location));

      if (selectIsLocationSelected(currentState, location.id)) {
        dispatch(clearSelectedLocation());
      }
    } else {
      dispatch(collapseLocation(location));
    }
  };

export const expandAllLocationTreeByLeafLocation =
  (locationId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const flattenLocationIdTreeRecursively = (nodeId: string): string[] => {
      if (!nodeId) {
        return [parentLocationIdOfRoot];
      }

      const location = { ...selectLocationById(currentState, nodeId) };

      const temp = flattenLocationIdTreeRecursively(location.parentLocationId);

      if (nodeId === locationId) {
        return temp;
      }

      return [...temp, nodeId];
    };

    const arr = flattenLocationIdTreeRecursively(locationId);
    dispatch(setExpandedLocationIds(arr));
  };

export const setSelectedLocation =
  (locationId: string): AppThunk =>
  async (dispatch, getState) => {
    if (locationId) {
      const location = selectLocationById(getState(), locationId);
      const expandedLocationIds = selectExpandedLocationIds(getState());
      if (expandedLocationIds && expandedLocationIds.length > 1) {
        dispatch(collapseLocation(location));
      }
      dispatch(setSelectedLocationId(locationId));
    } else {
      dispatch(setSelectedLocationId(undefined));
    }
  };

export const checkMultipleLocations =
  (ids: string[]): AppThunk =>
  async (dispatch, getState) => {
    dispatch(
      checkMultiple({
        ids,
        state: true
      })
    );

    const state = getState();
    ids.forEach((id) => {
      const location = selectLocationById(state, id);
      dispatch(validateAncestorsCheckboxStateRecursively(location.parentLocationId));
    });
  };

export const getGroupedCheckedLocationIds =
  (checkedLocationIds: string[]): AppThunk<string[]> =>
  (dispatch, getState) => {
    const state = getState();
    const set = new Set(checkedLocationIds);
    const groupedCheckedLocationIds: string[] = [];
    checkedLocationIds.forEach((id) => {
      const location = selectLocationById(state, id);
      if (!set.has(location.parentLocationId)) {
        groupedCheckedLocationIds.push(id);
      }
    });
    return groupedCheckedLocationIds;
  };

export const checkLocation =
  (location: Location, checkTo?: CheckboxState): AppThunk =>
  async (dispatch, getState) => {
    let checkboxState: CheckboxState = false;
    const state = getState();

    if (checkTo) {
      checkboxState = checkTo;
    } else if (isLocationChecked(state, location.id) !== true) {
      checkboxState = true;
    } else {
      checkboxState = false;
    }

    dispatch(
      check({
        id: location.id,
        state: checkboxState
      })
    );
    const childrenIds = selectDisplayedLocationIdsByParentId(state, location.id);

    dispatch(validateChildrenCheckboxStateRecursively(childrenIds, checkboxState));
    dispatch(validateAncestorsCheckboxStateRecursively(location.parentLocationId));
  };

const validateChildrenCheckboxStateRecursively =
  (childrenIds: string[], checkboxState: CheckboxState): AppThunk =>
  async (dispatch, getState) => {
    if (childrenIds.length > 0) {
      const state = getState();
      dispatch(
        checkMultiple({
          ids: childrenIds,
          state: checkboxState
        })
      );
      childrenIds.forEach((id) => {
        const subIds = selectDisplayedLocationIdsByParentId(state, id);
        dispatch(validateChildrenCheckboxStateRecursively(subIds, checkboxState));
      });
    }
  };

const validateAncestorsCheckboxStateRecursively =
  (parentLocationId: string): AppThunk =>
  async (dispatch, getState) => {
    if (parentLocationId) {
      const state = getState();
      const parentLocation = selectLocationById(state, parentLocationId);
      const childrenIds = selectDisplayedLocationIdsByParentId(state, parentLocationId);
      const checkedIds = selectCheckedLocationIdsByParentId(state, parentLocationId);
      const indeterminateIds = selectIndeterminateLocationIdsByParentId(state, parentLocationId);

      const childrenCount = parentLocation.childLocationsCount ?? childrenIds.length;
      let parentCheckboxState: CheckboxState = false;

      switch (checkedIds.length) {
        case 0:
          if (indeterminateIds.length > 0) {
            parentCheckboxState = 'indeterminate';
          } else {
            parentCheckboxState = false;
          }
          break;
        case childrenCount:
          parentCheckboxState = true;
          break;
        default:
          parentCheckboxState = 'indeterminate';
          break;
      }
      dispatch(
        check({
          id: parentLocation.id,
          state: parentCheckboxState
        })
      );
      dispatch(validateAncestorsCheckboxStateRecursively(parentLocation.parentLocationId));
    }
  };

export const getAncestorLocationsRecursively =
  (location: Location): AppThunk<Location[]> =>
  (dispatch, getState) => {
    if (location.parentLocationId) {
      const state = getState();
      const parentLocation = selectLocationById(state, location.parentLocationId);
      const ancestorLocations = dispatch(getAncestorLocationsRecursively(parentLocation));
      return [parentLocation, ...ancestorLocations];
    }
    return [];
  };

const convertApiLocationToLocation = (apiLocation: Location) => {
  const location: Location = {
    branchId: apiLocation.branchId,
    childLocationsCount: apiLocation.childLocationsCount,
    id: apiLocation.id,
    locationLevelId: apiLocation.locationLevelId,
    name: apiLocation.name,
    parentLocationId: apiLocation.parentLocationId
  };
  return location;
};
