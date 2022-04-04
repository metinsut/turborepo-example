import {
  checkUser,
  selectSessionStatus,
  silentRefresh,
  userSignedOutFromAnotherTab
} from 'store/slices/session';
import { getUserManager } from 'utils/userManager';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from 'hooks';

export const useAuthInit = () => {
  const dispatch = useTypedDispatch();

  const sessionStatus = useTypedSelector(selectSessionStatus);
  const history = useHistory();

  useEffect(() => {
    const accessTokenExpiring = async () => {
      await dispatch(silentRefresh());
    };

    const userSignedOut = () => {
      dispatch(userSignedOutFromAnotherTab());
    };

    const asyncCall = async () => {
      const userManager = await getUserManager();

      userManager.events.addAccessTokenExpiring(accessTokenExpiring);
      userManager.events.addUserSignedOut(userSignedOut);
      dispatch(checkUser());
    };

    const dismountCall = async () => {
      const userManager = await getUserManager();

      userManager.events.removeAccessTokenExpiring(accessTokenExpiring);
      userManager.events.removeUserSignedOut(userSignedOut);
    };

    asyncCall();

    return () => {
      dismountCall();
    };
  }, [dispatch]);

  useEffect(() => {
    if (sessionStatus === 'loggedOut') {
      history.push('/auth/login');
    }
  }, [history, sessionStatus]);
};
