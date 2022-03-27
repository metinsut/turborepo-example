import { Box } from 'catamaran/core';
import { Typography } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import CancelIcon from 'catamaran/icons/Cancel';
import React from 'react';

const NoPermissionAdded = () => {
  const { t } = useTranslation();
  return (
    <Box alignItems="center" flex flexWrap="wrap" my={2}>
      <CancelIcon contained={false} hoverable={false} opacity={0.8} />
      <Box ml={1}>
        <Typography variant="caption">
          {t('users.modal.additional_permissions.no_permission')}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoPermissionAdded;
