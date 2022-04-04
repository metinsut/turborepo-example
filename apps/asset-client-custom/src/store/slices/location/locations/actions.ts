import { AppThunk } from 'RootTypes';
import { BranchLocationCode, Location } from './types';
import { CheckboxState, apiCaller } from 'store/common';
import {
  check,
  checkMultiple,
  clearDraft,
  collapse,
  deleteLocation,
  deleteLocations,
  expand,
  removeLocationIdFromDisplayedIds,
  setDisplayedLocationIds,
  setDraftLocation,
  upsertBranchLocationCode,
  upsertLocation,
  upsertLocations
} from './slice';
import {
  selectAreAllLocationsCheckedByParentId,
  selectBranchLocationCodeType,
  selectCheckedLocationIdsByParentId,
  selectDisplayedLocationIdsByParentId,
  selectIndeterminateLocationIdsByParentId,
  selectLocationById,
  selectLocationChecked
} from './selectors';
import axios from 'utils/axiosUtils';

export const getBranchLocationCodeType =
  (branchId: string): AppThunk<Promise<BranchLocationCode>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<BranchLocationCode>(`location/branchlocationcodetypes/branch/${branchId}`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertBranchLocationCode(data));
    return data;
  };

export const updateBranchLocationCodeType =
  (branchLocationCode: BranchLocationCode): AppThunk<Promise<BranchLocationCode>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post<BranchLocationCode>(
        'location/branchlocationcodetypes/add-or-update',
        branchLocationCode
      );
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertBranchLocationCode(data));
    return data;
  };

export const saveLocation =
  (location: Location): AppThunk<Promise<Location>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<Location>('location/locations', location);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocation(data));
    dispatch(clearDraft());
    return data;
  };

export const updateLocation =
  (location: Location): AppThunk<Promise<Location>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.put<Location>(`location/locations/${location.id}`, location);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocation(data));
    dispatch(setDraftLocation(data));
    return data;
  };

export const getLocationById =
  (locationId: string): AppThunk<Promise<Location>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<Location>(`location/locations/${locationId}/detail`);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocation(data));
    dispatch(setDraftLocation(data));
    return data;
  };

export const getLocationFullPath =
  (locationId: string): AppThunk<Promise<string[]>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<string[]>(`location/locations/${locationId}/full-path`);
    const data = await dispatch(apiCaller(requestBuilder));
    return data;
  };

export const getLocations =
  (parentLocationId: string): AppThunk<Promise<Location[]>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const selectedBranchLocation = selectBranchLocationCodeType(currentState);
    let query = `location/locations/branch/${selectedBranchLocation.branchId}`;
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

    const isParentChecked = selectLocationChecked(currentState, parentLocationId);
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

export const expandLocation =
  (location: Location, isExpand: boolean): AppThunk =>
  async (dispatch) => {
    if (isExpand) {
      dispatch(expand(location));
    } else {
      dispatch(collapse(location));
    }
  };

export const checkLocationName =
  (locationName: string, branchId: string, parentId: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    let params = {};
    if (parentId) {
      params = { locationName, parentId };
    } else {
      params = { locationName };
    }

    const requestBuilder = () =>
      axios.get<boolean>(`location/locations/branch/${branchId}/check-location-name`, {
        params
      });
    const response = await dispatch(apiCaller(requestBuilder));
    return response;
  };

export const checkLocationCode =
  (locationCode: string, branchId: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<boolean>(`location/locations/branch/${branchId}/check-location-code`, {
        params: {
          locationCode
        }
      });
    const response = await dispatch(apiCaller(requestBuilder));
    return response;
  };

export const checkAllLocationsUnderParentLocation =
  (parentLocationId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const isAllChecked = selectAreAllLocationsCheckedByParentId(currentState, parentLocationId);

    const allLocationIds = selectDisplayedLocationIdsByParentId(currentState, parentLocationId);

    allLocationIds.forEach((id) => {
      const location = selectLocationById(currentState, id);
      const newCheckStatus = !isAllChecked;

      dispatch(checkLocation(location, newCheckStatus));
    });
  };

export const removeLocation =
  (id: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const location = selectLocationById(currentState, id);

    const requestBuilder = () => axios.delete<Location>(`location/locations/${location.id}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(
      removeLocationIdFromDisplayedIds({
        childId: location.id,
        parentId: location.parentLocationId
      })
    );
    dispatch(deleteLocation(location.id));
  };

export const removeLocations =
  (parentLocationId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const checkedLocationIds = selectCheckedLocationIdsByParentId(currentState, parentLocationId);

    const requestBuilder = () =>
      axios.delete<Location>('location/locations/bulk-delete', {
        data: checkedLocationIds
      });
    await dispatch(apiCaller(requestBuilder));

    checkedLocationIds.forEach((id) => {
      dispatch(
        removeLocationIdFromDisplayedIds({
          childId: id,
          parentId: parentLocationId
        })
      );
    });

    dispatch(deleteLocations(checkedLocationIds));
  };

export const checkLocation =
  (location: Location, checkTo?: CheckboxState): AppThunk =>
  async (dispatch, getState) => {
    let checkboxState: CheckboxState = false;
    const state = getState();

    if (checkTo) {
      checkboxState = checkTo;
    } else if (selectLocationChecked(state, location.id) !== true) {
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
      let parentCheckboxState: CheckboxState = false;

      switch (checkedIds.length) {
        case 0:
          if (indeterminateIds.length > 0) {
            parentCheckboxState = 'indeterminate';
          } else {
            parentCheckboxState = false;
          }
          break;
        case childrenIds.length:
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
