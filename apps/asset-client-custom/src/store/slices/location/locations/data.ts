import { LocationStateShape } from './types';

export const locationInitialState: LocationStateShape = {
  branchLocationCode: null,
  checkedLocationIds: {},
  displayedLocationIds: {},
  draftLocation: {},
  expandedLocationIds: [null]
};

export const maxLocationDepth = 7;
export const maxLocationNumber = 99;
