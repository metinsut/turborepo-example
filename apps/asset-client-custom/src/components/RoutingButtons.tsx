import { AuthKeys, selectIsUserAuthorized } from 'store/slices/session';
import { CatTab, CatTabProps, CatTabs } from 'catamaran/core';
import { styled } from 'catamaran/core/mui';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTypedSelector } from 'hooks';
import React, { useMemo } from 'react';
import clsx from 'clsx';

export type Route = {
  authKey?: AuthKeys;
  link: string;
  text: string;
  disabled?: boolean;
};

type RoutingButtonsProps = CatTabProps & {
  routes: Route[];
};

const StyledCatTab = styled(CatTab)(() => ({
  textTransform: 'uppercase'
}));

function RoutingButtons({ routes = [], ...rest }: RoutingButtonsProps) {
  const location = useLocation();

  const value = useMemo(() => {
    const index = routes.findIndex((r) =>
      location.pathname.match(new RegExp(`${r.link || '#'}`, 'g'))
    );
    return index;
  }, [location.pathname, routes]);

  return (
    <CatTabs menu value={value}>
      {routes.length > 0 &&
        routes.map((route) => (
          <RoutingButton
            key={route.link !== '#' ? route.link : route.text}
            route={route}
            {...rest}
          />
        ))}
    </CatTabs>
  );
}

type RoutingButtonProps = CatTabProps & {
  route: Route;
};

function RoutingButton(props: RoutingButtonProps) {
  const history = useHistory();
  const { route, ...rest } = props;
  const { t } = useTranslation();

  const isUserAuthorized = useTypedSelector((state) =>
    selectIsUserAuthorized(state, route.authKey)
  );

  if (!isUserAuthorized) {
    return null;
  }

  return (
    <StyledCatTab
      className={clsx({ disabled: route.disabled })}
      disabled={route.disabled}
      label={t(route.text)}
      onClick={() => history.push(route.link)}
      {...rest}
    />
  );
}

export default RoutingButtons;
