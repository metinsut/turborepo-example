import { AssetRole, StatusCounts, UserStatus } from '../common/types';
import { Branch } from 'store/slices/branches';
import { PagedRequestOptions } from 'store/common';
import { UserFilter } from '../filter/types';

export interface UsersListUser {
  id?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  branches: Branch[];
  allBranches: boolean;
  dateAdded: string;
  lastUpdate: string;
  additionalPermissions: string[];
  isGeneralAdmin: boolean;
  assetRole: Partial<AssetRole>;
  assetDepartments: AssetDepartments[];
  userStatus: UserStatus;
}

export interface AssetDepartments {
  id: string;
  name: string;
  notes: string;
  autoAdded: boolean;
  mainCategories: MainCategory[];
}

export interface MainCategory {
  mainCategoryId: string;
  mainCategoryName: string;
  mainCategoryCode: string;
  workTypes: string[];
}

export interface UserListState {
  total: number;
  page: number;
  checkedUserIds: ICheckedUserId;
  statusCounts: StatusCounts;
}

export interface ICheckedUserId {
  [key: string]: boolean;
}

export type SearchRequest = PagedRequestOptions & UserFilter;
