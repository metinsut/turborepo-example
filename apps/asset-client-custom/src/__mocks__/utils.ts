import { getAppSettings } from 'utils/settings';
import mock from 'utils/mock';

type NetworkErrorMessage = {
  type: string;
  title: string;
  detail: string;
};

export const wrapErrorMessage = (message: string) => {
  const error: NetworkErrorMessage = {
    detail: message,
    title: message,
    type: 'https://bordatech.com/invalid-command-exception'
  };

  return error;
};

export const apiWrapper = (mockRegisterCallback: () => void) => {
  if (getAppSettings().useMockData) {
    mockRegisterCallback();
  }
};

apiWrapper(() => {
  mock.onGet('gw/api/clientconfiguration').reply(() => [
    200,
    {
      deployment: 'MOCK',
      ssoUrl: 'https://demo.identityserver.io'
    }
  ]);
});

apiWrapper(() => {
  mock
    .onGet('api/public/user/general-settings')
    .reply(() => [200, { languageCode: 'en', locale: 'tr-TR', timeZone: '+03:00' }]);
});
