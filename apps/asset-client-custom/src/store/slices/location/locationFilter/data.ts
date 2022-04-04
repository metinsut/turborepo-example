import { LocationFilter, LocationFilterStateShape } from './types';

export const temporaryLocationId = '-1';

export const emptyFilter: LocationFilter = {
  branchId: null,
  hasNoLocationCode: false,
  hasNoLocationName: false,
  hasNoTagIdentity: false,
  id: null,
  locationCode: '',
  locationGroup: '',
  locationLevelIds: [],
  locationName: '',
  maxArea: 0,
  minArea: 0,
  name: '',
  tagIdentity: ''
};

export const locationFilterInitialState: LocationFilterStateShape = {
  activeFilter: emptyFilter,
  searchResults: []
};
