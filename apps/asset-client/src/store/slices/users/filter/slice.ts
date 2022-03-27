import { DateFilterType } from 'components/DateFilter/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserStatus } from '../common/types';
import { emptyFilter, userFilterInitialState } from './data';

const filterSlice = createSlice({
  initialState: userFilterInitialState,
  name: 'filter',
  reducers: {
    clearAllFilter: (draft) => {
      draft.activeFilter = { ...emptyFilter };
      draft.draftFilter = { ...emptyFilter };
    },
    clearDraftFilter: (draft) => {
      draft.draftFilter = { ...emptyFilter };
    },
    removeAdditionalPermissions: (draft, action: PayloadAction<string>) => {
      const permission = action.payload;
      const hasPermission = draft.activeFilter.additionalPermissions.includes(permission);
      if (hasPermission) {
        const index = draft.activeFilter.additionalPermissions.findIndex(
          (item) => item === permission
        );
        draft.activeFilter.additionalPermissions.splice(index, 1);
        draft.draftFilter.additionalPermissions.splice(index, 1);
      }
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeAssetManagementRole: (draft, action: PayloadAction<string>) => {
      const role = action.payload;
      const hasRole = draft.activeFilter.roles.includes(role);
      if (hasRole) {
        const index = draft.activeFilter.roles.findIndex((item) => item === role);
        draft.activeFilter.roles.splice(index, 1);
        draft.draftFilter.roles.splice(index, 1);
      }
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeBranch: (draft, action: PayloadAction<string>) => {
      const branch = action.payload;
      const hasBranch = draft.activeFilter.branches.includes(branch);
      if (hasBranch) {
        const index = draft.activeFilter.branches.findIndex((item) => item === branch);
        draft.activeFilter.branches.splice(index, 1);
        draft.draftFilter.branches.splice(index, 1);
      }
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeDepartment: (draft, action: PayloadAction<string>) => {
      const department = action.payload;
      const hasBranch = draft.activeFilter.departments.includes(department);
      if (hasBranch) {
        const index = draft.activeFilter.departments.findIndex((item) => item === department);
        draft.activeFilter.departments.splice(index, 1);
        draft.draftFilter.departments.splice(index, 1);
      }
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeFirstName: (draft) => {
      draft.activeFilter.firstName = emptyFilter.firstName;
      draft.draftFilter.firstName = emptyFilter.firstName;
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeGeneralAdmin: (draft) => {
      draft.activeFilter.generalAdmin = false;
      draft.draftFilter.generalAdmin = false;
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeJobTitle: (draft, action: PayloadAction<string>) => {
      const jobTitle = action.payload;
      const hasJobTitle = draft.activeFilter.jobTitles.includes(jobTitle);
      if (hasJobTitle) {
        const index = draft.activeFilter.jobTitles.findIndex((item) => item === jobTitle);
        draft.activeFilter.jobTitles.splice(index, 1);
        draft.draftFilter.jobTitles.splice(index, 1);
      }
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeLastName: (draft) => {
      draft.activeFilter.lastName = emptyFilter.lastName;
      draft.draftFilter.lastName = emptyFilter.lastName;
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeLastUpdate: (draft) => {
      draft.activeFilter.lastUpdateFilter = emptyFilter.lastUpdateFilter;
      draft.draftFilter.lastUpdateFilter = emptyFilter.lastUpdateFilter;
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeUserAdded: (draft) => {
      draft.activeFilter.userAddedFilter = emptyFilter.userAddedFilter;
      draft.draftFilter.userAddedFilter = emptyFilter.userAddedFilter;
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    removeUserStatus: (draft, action: PayloadAction<UserStatus>) => {
      const status = action.payload;
      const hasStatus = draft.activeFilter.userStatuses.includes(status);
      if (hasStatus) {
        const index = draft.activeFilter.userStatuses.findIndex((item) => item === status);
        draft.activeFilter.userStatuses.splice(index, 1);
        draft.draftFilter.userStatuses.splice(index, 1);
      }
      draft.activeFilter.extraFilters = emptyFilter.extraFilters;
      draft.draftFilter.extraFilters = emptyFilter.extraFilters;
    },
    updateActiveFilter: (draft) => {
      draft.activeFilter = { ...draft.draftFilter };
    },
    updateAdditionalPermissions: (draft, action: PayloadAction<string>) => {
      const permission = action.payload;
      const { additionalPermissions } = draft.draftFilter;
      if (action.payload) {
        const hasPermission = additionalPermissions.includes(permission);
        if (hasPermission) {
          const index = additionalPermissions.findIndex((item) => item === permission);
          additionalPermissions.splice(index, 1);
        } else {
          additionalPermissions.push(permission);
        }
      }
    },
    updateBranchIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.branches = action.payload;
    },
    updateDepartmentIds: (draft, action: PayloadAction<string[]>) => {
      draft.draftFilter.departments = action.payload;
    },
    updateExtraFilter: (draft, action: PayloadAction<UserStatus>) => {
      const status = action.payload;
      const { extraFilters } = draft.activeFilter;
      if (action.payload) {
        const hasStatus = extraFilters.includes(status);
        if (hasStatus) {
          const index = extraFilters.findIndex((item) => item === status);
          extraFilters.splice(index, 1);
        } else {
          extraFilters.push(status);
        }
      }
    },
    updateFirstName: (draft, action: PayloadAction<string>) => {
      const firstName = action.payload;
      draft.draftFilter.firstName = firstName ?? '';
    },
    updateGeneralAdmin: (draft) => {
      draft.draftFilter.generalAdmin = !draft.draftFilter.generalAdmin;
    },
    updateJobTitles: (draft, action: PayloadAction<string[]>) => {
      const jobTitles = action.payload;
      draft.draftFilter.jobTitles = jobTitles;
    },
    updateLastName: (draft, action: PayloadAction<string>) => {
      const lastName = action.payload;
      draft.draftFilter.lastName = lastName ?? '';
    },
    updateLastUpdate: (draft, action: PayloadAction<DateFilterType>) => {
      const lastUpdateFilter = action.payload;
      draft.draftFilter.lastUpdateFilter = lastUpdateFilter;
    },
    updateUserAdded: (draft, action: PayloadAction<DateFilterType>) => {
      const userAddedFilter = action.payload;
      draft.draftFilter.userAddedFilter = userAddedFilter;
    },
    updateUserRoles: (draft, action: PayloadAction<string>) => {
      const roleId = action.payload;
      const { roles } = draft.draftFilter;
      if (action.payload) {
        const hasStatus = roles.includes(roleId);
        if (hasStatus) {
          const index = roles.findIndex((item) => item === roleId);
          roles.splice(index, 1);
        } else {
          roles.push(roleId);
        }
      }
    },
    updateUserStatuses: (draft, action: PayloadAction<UserStatus>) => {
      const status = action.payload;
      const { userStatuses } = draft.draftFilter;
      if (action.payload) {
        const hasStatus = userStatuses.includes(status);
        if (hasStatus) {
          const index = userStatuses.findIndex((item) => item === status);
          userStatuses.splice(index, 1);
        } else {
          userStatuses.push(status);
        }
      }
    }
  }
});

export default filterSlice.reducer;

export const {
  updateFirstName,
  updateLastName,
  updateBranchIds,
  updateDepartmentIds,
  updateUserStatuses,
  updateUserRoles,
  updateAdditionalPermissions,
  updateGeneralAdmin,
  updateJobTitles,
  updateUserAdded,
  updateLastUpdate,
  updateActiveFilter,
  clearDraftFilter,
  clearAllFilter,
  removeJobTitle,
  removeFirstName,
  removeLastName,
  removeBranch,
  removeDepartment,
  removeUserStatus,
  removeAssetManagementRole,
  removeAdditionalPermissions,
  removeGeneralAdmin,
  removeUserAdded,
  removeLastUpdate,
  updateExtraFilter
} = filterSlice.actions;
