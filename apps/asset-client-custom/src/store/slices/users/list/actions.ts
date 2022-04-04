import { AppThunk } from 'RootTypes';
import { SearchRequest, UsersListUser } from './types';
import { UserListPagedResult } from '../common/types';
import { apiCaller } from 'store/common';
import { selectActiveFilter } from 'store/slices/users/filter/selectors';
import { selectCurrentPage } from './selectors';
import { showSnackbarMessage } from 'store/slices/application';
import { userSlice } from './slice';
import axios from 'utils/axiosUtils';
import i18n from 'utils/i18n';

const pageSize: number = 30;

export const fetchUsers = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const currentPage = selectCurrentPage(state);
  const filter = selectActiveFilter(state);

  const apiBody: SearchRequest = {
    ...filter,
    page: currentPage,
    size: pageSize
  };

  const requestBuilder = () =>
    axios.post<UserListPagedResult<UsersListUser>>('user/users/search', apiBody);

  const data = await dispatch(apiCaller(requestBuilder));
  dispatch(userSlice.actions.setUsers(data));
};

export const fetchAllDiscoveredUsers = (): AppThunk => async (dispatch, getState) => {
  const currentState = getState();
  const filter = selectActiveFilter(currentState);
  const currentPage = selectCurrentPage(currentState);

  const apiBody: SearchRequest = {
    ...filter,
    page: 1,
    size: currentPage * pageSize
  };
  const requestBuilder = () =>
    axios.post<UserListPagedResult<UsersListUser>>('user/users/search', apiBody);
  const data = await dispatch(apiCaller(requestBuilder));

  dispatch(userSlice.actions.setAllUsers(data));
};

export const cancelInvitation =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const apiBody = {
      userId
    };
    const requestBuilder = () => axios.post('user/users/cancel-invitation', apiBody);
    await dispatch(apiCaller(requestBuilder));
    dispatch(userSlice.actions.removeOneUser(userId));

    dispatch(fetchAllDiscoveredUsers());
    dispatch(showSnackbarMessage(i18n.t('snackbar.successfully_canceled'), 'warning'));
  };

export const resendInvitation =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const apiBody = {
      userId
    };
    const requestBuilder = () => axios.post('user/users/resend', apiBody);
    await dispatch(apiCaller(requestBuilder));
    dispatch(showSnackbarMessage(i18n.t('snackbar.invitation_resend'), 'success'));
  };
