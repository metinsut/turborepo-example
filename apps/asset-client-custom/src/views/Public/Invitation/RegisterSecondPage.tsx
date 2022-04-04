import { Box, CatTypography } from 'catamaran/core';
import { LINKEXPIRED } from 'routes/constant-route';
import { PersonalInformation, RequestRegisterUser } from 'store/slices/users/details/types';
import { RegisterPersonalInformationCard } from './RegisterPersonalInformationCard';
import {
  checkInvitationTokenValid,
  getUserDetails,
  updateUserPersonalInformationByInvitationToken
} from 'store/slices/users/details/actions';
import { clearUserDetail } from 'store/slices/users/details/slice';
import { getServerSettings } from 'utils/settings';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { useTranslation } from 'react-i18next';
import { useTypedDispatch } from 'hooks';
import DesignatedPermission from './DesignatedPermission';
import LoadingIcon from 'catamaran/icons/Loading';
import React, { useEffect, useState } from 'react';
import classes from './Invitation.module.scss';

function RegisterSecondPage() {
  const queries = useQuery();

  const { t } = useTranslation();

  const dispatch = useTypedDispatch();
  const history = useHistory();
  const [userBasicLoading, setUserBasicLoading] = useState(true);

  const [user, setUser] = useState<RequestRegisterUser>(undefined);

  const token = queries.get('Token');
  const userId = queries.get('UserId');
  const resetCode = queries.get('ResetCode');
  const identityUserId = queries.get('IdentityUserId');
  const returnUrl = queries.get('ReturnUrl');

  useEffect(() => {
    const getBasics = async () => {
      try {
        const apiUser = await dispatch(getUserDetails(userId, token));
        if (!apiUser) {
          history.push(LINKEXPIRED);
        }

        setUser(apiUser);
      } catch (error) {
        history.push(LINKEXPIRED);
      } finally {
        setUserBasicLoading(false);
      }
    };

    getBasics();
  }, [dispatch, userId, token, history]);

  useEffect(
    () => () => {
      dispatch(clearUserDetail());
    },
    [dispatch]
  );

  const handleConfirm = async (personalInformation: PersonalInformation) => {
    let tokenValid: boolean = false;
    try {
      tokenValid = await dispatch(checkInvitationTokenValid(token));
      if (!tokenValid) {
        history.push(LINKEXPIRED);
        return;
      }
    } catch (error) {
      history.push(LINKEXPIRED);
      return;
    }

    if (tokenValid) {
      if (user.invitationType === 'invite') {
        const updateSuccess = await dispatch(
          updateUserPersonalInformationByInvitationToken(userId, token, personalInformation)
        );

        if (!updateSuccess) {
          history.push(LINKEXPIRED);
          return;
        }
      }

      const serverSettings = await getServerSettings();
      const goBackUrl = encodeURIComponent(window.location.href);
      const redirectUrl = `${serverSettings.ssoUrl}/Password/Reset?UserId=${userId}&Token=${token}&ResetCode=${resetCode}&IdentityUserId=${identityUserId}&ReturnUrl=${returnUrl}&DefinitionType=Register&GoBackUrl=${goBackUrl}`;

      window.location.href = redirectUrl;
    }
  };

  return (
    <div className={classes.secondPage}>
      <section className={classes.contentWrapper}>
        <img
          alt="lighthouse-quattro"
          className={classes['contentWrapper__header-img']}
          src="/static/images/lighthouse-quattro.png"
        />
        <div className={classes.contentWrapper_body}>
          <Box className={classes.secondPage_header}>
            <CatTypography className="opacity-8" variant="h1">
              {t('session.register')}
            </CatTypography>
            <Box mt={1}>
              <CatTypography className="opacity-6" variant="body1">
                {t('session.register_page.description')}
              </CatTypography>
            </Box>
          </Box>
          {userBasicLoading ? (
            <Box center flex>
              <LoadingIcon fontSize="large" style={{ padding: '1px' }} />
            </Box>
          ) : (
            <>
              <RegisterPersonalInformationCard
                invitationType={user.invitationType}
                onConfirm={handleConfirm}
                personalInformation={user.personalInformation}
              />
              <DesignatedPermission className="mt16" loading={userBasicLoading} />
            </>
          )}
        </div>
        <div className={classes.contentFooter} />
      </section>
    </div>
  );
}

export default RegisterSecondPage;
