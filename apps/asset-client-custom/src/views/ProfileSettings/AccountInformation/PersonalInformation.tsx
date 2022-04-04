import { Box, CatAreaButton, CatButton, CatPaper, CatTypography } from 'catamaran/core';
import { getServerSettings } from 'utils/settings';
import { logout } from 'store/slices/session';
import { selectUserPersonalInformation } from 'store/slices/users/details/selectors';
import { useLoading, useTypedSelector } from 'hooks';
import { useTranslation } from 'react-i18next';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import EditIcon from 'catamaran/icons/Edit';
import LogoutIcon from 'catamaran/icons/Logout';
import ReadonlyTextField from 'components/CatamaranTextField/ReadonlyTextField';
import classes from './AccountInformation.module.scss';
import clsx from 'clsx';

type Props = {
  className?: string;
};

const translationPrefix = 'profile_settings.account_information.personal_information';

function PersonalInformation(props: Props) {
  const { className } = props;
  const currentUser = useTypedSelector(selectUserPersonalInformation);
  const [logoutLoading, logoutLoadingDispatch] = useLoading({ initialState: false });

  const { t } = useTranslation();

  const handleLogout = () => {
    logoutLoadingDispatch(logout());
  };

  const handleChangePassword = async () => {
    const serverSettings = await getServerSettings();
    const redirectUrl = `${serverSettings.ssoUrl}/Password/Change?ReturnUrl=${window.location.href}`;
    window.location.replace(redirectUrl);
  };

  return (
    <CatPaper className={clsx(className, 'px24')}>
      <Box className={classes.personalInfo_header}>
        <CatTypography variant="h2">{t(`${translationPrefix}.title`)}</CatTypography>
        <CatButton
          color="red"
          disabled={logoutLoading}
          endIcon={<LogoutIcon />}
          loading={logoutLoading}
          onClick={handleLogout}
          size="large"
        >
          {t('session.logout')}
        </CatButton>
      </Box>
      <hr className="divider-horizontal" />
      <Box className={classes.personalInfo_content}>
        <Box>
          <AvatarItem size="xLarge" user={currentUser} />
        </Box>
        <Box className={classes.personalInfo_body}>
          <div className={classes.personalInfo_textField}>
            <ReadonlyTextField
              label={t('users.modal.add_user.username_field')}
              text={currentUser.username}
            />
          </div>
          <div className={classes.personalInfo_textField}>
            <CatAreaButton onClick={handleChangePassword} startIcon={EditIcon}>
              {t(`${translationPrefix}.change_password`)}
            </CatAreaButton>
          </div>
          <hr className="divider-horizontal ml4 mb16 w-full" />
          <Box className={classes.personalInfo_textField}>
            <ReadonlyTextField
              label={t('users.modal.add_user.job_title_field')}
              text={currentUser.jobTitle}
            />
          </Box>
          <Box className={classes.personalInfo_textField} style={{ height: '40px' }} />
          <Box className={classes.personalInfo_textField}>
            <ReadonlyTextField
              label={t('users.modal.add_user.first_name_field')}
              text={currentUser.firstName}
            />
          </Box>
          <Box className={classes.personalInfo_textField}>
            <ReadonlyTextField
              label={t('users.modal.add_user.last_name_field')}
              text={currentUser.lastName}
            />
          </Box>
          <Box className={classes.personalInfo_textField}>
            <ReadonlyTextField
              label={t('users.modal.add_user.email_field')}
              text={currentUser.email}
            />
          </Box>
          <Box className={classes.personalInfo_textField}>
            <ReadonlyTextField
              label={t('users.modal.add_user.phone_number_field')}
              text={currentUser.phoneNumber}
            />
          </Box>
        </Box>
      </Box>
    </CatPaper>
  );
}

export default PersonalInformation;
