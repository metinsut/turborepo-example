import { RootState } from 'RootTypes';

export const selectAssetImport = (state: RootState) => state.assetImports.assetImport;

export const selectAssetImportDialogOpen = (state: RootState) => state.assetImports.dialogOpen;

export const selectAssetImportBranchId = (state: RootState) => state.assetImports.branchId;

export const selectAssetImportCategoryId = (state: RootState) => state.assetImports.categoryId;
