import {
  AdditionalPermission,
  AssetManagementAuthorization,
  AssetRole,
  BranchAuthorization,
  PersonalInformation,
  User
} from './types';
import { CheckboxState } from 'store/common';
import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { UserStatus } from '../common/types';
import { initialState } from './data';
import { isArrayNullOrEmpty } from 'utils';

export const detailsAdapter = createEntityAdapter<User>();

const detailsSlice = createSlice({
  initialState: detailsAdapter.getInitialState(initialState),
  name: 'details',
  reducers: {
    clearBranches: (draft) => {
      draft.draftUserDetails.branchAuthorization.branchIds = [];
    },
    clearPersonalInformation: (draft) => {
      draft.draftUserDetails.firstName = undefined;
      draft.draftUserDetails.lastName = undefined;
      draft.draftUserDetails.jobTitle = undefined;
      draft.draftUserDetails.email = undefined;
      draft.draftUserDetails.phoneNumber = undefined;
    },
    clearUserDetail: (draft) => {
      draft.draftUserDetails = { ...initialState.draftUserDetails };
      draft.initialUserDetails = { ...initialState.initialUserDetails };
      draft.addedUserIds = [];
    },
    insertAddedUserId: (draft, action: PayloadAction<string>) => {
      draft.addedUserIds.push(action.payload);
    },
    revertAdditionalPermissions: (draft) => {
      const { additionalPermissionAuthorization } = draft.initialUserDetails;
      draft.draftUserDetails.additionalPermissionAuthorization = additionalPermissionAuthorization;
    },
    revertBranches: (draft) => {
      draft.draftUserDetails.branchAuthorization = {
        ...draft.initialUserDetails.branchAuthorization
      };
    },
    revertUserDepartment: (draft) => {
      draft.draftUserDetails.assetManagementAuthorization.departmentIds =
        draft.initialUserDetails.assetManagementAuthorization.departmentIds;
    },
    revertUserPersonalInformation: (draft, action: PayloadAction<PersonalInformation>) => {
      draft.draftUserDetails = {
        ...draft.draftUserDetails,
        ...action.payload
      };
    },
    revertUserRole: (draft) => {
      draft.draftUserDetails.assetRole = draft.initialUserDetails.assetRole;
    },
    setAllBranchesCheckboxState: (draft, action: PayloadAction<CheckboxState>) => {
      const newState = action.payload;
      draft.draftUserDetails.branchAuthorization.allBranchesCheckboxState = newState;
    },
    setAllBranchesOption: (draft, action: PayloadAction<boolean>) => {
      draft.draftUserDetails.branchAuthorization.allBranches = action.payload;
    },
    setAuthorizedForAllBranches: (draft, action: PayloadAction<boolean>) => {
      draft.authorizedForAllBranches = action.payload;
    },
    setInitialAdditionalPermissionForm: (draft, action: PayloadAction<AdditionalPermission>) => {
      draft.draftUserDetails.additionalPermissionAuthorization = action.payload;
      draft.initialUserDetails.additionalPermissionAuthorization = action.payload;
    },
    setInitialAdditionalPermissions: (draft) => {
      const { additionalPermissionAuthorization } = draft.draftUserDetails;
      draft.initialUserDetails.additionalPermissionAuthorization =
        additionalPermissionAuthorization;
    },
    setInitialAllBranchesCheckboxState: (draft, action: PayloadAction<CheckboxState>) => {
      const newState = action.payload;
      draft.initialUserDetails.branchAuthorization.allBranchesCheckboxState = newState;
      draft.draftUserDetails.branchAuthorization.allBranchesCheckboxState = newState;
    },
    setInitialAllBranchesOption: (draft, action: PayloadAction<boolean>) => {
      draft.draftUserDetails.branchAuthorization.allBranches = action.payload;
      draft.initialUserDetails.branchAuthorization.allBranches = action.payload;
    },
    setInitialAssetRole: (draft, action: PayloadAction<AssetRole>) => {
      const assetRole = action.payload;
      draft.draftUserDetails.assetRole = assetRole;
      draft.initialUserDetails.assetRole = assetRole;
    },
    setInitialBranchAuthorizationForm: (draft, action: PayloadAction<BranchAuthorization>) => {
      draft.draftUserDetails.branchAuthorization = action.payload;
      draft.initialUserDetails.branchAuthorization = action.payload;
    },
    setInitialBranches: (draft) => {
      draft.initialUserDetails.branchAuthorization = {
        ...draft.draftUserDetails.branchAuthorization
      };
    },
    setInitialDepartment: (draft) => {
      draft.initialUserDetails.assetManagementAuthorization.departmentIds =
        draft.draftUserDetails.assetManagementAuthorization.departmentIds;
    },
    setInitialPersonalInformation: (draft, action: PayloadAction<PersonalInformation>) => {
      const personalInfo = action.payload;
      draft.initialUserDetails = { ...draft.initialUserDetails, ...personalInfo };
      draft.draftUserDetails = { ...draft.draftUserDetails, ...personalInfo };
    },
    setInitialUserAssetAuthorization: (
      draft,
      action: PayloadAction<AssetManagementAuthorization>
    ) => {
      const assetAuth = action.payload;

      draft.draftUserDetails.assetManagementAuthorization = { ...assetAuth };
      draft.initialUserDetails.assetManagementAuthorization = { ...assetAuth };
    },
    setInitialUserForm: (draft, action: PayloadAction<User>) => {
      const user = action.payload;

      draft.initialUserDetails = {
        ...draft.initialUserDetails,
        ...user
      };

      draft.draftUserDetails = {
        ...draft.draftUserDetails,
        ...user
      };
    },
    setInitialUserRole: (draft) => {
      draft.initialUserDetails.assetRole = draft.draftUserDetails.assetRole;
      draft.initialUserDetails.assetManagementAuthorization.roleId =
        draft.draftUserDetails.assetRole.id;
      if (draft.draftUserDetails.assetRole.name === 'RequestOnly') {
        draft.initialUserDetails.assetManagementAuthorization.departmentIds = [];
      } else if (draft.draftUserDetails.assetRole.name === 'Admin') {
        draft.initialUserDetails.branchAuthorization.allBranches = true;
      }
    },
    setInitialUserStatus: (draft, action: PayloadAction<UserStatus>) => {
      draft.draftUserDetails.userStatus = action.payload;
      draft.initialUserDetails.userStatus = action.payload;
    },
    setUserAssetRole: (draft, action: PayloadAction<AssetRole>) => {
      const assetRole = action.payload;
      draft.draftUserDetails.assetRole = assetRole;
      draft.draftUserDetails.assetManagementAuthorization.roleId = assetRole.id;
      if (assetRole.name === 'RequestOnly') {
        draft.draftUserDetails.assetManagementAuthorization.departmentIds = [];
      } else if (assetRole.name === 'Admin') {
        draft.draftUserDetails.branchAuthorization.allBranches = true;
      }
    },
    setUserDetails: (draft, action: PayloadAction<User>) => {
      draft.draftUserDetails = action.payload;
    },
    toggleAdditionalPermission: (draft, action: PayloadAction<string>) => {
      const permissionId = action.payload;
      const { additionalPermissions } = draft.draftUserDetails.additionalPermissionAuthorization;
      const index = additionalPermissions.findIndex((id) => id === permissionId);
      if (index === -1) {
        additionalPermissions.push(permissionId);
      } else {
        additionalPermissions.splice(index, 1);
      }
    },
    toggleAllBranchesOption: (draft) => {
      const nextState = !draft.draftUserDetails.branchAuthorization.allBranches;
      draft.draftUserDetails.branchAuthorization.allBranches = nextState;
    },
    toggleSelectedBranch: (draft, action: PayloadAction<string>) => {
      const { branchIds } = draft.draftUserDetails.branchAuthorization;
      if (isArrayNullOrEmpty(branchIds) || !branchIds.includes(action.payload)) {
        draft.draftUserDetails.branchAuthorization.branchIds = [...branchIds, action.payload];
      } else {
        const index = branchIds.findIndex((id) => id === action.payload);
        draft.draftUserDetails.branchAuthorization.branchIds.splice(index, 1);
      }
    },
    toggleSelectedDepartment: (draft, action: PayloadAction<string>) => {
      const { departmentIds } = draft.draftUserDetails.assetManagementAuthorization;
      if (isArrayNullOrEmpty(departmentIds) || !departmentIds.includes(action.payload)) {
        draft.draftUserDetails.assetManagementAuthorization.departmentIds = [
          ...departmentIds,
          action.payload
        ];
      } else {
        const index = departmentIds.findIndex((id) => id === action.payload);
        draft.draftUserDetails.assetManagementAuthorization.departmentIds.splice(index, 1);
      }
    },
    updateBulkBranches: (draft, action: PayloadAction<string[]>) => {
      draft.draftUserDetails.branchAuthorization.branchIds = action.payload;
    },
    updateBulkInitialBranches: (draft, action: PayloadAction<string[]>) => {
      draft.initialUserDetails.branchAuthorization.branchIds = action.payload;
      draft.draftUserDetails.branchAuthorization.branchIds = action.payload;
    },
    updateUserPersonalInformation: (draft, action: PayloadAction<PersonalInformation>) => {
      const personalInformation = action.payload;
      draft.draftUserDetails = {
        ...draft.draftUserDetails,
        ...personalInformation
      };
    },
    upsertUser: detailsAdapter.upsertOne
  }
});

export default detailsSlice.reducer;

export const {
  clearBranches,
  clearPersonalInformation,
  clearUserDetail,
  insertAddedUserId,
  revertBranches,
  revertUserDepartment,
  revertUserPersonalInformation,
  revertUserRole,
  setAllBranchesCheckboxState,
  setAllBranchesOption,
  setInitialAssetRole,
  setInitialBranchAuthorizationForm,
  setInitialBranches,
  revertAdditionalPermissions,
  setAuthorizedForAllBranches,
  setInitialAdditionalPermissions,
  setInitialAdditionalPermissionForm,
  setInitialAllBranchesCheckboxState,
  setInitialAllBranchesOption,
  setInitialDepartment,
  setInitialUserAssetAuthorization,
  setInitialUserForm,
  setInitialPersonalInformation,
  setInitialUserRole,
  setInitialUserStatus,
  setUserAssetRole,
  setUserDetails,
  toggleAllBranchesOption,
  toggleSelectedBranch,
  updateBulkBranches,
  updateBulkInitialBranches,
  toggleAdditionalPermission,
  toggleSelectedDepartment,
  updateUserPersonalInformation,
  upsertUser
} = detailsSlice.actions;
