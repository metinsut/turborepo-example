import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { UserListPagedResult } from '../common/types';
import { UserListState, UsersListUser } from './types';

const isAllCheckboxChecked = (state: any) =>
  Object.keys(state.checkedUserIds).length === state.ids.length && state.ids.length > 0;

export const userListAdapter = createEntityAdapter<UsersListUser>({
  selectId: (user) => user.userId
});

const initialState: UserListState = {
  checkedUserIds: {},
  page: 1,
  statusCounts: {
    active: 0,
    waiting: 0
  },
  total: 0
};

export const userSlice = createSlice({
  initialState: userListAdapter.getInitialState(initialState),
  name: 'list',
  reducers: {
    clearAllUsers: (draft) => {
      draft.checkedUserIds = {};
      draft.page = 1;
      draft.total = 0;
      userListAdapter.removeAll(draft);
    },
    fillAllCheckbox: (draft) => {
      if (Object.keys(draft.checkedUserIds)?.length > 0) {
        draft.checkedUserIds = {};
      } else {
        draft.ids.forEach((id) => {
          draft.checkedUserIds[id] = true;
        });
      }
    },
    handleUserItemCheckStatus: (draft, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (draft.checkedUserIds[userId]) {
        delete draft.checkedUserIds[userId];
      } else {
        draft.checkedUserIds[userId] = true;
      }
    },
    incrementPage: (draft) => {
      draft.page += 1;
    },
    removeOneUser: userListAdapter.removeOne,
    setAllUsers: (draft, action: PayloadAction<UserListPagedResult<UsersListUser>>) => {
      const {
        total,
        items,
        currentPage,
        statusCounts: { active, waiting }
      } = action.payload;
      draft.total = total;
      if (currentPage === 1) {
        draft.statusCounts.active = active;
        draft.statusCounts.waiting = waiting;
      }
      const isAllChecked = isAllCheckboxChecked(draft);

      userListAdapter.setAll(draft, items);
      if (isAllChecked) {
        items.forEach((item) => {
          draft.checkedUserIds[item.userId] = true;
        });
      }
    },
    setUsers: (draft, action: PayloadAction<UserListPagedResult<UsersListUser>>) => {
      const {
        total,
        items,
        currentPage,
        statusCounts: { active, waiting }
      } = action.payload;
      draft.total = total;
      if (currentPage === 1) {
        draft.statusCounts.active = active;
        draft.statusCounts.waiting = waiting;
      }
      const isAllChecked = isAllCheckboxChecked(draft);
      userListAdapter.setMany(draft, items);
      if (isAllChecked) {
        items.forEach((item) => {
          draft.checkedUserIds[item.userId] = true;
        });
      }
    }
  }
});

export const {
  setUsers,
  incrementPage,
  handleUserItemCheckStatus,
  fillAllCheckbox,
  removeOneUser,
  clearAllUsers
} = userSlice.actions;

export default userSlice.reducer;
