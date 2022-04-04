import { AppThunk } from 'RootTypes';
import { MYREQUESTSLIST } from 'routes/constant-route';
import { MyRequestInformation } from './types';
import { apiCaller } from 'store/common';
import { history } from 'utils/history';
import { setDraft, setResolveStatus } from './slice';
import { showDeleteSuccessSnackbar, showUpdateSuccessSnackbar } from 'store/slices/application';
import { upsertPerson } from 'store/slices/persons';
import axios from 'utils/axiosUtils';

const initializeMyRequestDetailPage =
  (breakdownId: string): AppThunk =>
  async (dispatch) => {
    try {
      await dispatch(getMyRequestDetail(breakdownId));
    } catch (error) {
      history.push(MYREQUESTSLIST);
    }
  };

const getMyRequestDetail =
  (breakdownId: string): AppThunk<Promise<MyRequestInformation>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<MyRequestInformation>(`gw/breakdown/breakdowns/${breakdownId}/my-request-detail`);
    const myRequestDetail = await dispatch(apiCaller(requestBuilder));

    if (myRequestDetail.taskStatusInformation.responsiblePerson) {
      dispatch(upsertPerson(myRequestDetail.taskStatusInformation.responsiblePerson));
    }
    if (myRequestDetail.breakdownInformation.deniedByPersonnel) {
      dispatch(upsertPerson(myRequestDetail.breakdownInformation.deniedByPersonnel));
    }

    dispatch(setDraft(myRequestDetail));
    return myRequestDetail;
  };

const resolveMyRequestDetail =
  (id: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.put(`breakdown/breakdowns/${id}/resolve`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(setResolveStatus('resolved'));

    dispatch(showUpdateSuccessSnackbar());
  };

const abortMyRequestDetail =
  (id: string): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () => axios.delete(`breakdown/breakdowns/my-request/${id}`);
    await dispatch(apiCaller(requestBuilder));

    dispatch(showDeleteSuccessSnackbar());
  };

export { abortMyRequestDetail, initializeMyRequestDetailPage, resolveMyRequestDetail };
