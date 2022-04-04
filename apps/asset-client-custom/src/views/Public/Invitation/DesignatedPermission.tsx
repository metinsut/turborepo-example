/* eslint-disable no-nested-ternary */
import { Box, CatPaper, CatTypography } from 'catamaran/core';
import { selectUser } from 'store/slices/users/details/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import GeneralAdminSection from 'views/Users/UserModal/GeneralAdminSection';
import LoadingIcon from 'catamaran/icons/Loading';
import PermissionCard from './PermissionCard';
import React from 'react';
import classes from './Invitation.module.scss';

type Props = {
  loading?: boolean;
  className?: string;
};

function DesignatedPermission(props: Props) {
  const { loading, className } = props;

  const { t } = useTranslation();

  const userInfo = useTypedSelector(selectUser);

  return (
    <Box className={className}>
      <Box className={classes.secondPage_header}>
        <CatTypography className="opacity-8" variant="h2">
          {t('session.register_page.designated_permissions')}
        </CatTypography>
      </Box>
      {loading ? (
        <Box center flex>
          <LoadingIcon fontSize="large" style={{ padding: '1px' }} />
        </Box>
      ) : (
        <CatPaper className={classes.permissions}>
          {userInfo.isGeneralAdmin ? (
            <GeneralAdminSection mode="edit" />
          ) : (
            <PermissionCard userAssetRole={userInfo.assetRole} />
          )}
        </CatPaper>
      )}
    </Box>
  );
}

export default DesignatedPermission;
