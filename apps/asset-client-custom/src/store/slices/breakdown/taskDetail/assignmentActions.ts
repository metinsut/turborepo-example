import { AppThunk } from 'RootTypes';
import { AssignmentAuthorization } from '../common/types';
import { apiCaller } from 'store/common';
import { selectAssistantPersonIds, selectBreakdownId, selectResponsiblePersonId } from './selector';
import { selectIsUserAuthorized, selectSessionUserId } from 'store/slices/session';
import { selectPersonById, selectPersonsByIds } from 'store/slices/persons';
import { setAssignment } from './slice';
import { showUpdateSuccessSnackbar } from 'store/slices/application';
import axios from 'utils/axiosUtils';

const updateBreakdownAssignment =
  (responsiblePersonnelId: string, assistantPersonnelIds: string[]): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();
    const breakdownId = selectBreakdownId(state);
    const finalAssistantPersonnelIds = responsiblePersonnelId ? assistantPersonnelIds : [];

    const requestPayload: {
      responsiblePersonnelId?: string;
      assistantPersonnelIds?: string[];
    } = { assistantPersonnelIds: finalAssistantPersonnelIds, responsiblePersonnelId };

    const requestBuilder = () =>
      axios.put<typeof requestPayload>(
        `breakdown/breakdowns/${breakdownId}/assignment`,
        requestPayload
      );

    const response = await dispatch(apiCaller(requestBuilder));

    const responsiblePersonnel = selectPersonById(state, response.responsiblePersonnelId);
    const assistantPersonnels = selectPersonsByIds(state, response.assistantPersonnelIds);
    dispatch(
      setAssignment({
        assistantPersonnels,
        responsiblePersonnel
      })
    );
    dispatch(showUpdateSuccessSnackbar());
  };

const updateResponsiblePersonnel =
  (responsiblePersonnelId: string): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();
    const assistantPersonnelIds = selectAssistantPersonIds(state);
    await dispatch(updateBreakdownAssignment(responsiblePersonnelId, assistantPersonnelIds));
  };

const updateAssistantPersonnels =
  (assistantPersonnelIds: string[]): AppThunk<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();
    const responsiblePersonnelId = selectResponsiblePersonId(state);
    await dispatch(updateBreakdownAssignment(responsiblePersonnelId, assistantPersonnelIds));
  };

const removeResponsiblePersonnel = (): AppThunk<Promise<void>> => async (dispatch) => {
  await dispatch(updateBreakdownAssignment(undefined, []));
};

const removeAssistantPersonnels = (): AppThunk<Promise<void>> => async (dispatch, getState) => {
  const state = getState();
  const responsiblePersonnelId = selectResponsiblePersonId(state);
  await dispatch(updateBreakdownAssignment(responsiblePersonnelId, []));
};

const getIsUserAuthorizedToAssign =
  (
    responsiblePersonId: string,
    assistantPersonIds: string[]
  ): AppThunk<Promise<AssignmentAuthorization>> =>
  async (dispatch) => {
    const canEditResponsible = await dispatch(getResponsibleEditAuthorization(responsiblePersonId));
    const canDeleteResponsible = await dispatch(
      getResponsibleDeleteAuthorization(responsiblePersonId)
    );
    const canEditAssistant = await dispatch(getAssistantEditAuthorization(assistantPersonIds));
    const canDeleteAssistant = await dispatch(getAssistantDeleteAuthorization(assistantPersonIds));
    const canSeeAssignments = await dispatch(
      getIsUserAuthorizedToSeeAssignments(responsiblePersonId, assistantPersonIds)
    );
    return {
      canDeleteAssistant,
      canDeleteResponsible,
      canEditAssistant,
      canEditResponsible,
      canSeeAssignments
    };
  };

const getResponsibleEditAuthorization =
  (responsiblePersonId: string): AppThunk<Promise<boolean>> =>
  async (_dispatch, getState) => {
    const state = getState();

    const authorizedToAssign = selectIsUserAuthorized(state, 'taskDetail_AssignPersonnel');
    if (authorizedToAssign) {
      return true;
    }

    const authorizedToChange = selectIsUserAuthorized(
      state,
      'taskDetail_ChangePersonnelIfAssigned'
    );
    const userId = selectSessionUserId(state);

    return authorizedToChange && responsiblePersonId === userId;
  };

const getResponsibleDeleteAuthorization =
  (responsiblePersonId: string): AppThunk<Promise<boolean>> =>
  async (_dispatch, getState) => {
    const state = getState();

    const authorizedToAssign = selectIsUserAuthorized(state, 'taskDetail_AssignPersonnel');
    if (authorizedToAssign) {
      return true;
    }
    const userId = selectSessionUserId(state);
    const authorizedToChange = selectIsUserAuthorized(
      state,
      'taskDetail_ChangePersonnelIfAssigned'
    );

    return authorizedToChange && responsiblePersonId === userId;
  };
const getAssistantEditAuthorization =
  (assistantPersonIds: string[]): AppThunk<Promise<boolean>> =>
  async (_dispatch, getState) => {
    const state = getState();

    const authorizedToAssign = selectIsUserAuthorized(state, 'taskDetail_AssignPersonnel');
    if (authorizedToAssign) {
      return true;
    }
    const userId = selectSessionUserId(state);
    const authorizedToChange = selectIsUserAuthorized(
      state,
      'taskDetail_ChangePersonnelIfAssigned'
    );

    return authorizedToChange && assistantPersonIds.includes(userId);
  };

const getAssistantDeleteAuthorization =
  (assistantPersonIds: string[]): AppThunk<Promise<boolean>> =>
  async (_dispatch, getState) => {
    const state = getState();

    const authorizedToAssign = selectIsUserAuthorized(state, 'taskDetail_AssignPersonnel');
    if (authorizedToAssign) {
      return true;
    }
    const userId = selectSessionUserId(state);
    const authorizedToChange = selectIsUserAuthorized(
      state,
      'taskDetail_ChangePersonnelIfAssigned'
    );

    return (
      authorizedToChange && assistantPersonIds.includes(userId) && assistantPersonIds.length === 1
    );
  };

const getIsUserAuthorizedToSeeAssignments =
  (responsiblePersonId: string, assistantPersonIds: string[]): AppThunk<Promise<boolean>> =>
  async (_dispatch, getState) => {
    const state = getState();

    const authorizedToSee = selectIsUserAuthorized(state, 'taskDetail_AssignPersonnel');
    if (authorizedToSee) {
      return true;
    }

    const authorizedIfAlreadyAssigned = selectIsUserAuthorized(
      state,
      'taskDetail_ChangePersonnelIfAssigned'
    );

    if (!authorizedIfAlreadyAssigned) {
      return false;
    }

    const userId = selectSessionUserId(state);

    const userNotExistsInAssignments =
      responsiblePersonId && responsiblePersonId !== userId && !assistantPersonIds.includes(userId);

    return !userNotExistsInAssignments;
  };

const getDisabledAssistantPersonnelIds =
  (responsiblePersonId: string, assistantPersonIds: string[]): AppThunk<Promise<string[]>> =>
  async (_dispatch, getState) => {
    const state = getState();

    const authoriedToEditAll = selectIsUserAuthorized(state, 'taskDetail_AssignPersonnel');
    if (authoriedToEditAll) {
      return [responsiblePersonId];
    }

    const userId = selectSessionUserId(state);
    const disabledPersonnelIds = [
      ...assistantPersonIds.filter((i) => i !== userId),
      responsiblePersonId
    ];

    return disabledPersonnelIds;
  };

export {
  getIsUserAuthorizedToAssign,
  updateBreakdownAssignment,
  updateResponsiblePersonnel,
  updateAssistantPersonnels,
  removeAssistantPersonnels,
  removeResponsiblePersonnel,
  getDisabledAssistantPersonnelIds
};
