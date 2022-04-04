import { DetailsStateShape, RoleTraitResources, User } from './types';

const initialUser: User = {
  additionalPermissionAuthorization: {
    additionalPermissions: []
  },
  assetManagementAuthorization: {
    departmentIds: []
  },
  branchAuthorization: {
    branchIds: []
  }
};

export const initialState: DetailsStateShape = {
  addedUserIds: [],
  authorizedForAllBranches: undefined,
  draftUserDetails: initialUser,
  initialUserDetails: initialUser
};

export const roleTraitResources: RoleTraitResources = {
  '': {},
  Admin: {
    mainTraits: ['admin_main_trait', 'admin_main_trait_2']
  },
  Executive: {
    mainTraits: ['executive_main_trait'],
    subTraits: ['executive_sub_1']
  },
  Manager: {
    mainTraits: ['manager_main_trait'],
    subTraits: ['manager_sub_1']
  },
  RequestOnly: undefined,
  Technician: {
    mainTraits: ['technician_main_trait'],
    subTraits: ['technician_sub_1', 'technician_sub_2']
  }
};

export const maxSelectableLevel = 5;

export const maxEmailCount = 100;
