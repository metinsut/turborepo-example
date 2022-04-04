import {
  ASSET,
  ASSETCONFIGURATION,
  DESIGNSYSTEM_SHOWCASE,
  METRICSCONFIGURATION,
  REQUEST,
  TASK,
  TASKCONFIGURATION
} from 'routes/constant-route';
import { AuthKeys } from 'store/slices/session';
import { IconBaseProps } from 'catamaran/icons/IconBase';
import { getDevelopmentFeaturesEnabled } from 'utils/settings';
import AssetListingIcon from 'catamaran/icons/AssetListing';
import AssetSettingsIcon from 'catamaran/icons/AssetSettings';
import DashboardIcon from 'catamaran/icons/Dashboard';
import LocationIcon from 'catamaran/icons/Location';
import MetricsConfigurationsIcon from 'catamaran/icons/MetricsConfigurations';
import React from 'react';
import RequestIcon from 'catamaran/icons/Request';
import TaskIcon from 'catamaran/icons/Task';
import TaskSettingsIcon from 'catamaran/icons/TaskSettings';
import UsersIcon from 'catamaran/icons/Users';

export type NavigationItem = {
  authKey?: AuthKeys;
  href: string;
  title: string;
  icon: (props: IconBaseProps) => React.ReactElement;
  development?: boolean;
  items?: NavigationItem[];
  label?: React.ElementType;
  disabled?: boolean;
};

export type NavigationGroup = {
  subheader?: string;
  subheader_short?: string;
  items: NavigationItem[];
  pathname?: string;
  key?: number | string;
  depth?: number;
};

const developmentFeaturesEnabled = getDevelopmentFeaturesEnabled();

const navigations: NavigationGroup[] = [
  {
    items: [
      {
        authKey: 'taskList',
        href: TASK,
        icon: TaskIcon,
        title: 'layout.navbar.my_tasks'
      },
      {
        href: REQUEST,
        icon: RequestIcon,
        title: 'layout.navbar.my_requests'
      }
    ],
    subheader: 'layout.navbar.tasks',
    subheader_short: 'layout.navbar.tasks_short'
  },
  {
    items: [
      {
        authKey: 'assetList',
        href: ASSET,
        icon: AssetListingIcon,
        title: 'layout.navbar.assets'
      }
    ],
    subheader: 'layout.navbar.asset_management',
    subheader_short: 'layout.navbar.asset_management_short'
  },
  {
    items: [
      {
        authKey: 'assetConfiguration',
        href: ASSETCONFIGURATION,
        icon: AssetSettingsIcon,
        title: 'layout.navbar.asset_configurations'
      },
      {
        authKey: 'taskConfiguration',
        href: TASKCONFIGURATION,
        icon: TaskSettingsIcon,
        title: 'layout.navbar.task_configurations'
      },
      {
        authKey: 'metricsConfiguration',
        href: METRICSCONFIGURATION,
        icon: MetricsConfigurationsIcon,
        title: 'layout.navbar.metrics_configurations'
      },
      {
        authKey: 'locationManagement',
        disabled: !developmentFeaturesEnabled,
        href: '/locations',
        icon: LocationIcon,
        title: 'layout.navbar.locations'
      },
      {
        authKey: 'userManagement',
        href: '/user',
        icon: UsersIcon,
        title: 'layout.navbar.users'
      },
      {
        development: true,
        href: DESIGNSYSTEM_SHOWCASE,
        icon: DashboardIcon,
        title: 'layout.design_system'
      }
    ],
    subheader: 'layout.navbar.configuration',
    subheader_short: 'layout.navbar.configuration_short'
  }
];

export default navigations;
