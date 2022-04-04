import { AppThunk } from 'RootTypes';
import { AssignmentInformation, DenyBreakdown } from '../common/types';
import { WAITINGFORCONFIRMATIONLIST } from 'routes/constant-route';
import { WaitingForConfirmationInformation } from './types';
import { apiCaller } from 'store/common';
import { fetchAllDiscoveredWaitingForConfirmations } from 'store/slices/tasks/waitingForConformation/waitingForConfirmationList';
import { history } from 'utils/history';
import { setDraftInformation } from './slice';
import { showSaveSuccessSnackbar, showSnackbarMessage } from 'store/slices/application';
import { upsertPerson } from 'store/slices/persons';
import axios from 'utils/axiosUtils';
import i18n from 'utils/i18n';

const initializeWaitingForConfirmationDetailPage =
  (breakdownId: string): AppThunk =>
  async (dispatch) => {
    try {
      await dispatch(getBreakdownDetail(breakdownId));
    } catch (error) {
      history.push(WAITINGFORCONFIRMATIONLIST);
    }
  };

const getBreakdownDetail =
  (breakdownId: string): AppThunk<Promise<WaitingForConfirmationInformation>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.get<WaitingForConfirmationInformation>(
        `gw/breakdown/breakdowns/${breakdownId}/waiting-for-confirmation-detail`
      );
    const breakdownDetail = await dispatch(apiCaller(requestBuilder));

    dispatch(upsertPerson(breakdownDetail.breakdownInformation.requesterPerson));
    dispatch(setDraftInformation(breakdownDetail));
    return breakdownDetail;
  };

const confirmBreakdown =
  (breakdownId: string, assignmentInformation: AssignmentInformation): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<AssignmentInformation>(
        `breakdown/breakdowns/${breakdownId}/confirm`,
        assignmentInformation
      );
    await dispatch(apiCaller(requestBuilder));

    dispatch(showSaveSuccessSnackbar());
    dispatch(fetchAllDiscoveredWaitingForConfirmations());
  };

const denyBreakdown =
  (breakdownId: string, denyBreakdown: DenyBreakdown): AppThunk<Promise<void>> =>
  async (dispatch) => {
    const requestBuilder = () =>
      axios.put<AssignmentInformation>(`breakdown/breakdowns/${breakdownId}/deny`, denyBreakdown);
    await dispatch(apiCaller(requestBuilder));

    dispatch(showSnackbarMessage(i18n.t('snackbar.update_success_message'), 'warning'));

    dispatch(fetchAllDiscoveredWaitingForConfirmations());
  };
export { confirmBreakdown, denyBreakdown, initializeWaitingForConfirmationDetailPage };
