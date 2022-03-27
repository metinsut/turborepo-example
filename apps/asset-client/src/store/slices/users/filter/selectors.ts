import { RootState } from 'RootTypes';

export const selectActiveFilter = (state: RootState) => state.users.filter.activeFilter;
export const selectDraftFilter = (state: RootState) => state.users.filter.draftFilter;
export const selectFilterUserStatuses = (state: RootState) =>
  state.users.filter.draftFilter.userStatuses;
export const selectFirstName = (state: RootState) => state.users.filter.draftFilter.firstName;
export const selectLastName = (state: RootState) => state.users.filter.draftFilter.lastName;
export const selectFilterUserRoles = (state: RootState) => state.users.filter.draftFilter.roles;
export const selectFilterGeneralAdmin = (state: RootState) =>
  state.users.filter.draftFilter.generalAdmin;
export const selectFilterJobTitles = (state: RootState) => state.users.filter.draftFilter.jobTitles;
export const selectUserAdded = (state: RootState) => state.users.filter.draftFilter.userAddedFilter;
export const selectLastUpdate = (state: RootState) =>
  state.users.filter.draftFilter.lastUpdateFilter;
export const selectFilterAdditionalPermissions = (state: RootState) =>
  state.users.filter.draftFilter.additionalPermissions;
export const selectBranchIds = (state: RootState) => state.users.filter.draftFilter.branches;
export const selectDepartmentIds = (state: RootState) => state.users.filter.draftFilter.departments;
export const selectIsWaiting = (state: RootState) =>
  state.users.filter.activeFilter.extraFilters.includes('waiting');
export const selectIsActive = (state: RootState) =>
  state.users.filter.activeFilter.extraFilters.includes('active');
