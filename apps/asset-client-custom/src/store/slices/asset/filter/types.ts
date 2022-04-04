import { AssetStatus } from '../../common/types';
import { DateFilterType } from 'components/DateFilter/types';
import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';

export interface AssetFilter {
  information: InformationFilter;
  contract: ContractFilter;
  definition: DefinitionFilter;
}

export type InformationFilter = {
  branches: string[];
  brandModels: AssetFilterBrandModel[];
  categories: string[];
  codes: string[];
  createdByUsers: string[];
  createdDate: DateFilterType;
  custody: { custodies: string[]; noCustody: boolean };
  location: { locations: string[]; noLocation: boolean };
  productionDate: DateFilterType;
  purchasedFirm: { purchasedFirms: string[]; noPurchasedFirm: boolean };
  purchasedDate: DateFilterType;
  statusTypes: AssetStatus[];
};

export type ContractFilter = {
  contactPerson: { contactPersons: string[]; noContactPerson: boolean };
  types: string[];
  endDate: DateFilterType;
  firm: { contractFirms: string[]; noContractFirm: boolean };
  noContractAssigned: { contractTypes: string[]; noContract: boolean };
  partPolicyTypes: string[];
  titles: string[];
};

export type DefinitionFilter = {
  [planType in DefinitionPlanTypes]: PlanDefinitionsFilter;
};

export type DefinitionPlanTypes = 'maintenance' | 'calibration';

export type PlanDefinitionsFilter = {
  doesNotNeedPlan: boolean;
  endDate: DateFilterType;
  noPlan: boolean;
  title: string[];
};

export type AssetFilterBrandModel = {
  brand: string;
  models: string[];
};

export type AssetFilterStateShape = {
  activeFilter: AssetFilter;
  draftFilter: AssetFilter;
  savedFilters: SavedFilterStateShape;
  selectableFilterModelWithBrand: FilterModelWithBrand[];
};

export type ModelFilterResponse = {
  id: string;
  name: string;
  models: [
    {
      id: string;
      name: string;
      photoPath: string;
    }
  ];
};

export type FilterModelWithBrand = {
  id: string;
  name: string;
  brandId: string;
  brandName: string;
};

export type SavedAssetFilter = {
  filterName: string;
  filterId: string;
};

export const savedFilterAdapter = createEntityAdapter<SavedFilter>();

export type SavedFilterResponse = {
  id?: string;
  title: string;
  fieldCount: number;
  filterJson: string;
  createdDate?: string;
};

export type SavedFilter = {
  id?: string;
  title?: string;
  fieldCount?: number;
  filter?: AssetFilter;
  createdDate?: string;
};

export type SavedFilterStateShape = EntityState<SavedFilter> & {
  savedFilterId?: string;
};
