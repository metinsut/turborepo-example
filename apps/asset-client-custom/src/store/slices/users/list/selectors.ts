import { RootState } from 'RootTypes';
import { createSelector } from '@reduxjs/toolkit';
import { userListAdapter } from './slice';

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectAllUserIds,
  selectTotal: selectTotalUser,
  selectEntities
} = userListAdapter.getSelectors<RootState>((state) => state.users.list);

const selectCurrentPage = (state: RootState) => state.users.list.page;

const selectTotalWaitingUsers = (state: RootState) => state.users.list.statusCounts.waiting;

const selectTotalActiveUsers = (state: RootState) => state.users.list.statusCounts.active;

const selectHasAnyRowSelected = (state: RootState) =>
  Object.keys(state.users.list.checkedUserIds).length > 0;

const selectIsCheckBoxChecked = (state: RootState, id: string) =>
  !!state.users.list.checkedUserIds[id];

const selectTotalAllUser = (state: RootState) => state.users.list.total;

const selectCheckedUserLength = (state: RootState) =>
  Object.keys(state.users.list.checkedUserIds).length;

const selectHasAnyCheckboxChecked = (state: RootState) =>
  Object.keys(state.users.list.checkedUserIds)?.length > 0;

const selectIsAllCheckboxChecked = (state: RootState) =>
  Object.keys(state.users.list.checkedUserIds).length === state.users.list.ids.length &&
  state.users.list.ids.length > 0;

const selectCheckedTotalUserLength = createSelector(
  [selectIsAllCheckboxChecked, selectCheckedUserLength, selectTotalAllUser],
  (isAllChecked, checkUsersLength, totalAllUser) => {
    if (isAllChecked) {
      return totalAllUser;
    }
    return checkUsersLength;
  }
);

export {
  selectCurrentPage,
  selectTotalWaitingUsers,
  selectTotalActiveUsers,
  selectHasAnyRowSelected,
  selectIsCheckBoxChecked,
  selectHasAnyCheckboxChecked,
  selectCheckedTotalUserLength,
  selectIsAllCheckboxChecked,
  selectTotalAllUser
};
