import { RootState } from 'RootTypes';

export const selectCategoryImport = (state: RootState) => state.categoryImports.categoryImport;

export const selectCategoryImportDialogOpen = (state: RootState) =>
  state.categoryImports.dialogOpen;
