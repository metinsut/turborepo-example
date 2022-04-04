import { RootState } from 'RootTypes';
import { createSelector } from 'reselect';
import { departmentsAdapter } from './slice';

export const {
  selectAll: selectAllDepartments,
  selectById: selectDepartmentById,
  selectIds: selectAllDepartmentIds,
  selectEntities
} = departmentsAdapter.getSelectors<RootState>((state) => state.users.departments);

export const selectDepartment = (state: RootState) => state.users.departments.draftDepartment;

const selectSelectorIdFromProps = (_: any, id: string) => id;
const selectDepartmentEntities = (state: RootState) => state.users.departments.entities;
export const selectDepartmentNameById = createSelector(
  [selectSelectorIdFromProps, selectDepartmentEntities],
  (id, departments) => departments[id].name
);

export const selectInitialDepartment = (state: RootState) =>
  state.users.departments.initialDraftDepartment;
