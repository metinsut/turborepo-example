import { RootState } from 'RootTypes';

export const selectDraft = (state: RootState) => state.breakdowns.open.draft;
export const selectUsability = (state: RootState) => state.breakdowns.open.draft.usability;
export const selectPriority = (state: RootState) => state.breakdowns.open.draft.priority;
export const selectAssetInfo = (state: RootState) => state.breakdowns.open.assetInfo;
export const selectRequestedPersonnelId = (state: RootState) =>
  state.breakdowns.open.draft.requestedPersonnelId;
export const selectResponsiblePersonnelId = (state: RootState) =>
  state.breakdowns.open.draft.responsiblePersonnelId;
export const selectAssistantPersonnelIds = (state: RootState) =>
  state.breakdowns.open.draft.assistantPersonnelIds;
export const selectBranchId = (state: RootState) => state.breakdowns.open.assetInfo.branchId;
export const selectIsUserAuthorizedForAsset = (state: RootState) =>
  state.breakdowns.open.isUserAuthorized;
