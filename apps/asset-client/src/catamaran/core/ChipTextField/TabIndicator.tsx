import { Box } from 'catamaran/core';
import { Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: `1px solid ${theme.palette.darkGrey.main}`,
    borderRadius: theme.spacing(2),
    height: theme.spacing(2),
    marginTop: theme.spacing(1.25),
    opacity: 0.6,
    padding: theme.spacing(0.25, 0.5)
  }
}));

type Props = {
  className?: string;
};

function TabIndicator(props: Props) {
  const classes = useStyles();
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Box center className={clsx(classes.root, className)} flex>
      <Typography variant="caption">
        {t('users.modal.add_or_invite_users.invite_user_section.tab_indicator')}
      </Typography>
    </Box>
  );
}

export default TabIndicator;
