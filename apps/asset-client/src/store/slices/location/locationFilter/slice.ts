import { LocationFilter, LocationFilterItemType, LocationSearchResult } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { emptyFilter, locationFilterInitialState } from './data';

export const locationFilterAdapter = createEntityAdapter<LocationFilter>({
  sortComparer: (first, second) => first.name.localeCompare(second.name)
});

export const locationFilterSlice = createSlice({
  initialState: locationFilterAdapter.getInitialState(locationFilterInitialState),
  name: 'locationFilter',
  reducers: {
    clearFilter: (draft) => {
      draft.activeFilter = emptyFilter;
    },
    removeFilterItemFromActiveFilter: (draft, action: PayloadAction<LocationFilterItemType>) => {
      switch (action.payload) {
        case 'name':
          draft.activeFilter.locationName = emptyFilter.locationName;
          draft.activeFilter.hasNoLocationName = emptyFilter.hasNoLocationName;
          break;
        case 'code':
          draft.activeFilter.locationCode = emptyFilter.locationCode;
          draft.activeFilter.hasNoLocationCode = emptyFilter.hasNoLocationCode;
          break;
        case 'tagIdentity':
          draft.activeFilter.tagIdentity = emptyFilter.tagIdentity;
          draft.activeFilter.hasNoTagIdentity = emptyFilter.hasNoTagIdentity;
          break;
        case 'locationLevel':
          draft.activeFilter.locationLevelIds = emptyFilter.locationLevelIds;
          break;
        case 'area':
          draft.activeFilter.maxArea = emptyFilter.maxArea;
          draft.activeFilter.minArea = emptyFilter.minArea;
          break;
        case 'locationGroup':
          draft.activeFilter.locationGroup = emptyFilter.locationGroup;
          break;
        default:
          break;
      }
    },
    setActiveFilter: (draft, action: PayloadAction<LocationFilter>) => {
      draft.activeFilter = action.payload;
    },
    setSearchResults: (draft, action: PayloadAction<LocationSearchResult[]>) => {
      draft.searchResults = action.payload;
    },
    upsertLocationFilter: locationFilterAdapter.upsertOne,
    upsertLocationFilters: locationFilterAdapter.upsertMany
  }
});

export const {
  clearFilter,
  removeFilterItemFromActiveFilter,
  setActiveFilter,
  setSearchResults,
  upsertLocationFilter,
  upsertLocationFilters
} = locationFilterSlice.actions;

export default locationFilterSlice.reducer;
