import {
  AuthKeys,
  selectAllBranches,
  selectAllMainCategories,
  selectIsUserAuthorized,
  selectSessionStatus,
  selectUserSettings
} from 'store/slices/session';
import { ERROR401 } from 'routes/constant-route';
import { LocalizationProvider, SupportedLocales } from 'catamaran/core';
import { selectAllBranchIds, setAllBranches } from 'store/slices/branches';
import { updateCategories } from 'store/slices/categories/slice';
import { useAuthInit } from 'hooks/app/useAuthInit';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect } from 'react';
import Redirecting from 'views/Auth/Redirecting';

export type AuthGuardProps = {
  authKey?: AuthKeys;
  children: React.ReactNode;
};

function AuthenticationGuard(props: AuthGuardProps) {
  const sessionStatus = useTypedSelector(selectSessionStatus);
  useAuthInit();

  const userSettings = useTypedSelector(selectUserSettings);

  if (sessionStatus !== 'loggedIn') {
    return <Redirecting />;
  }

  return (
    <LocalizationProvider
      value={{
        language: userSettings.languageCode,
        locale: userSettings.locale as SupportedLocales,
        timeZone: userSettings.timeZone
      }}
    >
      <BranchAndMainCategoryGuard {...props} />
    </LocalizationProvider>
  );
}

export function AuthorizationGuard(props: AuthGuardProps) {
  const { authKey, children } = props;
  const isUserAuthorized = useTypedSelector(state =>
    selectIsUserAuthorized(state, authKey)
  );
  const history = useHistory();

  useEffect(() => {
    if (!isUserAuthorized) {
      history.replace(ERROR401);
    }
  }, [history, isUserAuthorized]);

  if (!isUserAuthorized) {
    return null;
  }

  return <>{children}</>;
}

const useInitMainCategoriesAndBranches = () => {
  const dispatch = useDispatch();
  const mainCategories = useTypedSelector(selectAllMainCategories);
  const branches = useTypedSelector(selectAllBranches);

  // Init categories slice from session main categories
  useEffect(() => {
    dispatch(updateCategories(mainCategories));
  }, [dispatch, mainCategories]);

  // Init branch slice from session main categories
  useEffect(() => {
    dispatch(setAllBranches(branches));
  }, [dispatch, branches]);
};

type BranchAndMainCategoryGuardProps = Omit<AuthGuardProps, 'authKey'>;
function BranchAndMainCategoryGuard(props: BranchAndMainCategoryGuardProps) {
  const { children } = props;
  const branchIds = useTypedSelector(selectAllBranchIds);

  useInitMainCategoriesAndBranches();

  return branchIds.length === 0 ? null : <>{children}</>;
}

export default AuthenticationGuard;
