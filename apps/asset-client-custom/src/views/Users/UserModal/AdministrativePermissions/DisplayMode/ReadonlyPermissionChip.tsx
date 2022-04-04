import { Box } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { availableAdditionalPermissions } from 'store/slices/users/common/data';
import { useTranslation } from 'react-i18next';
import PermissionIcon from '../EditMode/PermissionIcon';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.lightGrey.main,
    borderRadius: theme.spacing(3),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.25, 1, 0.25, 0.25)
  }
}));

type Props = {
  className?: string;
  permissionId: string;
};

function ReadonlyPermissionChip(props: Props) {
  const classes = useStyles();
  const { className, permissionId } = props;

  const { t } = useTranslation();
  const permission = availableAdditionalPermissions[permissionId];

  return (
    <Box alignItems="center" className={clsx(classes.root, className)} flex>
      <PermissionIcon permissionId={permissionId} />
      <Box width="8px" />
      <Typography style={{ opacity: 0.8 }} variant="body1">
        {t(`users.modal.additional_permissions.permission_titles.${permission}`)}
      </Typography>
    </Box>
  );
}

export default ReadonlyPermissionChip;
