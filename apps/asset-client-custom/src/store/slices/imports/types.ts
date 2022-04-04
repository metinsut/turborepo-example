export interface CategoryImport {
  id?: string;
  type?: ImportType;
  userId?: number;
  percentage?: number;
  state?: ImportState;
  fileName?: string;
  failedEntries?: FailedEntry[];
  successEntries?: SuccessEntry[];
  totalEntryCount?: number;
  failedEntryCount?: number;
  successEntryCount?: number;
}

export interface AssetImport {
  id?: string;
  type?: ImportType;
  userId?: number;
  percentage?: number;
  state?: ImportState;
  fileName?: string;
  failedEntries?: FailedEntry[];
  successEntries?: SuccessEntry[];
  totalEntryCount?: number;
  failedEntryCount?: number;
  successEntryCount?: number;
}

export type ImportType = 'asset' | 'category' | 'none';

export type ImportState =
  | 'validationCheck'
  | 'validationCompleted'
  | 'confirmed'
  | 'finished'
  | 'cancelled';

export interface ImportStatus {
  id?: string;
  percentage?: number;
  state?: ImportState;
}

export interface UserImport {
  userId?: number;
  importId?: number;
}

export interface FailedEntry {
  rows?: number[];
  errorMessage?: string;
}

export interface SuccessEntry {
  type?: string;
  count?: number;
  brandId?: string;
  modelId?: string;
  categoryId?: string;
}

export type CategoryImportState = {
  categoryImport: CategoryImport;
  dialogOpen: boolean;
};

export const categoryImportInitialState: CategoryImportState = {
  categoryImport: null,
  dialogOpen: false
};

export type AssetImportState = {
  assetImport: AssetImport;
  branchId: string;
  categoryId: string;
  dialogOpen: boolean;
};

export const assetImportInitialState: AssetImportState = {
  assetImport: null,
  branchId: '',
  categoryId: '',
  dialogOpen: false
};
