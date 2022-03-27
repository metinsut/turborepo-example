import { CheckboxState } from 'store/common';

export interface Location {
  area?: number;
  branchId?: string;
  childLocations?: Location[];
  description?: string;
  id?: string;
  locationCode?: string;
  locationLevelId?: string;
  locationGroup?: string;
  name?: string;
  parentLocation?: Location;
  parentLocationId?: string;
  isSearchResult?: boolean;
}

export interface BranchLocationCode {
  branchId?: string;
  id?: string;
  isAutoCode?: boolean;
}

export type LocationStateShape = {
  branchLocationCode: BranchLocationCode;
  checkedLocationIds: { [id: string]: CheckboxState };
  displayedLocationIds: { [id: string]: string[] };
  draftLocation: Location;
  expandedLocationIds: string[];
  selectedLocationId?: string;
};
