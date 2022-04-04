import { Box, CatTypography } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { selectUserById } from 'store/slices/users/details/selectors';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.darkGrey[100],
    border: '1px solid rgba(73, 73, 73, 0.1)',
    borderRadius: theme.spacing(2),
    height: 56,
    width: 197
  }
}));

type Props = {
  className?: string;
  userId?: string;
};

function UserInvitationSentCard(props: Props) {
  const classes = useStyles();
  const { className, userId } = props;

  const { t } = useTranslation();
  const user = useTypedSelector((state) => selectUserById(state, userId));

  if (!user) {
    return null;
  }
  return (
    <Box alignItems="center" className={clsx(classes.root, className)} flex p={1}>
      <Box>
        <AvatarItem size="medium" user={user} />
      </Box>
      <Box flex flexDirection="column" maxWidth="150px" ml={1}>
        <CatTypography className="three-dot" variant="body2">
          <b>{`${user.firstName} ${user.lastName}`}</b>
        </CatTypography>
        <Box alignItems="center" flex mt={0.5}>
          <CheckIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
          <Box ml={0.5}>
            <CatTypography variant="caption">
              {t('users.modal.add_or_invite_users.invitation_sent')}
            </CatTypography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UserInvitationSentCard;
