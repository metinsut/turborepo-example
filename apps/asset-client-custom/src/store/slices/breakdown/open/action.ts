import { AppThunk } from 'RootTypes';
import { AssetInfo } from './types';
import { MyRequestInformation } from '../myRequest/types';
import { Person, getPersonById } from 'store/slices/persons';
import { apiCaller } from 'store/common';
import { isArrayNullOrEmpty } from 'utils';
import {
  removeLocationId,
  setAssetInfo,
  setDefinition,
  setInitialRequestedPersonnelId,
  setInitialResponsiblePersonnelId,
  setLocationId,
  setUsability,
  setUserAuth
} from './slice';
import { selectDraft, selectIsUserAuthorizedForAsset } from './selector';
import {
  selectIsUserAuthorized,
  selectSessionUser,
  selectSessionUserId
} from 'store/slices/session';
import { showAddSuccessSnackbar, showUpdateSuccessSnackbar } from 'store/slices/application';
import axios from 'utils/axiosUtils';

const fetchAssetInformation =
  (assetId: string): AppThunk<Promise<AssetInfo>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.get<AssetInfo>(`/registration/assets/${assetId}/search`);
    const assetInfo = await dispatch(apiCaller(requestBuilder));
    dispatch(setAssetInfo(assetInfo));
    return assetInfo;
  };

const fetchDefaultRequestedPersonnel =
  (): AppThunk<Promise<Person>> => async (dispatch, getState) => {
    const currentState = getState();
    const sessionUserId = selectSessionUserId(currentState);

    const requestedPersonnel = await dispatch(getPersonById(sessionUserId));

    dispatch(setInitialRequestedPersonnelId(requestedPersonnel.id));
    return requestedPersonnel;
  };

const fetchUserAuthorized =
  (assetId: string): AppThunk<Promise<boolean>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<boolean>(`breakdown/breakdowns/is-user-authorized/asset/${assetId}`);
    const userAuthorized = await dispatch(apiCaller(requestBuilder));
    dispatch(setUserAuth(userAuthorized));

    return userAuthorized;
  };

const initializeResponsiblePerson = (): AppThunk => async (dispatch, getState) => {
  const state = getState();
  if (!selectIsUserAuthorized(state, 'taskOpen_AssignPersonnel')) {
    const user = selectSessionUser(state);
    dispatch(setInitialResponsiblePersonnelId(user.id));
  }
};

const initializePage =
  (assetId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    await dispatch(fetchAssetInformation(assetId));
    const authorized = await dispatch(fetchUserAuthorized(assetId));
    await dispatch(fetchDefaultRequestedPersonnel());
    if (authorized) {
      dispatch(initializeResponsiblePerson());
    }
  };

export const initializeReopenPage =
  (taskId: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<MyRequestInformation>(`gw/breakdown/breakdowns/${taskId}/my-request-detail`);
    const taskDetail: MyRequestInformation = await dispatch(apiCaller(requestBuilder));

    dispatch(setDefinition(taskDetail.breakdownInformation.explanation));
    dispatch(setUsability(taskDetail.breakdownInformation.usability));
    await dispatch(fetchAssetInformation(taskDetail.assetInformation.id));

    if (!isArrayNullOrEmpty(taskDetail.assetInformation.locations)) {
      dispatch(setLocationId(taskDetail.assetInformation.locations.at(-1).id));
    } else {
      dispatch(removeLocationId());
    }

    dispatch(setUserAuth(false));
  };

const createBreakdown = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const currentState = getState();
  const isUserAuthorized = selectIsUserAuthorizedForAsset(currentState);
  const body = selectDraft(currentState);

  const unauthorizedUrl = 'breakdown/breakdowns/unauthorized';
  const authorizedUrl = 'breakdown/breakdowns/authorized';

  const requestBuilder = () =>
    axios.post<boolean>(isUserAuthorized ? authorizedUrl : unauthorizedUrl, body);
  await dispatch(apiCaller(requestBuilder, { autoFetchAfterCreateOrUpdate: false }));

  dispatch(showAddSuccessSnackbar());
};

export const reopenMyRequest =
  (id: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const requestData = selectDraft(getState());
    const requestBuilder = () => axios.put(`breakdown/breakdowns/${id}/reopen`, requestData);

    await dispatch(apiCaller(requestBuilder));
    dispatch(showUpdateSuccessSnackbar());
  };

export {
  fetchAssetInformation,
  fetchDefaultRequestedPersonnel,
  fetchUserAuthorized,
  initializePage,
  createBreakdown
};
