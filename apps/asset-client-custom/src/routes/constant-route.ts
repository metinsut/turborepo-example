export type FirstLevelRoute =
  | 'asset-configuration'
  | 'task-configuration'
  | 'profile-settings'
  | 'task'
  | 'request'
  | 'asset'
  | 'metrics-configuration'
  | 'location'
  | 'user'
  | 'design-system';

type FirstLevelRouteWithPrefix = `/${FirstLevelRoute}`;

export const ASSETCONFIGURATION: FirstLevelRouteWithPrefix = '/asset-configuration';
export const CATEGORIES = `${ASSETCONFIGURATION}/categories`;
export const CATEGORYTASKS = `${ASSETCONFIGURATION}/category-tasks`;
export const FORMS = `${ASSETCONFIGURATION}/forms`;
export const FORMBUILDER = `${FORMS}/form-builder`;

export const METRICSCONFIGURATION: FirstLevelRouteWithPrefix = `/metrics-configuration`;
export const METRICSCONFIGURATION_LIST = `${METRICSCONFIGURATION}/metrics`;
export const METRICSCONFIGURATION_DETAIL = `${METRICSCONFIGURATION}/metrics/:metricId`;

export const TASKCONFIGURATION: FirstLevelRouteWithPrefix = '/task-configuration';
export const BREAKDOWN = `${TASKCONFIGURATION}/breakdown`;
export const MAINTENANCE = `${TASKCONFIGURATION}/maintenance`;
export const CALIBRATION = `${TASKCONFIGURATION}/calibration`;
export const RETIREMENT = `${TASKCONFIGURATION}/retirement`;

export const PUBLIC = '/public';
export const LINKEXPIRED = `${PUBLIC}/invitation-link-expired`;
export const REGISTERFIRSTPAGE = `${PUBLIC}/user-register-landing`;
export const REGISTERSECONDPAGE = `${PUBLIC}/user-register`;

export const PROFILESETTINGS: FirstLevelRouteWithPrefix = '/profile-settings';
export const ACCOUNTINFORMATION = `${PROFILESETTINGS}/account-information`;
export const LOCALIZATIONSETTINGS = `${PROFILESETTINGS}/localization-settings`;
export const DEVELOPEROPTIONS = `${PROFILESETTINGS}/developer-options`;

export const TASK: FirstLevelRouteWithPrefix = '/task';
export const TASKLIST = '/task/tasks';
export const TASK_DETAIL = `${TASKLIST}/breakdown/:taskId`;
export const WAITINGFORCONFIRMATIONLIST = `${TASK}/waiting-for-confirmation`;
export const WAITINGFORCONFIRMATIONDETAIL = `${WAITINGFORCONFIRMATIONLIST}/breakdown/:breakdownId`;

export const REQUEST: FirstLevelRouteWithPrefix = '/request';
export const MYREQUESTSLIST = `${REQUEST}/my-requests`;
export const MYREQUESTSDETAIL = `${MYREQUESTSLIST}/breakdown/:breakdownId`;
export const BREAKDOWN_OPEN = `${MYREQUESTSLIST}/open`;

export const ERROR401 = '/errors/error-401';
export const ERROR404 = '/errors/error-404';
export const ERROR500 = '/errors/error-500';

export const DESIGNSYSTEM: FirstLevelRouteWithPrefix = '/design-system';
export const DESIGNSYSTEM_SHOWCASE = `${DESIGNSYSTEM}/showcase`;

export const ASSET: FirstLevelRouteWithPrefix = '/asset';
export const ASSETLIST = `${ASSET}/assets`;
export const ASSET_DETAIL = `${ASSETLIST}/:id`;
export const ASSET_ADD = `${ASSETLIST}/add`;
export const ASSET_CONTRACTS = `${ASSET}/contracts`;

export const USER: FirstLevelRouteWithPrefix = '/user';
export const USER_LIST = `${USER}/users`;
export const USER_DEPARTMENTS = `${USER}/departments`;

export const CATEGORIES_V2 = `${ASSETCONFIGURATION}/categoryv2`;
