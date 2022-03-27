import AxiosMockAdapter from 'axios-mock-adapter';
import axios from './axiosUtils';

const axiosMockAdapter = new AxiosMockAdapter(axios, {
  delayResponse: 300,
  onNoMatch: 'passthrough'
});

export default axiosMockAdapter;
