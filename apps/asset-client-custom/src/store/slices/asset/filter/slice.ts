import {
  AssetFilter,
  AssetFilterBrandModel,
  DefinitionPlanTypes,
  FilterModelWithBrand,
  SavedFilter,
  savedFilterAdapter
} from './types';
import { AssetStatus } from 'store/slices/common/types';
import { DateFilterType } from 'components/DateFilter/types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { assetFilterInitialState, emptyFilter, emptyPlanDefinitionsFilter } from './data';
import { dequal } from 'dequal';

export const assetFilterAdapter = createEntityAdapter<AssetFilter>();
export const assetFilterSlice = createSlice({
  initialState: assetFilterAdapter.getInitialState(assetFilterInitialState),
  name: 'assetFilter',
  reducers: {
    changeSelectedFilter: (draft, action: PayloadAction<string>) => {
      const id = action.payload;
      draft.savedFilters.savedFilterId = id;
      if (id) {
        const { filter } = draft.savedFilters.entities[id];
        draft.draftFilter = { ...filter };
      }
    },
    clearActiveFilter: (draft) => {
      draft.activeFilter = emptyFilter;
      draft.draftFilter = emptyFilter;
    },
    clearFilter: (draft) => {
      draft.draftFilter = emptyFilter;
    },
    removeBranch: (draft, action: PayloadAction<string>) => {
      const branch = action.payload;
      const hasBranch = draft.activeFilter.information.branches.includes(branch);
      if (hasBranch) {
        const index = draft.activeFilter.information.branches.findIndex((item) => item === branch);
        draft.activeFilter.information.branches.splice(index, 1);
        draft.draftFilter.information.branches.splice(index, 1);
      }
    },
    removeContractEndDate: (draft) => {
      draft.draftFilter.contract.endDate = emptyFilter.contract.endDate;
      draft.activeFilter.contract.endDate = emptyFilter.contract.endDate;
    },
    removeContractFirm: (draft, action: PayloadAction<string>) => {
      const firm = action.payload;
      const firmIndex = draft.draftFilter.contract.firm.contractFirms.findIndex(
        (firmItem) => firmItem === firm
      );
      draft.draftFilter.contract.firm.contractFirms.splice(firmIndex, 1);
      draft.activeFilter.contract.firm.contractFirms.splice(firmIndex, 1);
    },
    removeContractFirmNotAssigned: (draft) => {
      const noFirmValue = draft.activeFilter.contract.firm.noContractFirm;
      draft.draftFilter.contract.firm.noContractFirm = !noFirmValue;
      draft.activeFilter.contract.firm.noContractFirm = !noFirmValue;
    },
    removeContractPerson: (draft, action: PayloadAction<string>) => {
      const person = action.payload;
      const personIndex = draft.activeFilter.contract.contactPerson.contactPersons.findIndex(
        (personItem) => personItem === person
      );
      draft.draftFilter.contract.contactPerson.contactPersons.splice(personIndex, 1);
      draft.activeFilter.contract.contactPerson.contactPersons.splice(personIndex, 1);
    },
    removeContractPersonNotAssigned: (draft) => {
      const noPersonValue = draft.activeFilter.contract.contactPerson.noContactPerson;
      draft.draftFilter.contract.contactPerson.noContactPerson = !noPersonValue;
      draft.activeFilter.contract.contactPerson.noContactPerson = !noPersonValue;
    },
    removeContractType: (draft, action: PayloadAction<string>) => {
      const contractType = action.payload;
      const contractTypeIndex = draft.draftFilter.contract.types.findIndex(
        (type) => type === contractType
      );
      draft.draftFilter.contract.types.splice(contractTypeIndex, 1);
      draft.activeFilter.contract.types.splice(contractTypeIndex, 1);
    },
    removeDefinitionDoesNotNeedPlan: (draft, action: PayloadAction<DefinitionPlanTypes>) => {
      const planType = action.payload;
      draft.draftFilter.definition[planType].doesNotNeedPlan =
        emptyPlanDefinitionsFilter.doesNotNeedPlan;
      draft.activeFilter.definition[planType].doesNotNeedPlan =
        emptyPlanDefinitionsFilter.doesNotNeedPlan;
    },
    removeDefinitionEndDate: (draft, action: PayloadAction<DefinitionPlanTypes>) => {
      const planType = action.payload;
      draft.draftFilter.definition[planType].endDate = emptyPlanDefinitionsFilter.endDate;
      draft.activeFilter.definition[planType].endDate = emptyPlanDefinitionsFilter.endDate;
    },
    removeDefinitionNoPlan: (draft, action: PayloadAction<DefinitionPlanTypes>) => {
      const planType = action.payload;
      draft.draftFilter.definition[planType].noPlan = emptyPlanDefinitionsFilter.noPlan;
      draft.activeFilter.definition[planType].noPlan = emptyPlanDefinitionsFilter.noPlan;
    },
    removeInformationBrand: (draft, action: PayloadAction<string>) => {
      const brandId = action.payload;
      const brandModelIndex = draft.draftFilter.information.brandModels.findIndex(
        (brandModel) => brandModel.brand === brandId
      );
      draft.draftFilter.information.brandModels.splice(brandModelIndex, 1);
      draft.activeFilter.information.brandModels.splice(brandModelIndex, 1);
    },
    removeInformationCategory: (draft, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const categoryIndex = draft.draftFilter.information.categories.findIndex(
        (category) => category === categoryId
      );
      draft.draftFilter.information.categories.splice(categoryIndex, 1);
      draft.activeFilter.information.categories.splice(categoryIndex, 1);
    },
    removeInformationCode: (draft, action: PayloadAction<string>) => {
      const code = action.payload;
      const codeIndex = draft.draftFilter.information.codes.findIndex(
        (codeItem) => codeItem === code
      );
      draft.draftFilter.information.codes.splice(codeIndex, 1);
      draft.activeFilter.information.codes.splice(codeIndex, 1);
    },
    removeInformationCreatedBy: (draft, action: PayloadAction<string>) => {
      const createdById = action.payload;
      const createdByIndex = draft.draftFilter.information.createdByUsers.findIndex(
        (createdByItem) => createdByItem === createdById
      );
      draft.draftFilter.information.createdByUsers.splice(createdByIndex, 1);
      draft.activeFilter.information.createdByUsers.splice(createdByIndex, 1);
    },
    removeInformationCreatedDate: (draft) => {
      draft.draftFilter.information.createdDate = emptyFilter.information.createdDate;
      draft.activeFilter.information.createdDate = emptyFilter.information.createdDate;
    },
    removeInformationCustody: (draft, action: PayloadAction<string>) => {
      const custodyId = action.payload;
      const custodianIndex = draft.draftFilter.information.custody.custodies.findIndex(
        (custodianIndex) => custodianIndex === custodyId
      );
      draft.draftFilter.information.custody.custodies.splice(custodianIndex, 1);
      draft.activeFilter.information.custody.custodies.splice(custodianIndex, 1);
    },
    removeInformationCustodyNotAssigned: (draft) => {
      const noCustodyValue = draft.activeFilter.information.custody.noCustody;
      draft.draftFilter.information.custody.noCustody = !noCustodyValue;
      draft.activeFilter.information.custody.noCustody = !noCustodyValue;
    },
    removeInformationLocation: (draft, action: PayloadAction<string>) => {
      const locationId = action.payload;
      const locationIndex = draft.draftFilter.information.location.locations.findIndex(
        (locationItem) => locationItem === locationId
      );
      draft.draftFilter.information.location.locations.splice(locationIndex, 1);
      draft.activeFilter.information.location.locations.splice(locationIndex, 1);
    },
    removeInformationLocationNotAssigned: (draft) => {
      const noLocationValue = draft.activeFilter.information.location.noLocation;
      draft.draftFilter.information.location.noLocation = !noLocationValue;
      draft.activeFilter.information.location.noLocation = !noLocationValue;
    },
    removeInformationModel: (
      draft,
      action: PayloadAction<{ modelId: string; brandId: string }>
    ) => {
      const { modelId } = action.payload;
      const { brandId } = action.payload;
      const brandModelIndex = draft.draftFilter.information.brandModels.findIndex(
        (brandModel) => brandModel.brand === brandId
      );
      const brandModel = draft.draftFilter.information.brandModels[brandModelIndex];
      const modelIndex = brandModel.models.findIndex((model) => model === modelId);
      if (modelIndex !== -1) {
        brandModel.models.splice(modelIndex, 1);
        draft.activeFilter.information.brandModels[brandModelIndex].models.splice(modelIndex, 1);
      }
    },
    removeInformationPurchasedDate: (draft) => {
      draft.draftFilter.information.purchasedDate = emptyFilter.information.purchasedDate;
      draft.activeFilter.information.purchasedDate = emptyFilter.information.purchasedDate;
    },
    removeInformationPurchasedFirm: (draft, action: PayloadAction<string>) => {
      const firm = action.payload;
      const firmIndex = draft.draftFilter.information.purchasedFirm.purchasedFirms.findIndex(
        (firmItem) => firmItem === firm
      );
      draft.draftFilter.information.purchasedFirm.purchasedFirms.splice(firmIndex, 1);
      draft.activeFilter.information.purchasedFirm.purchasedFirms.splice(firmIndex, 1);
    },
    removeInformationPurchasedFirmNotAssigned: (draft) => {
      const noFirmValue = draft.activeFilter.information.purchasedFirm.noPurchasedFirm;
      draft.draftFilter.information.purchasedFirm.noPurchasedFirm = !noFirmValue;
      draft.activeFilter.information.purchasedFirm.noPurchasedFirm = !noFirmValue;
    },
    removeInformationStatus: (draft, action: PayloadAction<AssetStatus>) => {
      const statusType = action.payload;
      const statusTypeIndex = draft.activeFilter.information.statusTypes.findIndex(
        (type) => type === statusType
      );
      if (statusTypeIndex === -1) {
        draft.draftFilter.information.statusTypes.push(statusType);
        draft.activeFilter.information.statusTypes.push(statusType);
      } else {
        draft.draftFilter.information.statusTypes.splice(statusTypeIndex, 1);
        draft.activeFilter.information.statusTypes.splice(statusTypeIndex, 1);
      }

      const sortedTypes = [...draft.activeFilter.information.statusTypes].sort();
      const sortedDefaultTypes = [...emptyFilter.information.statusTypes].sort();
      if (dequal(sortedTypes, sortedDefaultTypes)) {
        draft.activeFilter.information.statusTypes = emptyFilter.information.statusTypes;
      }
    },
    removeNoContractTypes: (draft) => {
      const emptyContractTypes = emptyFilter.contract.noContractAssigned.contractTypes;
      const emptyContractNotAssigned = emptyFilter.contract.noContractAssigned.noContract;

      draft.draftFilter.contract.noContractAssigned.contractTypes = emptyContractTypes;
      draft.activeFilter.contract.noContractAssigned.contractTypes = emptyContractTypes;

      draft.draftFilter.contract.noContractAssigned.noContract = emptyContractNotAssigned;
      draft.activeFilter.contract.noContractAssigned.noContract = emptyContractNotAssigned;
    },
    removePartsPolicy: (draft, action: PayloadAction<string>) => {
      const partsPolicy = action.payload;
      const policyIndex = draft.draftFilter.contract.partPolicyTypes.findIndex(
        (policy) => policy === partsPolicy
      );
      draft.draftFilter.contract.partPolicyTypes.splice(policyIndex, 1);
      draft.activeFilter.contract.partPolicyTypes.splice(policyIndex, 1);
    },
    removeSelectedSavedFilter: (draft) => {
      delete draft.savedFilters.savedFilterId;
    },
    setAllFilterBranchIds: (draft, action: PayloadAction<string[]>) => {
      draft.activeFilter.information.branches = action.payload;
      draft.draftFilter.information.branches = action.payload;
    },
    setAllSavedFilters: (draft, action: PayloadAction<SavedFilter[]>) => {
      savedFilterAdapter.setAll(draft.savedFilters, action.payload);
    },
    setDraftContractEmpty: (draft) => {
      draft.draftFilter.contract = emptyFilter.contract;
    },
    setDraftDefinitionEmpty: (draft, action: PayloadAction<DefinitionPlanTypes>) => {
      const planType = action.payload;
      draft.draftFilter.definition[planType].endDate = emptyPlanDefinitionsFilter.endDate;
      draft.draftFilter.definition[planType].title = emptyPlanDefinitionsFilter.title;
    },
    setDraftFilter: (draft, action: PayloadAction<AssetFilter>) => {
      draft.draftFilter = { ...action.payload };
    },
    setFilterAssetIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.codes = action.payload;
    },
    setFilterContractContacts: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.contract.contactPerson.contactPersons = action.payload;
    },
    setFilterContractEndDate: (draft, action: PayloadAction<DateFilterType>) => {
      draft.draftFilter.contract.endDate = action.payload;
    },
    setFilterContractFirms: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.contract.firm.contractFirms = action.payload;
    },
    setFilterContractTypes: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.contract.types = action.payload;
    },
    setFilterDefinitionsDoesNotNeedPlan: (
      draft,
      action: PayloadAction<{ doesNotNeed: boolean; planType: DefinitionPlanTypes }>
    ) => {
      draft.draftFilter.definition[action.payload.planType].doesNotNeedPlan =
        action.payload.doesNotNeed;
    },
    setFilterDefinitionsEndDate: (
      draft,
      action: PayloadAction<{ endDate: DateFilterType; planType: DefinitionPlanTypes }>
    ) => {
      draft.draftFilter.definition[action.payload.planType].endDate = action.payload.endDate;
    },
    setFilterDefinitionsNoPlan: (
      draft,
      action: PayloadAction<{ noPlan: boolean; planType: DefinitionPlanTypes }>
    ) => {
      draft.draftFilter.definition[action.payload.planType].noPlan = action.payload.noPlan;
    },
    setFilterDefinitionsTitle: (
      draft,
      action: PayloadAction<{ title: string[]; planType: DefinitionPlanTypes }>
    ) => {
      draft.draftFilter.definition[action.payload.planType].title = action.payload.title;
    },
    setFilterInformationBranchIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.branches = action.payload;
    },
    setFilterInformationBrandIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.brandModels = action.payload.map((id) => {
        const models: string[] =
          draft.draftFilter.information.brandModels.find((brandModel) => brandModel.brand === id)
            ?.models ?? [];

        const brandModel = {
          brand: id,
          models
        } as AssetFilterBrandModel;
        return brandModel;
      });
    },
    setFilterInformationBrandModels: (draft, action: PayloadAction<FilterModelWithBrand[]>) => {
      const draftBrandModels = draft.draftFilter.information.brandModels;
      const models = action.payload;

      for (let index = 0; index < draftBrandModels.length; index++) {
        const brandModel = draftBrandModels[index];
        const modelIds = models.filter((i) => i.brandId === brandModel.brand).map((i) => i.id);
        brandModel.models = modelIds;
      }
    },
    setFilterInformationCategoryIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.categories = action.payload;
    },
    setFilterInformationCreatedByUsers: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.createdByUsers = action.payload;
    },
    setFilterInformationCreatedDate: (draft, action: PayloadAction<DateFilterType>) => {
      draft.draftFilter.information.createdDate = action.payload;
    },
    setFilterInformationCustodies: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.custody.custodies = action.payload;
    },
    setFilterInformationLocations: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.location.locations = action.payload;
    },
    setFilterInformationNoCustody: (draft, action: PayloadAction<boolean>) => {
      draft.draftFilter.information.custody.noCustody = action.payload;
    },
    setFilterInformationNoLocation: (draft, action: PayloadAction<boolean>) => {
      draft.draftFilter.information.location.noLocation = action.payload;
    },
    setFilterInformationNoPurchasedFirm: (draft, action: PayloadAction<boolean>) => {
      draft.draftFilter.information.purchasedFirm.noPurchasedFirm = action.payload;
    },
    setFilterInformationPurchasedDate: (draft, action: PayloadAction<DateFilterType>) => {
      draft.draftFilter.information.purchasedDate = action.payload;
    },
    setFilterInformationPurchasedFirms: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.information.purchasedFirm.purchasedFirms = action.payload;
    },
    setFilterInformationStatus: (draft, action: PayloadAction<AssetStatus>) => {
      const index = draft.draftFilter.information.statusTypes.findIndex(
        (value) => value === action.payload
      );
      if (index === -1) {
        draft.draftFilter.information.statusTypes.push(action.payload);
      } else {
        draft.draftFilter.information.statusTypes.splice(index, 1);
      }
    },
    setFilterNoContractAssigned: (draft, action: PayloadAction<boolean>) => {
      draft.draftFilter.contract.noContractAssigned.noContract = action.payload;
    },
    setFilterNoContractContact: (draft, action: PayloadAction<boolean>) => {
      draft.draftFilter.contract.contactPerson.noContactPerson = action.payload;
    },
    setFilterNoContractFirm: (draft, action: PayloadAction<boolean>) => {
      draft.draftFilter.contract.firm.noContractFirm = action.payload;
    },
    setFilterNoContractTypes: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.contract.noContractAssigned.contractTypes = action.payload;
    },
    setFilterPartsPolicy: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.contract.partPolicyTypes = action.payload;
    },
    setSelectableFilterModelWithBrand: (draft, action: PayloadAction<FilterModelWithBrand[]>) => {
      draft.selectableFilterModelWithBrand = action.payload;
    },
    updateActiveFilter: (draft) => {
      draft.activeFilter = { ...draft.draftFilter };
    }
  }
});

export const {
  changeSelectedFilter,
  clearActiveFilter,
  clearFilter,
  removeInformationBrand,
  removeInformationCategory,
  removeInformationCustody,
  removeInformationCustodyNotAssigned,
  removeInformationCreatedDate,
  removeInformationPurchasedDate,
  removeInformationCode,
  removeContractEndDate,
  removeContractFirm,
  removeContractFirmNotAssigned,
  removeContractPersonNotAssigned,
  removeContractType,
  removeDefinitionDoesNotNeedPlan,
  removeDefinitionEndDate,
  removeDefinitionNoPlan,
  removeInformationCreatedBy,
  removeInformationLocation,
  removeInformationLocationNotAssigned,
  removeInformationModel,
  removeNoContractTypes,
  removePartsPolicy,
  removeInformationPurchasedFirm,
  removeInformationPurchasedFirmNotAssigned,
  removeInformationStatus,
  removeSelectedSavedFilter,
  setAllFilterBranchIds,
  setAllSavedFilters,
  setDraftContractEmpty,
  setDraftDefinitionEmpty,
  setDraftFilter,
  setFilterAssetIds,
  setFilterInformationBranchIds,
  setFilterInformationBrandIds,
  setFilterInformationCategoryIds,
  setFilterContractContacts,
  setFilterContractEndDate,
  setFilterContractFirms,
  setFilterContractTypes,
  setFilterInformationCreatedByUsers,
  setFilterInformationCustodies,
  setFilterInformationCreatedDate,
  setFilterInformationPurchasedDate,
  setFilterDefinitionsDoesNotNeedPlan,
  setFilterDefinitionsEndDate,
  setFilterDefinitionsNoPlan,
  setFilterDefinitionsTitle,
  setFilterInformationLocations,
  setFilterInformationBrandModels,
  setFilterNoContractAssigned,
  setFilterNoContractContact,
  setFilterNoContractFirm,
  setFilterNoContractTypes,
  setFilterInformationNoCustody,
  setFilterInformationNoLocation,
  setFilterInformationNoPurchasedFirm,
  setFilterPartsPolicy,
  setFilterInformationPurchasedFirms,
  setFilterInformationStatus,
  setSelectableFilterModelWithBrand,
  updateActiveFilter,
  removeBranch,
  removeContractPerson
} = assetFilterSlice.actions;

export default assetFilterSlice.reducer;
