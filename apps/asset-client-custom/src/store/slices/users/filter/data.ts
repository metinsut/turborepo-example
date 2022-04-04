import { UserFilter, UserFilterStateShape } from './types';

export const defaultFilter: UserFilter = {
  additionalPermissions: [],
  branches: [],
  departments: [],
  extraFilters: [],
  firstName: '',
  generalAdmin: false,
  jobTitles: [],
  lastName: '',
  lastUpdateFilter: {
    type: 'any'
  },
  roles: [],
  userAddedFilter: {
    type: 'any'
  },
  userStatuses: ['active', 'waiting']
};

export const emptyFilter: UserFilter = {
  additionalPermissions: [],
  branches: [],
  departments: [],
  extraFilters: [],
  firstName: '',
  generalAdmin: false,
  jobTitles: [],
  lastName: '',
  lastUpdateFilter: {
    type: 'any'
  },
  roles: [],
  userAddedFilter: {
    type: 'any'
  },
  userStatuses: []
};

export const userFilterInitialState: UserFilterStateShape = {
  activeFilter: defaultFilter,
  draftFilter: defaultFilter
};
