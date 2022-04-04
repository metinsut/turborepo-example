import { Box, CatTypography } from 'catamaran/core';
import { Divider, Theme, makeStyles } from 'catamaran/core/mui';
import { maxEmailCount } from 'store/slices/users/details/data';
import { useTranslation } from 'react-i18next';
import PostIcon from 'catamaran/icons/Post';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  invitationCounter: {
    backgroundColor: theme.palette.lightGrey.main,
    borderRadius: '24px',
    height: '36px',
    padding: theme.spacing(0, 1)
  },
  root: {
    marginBottom: theme.spacing(1)
  }
}));

type Props = {
  className?: string;
  emailCount: number;
};

function Header(props: Props) {
  const classes = useStyles();
  const { className, emailCount } = props;
  const { t } = useTranslation();

  return (
    <Box className={clsx(classes.root, className)} flex justifyContent="space-between">
      <Box>
        <CatTypography variant="subtitle1">
          {t('users.modal.add_or_invite_users.invite_user_section.to')}
        </CatTypography>
        <CatTypography variant="caption">
          {t('users.modal.add_or_invite_users.invite_user_section.description')}
        </CatTypography>
      </Box>
      <Box alignItems="center" className={classes.invitationCounter} flex>
        <CatTypography variant="subtitle1">
          {t('users.modal.add_or_invite_users.invite_user_section.counter_desc')}
        </CatTypography>
        <Box width="8px" />
        <CatTypography variant="subtitle1">
          <b>{emailCount}</b>
        </CatTypography>
        <Box width="4px" />
        <CatTypography variant="body1">
          {t('users.modal.add_or_invite_users.invite_user_section.counter_invites')}
        </CatTypography>
        <Box width="8px" />
        <PostIcon contained={false} hoverable={false} />
        <Divider orientation="vertical" style={{ height: '16px', margin: '0 8px' }} />
        <CatTypography variant="subtitle1">
          <b>{maxEmailCount - emailCount}</b>
        </CatTypography>
        <Box width="4px" />
        <CatTypography variant="body1">
          {t('users.modal.add_or_invite_users.invite_user_section.counter_remaining')}
        </CatTypography>
      </Box>
    </Box>
  );
}

export default Header;
