/* eslint-disable react/no-multi-comp */
import { Box } from 'catamaran/core';
import { Drawer, Paper, Theme, styled, useMediaQuery } from 'catamaran/core/mui';
import { getDevelopmentFeaturesEnabled } from 'utils/settings';
import { getFilteredNavigations, selectSessionUser } from 'store/slices/session';
import { useTypedSelector } from 'hooks';
import BordaIcon from './BordaIcon';
import CategoryImportDialog from 'views/Imports/Category/ImportDialog';
import CategoryImportResultBar from 'views/Imports/NavBar/CategoryImportResultBar';
import NavbarList from './NavbarList';
import ProfileButton from './components/ProfileButton';
import React, { useMemo } from 'react';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    backgroundColor: theme.palette.lightGrey.main,
    borderRight: 'none'
  },
  '.MuiDrawer-paperAnchorLeft': {
    background: 'transparent',
    boxShadow: 'none',
    overflow: 'inherit'
  }
}));

interface NavBarProps extends React.HTMLAttributes<any> {
  className?: string;
}

function NavBar({ className, ...rest }: NavBarProps) {
  const showLarge = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    defaultMatches: null
  });

  const user = useTypedSelector(selectSessionUser);
  const navs = useMemo(() => getFilteredNavigations(user), [user]);

  const developmentFeaturesEnabled = getDevelopmentFeaturesEnabled();

  const content = (
    <Box
      {...rest}
      alignItems="center"
      borderRadius="24px"
      boxShadow={5}
      className={className}
      component={Paper}
      display="flex"
      flexDirection="column"
      height="calc(100vh - 16px)"
      m={1}
      pb={1}
      pt={3}
      px={1}
      style={{
        transition: '0.5s'
      }}
      width={showLarge ? 192 : 72}
    >
      <BordaIcon />
      <Box
        alignItems="flex-start"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        justifyContent="center"
        sx={{
          overflowY: 'auto'
        }}
        width={1}
      >
        {navs.map((list) => (
          <NavbarList key={list.subheader} navigation={list} />
        ))}
      </Box>
      {/* todo: add user and notification buttons here */}
      <ProfileButton />
      <Box />
      {developmentFeaturesEnabled && (
        <>
          <CategoryImportResultBar />
          <CategoryImportDialog />
        </>
      )}
    </Box>
  );

  if (showLarge === null) {
    return null;
  }

  return (
    <StyledDrawer anchor="left" open variant="persistent">
      {content}
    </StyledDrawer>
  );
}

export default NavBar;
