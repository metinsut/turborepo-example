import { RootState } from 'RootTypes';
import { convertUserIntoPersonalInformation } from './types';
import { detailsAdapter } from './slice';

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectAllUserIds,
  selectEntities
} = detailsAdapter.getSelectors<RootState>((state) => state.users.details);

export const selectUser = (state: RootState) => state.users.details.draftUserDetails;

export const selectInitialUser = (state: RootState) => state.users.details.initialUserDetails;

export const selectUserPersonalInformation = (state: RootState) =>
  convertUserIntoPersonalInformation(state.users.details.draftUserDetails);

export const selectInitialUserPersonalInformation = (state: RootState) =>
  convertUserIntoPersonalInformation(state.users.details.initialUserDetails);

export const selectDraftUserDepartments = (state: RootState) =>
  state.users.details.draftUserDetails.assetManagementAuthorization.departmentIds;

export const selectInitialUserDepartments = (state: RootState) =>
  state.users.details.initialUserDetails.assetManagementAuthorization.departmentIds;

export const selectDraftUserBranches = (state: RootState) =>
  state.users.details.draftUserDetails.branchAuthorization;

export const selectInitialUserBranches = (state: RootState) =>
  state.users.details.initialUserDetails.branchAuthorization;

export const selectInitialUserPermissions = (state: RootState) =>
  state.users.details.initialUserDetails.additionalPermissionAuthorization.additionalPermissions;

export const selectDraftUserPermissions = (state: RootState) =>
  state.users.details.draftUserDetails.additionalPermissionAuthorization.additionalPermissions;

export const selectAddedUserIds = (state: RootState) => state.users.details.addedUserIds;

export const selectAuthorizedForAllBranches = (state: RootState) =>
  state.users.details.authorizedForAllBranches;

export const selectUserAssetRole = (state: RootState) =>
  state.users.details.draftUserDetails.assetRole;

export const selectInitialUserAssetRole = (state: RootState) =>
  state.users.details.initialUserDetails.assetRole;
