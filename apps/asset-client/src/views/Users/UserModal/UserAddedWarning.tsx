import { Box, CatTypography } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { useTranslation } from 'react-i18next';
import FreezeIcon from 'catamaran/icons/Freeze';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.blue.main}`,
    borderRadius: theme.spacing(2),
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: 800
  }
}));

type Props = {
  className?: string;
  visible?: boolean;
};

function UserAddedWarning(props: Props) {
  const classes = useStyles();
  const { className, visible } = props;

  const { t } = useTranslation();

  if (!visible) {
    return null;
  }
  return (
    <Box alignItems="center" className={clsx(classes.root, className)} flex mt={2}>
      <FreezeIcon color="blue" contained={false} hoverable={false} />
      <Box ml={1}>
        <CatTypography color="primary" variant="body1">
          {t('users.modal.frozen_warning')}
        </CatTypography>
      </Box>
    </Box>
  );
}

export default UserAddedWarning;
