import { RootState } from 'RootTypes';

export const selectReadonlyWaitingForConfirmation = (state: RootState) =>
  state.breakdowns.waitingForConfirmation.draft;

export const selectRequestDate = (state: RootState) =>
  state.breakdowns.waitingForConfirmation.draft.breakdownInformation.requestDate;

export const selectAssignmentInformation = (state: RootState) =>
  state.breakdowns.waitingForConfirmation.draft.assignmentInformation;
