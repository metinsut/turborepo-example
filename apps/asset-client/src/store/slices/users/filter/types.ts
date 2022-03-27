import { DateFilterType } from 'components/DateFilter/types';
import { UserStatus } from '../common/types';

interface UserFilter {
  jobTitles?: string[];
  firstName?: string;
  lastName?: string;
  branches?: string[];
  departments?: string[];
  userStatuses?: UserStatus[];
  additionalPermissions?: string[];
  roles?: string[];
  generalAdmin?: boolean;
  userAddedFilter?: DateFilterType;
  lastUpdateFilter?: DateFilterType;
  extraFilters?: UserStatus[];
}

interface UserFilterStateShape {
  activeFilter: UserFilter;
  draftFilter: UserFilter;
}

export type { UserFilter, UserFilterStateShape };
