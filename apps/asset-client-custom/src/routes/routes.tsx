import {
  ACCOUNTINFORMATION,
  ASSET,
  ASSETCONFIGURATION,
  ASSETLIST,
  ASSET_ADD,
  ASSET_CONTRACTS,
  ASSET_DETAIL,
  BREAKDOWN,
  BREAKDOWN_OPEN,
  CALIBRATION,
  CATEGORIES,
  CATEGORIES_V2,
  CATEGORYTASKS,
  DESIGNSYSTEM_SHOWCASE,
  DEVELOPEROPTIONS,
  ERROR401,
  ERROR404,
  ERROR500,
  FORMBUILDER,
  FORMS,
  LINKEXPIRED,
  LOCALIZATIONSETTINGS,
  MAINTENANCE,
  METRICSCONFIGURATION,
  METRICSCONFIGURATION_DETAIL,
  METRICSCONFIGURATION_LIST,
  MYREQUESTSDETAIL,
  MYREQUESTSLIST,
  PROFILESETTINGS,
  PUBLIC,
  REGISTERFIRSTPAGE,
  REGISTERSECONDPAGE,
  REQUEST,
  RETIREMENT,
  TASK,
  TASKCONFIGURATION,
  TASKLIST,
  TASK_DETAIL,
  USER,
  USER_DEPARTMENTS,
  USER_LIST,
  WAITINGFORCONFIRMATIONDETAIL,
  WAITINGFORCONFIRMATIONLIST
} from './constant-route';
import { Redirect } from 'react-router-dom';
import { RouteConfigExtended, renderRoutes } from './helpers';
import AuthGuard from '../components/RouteGuards/AuthGuard';
import AuthLayout from '../layouts/Auth';
import DashboardLayout from '../layouts/Dashboard/Dashboard';
import ErrorLayout from '../layouts/Error';
import PublicGuard from '../components/RouteGuards/PublicGuard';
import PublicLayout from '../layouts/Public/PublicLayout';
import React, { lazy } from 'react';

export { renderRoutes };

const routes: RouteConfigExtended[] = [
  {
    layout: AuthLayout,
    path: '/auth',
    routes: [
      {
        component: lazy(() => import('views/Auth/Login')),
        exact: true,
        path: '/auth/login'
      },
      {
        component: lazy(() => import('views/Auth/Callback')),
        exact: true,
        path: '/auth/callback'
      },
      {
        component: () => <Redirect to={ERROR404} />
      }
    ]
  },
  {
    guard: PublicGuard,
    layout: React.Fragment,
    path: PUBLIC,
    routes: [
      {
        component: lazy(() => import('views/Public/Invitation/LinkExpired')),
        exact: true,
        layout: PublicLayout,
        path: LINKEXPIRED
      },
      {
        component: lazy(
          () => import('views/Public/Invitation/RegisterFirstPage')
        ),
        exact: true,
        layout: PublicLayout,
        path: REGISTERFIRSTPAGE
      },
      {
        component: lazy(
          () => import('views/Public/Invitation/RegisterSecondPage')
        ),
        exact: true,
        path: REGISTERSECONDPAGE
      },
      {
        component: () => <Redirect to={ERROR404} />
      }
    ]
  },
  {
    guard: PublicGuard,
    layout: ErrorLayout,
    path: '/errors',
    routes: [
      {
        // component: lazy(() => import('views/Errors/Error401')),
        component: <div>error 401</div>,
        exact: true,
        path: ERROR401
      },
      {
        // component: lazy(() => import('views/Errors/Error404')),
        component: <div>error 404</div>,
        exact: true,
        path: ERROR404
      },
      {
        //component: lazy(() => import('views/Errors/Error500')),
        component: <div>error 500</div>,
        exact: true,
        path: ERROR500
      },
      {
        component: () => <Redirect to={ERROR404} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: ASSET,
    routes: [
      {
        authKey: 'assetList',
        component: lazy(() => import('views/Assets/AssetDetail/AssetDetail')),
        exact: true,
        path: ASSET_ADD
      },
      {
        authKey: 'assetList',
        component: lazy(() => import('views/Assets/Assets')),
        exact: true,
        path: ASSETLIST
      },
      {
        component: lazy(() => import('views/Assets/AssetDetail/AssetDetail')),
        exact: true,
        path: ASSET_DETAIL
      },
      {
        component: lazy(() => import('views/Contracts/Contracts')),
        exact: true,
        path: ASSET_CONTRACTS
      },
      {
        component: () => <Redirect to={ASSETLIST} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: ASSETCONFIGURATION,
    routes: [
      {
        authKey: 'assetConfiguration',
        component: lazy(() => import('views/Categories/Categories')),
        exact: true,
        path: CATEGORIES
      },
      {
        component: <Redirect to={CATEGORIES} />,
        exact: true,
        path: '/configuration/categories'
      },
      {
        authKey: 'assetConfiguration',
        component: lazy(() => import('views/CategoryTasks/CategoryTasks')),
        exact: true,
        path: CATEGORYTASKS
      },
      {
        authKey: 'assetConfiguration',
        component: lazy(
          () => import('views/AssetConfiguration/Forms/List/FormList')
        ),
        exact: true,
        path: FORMS
      },
      {
        authKey: 'assetConfiguration',
        component: lazy(
          () =>
            import('views/AssetConfiguration/Forms/Builder/FormBuilderWrapper')
        ),
        exact: true,
        path: FORMBUILDER
      },
      {
        authKey: 'assetConfiguration',
        component: lazy(() => import('views/Categoriesv2/Categories')),
        development: true,
        path: CATEGORIES_V2
      },
      {
        component: <Redirect to={CATEGORYTASKS} />,
        exact: true,
        path: '/configuration/tasks'
      },
      {
        component: () => <Redirect to={CATEGORIES} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: TASK,
    routes: [
      {
        authKey: 'taskList',
        component: lazy(() => import('views/Tasks/List/List')),
        exact: true,
        path: TASKLIST
      },
      {
        authKey: 'taskList',
        component: lazy(
          () => import('views/Tasks/Breakdowns/Detail/TaskDetailPage')
        ),
        exact: true,
        path: TASK_DETAIL
      },
      {
        authKey: 'wfcList',
        component: lazy(
          () =>
            import(
              'views/Tasks/WaitingForConfirmation/WaitingForConfirmationList'
            )
        ),
        exact: true,
        path: WAITINGFORCONFIRMATIONLIST
      },
      {
        authKey: 'wfcList',
        component: lazy(
          () =>
            import(
              'views/Tasks/Breakdowns/WaitingForConfirmationDetail/WaitingForConfirmationPage'
            )
        ),
        exact: true,
        path: WAITINGFORCONFIRMATIONDETAIL
      },
      {
        component: () => <Redirect to={TASKLIST} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: REQUEST,
    routes: [
      {
        component: lazy(() => import('views/Tasks/MyRequests/List')),
        exact: true,
        path: MYREQUESTSLIST
      },
      {
        component: lazy(
          () =>
            import('views/Tasks/Breakdowns/MyRequestDetail/MyRequestDetailPage')
        ),
        exact: true,
        path: MYREQUESTSDETAIL
      },
      {
        component: lazy(
          () => import('views/Tasks/Breakdowns/Open/OpenBreakdownPage')
        ),
        exact: true,
        path: BREAKDOWN_OPEN
      },
      {
        component: () => <Redirect to={MYREQUESTSLIST} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: METRICSCONFIGURATION,
    routes: [
      {
        authKey: 'metricsConfiguration',
        component: lazy(
          () => import('views/MetricsConfiguration/List/MetricsConfiguration')
        ),
        exact: true,
        path: METRICSCONFIGURATION_LIST
      },
      {
        authKey: 'metricsConfiguration',
        component: lazy(
          () => import('views/MetricsConfiguration/Detail/Detail')
        ),
        exact: true,
        path: METRICSCONFIGURATION_DETAIL
      },
      {
        component: () => <Redirect to={METRICSCONFIGURATION_LIST} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: TASKCONFIGURATION,
    routes: [
      {
        authKey: 'taskConfiguration',
        component: lazy(
          () => import('views/TaskConfigurations/Breakdown/Breakdown')
        ),
        exact: true,
        path: BREAKDOWN
      },
      {
        authKey: 'taskConfiguration',
        component: lazy(
          () => import('views/TaskConfigurations/Breakdown/Breakdown')
        ),
        exact: true,
        path: MAINTENANCE
      },
      {
        authKey: 'taskConfiguration',
        component: lazy(
          () => import('views/TaskConfigurations/Breakdown/Breakdown')
        ),
        exact: true,
        path: CALIBRATION
      },
      {
        authKey: 'taskConfiguration',
        component: lazy(
          () => import('views/TaskConfigurations/Breakdown/Breakdown')
        ),
        exact: true,
        path: RETIREMENT
      },
      {
        component: () => <Redirect to={BREAKDOWN} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: USER,
    routes: [
      {
        authKey: 'userManagement',
        component: lazy(() => import('views/Departments/Departments')),
        exact: true,
        path: USER_DEPARTMENTS
      },
      {
        authKey: 'userManagement',
        component: lazy(() => import('views/Users/Users')),
        exact: true,
        path: USER_LIST
      },
      {
        authKey: 'userManagement',
        component: () => <Redirect to={USER_LIST} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: PROFILESETTINGS,
    routes: [
      {
        component: lazy(
          () =>
            import(
              'views/ProfileSettings/AccountInformation/AccountInformation'
            )
        ),
        exact: true,
        path: ACCOUNTINFORMATION
      },
      {
        component: lazy(
          () =>
            import(
              'views/ProfileSettings/LocalizationSettings/LocalizationSettings'
            )
        ),
        exact: true,
        path: LOCALIZATIONSETTINGS
      },
      {
        component: lazy(
          () =>
            import('views/ProfileSettings/DeveloperOptions/DeveloperOptions')
        ),
        exact: true,
        path: DEVELOPEROPTIONS
      },
      {
        component: () => <Redirect to={ACCOUNTINFORMATION} />
      }
    ]
  },
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    path: '*',
    routes: [
      {
        authKey: 'locationManagement',
        component: lazy(() => import('views/Locations/Locations')),
        development: true,
        exact: true,
        path: '/locations'
      },
      {
        authKey: 'locationManagement',
        component: lazy(
          () => import('views/Locations/LocationAddPage/LocationAddPage')
        ),
        development: true,
        exact: true,
        path: '/location/:branchId/:locationLevelId/:parentLocationId/'
      },
      {
        authKey: 'locationManagement',
        component: lazy(
          () => import('views/Locations/LocationAddPage/LocationAddPage')
        ),
        development: true,
        exact: true,
        path: '/location/:branchId/:locationLevelId/:parentLocationId/:locationId'
      },
      {
        component: lazy(() => import('views/DesignSystem/DesignSystem')),
        development: true,
        exact: true,
        path: DESIGNSYSTEM_SHOWCASE
      },
      {
        component: () => <Redirect to={MYREQUESTSLIST} />,
        exact: true,
        path: '/'
      },
      {
        component: () => <Redirect to="/asset" />,
        exact: true,
        path: '/assets'
      },
      {
        component: () => <Redirect to="/asset" />,
        exact: true,
        path: '/contracts'
      },
      {
        component: () => <Redirect to="/configuration" />,
        exact: true,
        path: '/categories'
      },
      {
        component: () => <Redirect to="/user" />,
        exact: true,
        path: '/departments'
      },
      {
        component: () => <Redirect to={ERROR404} />
      }
    ]
  }
];

export default routes;
