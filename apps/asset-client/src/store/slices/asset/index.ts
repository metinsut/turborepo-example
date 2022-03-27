import { combineReducers } from '@reduxjs/toolkit';
import detailSlice from './detail/slice';
import filterSlice from './filter/slice';
import locationSlice from './locations/slice';

const assetsReducer = combineReducers({
  detail: detailSlice,
  filter: filterSlice,
  locations: locationSlice
});

export default assetsReducer;
