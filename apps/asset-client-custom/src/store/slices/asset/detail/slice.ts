import { Asset } from './types';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { initialState } from './data';

export const assetsAdapter = createEntityAdapter<Asset>({
  sortComparer: (first, second) => first.code.localeCompare(second.code)
});

const assetSlice = createSlice({
  initialState: assetsAdapter.getInitialState(initialState),
  name: 'assets',
  reducers: {
    addAsset: assetsAdapter.upsertOne,
    addContractIdToAssetForm: (draft, action: PayloadAction<string>) => {
      draft.assetForm.contractIds.push(action.payload);
    },
    assetFormFieldValueChanged: (
      draft,
      action: PayloadAction<{
        assetFormFieldId: string;
        value: string;
      }>
    ) => {
      const { assetFormFieldId, value } = action.payload;
      const formIndex = draft.assetForm.assetFormFields.findIndex(
        (i) => i.formFieldId === assetFormFieldId
      );
      if (formIndex !== -1) {
        draft.assetForm.assetFormFields[formIndex].value = value;
      }
    },
    clearAssetForm: (draft) => {
      draft.assetForm = initialState.assetForm;
      draft.initialAssetForm = initialState.assetForm;
    },
    removeAssetBranchId: (draft) => {
      delete draft.assetForm.branchId;
    },
    removeAssetCustody: (draft) => {
      delete draft.assetForm.custodyUserId;
    },
    removeAssetLocation: (draft) => {
      delete draft.assetForm.locationId;
    },
    removeContract: (draft, action: PayloadAction<string>) => {
      const contractIndex = draft.assetForm.contractIds.findIndex((c) => c === action.payload);
      if (contractIndex !== -1) {
        draft.assetForm.contractIds.splice(contractIndex, 1);
      }
    },
    removeMainCategoryId: (draft) => {
      delete draft.assetForm.mainCategoryId;
    },
    resetAssetForm: (draft) => {
      draft.assetForm = draft.initialAssetForm;
    },
    setAssetBranchId: (draft, action: PayloadAction<string>) => {
      draft.assetForm.branchId = action.payload;
    },
    setAssetCalibrationPlan: (draft, action: PayloadAction<string>) => {
      draft.assetForm.calibrationPlanId = action.payload;
    },
    setAssetCategory: (
      draft,
      action: PayloadAction<{
        categoryId: string;
        categoryBrandModelId: string;
        autoAssigned: boolean;
      }>
    ) => {
      const { autoAssigned, categoryId, categoryBrandModelId } = action.payload;
      draft.assetForm.categoryId = categoryId;
      draft.assetForm.categoryBrandModelId = categoryBrandModelId;
      draft.assetForm.isCategoryAutoAssigned = autoAssigned;
    },
    setAssetContactPerson: (draft, action: PayloadAction<string>) => {
      draft.assetForm.contactPerson = action.payload;
    },
    setAssetContractIds: (draft, action: PayloadAction<string[]>) => {
      draft.assetForm.contractIds = action.payload;
    },
    setAssetCustodyUserId: (draft, action: PayloadAction<string>) => {
      draft.assetForm.custodyUserId = action.payload;
    },
    setAssetFCode: (draft, action: PayloadAction<string>) => {
      draft.assetForm.fCode = action.payload;
    },
    setAssetForm: (draft, action: PayloadAction<Asset>) => {
      draft.assetForm = action.payload;
    },
    setAssetIsRequireCalibrationPlan: (draft, action: PayloadAction<boolean>) => {
      draft.assetForm.isRequireCalibrationPlan = action.payload;
    },
    setAssetIsRequireMaintenancePlan: (draft, action: PayloadAction<boolean>) => {
      draft.assetForm.isRequireMaintenancePlan = action.payload;
    },
    setAssetLocationId: (draft, action: PayloadAction<string>) => {
      draft.assetForm.locationId = action.payload;
    },
    setAssetMainCategoryId: (draft, action: PayloadAction<string>) => {
      draft.assetForm.mainCategoryId = action.payload;
    },
    setAssetMaintenancePlan: (draft, action: PayloadAction<string>) => {
      draft.assetForm.maintenancePlanId = action.payload;
    },
    setAssetNotes: (draft, action: PayloadAction<string>) => {
      draft.assetForm.notes = action.payload;
    },
    setAssetProductionDate: (draft, action: PayloadAction<string>) => {
      draft.assetForm.productionDate = action.payload;
    },
    setAssetPurchaseCost: (draft, action: PayloadAction<string>) => {
      draft.assetForm.purchasedCost = action.payload;
    },
    setAssetPurchasedDate: (draft, action: PayloadAction<string>) => {
      draft.assetForm.purchasedDate = action.payload;
    },
    setAssetPurchasedFirm: (draft, action: PayloadAction<string>) => {
      draft.assetForm.purchasedFirm = action.payload;
    },
    setInitialAssetBranchId: (draft, action: PayloadAction<string>) => {
      draft.assetForm.branchId = action.payload;
      draft.initialAssetForm.branchId = action.payload;
    },
    setInitialAssetContractIds: (draft, action: PayloadAction<string[]>) => {
      draft.assetForm.contractIds = action.payload;
      draft.initialAssetForm.contractIds = action.payload;
    },
    setInitialAssetForm: (draft, action: PayloadAction<Asset>) => {
      draft.initialAssetForm = action.payload;
    },
    setInitialAssetMainCategoryId: (draft, action: PayloadAction<string>) => {
      draft.assetForm.mainCategoryId = action.payload;
      draft.initialAssetForm.mainCategoryId = action.payload;
    },
    setInitialAssetPlanIds: (draft, action: PayloadAction<string[]>) => {
      draft.assetForm.planIds = action.payload;
      draft.initialAssetForm.planIds = action.payload;
    }
  }
});

export const {
  addAsset,
  addContractIdToAssetForm,
  assetFormFieldValueChanged,
  clearAssetForm,
  removeAssetBranchId,
  removeMainCategoryId,
  removeAssetCustody,
  removeAssetLocation,
  resetAssetForm,
  setAssetBranchId,
  setAssetCalibrationPlan,
  setAssetCategory,
  setAssetContactPerson,
  setAssetCustodyUserId,
  setAssetFCode,
  setAssetForm,
  setAssetLocationId,
  setAssetMaintenancePlan,
  setAssetNotes,
  setAssetProductionDate,
  setAssetPurchaseCost,
  setAssetPurchasedDate,
  setAssetPurchasedFirm,
  setAssetMainCategoryId,
  setAssetIsRequireCalibrationPlan,
  setAssetIsRequireMaintenancePlan,
  setInitialAssetContractIds,
  setInitialAssetForm,
  setInitialAssetPlanIds,
  setInitialAssetBranchId,
  setInitialAssetMainCategoryId
} = assetSlice.actions;

export default assetSlice.reducer;
