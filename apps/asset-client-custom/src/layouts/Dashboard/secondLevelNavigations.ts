import {
  ACCOUNTINFORMATION,
  ASSETLIST,
  ASSET_CONTRACTS,
  BREAKDOWN,
  CALIBRATION,
  CATEGORIES,
  CATEGORIES_V2,
  CATEGORYTASKS,
  DESIGNSYSTEM_SHOWCASE,
  DEVELOPEROPTIONS,
  FORMS,
  FirstLevelRoute,
  LOCALIZATIONSETTINGS,
  MAINTENANCE,
  METRICSCONFIGURATION,
  MYREQUESTSLIST,
  RETIREMENT,
  TASKLIST,
  USER_DEPARTMENTS,
  USER_LIST,
  WAITINGFORCONFIRMATIONLIST
} from 'routes/constant-route';
import { Route } from 'components/RoutingButtons';
import { getDevelopmentFeaturesEnabled } from 'utils/settings';

const developmentFeaturesEnabled = getDevelopmentFeaturesEnabled();

type SecondLevelNavigations = Partial<Record<FirstLevelRoute, Route[]>>;
const secondLevelNavigations: SecondLevelNavigations = {
  asset: [
    {
      authKey: 'assetList',
      link: ASSETLIST,
      text: 'assets.routes.asset_list'
    },
    {
      disabled: true,
      link: '#',
      text: 'assets.routes.protection_calendar'
    },
    {
      link: ASSET_CONTRACTS,
      text: 'assets.routes.contracts'
    }
  ],
  'asset-configuration': [
    {
      authKey: 'assetConfiguration',
      link: CATEGORIES,
      text: 'categories.routes.categories'
    },
    {
      authKey: 'assetConfiguration',
      link: CATEGORYTASKS,
      text: 'categories.routes.category_tasks'
    },
    {
      authKey: 'assetConfiguration',
      link: FORMS,
      text: 'categories.routes.forms'
    },
    {
      authKey: 'assetConfiguration',
      disabled: !developmentFeaturesEnabled,
      link: CATEGORIES_V2,
      text: 'categories.routes.categories_v2'
    }
  ],
  'design-system': [
    {
      link: DESIGNSYSTEM_SHOWCASE,
      text: 'layout.design_system'
    }
  ],
  'metrics-configuration': [
    {
      link: METRICSCONFIGURATION,
      text: 'metrics_configuration.routes.metric_configuration'
    }
  ],
  'profile-settings': [
    {
      link: ACCOUNTINFORMATION,
      text: 'profile_settings.routes.account_information'
    },
    {
      link: LOCALIZATIONSETTINGS,
      text: 'profile_settings.routes.localization_settings'
    },
    {
      link: DEVELOPEROPTIONS,
      text: 'profile_settings.routes.developer_options'
    }
  ],
  request: [
    {
      link: MYREQUESTSLIST,
      text: 'tasks.list.routes.my_requests_title'
    }
  ],
  task: [
    {
      authKey: 'wfcList',
      link: WAITINGFORCONFIRMATIONLIST,
      text: 'tasks.list.routes.waiting_for_confirmation_title'
    },
    {
      authKey: 'taskList',
      link: TASKLIST,
      text: 'tasks.list.routes.task_list_title'
    }
  ],
  'task-configuration': [
    {
      authKey: 'taskConfiguration',
      link: BREAKDOWN,
      text: 'task_configuration.routes.breakdown'
    },
    {
      authKey: 'taskConfiguration',
      disabled: true,
      link: MAINTENANCE,
      text: 'task_configuration.routes.maintenance'
    },
    {
      authKey: 'taskConfiguration',
      disabled: true,
      link: CALIBRATION,
      text: 'task_configuration.routes.calibration'
    },
    {
      authKey: 'taskConfiguration',
      disabled: true,
      link: RETIREMENT,
      text: 'task_configuration.routes.retirement'
    }
  ],
  user: [
    {
      link: USER_LIST,
      text: 'users.routes.user_list'
    },
    {
      link: USER_DEPARTMENTS,
      text: 'users.routes.departments'
    },
    {
      disabled: true,
      link: '#',
      text: 'users.routes.ad_sync'
    }
  ]
};

export const getSecondLevelRoutes = (firstLevelRoute: FirstLevelRoute) =>
  secondLevelNavigations[firstLevelRoute];
