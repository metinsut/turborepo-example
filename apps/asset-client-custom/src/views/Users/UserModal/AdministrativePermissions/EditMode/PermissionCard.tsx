import { Box, CatToggleCard, CatToggleCardCheckbox } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { availableAdditionalPermissions } from 'store/slices/users/common/data';
import { useTranslation } from 'react-i18next';
import PermissionIcon from './PermissionIcon';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  permissionId: string;
  onClick: () => void;
  selected: boolean;
};

function PermissionCard(props: Props) {
  const classes = useStyles();
  const { className, permissionId, onClick, selected } = props;

  const { t } = useTranslation();
  const permission = availableAdditionalPermissions[permissionId];

  return (
    <CatToggleCard
      className={clsx(classes.root, className)}
      onClick={onClick}
      selected={selected}
      style={{ height: 272, width: 196 }}
    >
      <Box flex flexDirection="column" height="100%" justifyContent="space-between" width="100%">
        <Box alignItems="center" flex>
          <CatToggleCardCheckbox checked={selected} />
          <Box width="8px" />
          <Typography variant="h2">
            {t(`users.modal.additional_permissions.permission_titles.${permission}`)}
          </Typography>
        </Box>
        <Typography variant="body1">
          {t(`users.modal.additional_permissions.permission_descriptions.${permission}`)}
        </Typography>
        <PermissionIcon permissionId={permissionId} />
      </Box>
    </CatToggleCard>
  );
}

export default PermissionCard;
