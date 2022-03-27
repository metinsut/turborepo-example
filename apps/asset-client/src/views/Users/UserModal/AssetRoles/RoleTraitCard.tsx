import { AssetRole } from 'store/slices/users/details/types';
import { Box } from 'catamaran/core';
import { Divider, Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { roleTraitResources } from 'store/slices/users/details/data';
import { useTranslation } from 'react-i18next';
import AuthSignGreenIcon from 'catamaran/icons/AuthSignGreen';
import AuthSignGreyIcon from 'catamaran/icons/AuthSignGrey';
import React from 'react';
import RoleIcon from 'views/Users/UserCommon/RoleIcon';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.lightGrey.main}`,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2)
  }
}));

type Props = {
  className?: string;
  role: AssetRole;
};

function RoleTraitCard(props: Props) {
  const classes = useStyles();
  const { className, role } = props;
  const { t } = useTranslation();

  if (!role) {
    return null;
  }

  const trait = roleTraitResources[role.name];
  const roleNameResource = t(`users.roles.${role.name}`);

  if (!trait) {
    return null;
  }

  return (
    <Box className={clsx(classes.root, className)}>
      <Box alignItems="center" flex>
        <RoleIcon assetRoleType={role} contained={false} hoverable={false} />
        <Box ml={2} opacity={0.8}>
          <Typography variant="subtitle1">
            {t('users.modal.asset_roles.trait_title', { roleName: roleNameResource })}
          </Typography>
        </Box>
      </Box>
      <Divider style={{ margin: '8px 0' }} />
      {trait.mainTraits.map((trait) => (
        <Box alignItems="center" flex key={trait} mb={0.5}>
          <AuthSignGreenIcon contained={false} hoverable={false} />
          <Box width="16px" />
          <Typography variant="body1">
            <b>{t(`users.modal.asset_roles.traits.${trait}`)}</b>
          </Typography>
        </Box>
      ))}
      {trait.subTraits?.map((trait) => (
        <Box alignItems="center" flex key={trait} mb={0.5}>
          <AuthSignGreyIcon contained={false} hoverable={false} />
          <Box width="16px" />
          <Typography variant="body1">{t(`users.modal.asset_roles.traits.${trait}`)}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default RoleTraitCard;
