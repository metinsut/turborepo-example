import { AuthGuardProps, AuthorizationGuard } from 'components/RouteGuards/AuthGuard';
import { AuthKeys } from 'store/slices/session';
import { Fragment, Suspense } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { getAppSettings } from 'utils/settings';
import Redirecting from 'views/Auth/Redirecting';

interface RouteConfigComponentProps<Params extends { [K in keyof Params]?: string } = {}>
  extends RouteComponentProps<Params> {
  route?: RouteConfig | undefined;
}

interface RouteConfig {
  key?: React.Key | undefined;
  location?: Location | undefined;
  component?: React.ComponentType<RouteConfigComponentProps<any>> | React.ComponentType | undefined;
  path?: string | string[] | undefined;
  exact?: boolean | undefined;
  strict?: boolean | undefined;
  routes?: RouteConfig[] | undefined;
  render?: ((props: RouteConfigComponentProps<any>) => React.ReactNode) | undefined;
  [propName: string]: any;
}

export type RouteConfigExtended = Omit<RouteConfig, 'routes'> & {
  authKey?: AuthKeys;
  guard?: React.ComponentType<AuthGuardProps>;
  layout?: React.FunctionComponent<any>;
  development?: boolean;
  routes?: RouteConfigExtended[];
};

export const renderRoutes = (routes: RouteConfigExtended[] = []) => {
  const developmentFeaturesEnabled = getAppSettings().enableDevelopmentFeatures;
  return (
    <Suspense fallback={<Redirecting />}>
      <Switch>
        {routes
          .filter((i) => developmentFeaturesEnabled || !i.development)
          .map((route, i) => {
            const { authKey } = route;
            const Guard = route.guard || Fragment;
            const Layout = route.layout || Fragment;
            const Component = route.component;

            return (
              <Route
                exact={route.exact}
                key={i.toString()}
                path={route.path}
                render={(props) => (
                  <Guard>
                    <AuthorizationGuard authKey={authKey}>
                      <Layout>
                        {route.routes ? renderRoutes(route.routes) : <Component {...props} />}
                      </Layout>
                    </AuthorizationGuard>
                  </Guard>
                )}
              />
            );
          })}
      </Switch>
    </Suspense>
  );
};
