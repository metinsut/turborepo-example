import { AppThunk } from 'RootTypes';
import { Location } from '../locations/types';
import { LocationFilter, LocationSearchResult } from './types';
import { apiCaller } from 'store/common';
import { getAncestorLocationsRecursively } from '../locations/actions';
import { selectActiveFilter } from './selectors';
import { selectBranchLocationCodeType } from '../locations/selectors';
import { setSearchResults, upsertLocationFilter, upsertLocationFilters } from './slice';
import { temporaryLocationId } from './data';
import { upsertLocations } from '../locations/slice';
import axios from 'utils/axiosUtils';

export const getLocationFilters =
  (): AppThunk<Promise<LocationFilter[]>> => async (dispatch, getState) => {
    const currentState = getState();
    const selectedBranchLocation = selectBranchLocationCodeType(currentState);

    const requestBuilder = () =>
      axios.get<LocationFilter[]>(
        `location/locationFilters/branch/${selectedBranchLocation.branchId}`
      );
    const locationFilters = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocationFilters(locationFilters));
    return locationFilters;
  };

export const saveLocationFilter =
  (locationFilter: LocationFilter): AppThunk<Promise<LocationFilter>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const selectedBranchLocation = selectBranchLocationCodeType(currentState);

    const locationFilterToCreate: LocationFilter = { ...locationFilter };
    locationFilterToCreate.branchId = selectedBranchLocation.branchId;
    locationFilterToCreate.id = temporaryLocationId;

    const requestBuilder = () =>
      axios.post<LocationFilter>('location/locationFilters', locationFilterToCreate);
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocationFilter(data));
    return data;
  };

export const searchLocations =
  (): AppThunk<Promise<LocationSearchResult[]>> => async (dispatch, getState) => {
    const currentState = getState();
    const selectedBranchLocation = selectBranchLocationCodeType(currentState);
    const currentSearchFilter = selectActiveFilter(currentState);

    const locationSearchFilter: LocationFilter = { ...currentSearchFilter };
    locationSearchFilter.branchId = selectedBranchLocation.branchId;
    locationSearchFilter.id = locationSearchFilter.id ?? temporaryLocationId;

    const requestBuilder = () =>
      axios.post<Location[]>('location/locationFilters/search', locationSearchFilter);
    const locations = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertLocations(locations));

    const locationSearchResults: LocationSearchResult[] = locations
      .filter((i) => i.isSearchResult)
      .map((loc) => {
        const locationSearchResult: LocationSearchResult = {
          displayedIds: {}
        };
        locationSearchResult.displayedIds[loc.locationLevelId] = loc.id;
        locationSearchResult.resultLocationLevelId = loc.locationLevelId;

        const ancestorLocations = dispatch(getAncestorLocationsRecursively(loc));
        ancestorLocations.forEach((ancestor) => {
          locationSearchResult.displayedIds[ancestor.locationLevelId] = ancestor.id;
        });

        return locationSearchResult;
      });

    dispatch(setSearchResults(locationSearchResults));

    return locationSearchResults;
  };
