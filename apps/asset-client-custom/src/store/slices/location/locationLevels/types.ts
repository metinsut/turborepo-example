export interface LocationLevel {
  branchId?: string;
  id?: string;
  level?: number;
  name?: string;
  parentLocationLevel?: LocationLevel;
  parentLocationLevelId?: string;
  systemId?: number;
}

export type LocationLevelStateShape = {
  displayedIds: string[];
};
