import { LocationState } from './types';

export const initialState: LocationState = {
  checkedLocationIds: {},
  displayedLocationIds: {},
  expandedLocationIds: [null],
  locationLevels: [],
  selectedLocationId: undefined
};

export const maxLocationDepth = 7;
export const maxLocationNumber = 99;
export const parentLocationIdOfRoot: string = null;
