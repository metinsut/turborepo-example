import {
  AdditionalPermissionType,
  RoleType,
  availableAdditionalPermissions,
  userRoles
} from './users/common/roleRelated';
import { AppThunk, RootState } from 'RootTypes';
import { User as OidcUser, UserProfile } from 'oidc-client-ts';
import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { getDevelopmentFeaturesEnabled } from 'utils/settings';
import { getUserManager } from 'utils/userManager';
import { showSaveSuccessSnackbar, showSnackbarMessage } from 'store/slices/application';
import axios from 'utils/axiosUtils';
import i18n from 'utils/i18n';
import navigations, { NavigationGroup } from 'layouts/Dashboard/navigations';

interface Session {
  status: 'inProgress' | 'loggedIn' | 'loggedOut';
  user: User;
  account?: {
    settings: Settings;
  };
}

interface Branch {
  id: string;
  name: string;
}

interface MainCategory {
  id: string;
  code: string;
  name: string;
}

export interface Settings {
  languageCode: string;
  locale: string;
  timeZone: string;
}

interface User {
  username?: string;
  firstName?: string;
  id?: string;
  lastName?: string;
  isGeneralAdmin?: boolean;
  role?: RoleType;
  additionalPermissions: AdditionalPermissionType[];
  branches: Branch[];
  mainCategories: MainCategory[];
  settings?: Settings;
}

const buildUser = (
  profile: UserProfile,
  branches: Branch[],
  mainCategories: MainCategory[],
  userSettings: Settings
) => {
  const user: User = { additionalPermissions: [], branches: [], mainCategories: [] };
  const nameSplitted = profile.name.split(' ');

  user.id = profile.user_auth_id as string;
  user.firstName = profile.given_name ?? nameSplitted.slice(0, -1).join(' ');
  user.lastName = profile.family_name ?? nameSplitted[nameSplitted.length - 1];
  user.username = profile.preferred_username;
  user.branches = branches;
  user.mainCategories = mainCategories;
  user.settings = userSettings;

  const { role } = profile as any;
  if (Array.isArray(role)) {
    user.isGeneralAdmin = false;
    role.forEach((roleId: string) => {
      const additionalPermission = availableAdditionalPermissions[roleId];
      if (additionalPermission) {
        user.additionalPermissions.push(additionalPermission);
        return;
      }

      const userRole = userRoles.find((i) => i.id === roleId);
      if (userRole) {
        user.role = userRole.name;
      }
    });
  } else {
    const userRole = userRoles.find((i) => i.id === role);
    if (userRole) {
      user.role = userRole.name;
    } else {
      user.isGeneralAdmin = true;
    }
  }

  return user;
};

const sessionSlice = createSlice({
  initialState: {
    status: 'inProgress'
  } as Session,
  name: 'session',
  reducers: {
    accountSettingsSet: (draft, action: PayloadAction<Settings>) => {
      draft.account = { settings: action.payload };
    },
    loginCallbackInvalid: (draft) => {
      draft.status = 'loggedOut';
      draft.user = null;
    },
    logout: (draft) => {
      draft.status = 'loggedOut';
      draft.user = null;
    },
    silentRefresh: (draft, action: PayloadAction<User>) => {
      draft.status = 'loggedIn';
      draft.user = { ...action.payload };
    },
    silentRefreshFailed: (draft) => {
      draft.status = 'loggedOut';
      draft.user = null;
    },
    userExpired: (draft) => {
      draft.status = 'inProgress';
    },
    userLoadedFromStore: (draft, action: PayloadAction<User>) => {
      draft.status = 'loggedIn';
      draft.user = { ...action.payload };
    },
    userLogin: (draft, action: PayloadAction<User>) => {
      draft.status = 'loggedIn';
      draft.user = { ...action.payload };
    },
    userNotFoundInStore: (draft) => {
      draft.status = 'inProgress';
    },
    userSignedOutFromAnotherTab: (draft) => {
      draft.status = 'loggedOut';
      draft.user = null;
    }
  }
});

export const { userSignedOutFromAnotherTab } = sessionSlice.actions;

// Check user on initialization
export const checkUser = (): AppThunk => async (dispatch, getState) => {
  // Don't fetch authorizations on page navigation (useAuthInit on AuthGuard)
  if (selectSessionStatus(getState()) !== 'inProgress') {
    return;
  }

  let oidcUser: OidcUser;
  try {
    const userManager = await getUserManager();
    oidcUser = await userManager.getUser();
  } finally {
    if (oidcUser && !oidcUser.expired) {
      const user = await dispatch(fetchUserAuthorizations(oidcUser));
      if (user) {
        dispatch(sessionSlice.actions.userLoadedFromStore(user));
      }

      // eslint-disable-next-line no-unsafe-finally
      return;
    }

    if (!oidcUser) {
      dispatch(sessionSlice.actions.userNotFoundInStore());
    } else {
      dispatch(sessionSlice.actions.userExpired());
    }

    await dispatch(silentRefresh(false));
  }
};

// Login callback
export const login = (): AppThunk => async (dispatch) => {
  try {
    const userManager = await getUserManager();
    const oidcUser = await userManager.signinRedirectCallback();
    const user = await dispatch(fetchUserAuthorizations(oidcUser));
    dispatch(sessionSlice.actions.userLogin(user));
  } catch (error) {
    dispatch(
      showSnackbarMessage(i18n.t('session.login_callback_invalid'), 'error', { autoHide: false })
    );
    dispatch(sessionSlice.actions.loginCallbackInvalid());
  }
};

// Silent refresh
export const silentRefresh =
  (showError: boolean = true): AppThunk =>
  async (dispatch) => {
    try {
      const userManager = await getUserManager();
      const oidcUser = await userManager.signinSilent();

      const user = await dispatch(fetchUserAuthorizations(oidcUser));
      dispatch(sessionSlice.actions.silentRefresh(user));
    } catch (error) {
      if (showError) {
        dispatch(
          showSnackbarMessage(i18n.t('session.silent_refresh_failed'), 'error', { autoHide: false })
        );
      }

      dispatch(sessionSlice.actions.silentRefreshFailed());
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    const userManager = await getUserManager();
    await userManager.signoutRedirect();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    dispatch(showSnackbarMessage(i18n.t('session.logout_fail'), 'error'));
  }
};

export const fetchUserAuthorizations =
  (oidcUser: OidcUser, retryIfUnauthorized = true): AppThunk<Promise<User>> =>
  async (dispatch) => {
    setAccessToken(oidcUser);

    const branchPromise = axios.get<Branch[]>('user/currentuser/branches');
    const mainCategoryPromise = axios.get<MainCategory[]>('user/currentuser/main-categories');
    const userSettingsPromise = axios.get<Settings>('user/currentuser/settings');

    try {
      const [branchesResponse, mainCategoriesResponse, userSettingsResponse] = await Promise.all([
        branchPromise,
        mainCategoryPromise,
        userSettingsPromise
      ]);

      const user = buildUser(
        oidcUser.profile,
        branchesResponse.data,
        mainCategoriesResponse.data,
        userSettingsResponse.data
      );

      // Change user language
      await i18n.changeLanguage(userSettingsResponse.data.languageCode);

      return user;
    } catch (error: any) {
      // Refresh token
      const userManager = await getUserManager();
      const oidcUserRetries = await userManager.signinSilent();

      // Retry one time
      if (retryIfUnauthorized && error?.response?.status === 401) {
        return await dispatch(fetchUserAuthorizations(oidcUserRetries, false));
      }

      dispatch(logout());
      throw error;
    }
  };

export const changeUserSettings =
  (settings: Partial<Settings>): AppThunk<Promise<Settings>> =>
  async (dispatch, getState) => {
    try {
      const state = getState();
      const existingSettings = state.session.user.settings;
      const newSettings = { ...existingSettings, ...settings };

      await axios.put('user/currentuser/settings', newSettings);

      // User token will change, wait for async backend events
      await new Promise((r) => setTimeout(r, 2000));
      await dispatch(silentRefresh());

      dispatch(showSaveSuccessSnackbar());

      return newSettings;
    } catch (error) {
      dispatch(showSnackbarMessage('Settings change fail', 'error'));
      return null;
    }
  };

const setAccessToken = (user: OidcUser) => {
  axios.defaults.headers.common.Authorization = `${user.token_type} ${user.access_token}`;
};

export const fetchAccountSettings =
  (): AppThunk<Promise<Settings>> => async (dispatch, getState) => {
    const accountSettingsPromise = await axios.get<Settings>('public/user/general-settings');
    const settings = accountSettingsPromise.data;

    // Set account language if there is not user
    const sessionUser = selectSessionUser(getState());
    if (!sessionUser) {
      await i18n.changeLanguage(settings.languageCode);
    }

    dispatch(sessionSlice.actions.accountSettingsSet(settings));
    return settings;
  };

export const selectSessionUserId = (state: RootState) => state.session.user?.id;
export const selectSessionStatus = (state: RootState) => state.session.status;
export const selectSessionUser = (state: RootState) => state.session.user;
export const selectSessionUserRole = (state: RootState) => state.session.user.role;

export const selectUserSettings = (state: RootState) => state.session.user?.settings;
export const selectUserLanguage = (state: RootState) => state.session.user.settings.languageCode;
export const selectUserTimeZone = (state: RootState) => state.session.user.settings.timeZone;
export const selectUserLocale = (state: RootState) => state.session.user.settings.locale;

export const selectAccountSettings = (state: RootState) => state.session.account?.settings;

export const selectAllMainCategories = createSelector(
  selectSessionUser,
  (user) => user.mainCategories
);

export const selectMainCategoryById = createSelector(
  selectSessionUser,
  (state: RootState, id: string) => id,
  (user, id) => user.mainCategories.find((i) => i.id === id)
);

export const selectAllBranches = createSelector(selectSessionUser, (user) => user.branches);

const isUserAuthorized = (user: User, authKey: AuthKeys) => {
  if (!authKey || user.isGeneralAdmin) {
    return true;
  }

  const roles = authMap[authKey];
  const mergedUserRoles = [user.role, ...user.additionalPermissions];

  const authorized = roles.some((role) => mergedUserRoles.includes(role));

  return authorized;
};

export const getFilteredNavigations = (user: User) => {
  const developmentFeaturesEnabled = getDevelopmentFeaturesEnabled();
  const filteredNavigations: NavigationGroup[] = [];

  navigations.forEach((navigationGroup) => {
    const filteredItems = navigationGroup.items.filter((navigationItem) => {
      if (!developmentFeaturesEnabled && navigationItem.development) {
        return false;
      }

      return isUserAuthorized(user, navigationItem.authKey);
    });

    if (filteredItems.length > 0) {
      filteredNavigations.push({
        ...navigationGroup,
        items: filteredItems
      });
    }
  });

  return filteredNavigations;
};

export const selectIsUserAuthorized = createSelector(
  selectSessionUser,
  (state: RootState, authKey: AuthKeys) => authKey,
  isUserAuthorized
);

export default sessionSlice.reducer;

export type AuthKeys =
  | 'assetConfiguration'
  | 'assetConfiguration_MainCategoryOperations'
  | 'assetDetail_CategoryBrandModelCreate'
  | 'assetList'
  | 'locationManagement'
  | 'mainCategoryEdit'
  | 'metricsConfiguration'
  | 'taskConfiguration'
  | 'taskDetail_AssignPersonnel'
  | 'taskDetail_ChangePersonnelIfAssigned'
  | 'taskList'
  | 'taskList_Filter_PersonSelect'
  | 'taskOpen_AssignPersonnel'
  | 'userManagement'
  | 'wfcList';

type allRoleType = (RoleType | AdditionalPermissionType)[];

const authMap: Record<AuthKeys, allRoleType> = {
  assetConfiguration: ['Admin'],
  assetConfiguration_MainCategoryOperations: [],
  assetDetail_CategoryBrandModelCreate: ['Admin'],
  assetList: ['Technician', 'Manager', 'Admin'],
  locationManagement: ['LocationAdmin'],
  mainCategoryEdit: [],
  metricsConfiguration: ['Admin'],
  taskConfiguration: ['Admin'],
  taskDetail_AssignPersonnel: ['Manager', 'Admin'],
  taskDetail_ChangePersonnelIfAssigned: ['Technician'],
  taskList: ['Technician', 'Manager', 'Admin'],
  taskList_Filter_PersonSelect: ['Manager', 'Admin'],
  taskOpen_AssignPersonnel: ['Manager', 'Admin'],
  userManagement: ['UserAdmin'],
  wfcList: ['Manager', 'Admin']
};
