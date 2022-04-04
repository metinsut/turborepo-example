import {
  AdditionalPermission,
  AssetManagementAuthorization,
  BranchAuthorization,
  BranchUserCount,
  InviteUserResponse,
  PersonalInformation,
  RequestAddUser,
  RequestRegisterUser,
  RequestUserDetails,
  ResponseAssetAuthorization,
  TermCondition,
  User,
  convertUserIntoPersonalInformation
} from './types';
import { AppThunk } from 'RootTypes';
import { CheckboxState, apiCaller } from 'store/common';
import {
  clearBranches,
  clearPersonalInformation,
  setAllBranchesCheckboxState,
  setAllBranchesOption,
  setAuthorizedForAllBranches,
  setInitialAdditionalPermissionForm,
  setInitialAssetRole,
  setInitialBranchAuthorizationForm,
  setInitialPersonalInformation,
  setInitialUserAssetAuthorization,
  setInitialUserForm,
  setInitialUserStatus,
  toggleSelectedBranch,
  updateBulkBranches,
  updateBulkInitialBranches,
  upsertUser
} from './slice';
import { fetchAllDiscoveredUsers } from '../list/actions';
import { selectAllBranches, setAllBranches } from 'store/slices/branches';
import { selectDraftUserBranches, selectUser, selectUserPersonalInformation } from './selectors';
import { selectUserById } from '../list/selectors';
import { showAddSuccessSnackbar, showUpdateSuccessSnackbar } from 'store/slices/application';
import { upsertDepartments } from '../departments/slice';
import { userRoles } from '../common/data';
import axios from 'utils/axiosUtils';
import userPermissionValidator from 'helpers/validations/User/UserPermissionValidator';

export const addStandardUser = (): AppThunk<Promise<User>> => async (dispatch, getState) => {
  const currentState = getState();

  const user = currentState.users.details.draftUserDetails;
  const requestUser = convertUserToRequestAddUser(user);

  const requestBuilder = () => axios.post<User>('user/users/add/standard-user', requestUser);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(upsertUser(data));
  dispatch(clearPersonalInformation());

  dispatch(refreshUserList());
  dispatch(showAddSuccessSnackbar());

  return data;
};

export const addGeneralAdmin = (): AppThunk<Promise<User>> => async (dispatch, getState) => {
  const currentState = getState();

  const user = currentState.users.details.draftUserDetails;
  const requestUser = convertUserToGeneralAdminRequestAddUser(user);

  const requestBuilder = () => axios.post<User>('user/users/add/general-admin', requestUser);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(upsertUser(data));
  dispatch(clearPersonalInformation());

  dispatch(refreshUserList());
  dispatch(showAddSuccessSnackbar());

  return data;
};

export const inviteUsersFromEmail =
  (emails: string[]): AppThunk<Promise<InviteUserResponse>> =>
  async (dispatch, getState) => {
    const currentState = getState();

    const user = currentState.users.details.draftUserDetails;
    const requestUserDetails = convertUserToRequestUserDetails(user);

    const requestBuilder = () =>
      axios.post<InviteUserResponse>('user/users/invite/standard-user', {
        emails,
        ...requestUserDetails
      });
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(refreshUserList());
    return data;
  };

export const inviteGeneralAdminsFromEmail =
  (emails: string[]): AppThunk<Promise<InviteUserResponse>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.post<InviteUserResponse>('user/users/invite/general-admin', { emails });
    const data = await dispatch(apiCaller(requestBuilder));

    dispatch(refreshUserList());
    return data;
  };

export const getUserPersonalInformation =
  (id: string): AppThunk<Promise<User>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<User>(`user/users/${id}`);
    const finalUser = await dispatch(apiCaller(requestBuilder));
    const personalInfo = convertUserIntoPersonalInformation(finalUser);

    dispatch(upsertUser(finalUser));
    dispatch(setInitialPersonalInformation(personalInfo));
    return finalUser;
  };

export const updateUserPersonalInformation =
  (): AppThunk<Promise<User>> => async (dispatch, getState) => {
    const currentState = getState();
    const user = selectUser(currentState);
    const personalInformation = selectUserPersonalInformation(currentState);

    const requestUrl = user.isGeneralAdmin
      ? `user/users/${personalInformation.id}/general-admin`
      : `user/users/${personalInformation.id}/personal-information`;

    const requestBuilder = () => axios.put<User>(requestUrl, personalInformation);
    const finalUser = await dispatch(apiCaller(requestBuilder));
    const personalInfo = convertUserIntoPersonalInformation(finalUser);

    dispatch(upsertUser(finalUser));
    dispatch(setInitialPersonalInformation(personalInfo));

    dispatch(refreshUserList());
    dispatch(showUpdateSuccessSnackbar());

    return finalUser;
  };

export const getUserAssetAuthorization =
  (id: string): AppThunk<Promise<AssetManagementAuthorization>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<ResponseAssetAuthorization>(`user/users/${id}/asset-authorization`);
    const response = await dispatch(apiCaller(requestBuilder));

    const assetRole = userRoles.find((i) => i.name === response.assetRole.name);

    const assetAuthorization: AssetManagementAuthorization = {
      departmentIds: response.assetDepartments.map((i) => i.id),
      roleId: assetRole.id
    };

    dispatch(setInitialUserAssetAuthorization(assetAuthorization));
    dispatch(setInitialAssetRole(assetRole));
    return assetAuthorization;
  };

export const updateUserAssetAuthorization =
  (): AppThunk<Promise<AssetManagementAuthorization>> => async (dispatch, getState) => {
    const currentState = getState();
    const user = selectUser(currentState);

    const assetManagementAuthorization: AssetManagementAuthorization = {
      departmentIds: user.assetManagementAuthorization.departmentIds ?? [],
      roleId: user.assetManagementAuthorization.roleId
    };

    const requestBuilder = () =>
      axios.put<ResponseAssetAuthorization>(`user/users/${user.id}/asset-authorization`, {
        assetManagementAuthorization
      });
    const response = await dispatch(apiCaller(requestBuilder));

    const assetRole = userRoles.find((i) => i.name === response.assetRole.name);

    const assetAuthorization: AssetManagementAuthorization = {
      departmentIds: response.assetDepartments.map((i) => i.id),
      roleId: assetRole.id
    };

    dispatch(setInitialUserAssetAuthorization(assetAuthorization));
    dispatch(setInitialAssetRole(assetRole));

    dispatch(refreshUserList());
    dispatch(showUpdateSuccessSnackbar());

    return assetAuthorization;
  };

export const getUserBranchAuthorization =
  (id: string): AppThunk<Promise<BranchAuthorization>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<BranchAuthorization>(`user/users/${id}/branch-authorizations`);
    const branchAuthorization = await dispatch(apiCaller(requestBuilder));

    const finalBranchAuthorization = await dispatch(
      setUserBranchAuthorizationProps(branchAuthorization)
    );

    return finalBranchAuthorization;
  };

export const updateUserBranchAuthorization =
  (): AppThunk<Promise<BranchAuthorization>> => async (dispatch, getState) => {
    const currentState = getState();
    const user = selectUser(currentState);

    const requestBranchAuthorization: BranchAuthorization = {
      allBranches: user.branchAuthorization.allBranches,
      branchIds: user.branchAuthorization.allBranches ? [] : user.branchAuthorization.branchIds
    };

    const requestBuilder = () =>
      axios.put<BranchAuthorization>(
        `user/users/${user.id}/branch-authorizations`,
        requestBranchAuthorization
      );
    const branchAuthorization = await dispatch(apiCaller(requestBuilder));

    const finalBranchAuthorization = await dispatch(
      setUserBranchAuthorizationProps(branchAuthorization)
    );

    dispatch(refreshUserList());
    dispatch(showUpdateSuccessSnackbar());

    return finalBranchAuthorization;
  };

const setUserBranchAuthorizationProps =
  (branchAuthorization: BranchAuthorization): AppThunk<Promise<BranchAuthorization>> =>
  async (dispatch, getState) => {
    const currentState = getState();
    const branches = selectAllBranches(currentState);

    const modifiedBranchAuthorization: BranchAuthorization = { ...branchAuthorization };

    if (branchAuthorization.allBranches) {
      modifiedBranchAuthorization.allBranchesCheckboxState = true;
    } else {
      switch (branchAuthorization.branchIds.length) {
        case 0:
          modifiedBranchAuthorization.allBranchesCheckboxState = false;
          break;
        case branches.length:
          modifiedBranchAuthorization.allBranchesCheckboxState = true;
          break;
        default:
          modifiedBranchAuthorization.allBranchesCheckboxState = 'indeterminate';
          break;
      }
    }

    dispatch(setInitialBranchAuthorizationForm(modifiedBranchAuthorization));

    if (modifiedBranchAuthorization.allBranchesCheckboxState === true) {
      dispatch(updateBulkInitialBranches(branches.map((i) => i.id)));
    }

    return modifiedBranchAuthorization;
  };

export const getUserAdditionalPermissions =
  (id: string): AppThunk<Promise<AdditionalPermission>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<AdditionalPermission>(`user/users/${id}/additional-permissions`);
    const response = await dispatch(apiCaller(requestBuilder));

    dispatch(setInitialAdditionalPermissionForm(response));
    return response;
  };

export const updateUserAdditionalPermissions =
  (): AppThunk<Promise<AdditionalPermission>> => async (dispatch, getState) => {
    const currentState = getState();
    const user = selectUser(currentState);
    const additionalPermissionIds: string[] =
      user.additionalPermissionAuthorization.additionalPermissions;

    const requestBuilder = () =>
      axios.put<AdditionalPermission>(`user/users/${user.id}/additional-permissions`, {
        additionalPermissionIds
      });
    const response = await dispatch(apiCaller(requestBuilder));

    dispatch(setInitialAdditionalPermissionForm(response));

    dispatch(refreshUserList());
    dispatch(showUpdateSuccessSnackbar());
    return response;
  };

export const promoteUser =
  (id: string): AppThunk<Promise<User>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.put<User>(`user/users/${id}/promote`);
    const user = await dispatch(apiCaller(requestBuilder));

    dispatch(setInitialUserForm(user));
    dispatch(refreshUserList());
    dispatch(showUpdateSuccessSnackbar());

    return user;
  };

export const demoteUser =
  (id: string): AppThunk<Promise<User>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.put<User>(`user/users/${id}/demote`);
    const user = await dispatch(apiCaller(requestBuilder));

    dispatch(setInitialUserForm(user));
    const requestOnlyRole = userRoles.find((i) => i.name === 'RequestOnly');
    dispatch(setInitialAssetRole(requestOnlyRole));
    dispatch(refreshUserList());
    dispatch(showUpdateSuccessSnackbar());

    return user;
  };

export const resignUser =
  (userId: string): AppThunk =>
  async (dispatch) => {
    await dispatch(resignUsers([userId]));
    dispatch(setInitialUserStatus('resigned'));
    dispatch(showUpdateSuccessSnackbar());
  };

export const resignUsers =
  (userIds: string[]): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<boolean>('user/users/resign', { userIds });
    await dispatch(apiCaller(requestBuilder));
    dispatch(refreshUserList());
  };

export const unresignUser =
  (userId: string): AppThunk =>
  async (dispatch) => {
    await dispatch(unresignUsers([userId]));
    dispatch(setInitialUserStatus('active'));
    dispatch(showUpdateSuccessSnackbar());
  };

export const unresignUsers =
  (userIds: string[]): AppThunk =>
  async (dispatch) => {
    const requestBuilder = () => axios.post<boolean>('user/users/unresign', { userIds });
    await dispatch(apiCaller(requestBuilder));
    dispatch(refreshUserList());
  };

const refreshUserList = (): AppThunk => async (dispatch) => {
  dispatch(fetchAllDiscoveredUsers());
};

export const checkInvitationTokenValid =
  (token: string): AppThunk<Promise<boolean>> =>
  async () => {
    const response = await axios.get<boolean>(`public/user/users/invitation/${token}/is-valid`);
    const isValid = response.data;

    return isValid;
  };

export const getUserDetails =
  (userId: string, invitationToken?: string): AppThunk<Promise<RequestRegisterUser>> =>
  async (dispatch) => {
    const url = !invitationToken
      ? 'user/currentuser/details'
      : `public/user/users/${userId}/details/invitation-token/${invitationToken}`;

    const response = await axios.get<RequestRegisterUser>(url);
    const requestRegisterUser = response.data;

    /**
     BUG: 9787 At user registration, firstName prop is set as email whenever an invitation request created
     but while registrating at first time, we are clearing this prop and user can see empty firstname to fill
     */

    if (
      requestRegisterUser.invitationType === 'invite' &&
      !requestRegisterUser.personalInformation.lastName
    ) {
      requestRegisterUser.personalInformation.firstName = null;
    }
    const user = convertRequestRegisterUserToUser(requestRegisterUser);
    dispatch(setInitialUserForm(user));

    if (!user.isGeneralAdmin) {
      if (requestRegisterUser.branches.length > 0) {
        dispatch(setAllBranches(requestRegisterUser.branches));
      }
      dispatch(
        upsertDepartments(requestRegisterUser.assetManagementAuthorization.assetDepartments)
      );
    }

    return requestRegisterUser;
  };

export const updateUserPersonalInformationByInvitationToken =
  (
    userId: string,
    invitationToken: string,
    personalInformation: PersonalInformation
  ): AppThunk<Promise<boolean>> =>
  async () => {
    const response = await axios.put<PersonalInformation>(
      `public/user/users/${userId}/basics/invitation-token/${invitationToken}`,
      personalInformation
    );

    return response.status === 204;
  };

export const getBranchUserCounts = (): AppThunk<Promise<BranchUserCount[]>> => async (dispatch) => {
  const requestBuilder = () =>
    axios.get<BranchUserCount[]>('/user/currentuser/branches-user-count');
  const branchUserCounts = await dispatch(apiCaller(requestBuilder));

  return branchUserCounts;
};

export const initializeUserModal =
  (userId: string): AppThunk =>
  async (dispatch, getState) => {
    const currentState = getState();
    const user = selectUserById(currentState, userId);

    const finalUser = user ?? { id: userId };
    dispatch(setInitialUserForm(finalUser));
  };

export const checkCurrentUserAuthorizedAllBranches =
  (): AppThunk<Promise<boolean>> => async (dispatch) => {
    const requestBuilder = () =>
      axios.get<boolean>('user/currentuser/check-authorized-on-all-branches');
    const isAuthorized = await dispatch(apiCaller(requestBuilder));

    dispatch(setAuthorizedForAllBranches(isAuthorized));
    return isAuthorized;
  };

export const checkSetAllBranches =
  (checkboxState: CheckboxState, isAuthorizedForAllBranches: boolean): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    dispatch(setAllBranchesCheckboxState(checkboxState));

    if (checkboxState === true) {
      const branches = selectAllBranches(state);
      dispatch(updateBulkBranches(branches.map((i) => i.id)));
      if (isAuthorizedForAllBranches) {
        dispatch(setAllBranchesOption(true));
      }
    } else if (checkboxState === false) {
      dispatch(clearBranches());
      dispatch(setAllBranchesOption(false));
    }
  };

export const checkBranch =
  (branchId: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(toggleSelectedBranch(branchId));

    const currentState = getState();
    const branches = selectAllBranches(currentState);
    const branchAuthorization = selectDraftUserBranches(currentState);

    let allBranchesState: CheckboxState;
    switch (branchAuthorization.branchIds.length) {
      case 0:
        allBranchesState = false;
        break;
      case branches.length:
        allBranchesState = true;
        break;
      default:
        allBranchesState = 'indeterminate';
        break;
    }

    dispatch(setAllBranchesCheckboxState(allBranchesState));
    if (allBranchesState !== true) {
      dispatch(setAllBranchesOption(false));
    }
  };

export const validateUserPermissions = (user: User): boolean => {
  if (!user) {
    return false;
  }
  const errors = userPermissionValidator(user);
  const anyInvalid = Object.values(errors).some((error) => error !== undefined);
  return !anyInvalid;
};

export const getTermsAndConditions = (): AppThunk<Promise<TermCondition>> => async (dispatch) => {
  const requestBuilder = () => axios.get<TermCondition>('public/user/terms');
  const data = await dispatch(apiCaller(requestBuilder));

  return data;
};

const convertUserToRequestUserDetails = (user: User) => {
  const userDetails: RequestUserDetails = {
    additionalPermissionAuthorization: user.additionalPermissionAuthorization,
    assetManagementAuthorization: {
      departmentIds:
        user.assetRole.name === 'RequestOnly'
          ? []
          : user.assetManagementAuthorization.departmentIds,
      roleId: user.assetRole.id
    },
    branchAuthorization: {
      allBranches: user.branchAuthorization.allBranches,
      branchIds: user.branchAuthorization.allBranches ? [] : user.branchAuthorization.branchIds
    }
  };

  return userDetails;
};

const convertUserToRequestAddUser = (user: User) => {
  const userDetails: RequestUserDetails = convertUserToRequestUserDetails(user);
  const requestUser: RequestAddUser = {
    ...userDetails,
    personalInformation: {
      email: user.email,
      firstName: user.firstName,
      jobTitle: user.jobTitle,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      username: user.email
    }
  };

  return requestUser;
};

const convertUserToGeneralAdminRequestAddUser = (user: User) => {
  const requestUser: RequestAddUser = {
    personalInformation: {
      email: user.email,
      firstName: user.firstName,
      jobTitle: user.jobTitle,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      username: user.email
    }
  };

  return requestUser;
};

const convertRequestRegisterUserToUser = (request: RequestRegisterUser) => {
  if (request.isGeneralAdmin) {
    const adminUser: User = {
      invitationType: request.invitationType,
      isGeneralAdmin: request.isGeneralAdmin,
      ...request.personalInformation
    };

    return adminUser;
  }

  const assetRole = userRoles.find(
    (i) => i.name === request.assetManagementAuthorization.assetRole.name
  );

  const user: User = {
    additionalPermissionAuthorization: request.additionalPermissions,
    ...request.personalInformation,
    assetManagementAuthorization: {
      departmentIds: request.assetManagementAuthorization.assetDepartments.map((i) => i.id),
      roleId: assetRole.id
    },
    assetRole,
    branchAuthorization: {
      allBranches: request.branches.length === 0,
      branchIds: request.branches.map((i) => i.id)
    },
    invitationType: request.invitationType,
    isGeneralAdmin: request.isGeneralAdmin
  };

  return user;
};
