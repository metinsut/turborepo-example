import { combineReducers } from '@reduxjs/toolkit';
import breakdownReducer from './breakdown';

const taskConfigurationReducer = combineReducers({
  breakdown: breakdownReducer
});

export default taskConfigurationReducer;
