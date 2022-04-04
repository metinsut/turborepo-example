import { DefinitionPlanTypes, savedFilterAdapter } from './types';
import { RootState } from 'RootTypes';

export const {
  selectAll: selectAllSavedFilters,
  selectById: selectSavedFiltersById,
  selectIds: selectAllSavedFiltersIds,
  selectEntities
} = savedFilterAdapter.getSelectors<RootState>((state) => state.assets.filter.savedFilters);

export const selectSelectedFilterId = (state: RootState) =>
  state.assets.filter.savedFilters.savedFilterId;

export const selectDraftFilter = (state: RootState) => state.assets.filter.draftFilter;

export const selectActiveFilter = (state: RootState) => state.assets.filter.activeFilter;

// INFORMATION
export const selectActiveFilterInformationBranches = (state: RootState) =>
  state.assets.filter.activeFilter.information.branches;

export const selectDraftFilterInformationAssetCodes = (state: RootState) =>
  state.assets.filter.draftFilter.information.codes;

export const selectDraftFilterInformationCategories = (state: RootState) =>
  state.assets.filter.draftFilter.information.categories;

export const selectDraftFilterInformationCustodian = (state: RootState) =>
  state.assets.filter.draftFilter.information.custody.custodies;

export const selectDraftFilterInformationBranches = (state: RootState) =>
  state.assets.filter.draftFilter.information.branches;

export const selectDraftFilterInformationBrands = (state: RootState) =>
  state.assets.filter.draftFilter.information.brandModels.map((brandModel) => brandModel.brand);

export const selectDraftFilterInformationBrandModels = (state: RootState) =>
  state.assets.filter.draftFilter.information.brandModels;

export const selectDraftFilterInformationCreatedBy = (state: RootState) =>
  state.assets.filter.draftFilter.information.createdByUsers;

export const selectDraftFilterInformationCreatedDate = (state: RootState) =>
  state.assets.filter.draftFilter.information.createdDate;

export const selectDraftFilterInformationPurchasedDate = (state: RootState) =>
  state.assets.filter.draftFilter.information.purchasedDate;

export const selectDraftFilterInformationLocations = (state: RootState) =>
  state.assets.filter.draftFilter.information.location.locations;

export const selectDraftFilterInformationModels = (state: RootState) =>
  state.assets.filter.draftFilter.information.brandModels.reduce<string[]>(
    (modelIds, brandModel) => [...modelIds, ...brandModel.models],
    []
  );

export const selectDraftFilterInformationNoCustody = (state: RootState) =>
  state.assets.filter.draftFilter.information.custody.noCustody;

export const selectDraftFilterInformationNoLocation = (state: RootState) =>
  state.assets.filter.draftFilter.information.location.noLocation;

export const selectDraftFilterInformationNoPurchasedFirm = (state: RootState) =>
  state.assets.filter.draftFilter.information.purchasedFirm.noPurchasedFirm;

export const selectDraftFilterInformationPurchasedFirm = (state: RootState) =>
  state.assets.filter.draftFilter.information.purchasedFirm.purchasedFirms;

export const selectDraftFilterInformationStatusTypes = (state: RootState) =>
  state.assets.filter.draftFilter.information.statusTypes;

// CONTRACT
export const selectDraftFilterContractContacts = (state: RootState) =>
  state.assets.filter.draftFilter.contract.contactPerson.contactPersons;

export const selectDraftFilterContractEndDate = (state: RootState) =>
  state.assets.filter.draftFilter.contract.endDate;

export const selectDraftFilterContractTypes = (state: RootState) =>
  state.assets.filter.draftFilter.contract.types;

export const selectDraftFilterContractFirms = (state: RootState) =>
  state.assets.filter.draftFilter.contract.firm.contractFirms;

export const selectDraftFilterNoContractAssigned = (state: RootState) =>
  state.assets.filter.draftFilter.contract.noContractAssigned.noContract;

export const selectDraftFilterNoContractContact = (state: RootState) =>
  state.assets.filter.draftFilter.contract.contactPerson.noContactPerson;

export const selectDraftFilterNoContractFirm = (state: RootState) =>
  state.assets.filter.draftFilter.contract.firm.noContractFirm;

export const selectDraftFilterNoContractTypes = (state: RootState) =>
  state.assets.filter.draftFilter.contract.noContractAssigned.contractTypes;

export const selectDraftFilterContractPartsPolicy = (state: RootState) =>
  state.assets.filter.draftFilter.contract.partPolicyTypes;

// DEFINITIONS
export const selectDraftFilterDefinitionsDoesNotNeedPlan = (
  state: RootState,
  key: DefinitionPlanTypes
) => state.assets.filter.draftFilter.definition[key].doesNotNeedPlan;

export const selectDraftFilterDefinitionsEndDate = (state: RootState, key: DefinitionPlanTypes) =>
  state.assets.filter.draftFilter.definition[key].endDate;

export const selectDraftFilterDefinitionsNoPlan = (state: RootState, key: DefinitionPlanTypes) =>
  state.assets.filter.draftFilter.definition[key].noPlan;

export const selectDraftFilterDefinitionsTitle = (state: RootState, key: DefinitionPlanTypes) =>
  state.assets.filter.draftFilter.definition[key].title;

// OTHERS
export const selectSelectableModelWithBrands = (state: RootState) =>
  state.assets.filter.selectableFilterModelWithBrand;

export const selectSelectableModelWithId = (state: RootState, id: string) => {
  const selectableModelsWithBrands = state.assets.filter.selectableFilterModelWithBrand;
  const modelWithBrand = selectableModelsWithBrands.find(
    (modelWithBrand) => modelWithBrand.id === id
  );
  return modelWithBrand.name;
};
