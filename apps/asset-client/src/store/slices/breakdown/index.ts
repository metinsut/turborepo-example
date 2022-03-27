import { combineReducers } from 'redux';
import myRequestSlice from './myRequest/slice';
import openBreakdownSlice from './open/slice';
import taskDetailSlice from './taskDetail/slice';
import waitingForConfirmationSlice from './waitingForConfirmation/slice';

const breakdownsReducer = combineReducers({
  myRequest: myRequestSlice,
  open: openBreakdownSlice,
  taskDetail: taskDetailSlice,
  waitingForConfirmation: waitingForConfirmationSlice
});

export default breakdownsReducer;
