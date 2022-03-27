import { RootState } from 'RootTypes';
import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';

export interface Branch {
  id?: string;
  name?: string;
  isActive?: boolean;
}

const branchesAdapter = createEntityAdapter<Branch>();

type BranchState = {};

const initialState: BranchState = {};

const branchSlice = createSlice({
  initialState: branchesAdapter.getInitialState(initialState),
  name: 'branches',
  reducers: {
    setAllBranches: branchesAdapter.setAll
  }
});

export const { setAllBranches } = branchSlice.actions;

export const {
  selectAll: selectAllBranches,
  selectById: selectBranchById,
  selectIds: selectAllBranchIds,
  selectEntities
} = branchesAdapter.getSelectors<RootState>((state) => state.branches);

export const selectMultipleBranchesByIds = createSelector(
  selectEntities,
  (state: RootState, ids: string[]) => ids,
  (entities, ids) => ids.map((id) => entities[id])
);

const selectBranchIdFromProps = (_: any, id: string) => id;
const selectBranchesEntities = (state: RootState) => state.branches.entities;
export const selectBranchNameById = createSelector(
  [selectBranchIdFromProps, selectBranchesEntities],
  (id, branches) => branches[id]?.name ?? ''
);

export default branchSlice.reducer;
