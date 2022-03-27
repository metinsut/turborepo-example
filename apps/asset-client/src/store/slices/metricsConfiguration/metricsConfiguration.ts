import { combineReducers } from '@reduxjs/toolkit';
import detailSlice from './detail/slice';
import listSlice from './list/list';

const metricsConfigurationReducer = combineReducers({
  detail: detailSlice,
  list: listSlice
});

export default metricsConfigurationReducer;
