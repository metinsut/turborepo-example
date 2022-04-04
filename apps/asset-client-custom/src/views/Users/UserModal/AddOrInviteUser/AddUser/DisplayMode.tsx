import { Box, CatAreaButton } from 'catamaran/core';
import { Theme, Typography, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import React from 'react';
import UserInvitationSentCard from 'views/Users/UserCards/UserInvitationSentCard';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {}
}));

type Props = {
  className?: string;
  onAddClick?: () => void;
  userIds?: string[];
};

function DisplayMode(props: Props) {
  const classes = useStyles();
  const { className, onAddClick, userIds } = props;

  const { t } = useTranslation();
  return (
    <Box className={clsx(classes.root, className)} flex flexWrap="wrap">
      {userIds.map((id) => (
        <Box key={id} mb={2} mr={2}>
          <UserInvitationSentCard userId={id} />
        </Box>
      ))}
      <Box mb={2}>
        <CatAreaButton onClick={onAddClick} style={{ height: 56, width: 197 }}>
          <Typography color="primary" variant="body1">
            <Trans i18nKey="users.modal.add_or_invite_users.user_add_button" t={t} />
          </Typography>
        </CatAreaButton>
      </Box>
    </Box>
  );
}

export default DisplayMode;
