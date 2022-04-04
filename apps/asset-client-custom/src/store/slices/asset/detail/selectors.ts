import { RootState } from 'RootTypes';
import { SectionTypes } from 'store/slices/assetConfiguration/forms/types';
import { assetsAdapter } from './slice';

export const {
  selectAll: selectAllAssets,
  selectById: selectAssetsById,
  selectIds: selectAllAssetIds
} = assetsAdapter.getSelectors<RootState>((state) => state.assets.detail);

export const selectAssetFormBranchId = (state: RootState) => state.assets.detail.assetForm.branchId;

export const selectAssetFormMainCategoryId = (state: RootState) =>
  state.assets.detail.assetForm.mainCategoryId;

export const selectInitialAssetFormBranchId = (state: RootState) =>
  state.assets.detail.initialAssetForm.branchId;

export const selectInitialAssetFormMainCategoryId = (state: RootState) =>
  state.assets.detail.initialAssetForm.mainCategoryId;
export const selectAsset = (state: RootState) => state.assets.detail.assetForm;

export const selectInitialAsset = (state: RootState) => state.assets.detail.initialAssetForm;

export const selectAssetContractIds = (state: RootState) =>
  state.assets.detail.assetForm.contractIds;

export const selectIsContractAssociatedWithAsset = (state: RootState, contractId: string) => {
  const asset = state.assets.detail.assetForm;
  return !!asset.id && asset.contractIds.includes(contractId);
};

export const selectIsPlanAssociatedWithAsset = (state: RootState, planId: string) => {
  const asset = state.assets.detail.assetForm;
  return !!asset.id && asset.planIds.includes(planId);
};

export const selectAssetFormFields = (state: RootState) =>
  state.assets.detail.assetForm.assetFormFields;

export const selectAssetFormFieldsBySection = (state: RootState, section: SectionTypes) =>
  state.assets.detail.assetForm.assetFormFields.filter((i) => i.section === section);

export const selectInitialAssetFormFieldsBySection = (state: RootState, section: SectionTypes) =>
  state.assets.detail.initialAssetForm.assetFormFields.filter((i) => i.section === section);
