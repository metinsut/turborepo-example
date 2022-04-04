import { Box, CatAvatarGroup, CatTypography } from 'catamaran/core';
import { Theme, makeStyles } from 'catamaran/core/mui';
import { Trans, useTranslation } from 'react-i18next';
import { isArrayNullOrEmpty } from 'utils';
import { selectUserById } from 'store/slices/users/details/selectors';
import { useTypedSelector } from 'hooks/useTypedSelector';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import CheckIcon from 'catamaran/icons/Check';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    border: '1px solid rgba(73, 73, 73, 0.1)',
    borderRadius: theme.spacing(3),
    height: 36,
    padding: theme.spacing(0.25, 1),
    width: 207
  }
}));

type Props = {
  className?: string;
  userIds?: string[];
};

function AddedUserSummaryCard(props: Props) {
  const classes = useStyles();
  const { className, userIds } = props;

  const { t } = useTranslation();

  if (isArrayNullOrEmpty(userIds)) {
    return null;
  }

  return (
    <Box
      alignItems="center"
      className={clsx(classes.root, className)}
      flex
      justifyContent="space-between"
    >
      <Box alignItems="center" flex>
        <CatAvatarGroup maxCount={4}>
          {userIds.map((id) => (
            <UserAvatarItem key={id} userId={id} />
          ))}
        </CatAvatarGroup>
        <Box ml={1}>
          <CatTypography>
            <Trans
              components={{ bold: <b /> }}
              i18nKey="users.modal.add_or_invite_users.user_added"
              t={t}
              values={{ count: userIds.length }}
            />
          </CatTypography>
        </Box>
      </Box>
      <Box>
        <CheckIcon color="darkGrey" contained={false} fontSize="small" hoverable={false} />
      </Box>
    </Box>
  );
}

type UserAvatarItemProp = {
  userId: string;
};

function UserAvatarItem(prop: UserAvatarItemProp) {
  const { userId } = prop;
  const user = useTypedSelector((state) => selectUserById(state, userId));

  return <AvatarItem size="medium" user={user} />;
}

export default AddedUserSummaryCard;
