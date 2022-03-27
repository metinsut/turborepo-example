import { combineReducers } from '@reduxjs/toolkit';
import departmentsSlice from './departments/slice';
import detailsSlice from './details/slice';
import filterSlice from './filter/slice';
import listSlice from './list/slice';

const usersReducer = combineReducers({
  departments: departmentsSlice,
  details: detailsSlice,
  filter: filterSlice,
  list: listSlice
});

export default usersReducer;
