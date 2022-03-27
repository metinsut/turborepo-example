import { RootState } from 'RootTypes';
import { locationFilterAdapter } from './slice';

export const { selectAll: selectAllFilters, selectById: selectFilterById } =
  locationFilterAdapter.getSelectors<RootState>((state) => state.locationFilter);

export const selectActiveFilter = (state: RootState) => state.locationFilter.activeFilter;

export const selectSearchResults = (state: RootState) => state.locationFilter.searchResults;

export const selectSearchResultCount = (state: RootState) =>
  state.locationFilter.searchResults.length;
