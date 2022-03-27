import { PagedResult } from 'store/common';

type UserStatus = 'active' | 'waiting' | 'resigned';

export type {
  AdditionalPermissionType,
  AdditionalPermissions,
  AssetRole,
  RoleType
} from './roleRelated';

type StatusCounts = {
  active: number;
  waiting: number;
};

type UserListPagedResult<T> = {
  statusCounts: StatusCounts;
} & PagedResult<T>;

type PermissionIconsType = {
  [key: string]: React.ReactNode;
};

export type { UserStatus, UserListPagedResult, StatusCounts, PermissionIconsType };
