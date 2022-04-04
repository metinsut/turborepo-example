import axios from 'utils/axiosUtils';

export type AppSettings = {
  useMockData: boolean;
  enableDevelopmentFeatures: boolean;
};

type Environment = 'dev' | 'test' | 'prod';

// const environment: Environment = (window as any).dynamicEnv.NODE_DYNAMIC_ENVIRONMENT;
const environment: Environment = process.env
  .NODE_DYNAMIC_ENVIRONMENT as Environment;
const initialSettings: AppSettings = {
  enableDevelopmentFeatures: environment === 'dev',
  useMockData: false
};

let settings = initialSettings;
const initSettings = () => {
  const localSettings: AppSettings = {
    ...initialSettings,
    ...JSON.parse(localStorage.getItem('appsettings'))
  };

  if (environment === 'prod') {
    localSettings.useMockData = false;
    localSettings.enableDevelopmentFeatures = false;
  }

  settings = {
    enableDevelopmentFeatures: localSettings.enableDevelopmentFeatures,
    useMockData: localSettings.useMockData
  };

  localStorage.setItem('appsettings', JSON.stringify(settings));
};

initSettings();

export const getAppSettings = () => settings;

export const getDevelopmentFeaturesEnabled = () =>
  settings.enableDevelopmentFeatures;

export const getEnvironment = () => environment;

export const setAppSettings = (newSettings: AppSettings) => {
  localStorage.setItem('appsettings', JSON.stringify(newSettings));
};

type ServerSettings = {
  ssoUrl: string;
  deployment: string;
};
let serverSettings: ServerSettings;

export const getServerSettings = async () => {
  if (!serverSettings) {
    const clientConfigurationPromise = await axios.get<ServerSettings>(
      'gw/api/clientconfiguration'
    );

    serverSettings = clientConfigurationPromise.data;
  }

  return serverSettings;
};
