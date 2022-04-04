import axiosOriginal from 'axios';

const axios = axiosOriginal.create();

axios.defaults.baseURL = '/api';

// const environment = (window as any).dynamicEnv.NODE_DYNAMIC_ENVIRONMENT;
// if (environment === 'dev') {
//   instance.defaults.baseURL = 'http://quattrogatewayassetclient.dev.bordatechdev.com';
// } else if (environment === 'test') {
//   instance.defaults.baseURL = 'http://quattrogatewayassetclient.dev.bordatechdev.com';
// } else {
//   instance.defaults.baseURL = 'http://quattrogatewayassetclient.dev.bordatechdev.com';
// }

export default axios;
