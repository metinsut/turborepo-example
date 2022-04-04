import { combineReducers } from '@reduxjs/toolkit';
import breakdownSubstatusSlice from './breakdownStatuses';
import breakdownTypeSlice from './breakdownTypes';
import brekadownCostSlice from './breakdownCosts';

const breakdownReducer = combineReducers({
  breakdownCost: brekadownCostSlice,
  breakdownSubstatus: breakdownSubstatusSlice,
  breakdownType: breakdownTypeSlice
});

export default breakdownReducer;
