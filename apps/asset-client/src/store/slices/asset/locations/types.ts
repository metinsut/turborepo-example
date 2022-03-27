import { CheckboxState } from 'store/common';

export interface Location {
  id?: string;
  branchId?: string;
  name?: string;
  childLocations?: Location[];
  parentLocationId?: string;
  locationLevelId?: string;
  childLocationsCount?: number;
}

export interface LocationLevel {
  id?: string;
  name?: string;
}

export type LocationState = {
  checkedLocationIds: { [id: string]: CheckboxState };
  displayedLocationIds: { [id: string]: string[] };
  expandedLocationIds: string[];
  locationLevels: LocationLevel[];
  selectedLocationId: string;
};
