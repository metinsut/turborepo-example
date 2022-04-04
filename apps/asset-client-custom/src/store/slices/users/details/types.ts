import { Branch } from 'store/slices/branches';
import { CheckboxState } from 'store/common';
import { Department } from '../departments/types';

type UserSource = 'manual' | 'activeDirectory';

type UserStatus = 'active' | 'waiting' | 'resigned';

export type AssetRoleType = 'Admin' | 'Executive' | 'Manager' | 'Technician' | 'RequestOnly' | '';

export type InvitationType = 'add' | 'invite';

export type AssetRole = {
  id?: string;
  name: AssetRoleType;
  roleStrength?: number;
  level: number;
};

export type RoleTraitResources = {
  [key in AssetRoleType]: { mainTraits?: string[]; subTraits?: string[] };
};

export type BranchUserCount = {
  branchId?: string;
  userCount?: number;
};

export type AssetManagementAuthorization = {
  roleId?: string;
  departmentIds?: string[];
};

export type BranchAuthorization = {
  allBranches?: boolean;
  branchIds?: string[];
  allBranchesCheckboxState?: CheckboxState;
};

export type PersonalInformation = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  username?: string;
  jobTitle?: string;
};

export type User = PersonalInformation & {
  dateAdded?: string;
  lastUpdate?: string;
  invitationType?: InvitationType;
  isGeneralAdmin?: boolean;
  userSource?: UserSource;
  userStatus?: UserStatus;
  assetRole?: AssetRole;
  assetManagementAuthorization?: AssetManagementAuthorization;
  branchAuthorization?: BranchAuthorization;
  role?: string;
  additionalPermissionAuthorization?: AdditionalPermission;
};

export type RequestUserDetails = {
  additionalPermissionAuthorization?: {
    additionalPermissions?: string[];
  };
  assetManagementAuthorization?: AssetManagementAuthorization;
  branchAuthorization?: BranchAuthorization;
};

export type RequestAddUser = RequestUserDetails & {
  invitationType?: InvitationType;
  personalInformation?: PersonalInformation;
};

export type RequestInviteUser = RequestUserDetails & {
  emails?: string[];
};

export type RequestRegisterUser = {
  assetManagementAuthorization?: {
    assetRole?: AssetRole;
    assetDepartments?: Department[];
  };
  additionalPermissions?: AdditionalPermission;
  branches?: Branch[];
  isGeneralAdmin?: boolean;
  invitationType?: InvitationType;
  personalInformation?: PersonalInformation;
};

export type DetailsStateShape = {
  addedUserIds: string[];
  authorizedForAllBranches: boolean;
  draftUserDetails: User;
  initialUserDetails: User;
};

export type EmailResult = {
  email: string;
  message: string;
};

export type InviteUserResponse = {
  successUsers: EmailResult[];
  errorUsers: EmailResult[];
};

export type ResponseAssetAuthorization = {
  assetRole?: AssetRole;
  assetDepartments?: Department[];
};

export type AdditionalPermission = {
  additionalPermissions?: string[];
};

export type TermCondition = {
  id?: string;
  languageCode?: string;
  startDate?: string;
  text?: string;
};

export const convertUserIntoPersonalInformation = (user: User) => {
  const personalInformation: PersonalInformation = {
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    jobTitle: user.jobTitle,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber,
    username: user.username
  };

  return personalInformation;
};
