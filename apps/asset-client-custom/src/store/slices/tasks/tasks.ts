import { combineReducers } from '@reduxjs/toolkit';
import myRequestsListSlice from './myRequests';
import taskListFilterSlice from './taskList/taskListFilter';
import taskListSlice from './taskList/taskList';
import waitingForConfirmationFilterSlice from './waitingForConformation/waitingForConfirmationFilter';
import waitingForConfirmationListSlice from './waitingForConformation/waitingForConfirmationList';

const taskReducer = combineReducers({
  myRequestsList: myRequestsListSlice,
  taskList: taskListSlice,
  taskListFilter: taskListFilterSlice,
  waitingForConfirmationFilter: waitingForConfirmationFilterSlice,
  waitingForConfirmationList: waitingForConfirmationListSlice
});

export default taskReducer;
