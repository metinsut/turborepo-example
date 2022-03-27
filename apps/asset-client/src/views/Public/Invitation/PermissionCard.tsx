import { AssetRole } from 'store/slices/users/details/types';
import { Box, CatTypography } from 'catamaran/core';
import { useTranslation } from 'react-i18next';
import AdministrativePermissionsDisplayMode from 'views/Users/UserModal/AdministrativePermissions/DisplayMode/DisplayMode';
import AssetManIcon from 'catamaran/icons/AssetMan';
import AssetRoleDisplayMode from 'views/Users/UserModal/AssetRoles/DisplayMode';
import BranchesDisplayMode from 'views/Users/UserModal/Branches/DisplayMode/DisplayMode';
import DepartmentsDisplayMode from 'views/Users/UserModal/Departments/DisplayMode';
import React from 'react';
import classes from './Invitation.module.scss';

type Props = {
  userAssetRole: AssetRole;
};
function PermissionCard({ userAssetRole }: Props) {
  const { t } = useTranslation();

  return (
    <div className={classes.permissionCard}>
      <Box alignItems="center" flex>
        <AssetManIcon contained={false} hoverable={false} opacity={0.8} />
        <Box ml={3}>
          <CatTypography variant="h2">{t('users.modal.asset_specifications_title')}</CatTypography>
        </Box>
      </Box>
      <Box className={classes.permissionCard_innerRow}>
        <AssetRoleDisplayMode editVisible={false} />
      </Box>
      {userAssetRole?.name !== 'RequestOnly' && (
        <Box className={classes.permissionCard_innerRow}>
          <DepartmentsDisplayMode editVisible={false} />
        </Box>
      )}
      <Box>
        <BranchesDisplayMode editVisible={false} />
      </Box>
      <Box>
        <AdministrativePermissionsDisplayMode editVisible={false} />
      </Box>
    </div>
  );
}

export default PermissionCard;
