import { CategoryImport, ImportStatus, categoryImportInitialState } from '../types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const categoryImportsSlice = createSlice({
  initialState: categoryImportInitialState,
  name: 'categoryImports',
  reducers: {
    clearCategoryImportStatus: (draft) => {
      draft.categoryImport = null;
    },
    getCategoryImport: (draft, action: PayloadAction<CategoryImport>) => {
      draft.categoryImport = action.payload;
    },
    getStatus: (draft, action: PayloadAction<ImportStatus>) => {
      const categoryImportStatus = action.payload;
      if (draft.categoryImport != null) {
        draft.categoryImport.percentage = categoryImportStatus.percentage;
        draft.categoryImport.state = categoryImportStatus.state;
      }
    },
    updateDialogOpen: (draft, action: PayloadAction<boolean>) => {
      draft.dialogOpen = action.payload;
    }
  }
});

export const { clearCategoryImportStatus, updateDialogOpen } = categoryImportsSlice.actions;

export default categoryImportsSlice.reducer;
