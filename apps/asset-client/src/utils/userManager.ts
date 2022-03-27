import { UserManager, UserManagerSettings } from 'oidc-client-ts';
import { getServerSettings } from './settings';

let userManager: UserManager;

export const getUserManager = async () => {
  if (!userManager) {
    const serverSettings = await getServerSettings();
    let clientId = 'quattro.asset.client.web';
    let scope = 'openid profile quattro.gateway.assetclient';

    if (serverSettings.deployment === 'MOCK') {
      clientId = 'interactive.public';
      scope = 'openid profile';
    }

    const userManagerConfig: UserManagerSettings = {
      accessTokenExpiringNotificationTimeInSeconds: 60,
      authority: serverSettings.ssoUrl,
      client_id: clientId,
      filterProtocolClaims: true,
      loadUserInfo: true,
      monitorSession: true,
      post_logout_redirect_uri: `${window.location.origin}`,
      redirect_uri: `${window.location.origin}/auth/callback`,
      response_mode: 'query',
      response_type: 'code',
      scope,
      silent_redirect_uri: `${window.location.origin}/silent_renew.html`
      // code below uses in memory store but it requires signinsilent after normal signin flow
      // userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() }),
    };

    userManager = new UserManager(userManagerConfig);
  }

  return userManager;
};
