import { AssetImport, ImportStatus, assetImportInitialState } from '../types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const assetImportsSlice = createSlice({
  initialState: assetImportInitialState,
  name: 'assetImports',
  reducers: {
    getAssetImport: (draft, action: PayloadAction<AssetImport>) => {
      draft.assetImport = action.payload;
    },
    getStatus: (draft, action: PayloadAction<ImportStatus>) => {
      const categoryImportStatus = action.payload;
      if (draft.assetImport != null) {
        draft.assetImport.percentage = categoryImportStatus.percentage;
        draft.assetImport.state = categoryImportStatus.state;
      }
    },
    removeImportBranchId: (draft) => {
      delete draft.branchId;
    },
    removeImportCategoryId: (draft) => {
      delete draft.branchId;
    },
    setImportBranchId: (draft, action: PayloadAction<string>) => {
      draft.branchId = action.payload;
    },
    setImportCategoryId: (draft, action: PayloadAction<string>) => {
      draft.categoryId = action.payload;
    },
    updateAssetImportDialogOpen: (draft, action: PayloadAction<boolean>) => {
      draft.dialogOpen = action.payload;
    }
  }
});

export const {
  getAssetImport,
  getStatus,
  removeImportBranchId,
  removeImportCategoryId,
  setImportBranchId,
  setImportCategoryId,
  updateAssetImportDialogOpen
} = assetImportsSlice.actions;

export default assetImportsSlice.reducer;
