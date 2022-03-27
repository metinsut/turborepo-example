import { RootState } from 'RootTypes';

export const selectDraftMyRequest = (state: RootState) => state.breakdowns.myRequest.draft;
