export interface LocationFilter {
  id?: string;
  branchId: string;
  name: string;
  locationName: string;
  hasNoLocationName: boolean;
  locationCode: string;
  hasNoLocationCode: boolean;
  tagIdentity: string;
  hasNoTagIdentity: boolean;
  locationLevelIds: string[];
  locationGroup: string;
  minArea: number;
  maxArea: number;
}

export type LocationFilterStateShape = {
  activeFilter: LocationFilter;
  searchResults: LocationSearchResult[];
};

export type LocationFilterItemType =
  | 'name'
  | 'code'
  | 'tagIdentity'
  | 'locationLevel'
  | 'area'
  | 'locationGroup';

export interface LocationSearchResult {
  resultLocationLevelId?: string;
  displayedIds?: { [locationLevelId: string]: string };
}
