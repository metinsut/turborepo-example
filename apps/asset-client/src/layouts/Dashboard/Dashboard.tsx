import { CatKeyboardSection } from 'catamaran/core';
import { FirstLevelRoute } from 'routes/constant-route';
import { HandlersStateShape, PageKeyboardContext } from './helpers';
import { getSecondLevelRoutes } from './secondLevelNavigations';
import { styled } from 'catamaran/core/mui';
import { useDialogState } from 'hooks';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';
import React, { useState } from 'react';
import TopBar from 'components/ContentLayout/TopBar';

const Root = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  overflowX: 'hidden'
});

const Container = styled('div')({
  display: 'grid',
  minHeight: '100vh',
  width: '100%'
});

const Page = styled('div')(({ theme }) => ({
  display: 'block',
  justifySelf: 'center',
  maxWidth: '100vw',
  paddingLeft: '264px',
  paddingRight: '72px',
  transition: '0.5s',
  width: '100vw',
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1800px'
  },
  [theme.breakpoints.down('lg')]: {
    paddingLeft: '144px'
  }
}));

type Props = {
  children: React.ReactNode;
};

function Dashboard(props: Props) {
  const { children } = props;

  const history = useHistory();

  const { isOpen, togglePopup } = useDialogState();

  const pathNameParts = history.location.pathname.split('/');
  const secondLevelExists = pathNameParts.length > 2;
  const secondLevelRoutes =
    secondLevelExists && getSecondLevelRoutes(pathNameParts[1] as FirstLevelRoute);

  const [handlers, setHandlers] = useState<HandlersStateShape>(() => ({
    onEnter: () => {
      // eslint-disable-next-line no-console
      console.log('empty enter');
    },
    onEscape: () => {
      // eslint-disable-next-line no-console
      console.log('empty escape');
    }
  }));

  return (
    <Root>
      <NavBar />
      <Container>
        <PageKeyboardContext.Provider
          value={{
            ...handlers,
            setHandlers
          }}
        >
          <Page>
            <CatKeyboardSection onEnter={handlers.onEnter} onEscape={handlers.onEscape} open>
              <TopBar
                assetSearchDialogOpen={isOpen}
                routes={secondLevelRoutes}
                toggleAssetSearchDialog={togglePopup}
              />
              {children}
            </CatKeyboardSection>
          </Page>
        </PageKeyboardContext.Provider>
      </Container>
    </Root>
  );
}

export default Dashboard;
