import { AppThunk, RootState } from 'RootTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { WFCLIST, loadFromLocalStorage } from 'helpers/localStorage';
import { selectAllBranchIds } from 'store/slices/branches';

export interface WfcFilter {
  branchIds?: string[];
  localStorageInitialized?: boolean;
}

export const defaultWfcFilter: WfcFilter = {
  branchIds: [],
  localStorageInitialized: false
};

export const wfcFilterSlice = createSlice({
  initialState: defaultWfcFilter,
  name: 'waitingForConfirmation',
  reducers: {
    clearFilters: (draft) => {
      draft.branchIds = defaultWfcFilter.branchIds;
    },
    initFromLocalStorage: (draft, action) => {
      draft.branchIds = action.payload.branchIds;
      draft.localStorageInitialized = true;
    },
    resetLocalStorageStatus: (draft) => {
      draft.localStorageInitialized = false;
    },
    updateBranch: (draft, action: PayloadAction<string[]>) => {
      draft.branchIds = action.payload;
    }
  }
});

export const loadWfcFilterFromLocalStorage = (): AppThunk<void> => (dispatch, getState) => {
  const allBranchIds = selectAllBranchIds(getState());
  const wfcFilterStorage = loadFromLocalStorage(WFCLIST);

  const checkBranchIdsIsArray = Array.isArray(wfcFilterStorage?.branchIds);
  let branchIds = [];
  if (checkBranchIdsIsArray) {
    branchIds = wfcFilterStorage?.branchIds.filter((branchId: string) =>
      allBranchIds.includes(branchId)
    );
  }
  dispatch(initFromLocalStorage({ ...wfcFilterStorage, branchIds }));
};

export const selectWfcFilterBranch = (state: RootState) =>
  state.tasks.waitingForConfirmationFilter.branchIds;
export const selectWfcFilter = (state: RootState) => state.tasks.waitingForConfirmationFilter;
export const selectWfcFilterBranchIds = (state: RootState) =>
  state.tasks.waitingForConfirmationFilter.branchIds;
export const selectLocalStorageInitialized = (state: RootState) =>
  state.tasks.waitingForConfirmationFilter.localStorageInitialized;

export default wfcFilterSlice.reducer;
export const { clearFilters, initFromLocalStorage, resetLocalStorageStatus, updateBranch } =
  wfcFilterSlice.actions;
