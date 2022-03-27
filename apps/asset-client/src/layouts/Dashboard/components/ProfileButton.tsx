import { ACCOUNTINFORMATION } from 'routes/constant-route';
import { Box } from 'catamaran/core';
import { Button, Theme, Typography, makeStyles, useMediaQuery } from 'catamaran/core/mui';
import { selectSessionUser } from '../../../store/slices/session';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'hooks';
import AvatarItem from 'views/Persons/PersonSelectorItem/AvatarItem';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.lightGrey.main,
    borderRadius: theme.spacing(2),
    textTransform: 'none'
  }
}));

function ProfileButton() {
  const classes = useStyles();
  const history = useHistory();
  const user = useTypedSelector(selectSessionUser);
  const showLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));

  const handleSettingsOpen = () => {
    history.push(ACCOUNTINFORMATION);
  };

  return (
    <>
      <Box
        alignItems="center"
        className={classes.root}
        component={Button}
        flex
        justifyContent={showLarge ? 'left' : 'center'}
        onClick={handleSettingsOpen}
        style={{ height: '48px', width: '100%' }}
      >
        <AvatarItem color="darkGrey" person={user} size="medium" />
        {showLarge && (
          <Box flex flexDirection="column" pl={1}>
            <Typography variant="body2">{`${user?.firstName} ${user?.lastName}`}</Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default ProfileButton;
