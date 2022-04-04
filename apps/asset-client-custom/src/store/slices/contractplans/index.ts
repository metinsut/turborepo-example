import { combineReducers } from '@reduxjs/toolkit';
import wizardSlice from './wizard/slice';

const contractPlanReducer = combineReducers({
  wizard: wizardSlice
});

export default contractPlanReducer;
