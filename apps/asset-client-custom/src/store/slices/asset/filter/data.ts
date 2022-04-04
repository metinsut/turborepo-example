import {
  AssetFilter,
  AssetFilterStateShape,
  ContractFilter,
  DefinitionPlanTypes,
  InformationFilter,
  PlanDefinitionsFilter,
  savedFilterAdapter
} from './types';

export const definitionPlanTypes: DefinitionPlanTypes[] = ['maintenance', 'calibration'];

export const emptyInformationFilter: InformationFilter = {
  branches: [],
  brandModels: [],
  categories: [],
  codes: [],
  createdByUsers: [],
  createdDate: { type: 'any' },
  custody: { custodies: [], noCustody: false },
  location: { locations: [], noLocation: false },
  productionDate: { type: 'any' },
  purchasedDate: { type: 'any' },
  purchasedFirm: { noPurchasedFirm: false, purchasedFirms: [] },
  statusTypes: []
};

export const emptyContractFilter: ContractFilter = {
  contactPerson: { contactPersons: [], noContactPerson: false },
  endDate: { type: 'any' },
  firm: { contractFirms: [], noContractFirm: false },
  noContractAssigned: { contractTypes: [], noContract: false },
  partPolicyTypes: [],
  titles: [],
  types: []
};

export const emptyPlanDefinitionsFilter: PlanDefinitionsFilter = {
  doesNotNeedPlan: false,
  endDate: {
    type: 'any'
  },
  noPlan: false,
  title: []
};

export const emptyFilter: AssetFilter = {
  contract: emptyContractFilter,
  definition: {
    calibration: emptyPlanDefinitionsFilter,
    maintenance: emptyPlanDefinitionsFilter
  },
  information: emptyInformationFilter
};

export const assetFilterInitialState: AssetFilterStateShape = {
  activeFilter: emptyFilter,
  draftFilter: emptyFilter,
  savedFilters: savedFilterAdapter.getInitialState(),
  selectableFilterModelWithBrand: []
};
